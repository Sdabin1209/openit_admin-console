// 통신 컴포넌트 link_push_subscribe: PushSubscriptionInput -> (성공 여부). `POST /v1/staff/push-subscriptions`(계약 PUBLIC_API, 201, 같은 endpoint는 갱신).
// 왜 topics를 여기서 정하나: 이 콘솔은 결과 알림(results)만 받는다. alerts는 staff 역할 몫이고 clinician이 아닌 계정이 보내면 403이다(계약 3.4.0).
import * as v from "../types/validators.cjs";
import type { PushSubscriptionInput } from "../types/PushSubscriptionInput.ts";
import type { ErrorInfo } from "../types/ErrorInfo.ts";
import type { HttpRequestSpec } from "../types/HttpRequestSpec.ts";
import type { HttpOutcome } from "../types/HttpOutcome.ts";

type HttpSend = (spec: HttpRequestSpec) => Promise<HttpOutcome>;
export type Result = { ok: true } | { ok: false; error: ErrorInfo };

export function createPushSubscribe(send: HttpSend): (input: PushSubscriptionInput) => Promise<Result> {
  return async (input) => {
    v.assertValid(v.PushSubscriptionInput, input, "link_push_subscribe");
    // 왜 expirationTime을 빼나: 계약 본문은 endpoint, keys, topics뿐이다.
    const r = await send({ method: "POST", path: "/v1/staff/push-subscriptions", body: { endpoint: input.endpoint, keys: { p256dh: input.keys.p256dh, auth: input.keys.auth }, topics: ["results"] } });
    return r.ok ? { ok: true } : r;
  };
}
