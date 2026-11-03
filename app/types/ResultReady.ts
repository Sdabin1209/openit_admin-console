/* 생성물: scripts/gen-types.mjs (직접 고치지 않는다). 원본: schemas/ 또는 고정 태그의 계약 스키마 */
/**
 * SSE 이벤트 result_ready의 본문(계약 PUBLIC_API B). subject_ref는 없다. 모르는 필드는 받는다.
 */
export interface ResultReady {
  session_id: string;
  status: string;
  ended_at?: string | null;
}
