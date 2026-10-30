/* 생성물: scripts/gen-types.mjs (직접 고치지 않는다). 원본: schemas/ 또는 고정 태그의 계약 스키마 */
/**
 * link_failure_list의 입력: 필터. 빈 문자열은 안 건 것으로 본다. latest_only 기본은 true.
 */
export interface CaseListQuery {
  review_status?: string;
  failure_type?: string;
  source_release_id?: string;
  latest_only?: boolean;
}
