// 컴포넌트 approval_failure: ApprovalFailureInput -> ApprovalFailure. 출고 승인 화면의 오류를 사람이 할 다음 일과 문구로 바꾼다.
import * as v from "../types/validators.cjs";
import type { ApprovalFailureInput } from "../types/ApprovalFailureInput.ts";
import type { ApprovalFailure } from "../types/ApprovalFailure.ts";
import type { ErrorInfo } from "../types/ErrorInfo.ts";

function describe(e: ErrorInfo): string {
  switch (e.kind) {
    case "BAD_RESPONSE": return `서버 응답 이상: 서버가 계약과 다른 응답을 돌려줬다(${e.message}). 실패와는 다르다. 같은 일이 반복되면 게이트 운영자에게 알려라.`;
    case "UNAVAILABLE": return "게이트에 연결하지 못했다. 잠시 뒤 다시 시도하라.";
    case "PERMISSION_DENIED": return "권한이 없다. 이 계정은 출고 승인 역할(release-approver)이 아니다.";
    case "NOT_FOUND": return "대상을 찾을 수 없다.";
    case "CONFLICT": return "지금은 보고서를 볼 수 없다(자동 검사가 끝나지 않았거나 상태가 바뀌었다).";
    case "NON_API": return "알 수 없는 오류";
    default: return `요청에 실패했다: ${e.message}`;
  }
}

export function approvalFailure(input: ApprovalFailureInput): ApprovalFailure {
  v.assertValid(v.ApprovalFailureInput, input, "approval_failure");
  const e = input.error;
  let out: ApprovalFailure;
  if (input.context === "load") out = { action: "fail", errorText: describe(e) };
  else if (e.kind === "STALE_REPORT") {
    // 보고서가 바뀌었다. 새로 불러오고, 승인자가 다시 읽고 다시 결정하게 한다(자동 재전송 없음).
    out = { action: "reload_report", notice: { kind: "stale", text: "그 사이 보고서가 바뀌었다. 새 보고서를 불러왔으니 다시 읽고 결정하라." } };
  } else if (e.kind === "ALREADY_DECIDED" || e.kind === "CONFLICT") {
    out = { action: "back_to_report", notice: { kind: "conflict", text: "이 제출에는 이미 다른 결정이 기록되어 있다. 목록을 새로 불러와 확인하라." } };
  } else if (e.kind === "PERMISSION_DENIED") {
    out = { action: "back_to_report", notice: { kind: "denied", text: "권한이 없다. 이 계정은 출고 승인 역할이 아니다." } };
  } else if (e.kind === "BAD_RESPONSE") {
    out = { action: "back_to_report", notice: { kind: "badresponse", text: `서버 응답 이상: 결정이 기록됐는지 이 화면에서는 확인하지 못했다(${e.message}). 목록을 새로 불러와 이 제출이 아직 대기 중인지 확인하라. 같은 결정을 다시 보내도 한 번만 기록된다.` } };
  } else if (e.retryable) {
    out = { action: "back_to_report", notice: { kind: "retry", text: "게이트에 연결하지 못했다. 결정이 기록되었는지 알 수 없으니, 같은 결정을 다시 보내도 안전하다(같은 결정은 한 번만 기록된다)." } };
  } else out = { action: "fail", errorText: describe(e) };
  return v.assertValid(v.ApprovalFailure, out, "approval_failure");
}
