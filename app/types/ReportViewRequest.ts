/* 생성물: scripts/gen-types.mjs (직접 고치지 않는다). 원본: schemas/ 또는 고정 태그의 계약 스키마 */
/**
 * report_view의 입력: 보고서의 지표 비교들과 화면의 분리 기준·정렬.
 */
export interface ReportViewRequest {
  comparisons: Comparison[];
  sliceKind: string;
  sort: "default" | "name" | "candidate" | "delta" | "worse";
}
/**
 * 보고서의 지표 비교 한 건(ReviewReport.comparisons 원소의 읽기용 투영). n=0과 null 기준값을 구분해서 읽는다.
 */
export interface Comparison {
  role: string;
  name: string;
  group: string;
  slice?: {
    kind: string;
    value: string;
  };
  candidate: number;
  candidate_n?: number;
  baseline?: number | null;
  baseline_n?: number | null;
  delta?: number | null;
  higher_is_better: boolean;
  worse?: boolean | null;
}
