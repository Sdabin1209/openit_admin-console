/* 생성물: scripts/gen-types.mjs (직접 고치지 않는다). 원본: schemas/ 또는 고정 태그의 계약 스키마 */
/**
 * link_gate_list_awaiting의 입력: 다음 쪽 커서(없으면 첫 쪽)와 쪽 크기. 계약 목록 규칙의 최대 쪽 크기는 500.
 */
export interface ListAwaitingInput {
  cursor?: string;
  limit?: number;
}
