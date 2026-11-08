export function pinnedTag(dockerfile?: URL): string;
export class ContractSource {
  constructor(o?: { repo?: string; tag?: string });
  repo: string;
  tag: string;
  available(): boolean;
  read(rel: string): string;
  json(rel: string): any;
  list(dir: string): string[];
}
export const contract: ContractSource;
export function resolveRepo(tag: string, o?: { name?: string; env?: string; remote?: string; timeoutMs?: number }): string;
export const SURVEY_SCHEMA_TAG: string;
export function surveySchemaJson(name: string): any;
export const REMOTE_TIMEOUT_MS: number;
export function workspaceDirs(repoRoot?: string): string[];
export function repoRootFrom(moduleUrl: string | URL): string;
export function registerContractStableUris(ajv: any, src?: ContractSource): void;
