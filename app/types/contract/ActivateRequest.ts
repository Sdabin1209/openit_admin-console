/* 생성물: scripts/gen-types.mjs (직접 고치지 않는다). 원본: schemas/ 또는 고정 태그의 계약 스키마 */
/**
 * POST /v1/activate 본문(I5). 만드는 쪽: admin-console. 읽는 쪽: release-gate. 행위자는 본문이 아니라 X-Openit-User로 기록된다(HTTP.md I5, D88).
 */
export interface ActivateRequest {
  release_id: string;
  requested_by_role: "operator";
}
