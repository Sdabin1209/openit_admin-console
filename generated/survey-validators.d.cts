interface ErrorObject { instancePath: string; message?: string; keyword: string }
interface V { (data: unknown): boolean; errors?: ErrorObject[] | null }
export const UtteranceParserInput: V;
export const ResponseGeneratorInput: V;
export const ParserOutput: V;
export const GeneratorOutput: V;
