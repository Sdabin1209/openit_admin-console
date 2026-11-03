/* 생성물: scripts/gen-types.mjs (직접 고치지 않는다). 원본: schemas/ 또는 고정 태그의 계약 스키마 */
/**
 * 3.4.4(검토 B-05): SSE 이벤트 `resync` 의 `data:`. Last-Event-ID 로 이어 받을 수 없는 재연결에 한 번. 받으면 알림은 GET /v1/staff/alerts?status=OPEN, 결과는 GET /v1/results?updated_after=<마지막 heartbeat ts> 로 다시 맞춘다(PUBLIC_API B절).
 */
export interface ResyncEvent {
  reason: "EVENTS_NOT_RESUMABLE";
}
