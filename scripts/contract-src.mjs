// 계약(boundary-contracts)의 파일을 **고정한 태그의 내용**으로 읽는다. 이웃 폴더의 작업 트리(HEAD, 수정 중인 파일)는 읽지 않는다.
// 왜: 이웃 작업 트리를 읽으면 계약이 앞서 나갈 때 아무것도 안 바꾼 이 영역의 시험이 깨진다(구조 규칙 1: 이웃 상태에 기대지 않는다).
// 읽기 전용: git show / ls-tree만 쓴다.
// 리포 위치(pip 의 git+ssh…@태그 설치와 같은 원칙: 판은 고정 태그 하나): 1. 환경 변수 OPENIT_BOUNDARY_CONTRACTS_REPO 2. 옆 폴더에 그 태그가 있으면 옆 폴더
// 3. 원격 리포에서 그 태그만 git 제외 캐시(build/deps/boundary-contracts.git)로 받는다. 받지 못하면 오류다(조용히 건너뛰지 않는다).
import { execFileSync } from "node:child_process";
import { readFileSync, existsSync, mkdirSync, mkdtempSync, renameSync, rmSync } from "node:fs";

const REMOTE = "git@github.com:Sdabin1209/openit_boundary-contracts.git";
const hasTag = (dir, tag) => { try { execFileSync("git", ["-C", dir, "rev-parse", "--verify", "--quiet", `${tag}^{commit}`], { stdio: "ignore" }); return true; } catch { return false; } };
export function resolveRepo(tag, { name = "boundary-contracts", env = "OPENIT_BOUNDARY_CONTRACTS_REPO", remote = REMOTE } = {}) {
  if (process.env[env]) return process.env[env];
  const sib = new URL(`../../${name}/`, import.meta.url).pathname;
  if (existsSync(sib) && hasTag(sib, tag)) return sib;
  const cache = new URL(`../build/deps/${name}.git`, import.meta.url).pathname;
  if (hasTag(cache + "-" + tag, tag)) return cache + "-" + tag;
  // 동시에 도는 시험 여럿이 같은 캐시를 받을 수 있다: 임시 폴더에 받은 뒤 rename 으로 한 번에 놓는다(원자적). 먼저 놓인 것이 있으면 그것을 쓴다
  mkdirSync(new URL("../build/deps/", import.meta.url).pathname, { recursive: true });
  const tmp = mkdtempSync(new URL("../build/deps/", import.meta.url).pathname + name + ".tmp-");
  execFileSync("git", ["clone", "-q", "--bare", "--depth", "1", "--branch", tag, remote, tmp + "/r.git"], { stdio: ["ignore", "ignore", "pipe"] });
  execFileSync("git", ["-C", tmp + "/r.git", "tag", "-f", tag, "HEAD"], { stdio: "ignore" });
  const dst = cache + "-" + tag;
  try { renameSync(tmp + "/r.git", dst); } catch { /* 다른 프로세스가 먼저 놓았다 */ }
  rmSync(tmp, { recursive: true, force: true });
  if (!hasTag(dst, tag)) throw new Error(`계약 ${tag} 를 원격에서 받지 못했다`);
  return dst;
}

// 이 영역이 소비하는 문진 스키마(결과 화면의 SessionResult 등)의 고정 판. 시험은 옆 폴더 작업 트리가 아니라 이 태그에서 읽는다
export const SURVEY_SCHEMA_TAG = "survey-schema-v4.1.2";
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
