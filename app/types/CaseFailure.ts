/* 생성물: scripts/gen-types.mjs (직접 고치지 않는다). 원본: schemas/ 또는 고정 태그의 계약 스키마 */
/**
 * case_failure의 출력. back_to_case는 사례 화면에 알림을 보이고 머문다, fail은 오류 화면(또는 trace 오류 문구).
 */
export type CaseFailure = {
  [k: string]: unknown;
} & {
  action: "back_to_case" | "fail";
  notice?: {
    kind: "invalid" | "denied" | "retry" | "notfound";
    text: string;
  };
  errorText?: string;
};
