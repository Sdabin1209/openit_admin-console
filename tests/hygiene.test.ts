// 비밀·개인정보·외부 CDN·이미지 규약을 소스에서 확인한다.
import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync, readdirSync, existsSync } from "node:fs";

const read = (p: string) => readFileSync(new URL(`../${p}`, import.meta.url), "utf8");
const srcFiles = [...readdirSync(new URL("../app/", import.meta.url)).map((f) => `app/${f}`), ...readdirSync(new URL("../api/", import.meta.url)).map((f) => `api/${f}`)];

test("브라우저 저장소·콘솔·innerHTML·토큰을 쓰지 않는다", () => {
  for (const f of srcFiles) {
    const t = read(f).replace(/\/\/.*$/gm, "");
    assert.ok(!/localStorage|sessionStorage|indexedDB|document\.cookie/.test(t), `${f}: 저장소`);
    assert.ok(!/console\.(log|info|warn|error|debug)/.test(t), `${f}: 콘솔`);
    assert.ok(!/innerHTML|outerHTML|insertAdjacentHTML|eval\(/.test(t), `${f}: HTML 주입`);
    assert.ok(!/Authorization|Bearer|TOKEN/i.test(t.replace(/\/\/.*$/gm, "")), `${f}: 토큰`);
  }
});

test("외부 CDN 참조가 없다", () => {
  for (const f of [...srcFiles, "app/index.html"]) assert.ok(!/https?:\/\//.test(read(f).replace(/\/\/.*$/gm, "")), `${f}: 외부 주소`);
});

test("Dockerfile: non-root, 라벨, 잠금 파일 설치, 태그 고정", () => {
  const d = read("Dockerfile");
  assert.match(d, /^USER\s+(?!root)\S+/m);
  for (const k of ["io.openit.service", "io.openit.revision", "io.openit.contracts.boundary", "io.openit.contracts.survey-schema", "io.openit.turn-engine", "io.openit.model-runtime"]) assert.ok(d.includes(k), k);
  assert.match(d, /npm ci/);
  assert.ok(!/:latest/.test(d));
  assert.match(d, /COPY generated/);
  assert.ok(existsSync(new URL("../package-lock.json", import.meta.url)));
  assert.ok(!/(TOKEN|SECRET|PASSWORD)\s*=/.test(d));
});
