// deploy-exposure.json(이 영역의 노출 선언 정본)이 계약 Exposure를 통과하고, 이 영역의 실제 라우트(serve/Caddyfile)와 어긋나지 않는지 본다.
// 기대값의 출처: 계약 Exposure 스키마(생성 검증기)와 serve/Caddyfile. 게이트웨이 설정(deploy)은 읽지 않는다.
import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import * as v from "../generated/contract-validators.cjs";

const REPO = new URL("..", import.meta.url).pathname.replace(/\/$/, "");
const exposure = JSON.parse(readFileSync(`${REPO}/deploy-exposure.json`, "utf8"));
const caddy = readFileSync(`${REPO}/serve/Caddyfile`, "utf8");

test("deploy-exposure.json은 계약 Exposure를 통과하고 service는 admin-console이다", () => {
  assert.ok(v.Exposure(exposure), JSON.stringify(v.Exposure.errors));
  assert.equal(exposure.service, "admin-console");
});

test("선언한 메서드는 이 이미지가 실제로 받는 메서드(Caddyfile의 405 규칙)의 부분집합이다", () => {
  const m = /@unsafe not method ([A-Z ]+)\n/.exec(caddy);
  assert.ok(m, "Caddyfile에서 허용 메서드 규칙을 찾지 못했다");
  const allowed = new Set(m![1].trim().split(/\s+/)); // GET HEAD
  for (const r of exposure.routes) for (const method of r.methods ?? []) assert.ok(allowed.has(method), `${method}는 이미지가 405로 거부한다`);
  for (const r of exposure.routes) assert.ok(r.methods?.length, "메서드를 비우면 모든 메서드를 뜻한다: 이 이미지는 GET/HEAD만 받는다");
});

test("살아 있음·준비됨 경로는 인증 없이 답하므로 게이트웨이 노출 표에 넣지 않는다", () => {
  assert.match(caddy, /@health path \/healthz \/readyz/);
  for (const r of exposure.routes) for (const p of r.paths) assert.ok(!/^\/(healthz|readyz)/.test(p), p);
});

test("이미지는 /v1을 처리하지 않는다(API는 다른 서비스의 노출 표다)", () => {
  const code = caddy.split("\n").filter((l) => !l.trim().startsWith("#")).join("\n"); // 주석은 제외
  assert.doesNotMatch(code, /reverse_proxy|\/v1/);
  for (const r of exposure.routes) for (const p of r.paths) assert.ok(!p.startsWith("/v1"), p);
});

test("이 이미지는 사용자 헤더를 읽지 않는다: user_header는 strip이다", () => {
  for (const r of exposure.routes) assert.equal(r.user_header, "strip");
});
