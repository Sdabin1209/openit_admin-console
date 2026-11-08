// 하위 프로세스에 넘기는 최소 환경(RUNTIME R9.1: 시험·잡은 상속받은 환경 변수를 통째로 쓰거나 넘기지 않는다).
// 왜 허용 목록: 제외 목록은 새로 생긴 변수(토큰 등)가 조용히 넘어간다. 기본 집합은 head check-container-inputs 와 같다.
const ALLOWED = ["PATH", "HOME", "LANG", "TMPDIR", "DOCKER_CONFIG", "DOCKER_HOST"];
// 계약·문진 스키마 소스를 찾는 생성기(scripts/contract-src.mjs)가 부모와 같은 원천을 보게 하는 이름(codex C2: 자식이 원격 clone 으로 갈라지지 않게)
const SOURCE_NAMES = ["OPENIT_BOUNDARY_CONTRACTS_REPO", "OPENIT_SURVEY_SERVICE_REPO", "SSH_AUTH_SOCK", "GIT_CONFIG_GLOBAL"];
/** 허용 목록의 이름만 상속하고, 호출이 필요로 하는 값은 extra 로 이름을 밝혀 더한다. extra 의 undefined 는 뺀다. */
export function minEnv(extra: Record<string, string | undefined> = {}, omit: string[] = []): NodeJS.ProcessEnv {
  const e: NodeJS.ProcessEnv = {};
  for (const k of [...ALLOWED, ...SOURCE_NAMES]) if (process.env[k] !== undefined && !omit.includes(k)) e[k] = process.env[k];
  for (const [k, v] of Object.entries(extra)) { if (v === undefined) delete e[k]; else e[k] = v; }
  return e;
}
