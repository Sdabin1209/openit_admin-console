// 컴포넌트 approval_confirm: ApprovalConfirmInput -> 결과(ApprovalDecision | FormIssues). 되돌릴 수 없는 결정이라 확인창에서 제출 ID를 그대로 입력해야 확정한다(ADR 0014).
import * as v from "../types/validators.cjs";
import type { ApprovalConfirmInput } from "../types/ApprovalConfirmInput.ts";
import type { ApprovalDecision } from "../types/ApprovalDecision.ts";

export type Result = { ok: true; value: ApprovalDecision } | { ok: false; issues: { path: string; message: string }[] };

export function approvalConfirm(input: ApprovalConfirmInput): Result {
  v.assertValid(v.ApprovalConfirmInput, input, "approval_confirm");
  // 필드 간 같음은 JSON Schema로 쓸 수 없다(schemas/README.md 스키마 밖 조건). 앞뒤 공백만 무시한다.
  if (input.confirmText.trim() !== input.decision.submissionId) {
    return { ok: false, issues: v.assertValid(v.FormIssues, { issues: [{ path: "/confirmText", message: "제출 ID가 같지 않다." }] }, "approval_confirm").issues };
  }
  return { ok: true, value: input.decision };
}
