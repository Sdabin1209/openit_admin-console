/* 생성물: scripts/gen-types.mjs (직접 고치지 않는다). 원본: schemas/ 또는 고정 태그의 계약 스키마 */
/**
 * POST /v1/cases/{case_id}/review 본문(I7, Protocol 밖). 만드는 쪽: admin-console(검토자 화면). 읽는 쪽: ops-feedback. expected·reviewed_input 이 있으면 expected_kind 필수(HTTP.md I7)이고, 모양은 expected_kind 가 정한다(LORA_A: ActionExtraction·ActionExtractionInput, LORA_B: ResponseText·ResponseRequest — 3.7.0, 그 전에는 객체·문자열인지만 봤다). 화면은 CONFIRMED가 아닌 결정에는 review_status만 보낸다.
 */
export type CaseReviewRequest = {
  [k: string]: unknown;
} & {
  review_status: "CONFIRMED" | "DISMISSED" | "PENDING";
  /**
   * LORA_A면 ActionExtraction, LORA_B면 ResponseText
   */
  expected?: {} | string;
  expected_kind?: "LORA_A" | "LORA_B";
  /**
   * LORA_A면 ActionExtractionInput, LORA_B면 ResponseRequest. 개인정보 없이 고쳐 쓴 것
   */
  reviewed_input?: {};
};
