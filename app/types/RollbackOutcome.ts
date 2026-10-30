/* 생성물: scripts/gen-types.mjs (직접 고치지 않는다). 원본: schemas/ 또는 고정 태그의 계약 스키마 */
/**
 * 롤백 요청에 대한 영수증(RollbackReceipt의 읽기용 투영). APPLIED면 active_pointer가 있다.
 */
export interface RollbackOutcome {
  pipeline_schema_version?: string;
  request_id: string;
  status: string;
  reason?: string;
  active_pointer?: PointerRecord;
  decided_at: string;
}
/**
 * 활성 포인터(ActivePointer의 읽기용 투영). cause의 모르는 값을 받는다. 행위자 필드는 계약에 없다(CR-004).
 */
export interface PointerRecord {
  pipeline_schema_version?: string;
  release_id: string;
  pointer_version: number;
  activated_at: string;
  cause: string;
  ext?: {};
}
