/* 생성물: scripts/gen-types.mjs (직접 고치지 않는다). 원본: schemas/ 또는 고정 태그의 계약 스키마 */
/**
 * approval_failure의 출력. reload_report는 보고서를 새로 불러오고 다시 결정하게 한다, back_to_report는 보고서 화면에 알림을 보이고 머문다, fail은 오류 화면.
 */
export type ApprovalFailure = {
  [k: string]: unknown;
} & {
  action: "reload_report" | "back_to_report" | "fail";
  notice?: {
    kind: "stale" | "badresponse" | "conflict" | "denied" | "retry" | "invalid";
    text: string;
  };
  errorText?: string;
};
