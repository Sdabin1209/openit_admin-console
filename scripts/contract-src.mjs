// 계약(boundary-contracts)의 파일을 **고정한 태그의 내용**으로 읽는다. 이웃 폴더의 작업 트리(HEAD, 수정 중인 파일)는 읽지 않는다.
// 왜: 이웃 작업 트리를 읽으면 계약이 앞서 나갈 때 아무것도 안 바꾼 이 영역의 시험이 깨진다(구조 규칙 1: 이웃 상태에 기대지 않는다).
// 읽기 전용: git show / ls-tree만 쓴다.
// 리포 위치(pip 의 git+ssh…@태그 설치와 같은 원칙: 판은 고정 태그 하나): 1. 환경 변수 OPENIT_BOUNDARY_CONTRACTS_REPO 2. 옆 폴더에 그 태그가 있으면 옆 폴더
// 3. 원격 리포에서 그 태그만 git 제외 캐시(build/deps/boundary-contracts.git)로 받는다. 받지 못하면 오류다(조용히 건너뛰지 않는다).
// 옆 폴더는 워크스페이스(본 리포의 위 폴더, git worktree 에서도 같다)에서 찾는다.
// 원격 받기는 시간 상한(REMOTE_TIMEOUT_MS)이 있고 ssh 는 묻지 않는다(BatchMode): 접근이 안 되면 멈추지 않고 고칠 방법을 말하며 실패한다.
import { execFileSync } from "node:child_process";
import { resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { readFileSync, existsSync, mkdirSync, mkdtempSync, renameSync, rmSync } from "node:fs";

const REMOTE = "git@github.com:Sdabin1209/openit_boundary-contracts.git";
const hasTag = (dir, tag) => { try { execFileSync("git", ["-C", dir, "rev-parse", "--verify", "--quiet", `${tag}^{commit}`], { stdio: "ignore" }); return true; } catch { return false; } };
// 왜 30초: 측정하지 않은 값이다. --depth 1 로 한 태그만 받으므로 정상 접속이면 수 초 안에 끝난다고 보고, 접속이 안 될 때 시험 전체가 수 분 멈추지 않게 하는 실패 상한이다(D125: 목표가 아니라 상한).
export const REMOTE_TIMEOUT_MS = 30_000;
// 왜 git-common-dir: 리포가 git worktree(build/wt-*)에 있으면 위 폴더가 워크스페이스가 아니다. 본 리포 위치는 worktree 와 상관없이 같은 값이므로
// 그 위 폴더를 워크스페이스로 본다폴더 깊이를 세지 않는다. 일반 clone 이면 repo 의 바로 위 폴더와 같다.
// 왜 fileURLToPath: URL.pathname 은 공백·한글을 %20 같은 퍼센트 인코딩으로 남겨 그런 경로의 리포에서 폴더를 못 찾는다.
export const repoRootFrom = (moduleUrl) => fileURLToPath(new URL("../", moduleUrl));
const REPO_ROOT = repoRootFrom(import.meta.url);
export function workspaceDirs(repoRoot = REPO_ROOT) {
  const dirs = [resolve(repoRoot, "..")];
  try {
    const common = execFileSync("git", ["-C", repoRoot, "rev-parse", "--path-format=absolute", "--git-common-dir"], { encoding: "utf8", stdio: ["ignore", "pipe", "ignore"] }).trim();
    const ws = resolve(common, "..", "..");
    if (!dirs.includes(ws)) dirs.push(ws);
  } catch { /* git 이 없거나 리포가 아니면 바로 위 폴더만 본다 */ }
  return dirs;
}
function findSibling(name, tag, repoRoot = REPO_ROOT) {
  for (const ws of workspaceDirs(repoRoot)) {
    const sib = resolve(ws, name);
    if (existsSync(sib) && hasTag(sib, tag)) return sib;
  }
  return null;
}
export function resolveRepo(tag, { name = "boundary-contracts", env = "OPENIT_BOUNDARY_CONTRACTS_REPO", remote = REMOTE, timeoutMs = REMOTE_TIMEOUT_MS } = {}) {
  if (process.env[env]) return process.env[env];
  const sib = findSibling(name, tag);
  if (sib) return sib;
  const cache = resolve(REPO_ROOT, `build/deps/${name}.git`);
  if (hasTag(cache + "-" + tag, tag)) return cache + "-" + tag;
  // 동시에 도는 시험 여럿이 같은 캐시를 받을 수 있다: 임시 폴더에 받은 뒤 rename 으로 한 번에 놓는다(원자적). 먼저 놓인 것이 있으면 그것을 쓴다
  mkdirSync(resolve(REPO_ROOT, "build/deps"), { recursive: true });
  const tmp = mkdtempSync(resolve(REPO_ROOT, "build/deps") + "/" + name + ".tmp-");
  try {
    execFileSync("git", ["clone", "-q", "--bare", "--depth", "1", "--branch", tag, remote, tmp + "/r.git"], {
      stdio: ["ignore", "ignore", "pipe"], timeout: timeoutMs, encoding: "utf8",
      env: { ...process.env, GIT_TERMINAL_PROMPT: "0", GIT_SSH_COMMAND: process.env.GIT_SSH_COMMAND ?? `ssh -o BatchMode=yes -o ConnectTimeout=${Math.max(1, Math.ceil(timeoutMs / 3000))}` },
    });
  } catch (e) {
    rmSync(tmp, { recursive: true, force: true });
    const why = e.code === "ETIMEDOUT" ? `${timeoutMs}ms 안에 끝나지 않았다` : String(e.stderr || e.message).trim().split("\n").slice(-2).join(" / ");
    throw new Error(`계약 리포 ${name} 의 태그 ${tag} 를 찾지 못했다: 워크스페이스 옆 폴더에 없고 원격(${remote}) 받기도 실패했다(${why}). `
      + `고치는 법: 환경 변수 ${env} 에 그 태그를 가진 ${name} 리포 경로를 주거나, 워크스페이스에 ${name} 을 clone 하거나, 원격 접근(ssh 키)을 준비한다.`);
  }
  execFileSync("git", ["-C", tmp + "/r.git", "tag", "-f", tag, "HEAD"], { stdio: "ignore" });
  const dst = cache + "-" + tag;
  try { renameSync(tmp + "/r.git", dst); } catch { /* 다른 프로세스가 먼저 놓았다 */ }
  rmSync(tmp, { recursive: true, force: true });
  if (!hasTag(dst, tag)) throw new Error(`계약 ${tag} 를 원격에서 받지 못했다`);
  return dst;
}

// 이 영역이 소비하는 문진 스키마(결과 화면의 SessionResult 등)의 고정 판. 시험은 옆 폴더 작업 트리가 아니라 이 태그에서 읽는다
export const SURVEY_SCHEMA_TAG = "survey-schema-v4.1.4";
export function surveySchemaJson(name) {
  const repo = resolveRepo(SURVEY_SCHEMA_TAG, { name: "survey-service", env: "OPENIT_SURVEY_SERVICE_REPO", remote: "git@github.com:Sdabin1209/openit_survey-service.git" });
  return JSON.parse(execFileSync("git", ["-C", repo, "show", `${SURVEY_SCHEMA_TAG}:schema/schemas/${name}.json`], { encoding: "utf8", maxBuffer: 64 * 1024 * 1024 }));
}

const DOCKERFILE = new URL("../Dockerfile", import.meta.url);

/** Dockerfile ARG BOUNDARY_CONTRACTS의 값. 이 영역의 계약 고정 정본이다. */
export function pinnedTag(dockerfile = DOCKERFILE) {
  const m = /^ARG BOUNDARY_CONTRACTS=(v\d+\.\d+\.\d+)\s*$/m.exec(readFileSync(dockerfile, "utf8"));
  if (!m) throw new Error("Dockerfile에서 ARG BOUNDARY_CONTRACTS=vX.Y.Z를 찾지 못했다");
  return m[1];
}

export class ContractSource {
  constructor({ tag = pinnedTag(), repo = resolveRepo(tag) } = {}) {
    this.repo = repo;
    this.tag = tag;
  }
  git(args) {
    // 왜 maxBuffer: 큰 스키마 파일. 오류 출력은 호출자에게 던지지 않고 널로 둔다(비밀 없음, 소음 방지).
    return execFileSync("git", ["-C", this.repo, ...args], { encoding: "utf8", maxBuffer: 64 * 1024 * 1024, stdio: ["ignore", "pipe", "ignore"] });
  }
  /** 이웃 리포가 있고 그 안에 고정 태그가 있다. */
  available() {
    if (!existsSync(this.repo)) return false;
    try { this.git(["rev-parse", "--verify", "--quiet", `${this.tag}^{commit}`]); return true; } catch { return false; }
  }
  // 왜 두 번 시도하나: 계약 리포의 schemas는 boundary_contracts/schemas를 가리키는 심볼릭 링크이고 git은 링크를 따라가지 않는다. 그대로 안 되면 실제 위치로 읽는다.
  tryBoth(rel, fn) {
    try { return fn(rel); } catch (e) {
      const real = rel.replace(/^schemas(\/|$)/, "boundary_contracts/schemas$1");
      if (real === rel) throw e;
      return fn(real);
    }
  }
  read(rel) { return this.tryBoth(rel, (r) => this.git(["show", `${this.tag}:${r}`])); }
  json(rel) { return JSON.parse(this.read(rel)); }
  /** 폴더 안의 파일 이름들(하위 폴더 제외). */
  list(dir) {
    return this.tryBoth(dir, (d) => this.git(["ls-tree", "--name-only", `${this.tag}:${d}`])).split("\n").filter(Boolean);
  }
}

export const contract = new ContractSource();
