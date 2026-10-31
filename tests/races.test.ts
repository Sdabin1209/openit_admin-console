// 화면 상태 기계의 겹침·재전송: 먼저 보낸 불러오기가 늦게 도착해도 지금 화면을 덮어쓰지 않고(순번),
// 같은 확인 단계의 재전송은 같은 request_id와 같은 requested_at(같은 본문)으로 간다. 시간에 기대지 않는다(사건으로 순서를 만든다).
import { test } from "node:test";
import assert from "node:assert/strict";
import { Controller } from "../app/wiring/approvals_controller.ts";
import { CasesController } from "../app/wiring/cases_controller.ts";
import { OpsController } from "../app/wiring/ops_controller.ts";
import { ApiError } from "../app/wiring/api_error.ts";

const H = (c: string) => "sha256:" + c.repeat(64);
const deferred = <T>() => { let resolve!: (v: T) => void; const promise = new Promise<T>((r) => { resolve = r; }); return { promise, resolve }; };
const report = (id: string) => ({ submission_id: id, checks: [], comparisons: [], subject: {} });

test("보고서 불러오기가 겹치면 늦게 도착한 앞 요청은 버려진다(다른 제출의 보고서가 보이지 않는다)", async () => {
  const a = deferred<{ report: ReturnType<typeof report>; reportHash: string }>();
  const b = deferred<{ report: ReturnType<typeof report>; reportHash: string }>();
  const api = { getReviewReport: (id: string) => (id === "A" ? a.promise : b.promise) } as never;
  const c = new Controller(api);
  const first = c.openReport("A");
  const second = c.openReport("B");
  b.resolve({ report: report("B"), reportHash: H("b") });
  await second;
  a.resolve({ report: report("A"), reportHash: H("a") });
  await first;
  assert.equal(c.state.submissionId, "B");
  assert.equal(c.state.loaded?.report.submission_id, "B");
  assert.equal(c.state.loaded?.reportHash, H("b"));
});

test("목록이 늦게 도착해도 그 사이 연 보고서 화면을 덮어쓰지 않는다", async () => {
  const list = deferred<{ items: never[]; nextCursor: null }>();
  const api = { listAwaiting: () => list.promise, getReviewReport: async () => ({ report: report("A"), reportHash: H("a") }) } as never;
  const c = new Controller(api);
  const l = c.openList();
  await c.openReport("A");
  list.resolve({ items: [], nextCursor: null });
  await l;
  assert.equal(c.state.phase, "report");
});

test("사례 불러오기가 겹치면 늦게 도착한 앞 요청은 버려진다", async () => {
  const slow = deferred<Record<string, unknown>>();
  const mk = (id: string) => ({ case_id: id, version: 1, review_status: "PENDING", failure_type: "X", deidentified_trace_ref: `tr-${id}` });
  const api = { get: (id: string) => (id === "slow" ? slow.promise : Promise.resolve(mk(id))), getTrace: async () => ({}) } as never;
  const c = new CasesController(api);
  const first = c.openCase("slow");
  await c.openCase("fast");
  slow.resolve(mk("slow"));
  await first;
  assert.equal(c.state.current?.case_id, "fast");
});

test("롤백 재전송은 같은 request_id와 같은 requested_at으로 간다(시계가 흘러도 본문이 같다)", async () => {
  const bodies: Record<string, unknown>[] = [];
  let tick = 0;
  const ptr = (id: string) => ({ release_id: id, pointer_version: 2, activated_at: "t", cause: "ROLLBACK" });
  let calls = 0;
  const api = {
    activePointer: async () => ptr("rel-2"),
    listReleases: async () => [{ release_id: "rel-2", created_at: "t", gate_decision_id: "g" }, { release_id: "rel-1", created_at: "t", gate_decision_id: "g" }],
    rollback: async (b: Record<string, unknown>) => {
      bodies.push(b);
      if (++calls === 1) throw new ApiError("UNAVAILABLE", 0, "x", true);
      return { request_id: b.request_id, status: "APPLIED", decided_at: "t", active_pointer: ptr("rel-1") };
    },
  } as never;
  const c = new OpsController(api, () => `2026-10-31T00:00:0${++tick}Z`, () => "fixed");
  await c.load();
  c.startRollback();
  c.setField({ reason: "r", evidenceText: "fc-1" });
  await c.submit();
  assert.equal(c.state.notice?.kind, "network");
  await c.submit();
  assert.equal(bodies.length, 2);
  assert.deepEqual(bodies[1], bodies[0]);
});
