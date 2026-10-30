// 통신 컴포넌트 link_release_activate: ActivateInput -> PointerRecord. release-gate I5 `POST /v1/activate`.
// 계약 ActivateRequest {release_id, requested_by_role: operator}. 행위자 이름은 본문에 넣지 않는다(게이트웨이가 X-Openit-User를 붙이고 서버가 기록한다).
import * as v from "../types/validators.cjs";
import * as c from "../types/contract-validators.cjs";
import type { ActivateInput } from "../types/ActivateInput.ts";
import type { PointerRecord } from "../types/PointerRecord.ts";
import type { ErrorInfo } from "../types/ErrorInfo.ts";
import type { ActivateRequest } from "../types/contract/ActivateRequest.ts";
import type { HttpRequestSpec } from "../types/HttpRequestSpec.ts";
import type { HttpOutcome } from "../types/HttpOutcome.ts";

// link_http_send가 주입되는 자리. 그 컴포넌트를 import하지 않고 입출력 스키마(HttpRequestSpec -> HttpOutcome)만 안다(규칙 3).
type HttpSend = (spec: HttpRequestSpec) => Promise<HttpOutcome>;

export type Result = { ok: true; value: PointerRecord } | { ok: false; error: ErrorInfo };
const bad = (what: string): Result => ({ ok: false, error: { kind: "BAD_RESPONSE", status: 0, message: `응답 형식이 맞지 않는다: ${what}`, retryable: false } });

export function createActivate(send: HttpSend): (input: ActivateInput) => Promise<Result> {
  return async (input) => {
    v.assertValid(v.ActivateInput, input, "link_release_activate");
    const body: ActivateRequest = { release_id: input.releaseId, requested_by_role: "operator" };
    if (!c.ActivateRequest(body)) return { ok: false, error: { kind: "INVALID_RECORD", status: 0, message: `보내려는 ActivateRequest가 계약에 맞지 않아 보내지 않았다: ${(c.ActivateRequest.errors ?? []).slice(0, 3).map((e) => `${e.instancePath || "(최상위)"} ${e.message ?? e.keyword}`).join("; ")}`, retryable: false } };
    const r = await send({ method: "POST", path: "/v1/activate", body });
    if (!r.ok) return r;
    if (!v.PointerRecord(r.data)) return bad("ActivePointer");
    const p = r.data as PointerRecord;
    if (p.release_id !== input.releaseId) return bad("응답의 활성 릴리스가 요청과 다르다"); // 요청과 응답의 같음은 스키마 밖 조건
    return { ok: true, value: p };
  };
}
