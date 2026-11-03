/* 생성물: scripts/gen-types.mjs (직접 고치지 않는다). 원본: schemas/ 또는 고정 태그의 계약 스키마 */
/**
 * link_push_subscribe의 입력: 브라우저 PushSubscription.toJSON()의 endpoint와 keys. 구독 주제(topics)는 컴포넌트가 results로 정한다. 모르는 필드(expirationTime)는 받되 보내지 않는다.
 */
export interface PushSubscriptionInput {
  endpoint: string;
  keys: {
    p256dh: string;
    auth: string;
  };
}
