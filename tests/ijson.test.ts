// 계약 JSON 공통 규칙(CONVENTIONS 10절, I-JSON): 사람 입력의 1e999 는 거부되고, 비유한 수를 담은 본문은 보내지 않는다(요청 0회, null 로 바꾸지 않음).
import { test } from "node:test";
import assert from "node:assert/strict";
import { caseReviewDraft } from "../app/components/case_review_draft.ts";
import { createHttpSend } from "../app/components/link_http_send.ts";

test("검토 입력의 1e999 는 거부되고 값은 오류에 실리지 않는다", () => {
  const r = caseReviewDraft({ status: "CONFIRMED", kind: "LORA_A", inputText: '{"state":{"x":{"value":9e999}}}', expectedText: "" } as never);
  assert.equal(r.ok, false);
  assert.ok(!JSON.stringify(r).includes("9e999"));
});

test("비유한 수를 담은 본문은 보내지 않는다(요청 0회)", async () => {
  let calls = 0;
  const send = createHttpSend({ baseUrl: "http://gate.invalid", timeoutMs: 1000 } as never,
    { fetch: (async () => { calls++; return new Response("{}"); }) as typeof fetch, timers: { set: () => 0, clear: () => {} } } as never);
  const out = await send({ method: "POST", path: "/v1/x", body: { v: Infinity } } as never);
  assert.equal(calls, 0);
  assert.equal((out as { ok: boolean }).ok, false);
});
