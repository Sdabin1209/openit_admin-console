#!/usr/bin/env bash
# 이미지 스모크: 빌드 → 실행 → /healthz, /readyz, 화면 파일, 라벨, non-root 확인.
# 고정 포트를 쓰지 않는다: 호스트 포트는 Docker가 배정한다(-p 127.0.0.1::8080). SMOKE_PORT를 주면 그 포트를 쓴다.
# 표준 docker 명령만 쓴다. 실행 파일 이름은 DOCKER 환경 변수로만 바꿀 수 있다(기본 docker).
set -euo pipefail
cd "$(dirname "$0")/.."

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
IMAGE="${REPO}:smoke-${REV}"
NAME="${REPO}-smoke-$$"
BUILD_LOG="$(mktemp)"
cleanup() { "$DOCKER" rm -f "$NAME" >/dev/null 2>&1 || true; rm -f "$BUILD_LOG"; }
trap cleanup EXIT

echo "== build $IMAGE"
"$DOCKER" build --build-arg "REVISION=${REV}" -t "$IMAGE" . >"$BUILD_LOG" 2>&1 || { cat "$BUILD_LOG" >&2; exit 1; }

PUBLISH="127.0.0.1::8080"
[ -n "${SMOKE_PORT:-}" ] && PUBLISH="127.0.0.1:${SMOKE_PORT}:8080"
echo "== run"
"$DOCKER" run -d --name "$NAME" -p "$PUBLISH" "$IMAGE" >/dev/null
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
CODE="$(curl -s --path-as-is --max-time 3 -o /dev/null -w '%{http_code}' "http://127.0.0.1:${PORT}/../../etc/passwd")"
[ "$CODE" = "404" ] || fail "경로 이탈 응답 $CODE"

echo "== labels"
LABELS="$("$DOCKER" inspect -f '{{json .Config.Labels}}' "$IMAGE")"
for k in io.openit.service io.openit.revision io.openit.contracts.boundary io.openit.contracts.survey-schema io.openit.turn-engine io.openit.model-runtime; do
  echo "$LABELS" | grep -q "\"$k\"" || fail "라벨 없음: $k"
done
echo "$LABELS" | grep -q "\"io.openit.revision\":\"${REV}\"" || fail "revision 라벨 값"
echo "== non-root"
UID_IN="$("$DOCKER" exec "$NAME" id -u)"
[ "$UID_IN" != "0" ] || fail "root로 실행 중"
echo "uid=$UID_IN"
echo "SMOKE OK ($IMAGE)"
