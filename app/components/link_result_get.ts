// 통신 컴포넌트 link_result_get: ResultIdInput -> ResultRecord. 문진 서비스 `GET /v1/results/{session_id}`(계약 PUBLIC_API B).
import * as v from "../types/validators.cjs";
import type { ResultIdInput } from "../types/ResultIdInput.ts";
import type { ResultRecord } from "../types/ResultRecord.ts";
import type { ErrorInfo } from "../types/ErrorInfo.ts";
import type { HttpRequestSpec } from "../types/HttpRequestSpec.ts";
import type { HttpOutcome } from "../types/HttpOutcome.ts";

// link_http_send가 주입되는 자리. 그 컴포넌트를 import하지 않고 입출력 스키마(HttpRequestSpec -> HttpOutcome)만 안다(규칙 3).
type HttpSend = (spec: HttpRequestSpec) => Promise<HttpOutcome>;

export type Result = { ok: true; value: ResultRecord } | { ok: false; error: ErrorInfo };

export function createResultGet(send: HttpSend): (input: ResultIdInput) => Promise<Result> {
  return async (input) => {
    v.assertValid(v.ResultIdInput, input, "link_result_get");
    const r = await send({ method: "GET", path: `/v1/results/${encodeURIComponent(input.sessionId)}` });
    if (!r.ok) return r;
    if (!v.ResultRecord(r.data)) return { ok: false, error: { kind: "BAD_RESPONSE", status: 0, message: `응답 형식이 맞지 않는다: ResultRecord: ${v.issues(v.ResultRecord).slice(0, 3).map((e) => `${e.path || "(최상위)"} ${e.message}`).join("; ")}`, retryable: false } };
    const rec = r.data as ResultRecord;
    if (rec.session_id !== input.sessionId) return { ok: false, error: { kind: "BAD_RESPONSE", status: 0, message: "응답 형식이 맞지 않는다: 응답의 session_id가 요청과 다르다", retryable: false } }; // 요청과 응답의 같음은 스키마 밖 조건
    return { ok: true, value: rec };
  };
}
