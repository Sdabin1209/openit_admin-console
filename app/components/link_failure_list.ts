// 통신 컴포넌트 link_failure_list: CaseListQuery -> CaseList. ops-feedback I7 `GET /v1/cases`. 계약 목록 규칙대로 next_cursor가 null이 될 때까지 따라간다.
// 따르지 않으면 첫 쪽(기본 100건) 밖의 사례가 조용히 사라진다(AC-01). 쪽 크기 500은 계약 최대값, 최대 20쪽(1만 건)은 출처 없는 방어 상한(측정 안 함, docs/adr/0010).
import * as v from "../types/validators.cjs";
import type { CaseListQuery } from "../types/CaseListQuery.ts";
import type { CaseList } from "../types/CaseList.ts";
import type { ErrorInfo } from "../types/ErrorInfo.ts";
import type { ListEnvelope } from "../types/contract/ListEnvelope.ts";
import type { HttpRequestSpec } from "../types/HttpRequestSpec.ts";
import type { HttpOutcome } from "../types/HttpOutcome.ts";

// link_http_send가 주입되는 자리. 그 컴포넌트를 import하지 않고 입출력 스키마(HttpRequestSpec -> HttpOutcome)만 안다(규칙 3).
type HttpSend = (spec: HttpRequestSpec) => Promise<HttpOutcome>;

// 받은 본문은 다시 검증하지 않는다(계약에서 이 영역이 x-consumers인 값, ADR 0010 R7, 이 영역 ADR 0030).
export type Result = { ok: true; value: CaseList } | { ok: false; error: ErrorInfo };

export function createFailureList(send: HttpSend): (input: CaseListQuery) => Promise<Result> {
  return async (input) => {
    v.assertValid(v.CaseListQuery, input, "link_failure_list");
    const base = new URLSearchParams();
    for (const [k, val] of Object.entries(input)) if (val !== undefined && val !== "") base.set(k, String(val));
    if (!base.has("latest_only")) base.set("latest_only", "true");
    const cases: unknown[] = [];
    let cursor: string | null = null;
    for (let i = 0; i < 20; i++) {
      const q = new URLSearchParams(base);
      q.set("limit", "500");
      if (cursor) q.set("cursor", cursor);
      const r = await send({ method: "GET", path: `/v1/cases?${q}` });
      if (!r.ok) return r;
      const env = r.data as ListEnvelope;
      cases.push(...env.items);
      cursor = env.next_cursor;
      if (!cursor) {
        const out = { cases };
        return { ok: true, value: out as CaseList };
      }
    }
    return { ok: false, error: { kind: "UNKNOWN", status: 0, message: `사례가 ${cases.length}건을 넘어 모두 읽지 못했다(20쪽 상한). 필터를 좁혀 달라`, retryable: false } };
  };
}
