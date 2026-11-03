// 통신 컴포넌트 link_result_list: ResultListQuery -> ResultPage. 문진 서비스 `GET /v1/results`(계약 PUBLIC_API B). 한 쪽만 읽는다(쪽 넘김은 화면이 '더 보기'로 정한다).
// 왜 한 쪽: 결과는 세션마다 쌓여 수가 늘고 의사가 최신부터 본다. 끝까지 읽으면 느리고 의미가 없다(릴리스 목록과 다르다).
import * as v from "../types/validators.cjs";
import type { ResultListQuery } from "../types/ResultListQuery.ts";
import type { ResultPage } from "../types/ResultPage.ts";
import type { ErrorInfo } from "../types/ErrorInfo.ts";
import type { HttpRequestSpec } from "../types/HttpRequestSpec.ts";
import type { HttpOutcome } from "../types/HttpOutcome.ts";

// link_http_send가 주입되는 자리. 그 컴포넌트를 import하지 않고 입출력 스키마(HttpRequestSpec -> HttpOutcome)만 안다(규칙 3).
type HttpSend = (spec: HttpRequestSpec) => Promise<HttpOutcome>;

// 받은 본문은 다시 검증하지 않는다(계약에서 이 영역이 x-consumers인 값, ADR 0010 R7, 이 영역 ADR 0030). 요청과 응답이 같은지 맞춰 보는 검사도 두지 않는다.
export type Result = { ok: true; value: ResultPage } | { ok: false; error: ErrorInfo };

export function createResultList(send: HttpSend): (input: ResultListQuery) => Promise<Result> {
  return async (input) => {
    v.assertValid(v.ResultListQuery, input, "link_result_list");
    const q = new URLSearchParams();
    for (const k of ["status", "updated_after", "cursor"] as const) if (input[k]) q.set(k, input[k] as string);
    if (input.limit !== undefined) q.set("limit", String(input.limit));
    const qs = q.toString();
    const r = await send({ method: "GET", path: `/v1/results${qs ? "?" + qs : ""}` });
    if (!r.ok) return r;
    return { ok: true, value: r.data as ResultPage };
  };
}
