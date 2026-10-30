// 릴리스 운영 화면의 실제 DOM 그리기(app/ops-view.ts)를 jsdom에서 돌린다. 브라우저 시험은 아니다.
import { test, beforeEach } from "node:test";
import assert from "node:assert/strict";
import { JSDOM } from "jsdom";
import { ReleasesClient } from "../app/wiring/gateway.ts";
import { startMock, waitFor } from "./helpers.ts";

const dom = new JSDOM('<!doctype html><main id="app"></main>', { url: "http://localhost/admin/" });
Object.assign(globalThis, { document: dom.window.document, window: dom.window, location: dom.window.location });
// 시험 간 공유 상태 초기화: 같은 JSDOM을 쓰므로 매 시험 앞에서 화면을 비운다.
beforeEach(() => { dom.window.document.querySelector("#app")!.replaceChildren(); dom.window.document.querySelectorAll("dialog").forEach((d) => d.remove()); });
const { renderOps } = await import("../app/wiring/ui/ops_view.ts");
const { OpsController } = await import("../app/wiring/ops_controller.ts");
const q = <T extends Element = HTMLElement>(sel: string) => dom.window.document.querySelector(sel) as T | null;
const input = (el: HTMLInputElement | HTMLTextAreaElement, v: string) => { el.value = v; el.dispatchEvent(new dom.window.Event("input")); };

async function open() {
  const s = await startMock();
  const root = q("#app")!;
  const c = new OpsController(new ReleasesClient({ baseUrl: s.base }));
  c.subscribe(() => renderOps(root, c));
  await c.load();
  return { s, root, c };
}

test("화면: 활성 릴리스, 이력, 활성화 후보, 롤백 대상", async () => {
  const { s, root } = await open();
  try {
    const act = q("#ops-active")!.textContent!;
    for (const t of ["rel-0003", "2026-10-14T00:00:00Z", "3", "활성화한 사람"]) assert.ok(act.includes(t), t);
    assert.equal(root.querySelectorAll("tbody tr").length, 1 + 4, "활성화 후보 1 + 이력 4");
    assert.equal(root.querySelectorAll(".activate-btn").length, 1);
    assert.equal(q("#ops-prev")!.textContent, "rel-0002");
    assert.ok(root.textContent!.includes("PASS인지는 게이트가 판정한다"));
    // 행위자·역할을 적는 입력란이 없다
    for (const el of root.querySelectorAll("input, textarea, select")) assert.ok(!/role|user|actor|approver/i.test(el.id + el.getAttribute("name")), el.id);
  } finally { await s.close(); }
});

test("활성화: 확인 단계에서 실행하면 영수증이 보인다(대상 ID 입력은 요구하지 않는다, ADR 0014)", async () => {
  const { s, root } = await open();
  try {
    q(".activate-btn")!.click();
    assert.ok(q("#ops-confirm-form")!.textContent!.includes("rel-0004"));
    assert.equal(q<HTMLButtonElement>("#ops-submit")!.disabled, false);
    q("#ops-submit")!.click();
    await waitFor(() => q("#ops-receipt") && q("#ops-active")?.textContent?.includes("rel-0004"), "활성화 영수증과 갱신된 활성 포인터");
    assert.ok(q("#ops-receipt")!.textContent!.includes("활성화했다"));
    assert.ok(q("#ops-receipt")!.textContent!.includes("rel-0004"));
    assert.ok(q("#ops-active")!.textContent!.includes("rel-0004"));
    assert.equal(q("#ops-confirm-form"), null);
    assert.equal(root.querySelectorAll(".activate-btn").length, 0);
  } finally { await s.close(); }
});

test("롤백: 대상 표시, 사유·근거 없으면 오류, 입력 후 영수증", async () => {
  const { s } = await open();
  try {
    q("#ops-rollback")!.click();
    assert.equal(q("#ops-rollback-target")!.textContent, "rel-0002");
    q("#ops-submit")!.click();
    await waitFor(() => q("#ops-errors")?.textContent?.includes("사유"), "사유 오류");
    assert.ok(q("#ops-errors")!.textContent!.includes("사유"));
    assert.ok(q("#ops-errors")!.textContent!.includes("근거"));
    input(q<HTMLTextAreaElement>("#ops-reason")!, "지연 증가");
    input(q<HTMLInputElement>("#ops-evidence")!, "fc-1");
    q("#ops-submit")!.click();
    await waitFor(() => q("#ops-receipt")?.textContent?.includes("롤백을 적용했다") && q("#ops-active")?.textContent?.includes("rel-0002"), "롤백 영수증과 갱신된 활성 포인터");
    assert.ok(q("#ops-receipt")!.textContent!.includes("롤백을 적용했다"));
    assert.ok(q("#ops-receipt")!.textContent!.includes("APPLIED"));
    assert.ok(q("#ops-active")!.textContent!.includes("rel-0002"));
  } finally { await s.close(); }
});

test("롤백 대상을 바꾸면 확인 문구의 대상이 바뀐다", async () => {
  const { s } = await open();
  try {
    q("#ops-rollback")!.click();
    const sel = q<HTMLSelectElement>("#ops-target-select")!;
    sel.value = "rel-0001";
    sel.dispatchEvent(new dom.window.Event("change"));
    assert.equal(q("#ops-rollback-target")!.textContent, "rel-0001");
    assert.ok(q("#ops-confirm-form")!.textContent!.includes("rel-0001"));
  } finally { await s.close(); }
});

test("오류 문구: 403 권한 없음, 409 충돌, 412 PASS 아님", async () => {
  const { s } = await open();
  try {
    q(".activate-btn")!.click();
    s.mock.releases.setOperator(false);
    q("#ops-submit")!.click();
    await waitFor(() => q("#ops-notice")?.textContent?.includes("operator"), "403 안내");
    assert.ok(q("#ops-notice")!.textContent!.includes("operator"));
    s.mock.releases.setOperator(true);

    s.mock.releases.forceConflictNext();
    q(".activate-btn")!.click();
    q("#ops-submit")!.click();
    await waitFor(() => q("#ops-notice")?.textContent?.includes("409"), "409 안내");
    assert.ok(q("#ops-notice")!.textContent!.includes("409"));
  } finally { await s.close(); }
});

test("조회가 403이면 화면은 권한 안내와 다시 불러오기를 보인다", async () => {
  const s = await startMock();
  try {
    s.mock.releases.setOperator(false);
    const root = q("#app")!;
    const c = new OpsController(new ReleasesClient({ baseUrl: s.base }));
    c.subscribe(() => renderOps(root, c));
    await c.load();
    assert.ok(q("#ops-load-error")!.textContent!.includes("operator"));
  } finally { await s.close(); }
});
