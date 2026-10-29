// 계약 패키지 스키마(../boundary-contracts의 **고정 태그** 내용, 읽기 전용, 이웃 작업 트리는 읽지 않는다: scripts/contract-src.mjs)에서 LoRA-A/B 입력·출력 검증기를 생성한다.
// 브라우저 CSP(script-src 'self')에서 eval 없이 쓰려고 Ajv standalone 코드를 만든다.
// 사용: node scripts/gen-schemas.mjs [--check]   (--check: 생성물이 최신인지만 검사)
import Ajv from "ajv/dist/2020.js";
import standaloneCode from "ajv/dist/standalone/index.js";
import { createHash } from "node:crypto";
import { existsSync, readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { contract } from "./contract-src.mjs";

const OUT = new URL("../generated/contract-validators.cjs", import.meta.url);
// 모델 입출력(검토자 입력 검사) + 이 영역이 주고받는 경계 형식(D107로 승격된 것, conformance/promoted/admin-console.MANIFEST.json).
const NAMES = ["ActionExtractionInput", "ActionExtraction", "ResponseRequest", "ResponseText",
  "ApprovalRequest", "ActivateRequest", "CaseReviewRequest", "ListEnvelope", "OpsFeedbackDeidentifiedTrace", "ImageLabels",
  // 빌드 진입점(scripts/build-image.mjs)이 요청과 결과를 검사한다(계약 2.5.0, U42).
  "BuildImageRequest", "BuildImageResult",
  // 환경 준비 진입점(scripts/setup-env.sh)이 마지막 줄 보고를 낸다(계약 2.6.0, U43). 시험이 이 검증기로 그 줄을 검사한다.
  "SetupEnvReport"];
// 왜: ApprovalRequest·ActivateRequest가 $ref로 가리키는 공통 정의. 검증기로 내보내지 않고 참조 해소용으로만 넣는다.
const SUPPORT = ["_common"];

export function generate(src = contract) {
  const version = /^version\s*=\s*"([^"]+)"/m.exec(src.read("pyproject.toml"))?.[1] ?? "unknown";
  const ajv = new Ajv({ strict: false, code: { source: true, esm: false }, allErrors: true });
  const sources = {};
  for (const n of [...NAMES, ...SUPPORT]) {
    const text = src.read(`schemas/${n}.schema.json`);
    sources[n] = createHash("sha256").update(text).digest("hex");
    ajv.addSchema(JSON.parse(text), `${n}.schema.json`); // 왜: $ref가 파일 이름(_common.schema.json)으로 가리키므로 $id와 같은 키로 등록한다
  }
  // 왜: 계약 버전 상수를 손으로 복사하면 계약이 오를 때 어긋난다. 정본(schemas_api.py)에서 생성 때 읽는다.
  const pipeline = /^PIPELINE_SCHEMA_VERSION\s*=\s*"([^"]+)"/m.exec(src.read("boundary_contracts/schemas_api.py"))?.[1];
  if (!pipeline) throw new Error("schemas_api.py에서 PIPELINE_SCHEMA_VERSION을 찾지 못했다");
  const code = standaloneCode(ajv, Object.fromEntries(NAMES.map((n) => [n, `${n}.schema.json`])));
  const header = `// 생성물: scripts/gen-schemas.mjs (직접 고치지 않는다). 원본: boundary-contracts ${version}\n// source-sha256: ${JSON.stringify(sources)}\n`;
  // 왜 인라인: 생성 코드가 require("ajv/dist/runtime/ucs2length")를 부르면 빌드 진입점이 npm ci(네트워크) 없이는 검증기를 못 쓴다.
  // 같은 함수(ajv 8.20.0, MIT, 12줄)를 생성물 안에 두어 node만으로 돌게 한다. 브라우저 번들에도 같은 함수가 들어간다.
  const RUNTIME = 'require("ajv/dist/runtime/ucs2length").default';
  if (!code.includes(RUNTIME)) throw new Error("생성 코드에서 ucs2length 호출을 찾지 못했다(ajv 버전이 바뀌었는지 확인)");
  const inline = "(function ucs2length(str){const len=str.length;let length=0,pos=0,value;while(pos<len){length++;value=str.charCodeAt(pos++);if(value>=0xd800&&value<=0xdbff&&pos<len){value=str.charCodeAt(pos);if((value&0xfc00)===0xdc00)pos++;}}return length;})";
  return header + code.split(RUNTIME).join(inline) + `\nexports.PIPELINE_SCHEMA_VERSION = ${JSON.stringify(pipeline)};\n`;
}

if (process.argv[1] && import.meta.url === new URL(process.argv[1], "file://").href) {
  if (!contract.available()) { console.error(`../boundary-contracts에서 고정 태그 ${contract.tag}를 찾을 수 없다`); process.exit(2); }
  const out = generate();
  if (process.argv.includes("--check")) {
    const cur = existsSync(OUT) ? readFileSync(OUT, "utf8") : "";
    if (cur !== out) { console.error("generated/contract-validators.cjs가 최신이 아니다: node scripts/gen-schemas.mjs"); process.exit(1); }
    console.log("generated 최신");
  } else {
    mkdirSync(new URL("../generated/", import.meta.url), { recursive: true });
    writeFileSync(OUT, out);
    console.log("written", OUT.pathname);
  }
}
