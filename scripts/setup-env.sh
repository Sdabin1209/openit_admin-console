#!/usr/bin/env bash
# 왜: 영역 환경 준비의 정본은 이 파일 하나다(deploy가 모든 영역의 setup-env.sh를 차례로 부른다).
# 근거: 새 머신 이전 때 README마다 설치법이 달라 어긋났다. 한 곳으로 모아 영역 간 모양을 같게 한다.
# 하는 일: node/npm이 package.json engines에 맞는지 확인하고 package-lock.json 기준으로 `npm ci`한다(멱등). 비밀은 다루지 않는다.
set -euo pipefail

# 어느 폴더에서 불러도 이 리포 루트 기준으로 일한다.
cd "$(dirname "${BASH_SOURCE[0]}")/.."

fail() { echo "setup-env: 실패: $*" >&2; exit "${2:-1}"; }

command -v node >/dev/null 2>&1 || fail "node가 없다. package.json engines.node 요구에 맞는 Node를 설치한다" 10
command -v npm >/dev/null 2>&1 || fail "npm이 없다. Node와 함께 npm을 설치한다" 11

# 요구 버전은 package.json engines에서 읽는다(스크립트에 숫자를 적지 않는다).
# 왜 직접 비교: semver 패키지는 npm ci 전에는 없고, engines가 '>=N' 꼴이어서 주 버전 비교로 충분하다.
req="$(node -e 'const e=require("./package.json").engines||{};process.stdout.write(e.node||"")')"
if [ -n "$req" ]; then
  min="$(printf '%s' "$req" | sed -n 's/^>=[[:space:]]*v\{0,1\}\([0-9][0-9]*\).*/\1/p')"
  [ -n "$min" ] || fail "engines.node '$req' 형식을 이 스크립트가 해석하지 못한다(>=N 꼴만 지원)" 12
  have="$(node -p 'process.versions.node.split(".")[0]')"
  [ "$have" -ge "$min" ] || fail "node $(node -v)는 engines.node '$req'에 맞지 않는다" 13
fi

[ -f package-lock.json ] || fail "package-lock.json이 없다(npm ci는 잠금 파일이 필요하다)" 14

# 네트워크 실패는 한 번만 재시도한다(일시적 장애 대비). 그래도 실패하면 그대로 실패시킨다.
if ! npm ci --no-audit --no-fund; then
  echo "setup-env: npm ci 실패, 5초 뒤 한 번 재시도한다" >&2
  sleep 5
  npm ci --no-audit --no-fund || fail "npm ci가 재시도 후에도 실패했다(네트워크 또는 레지스트리 접근을 확인한다)" 20
fi

echo "setup-env: 완료 (node $(node -v), npm $(npm -v))"
