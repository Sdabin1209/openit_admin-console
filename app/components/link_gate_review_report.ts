// 통신 컴포넌트 link_gate_review_report: SubmissionIdInput -> LoadedReport. release-gate I5 `GET /v1/submissions/{id}/review-report`.
// 보고서 해시는 계산하지 않고 응답 헤더 X-Openit-Report-Hash를 그대로 돌려보낸다(HTTP.md I5, D69). 형식은 출력 스키마 LoadedReport가 본다.
import * as v from "../types/validators.cjs";
import type { SubmissionIdInput } from "../types/SubmissionIdInput.ts";
import type { LoadedReport } from "../types/LoadedReport.ts";
import type { ErrorInfo } from "../types/ErrorInfo.ts";
import type { HttpRequestSpec } from "../types/HttpRequestSpec.ts";
import type { HttpOutcome } from "../types/HttpOutcome.ts";

// link_http_send가 주입되는 자리. 그 컴포넌트를 import하지 않고 입출력 스키마(HttpRequestSpec -> HttpOutcome)만 안다(규칙 3).
type HttpSend = (spec: HttpRequestSpec) => Promise<HttpOutcome>;

export type Result = { ok: true; value: LoadedReport } | { ok: false; error: ErrorInfo };
export const REPORT_HASH_HEADER = "X-Openit-Report-Hash";

export function createReviewReport(send: HttpSend): (input: SubmissionIdInput) => Promise<Result> {
  return async (input) => {
    v.assertValid(v.SubmissionIdInput, input, "link_gate_review_report");
    const r = await send({ method: "GET", path: `/v1/submissions/${encodeURIComponent(input.submissionId)}/review-report` });
    if (!r.ok) return r;
    const out = { report: r.data, reportHash: r.headers[REPORT_HASH_HEADER.toLowerCase()] };
    if (!v.LoadedReport(out)) {
      const reportOk = v.ReportDoc(r.data);
      return { ok: false, error: { kind: "BAD_RESPONSE", status: 0, message: `응답 형식이 맞지 않는다: ${reportOk ? `${REPORT_HASH_HEADER} 헤더` : "ReviewReport"}`, retryable: false } };
    }
    return { ok: true, value: out as LoadedReport };
  };
}
