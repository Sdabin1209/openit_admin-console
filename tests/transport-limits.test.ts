// 전송 계층 한도 응답(413/414/431): HTTP 서버(예: waitress)가 앱을 부르기 전에 text/plain 본문으로 낼 수 있다.
// 기대값의 출처: boundary-contracts CONVENTIONS.md 9절(2.2.2) "클라이언트는 본문과 무관하게 INVALID_RECORD(재시도 안 함)로 읽는다".
import { test } from "node:test";
import assert from "node:assert/strict";
import { GateClient } from "../api/client.ts";
import { CasesClient } from "../api/cases.ts";
import { ApiError, toError } from "../api/http.ts";
import { describeOpsError } from "../app/ops-controller.ts";

const HASH = "sha256:" + "0".repeat(64);
const plain = (status: number, calls: { n: number }) => (async () => {
  calls.n++;
  return new Response("Request Entity Too Large", { status, headers: { "Content-Type": "text/plain" } });
}) as typeof fetch;

for (const status of [413, 414, 431]) {
  test(`${status} text/plain: INVALID_RECORD, 재시도 불가, 사용자에게 보일 안내가 있다`, () => {
    const e = toError(status, null);
    assert.equal(e.kind, "INVALID_RECORD");
    assert.equal(e.retryable, false);
    assert.equal(e.status, status);
    assert.match(e.message, /너무/);
  });

  test(`${status}: 본문이 retryable=true인 BoundaryError여도 본문과 무관하게 재시도 불가`, () => {
    const e = toError(status, { pipeline_schema_version: "2.2", code: "UNAVAILABLE", message: "m", retryable: true });
    assert.equal(e.kind, "INVALID_RECORD");
    assert.equal(e.retryable, false);
  });
}

test("승인 전송이 413을 받으면 한 번만 보내고 INVALID_RECORD로 끝난다(자동 재시도 0회)", async () => {
  const calls = { n: 0 };
  const e = await new GateClient({ fetch: plain(413, calls) }).decide({ submission_id: "s-1", decision: "APPROVE", approver_role: "release-approver", report_hash: HASH } as never).catch((x) => x);
  assert.ok(e instanceof ApiError);
  assert.equal(e.kind, "INVALID_RECORD");
  assert.equal(e.retryable, false);
  assert.equal(calls.n, 1);
});

test("검토 전송이 431을 받아도 같다", async () => {
  const calls = { n: 0 };
  const e = await new CasesClient({ fetch: plain(431, calls) }).review("fc-1", { review_status: "PENDING" }).catch((x) => x);
  assert.equal(e.kind, "INVALID_RECORD");
  assert.equal(calls.n, 1);
});

test("릴리스 운영 화면: 413은 '요청이 너무 크다' 계열 안내이고 상태 코드를 400으로 잘못 적지 않는다", () => {
  const d = describeOpsError(toError(413, null));
  assert.equal(d.kind, "invalid");
  assert.match(d.text, /너무 크다/);
  assert.doesNotMatch(d.text, /\(400\)/);
});
