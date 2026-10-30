// 컴포넌트 case_trace_prefill: TracePrefillInput -> TracePrefill. 비식별 trace의 해당 입력을 편집창에 채울 글로 바꾼다. 검토자가 개인정보 없는 문장으로 고쳐 써야 한다.
import * as v from "../types/validators.cjs";
import type { TracePrefillInput } from "../types/TracePrefillInput.ts";
import type { TracePrefill } from "../types/TracePrefill.ts";

export function caseTracePrefill(input: TracePrefillInput): TracePrefill {
  v.assertValid(v.TracePrefillInput, input, "case_trace_prefill");
  const src = (input.trace as Record<string, unknown>)[input.kind === "LORA_A" ? "extract_input" : "response_input"];
  const out: TracePrefill = { inputText: src && typeof src === "object" ? JSON.stringify(src, null, 2) : null };
  return v.assertValid(v.TracePrefill, out, "case_trace_prefill");
}
