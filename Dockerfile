# syntax=docker/dockerfile:1
# 기반 이미지는 digest 로 고정한다(공통 규칙 '빌드 때 고정'). 태그는 읽기 쉬우라고 남기며 digest 가 있으면 docker 는 digest 만 쓴다.
# 값: 2026-11-05 이 PC 에서 `docker pull <태그>` 로 받은 뒤 `docker image inspect --format '{{index .RepoDigests 0}}' <태그>` 로 읽은 멀티 아키텍처 index digest 다(두 이미지 모두 2026-11-05 에 받음).
# 올리는 방법: 새 태그를 `docker pull` 하고 같은 명령으로 digest 를 다시 읽어 아래 ARG 한 곳만 바꾼 뒤 이미지 시험·스모크를 다시 돌린다. 레지스트리의 태그가 움직여도 이 digest 는 그대로다(자동으로 보안 갱신을 받지 않는 대가).
ARG NODE_IMAGE=node:24.14.0-alpine3.22@sha256:76db75ca7e7da9148ae42c92d9be12d12a8d7b03e171f18339355d8078d644a0
ARG CADDY_IMAGE=caddy:2.11.7-alpine@sha256:e70b164da81ef698b3ad19af799ea6086ce6d9e48ed4079eb9fe26f6fbf14ee5
# 정적 빌드를 담은 이미지. 의존 버전은 package-lock.json으로 고정한다. 외부 CDN 없음.
FROM ${NODE_IMAGE} AS build
WORKDIR /src
COPY package.json package-lock.json ./
RUN npm ci
COPY tsconfig.json ./
COPY app ./app
COPY scripts ./scripts
RUN node scripts/build.mjs

# 왜 Caddy: 직접 만든 정적 서버 대신 표준 file_server를 쓴다(ADR 0018). 게이트웨이도 Caddy라 같은 도구다. 태그 고정(2-alpine이 아니라 정확한 버전).
FROM ${CADDY_IMAGE}
ARG REVISION=n/a
ARG BOUNDARY_CONTRACTS=v3.6.1
# 문진 스키마는 계약 2.0부터 소비하지 않는다(모델 입출력은 boundary-contracts). ImageLabels(2.2.0): 쓰지 않으면 n/a.
ARG SURVEY_SCHEMA=n/a
LABEL io.openit.service="admin-console" \
      io.openit.revision="${REVISION}" \
      io.openit.contracts.boundary="${BOUNDARY_CONTRACTS}" \
      io.openit.contracts.survey-schema="${SURVEY_SCHEMA}" \
      io.openit.model-runtime="n/a"
COPY serve/Caddyfile /etc/caddy/Caddyfile
COPY --from=build /src/dist /srv
# 왜 /tmp: 비root로 실행하므로 Caddy가 쓸 수 있는 곳이 필요하다(관리 API·인증서가 꺼져 있어 쓰는 것은 거의 없다).
ENV XDG_CONFIG_HOME=/tmp XDG_DATA_HOME=/tmp
USER 65532:65532
EXPOSE 8080
# 왜 HEALTHCHECK: 영역 이미지는 자기 상태 확인을 가진다(CONVENTIONS 13절 3.4.17). deploy 가 compose 에 대신 적지 않게 한다.
# 왜 wget: caddy:alpine 에 busybox wget 이 있고 curl 은 없다(새 패키지를 넣지 않는다). 주소는 서버가 붙은 ADMIN_HOST(기본 0.0.0.0 -> 이 컨테이너 안 loopback 과 같은 곳, 비어 있으면 127.0.0.1)이고 포트는 Caddyfile 의 8080 이다. IPv6 리터럴 ADMIN_HOST 는 대괄호가 필요해 이 확인이 닿지 않는다(AdminConsoleEnv 의 예는 IPv4).
# 값(15s/3s/5s/3회)은 측정하지 않은 시작값이다. 15s 는 이 워크스페이스의 다른 영역 이미지와 같고, 시작 5초는 Caddy 가 설정을 읽는 시간에 대한 가정이다(측정 안 함).
HEALTHCHECK --interval=15s --timeout=3s --start-period=5s --retries=3 \
  CMD wget -q -O /dev/null "http://${ADMIN_HOST:-127.0.0.1}:8080/healthz" || exit 1
CMD ["caddy", "run", "--config", "/etc/caddy/Caddyfile"]
