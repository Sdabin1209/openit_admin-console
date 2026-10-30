/* 생성물: scripts/gen-types.mjs (직접 고치지 않는다). 원본: schemas/ 또는 고정 태그의 계약 스키마 */
/**
 * link_gate_review_report의 출력: 보고서와 서버가 낸 그 보고서의 해시. 해시는 계산하지 않고 응답 헤더 값 그대로다(형식만 본다).
 */
export interface LoadedReport {
  report: ReportDoc;
  reportHash: string;
}
/**
 * 승인 요청 보고서(ReviewReport의 읽기용 투영). 화면이 읽는 것만 필수로 하고 모르는 필드는 보존한다.
 */
export interface ReportDoc {
  pipeline_schema_version?: string;
  submission_id: string;
  generated_at?: string;
  subject: {};
  active_release_id?: string | null;
  checks: {
    kind: string;
    result: string;
    detail?: string;
    evidence_ref?: string;
  }[];
  reports?: {
    [k: string]: string;
  };
  comparisons: Comparison[];
  notes?: string[];
  ext?: {};
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
