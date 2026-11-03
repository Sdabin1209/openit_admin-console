// 업무 컴포넌트 push_notice: 푸시 본문(JSON) -> PushNotice. 서비스 워커가 띄울 알림 문구와 tag, 클릭 목적지를 정한다. 판단하지 않는다.
// 규칙은 계약 StaffPushPayload 설명: RESULT_READY의 tag는 'result-'+session_id(직원 알림을 덮어쓰지 않게), session_id가 없으면 일반 문구, 모르는 kind는 그대로 보인다.
import * as c from "../types/contract-validators.cjs";
import * as v from "../types/validators.cjs";
import type { StaffPushPayload } from "../types/contract/StaffPushPayload.ts";
import type { PushNotice } from "../types/PushNotice.ts";

export function pushNotice(data: unknown): PushNotice {
  if (!c.StaffPushPayload(data)) return v.assertValid(v.PushNotice, { title: "알림", body: "새 알림이 있습니다", tag: "staff-alert", sessionId: null }, "push_notice");
  const p = data as StaffPushPayload;
  const out: PushNotice = p.kind === "RESULT_READY"
    ? { title: "문진 결과 도착", body: `세션 ${p.session_id}의 문진 결과가 도착했다`, tag: `result-${p.session_id}`, sessionId: p.session_id }
    : { title: p.kind ?? "알림", body: `세션 ${p.session_id}`, tag: p.alert_id ?? "staff-alert", sessionId: p.session_id };
  return v.assertValid(v.PushNotice, out, "push_notice");
}

/** 알림 클릭 목적지: 해시 주소(route_parse의 #/results/{id}). scope는 서비스 워커 범위(앱 폴더). */
export function pushTarget(n: PushNotice, scope: string): string {
  return new URL(n.sessionId ? `#/results/${encodeURIComponent(n.sessionId)}` : "#/results", scope).href;
}
