// 릴리스 운영(I4 읽기 + I5 activate/rollback) HTTP 클라이언트. 행위자·역할은 본문에 넣지 않는다(게이트웨이가 X-Openit-User를 붙이고 서버가 기록한다).
import { ApiError, Http, need, type HttpOptions } from "./http.ts";
import type { ActivePointer, ReleaseSummary, RollbackBody, RollbackReceipt } from "./types.ts";

export function checkPointer(x: unknown): ActivePointer {
  const p = x as ActivePointer;
  need(!!p && typeof p.release_id === "string" && typeof p.pointer_version === "number" && typeof p.activated_at === "string" && typeof p.cause === "string", "ActivePointer");
  return p;
}

export function checkRelease(x: unknown): ReleaseSummary {
  const r = x as ReleaseSummary;
  need(!!r && typeof r.release_id === "string" && typeof r.created_at === "string" && typeof r.gate_decision_id === "string", "ReleaseManifest");
  return r;
}

export function checkReceipt(x: unknown): RollbackReceipt {
  const r = x as RollbackReceipt;
  need(!!r && typeof r.request_id === "string" && typeof r.status === "string" && typeof r.decided_at === "string", "RollbackReceipt");
  if (r.active_pointer !== undefined) checkPointer(r.active_pointer);
  return r;
}

/** 활성화·롤백 요청의 역할(계약: INTERFACES.md 허용 역할 표의 operator). */
export const REQUESTED_BY_ROLE = "operator";

export class ReleasesClient {
  private readonly http: Http;
  constructor(opts: HttpOptions = {}) {
    this.http = new Http(opts);
  }

  /** 활성 릴리스가 아직 없으면 null. */
  async activePointer(): Promise<ActivePointer | null> {
    const { data } = await this.http.json("GET", "/v1/active-pointer");
    const d = data as { item?: unknown };
    need(!!d && "item" in d, "active-pointer");
    return d.item === null ? null : checkPointer(d.item);
  }

  /** 최신부터. 쪽이 여럿이면 모두 읽는다(상한 20쪽). */
  async listReleases(): Promise<ReleaseSummary[]> {
    const out: ReleaseSummary[] = [];
    let cursor: string | null = null;
    for (let i = 0; i < 20; i++) {
      // 쪽 크기 500, 최대 20쪽: 근거 기록 없음(릴리스 수 측정 안 함), docs/adr/0010. 20쪽을 넘으면 오래된 릴리스가 빠진다.
      const q = new URLSearchParams({ limit: "500" });
      if (cursor) q.set("cursor", cursor);
      const { data } = await this.http.json("GET", `/v1/releases?${q}`);
      const d = data as { items?: unknown[]; next_cursor?: string | null };
      need(!!d && Array.isArray(d.items), "릴리스 목록");
      out.push(...d.items!.map(checkRelease));
      cursor = d.next_cursor ?? null;
      if (!cursor) break;
    }
    return out;
  }

  async activate(releaseId: string): Promise<ActivePointer> {
    // 계약(HTTP.md I5): 본문은 {release_id, requested_by_role}. 역할 값은 operator(INTERFACES.md). 서버는 역할을 토큰·헤더로 정하고 이 값은 기록용이다.
    const { data } = await this.http.json("POST", "/v1/activate", { release_id: releaseId, requested_by_role: REQUESTED_BY_ROLE });
    const p = checkPointer(data);
    need(p.release_id === releaseId, "응답의 활성 릴리스가 요청과 다르다");
    return p;
  }

  async rollback(body: RollbackBody): Promise<RollbackReceipt> {
    const { data } = await this.http.json("POST", "/v1/rollback", { ...body, requested_by_role: REQUESTED_BY_ROLE });
    const r = checkReceipt(data);
    need(r.request_id === body.request_id, "응답의 request_id가 요청과 다르다");
    need(r.status === "REJECTED" || (!!r.active_pointer && r.active_pointer.release_id === body.to_release_id), "적용됐다는 응답의 활성 릴리스가 요청 대상과 다르다");
    return r;
  }
}

export { ApiError };
