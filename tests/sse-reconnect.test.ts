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
