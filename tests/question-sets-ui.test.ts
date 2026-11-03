// 문진표 여러 개(계약 3.3.0): 승인 목록·보고서의 제출 대상과 릴리스 목록에 문진표 둘이 보인다.
import { test } from "node:test";
import assert from "node:assert/strict";
import { JSDOM } from "jsdom";
import { ReleasesClient } from "../app/wiring/gateway.ts";
import { FIXED_NOW, startMock } from "./helpers.ts";

const dom = new JSDOM('<!doctype html><main id="app"></main>', { url: "http://localhost/admin/" });
Object.assign(globalThis, { document: dom.window.document, window: dom.window, location: dom.window.location });
const { renderOps } = await import("../app/ui/ops_view.ts");
const { OpsController } = await import("../app/wiring/ops_controller.ts");
const { subjectText } = await import("../app/ui/views.ts");

test("제출 대상: question_sets 목록의 세트 둘이 보이고 옛 단수 question_set은 보이지 않는다", () => {
  const t = subjectText({ question_sets: [{ id: "qs-main", version: "3" }, { id: "qs-alcohol", version: "2" }], lora_a: { id: "lora-a", version: "1.2.0" } });
  assert.ok(t.includes("qs-main@3") && t.includes("qs-alcohol@2") && t.includes("LoRA-A lora-a@1.2.0"), t);
  assert.equal(subjectText({ question_set: { id: "old", version: "1" } }), "—");
});

test("릴리스 목록: 매니페스트 question_sets의 제목·ID·버전이 보인다", async () => {
  const s = await startMock();
  try {
    const root = dom.window.document.querySelector("#app") as HTMLElement;
    const c = new OpsController(new ReleasesClient({ baseUrl: s.base }), () => FIXED_NOW);
    c.subscribe(() => renderOps(root, c));
    await c.load();
    const text = root.textContent!;
    for (const x of ["기본 문진표 (qs-main@3)", "음주 문진표 (qs-alcohol@2)"]) assert.ok(text.includes(x), x);
  } finally { await s.close(); }
});
