// schemas/(영역 내부 타입)와 고정 태그의 계약 스키마에서 app/types/를 생성한다. 손으로 고치지 않는다(DESIGN.md 3·6절).
//  - app/types/<이름>.ts            내부 타입 (json-schema-to-typescript)
//  - app/types/contract/<이름>.ts   이 영역이 쓰는 계약 타입 (같은 도구, 고정 태그의 스키마)
//  - app/types/validators.cjs(.d.cts) 내부 스키마의 Ajv standalone 검증기(CSP가 eval을 막아 런타임 컴파일 불가, ADR 0002)
// 사용: node scripts/gen-types.mjs [--check]   (--check: 생성물이 최신인지만 검사)
import Ajv from "ajv/dist/2020.js";
import standaloneCode from "ajv/dist/standalone/index.js";
import { compile } from "json-schema-to-typescript";
import { mkdtempSync, mkdirSync, readdirSync, readFileSync, writeFileSync, rmSync, existsSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { contract } from "./contract-src.mjs";

const ROOT = new URL("../", import.meta.url).pathname;
const SCHEMAS = join(ROOT, "schemas");
const OUT = join(ROOT, "app", "types");
// 이 영역이 직접 쓰는 계약 타입(요청 본문, 봉투, 오류). 응답 본문은 읽기용 내부 투영으로 받는다(schemas/README.md).
export const CONTRACT_TYPES = ["ApprovalRequest", "ActivateRequest", "CaseReviewRequest", "RollbackRequest", "ListEnvelope", "BoundaryError", "OpsFeedbackDeidentifiedTrace"];
const BANNER = "/* 생성물: scripts/gen-types.mjs (직접 고치지 않는다). 원본: schemas/ 또는 고정 태그의 계약 스키마 */\n";

export function internalNames() {
  return readdirSync(SCHEMAS).filter((f) => f.endsWith(".schema.json")).map((f) => f.replace(".schema.json", "")).sort();
}

/** 계약 스키마 전부를 태그 내용으로 읽는다(내부 스키마의 $ref 해소용). */
export function contractSchemas() {
  const out = {};
  for (const f of contract.list("schemas").filter((f) => f.endsWith(".schema.json"))) out[f] = contract.read(`schemas/${f}`);
  return out;
}

export function loadAjv() {
  const ajv = new Ajv({ strict: false, code: { source: true, esm: false }, allErrors: true });
  for (const [f, t] of Object.entries(contractSchemas())) ajv.addSchema(JSON.parse(t), f);
  for (const n of internalNames()) ajv.addSchema(JSON.parse(readFileSync(join(SCHEMAS, `${n}.schema.json`), "utf8")), `${n}.schema.json`);
  return ajv;
}

export async function generate() {
  const files = {};
  const tmp = mkdtempSync(join(tmpdir(), "admin-types-"));
  try {
    for (const [f, t] of Object.entries(contractSchemas())) writeFileSync(join(tmp, f), t);
    for (const n of internalNames()) writeFileSync(join(tmp, `${n}.schema.json`), readFileSync(join(SCHEMAS, `${n}.schema.json`), "utf8"));
    const opt = { cwd: tmp + "/", bannerComment: "", additionalProperties: false, style: { singleQuote: false }, format: true, unknownAny: true };
    for (const n of internalNames()) files[`${n}.ts`] = BANNER + (await compile(JSON.parse(readFileSync(join(SCHEMAS, `${n}.schema.json`), "utf8")), n, opt));
    for (const n of CONTRACT_TYPES) files[`contract/${n}.ts`] = BANNER + (await compile(JSON.parse(contract.read(`schemas/${n}.schema.json`)), n, opt));
  } finally {
    rmSync(tmp, { recursive: true, force: true });
  }
  const ajv = loadAjv();
  const names = internalNames();
  const code = standaloneCode(ajv, Object.fromEntries(names.map((n) => [n, `${n}.schema.json`])));
  const RUNTIME = 'require("ajv/dist/runtime/ucs2length").default';
  const inline = "(function ucs2length(str){const len=str.length;let length=0,pos=0,value;while(pos<len){length++;value=str.charCodeAt(pos++);if(value>=0xd800&&value<=0xdbff&&pos<len){value=str.charCodeAt(pos);if((value&0xfc00)===0xdc00)pos++;}}return length;})";
  // 왜 도우미를 생성물에 두나: 컴포넌트끼리 import할 수 없어(규칙 3) 검증 오류를 읽는 코드를 컴포넌트마다 복사하게 된다. 생성물은 공유해도 되는 types/ 쪽이다.
  const helpers = `\nexports.issues = function issues(fn) { return (fn.errors || []).map((e) => ({ path: e.instancePath, message: e.message || e.keyword, keyword: e.keyword })); };\nexports.assertValid = function assertValid(fn, data, what) { if (!fn(data)) throw new TypeError(what + " 입력/출력이 스키마에 맞지 않는다: " + exports.issues(fn).slice(0, 3).map((i) => (i.path || "(최상위)") + " " + i.message).join("; ")); return data; };\n`;
  files["validators.cjs"] = `// 생성물: scripts/gen-types.mjs (직접 고치지 않는다). 원본: schemas/, 계약 ${contract.tag}\n` + code.split(RUNTIME).join(inline) + helpers;
  files["validators.d.cts"] = "// 생성물: scripts/gen-types.mjs\ninterface ErrorObject { instancePath: string; schemaPath: string; message?: string; keyword: string }\nexport interface V { (data: unknown): boolean; errors?: ErrorObject[] | null }\n" + names.map((n) => `export const ${n}: V;`).join("\n") + "\nexport function issues(fn: V): { path: string; message: string; keyword: string }[];\nexport function assertValid<T>(fn: V, data: T, what: string): T;\n";
  return files;
}

if (process.argv[1] && import.meta.url === new URL(process.argv[1], "file://").href) {
  if (!contract.available()) { console.error(`../boundary-contracts에서 고정 태그 ${contract.tag}를 찾을 수 없다`); process.exit(2); }
  const files = await generate();
  if (process.argv.includes("--check")) {
    const bad = Object.entries(files).filter(([f, t]) => !existsSync(join(OUT, f)) || readFileSync(join(OUT, f), "utf8") !== t).map(([f]) => f);
    const extra = existsSync(OUT) ? [...readdirSync(OUT).filter((f) => (f.endsWith(".ts") || f.endsWith(".cjs") || f.endsWith(".cts")) && !f.startsWith("contract-validators.")).filter((f) => !(f in files)), ...(existsSync(join(OUT, "contract")) ? readdirSync(join(OUT, "contract")).map((f) => `contract/${f}`).filter((f) => !(f in files)) : [])] : [];
    if (bad.length || extra.length) { console.error(`app/types/가 최신이 아니다: ${[...bad, ...extra].join(", ")}\n  node scripts/gen-types.mjs`); process.exit(1); }
    console.log("types 최신");
  } else {
    // 계약 검증기(contract-validators.*)는 gen-schemas.mjs의 생성물이라 지우지 않는다.
    for (const f of existsSync(OUT) ? readdirSync(OUT) : []) if (!f.startsWith("contract-validators.")) rmSync(join(OUT, f), { recursive: true, force: true });
    mkdirSync(join(OUT, "contract"), { recursive: true });
    for (const [f, t] of Object.entries(files)) writeFileSync(join(OUT, f), t);
    console.log(`written ${Object.keys(files).length} files`);
  }
}
