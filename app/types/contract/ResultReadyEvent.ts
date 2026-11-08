/* 생성물: scripts/gen-types.mjs (직접 고치지 않는다). 원본: schemas/ 또는 고정 태그의 계약 스키마 */
/**
 * 3.4.4(검토 B-05): SSE `GET /v1/staff/alerts/stream` 의 이벤트 `result_ready` 의 `data:`. 세션이 ENDED_* 로 끝났다는 알림. subject_ref·결과 값은 넣지 않는다(PUBLIC_API B절). clinician 역할에만 보낸다(B-06). clinician 화면은 admin-console 이다(검토 P6-R6-5).
 */
export interface ResultReadyEvent {
  /**
   * 세션 ID(서버 발급, PUBLIC_API A절). 4.x 공개 형식 [A-Za-z0-9_-]{1,64} 와 Id 의 교집합: 첫 글자 영문·숫자, 이후 영문·숫자·_·-, 1~64자. '.'·':' 는 넓히지 않았다. 근거: survey-service 가 secrets.token_hex(32)(64자 소문자 16진)로 발급한다(2026-11-08 결함 #21, 첫 글자 _·- 가 Id 를 어기던 token_urlsafe 대체). 이 타입의 값은 Id 이므로 envelope_id 가 바꾸지 않는다(CONVENTIONS 116행).
   */
  session_id: string;
  status: string;
  ended_at: string;
}
