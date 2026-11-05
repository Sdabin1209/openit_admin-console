import { surveySchemaJson } from "../scripts/contract-src.mjs";
// 규칙 U83 문진 결과 화면(의사용): 목록·상세·빈칸 사유·확인 표시·도착 알림(SSE result_ready)·403 안내. 기준은 계약 PUBLIC_API B(boundary-contracts v3.2.0).
import { test, beforeEach } from "node:test";
import assert from "node:assert/strict";
import { JSDOM } from "jsdom";
import { readFileSync, existsSync } from "node:fs";
import Ajv from "ajv/dist/2020.js";
import { startMock, waitFor } from "./helpers.ts";
import { ResultsClient } from "../app/wiring/gateway.ts";
import { ResultsController, FORBIDDEN_TEXT } from "../app/wiring/results_controller.ts";
import { resultSheet } from "../app/components/result_sheet.ts";
import { sessionResult } from "./mock-server/results.ts";
import type { EventSourceLike } from "../app/components/link_result_events.ts";

const dom = new JSDOM('<!doctype html><main id="app"></main>', { url: "http://localhost/admin/" });
Object.assign(globalThis, { document: dom.window.document, window: dom.window, location: dom.window.location });
beforeEach(() => { dom.window.document.querySelector("#app")!.replaceChildren(); });
const { renderResults } = await import("../app/ui/results_view.ts");
const q = <T extends Element = HTMLElement>(sel: string) => dom.window.document.querySelector(sel) as T | null;

// 시험용 EventSource: fetch로 모의 서버의 text/event-stream을 읽는다(Node에는 EventSource가 없다). 브라우저 구현이 아니라 SSE 줄 형식(event:, data:, 빈 줄)만 해석한다.
class FetchEventSource implements EventSourceLike {
  onopen: (() => void) | null = null; onerror: (() => void) | null = null; readyState = 0;
  private fns = new Map<string, ((e: { data?: string }) => void)[]>();
  private ctl = new AbortController();
  constructor(url: string) {
    void (async () => {
      try {
        const res = await fetch(url, { signal: this.ctl.signal });
        if (!res.ok) { this.readyState = 2; this.onerror?.(); return; }
        this.readyState = 1; this.onopen?.();
        let buf = ""; let ev = "message"; let data = "";
        const dec = new TextDecoder();
        for await (const chunk of res.body as unknown as AsyncIterable<Uint8Array>) {
          buf += dec.decode(chunk, { stream: true });
          let i: number;
          while ((i = buf.indexOf("\n")) >= 0) {
            const line = buf.slice(0, i); buf = buf.slice(i + 1);
            if (line === "") { for (const f of this.fns.get(ev) ?? []) f({ data }); ev = "message"; data = ""; }
            else if (line.startsWith("event: ")) ev = line.slice(7);
            else if (line.startsWith("data: ")) data = line.slice(6);
          }
        }
      } catch { /* 닫힘 */ }
    })();
  }
  addEventListener(t: string, fn: (e: { data?: string }) => void) { this.fns.set(t, [...(this.fns.get(t) ?? []), fn]); }
  close() { this.readyState = 2; this.ctl.abort(); }
}
const mk = (base: string) => { const api = new ResultsClient({ baseUrl: base, eventSource: (p) => new FetchEventSource(base + p) }); return new ResultsController(api); };

test("목록: 최신부터 보이고 상태 필터와 '더 보기'가 동작한다", async () => {
  const s = await startMock();
  try {
    const root = q("#app")!; const c = mk(s.base); c.subscribe(() => renderResults(root, c));
    await c.openList();
    assert.deepEqual(c.state.items.map((i) => i.session_id), ["s-4", "s-3", "s-2", "s-1"]);
    assert.equal(root.querySelectorAll("tbody tr").length, 4);
    assert.ok(root.querySelector('tr[data-session="s-4"] strong'), "완료가 아닌 상태는 강조된다");
    await c.openList("ENDED_LEFT");
    assert.deepEqual(c.state.items.map((i) => i.session_id), ["s-3"]);
    // 쪽 넘김: 51건을 만들어 첫 쪽 50건 + 더 보기
    await c.openList("");
    for (let n = 10; n < 60; n++) s.mock.results.add(sessionResult(n, { started_at: `2026-12-01T00:${String(n - 10).padStart(2, "0")}:00Z` } as never));
    await c.openList("");
    assert.equal(c.state.items.length, 50);
    assert.ok(q("#result-more"));
    await c.loadMore();
    assert.equal(c.state.items.length, 54);
    assert.equal(new Set(c.state.items.map((i) => i.session_id)).size, 54, "중복 없이");
  } finally { await s.close(); }
});

test("상세: 문진표 모양(문항별 칸·값), 빈칸 사유 코드와 뜻, 완료 표시", async () => {
  const s = await startMock();
  try {
    const root = q("#app")!; const c = mk(s.base); c.subscribe(() => renderResults(root, c));
    await c.openDetail("s-1");
    const rows = [...root.querySelectorAll("#result-answers tbody tr")].map((r) => [...r.querySelectorAll("td")].map((t) => t.textContent));
    assert.deepEqual(rows[1], ["Q7_1", "[soju].amount", "2", "CORRECTION", "approximate"]);
    assert.deepEqual(rows[0].slice(0, 3), ["Q1", "—", "두통"]);
    const blanks = [...root.querySelectorAll("#result-blanks tbody tr")].map((r) => [...r.querySelectorAll("td")].map((t) => t.textContent));
    assert.deepEqual(blanks[0], ["Q3", "—", "UNKNOWN", "환자가 모름"]);
    assert.equal(blanks[1][2], "REASK_LIMIT");
    assert.ok(blanks[1][3]!.includes("되묻기 한도"));
    assert.equal(q("#result-status-text")!.textContent, "완료(끝까지 마침)");
    assert.equal(q("#result-partial"), null, "완료 결과에는 부분 결과 안내가 없다");
    // 완료가 아니면 부분 결과임을 알린다
    await c.openDetail("s-4");
    assert.ok(q("#result-partial")!.textContent!.includes("완료되지 않았다"));
    assert.ok(q("#result-status-text")!.textContent!.startsWith("미완료"));
    assert.ok(q("#result-print"), "인쇄 버튼");
    // 모르는 상태와 사유 코드는 원문 그대로
    const sv = resultSheet(sessionResult(9, { status: "ENDED_NEW", skipped_details: [{ item: "Q9", reason: "NEW_CODE" }] } as never) as never);
    assert.equal(sv.statusText, "ENDED_NEW"); assert.equal(sv.complete, false);
    assert.equal(sv.blanks[0].reasonText, "NEW_CODE");
  } finally { await s.close(); }
});

test("확인 표시: 누르면 acknowledged_by/at이 보이고 버튼이 잠긴다, 다시 보내도 처음 값(멱등), 중복 클릭은 한 번", async () => {
  const s = await startMock({ gatewayUser: "dr-kim" });
  try {
    const root = q("#app")!; const c = mk(s.base); c.subscribe(() => renderResults(root, c));
    await c.openDetail("s-1");
    assert.equal(q<HTMLButtonElement>("#result-ack")!.disabled, false);
    assert.equal(q("#result-ack-text")!.textContent, "확인 전");
    await Promise.all([c.ack(), c.ack()]); // 중복 클릭
    assert.equal(c.state.current!.acknowledged_by, "dr-kim");
    assert.equal(c.state.current!.acknowledged_at, "2026-10-20T00:00:00Z");
    assert.ok(q("#result-ack-text")!.textContent!.includes("dr-kim"));
    assert.equal(q<HTMLButtonElement>("#result-ack")!.disabled, true, "이미 확인됨이면 비활성");
    // 서버에 직접 두 번째 ack: 처음 값을 유지한다(다른 계정이 눌러도)
    const r2 = await fetch(`${s.base}/v1/results/s-1/ack`, { method: "POST", headers: { "Content-Type": "application/json", "X-Openit-User": "dr-lee" }, body: "{}" });
    assert.equal(((await r2.json()) as { acknowledged_by: string }).acknowledged_by, "dr-kim");
    // 목록에서도 확인함으로 보인다
    await c.openList();
    assert.equal(q('tr[data-session="s-1"]')!.lastElementChild!.textContent, "확인함");
  } finally { await s.close(); }
});

test("도착 알림: result_ready를 받으면 목록이 자동 갱신되고, 다른 화면에서는 탭 배지 수가 오른다", async () => {
  const s = await startMock();
  try {
    const root = q("#app")!; const c = mk(s.base); c.subscribe(() => renderResults(root, c));
    c.startLive();
    await waitFor(() => c.state.live && s.mock.results.clientCount() === 1, "SSE 연결");
    await c.openList();
    assert.equal(c.state.items.length, 4);
    const fresh = sessionResult(5);
    s.mock.results.add(fresh);
    s.mock.results.emitReady({ session_id: "s-5", status: "ENDED_COMPLETE", ended_at: fresh.ended_at });
    await waitFor(() => c.state.items.length === 5, "목록 자동 갱신");
    assert.equal(c.state.items[0].session_id, "s-5");
    assert.equal(c.state.unseen, 0, "목록을 보는 중이면 배지는 오르지 않는다");
    // 상세를 보는 동안 도착: 배지가 오르고 목록으로 돌아오면 지워진다
    await c.openDetail("s-1");
    s.mock.results.emitReady({ session_id: "s-6", status: "ENDED_STAFF", ended_at: null });
    await waitFor(() => c.state.unseen === 1, "배지");
    await c.openList();
    assert.equal(c.state.unseen, 0);
    c.stopLive();
  } finally { s.mock.results.closeStreams(); await s.close(); }
});

test("도착 알림: JSON이 아닌 본문은 버리고, 모르는 이벤트는 듣지 않는다. 읽은 본문은 다시 검증하지 않는다(ADR 0030)", async () => {
  const fns = new Map<string, (e: { data?: string }) => void>();
  const es: EventSourceLike = { addEventListener: (t, f) => { fns.set(t, f); }, onopen: null, onerror: null, readyState: 1, close() {} };
  const api = new ResultsClient({ baseUrl: "", eventSource: () => es });
  let n = 0; const since: (string | null)[] = [];
  api.subscribe({ onReady: () => { n++; }, onLive: () => {}, onResync: (t) => { since.push(t); } });
  fns.get("result_ready")!({ data: "not json" });
  assert.equal(n, 0);
  fns.get("result_ready")!({ data: JSON.stringify({ session_id: "s-1", status: "ENDED_COMPLETE", ended_at: "2026-11-04T00:00:00Z" }) });
  assert.equal(n, 1);
  assert.equal(fns.has("some_future_event"), false);
  // resync는 마지막 heartbeat의 ts를 updated_after로 쓰라고 넘긴다(PUBLIC_API B절)
  fns.get("resync")!({ data: JSON.stringify({ reason: "EVENTS_NOT_RESUMABLE" }) });
  fns.get("heartbeat")!({ data: JSON.stringify({ ts: "2026-11-04T00:00:15Z" }) });
  fns.get("heartbeat")!({ data: "깨진 줄" });
  fns.get("resync")!({ data: JSON.stringify({ reason: "EVENTS_NOT_RESUMABLE" }) });
  assert.deepEqual(since, [null, "2026-11-04T00:00:15Z"]);
});

test("403: 목록·상세 모두 '의사(clinician) 권한 필요' 안내가 뜬다", async () => {
  const s = await startMock();
  try {
    s.mock.results.setClinician(false);
    const root = q("#app")!; const c = mk(s.base); c.subscribe(() => renderResults(root, c));
    await c.openList();
    assert.equal(c.state.forbidden, true);
    assert.equal(q("#result-error")!.textContent, FORBIDDEN_TEXT);
    assert.ok(FORBIDDEN_TEXT.startsWith("의사(clinician) 권한 필요"));
    await c.openDetail("s-1");
    assert.equal(q("#result-error")!.textContent, FORBIDDEN_TEXT);
    // 존재하지 않는 결과는 404 안내(권한 안내와 구분)
    s.mock.results.setClinician(true);
    await c.openDetail("nope");
    assert.ok(q("#result-error")!.textContent!.includes("404"));
  } finally { await s.close(); }
});

test("실시간 연결이 403으로 거절되면 live=false이고 화면은 그대로 쓸 수 있다", async () => {
  const s = await startMock();
  try {
    s.mock.results.setClinician(false);
    const c = mk(s.base);
    c.startLive();
    await waitFor(() => s.mock.results.clientCount() === 0 && c.state.live === false, "거절");
    c.stopLive();
  } finally { await s.close(); }
});

test("모의 서버 출력이 문진 스키마 SessionResult를 통과한다(확인 표시 필드 제외)", async () => {
  const schema = surveySchemaJson("SessionResult");   // 고정 태그(scripts/contract-src.mjs SURVEY_SCHEMA_TAG)
  const v = new Ajv({ strict: false, allErrors: true }).compile(schema);
  const s = await startMock();
  try {
    const page = (await (await fetch(`${s.base}/v1/results`)).json()) as { items: unknown[] };
    assert.ok(page.items.length > 0);
    for (const it of page.items) assert.ok(v(it), JSON.stringify(v.errors?.slice(0, 3)));
  } finally { await s.close(); }
});

test("문진표(계약 3.3.0): 상세와 목록에 문진표 제목과 버전, 제목이 없으면 ID, 옛 결과는 대시", async () => {
  const s = await startMock();
  try {
    const root = q("#app")!; const c = mk(s.base); c.subscribe(() => renderResults(root, c));
    await c.openDetail("s-1");
    assert.equal(q("#result-question-set")!.textContent, "기본 문진표 (버전 qb-1)");
    assert.equal(resultSheet(sessionResult(9, { question_set_title: null }) as never).setText, "qs-main (버전 qb-1)");
    assert.equal(resultSheet(sessionResult(9, { question_set_id: null, question_set_title: null }) as never).setText, "—");
    await c.openList("");
    assert.ok(q('tr[data-session="s-1"]')!.textContent!.includes("기본 문진표 (버전 qb-1)"));
  } finally { await s.close(); }
});
