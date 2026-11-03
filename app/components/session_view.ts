// 업무 컴포넌트 session_view: UserInfo(oauth2-proxy userinfo) -> SessionView. 이름 표시, 역할 목록, admin 여부, 로그인·로그아웃·계정 승인 링크 주소를 정한다. 판단하지 않는다: 권한은 게이트웨이가 정하고 이 화면은 알려 줄 뿐이다.
import * as v from "../types/validators.cjs";
import type { UserInfo } from "../types/UserInfo.ts";
import type { SessionView } from "../types/SessionView.ts";

// 왜 상대 경로: 같은 출처의 게이트웨이가 /oauth2/*(oauth2-proxy)와 /auth/*(Keycloak)를 낸다(ADR 0014, deploy 규약). 호스트를 코드에 넣지 않는다.
export const USERINFO_PATH = "/oauth2/userinfo";
// 왜 계정 승인 링크가 Keycloak 표준 관리 화면인가: 승인 화면을 다시 만들지 않는다(ADR 0014 결정 5, 이 영역 ADR 0029).
export const ADMIN_CONSOLE_URL = "/auth/admin/openit/console/#/openit/users";
// 로그아웃 뒤 Keycloak 세션도 끝낸다. client_id·post_logout_redirect_uri는 배포 값이라 넣지 않았다(Keycloak이 확인 화면을 보인다): 배포 규약 확인 전 가정이다.
export const KEYCLOAK_LOGOUT_URL = "/auth/realms/openit/protocol/openid-connect/logout";
export const ADMIN_ROLE = "admin";

/** 로그인: oauth2-proxy 표준 /oauth2/start. rd는 로그인 뒤 돌아올 현재 경로다. 비밀번호는 이 화면이 받지 않는다. */
export const loginUrl = (currentPath: string): string => `/oauth2/start?rd=${encodeURIComponent(currentPath)}`;
/** 로그아웃: oauth2-proxy 쿠키를 지우고 rd(Keycloak 로그아웃)로 보낸다. */
export const logoutUrl = (): string => `/oauth2/sign_out?rd=${encodeURIComponent(KEYCLOAK_LOGOUT_URL)}`;

export function sessionView(info: UserInfo): SessionView {
  v.assertValid(v.UserInfo, info, "session_view");
  // 왜 앞의 /를 떼나: Keycloak 그룹 경로 매퍼는 "/admin"처럼 줄 수 있다. 역할 이름은 그룹 이름이다(ADR 0014 결정 2).
  const roles = (info.groups ?? []).map((g) => g.replace(/^\//, "")).filter(Boolean);
  const label = info.email || info.preferredUsername || info.user || "(이름 없음)";
  return v.assertValid(v.SessionView, { label, roles, isAdmin: roles.includes(ADMIN_ROLE), adminUrl: ADMIN_CONSOLE_URL, logoutUrl: logoutUrl() }, "session_view");
}
