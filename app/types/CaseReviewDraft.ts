/* 생성물: scripts/gen-types.mjs (직접 고치지 않는다). 원본: schemas/ 또는 고정 태그의 계약 스키마 */
/**
 * case_review_draft의 출력이자 link_failure_review의 입력(caseId와 함께): 보내도 되는 검토 내용. 종류가 정해지면 입력·정답은 그 종류의 모델 입출력 계약 스키마를 통과해야 한다(LORA_A: ActionExtractionInput/ActionExtraction, LORA_B: ResponseRequest/ResponseText).
 */
export type CaseReviewDraft = {
  [k: string]: unknown;
} & {
  review_status: "PENDING" | "CONFIRMED" | "DISMISSED";
  expected_kind?: "LORA_A" | "LORA_B";
  reviewed_input?: {};
  expected?: {} | string;
};
