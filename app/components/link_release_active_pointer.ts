// 통신 컴포넌트 link_release_active_pointer: (입력 없음) -> ActivePointerState. release-gate I4 `GET /v1/active-pointer`. 활성 릴리스가 아직 없으면 pointer가 null.
import type { ActivePointerState } from "../types/ActivePointerState.ts";
import type { ErrorInfo } from "../types/ErrorInfo.ts";
import type { HttpRequestSpec } from "../types/HttpRequestSpec.ts";
import type { HttpOutcome } from "../types/HttpOutcome.ts";

// link_http_send가 주입되는 자리. 그 컴포넌트를 import하지 않고 입출력 스키마(HttpRequestSpec -> HttpOutcome)만 안다(규칙 3).
type HttpSend = (spec: HttpRequestSpec) => Promise<HttpOutcome>;

export type Result = { ok: true; value: ActivePointerState } | { ok: false; error: ErrorInfo };

export function createActivePointer(send: HttpSend): () => Promise<Result> {
  return async () => {
    const r = await send({ method: "GET", path: "/v1/active-pointer" });
    if (!r.ok) return r;
    const d = r.data as { item?: unknown } | null;
    const out = { pointer: d && typeof d === "object" && "item" in d ? d.item : undefined };
    return { ok: true, value: out as ActivePointerState };
  };
}
