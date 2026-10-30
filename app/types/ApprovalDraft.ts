/* 생성물: scripts/gen-types.mjs (직접 고치지 않는다). 원본: schemas/ 또는 고정 태그의 계약 스키마 */
/**
 * approval_draft의 입력: 승인자가 버튼을 누른 순간의 폼. 반려에는 사유가 필수(공백만은 비어 있는 것).
 */
export interface ApprovalDraft {
  submissionId: string;
  decision: "APPROVE" | "REJECT";
  reason: string;
  reportHash: string;
}
