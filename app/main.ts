// 진입점: 화면 부품(wiring/ui)과 컨트롤러를 만들어 주소(route_parse)에 따라 잇는다. 업무 규칙은 없다.
import { CasesClient, GateClient, ReleasesClient } from "./wiring/gateway.ts";
import { CasesController } from "./wiring/cases_controller.ts";
import { renderCases } from "./ui/cases_view.ts";
import { OpsController } from "./wiring/ops_controller.ts";
import { renderOps } from "./ui/ops_view.ts";
import { Controller } from "./wiring/approvals_controller.ts";
import { render, h } from "./ui/views.ts";
import { routeParse } from "./components/route_parse.ts";

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
  const r = routeParse({ hash: location.hash });
  if (r.screen === "bad_address") return badAddress();
  screen = r.screen;
  drawNav();
  if (r.screen === "ops") void ops.load();
  else if (r.screen === "cases") void (r.view === "detail" ? cases.openCase(r.id as string) : cases.openList());
  else void (r.view === "detail" ? approvals.openReport(r.id as string) : approvals.openList());
}
window.addEventListener("hashchange", route);
route();
