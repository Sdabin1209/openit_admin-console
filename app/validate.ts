// 검토자가 쓴 JSON을 문진 스키마(생성된 검증기)로 전송 전에 검사한다. 값은 오류 문구에 싣지 않는다.
import * as v from "../generated/survey-validators.cjs";
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

function check(fn: typeof v.ParserOutput, value: unknown): string[] {
  if (fn(value)) return [];
  const errs = (fn.errors ?? []).slice(0, 8).map((e) => `${e.instancePath || "(최상위)"}: ${e.message ?? e.keyword}`);
  return errs.length ? errs : ["스키마에 맞지 않는다."];
}

export function validateInput(kind: ExpectedKind, value: unknown): string[] {
  return check(kind === "PARSER" ? v.UtteranceParserInput : v.ResponseGeneratorInput, value);
}
export function validateExpected(kind: ExpectedKind, value: unknown): string[] {
  return check(kind === "PARSER" ? v.ParserOutput : v.GeneratorOutput, value);
}
