// 릴리스 활성화·롤백 흐름: 모의 서버(HTTP) + 클라이언트 + 컨트롤러. DOM 없음.
import { test } from "node:test";
import assert from "node:assert/strict";
import { ReleasesClient } from "../api/releases.ts";
import { ApiError } from "../api/http.ts";
import { OpsController, activateCandidates, rollbackCandidates } from "../app/ops-controller.ts";
import { startMock } from "./helpers.ts";

async function setup() {
  const s = await startMock();
  const api = new ReleasesClient({ baseUrl: s.base });
  const c = new OpsController(api);
  await c.load();
  return { s, api, c };
}
const typeConfirm = (c: OpsController) => c.setField({ confirmText: c.state.pending!.target });

test("불러오기: 활성 포인터와 릴리스 이력, 활성화·롤백 후보", async () => {
  const { s, c } = await setup();
  try {
    assert.equal(c.state.phase, "ready");
    assert.equal(c.state.pointer?.release_id, "rel-0003");
    assert.equal(c.state.pointer?.pointer_version, 3);
    assert.deepEqual(c.state.releases.map((r) => r.release_id), ["rel-0004", "rel-0003", "rel-0002", "rel-0001"]);
    assert.deepEqual(activateCandidates(c.state.releases, c.state.pointer).map((r) => r.release_id), ["rel-0004"]);
    assert.deepEqual(rollbackCandidates(c.state.releases, c.state.pointer).map((r) => r.release_id), ["rel-0002", "rel-0001"]);
  } finally { await s.close(); }
});

test("활성화: 확인 입력이 틀리면 보내지 않고, 맞으면 영수증과 이력이 갱신된다. 본문에 행위자가 없고 역할은 operator다", async () => {
  const { s, c } = await setup();
  try {
    c.startActivate("rel-0004");
    c.setField({ confirmText: "rel-0003" });
    await c.submit();
    assert.equal(s.mock.releases.postCount(), 0);
    assert.ok(c.state.errors[0].includes("정확히 입력"));
    typeConfirm(c);
    await c.submit();
    assert.equal(c.state.receipt?.kind, "activate");
    assert.equal(c.state.receipt?.pointer?.release_id, "rel-0004");
    assert.equal(c.state.receipt?.pointer?.pointer_version, 4);
    assert.equal(c.state.pointer?.release_id, "rel-0004");
    assert.equal(c.state.pending, null);
    assert.deepEqual(activateCandidates(c.state.releases, c.state.pointer), []);
    const log = s.mock.releases.log();
    assert.equal(log.length, 1);
    assert.deepEqual(log[0].body, { release_id: "rel-0004", requested_by_role: "operator" }, "계약(HTTP.md I5): {release_id, requested_by_role}");
    assert.equal(log[0].actor, "gw-user-1", "행위자는 게이트웨이 헤더로 정해진다");
  } finally { await s.close(); }
});

test("롤백: 기본 대상은 가장 가까운 이전 릴리스, 사유·근거 필수, 영수증과 포인터 갱신", async () => {
  const { s, c } = await setup();
  try {
    c.startRollback();
    assert.equal(c.state.pending?.target, "rel-0002");
    typeConfirm(c);
    await c.submit();
    assert.equal(c.state.errors.length, 2);
    assert.equal(s.mock.releases.postCount(), 0);
    c.setField({ reason: "응답 지연 증가", evidenceText: "fc-1, fc-2" });
    await c.submit();
    const rb = c.state.receipt?.rollback;
    assert.equal(rb?.status, "APPLIED");
    assert.equal(rb?.active_pointer?.release_id, "rel-0002");
    assert.equal(rb?.active_pointer?.cause, "ROLLBACK");
    assert.equal(c.state.pointer?.release_id, "rel-0002");
    const body = s.mock.releases.log()[0].body;
    assert.deepEqual(Object.keys(body).sort(), ["evidence_refs", "from_release_id", "pipeline_schema_version", "reason", "request_id", "requested_at", "requested_by_role", "to_release_id"]);
    assert.equal(body.from_release_id, "rel-0003");
    assert.deepEqual(body.evidence_refs, ["fc-1", "fc-2"]);
    // 롤백 뒤에는 방금 내린 릴리스가 활성화 후보가 된다
    assert.deepEqual(activateCandidates(c.state.releases, c.state.pointer).map((r) => r.release_id), ["rel-0004", "rel-0003"]);
  } finally { await s.close(); }
});

test("롤백: 같은 request_id를 다시 보내면 같은 영수증(멱등)", async () => {
  const { s, api, c } = await setup();
  try {
    const body = { pipeline_schema_version: "2.0", request_id: "rb-fixed", requested_at: "2026-10-27T00:00:00Z", from_release_id: "rel-0003", to_release_id: "rel-0002", reason: "x", evidence_refs: ["fc-1"] };
    const a = await api.rollback(body);
    const b = await api.rollback(body);
    assert.deepEqual(b, a);
    assert.equal(s.mock.releases.pointer()?.pointer_version, 4);
    void c;
  } finally { await s.close(); }
});

test("403: operator가 아니면 불러오기도 활성화도 권한 안내", async () => {
  const { s, c } = await setup();
  try {
    c.startActivate("rel-0004");
    typeConfirm(c);
    s.mock.releases.setOperator(false);
    await c.submit();
    assert.equal(c.state.notice?.kind, "denied");
    assert.ok(c.state.notice!.text.includes("operator"));
    assert.equal(c.state.pointer?.release_id, "rel-0003", "상태는 바뀌지 않았다");
    await c.load();
    assert.equal(c.state.phase, "error");
    assert.ok(c.state.error!.includes("operator"));
  } finally { await s.close(); }
});

test("409: 경쟁 — 다른 운영자가 먼저 바꿨으면 알리고 현재 상태를 다시 읽는다", async () => {
  const { s, c } = await setup();
  try {
    c.startRollback();
    c.setField({ confirmText: "rel-0002", reason: "r", evidenceText: "fc-1" });
    s.mock.releases.externalActivate("rel-0004"); // 화면이 모르는 사이에 활성이 바뀜
    await c.submit();
    assert.equal(c.state.notice?.kind, "conflict");
    assert.ok(c.state.notice!.text.includes("409"));
    assert.equal(c.state.pointer?.release_id, "rel-0004", "현재 상태를 다시 읽었다");
    assert.equal(c.state.pending, null);
    assert.equal(c.state.receipt, null);
  } finally { await s.close(); }
});

test("409: 이미 활성인 릴리스를 활성화하면 충돌", async () => {
  const { s, c } = await setup();
  try {
    s.mock.releases.forceConflictNext();
    c.startActivate("rel-0004");
    typeConfirm(c);
    await c.submit();
    assert.equal(c.state.notice?.kind, "conflict");
  } finally { await s.close(); }
});

test("412: PASS가 아닌 릴리스는 서버가 거절하고 화면이 안내한다", async () => {
  const { s, c } = await setup();
  try {
    c.startActivate("rel-unapproved");
    typeConfirm(c);
    await c.submit();
    assert.equal(c.state.notice?.kind, "precondition");
    assert.ok(c.state.notice!.text.includes("PASS"));
    assert.equal(c.state.pointer?.release_id, "rel-0003");
  } finally { await s.close(); }
});

test("네트워크 오류: 적용 여부를 모른다고 알린다", async () => {
  const { s, c } = await setup();
  const base = s.base;
  c.startActivate("rel-0004");
  typeConfirm(c);
  await s.close(); // 서버가 사라진다
  void base;
  await c.submit();
  assert.equal(c.state.notice?.kind, "network");
  assert.ok(c.state.notice!.text.includes("적용됐는지 알 수 없"));
  assert.equal(c.state.phase, "ready");
});

test("클라이언트 오류 종류: 403/409/412", async () => {
  const s = await startMock();
  try {
    const api = new ReleasesClient({ baseUrl: s.base });
    await assert.rejects(api.activate("rel-9999"), (e) => e instanceof ApiError && e.kind === "NOT_FOUND");
    await assert.rejects(api.activate("rel-unapproved"), (e) => e instanceof ApiError && e.kind === "FAILED_PRECONDITION");
    await assert.rejects(api.activate("rel-0003"), (e) => e instanceof ApiError && e.kind === "CONFLICT");
    s.mock.releases.setOperator(false);
    await assert.rejects(api.activePointer(), (e) => e instanceof ApiError && e.kind === "PERMISSION_DENIED");
  } finally { await s.close(); }
});

// C5(2026-10-29 점검): 릴리스 목록이 20쪽에서 조용히 잘리면 안 된다. 기대값은 계약 HTTP.md 공통 목록 규칙
// ("목록은 {items, next_cursor}, 쿼리 cursor·limit(기본 100, 최대 500)")과 "조용한 데이터 손실 금지"에서 나왔다.
// 쪽 크기 500 x 20쪽 = 10000건. 10001건이면 21쪽이 필요하다.
test("C5 모의 서버는 계약대로 쪽을 나눈다(limit 기본 100, 최대 500, next_cursor)", async () => {
  const s = await startMock();
  try {
    s.mock.releases.seedOlder(1196); // 4 + 1196 = 1200
    const first = await (await fetch(`${s.base}/v1/releases`)).json() as { items: unknown[]; next_cursor: string | null };
    assert.equal(first.items.length, 100, "limit 기본 100");
    assert.ok(first.next_cursor);
    const big = await (await fetch(`${s.base}/v1/releases?limit=9999`)).json() as { items: unknown[] };
    assert.ok(big.items.length <= 500, "limit 최대 500");
    const bad = await fetch(`${s.base}/v1/releases?cursor=zzz`);
    assert.equal(bad.status, 400, "알 수 없는 cursor는 400 INVALID_RECORD");
  } finally { await s.close(); }
});

test("C5 릴리스가 3쪽(1200건)이면 끝까지 읽는다", async () => {
  const s = await startMock();
  try {
    s.mock.releases.seedOlder(1196);
    const all = await new ReleasesClient({ baseUrl: s.base }).listReleases();
    assert.equal(all.length, 1200);
    assert.equal(new Set(all.map((r) => r.release_id)).size, 1200, "중복 없이");
    assert.equal(all[0].release_id, "rel-0004", "최신부터");
  } finally { await s.close(); }
});

test("C5 릴리스가 21쪽 이상(10001건)이면 조용히 자르지 않고 오류를 낸다", async () => {
  const s = await startMock();
  try {
    s.mock.releases.seedOlder(9997); // 4 + 9997 = 10001
    const r = await new ReleasesClient({ baseUrl: s.base }).listReleases().then((x) => ({ ok: x.length }), (e) => ({ err: e }));
    assert.ok("err" in r, `조용히 ${(r as { ok: number }).ok}건만 돌려줬다`);
    assert.ok((r as { err: unknown }).err instanceof ApiError);
  } finally { await s.close(); }
});

test("C5 릴리스 목록 오류면 화면은 후보를 계산하지 않고 오류 상태가 된다", async () => {
  const s = await startMock();
  try {
    s.mock.releases.seedOlder(9997);
    const c = new OpsController(new ReleasesClient({ baseUrl: s.base }));
    await c.load();
    assert.equal(c.state.phase, "error");
    assert.deepEqual(c.state.releases, []);
    assert.ok(c.state.error!.includes("20쪽") || c.state.error!.includes("모두 읽지"), c.state.error!);
  } finally { await s.close(); }
});
