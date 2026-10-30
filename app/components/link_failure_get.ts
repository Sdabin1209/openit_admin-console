// 통신 컴포넌트 link_failure_get: CaseGetInput -> CaseRecord. ops-feedback I7 `GET /v1/cases/{id}?version=`.
import * as v from "../types/validators.cjs";
import type { CaseGetInput } from "../types/CaseGetInput.ts";
import type { CaseRecord } from "../types/CaseRecord.ts";
import type { ErrorInfo } from "../types/ErrorInfo.ts";
import type { HttpRequestSpec } from "../types/HttpRequestSpec.ts";
import type { HttpOutcome } from "../types/HttpOutcome.ts";

// link_http_send가 주입되는 자리. 그 컴포넌트를 import하지 않고 입출력 스키마(HttpRequestSpec -> HttpOutcome)만 안다(규칙 3).
type HttpSend = (spec: HttpRequestSpec) => Promise<HttpOutcome>;

export type Result = { ok: true; value: CaseRecord } | { ok: false; error: ErrorInfo };

export function createFailureGet(send: HttpSend): (input: CaseGetInput) => Promise<Result> {
  return async (input) => {
    v.assertValid(v.CaseGetInput, input, "link_failure_get");
    const q = input.version === undefined ? "" : `?version=${input.version}`;
    const r = await send({ method: "GET", path: `/v1/cases/${encodeURIComponent(input.caseId)}${q}` });
    if (!r.ok) return r;
    if (!v.CaseRecord(r.data)) return { ok: false, error: { kind: "BAD_RESPONSE", status: 0, message: "응답 형식이 맞지 않는다: FailureCase", retryable: false } };
    return { ok: true, value: r.data as CaseRecord };
  };
}
