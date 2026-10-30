/* 생성물: scripts/gen-types.mjs (직접 고치지 않는다). 원본: schemas/ 또는 고정 태그의 계약 스키마 */
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
