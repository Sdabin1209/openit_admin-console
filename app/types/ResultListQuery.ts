/* 생성물: scripts/gen-types.mjs (직접 고치지 않는다). 원본: schemas/ 또는 고정 태그의 계약 스키마 */
/**
 * link_result_list의 입력: 필터와 쪽 지정. 빈 문자열은 안 건 것으로 본다. limit 기본 50, 최대 200(계약 PUBLIC_API B).
 */
export interface ResultListQuery {
  status?: string;
  updated_after?: string;
  limit?: number;
  cursor?: string;
}
