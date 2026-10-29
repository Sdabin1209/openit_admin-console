// 영역 빌드 진입점의 본체. 계약: boundary-contracts BuildImageRequest / BuildImageResult (2.5.0, OPEN_GAPS U42), 설계 이유는 docs/adr/0019.
// 표준 출력에는 마지막 줄 결과 JSON 한 줄만 낸다. docker의 진행 출력은 모두 표준 오류로 보낸다.
import { spawnSync } from "node:child_process";
import { readFileSync, realpathSync } from "node:fs";
import { createRequire } from "node:module";

// 왜 생성된 검증기: 요청·결과는 영역 경계 입력/출력이라 계약 스키마로만 검사한다(손 검사 금지, ADR 0017). npm ci 없이 돌도록 생성물은 자급식이다(gen-schemas.mjs).
const v = createRequire(import.meta.url)("../generated/contract-validators.cjs");
const ROOT = realpathSync(new URL("..", import.meta.url).pathname);
const DOCKER = process.env.DOCKER || "docker";

function fail(msg, code = 1) { console.error(`build-image: 실패: ${msg}`); process.exit(code); }
function errs(fn) { return (fn.errors ?? []).slice(0, 5).map((e) => `${e.instancePath || "(최상위)"} ${e.message ?? e.keyword}`).join("; "); }
function docker(args, { stdoutToStderr = false } = {}) {
  const r = spawnSync(DOCKER, args, { encoding: "utf8", stdio: stdoutToStderr ? ["ignore", 2, 2] : ["ignore", "pipe", 2] });
  if (r.error) fail(`${DOCKER}를 실행하지 못했다: ${r.error.message}`, 2);
  return r;
}

const file = process.argv[2];
if (!file || process.argv.length !== 3) fail("사용법: bash scripts/build-image.sh <요청 JSON 파일>", 2);
let req;
try { req = JSON.parse(readFileSync(file, "utf8")); } catch (e) { fail(`요청 파일을 읽지 못했다: ${e.message}`, 2); }
if (!v.BuildImageRequest(req)) fail(`요청이 계약 BuildImageRequest에 맞지 않는다: ${errs(v.BuildImageRequest)}`, 2);

// 이 영역이 쓰는 것: versions.boundary(라벨), revision, image_tag. 쓰지 않는 것: dependency_sources(이미지에 이웃 소스를 넣지 않는다), model_runtime·survey_schema·turn_engine.
// variant가 없는 영역이 variant를 받으면 조용히 기본 이미지를 만들지 않고 실패한다(계약: 영역이 모르는 값이면 실패).
if (req.variant !== undefined) fail(`이 영역은 variant가 없다: ${req.variant}`, 2);
// 왜 확인: 다른 트리를 빌드하면서 이 리포의 revision을 라벨에 붙이는 사고를 막는다.
let src; try { src = realpathSync(req.source_dir); } catch { fail(`source_dir가 없다: ${req.source_dir}`, 2); }
if (src !== ROOT) fail(`source_dir(${req.source_dir})가 이 진입점이 속한 리포 루트(${ROOT})와 다르다`, 2);

console.error(`build-image: ${req.image_tag} 빌드 (revision ${req.revision}, 계약 ${req.versions.boundary})`);
// 왜 --provenance=false: BuildKit이 빌드마다 붙이는 출처 증명(attestation)이 이미지 ID를 매번 바꾼다. 끄면 같은 입력이 같은 image_id를 낸다(계약: 멱등, 2회 빌드로 확인).
const b = docker(["build", "--provenance=false", "-t", req.image_tag,
  "--build-arg", `REVISION=${req.revision}`, "--build-arg", `BOUNDARY_CONTRACTS=${req.versions.boundary}`, "--build-arg", "SURVEY_SCHEMA=n/a",
  src], { stdoutToStderr: true });
if (b.status !== 0) fail(`docker build가 실패했다(종료 ${b.status})`);

// 라벨은 요청 값을 되풀이하지 않고 이미지에서 읽는다(docker inspect). 계약: labels는 이미지에 실제로 붙은 io.openit.* 라벨.
const li = docker(["image", "inspect", req.image_tag, "--format", "{{json .Config.Labels}}"]);
const ii = docker(["image", "inspect", req.image_tag, "--format", "{{.Id}}"]);
if (li.status !== 0 || ii.status !== 0) fail("docker image inspect가 실패했다");
const all = JSON.parse(li.stdout.trim() || "{}") ?? {};
const labels = Object.fromEntries(Object.entries(all).filter(([k]) => k.startsWith("io.openit.")));
if (!v.ImageLabels(labels)) fail(`이미지 라벨이 계약 ImageLabels에 맞지 않는다: ${errs(v.ImageLabels)}`);
// 요청 값이 라벨에 실제로 붙었는지: Dockerfile이 build 인자를 라벨로 옮기지 않으면 여기서 잡힌다.
if (labels["io.openit.revision"] !== req.revision) fail(`라벨 io.openit.revision(${labels["io.openit.revision"]})이 요청(${req.revision})과 다르다`);
if (labels["io.openit.contracts.boundary"] !== req.versions.boundary) fail(`라벨 io.openit.contracts.boundary(${labels["io.openit.contracts.boundary"]})가 요청(${req.versions.boundary})과 다르다`);

const result = { image: req.image_tag, image_id: ii.stdout.trim(), labels };
if (!v.BuildImageResult(result)) fail(`결과가 계약 BuildImageResult에 맞지 않는다: ${errs(v.BuildImageResult)}`);
process.stdout.write(JSON.stringify(result) + "\n");
