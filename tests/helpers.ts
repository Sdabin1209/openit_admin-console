import type { AddressInfo } from "node:net";
import { GateClient } from "../app/wiring/gateway.ts";
import { CasesClient } from "../app/wiring/gateway.ts";
import { CasesController } from "../app/wiring/cases_controller.ts";
import { Controller } from "../app/wiring/approvals_controller.ts";
import { createMock, type MockHandle } from "./mock-server/server.ts";

export const FIXED_NOW = "2026-10-20T00:00:00Z";

export async function startMock(slowMs = 150, opts: { gatewayUser?: string; now?: () => string } = {}): Promise<{ mock: MockHandle; base: string; close: () => Promise<void>; client: GateClient; ctl: () => Controller; cases: () => CasesController }> {
  // 기본: 게이트웨이가 X-Openit-User를 붙이는 것을 모의 서버가 흉내 낸다.
  // 시각은 고정 시계(시험이 다른 시각을 줄 수 있다). 실제 시각에 기대지 않는다.
  const mock = createMock({ now: opts.now ?? (() => FIXED_NOW), slowMs, gatewayUser: opts.gatewayUser ?? "gw-user-1" });
  await new Promise<void>((r) => mock.server.listen(0, "127.0.0.1", r));
  const base = `http://127.0.0.1:${(mock.server.address() as AddressInfo).port}`;
  const client = new GateClient({ baseUrl: base });
  return { cases: () => new CasesController(new CasesClient({ baseUrl: base })), mock, base, client, ctl: () => new Controller(client), close: () => new Promise((r) => { mock.server.close(() => r()); mock.server.closeAllConnections(); }) };
}

/** 조건 대기: 시간은 실패 상한일 뿐 통과 조건이 아니다. 조건이 참이 되는 즉시 돌아온다. */
export async function waitFor(cond: () => unknown, what = "조건", limitMs = 15000 /* 부하에서도 실패하지 않을 넉넉한 상한, 측정 안 함(docs/adr/0010) */): Promise<void> {
  const end = Date.now() + limitMs;
  for (;;) {
    let ok = false;
    try { ok = !!cond(); } catch { ok = false; }
    if (ok) return;
    if (Date.now() > end) throw new Error(`waitFor 시간 초과: ${what}`);
    await new Promise((r) => setTimeout(r, 5));
  }
}

// 시험용 얇은 HTTP 도구: link_http_send를 옛 Http.json 모양(status, data, headers)으로 감싸 오류를 ApiError로 던진다.
import { createHttpSend, type HttpPorts } from "../app/components/link_http_send.ts";
import { unwrap } from "../app/wiring/api_error.ts";
export { ApiError } from "../app/wiring/api_error.ts";
export { toError } from "../app/components/link_http_send.ts";
export class Http {
  private readonly send;
  constructor(opts: HttpPorts & { baseUrl?: string; timeoutMs?: number } = {}) {
    this.send = createHttpSend({ baseUrl: opts.baseUrl ?? "", timeoutMs: opts.timeoutMs ?? 15000 }, opts);
  }
  async json(method: "GET" | "POST", path: string, body?: unknown) {
    const r = await this.send({ method, path, ...(body === undefined ? {} : { body }) } as never);
    if (!r.ok) return unwrap(r);
    return r;
  }
}

// 앱 소스 파일(생성물 app/types 제외)의 리포 기준 경로. 위생 시험이 소스를 검색한다.
import { readdirSync } from "node:fs";
export function appSourceFiles(): string[] {
  const walk = (d: string): string[] => readdirSync(new URL(`../${d}`, import.meta.url), { withFileTypes: true }).flatMap((e) =>
    e.isDirectory() ? (`${d}/${e.name}` === "app/types" ? [] : walk(`${d}/${e.name}`)) : e.name.endsWith(".ts") ? [`${d}/${e.name}`] : []);
  return walk("app");
}
