/* 생성물: scripts/gen-types.mjs (직접 고치지 않는다). 원본: schemas/ 또는 고정 태그의 계약 스키마 */
/**
 * ops_failure의 출력: 화면에 보일 알림. 오류를 종류로 구분해 보인다(403, 409, 412, 네트워크).
 */
export interface OpsNotice {
  kind: "badresponse" | "denied" | "conflict" | "precondition" | "network" | "invalid" | "notfound" | "other";
  text: string;
}
