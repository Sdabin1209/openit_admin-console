/* 생성물: scripts/gen-types.mjs (직접 고치지 않는다). 원본: schemas/ 또는 고정 태그의 계약 스키마 */
/**
 * 매니페스트 question_sets의 한 항목(계약 QuestionSetRef의 읽기용 투영). 화면은 제목·ID·버전을 보이고, 제목이 없으면 ID를 쓴다. 모르는 필드는 받는다.
 */
export interface QuestionSetRef {
  id: string;
  version: string;
  title?: string;
  content_hash?: string;
}
