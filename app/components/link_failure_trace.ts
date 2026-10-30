// 통신 컴포넌트 link_failure_trace: TraceRefInput -> 비식별 trace(계약 OpsFeedbackDeidentifiedTrace). ops-feedback I7 `GET /v1/deidentified-traces/{ref}`. 계약 스키마로 검사한다.
import * as v from "../types/validators.cjs";
import * as c from "../types/contract-validators.cjs";
import type { TraceRefInput } from "../types/TraceRefInput.ts";
import type { ErrorInfo } from "../types/ErrorInfo.ts";
import type { OpsFeedbackDeidentifiedTrace } from "../types/contract/OpsFeedbackDeidentifiedTrace.ts";
import type { HttpRequestSpec } from "../types/HttpRequestSpec.ts";
import type { HttpOutcome } from "../types/HttpOutcome.ts";

// link_http_send가 주입되는 자리. 그 컴포넌트를 import하지 않고 입출력 스키마(HttpRequestSpec -> HttpOutcome)만 안다(규칙 3).
type HttpSend = (spec: HttpRequestSpec) => Promise<HttpOutcome>;

export type Result = { ok: true; value: OpsFeedbackDeidentifiedTrace } | { ok: false; error: ErrorInfo };

export function createFailureTrace(send: HttpSend): (input: TraceRefInput) => Promise<Result> {
  return async (input) => {
    v.assertValid(v.TraceRefInput, input, "link_failure_trace");
    const r = await send({ method: "GET", path: `/v1/deidentified-traces/${encodeURIComponent(input.ref)}` });
    if (!r.ok) return r;
    // 왜 값을 싣지 않나: trace에는 검토자가 쓴 글이 들어 있을 수 있다. 위치와 규칙 이름만 말한다.
    if (!c.OpsFeedbackDeidentifiedTrace(r.data)) return { ok: false, error: { kind: "BAD_RESPONSE", status: 0, message: `응답 형식이 맞지 않는다: OpsFeedbackDeidentifiedTrace: ${(c.OpsFeedbackDeidentifiedTrace.errors ?? []).slice(0, 3).map((e) => `${e.instancePath || "(최상위)"} ${e.message ?? e.keyword}`).join("; ") || "스키마에 맞지 않는다"}`, retryable: false } };
    return { ok: true, value: r.data as OpsFeedbackDeidentifiedTrace };
  };
}
