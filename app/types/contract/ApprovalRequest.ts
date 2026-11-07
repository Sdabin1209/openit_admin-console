/* 생성물: scripts/gen-types.mjs (직접 고치지 않는다). 원본: schemas/ 또는 고정 태그의 계약 스키마 */
/**
 * POST /v1/approvals 본문(I5 decide). 만드는 쪽: admin-console. 읽는 쪽: release-gate. GateApproval에서 서버가 정하는 pipeline_schema_version, approval_id, decided_at, approver_id를 뺀 것에 report_hash를 더한다. approver_id는 보내지 않는다(X-Openit-User가 유일한 길, HTTP.md I5·D88). 반려(REJECT)에는 reason이 필수다.
 */
export interface ApprovalRequest {
  /**
   * 근거: 길이 상한 128 은 설계 상한(CONVENTIONS 2절, 측정 안 함)
   */
  submission_id: string;
  decision: "APPROVE" | "REJECT";
  /**
   * Optional audit claim; authenticated token determines the role.
   */
  approver_role?: "release-approver";
  /**
   * 반려에는 필수
   */
  reason?: string;
  /**
   * GET review-report 응답 헤더 X-Openit-Report-Hash를 그대로 돌려준 값. 화면은 계산하지 않는다
   */
  report_hash: string;
}
