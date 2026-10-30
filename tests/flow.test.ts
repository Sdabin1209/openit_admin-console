// 승인 흐름 전체를 모의 서버로 시험한다: 목록 → 보고서 → 확인 → 결정, STALE_REPORT, 403, 중복 클릭.
import { test } from "node:test";
import assert from "node:assert/strict";
import { ApiError } from "../app/wiring/gateway.ts";
import { reportView } from "../app/components/report_view.ts";

const buildGroups = (report: { comparisons: Parameters<typeof reportView>[0]["comparisons"] }, o: { sliceKind: string; sort: "default" }) => reportView({ comparisons: report.comparisons, ...o }).groups;
import { SAFETY_METRIC } from "./mock-server/scenarios.ts";
import { startMock } from "./helpers.ts";

const draft = (c: ReturnType<Awaited<ReturnType<typeof startMock>>["ctl"]>, _unused = "", reason = "") => c.setDraft({ reason });

test("목록은 승인 대기만 보인다", async () => {
  const s = await startMock();
  try {
    const c = s.ctl();
    await c.openList();
    assert.equal(c.state.phase, "list");
    assert.deepEqual(c.state.items.map((i) => i.status), ["AWAITING_APPROVAL", "AWAITING_APPROVAL", "AWAITING_APPROVAL", "AWAITING_APPROVAL"]);
  } finally { await s.close(); }
});

test("보고서 모델: SAFETY가 맨 위, n=0은 계산 못 함, 값을 보이지 않는다, 합격/불합격 표현 없음", async () => {
  const s = await startMock();
  try {
    const { report } = await s.client.getReviewReport("sub-await");
    const groups = buildGroups(report, { sliceKind: "ALL_KINDS", sort: "default" });
    assert.equal(groups[0].group, "SAFETY");
    assert.equal(groups.at(-1)!.group, "NEW_GROUP"); // 모르는 그룹은 이름을 지키고 맨 뒤에 둔다
    const unc = groups[0].rows.find((r) => r.sliceLabel.includes("UNSEEN"))!;
    assert.equal(unc.candidate.kind, "uncomputable");
    assert.equal(unc.candidate.text, "계산 못 함");
    assert.equal(unc.delta.kind, "none");
    assert.equal(unc.worse, false); // n=0이면 worse 값도 믿지 않는다
    const noBase = groups.flatMap((g) => g.rows).find((r) => r.baseline.kind === "none")!;
    assert.equal(noBase.baseline.text, "기준 없음");
    const worse = groups[0].rows.find((r) => r.name === SAFETY_METRIC && r.sliceKind === "ALL")!;
    assert.equal(worse.worse, true);
    assert.equal(worse.delta.text, "-0.02");
    assert.equal(worse.baselineN, "120");
    const filtered = buildGroups(report, { sliceKind: "SEEN_UNSEEN", sort: "default" });
    assert.ok(filtered.flatMap((g) => g.rows).every((r) => r.sliceKind === "SEEN_UNSEEN"));
    const text = JSON.stringify(groups);
    assert.ok(!/합격|불합격|PASS|FAIL/.test(text), "화면 모델이 합격/불합격을 말하지 않는다");
  } finally { await s.close(); }
});

test("승인: 확인창을 거치고 report_hash를 동봉한다", async () => {
  const s = await startMock();
  try {
    const c = s.ctl();
    await c.openReport("sub-await");
    const seen = c.state.loaded!.reportHash;
    assert.equal(seen, s.mock.currentHash("sub-await")); // 서버가 헤더로 낸 해시를 그대로 쓴다
    draft(c);
    c.requestDecision("APPROVE");
    assert.equal(c.state.phase, "confirming");
    assert.equal(s.mock.postCount(), 0, "확인 전에는 전송하지 않는다");
    c.setConfirmText(c.state.submissionId!);
    await c.confirm();
    assert.equal(c.state.phase, "done");
    assert.equal(s.mock.approvals.length, 1);
    assert.equal(s.mock.approvals[0].report_hash, seen);
    assert.equal(s.mock.approvals[0].approver_role, "release-approver");
    assert.equal(s.mock.approvals[0].approver_id, "gw-user-1", "승인자는 게이트웨이 헤더 값");
  } finally { await s.close(); }
});

test("확인창에서 취소하면 전송하지 않는다", async () => {
  const s = await startMock();
  try {
    const c = s.ctl();
    await c.openReport("sub-await");
    draft(c); c.requestDecision("APPROVE"); c.cancelConfirm();
    assert.equal(c.state.phase, "report");
    assert.equal(s.mock.postCount(), 0);
  } finally { await s.close(); }
});

test("반려는 사유가 필수다", async () => {
  const s = await startMock();
  try {
    const c = s.ctl();
    await c.openReport("sub-await");
    draft(c, "trainer-1", "   ");
    c.requestDecision("REJECT");
    assert.equal(c.state.phase, "report");
    assert.equal(c.state.notice?.kind, "invalid");
    draft(c, "trainer-1", "안전 지표 악화");
    c.requestDecision("REJECT");
    assert.equal(c.state.phase, "confirming");
    c.setConfirmText(c.state.submissionId!);
    await c.confirm();
    assert.equal(c.state.phase, "done");
    assert.equal(s.mock.approvals[0].decision, "REJECT");
    assert.equal(s.mock.approvals[0].reason, "안전 지표 악화");
    assert.equal(s.mock.postCount(), 1);
  } finally { await s.close(); }
});

test("409 STALE_REPORT: 새 보고서를 불러오고 다시 확인해야 하며 자동 재전송하지 않는다", async () => {
  const s = await startMock();
  try {
    const c = s.ctl();
    await c.openReport("sub-await-stale");
    const first = c.state.loaded!.reportHash;
    draft(c); c.requestDecision("APPROVE");
    c.setConfirmText(c.state.submissionId!);
    await c.confirm();
    assert.equal(c.state.phase, "report");
    assert.equal(c.state.notice?.kind, "stale");
    assert.notEqual(c.state.loaded!.reportHash, first, "새 보고서의 해시");
    assert.equal(s.mock.postCount(), 1, "자동 재전송 없음");
    assert.equal(s.mock.approvals.length, 0);
    assert.ok(c.state.loaded!.report.notes!.some((n) => n.includes("갱신")));
    draft(c); c.requestDecision("APPROVE");
    assert.equal(c.state.phase, "confirming", "다시 확인창");
    c.setConfirmText(c.state.submissionId!);
    await c.confirm();
    assert.equal(c.state.phase, "done");
    assert.equal(s.mock.approvals[0].report_hash, c.state.loaded!.reportHash);
  } finally { await s.close(); }
});

test("403 권한 오류는 알리고 기록하지 않는다", async () => {
  const s = await startMock();
  try {
    const c = s.ctl();
    await c.openReport("sub-await-403");
    draft(c); c.requestDecision("APPROVE");
    c.setConfirmText(c.state.submissionId!);
    await c.confirm();
    assert.equal(c.state.phase, "report");
    assert.equal(c.state.notice?.kind, "denied");
    assert.equal(s.mock.approvals.length, 0);
  } finally { await s.close(); }
});

test("중복 클릭: 확정을 여러 번 눌러도 한 번만 간다", async () => {
  const s = await startMock(200);
  try {
    const c = s.ctl();
    await c.openReport("sub-await-slow");
    draft(c); c.requestDecision("APPROVE");
    c.setConfirmText(c.state.submissionId!);
    await Promise.all([c.confirm(), c.confirm(), c.confirm()]);
    assert.equal(s.mock.postCount(), 1);
    assert.equal(s.mock.approvals.length, 1);
    assert.equal(c.state.phase, "done");
    c.setConfirmText(c.state.submissionId!);
    await c.confirm(); // 완료 뒤에도 무시
    assert.equal(s.mock.postCount(), 1);
  } finally { await s.close(); }
});

test("이미 다른 결정이 있으면(409 CONFLICT) 낡은 보고서와 구분해 알린다", async () => {
  const s = await startMock();
  try {
    const a = s.ctl(), b = s.ctl();
    await a.openReport("sub-await"); await b.openReport("sub-await");
    draft(a); a.requestDecision("APPROVE"); a.setConfirmText(a.state.submissionId!); await a.confirm();
    draft(b, "trainer-2", "다른 의견"); b.requestDecision("REJECT"); b.setConfirmText(b.state.submissionId!); await b.confirm();
    assert.equal(b.state.notice?.kind, "conflict");
    assert.equal(s.mock.approvals.length, 1);
  } finally { await s.close(); }
});

test("자동 검사 전 제출의 보고서는 열 수 없다(409)", async () => {
  const s = await startMock();
  try {
    await assert.rejects(s.client.getReviewReport("sub-pending"), (e: unknown) => e instanceof ApiError && e.status === 409);
    const c = s.ctl();
    await c.openReport("sub-pending");
    assert.equal(c.state.phase, "error");
  } finally { await s.close(); }
});

test("연결 실패는 UNAVAILABLE이고 재시도 안내를 낸다", async () => {
  const s = await startMock();
  const c = s.ctl();
  await c.openReport("sub-await");
  draft(c); c.requestDecision("APPROVE");
  await s.close();
  c.setConfirmText(c.state.submissionId!);
  await c.confirm();
  assert.equal(c.state.notice?.kind, "retry");
  assert.equal(c.state.phase, "report");
});

test("해시는 계산하지 않고 응답 헤더 값을 그대로 쓴다", async () => {
  const s = await startMock();
  try {
    const r = await fetch(`${s.base}/v1/submissions/sub-await/review-report`);
    assert.equal((await s.client.getReviewReport("sub-await")).reportHash, r.headers.get("X-Openit-Report-Hash"));
  } finally { await s.close(); }
});

test("헤더가 없는 보고서 응답은 거부한다", async () => {
  const { GateClient } = await import("../app/wiring/gateway.ts");
  const fake = (async () => new Response(JSON.stringify({ submission_id: "x", checks: [], comparisons: [], subject: {} }), { status: 200, headers: { "Content-Type": "application/json" } })) as typeof fetch;
  await assert.rejects(new GateClient({ fetch: fake }).getReviewReport("x"), (e: unknown) => e instanceof ApiError && e.kind === "BAD_RESPONSE");
});

test("409 사유는 details.reason으로만 구분한다(문자열 검색 없음)", async () => {
  const { GateClient } = await import("../app/wiring/gateway.ts");
  const mk = (body: unknown) => new GateClient({ fetch: (async () => new Response(JSON.stringify(body), { status: 409 })) as typeof fetch });
  const req = { submissionId: "x", decision: "APPROVE" as const, reportHash: "sha256:" + "0".repeat(64) };
  const e1 = await mk({ code: "CONFLICT", message: "STALE_REPORT 라고 적혀 있어도", retryable: false }).decide(req).catch((e) => e);
  assert.equal(e1.kind, "CONFLICT");
  const e2 = await mk({ code: "CONFLICT", message: "m", retryable: false, details: { reason: "STALE_REPORT" } }).decide(req).catch((e) => e);
  assert.equal(e2.kind, "STALE_REPORT");
});
