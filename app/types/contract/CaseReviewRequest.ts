/* 생성물: scripts/gen-types.mjs (직접 고치지 않는다). 원본: schemas/ 또는 고정 태그의 계약 스키마 */
/**
 * POST /v1/cases/{case_id}/review 본문(I7, Protocol 밖). 만드는 쪽: admin-console(검토자 화면). 읽는 쪽: ops-feedback. expected가 있으면 expected_kind 필수(HTTP.md I7). expected/reviewed_input의 내용 검증(ActionExtraction 등)은 이 스키마가 아니라 해당 계약 스키마와 서버의 일이다. 화면은 CONFIRMED가 아닌 결정에는 review_status만 보낸다.
 */
export type CaseReviewRequest = {
  [k: string]: unknown;
} & {
  review_status: "CONFIRMED" | "DISMISSED" | "PENDING";
  /**
   * LORA_A면 ActionExtraction(객체), LORA_B면 ResponseText(비어 있지 않은 문자열)
   */
  expected?: {} | string;
  expected_kind?: "LORA_A" | "LORA_B";
  /**
   * LORA_A면 ActionExtractionInput, LORA_B면 ResponseRequest. 개인정보 없이 고쳐 쓴 것
   */
  reviewed_input?: {};
};
