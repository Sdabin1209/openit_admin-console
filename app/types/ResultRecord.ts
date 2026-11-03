/* 생성물: scripts/gen-types.mjs (직접 고치지 않는다). 원본: schemas/ 또는 고정 태그의 계약 스키마 */
/**
 * 문진 결과 한 세션(문진 스키마 SessionResult의 읽기용 투영). status와 reason은 모르는 값도 받는다. acknowledged_by/at은 확인 표시 뒤에 채워진다(없거나 null이면 미확인). 모르는 필드는 받는다.
 */
export interface ResultRecord {
  session_id: string;
  subject_ref?: string | null;
  status: string;
  started_at?: string | null;
  ended_at?: string | null;
  release_id?: string | null;
  question_bank_version?: string | null;
  question_set_id?: string | null;
  question_set_title?: string | null;
  answers: {
    key: string;
    status: string;
    precision?: string;
    value: unknown;
  }[];
  skipped_details: {
    item: string;
    slot?: string;
    reason: string;
  }[];
  acknowledged_by?: string | null;
  acknowledged_at?: string | null;
}
