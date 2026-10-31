// 컴포넌트 approval_draft: ApprovalDraft -> 결과(ApprovalDecision | FormIssues). 결정 버튼을 눌렀을 때 보내도 되는 결정을 만든다. 반려에는 사유가 필수(스키마 ApprovalDraft).
import * as v from "../types/validators.cjs";
import type { ApprovalDraft } from "../types/ApprovalDraft.ts";
import type { ApprovalDecision } from "../types/ApprovalDecision.ts";

export type Result = { ok: true; value: ApprovalDecision } | { ok: false; issues: { path: string; message: string }[] };

// 어떤 위반을 어떤 문장으로 보일지는 위치로 정한다(거부 조건 자체는 스키마가 정한다).
const MESSAGE: Record<string, string> = { "/reason": "반려에는 사유가 필수다." };

export function approvalDraft(input: ApprovalDraft): Result {
  if (!v.ApprovalDraft(input)) {
    const out = { issues: v.issues(v.ApprovalDraft).map((i) => ({ path: i.path || "/", message: MESSAGE[i.path] ?? `입력이 맞지 않는다: ${i.message}` })) };
    return { ok: false, issues: v.assertValid(v.FormIssues, out, "approval_draft").issues };
  }
  const reason = input.reason.trim();
  const out: ApprovalDecision = { submissionId: input.submissionId, decision: input.decision, reportHash: input.reportHash, ...(input.decision === "REJECT" ? { reason } : {}) };
  return { ok: true, value: v.assertValid(v.ApprovalDecision, out, "approval_draft") };
}
