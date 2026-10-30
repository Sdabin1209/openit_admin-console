// C9(2026-10-29 점검): 호출자는 BoundaryError의 code와 retryable로 행동한다. 기대값의 출처:
// boundary-contracts/CONVENTIONS.md 오류 절("호출자는 code와 retryable로만 행동한다"; 같은 code 안의 재시도 사유는 details.reason)과
// HTTP.md 공통("네트워크 오류와 5xx와 503은 UNAVAILABLE(재시도 가능)"), schemas/BoundaryError.schema.json(retryable 필수 boolean).
import { PIPELINE_SCHEMA_VERSION } from "../app/types/contract-validators.cjs";
import { test } from "node:test";
import assert from "node:assert/strict";
import { Http, toError } from "./helpers.ts";

const body = (o: Record<string, unknown>) => ({ pipeline_schema_version: PIPELINE_SCHEMA_VERSION, message: "m", ...o });

test("본문 retryable=true이면 상태 코드가 409여도 재시도 가능이다(CONVENTIONS: 409 CONFLICT의 TURN_IN_PROGRESS 같은 사유)", () => {
  assert.equal(toError(409, body({ code: "CONFLICT", retryable: true, details: { reason: "TURN_IN_PROGRESS" } })).retryable, true);
});

test("본문 retryable=false이면 503 UNAVAILABLE이 아닌 코드는 재시도 불가다", () => {
  assert.equal(toError(409, body({ code: "CONFLICT", retryable: false })).retryable, false);
  assert.equal(toError(403, body({ code: "PERMISSION_DENIED", retryable: false })).retryable, false);
});

test("본문 retryable을 상태 코드보다 우선한다(500대 상태에 retryable=false 본문)", () => {
  assert.equal(toError(500, body({ code: "UNAVAILABLE", retryable: false })).retryable, false);
});

test("본문이 BoundaryError가 아니면(게이트웨이의 502 HTML 등) 5xx는 재시도 가능, 4xx는 아니다(HTTP.md: 5xx는 UNAVAILABLE)", () => {
  assert.equal(toError(502, null).retryable, true);
  assert.equal(toError(404, null).retryable, false);
});

test("Http.json 경로에서도 본문 retryable이 ApiError에 실린다", async () => {
  const f = (async () => new Response(JSON.stringify(body({ code: "CONFLICT", retryable: true })), { status: 409, headers: { "Content-Type": "application/json" } })) as typeof fetch;
  const e = await new Http({ fetch: f }).json("GET", "/v1/x").catch((x) => x);
  assert.equal((e as { retryable: boolean }).retryable, true);
});
