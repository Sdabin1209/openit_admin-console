// 게이트웨이 CSRF 방어(Sec-Fetch-Site same-origin|none, Origin == 요청 출처)와 Referrer-Policy: no-referrer 아래에서
// 모든 상태 변경 요청이 fetch 기본 모드(cors)로 나가 Origin이 출처 값(null 아님)이 되게 하는 규칙을 고정한다.
import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { Http } from "./helpers.ts";

import { appSourceFiles } from "./helpers.ts";
const files = appSourceFiles();

test("Origin: null이 될 수 있는 전송 방식(form POST·sendBeacon·no-cors·XHR·서비스 워커)을 쓰지 않는다", () => {
  for (const f of [...files]) {
    const t = readFileSync(new URL(`../${f}`, import.meta.url), "utf8").replace(/\/\/.*$/gm, "");
    assert.ok(!/sendBeacon|no-cors|XMLHttpRequest|<form|\.submit\(\)|serviceWorker|keepalive/.test(t.replace(/c\.submit\(\)/g, "")), `${f}: CSRF 호환을 깨는 전송 방식`);
  }
  assert.ok(!/<form/i.test(readFileSync(new URL("../app/index.html", import.meta.url), "utf8")));
});

test("Http.json은 mode·referrer 옵션 없이 same-origin 자격으로 fetch한다(기본 mode=cors → Origin: https://호스트)", async () => {
  const seen: RequestInit[] = [];
  const h = new Http({ fetch: (async (_u: string, init: RequestInit) => { seen.push(init); return new Response("{}", { status: 200 }); }) as any });
  await h.json("POST", "/v1/approvals", { a: 1 });
  assert.equal(seen[0].method, "POST");
  assert.equal(seen[0].credentials, "same-origin");
  for (const k of ["mode", "referrer", "referrerPolicy", "keepalive", "redirect"]) assert.equal((seen[0] as any)[k], undefined, k);
});
