// 승인 흐름 전체를 모의 서버로 시험한다: 목록 → 보고서 → 확인 → 결정, STALE_REPORT, 403, 중복 클릭.
import { test } from "node:test";
import assert from "node:assert/strict";
import { ApiError } from "../api/client.ts";
import { sha256Hash } from "../api/jcs.ts";
import { buildGroups } from "../app/model.ts";
import { startMock } from "./helpers.ts";

const draft = (c: ReturnType<Awaited<ReturnType<typeof startMock>>["ctl"]>, id = "trainer-1", reason = "") => c.setDraft({ approverId: id, reason });

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
    assert.equal(groups.at(-1)!.group, "OTHER"); // 모르는 그룹 NEW_GROUP은 OTHER
    const unc = groups[0].rows.find((r) => r.sliceLabel.includes("UNSEEN"))!;
    assert.equal(unc.candidate.kind, "uncomputable");
    assert.equal(unc.candidate.text, "계산 못 함");
    assert.equal(unc.delta.kind, "none");
    assert.equal(unc.worse, false); // n=0이면 worse 값도 믿지 않는다
    const noBase = groups.flatMap((g) => g.rows).find((r) => r.baseline.kind === "none")!;
    assert.equal(noBase.baseline.text, "기준 없음");
    const worse = groups[0].rows.find((r) => r.name === "risk_signal_recall" && r.sliceKind === "ALL")!;
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
    assert.equal(seen, s.mock.currentHash("sub-await")); // 받은 JSON의 해시 = 서버가 계산한 해시
    draft(c);
    c.requestDecision("APPROVE");
    assert.equal(c.state.phase, "confirming");
    assert.equal(s.mock.postCount(), 0, "확인 전에는 전송하지 않는다");
    await c.confirm();
    assert.equal(c.state.phase, "done");
    assert.equal(s.mock.approvals.length, 1);
    assert.equal(s.mock.approvals[0].report_hash, seen);
    assert.equal(s.mock.approvals[0].approver_role, "release-approver");
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

test("반려는 사유가 필수이고 승인자 ID 형식을 검사한다", async () => {
  const s = await startMock();
  try {
    const c = s.ctl();
    await c.openReport("sub-await");
    draft(c, "trainer-1", "   ");
    c.requestDecision("REJECT");
    assert.equal(c.state.phase, "report");
    assert.equal(c.state.notice?.kind, "invalid");
    draft(c, "나쁜 id", "사유");
    c.requestDecision("REJECT");
    assert.equal(c.state.phase, "report");
    draft(c, "trainer-1", "안전 지표 악화");
    c.requestDecision("REJECT");
    assert.equal(c.state.phase, "confirming");
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
    await c.confirm();
    assert.equal(c.state.phase, "report");
    assert.equal(c.state.notice?.kind, "stale");
    assert.notEqual(c.state.loaded!.reportHash, first, "새 보고서의 해시");
    assert.equal(s.mock.postCount(), 1, "자동 재전송 없음");
    assert.equal(s.mock.approvals.length, 0);
    assert.ok(c.state.loaded!.report.notes!.some((n) => n.includes("갱신")));
    draft(c); c.requestDecision("APPROVE");
    assert.equal(c.state.phase, "confirming", "다시 확인창");
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
    await Promise.all([c.confirm(), c.confirm(), c.confirm()]);
    assert.equal(s.mock.postCount(), 1);
    assert.equal(s.mock.approvals.length, 1);
    assert.equal(c.state.phase, "done");
    await c.confirm(); // 완료 뒤에도 무시
    assert.equal(s.mock.postCount(), 1);
  } finally { await s.close(); }
});

test("이미 다른 결정이 있으면(409 CONFLICT) 낡은 보고서와 구분해 알린다", async () => {
  const s = await startMock();
  try {
    const a = s.ctl(), b = s.ctl();
    await a.openReport("sub-await"); await b.openReport("sub-await");
    draft(a); a.requestDecision("APPROVE"); await a.confirm();
    draft(b, "trainer-2", "다른 의견"); b.requestDecision("REJECT"); await b.confirm();
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
  await c.confirm();
  assert.equal(c.state.notice?.kind, "retry");
  assert.equal(c.state.phase, "report");
});

test("해시는 받은 JSON 전체(ext 포함)에서 계산한다", async () => {
  const s = await startMock();
  try {
    const raw = await (await fetch(`${s.base}/v1/submissions/sub-await/review-report`)).json();
    assert.equal((await s.client.getReviewReport("sub-await")).reportHash, sha256Hash(raw));
  } finally { await s.close(); }
});
