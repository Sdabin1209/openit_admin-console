import type { AddressInfo } from "node:net";
import { GateClient } from "../api/client.ts";
import { Controller } from "../app/controller.ts";
import { createMock, type MockHandle } from "../mock-server/server.ts";

export async function startMock(slowMs = 150): Promise<{ mock: MockHandle; base: string; close: () => Promise<void>; client: GateClient; ctl: () => Controller }> {
  const mock = createMock({ slowMs });
  await new Promise<void>((r) => mock.server.listen(0, "127.0.0.1", r));
  const base = `http://127.0.0.1:${(mock.server.address() as AddressInfo).port}`;
  const client = new GateClient({ baseUrl: base });
  return { mock, base, client, ctl: () => new Controller(client), close: () => new Promise((r) => { mock.server.close(() => r()); mock.server.closeAllConnections(); }) };
}
