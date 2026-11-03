// 통신 컴포넌트 link_push_unsubscribe: PushEndpointInput -> (성공 여부). `POST /v1/staff/push-subscriptions/unsubscribe` 본문 {endpoint}(204). 엔드포인트 URL은 그 자체가 푸시 권한이라 URL이 아니라 본문에 싣는다(계약).
import * as v from "../types/validators.cjs";
import type { PushEndpointInput } from "../types/PushEndpointInput.ts";
import type { ErrorInfo } from "../types/ErrorInfo.ts";
import type { HttpRequestSpec } from "../types/HttpRequestSpec.ts";
import type { HttpOutcome } from "../types/HttpOutcome.ts";

type HttpSend = (spec: HttpRequestSpec) => Promise<HttpOutcome>;
export type Result = { ok: true } | { ok: false; error: ErrorInfo };

export function createPushUnsubscribe(send: HttpSend): (input: PushEndpointInput) => Promise<Result> {
  return async (input) => {
    v.assertValid(v.PushEndpointInput, input, "link_push_unsubscribe");
    const r = await send({ method: "POST", path: "/v1/staff/push-subscriptions/unsubscribe", body: { endpoint: input.endpoint } });
    return r.ok ? { ok: true } : r;
  };
}
