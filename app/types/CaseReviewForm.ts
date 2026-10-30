/* 생성물: scripts/gen-types.mjs (직접 고치지 않는다). 원본: schemas/ 또는 고정 태그의 계약 스키마 */
/**
 * case_review_draft의 입력: 검토 폼. 입력이나 정답을 쓰면 종류(kind)를 골라야 한다. 텍스트가 JSON인지는 스키마 밖 조건.
 */
export interface CaseReviewForm {
  status: "PENDING" | "CONFIRMED" | "DISMISSED";
  kind: "" | "LORA_A" | "LORA_B";
  inputText: string;
  expectedText: string;
}
