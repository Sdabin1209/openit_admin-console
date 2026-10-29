// 계약(boundary-contracts)의 파일을 **고정한 태그의 내용**으로 읽는다. 이웃 폴더의 작업 트리(HEAD, 수정 중인 파일)는 읽지 않는다.
// 왜: 이웃 작업 트리를 읽으면 계약이 앞서 나갈 때 아무것도 안 바꾼 이 영역의 시험이 깨진다(구조 규칙 1: 이웃 상태에 기대지 않는다).
// 읽기 전용: git show / ls-tree만 쓴다. 태그가 이웃에 없으면 available()이 false이고 호출자는 건너뛴다.
import { execFileSync } from "node:child_process";
import { readFileSync, existsSync } from "node:fs";

const DOCKERFILE = new URL("../Dockerfile", import.meta.url);

/** Dockerfile ARG BOUNDARY_CONTRACTS의 값. 이 영역의 계약 고정 정본이다. */
export function pinnedTag(dockerfile = DOCKERFILE) {
  const m = /^ARG BOUNDARY_CONTRACTS=(v\d+\.\d+\.\d+)\s*$/m.exec(readFileSync(dockerfile, "utf8"));
  if (!m) throw new Error("Dockerfile에서 ARG BOUNDARY_CONTRACTS=vX.Y.Z를 찾지 못했다");
  return m[1];
}

export class ContractSource {
  constructor({ repo = new URL("../../boundary-contracts/", import.meta.url).pathname, tag = pinnedTag() } = {}) {
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
