/* 생성물: scripts/gen-types.mjs (직접 고치지 않는다). 원본: schemas/ 또는 고정 태그의 계약 스키마 */
/**
 * 3.4.4(검토 B-05): SSE `GET /v1/staff/alerts/stream` 의 이벤트 `result_ready` 의 `data:`. 세션이 ENDED_* 로 끝났다는 알림. subject_ref·결과 값은 넣지 않는다(PUBLIC_API B절). clinician 역할에만 보낸다(B-06). clinician 화면은 admin-console 이다(검토 P6-R6-5).
 */
export interface ResultReadyEvent {
  session_id: string;
  status: string;
  ended_at: string;
}
