// 문진 결과 화면(의사용)의 상태 기계. DOM 없음. 판단하지 않는다: 보여 주고, 확인 표시만 보낸다.
import type { ResultsClient } from "./gateway.ts";
import { ApiError } from "./api_error.ts";
import { SlowNotice, type SlowStage } from "./slow_notice.ts";
import type { Timers } from "../components/link_http_send.ts";
import { resultSheet } from "../components/result_sheet.ts";
import type { ResultRecord } from "../types/ResultRecord.ts";
import type { SheetView } from "../types/SheetView.ts";

export type ResultsPhase = "list-loading" | "list" | "detail-loading" | "detail" | "error";

export interface ResultsState {
  phase: ResultsPhase;
  items: ResultRecord[]; // 최신부터
  nextCursor: string | null;
  status: string; // 목록 필터(빈 글이면 전체)
  current: ResultRecord | null;
  sheet: SheetView | null;
  acking: boolean;
  notice: string | null;
  error: string | null;
  forbidden: boolean; // 403: 의사(clinician) 역할이 아님
  unseen: number; // 목록을 보지 않는 동안 도착한 결과 수(탭 배지)
  live: boolean; // 실시간 연결이 살아 있다
  rev: number;
}

export const FORBIDDEN_TEXT = "의사(clinician) 권한 필요: 이 계정은 clinician 역할이 아니어서 문진 결과를 볼 수 없다(403). 게이트웨이가 의사 계정에만 연다.";
const PAGE = 50; // 계약 PUBLIC_API B의 limit 기본값과 같다(제약에서 온 값)

export class ResultsController {
  state: ResultsState = { phase: "list-loading", items: [], nextCursor: null, status: "", current: null, sheet: null, acking: false, notice: null, error: null, forbidden: false, unseen: 0, live: false, rev: 0 };
  private listeners = new Set<() => void>();
  private seq = 0; // 겹친 불러오기에서 늦게 온 옛 응답이 최신 상태를 덮지 못하게 한다
  private stop: (() => void) | null = null;
  private readonly slow: SlowNotice;
  private readonly api: ResultsClient;
  constructor(api: ResultsClient, timers?: Timers) {
    this.api = api;
    this.slow = new SlowNotice(timers, () => this.set({}));
  }
  get slowStage(): SlowStage { return this.slow.stage; }
  subscribe(fn: () => void): () => void { this.listeners.add(fn); return () => this.listeners.delete(fn); }
  private set(p: Partial<ResultsState>): void {
    this.state = { ...this.state, ...p, rev: this.state.rev + 1 };
    const ph = this.state.phase;
    this.slow.track(ph, ph === "list-loading" || ph === "detail-loading");
    this.listeners.forEach((f) => f());
  }
  private describe(e: unknown): { text: string; forbidden: boolean } {
    if (e instanceof ApiError && e.kind === "PERMISSION_DENIED") return { text: FORBIDDEN_TEXT, forbidden: true };
    if (e instanceof ApiError && e.kind === "NOT_FOUND") return { text: "그 결과를 찾을 수 없다(404).", forbidden: false };
    return { text: e instanceof ApiError ? e.message : "알 수 없는 오류", forbidden: false };
  }

  /** 실시간 연결을 연다. 탭 배지를 위해 화면과 무관하게 앱 시작 때 한 번 부른다. */
  startLive(): void {
    if (this.stop) return;
    let everOpened = false;
    this.stop = this.api.subscribe({
      onReady: () => this.onReady(),
      onLive: (live) => {
        this.set({ live });
        // 끊겼다 다시 열렸으면 그 사이 놓친 것을 맞춘다(첫 열림은 화면이 이미 읽고 있다)
        if (live && everOpened) this.onReady();
        if (live) everOpened = true;
      },
      onResync: () => this.onReady(),
    });
  }
  stopLive(): void { this.stop?.(); this.stop = null; this.set({ live: false }); }

  private onReady(): void {
    if (this.state.phase === "list" || this.state.phase === "list-loading") void this.refreshList();
    else this.set({ unseen: this.state.unseen + 1 });
  }

  async openList(status = this.state.status): Promise<void> {
    const my = ++this.seq;
    this.set({ phase: "list-loading", status, current: null, sheet: null, notice: null, error: null, forbidden: false, unseen: 0 });
    await this.loadFirst(my);
  }
  /** 도착 알림 때: 필터를 지키고 첫 쪽을 다시 읽는다(깜박이지 않게 phase는 유지). */
  private async refreshList(): Promise<void> {
    const my = ++this.seq;
    await this.loadFirst(my);
  }
  private async loadFirst(my: number): Promise<void> {
    try {
      const page = await this.api.list({ ...(this.state.status ? { status: this.state.status } : {}), limit: PAGE });
      if (my !== this.seq) return;
      this.set({ phase: "list", items: page.items as ResultRecord[], nextCursor: page.next_cursor, forbidden: false });
    } catch (e) {
      if (my !== this.seq) return;
      const d = this.describe(e);
      this.set({ phase: "error", error: d.text, forbidden: d.forbidden });
    }
  }
  async loadMore(): Promise<void> {
    const cur = this.state.nextCursor;
    if (!cur || this.state.phase !== "list") return;
    const my = ++this.seq;
    try {
      const page = await this.api.list({ ...(this.state.status ? { status: this.state.status } : {}), limit: PAGE, cursor: cur });
      if (my !== this.seq) return;
      const seen = new Set(this.state.items.map((i) => i.session_id));
      this.set({ items: [...this.state.items, ...(page.items as ResultRecord[]).filter((i) => !seen.has(i.session_id))], nextCursor: page.next_cursor });
    } catch (e) {
      if (my !== this.seq) return;
      this.set({ notice: this.describe(e).text });
    }
  }

  async openDetail(id: string): Promise<void> {
    const my = ++this.seq;
    this.set({ phase: "detail-loading", current: null, sheet: null, notice: null, error: null, forbidden: false });
    try {
      const rec = await this.api.get(id);
      if (my !== this.seq) return;
      this.set({ phase: "detail", current: rec, sheet: resultSheet(rec) });
    } catch (e) {
      if (my !== this.seq) return;
      const d = this.describe(e);
      this.set({ phase: "error", error: d.text, forbidden: d.forbidden });
    }
  }

  /** 확인 표시. 이미 확인됐거나 전송 중이면 보내지 않는다(중복 클릭은 한 번만). */
  async ack(): Promise<void> {
    const cur = this.state.current;
    if (!cur || this.state.acking || cur.acknowledged_by) return;
    this.set({ acking: true, notice: null });
    try {
      const rec = await this.api.ack(cur.session_id);
      if (this.state.current?.session_id !== cur.session_id) { this.set({ acking: false }); return; }
      this.set({ acking: false, current: rec, sheet: resultSheet(rec), items: this.state.items.map((i) => (i.session_id === rec.session_id ? rec : i)) });
    } catch (e) {
      this.set({ acking: false, notice: `확인 표시를 저장하지 못했다: ${this.describe(e).text}` });
    }
  }
}
