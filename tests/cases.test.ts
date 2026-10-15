// 실패 사례 검토 흐름: 모의 FailureStore(I7)와 컨트롤러.
import { test } from "node:test";
import assert from "node:assert/strict";
import { VALID_GENERATOR_INPUT, VALID_PARSER_INPUT } from "../mock-server/cases.ts";
import { traceFacts } from "../app/cases-view.ts";
import { startMock } from "./helpers.ts";

const GOOD_INPUT = JSON.stringify({ ...VALID_PARSER_INPUT, utterance: "가상의 사람이 머리가 아프다고 말한다" });

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
    const facts = Object.fromEntries(traceFacts(c.state.trace!));
    assert.equal(facts["파서 의도"], "ANSWER");
    assert.equal(facts["생성기 동작"], "ASK_NEXT");
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
    assert.equal(c.state.form.kind, "PARSER"); // 사례의 expected_kind
    c.setForm({ inputText: GOOD_INPUT, expectedText: JSON.stringify({ items: [] }) });
    await c.submit();
    assert.equal(c.state.phase, "done");
    const saved = s.mock.cases.store.get("fc-1")!.at(-1)!;
    assert.equal(saved.review_status, "CONFIRMED");
    assert.equal(saved.expected_kind, "PARSER");
    assert.deepEqual(saved.expected, { items: [] });
    assert.equal(saved.reviewed_input!.utterance, "가상의 사람이 머리가 아프다고 말한다");
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
    c.setFormAndRender({ kind: "PARSER" });
    c.setForm({ inputText: "{ 깨진 json" });
    await c.submit();
    assert.ok(c.state.errors.some((e) => e.includes("JSON 문법")));
    c.setForm({ inputText: "[1]" });
    await c.submit();
    assert.ok(c.state.errors.some((e) => e.includes("JSON 객체")));
    c.setForm({ inputText: JSON.stringify({ utterance: "x" }) }); // 필수 필드 빠짐
    await c.submit();
    assert.ok(c.state.errors.some((e) => e.includes("required") || e.includes("필수") || e.includes("must have")), c.state.errors.join("|"));
    c.setForm({ inputText: JSON.stringify(VALID_GENERATOR_INPUT) }); // PARSER인데 생성기 입력
    await c.submit();
    assert.ok(c.state.errors.length > 0);
    c.setForm({ inputText: GOOD_INPUT, expectedText: JSON.stringify({ response_text: "x", is_fallback: false }) }); // PARSER인데 GeneratorOutput
    await c.submit();
    assert.ok(c.state.errors.some((e) => e.startsWith("정답")));
    assert.equal(s.mock.cases.reviewPosts(), 0, "하나도 전송되지 않았다");
    assert.equal(c.state.phase, "case");
  } finally { await s.close(); }
});

test("GENERATOR 입력과 정답도 검증을 통과해 전송된다", async () => {
  const s = await startMock();
  try {
    const c = s.cases();
    await c.openCase("fc-2");
    const gi = { ...VALID_GENERATOR_INPUT, utterance: "가상 문장" };
    c.setForm({ inputText: JSON.stringify(gi), expectedText: JSON.stringify({ response_text: "네, 알겠습니다.", is_fallback: false }) });
    await c.submit();
    assert.equal(c.state.phase, "done");
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
