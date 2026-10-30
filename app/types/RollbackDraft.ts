/* 생성물: scripts/gen-types.mjs (직접 고치지 않는다). 원본: schemas/ 또는 고정 태그의 계약 스키마 */
/**
 * ops_request가 내는 롤백 요청의 알맹이. 계약 RollbackRequest에서 연결 계층이 붙이는 pipeline_schema_version과 requested_by_role을 뺀 것.
 */
export interface RollbackDraft {
  request_id: string;
  requested_at: string;
  from_release_id: string;
  to_release_id: string;
  reason: string;
  /**
   * @minItems 1
   */
  evidence_refs: [string, ...string[]];
}
