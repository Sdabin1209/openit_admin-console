/* 생성물: scripts/gen-types.mjs (직접 고치지 않는다). 원본: schemas/ 또는 고정 태그의 계약 스키마 */
/**
 * case_trace_prefill의 입력: 비식별 trace와 고른 종류.
 */
export interface TracePrefillInput {
  trace: {};
  kind: "LORA_A" | "LORA_B";
}
