// 생성된 검증기가 원본(../boundary-contracts/schemas)과 어긋나지 않았는지 확인하고, 복사본을 두지 않았음을 확인한다.
import { test } from "node:test";
import assert from "node:assert/strict";
import { existsSync, readFileSync, readdirSync } from "node:fs";

const src = new URL("../../boundary-contracts/schemas/", import.meta.url);

test("generated/contract-validators.cjs가 원본 스키마와 같다", { skip: !existsSync(src) && "boundary-contracts가 없는 환경" }, async () => {
  const { generate } = await import("../scripts/gen-schemas.mjs");
  const cur = readFileSync(new URL("../generated/contract-validators.cjs", import.meta.url), "utf8");
  assert.equal(cur, generate(), "node scripts/gen-schemas.mjs 로 다시 생성하라");
});

test("스키마 JSON 복사본을 리포에 두지 않았다", () => {
  const walk = (d: URL, out: string[] = []): string[] => {
    for (const e of readdirSync(d, { withFileTypes: true })) {
      if (["node_modules", ".git", "dist"].includes(e.name)) continue;
      // 왜: docs/change-requests/schemas는 계약 스키마의 복사본이 아니라 이 영역이 헤드에게 제안하는 새 스키마 초안이다(CR-006).
      if (e.isDirectory() && e.name === "schemas" && d.pathname.endsWith("/docs/change-requests/")) continue;
      // 왜: contract-ready/schemas는 wo6에서 헤드에게 넘긴 승격 제출본의 기록이다. 계약 v2.2.0에 올라갔고 코드는 읽지 않는다(정본은 계약 패키지).
      if (e.isDirectory() && e.name === "schemas" && d.pathname.endsWith("/docs/change-requests/contract-ready/")) continue;
      if (e.isDirectory()) walk(new URL(e.name + "/", d), out);
      else if (/\.schema\.json$/.test(e.name) || /^(ActionExtractionInput|ActionExtraction|ResponseRequest|ResponseText|TurnTrace)\.json$/.test(e.name)) out.push(e.name);
    }
    return out;
  };
  assert.deepEqual(walk(new URL("../", import.meta.url)), []);
});
