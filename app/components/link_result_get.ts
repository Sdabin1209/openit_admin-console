// 통신 컴포넌트 link_result_get: ResultIdInput -> ResultRecord. 문진 서비스 `GET /v1/results/{session_id}`(계약 PUBLIC_API B).
import * as v from "../types/validators.cjs";
import type { ResultIdInput } from "../types/ResultIdInput.ts";
import type { ResultRecord } from "../types/ResultRecord.ts";
import type { ErrorInfo } from "../types/ErrorInfo.ts";
import type { HttpRequestSpec } from "../types/HttpRequestSpec.ts";
import type { HttpOutcome } from "../types/HttpOutcome.ts";

// link_http_send가 주입되는 자리. 그 컴포넌트를 import하지 않고 입출력 스키마(HttpRequestSpec -> HttpOutcome)만 안다(규칙 3).
type HttpSend = (spec: HttpRequestSpec) => Promise<HttpOutcome>;

// 받은 본문은 다시 검증하지 않는다(계약에서 이 영역이 x-consumers인 값, ADR 0010 R7, 이 영역 ADR 0030). 요청과 응답이 같은지 맞춰 보는 검사도 두지 않는다.
export type Result = { ok: true; value: ResultRecord } | { ok: false; error: ErrorInfo };

export function createResultGet(send: HttpSend): (input: ResultIdInput) => Promise<Result> {
  return async (input) => {
    v.assertValid(v.ResultIdInput, input, "link_result_get");
    const r = await send({ method: "GET", path: `/v1/results/${encodeURIComponent(input.sessionId)}` });
    if (!r.ok) return r;
    const rec = r.data as ResultRecord;
    return { ok: true, value: rec };
  };
}
