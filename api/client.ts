// 게이트(I5) HTTP 클라이언트. 같은 출처의 /v1을 부르고 Authorization은 다루지 않는다(게이트웨이가 붙인다).
import type { DecideRequest, GateApproval, LoadedReport, ReviewReport, SubmissionView } from "./types.ts";

export type ErrorKind =
  | "STALE_REPORT" | "ALREADY_DECIDED" | "NOT_FOUND" | "PERMISSION_DENIED" | "INVALID_RECORD" | "CONFLICT"
  | "FAILED_PRECONDITION" | "UNAVAILABLE" | "BAD_RESPONSE" | "UNKNOWN";

export class ApiError extends Error {
  readonly kind: ErrorKind;
  readonly status: number;
  readonly retryable: boolean;
  constructor(kind: ErrorKind, status: number, message: string, retryable = false) {
    super(message);
    this.name = "ApiError";
    this.kind = kind;
    this.status = status;
    this.retryable = retryable;
  }
}

const BY_CODE: Record<string, ErrorKind> = {
  NOT_FOUND: "NOT_FOUND", INVALID_RECORD: "INVALID_RECORD", CONFLICT: "CONFLICT",
  FAILED_PRECONDITION: "FAILED_PRECONDITION", PERMISSION_DENIED: "PERMISSION_DENIED", UNAVAILABLE: "UNAVAILABLE",
};
const BY_STATUS: Record<number, ErrorKind> = {
  400: "INVALID_RECORD", 403: "PERMISSION_DENIED", 404: "NOT_FOUND", 409: "CONFLICT", 412: "FAILED_PRECONDITION", 503: "UNAVAILABLE",
};

export const REPORT_HASH_HEADER = "X-Openit-Report-Hash";

function toError(status: number, body: unknown): ApiError {
  const b = (body && typeof body === "object" ? body : {}) as Record<string, unknown>;
  const message = typeof b.message === "string" ? b.message : `HTTP ${status}`;
  if (status === 409) {
    // 409의 사유는 details.reason으로만 구분한다(HTTP.md D69). 문자열 검색은 하지 않는다.
    const reason = (b.details && typeof b.details === "object" ? (b.details as Record<string, unknown>).reason : undefined);
    if (reason === "STALE_REPORT") return new ApiError("STALE_REPORT", status, message);
    if (reason === "ALREADY_DECIDED") return new ApiError("ALREADY_DECIDED", status, message);
  }
  const kind = (typeof b.code === "string" && BY_CODE[b.code]) || BY_STATUS[status] || (status >= 500 ? "UNAVAILABLE" : "UNKNOWN");
  const retryable = kind === "UNAVAILABLE" || status >= 500;
  return new ApiError(kind, status, message, retryable);
}

function need(cond: boolean, what: string): void {
  if (!cond) throw new ApiError("BAD_RESPONSE", 0, `응답 형식이 맞지 않는다: ${what}`);
}

export function checkSubmission(x: unknown): SubmissionView {
  const s = x as SubmissionView;
  need(!!s && typeof s.submission_id === "string" && typeof s.status === "string" && typeof s.subject === "object", "SubmissionView");
  return s;
}

export function checkReport(x: unknown): ReviewReport {
  const r = x as ReviewReport;
  need(!!r && typeof r.submission_id === "string" && Array.isArray(r.checks) && Array.isArray(r.comparisons) && typeof r.subject === "object", "ReviewReport");
  return r;
}

export interface GateClientOptions { baseUrl?: string; timeoutMs?: number; fetch?: typeof fetch }

export class GateClient {
  private readonly base: string;
  private readonly timeoutMs: number;
  private readonly fetchFn: typeof fetch;
  constructor(opts: GateClientOptions = {}) {
    this.base = (opts.baseUrl ?? "").replace(/\/$/, "");
    this.timeoutMs = opts.timeoutMs ?? 15000;
    this.fetchFn = opts.fetch ?? ((...a) => fetch(...a));
  }

  private async json(method: string, path: string, body?: unknown): Promise<{ status: number; data: unknown; headers: Headers }> {
    const ctl = new AbortController();
    const timer = setTimeout(() => ctl.abort(), this.timeoutMs);
    let res: Response;
    try {
      res = await this.fetchFn(this.base + path, {
        method,
        headers: body === undefined ? { Accept: "application/json" } : { Accept: "application/json", "Content-Type": "application/json" },
        body: body === undefined ? undefined : JSON.stringify(body),
        credentials: "same-origin",
        cache: "no-store",
        signal: ctl.signal,
      });
    } catch {
      throw new ApiError("UNAVAILABLE", 0, "게이트에 연결하지 못했다", true);
    } finally {
      clearTimeout(timer);
    }
    let data: unknown = null;
    try {
      data = await res.json();
    } catch {
      if (res.ok) throw new ApiError("BAD_RESPONSE", res.status, "응답이 JSON이 아니다");
    }
    if (!res.ok) throw toError(res.status, data);
    return { status: res.status, data, headers: res.headers };
  }

  async listAwaiting(cursor?: string, limit = 100): Promise<{ items: SubmissionView[]; nextCursor: string | null }> {
    const q = new URLSearchParams({ status: "AWAITING_APPROVAL", limit: String(limit) });
    if (cursor) q.set("cursor", cursor);
    const { data } = await this.json("GET", `/v1/submissions?${q}`);
    const d = data as { items?: unknown[]; next_cursor?: string | null };
    need(!!d && Array.isArray(d.items), "목록");
    return { items: d.items!.map(checkSubmission), nextCursor: d.next_cursor ?? null };
  }

  async getSubmission(id: string): Promise<SubmissionView> {
    const { data } = await this.json("GET", `/v1/submissions/${encodeURIComponent(id)}`);
    return checkSubmission(data);
  }

  /** 보고서와 서버가 낸 해시(응답 헤더). 해시는 계산하지 않고 그대로 돌려보낸다. */
  async getReviewReport(id: string): Promise<LoadedReport> {
    const { data, headers } = await this.json("GET", `/v1/submissions/${encodeURIComponent(id)}/review-report`);
    const report = checkReport(data);
    const reportHash = headers.get(REPORT_HASH_HEADER);
    need(!!reportHash && /^sha256:[0-9a-f]{64}$/.test(reportHash), `${REPORT_HASH_HEADER} 헤더`);
    return { report, reportHash: reportHash! };
  }

  async decide(req: DecideRequest): Promise<{ approval: GateApproval; replay: boolean }> {
    need(req.decision === "APPROVE" || req.decision === "REJECT", "decision");
    const { status, data } = await this.json("POST", "/v1/approvals", req);
    const a = data as GateApproval;
    need(!!a && typeof a.approval_id === "string", "GateApproval");
    return { approval: a, replay: status === 200 };
  }
}
