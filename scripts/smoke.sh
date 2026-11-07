#!/usr/bin/env bash
# deploy 와 같은 실행 조건으로 띄운다(읽기 전용 루트, /tmp tmpfs, cap_drop ALL, no-new-privileges, 쓸 수 있는 경로는 deploy compose 와 같게): 2026-11-06 E2E 기동에서야 드러난 쓰기 경로 결함을 스모크에서 잡는다
# 이미지 스모크: 빌드 → 실행 → /healthz, /readyz, 화면 파일, 라벨, non-root 확인.
# 고정 포트를 쓰지 않는다: 호스트 포트는 Docker가 배정한다(-p 127.0.0.1::8080). SMOKE_PORT를 주면 그 포트를 쓴다.
# 표준 docker 명령만 쓴다. 실행 파일 이름은 DOCKER 환경 변수로만 바꿀 수 있다(기본 docker).
set -euo pipefail
cd "$(dirname "$0")/.."
# 왜: 전역 ~/.docker 의 자격 도우미에 기대지 않는다(scripts/docker-env.mjs 의 설명)
eval "$(node scripts/docker-env.mjs --sh)"

DOCKER="${DOCKER:-docker}"
if ! command -v "$DOCKER" >/dev/null 2>&1; then
  echo "오류: '$DOCKER' 명령을 찾을 수 없다. Docker를 설치하거나 DOCKER 환경 변수에 실행 파일 이름을 지정하라." >&2
  exit 2
fi
if ! "$DOCKER" info >/dev/null 2>&1; then
  echo "오류: Docker 데몬에 연결할 수 없다. 데몬이 실행 중인지, 현재 사용자에게 권한이 있는지 확인하라('$DOCKER info'로 직접 확인)." >&2
  exit 2
fi
REPO=admin-console
REV="$(git rev-parse --short HEAD 2>/dev/null || echo unknown)"
# 왜 $$: 같은 커밋으로 스모크가 동시에 돌면 같은 태그를 덮어쓰고 정리에서 서로의 이미지를 지운다. 실행마다 고유한 태그를 쓰고 정리는 자기 것만 지운다.
IMAGE="${REPO}:smoke-${REV}-$$"
NAME="${REPO}-smoke-$$"
BUILD_LOG="$(mktemp)"
STATIC_LOG="$(mktemp)"
cleanup() { "$DOCKER" rm -f "$NAME" >/dev/null 2>&1 || true; "$DOCKER" rmi "$IMAGE" >/dev/null 2>&1 || true; rm -f "$BUILD_LOG" "$STATIC_LOG"; }
trap cleanup EXIT

echo "== build $IMAGE (영역 빌드 진입점 scripts/build-image.sh)"
# 왜 진입점으로 빌드: deploy가 부르는 경로와 같은 경로를 매 변경마다 확인한다(계약 BuildImageRequest/Result 2.5.0, ADR 0019).
# 계약 태그는 스모크에서만 Dockerfile의 ARG 기본값을 읽는다(deploy는 기준표 값을 요청에 담아 준다).
BC_TAG="$(sed -n 's/^ARG BOUNDARY_CONTRACTS=//p' Dockerfile)"
REQ="$(mktemp)"
cat >"$REQ" <<JSON
{"source_dir":"$(pwd)","revision":"${REV}","versions":{"boundary":"${BC_TAG}"},"image_tag":"${IMAGE}"}
JSON
RESULT="$(DOCKER="$DOCKER" bash scripts/build-image.sh "$REQ" 2>"$BUILD_LOG")" || { cat "$BUILD_LOG" >&2; rm -f "$REQ"; exit 1; }
rm -f "$REQ"
echo "$RESULT" | tail -n1 | head -c 400; echo

PUBLISH="127.0.0.1::8080"
[ -n "${SMOKE_PORT:-}" ] && PUBLISH="127.0.0.1:${SMOKE_PORT}:8080"
echo "== run"
"$DOCKER" run -d --name "$NAME" --read-only --tmpfs /tmp --cap-drop ALL --cap-add NET_BIND_SERVICE --security-opt no-new-privileges:true -p "$PUBLISH" "$IMAGE" >/dev/null
PORT="$("$DOCKER" port "$NAME" 8080/tcp | head -n1 | sed 's/.*://')"
echo "host port: $PORT"

fail() { echo "FAIL: $*" >&2; "$DOCKER" logs "$NAME" 2>&1 | tail -n 20 >&2 || true; exit 1; }
get() { curl -fsS --max-time 3 "http://127.0.0.1:${PORT}$1"; }

ok=""
for _ in $(seq 1 30); do
  if get /healthz >/dev/null 2>&1; then ok=1; break; fi
  sleep 0.5
done
[ -n "$ok" ] || fail "/healthz 응답 없음"
get /healthz | grep -q '"ok"' || fail "/healthz 본문"
get /readyz | grep -q '"ok"' || fail "/readyz 본문"
get / | grep -q 'app.js' || fail "index.html"
[ "$(get /app.js | wc -c)" -gt 1000 ] || fail "app.js"
[ "$(get /sw.js | wc -c)" -gt 1000 ] || fail "sw.js (서비스 워커)"
CODE="$(curl -s --path-as-is --max-time 3 -o /dev/null -w '%{http_code}' "http://127.0.0.1:${PORT}/../../etc/passwd")"
[ "$CODE" = "404" ] || fail "경로 이탈 응답 $CODE"

echo "== 동작 시험(tests/static-behavior.test.ts, 이미지에 대해)"
STATIC_URL="http://127.0.0.1:${PORT}" node --test tests/image/static-behavior.test.ts >"$STATIC_LOG" 2>&1 || { cat "$STATIC_LOG" >&2; rm -f "$STATIC_LOG"; fail "정적 서버 동작 시험"; }
grep -E "^ℹ (pass|fail)" "$STATIC_LOG"; rm -f "$STATIC_LOG"

echo "== HEALTHCHECK (이미지 안의 상태 확인: healthy 와 unhealthy 둘 다)"
# 시험을 빠르게 하려고 간격만 docker run 플래그로 줄인다(이미지의 명령은 그대로 쓴다).
health() { "$DOCKER" inspect -f '{{.State.Health.Status}}' "$1" 2>/dev/null || echo none; }
wait_health() {   # $1=컨테이너 $2=기다릴 상태. starting 이 끝날 때까지만 본다(상한 30초는 매달림 감시일 뿐 판정이 아니다)
  for _ in $(seq 1 60); do [ "$(health "$1")" = "$2" ] && return 0; [ "$(health "$1")" = starting ] || break; sleep 0.5; done
  [ "$(health "$1")" = "$2" ]
}
HC_FAST="--health-interval=1s --health-timeout=3s --health-start-period=0s --health-retries=1"
NAME_H="${NAME}-health"; NAME_U="${NAME}-unhealthy"; MUT="$(mktemp)"
trap '"$DOCKER" rm -f "$NAME_H" "$NAME_U" >/dev/null 2>&1 || true; rm -f "$MUT"; cleanup' EXIT
# healthy: 이미지 기본 구성(ADMIN_HOST 기본과 127.0.0.1 둘 다)
"$DOCKER" run -d --name "$NAME_H" $HC_FAST "$IMAGE" >/dev/null
wait_health "$NAME_H" healthy || { NAME="$NAME_H"; fail "HEALTHCHECK가 healthy가 되지 않았다(기본 구성): $(health "$NAME_H")"; }
"$DOCKER" rm -f "$NAME_H" >/dev/null
"$DOCKER" run -d --name "$NAME_H" -e ADMIN_HOST=127.0.0.1 $HC_FAST "$IMAGE" >/dev/null
wait_health "$NAME_H" healthy || { NAME="$NAME_H"; fail "HEALTHCHECK가 healthy가 되지 않았다(ADMIN_HOST=127.0.0.1): $(health "$NAME_H")"; }
"$DOCKER" rm -f "$NAME_H" >/dev/null
# 변이: /healthz 를 처리하지 않는 Caddyfile 을 얹으면 서버는 떠 있어도 unhealthy 여야 한다(상태 확인이 /healthz 를 실제로 본다는 증거)
sed 's#@health path /healthz /readyz#@health path /nohealth /noready#' serve/Caddyfile >"$MUT"; chmod 644 "$MUT"
cmp -s "$MUT" serve/Caddyfile && fail "변이 Caddyfile이 원본과 같다(치환 실패)"
"$DOCKER" run -d --name "$NAME_U" -v "$MUT":/etc/caddy/Caddyfile:ro $HC_FAST "$IMAGE" >/dev/null
for _ in $(seq 1 60); do [ "$(health "$NAME_U")" = unhealthy ] && break; sleep 0.5; done
[ "$(health "$NAME_U")" = unhealthy ] || { NAME="$NAME_U"; fail "변이(/healthz 없음)인데 unhealthy가 아니다: $(health "$NAME_U")"; }
"$DOCKER" rm -f "$NAME_U" >/dev/null; rm -f "$MUT"
echo "HEALTHCHECK ok"

echo "== 바인드 주소(ADMIN_HOST=127.0.0.1이면 컨테이너 밖에서 닿지 않고 안에서만 닿는다)"
NAME2="${NAME}-loop"
"$DOCKER" run -d --name "$NAME2" -e ADMIN_HOST=127.0.0.1 -p 127.0.0.1::8080 "$IMAGE" >/dev/null
trap '"$DOCKER" rm -f "$NAME2" >/dev/null 2>&1 || true; cleanup' EXIT
PORT2="$("$DOCKER" port "$NAME2" 8080/tcp | head -n1 | sed 's/.*://')"
inner=""
for _ in $(seq 1 30); do
  if "$DOCKER" exec "$NAME2" wget -q -O - http://127.0.0.1:8080/healthz >/dev/null 2>&1; then inner=1; break; fi
  sleep 0.5
done
[ -n "$inner" ] || { NAME="$NAME2"; fail "ADMIN_HOST=127.0.0.1인데 컨테이너 안에서도 닿지 않는다"; }
if curl -fsS --max-time 3 "http://127.0.0.1:${PORT2}/healthz" >/dev/null 2>&1; then NAME="$NAME2"; fail "ADMIN_HOST=127.0.0.1인데 컨테이너 밖에서 닿는다"; fi
"$DOCKER" rm -f "$NAME2" >/dev/null 2>&1

echo "== labels"
LABELS="$("$DOCKER" inspect -f '{{json .Config.Labels}}' "$IMAGE")"
for k in io.openit.service io.openit.revision io.openit.contracts.boundary io.openit.contracts.survey-schema io.openit.model-runtime; do
  echo "$LABELS" | grep -q "\"$k\"" || fail "라벨 없음: $k"
done
echo "$LABELS" | grep -q "\"io.openit.revision\":\"${REV}\"" || fail "revision 라벨 값"
echo "== non-root"
UID_IN="$("$DOCKER" exec "$NAME" id -u)"
[ "$UID_IN" != "0" ] || fail "root로 실행 중"
echo "uid=$UID_IN"
echo "== 종료 신호"
"$DOCKER" stop -t 10 "$NAME" >/dev/null
[ "$("$DOCKER" inspect -f '{{.State.ExitCode}}' "$NAME")" = "0" ] || fail "SIGTERM 뒤 종료 코드가 0이 아니다"
echo "SMOKE OK ($IMAGE)"
