/* 생성물: scripts/gen-types.mjs (직접 고치지 않는다). 원본: schemas/ 또는 고정 태그의 계약 스키마 */
/**
 * 운영 관측이 게이트에 보내는 롤백 요청. 요청만 하며 활성 포인터는 게이트만 바꾼다.
 */
export interface RollbackRequest {
  pipeline_schema_version: string;
  request_id: string;
  requested_at: string;
  from_release_id: string;
  to_release_id: string;
  reason: string;
  /**
   * 근거 식별자. 요청하는 영역(ops-feedback)이 해석하는 불투명한 Id(지표 스냅샷, FailureCase.case_id 등)이고 게이트는 해석하지 않고 기록만 한다.
   *
   * @minItems 1
   */
  evidence_refs: [string, ...string[]];
  requested_by_role: string;
  /**
   * 영역이 계약을 바꾸지 않고 덧붙이는 부가 정보. 키는 영역 이름(예: 'model-lab')이고 값은 그 영역이 정한다. 다른 영역은 이해하지 못해도 보존하고 전달해야 하며, 판단에 쓰지 않는다. 여러 영역이 필요로 하게 되면 정식 필드로 올린다.
   */
  ext?: {};
}
