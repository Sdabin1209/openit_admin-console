/* 생성물: scripts/gen-types.mjs (직접 고치지 않는다). 원본: schemas/ 또는 고정 태그의 계약 스키마 */
/**
 * approval_failure의 입력: 어느 일을 하다(load 불러오기, decide 결정 전송) 난 오류.
 */
export interface ApprovalFailureInput {
  context: "load" | "decide";
  error: ErrorInfo;
}
/**
 * 이 영역 안에서 오류를 나르는 모양. link_* 컴포넌트가 BoundaryError(HTTP 오류 본문)나 전송 실패를 이 모양으로 바꾼다. 업무 컴포넌트는 HTTP를 모르므로 이 모양만 본다. NON_API는 HTTP와 무관한 예기치 못한 예외.
 */
export interface ErrorInfo {
  kind:
    | "STALE_REPORT"
    | "ALREADY_DECIDED"
    | "NOT_FOUND"
    | "PERMISSION_DENIED"
    | "INVALID_RECORD"
    | "CONFLICT"
    | "FAILED_PRECONDITION"
    | "UNAVAILABLE"
    | "BAD_RESPONSE"
    | "UNKNOWN"
    | "NON_API";
  status: number;
  message: string;
  retryable: boolean;
}
