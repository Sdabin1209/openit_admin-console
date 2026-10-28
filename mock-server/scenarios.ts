// 모의 게이트의 고정 데이터. 모양은 ../boundary-contracts/schemas (SubmissionView, ReviewReport)를 따른다.
// 자동 시험(tests/mock-conformance.test.ts)이 스키마로 검증한다.
import type { Comparison, ReviewReport, SubmissionView } from "../api/types.ts";

// 안전 묶음(SAFETY) 대표 지표 이름의 한 곳. 계약 metrics.json의 현행 지표 이름(value_recall, 옛 risk_signal_recall은 폐기).
export const SAFETY_METRIC = "value_recall";

const H0 = "sha256:" + "0".repeat(64);
const ref = (id: string, version: string) => ({ id, version, content_hash: H0 });
const SUBJECT = { question_set: ref("qs-main", "3"), lora_a: ref("lora-a", "1.2.0"), lora_b: ref("lora-b", "1.0.1") };

function cmp(role: string, name: string, group: string, c: number, cn: number, b: number | null, bn: number | null,
  hib: boolean, worse: boolean | null, slice?: [string, string]): Comparison {
  const x: Comparison = { role, name, group, candidate: c, candidate_n: cn, baseline: b, baseline_n: bn,
    delta: b === null || cn === 0 || bn === 0 ? null : Math.round((c - b) * 10000) / 10000, higher_is_better: hib, worse };
  if (slice) x.slice = { kind: slice[0], value: slice[1] };
  return x;
}

export function baseReport(id: string, version = 1): ReviewReport {
  const comps: Comparison[] = [
    cmp("LORA_A", "item_recall", "ACCURACY", 0.91, 400, 0.9, 400, true, false, ["ALL", "ALL"]),
    cmp("LORA_A", SAFETY_METRIC, "SAFETY", 0.97, 120, 0.99, 120, true, true, ["ALL", "ALL"]),
    cmp("LORA_A", SAFETY_METRIC, "SAFETY", 0.8, 0, 0.9, 30, true, null, ["SEEN_UNSEEN", "UNSEEN"]),
    cmp("LORA_A", "risk_signal_false_alarm", "SAFETY", 0.02, 300, 0.03, 300, false, false, ["ALL", "ALL"]),
    cmp("LORA_A", "value_exact_match", "ACCURACY", 0.88, 250, 0.9, 250, true, true, ["QUESTION_TYPE", "NUMERIC"]),
    cmp("LORA_A", "value_exact_match", "ACCURACY", 0.93, 150, null, null, true, null, ["SEEN_UNSEEN", "SEEN"]),
    cmp("LORA_B", "forbidden_expression_rate", "SAFETY", 0, 500, 0, 500, false, false, ["ALL", "ALL"]),
    cmp("LORA_B", "ungrounded_number_rate", "SAFETY", 0.004, 500, 0.002, 500, false, true, ["ALL", "ALL"]),
    cmp("LORA_B", "slot_coverage", "ACCURACY", 0.96, 500, 0.95, 500, true, false, ["QUESTION_SET", "qs-main"]),
    cmp("LORA_B", "fallback_rate", "PROTECTION", 0.01, 500, 0.01, 500, false, false),
    cmp("LORA_B", "length_p95_ms", "ROBUSTNESS", 840, 500, 790, 500, false, true, ["ALL", "ALL"]),
    // v2 지표 이름은 계약 METRICS.md / boundary_contracts/metrics.json의 이름이다. 화면은 이름을 해석하지 않고 자유 문자열로만 다룬다(EvaluationReport.metrics[].name).
    cmp("LORA_A", "action_accuracy", "ACCURACY", 0.94, 900, 0.95, 900, true, true, ["ALL", "ALL"]),
    cmp("LORA_A", "action_accuracy", "ACCURACY", 0.7, 40, 0.8, 40, true, true, ["ACTION", "CONFIRM"]),
    cmp("LORA_A", "semantic_violation_rate", "ACCURACY", 0.01, 900, 0.02, 900, false, false, ["ALL", "ALL"]),
    cmp("LORA_A", "output_invalid_rate", "PROTECTION", 0, 900, null, null, false, null),
    cmp("LORA_B", "material_coverage", "ACCURACY", 0.9, 500, 0.88, 500, true, false, ["ACTION", "START"]),
    cmp("LORA_B", "future_metric", "NEW_GROUP", 0.5, 10, 0.5, 10, true, false),
  ];
  const r: ReviewReport = {
    pipeline_schema_version: "2.0",
    submission_id: id,
    generated_at: "2026-10-15T00:00:00Z",
    subject: SUBJECT,
    active_release_id: "rel-0001",
    checks: [
      { kind: "CONTRACT_COMPAT", result: "PASS" },
      { kind: "MODEL_QUESTION_COMPAT", result: "PASS", detail: "문항-모델 호환" },
      { kind: "REPORT_FORMAT", result: "PASS", evidence_ref: "eval-0001" },
    ],
    reports: { LORA_A: "eval-0001", LORA_B: "eval-0002" },
    comparisons: comps,
    notes: ["평가 백엔드는 transformers+peft이고 서빙(vLLM)과 다르다."],
    ext: { "release-gate": { policy: "p1" } },
  };
  if (version > 1) {
    r.generated_at = "2026-10-15T00:30:00Z";
    r.notes = [...(r.notes ?? []), `보고서 갱신 v${version}`];
    r.comparisons[1] = { ...r.comparisons[1], candidate: 0.95, delta: -0.04 };
  }
  return r;
}

export interface Scenario { view: SubmissionView; reportVersion: number; hasReport: boolean; behavior?: "stale" | "denied" | "slow" }

function view(id: string, status: string, minutesAgo: number): SubmissionView {
  return {
    submission_id: id, submitted_at: `2026-10-15T00:${String(60 - minutesAgo).padStart(2, "0")}:00Z`, submitted_by_role: "model-lab",
    subject: SUBJECT, status, decision_id: null, approval_id: null, release_id: null, updated_at: "2026-10-15T00:59:00Z",
  };
}

export function initialScenarios(): Scenario[] {
  return [
    { view: view("sub-await", "AWAITING_APPROVAL", 5), reportVersion: 1, hasReport: true },
    { view: view("sub-await-stale", "AWAITING_APPROVAL", 6), reportVersion: 1, hasReport: true, behavior: "stale" },
    { view: view("sub-await-403", "AWAITING_APPROVAL", 7), reportVersion: 1, hasReport: true, behavior: "denied" },
    { view: view("sub-await-slow", "AWAITING_APPROVAL", 8), reportVersion: 1, hasReport: true, behavior: "slow" },
    { view: view("sub-pending", "PENDING_CHECK", 9), reportVersion: 1, hasReport: false },
    { view: view("sub-rejected-auto", "REJECTED_AUTO", 10), reportVersion: 1, hasReport: true },
    { view: { ...view("sub-rejected-human", "REJECTED_HUMAN", 11), approval_id: "ap-h1", decision_id: "dec-h1" }, reportVersion: 1, hasReport: true },
    { view: { ...view("sub-passed", "PASSED", 12), approval_id: "ap-p1", decision_id: "dec-p1", release_id: "rel-0002" }, reportVersion: 1, hasReport: true },
  ];
}
