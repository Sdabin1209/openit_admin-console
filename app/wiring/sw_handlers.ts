// 서비스 워커의 push·notificationclick 처리. 브라우저 객체는 인자로 받아(시험이 가짜를 넣는다) 업무 규칙(push_notice)만 부른다.
import { pushNotice, pushTarget } from "../components/push_notice.ts";

interface NoticeEvent { waitUntil(p: Promise<unknown>): void }
export interface PushEventLike extends NoticeEvent { data: { json(): unknown } | null }
export interface ClickEventLike extends NoticeEvent { notification: { close(): void; data?: { url?: string } } }
export interface WindowLike { url: string; focus(): Promise<unknown>; navigate?(url: string): Promise<unknown> }
export interface SwScope {
  registration: { scope: string; showNotification(title: string, o: { body: string; tag: string; data: { url: string } }): Promise<void> };
  clients: { matchAll(o: { type: "window"; includeUncontrolled: boolean }): Promise<WindowLike[]>; openWindow(url: string): Promise<unknown> };
  addEventListener(type: "push" | "notificationclick", fn: (e: never) => void): void;
}

export function installPushHandlers(sw: SwScope): void {
  sw.addEventListener("push", ((e: PushEventLike) => {
    let data: unknown = null;
    try { data = e.data ? e.data.json() : null; } catch { /* 깨진 본문은 일반 문구로 보인다 */ }
    const n = pushNotice(data);
    // 왜 tag: 같은 세션의 재알림은 교체한다(계약). 환자 값은 본문에 없다.
    e.waitUntil(sw.registration.showNotification(n.title, { body: n.body, tag: n.tag, data: { url: pushTarget(n, sw.registration.scope) } }));
  }) as (e: never) => void);
  sw.addEventListener("notificationclick", ((e: ClickEventLike) => {
    e.notification.close();
    const url = e.notification.data?.url ?? new URL("#/results", sw.registration.scope).href;
    e.waitUntil((async () => {
      const wins = await sw.clients.matchAll({ type: "window", includeUncontrolled: true });
      const mine = wins.find((w) => w.url.startsWith(sw.registration.scope));
      if (mine) { await mine.focus(); if (mine.navigate) { await mine.navigate(url); return; } }
      await sw.clients.openWindow(url);
    })());
  }) as (e: never) => void);
}
