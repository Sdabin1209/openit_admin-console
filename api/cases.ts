// 실패 사례(I7 FailureStore) HTTP 클라이언트. 검토 게시는 쓰기 역할 reviewer(게이트웨이가 토큰을 붙인다).
import { ApiError, Http, need, type HttpOptions } from "./http.ts";
import { assertRequest, assertResponse, readEnvelope } from "./contract.ts";
import type { DeidentifiedTrace, FailureCase, ReviewRequest } from "./types.ts";

export function checkCase(x: unknown): FailureCase {
  const c = x as FailureCase;
  need(!!c && typeof c.case_id === "string" && typeof c.version === "number" && typeof c.review_status === "string"
    && typeof c.failure_type === "string" && typeof c.deidentified_trace_ref === "string", "FailureCase");
  return c;
}

export class CasesClient {
  private readonly http: Http;
  constructor(opts: HttpOptions = {}) {
    this.http = new Http(opts);
  }

  async list(f: { review_status?: string; failure_type?: string; source_release_id?: string; latest_only?: boolean } = {}): Promise<FailureCase[]> {
    const base = new URLSearchParams();
    for (const [k, v] of Object.entries(f)) if (v !== undefined && v !== "") base.set(k, String(v));
    if (!base.has("latest_only")) base.set("latest_only", "true");
    // 계약 HTTP.md 공통 목록 규칙: next_cursor가 null이 될 때까지 따라간다. 따르지 않으면 첫 쪽(기본 100건) 밖의 사례가 조용히 사라진다(AC-01).
    // 쪽 크기 500은 계약의 최대값. 최대 20쪽(1만 건)은 api/releases.ts와 같은 방어 상한이며 근거 기록 없음(측정 안 함), docs/adr/0010.
    const out: FailureCase[] = [];
    let cursor: string | null = null;
    for (let i = 0; i < 20; i++) {
      const q = new URLSearchParams(base);
      q.set("limit", "500");
      if (cursor) q.set("cursor", cursor);
      const { data } = await this.http.json("GET", `/v1/cases?${q}`);
      const { items, next } = readEnvelope(data, "실패 사례");
      out.push(...items.map(checkCase));
      cursor = next;
      if (!cursor) return out;
    }
    throw new ApiError("UNKNOWN", 0, `사례가 ${out.length}건을 넘어 모두 읽지 못했다(20쪽 상한). 필터를 좁혀 달라`);
  }

  async get(id: string, version?: number): Promise<FailureCase> {
    const q = version === undefined ? "" : `?version=${version}`;
    const { data } = await this.http.json("GET", `/v1/cases/${encodeURIComponent(id)}${q}`);
    return checkCase(data);
  }

  async getTrace(ref: string): Promise<DeidentifiedTrace> {
    const { data } = await this.http.json("GET", `/v1/deidentified-traces/${encodeURIComponent(ref)}`);
    return assertResponse<DeidentifiedTrace>("OpsFeedbackDeidentifiedTrace", data);
  }

  /** 201이면 새 version, 200이면 이미 같은 검토가 있던 것. */
  async review(id: string, req: ReviewRequest): Promise<{ case: FailureCase; replay: boolean }> {
    assertRequest("CaseReviewRequest", req);
    const { status, data } = await this.http.json("POST", `/v1/cases/${encodeURIComponent(id)}/review`, req);
    return { case: checkCase(data), replay: status === 200 };
  }
}

export { ApiError };
