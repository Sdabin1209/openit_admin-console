/* 생성물: scripts/gen-types.mjs (직접 고치지 않는다). 원본: schemas/ 또는 고정 태그의 계약 스키마 */
/**
 * approval_draft의 출력이자 approval_confirm의 입력·출력이며 link_gate_decide의 입력: 보내도 되는 결정. REJECT면 사유가 있고 APPROVE에는 사유가 없다.
 */
export type ApprovalDecision = {
  [k: string]: unknown;
} & {
  submissionId: string;
  decision: "APPROVE" | "REJECT";
  reason?: string;
  reportHash: string;
};
