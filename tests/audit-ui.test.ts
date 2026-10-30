// 전수 점검 지적에 대한 DOM 시험(jsdom). 브라우저 시험이 아니다: 실제 키 입력·스크린리더는 확인하지 못한다.
import { test, beforeEach } from "node:test";
import assert from "node:assert/strict";
import { JSDOM } from "jsdom";
import { ReleasesClient } from "../app/wiring/gateway.ts";
import { baseReport } from "./mock-server/scenarios.ts";
import { FIXED_NOW, startMock, waitFor } from "./helpers.ts";

const dom = new JSDOM('<!doctype html><main id="app"></main>', { url: "http://localhost/" });
Object.assign(globalThis, { document: dom.window.document, window: dom.window, location: dom.window.location });
beforeEach(() => { dom.window.document.querySelector("#app")!.replaceChildren(); dom.window.document.querySelectorAll("dialog").forEach((d) => d.remove()); });
const { render } = await import("../app/ui/views.ts");
const { renderOps } = await import("../app/ui/ops_view.ts");
const { OpsController } = await import("../app/wiring/ops_controller.ts");
const q = <T extends Element = HTMLElement>(sel: string) => dom.window.document.querySelector(sel) as T | null;
const root = () => q("#app")!;

test("M4 확인창: 첫 포커스는 취소 버튼이고 확정 버튼이 아니다(Enter 연타로 확정되지 않는다)", async () => {
  const s = await startMock();
  try {
    const c = s.ctl();
    c.subscribe(() => render(root(), c));
    await c.openReport("sub-await");
    q("#approve")!.click();
    await waitFor(() => dom.window.document.activeElement?.id === "confirm-no", "취소 버튼에 포커스");
    assert.notEqual(dom.window.document.activeElement?.id, "confirm-yes");
    assert.equal(q("#confirm-no")!.hasAttribute("autofocus"), true);
    // 포커스된 요소에 대한 Enter(= 클릭)는 취소다. 결정은 전송되지 않는다.
    (dom.window.document.activeElement as HTMLElement).click();
    assert.equal(c.state.phase, "report");
    assert.equal(s.mock.postCount(), 0);
  } finally { await s.close(); }
});

test("XSS 음성: 서버가 준 문자열은 태그로 해석되지 않고 글자 그대로 보인다", async () => {
  const s = await startMock();
  try {
    const evil = '<img src=x onerror="globalThis.__xss=1"><script>globalThis.__xss=2</script>';
    const rep = baseReport("sub-await");
    rep.notes = [evil];
    rep.checks = [{ kind: "REPORT_FORMAT", result: "PASS", detail: evil } as never];
    rep.active_release_id = evil;
    s.mock.setReport("sub-await", rep);
    const c = s.ctl();
    c.subscribe(() => render(root(), c));
    await c.openList();
    await c.openReport("sub-await");
    assert.equal(root().querySelectorAll("img, script").length, 0, "주입된 요소가 없다");
    assert.ok(root().textContent!.includes(evil), "원문이 글자로 보인다");
    assert.equal((globalThis as Record<string, unknown>).__xss, undefined);
  } finally { await s.close(); }
});

test("반려 사유 입력란에 개인정보 경고가 연결돼 있다", async () => {
  const s = await startMock();
  try {
    const c = s.ctl();
    c.subscribe(() => render(root(), c));
    await c.openReport("sub-await");
    assert.ok(q("#reason-pii")!.textContent!.includes("개인정보"));
    assert.equal(q("#reason")!.getAttribute("aria-describedby"), "reason-pii");
  } finally { await s.close(); }
});

test("M2 승인 완료 화면: 서버가 기록한 승인자·결정·시각을 보인다(UTC 원문 포함)", async () => {
  const s = await startMock();
  try {
    const c = s.ctl();
    c.subscribe(() => render(root(), c));
    await c.openReport("sub-await");
    c.requestDecision("APPROVE");
    c.setConfirmText(c.state.submissionId!);
    await c.confirm();
    await waitFor(() => q("#done-facts"), "완료 화면");
    const t = q("#done-facts")!.textContent!;
    assert.ok(t.includes("gw-user-1"), t);
    assert.ok(t.includes("APPROVE"));
    assert.ok(t.includes(FIXED_NOW), "UTC 원문");
  } finally { await s.close(); }
});

test("릴리스 운영: 확인 단계의 취소 버튼으로 포커스가 가고, 되돌리기 안내·개인정보 경고·행위자 표시 불가 이유가 보인다", async () => {
  const s = await startMock();
  try {
    const c = new OpsController(new ReleasesClient({ baseUrl: s.base }), () => FIXED_NOW, () => "u");
    c.subscribe(() => renderOps(root(), c));
    await c.load();
    assert.ok(q("#ops-active")!.textContent!.includes("2026-10-14T00:00:00Z (현지"), "UTC 원문 + 현지");
    assert.ok(q("#ops-active")!.textContent!.includes("표시할 수 없다"));
    q(".activate-btn")!.click();
    assert.equal(dom.window.document.activeElement?.id, "ops-cancel", "포커스가 취소 버튼으로 간다(ADR 0014)");
    assert.ok(q("#ops-undo-hint")!.textContent!.includes("롤백"));
    assert.ok(q("#ops-undo-hint")!.textContent!.includes("rel-0003"), "되돌아갈 릴리스를 보인다");
    q("#ops-cancel")!.click();
    q("#ops-rollback")!.click();
    assert.ok(q("#ops-pii")!.textContent!.includes("개인정보"));
    assert.equal(q("#ops-reason")!.getAttribute("aria-describedby"), "ops-pii");
  } finally { await s.close(); }
});
