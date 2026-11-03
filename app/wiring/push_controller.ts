// 결과 탭의 웹 푸시 구독 상태 기계. DOM 없음. 브라우저 푸시 API는 포트로 받는다(시험이 가짜를 넣는다). 판단하지 않는다: 켜고 끄는 일만 한다.
import type { PushClient } from "./gateway.ts";
import { ApiError } from "./api_error.ts";

export interface SubscriptionLike { endpoint: string; toJSON(): { endpoint?: string; keys?: Record<string, string> }; unsubscribe(): Promise<boolean> }
export interface PushPorts {
  supported: boolean; // 서비스 워커·PushManager·Notification이 있다
  permission(): string; // granted | denied | default
  requestPermission(): Promise<string>;
  getSubscription(): Promise<SubscriptionLike | null>;
  subscribe(applicationServerKey: Uint8Array): Promise<SubscriptionLike>;
}

export type PushPhase = "loading" | "unsupported" | "server-off" | "denied" | "idle" | "busy" | "subscribed" | "error";
export interface PushState { phase: PushPhase; message: string | null; rev: number }

export const PUSH_TEXT: Record<PushPhase, string> = {
  loading: "푸시 설정 확인 중…",
  unsupported: "이 브라우저는 웹 푸시를 지원하지 않는다. 실시간 연결(SSE)로만 새 결과를 알린다.",
  "server-off": "서버의 웹 푸시가 꺼져 있다(공개키 없음). 화면을 연 동안만 실시간 연결(SSE)로 새 결과를 알린다.",
  denied: "브라우저에서 알림이 차단되어 있다. 브라우저 설정에서 허용한 뒤 다시 시도하라.",
  idle: "화면을 닫아도 새 문진 결과가 오면 알림을 받으려면 켜라.",
  busy: "처리 중…",
  subscribed: "푸시 알림이 켜져 있다: 새 문진 결과가 오면 브라우저 알림을 보낸다.",
  error: "",
};

/** base64url 공개키를 applicationServerKey 바이트로 바꾼다(Web Push 표준 VAPID 키 형식). */
export function decodeVapidKey(b64url: string): Uint8Array {
  const b64 = b64url.replace(/-/g, "+").replace(/_/g, "/") + "=".repeat((4 - (b64url.length % 4)) % 4);
  const bin = atob(b64);
  return Uint8Array.from(bin, (ch) => ch.charCodeAt(0));
}

export class PushController {
  state: PushState = { phase: "loading", message: null, rev: 0 };
  private listeners = new Set<() => void>();
  private key: string | null = null;
  private readonly api: PushClient; private readonly ports: PushPorts;
  constructor(api: PushClient, ports: PushPorts) { this.api = api; this.ports = ports; }
  subscribe(fn: () => void): () => void { this.listeners.add(fn); return () => this.listeners.delete(fn); }
  private set(phase: PushPhase, message: string | null = null): void {
    this.state = { phase, message, rev: this.state.rev + 1 };
    this.listeners.forEach((f) => f());
  }
  private fail(prefix: string, e: unknown): void {
    this.set("error", `${prefix}: ${e instanceof ApiError ? e.message : e instanceof Error ? e.message : "알 수 없는 오류"}`);
  }

  /** 서버 설정과 현재 구독을 읽어 상태를 정한다. 결과 탭을 열 때마다 부른다. */
  async refresh(): Promise<void> {
    if (!this.ports.supported) return this.set("unsupported");
    try {
      const cfg = await this.api.config();
      this.key = cfg.vapid_public_key;
      if (!this.key) return this.set("server-off");
      if (this.ports.permission() === "denied") return this.set("denied");
      this.set((await this.ports.getSubscription()) ? "subscribed" : "idle");
    } catch (e) { this.fail("푸시 설정을 읽지 못했다", e); }
  }

  async enable(): Promise<void> {
    if (this.state.phase === "busy" || !this.key) return;
    this.set("busy");
    let sub: SubscriptionLike | null = null;
    try {
      const perm = await this.ports.requestPermission();
      if (perm !== "granted") return this.set(perm === "denied" ? "denied" : "idle", perm === "denied" ? null : "알림 허용을 선택하지 않아 켜지 않았다.");
      sub = await this.ports.subscribe(decodeVapidKey(this.key));
      const j = sub.toJSON();
      await this.api.subscribe({ endpoint: j.endpoint ?? sub.endpoint, keys: { p256dh: j.keys?.p256dh ?? "", auth: j.keys?.auth ?? "" } });
      this.set("subscribed");
    } catch (e) {
      // 왜 되돌리나: 서버에 등록되지 않은 브라우저 구독이 남으면 켜졌다고 믿는 화면과 어긋난다.
      if (sub) await sub.unsubscribe().catch(() => false);
      this.fail("푸시를 켜지 못했다", e);
    }
  }

  async disable(): Promise<void> {
    if (this.state.phase === "busy") return;
    this.set("busy");
    try {
      const sub = await this.ports.getSubscription();
      if (sub) {
        await this.api.unsubscribe({ endpoint: sub.endpoint }); // 서버가 먼저: 실패하면 구독을 남겨 다시 시도할 수 있게 한다
        await sub.unsubscribe();
      }
      this.set("idle");
    } catch (e) {
      this.fail("푸시를 해지하지 못했다", e);
    }
  }
}
