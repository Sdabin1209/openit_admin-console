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
