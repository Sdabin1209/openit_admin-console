// 계약 파일을 고정한 태그의 내용으로 읽는다: 이웃 폴더가 고정 태그보다 앞서 있어도 이 영역의 시험과 생성물은 그대로다(구조 규칙 1).
import { test } from "node:test";
import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import { mkdtempSync, mkdirSync, writeFileSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { ContractSource, contract, pinnedTag, resolveRepo, workspaceDirs } from "../scripts/contract-src.mjs";
import { generate } from "../scripts/gen-schemas.mjs";

const git = (repo: string, ...a: string[]) => execFileSync("git", ["-C", repo, "-c", "user.name=t", "-c", "user.email=t@example.invalid", ...a], { stdio: ["ignore", "pipe", "ignore"], encoding: "utf8" });
const skip = !contract.available() && "고정 태그를 가진 boundary-contracts가 이웃에 없는 환경";

test("고정 태그는 Dockerfile ARG에서 온다", () => {
  assert.match(pinnedTag(), /^v\d+\.\d+\.\d+$/);
});

test("고정 태그 뒤에 이웃 작업 트리·커밋이 바뀌어도 태그 시점의 내용을 읽는다", () => {
  const repo = mkdtempSync(join(tmpdir(), "admin-console-cs-"));
  try {
    git(repo, "init", "-q");
    mkdirSync(join(repo, "schemas"));
    writeFileSync(join(repo, "schemas", "x.json"), '{"v":1}');
    git(repo, "add", "-A"); git(repo, "commit", "-q", "-m", "one"); git(repo, "tag", "v9.9.9");
    writeFileSync(join(repo, "schemas", "x.json"), '{"v":2}'); // 앞서 간 커밋
    writeFileSync(join(repo, "schemas", "y.json"), "{}");
    git(repo, "add", "-A"); git(repo, "commit", "-q", "-m", "two");
    writeFileSync(join(repo, "schemas", "x.json"), '{"v":3}'); // 커밋하지 않은 수정
    const s = new ContractSource({ repo, tag: "v9.9.9" });
    assert.equal(s.available(), true);
    assert.deepEqual(s.json("schemas/x.json"), { v: 1 });
    assert.deepEqual(s.list("schemas"), ["x.json"]);
    assert.equal(new ContractSource({ repo, tag: "v0.0.1" }).available(), false);
  } finally { rmSync(repo, { recursive: true, force: true }); }
});

test("생성 검증기는 이웃이 고정 태그보다 앞서 있어도 같다", { skip }, () => {
  // 이웃 리포를 복제해 고정 태그 뒤에 스키마를 바꾼 커밋을 더한다(원래 이웃은 건드리지 않는다).
  const repo = mkdtempSync(join(tmpdir(), "admin-console-cs-"));
  try {
    execFileSync("git", ["clone", "-q", "--no-hardlinks", contract.repo, repo], { stdio: "ignore" });
    const f = join(repo, "schemas", "ApprovalRequest.schema.json");
    writeFileSync(f, '{"앞서 간 스키마": true}');
    writeFileSync(join(repo, "pyproject.toml"), 'version = "99.0.0"\n');
    git(repo, "add", "-A"); git(repo, "commit", "-q", "-m", "ahead");
    assert.equal(generate(new ContractSource({ repo, tag: contract.tag })), generate(contract));
  } finally { rmSync(repo, { recursive: true, force: true }); }
});

test("원격 받기가 끝나지 않으면 timeoutMs 안에 '끝나지 않았다'로 실패하고 고치는 법(환경 변수 이름)을 말한다", () => {
  // 왜 가짜 git: 끝나지 않는 clone 을 PATH 앞의 대역 명령으로 재현해, 실제 경과 시간을 재지 않고 우리 코드의 timeout 옵션만 지킨다(timeout 을 빼면 이 시험이 멈추거나 실패한다).
  const bin = mkdtempSync(join(tmpdir(), "fakegit-"));
  const oldPath = process.env.PATH;
  try {
    writeFileSync(join(bin, "git"), '#!/bin/sh\ncase "$*" in *clone*) exec sleep 60;; *) exit 1;; esac\n', { mode: 0o755 });
    process.env.PATH = `${bin}:${oldPath}`;
    assert.throws(
      () => resolveRepo("v0.0.0-nonexistent", { name: "no-such-neighbor-repo", env: "OPENIT_NO_SUCH_REPO_FOR_TEST", remote: "ssh://127.0.0.1:1/none.git", timeoutMs: 300 }),
      (e: Error) => /300ms 안에 끝나지 않았다/.test(e.message) && /OPENIT_NO_SUCH_REPO_FOR_TEST/.test(e.message) && /no-such-neighbor-repo/.test(e.message),
    );
  } finally { process.env.PATH = oldPath; rmSync(bin, { recursive: true, force: true }); }
});

test("git worktree(build/wt-*) 안의 리포도 본 리포의 워크스페이스에서 이웃을 찾는다", () => {
  // 왜 임시 워크스페이스: 실제 폴더 배치에 기대지 않고 '워크스페이스/리포 + 워크스페이스/리포/build/wt-x' 모양을 그대로 만든다(U1: 고치기 전엔 worktree 에서 옆 폴더를 못 찾았다).
  const ws = mkdtempSync(join(tmpdir(), "ws-"));
  try {
    const main = join(ws, "area"); mkdirSync(main);
    git(main, "init", "-q"); writeFileSync(join(main, "f"), "x"); git(main, "add", "f"); git(main, "commit", "-qm", "i");
    const wt = join(main, "build", "wt-x");
    git(main, "worktree", "add", "-q", wt);
    const real = (p: string) => execFileSync("realpath", [p], { encoding: "utf8" }).trim();
    assert.ok(workspaceDirs(wt).map(real).includes(real(ws)), "worktree 에서 워크스페이스를 구한다");
    assert.ok(workspaceDirs(main).map(real).includes(real(ws)), "일반 리포에서도 같다");
  } finally { rmSync(ws, { recursive: true, force: true }); }
});
