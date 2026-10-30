/* 생성물: scripts/gen-types.mjs (직접 고치지 않는다). 원본: schemas/ 또는 고정 태그의 계약 스키마 */
/**
 * link_http_send의 입력. 같은 출처의 /v1 경로만 부른다(게이트 HTTP 면 밖은 부르지 않는다, 브리프 6절). GET에는 본문이 없다.
 */
export interface HttpRequestSpec {
  method: "GET" | "POST";
  path: string;
  body?: unknown;
}
