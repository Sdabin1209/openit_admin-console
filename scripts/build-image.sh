#!/usr/bin/env bash
# 영역 빌드 진입점(계약 BuildImageRequest/BuildImageResult 2.5.0, U42): bash scripts/build-image.sh <요청 JSON 파일>
# 논리는 build-image.mjs에 있다(계약 검증기가 Node로 생성돼 있다). 이 파일은 어느 폴더에서 불러도 리포 루트에서 실행하게 하는 얇은 껍데기다.
set -euo pipefail
cd "$(dirname "${BASH_SOURCE[0]}")/.."
command -v node >/dev/null 2>&1 || { echo "build-image: node가 없다(package.json engines)" >&2; exit 10; }
exec node scripts/build-image.mjs "$@"
