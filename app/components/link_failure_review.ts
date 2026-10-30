// 통신 컴포넌트 link_failure_review: CaseReviewInput -> CaseReviewResult. ops-feedback I7 `POST /v1/cases/{id}/review`(쓰기 역할 reviewer, 게이트웨이가 토큰을 붙인다).
// 본문은 계약 CaseReviewRequest. 201이면 새 version, 200이면 이미 같은 검토가 있던 것(replay).
import * as v from "../types/validators.cjs";
import * as c from "../types/contract-validators.cjs";
import type { CaseReviewInput } from "../types/CaseReviewInput.ts";
import type { CaseReviewResult } from "../types/CaseReviewResult.ts";
import type { ErrorInfo } from "../types/ErrorInfo.ts";
import type { CaseReviewRequest } from "../types/contract/CaseReviewRequest.ts";
import type { HttpRequestSpec } from "../types/HttpRequestSpec.ts";
import type { HttpOutcome } from "../types/HttpOutcome.ts";

// link_http_send가 주입되는 자리. 그 컴포넌트를 import하지 않고 입출력 스키마(HttpRequestSpec -> HttpOutcome)만 안다(규칙 3).
type HttpSend = (spec: HttpRequestSpec) => Promise<HttpOutcome>;

export type Result = { ok: true; value: CaseReviewResult } | { ok: false; error: ErrorInfo };

export function createFailureReview(send: HttpSend): (input: CaseReviewInput) => Promise<Result> {
  return async (input) => {
    v.assertValid(v.CaseReviewInput, input, "link_failure_review");
    const body = input.draft as CaseReviewRequest;
    if (!c.CaseReviewRequest(body)) return { ok: false, error: { kind: "INVALID_RECORD", status: 0, message: `보내려는 CaseReviewRequest가 계약에 맞지 않아 보내지 않았다: ${(c.CaseReviewRequest.errors ?? []).slice(0, 3).map((e) => `${e.instancePath || "(최상위)"} ${e.message ?? e.keyword}`).join("; ")}`, retryable: false } };
    const r = await send({ method: "POST", path: `/v1/cases/${encodeURIComponent(input.caseId)}/review`, body });
    if (!r.ok) return r;
    if (!v.CaseRecord(r.data)) return { ok: false, error: { kind: "BAD_RESPONSE", status: 0, message: "응답 형식이 맞지 않는다: FailureCase", retryable: false } };
    return { ok: true, value: { case: r.data as CaseReviewResult["case"], replay: r.status === 200 } };
  };
}
