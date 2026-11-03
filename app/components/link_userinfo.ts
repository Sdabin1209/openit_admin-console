// 통신 컴포넌트 link_userinfo: (입력 없음) -> HumanUserInfo. platform 사람 인증의 `GET <HumanAuthEndpoints.userinfo>`(email, user, groups). 401이면 로그인하지 않은 것이다.
// 받은 본문은 다시 검증하지 않는다(HumanUserInfo의 x-consumers가 이 영역, ADR 0010 R7·이 영역 ADR 0030).
import type { HumanUserInfo } from "../types/contract/HumanUserInfo.ts";
import type { ErrorInfo } from "../types/ErrorInfo.ts";
import type { HttpRequestSpec } from "../types/HttpRequestSpec.ts";
import type { HttpOutcome } from "../types/HttpOutcome.ts";

type HttpSend = (spec: HttpRequestSpec) => Promise<HttpOutcome>;
export type Result = { ok: true; value: HumanUserInfo } | { ok: false; error: ErrorInfo };

export function createUserInfo(send: HttpSend, path: string): () => Promise<Result> {
  return async () => {
    const r = await send({ method: "GET", path });
    if (!r.ok) return r;
    return { ok: true, value: (r.data && typeof r.data === "object" ? r.data : {}) as HumanUserInfo };
  };
}
