/* 생성물: scripts/gen-types.mjs (직접 고치지 않는다). 원본: schemas/ 또는 고정 태그의 계약 스키마 */
/**
 * 3.4.4(검토 B-10): platform 공개 입구가 사람 화면(admin-console·kiosk-frontend 직원 콘솔)에 주는 로그인·로그아웃·계정 관리 경로. 모든 경로는 같은 출처의 상대 경로다(화면은 호스트를 코드에 넣지 않는다). 값은 아래 const 가 정본이고, 바꾸면 이 스키마를 올린다. OIDC Core·RP-Initiated Logout 1.0 의 표준 파라미터(client_id, post_logout_redirect_uri)를 쓴다.
 */
export interface HumanAuthEndpoints {
  /**
   * GET, 쿼리 rd=<로그인 뒤 돌아올 같은 출처 경로>
   */
  login: "/oauth2/start";
  /**
   * GET, 쿼리 rd=<idp_logout 주소>. 로그인 쿠키를 지우고 rd 로 보낸다
   */
  logout: "/oauth2/sign_out";
  /**
   * GET, 로그인 세션이 있으면 200 HumanUserInfo, 없으면 401(본문 없음 가능, RUNTIME R3.23)
   */
  userinfo: "/oauth2/userinfo";
  /**
   * GET, 쿼리 client_id, post_logout_redirect_uri=<origin>/
   */
  idp_logout: "/auth/realms/openit/protocol/openid-connect/logout";
  /**
   * admin 역할의 가입 승인 화면(계정 관리 제품의 표준 화면)
   */
  account_admin: "/auth/admin/openit/console/#/openit/users";
  client_id: "openit-gateway";
}
