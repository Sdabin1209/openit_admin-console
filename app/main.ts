// 진입점: 화면 부품(wiring/ui)과 컨트롤러를 만들어 주소(route_parse)에 따라 잇는다. 업무 규칙은 없다.
import { CasesClient, GateClient, ReleasesClient, ResultsClient, PushClient, AuthClient, onAuthError, realTimers } from "./wiring/gateway.ts";
import { CasesController } from "./wiring/cases_controller.ts";
import { renderCases } from "./ui/cases_view.ts";
import { OpsController } from "./wiring/ops_controller.ts";
import { renderOps } from "./ui/ops_view.ts";
import { Controller } from "./wiring/approvals_controller.ts";
import { render, h } from "./ui/views.ts";
import { ResultsController } from "./wiring/results_controller.ts";
import { renderResults } from "./ui/results_view.ts";
import { PushController } from "./wiring/push_controller.ts";
import { browserPushPorts } from "./wiring/browser_push.ts";
import { AuthController } from "./wiring/auth_controller.ts";
import { renderAuthNotice, renderWho } from "./ui/auth_view.ts";
import { routeParse } from "./components/route_parse.ts";

const root = document.getElementById("app")!;
const nav = document.getElementById("nav")!;
const approvals = new Controller(new GateClient({ baseUrl: "" }), realTimers);
const cases = new CasesController(new CasesClient({ baseUrl: "" }), realTimers);

const ops = new OpsController(new ReleasesClient({ baseUrl: "" }), () => new Date().toISOString().replace(/\.\d+Z$/, "Z") /* 실제 시계는 진입점이 넣는다(ADR 0023) */, undefined, realTimers);
const results = new ResultsController(new ResultsClient({ baseUrl: "" }), realTimers);

const push = new PushController(new PushClient({ baseUrl: "" }), browserPushPorts());

const auth = new AuthController(new AuthClient({ baseUrl: "" }));
onAuthError((k) => auth.onApiError(k)); // 어느 요청이든 401·승인 대기면 로그인·승인 대기 안내로 바뀐다
const who = document.getElementById("who")!;

type Screen = "approvals" | "cases" | "ops" | "results";
let screen: Screen = "approvals";
let last = "";
let needFocus = false; // 화면이 바뀐 직후 한 번, 제목으로 포커스를 옮긴다(다시 그리면 포커스를 잃기 때문)
const TITLES: Record<Screen, string> = { approvals: "출고 승인", cases: "실패 사례 검토", ops: "릴리스 운영", results: "문진 결과" };

function signature(): string {
  if (auth.state.phase === "login-needed" || auth.state.phase === "pending") return ["auth", auth.state.phase, auth.state.rev].join("|");
  if (screen === "approvals") {
    const s = approvals.state;
    return ["a", s.phase, s.submissionId, s.items.length, s.notice?.text, s.sliceKind, s.sort, s.error, s.loaded?.reportHash, approvals.slowStage].join("|");
  }
  if (screen === "results") return ["r", results.state.rev, push.state.rev, results.slowStage].join("|");
  if (screen === "ops") return ["o", ops.state.rev, ops.slowStage].join("|");
  const s = cases.state;
  return ["c", s.phase, s.filter, s.cases.length, s.current?.case_id, s.current?.version, s.trace ? 1 : 0, s.traceError, s.notice?.text, s.errors.join(";"), s.form.status, s.form.kind, s.form.inputText.length, s.form.expectedText.length, s.error, cases.slowStage].join("|");
}

function draw(): void {
  const sig = signature();
  if (sig === last) return;
  last = sig;
  if (renderAuthNotice(root, auth, location.pathname + location.search + location.hash)) return;
  if (screen === "approvals") render(root, approvals);
  else if (screen === "results") renderResults(root, results, push);
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
push.subscribe(() => { if (screen === "results") draw(); });
results.subscribe(() => { if (screen === "results") draw(); drawNav(); });

auth.subscribe(() => { renderWho(who, auth); draw(); });

function drawNav(): void {
  document.title = `운영 콘솔 - ${TITLES[screen]}`;
  nav.replaceChildren();
  for (const [id, href, text] of [["approvals", "#/", "출고 승인"], ["cases", "#/cases", "실패 사례 검토"], ["ops", "#/ops", "릴리스 운영"], ["results", "#/results", "문진 결과"]] as const) {
    const a = document.createElement("a");
    a.href = href;
    a.textContent = text;
    if (id === "results" && results.state.unseen > 0) { // 목록을 보지 않는 동안 도착한 결과 수
      const b = document.createElement("span");
      b.className = "badge";
      b.setAttribute("aria-label", `새 결과 ${results.state.unseen}건`);
      b.textContent = String(results.state.unseen);
      a.append(" ", b);
    }
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
  if (r.screen === "results") { void (r.view === "detail" ? results.openDetail(r.id as string) : results.openList()); if (r.view !== "detail") void push.refresh(); }
  else if (r.screen === "ops") void ops.load();
  else if (r.screen === "cases") void (r.view === "detail" ? cases.openCase(r.id as string) : cases.openList());
  else void (r.view === "detail" ? approvals.openReport(r.id as string) : approvals.openList());
}
window.addEventListener("hashchange", route);
void auth.load();
results.startLive(); // 탭 배지와 목록 자동 갱신(SSE result_ready)
route();
