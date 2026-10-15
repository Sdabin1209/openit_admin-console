// 실제 DOM 그리기(app/cases-view.ts)를 jsdom에서 돌린다. 브라우저 시험은 아니다.
import { test } from "node:test";
import assert from "node:assert/strict";
import { JSDOM } from "jsdom";
import { startMock } from "./helpers.ts";

const dom = new JSDOM('<!doctype html><main id="app"></main>', { url: "http://localhost/admin/" });
Object.assign(globalThis, { document: dom.window.document, window: dom.window, location: dom.window.location });
const { renderCases } = await import("../app/cases-view.ts");
const tick = (ms = 30) => new Promise((r) => setTimeout(r, ms));
const q = <T extends Element = HTMLElement>(sel: string) => dom.window.document.querySelector(sel) as T | null;

test("목록 → 사례: 경고 문구, trace 구조, 편집기, 전송", async () => {
  const s = await startMock();
  try {
    const root = q("#app")!;
    const c = s.cases();
    c.subscribe(() => renderCases(root, c));
    await c.openList();
    assert.equal(root.querySelectorAll("tbody tr").length, 4);
    await c.openCase("fc-1");
    await tick();
    assert.ok(q("#pii-warning")!.textContent!.includes("개인정보를 쓰지 마라"));
    assert.ok(root.textContent!.includes("[MASKED]"), "마스킹된 trace가 보인다");
    assert.ok(root.textContent!.includes("PARSER_MISS"));
    // 검증 실패는 화면에 오류가 보이고 전송되지 않는다
    const ta = q<HTMLTextAreaElement>("#input-text")!;
    ta.value = "{ 깨짐";
    ta.dispatchEvent(new dom.window.Event("input"));
    q("#submit-review")!.click();
    await tick();
    assert.ok(q("#form-errors")!.textContent!.includes("JSON 문법"));
    assert.equal(s.mock.cases.reviewPosts(), 0);
    // 고쳐 쓴 입력으로 전송
    const ta2 = q<HTMLTextAreaElement>("#input-text")!;
    ta2.value = JSON.stringify({ utterance: "가상 문장", last_directive: null, awaiting_questions: [], question_names: [], answered_slots: [], guide_list: [] });
    ta2.dispatchEvent(new dom.window.Event("input"));
    q("#submit-review")!.click();
    await tick(100);
    assert.ok(root.textContent!.includes("검토를 기록했다"));
    assert.equal(s.mock.cases.reviewPosts(), 1);
  } finally { await s.close(); }
});

test("DISMISSED를 고르면 입력 편집기가 사라진다", async () => {
  const s = await startMock();
  try {
    const root = q("#app")!;
    const c = s.cases();
    c.subscribe(() => renderCases(root, c));
    await c.openCase("fc-2");
    await tick();
    assert.ok(q("#input-text"));
    const sel = q<HTMLSelectElement>("#review-status")!;
    sel.value = "DISMISSED";
    sel.dispatchEvent(new dom.window.Event("change"));
    assert.equal(q("#input-text"), null);
  } finally { await s.close(); }
});
