/* 생성물: scripts/gen-types.mjs (직접 고치지 않는다). 원본: schemas/ 또는 고정 태그의 계약 스키마 */
/**
 * POST /v1/activate 본문(I5). 만드는 쪽: admin-console. 읽는 쪽: release-gate. 행위자는 본문이 아니라 X-Openit-User로 기록된다(HTTP.md I5, D88).
 */
export interface ActivateRequest {
  /**
   * 근거: 길이 상한 128 은 설계 상한(CONVENTIONS 2절, 측정 안 함)
   */
  release_id: string;
  /**
   * Optional audit claim; authorization comes from the authenticated token.
   */
  requested_by_role?: "operator";
}
