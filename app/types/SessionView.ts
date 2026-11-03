/* 생성물: scripts/gen-types.mjs (직접 고치지 않는다). 원본: schemas/ 또는 고정 태그의 계약 스키마 */
/**
 * session_view의 출력: 상단에 보일 로그인 사용자 이름, 역할 목록, admin 여부(계정 승인 링크를 보일지), 링크 주소.
 */
export interface SessionView {
  label: string;
  roles: string[];
  isAdmin: boolean;
  adminUrl: string;
  logoutUrl: string;
}
