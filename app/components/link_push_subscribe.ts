// 통신 컴포넌트 link_push_subscribe: PushSubscriptionInput -> (성공 여부). `POST /v1/staff/push-subscriptions`(계약 PUBLIC_API, 201, 같은 endpoint는 갱신).
// 본문은 계약 PushSubscriptionRequest(x-producers에 이 영역)이고 보내기 전에 계약 스키마로 검증한다(CONVENTIONS 3절 생산자 출력 검증): endpoint는 https·443만(SSRF 방지, RUNTIME R3.18)이라 어기면 보내지 않고 INVALID_RECORD.
// 왜 topics를 여기서 정하나: 이 콘솔은 결과 알림(results)만 받는다. alerts는 staff 역할 몫이고 clinician이 아닌 계정이 보내면 403이다(계약 3.4.0).
import * as v from "../types/validators.cjs";
import * as c from "../types/contract-validators.cjs";
import type { PushSubscriptionInput } from "../types/PushSubscriptionInput.ts";
import type { PushSubscriptionRequest } from "../types/contract/PushSubscriptionRequest.ts";
import type { ErrorInfo } from "../types/ErrorInfo.ts";
import type { HttpRequestSpec } from "../types/HttpRequestSpec.ts";
import type { HttpOutcome } from "../types/HttpOutcome.ts";

type HttpSend = (spec: HttpRequestSpec) => Promise<HttpOutcome>;
export type Result = { ok: true } | { ok: false; error: ErrorInfo };

export function createPushSubscribe(send: HttpSend): (input: PushSubscriptionInput) => Promise<Result> {
  return async (input) => {
    v.assertValid(v.PushSubscriptionInput, input, "link_push_subscribe");
    // 왜 expirationTime을 빼나: 계약 본문은 endpoint, keys, topics뿐이다.
    const body: PushSubscriptionRequest = { endpoint: input.endpoint, keys: { p256dh: input.keys.p256dh, auth: input.keys.auth }, topics: ["results"] };
    if (!c.PushSubscriptionRequest(body)) return { ok: false, error: { kind: "INVALID_RECORD", status: 0, message: `보내려는 PushSubscriptionRequest가 계약에 맞지 않아 보내지 않았다: ${(c.PushSubscriptionRequest.errors ?? []).slice(0, 3).map((e) => `${e.instancePath || "(최상위)"} ${e.message}`).join("; ")}`, retryable: false } };
    const r = await send({ method: "POST", path: "/v1/staff/push-subscriptions", body });
    return r.ok ? { ok: true } : r;
  };
}
