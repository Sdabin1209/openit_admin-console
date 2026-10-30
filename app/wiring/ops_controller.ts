// 릴리스 운영 화면(활성화·롤백)의 상태 기계. DOM 없음. 역할은 클라이언트가 계약대로 보내고(operator), 행위자는 보내지 않는다(서버가 헤더로 기록).
import type { ReleasesClient } from "./gateway.ts";
import { toErrorInfo } from "./api_error.ts";
import { opsFailure } from "../components/ops_failure.ts";
import { opsRequest } from "../components/ops_request.ts";
import { releaseCandidates } from "../components/release_candidates.ts";
import type { OpsNotice } from "../types/OpsNotice.ts";
import type { PointerRecord } from "../types/PointerRecord.ts";
import type { ReleaseRow } from "../types/ReleaseRow.ts";
import type { RollbackOutcome } from "../types/RollbackOutcome.ts";

type ActivePointer = PointerRecord;
type ReleaseSummary = ReleaseRow;
type RollbackReceipt = RollbackOutcome;

export type OpsPhase = "loading" | "ready" | "submitting" | "error";
export type OpsKind = "activate" | "rollback";

export interface Pending {
  kind: OpsKind;
  target: string; // 활성화할 / 되돌아갈 릴리스 ID
  reason: string; // 롤백 사유(활성화에는 쓰지 않는다)
  evidenceText: string; // 롤백 근거 ID(쉼표/공백 구분)
  requestId: string; // 같은 확인 단계의 재전송은 같은 ID(멱등)
}

export interface Receipt {
  kind: OpsKind;
  pointer?: ActivePointer;
  rollback?: RollbackReceipt;
}

export interface OpsState {
  phase: OpsPhase;
  pointer: ActivePointer | null;
  releases: ReleaseSummary[]; // 최신부터
  pending: Pending | null;
  receipt: Receipt | null;
  notice: OpsNotice | null;
  errors: string[]; // 전송 전 검증 오류
  error: string | null; // 불러오기 실패
  rev: number; // 그리기 신호
}

export function describeOpsError(e: unknown): OpsNotice {
  return opsFailure({ error: toErrorInfo(e) });
}

/** 요청 ID의 무작위 부분. 시험은 생성기를 주입해 고정한다. */
export type UuidFn = () => string;
const defaultUuid: UuidFn = () => {
  const c = (globalThis as { crypto?: Crypto }).crypto;
  if (c?.randomUUID) return c.randomUUID();
  // randomUUID는 보안 컨텍스트(HTTPS)에서만 있다. getRandomValues는 어디서나 있으므로 UUID v4를 직접 만든다(Math.random 안 씀).
  if (!c?.getRandomValues) throw new Error("이 브라우저에는 암호학적 난수가 없다");
  const b = c.getRandomValues(new Uint8Array(16));
  b[6] = (b[6] & 0x0f) | 0x40; b[8] = (b[8] & 0x3f) | 0x80;
  const x = [...b].map((v) => v.toString(16).padStart(2, "0")).join("");
  return `${x.slice(0, 8)}-${x.slice(8, 12)}-${x.slice(12, 16)}-${x.slice(16, 20)}-${x.slice(20)}`;
};

export const rollbackCandidates = (releases: ReleaseSummary[], pointer: ActivePointer | null): ReleaseSummary[] => releaseCandidates({ releases, pointer }).rollback;
export const activateCandidates = (releases: ReleaseSummary[], pointer: ActivePointer | null): ReleaseSummary[] => releaseCandidates({ releases, pointer }).activate;

export class OpsController {
  state: OpsState = { phase: "loading", pointer: null, releases: [], pending: null, receipt: null, notice: null, errors: [], error: null, rev: 0 };
  private listeners = new Set<() => void>();
  private readonly api: ReleasesClient;
  private readonly now: () => string;
  private readonly uuid: UuidFn;
  constructor(api: ReleasesClient, now: () => string = () => new Date().toISOString().replace(/\.\d+Z$/, "Z"), uuid: UuidFn = defaultUuid) {
    this.api = api;
    this.now = now;
    this.uuid = uuid;
  }
  private newId(prefix: string): string { return `${prefix}-${this.uuid()}`; }
  subscribe(fn: () => void): () => void {
    this.listeners.add(fn);
    return () => this.listeners.delete(fn);
  }
  private set(p: Partial<OpsState>): void {
    this.state = { ...this.state, ...p, rev: this.state.rev + 1 };
    this.listeners.forEach((f) => f());
  }

  /** 불러오기. keep=true면 영수증과 알림을 지우지 않는다. */
  async load(keep = false): Promise<void> {
    this.set({ phase: "loading", error: null, ...(keep ? {} : { notice: null, receipt: null }), pending: null, errors: [] });
    try {
      const [pointer, releases] = await Promise.all([this.api.activePointer(), this.api.listReleases()]);
      this.set({ phase: "ready", pointer, releases });
    } catch (e) {
      const d = describeOpsError(e);
      this.set({ phase: "error", error: d.text });
    }
  }

  /** 확인 단계를 연다. 롤백 대상은 기본으로 가장 가까운 이전 릴리스. */
  startActivate(target: string): void {
    this.set({ pending: { kind: "activate", target, reason: "", evidenceText: "", requestId: this.newId("act") }, errors: [], notice: null, receipt: null });
  }
  startRollback(target?: string): void {
    const cand = rollbackCandidates(this.state.releases, this.state.pointer);
    const t = target ?? cand[0]?.release_id;
    if (!t) return;
    this.set({ pending: { kind: "rollback", target: t, reason: "", evidenceText: "", requestId: this.newId("rb") }, errors: [], notice: null, receipt: null });
  }
  cancel(): void {
    this.set({ pending: null, errors: [] });
  }
  /** 입력 중에는 다시 그리지 않는다(포커스 유지). */
  setField(p: Partial<Pick<Pending, "reason" | "evidenceText">>): void {
    if (this.state.pending) this.state = { ...this.state, pending: { ...this.state.pending, ...p } };
  }
  setTarget(target: string): void {
    if (this.state.pending) this.set({ pending: { ...this.state.pending, target }, errors: [] });
  }

  async submit(): Promise<void> {
    const p = this.state.pending;
    if (!p || this.state.phase === "submitting") return;
    const req = opsRequest({ kind: p.kind, target: p.target, reason: p.reason, evidenceText: p.evidenceText, requestId: p.requestId, requestedAt: this.now(), pointerReleaseId: this.state.pointer?.release_id ?? null });
    if (!req.ok) { this.set({ errors: req.issues.map((i) => i.message) }); return; }
    this.set({ phase: "submitting", errors: [], notice: null });
    try {
      let receipt: Receipt;
      if (req.value.kind === "activate") {
        receipt = { kind: "activate", pointer: await this.api.activate(req.value.releaseId as string) };
      } else {
        receipt = { kind: "rollback", rollback: await this.api.rollback(req.value.rollback as NonNullable<typeof req.value.rollback>) };
      }
      this.set({ receipt, pending: null });
      await this.refreshAfter();
    } catch (e) {
      const d = describeOpsError(e);
      this.set({ phase: "ready", notice: d });
      if (d.kind === "conflict") await this.refreshAfter(); // 현재 상태를 다시 보여 준다(알림은 남긴다)
    }
  }

  private async refreshAfter(): Promise<void> {
    const keepReceipt = this.state.receipt;
    const keepNotice = this.state.notice;
    try {
      const [pointer, releases] = await Promise.all([this.api.activePointer(), this.api.listReleases()]);
      this.set({ phase: "ready", pointer, releases, receipt: keepReceipt, notice: keepNotice, pending: null });
    } catch {
      this.set({ phase: "ready", receipt: keepReceipt, notice: { kind: "network", text: "적용 후 현재 상태를 다시 읽지 못했다. 새로고침하라." } });
    }
  }
}
