import { CasesClient } from "../api/cases.ts";
import { GateClient } from "../api/client.ts";
import { ReleasesClient } from "../api/releases.ts";
import { CasesController } from "./cases-controller.ts";
import { renderCases } from "./cases-view.ts";
import { OpsController } from "./ops-controller.ts";
import { renderOps } from "./ops-view.ts";
import { loadDevApprover } from "./config.ts";
import { Controller } from "./controller.ts";
import { render } from "./views.ts";

const root = document.getElementById("app")!;
const nav = document.getElementById("nav")!;
const approvals = new Controller(new GateClient({ baseUrl: "" }), await loadDevApprover());
const cases = new CasesController(new CasesClient({ baseUrl: "" }));

const ops = new OpsController(new ReleasesClient({ baseUrl: "" }));

type Screen = "approvals" | "cases" | "ops";
let screen: Screen = "approvals";
let last = "";

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
}
approvals.subscribe(() => { if (screen === "approvals") draw(); });
cases.subscribe(() => { if (screen === "cases") draw(); });
ops.subscribe(() => { if (screen === "ops") draw(); });

function drawNav(): void {
  nav.replaceChildren();
  for (const [id, href, text] of [["approvals", "#/", "출고 승인"], ["cases", "#/cases", "실패 사례 검토"], ["ops", "#/ops", "릴리스 운영"]] as const) {
    const a = document.createElement("a");
    a.href = href;
    a.textContent = text;
    if (screen === id) a.setAttribute("aria-current", "page");
    nav.append(a);
  }
}

function route(): void {
  last = "";
  const h = location.hash;
  let m: RegExpExecArray | null;
  if (h === "#/ops") { screen = "ops"; drawNav(); void ops.load(); }
  else if ((m = /^#\/cases\/(.+)$/.exec(h))) { screen = "cases"; drawNav(); void cases.openCase(decodeURIComponent(m[1])); }
  else if (h === "#/cases") { screen = "cases"; drawNav(); void cases.openList(); }
  else if ((m = /^#\/s\/(.+)$/.exec(h))) { screen = "approvals"; drawNav(); void approvals.openReport(decodeURIComponent(m[1])); }
  else { screen = "approvals"; drawNav(); void approvals.openList(); }
}
window.addEventListener("hashchange", route);
route();
