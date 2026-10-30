/* 생성물: scripts/gen-types.mjs (직접 고치지 않는다). 원본: schemas/ 또는 고정 태그의 계약 스키마 */
/**
 * link_gate_decide의 출력. replay는 서버가 같은 결정을 이미 갖고 있어 200으로 답한 경우.
 */
export interface ApprovalResult {
  approval: ApprovalRecord;
  replay: boolean;
}
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
