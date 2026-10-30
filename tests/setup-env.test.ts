// scripts/setup-env.sh 규약(계약 SetupEnvReport 2.6.0, U43): 표준 출력 마지막 줄에 보고 JSON 한 줄, 진행 기록은 표준 오류, 멱등.
// 기대값의 출처: 계약 SetupEnvReport 스키마(검증기는 생성물)와 그 설명.
import { test } from "node:test";
import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import { mkdtempSync, mkdirSync, copyFileSync, writeFileSync, chmodSync, rmSync, statSync, existsSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import * as v from "../app/types/contract-validators.cjs";

const REPO = new URL("..", import.meta.url).pathname.replace(/\/$/, "");
const lastLine = (s: string) => s.trimEnd().split("\n").pop()!;

test("준비된 환경에서: 마지막 줄이 SetupEnvReport를 통과하고 환경·시험 명령을 선언한다", () => {
  const before = statSync(join(REPO, "node_modules")).mtimeMs;
  const r = spawnSync("bash", ["scripts/setup-env.sh"], { cwd: REPO, encoding: "utf8" });
  assert.equal(r.status, 0, r.stderr);
  const rep = JSON.parse(lastLine(r.stdout));
  assert.ok(v.SetupEnvReport(rep), JSON.stringify(v.SetupEnvReport.errors));
  assert.equal(rep.area, "admin-console");
  assert.equal(rep.status, "ok");
  assert.equal(rep.exit_code, 0);
  assert.deepEqual(rep.environment, { kind: "node-modules", path: "node_modules", test_command: ["npm", "test"] });
  assert.ok(existsSync(join(REPO, rep.environment.path)));
  assert.equal(r.stdout.trimEnd().split("\n").length, 1, `표준 출력은 보고 한 줄뿐이다: ${r.stdout}`);
  assert.equal(statSync(join(REPO, "node_modules")).mtimeMs, before, "이미 준비돼 있으면 아무것도 바꾸지 않는다(멱등)");
});

test("선언한 test_command를 리포 루트에서 실행하면 영역 시험이 돌고 종료 0이다", () => {
  const rep = JSON.parse(lastLine(spawnSync("bash", ["scripts/setup-env.sh"], { cwd: REPO, encoding: "utf8" }).stdout));
  const [cmd, ...args] = rep.environment.test_command as string[];
  // 전체를 다시 돌리면 이 시험이 자기 자신을 부른다. NODE_OPTIONS의 이름 필터(node:test가 인식한다)로 가벼운 시험 하나만 남겨 '명령이 시험 러너를 실제로 띄운다'를 확인한다.
  // NODE_TEST_CONTEXT: 바깥 러너의 자식 표시를 물려받으면 안쪽 러너가 일반 출력을 내지 않는다.
  // 왜 인자가 아니라 환경 변수: node --test "glob" 뒤의 옵션은 러너 옵션이 아니라 시험 파일의 인자가 된다.
  const r = spawnSync(cmd, args, { cwd: REPO, encoding: "utf8", env: { ...process.env, NODE_TEST_CONTEXT: undefined, NODE_OPTIONS: "--test-name-pattern=Dockerfile.ARG.에서" } });
  assert.equal(r.status, 0, r.stdout + r.stderr);
  assert.match(r.stdout, /ℹ pass [1-9]/);
});

test("환경이 없을 때(npm ci 경로): 설치 도구가 표준 출력에 떠들어도 마지막 줄은 보고이고 다른 줄이 섞이지 않는다", () => {
  const dir = mkdtempSync(join(tmpdir(), "admin-console-se-"));
  try {
    mkdirSync(join(dir, "scripts"));
    for (const f of ["package.json", "package-lock.json", "scripts/setup-env.sh"]) copyFileSync(join(REPO, f), join(dir, f));
    const bin = join(dir, "bin"); mkdirSync(bin);
    writeFileSync(join(bin, "npm"), '#!/usr/bin/env bash\necho "npm noise on stdout: $*"\nmkdir -p node_modules\ntouch node_modules/.package-lock.json\n');
    chmodSync(join(bin, "npm"), 0o755);
    const r = spawnSync("bash", ["scripts/setup-env.sh"], { cwd: dir, encoding: "utf8", env: { PATH: `${bin}:${process.env.PATH}` } });
    assert.equal(r.status, 0, r.stderr);
    assert.equal(r.stdout.trimEnd().split("\n").length, 1, r.stdout);
    assert.ok(v.SetupEnvReport(JSON.parse(lastLine(r.stdout))));
    assert.match(r.stderr, /npm noise on stdout: ci/);
  } finally { rmSync(dir, { recursive: true, force: true }); }
});

test("실패하면 status=fail, exit_code!=0의 보고를 마지막 줄에 내고 같은 코드로 끝난다", () => {
  const dir = mkdtempSync(join(tmpdir(), "admin-console-se-"));
  try {
    mkdirSync(join(dir, "scripts"));
    copyFileSync(join(REPO, "scripts/setup-env.sh"), join(dir, "scripts/setup-env.sh"));
    writeFileSync(join(dir, "package.json"), "{}"); // package-lock.json 없음 -> 실패
    const r = spawnSync("bash", ["scripts/setup-env.sh"], { cwd: dir, encoding: "utf8" });
    assert.notEqual(r.status, 0);
    const rep = JSON.parse(lastLine(r.stdout));
    assert.ok(v.SetupEnvReport(rep), JSON.stringify(v.SetupEnvReport.errors));
    assert.equal(rep.status, "fail");
    assert.equal(rep.exit_code, r.status);
  } finally { rmSync(dir, { recursive: true, force: true }); }
});
