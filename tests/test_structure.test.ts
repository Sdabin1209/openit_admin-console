// 구조 검사(DESIGN.md 6절, D117). 헤드 도구 head/scripts/structure-check.py와 같은 기준을 더 엄격하게 본다.
import { test } from "node:test";
import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import { join, relative, basename } from "node:path";
import { contract } from "../scripts/contract-src.mjs";
import { loadAjv, internalNames } from "../scripts/gen-types.mjs";

const ROOT = new URL("../", import.meta.url).pathname;
const walk = (dir: string): string[] => readdirSync(dir).flatMap((f) => {
  const p = join(dir, f);
  return statSync(p).isDirectory() ? walk(p) : [p];
});
const rel = (p: string) => relative(ROOT, p);
const codeFiles = () => ["app", "mock-server"].filter((d) => existsSync(join(ROOT, d))).flatMap((d) => walk(join(ROOT, d))).map(rel).filter((f) => f.endsWith(".ts") && !f.endsWith(".d.ts"));
const COMPONENTS = "app/components/";

test("1. schemas/, types/, components/, wiring/이 있다", () => {
  for (const d of ["schemas", "app/types", "app/components", "app/wiring"]) assert.ok(existsSync(join(ROOT, d)), `${d}/ 없음`);
});

test("2. components/의 파일은 다른 components/ 파일을 import하지 않는다", () => {
  const comps = codeFiles().filter((f) => f.startsWith(COMPONENTS));
  assert.ok(comps.length > 0);
  for (const f of comps) {
    const src = readFileSync(join(ROOT, f), "utf8");
    for (const m of src.matchAll(/(?:from|import)\s*\(?\s*["']([^"']+)["']/g)) {
      const spec = m[1];
      if (!spec.startsWith(".")) continue;
      const target = join(f, "..", spec).replace(/\\/g, "/");
      assert.ok(!target.startsWith(COMPONENTS), `${f}가 다른 컴포넌트 ${spec}를 import한다`);
      assert.ok(!/\/(wiring|ui)\//.test(target), `${f}가 wiring을 import한다: ${spec}`);
    }
  }
});

test("3. HTTP(fetch, node:http)는 link_* 컴포넌트 밖에 없다", () => {
  for (const f of codeFiles()) {
    if (basename(f).startsWith("link_") && f.startsWith(COMPONENTS)) continue;
    if (f.startsWith("mock-server/")) continue; // 시험용 가짜 게이트(이웃의 메모리 구현에 해당). 앱 코드가 아니다.
    const src = readFileSync(join(ROOT, f), "utf8");
    assert.ok(!/\bfetch\s*\(|from\s+["'](node:)?https?["']|\bXMLHttpRequest\b/.test(src), `${f}에 HTTP가 있다`);
  }
});

test("4. 모든 스키마에 통과·거부 예시가 있고 결과가 맞다", { skip: !contract.available() && "고정 태그의 계약 리포가 없다" }, () => {
  const ajv = loadAjv();
  const names = internalNames();
  assert.ok(names.length > 0);
  const ex = readdirSync(join(ROOT, "schemas/examples"));
  for (const n of names) {
    const valid = ex.filter((f) => f.startsWith(`${n}.valid`));
    const invalid = ex.filter((f) => f.startsWith(`${n}.invalid`));
    assert.ok(valid.length > 0 && invalid.length > 0, `${n}: 예시가 모두 있지 않다`);
    const fn = ajv.getSchema(`${n}.schema.json`)!;
    for (const f of valid) assert.ok(fn(JSON.parse(readFileSync(join(ROOT, "schemas/examples", f), "utf8"))), `${f}는 통과해야 한다: ${JSON.stringify(fn.errors?.slice(0, 2))}`);
    for (const f of invalid) assert.ok(!fn(JSON.parse(readFileSync(join(ROOT, "schemas/examples", f), "utf8"))), `${f}는 거부되어야 한다`);
  }
  for (const f of ex) assert.ok(names.includes(f.split(".")[0]), `${f}: 짝이 되는 스키마가 없다`);
});

test("5. types/가 schemas/에서 다시 생성한 결과와 같다", { skip: !contract.available() && "고정 태그의 계약 리포가 없다" }, () => {
  execFileSync("node", ["scripts/gen-types.mjs", "--check"], { cwd: ROOT, stdio: "pipe" });
});

test("6. 시험을 뺀 모든 코드 파일이 components/, wiring/, types/, ui/ 또는 진입점 중 하나에 속한다", () => {
  const ENTRY = /^app\/main\.ts$/;
  for (const f of codeFiles()) {
    if (f.startsWith("mock-server/")) continue; // 위 3번과 같은 이유로 시험 지원 코드
    assert.ok(/^app\/(components|wiring|types|ui)\//.test(f) || ENTRY.test(f), `${f}가 어디에도 속하지 않는다`);
  }
});
