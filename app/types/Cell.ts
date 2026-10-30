/* 생성물: scripts/gen-types.mjs (직접 고치지 않는다). 원본: schemas/ 또는 고정 태그의 계약 스키마 */
/**
 * 지표 표의 칸. uncomputable은 n=0(계산 못 함), none은 기준 없음·비교 못 함.
 */
export interface Cell {
  kind: "value" | "uncomputable" | "none";
  text: string;
}
