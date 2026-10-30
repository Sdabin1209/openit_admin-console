/* 생성물: scripts/gen-types.mjs (직접 고치지 않는다). 원본: schemas/ 또는 고정 태그의 계약 스키마 */
/**
 * 승인 대기 목록의 한 줄(SubmissionView의 읽기용 투영). 읽을 때는 관대하다: 모르는 필드는 보존하고 status의 모르는 값도 받는다(CONVENTIONS 1절, ADR 0016).
 */
export interface SubmissionRow {
  submission_id: string;
  status: string;
  subject: {};
  submitted_at?: string;
  submitted_by_role?: string;
  updated_at?: string;
  decision_id?: string | null;
  approval_id?: string | null;
  release_id?: string | null;
}
