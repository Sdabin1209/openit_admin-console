// 영역 빌드 진입점(scripts/build-image.sh): 계약 BuildImageRequest를 받아 BuildImageResult 한 줄을 표준 출력 마지막 줄에 낸다(계약 2.5.0, U42).
// 여기서는 가짜 DOCKER로 진입점의 논리(요청 검증, 인자, 라벨 대조, 결과 형식)를 시험한다. 실제 docker 빌드는 npm run smoke가 이 진입점으로 한다.
// 기대값의 출처: 계약 BuildImageRequest/BuildImageResult 스키마와 그 예시(boundary-contracts/examples).
import { test } from "node:test";
import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import { mkdtempSync, writeFileSync, readFileSync, existsSync, chmodSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import * as v from "../generated/contract-validators.cjs";

const REPO = new URL("..", import.meta.url).pathname.replace(/\/$/, "");
const ID = "sha256:" + "ab".repeat(32);

/** 가짜 docker: build 인자를 기록하고, inspect에는 Dockerfile이 붙였을 라벨을 돌려준다(BAD_REVISION=1이면 revision을 틀리게). */
function fakeDocker(dir: string): string {
  const p = join(dir, "docker");
  writeFileSync(p, `#!/usr/bin/env bash
echo "$@" >> "${dir}/calls"
case "$1" in
  build)
    [ -n "\${FAKE_BUILD_FAIL:-}" ] && { echo "build failed" >&2; exit 1; }
    echo "stdout noise from build"   # 진행 출력이 표준 출력으로 나와도 진입점이 막는다
    for a in "$@"; do case "$a" in REVISION=*) echo "\${a#REVISION=}" > "${dir}/rev";; BOUNDARY_CONTRACTS=*) echo "\${a#BOUNDARY_CONTRACTS=}" > "${dir}/bc";; esac; done ;;
  image)
    case "$*" in
      *Labels*) rev=$(cat "${dir}/rev"); [ -n "\${BAD_REVISION:-}" ] && rev=0000000
        printf '{"io.openit.service":"admin-console","io.openit.revision":"%s","io.openit.contracts.boundary":"%s","io.openit.contracts.survey-schema":"n/a","io.openit.turn-engine":"n/a","io.openit.model-runtime":"n/a","org.opencontainers.image.x":"y"}\\n' "$rev" "$(cat "${dir}/bc")" ;;
      *) echo "${ID}" ;;
    esac ;;
esac
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

const good = () => ({ source_dir: REPO, revision: "bad876c", versions: { boundary: "v2.5.1" }, image_tag: "deploy-build/admin-console:bad876c" });

test("정상 요청: 마지막 줄이 BuildImageResult를 통과하고 라벨이 요청 값과 같다", () => {
  const r = run(good());
  assert.equal(r.status, 0, r.stderr);
  const last = r.stdout.trimEnd().split("\n").pop()!;
  const res = JSON.parse(last);
  assert.ok(v.BuildImageResult(res), JSON.stringify(v.BuildImageResult.errors));
  assert.equal(res.image, "deploy-build/admin-console:bad876c");
  assert.equal(res.image_id, ID);
  assert.equal(res.labels["io.openit.revision"], "bad876c");
  assert.equal(res.labels["io.openit.contracts.boundary"], "v2.5.1");
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
  assert.match(r.calls, /BOUNDARY_CONTRACTS=v2\.5\.1/);
  assert.match(r.calls, /-t deploy-build\/admin-console:bad876c/);
  assert.match(r.calls, /--provenance=false/); // 같은 요청이 같은 image_id를 내려면 필요(ADR 0019)
});

test("계약 예시 요청의 이웃 소스(dependency_sources)와 turn_engine은 받되 쓰지 않는다", () => {
  const ex = JSON.parse(readFileSync(new URL("../../boundary-contracts/examples/BuildImageRequest.json", import.meta.url), "utf8"));
  delete ex.variant;
  const r = run({ ...ex, source_dir: REPO, image_tag: "deploy-build/admin-console:bad876c" });
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
