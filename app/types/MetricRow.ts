/* 생성물: scripts/gen-types.mjs (직접 고치지 않는다). 원본: schemas/ 또는 고정 태그의 계약 스키마 */
/**
 * 지표 표의 한 줄. worse는 참고 표시일 뿐 합격/불합격이 아니다(D53).
 */
export interface MetricRow {
  key: string;
  role: string;
  name: string;
  group: string;
  sliceKind: string;
  sliceLabel: string;
  candidate: Cell;
  candidateN: string;
  baseline: Cell;
  baselineN: string;
  delta: Cell;
  worse: boolean;
  worseKnown: boolean;
  direction: string;
  sortCandidate: number | null;
  sortDelta: number | null;
}
/**
 * 지표 표의 칸. uncomputable은 n=0(계산 못 함), none은 기준 없음·비교 못 함.
 */
export interface Cell {
  kind: "value" | "uncomputable" | "none";
  text: string;
}
