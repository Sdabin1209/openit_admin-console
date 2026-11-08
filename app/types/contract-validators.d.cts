interface ErrorObject { instancePath: string; message?: string; keyword: string }
interface V { (data: unknown): boolean; errors?: ErrorObject[] | null }
export const ActionExtractionInput: V;
export const ActionExtraction: V;
export const ResponseRequest: V;
export const ResponseText: V;
export const ApprovalRequest: V;
export const ActivateRequest: V;
export const RollbackRequest: V;
export const CaseReviewRequest: V;
export const ListEnvelope: V;
export const OpsFeedbackReviewTrace: V;
export const OpsFeedbackDeidentifiedTrace: V;
export const ImageLabels: V;
export const BuildImageRequest: V;
export const BuildImageResult: V;
export const SetupEnvReport: V;
export const Exposure: V;
export const PushSubscriptionRequest: V;
export const HealthStatus: V;
export const PushConfig: V;
export const StaffPushPayload: V;
export const PIPELINE_SCHEMA_VERSION: string;
export const CONTRACT_VERSION: string;
export const ACTION_RULES_VERSION: string;
// 계약 JSON 공통 규칙(CONVENTIONS 10절) 점검: scripts/ijson-check.cjs, 한도는 gen-schemas.mjs 가 고정 태그 strict_json.py 에서 읽어 넣는다
export const ijson: {
  valueProblem(value: unknown): string | null;
  textProblem(text: string): string | null;
  limits: { maxDepth: number; maxBytes: number; maxNodes: number; maxSafeInt: number };
};
