// 컴포넌트 ops_failure: OpsFailureInput -> OpsNotice. 릴리스 운영 화면의 오류를 종류(403, 409, 412, 네트워크 등)로 구분한 알림으로 바꾼다.
import * as v from "../types/validators.cjs";
import type { OpsFailureInput } from "../types/OpsFailureInput.ts";
import type { OpsNotice } from "../types/OpsNotice.ts";

export function opsFailure(input: OpsFailureInput): OpsNotice {
  v.assertValid(v.OpsFailureInput, input, "ops_failure");
  const e = input.error;
  const suffix = e.message ? ` (서버: ${e.message})` : "";
  let out: OpsNotice;
  switch (e.kind) {
    case "NON_API": out = { kind: "other", text: "알 수 없는 오류" }; break;
    case "PERMISSION_DENIED": out = { kind: "denied", text: "권한이 없다(403). 이 계정은 운영자(operator) 역할이 아니다. 활성화·롤백은 운영자 계정만 할 수 있다." }; break;
    case "CONFLICT": out = { kind: "conflict", text: `다른 변경과 겹쳤다(409): 다른 운영자가 먼저 활성 릴리스를 바꿨거나 상태가 맞지 않다. 화면을 새로 불러왔으니 현재 상태를 확인하고 다시 시도하라.${suffix}` }; break;
    case "FAILED_PRECONDITION": out = { kind: "precondition", text: `이 릴리스는 활성화할 수 없다(412): 게이트 결정이 PASS가 아니거나 조건이 맞지 않다.${suffix}` }; break;
    case "BAD_RESPONSE": out = { kind: "badresponse", text: `서버 응답 이상: 서버가 계약과 다른 응답을 돌려줬다(${e.message}). 요청이 적용됐는지 알 수 없으니 새로고침으로 현재 활성 릴리스를 확인하라. 같은 일이 반복되면 게이트 운영자에게 알려라.` }; break;
    case "UNAVAILABLE": out = { kind: "network", text: "서버에 연결하지 못했다. 변경이 적용됐는지 알 수 없으니 새로고침으로 현재 활성 릴리스를 확인한 뒤 다시 시도하라." }; break;
    case "NOT_FOUND": out = { kind: "notfound", text: "대상 릴리스를 찾을 수 없다(404)." }; break;
    case "INVALID_RECORD": out = { kind: "invalid", text: `요청이 거부됐다(${e.status || 400}): ${e.message}` }; break;
    default: out = { kind: "other", text: `요청에 실패했다: ${e.message}` };
  }
  return v.assertValid(v.OpsNotice, out, "ops_failure");
}
