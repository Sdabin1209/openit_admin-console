/* 생성물: scripts/gen-types.mjs (직접 고치지 않는다). 원본: schemas/ 또는 고정 태그의 계약 스키마 */
/**
 * 실패 사례(FailureCase의 읽기용 투영). 모르는 값과 필드는 받는다.
 */
export interface CaseRecord {
  pipeline_schema_version?: string;
  case_id: string;
  version: number;
  created_at?: string;
  source_release_id?: string;
  runtime_contract_version?: number;
  deidentified?: boolean;
  deidentified_trace_ref: string;
  failure_type: string;
  detection_method?: string;
  review_status: string;
  expected?: {} | string;
  expected_kind?: string;
  reviewed_input?: {};
  question_set?: ArtifactRef;
  ext?: {};
}
/**
 * 산출물 참조(문항 세트·LoRA). 화면은 id와 version만 보이고 모르는 필드는 보존한다.
 */
export interface ArtifactRef {
  id: string;
  version: string;
  content_hash: string;
}
