// 진행 표시(1초)와 안내(10초)의 경계. 가짜 시계만 쓴다: 시험이 fire()를 부를 때만 시간이 간다(실제 대기 없음, ADR 0023·0024).
import { test } from "node:test";
import assert from "node:assert/strict";
import { JSDOM } from "jsdom";
import { Controller } from "../app/wiring/approvals_controller.ts";
import { CasesController } from "../app/wiring/cases_controller.ts";
import { OpsController } from "../app/wiring/ops_controller.ts";
import { NOTICE_AFTER_MS, NOTICE_TEXT, PROGRESS_AFTER_MS, PROGRESS_TEXT } from "../app/wiring/slow_notice.ts";

const dom = new JSDOM('<!doctype html><main id="app"></main>', { url: "http://localhost/admin/" });
Object.assign(globalThis, { document: dom.window.document, window: dom.window, location: dom.window.location });
const { render } = await import("../app/ui/views.ts");
const { renderCases } = await import("../app/ui/cases_view.ts");
const { renderOps } = await import("../app/ui/ops_view.ts");

function fakeTimers() {
  const live = new Map<number, { fn: () => void; ms: number }>();
  let n = 0;
  return {
    timers: { set: (fn: () => void, ms: number) => { live.set(++n, { fn, ms }); return n; }, clear: (h: unknown) => { live.delete(h as number); } },
    live: () => [...live.values()].map((t) => t.ms).sort((a, b) => a - b),
    /** 이 ms의 타이머만 만료시킨다. */
    fire: (ms: number) => { for (const [k, t] of [...live]) if (t.ms === ms) { live.delete(k); t.fn(); } },
  };
}
const deferred = <T>() => { let resolve!: (v: T) => void; const promise = new Promise<T>((r) => { resolve = r; }); return { promise, resolve }; };
const text = () => dom.window.document.querySelector("#app")!.textContent!;

test("임계값은 1초와 10초다(Nielsen)", () => {
  assert.equal(PROGRESS_AFTER_MS, 1000);
  assert.equal(NOTICE_AFTER_MS, 10000);
});

test("승인 화면: 요청이 시작되면 1초·10초 타이머가 걸리고, 1초에 진행 표시, 10초에 안내, 끝나면 지워진다", async () => {
  const f = fakeTimers();
  const d = deferred<{ items: never[]; nextCursor: null }>();
  const c = new Controller({ listAwaiting: () => d.promise } as never, f.timers);
  const root = dom.window.document.querySelector("#app") as HTMLElement;
  c.subscribe(() => render(root, c));
  const p = c.openList();
  assert.deepEqual(f.live(), [PROGRESS_AFTER_MS, NOTICE_AFTER_MS]);
  assert.equal(c.slowStage, 0);
  render(root, c);
  assert.ok(!text().includes(PROGRESS_TEXT));
  f.fire(PROGRESS_AFTER_MS);
  assert.equal(c.slowStage, 1);
  assert.ok(text().includes(PROGRESS_TEXT)); assert.ok(!text().includes(NOTICE_TEXT));
  f.fire(NOTICE_AFTER_MS);
  assert.equal(c.slowStage, 2);
  assert.ok(text().includes(NOTICE_TEXT));
  d.resolve({ items: [], nextCursor: null });
  await p;
  assert.equal(c.slowStage, 0);
  assert.deepEqual(f.live(), []);
  assert.ok(!text().includes(NOTICE_TEXT) && !text().includes(PROGRESS_TEXT));
});

test("승인 화면: 1초 안에 끝난 요청은 아무것도 보이지 않고 타이머를 지운다", async () => {
  const f = fakeTimers();
  const c = new Controller({ listAwaiting: async () => ({ items: [], nextCursor: null }) } as never, f.timers);
  await c.openList();
  assert.deepEqual(f.live(), []);
  assert.equal(c.slowStage, 0);
});

test("실패 사례 화면: 목록 불러오는 중 1초·10초 경계", async () => {
  const f = fakeTimers();
  const d = deferred<never>();
  const c = new CasesController({ list: () => d.promise } as never, f.timers);
  const root = dom.window.document.querySelector("#app") as HTMLElement;
  c.subscribe(() => renderCases(root, c));
  const p = c.openList();
  f.fire(PROGRESS_AFTER_MS);
  assert.ok(text().includes(PROGRESS_TEXT));
  f.fire(NOTICE_AFTER_MS);
  assert.ok(text().includes(NOTICE_TEXT));
  d.resolve([] as never);
  await p;
  assert.equal(c.slowStage, 0);
  assert.deepEqual(f.live(), []);
});

test("운영 화면: 불러오는 동안 1초·10초 경계, 실패로 끝나도 지워진다", async () => {
  const f = fakeTimers();
  const d = deferred<never>();
  const c = new OpsController({ activePointer: () => d.promise, listReleases: () => d.promise } as never, () => "2026-11-02T00:00:00Z", () => "u", f.timers);
  const root = dom.window.document.querySelector("#app") as HTMLElement;
  c.subscribe(() => renderOps(root, c));
  const p = c.load();
  f.fire(PROGRESS_AFTER_MS);
  assert.ok(text().includes(PROGRESS_TEXT));
  f.fire(NOTICE_AFTER_MS);
  assert.ok(text().includes(NOTICE_TEXT));
  d.resolve(undefined as never); // 결과 모양이 틀려 실패로 끝나는 경우도 표시가 지워져야 한다
  await p;
  assert.equal(c.slowStage, 0);
  assert.deepEqual(f.live(), []);
  assert.ok(!text().includes(NOTICE_TEXT));
});

test("타이머를 주입하지 않으면 표시를 만들지 않는다", async () => {
  const d = deferred<{ items: never[]; nextCursor: null }>();
  const c = new Controller({ listAwaiting: () => d.promise } as never);
  const p = c.openList();
  assert.equal(c.slowStage, 0);
  d.resolve({ items: [], nextCursor: null });
  await p;
});
