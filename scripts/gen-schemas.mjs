// 계약 패키지 스키마(../boundary-contracts/schemas, 읽기 전용, 2.0.0부터 모델 입출력은 여기 있다)에서 LoRA-A/B 입력·출력 검증기를 생성한다.
// 브라우저 CSP(script-src 'self')에서 eval 없이 쓰려고 Ajv standalone 코드를 만든다.
// 사용: node scripts/gen-schemas.mjs [--check]   (--check: 생성물이 최신인지만 검사)
import Ajv from "ajv/dist/2020.js";
import standaloneCode from "ajv/dist/standalone/index.js";
import { createHash } from "node:crypto";
import { existsSync, readFileSync, writeFileSync, mkdirSync } from "node:fs";

const SRC = new URL("../../boundary-contracts/", import.meta.url);
const OUT = new URL("../generated/contract-validators.cjs", import.meta.url);
const NAMES = ["ActionExtractionInput", "ActionExtraction", "ResponseRequest", "ResponseText"];

export function generate() {
  const contract = /^version\s*=\s*"([^"]+)"/m.exec(readFileSync(new URL("pyproject.toml", SRC), "utf8"))?.[1] ?? "unknown";
  const ajv = new Ajv({ strict: false, code: { source: true, esm: false }, allErrors: true });
  const sources = {};
  for (const n of NAMES) {
    const text = readFileSync(new URL(`schemas/${n}.schema.json`, SRC), "utf8");
    sources[n] = createHash("sha256").update(text).digest("hex");
    ajv.addSchema(JSON.parse(text), n);
  }
  const code = standaloneCode(ajv, Object.fromEntries(NAMES.map((n) => [n, n])));
  const header = `// 생성물: scripts/gen-schemas.mjs (직접 고치지 않는다). 원본: boundary-contracts ${contract}\n// source-sha256: ${JSON.stringify(sources)}\n`;
  return header + code;
}

if (process.argv[1] && import.meta.url === new URL(process.argv[1], "file://").href) {
  if (!existsSync(new URL("schemas/", SRC))) { console.error("boundary-contracts/schemas를 찾을 수 없다"); process.exit(2); }
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
