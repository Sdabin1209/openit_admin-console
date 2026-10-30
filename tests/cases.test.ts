// 실패 사례 검토 흐름: 모의 FailureStore(I7)와 컨트롤러.
import { test } from "node:test";
import assert from "node:assert/strict";
import { VALID_LORA_A_INPUT, VALID_LORA_B_INPUT } from "./mock-server/cases.ts";
import { traceFacts } from "../app/ui/cases_view.ts";
import { startMock } from "./helpers.ts";

const GOOD_INPUT = JSON.stringify({ ...VALID_LORA_A_INPUT, current_question: "머리가 아프신가요?", user_utterance: "가상의 사람이 머리가 아프다고 말한다" });

test("목록: 기본은 PENDING 최신 버전, 필터가 동작한다", async () => {
  const s = await startMock();
  try {
    const c = s.cases();
    await c.openList();
    assert.deepEqual(c.state.cases.map((x) => x.case_id), ["fc-1", "fc-2", "fc-3", "fc-403"]);
    assert.ok(c.state.cases.every((x) => x.review_status === "PENDING"));
    await c.openList("CONFIRMED");
    assert.deepEqual(c.state.cases.map((x) => [x.case_id, x.version]), [["fc-4", 2]]);
    await c.openList("");
    assert.equal(c.state.cases.length, 6);
  } finally { await s.close(); }
});

test("사례 열기: 비식별 trace의 구조 정보와 이전 버전", async () => {
  const s = await startMock();
  try {
    const c = s.cases();
    await c.openCase("fc-4");
    assert.equal(c.state.current!.version, 2);
    assert.ok(c.state.trace);
    const facts = Object.fromEntries(traceFacts(c.state.trace as unknown as Record<string, unknown>));
    assert.equal(facts["LoRA-A 동작(action)"], "NEXT");
    assert.equal(facts["LoRA-A 추출 상태"], "OK");
    assert.equal(facts["LoRA-B 응답 결과"], "ok");
    await c.openCase("fc-4", 1);
    assert.equal(c.state.current!.review_status, "PENDING");
    await c.openCase("nope");
    assert.equal(c.state.phase, "error");
  } finally { await s.close(); }
});

test("DISMISSED는 입력 없이 기록되고 새 버전이 된다", async () => {
  const s = await startMock();
  try {
    const c = s.cases();
    await c.openCase("fc-1");
    c.setFormAndRender({ status: "DISMISSED" });
    await c.submit();
    assert.equal(c.state.phase, "done");
    assert.equal(c.state.result!.case.version, 2);
    assert.equal(c.state.result!.case.review_status, "DISMISSED");
    assert.equal(c.state.result!.replay, false);
  } finally { await s.close(); }
});

test("CONFIRMED + 고쳐 쓴 입력 + 정답: 스키마를 통과해야 전송된다", async () => {
  const s = await startMock();
  try {
    const c = s.cases();
    await c.openCase("fc-1");
    assert.equal(c.state.form.kind, "LORA_A"); // 사례의 expected_kind
    c.setForm({ inputText: GOOD_INPUT, expectedText: JSON.stringify({ action: "NEXT", next_item: "END", values: [] }) });
    await c.submit();
    assert.equal(c.state.phase, "done");
    const saved = s.mock.cases.store.get("fc-1")!.at(-1)!;
    assert.equal(saved.review_status, "CONFIRMED");
    assert.equal(saved.expected_kind, "LORA_A");
    assert.deepEqual(saved.expected, { action: "NEXT", next_item: "END", values: [] });
    assert.equal((saved.reviewed_input as Record<string, unknown>).user_utterance, "가상의 사람이 머리가 아프다고 말한다");
  } finally { await s.close(); }
});

test("스키마 검증 실패는 전송 전에 막는다(문법, 객체, 필수 필드, 잘못된 종류, 종류 없음)", async () => {
  const s = await startMock();
  try {
    const c = s.cases();
    await c.openCase("fc-3"); // expected_kind 없음
    c.setForm({ inputText: GOOD_INPUT });
    await c.submit();
    assert.ok(c.state.errors[0].includes("종류"));
    c.setFormAndRender({ kind: "LORA_A" });
    c.setForm({ inputText: "{ 깨진 json" });
    await c.submit();
    assert.ok(c.state.errors.some((e) => e.includes("JSON 문법")));
    c.setForm({ inputText: "[1]" });
    await c.submit();
    assert.ok(c.state.errors.some((e) => e.includes("JSON 객체")));
    c.setForm({ inputText: JSON.stringify({ user_utterance: "x" }) }); // 필수 필드 빠짐
    await c.submit();
    assert.ok(c.state.errors.some((e) => e.includes("required") || e.includes("필수") || e.includes("must have")), c.state.errors.join("|"));
    c.setForm({ inputText: JSON.stringify(VALID_LORA_B_INPUT) }); // LORA_A인데 LORA_B 입력
    await c.submit();
    assert.ok(c.state.errors.length > 0);
    c.setForm({ inputText: GOOD_INPUT, expectedText: JSON.stringify({ response_text: "x" }) }); // LORA_A인데 ActionExtraction이 아닌 정답
    await c.submit();
    assert.ok(c.state.errors.some((e) => e.startsWith("정답")));
    assert.equal(s.mock.cases.reviewPosts(), 0, "하나도 전송되지 않았다");
    assert.equal(c.state.phase, "case");
  } finally { await s.close(); }
});

test("LORA_B 입력과 정답(응답 문장)도 검증을 통과해 전송된다", async () => {
  const s = await startMock();
  try {
    const c = s.cases();
    await c.openCase("fc-2");
    assert.equal(c.state.form.kind, "LORA_B");
    const gi = { ...VALID_LORA_B_INPUT, topic: "가상 주제", next: { question_id: "Q1.D01", text: "약을 드시나요?", type: "NEXT" } };
    c.setForm({ inputText: JSON.stringify(gi), expectedText: "네, 알겠습니다. 약을 드시고 계신가요?" });
    await c.submit();
    assert.equal(c.state.phase, "done");
    const saved = s.mock.cases.store.get("fc-2")!.at(-1)!;
    assert.equal(saved.expected_kind, "LORA_B");
    assert.equal(saved.expected, "네, 알겠습니다. 약을 드시고 계신가요?");
    // LORA_B의 정답은 문자열이어야 한다(빈 문자열은 전송 전에 막는다)
    await c.openCase("fc-1");
    c.setFormAndRender({ kind: "LORA_B" });
    c.setForm({ expectedText: "   " });
    assert.equal(c.buildRequest()?.expected, undefined);
  } finally { await s.close(); }
});

test("서버가 거절(400 INVALID_RECORD)하면 사례 화면에 남아 사유를 보인다", async () => {
  const s = await startMock();
  try {
    const c = s.cases();
    await c.openCase("fc-1");
    c.prefillFromTrace(); // 마스킹된 입력 그대로: 스키마는 통과하지만 서버는 거절
    assert.ok(c.state.form.inputText.includes("[MASKED]"));
    await c.submit();
    assert.equal(c.state.phase, "case");
    assert.equal(c.state.notice?.kind, "invalid");
    assert.ok(c.state.notice!.text.includes("마스킹"));
    assert.equal(s.mock.cases.store.get("fc-1")!.length, 1);
  } finally { await s.close(); }
});

test("403(읽기 토큰으로 검토)은 권한 안내만 한다", async () => {
  const s = await startMock();
  try {
    const c = s.cases();
    await c.openCase("fc-403");
    c.setFormAndRender({ status: "DISMISSED" });
    await c.submit();
    assert.equal(c.state.notice?.kind, "denied");
    assert.equal(c.state.phase, "case");
  } finally { await s.close(); }
});

test("같은 검토 중복 클릭은 한 번만 가고, 같은 검토를 다시 보내면 200(replay)", async () => {
  const s = await startMock();
  try {
    const c = s.cases();
    await c.openCase("fc-1");
    c.setFormAndRender({ status: "DISMISSED" });
    await Promise.all([c.submit(), c.submit(), c.submit()]);
    assert.equal(s.mock.cases.reviewPosts(), 1);
    assert.equal(s.mock.cases.store.get("fc-1")!.length, 2);
    const again = s.cases();
    await again.openCase("fc-1");
    again.setFormAndRender({ status: "DISMISSED" });
    await again.submit();
    assert.equal(again.state.result!.replay, true);
    assert.equal(s.mock.cases.store.get("fc-1")!.length, 2, "새 버전이 생기지 않는다");
  } finally { await s.close(); }
});

test("연결 실패는 재시도 안내", async () => {
  const s = await startMock();
  const c = s.cases();
  await c.openCase("fc-1");
  c.setFormAndRender({ status: "DISMISSED" });
  await s.close();
  await c.submit();
  assert.equal(c.state.notice?.kind, "retry");
});

// AC-01: 목록은 next_cursor를 끝까지 따라가야 한다. 기대값은 계약 HTTP.md 공통 목록 규칙(limit 기본 100·최대 500, cursor, next_cursor)에서 나왔다.
test("목록: 한 쪽(100건)을 넘는 사례를 next_cursor를 따라 모두 가져온다", async () => {
  const { CasesClient } = await import("../app/wiring/gateway.ts");
  const s = await startMock();
  try {
    const seed = s.mock.cases.store.get("fc-1")![0];
    for (let i = 0; i < 250; i++) {
      const id = `fc-bulk-${String(i).padStart(3, "0")}`;
      s.mock.cases.store.set(id, [{ ...seed, case_id: id, deidentified_trace_ref: `tr-${id}` }]);
    }
    // 서버가 계약대로 쪽을 나누는지 먼저 확인(첫 쪽 100건 + next_cursor).
    const raw = await (await fetch(`${s.base}/v1/cases?review_status=PENDING&latest_only=true`)).json() as { items: unknown[]; next_cursor: string | null };
    assert.equal(raw.items.length, 100);
    assert.ok(raw.next_cursor);
    const all = await new CasesClient({ baseUrl: s.base }).list({ review_status: "PENDING" });
    assert.equal(all.length, 254);
    assert.equal(new Set(all.map((c) => c.case_id)).size, 254, "중복 없이");
  } finally { await s.close(); }
});
