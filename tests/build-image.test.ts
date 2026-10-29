// 영역 빌드 진입점(scripts/build-image.sh): 계약 BuildImageRequest를 받아 BuildImageResult 한 줄을 표준 출력 마지막 줄에 낸다(계약 2.5.0, U42).
// 여기서는 가짜 DOCKER로 진입점의 논리(요청 검증, 인자, 라벨 대조, 결과 형식)를 시험한다. 실제 docker 빌드는 npm run smoke가 이 진입점으로 한다.
// 기대값의 출처: 계약 BuildImageRequest/BuildImageResult 스키마와 그 예시(boundary-contracts/examples).
import { contract } from "../scripts/contract-src.mjs";
import { CONTRACT_VERSION } from "../api/contract.ts";
import { test } from "node:test";
import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import { mkdtempSync, writeFileSync, readFileSync, existsSync, chmodSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import * as v from "../generated/contract-validators.cjs";

const REPO = new URL("..", import.meta.url).pathname.replace(/\/$/, "");
const ID = "sha256:" + "ab".repeat(32);

/** 가짜 docker(node): build 인자를 기록하고, inspect에는 Dockerfile과 --label이 붙였을 라벨을 돌려준다(BAD_REVISION=1이면 revision을 틀리게). */
function fakeDocker(dir: string): string {
  const p = join(dir, "docker");
  writeFileSync(p, `#!/usr/bin/env node
const fs = require("node:fs"); const a = process.argv.slice(2); const d = ${JSON.stringify(dir)};
fs.appendFileSync(d + "/calls", a.join(" ") + "\\n");
const arg = (k) => { for (let i = 0; i < a.length; i++) { if (a[i] === "--build-arg" && a[i + 1].startsWith(k + "=")) return a[i + 1].slice(k.length + 1); } };
const labelArgs = () => a.flatMap((x, i) => (a[i - 1] === "--label" ? [x] : []));
if (a[0] === "build") {
  if (process.env.FAKE_BUILD_FAIL) { console.error("build failed"); process.exit(1); }
  console.log("stdout noise from build"); // 진행 출력이 표준 출력으로 나와도 진입점이 막는다
  fs.writeFileSync(d + "/state", JSON.stringify({ rev: arg("REVISION"), bc: arg("BOUNDARY_CONTRACTS"), labels: labelArgs() }));
} else if (a[0] === "image") {
  const st = JSON.parse(fs.readFileSync(d + "/state", "utf8"));
  if (a.join(" ").includes("Labels")) {
    const l = { "io.openit.service": "admin-console", "io.openit.revision": process.env.BAD_REVISION ? "0000000" : st.rev, "io.openit.contracts.boundary": st.bc,
      "io.openit.contracts.survey-schema": "n/a", "io.openit.model-runtime": "n/a", "org.opencontainers.image.x": "y" };
    for (const kv of st.labels) { const i = kv.indexOf("="); if (!(process.env.FAKE_DROP_EXPOSURE && kv.startsWith("io.openit.exposure="))) l[kv.slice(0, i)] = kv.slice(i + 1); }
    console.log(JSON.stringify(l));
  } else console.log(${JSON.stringify(ID)});
}
`);
  chmodSync(p, 0o755);
  return p;
}

function run(req: unknown, env: Record<string, string> = {}) {
  const dir = mkdtempSync(join(tmpdir(), "admin-console-bi-"));
  const reqFile = join(dir, "req.json");
  writeFileSync(reqFile, JSON.stringify(req));
  const r = spawnSync("bash", ["scripts/build-image.sh", reqFile], { cwd: REPO, encoding: "utf8", env: { PATH: process.env.PATH!, DOCKER: fakeDocker(dir), ...env } });
  const calls = existsSync(join(dir, "calls")) ? readFileSync(join(dir, "calls"), "utf8") : "";
  rmSync(dir, { recursive: true, force: true });
  return { ...r, calls };
}

const good = () => ({ source_dir: REPO, revision: "bad876c", versions: { boundary: CONTRACT_VERSION }, image_tag: "deploy-build/admin-console:bad876c" });

test("정상 요청: 마지막 줄이 BuildImageResult를 통과하고 라벨이 요청 값과 같다", () => {
  const r = run(good());
  assert.equal(r.status, 0, r.stderr);
  const last = r.stdout.trimEnd().split("\n").pop()!;
  const res = JSON.parse(last);
  assert.ok(v.BuildImageResult(res), JSON.stringify(v.BuildImageResult.errors));
  assert.equal(res.image, "deploy-build/admin-console:bad876c");
  assert.equal(res.image_id, ID);
  assert.equal(res.labels["io.openit.revision"], "bad876c");
  assert.equal(res.labels["io.openit.contracts.boundary"], CONTRACT_VERSION);
  assert.equal(res.labels["io.openit.service"], "admin-console");
  assert.ok(!("org.opencontainers.image.x" in res.labels), "io.openit.* 라벨만 낸다");
});

test("표준 출력은 결과 한 줄뿐이다(빌드 진행 기록은 표준 오류)", () => {
  const r = run(good());
  assert.equal(r.stdout.trimEnd().split("\n").length, 1, r.stdout);
  assert.match(r.stderr, /stdout noise from build/);
});

test("요청 값이 build 인자로 간다(리비전, 계약 태그)", () => {
  const r = run(good());
  assert.match(r.calls, /REVISION=bad876c/);
  assert.ok(r.calls.includes(`BOUNDARY_CONTRACTS=${CONTRACT_VERSION}`));
  assert.match(r.calls, /-t deploy-build\/admin-console:bad876c/);
  assert.match(r.calls, /--provenance=false/); // 같은 요청이 같은 image_id를 내려면 필요(ADR 0019)
});

test("계약 예시 요청의 이웃 소스(dependency_sources)는 받되 쓰지 않는다", () => {
  const ex = contract.json("examples/BuildImageRequest.json");
  delete ex.variant;
  const r = run({ ...ex, source_dir: REPO, versions: { ...ex.versions, boundary: CONTRACT_VERSION }, image_tag: "deploy-build/admin-console:bad876c" });
  assert.equal(r.status, 0, r.stderr);
  assert.doesNotMatch(r.calls, /model_runtime|survey|v0\.10\.0/);
});

test("모르는 키는 실패하고 docker를 부르지 않는다", () => {
  const r = run({ ...good(), surprise: 1 });
  assert.notEqual(r.status, 0);
  assert.equal(r.calls, "");
});

test("versions.boundary가 없으면 실패한다(기본값을 영역 안에 두지 않는다)", () => {
  const r = run({ ...good(), versions: {} });
  assert.notEqual(r.status, 0);
  assert.equal(r.calls, "");
});

test("상대 source_dir, 잘못된 revision은 실패한다", () => {
  assert.notEqual(run({ ...good(), source_dir: "admin-console" }).status, 0);
  assert.notEqual(run({ ...good(), revision: "unknown" }).status, 0);
});

test("이 영역은 variant가 없다: 주면 실패한다", () => {
  const r = run({ ...good(), variant: "gpu" });
  assert.notEqual(r.status, 0);
  assert.equal(r.calls, "");
});

test("source_dir가 이 리포 루트가 아니면 실패한다(다른 트리를 조용히 빌드하지 않는다)", () => {
  const r = run({ ...good(), source_dir: "/tmp" });
  assert.notEqual(r.status, 0);
  assert.equal(r.calls, "");
});

test("이미지 라벨이 요청과 다르면 실패한다", () => {
  const r = run(good(), { BAD_REVISION: "1" });
  assert.notEqual(r.status, 0);
  assert.match(r.stderr, /revision/);
});

test("docker build가 실패하면 실패하고 결과 줄을 내지 않는다", () => {
  const r = run(good(), { FAKE_BUILD_FAIL: "1" });
  assert.notEqual(r.status, 0);
  assert.equal(r.stdout.trim(), "");
});

test("요청 파일이 없거나 JSON이 아니면 실패한다", () => {
  const r = spawnSync("bash", ["scripts/build-image.sh", "/nonexistent.json"], { cwd: REPO, encoding: "utf8" });
  assert.notEqual(r.status, 0);
});

test("노출 선언: deploy-exposure.json이 --label io.openit.exposure로 붙고 결과 라벨에 나오며 계약 Exposure를 통과한다", () => {
  const r = run(good());
  assert.equal(r.status, 0, r.stderr);
  const res = JSON.parse(r.stdout.trimEnd().split("\n").pop()!);
  const label = res.labels["io.openit.exposure"];
  assert.equal(typeof label, "string");
  assert.ok(v.Exposure(JSON.parse(label)), JSON.stringify(v.Exposure.errors));
  assert.deepEqual(JSON.parse(label), JSON.parse(readFileSync(join(REPO, "deploy-exposure.json"), "utf8")));
});

test("이미지에 노출 라벨이 붙지 않았으면 실패한다", () => {
  const r = run(good(), { FAKE_DROP_EXPOSURE: "1" });
  assert.notEqual(r.status, 0);
  assert.match(r.stderr, /exposure/);
});

test("U50 라벨 정직성: 요청의 계약 버전이 실제 사용 버전과 다르면 라벨을 찍지 않고 분명한 메시지로 실패한다", () => {
  const r = run({ ...good(), versions: { boundary: "v9.9.9" } });
  assert.notEqual(r.status, 0);
  assert.equal(r.calls, "", "docker를 부르지 않는다");
  assert.equal(r.stdout.trim(), "");
  assert.match(r.stderr, /v9\.9\.9/);
  assert.ok(r.stderr.includes(CONTRACT_VERSION), "실제 사용 버전을 메시지에 보인다");
});

test("U50 라벨 정직성: 빌드 인자와 라벨의 계약 버전은 요청이 아니라 실제 사용 버전(생성 검증기의 원본)이다", () => {
  const r = run(good());
  assert.equal(r.status, 0, r.stderr);
  const res = JSON.parse(r.stdout.trimEnd().split("\n").pop()!);
  assert.equal(res.labels["io.openit.contracts.boundary"], CONTRACT_VERSION);
  assert.ok(v.ImageLabels(res.labels), "계약 3.0.0 ImageLabels를 통과한다(옛 라벨이 남아 있으면 거부된다)");
});
