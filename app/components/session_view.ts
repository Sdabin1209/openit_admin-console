// 업무 컴포넌트 session_view: HumanUserInfo(platform userinfo) -> SessionView. 이름 표시, 역할 목록, admin 여부, 로그인·로그아웃·계정 승인 링크 주소를 정한다. 판단하지 않는다: 권한은 게이트웨이가 정하고 이 화면은 알려 줄 뿐이다.
import * as v from "../types/validators.cjs";
import type { HumanUserInfo } from "../types/contract/HumanUserInfo.ts";
import type { HumanAuthEndpoints } from "../types/contract/HumanAuthEndpoints.ts";
import type { SessionView } from "../types/SessionView.ts";

// 경로와 값은 계약 HumanAuthEndpoints(platform이 정본, 3.4.4)다. `: HumanAuthEndpoints` 타입이 const 리터럴과 같지 않으면 컴파일이 실패해, 계약이 바뀐 날 손으로 복사한 값이 조용히 어긋나지 않는다.
// 왜 상대 경로: 같은 출처의 platform 공개 입구가 /oauth2/*(로그인)와 /auth/*(계정 관리)를 낸다(ADR 0014). 호스트를 코드에 넣지 않는다.
export const HUMAN_AUTH: HumanAuthEndpoints = {
  login: "/oauth2/start", logout: "/oauth2/sign_out", userinfo: "/oauth2/userinfo",
  idp_logout: "/auth/realms/openit/protocol/openid-connect/logout", account_admin: "/auth/admin/openit/console/#/openit/users", client_id: "openit-gateway",
};
export const USERINFO_PATH = HUMAN_AUTH.userinfo;
// 왜 계정 승인 링크가 계정 관리 제품의 표준 화면인가: 승인 화면을 다시 만들지 않는다(ADR 0014 결정 5, 이 영역 ADR 0029).
export const ADMIN_CONSOLE_URL = HUMAN_AUTH.account_admin;
export const KEYCLOAK_CLIENT_ID = HUMAN_AUTH.client_id;
// 로그아웃 뒤 IdP 세션도 끝낸다(OIDC RP-Initiated Logout 1.0): 확인 화면 없이 앱 첫 화면(origin + "/")으로 돌아온다.
export const keycloakLogoutUrl = (origin: string): string => `${HUMAN_AUTH.idp_logout}?client_id=${HUMAN_AUTH.client_id}&post_logout_redirect_uri=${encodeURIComponent(origin + "/")}`;
export const ADMIN_ROLE = "admin";

/** 로그인: 계약 login 경로. rd는 로그인 뒤 돌아올 현재 경로다. 비밀번호는 이 화면이 받지 않는다. */
export const loginUrl = (currentPath: string): string => `${HUMAN_AUTH.login}?rd=${encodeURIComponent(currentPath)}`;
/** 로그아웃: 계약 logout 경로. 로그인 쿠키를 지우고 rd(IdP 로그아웃)로 보낸다. */
export const logoutUrl = (origin: string = window.location.origin): string => `${HUMAN_AUTH.logout}?rd=${encodeURIComponent(keycloakLogoutUrl(origin))}`;

export function sessionView(info: HumanUserInfo): SessionView {
  // 입력(platform의 HumanUserInfo)은 다시 검증하지 않는다(ADR 0010 R7). 모르는 그룹 이름은 그대로 두고 admin 여부만 본다(읽기 관대).
  // 왜 앞의 /를 떼나: Keycloak 그룹 경로 매퍼는 "/admin"처럼 줄 수 있다. 역할 이름은 그룹 이름이다(ADR 0014 결정 2).
  const roles = (info.groups ?? []).map((g) => g.replace(/^\//, "")).filter(Boolean);
  const label = info.email || info.preferredUsername || info.user || "(이름 없음)";
  return v.assertValid(v.SessionView, { label, roles, isAdmin: roles.includes(ADMIN_ROLE), adminUrl: ADMIN_CONSOLE_URL, logoutUrl: logoutUrl() }, "session_view");
}
