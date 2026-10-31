// 실제 DOM 그리기(app/ui/views.ts)를 jsdom에서 돌려 화면을 확인한다. 브라우저 시험은 아니다(레이아웃·접근성 도구 검사는 못 한다).
import { test, beforeEach } from "node:test";
import assert from "node:assert/strict";
import { JSDOM } from "jsdom";
import { startMock, waitFor } from "./helpers.ts";

const dom = new JSDOM('<!doctype html><main id="app"></main>', { url: "http://localhost/" });
Object.assign(globalThis, { document: dom.window.document, window: dom.window, location: dom.window.location });
// 시험 간 공유 상태 초기화: 같은 JSDOM을 쓰므로 매 시험 앞에서 화면을 비운다.
beforeEach(() => { dom.window.document.querySelector("#app")!.replaceChildren(); dom.window.document.querySelectorAll("dialog").forEach((d) => d.remove()); });
const { render } = await import("../app/ui/views.ts");

const q = <T extends Element = HTMLElement>(sel: string) => dom.window.document.querySelector(sel) as T | null;

test("목록 → 보고서: SAFETY 그룹이 맨 위, n=0은 계산 못 함, 합격/불합격 문구 없음", async () => {
  const s = await startMock();
  try {
    const root = q("#app")!;
    const c = s.ctl();
    c.subscribe(() => render(root, c));
    await c.openList();
    assert.equal(root.querySelectorAll("tbody tr").length, 4);
    await c.openReport("sub-await");
    const h3 = [...root.querySelectorAll("h3")].map((e) => e.textContent);
    assert.ok(h3.indexOf("안전 (SAFETY)") < h3.indexOf("정확도"));
    assert.equal(root.querySelector("section.group")!.classList.contains("safety"), true, "첫 지표 그룹이 SAFETY");
    assert.ok(root.textContent!.includes("계산 못 함"));
    assert.ok(root.textContent!.includes("▲ 나빠짐(참고)"));
    assert.ok(!/합격|불합격/.test(root.textContent!.replace("이 화면은 합격·불합격을 판단하지 않는다.", "")));
    assert.equal(root.querySelectorAll("th[scope=col]").length > 5, true);
  } finally { await s.close(); }
});

test("승인 버튼 → 확인창 → 확정 → 완료, 확정 버튼은 전송 중 잠긴다", async () => {
  const s = await startMock();
  try {
    const root = q("#app")!;
    const c = s.ctl();
    c.subscribe(() => render(root, c));
    await c.openReport("sub-await-slow");
    assert.equal(q("#approver"), null, "승인자 ID 입력창이 없다");
    assert.ok(q("#approver-note")!.textContent!.includes("게이트웨이가 인증한 사용자로 기록됨"));
    q("#approve")!.click();
    assert.ok(q("#confirm"), "확인창");
    assert.equal(s.mock.postCount(), 0);
    const yes = q<HTMLButtonElement>("#confirm-yes")!;
    assert.equal(yes.disabled, true, "제출 ID를 입력하기 전에는 확정할 수 없다");
    const idBox = q<HTMLInputElement>("#confirm-id")!;
    idBox.value = "sub-await-slow"; idBox.dispatchEvent(new dom.window.Event("input"));
    s.mock.slowGate.hold(); // 요청을 처리 중으로 붙잡아 둔다(시간이 아니라 사건)
    yes.click(); yes.click();
    assert.equal(c.state.phase, "submitting");
    assert.equal(q<HTMLButtonElement>("#confirm-yes")!.disabled, true);
    await waitFor(() => s.mock.postCount() === 1, "요청이 서버에 도착");
    s.mock.slowGate.release();
    await waitFor(() => root.textContent!.includes("승인했다"), "승인 완료 표시");
    assert.equal(s.mock.postCount(), 1);
    assert.ok(root.textContent!.includes("승인했다"));
  } finally { await s.close(); }
});

test("반려 사유가 없으면 확인창이 열리지 않고 경고가 보인다", async () => {
  const s = await startMock();
  try {
    const root = q("#app")!;
    const c = s.ctl();
    c.subscribe(() => render(root, c));
    await c.openReport("sub-await");
    q("#reject")!.click();
    await waitFor(() => root.textContent!.includes("반려에는 사유가 필수다."), "사유 경고");
    assert.equal(q("#confirm"), null);
  } finally { await s.close(); }
});
