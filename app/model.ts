// 보고서를 화면용 모델로 바꾼다. DOM 없음. 합격/불합격을 판단하지 않는다(D53): worse는 참고 표시일 뿐이다.
import type { Comparison, ReviewReport } from "../api/types.ts";

export type Cell =
  | { kind: "value"; text: string }
  | { kind: "uncomputable"; text: string } // n=0: 계산 못 함
  | { kind: "none"; text: string }; // 기준 없음, 비교 못 함

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
  worse: boolean; // 나빠짐(참고). null은 false로 두되 worseKnown으로 구분
  worseKnown: boolean;
  direction: string;
  sortCandidate: number | null;
  sortDelta: number | null;
}

export interface MetricGroup { group: string; label: string; rows: MetricRow[] }

export const GROUP_ORDER = ["SAFETY", "ACCURACY", "PROTECTION", "ROBUSTNESS", "COVERAGE", "REGRESSION", "OTHER"];
const GROUP_LABEL: Record<string, string> = {
  SAFETY: "안전 (SAFETY)", ACCURACY: "정확도", PROTECTION: "출력 보호", ROBUSTNESS: "견고성",
  COVERAGE: "범위", REGRESSION: "회귀", OTHER: "기타",
};

export function fmt(x: number): string {
  if (Number.isInteger(x)) return String(x);
  return String(Math.round(x * 10000) / 10000);
}

export function toRow(c: Comparison, index: number): MetricRow {
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
    group: c.group || "OTHER", // 모르는 그룹 이름도 그대로 둔다(아래 buildGroups가 기타 뒤에 보인다)
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

export type SortKey = "default" | "name" | "candidate" | "delta" | "worse";

export interface ViewOptions { sliceKind: string | "ALL_KINDS"; sort: SortKey }

function cmpNum(a: number | null, b: number | null): number {
  if (a === null && b === null) return 0;
  if (a === null) return 1;
  if (b === null) return -1;
  return a - b;
}

/** SAFETY가 항상 맨 위. 그룹 안에서만 정렬한다. */
export function buildGroups(report: ReviewReport, opts: ViewOptions): MetricGroup[] {
  const rows = report.comparisons.map(toRow).filter((r) => opts.sliceKind === "ALL_KINDS" || r.sliceKind === opts.sliceKind);
  const groups: MetricGroup[] = [];
  const unknown = [...new Set(rows.map((r) => r.group))].filter((g) => !GROUP_ORDER.includes(g));
  for (const g of [...GROUP_ORDER, ...unknown]) {
    const gr = rows.filter((r) => r.group === g);
    if (!gr.length) continue;
    gr.sort((a, b) => a.role.localeCompare(b.role)); // A/B를 나란히 묶는다(안정 정렬이라 보고서 순서는 역할 안에서 유지)
    if (opts.sort === "name") gr.sort((a, b) => a.name.localeCompare(b.name) || a.role.localeCompare(b.role));
    else if (opts.sort === "candidate") gr.sort((a, b) => cmpNum(a.sortCandidate, b.sortCandidate));
    else if (opts.sort === "delta") gr.sort((a, b) => cmpNum(a.sortDelta, b.sortDelta));
    else if (opts.sort === "worse") gr.sort((a, b) => Number(b.worse) - Number(a.worse));
    groups.push({ group: g, label: GROUP_LABEL[g] ?? `${g} (새 그룹)`, rows: gr });
  }
  return groups;
}

export function sliceKinds(report: ReviewReport): string[] {
  return [...new Set(report.comparisons.map((c) => c.slice?.kind ?? "ALL"))];
}

export function worseCount(report: ReviewReport): number {
  return report.comparisons.map(toRow).filter((r) => r.worse).length;
}
