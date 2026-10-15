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
  approver_id: string;
  approver_role: string;
  reason?: string;
  report_hash: string;
}

/** 보고서와, 승인자가 본 그 보고서의 해시(받은 JSON 그대로 계산). */
export interface LoadedReport { report: ReviewReport; reportHash: string }
