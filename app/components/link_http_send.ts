// 통신 컴포넌트 link_http_send (보내는 쪽): HttpRequestSpec -> HttpOutcome. 같은 출처의 /v1을 부르는 유일한 곳이다(규칙: HTTP는 link_* 안에만).
// Authorization은 다루지 않는다(게이트웨이가 붙인다). 계약 오류 본문 BoundaryError를 ErrorInfo로 바꾼다.
import * as v from "../types/validators.cjs";
import type { HttpSendConfig } from "../types/HttpSendConfig.ts";
import type { HttpRequestSpec } from "../types/HttpRequestSpec.ts";
import type { HttpOutcome } from "../types/HttpOutcome.ts";
import type { ErrorInfo } from "../types/ErrorInfo.ts";
import type { BoundaryError } from "../types/contract/BoundaryError.ts";

/** 시험이 가짜 시계를 꽂을 수 있게 타이머를 주입받는다. 기본은 전역 타이머. */
export interface Timers { set: (fn: () => void, ms: number) => unknown; clear: (h: unknown) => void }
export interface HttpPorts { fetch?: typeof fetch; timers?: Timers }
export type HttpSend = (spec: HttpRequestSpec) => Promise<HttpOutcome>;

type Kind = ErrorInfo["kind"];
const BY_CODE: Record<string, Kind> = {
  NOT_FOUND: "NOT_FOUND", INVALID_RECORD: "INVALID_RECORD", CONFLICT: "CONFLICT",
  FAILED_PRECONDITION: "FAILED_PRECONDITION", PERMISSION_DENIED: "PERMISSION_DENIED", UNAVAILABLE: "UNAVAILABLE",
};
const BY_STATUS: Record<number, Kind> = {
  400: "INVALID_RECORD", 403: "PERMISSION_DENIED", 404: "NOT_FOUND", 409: "CONFLICT", 412: "FAILED_PRECONDITION", 503: "UNAVAILABLE",
};
// 계약 CONVENTIONS.md 9절(2.2.2): 전송 계층 한도 응답은 HTTP 서버(예: waitress)가 앱 앞에서 text/plain으로 낼 수 있어 본문을 믿지 않는다.
// 본문과 무관하게 INVALID_RECORD, 재시도 안 함. 같은 요청을 다시 보내도 같은 한도에 걸리기 때문이다(RFC 9110 15.5.14·15.5.15, RFC 6585 5).
const TRANSPORT_LIMIT: Record<number, string> = { 413: "요청이 너무 크다", 414: "요청 주소가 너무 길다", 431: "요청 헤더가 너무 크다" };

function fail(kind: Kind, status: number, message: string, retryable = false): HttpOutcome {
  return { ok: false, error: { kind, status, message, retryable } };
}

export function toError(status: number, body: unknown): ErrorInfo {
  if (TRANSPORT_LIMIT[status]) return { kind: "INVALID_RECORD", status, message: `${TRANSPORT_LIMIT[status]}(HTTP ${status}). 입력을 줄여 다시 보내라.`, retryable: false };
  const b = (body && typeof body === "object" ? body : {}) as Partial<BoundaryError> & Record<string, unknown>;
  const message = typeof b.message === "string" ? b.message : `HTTP ${status}`;
  if (status === 409) {
    // 409의 사유는 details.reason으로만 구분한다(HTTP.md D69). 문자열 검색은 하지 않는다.
    const reason = (b.details && typeof b.details === "object" ? (b.details as Record<string, unknown>).reason : undefined);
    if (reason === "STALE_REPORT") return { kind: "STALE_REPORT", status, message, retryable: false };
    if (reason === "ALREADY_DECIDED") return { kind: "ALREADY_DECIDED", status, message, retryable: false };
  }
  const kind: Kind = (typeof b.code === "string" && BY_CODE[b.code]) || BY_STATUS[status] || (status >= 500 ? "UNAVAILABLE" : "UNKNOWN");
  // 계약 CONVENTIONS.md: 호출자는 code와 retryable로 행동한다. 본문 retryable(필수 boolean)을 쓰고,
  // 본문이 BoundaryError가 아닐 때(게이트웨이의 502 HTML 등)만 HTTP.md의 "5xx는 UNAVAILABLE(재시도 가능)"로 대신한다(docs/adr/0015).
  const retryable = typeof b.retryable === "boolean" ? b.retryable : kind === "UNAVAILABLE" || status >= 500;
  return { kind, status, message, retryable };
}

export function createHttpSend(config: HttpSendConfig, ports: HttpPorts = {}): HttpSend {
  v.assertValid(v.HttpSendConfig, config, "link_http_send 설정");
  const base = config.baseUrl.replace(/\/$/, "");
  const fetchFn: typeof fetch = ports.fetch ?? ((...a) => fetch(...a));
  const timers: Timers = ports.timers ?? { set: (fn, ms) => setTimeout(fn, ms), clear: (h) => clearTimeout(h as ReturnType<typeof setTimeout>) };
  return async (spec) => {
    v.assertValid(v.HttpRequestSpec, spec, "link_http_send");
    const ctl = new AbortController();
    // 시간 제한은 응답 본문을 다 읽을 때까지 걸어 둔다(헤더만 오고 본문이 멈추는 경우).
    const timer = timers.set(() => ctl.abort(), config.timeoutMs);
    try {
      let res: Response;
      try {
        res = await fetchFn(base + spec.path, {
          method: spec.method,
          headers: spec.body === undefined ? { Accept: "application/json" } : { Accept: "application/json", "Content-Type": "application/json" },
          body: spec.body === undefined ? undefined : JSON.stringify(spec.body),
          credentials: "same-origin",
          cache: "no-store",
          signal: ctl.signal,
        });
      } catch {
        return fail("UNAVAILABLE", 0, "게이트에 연결하지 못했다", true);
      }
      let text: string;
      try {
        text = await res.text();
      } catch {
        return fail("UNAVAILABLE", 0, "응답 본문을 끝까지 받지 못했다", true);
      }
      let data: unknown = null;
      let parsed = true;
      try {
        data = JSON.parse(text);
      } catch {
        parsed = false;
      }
      if (res.ok && !parsed) return fail("BAD_RESPONSE", res.status, "서버 응답 이상: 성공 응답인데 JSON이 아니다");
      if (!res.ok) return { ok: false, error: toError(res.status, data) };
      const headers: Record<string, string> = {};
      res.headers.forEach((val, key) => { headers[key.toLowerCase()] = val; });
      // 2xx 중 200~299만 성공 모양에 들어간다(res.ok의 범위와 같다).
      return { ok: true, status: res.status, data, headers };
    } finally {
      timers.clear(timer);
    }
  };
}
