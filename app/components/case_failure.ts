// 컴포넌트 case_failure: CaseFailureInput -> CaseFailure. 실패 사례 검토 화면의 오류를 다음 일과 문구로 바꾼다.
import * as v from "../types/validators.cjs";
import type { CaseFailureInput } from "../types/CaseFailureInput.ts";
import type { CaseFailure } from "../types/CaseFailure.ts";
import type { ErrorInfo } from "../types/ErrorInfo.ts";

function describe(e: ErrorInfo): string {
  switch (e.kind) {
    case "NON_API": return "알 수 없는 오류";
    case "UNAVAILABLE": return "서버에 연결하지 못했다. 잠시 뒤 다시 시도하라.";
    case "PERMISSION_DENIED": return "권한이 없다. 이 계정은 검토 역할(reviewer)이 아니다.";
    case "NOT_FOUND": return "대상을 찾을 수 없다.";
    default: return `요청에 실패했다: ${e.message}`;
  }
}

export function caseFailure(input: CaseFailureInput): CaseFailure {
  v.assertValid(v.CaseFailureInput, input, "case_failure");
  const e = input.error;
  let out: CaseFailure;
  if (input.context === "load") out = { action: "fail", errorText: describe(e) };
  else if (e.kind === "INVALID_RECORD") out = { action: "back_to_case", notice: { kind: "invalid", text: `서버가 검토 내용을 거절했다: ${e.message}` } };
  else if (e.kind === "PERMISSION_DENIED") out = { action: "back_to_case", notice: { kind: "denied", text: "권한이 없다. 이 계정은 검토 역할(reviewer)이 아니다." } };
  else if (e.kind === "NOT_FOUND") out = { action: "back_to_case", notice: { kind: "notfound", text: "사례를 찾을 수 없다." } };
  else if (e.retryable) out = { action: "back_to_case", notice: { kind: "retry", text: "서버에 연결하지 못했다. 기록되었는지 알 수 없으니 같은 검토를 다시 보내도 안전하다(같은 검토는 한 번만 기록된다)." } };
  else out = { action: "fail", errorText: describe(e) };
  return v.assertValid(v.CaseFailure, out, "case_failure");
}
