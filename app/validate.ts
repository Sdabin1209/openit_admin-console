// 검토자가 쓴 값을 계약 패키지 스키마(생성된 검증기)로 전송 전에 검사한다. 값은 오류 문구에 싣지 않는다.
import * as v from "../generated/contract-validators.cjs";
import type { ExpectedKind } from "../api/types.ts";

export type Parsed = { ok: true; value: Record<string, unknown> } | { ok: false; errors: string[] };

export function parseObject(text: string): Parsed {
  let x: unknown;
  try {
    x = JSON.parse(text);
  } catch {
    return { ok: false, errors: ["JSON 문법이 맞지 않는다."] };
  }
  if (!x || typeof x !== "object" || Array.isArray(x)) return { ok: false, errors: ["JSON 객체여야 한다."] };
  return { ok: true, value: x as Record<string, unknown> };
}

function check(fn: typeof v.ActionExtraction, value: unknown): string[] {
  if (fn(value)) return [];
  const errs = (fn.errors ?? []).slice(0, 8).map((e) => `${e.instancePath || "(최상위)"}: ${e.message ?? e.keyword}`);
  return errs.length ? errs : ["스키마에 맞지 않는다."];
}

/** LORA_A면 ActionExtractionInput, LORA_B면 ResponseRequest. */
export function validateInput(kind: ExpectedKind, value: unknown): string[] {
  return check(kind === "LORA_A" ? v.ActionExtractionInput : v.ResponseRequest, value);
}
/** LORA_A면 ActionExtraction(객체), LORA_B면 ResponseText(문자열). */
export function validateExpected(kind: ExpectedKind, value: unknown): string[] {
  return check(kind === "LORA_A" ? v.ActionExtraction : v.ResponseText, value);
}
