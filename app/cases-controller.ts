// 실패 사례 검토 화면의 상태 기계. DOM 없음. 입력 내용(reviewed_input, expected)은 메모리에만 두고 저장소·콘솔에 남기지 않는다.
import { ApiError } from "../api/http.ts";
import type { CasesClient } from "../api/cases.ts";
import type { DeidentifiedTrace, ExpectedKind, FailureCase, ReviewRequest, ReviewStatus } from "../api/types.ts";
import { parseObject, validateExpected, validateInput } from "./validate.ts";

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
  result: { case: FailureCase; replay: boolean } | null;
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
    if (!(e instanceof ApiError)) return "알 수 없는 오류";
    switch (e.kind) {
      case "UNAVAILABLE": return "서버에 연결하지 못했다. 잠시 뒤 다시 시도하라.";
      case "PERMISSION_DENIED": return "권한이 없다. 이 계정은 검토 역할(reviewer)이 아니다.";
      case "NOT_FOUND": return "대상을 찾을 수 없다.";
      default: return `요청에 실패했다: ${e.message}`;
    }
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
      const form: CaseForm = { ...emptyForm(), kind: c.expected_kind === "PARSER" || c.expected_kind === "GENERATOR" ? c.expected_kind : "" };
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
    const src = trace[form.kind === "PARSER" ? "parser_input" : "generator_input"];
    if (src && typeof src === "object") this.setFormAndRender({ inputText: JSON.stringify(src, null, 2) });
  }

  /** 전송 본문을 만든다. 검증에 실패하면 null이고 errors를 채운다. */
  buildRequest(): ReviewRequest | null {
    const { form } = this.state;
    const errors: string[] = [];
    if (form.status !== "CONFIRMED") return { review_status: form.status };
    const req: ReviewRequest = { review_status: "CONFIRMED" };
    const hasInput = form.inputText.trim() !== "";
    const hasExpected = form.expectedText.trim() !== "";
    if ((hasInput || hasExpected) && !form.kind) errors.push("입력을 쓰려면 종류(PARSER/GENERATOR)를 고르라.");
    if (form.kind && (hasInput || hasExpected)) {
      req.expected_kind = form.kind;
      if (hasInput) {
        const p = parseObject(form.inputText);
        if (!p.ok) errors.push(...p.errors.map((m) => `고쳐 쓴 입력: ${m}`));
        else {
          const errs = validateInput(form.kind, p.value);
          if (errs.length) errors.push(...errs.map((m) => `고쳐 쓴 입력 ${m}`));
          else req.reviewed_input = p.value;
        }
      }
      if (hasExpected) {
        const p = parseObject(form.expectedText);
        if (!p.ok) errors.push(...p.errors.map((m) => `정답: ${m}`));
        else {
          const errs = validateExpected(form.kind, p.value);
          if (errs.length) errors.push(...errs.map((m) => `정답 ${m}`));
          else req.expected = p.value;
        }
      }
    }
    if (errors.length) {
      this.set({ errors });
      return null;
    }
    return req;
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
      const back = { phase: "case" as const };
      if (e instanceof ApiError && e.kind === "INVALID_RECORD") this.set({ ...back, notice: { kind: "invalid", text: `서버가 검토 내용을 거절했다: ${e.message}` } });
      else if (e instanceof ApiError && e.kind === "PERMISSION_DENIED") this.set({ ...back, notice: { kind: "denied", text: "권한이 없다. 이 계정은 검토 역할(reviewer)이 아니다." } });
      else if (e instanceof ApiError && e.kind === "NOT_FOUND") this.set({ ...back, notice: { kind: "notfound", text: "사례를 찾을 수 없다." } });
      else if (e instanceof ApiError && e.retryable) this.set({ ...back, notice: { kind: "retry", text: "서버에 연결하지 못했다. 기록되었는지 알 수 없으니 같은 검토를 다시 보내도 안전하다(같은 검토는 한 번만 기록된다)." } });
      else this.set({ phase: "error", error: this.describe(e) });
    } finally {
      this.inflight.delete(key);
    }
  }
}
