/* 생성물: scripts/gen-types.mjs (직접 고치지 않는다). 원본: schemas/ 또는 고정 태그의 계약 스키마 */
/**
 * link_http_send를 만들 때 한 번 주는 설정. baseUrl은 같은 출처(빈 문자열) 또는 http(s) 주소, timeoutMs는 응답 본문을 다 읽을 때까지의 제한(값의 근거: docs/adr/0010, 측정 안 함).
 */
export interface HttpSendConfig {
  baseUrl: string;
  timeoutMs: number;
}
