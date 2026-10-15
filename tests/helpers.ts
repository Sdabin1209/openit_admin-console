import type { AddressInfo } from "node:net";
import { GateClient } from "../api/client.ts";
import { Controller } from "../app/controller.ts";
import { createMock, type MockHandle } from "../mock-server/server.ts";

export async function startMock(slowMs = 150, opts: { gatewayUser?: string; dev?: string } = {}): Promise<{ mock: MockHandle; base: string; close: () => Promise<void>; client: GateClient; ctl: () => Controller }> {
  // 기본: 게이트웨이가 X-Openit-User를 붙이는 것을 모의 서버가 흉내 낸다.
  const mock = createMock({ slowMs, gatewayUser: "dev" in opts ? undefined : (opts.gatewayUser ?? "gw-user-1") });
  await new Promise<void>((r) => mock.server.listen(0, "127.0.0.1", r));
  const base = `http://127.0.0.1:${(mock.server.address() as AddressInfo).port}`;
  const client = new GateClient({ baseUrl: base });
  return { mock, base, client, ctl: () => new Controller(client, opts.dev ?? null), close: () => new Promise((r) => { mock.server.close(() => r()); mock.server.closeAllConnections(); }) };
}
