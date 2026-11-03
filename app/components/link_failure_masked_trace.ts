// 통신 컴포넌트 link_failure_masked_trace: TraceRefInput -> 마스킹된 trace(계약 OpsFeedbackDeidentifiedTrace). I7 `GET /v1№deidentified-traces/{ref}`. 편집창 채우기 전용: 원문 발화가 reviewed_input으로 새지 않게 이 뷰만 쓴다(ADR 0025).
import * as v from "../types/validators.cjs";
import type { TraceRefInput } from "../types/TraceRefInput.ts";
import type { ErrorInfo } from "../types/ErrorInfo.ts";
import type { OpsFeedbackDeidentifiedTrace } from "../types/contract/OpsFeedbackDeidentifiedTrace.ts";
import type { HttpRequestSpec } from "../types/HttpRequestSpec.ts";
import type { HttpOutcome } from "../types/HttpOutcome.ts";

// link_http_send가 주입되는 자리. 그 컴포넌트를 import하지 않고 입출력 스키마(HttpRequestSpec -> HttpOutcome)만 안다(규칙 3).
type HttpSend = (spec: HttpRequestSpec) => Promise<HttpOutcome>;

// 받은 본문은 다시 검증하지 않는다(계약에서 이 영역이 x-consumers인 값, ADR 0010 R7, 이 영역 ADR 0030).
export type Result = { ok: true; value: OpsFeedbackDeidentifiedTrace } | { ok: false; error: ErrorInfo };

export function createFailureMaskedTrace(send: HttpSend): (input: TraceRefInput) => Promise<Result> {
  return async (input) => {
    v.assertValid(v.TraceRefInput, input, "link_failure_masked_trace");
    const r = await send({ method: "GET", path: `/v1/deidentified-traces/${encodeURIComponent(input.ref)}` });
    if (!r.ok) return r;
    return { ok: true, value: r.data as OpsFeedbackDeidentifiedTrace };
  };
}
