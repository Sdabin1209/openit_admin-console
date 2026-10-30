// 생성된 검증기가 원본(../boundary-contracts의 고정 태그 내용)과 어긋나지 않았는지 확인하고, 복사본을 두지 않았음을 확인한다.
import { contract } from "../scripts/contract-src.mjs";
import { test } from "node:test";
import assert from "node:assert/strict";
import { existsSync, readFileSync, readdirSync } from "node:fs";


test("generated/contract-validators.cjs가 원본 스키마와 같다", { skip: !contract.available() && "고정 태그를 가진 boundary-contracts가 이웃에 없는 환경" }, async () => {
  const { generate } = await import("../scripts/gen-schemas.mjs");
  const cur = readFileSync(new URL("../app/types/contract-validators.cjs", import.meta.url), "utf8");
  assert.equal(cur, generate(), "node scripts/gen-schemas.mjs 로 다시 생성하라");
});

// 승격된 경계 스키마의 사본은 U49에서 지웠다. 정본은 계약 패키지 하나다. 예외 폴더를 두지 않는다.
// schemas/는 이 영역 내부 타입의 스키마(D117)라서 있어도 되지만, 계약 스키마와 같은 이름이면 복사본이다.
test("스키마 JSON 복사본을 리포에 두지 않았다", { skip: !contract.available() && "고정 태그를 가진 boundary-contracts가 이웃에 없는 환경" }, () => {
  const contractNames = new Set(contract.list("schemas").map((f) => f.replace(/\.schema\.json$/, "")));
  const walk = (d: URL, out: string[] = []): string[] => {
    for (const e of readdirSync(d, { withFileTypes: true })) {
      if (["node_modules", ".git", "dist"].includes(e.name)) continue;
      if (e.isDirectory()) walk(new URL(e.name + "/", d), out);
      else if (/\.schema\.json$/.test(e.name) || /^(ActionExtractionInput|ActionExtraction|ResponseRequest|ResponseText|TurnTrace)\.json$/.test(e.name)) {
        if (!d.pathname.endsWith("/schemas/") || contractNames.has(e.name.replace(/\.schema\.json$/, ""))) out.push(d.pathname + e.name);
      }
    }
    return out;
  };
  assert.deepEqual(walk(new URL("../", import.meta.url)), []);
});
