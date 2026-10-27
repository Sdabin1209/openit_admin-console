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
    const { data } = await this.http.json("POST", "/v1/activate", { release_id: releaseId });
    return checkPointer(data);
  }

  async rollback(body: RollbackBody): Promise<RollbackReceipt> {
    const { data } = await this.http.json("POST", "/v1/rollback", body);
    return checkReceipt(data);
  }
}

export { ApiError };
