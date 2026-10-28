// 릴리스 운영 화면 그리기. textContent만 쓴다. 행위자·역할 입력란은 없다(역할은 클라이언트가 계약대로 operator를 보내고, 행위자는 서버가 게이트웨이 헤더로 기록한다).
import { activateCandidates, rollbackCandidates, type OpsController } from "./ops-controller.ts";
import { h } from "./views.ts";
import type { ReleaseSummary } from "../api/types.ts";
import { fmtTime } from "./time.ts";

const CAUSE_LABEL: Record<string, string> = { ACTIVATE: "활성화", ROLLBACK: "롤백" };
const refText = (r?: { id: string; version: string }): string => (r ? `${r.id}@${r.version}` : "—");

function releaseTable(rows: ReleaseSummary[], activeId: string | null, action: ((r: ReleaseSummary) => HTMLElement | null) | null): HTMLElement {
  return h("table", { class: "grid" },
    h("thead", {}, h("tr", {}, ...["릴리스 ID", "만든 시각", "게이트 결정 ID", "문항", "LoRA-A", "LoRA-B", "상태", ...(action ? [""] : [])].map((t) => h("th", { scope: "col" }, t)))),
    h("tbody", {}, ...rows.map((r) => h("tr", { "data-release": r.release_id },
      h("td", {}, r.release_id), h("td", {}, fmtTime(r.created_at)), h("td", {}, r.gate_decision_id),
      h("td", {}, refText(r.question_set)), h("td", {}, refText(r.lora_a)), h("td", {}, refText(r.lora_b)),
      h("td", {}, r.release_id === activeId ? h("strong", {}, "활성") : "—"),
      ...(action ? [h("td", {}, action(r))] : [])))));
}

function confirmPanel(c: OpsController): HTMLElement | null {
  const st = c.state;
  const p = st.pending;
  if (!p) return null;
  const busy = st.phase === "submitting";
  const from = st.pointer?.release_id ?? "—";
  const submit = h("button", { type: "button", id: "ops-submit", disabled: busy, onclick: () => void c.submit() },
    busy ? "전송 중…" : p.kind === "activate" ? "활성화 실행" : "롤백 실행");
  const head = p.kind === "activate"
    ? [h("h3", {}, "릴리스 활성화 확인"), h("p", {}, `서비스가 쓰는 릴리스를 ${from} 에서 `, h("strong", {}, p.target), " 로 바꾼다. 활성 포인터가 바뀌면 새 세션부터 이 릴리스를 쓴다."),
       h("p", { class: "muted", id: "ops-undo-hint" }, `잘못 활성화했다면 되돌릴 수 있다: 이 화면의 '이전 릴리스로 롤백…'을 쓴다(사유와 근거 ID가 필요하다). 이 활성화가 끝난 뒤 되돌아갈 릴리스는 ${from} 이다.`)]
    : [h("h3", {}, "이전 릴리스로 롤백 확인"),
       h("p", {}, `현재 활성 `, h("strong", {}, from), " 를 내리고 ", h("strong", { id: "ops-rollback-target" }, p.target), " 로 되돌린다."),
       h("p", {}, h("label", { for: "ops-target-select" }, "되돌아갈 릴리스 "),
         (() => {
           const sel = h("select", { id: "ops-target-select", disabled: busy, onchange: (e) => c.setTarget((e.target as HTMLSelectElement).value) },
             ...rollbackCandidates(st.releases, st.pointer).map((r) => h("option", { value: r.release_id }, `${r.release_id} (${fmtTime(r.created_at)})`)));
           (sel as HTMLSelectElement).value = p.target;
           return sel;
         })()),
       h("p", { class: "muted", id: "ops-pii" }, "사유와 근거 ID는 기록으로 남는다. 환자 이름·주민번호·연락처 같은 개인정보를 쓰지 마라."),
       h("p", {}, h("label", { for: "ops-reason" }, "사유(필수) "), h("br"),
         h("textarea", { id: "ops-reason", "aria-describedby": "ops-pii", rows: "3", cols: "70", disabled: busy, oninput: (e) => c.setField({ reason: (e.target as HTMLTextAreaElement).value }) }, p.reason)),
       h("p", {}, h("label", { for: "ops-evidence" }, "근거 ID(필수, 쉼표나 공백으로 구분: 실패 사례 ID, 지표 스냅샷 ID 등) "), h("br"),
         h("input", { id: "ops-evidence", type: "text", size: "70", disabled: busy, value: p.evidenceText, oninput: (e) => c.setField({ evidenceText: (e.target as HTMLInputElement).value }) }))];
  return h("form", { class: "decision", id: "ops-confirm-form", onsubmit: (e) => e.preventDefault() },
    ...head,
    h("p", { class: "muted" }, "처리한 사람은 게이트웨이가 인증한 계정으로 서버가 기록한다. 이 화면은 이름을 보내지 않고, 역할은 계약대로 operator로만 적어 보낸다(서버는 이 값을 믿지 않고 기록용으로만 둔다)."),
    st.errors.length > 0 && h("div", { class: "notice error", role: "alert", id: "ops-errors" }, h("ul", {}, ...st.errors.map((m) => h("li", {}, m)))),
    h("p", {}, submit, " ", h("button", { type: "button", id: "ops-cancel", disabled: busy, onclick: () => c.cancel() }, "취소")));
}

function receiptView(c: OpsController): HTMLElement | null {
  const r = c.state.receipt;
  if (!r) return null;
  if (r.kind === "activate" && r.pointer) {
    const p = r.pointer;
    return h("section", { class: "notice ok", id: "ops-receipt", role: "status" }, h("h3", {}, "활성화했다"),
      h("dl", { class: "facts" }, ...([["활성 릴리스", p.release_id], ["포인터 버전", String(p.pointer_version)], ["활성화 시각", fmtTime(p.activated_at)], ["원인", CAUSE_LABEL[p.cause] ?? p.cause]] as [string, string][]).flatMap(([a, b]) => [h("dt", {}, a), h("dd", {}, b)])));
  }
  const rb = r.rollback!;
  const applied = rb.status === "APPLIED";
  return h("section", { class: `notice ${applied ? "ok" : "error"}`, id: "ops-receipt", role: applied ? "status" : "alert" }, h("h3", {}, applied ? "롤백을 적용했다" : "롤백이 거절됐다"),
    h("dl", { class: "facts" }, ...([["요청 ID", rb.request_id], ["결과", rb.status], ["처리 시각", fmtTime(rb.decided_at)],
      ...(rb.reason ? [["사유", rb.reason]] : []),
      ...(rb.active_pointer ? [["활성 릴리스", rb.active_pointer.release_id], ["포인터 버전", String(rb.active_pointer.pointer_version)]] : [])] as [string, string][]).flatMap(([a, b]) => [h("dt", {}, a), h("dd", {}, b)])));
}

export function renderOps(root: HTMLElement, c: OpsController): void {
  const st = c.state;
  root.replaceChildren();
  if (st.phase === "loading") { root.append(h("p", { role: "status" }, "불러오는 중…")); return; }
  if (st.phase === "error") {
    root.append(h("section", {}, h("p", { class: "notice error", role: "alert", id: "ops-load-error" }, st.error), h("p", {}, h("button", { type: "button", onclick: () => void c.load() }, "다시 불러오기"))));
    return;
  }
  const ptr = st.pointer;
  const busy = st.phase === "submitting";
  const up = activateCandidates(st.releases, ptr);
  const down = rollbackCandidates(st.releases, ptr);
  root.append(h("section", {}, h("h2", {}, "릴리스 운영"),
    h("p", {}, h("button", { type: "button", id: "ops-refresh", disabled: busy, onclick: () => void c.load() }, "새로고침")),
    st.notice && h("p", { class: `notice ${st.notice.kind}`, id: "ops-notice", role: "alert" }, st.notice.text),
    receiptView(c),
    h("h3", {}, "현재 활성 릴리스"),
    ptr
      ? h("dl", { class: "facts", id: "ops-active" }, ...([["릴리스 ID", ptr.release_id], ["활성화 시각", fmtTime(ptr.activated_at)], ["포인터 버전", String(ptr.pointer_version)],
          ["원인", CAUSE_LABEL[ptr.cause] ?? ptr.cause], ["활성화한 사람", "표시할 수 없다: 서버가 돌려주는 ActivePointer·RollbackReceipt에 행위자 필드가 없고(계약에 없음, CR-004), 이 화면은 이름을 추측하지 않는다"]] as [string, string][]).flatMap(([a, b]) => [h("dt", {}, a), h("dd", {}, b)]))
      : h("p", { class: "muted", id: "ops-active" }, "활성 릴리스가 없다."),
    confirmPanel(c),
    h("h3", {}, "활성화할 수 있는 릴리스(현재 활성보다 새로운 것)"),
    up.length
      ? releaseTable(up, ptr?.release_id ?? null, (r) => h("button", { type: "button", class: "activate-btn", disabled: busy, onclick: () => c.startActivate(r.release_id) }, "활성화…"))
      : h("p", { class: "muted", id: "ops-no-activate" }, "활성화할 새 릴리스가 없다."),
    h("p", { class: "muted" }, "PASS인지는 게이트가 판정한다. 화면은 판정하지 않으며, PASS가 아니면 서버가 412로 거절한다."),
    h("h3", {}, "롤백"),
    down.length
      ? h("p", {}, "가장 가까운 이전 릴리스: ", h("strong", { id: "ops-prev" }, down[0].release_id), " ", h("button", { type: "button", id: "ops-rollback", disabled: busy, onclick: () => c.startRollback() }, "이전 릴리스로 롤백…"))
      : h("p", { class: "muted", id: "ops-no-rollback" }, "되돌아갈 이전 릴리스가 없다."),
    h("h3", {}, "릴리스 이력(최신부터)"),
    h("p", { class: "muted" }, "릴리스 목록이다. 활성 포인터의 변경 이력(누가 언제 바꿨는지)은 게이트 API에 없다(CR-004)."),
    st.releases.length ? releaseTable(st.releases, ptr?.release_id ?? null, null) : h("p", { class: "muted" }, "릴리스가 없다.")));
  // 다시 그리면 포커스를 잃으므로, 사용자가 방금 한 일의 결과 자리로 옮긴다: 확인 입력 → 영수증 → 알림.
  const target = st.pending ? (st.pending.kind === "rollback" ? "#ops-reason" : "#ops-cancel") : st.receipt ? "#ops-receipt" : st.notice ? "#ops-notice" : null;
  const el = target ? (root.querySelector(target) as HTMLElement | null) : null;
  if (el && st.phase !== "submitting") { if (!el.matches("input,textarea,button,select")) el.setAttribute("tabindex", "-1"); el.focus(); }
}
