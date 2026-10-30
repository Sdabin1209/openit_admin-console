// v2 ReviewReport(LORA_A/LORA_B 지표)를 모의 서버로 흘려 jsdom이 그린 DOM을 단언한다. 브라우저 시험이 아니다(레이아웃은 못 본다).
import { contract } from "../scripts/contract-src.mjs";
import { test, beforeEach } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { JSDOM } from "jsdom";
import { startMock } from "./helpers.ts";
import { baseReport } from "./mock-server/scenarios.ts";

const dom = new JSDOM('<!doctype html><main id="app"></main>', { url: "http://localhost/" });
Object.assign(globalThis, { document: dom.window.document, window: dom.window, location: dom.window.location });
// 시험 간 공유 상태 초기화: 같은 JSDOM을 쓰므로 매 시험 앞에서 화면을 비운다.
beforeEach(() => { dom.window.document.querySelector("#app")!.replaceChildren(); dom.window.document.querySelectorAll("dialog").forEach((d) => d.remove()); });
const { render } = await import("../app/wiring/ui/views.ts");
const root = dom.window.document.querySelector("#app") as HTMLElement;

type Row = { role: string; cells: string[]; worse: boolean; group: string };
function rows(): Row[] {
  return [...root.querySelectorAll("section.group")].flatMap((sec) =>
    [...sec.querySelectorAll("tbody tr")].map((tr) => ({
      role: (tr as HTMLElement).dataset.role!, group: sec.querySelector("h3")!.textContent!,
      cells: [...tr.querySelectorAll("td")].map((td) => td.textContent!), worse: tr.classList.contains("worse"),
    })));
}
// 열: 0 역할, 1 지표(+방향), 2 분리 기준, 3 후보, 4 표본, 5 기준값, 6 기준 표본, 7 차이, 8 참고
const find = (rs: Row[], role: string, name: string, slice: string) => rs.find((r) => r.role === role && r.cells[1].startsWith(name) && r.cells[2] === slice)!;

async function show(report: unknown, id = "sub-await") {
  const s = await startMock();
  const c = s.ctl();
  c.subscribe(() => render(root, c));
  if (report) s.mock.setReport(id, report as never);
  await c.openReport(id);
  return { s, c };
}

test("v2 지표: 이름·후보·기준값(활성 릴리스)·차이·A/B 구분이 DOM에 나온다", async () => {
  const { s } = await show(null);
  try {
    const rs = rows();
    const acc = find(rs, "LORA_A", "action_accuracy", "전체");
    assert.deepEqual([acc.cells[0], acc.cells[3], acc.cells[4], acc.cells[5], acc.cells[6], acc.cells[7], acc.worse], ["LORA_A (추출)", "0.94", "900", "0.95", "900", "-0.01", true]);
    const conf = find(rs, "LORA_A", "action_accuracy", "ACTION: CONFIRM"); // v2 slice kind ACTION
    assert.equal(conf.cells[3], "0.7");
    const mat = find(rs, "LORA_B", "material_coverage", "ACTION: START");
    assert.equal(mat.cells[0], "LORA_B (응답)");
    assert.equal(mat.cells[7], "+0.02");
    assert.equal(mat.worse, false);
    // 기준이 없는 지표
    const inv = find(rs, "LORA_A", "output_invalid_rate", "전체");
    assert.equal(inv.cells[5], "기준 없음");
    assert.equal(inv.cells[7], "비교 못 함");
    // 활성 릴리스 표시
    assert.ok(root.textContent!.includes("현재 활성 릴리스 rel-0001"));
    assert.ok(root.querySelector("th")!.parentElement!.textContent!.includes("기준값(활성 릴리스)"));
    // 같은 그룹 안에서 A가 B보다 먼저 온다
    for (const sec of root.querySelectorAll("section.group")) {
      const roles = [...sec.querySelectorAll("tbody tr")].map((t) => (t as HTMLElement).dataset.role!);
      assert.deepEqual(roles, [...roles].sort());
    }
  } finally { await s.close(); }
});

test("모르는 지표 이름·모르는 그룹·모르는 분리 기준은 깨지지 않고 그대로 보인다", async () => {
  const r = baseReport("sub-await");
  r.comparisons.push(
    { role: "LORA_A", name: "brand_new_metric_x", group: "V3_GROUP", slice: { kind: "REASON", value: "NEW_REASON" }, candidate: 3, candidate_n: 5, baseline: 2, baseline_n: 5, delta: 1, higher_is_better: true, worse: false },
    { role: "LORA_B", name: "no_slice_metric", group: "ACCURACY", candidate: 1, higher_is_better: true });
  const { s } = await show(r);
  try {
    const rs = rows();
    const x = find(rs, "LORA_A", "brand_new_metric_x", "REASON: NEW_REASON");
    assert.equal(x.group, "V3_GROUP (새 그룹)");
    assert.deepEqual([x.cells[3], x.cells[5], x.cells[7]], ["3", "2", "+1"]);
    const n = find(rs, "LORA_B", "no_slice_metric", "전체");
    assert.equal(n.cells[4], "미기재");
    assert.ok([...root.querySelectorAll("#slice option")].some((o) => o.textContent === "REASON"));
  } finally { await s.close(); }
});

test("SAFETY 지표가 하나도 없는 v2 보고서와 활성 릴리스 없음", async () => {
  const r = baseReport("sub-await");
  r.comparisons = r.comparisons.filter((c) => c.group !== "SAFETY").map((c) => ({ ...c, baseline: null, baseline_n: null, delta: null, worse: null }));
  r.active_release_id = null;
  const { s } = await show(r);
  try {
    const rs = rows();
    assert.ok(rs.length > 0);
    assert.ok(!rs.some((x) => x.group.includes("SAFETY")));
    assert.ok(rs.every((x) => x.cells[5] === "기준 없음" && !x.worse));
    assert.ok(root.textContent!.includes("현재 활성 릴리스 없음"));
  } finally { await s.close(); }
});

test("공식 예시 ReviewReport(계약 패키지)가 그대로 그려진다", async () => {
  const ex = contract.json("examples/ReviewReport.json");
  const { s } = await show({ ...ex, submission_id: "sub-await" });
  try {
    const x = find(rows(), "LORA_A", ex.comparisons[0].name, "전체");
    assert.deepEqual([x.cells[3], x.cells[5], x.cells[7], x.worse], ["0.97", "0.99", "-0.02", true]);
  } finally { await s.close(); }
});
