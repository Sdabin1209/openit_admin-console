/* 생성물: scripts/gen-types.mjs (직접 고치지 않는다). 원본: schemas/ 또는 고정 태그의 계약 스키마 */
/**
 * link_push_unsubscribe의 입력: 해지할 구독의 endpoint. URL이 아니라 본문으로 보낸다(엔드포인트 URL은 그 자체가 푸시 권한이다).
 */
export interface PushEndpointInput {
  endpoint: string;
}
