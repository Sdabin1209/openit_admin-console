// 계약 스키마(../boundary-contracts/schemas)의 읽기용 모양. 스키마 복사본은 두지 않는다.
// 읽을 때는 관대하게: 모르는 필드는 보존하고, 모르는 열거값은 문자열로 받는다(CONVENTIONS 1절).

export interface ArtifactRef { id: string; version: string; content_hash: string }

export interface SubmissionView {
  submission_id: string;
  submitted_at: string;
  submitted_by_role: string;
  subject: { question_set?: ArtifactRef; lora_a?: ArtifactRef; lora_b?: ArtifactRef } & Record<string, unknown>;
  status: string; // PENDING_CHECK | AWAITING_APPROVAL | REJECTED_AUTO | REJECTED_HUMAN | PASSED | 모르는 값
  decision_id?: string | null;
  approval_id?: string | null;
  release_id?: string | null;
  updated_at: string;
}

export interface MetricSlice { kind: string; value: string }

export interface Comparison {
  role: string;
  name: string;
  group: string;
  slice?: MetricSlice;
  candidate: number;
  candidate_n?: number;
  baseline?: number | null;
  baseline_n?: number | null;
  delta?: number | null;
  higher_is_better: boolean;
  worse?: boolean | null;
}

export interface Check { kind: string; result: string; detail?: string; evidence_ref?: string }

export interface ReviewReport {
  pipeline_schema_version: string;
  submission_id: string;
  generated_at: string;
  subject: { question_set: ArtifactRef; lora_a: ArtifactRef; lora_b: ArtifactRef };
  active_release_id?: string | null;
  checks: Check[];
  reports?: Record<string, string>;
  comparisons: Comparison[];
  notes?: string[];
  ext?: Record<string, unknown>;
}

export type Decision = "APPROVE" | "REJECT";

export interface GateApproval {
  pipeline_schema_version: string;
  approval_id: string;
  submission_id: string;
  decision: string;
  reason?: string;
  approver_id: string;
  approver_role: string;
  decided_at: string;
  report_hash?: string;
}

export interface DecideRequest {
  submission_id: string;
  decision: Decision;
  /** 게이트웨이가 X-Openit-User를 붙이면 서버가 무시한다. 개발 모드 설정이 있을 때만 보낸다. */
  approver_id?: string;
  approver_role: string;
  reason?: string;
  report_hash: string;
}

/** 보고서와, 서버가 낸 그 보고서의 해시(X-Openit-Report-Hash). */
export interface LoadedReport { report: ReviewReport; reportHash: string }

// ---- I7 FailureStore (ops-feedback) ----
export type ReviewStatus = "PENDING" | "CONFIRMED" | "DISMISSED";
export type ExpectedKind = "LORA_A" | "LORA_B";

export interface FailureCase {
  pipeline_schema_version: string;
  case_id: string;
  version: number;
  created_at: string;
  source_release_id: string;
  runtime_contract_version: number;
  deidentified: true;
  deidentified_trace_ref: string;
  failure_type: string;
  detection_method: string; // RULE | MODEL | HUMAN | FEEDBACK | 모르는 값
  review_status: string; // ReviewStatus | 모르는 값
  expected?: Record<string, unknown> | string; // LORA_A면 ActionExtraction(객체), LORA_B면 ResponseText(문자열)
  expected_kind?: string;
  reviewed_input?: Record<string, unknown>;
  question_set?: ArtifactRef;
  ext?: Record<string, unknown>;
}

export interface ReviewRequest {
  review_status: ReviewStatus;
  expected?: Record<string, unknown> | string;
  expected_kind?: ExpectedKind;
  reviewed_input?: Record<string, unknown>;
}

/** 비식별 TurnTrace. 구조만 읽고 모르는 필드는 그대로 둔다. */
export type DeidentifiedTrace = Record<string, unknown>;

/** 활성 포인터(ActivePointer). cause는 모르는 값을 받아들인다. 행위자 필드는 계약에 없다(CR-004). */
export interface ActivePointer {
  pipeline_schema_version: string;
  release_id: string;
  pointer_version: number;
  activated_at: string;
  cause: string; // ACTIVATE | ROLLBACK | 모르는 값
  ext?: Record<string, unknown>;
}

/** 릴리스 목록에서 화면이 쓰는 부분(ReleaseManifest의 일부). */
export interface ReleaseSummary {
  release_id: string;
  created_at: string;
  gate_decision_id: string;
  question_set?: ArtifactRef;
  lora_a?: ArtifactRef;
  lora_b?: ArtifactRef;
}

/** 롤백 요청 본문(requested_by_role 제외). 클라이언트가 requested_by_role을 계약대로 붙인다. 행위자는 게이트웨이 헤더 X-Openit-User를 서버가 쓴다. */
export interface RollbackBody {
  pipeline_schema_version: string;
  request_id: string;
  requested_at: string;
  from_release_id: string;
  to_release_id: string;
  reason: string;
  evidence_refs: string[];
}

export interface RollbackReceipt {
  pipeline_schema_version: string;
  request_id: string;
  status: string; // APPLIED | REJECTED | 모르는 값
  reason?: string;
  active_pointer?: ActivePointer;
  decided_at: string;
}
