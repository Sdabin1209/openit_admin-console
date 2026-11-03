// 문진 결과 화면 그리기(의사용). textContent만 쓴다. 환자 발화 원문은 이 화면에 오지 않는다(계약: 결과에 발화 없음). 브라우저 저장소·콘솔에 남기지 않는다.
import type { ResultsController, ResultsState } from "../wiring/results_controller.ts";
import { resultSheet } from "../components/result_sheet.ts";
import { h, fmtTime, slowLine } from "./views.ts";

const STATUS_FILTERS: [string, string][] = [["", "전체"], ["ENDED_COMPLETE", "완료"], ["ENDED_LEFT", "환자 이탈"], ["ENDED_STAFF", "직원 종료"], ["IN_PROGRESS", "진행 중"], ["PAUSED_RISK", "위험 멈춤"]];

function list(st: ResultsState, c: ResultsController): HTMLElement {
  const sel = h("select", { id: "result-status", onchange: (e) => void c.openList((e.target as HTMLSelectElement).value) },
    ...STATUS_FILTERS.map(([v, t]) => h("option", { value: v }, t)));
  (sel as HTMLSelectElement).value = st.status;
  return h("section", {},
    h("h2", {}, "문진 결과"),
    h("p", {}, h("label", { for: "result-status" }, "상태 "), sel, " ",
      h("span", { class: "muted", id: "result-live", role: "status" }, st.live ? "실시간 연결됨: 새 결과가 오면 자동으로 갱신된다" : "실시간 연결 없음: 새로고침으로 확인하라")),
    st.notice && h("p", { class: "notice error", role: "alert" }, st.notice),
    st.items.length === 0 ? h("p", { class: "muted" }, "결과가 없다.") : h("table", { class: "grid" },
      h("thead", {}, h("tr", {}, ...["세션", "환자 참조", "상태", "시작", "끝", "확인"].map((t) => h("th", { scope: "col" }, t)))),
      h("tbody", {}, ...st.items.map((r) => {
        const s = resultSheet(r);
        return h("tr", { "data-session": r.session_id },
          h("td", {}, h("a", { href: `#/results/${encodeURIComponent(r.session_id)}` }, r.session_id)),
          h("td", {}, r.subject_ref ?? "—"), h("td", {}, s.complete ? s.statusText : h("strong", {}, s.statusText)),
          h("td", {}, fmtTime(r.started_at)), h("td", {}, fmtTime(r.ended_at)), h("td", {}, s.ack.acknowledged ? "확인함" : "—"));
      }))),
    st.nextCursor && h("p", {}, h("button", { type: "button", id: "result-more", onclick: () => void c.loadMore() }, "더 보기")));
}

function detail(st: ResultsState, c: ResultsController): HTMLElement {
  const r = st.current!;
  const s = st.sheet!;
  const ackBtn = h("button", { type: "button", id: "result-ack", disabled: s.ack.acknowledged || st.acking, onclick: () => void c.ack() },
    st.acking ? "저장 중…" : s.ack.acknowledged ? "확인함" : "확인 표시");
  return h("section", { class: "result-sheet" },
    h("p", { class: "no-print" }, h("a", { href: "#/results" }, "목록으로")),
    h("h2", {}, `문진 결과 ${r.session_id}`),
    h("dl", { class: "facts" },
      h("dt", {}, "상태"), h("dd", { id: "result-status-text" }, s.statusText),
      h("dt", {}, "환자 참조"), h("dd", {}, r.subject_ref ?? "—"),
      h("dt", {}, "시작"), h("dd", {}, fmtTime(r.started_at)), h("dt", {}, "끝"), h("dd", {}, fmtTime(r.ended_at)),
      h("dt", {}, "릴리스 / 문항 은행"), h("dd", {}, `${r.release_id ?? "—"} / ${r.question_bank_version ?? "—"}`),
      h("dt", {}, "의사 확인"), h("dd", { id: "result-ack-text" }, s.ack.text)),
    !s.complete && h("p", { class: "notice warn", role: "note", id: "result-partial" }, "이 결과는 완료되지 않았다. 아래는 그때까지 저장된 부분 결과이며, 빈 문항이 미응답의 전부를 뜻하지 않는다."),
    h("h3", {}, "답"),
    s.groups.length === 0 ? h("p", { class: "muted" }, "저장된 답이 없다.") : h("table", { class: "grid", id: "result-answers" },
      h("thead", {}, h("tr", {}, ...["문항", "칸", "값", "상태", "정확도"].map((t) => h("th", { scope: "col" }, t)))),
      h("tbody", {}, ...s.groups.flatMap((g) => g.rows.map((row) => h("tr", { "data-item": g.item },
        h("td", {}, g.item), h("td", {}, row.slot || "—"), h("td", {}, row.valueText), h("td", {}, row.statusText), h("td", {}, row.precision || "—")))))),
    h("h3", {}, "빈칸과 사유"),
    s.blanks.length === 0 ? h("p", { class: "muted" }, "빈칸 없음.") : h("table", { class: "grid", id: "result-blanks" },
      h("thead", {}, h("tr", {}, ...["문항", "칸", "사유 코드", "뜻"].map((t) => h("th", { scope: "col" }, t)))),
      h("tbody", {}, ...s.blanks.map((b) => h("tr", { "data-item": b.item }, h("td", {}, b.item), h("td", {}, b.slot ?? "—"), h("td", {}, b.reasonCode), h("td", {}, b.reasonText))))),
    st.notice && h("p", { class: "notice error", role: "alert" }, st.notice),
    h("p", { class: "no-print" }, ackBtn, " ", h("button", { type: "button", id: "result-print", onclick: () => window.print() }, "인쇄"),
      " ", h("span", { class: "muted" }, "확인한 사람은 게이트웨이가 인증한 계정으로 서버가 기록한다.")));
}

export function renderResults(root: HTMLElement, c: ResultsController): void {
  const st = c.state;
  root.replaceChildren();
  switch (st.phase) {
    case "list-loading": case "detail-loading":
      root.append(h("p", { role: "status" }, "불러오는 중…"), slowLine(c.slowStage) ?? "");
      break;
    case "list": root.append(list(st, c)); break;
    case "detail": root.append(detail(st, c)); break;
    case "error":
      root.append(h("section", {}, h("h2", {}, "문진 결과"), h("p", { class: st.forbidden ? "notice denied" : "notice error", role: "alert", id: "result-error" }, st.error),
        h("p", {}, h("a", { href: "#/results" }, "목록으로"))));
      break;
  }
}
