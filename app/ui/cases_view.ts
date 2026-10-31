// 실패 사례 검토 화면 그리기. textContent만 쓴다. 입력 내용을 저장소·콘솔에 남기지 않는다.
import type { CasesController, CaseState } from "../wiring/cases_controller.ts";
import { h, fmtTime } from "./views.ts";
import type { CaseRecord } from "../types/CaseRecord.ts";

type FailureCase = CaseRecord;

const PII_WARNING = "개인정보를 쓰지 마라. 이름, 연락처, 주민등록번호, 주소, 병원·진료 식별 정보 등 환자를 알아볼 수 있는 내용은 어떤 형태로도 적지 않는다. 고쳐 쓴 문장은 실제 환자의 말을 그대로 옮기지 말고 같은 구조의 가상 문장으로 바꿔 쓴다. 입력 내용은 이 브라우저에 저장되거나 로그로 남지 않는다.";

const STATUS_LABEL: Record<string, string> = { PENDING: "검토 대기", CONFIRMED: "확정", DISMISSED: "기각" };

function section(trace: Record<string, unknown>, key: string): unknown {
  return trace[key];
}
const get = (o: unknown, ...path: string[]): unknown => path.reduce<unknown>((a, k) => (a && typeof a === "object" ? (a as Record<string, unknown>)[k] : undefined), o);
/** v2의 expected_kind는 LORA_A/LORA_B. 모르는 값(예: v1의 PARSER/GENERATOR)은 '알 수 없음'으로 표시하고 expected의 형태로 추정하지 않는다. */
export function expectedKindLabel(k: FailureCase): string {
  const v = k.expected_kind;
  if (v === undefined) return "—";
  if (v === "LORA_A") return "LORA_A (행동 추출)";
  if (v === "LORA_B") return "LORA_B (응답 문장)";
  return `알 수 없음 (${v})`;
}
const show = (x: unknown): string => (x === undefined || x === null ? "—" : typeof x === "object" ? JSON.stringify(x) : String(x));

/** 비식별 trace에서 구조 정보만 뽑는다. 값은 마스킹되어 있을 수 있다. 모르는 구조는 건너뛴다. */
export function traceFacts(trace: Record<string, unknown>): [string, string][] {
  const values = get(trace, "extract_output", "values");
  return [
    ["계약 버전", show(trace.contract_version)],
    ["LoRA-A 추출 상태", show(trace.extract_status)],
    ["LoRA-A 시도 횟수", show(trace.extract_attempts)],
    ["LoRA-A 동작(action)", show(get(trace, "extract_output", "action"))],
    ["LoRA-A 값 개수", Array.isArray(values) ? String(values.length) : "—"],
    ["검증 통과", show(trace.validation_ok)],
    ["LoRA-B 동작(action)", show(get(trace, "response_input", "action"))],
    ["LoRA-B 응답 결과", show(trace.response_outcome)],
  ];
}

function caseList(st: CaseState, c: CasesController): HTMLElement {
  const sel = h("select", { id: "case-filter", onchange: (e) => void c.openList((e.target as HTMLSelectElement).value) },
    ...[["PENDING", "검토 대기"], ["CONFIRMED", "확정"], ["DISMISSED", "기각"], ["", "전체"]].map(([v, t]) => h("option", { value: v }, t)));
  (sel as HTMLSelectElement).value = st.filter;
  return h("section", {}, h("h2", {}, "실패 사례"),
    h("p", {}, h("label", { for: "case-filter" }, "검토 상태 "), sel, " ", h("button", { type: "button", onclick: () => void c.openList() }, "새로고침")),
    st.cases.length
      ? h("table", { class: "grid" },
          h("thead", {}, h("tr", {}, ...["사례 ID", "버전", "실패 유형", "탐지 방법", "출처 릴리스", "검토 상태", "생성 시각", ""].map((t) => h("th", { scope: "col" }, t)))),
          h("tbody", {}, ...st.cases.map((k) => h("tr", {},
            h("td", {}, k.case_id), h("td", { class: "num" }, String(k.version)), h("td", {}, k.failure_type), h("td", {}, k.detection_method),
            h("td", {}, k.source_release_id), h("td", {}, STATUS_LABEL[k.review_status] ?? k.review_status), h("td", {}, fmtTime(k.created_at)),
            h("td", {}, h("button", { type: "button", onclick: () => { location.hash = `#/cases/${encodeURIComponent(k.case_id)}`; } }, "열기"))))))
      : h("p", { class: "muted" }, "해당하는 사례가 없다."));
}

function caseDetail(st: CaseState, c: CasesController, k: FailureCase): HTMLElement {
  const busy = st.phase === "submitting";
  const f = st.form;
  const kindSel = h("select", { id: "kind", disabled: busy, onchange: (e) => c.setFormAndRender({ kind: (e.target as HTMLSelectElement).value as "" }) },
    h("option", { value: "" }, "(선택)"), h("option", { value: "LORA_A" }, "LORA_A (ActionExtractionInput / ActionExtraction)"), h("option", { value: "LORA_B" }, "LORA_B (ResponseRequest / ResponseText)"));
  (kindSel as HTMLSelectElement).value = f.kind;
  const statusSel = h("select", { id: "review-status", disabled: busy, onchange: (e) => c.setFormAndRender({ status: (e.target as HTMLSelectElement).value as "PENDING" }) },
    h("option", { value: "CONFIRMED" }, "확정 (CONFIRMED)"), h("option", { value: "DISMISSED" }, "기각 (DISMISSED)"), h("option", { value: "PENDING" }, "대기로 되돌림 (PENDING)"));
  (statusSel as HTMLSelectElement).value = f.status;
  const versions = Array.from({ length: k.version }, (_, i) => i + 1);
  return h("section", {},
    h("p", {}, h("a", { href: "#/cases" }, "← 목록")),
    h("h2", {}, `사례 ${k.case_id} (버전 ${k.version})`),
    h("dl", { class: "facts" },
      ...([["실패 유형", k.failure_type], ["탐지 방법", k.detection_method], ["출처 릴리스", k.source_release_id], ["런타임 계약 버전", String(k.runtime_contract_version ?? "—")],
        ["검토 상태", STATUS_LABEL[k.review_status] ?? k.review_status], ["정답 종류", expectedKindLabel(k)],
        ["문항 세트", k.question_set ? `${k.question_set.id}@${k.question_set.version}` : "—"]] as [string, string][]).flatMap(([a, b]) => [h("dt", {}, a), h("dd", {}, b)])),
    k.version > 1 && h("p", {}, "버전 보기: ", ...versions.map((v) => h("button", { type: "button", onclick: () => void c.openCase(k.case_id, v) }, `v${v}`)), " ",
      h("button", { type: "button", onclick: () => void c.openCase(k.case_id) }, "최신")),
    h("h3", {}, "비식별 trace (구조 정보)"),
    h("p", { class: "muted" }, "자유 문자열은 [MASKED]로 가려져 있을 수 있다."),
    st.traceError ? h("p", { class: "notice error", role: "alert" }, `trace를 읽지 못했다: ${st.traceError}`)
      : st.trace ? h("div", {}, h("dl", { class: "facts" }, ...traceFacts(st.trace as unknown as Record<string, unknown>).flatMap(([a, b]) => [h("dt", {}, a), h("dd", {}, b)])),
          ...["extract_input", "extract_output", "validation_violations", "response_input", "response_output"].map((key) =>
            h("details", {}, h("summary", {}, key), h("pre", {}, JSON.stringify(section(st.trace as unknown as Record<string, unknown>, key) ?? null, null, 2)))))
      : h("p", { class: "muted", role: "status" }, "trace 불러오는 중…"),
    k.reviewed_input && h("div", {}, h("h3", {}, "기존에 고쳐 쓴 입력"), h("pre", {}, JSON.stringify(k.reviewed_input, null, 2))),
    k.expected && h("div", {}, h("h3", {}, "기존 정답"), h("pre", {}, typeof k.expected === "string" ? k.expected : JSON.stringify(k.expected, null, 2))),
    h("form", { class: "decision", onsubmit: (e) => e.preventDefault() },
      h("h3", {}, "검토"),
      h("p", { class: "notice warn", id: "pii-warning", role: "note" }, PII_WARNING),
      st.notice && h("p", { class: `notice ${st.notice.kind}`, role: "alert" }, st.notice.text),
      st.errors.length > 0 && h("div", { class: "notice error", role: "alert", id: "form-errors" }, h("p", {}, "전송하지 않았다. 아래를 고쳐라."), h("ul", {}, ...st.errors.map((m) => h("li", {}, m)))),
      h("p", {}, h("label", { for: "review-status" }, "결정 "), statusSel),
      f.status === "CONFIRMED" && h("div", {},
        h("p", {}, h("label", { for: "kind" }, "종류 "), kindSel),
        h("p", {}, h("label", { for: "input-text" }, "고쳐 쓴 입력(reviewed_input, JSON, 선택) — 개인정보 없는 문장으로"), h("br"),
          h("textarea", { id: "input-text", "aria-describedby": "pii-warning", rows: "10", cols: "80", spellcheck: "false", disabled: busy, oninput: (e) => c.setForm({ inputText: (e.target as HTMLTextAreaElement).value }) }, f.inputText), h("br"),
          h("button", { type: "button", id: "prefill", disabled: busy || !st.trace || !f.kind, onclick: () => c.prefillFromTrace() }, "trace의 입력으로 채우기(마스킹된 값, 반드시 고쳐 쓸 것)")),
        h("p", {}, h("label", { for: "expected-text" }, f.kind === "LORA_B" ? "정답(expected, 응답 문장 그대로, 선택)" : "정답(expected, JSON, 선택)"), h("br"),
          h("textarea", { id: "expected-text", "aria-describedby": "pii-warning", rows: "6", cols: "80", spellcheck: "false", disabled: busy, oninput: (e) => c.setForm({ expectedText: (e.target as HTMLTextAreaElement).value }) }, f.expectedText))),
      h("p", {}, h("button", { type: "button", id: "submit-review", disabled: busy, onclick: () => void c.submit() }, busy ? "전송 중…" : "검토 기록"))));
}

export function renderCases(root: HTMLElement, c: CasesController): void {
  const st = c.state;
  root.replaceChildren();
  switch (st.phase) {
    case "list-loading":
    case "case-loading":
      root.append(h("p", { role: "status" }, "불러오는 중…"));
      break;
    case "list":
      root.append(caseList(st, c));
      break;
    case "case":
    case "submitting":
      root.append(caseDetail(st, c, st.current!));
      break;
    case "done": {
      const r = st.result!;
      root.append(h("section", {}, h("h2", {}, "검토를 기록했다"),
        h("p", {}, `사례 ${r.case.case_id} · 버전 ${r.case.version} · ${STATUS_LABEL[r.case.review_status] ?? r.case.review_status}${r.replay ? " (이미 기록된 같은 검토)" : ""}`),
        h("p", {}, h("a", { href: "#/cases" }, "목록으로"))));
      break;
    }
    case "error":
      root.append(h("section", {}, h("p", { class: "notice error", role: "alert" }, st.error), h("p", {}, h("a", { href: "#/cases" }, "목록으로"))));
      break;
  }
}
