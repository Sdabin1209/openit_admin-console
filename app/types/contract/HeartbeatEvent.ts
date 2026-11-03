/* 생성물: scripts/gen-types.mjs (직접 고치지 않는다). 원본: schemas/ 또는 고정 태그의 계약 스키마 */
/**
 * 3.4.4(검토 B-05·B-28-10): SSE 이벤트 `heartbeat` 의 `data:`. 연결 직후 한 번, 이후 15초마다(`: ping` 주석과 같은 주기, PUBLIC_API). `id:` 가 없어 Last-Event-ID 를 바꾸지 않는다. ts 는 서버 시각이며 resync 때 `updated_after` 값으로 쓴다.
 */
export interface HeartbeatEvent {
  ts: string;
}
