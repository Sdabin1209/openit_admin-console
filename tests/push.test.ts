// 규칙 U92 결과 탭 웹 푸시(계약 3.4.0): 구독 등록(topics results), 해지, push-config null 안내, RESULT_READY 알림(tag result-+id)과 클릭 이동, pause_reason 표시.
// 브라우저의 PushManager·서비스 워커는 가짜 포트로 대신한다(실제 브라우저·푸시 서비스는 시험하지 않았다). HTTP는 모의 서버로 실제로 보낸다.
import { test, beforeEach } from "node:test";
import assert from "node:assert/strict";
import { JSDOM } from "jsdom";
import { startMock, waitFor } from "./helpers.ts";
import { PushClient, ResultsClient } from "../app/wiring/gateway.ts";
import { PushController, decodeVapidKey, type PushPorts, type SubscriptionLike } from "../app/wiring/push_controller.ts";
import { ResultsController } from "../app/wiring/results_controller.ts";
import { installPushHandlers, type SwScope, type WindowLike } from "../app/wiring/sw_handlers.ts";
import { pushNotice } from "../app/components/push_notice.ts";
import { sessionResult } from "./mock-server/results.ts";

const dom = new JSDOM('<!doctype html><main id="app"></main>', { url: "http://localhost/admin/" });
Object.assign(globalThis, { document: dom.window.document, window: dom.window, location: dom.window.location });
beforeEach(() => { dom.window.document.querySelector("#app")!.replaceChildren(); });
const { renderResults } = await import("../app/ui/results_view.ts");
const q = <T extends Element = HTMLElement>(sel: string) => dom.window.document.querySelector(sel) as T | null;

const EP = "https://push.example/endpoint-1";
function fakePorts(o: { supported?: boolean; permission?: string; request?: string } = {}) {
  let sub: SubscriptionLike | null = null;
  const log: string[] = [];
  const ports: PushPorts = {
    supported: o.supported ?? true,
    permission: () => o.permission ?? "default",
    requestPermission: async () => { log.push("ask"); return o.request ?? "granted"; },
    getSubscription: async () => sub,
    subscribe: async (key) => {
      log.push(`subscribe:${key.length}`);
      sub = { endpoint: EP, toJSON: () => ({ endpoint: EP, keys: { p256dh: "pk", auth: "au" } }), unsubscribe: async () => { log.push("browser-unsub"); sub = null; return true; } };
      return sub;
    },
  };
  return { ports, log };
}
const setup = async (po: Parameters<typeof fakePorts>[0] = {}) => {
  const s = await startMock();
  const f = fakePorts(po);
  const push = new PushController(new PushClient({ baseUrl: s.base }), f.ports);
  const c = new ResultsController(new ResultsClient({ baseUrl: s.base }));
  const root = q("#app")!;
  c.subscribe(() => renderResults(root, c, push)); push.subscribe(() => renderResults(root, c, push));
  await c.openList(); await push.refresh();
  return { s, push, c, root, ...f };
};

test("구독: 켜기를 누르면 endpoint·keys와 topics [results]가 서버에 간다, 해지하면 서버와 브라우저에서 지워진다", async () => {
  const { s, push, root, log } = await setup();
  try {
    assert.equal(push.state.phase, "idle");
    q("#push-enable")!.click();
    await waitFor(() => push.state.phase !== "busy", "켜기 끝");
    assert.equal(push.state.phase, "subscribed", push.state.message ?? "");
    const subs = s.mock.results.pushSubs();
    assert.equal(subs.length, 1);
    assert.deepEqual(subs[0], { endpoint: EP, keys: { p256dh: "pk", auth: "au" }, topics: ["results"] });
    assert.ok(log.includes("subscribe:65"), "공개키가 65바이트 P-256 점으로 풀린다");
    assert.ok(q("#push-disable") && !q("#push-enable"));
    q("#push-disable")!.click();
    await waitFor(() => push.state.phase !== "busy", "끄기 끝");
    assert.equal(push.state.phase, "idle");
    assert.equal(s.mock.results.pushSubs().length, 0);
    assert.ok(log.includes("browser-unsub"));
    assert.ok(root.querySelector("#push-enable"));
  } finally { await s.close(); }
});

test("push-config의 키가 null이면 푸시 꺼짐 안내를 보이고 켜기 버튼이 없다", async () => {
  const s = await startMock();
  try {
    s.mock.results.setVapid(null);
    const f = fakePorts();
    const push = new PushController(new PushClient({ baseUrl: s.base }), f.ports);
    const c = new ResultsController(new ResultsClient({ baseUrl: s.base }));
    const root = q("#app")!;
    c.subscribe(() => renderResults(root, c, push)); push.subscribe(() => renderResults(root, c, push));
    await c.openList(); await push.refresh();
    assert.equal(push.state.phase, "server-off");
    assert.ok(q("#push-status")!.textContent!.includes("꺼져 있다"));
    assert.equal(q("#push-enable"), null);
  } finally { await s.close(); }
});

test("권한 거부·미지원·clinician 아님(403)은 안내하고 서버에 등록하지 않는다", async () => {
  const d = await setup({ request: "denied" });
  try {
    q("#push-enable")!.click(); await waitFor(() => d.push.state.phase !== "busy", "켜기 끝");
    assert.equal(d.push.state.phase, "denied"); assert.equal(d.s.mock.results.pushSubs().length, 0);
  } finally { await d.s.close(); }
  const u = await setup({ supported: false });
  try { assert.equal(u.push.state.phase, "unsupported"); assert.equal(q("#push-enable"), null); } finally { await u.s.close(); }
  const f = await setup();
  try {
    f.s.mock.results.setClinician(false);
    await f.push.enable();
    assert.equal(f.push.state.phase, "error");
    assert.ok(f.log.includes("browser-unsub"), "서버 등록 실패면 브라우저 구독도 되돌린다");
  } finally { await f.s.close(); }
});

test("decodeVapidKey: base64url을 바이트로 푼다", () => {
  assert.deepEqual([...decodeVapidKey("AQID")], [1, 2, 3]);
  assert.deepEqual([...decodeVapidKey("-_8")], [251, 255]);
});

function fakeSw(wins: WindowLike[] = []) {
  const h = new Map<string, (e: never) => void>();
  const shown: { title: string; body: string; tag: string; data: { url: string } }[] = [];
  const opened: string[] = [];
  const sw: SwScope = {
    registration: { scope: "http://localhost/admin/", showNotification: async (title, o) => { shown.push({ title, ...o }); } },
    clients: { matchAll: async () => wins, openWindow: async (u) => { opened.push(u); } },
    addEventListener: (t, fn) => { h.set(t, fn); },
  };
  installPushHandlers(sw);
  const waits: Promise<unknown>[] = [];
  const fire = (t: string, e: object) => { (h.get(t) as (e: unknown) => void)({ ...e, waitUntil: (p: Promise<unknown>) => waits.push(p) }); return Promise.all(waits); };
  return { shown, opened, fire };
}

test("서비스 워커: RESULT_READY를 받으면 tag result-+session_id 알림을 띄우고, 클릭하면 결과 상세로 간다", async () => {
  const w = fakeSw();
  await w.fire("push", { data: { json: () => ({ kind: "RESULT_READY", session_id: "s-7" }) } });
  assert.equal(w.shown.length, 1);
  assert.equal(w.shown[0].tag, "result-s-7");
  assert.ok(w.shown[0].body.includes("s-7") && w.shown[0].title.includes("문진 결과"));
  assert.equal(w.shown[0].data.url, "http://localhost/admin/#/results/s-7");
  let closed = false;
  await w.fire("notificationclick", { notification: { close: () => { closed = true; }, data: w.shown[0].data } });
  assert.ok(closed);
  assert.deepEqual(w.opened, ["http://localhost/admin/#/results/s-7"], "열린 창이 없으면 새 창");
});

test("서비스 워커: 열린 콘솔 창이 있으면 그 창을 앞으로 가져와 결과 상세로 이동한다", async () => {
  const nav: string[] = []; let focused = false;
  const win: WindowLike = { url: "http://localhost/admin/#/ops", focus: async () => { focused = true; }, navigate: async (u) => { nav.push(u); } };
  const w = fakeSw([win]);
  await w.fire("notificationclick", { notification: { close() {}, data: { url: "http://localhost/admin/#/results/s-7" } } });
  assert.ok(focused); assert.deepEqual(nav, ["http://localhost/admin/#/results/s-7"]); assert.deepEqual(w.opened, []);
});

test("push_notice: 깨진 본문·session_id 없음은 일반 문구, 모르는 kind는 그대로, 환자 값은 담지 않는다", () => {
  assert.deepEqual(pushNotice(null), { title: "알림", body: "새 알림이 있습니다", tag: "staff-alert", sessionId: null });
  assert.equal(pushNotice({ kind: "RESULT_READY" }).sessionId, null);
  assert.equal(pushNotice({ session_id: "s-1", kind: "FUTURE_KIND", alert_id: "a-1" }).title, "FUTURE_KIND");
  assert.equal(pushNotice({ session_id: "s-1", kind: "FUTURE_KIND", alert_id: "a-1" }).tag, "a-1");
});

test("정지 사유(pause_reason): 결과 상세에 뜻과 코드가 보이고, 없으면 PAUSED_RISK에서만 미상, 모르는 값은 OTHER", async () => {
  const s = await startMock();
  try {
    s.mock.results.add(sessionResult(20, { status: "PAUSED_RISK", ended_at: null, pause_reason: "REASK_LIMIT" }));
    s.mock.results.add(sessionResult(21, { status: "PAUSED_RISK", ended_at: null }));
    s.mock.results.add(sessionResult(22, { status: "PAUSED_RISK", ended_at: null, pause_reason: "NEW_KIND" }));
    const root = q("#app")!; const c = new ResultsController(new ResultsClient({ baseUrl: s.base })); c.subscribe(() => renderResults(root, c));
    await c.openDetail("s-20");
    assert.ok(q("#result-pause-reason")!.textContent!.includes("되묻기 한도") && q("#result-pause-reason")!.textContent!.includes("REASK_LIMIT"));
    await c.openDetail("s-21"); assert.ok(q("#result-pause-reason")!.textContent!.startsWith("미상"));
    await c.openDetail("s-22"); assert.ok(q("#result-pause-reason")!.textContent!.includes("OTHER"));
    await c.openDetail("s-1"); assert.equal(q("#result-pause-reason"), null);
  } finally { await s.close(); }
});
