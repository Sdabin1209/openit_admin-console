// 화면 상태 기계. DOM 없음. 중복 요청은 한 번만 보낸다.
import { ApiError, type GateClient } from "../api/client.ts";
import type { Decision, GateApproval, LoadedReport, SubmissionView } from "../api/types.ts";
import type { SortKey } from "./model.ts";

export const APPROVER_ROLE = "release-approver";

export type Phase = "list-loading" | "list" | "report-loading" | "report" | "confirming" | "submitting" | "done" | "error";

export interface State {
  phase: Phase;
  items: SubmissionView[];
  nextCursor: string | null;
  submissionId: string | null;
  loaded: LoadedReport | null;
  /** 결정 전에 승인자가 본 보고서의 해시. confirming/submitting 동안 고정된다. */
  pending: { decision: Decision; reason?: string; reportHash: string } | null;
  draft: { reason: string };
  notice: { kind: "stale" | "conflict" | "denied" | "retry" | "invalid"; text: string } | null;
  result: { approval: GateApproval; replay: boolean } | null;
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
  private readonly api: GateClient;
  /** 개발 모드 설정(ADMIN_DEV_APPROVER_ID). 있을 때만 본문에 approver_id를 보낸다. */
  readonly devApproverId: string | null;
  constructor(api: GateClient, devApproverId: string | null = null) {
    this.api = api;
    this.devApproverId = devApproverId;
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
    const msg = e instanceof ApiError ? this.describe(e) : "알 수 없는 오류";
    this.set({ ...base, phase: "error", error: msg });
  }
  private describe(e: ApiError): string {
    switch (e.kind) {
      case "UNAVAILABLE": return "게이트에 연결하지 못했다. 잠시 뒤 다시 시도하라.";
      case "PERMISSION_DENIED": return "권한이 없다. 이 계정은 출고 승인 역할(release-approver)이 아니다.";
      case "NOT_FOUND": return "대상을 찾을 수 없다.";
      case "CONFLICT": return "지금은 보고서를 볼 수 없다(자동 검사가 끝나지 않았거나 상태가 바뀌었다).";
      default: return `요청에 실패했다: ${e.message}`;
    }
  }

  async openList(): Promise<void> {
    this.set({ phase: "list-loading", error: null, notice: null, result: null, pending: null, loaded: null, submissionId: null });
    try {
      const r = await this.api.listAwaiting();
      this.set({ phase: "list", items: r.items, nextCursor: r.nextCursor });
    } catch (e) {
      this.fail(e);
    }
  }

  async loadMore(): Promise<void> {
    if (!this.state.nextCursor || this.inflight.has("more")) return;
    this.inflight.add("more");
    try {
      const r = await this.api.listAwaiting(this.state.nextCursor);
      this.set({ items: [...this.state.items, ...r.items], nextCursor: r.nextCursor });
    } catch (e) {
      this.fail(e);
    } finally {
      this.inflight.delete("more");
    }
  }

  async openReport(id: string, notice: State["notice"] = null): Promise<void> {
    this.set({ phase: "report-loading", submissionId: id, error: null, notice, pending: null, result: null, sliceKind: "ALL_KINDS", sort: "default" });
    try {
      const loaded = await this.api.getReviewReport(id);
      this.set({ phase: "report", loaded });
    } catch (e) {
      this.fail(e, { loaded: null });
    }
  }

  setDraft(p: Partial<State["draft"]>): void {
    this.state = { ...this.state, draft: { ...this.state.draft, ...p } }; // 입력 중에는 다시 그리지 않는다
  }
  setView(p: { sliceKind?: string; sort?: SortKey }): void {
    this.set(p);
  }

  /** 결정 버튼. 검증을 통과해야 확인창으로 간다. */
  requestDecision(decision: Decision): void {
    const s = this.state;
    if (s.phase !== "report" || !s.loaded) return;
    const reason = s.draft.reason.trim();
    if (decision === "REJECT" && !reason) {
      return this.set({ notice: { kind: "invalid", text: "반려에는 사유가 필수다." } });
    }
    this.set({
      phase: "confirming", notice: null,
      pending: { decision, reason: decision === "REJECT" ? reason : undefined, reportHash: s.loaded.reportHash },
    });
  }

  cancelConfirm(): void {
    if (this.state.phase === "confirming") this.set({ phase: "report", pending: null });
  }

  /** 확인창의 확정. 같은 제출+결정은 요청이 끝나기 전에 다시 보내지 않는다. */
  async confirm(): Promise<void> {
    const s = this.state;
    if (s.phase !== "confirming" || !s.pending || !s.submissionId) return;
    const key = `${s.submissionId}:${s.pending.decision}`;
    if (this.inflight.has(key)) return;
    this.inflight.add(key);
    const p = s.pending;
    this.set({ phase: "submitting" });
    try {
      const result = await this.api.decide({
        submission_id: s.submissionId,
        decision: p.decision,
        ...(this.devApproverId ? { approver_id: this.devApproverId } : {}),
        approver_role: APPROVER_ROLE,
        ...(p.reason ? { reason: p.reason } : {}),
        report_hash: p.reportHash,
      });
      this.set({ phase: "done", result, pending: null });
    } catch (e) {
      await this.afterDecideError(e, s.submissionId);
    } finally {
      this.inflight.delete(key);
    }
  }

  private async afterDecideError(e: unknown, id: string): Promise<void> {
    if (e instanceof ApiError && e.kind === "STALE_REPORT") {
      // 보고서가 바뀌었다. 새로 불러오고, 승인자가 다시 읽고 다시 결정하게 한다(자동 재전송 없음).
      return this.openReport(id, { kind: "stale", text: "그 사이 보고서가 바뀌었다. 새 보고서를 불러왔으니 다시 읽고 결정하라." });
    }
    if (e instanceof ApiError && (e.kind === "ALREADY_DECIDED" || e.kind === "CONFLICT")) {
      return this.set({ phase: "report", pending: null, notice: { kind: "conflict", text: "이 제출에는 이미 다른 결정이 기록되어 있다. 목록을 새로 불러와 확인하라." } });
    }
    if (e instanceof ApiError && e.kind === "PERMISSION_DENIED") {
      return this.set({ phase: "report", pending: null, notice: { kind: "denied", text: "권한이 없다. 이 계정은 출고 승인 역할이 아니다." } });
    }
    if (e instanceof ApiError && e.retryable) {
      return this.set({ phase: "report", pending: null, notice: { kind: "retry", text: "게이트에 연결하지 못했다. 결정이 기록되었는지 알 수 없으니, 같은 결정을 다시 보내도 안전하다(같은 결정은 한 번만 기록된다)." } });
    }
    this.fail(e, { pending: null });
  }
}
