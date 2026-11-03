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

// 받은 본문은 다시 검증하지 않는다(계약에서 이 영역이 x-consumers인 값, ADR 0010 R7, 이 영역 ADR 0030). 요청과 응답이 같은지 맞춰 보는 검사도 두지 않는다.
export type Result = { ok: true; value: PointerRecord } | { ok: false; error: ErrorInfo };

export function createActivate(send: HttpSend): (input: ActivateInput) => Promise<Result> {
  return async (input) => {
    v.assertValid(v.ActivateInput, input, "link_release_activate");
    const body: ActivateRequest = { release_id: input.releaseId, requested_by_role: "operator" };
    if (!c.ActivateRequest(body)) return { ok: false, error: { kind: "INVALID_RECORD", status: 0, message: `보내려는 ActivateRequest가 계약에 맞지 않아 보내지 않았다: ${(c.ActivateRequest.errors ?? []).slice(0, 3).map((e) => `${e.instancePath || "(최상위)"} ${e.message ?? e.keyword}`).join("; ")}`, retryable: false } };
    const r = await send({ method: "POST", path: "/v1/activate", body });
    if (!r.ok) return r;
    const p = r.data as PointerRecord;
    return { ok: true, value: p };
  };
}
