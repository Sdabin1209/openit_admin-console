// 전수 점검 지적에 대한 시험(DOM 없음): 응답 대조, 서버 응답 이상, 본문 읽기 시간 제한, 시각 표시, 주소 해석, 가짜 시계.
import { PIPELINE_SCHEMA_VERSION } from "../app/types/contract-validators.cjs";
import { test } from "node:test";
import assert from "node:assert/strict";
import { ApiError, Http } from "./helpers.ts";
import { GateClient } from "../app/wiring/gateway.ts";
import { ReleasesClient } from "../app/wiring/gateway.ts";
import { OpsController, describeOpsError } from "../app/wiring/ops_controller.ts";
import { fmtTime } from "../app/ui/views.ts";
import { routeParse } from "../app/components/route_parse.ts";
import { FIXED_NOW, startMock } from "./helpers.ts";

const json = (body: unknown, status = 200) => new Response(JSON.stringify(body), { status, headers: { "Content-Type": "application/json" } });
const H = "sha256:" + "0".repeat(64);

test("2xx인데 JSON이 아니면 '서버 응답 이상'(BAD_RESPONSE)이고 연결 실패(UNAVAILABLE)와 구분된다", async () => {
  const html = (async () => new Response("<html>gateway</html>", { status: 200 })) as typeof fetch;
  const e = await new Http({ fetch: html }).json("GET", "/v1/x").catch((x) => x);
  assert.ok(e instanceof ApiError);
  assert.equal(e.kind, "BAD_RESPONSE");
  assert.ok(e.message.includes("서버 응답 이상"));
  const down = (async () => { throw new TypeError("x"); }) as unknown as typeof fetch;
  assert.equal((await new Http({ fetch: down }).json("GET", "/v1/x").catch((x: unknown) => x) as { kind: string }).kind, "UNAVAILABLE");
  // 화면 문구도 다르다
  const d = describeOpsError(e);
  assert.equal(d.kind, "badresponse");
  assert.ok(d.text.includes("서버 응답 이상"));
});

test("시간 제한 기본값 15000ms가 타이머에 넘어간다(실제 시간을 재지 않는다, ADR 0010)", async () => {
  const seen: number[] = [];
  const timers = { set: (_fn: () => void, ms: number) => { seen.push(ms); return 1; }, clear: () => {} };
  const ok = (async () => new Response("{}", { status: 200 })) as unknown as typeof fetch;
  await new Http({ fetch: ok, timers }).json("GET", "/v1/x");
  assert.deepEqual(seen, [15000]);
});

test("시간 제한은 본문을 다 읽을 때까지 걸려 있다(가짜 시계, 실제 대기 없음)", async () => {
  const hold: { fire?: () => void; ms?: number } = {};
  let cleared = 0;
  const timers = { set: (fn: () => void, ms: number) => { hold.fire = fn; hold.ms = ms; return 1; }, clear: () => { cleared++; } };
  // 헤더는 오고 본문이 멈추는 서버: signal이 abort되면 text()가 실패한다.
  const stall = (async (_u: string, init: RequestInit) => ({
    ok: true, status: 200, headers: new Headers(),
    text: () => new Promise<string>((_, rej) => init.signal!.addEventListener("abort", () => rej(new Error("aborted")))),
  })) as unknown as typeof fetch;
  const p = new Http({ fetch: stall, timers, timeoutMs: 1 }).json("GET", "/v1/x").catch((x) => x);
  await Promise.resolve(); await Promise.resolve();
  assert.ok(hold.fire, "시간 제한이 걸렸다");
  assert.equal(hold.ms, 1, "넘긴 제한 값(timeoutMs)이 타이머에 그대로 간다");
  hold.fire!(); // 가짜 시계가 제한 시간이 지났다고 알린다
  const e = await p;
  assert.ok(e instanceof ApiError);
  assert.equal(e.kind, "UNAVAILABLE");
  assert.equal(cleared, 1, "끝나면 타이머를 지운다");
});

test("승인 응답 대조: 제출·결정·report_hash가 요청과 다르면 성공으로 보이지 않는다", async () => {
  const req = { submissionId: "s1", decision: "APPROVE" as const, reportHash: H };
  const ok = { pipeline_schema_version: PIPELINE_SCHEMA_VERSION, approval_id: "ap-1", submission_id: "s1", decision: "APPROVE", approver_id: "u", approver_role: "release-approver", decided_at: FIXED_NOW, report_hash: H };
  const mk = (b: unknown) => new GateClient({ fetch: (async () => json(b, 201)) as typeof fetch });
  assert.equal((await mk(ok).decide(req)).approval.approval_id, "ap-1");
  for (const bad of [{ ...ok, decision: "REJECT" }, { ...ok, submission_id: "s2" }, { ...ok, report_hash: "sha256:" + "1".repeat(64) }]) {
    const e = await mk(bad).decide(req).catch((x) => x);
    assert.equal(e.kind, "BAD_RESPONSE", JSON.stringify(bad));
  }
});

test("활성화·롤백 응답 대조", async () => {
  const ptr = (id: string) => ({ pipeline_schema_version: PIPELINE_SCHEMA_VERSION, release_id: id, pointer_version: 2, activated_at: FIXED_NOW, cause: "ACTIVATE" });
  const act = (b: unknown) => new ReleasesClient({ fetch: (async () => json(b)) as typeof fetch }).activate("rel-2");
  assert.equal((await act(ptr("rel-2"))).release_id, "rel-2");
  assert.equal((await act(ptr("rel-9")).catch((x) => x)).kind, "BAD_RESPONSE");
  const body = { request_id: "rb-1", requested_at: FIXED_NOW, from_release_id: "rel-3", to_release_id: "rel-2", reason: "x", evidence_refs: ["e"] as [string, ...string[]] };
  const rb = (b: unknown) => new ReleasesClient({ fetch: (async () => json(b, 201)) as typeof fetch }).rollback(body);
  const rc = { pipeline_schema_version: PIPELINE_SCHEMA_VERSION, request_id: "rb-1", status: "APPLIED", decided_at: FIXED_NOW, active_pointer: ptr("rel-2") };
  assert.equal((await rb(rc)).status, "APPLIED");
  assert.equal((await rb({ ...rc, request_id: "other" }).catch((x) => x)).kind, "BAD_RESPONSE");
  assert.equal((await rb({ ...rc, active_pointer: ptr("rel-1") }).catch((x) => x)).kind, "BAD_RESPONSE");
  assert.equal((await rb({ ...rc, status: "APPLIED", active_pointer: undefined }).catch((x) => x)).kind, "BAD_RESPONSE");
  assert.equal((await rb({ ...rc, status: "REJECTED", active_pointer: undefined, reason: "같은 릴리스" })).status, "REJECTED");
});

test("요청 본문의 requested_by_role은 계약 값 operator다(활성화·롤백)", async () => {
  const sent: unknown[] = [];
  const f = (async (_u: string, init: RequestInit) => { sent.push(JSON.parse(String(init.body))); return json({ pipeline_schema_version: PIPELINE_SCHEMA_VERSION, release_id: "r", pointer_version: 1, activated_at: FIXED_NOW, cause: "ACTIVATE" }); }) as typeof fetch;
  await new ReleasesClient({ fetch: f }).activate("r");
  assert.deepEqual(sent[0], { release_id: "r", requested_by_role: "operator" });
});

test("시각 표시: UTC 원문을 그대로 두고 현지 시각을 병기한다. 해석 못 하면 원문만", () => {
  const t = fmtTime("2026-10-14T00:00:00Z", "Asia/Seoul");
  assert.ok(t.startsWith("2026-10-14T00:00:00Z"), t);
  assert.ok(t.includes("현지 2026-10-14 09:00"), t);
  assert.equal(fmtTime("not-a-date"), "not-a-date");
  assert.equal(fmtTime(undefined), "—");
});

test("주소의 잘못된 퍼센트 인코딩은 예외 없이 null", () => {
  assert.deepEqual(routeParse({ hash: "#/s/sub%2D1" }), { screen: "approvals", view: "detail", id: "sub-1" });
  assert.equal(routeParse({ hash: "#/s/%E0%A4%A" }).screen, "bad_address");
});

test("요청 ID 생성기와 시계를 주입하면 롤백 요청 본문이 결정적이다", async () => {
  const s = await startMock();
  try {
    const c = new OpsController(new ReleasesClient({ baseUrl: s.base }), () => FIXED_NOW, () => "fixed-uuid");
    await c.load();
    c.startRollback();
    c.setField({ reason: "r", evidenceText: "fc-1" });
    await c.submit();
    const b = s.mock.releases.log().at(-1)!.body;
    assert.equal(b.request_id, "rb-fixed-uuid");
    assert.equal(b.requested_at, FIXED_NOW);
    assert.equal(c.state.receipt?.rollback?.decided_at, FIXED_NOW, "모의 서버도 고정 시계");
  } finally { await s.close(); }
});
