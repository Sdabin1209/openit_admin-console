// 규칙 U82 사람 인증(ADR 0014 OIDC, 이 영역 ADR 0029): 401 -> 로그인 안내, 403 ACCOUNT_PENDING_APPROVAL -> 승인 대기 화면, userinfo 표시, admin만 계정 승인 링크, 로그아웃 주소.
// 게이트웨이(oauth2-proxy, Keycloak)는 모의 서버가 흉내 낸다. 실제 IdP와의 로그인은 시험하지 않았다(deploy E2E 몫).
import { test, beforeEach } from "node:test";
import assert from "node:assert/strict";
import { JSDOM } from "jsdom";
import { startMock } from "./helpers.ts";
import { AuthClient, GateClient, onAuthError } from "../app/wiring/gateway.ts";
import { AuthController } from "../app/wiring/auth_controller.ts";
import { toError } from "../app/components/link_http_send.ts";
import { loginUrl, logoutUrl, sessionView, ADMIN_CONSOLE_URL } from "../app/components/session_view.ts";

const dom = new JSDOM('<!doctype html><div id="who"></div><main id="app"></main>', { url: "http://localhost/admin/" });
Object.assign(globalThis, { document: dom.window.document, window: dom.window, location: dom.window.location });
beforeEach(() => { dom.window.document.querySelector("#app")!.replaceChildren(); dom.window.document.querySelector("#who")!.replaceChildren(); });
const { renderAuthNotice, renderWho } = await import("../app/ui/auth_view.ts");
const q = <T extends Element = HTMLElement>(sel: string) => dom.window.document.querySelector(sel) as T | null;

async function open(setup: (m: Awaited<ReturnType<typeof startMock>>["mock"]) => void = () => {}) {
  const s = await startMock();
  setup(s.mock);
  const c = new AuthController(new AuthClient({ baseUrl: s.base }));
  const off = onAuthError((k) => c.onApiError(k));
  const paint = () => { renderWho(q("#who")!, c); renderAuthNotice(q("#app")!, c, "/admin/#/results/s-1"); };
  c.subscribe(paint);
  await c.load();
  return { s, c, off };
}

test("userinfo: 이름과 역할이 보이고, admin이 아니면 계정 승인 링크가 없다, 로그아웃 링크는 oauth2 sign_out으로 간다", async () => {
  const { s, c, off } = await open();
  try {
    assert.equal(c.state.phase, "signed-in");
    assert.equal(q("#who-user")!.textContent, "kim@hospital.kr");
    assert.equal(q("#who-roles")!.textContent, "(clinician, reviewer)");
    assert.equal(q("#admin-approve-link"), null);
    assert.equal(q("#logout-link")!.getAttribute("href"), logoutUrl());
    assert.equal(logoutUrl("https://clinic.example"), "/oauth2/sign_out?rd=" + encodeURIComponent("/auth/realms/openit/protocol/openid-connect/logout?client_id=openit-gateway&post_logout_redirect_uri=" + encodeURIComponent("https://clinic.example/")));
    assert.equal(q("#logout-link")!.getAttribute("href"), logoutUrl("http://localhost"), "현재 출처(window.location.origin)를 쓴다");
  } finally { off(); await s.close(); }
});

test("admin 역할이면 계정 승인 링크(Keycloak 관리 화면)가 보인다", async () => {
  const { s, off } = await open((m) => m.auth.user(["admin", "/clinician"]));
  try {
    const a = q("#admin-approve-link")!;
    assert.equal(a.getAttribute("href"), ADMIN_CONSOLE_URL);
    assert.equal(ADMIN_CONSOLE_URL, "/auth/admin/openit/console/#/openit/users");
    assert.equal(q("#who-roles")!.textContent, "(admin, clinician)", "그룹 경로의 앞 /는 뗀다");
  } finally { off(); await s.close(); }
});

test("401이면 로그인 안내와 /oauth2/start?rd=<현재 경로> 링크가 보이고 비밀번호 입력란은 없다", async () => {
  const { s, c, off } = await open((m) => m.auth.mode("anon"));
  try {
    assert.equal(c.state.phase, "login-needed");
    assert.equal(q("#login-link")!.getAttribute("href"), "/oauth2/start?rd=%2Fadmin%2F%23%2Fresults%2Fs-1");
    assert.equal(dom.window.document.querySelectorAll('input[type="password"], input').length, 0);
    assert.equal(loginUrl("/a?b=1"), "/oauth2/start?rd=%2Fa%3Fb%3D1");
  } finally { off(); await s.close(); }
});

test("403 ACCOUNT_PENDING_APPROVAL이면 가입 승인 대기 화면이 보인다(userinfo가 아니라 일반 API 호출에서도)", async () => {
  const { s, c, off } = await open();
  try {
    assert.equal(c.state.phase, "signed-in");
    s.mock.auth.mode("pending");
    await assert.rejects(new GateClient({ baseUrl: s.base }).listAwaiting(), (e: Error & { kind?: string }) => e.kind === "ACCOUNT_PENDING");
    assert.equal(c.state.phase, "pending");
    assert.ok(q("#auth-pending h2")!.textContent!.includes("가입 승인 대기 중"));
    assert.ok(q("#logout-link"));
  } finally { off(); await s.close(); }
});

test("역할이 없는 계정의 userinfo(groups 빈 목록)도 승인 대기 화면이다, 일반 403(역할 부족)은 승인 대기가 아니다", async () => {
  const { s, c, off } = await open((m) => m.auth.mode("pending"));
  try {
    assert.equal(c.state.phase, "pending");
    assert.ok(q("#auth-pending"));
    assert.equal(sessionView({ email: "x@y" }).roles.length, 0);
  } finally { off(); await s.close(); }
  const t = await startMock();
  try {
    t.mock.results.setClinician(false);
    const c2 = new AuthController(new AuthClient({ baseUrl: t.base }));
    const off2 = onAuthError((k) => c2.onApiError(k));
    await fetch(t.base + "/v1/results").then((r) => assert.equal(r.status, 403));
    assert.equal(c2.state.phase, "loading", "역할 부족 403은 로그인 상태를 바꾸지 않는다");
    off2();
  } finally { await t.close(); }
});

test("오류 분류: 401은 UNAUTHENTICATED, 403은 details.reason이 ACCOUNT_PENDING_APPROVAL일 때만 ACCOUNT_PENDING, 그 밖의 403은 PERMISSION_DENIED", () => {
  assert.equal(toError(401, null).kind, "UNAUTHENTICATED");
  assert.equal(toError(403, { code: "PERMISSION_DENIED", details: { reason: "ACCOUNT_PENDING_APPROVAL" } }).kind, "ACCOUNT_PENDING");
  assert.equal(toError(403, { code: "PERMISSION_DENIED", details: { reason: "OTHER" } }).kind, "PERMISSION_DENIED");
  assert.equal(toError(403, { code: "PERMISSION_DENIED", message: "ACCOUNT_PENDING_APPROVAL" }).kind, "PERMISSION_DENIED", "문자열 검색은 하지 않는다");
});
