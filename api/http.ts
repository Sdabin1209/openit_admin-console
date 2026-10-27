// 공통 HTTP 하부: 오류 모양(BoundaryError)과 JSON 요청. 같은 출처의 /v1을 부르고 Authorization은 다루지 않는다.

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

export function toError(status: number, body: unknown): ApiError {
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

export function need(cond: boolean, what: string): void {
  if (!cond) throw new ApiError("BAD_RESPONSE", 0, `응답 형식이 맞지 않는다: ${what}`);
}

/** 시험이 가짜 시계를 꽂을 수 있게 타이머를 주입받는다. 기본은 전역 타이머. */
export interface Timers { set: (fn: () => void, ms: number) => unknown; clear: (h: unknown) => void }
export interface HttpOptions { baseUrl?: string; timeoutMs?: number; fetch?: typeof fetch; timers?: Timers }

export class Http {
  private readonly base: string;
  private readonly timeoutMs: number;
  private readonly fetchFn: typeof fetch;
  private readonly timers: Timers;
  constructor(opts: HttpOptions = {}) {
    this.base = (opts.baseUrl ?? "").replace(/\/$/, "");
    this.timeoutMs = opts.timeoutMs ?? 15000;
    this.fetchFn = opts.fetch ?? ((...a) => fetch(...a));
    this.timers = opts.timers ?? { set: (fn, ms) => setTimeout(fn, ms), clear: (h) => clearTimeout(h as ReturnType<typeof setTimeout>) };
  }

  async json(method: string, path: string, body?: unknown): Promise<{ status: number; data: unknown; headers: Headers }> {
    const ctl = new AbortController();
    // 시간 제한은 응답 본문을 다 읽을 때까지 걸어 둔다(헤더만 오고 본문이 멈추는 경우).
    const timer = this.timers.set(() => ctl.abort(), this.timeoutMs);
    try {
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
      }
      let text: string;
      try {
        text = await res.text();
      } catch {
        throw new ApiError("UNAVAILABLE", 0, "응답 본문을 끝까지 받지 못했다", true);
      }
      let data: unknown = null;
      let parsed = true;
      try {
        data = JSON.parse(text);
      } catch {
        parsed = false;
      }
      if (res.ok && !parsed) throw new ApiError("BAD_RESPONSE", res.status, "서버 응답 이상: 성공 응답인데 JSON이 아니다");
      if (!res.ok) throw toError(res.status, data);
      return { status: res.status, data, headers: res.headers };
    } finally {
      this.timers.clear(timer);
    }
  }
}
