// 화면 상태 기계. DOM 없음. 중복 요청은 한 번만 보낸다.
import type { GateClient } from "./gateway.ts";
import { toErrorInfo } from "./api_error.ts";
import { approvalConfirm } from "../components/approval_confirm.ts";
import { approvalDraft } from "../components/approval_draft.ts";
import { approvalFailure } from "../components/approval_failure.ts";
import type { ApprovalResult } from "../types/ApprovalResult.ts";
import type { LoadedReport } from "../types/LoadedReport.ts";
import type { SubmissionRow } from "../types/SubmissionRow.ts";
import type { ReportViewRequest } from "../types/ReportViewRequest.ts";

type Decision = "APPROVE" | "REJECT";
type SortKey = ReportViewRequest["sort"];

export type Phase = "list-loading" | "list" | "report-loading" | "report" | "confirming" | "submitting" | "done" | "error";

export interface State {
  phase: Phase;
  items: SubmissionRow[];
  nextCursor: string | null;
  submissionId: string | null;
  loaded: LoadedReport | null;
  /** 결정 전에 승인자가 본 보고서의 해시. confirming/submitting 동안 고정된다. */
  pending: { decision: Decision; reason?: string; reportHash: string; confirmText: string } | null;
  draft: { reason: string };
  notice: { kind: "stale" | "badresponse" | "conflict" | "denied" | "retry" | "invalid"; text: string } | null;
  result: ApprovalResult | null;
  error: string | null;
  sliceKind: string;
  sort: SortKey;
}

export class Controller {
  state: State = {
    phase: "list-loading", items: [], nextCursor: null, submissionId: null, loaded: null, pending: null,
    draft: { reason: "" }, notice: null, result: null, error: null, sliceKind: "ALL_KINDS", sort: "default",
  };
  private listeners = new Set<() => void>();
  private inflight = new Set<string>();
  // 왜 순번: 화면 이동이 빠르면 먼저 보낸 불러오기가 나중에 도착해 지금 화면을 덮어쓴다(다른 제출의 보고서가 이 제출 ID 아래 보이는 결함). 불러오기를 시작할 때마다 올리고, 도착했을 때 순번이 바뀌었으면 버린다.
  private seq = 0;
  private readonly api: GateClient;
  constructor(api: GateClient) {
    this.api = api;
  }

  subscribe(fn: () => void): () => void {
    this.listeners.add(fn);
    return () => this.listeners.delete(fn);
  }
  private set(patch: Partial<State>): void {
    this.state = { ...this.state, ...patch };
    this.listeners.forEach((f) => f());
  }
  private fail(e: unknown, base: Partial<State> = {}): void {
    const out = approvalFailure({ context: "load", error: toErrorInfo(e) });
    this.set({ ...base, phase: "error", error: out.errorText ?? "알 수 없는 오류" });
  }

  async openList(): Promise<void> {
    const my = ++this.seq;
    this.set({ phase: "list-loading", error: null, notice: null, result: null, pending: null, loaded: null, submissionId: null });
    try {
      const r = await this.api.listAwaiting();
      if (my !== this.seq) return;
      this.set({ phase: "list", items: r.items, nextCursor: r.nextCursor });
    } catch (e) {
      if (my === this.seq) this.fail(e);
    }
  }

  async loadMore(): Promise<void> {
    if (!this.state.nextCursor || this.inflight.has("more")) return;
    this.inflight.add("more");
    const my = this.seq;
    try {
      const r = await this.api.listAwaiting(this.state.nextCursor);
      if (my !== this.seq) return;
      this.set({ items: [...this.state.items, ...r.items], nextCursor: r.nextCursor });
    } catch (e) {
      if (my === this.seq) this.fail(e);
    } finally {
      this.inflight.delete("more");
    }
  }

  async openReport(id: string, notice: State["notice"] = null): Promise<void> {
    const my = ++this.seq;
    this.set({ phase: "report-loading", submissionId: id, error: null, notice, pending: null, result: null, sliceKind: "ALL_KINDS", sort: "default" });
    try {
      const loaded = await this.api.getReviewReport(id);
      if (my !== this.seq) return;
      this.set({ phase: "report", loaded });
    } catch (e) {
      if (my === this.seq) this.fail(e, { loaded: null });
    }
  }

  setDraft(p: Partial<State["draft"]>): void {
    this.state = { ...this.state, draft: { ...this.state.draft, ...p } }; // 입력 중에는 다시 그리지 않는다
  }
  setView(p: { sliceKind?: string; sort?: SortKey }): void {
    this.set(p);
  }

  /** 결정 버튼. approval_draft가 받아들여야 확인창으로 간다. */
  requestDecision(decision: Decision): void {
    const s = this.state;
    if (s.phase !== "report" || !s.loaded || !s.submissionId) return;
    const r = approvalDraft({ submissionId: s.submissionId, decision, reason: s.draft.reason, reportHash: s.loaded.reportHash });
    if (!r.ok) return this.set({ notice: { kind: "invalid", text: r.issues[0].message } });
    this.set({
      phase: "confirming", notice: null,
      pending: { decision, reason: r.value.reason, reportHash: r.value.reportHash, confirmText: "" },
    });
  }

  /** 확인창의 제출 ID 입력. 입력 중에는 다시 그리지 않는다(포커스 유지). */
  setConfirmText(text: string): void {
    if (this.state.pending) this.state = { ...this.state, pending: { ...this.state.pending, confirmText: text } };
  }
  private confirmation() {
    const s = this.state;
    if (!s.pending || !s.submissionId) return null;
    const p = s.pending;
    return approvalConfirm({ decision: { submissionId: s.submissionId, decision: p.decision, reportHash: p.reportHash, ...(p.reason ? { reason: p.reason } : {}) }, confirmText: p.confirmText });
  }
  /** 되돌릴 수 없는 결정이라 제출 ID를 그대로 입력해야 확정할 수 있다(approval_confirm, docs/adr/0014). */
  confirmMatches(): boolean {
    return this.confirmation()?.ok === true;
  }

  cancelConfirm(): void {
    if (this.state.phase === "confirming") this.set({ phase: "report", pending: null });
  }

  /** 확인창의 확정. 같은 제출+결정은 요청이 끝나기 전에 다시 보내지 않는다. */
  async confirm(): Promise<void> {
    const s = this.state;
    if (s.phase !== "confirming" || !s.pending || !s.submissionId) return;
    const c = this.confirmation();
    if (!c?.ok) return; // 입력이 맞지 않으면 보내지 않는다(버튼 잠금을 우회한 호출도 막는다)
    const key = `${s.submissionId}:${s.pending.decision}`;
    if (this.inflight.has(key)) return;
    this.inflight.add(key);
    this.set({ phase: "submitting" });
    try {
      const result = await this.api.decide(c.value);
      this.set({ phase: "done", result, pending: null });
    } catch (e) {
      await this.afterDecideError(e, s.submissionId);
    } finally {
      this.inflight.delete(key);
    }
  }

  private async afterDecideError(e: unknown, id: string): Promise<void> {
    const out = approvalFailure({ context: "decide", error: toErrorInfo(e) });
    if (out.action === "reload_report") return this.openReport(id, out.notice ?? null);
    if (out.action === "back_to_report") return this.set({ phase: "report", pending: null, notice: out.notice ?? null });
    this.set({ phase: "error", error: out.errorText ?? "알 수 없는 오류", pending: null });
  }
}
