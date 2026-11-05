/* 생성물: scripts/gen-types.mjs (직접 고치지 않는다). 원본: schemas/ 또는 고정 태그의 계약 스키마 */
/**
 * release_candidates의 출력: 활성화 후보(현재 활성보다 새 것)와 롤백 후보(현재 활성보다 오래된 것, 가까운 순).
 */
export interface ReleaseCandidates {
  activate: ReleaseRow[];
  rollback: ReleaseRow[];
}
/**
 * 릴리스 목록의 한 줄(ReleaseManifest의 읽기용 투영). 문진표는 question_sets 목록이다(계약 3.3.0).
 */
export interface ReleaseRow {
  release_id: string;
  created_at: string;
  gate_decision_id: string;
  lora_a?: ArtifactRefRow;
  lora_b?: ArtifactRefRow;
  question_sets?: QuestionSetRef[];
}
/**
 * 산출물 참조(문항 세트·LoRA). 화면은 id와 version만 보이고 모르는 필드는 보존한다.
 */
export interface ArtifactRefRow {
  id: string;
  version: string;
  content_hash: string;
}
/**
 * 매니페스트 question_sets의 한 항목(계약 QuestionSetRef의 읽기용 투영). 화면은 제목·ID·버전을 보이고, 제목이 없으면 ID를 쓴다. 모르는 필드는 받는다.
 */
export interface QuestionSetRef {
  id: string;
  version: string;
  title?: string;
  content_hash?: string;
}
