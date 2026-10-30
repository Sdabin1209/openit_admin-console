// 컴포넌트 ops_request: OpsRequestInput -> 결과(OpsRequest | FormIssues). 릴리스 운영 화면의 확인 단계 폼을 보내도 되는 활성화·롤백 요청으로 바꾼다. 조건은 스키마 OpsRequestInput이 정한다.
import * as v from "../types/validators.cjs";
import type { OpsRequestInput } from "../types/OpsRequestInput.ts";
import type { OpsRequest } from "../types/OpsRequest.ts";

export type Result = { ok: true; value: OpsRequest } | { ok: false; issues: { path: string; message: string }[] };

const MESSAGE: Record<string, string> = {
  "/reason": "롤백 사유를 적어라.",
  "/evidenceText": "근거 ID를 하나 이상 적어라(실패 사례 ID나 지표 스냅샷 ID).",
  "/pointerReleaseId": "현재 활성 릴리스가 없어 롤백할 수 없다.",
};
const ORDER = Object.keys(MESSAGE); // 화면에 보이는 오류 순서

export function opsRequest(input: OpsRequestInput): Result {
  if (!v.OpsRequestInput(input)) {
    const found = v.issues(v.OpsRequestInput).filter((i) => i.keyword !== "if");
    found.sort((a, b) => ORDER.indexOf(a.path) - ORDER.indexOf(b.path));
    return { ok: false, issues: found.map((i) => ({ path: i.path || "/", message: MESSAGE[i.path] ?? `입력이 맞지 않는다: ${i.message}` })) };
  }
  const out = input.kind === "activate"
    ? { kind: "activate", releaseId: input.target }
    : { kind: "rollback", rollback: { request_id: input.requestId, requested_at: input.requestedAt, from_release_id: input.pointerReleaseId as string, to_release_id: input.target, reason: input.reason.trim(), evidence_refs: input.evidenceText.split(/[\s,]+/).filter(Boolean) } };
  return { ok: true, value: v.assertValid(v.OpsRequest, out, "ops_request") as OpsRequest };
}
