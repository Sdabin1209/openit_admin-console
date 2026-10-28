import { CasesClient } from "../api/cases.ts";
import { GateClient } from "../api/client.ts";
import { ReleasesClient } from "../api/releases.ts";
import { CasesController } from "./cases-controller.ts";
import { renderCases } from "./cases-view.ts";
import { OpsController } from "./ops-controller.ts";
import { renderOps } from "./ops-view.ts";
import { Controller } from "./controller.ts";
import { render, h } from "./views.ts";
import { safeDecode } from "./route.ts";

const root = document.getElementById("app")!;
const nav = document.getElementById("nav")!;
const approvals = new Controller(new GateClient({ baseUrl: "" }));
const cases = new CasesController(new CasesClient({ baseUrl: "" }));

const ops = new OpsController(new ReleasesClient({ baseUrl: "" }));

type Screen = "approvals" | "cases" | "ops";
let screen: Screen = "approvals";
let last = "";
let needFocus = false; // 화면이 바뀐 직후 한 번, 제목으로 포커스를 옮긴다(다시 그리면 포커스를 잃기 때문)
const TITLES: Record<Screen, string> = { approvals: "출고 승인", cases: "실패 사례 검토", ops: "릴리스 운영" };

function signature(): string {
  if (screen === "approvals") {
    const s = approvals.state;
    return ["a", s.phase, s.submissionId, s.items.length, s.notice?.text, s.sliceKind, s.sort, s.error, s.loaded?.reportHash].join("|");
  }
  if (screen === "ops") return ["o", ops.state.rev].join("|");
  const s = cases.state;
  return ["c", s.phase, s.filter, s.cases.length, s.current?.case_id, s.current?.version, s.trace ? 1 : 0, s.traceError, s.notice?.text, s.errors.join(";"), s.form.status, s.form.kind, s.form.inputText.length, s.form.expectedText.length, s.error].join("|");
}

function draw(): void {
  const sig = signature();
  if (sig === last) return;
  last = sig;
  if (screen === "approvals") render(root, approvals);
  else if (screen === "ops") renderOps(root, ops);
  else renderCases(root, cases);
  if (needFocus) {
    const hd = root.querySelector("h2");
    if (hd) { hd.setAttribute("tabindex", "-1"); (hd as HTMLElement).focus(); needFocus = false; }
  }
}
approvals.subscribe(() => { if (screen === "approvals") draw(); });
cases.subscribe(() => { if (screen === "cases") draw(); });
ops.subscribe(() => { if (screen === "ops") draw(); });

function drawNav(): void {
  document.title = `운영 콘솔 - ${TITLES[screen]}`;
  nav.replaceChildren();
  for (const [id, href, text] of [["approvals", "#/", "출고 승인"], ["cases", "#/cases", "실패 사례 검토"], ["ops", "#/ops", "릴리스 운영"]] as const) {
    const a = document.createElement("a");
    a.href = href;
    a.textContent = text;
    if (screen === id) a.setAttribute("aria-current", "page");
    nav.append(a);
  }
}

function badAddress(): void {
  screen = "approvals";
  drawNav();
  root.replaceChildren(h("section", {}, h("h2", { tabindex: "-1" }, "주소가 올바르지 않다"), h("p", { class: "notice error", role: "alert" }, "주소의 ID를 읽을 수 없다. 목록에서 다시 열어라."), h("p", {}, h("a", { href: "#/" }, "목록으로"))));
}

function route(): void {
  last = "";
  needFocus = true;
  const h = location.hash;
  let m: RegExpExecArray | null;
  if (h === "#/ops") { screen = "ops"; drawNav(); void ops.load(); }
  else if ((m = /^#\/cases\/(.+)$/.exec(h))) { screen = "cases"; drawNav(); const id = safeDecode(m[1]); if (id === null) badAddress(); else void cases.openCase(id); }
  else if (h === "#/cases") { screen = "cases"; drawNav(); void cases.openList(); }
  else if ((m = /^#\/s\/(.+)$/.exec(h))) { screen = "approvals"; drawNav(); const id = safeDecode(m[1]); if (id === null) badAddress(); else void approvals.openReport(id); }
  else { screen = "approvals"; drawNav(); void approvals.openList(); }
}
window.addEventListener("hashchange", route);
route();
