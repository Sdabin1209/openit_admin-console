/* 생성물: scripts/gen-types.mjs (직접 고치지 않는다). 원본: schemas/ 또는 고정 태그의 계약 스키마 */
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
