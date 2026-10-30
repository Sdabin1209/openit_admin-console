// 개발용: 모의 게이트 + dist 정적 서빙. PORT 기본 0(빈 포트)이고 실제 주소를 출력한다.
import { resolve } from "node:path";
import type { AddressInfo } from "node:net";
import { createMock } from "./server.ts";

const mock = createMock({ staticDir: resolve("dist"), gatewayUser: "mock-user", now: () => new Date().toISOString().replace(/\.\d+Z$/, "Z") /* 개발용 실행만. 시험은 now를 주입한다 */ });
mock.server.listen(Number(process.env.PORT ?? 0), "127.0.0.1", () => {
  console.log(`mock gate: http://127.0.0.1:${(mock.server.address() as AddressInfo).port}/`);
});
