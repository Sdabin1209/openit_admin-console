// 계약 스키마(boundary-contracts)로 생성한 검증기를 api/ 에서 쓰는 자리. 생성: scripts/gen-schemas.mjs (생성물 generated/ 는 직접 고치지 않는다).
// 왜 손으로 검사하지 않나: 키 집합·형식을 코드가 따로 들고 있으면 계약이 바뀔 때 조용히 어긋난다(D107, R6). 스키마가 정본이다.
import * as v from "../generated/contract-validators.cjs";
import { ApiError, need } from "./http.ts";

/** 계약 버전 상수. 정본은 계약 schemas_api.py이고 생성 때 읽어 온다. 손으로 복사하지 않는다. */
export const PIPELINE_SCHEMA_VERSION: string = v.PIPELINE_SCHEMA_VERSION;
/** 이 코드가 만들어진 계약 태그(생성 검증기의 원본). 이미지 라벨 io.openit.contracts.boundary의 출처다(U50). */
export const CONTRACT_VERSION: string = v.CONTRACT_VERSION;
/** 계약 ActionExtractionRules.rules_version. 매니페스트의 action_rules_version 값이다. */
export const ACTION_RULES_VERSION: string = v.ACTION_RULES_VERSION;

type Validator = ((x: unknown) => boolean) & { errors?: { instancePath: string; message?: string; keyword: string }[] | null };
type Name = "ApprovalRequest" | "ActivateRequest" | "CaseReviewRequest" | "ListEnvelope" | "OpsFeedbackDeidentifiedTrace";

// 왜 값을 싣지 않나: 본문과 trace에는 검토자가 쓴 글이 들어 있을 수 있다. 위치와 규칙 이름만 말한다.
function problems(fn: Validator): string {
  return (fn.errors ?? []).slice(0, 3).map((e) => `${e.instancePath || "(최상위)"} ${e.message ?? e.keyword}`).join("; ") || "스키마에 맞지 않는다";
}

/** 서버로 보내기 전에 요청 본문을 계약 스키마로 검사한다. 어긋나면 보내지 않는다(이 영역의 코드 결함이므로 서버 오류와 구분해 INVALID_RECORD). */
export function assertRequest(name: Extract<Name, "ApprovalRequest" | "ActivateRequest" | "CaseReviewRequest">, body: unknown): void {
  const fn = v[name] as Validator;
  if (!fn(body)) throw new ApiError("INVALID_RECORD", 0, `보내려는 ${name}이 계약에 맞지 않아 보내지 않았다: ${problems(fn)}`);
}

/** 응답을 계약 스키마로 검사한다. 어긋나면 BAD_RESPONSE. */
export function assertResponse<T>(name: Extract<Name, "OpsFeedbackDeidentifiedTrace">, data: unknown): T {
  const fn = v[name] as Validator;
  need(fn(data), `${name}: ${problems(fn)}`);
  return data as T;
}

/** 목록 봉투(HTTP.md 공통 규칙)를 검사해 items와 다음 쪽 커서를 낸다. 호출별 원소 모양은 호출자가 따로 검사한다. */
export function readEnvelope(data: unknown, what: string): { items: unknown[]; next: string | null } {
  const fn = v.ListEnvelope as Validator;
  need(fn(data), `${what} 목록 봉투: ${problems(fn)}`);
  const d = data as { items: unknown[]; next_cursor: string | null };
  return { items: d.items, next: d.next_cursor };
}
