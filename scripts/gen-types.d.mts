export const CONTRACT_TYPES: string[];
export function internalNames(): string[];
export function contractSchemas(): Record<string, string>;
export function loadAjv(): import("ajv/dist/2020.js").default;
export function generate(): Promise<Record<string, string>>;
