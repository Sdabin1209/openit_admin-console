// 통신 컴포넌트 link_gate_decide: ApprovalDecision -> ApprovalResult. release-gate I5 `POST /v1/approvals`.
// 본문은 계약 ApprovalRequest(approver_id를 싣지 않는다: 승인자는 게이트웨이 X-Openit-User 한 길, D88). 보내기 전에 계약 스키마로 검사하고 어긋나면 보내지 않는다.
import * as v from "../types/validators.cjs";
import * as c from "../types/contract-validators.cjs";
import type { ApprovalDecision } from "../types/ApprovalDecision.ts";
import type { ApprovalResult } from "../types/ApprovalResult.ts";
import type { ErrorInfo } from "../types/ErrorInfo.ts";
import type { ApprovalRequest } from "../types/contract/ApprovalRequest.ts";
import type { HttpRequestSpec } from "../types/HttpRequestSpec.ts";
import type { HttpOutcome } from "../types/HttpOutcome.ts";

// link_http_send가 주입되는 자리. 그 컴포넌트를 import하지 않고 입출력 스키마(HttpRequestSpec -> HttpOutcome)만 안다(규칙 3).
type HttpSend = (spec: HttpRequestSpec) => Promise<HttpOutcome>;

// 받은 본문은 다시 검증하지 않는다(계약에서 이 영역이 x-consumers인 값, ADR 0010 R7, 이 영역 ADR 0030). 요청과 응답이 같은지 맞춰 보는 검사도 두지 않는다.
export type Result = { ok: true; value: ApprovalResult } | { ok: false; error: ErrorInfo };

export function createDecide(send: HttpSend): (input: ApprovalDecision) => Promise<Result> {
  return async (input) => {
    v.assertValid(v.ApprovalDecision, input, "link_gate_decide");
    const body: ApprovalRequest = { submission_id: input.submissionId, decision: input.decision, approver_role: "release-approver", ...(input.reason ? { reason: input.reason } : {}), report_hash: input.reportHash };
    if (!c.ApprovalRequest(body)) return { ok: false, error: { kind: "INVALID_RECORD", status: 0, message: `보내려는 ApprovalRequest가 계약에 맞지 않아 보내지 않았다: ${(c.ApprovalRequest.errors ?? []).slice(0, 3).map((e) => `${e.instancePath || "(최상위)"} ${e.message ?? e.keyword}`).join("; ")}`, retryable: false } };
    const r = await send({ method: "POST", path: "/v1/approvals", body });
    if (!r.ok) return r;
    const a = r.data as ApprovalResult["approval"];
    return { ok: true, value: { approval: a, replay: r.status === 200 } };
  };
}
