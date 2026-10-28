// D70: /admin/ 같은 접두 아래에서도 자원을 찾도록 상대 경로를 쓴다(config.json은 AC-02로 없어졌다).
import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

test("소스에 절대 경로 config 요청이 없다, index.html의 자원은 상대 경로", () => {
  for (const f of ["app/main.ts"]) assert.ok(!/["'`]\/config\.json/.test(readFileSync(new URL(`../${f}`, import.meta.url), "utf8")), f);
  const html = readFileSync(new URL("../app/index.html", import.meta.url), "utf8");
  for (const m of html.matchAll(/(?:src|href)="([^"]+)"/g)) assert.ok(!m[1].startsWith("/"), m[1]);
});
