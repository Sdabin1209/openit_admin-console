/* 생성물: scripts/gen-types.mjs (직접 고치지 않는다). 원본: schemas/ 또는 고정 태그의 계약 스키마 */
/**
 * 서버가 기록한 결정(GateApproval의 읽기용 투영).
 */
export interface ApprovalRecord {
  pipeline_schema_version?: string;
  approval_id: string;
  submission_id: string;
  decision: string;
  reason?: string;
  approver_id: string;
  approver_role: string;
  decided_at: string;
  report_hash?: string;
}
