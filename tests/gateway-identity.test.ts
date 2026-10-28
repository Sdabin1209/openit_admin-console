// AC-02: 승인자 식별은 게이트웨이의 X-Openit-User 한 길뿐이다. 기대값은 계약 HTTP.md I5 승인자 식별 항목에서 나왔다
// (헤더가 없으면 401, 본문 approver_id는 무시, 본문이 헤더와 다르면 거부, 개발·시험은 시험용 게이트웨이가 헤더를 붙인다).
import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import type { AddressInfo } from "node:net";
import { createMock } from "../mock-server/server.ts";
import { Controller } from "../app/controller.ts";
import { GateClient } from "../api/client.ts";

async function raw(opts: { gatewayUser?: string }, headers: Record<string, string>, extra: Record<string, unknown>) {
  const mock = createMock({ now: () => "2026-10-20T00:00:00Z", gatewayUser: opts.gatewayUser });
  await new Promise<void>((r) => mock.server.listen(0, "127.0.0.1", r));
  const base = `http://127.0.0.1:${(mock.server.address() as AddressInfo).port}`;
  try {
    const hash = (await fetch(`${base}/v1/submissions/sub-await/review-report`)).headers.get("X-Openit-Report-Hash")!;
    const r = await fetch(`${base}/v1/approvals`, { method: "POST", headers: { "Content-Type": "application/json", ...headers },
      body: JSON.stringify({ submission_id: "sub-await", decision: "APPROVE", approver_role: "release-approver", report_hash: hash, ...extra }) });
    return { status: r.status, body: await r.json() as { code?: string }, approvals: mock.approvals.length };
  } finally { mock.server.close(); mock.server.closeAllConnections(); }
}

test("X-Openit-User가 없으면 401이고 아무것도 기록되지 않는다(본문 approver_id가 있어도)", async () => {
  const r = await raw({}, {}, { approver_id: "body-user" });
  assert.equal(r.status, 401);
  assert.equal(r.approvals, 0);
});

test("본문 approver_id가 헤더와 다르면 거부한다", async () => {
  const r = await raw({}, { "X-Openit-User": "alice" }, { approver_id: "mallory" });
  assert.ok(r.status >= 400 && r.status < 500, `status ${r.status}`);
  assert.equal(r.approvals, 0);
});

test("헤더만 있으면 헤더 값이 승인자로 기록된다", async () => {
  const r = await raw({}, { "X-Openit-User": "alice" }, {});
  assert.equal(r.status, 201);
});

test("화면은 승인 본문에 approver_id를 싣지 않는다", async () => {
  const mock = createMock({ now: () => "2026-10-20T00:00:00Z", slowMs: 1, gatewayUser: "gw-1" });
  await new Promise<void>((r) => mock.server.listen(0, "127.0.0.1", r));
  const base = `http://127.0.0.1:${(mock.server.address() as AddressInfo).port}`;
  const bodies: string[] = [];
  const rec = (async (u: string, init?: RequestInit) => { if (init?.method === "POST") bodies.push(String(init.body)); return fetch(u, init); }) as typeof fetch;
  try {
    const c = new Controller(new GateClient({ baseUrl: base, fetch: rec }));
    await c.openReport("sub-await");
    c.requestDecision("APPROVE");
    c.setConfirmText(c.state.submissionId!);
    await c.confirm();
    assert.equal(c.state.phase, "done");
    assert.equal(bodies.length, 1);
    assert.ok(!("approver_id" in JSON.parse(bodies[0])));
    assert.equal(mock.approvals[0].approver_id, "gw-1");
  } finally { mock.server.close(); mock.server.closeAllConnections(); }
});

test("개발 모드 설정 경로(ADMIN_DEV_APPROVER_ID, /config.json, dev_approver_id)가 소스에 없다", () => {
  for (const f of ["app/main.ts", "app/controller.ts", "app/views.ts", "mock-server/main.ts", "mock-server/server.ts", "scripts/smoke.sh", "api/types.ts", "serve/Caddyfile"]) {
    const t = readFileSync(new URL(`../${f}`, import.meta.url), "utf8");
    assert.ok(!/ADMIN_DEV_APPROVER_ID|dev_approver_id|config\.json|devApprover/.test(t), f);
  }
});
