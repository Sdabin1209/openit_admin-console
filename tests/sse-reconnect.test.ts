// PUBLIC_API SSE: EventSource가 CLOSED면 지수 백오프로 새 연결, 401은 로그인(재연결 안 함), 429·503은 Retry-After를 따른다. 가짜 EventSource·탐침·타이머로 우리 코드만 시험한다.
import { test } from "node:test";
import assert from "node:assert/strict";
import { createResultEvents, BACKOFF_START_MS, type EventSourceLike } from "../app/components/link_result_events.ts";

function rig(statuses: { status: number; retryAfterS: number | null }[]) {
  const sources: (EventSourceLike & { fail(): void })[] = [];
  const timers: { fn: () => void; ms: number }[] = [];
  let unauth = 0; const probes = [...statuses];
  const open = () => { const s: EventSourceLike & { fail(): void } = { onopen: null, onerror: null, readyState: 0, addEventListener() {}, close() { s.readyState = 2; }, fail() { s.readyState = 2; s.onerror?.(); } }; sources.push(s); return s; };
  const stop = createResultEvents(open, { probe: async () => probes.shift()!, setTimer: (fn, ms) => { timers.push({ fn, ms }); return timers.length; }, clearTimer() {}, onUnauthenticated: () => { unauth++; } })({ onReady() {}, onLive() {}, onResync() {} });
  const tick = () => new Promise((r) => setImmediate(r));
  return { sources, timers, stop, tick, unauth: () => unauth };
}

test("CLOSED면 지수 백오프(1초, 2초)로 새 연결을 연다", async () => {
  const r = rig([{ status: 200, retryAfterS: null }, { status: 200, retryAfterS: null }]);
  r.sources[0].fail(); await r.tick();
  assert.equal(r.timers[0].ms, BACKOFF_START_MS);
  r.timers[0].fn(); assert.equal(r.sources.length, 2);
  r.sources[1].fail(); await r.tick();
  assert.equal(r.timers[1].ms, 2 * BACKOFF_START_MS);
  r.timers[1].fn(); assert.equal(r.sources.length, 3);
  r.stop();
});

test("401이면 재연결하지 않고 로그인으로 알린다", async () => {
  const r = rig([{ status: 401, retryAfterS: null }]);
  r.sources[0].fail(); await r.tick();
  assert.equal(r.unauth(), 1); assert.equal(r.timers.length, 0); assert.equal(r.sources.length, 1);
  r.stop();
});

test("429·503은 Retry-After 초만큼 기다리고, 503에 Retry-After가 없으면 1초", async () => {
  const r = rig([{ status: 429, retryAfterS: 7 }, { status: 503, retryAfterS: null }]);
  r.sources[0].fail(); await r.tick();
  assert.equal(r.timers[0].ms, 7000);
  r.timers[0].fn(); r.sources[1].fail(); await r.tick();
  assert.equal(r.timers[1].ms, 1000);
  r.stop();
});

test("멈춘 뒤에는 다시 연결하지 않는다", async () => {
  const r = rig([{ status: 200, retryAfterS: null }]);
  r.sources[0].fail(); await r.tick(); r.stop(); r.timers[0].fn();
  assert.equal(r.sources.length, 1);
});

import { ResultsClient, PushClient } from "../app/wiring/gateway.ts";
import { ResultsController } from "../app/wiring/results_controller.ts";
import { STREAM_PROBE_PATH } from "../app/components/link_result_events.ts";
import { HealthStatus } from "../app/types/contract-validators.cjs";
import { readFileSync } from "node:fs";
import { startMock } from "./helpers.ts";
import { sessionResult } from "./mock-server/results.ts";

test("탐침은 구독이 아니라 알림 목록 읽기(GET /v1/staff/alerts?status=OPEN&limit=1)다, 401·429·503의 Retry-After를 읽는다", async () => {
  const seen: string[] = [];
  const fetchFake = (async (u: string) => { seen.push(u); return new Response("", { status: 503, headers: { "Retry-After": "7" } }); }) as unknown as typeof fetch;
  const es = { addEventListener() {}, onopen: null as null | (() => void), onerror: null as null | (() => void), readyState: 0, close() {} };
  const timers: number[] = [];
  const api = new ResultsClient({ baseUrl: "http://x", fetch: fetchFake, eventSource: () => es, timers: { set: (_f, ms) => { timers.push(ms); return 1; }, clear() {} } });
  api.subscribe({ onReady() {}, onLive() {}, onResync() {} });
  es.readyState = 2; es.onerror?.();
  await new Promise((r) => setImmediate(r));
  assert.deepEqual(seen, ["http://x" + STREAM_PROBE_PATH]);
  assert.equal(STREAM_PROBE_PATH, "/v1/staff/alerts?status=OPEN&limit=1");
  assert.deepEqual(timers, [7000]);
});

test("resync: 마지막 heartbeat의 ts를 updated_after로 보내 놓친 결과만 목록에 합친다", async () => {
  const s = await startMock();
  try {
    const c = new ResultsController(new ResultsClient({ baseUrl: s.base }));
    await c.openList();
    assert.equal(c.state.items.length, 4);
    s.mock.results.add(sessionResult(30));
    await (c as unknown as { resync(t: string | null): Promise<void> }).resync("2026-11-20T00:00:00Z");
    assert.ok(c.state.items.some((i) => i.session_id === "s-30"));
    assert.equal(new Set(c.state.items.map((i) => i.session_id)).size, c.state.items.length, "중복 없음");
  } finally { await s.close(); }
});

test("푸시 구독 본문은 계약 PushSubscriptionRequest로 보내기 전에 검증한다: endpoint가 https·443이 아니면 보내지 않는다", async () => {
  let sent = 0;
  const api = new PushClient({ baseUrl: "http://x", fetch: (async () => { sent++; return new Response("{}", { status: 201 }); }) as unknown as typeof fetch });
  const keys = { p256dh: "pk", auth: "au" };
  await assert.rejects(api.subscribe({ endpoint: "http://push.example/x", keys }), (e: Error & { kind?: string }) => e.kind === "INVALID_RECORD");
  await assert.rejects(api.subscribe({ endpoint: "https://push.example:8443/x", keys }), (e: Error & { kind?: string }) => e.kind === "INVALID_RECORD");
  assert.equal(sent, 0);
  await api.subscribe({ endpoint: "https://push.example/x", keys });
  assert.equal(sent, 1);
});

test("/healthz·/readyz 본문은 계약 HealthStatus를 지킨다(Caddyfile의 respond 본문)", () => {
  const m = /respond `(\{[^`]*\})` 200/.exec(readFileSync(new URL("../serve/Caddyfile", import.meta.url), "utf8"));
  assert.ok(m);
  assert.ok(HealthStatus(JSON.parse(m![1])), JSON.stringify(HealthStatus.errors));
});
