// DOM 그리기. innerHTML을 쓰지 않는다(textContent만). 보고서 내용을 저장소나 콘솔에 남기지 않는다.
import type { Controller, State } from "../wiring/approvals_controller.ts";
import { reportView as buildReportView } from "../components/report_view.ts";
import { timeDisplay } from "../components/time_display.ts";
import type { Cell } from "../types/Cell.ts";
import type { MetricRow } from "../types/MetricRow.ts";
import type { ReportDoc } from "../types/ReportDoc.ts";
import type { SubmissionRow } from "../types/SubmissionRow.ts";

type ReviewReport = ReportDoc;
type SubmissionView = SubmissionRow;

/** 서버가 준 시각 원문 옆에 현지 시각을 덧붙인 글(time_display). */
export function fmtTime(iso: string | undefined | null, timeZone?: string): string {
  return timeDisplay({ iso: iso ?? null, ...(timeZone ? { timeZone } : {}) }).text;
}

type Child = Node | string | null | undefined | false;
export function h(tag: string, attrs: Record<string, string | boolean | ((e: Event) => void)> = {}, ...kids: Child[]): HTMLElement {
  const el = document.createElement(tag);
  for (const [k, v] of Object.entries(attrs)) {
    if (typeof v === "function") el.addEventListener(k.replace(/^on/, ""), v);
    else if (v === true) el.setAttribute(k, "");
    else if (v !== false) el.setAttribute(k, v);
  }
  for (const c of kids) if (c) el.append(c);
  return el;
}

function cell(c: Cell): HTMLElement {
  return h("td", { class: `num ${c.kind}` }, c.text);
}

function subjectText(s: SubmissionView["subject"]): string {
  const parts: string[] = [];
  for (const [label, k] of [["문항", "question_set"], ["LoRA-A", "lora_a"], ["LoRA-B", "lora_b"]] as const) {
    const r = (s as Record<string, unknown>)[k] as { id?: string; version?: string } | undefined;
    if (r && typeof r === "object" && "id" in r) parts.push(`${label} ${r.id}@${r.version}`);
  }
  return parts.join(" / ") || "—";
}

function listView(st: State, c: Controller): HTMLElement {
  const body = st.items.length
    ? h("table", { class: "grid" },
        h("thead", {}, h("tr", {}, ...["제출 ID", "제출 시각", "제출 역할", "대상", ""].map((t) => h("th", { scope: "col" }, t)))),
        h("tbody", {}, ...st.items.map((s) =>
          h("tr", {},
            h("td", {}, s.submission_id), h("td", {}, fmtTime(s.submitted_at)), h("td", {}, s.submitted_by_role),
            h("td", {}, subjectText(s.subject)),
            h("td", {}, h("button", { type: "button", onclick: () => { location.hash = `#/s/${encodeURIComponent(s.submission_id)}`; } }, "보고서 열기")),
          ))))
    : h("p", { class: "muted" }, "승인 대기 중인 제출이 없다.");
  return h("section", {}, h("h2", {}, "승인 대기 제출"),
    h("p", {}, h("button", { type: "button", onclick: () => void c.openList() }, "새로고침")),
    body,
    st.nextCursor && h("p", {}, h("button", { type: "button", onclick: () => void c.loadMore() }, "더 보기")));
}

function metricTable(rows: MetricRow[]): HTMLElement {
  return h("table", { class: "grid metrics" },
    h("thead", {}, h("tr", {}, ...["역할", "지표", "분리 기준", "후보 값", "표본 수", "기준값(활성 릴리스)", "기준 표본 수", "차이", "참고"].map((t) => h("th", { scope: "col" }, t)))),
    h("tbody", {}, ...rows.map((r) =>
      h("tr", { class: r.worse ? "worse" : "", "data-role": r.role },
        h("td", {}, r.role === "LORA_A" ? "LORA_A (추출)" : r.role === "LORA_B" ? "LORA_B (응답)" : r.role), h("td", {}, r.name, h("small", { class: "muted" }, ` (${r.direction})`)), h("td", {}, r.sliceLabel),
        cell(r.candidate), h("td", { class: "num" }, r.candidateN), cell(r.baseline), h("td", { class: "num" }, r.baselineN), cell(r.delta),
        h("td", {}, r.worse ? h("strong", { class: "worse-mark" }, "▲ 나빠짐(참고)") : r.worseKnown ? "—" : "")))));
}

function reportView(st: State, c: Controller, rep: ReviewReport): HTMLElement {
  const view = buildReportView({ comparisons: rep.comparisons, sliceKind: st.sliceKind, sort: st.sort });
  const groups = view.groups;
  const kinds = view.sliceKinds;
  const sel = h("select", { id: "slice", onchange: (e) => c.setView({ sliceKind: (e.target as HTMLSelectElement).value }) },
    h("option", { value: "ALL_KINDS" }, "모두"), ...kinds.map((k) => h("option", { value: k }, k === "ALL" ? "ALL (전체)" : k)));
  (sel as HTMLSelectElement).value = st.sliceKind;
  const sortSel = h("select", { id: "sort", onchange: (e) => c.setView({ sort: (e.target as HTMLSelectElement).value as State["sort"] }) },
    ...([["default", "보고서 순서"], ["name", "이름"], ["candidate", "후보 값"], ["delta", "차이"], ["worse", "나빠짐 먼저"]] as const).map(([v, t]) => h("option", { value: v }, t)));
  (sortSel as HTMLSelectElement).value = st.sort;
  const busy = st.phase !== "report";
  return h("section", {},
    h("p", {}, h("a", { href: "#/" }, "← 목록")),
    h("h2", {}, `승인 요청 보고서 ${rep.submission_id}`),
    h("p", { class: "muted" }, `생성 ${fmtTime(rep.generated_at)} · 현재 활성 릴리스 ${rep.active_release_id ?? "없음"} · 보고서 해시 ${st.loaded!.reportHash.slice(0, 19)}…` /* 19 = 'sha256:'+12자, 눈 대조용 앞부분(docs/adr/0010). 전송 값은 전체 */),
    st.notice && h("p", { class: `notice ${st.notice.kind}`, role: "alert" }, st.notice.text),
    h("p", { class: "muted" }, "이 화면은 합격·불합격을 판단하지 않는다. 임계치가 없고 '나빠짐'은 활성 릴리스와 비교한 참고 표시다. 판단은 승인자가 한다."),
    h("p", {}, `지표 ${rep.comparisons.length}개 중 나빠짐 표시 ${view.worseCount}개`),
    h("h3", {}, "자동 검사"),
    rep.checks.length ? h("ul", {}, ...rep.checks.map((k) => h("li", {}, `${k.kind}: ${k.result}${k.detail ? ` — ${k.detail}` : ""}`))) : h("p", { class: "muted" }, "검사 결과 없음"),
    h("div", { class: "filters" },
      h("label", { for: "slice" }, "분리 기준 "), sel, " ", h("label", { for: "sort" }, "정렬(그룹 안) "), sortSel),
    ...groups.map((g) => h("section", { class: g.group === "SAFETY" ? "group safety" : "group" },
      h("h3", {}, g.label), metricTable(g.rows))),
    groups.length === 0 && h("p", { class: "muted" }, "표시할 지표가 없다."),
    rep.notes && rep.notes.length > 0 && h("div", {}, h("h3", {}, "노트"), h("ul", {}, ...rep.notes.map((n) => h("li", {}, n)))),
    decisionForm(st, c, busy));
}

function decisionForm(st: State, c: Controller, busy: boolean): HTMLElement {
  return h("form", { class: "decision", onsubmit: (e) => e.preventDefault() },
    h("h3", {}, "결정"),
    h("p", { id: "approver-note", class: "muted" }, "게이트웨이가 인증한 사용자로 기록됨"),
    h("p", { class: "muted", id: "reason-pii" }, "사유는 기록으로 남는다. 환자 이름·주민번호·연락처 같은 개인정보를 쓰지 마라."),
    h("p", {}, h("label", { for: "reason" }, "반려 사유 (반려할 때 필수) "), h("br"),
      h("textarea", { id: "reason", "aria-describedby": "reason-pii", rows: "3", cols: "60", oninput: (e) => c.setDraft({ reason: (e.target as HTMLTextAreaElement).value }) }, st.draft.reason)),
    h("p", {},
      h("button", { type: "button", id: "approve", disabled: busy, onclick: () => c.requestDecision("APPROVE") }, "승인…"), " ",
      h("button", { type: "button", id: "reject", disabled: busy, onclick: () => c.requestDecision("REJECT") }, "반려…")));
}

function confirmDialog(st: State, c: Controller): HTMLElement {
  const p = st.pending!;
  const sending = st.phase === "submitting";
  const approve = p.decision === "APPROVE";
  // 되돌릴 수 없는 결정이라 제출 ID를 입력해야 확정 버튼이 켜진다(docs/adr/0014).
  const yes = h("button", { type: "button", id: "confirm-yes", disabled: sending || !c.confirmMatches(), onclick: () => void c.confirm() }, sending ? "전송 중…" : approve ? "승인 확정" : "반려 확정");
  const idInput = h("input", { id: "confirm-id", type: "text", autocomplete: "off", spellcheck: "false", disabled: sending, value: c.state.pending?.confirmText ?? "",
    oninput: (e) => { c.setConfirmText((e.target as HTMLInputElement).value); if (!sending) { if (c.confirmMatches()) yes.removeAttribute("disabled"); else yes.setAttribute("disabled", ""); } } });
  const dlg = h("dialog", { id: "confirm", "aria-labelledby": "confirm-title" },
    h("h2", { id: "confirm-title", tabindex: "-1" }, approve ? "승인하시겠습니까?" : "반려하시겠습니까?"),
    h("p", {}, `제출 ${st.submissionId}`),
    h("p", {}, `보고서 해시 ${p.reportHash.slice(0, 19)}… (화면에 보이는 보고서)`),
    p.reason && h("p", {}, `사유: ${p.reason}`),
    h("p", {}, "승인자: 게이트웨이가 인증한 사용자"),
    h("p", { class: "muted" }, "확정하면 이 결정이 기록되고 되돌릴 수 없다."),
    h("p", {}, h("label", { for: "confirm-id" }, `확인: 제출 ID(${st.submissionId})를 그대로 입력 `), idInput),
    h("p", {},
      h("button", { type: "button", id: "confirm-no", autofocus: true, disabled: sending, onclick: () => c.cancelConfirm() }, "취소"), " ",
      yes));
  // 첫 포커스는 취소 버튼이다. Enter 연타로 결정이 확정되지 않게 한다(확정은 의도적으로 Tab으로 옮겨야 한다).
  queueMicrotask(() => {
    const d = dlg as HTMLDialogElement;
    if (!d.open) { if (typeof d.showModal === "function") d.showModal(); else d.setAttribute("open", ""); }
    if (!sending) (dlg.querySelector("#confirm-no") as HTMLElement | null)?.focus();
    else (dlg.querySelector("#confirm-title") as HTMLElement | null)?.focus();
  });
  dlg.addEventListener("cancel", (e) => { e.preventDefault(); if (!sending) c.cancelConfirm(); });
  return dlg;
}

export function render(root: HTMLElement, c: Controller): void {
  const st = c.state;
  root.replaceChildren();
  switch (st.phase) {
    case "list-loading":
    case "report-loading":
      root.append(h("p", { role: "status" }, "불러오는 중…"));
      break;
    case "list":
      root.append(listView(st, c));
      break;
    case "report":
    case "confirming":
    case "submitting":
      root.append(reportView(st, c, st.loaded!.report));
      if (st.phase !== "report") root.append(confirmDialog(st, c));
      break;
    case "done": {
      const r = st.result!;
      root.append(h("section", {},
        h("h2", {}, r.approval.decision === "APPROVE" ? "승인했다" : "반려했다"),
        h("p", {}, `제출 ${r.approval.submission_id} · 결정 번호 ${r.approval.approval_id}${r.replay ? " (이미 기록된 같은 결정)" : ""}`),
        h("dl", { class: "facts", id: "done-facts" },
          h("dt", {}, "기록된 승인자"), h("dd", {}, `${r.approval.approver_id} (${r.approval.approver_role})`),
          h("dt", {}, "결정 시각"), h("dd", {}, fmtTime(r.approval.decided_at)),
          h("dt", {}, "서버가 기록한 결정"), h("dd", {}, r.approval.decision)),
        h("p", {}, h("a", { href: "#/" }, "목록으로"))));
      break;
    }
    case "error":
      root.append(h("section", {}, h("p", { class: "notice error", role: "alert" }, st.error),
        h("p", {}, h("a", { href: "#/" }, "목록으로"))));
      break;
  }
}
