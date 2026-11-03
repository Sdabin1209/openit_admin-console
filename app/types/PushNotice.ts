/* 생성물: scripts/gen-types.mjs (직접 고치지 않는다). 원본: schemas/ 또는 고정 태그의 계약 스키마 */
/**
 * push_notice의 출력: 서비스 워커가 띄울 알림. sessionId가 있으면 클릭이 결과 상세로 가고, 없으면 결과 목록으로 간다.
 */
export interface PushNotice {
  title: string;
  body: string;
  tag: string;
  sessionId: string | null;
}
