// E2·E4(2026-10-29 점검, 헤드 결정표 2절): 위험도와 확인 강도를 맞춘다.
// 기대값의 출처: 파괴적 작업 확인 관행(대상 이름을 입력해야 실행되는 확인; GitHub 저장소 삭제 등)과 결정표
// "되돌릴 수 없는 승인에 더 강한 확인, 되돌릴 수 있는 활성화·롤백은 단순 확인". 승인 확정 화면 문구는 "되돌릴 수 없다"(ADR 0004).
import { test, beforeEach } from "node:test";
import assert from "node:assert/strict";
import { JSDOM } from "jsdom";
import { ReleasesClient } from "../app/wiring/gateway.ts";
import { FIXED_NOW, startMock, waitFor } from "./helpers.ts";

const dom = new JSDOM('<!doctype html><main id="app"></main>', { url: "http://localhost/" });
Object.assign(globalThis, { document: dom.window.document, window: dom.window, location: dom.window.location });
beforeEach(() => { dom.window.document.querySelector("#app")!.replaceChildren(); dom.window.document.querySelectorAll("dialog").forEach((d) => d.remove()); });
const { render } = await import("../app/wiring/ui/views.ts");
const { renderOps } = await import("../app/wiring/ui/ops_view.ts");
const { OpsController } = await import("../app/wiring/ops_controller.ts");
const q = <T extends Element = HTMLElement>(sel: string) => dom.window.document.querySelector(sel) as T | null;
const type = (el: HTMLInputElement, v: string) => { el.value = v; el.dispatchEvent(new dom.window.Event("input")); };

test("승인: 제출 ID를 입력하기 전에는 확정해도 전송되지 않는다", async () => {
  const s = await startMock();
  try {
    const c = s.ctl();
    await c.openReport("sub-await");
    c.requestDecision("APPROVE");
    await c.confirm();
    assert.equal(s.mock.postCount(), 0);
    assert.equal(c.state.phase, "confirming");
    c.setConfirmText("sub-awai");
    await c.confirm();
    assert.equal(s.mock.postCount(), 0, "틀린 입력");
    c.setConfirmText("  sub-await  ");
    await c.confirm();
    assert.equal(s.mock.postCount(), 1, "앞뒤 공백만 무시하고 같으면 전송");
    assert.equal(c.state.phase, "done");
  } finally { await s.close(); }
});

test("반려도 같다: 제출 ID 입력 없이는 전송되지 않는다", async () => {
  const s = await startMock();
  try {
    const c = s.ctl();
    await c.openReport("sub-await");
    c.setDraft({ reason: "근거 부족" });
    c.requestDecision("REJECT");
    await c.confirm();
    assert.equal(s.mock.postCount(), 0);
    c.setConfirmText("sub-await");
    await c.confirm();
    assert.equal(s.mock.postCount(), 1);
  } finally { await s.close(); }
});

test("승인 확인창: 확정 버튼은 제출 ID를 정확히 입력해야 켜지고, 첫 포커스는 여전히 취소다", async () => {
  const s = await startMock();
  try {
    const c = s.ctl();
    c.subscribe(() => render(q("#app")!, c));
    await c.openReport("sub-await");
    q("#approve")!.click();
    await waitFor(() => dom.window.document.activeElement?.id === "confirm-no", "취소에 포커스");
    assert.equal(q<HTMLButtonElement>("#confirm-yes")!.disabled, true);
    assert.ok(q("#confirm")!.textContent!.includes("sub-await"), "입력할 ID를 보인다");
    type(q<HTMLInputElement>("#confirm-id")!, "sub-awai");
    assert.equal(q<HTMLButtonElement>("#confirm-yes")!.disabled, true);
    type(q<HTMLInputElement>("#confirm-id")!, "sub-await");
    assert.equal(q<HTMLButtonElement>("#confirm-yes")!.disabled, false);
    assert.equal(q("#confirm-id")!.getAttribute("autocomplete"), "off");
    assert.ok(q("#confirm label[for=confirm-id]"), "입력칸에 label");
  } finally { await s.close(); }
});

test("활성화(되돌릴 수 있음)는 단순 확인: 입력 없이 확인 단계의 실행 버튼으로 실행된다", async () => {
  const s = await startMock();
  try {
    const c = new OpsController(new ReleasesClient({ baseUrl: s.base }), () => FIXED_NOW, () => "u");
    c.subscribe(() => renderOps(q("#app")!, c));
    await c.load();
    q(".activate-btn")!.click();
    assert.equal(q("#ops-confirm"), null, "대상 ID 입력칸이 없다");
    assert.equal(q<HTMLButtonElement>("#ops-submit")!.disabled, false);
    assert.equal(dom.window.document.activeElement?.id, "ops-cancel", "첫 포커스는 취소(승인 확인창과 같은 이유)");
    assert.equal(s.mock.releases.postCount(), 0, "확인 단계까지는 전송하지 않는다");
    q("#ops-submit")!.click();
    await waitFor(() => q("#ops-receipt"), "영수증");
    assert.equal(s.mock.releases.postCount(), 1);
  } finally { await s.close(); }
});

test("롤백도 대상 ID 입력 없이 사유·근거만 채우면 실행된다. 첫 포커스는 사유 입력", async () => {
  const s = await startMock();
  try {
    const c = new OpsController(new ReleasesClient({ baseUrl: s.base }), () => FIXED_NOW, () => "u");
    c.subscribe(() => renderOps(q("#app")!, c));
    await c.load();
    q("#ops-rollback")!.click();
    assert.equal(q("#ops-confirm"), null);
    assert.equal(dom.window.document.activeElement?.id, "ops-reason");
    await c.submit();
    assert.equal(s.mock.releases.postCount(), 0, "사유·근거가 없으면 보내지 않는다(계약 RollbackRequest)");
    c.setField({ reason: "사고", evidenceText: "fc-1" });
    await c.submit();
    assert.equal(s.mock.releases.postCount(), 1);
    assert.equal(c.state.receipt?.rollback?.status, "APPLIED");
  } finally { await s.close(); }
});
