// 통신 컴포넌트 link_push_config: (입력 없음) -> PushConfig. 직원·의사 콘솔 `GET /v1/staff/push-config`(계약 PUBLIC_API). vapid_public_key가 null이면 서버의 푸시가 꺼져 있다.
import * as c from "../types/contract-validators.cjs";
import type { PushConfig } from "../types/contract/PushConfig.ts";
import type { ErrorInfo } from "../types/ErrorInfo.ts";
import type { HttpRequestSpec } from "../types/HttpRequestSpec.ts";
import type { HttpOutcome } from "../types/HttpOutcome.ts";

// link_http_send가 주입되는 자리(규칙 3: 그 컴포넌트를 import하지 않고 입출력 스키마만 안다).
type HttpSend = (spec: HttpRequestSpec) => Promise<HttpOutcome>;
export type Result = { ok: true; value: PushConfig } | { ok: false; error: ErrorInfo };

export function createPushConfig(send: HttpSend): () => Promise<Result> {
  return async () => {
    const r = await send({ method: "GET", path: "/v1/staff/push-config" });
    if (!r.ok) return r;
    if (!c.PushConfig(r.data)) return { ok: false, error: { kind: "BAD_RESPONSE", status: 0, message: `응답 형식이 맞지 않는다: PushConfig: ${(c.PushConfig.errors ?? []).slice(0, 3).map((e) => `${e.instancePath || "(최상위)"} ${e.message}`).join("; ")}`, retryable: false } };
    return { ok: true, value: r.data as PushConfig };
  };
}
