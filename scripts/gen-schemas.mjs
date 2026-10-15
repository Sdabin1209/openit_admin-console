// 문진 스키마(../survey-service/schema/schemas, 읽기 전용)에서 입력·출력 검증기를 생성한다.
// 브라우저 CSP(script-src 'self')에서 eval 없이 쓰려고 Ajv standalone 코드를 만든다.
// 사용: node scripts/gen-schemas.mjs [--check]   (--check: 생성물이 최신인지만 검사)
import Ajv from "ajv/dist/2020.js";
import standaloneCode from "ajv/dist/standalone/index.js";
import { createHash } from "node:crypto";
import { existsSync, readFileSync, writeFileSync, mkdirSync } from "node:fs";

const SRC = new URL("../../survey-service/schema/", import.meta.url);
const OUT = new URL("../generated/survey-validators.cjs", import.meta.url);
const NAMES = ["UtteranceParserInput", "ResponseGeneratorInput", "ParserOutput", "GeneratorOutput"];

export function generate() {
  const contract = readFileSync(new URL("CONTRACT_VERSION", SRC), "utf8").trim();
  const ajv = new Ajv({ strict: false, code: { source: true, esm: false }, allErrors: true });
  const sources = {};
  for (const n of NAMES) {
    const text = readFileSync(new URL(`schemas/${n}.json`, SRC), "utf8");
    sources[n] = createHash("sha256").update(text).digest("hex");
    ajv.addSchema(JSON.parse(text), n);
  }
  const code = standaloneCode(ajv, Object.fromEntries(NAMES.map((n) => [n, n])));
  const header = `// 생성물: scripts/gen-schemas.mjs (직접 고치지 않는다). 원본: survey-service/schema CONTRACT_VERSION=${contract}\n// source-sha256: ${JSON.stringify(sources)}\n`;
  return header + code;
}

if (process.argv[1] && import.meta.url === new URL(process.argv[1], "file://").href) {
  if (!existsSync(new URL("schemas/", SRC))) { console.error("survey-service/schema를 찾을 수 없다"); process.exit(2); }
  const out = generate();
  if (process.argv.includes("--check")) {
    const cur = existsSync(OUT) ? readFileSync(OUT, "utf8") : "";
    if (cur !== out) { console.error("generated/survey-validators.cjs가 최신이 아니다: node scripts/gen-schemas.mjs"); process.exit(1); }
    console.log("generated 최신");
  } else {
    mkdirSync(new URL("../generated/", import.meta.url), { recursive: true });
    writeFileSync(OUT, out);
    console.log("written", OUT.pathname);
  }
}
