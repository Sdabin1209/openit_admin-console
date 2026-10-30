// 실패 사례 검토 화면의 상태 기계. DOM 없음. 입력 내용(reviewed_input, expected)은 메모리에만 두고 저장소·콘솔에 남기지 않는다.
import type { CasesClient } from "./gateway.ts";
import { toErrorInfo } from "./api_error.ts";
import { caseFailure } from "../components/case_failure.ts";
import { caseReviewDraft } from "../components/case_review_draft.ts";
import { caseTracePrefill } from "../components/case_trace_prefill.ts";
import type { CaseRecord } from "../types/CaseRecord.ts";
import type { CaseReviewResult } from "../types/CaseReviewResult.ts";
import type { OpsFeedbackDeidentifiedTrace } from "../types/contract/OpsFeedbackDeidentifiedTrace.ts";

type ExpectedKind = "LORA_A" | "LORA_B";
type ReviewStatus = "PENDING" | "CONFIRMED" | "DISMISSED";
type FailureCase = CaseRecord;
type DeidentifiedTrace = OpsFeedbackDeidentifiedTrace;

export type CasePhase = "list-loading" | "list" | "case-loading" | "case" | "submitting" | "done" | "error";

export interface CaseForm {
  status: ReviewStatus;
  kind: ExpectedKind | "";
  inputText: string;
  expectedText: string;
}

export interface CaseState {
  phase: CasePhase;
  filter: string; // review_status 필터, "" = 전체
  cases: FailureCase[];
  current: FailureCase | null;
  trace: DeidentifiedTrace | null;
  traceError: string | null;
  form: CaseForm;
  errors: string[]; // 전송 전 검증 오류
  notice: { kind: "invalid" | "denied" | "retry" | "notfound"; text: string } | null;
  result: CaseReviewResult | null;
  error: string | null;
}

const emptyForm = (): CaseForm => ({ status: "CONFIRMED", kind: "", inputText: "", expectedText: "" });

export class CasesController {
  state: CaseState = {
    phase: "list-loading", filter: "PENDING", cases: [], current: null, trace: null, traceError: null,
    form: emptyForm(), errors: [], notice: null, result: null, error: null,
  };
  private listeners = new Set<() => void>();
  private inflight = new Set<string>();
  private readonly api: CasesClient;
  constructor(api: CasesClient) {
    this.api = api;
  }
  subscribe(fn: () => void): () => void {
    this.listeners.add(fn);
    return () => this.listeners.delete(fn);
  }
  private set(p: Partial<CaseState>): void {
    this.state = { ...this.state, ...p };
    this.listeners.forEach((f) => f());
  }
  private describe(e: unknown): string {
    return caseFailure({ context: "load", error: toErrorInfo(e) }).errorText ?? "알 수 없는 오류";
  }

  async openList(filter = this.state.filter): Promise<void> {
    this.set({ phase: "list-loading", filter, error: null, notice: null, result: null, errors: [] });
    try {
      const cases = await this.api.list(filter ? { review_status: filter, latest_only: true } : { latest_only: true });
      this.set({ phase: "list", cases });
    } catch (e) {
      this.set({ phase: "error", error: this.describe(e) });
    }
  }

  async openCase(id: string, version?: number): Promise<void> {
    this.set({ phase: "case-loading", current: null, trace: null, traceError: null, form: emptyForm(), errors: [], notice: null, result: null, error: null });
    try {
      const c = await this.api.get(id, version);
      const form: CaseForm = { ...emptyForm(), kind: c.expected_kind === "LORA_A" || c.expected_kind === "LORA_B" ? c.expected_kind : "" };
      this.set({ phase: "case", current: c, form });
      try {
        this.set({ trace: await this.api.getTrace(c.deidentified_trace_ref) });
      } catch (e) {
        this.set({ traceError: this.describe(e) });
      }
    } catch (e) {
      this.set({ phase: "error", error: this.describe(e) });
    }
  }

  /** 입력 중에는 다시 그리지 않는다(포커스 유지). */
  setForm(p: Partial<CaseForm>): void {
    this.state = { ...this.state, form: { ...this.state.form, ...p } };
  }
  /** 종류·상태 같이 화면 구성이 바뀌는 변경. */
  setFormAndRender(p: Partial<CaseForm>): void {
    this.set({ form: { ...this.state.form, ...p }, errors: [], notice: null });
  }

  /** 비식별 trace의 해당 입력을 편집창에 채운다. 검토자가 개인정보 없는 문장으로 고쳐 써야 한다. */
  prefillFromTrace(): void {
    const { form, trace } = this.state;
    if (!trace || !form.kind) return;
    const r = caseTracePrefill({ trace, kind: form.kind });
    if (r.inputText !== null) this.setFormAndRender({ inputText: r.inputText });
  }

  /** 전송 본문을 만든다. case_review_draft가 거부하면 null이고 errors를 채운다. */
  buildRequest() {
    const r = caseReviewDraft(this.state.form);
    if (!r.ok) {
      this.set({ errors: r.issues.map((i) => i.message) });
      return null;
    }
    return r.value;
  }

  /** 같은 사례에 같은 검토 내용은 요청이 끝나기 전에 다시 보내지 않는다. */
  async submit(): Promise<void> {
    const s = this.state;
    if (s.phase !== "case" || !s.current) return;
    const req = this.buildRequest();
    if (!req) return;
    this.set({ errors: [], notice: null });
    const id = s.current.case_id;
    const key = id + ":" + JSON.stringify(req);
    if (this.inflight.has(key)) return;
    this.inflight.add(key);
    this.set({ phase: "submitting" });
    try {
      const result = await this.api.review(id, req);
      this.set({ phase: "done", result });
    } catch (e) {
      const out = caseFailure({ context: "submit", error: toErrorInfo(e) });
      if (out.action === "back_to_case") this.set({ phase: "case", notice: out.notice ?? null });
      else this.set({ phase: "error", error: out.errorText ?? "알 수 없는 오류" });
    } finally {
      this.inflight.delete(key);
    }
  }
}
