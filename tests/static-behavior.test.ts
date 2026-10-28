// 정적 서버가 지켜야 할 동작(보안 헤더, /healthz·/readyz, 메서드, 경로 이탈). 서버 구현(이미지)과 무관하게 같은 시험이다.
// STATIC_URL이 없으면 건너뛴다: scripts/smoke.sh가 빌드한 이미지에 대해 이 시험을 돌린다(npm run smoke).
import { test } from "node:test";
import assert from "node:assert/strict";

const base = process.env.STATIC_URL;
const skip = !base && "STATIC_URL 없음(npm run smoke가 이미지를 띄워 지정한다)";
const get = (p: string, init?: RequestInit) => fetch(base + p, init);

// 왜 이 값들인가: 정본은 docs/adr/0006(헤더의 이유)이고 0018(Caddy로 옮기며 같은 값을 유지).
const SECURITY: Record<string, string> = {
  "cache-control": "no-store",
  "x-content-type-options": "nosniff",
  "referrer-policy": "no-referrer",
  "content-security-policy": "default-src 'self'; script-src 'self'; style-src 'self'; connect-src 'self'; base-uri 'none'; form-action 'none'; frame-ancestors 'none'",
};
function assertSecurity(r: Response) {
  for (const [k, v] of Object.entries(SECURITY)) assert.equal(r.headers.get(k), v, k);
}

test("/healthz, /readyz: 200 {\"status\":\"ok\"} JSON", { skip }, async () => {
  for (const p of ["/healthz", "/readyz"]) {
    const r = await get(p);
    assert.equal(r.status, 200);
    assert.match(r.headers.get("content-type") ?? "", /^application\/json/);
    assert.equal(await r.text(), '{"status":"ok"}');
  }
});

test("/: index.html을 보안 헤더와 함께 낸다", { skip }, async () => {
  const r = await get("/");
  assert.equal(r.status, 200);
  assert.match(r.headers.get("content-type") ?? "", /^text\/html; charset=utf-8/);
  assertSecurity(r);
  assert.match(await r.text(), /app\.js/);
});

test("/app.js: 자바스크립트 MIME과 보안 헤더", { skip }, async () => {
  const r = await get("/app.js");
  assert.equal(r.status, 200);
  assert.match(r.headers.get("content-type") ?? "", /^(text|application)\/javascript/);
  assertSecurity(r);
});

test("없는 경로: 404 not found, 보안 헤더 유지", { skip }, async () => {
  const r = await get("/없는-파일.js");
  assert.equal(r.status, 404);
  assertSecurity(r);
  assert.equal(await r.text(), "not found");
});

test("GET/HEAD 외 메서드는 405", { skip }, async () => {
  for (const m of ["POST", "PUT", "DELETE"]) assert.equal((await get("/", { method: m })).status, 405, m);
});

test("HEAD: 본문 없이 200과 같은 헤더", { skip }, async () => {
  const r = await get("/", { method: "HEAD" });
  assert.equal(r.status, 200);
  assertSecurity(r);
  assert.equal(await r.text(), "");
});

test("/v1은 처리하지 않는다(게이트웨이 몫): 404", { skip }, async () => {
  assert.equal((await get("/v1/submissions")).status, 404);
});
