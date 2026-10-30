// 통신 컴포넌트 link_release_rollback: RollbackDraft -> RollbackOutcome. release-gate I5 `POST /v1/rollback`.
// 계약 RollbackRequest에 pipeline_schema_version과 requested_by_role(operator)을 붙인다. 행위자는 게이트웨이 헤더로 서버가 기록한다.
import * as v from "../types/validators.cjs";
import * as c from "../types/contract-validators.cjs";
import type { RollbackDraft } from "../types/RollbackDraft.ts";
import type { RollbackOutcome } from "../types/RollbackOutcome.ts";
import type { ErrorInfo } from "../types/ErrorInfo.ts";
import type { RollbackRequest } from "../types/contract/RollbackRequest.ts";
import type { HttpRequestSpec } from "../types/HttpRequestSpec.ts";
import type { HttpOutcome } from "../types/HttpOutcome.ts";

// link_http_send가 주입되는 자리. 그 컴포넌트를 import하지 않고 입출력 스키마(HttpRequestSpec -> HttpOutcome)만 안다(규칙 3).
type HttpSend = (spec: HttpRequestSpec) => Promise<HttpOutcome>;

export type Result = { ok: true; value: RollbackOutcome } | { ok: false; error: ErrorInfo };
const bad = (what: string): Result => ({ ok: false, error: { kind: "BAD_RESPONSE", status: 0, message: `응답 형식이 맞지 않는다: ${what}`, retryable: false } });

export function createRollback(send: HttpSend): (input: RollbackDraft) => Promise<Result> {
  return async (input) => {
    v.assertValid(v.RollbackDraft, input, "link_release_rollback");
    const body = { pipeline_schema_version: c.PIPELINE_SCHEMA_VERSION, ...input, requested_by_role: "operator" } as RollbackRequest;
    if (!c.RollbackRequest(body)) return { ok: false, error: { kind: "INVALID_RECORD", status: 0, message: `보내려는 RollbackRequest가 계약에 맞지 않아 보내지 않았다: ${(c.RollbackRequest.errors ?? []).slice(0, 3).map((e) => `${e.instancePath || "(최상위)"} ${e.message ?? e.keyword}`).join("; ")}`, retryable: false } };
    const r = await send({ method: "POST", path: "/v1/rollback", body });
    if (!r.ok) return r;
    if (!v.RollbackOutcome(r.data)) return bad("RollbackReceipt");
    const o = r.data as RollbackOutcome;
    if (o.request_id !== input.request_id) return bad("응답의 request_id가 요청과 다르다");
    if (!(o.status === "REJECTED" || (!!o.active_pointer && o.active_pointer.release_id === input.to_release_id))) return bad("적용됐다는 응답의 활성 릴리스가 요청 대상과 다르다");
    return { ok: true, value: o };
  };
}
