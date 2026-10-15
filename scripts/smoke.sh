#!/usr/bin/env bash
# 이미지 스모크: 빌드 → 실행 → /healthz, /readyz, 화면 파일, 라벨, non-root 확인.
# 고정 포트를 쓰지 않는다: 호스트 포트는 Docker가 배정한다(-p 127.0.0.1::8080). SMOKE_PORT를 주면 그 포트를 쓴다.
# 이 PC(WSL)에서는 docker.exe를 쓴다. DOCKER 환경 변수로 바꿀 수 있다.
set -euo pipefail
cd "$(dirname "$0")/.."

DOCKER="${DOCKER:-}"
if [ -z "$DOCKER" ]; then
  if command -v docker.exe >/dev/null 2>&1; then DOCKER=docker.exe; else DOCKER=docker; fi
fi
REPO=admin-console
REV="$(git rev-parse --short HEAD 2>/dev/null || echo unknown)"
IMAGE="${REPO}:smoke-${REV}"
NAME="${REPO}-smoke-$$"
cleanup() { "$DOCKER" rm -f "$NAME" >/dev/null 2>&1 || true; }
trap cleanup EXIT

echo "== build $IMAGE"
"$DOCKER" build --build-arg "REVISION=${REV}" -t "$IMAGE" . >/tmp/${REPO}-smoke-build.$$.log 2>&1 || { cat /tmp/${REPO}-smoke-build.$$.log >&2; exit 1; }

PUBLISH="127.0.0.1::8080"
[ -n "${SMOKE_PORT:-}" ] && PUBLISH="127.0.0.1:${SMOKE_PORT}:8080"
echo "== run"
"$DOCKER" run -d --name "$NAME" -p "$PUBLISH" "$IMAGE" >/dev/null
PORT="$("$DOCKER" port "$NAME" 8080/tcp | head -n1 | tr -d '\r' | sed 's/.*://')"
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
get /config.json | grep -q dev_approver_id || fail "/config.json"
[ "$(get /app.js | wc -c)" -gt 1000 ] || fail "app.js"
CODE="$(curl -s --path-as-is --max-time 3 -o /dev/null -w '%{http_code}' "http://127.0.0.1:${PORT}/../../etc/passwd")"
[ "$CODE" = "404" ] || fail "경로 이탈 응답 $CODE"

echo "== labels"
LABELS="$("$DOCKER" inspect -f '{{json .Config.Labels}}' "$IMAGE" | tr -d '\r')"
for k in io.openit.service io.openit.revision io.openit.contracts.boundary io.openit.contracts.survey-schema io.openit.turn-engine io.openit.model-runtime; do
  echo "$LABELS" | grep -q "\"$k\"" || fail "라벨 없음: $k"
done
echo "$LABELS" | grep -q "\"io.openit.revision\":\"${REV}\"" || fail "revision 라벨 값"
echo "== non-root"
UID_IN="$("$DOCKER" exec "$NAME" id -u | tr -d '\r')"
[ "$UID_IN" != "0" ] || fail "root로 실행 중"
echo "uid=$UID_IN"
echo "SMOKE OK ($IMAGE)"
