/* 생성물: scripts/gen-types.mjs (직접 고치지 않는다). 원본: schemas/ 또는 고정 태그의 계약 스키마 */
/**
 * ops_request의 입력: 릴리스 운영 화면의 확인 단계 폼. 롤백에는 사유, 근거 ID 하나 이상, 현재 활성 릴리스가 필요하다. requestId와 requestedAt은 호출자가 정해 넘긴다(같은 입력이면 같은 출력).
 */
export interface OpsRequestInput {
  kind: "activate" | "rollback";
  target: string;
  reason: string;
  evidenceText: string;
  requestId: string;
  requestedAt: string;
  pointerReleaseId: string | null;
}
