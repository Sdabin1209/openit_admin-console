// 계약 파일을 고정한 태그의 내용으로 읽는다: 이웃 폴더가 고정 태그보다 앞서 있어도 이 영역의 시험과 생성물은 그대로다(구조 규칙 1).
import { test } from "node:test";
import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import { mkdtempSync, mkdirSync, writeFileSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { ContractSource, contract, pinnedTag } from "../scripts/contract-src.mjs";
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
