// link_* 컴포넌트가 돌려준 ErrorInfo를 예외로 바꾸는 연결 계층의 도구. 컨트롤러와 시험이 ApiError로 오류를 다룬다.
import type { ErrorInfo } from "../types/ErrorInfo.ts";

export type ErrorKind = ErrorInfo["kind"];

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

export type LinkResult<T> = { ok: true; value: T } | { ok: false; error: ErrorInfo };

export function unwrap<T>(r: LinkResult<T>): T {
  if (r.ok) return r.value;
  throw new ApiError(r.error.kind, r.error.status, r.error.message, r.error.retryable);
}

/** 컴포넌트(approval_failure 등)의 입력이 되는 ErrorInfo. HTTP 밖의 예외는 NON_API. */
export function toErrorInfo(e: unknown): ErrorInfo {
  if (e instanceof ApiError) return { kind: e.kind, status: e.status, message: e.message, retryable: e.retryable };
  return { kind: "NON_API", status: 0, message: "", retryable: false };
}
