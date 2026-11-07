// 비밀·개인정보·외부 CDN·이미지 규약을 소스에서 확인한다.
import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync, readdirSync, existsSync } from "node:fs";

const read = (p: string) => readFileSync(new URL(`../${p}`, import.meta.url), "utf8");
import { appSourceFiles } from "./helpers.ts";
const srcFiles = appSourceFiles();

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

test("Dockerfile: 이미지가 자기 /healthz 를 보는 HEALTHCHECK 를 가진다(CONVENTIONS 13절 3.4.17)", () => {
  const d = read("Dockerfile").replace(/\\\n\s*/g, " ");
  const h = d.match(/^HEALTHCHECK\s+(.*)$/m)?.[1] ?? "";
  assert.ok(h, "HEALTHCHECK 없음");
  assert.match(h, /--interval=\d+s/);
  assert.match(h, /--timeout=\d+s/);
  assert.match(h, /CMD \["\/usr\/local\/bin\/frontend-healthcheck"\]/);
  assert.match(read("serve/healthcheck.sh"), /:8080\/healthz/);                       // caddy:alpine 에는 curl 이 없다
  assert.match(read("serve/healthcheck.sh"), /\$\{ADMIN_HOST:-0\.0\.0\.0\}/);                   // 서버가 붙은 주소를 따른다
  assert.match(read("serve/Caddyfile"), /@health path \/healthz/);     // 확인 대상 경로가 서버에 있다
  assert.match(read("scripts/smoke.sh"), /unhealthy/);                // 변이(상태 확인이 실제로 /healthz 를 보는가)는 스모크가 이미지로 확인한다
});

test("Dockerfile: non-root, 라벨, 잠금 파일 설치, 태그 고정", () => {
  const d = read("Dockerfile");
  assert.match(d, /^USER\s+(?!root)\S+/m);
  for (const k of ["io.openit.service", "io.openit.revision", "io.openit.contracts.boundary", "io.openit.contracts.survey-schema", "io.openit.model-runtime"]) assert.ok(d.includes(k), k);
  assert.match(d, /npm ci/);
  assert.ok(!/:latest/.test(d));
  assert.match(d, /COPY app/);
  assert.ok(existsSync(new URL("../package-lock.json", import.meta.url)));
  assert.ok(!/(TOKEN|SECRET|PASSWORD)\s*=/.test(d));
});
