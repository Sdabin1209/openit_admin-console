// 통신 컴포넌트 link_gate_list_awaiting: ListAwaitingInput -> SubmissionPage. release-gate I5 `GET /v1/submissions?status=AWAITING_APPROVAL`.
// 계약 목록 봉투(ListEnvelope)를 검사하고, 원소는 읽기용 투영 SubmissionRow로 받는다(모르는 status는 그대로).
import * as v from "../types/validators.cjs";
import * as c from "../types/contract-validators.cjs";
import type { ListAwaitingInput } from "../types/ListAwaitingInput.ts";
import type { SubmissionPage } from "../types/SubmissionPage.ts";
import type { ErrorInfo } from "../types/ErrorInfo.ts";
import type { ListEnvelope } from "../types/contract/ListEnvelope.ts";
import type { HttpRequestSpec } from "../types/HttpRequestSpec.ts";
import type { HttpOutcome } from "../types/HttpOutcome.ts";

// link_http_send가 주입되는 자리. 그 컴포넌트를 import하지 않고 입출력 스키마(HttpRequestSpec -> HttpOutcome)만 안다(규칙 3).
type HttpSend = (spec: HttpRequestSpec) => Promise<HttpOutcome>;

export type Result = { ok: true; value: SubmissionPage } | { ok: false; error: ErrorInfo };
const bad = (what: string): Result => ({ ok: false, error: { kind: "BAD_RESPONSE", status: 0, message: `응답 형식이 맞지 않는다: ${what}`, retryable: false } });

// 쪽 크기 기본 100: 근거 기록 없음(측정 안 함), docs/adr/0010.
export function createListAwaiting(send: HttpSend): (input: ListAwaitingInput) => Promise<Result> {
  return async (input) => {
    v.assertValid(v.ListAwaitingInput, input, "link_gate_list_awaiting");
    const q = new URLSearchParams({ status: "AWAITING_APPROVAL", limit: String(input.limit ?? 100) });
    if (input.cursor) q.set("cursor", input.cursor);
    const r = await send({ method: "GET", path: `/v1/submissions?${q}` });
    if (!r.ok) return r;
    if (!c.ListEnvelope(r.data)) return bad("제출 목록 봉투");
    const env = r.data as ListEnvelope;
    const out = { items: env.items, nextCursor: env.next_cursor };
    return v.SubmissionPage(out) ? { ok: true, value: out as SubmissionPage } : bad("SubmissionView");
  };
}
