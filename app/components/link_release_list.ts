// 통신 컴포넌트 link_release_list: (입력 없음) -> ReleaseList. release-gate I4 `GET /v1/releases`. 최신부터, 쪽이 여럿이면 모두 읽는다.
// 20쪽(1만 건)을 넘으면 잘린 목록을 돌려주지 않고 오류를 낸다(docs/adr/0013): 잘린 목록으로 후보를 계산하면 조용히 틀린다.
import * as v from "../types/validators.cjs";
import * as c from "../types/contract-validators.cjs";
import type { ReleaseList } from "../types/ReleaseList.ts";
import type { ErrorInfo } from "../types/ErrorInfo.ts";
import type { ListEnvelope } from "../types/contract/ListEnvelope.ts";
import type { HttpRequestSpec } from "../types/HttpRequestSpec.ts";
import type { HttpOutcome } from "../types/HttpOutcome.ts";

// link_http_send가 주입되는 자리. 그 컴포넌트를 import하지 않고 입출력 스키마(HttpRequestSpec -> HttpOutcome)만 안다(규칙 3).
type HttpSend = (spec: HttpRequestSpec) => Promise<HttpOutcome>;

export type Result = { ok: true; value: ReleaseList } | { ok: false; error: ErrorInfo };
const bad = (what: string): Result => ({ ok: false, error: { kind: "BAD_RESPONSE", status: 0, message: `응답 형식이 맞지 않는다: ${what}`, retryable: false } });

export function createReleaseList(send: HttpSend): () => Promise<Result> {
  return async () => {
    const releases: unknown[] = [];
    let cursor: string | null = null;
    // 쪽 크기 500은 계약 최대값, 최대 20쪽은 출처 없는 방어 상한(측정 안 함, docs/adr/0010).
    for (let i = 0; i < 20; i++) {
      const q = new URLSearchParams({ limit: "500" });
      if (cursor) q.set("cursor", cursor);
      const r = await send({ method: "GET", path: `/v1/releases?${q}` });
      if (!r.ok) return r;
      if (!c.ListEnvelope(r.data)) return bad("릴리스 목록 봉투");
      const env = r.data as ListEnvelope;
      releases.push(...env.items);
      cursor = env.next_cursor;
      if (!cursor) {
        const out = { releases };
        return v.ReleaseList(out) ? { ok: true, value: out as ReleaseList } : bad("ReleaseManifest");
      }
    }
    return { ok: false, error: { kind: "UNKNOWN", status: 0, message: `릴리스가 ${releases.length}건을 넘어 모두 읽지 못했다(20쪽 상한). 게이트 운영자에게 알려라`, retryable: false } };
  };
}
