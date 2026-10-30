/* 생성물: scripts/gen-types.mjs (직접 고치지 않는다). 원본: schemas/ 또는 고정 태그의 계약 스키마 */
/**
 * route_parse의 출력. 주소의 ID를 읽을 수 없으면 bad_address.
 */
export interface Route {
  screen: "approvals" | "cases" | "ops" | "bad_address";
  view: "list" | "detail" | "none";
  id?: string;
}
