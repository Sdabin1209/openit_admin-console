// U422: 시험 코드에 실제 시간을 기다리거나 재는 곳이 없다. 유일한 예외는 helpers.ts의 매달림 감시(HANG_GUARD_SECONDS)와 개발용 mock-server/main.ts.
import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync, readdirSync } from "node:fs";

const dir = new URL("./", import.meta.url);
const PATTERN = /setTimeout|setInterval|performance\.now|Date\.now|new Date\(/;
const ALLOWED: Record<string, RegExp> = {
  "helpers.ts": /Date\.now\(\)/, // 매달림 감시(waitFor)
  "mock-server/main.ts": /new Date\(/, // 개발용 실행(npm run mock). 시험은 now를 주입한다
};

test("시험 코드의 시계 사용은 허용 목록(매달림 감시, 개발용 실행)뿐이다", () => {
  const files = [...readdirSync(dir).filter((f) => f.endsWith(".ts")), ...readdirSync(new URL("mock-server/", dir)).map((f) => `mock-server/${f}`)];
  for (const f of files) {
    if (f === "timing.test.ts") continue;
    const src = readFileSync(new URL(f, dir), "utf8").split("\n").filter((l) => !l.trim().startsWith("//"));
    for (const line of src) if (PATTERN.test(line)) assert.ok(ALLOWED[f]?.test(line), `${f}: 허용 목록에 없는 시계 사용: ${line.trim().slice(0, 80)}`);
  }
});

test("컴포넌트는 시계를 직접 읽거나 기다리지 않는다(시계 주입, ADR 0023)", () => {
  for (const f of readdirSync(new URL("../app/components/", import.meta.url)).filter((x) => x.endsWith(".ts"))) {
    const src = readFileSync(new URL(`../app/components/${f}`, import.meta.url), "utf8").split("\n").filter((l) => !l.trim().startsWith("//") && !l.trim().startsWith("/**"));
    for (const line of src) assert.ok(!/setTimeout\(|setInterval\(|Date\.now|performance\.now/.test(line), `${f}: ${line.trim().slice(0, 80)}`);
  }
});
