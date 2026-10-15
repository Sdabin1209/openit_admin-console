// 생성된 검증기가 원본(../survey-service/schema)과 어긋나지 않았는지 확인하고, 복사본을 두지 않았음을 확인한다.
import { test } from "node:test";
import assert from "node:assert/strict";
import { existsSync, readFileSync, readdirSync } from "node:fs";

const src = new URL("../../survey-service/schema/schemas/", import.meta.url);

test("generated/survey-validators.cjs가 원본 스키마와 같다", { skip: !existsSync(src) && "survey-service/schema가 없는 환경" }, async () => {
  const { generate } = await import("../scripts/gen-schemas.mjs");
  const cur = readFileSync(new URL("../generated/survey-validators.cjs", import.meta.url), "utf8");
  assert.equal(cur, generate(), "node scripts/gen-schemas.mjs 로 다시 생성하라");
});

test("스키마 JSON 복사본을 리포에 두지 않았다", () => {
  const walk = (d: URL, out: string[] = []): string[] => {
    for (const e of readdirSync(d, { withFileTypes: true })) {
      if (["node_modules", ".git", "dist"].includes(e.name)) continue;
      if (e.isDirectory()) walk(new URL(e.name + "/", d), out);
      else if (/\.schema\.json$/.test(e.name) || /^(UtteranceParserInput|ResponseGeneratorInput|ParserOutput|GeneratorOutput|TurnTrace)\.json$/.test(e.name)) out.push(e.name);
    }
    return out;
  };
  assert.deepEqual(walk(new URL("../", import.meta.url)), []);
});
