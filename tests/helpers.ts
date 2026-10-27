import type { AddressInfo } from "node:net";
import { GateClient } from "../api/client.ts";
import { CasesClient } from "../api/cases.ts";
import { CasesController } from "../app/cases-controller.ts";
import { Controller } from "../app/controller.ts";
import { createMock, type MockHandle } from "../mock-server/server.ts";

export async function startMock(slowMs = 150, opts: { gatewayUser?: string; dev?: string } = {}): Promise<{ mock: MockHandle; base: string; close: () => Promise<void>; client: GateClient; ctl: () => Controller; cases: () => CasesController }> {
  // 기본: 게이트웨이가 X-Openit-User를 붙이는 것을 모의 서버가 흉내 낸다.
  const mock = createMock({ slowMs, gatewayUser: "dev" in opts ? undefined : (opts.gatewayUser ?? "gw-user-1") });
  await new Promise<void>((r) => mock.server.listen(0, "127.0.0.1", r));
  const base = `http://127.0.0.1:${(mock.server.address() as AddressInfo).port}`;
  const client = new GateClient({ baseUrl: base });
  return { cases: () => new CasesController(new CasesClient({ baseUrl: base })), mock, base, client, ctl: () => new Controller(client, opts.dev ?? null), close: () => new Promise((r) => { mock.server.close(() => r()); mock.server.closeAllConnections(); }) };
}

/** 조건 대기: 시간은 실패 상한일 뿐 통과 조건이 아니다. 조건이 참이 되는 즉시 돌아온다. */
export async function waitFor(cond: () => unknown, what = "조건", limitMs = 15000): Promise<void> {
  const end = Date.now() + limitMs;
  for (;;) {
    let ok = false;
    try { ok = !!cond(); } catch { ok = false; }
    if (ok) return;
    if (Date.now() > end) throw new Error(`waitFor 시간 초과: ${what}`);
    await new Promise((r) => setTimeout(r, 5));
  }
}
