interface ErrorObject { instancePath: string; message?: string; keyword: string }
interface V { (data: unknown): boolean; errors?: ErrorObject[] | null }
export const ActionExtractionInput: V;
export const ActionExtraction: V;
export const ResponseRequest: V;
export const ResponseText: V;
export const ApprovalRequest: V;
export const ActivateRequest: V;
export const CaseReviewRequest: V;
export const ListEnvelope: V;
export const OpsFeedbackDeidentifiedTrace: V;
export const ImageLabels: V;
export const PIPELINE_SCHEMA_VERSION: string;
