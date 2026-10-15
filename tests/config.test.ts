// D70: /admin/ 같은 접두 아래에서도 config.json을 찾도록 상대 경로로 읽는다.
import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { CONFIG_URL, loadDevApprover } from "../app/config.ts";

test("config.json은 상대 경로이고 /admin/ 아래에서 /admin/config.json으로 풀린다", async () => {
  assert.ok(!CONFIG_URL.startsWith("/") && !/^[a-z]+:/i.test(CONFIG_URL));
  assert.equal(new URL(CONFIG_URL, "https://host/admin/").pathname, "/admin/config.json");
  assert.equal(new URL(CONFIG_URL, "https://host/").pathname, "/config.json");
  let asked = "";
  const fake = (async (u: string) => { asked = u; return new Response(JSON.stringify({ dev_approver_id: "dev-1" })); }) as unknown as typeof fetch;
  assert.equal(await loadDevApprover(fake), "dev-1");
  assert.equal(asked, "config.json");
  const down = (async () => { throw new Error("x"); }) as unknown as typeof fetch;
  assert.equal(await loadDevApprover(down), null);
});

test("소스에 절대 경로 config 요청이 없다, index.html의 자원은 상대 경로", () => {
  for (const f of ["app/config.ts", "app/main.ts"]) assert.ok(!/["'`]\/config\.json/.test(readFileSync(new URL(`../${f}`, import.meta.url), "utf8")), f);
  const html = readFileSync(new URL("../app/index.html", import.meta.url), "utf8");
  for (const m of html.matchAll(/(?:src|href)="([^"]+)"/g)) assert.ok(!m[1].startsWith("/"), m[1]);
});
