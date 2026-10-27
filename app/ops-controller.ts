// 릴리스 운영 화면(활성화·롤백)의 상태 기계. DOM 없음. 역할은 클라이언트가 계약대로 보내고(operator), 행위자는 보내지 않는다(서버가 헤더로 기록).
import { ApiError } from "../api/http.ts";
import type { ReleasesClient } from "../api/releases.ts";
import type { ActivePointer, ReleaseSummary, RollbackReceipt } from "../api/types.ts";

export type OpsPhase = "loading" | "ready" | "submitting" | "error";
export type OpsKind = "activate" | "rollback";

export interface Pending {
  kind: OpsKind;
  target: string; // 활성화할 / 되돌아갈 릴리스 ID
  confirmText: string; // 운영자가 입력한 릴리스 ID
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
  notice: { kind: "badresponse" | "denied" | "conflict" | "precondition" | "network" | "invalid" | "notfound" | "other"; text: string } | null;
  errors: string[]; // 전송 전 검증 오류
  error: string | null; // 불러오기 실패
  rev: number; // 그리기 신호
}

export function describeOpsError(e: unknown): { kind: NonNullable<OpsState["notice"]>["kind"]; text: string } {
  if (!(e instanceof ApiError)) return { kind: "other", text: "알 수 없는 오류" };
  switch (e.kind) {
    case "PERMISSION_DENIED": return { kind: "denied", text: "권한이 없다(403). 이 계정은 운영자(operator) 역할이 아니다. 활성화·롤백은 운영자 계정만 할 수 있다." };
    case "CONFLICT": return { kind: "conflict", text: `다른 변경과 겹쳤다(409): 다른 운영자가 먼저 활성 릴리스를 바꿨거나 상태가 맞지 않다. 화면을 새로 불러왔으니 현재 상태를 확인하고 다시 시도하라.${e.message ? ` (서버: ${e.message})` : ""}` };
    case "FAILED_PRECONDITION": return { kind: "precondition", text: `이 릴리스는 활성화할 수 없다(412): 게이트 결정이 PASS가 아니거나 조건이 맞지 않는다.${e.message ? ` (서버: ${e.message})` : ""}` };
    case "BAD_RESPONSE": return { kind: "badresponse", text: `서버 응답 이상: 서버가 계약과 다른 응답을 돌려줬다(${e.message}). 요청이 적용됐는지 알 수 없으니 새로고침으로 현재 활성 릴리스를 확인하라. 같은 일이 반복되면 게이트 운영자에게 알려라.` };
    case "UNAVAILABLE": return { kind: "network", text: "서버에 연결하지 못했다. 변경이 적용됐는지 알 수 없으니 새로고침으로 현재 활성 릴리스를 확인한 뒤 다시 시도하라." };
    case "NOT_FOUND": return { kind: "notfound", text: "대상 릴리스를 찾을 수 없다(404)." };
    case "INVALID_RECORD": return { kind: "invalid", text: `요청이 거부됐다(400): ${e.message}` };
    default: return { kind: "other", text: `요청에 실패했다: ${e.message}` };
  }
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

/** 현재 활성보다 오래된(목록에서 뒤쪽) 릴리스 중 가장 가까운 것이 롤백 기본 대상이다. 없으면 null. */
export function rollbackCandidates(releases: ReleaseSummary[], pointer: ActivePointer | null): ReleaseSummary[] {
  if (!pointer) return [];
  const i = releases.findIndex((r) => r.release_id === pointer.release_id);
  return i < 0 ? [] : releases.slice(i + 1);
}

/** 활성화 후보: 현재 활성보다 새로운 릴리스(목록에서 앞쪽). 활성이 없으면 전부. */
export function activateCandidates(releases: ReleaseSummary[], pointer: ActivePointer | null): ReleaseSummary[] {
  if (!pointer) return releases;
  const i = releases.findIndex((r) => r.release_id === pointer.release_id);
  return i < 0 ? releases : releases.slice(0, i);
}

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
    this.set({ pending: { kind: "activate", target, confirmText: "", reason: "", evidenceText: "", requestId: this.newId("act") }, errors: [], notice: null, receipt: null });
  }
  startRollback(target?: string): void {
    const cand = rollbackCandidates(this.state.releases, this.state.pointer);
    const t = target ?? cand[0]?.release_id;
    if (!t) return;
    this.set({ pending: { kind: "rollback", target: t, confirmText: "", reason: "", evidenceText: "", requestId: this.newId("rb") }, errors: [], notice: null, receipt: null });
  }
  cancel(): void {
    this.set({ pending: null, errors: [] });
  }
  /** 입력 중에는 다시 그리지 않는다(포커스 유지). */
  setField(p: Partial<Pick<Pending, "confirmText" | "reason" | "evidenceText">>): void {
    if (this.state.pending) this.state = { ...this.state, pending: { ...this.state.pending, ...p } };
  }
  setTarget(target: string): void {
    if (this.state.pending) this.set({ pending: { ...this.state.pending, target, confirmText: "" }, errors: [] });
  }

  confirmMatches(): boolean {
    const p = this.state.pending;
    return !!p && p.confirmText.trim() === p.target;
  }

  async submit(): Promise<void> {
    const p = this.state.pending;
    if (!p || this.state.phase === "submitting") return;
    const errors: string[] = [];
    if (p.confirmText.trim() !== p.target) errors.push("확인을 위해 대상 릴리스 ID를 정확히 입력하라.");
    const evidence = p.evidenceText.split(/[\s,]+/).filter(Boolean);
    if (p.kind === "rollback") {
      if (!p.reason.trim()) errors.push("롤백 사유를 적어라.");
      if (evidence.length === 0) errors.push("근거 ID를 하나 이상 적어라(실패 사례 ID나 지표 스냅샷 ID).");
      if (!this.state.pointer) errors.push("현재 활성 릴리스가 없어 롤백할 수 없다.");
    }
    if (errors.length) { this.set({ errors }); return; }
    this.set({ phase: "submitting", errors: [], notice: null });
    try {
      let receipt: Receipt;
      if (p.kind === "activate") {
        receipt = { kind: "activate", pointer: await this.api.activate(p.target) };
      } else {
        const rb = await this.api.rollback({
          pipeline_schema_version: this.state.pointer?.pipeline_schema_version ?? "2.0", request_id: p.requestId, requested_at: this.now(),
          from_release_id: this.state.pointer!.release_id, to_release_id: p.target, reason: p.reason.trim(), evidence_refs: evidence,
        });
        receipt = { kind: "rollback", rollback: rb };
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
