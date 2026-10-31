// 컴포넌트 case_review_draft: CaseReviewForm -> 결과(CaseReviewDraft | FormIssues). 검토자가 쓴 글을 보내도 되는 검토 내용으로 바꾼다.
// 종류별 모델 입출력 검사(ActionExtraction 등)는 출력 스키마 CaseReviewDraft가 계약 스키마를 가리켜 한다. 값은 오류 문구에 싣지 않는다(검토자 입력에 개인정보가 있을 수 있다).
import * as v from "../types/validators.cjs";
import type { CaseReviewForm } from "../types/CaseReviewForm.ts";
import type { CaseReviewDraft } from "../types/CaseReviewDraft.ts";

export type Result = { ok: true; value: CaseReviewDraft } | { ok: false; issues: { path: string; message: string }[] };

type Parsed = { ok: true; value: Record<string, unknown> } | { ok: false; message: string };
// 텍스트가 JSON인지는 스키마로 쓸 수 없다(schemas/README.md 스키마 밖 조건).
function parseObject(text: string): Parsed {
  let x: unknown;
  try {
    x = JSON.parse(text);
  } catch {
    return { ok: false, message: "JSON 문법이 맞지 않는다." };
  }
  if (!x || typeof x !== "object" || Array.isArray(x)) return { ok: false, message: "JSON 객체여야 한다." };
  return { ok: true, value: x as Record<string, unknown> };
}

export function caseReviewDraft(form: CaseReviewForm): Result {
  if (!v.CaseReviewForm(form)) {
    const out = { issues: v.issues(v.CaseReviewForm).filter((i) => i.keyword !== "if").map((i) => ({ path: i.path || "/", message: i.path === "/kind" ? "입력을 쓰려면 종류(LORA_A/LORA_B)를 고르라." : `입력이 맞지 않는다: ${i.message}` })) };
    return { ok: false, issues: v.assertValid(v.FormIssues, out, "case_review_draft").issues };
  }
  if (form.status !== "CONFIRMED") return { ok: true, value: v.assertValid(v.CaseReviewDraft, { review_status: form.status }, "case_review_draft") };
  const out: Record<string, unknown> = { review_status: "CONFIRMED" };
  const issues: { path: string; message: string }[] = [];
  const hasInput = form.inputText.trim() !== "";
  const hasExpected = form.expectedText.trim() !== "";
  if (form.kind && (hasInput || hasExpected)) {
    out.expected_kind = form.kind;
    if (hasInput) {
      const p = parseObject(form.inputText);
      if (p.ok) out.reviewed_input = p.value;
      else issues.push({ path: "/reviewed_input", message: `고쳐 쓴 입력: ${p.message}` });
    }
    if (hasExpected) {
      if (form.kind === "LORA_B") out.expected = form.expectedText.trim(); // ResponseText: JSON이 아니라 응답 문장 그대로(문자열)
      else {
        const p = parseObject(form.expectedText);
        if (p.ok) out.expected = p.value;
        else issues.push({ path: "/expected", message: `정답: ${p.message}` });
      }
    }
  }
  // 파싱에 실패한 필드는 빼고 나머지만 계약 스키마로 본다(오류는 필드마다 따로 보인다).
  if (!v.CaseReviewDraft(out)) {
    const label: Record<string, string> = { reviewed_input: "고쳐 쓴 입력", expected: "정답" };
    const per: Record<string, number> = {};
    for (const i of v.issues(v.CaseReviewDraft)) {
      const m = /^\/(reviewed_input|expected)(\/.*)?$/.exec(i.path);
      if (!m || i.keyword === "if") continue;
      per[m[1]] = (per[m[1]] ?? 0) + 1;
      if (per[m[1]] <= 8) issues.push({ path: i.path, message: `${label[m[1]]} ${m[2] || "(최상위)"}: ${i.message}` });
    }
    if (!issues.length) issues.push({ path: "/", message: "스키마에 맞지 않는다." });
  }
  if (issues.length) return { ok: false, issues: v.assertValid(v.FormIssues, { issues }, "case_review_draft").issues };
  return { ok: true, value: out as CaseReviewDraft };
}
