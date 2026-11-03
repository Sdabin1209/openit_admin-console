// 로그인 상태 기계. DOM 없음. 신원·역할은 게이트웨이(oauth2-proxy)가 정하고 이 컨트롤러는 알려 주는 것만 받는다. 어떤 요청이든 401·승인 대기 오류가 오면 상태를 바꾼다.
import type { AuthClient } from "./gateway.ts";
import { ApiError } from "./api_error.ts";
import { sessionView } from "../components/session_view.ts";
import type { SessionView } from "../types/SessionView.ts";

export type AuthPhase = "loading" | "signed-in" | "login-needed" | "pending" | "error";
export interface AuthState { phase: AuthPhase; session: SessionView | null; error: string | null; rev: number }

export class AuthController {
  state: AuthState = { phase: "loading", session: null, error: null, rev: 0 };
  private listeners = new Set<() => void>();
  private readonly api: AuthClient;
  constructor(api: AuthClient) { this.api = api; }
  subscribe(fn: () => void): () => void { this.listeners.add(fn); return () => this.listeners.delete(fn); }
  private set(p: Partial<AuthState>): void {
    this.state = { ...this.state, ...p, rev: this.state.rev + 1 };
    this.listeners.forEach((f) => f());
  }
  /** 어느 요청에서든 온 인증 오류를 받는다(gateway.ts의 알림 선). 승인 대기·로그인 필요만 화면을 바꾼다. */
  onApiError(kind: string): void {
    if (kind === "UNAUTHENTICATED" && this.state.phase !== "login-needed") this.set({ phase: "login-needed", session: null });
    else if (kind === "ACCOUNT_PENDING" && this.state.phase !== "pending") this.set({ phase: "pending" });
  }
  async load(): Promise<void> {
    try {
      const session = sessionView(await this.api.userinfo());
      // 왜 roles가 비면 대기: 새 계정은 그룹이 없어 로그인은 되지만 모든 사람 경로가 403이다(ADR 0014 결정 4). 이미 본 상태가 pending이면 유지한다.
      this.set({ phase: session.roles.length === 0 ? "pending" : "signed-in", session, error: null });
    } catch (e) {
      if (e instanceof ApiError && e.kind === "UNAUTHENTICATED") return this.set({ phase: "login-needed", session: null });
      if (e instanceof ApiError && e.kind === "ACCOUNT_PENDING") return this.set({ phase: "pending" });
      // 왜 오류로 두고 막지 않나: userinfo가 없는 환경(개발 모의)에서도 화면은 쓸 수 있어야 한다. 사용자 표시만 비운다.
      this.set({ phase: "error", error: e instanceof ApiError ? e.message : "알 수 없는 오류" });
    }
  }
}
