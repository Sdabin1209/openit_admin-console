// 통신 컴포넌트 link_userinfo: (입력 없음) -> UserInfo. oauth2-proxy 표준 `GET /oauth2/userinfo`(email, user, groups). 401이면 로그인하지 않은 것이다.
import * as v from "../types/validators.cjs";
import type { UserInfo } from "../types/UserInfo.ts";
import type { ErrorInfo } from "../types/ErrorInfo.ts";
import type { HttpRequestSpec } from "../types/HttpRequestSpec.ts";
import type { HttpOutcome } from "../types/HttpOutcome.ts";

type HttpSend = (spec: HttpRequestSpec) => Promise<HttpOutcome>;
export type Result = { ok: true; value: UserInfo } | { ok: false; error: ErrorInfo };

export function createUserInfo(send: HttpSend): () => Promise<Result> {
  return async () => {
    const r = await send({ method: "GET", path: "/oauth2/userinfo" });
    if (!r.ok) return r;
    if (!v.UserInfo(r.data)) return { ok: false, error: { kind: "BAD_RESPONSE", status: 0, message: `응답 형식이 맞지 않는다: UserInfo: ${v.issues(v.UserInfo).slice(0, 3).map((e) => `${e.path || "(최상위)"} ${e.message}`).join("; ")}`, retryable: false } };
    return { ok: true, value: r.data as UserInfo };
  };
}
