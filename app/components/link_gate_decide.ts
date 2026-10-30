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

export type Result = { ok: true; value: ApprovalResult } | { ok: false; error: ErrorInfo };
const bad = (what: string): Result => ({ ok: false, error: { kind: "BAD_RESPONSE", status: 0, message: `응답 형식이 맞지 않는다: ${what}`, retryable: false } });

export function createDecide(send: HttpSend): (input: ApprovalDecision) => Promise<Result> {
  return async (input) => {
    v.assertValid(v.ApprovalDecision, input, "link_gate_decide");
    const body: ApprovalRequest = { submission_id: input.submissionId, decision: input.decision, approver_role: "release-approver", ...(input.reason ? { reason: input.reason } : {}), report_hash: input.reportHash };
    if (!c.ApprovalRequest(body)) return { ok: false, error: { kind: "INVALID_RECORD", status: 0, message: `보내려는 ApprovalRequest가 계약에 맞지 않아 보내지 않았다: ${(c.ApprovalRequest.errors ?? []).slice(0, 3).map((e) => `${e.instancePath || "(최상위)"} ${e.message ?? e.keyword}`).join("; ")}`, retryable: false } };
    const r = await send({ method: "POST", path: "/v1/approvals", body });
    if (!r.ok) return r;
    if (!v.ApprovalRecord(r.data)) return bad("GateApproval");
    const a = r.data as ApprovalResult["approval"];
    // 응답 대조: 완료 화면이 사람이 누른 결정과 같은 것을 보이는지 확인한다(다르면 성공으로 보이지 않는다). 요청과 응답의 같음은 스키마 밖 조건이다.
    if (a.submission_id !== input.submissionId || a.decision !== input.decision) return bad("응답의 제출·결정이 요청과 다르다");
    if (a.report_hash !== undefined && a.report_hash !== input.reportHash) return bad("응답의 report_hash가 요청과 다르다");
    return { ok: true, value: { approval: a, replay: r.status === 200 } };
  };
}
