/* 생성물: scripts/gen-types.mjs (직접 고치지 않는다). 원본: schemas/ 또는 고정 태그의 계약 스키마 */
/**
 * time_display의 입력: 서버가 준 시각 원문(없을 수 있음)과 선택적 시간대.
 */
export interface TimeInput {
  iso: string | null;
  timeZone?: string;
}
