// 로그인 상태 화면 그리기. textContent만 쓴다. 비밀번호 입력란은 없다(로그인은 oauth2-proxy와 Keycloak이 한다, ADR 0014·0029).
import type { AuthController } from "../wiring/auth_controller.ts";
import { loginUrl, logoutUrl } from "../components/session_view.ts";
import { h } from "./views.ts";

/** 401이면 로그인 안내, 승인 대기 403이면 승인 대기 안내. 그 밖의 상태면 null(원래 화면을 그린다). */
export function renderAuthNotice(root: HTMLElement, c: AuthController, currentPath: string): boolean {
  const st = c.state;
  if (st.phase === "login-needed") {
    root.replaceChildren(h("section", { id: "auth-login" }, h("h2", {}, "로그인이 필요하다"),
      h("p", { role: "alert", class: "notice warn" }, "로그인하지 않았거나 로그인이 만료되었다."),
      h("p", {}, h("a", { id: "login-link", href: loginUrl(currentPath) }, "로그인"), " (조직 계정 로그인 화면으로 이동한다. 이 화면은 비밀번호를 받지 않는다.)")));
    return true;
  }
  if (st.phase === "pending") {
    root.replaceChildren(h("section", { id: "auth-pending" }, h("h2", {}, "가입 승인 대기 중"),
      h("p", { role: "status", class: "notice warn" }, `${st.session ? st.session.label + " 계정은 " : "이 계정은 "}가입은 되었지만 아직 역할이 없다. 관리자(admin)가 역할을 부여하면 이 화면을 쓸 수 있다.`),
      h("p", { class: "muted" }, "승인된 뒤에는 다시 로그인하거나 새로고침하라."),
      h("p", {}, h("a", { id: "logout-link", href: logoutUrl() }, "로그아웃"))));
    return true;
  }
  return false;
}

/** 머리의 현재 사용자·역할, 로그아웃, admin이면 계정 승인(Keycloak 관리 화면) 링크. */
export function renderWho(el: HTMLElement, c: AuthController): void {
  el.replaceChildren();
  const s = c.state.session;
  if (!s || c.state.phase === "login-needed") return;
  el.append(h("span", { id: "who-user" }, s.label), " ", h("span", { class: "muted", id: "who-roles" }, s.roles.length ? `(${s.roles.join(", ")})` : "(역할 없음)"), " ");
  if (s.isAdmin) el.append(h("a", { id: "admin-approve-link", href: s.adminUrl, target: "_blank", rel: "noopener noreferrer" }, "계정 승인"), " ");
  el.append(h("a", { id: "logout-link", href: s.logoutUrl }, "로그아웃"));
}
