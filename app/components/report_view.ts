// 컴포넌트 report_view: ReportViewRequest -> ReportView. 보고서의 지표 비교를 화면용 표로 바꾼다. 합격/불합격을 판단하지 않는다(D53): worse는 참고 표시일 뿐이다.
import * as v from "../types/validators.cjs";
import type { ReportViewRequest } from "../types/ReportViewRequest.ts";
import type { ReportView } from "../types/ReportView.ts";
import type { Comparison } from "../types/Comparison.ts";
import type { MetricRow } from "../types/MetricRow.ts";
import type { Cell } from "../types/Cell.ts";

// 왜 이 순서: SAFETY가 맨 위여야 승인자가 안전 지표부터 읽는다(브리프 4절). 모르는 그룹은 이름을 지키고 맨 뒤에 둔다.
const GROUP_ORDER = ["SAFETY", "ACCURACY", "PROTECTION", "ROBUSTNESS", "COVERAGE", "REGRESSION", "OTHER"];
const GROUP_LABEL: Record<string, string> = {
  SAFETY: "안전 (SAFETY)", ACCURACY: "정확도", PROTECTION: "출력 보호", ROBUSTNESS: "견고성",
  COVERAGE: "범위", REGRESSION: "회귀", OTHER: "기타",
};

function fmt(x: number): string {
  if (Number.isInteger(x)) return String(x);
  return String(Math.round(x * 10000) / 10000);
}

function toRow(c: Comparison, index: number): MetricRow {
  const slice = c.slice ?? { kind: "ALL", value: "ALL" };
  const cUnc = c.candidate_n === 0;
  const bUnc = c.baseline_n === 0;
  const candidate: Cell = cUnc ? { kind: "uncomputable", text: "계산 못 함" } : { kind: "value", text: fmt(c.candidate) };
  let baseline: Cell;
  if (bUnc) baseline = { kind: "uncomputable", text: "계산 못 함" };
  else if (c.baseline === null || c.baseline === undefined) baseline = { kind: "none", text: "기준 없음" };
  else baseline = { kind: "value", text: fmt(c.baseline) };
  // n=0인 쪽의 값은 믿지 않으므로 차이도 보이지 않는다.
  let delta: Cell;
  if (cUnc || bUnc || c.delta === null || c.delta === undefined) delta = { kind: "none", text: "비교 못 함" };
  else delta = { kind: "value", text: (c.delta > 0 ? "+" : "") + fmt(c.delta) };
  const worseKnown = !cUnc && !bUnc && typeof c.worse === "boolean";
  return {
    key: `${index}`,
    role: c.role,
    name: c.name,
    group: c.group || "OTHER",
    sliceKind: slice.kind,
    sliceLabel: slice.kind === "ALL" ? "전체" : `${slice.kind}: ${slice.value}`,
    candidate,
    candidateN: c.candidate_n === undefined ? "미기재" : String(c.candidate_n),
    baseline,
    baselineN: c.baseline_n === undefined || c.baseline_n === null ? "—" : String(c.baseline_n),
    delta,
    worse: worseKnown && c.worse === true,
    worseKnown,
    direction: c.higher_is_better ? "높을수록 좋음" : "낮을수록 좋음",
    sortCandidate: cUnc ? null : c.candidate,
    sortDelta: delta.kind === "value" ? (c.delta as number) : null,
  };
}

function cmpNum(a: number | null, b: number | null): number {
  if (a === null && b === null) return 0;
  if (a === null) return 1;
  if (b === null) return -1;
  return a - b;
}

/** SAFETY가 항상 맨 위. 그룹 안에서만 정렬한다. */
export function reportView(input: ReportViewRequest): ReportView {
  v.assertValid(v.ReportViewRequest, input, "report_view");
  const all = input.comparisons.map(toRow);
  const rows = all.filter((r) => input.sliceKind === "ALL_KINDS" || r.sliceKind === input.sliceKind);
  const groups: ReportView["groups"] = [];
  const unknown = [...new Set(rows.map((r) => r.group))].filter((g) => !GROUP_ORDER.includes(g));
  for (const g of [...GROUP_ORDER, ...unknown]) {
    const gr = rows.filter((r) => r.group === g);
    if (!gr.length) continue;
    gr.sort((a, b) => a.role.localeCompare(b.role)); // A/B를 나란히 묶는다(안정 정렬이라 보고서 순서는 역할 안에서 유지)
    if (input.sort === "name") gr.sort((a, b) => a.name.localeCompare(b.name) || a.role.localeCompare(b.role));
    else if (input.sort === "candidate") gr.sort((a, b) => cmpNum(a.sortCandidate, b.sortCandidate));
    else if (input.sort === "delta") gr.sort((a, b) => cmpNum(a.sortDelta, b.sortDelta));
    else if (input.sort === "worse") gr.sort((a, b) => Number(b.worse) - Number(a.worse));
    groups.push({ group: g, label: GROUP_LABEL[g] ?? `${g} (새 그룹)`, rows: gr });
  }
  return {
    groups,
    sliceKinds: [...new Set(input.comparisons.map((c) => c.slice?.kind ?? "ALL"))],
    worseCount: all.filter((r) => r.worse).length,
  };
}
