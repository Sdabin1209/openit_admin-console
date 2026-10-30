/* 생성물: scripts/gen-types.mjs (직접 고치지 않는다). 원본: schemas/ 또는 고정 태그의 계약 스키마 */
/**
 * release_candidates의 입력: 최신부터인 릴리스 목록과 현재 활성 포인터.
 */
export interface ReleaseCandidatesInput {
  releases: ReleaseRow[];
  pointer: PointerRecord | null;
}
/**
 * 릴리스 목록의 한 줄(ReleaseManifest의 읽기용 투영).
 */
export interface ReleaseRow {
  release_id: string;
  created_at: string;
  gate_decision_id: string;
  question_set?: ArtifactRef;
  lora_a?: ArtifactRef;
  lora_b?: ArtifactRef;
}
/**
 * 산출물 참조(문항 세트·LoRA). 화면은 id와 version만 보이고 모르는 필드는 보존한다.
 */
export interface ArtifactRef {
  id: string;
  version: string;
  content_hash: string;
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
