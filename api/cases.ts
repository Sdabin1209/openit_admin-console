// 실패 사례(I7 FailureStore) HTTP 클라이언트. 검토 게시는 쓰기 역할 reviewer(게이트웨이가 토큰을 붙인다).
import { ApiError, Http, need, type HttpOptions } from "./http.ts";
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
    const q = new URLSearchParams();
    for (const [k, v] of Object.entries(f)) if (v !== undefined && v !== "") q.set(k, String(v));
    if (!q.has("latest_only")) q.set("latest_only", "true");
    const { data } = await this.http.json("GET", `/v1/cases?${q}`);
    const d = data as { items?: unknown[] };
    need(!!d && Array.isArray(d.items), "목록");
    return d.items!.map(checkCase);
  }

  async get(id: string, version?: number): Promise<FailureCase> {
    const q = version === undefined ? "" : `?version=${version}`;
    const { data } = await this.http.json("GET", `/v1/cases/${encodeURIComponent(id)}${q}`);
    return checkCase(data);
  }

  async getTrace(ref: string): Promise<DeidentifiedTrace> {
    const { data } = await this.http.json("GET", `/v1/deidentified-traces/${encodeURIComponent(ref)}`);
    need(!!data && typeof data === "object" && !Array.isArray(data), "비식별 trace");
    return data as DeidentifiedTrace;
  }

  /** 201이면 새 version, 200이면 이미 같은 검토가 있던 것. */
  async review(id: string, req: ReviewRequest): Promise<{ case: FailureCase; replay: boolean }> {
    const { status, data } = await this.http.json("POST", `/v1/cases/${encodeURIComponent(id)}/review`, req);
    return { case: checkCase(data), replay: status === 200 };
  }
}

export { ApiError };
