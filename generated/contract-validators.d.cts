interface ErrorObject { instancePath: string; message?: string; keyword: string }
interface V { (data: unknown): boolean; errors?: ErrorObject[] | null }
export const ActionExtractionInput: V;
export const ActionExtraction: V;
export const ResponseRequest: V;
export const ResponseText: V;
