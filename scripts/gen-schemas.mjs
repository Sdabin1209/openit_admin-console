import { bundleStandalone, createAjv } from "./standalone.mjs";
// 계약 패키지 스키마(../boundary-contracts의 **고정 태그** 내용, 읽기 전용, 이웃 작업 트리는 읽지 않는다: scripts/contract-src.mjs)에서 LoRA-A/B 입력·출력 검증기를 생성한다.
// 브라우저 CSP(script-src 'self')에서 eval 없이 쓰려고 Ajv standalone 코드를 만든다.
// 사용: node scripts/gen-schemas.mjs [--check]   (--check: 생성물이 최신인지만 검사)
import Ajv from "ajv/dist/2020.js";
import standaloneCode from "ajv/dist/standalone/index.js";
import { createHash } from "node:crypto";
import { existsSync, readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { contract } from "./contract-src.mjs";
import { fileURLToPath } from "node:url";

const OUT = new URL("../app/types/contract-validators.cjs", import.meta.url);
// 모델 입출력(검토자 입력 검사) + 이 영역이 주고받는 경계 형식(D107로 승격된 것, conformance/promoted/admin-console.MANIFEST.json).
const NAMES = ["ActionExtractionInput", "ActionExtraction", "ResponseRequest", "ResponseText",
  "ApprovalRequest", "ActivateRequest", "RollbackRequest", "CaseReviewRequest", "ListEnvelope", "OpsFeedbackReviewTrace", "OpsFeedbackDeidentifiedTrace", "ImageLabels",
  // 빌드 진입점(scripts/build-image.mjs)이 요청과 결과를 검사한다(계약 2.5.0, U42).
  "BuildImageRequest", "BuildImageResult",
  // 환경 준비 진입점(scripts/setup-env.sh)이 마지막 줄 보고를 낸다(계약 2.6.0, U43). 시험이 이 검증기로 그 줄을 검사한다.
  "SetupEnvReport",
  // 노출 선언(deploy-exposure.json, 라벨 io.openit.exposure)을 빌드 진입점과 시험이 검사한다(계약 Exposure, U47).
  "Exposure",
  // 주입 선언(deploy-inputs.json, 라벨 io.openit.inputs)을 빌드 진입점이 검사한다(계약 ContainerInputs 3.5.0).
  "ContainerInputs",
  // 결과 탭 웹 푸시(계약 3.4.0, U92): 푸시 설정 응답과 서비스 워커가 받는 푸시 본문.
  "PushConfig", "StaffPushPayload",
  // 3.4.4: 이 영역이 만드는 푸시 구독 본문은 보내기 전에 검증한다(CONVENTIONS 3절 생산자 출력 검증). HealthStatus는 이미지의 /healthz·/readyz 본문 시험이 쓴다.
  "PushSubscriptionRequest", "HealthStatus"];
// 왜: ApprovalRequest·ActivateRequest가 $ref로 가리키는 공통 정의. 검증기로 내보내지 않고 참조 해소용으로만 넣는다.
// 5.0.0: RollbackRequest.requested_by_role 이 GateExt 의 칸을 $ref 한다(D117 같은 타입은 한 번만). 같은 이유로 참조 해소용으로만 넣는다.
const SUPPORT = ["_common", "GateExt"];

export function generate(src = contract) {
  const version = /^version\s*=\s*"([^"]+)"/m.exec(src.read("pyproject.toml"))?.[1] ?? "unknown";
  const ajv = createAjv({ strict: false, code: { source: true, esm: false }, allErrors: true });
  const sources = {};
  for (const n of [...NAMES, ...SUPPORT]) {
    const text = src.read(`schemas/${n}.schema.json`);
    sources[n] = createHash("sha256").update(text).digest("hex");
    ajv.addSchema(JSON.parse(text), `${n}.schema.json`); // 왜: $ref가 파일 이름(_common.schema.json)으로 가리키므로 $id와 같은 키로 등록한다
  }
  // 왜: 계약 버전 상수를 손으로 복사하면 계약이 오를 때 어긋난다. 정본(schemas_api.py)에서 생성 때 읽는다.
  const pipeline = /^PIPELINE_SCHEMA_VERSION\s*=\s*"([^"]+)"/m.exec(src.read("boundary_contracts/schemas_api.py"))?.[1];
  if (!pipeline) throw new Error("schemas_api.py에서 PIPELINE_SCHEMA_VERSION을 찾지 못했다");
  // 왜 생성물에 상수로: 라벨의 계약 버전은 요청 값이 아니라 이 검증기를 실제로 만든 버전이어야 거짓이 되지 않는다(U50). 규칙 버전은 계약 데이터가 정본이라 손으로 적지 않는다(계약 3.0.0).
  const rules = JSON.parse(src.read("boundary_contracts/data/action_extraction_rules.json")).rules_version;
  if (typeof rules !== "string" || !rules) throw new Error("action_extraction_rules.json에서 rules_version을 찾지 못했다");
  // 계약 JSON 공통 규칙의 한도(CONVENTIONS 10절): 정본 strict_json.py 에서 읽는다. 사본 상수를 두지 않는다.
  const sj = src.read("boundary_contracts/strict_json.py");
  const num = (name) => {
    const m = new RegExp(`^${name}\\s*=\\s*(.+?)\\s*(#.*)?$`, "m").exec(sj);
    if (!m) throw new Error(`strict_json.py에서 ${name}을 찾지 못했다`);
    return m[1].split(/(?<!\*)\*(?!\*)/).map((t) => { const p = t.trim().split("**"); return p.length === 2 ? Number(p[0]) ** Number(p[1]) : Number(p[0]); }).reduce((a, b) => a * b, 1);
  };
  const limits = { maxDepth: num("MAX_JSON_DEPTH"), maxBytes: num("MAX_JSON_BYTES"), maxNodes: num("MAX_JSON_NODES"), maxSafeInt: num("MAX_SAFE_INT") };
  if (Object.values(limits).some((x) => !Number.isFinite(x) || x <= 0)) throw new Error("strict_json.py 한도를 읽지 못했다");
  const ijsonSrc = readFileSync(fileURLToPath(new URL("./ijson-check.cjs", import.meta.url)), "utf8");
  const code = standaloneCode(ajv, Object.fromEntries(NAMES.map((n) => [n, `${n}.schema.json`])));
  const header = `// 생성물: scripts/gen-schemas.mjs (직접 고치지 않는다). 원본: boundary-contracts ${version}\n// source-sha256: ${JSON.stringify(sources)}\n`;
  // 왜 인라인: 생성 코드가 require("ajv/dist/runtime/ucs2length")를 부르면 빌드 진입점이 npm ci(네트워크) 없이는 검증기를 못 쓴다.
  // 같은 함수(ajv 8.20.0, MIT, 12줄)를 생성물 안에 두어 node만으로 돌게 한다. 브라우저 번들에도 같은 함수가 들어간다.
  return header + bundleStandalone(code) + `\nexports.PIPELINE_SCHEMA_VERSION = ${JSON.stringify(pipeline)};\nexports.CONTRACT_VERSION = ${JSON.stringify("v" + version)};\nexports.ACTION_RULES_VERSION = ${JSON.stringify(rules)};\n`
    + `exports.ijson = (function () { const module = { exports: null }; ${ijsonSrc.replace(/^\/\/.*$/gm, "")}\n return module.exports; })()(${JSON.stringify(limits)});\n`;
}

if (process.argv[1] && import.meta.url === new URL(process.argv[1], "file://").href) {
  if (!contract.available()) { console.error(`../boundary-contracts에서 고정 태그 ${contract.tag}를 찾을 수 없다`); process.exit(2); }
  const out = generate();
  if (process.argv.includes("--check")) {
    const cur = existsSync(OUT) ? readFileSync(OUT, "utf8") : "";
    if (cur !== out) { console.error("app/types/contract-validators.cjs가 최신이 아니다: node scripts/gen-schemas.mjs"); process.exit(1); }
    console.log("계약 검증기 최신");
  } else {
    mkdirSync(new URL("../app/types/", import.meta.url), { recursive: true });
    writeFileSync(OUT, out);
    console.log("written", OUT.pathname);
  }
}
