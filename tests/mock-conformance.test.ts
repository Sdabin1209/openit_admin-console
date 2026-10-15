// 모의 서버의 출력이 계약 스키마(../boundary-contracts/schemas, 복사 없음)를 지키는지 검증한다.
import { test, after } from "node:test";
import assert from "node:assert/strict";
import { readdirSync, readFileSync } from "node:fs";
import Ajv2020 from "ajv/dist/2020.js";
import addFormats from "ajv-formats";
import { baseReport } from "../mock-server/scenarios.ts";
import { sha256Hash } from "../api/jcs.ts";
import { startMock } from "./helpers.ts";

const dir = new URL("../../boundary-contracts/schemas/", import.meta.url);
const ajv = new Ajv2020({ strict: false, allErrors: true });
(addFormats as unknown as (a: unknown) => void)(ajv);
for (const f of readdirSync(dir)) if (f.endsWith(".json")) { const sc = JSON.parse(readFileSync(new URL(f, dir), "utf8")); ajv.addSchema({ ...sc, $id: sc.$id ?? f }); } // $id가 없는 스키마는 파일 이름으로 읽는다(복사본 없음)
const check = (name: string, v: unknown) => {
  const fn = ajv.getSchema(`${name}.schema.json`);
  assert.ok(fn, `schema ${name}`);
  assert.ok(fn!(v), `${name}: ${JSON.stringify(fn!.errors)}`);
};

const s = await startMock();
after(() => s.close());
const j = async (path: string, init?: RequestInit) => { const r = await fetch(s.base + path, init); return { status: r.status, body: await r.json() }; };

test("공식 예제가 스키마를 통과한다(검증기 점검)", () => {
  const ex = (n: string) => JSON.parse(readFileSync(new URL(`../../boundary-contracts/examples/${n}.json`, import.meta.url), "utf8"));
  check("ReviewReport", ex("ReviewReport"));
  check("SubmissionView", ex("SubmissionView"));
  check("GateApproval", ex("GateApproval"));
});

test("검증기는 잘못된 레코드를 거부한다", () => {
  assert.throws(() => check("ReviewReport", { submission_id: "x" }));
  assert.throws(() => check("SubmissionView", { ...baseReport("x"), status: 1 }));
});

test("보고서(v1, v2)와 목록과 제출 조회가 스키마를 통과한다", async () => {
  check("ReviewReport", baseReport("x", 1));
  check("ReviewReport", baseReport("x", 2));
  const list = await j("/v1/submissions?status=AWAITING_APPROVAL");
  assert.equal(list.status, 200);
  assert.equal(list.body.items.length, 4);
  for (const it of list.body.items) check("SubmissionView", it);
  const rr = await j("/v1/submissions/sub-await/review-report");
  check("ReviewReport", rr.body);
  const none = await j("/v1/submissions/sub-pending/review-report");
  assert.equal(none.status, 409);
  check("BoundaryError", none.body);
});

test("결정 응답과 오류가 스키마를 통과한다", async () => {
  const post = (b: unknown) => j("/v1/approvals", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(b) });
  const hash = sha256Hash((await j("/v1/submissions/sub-await/review-report")).body);
  const base = { submission_id: "sub-await", approver_id: "t1", approver_role: "release-approver" };
  const rej = await post({ ...base, decision: "REJECT", report_hash: hash });
  assert.equal(rej.status, 400); check("BoundaryError", rej.body);
  const ok = await post({ ...base, decision: "APPROVE", report_hash: hash });
  assert.equal(ok.status, 201); check("GateApproval", ok.body);
  const again = await post({ ...base, decision: "APPROVE", report_hash: hash });
  assert.equal(again.status, 200);
  const other = await post({ ...base, decision: "REJECT", reason: "x", report_hash: hash });
  assert.equal(other.status, 409); check("BoundaryError", other.body);
  const view = await j("/v1/submissions/sub-await");
  assert.equal(view.body.status, "PASSED"); check("SubmissionView", view.body);
  const stale = await post({ ...base, submission_id: "sub-await-stale", decision: "APPROVE", report_hash: hash });
  assert.equal(stale.status, 409); check("BoundaryError", stale.body);
  const denied = await post({ ...base, submission_id: "sub-await-403", decision: "APPROVE" });
  assert.equal(denied.status, 403); check("BoundaryError", denied.body);
});
