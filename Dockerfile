# syntax=docker/dockerfile:1
# 정적 빌드를 담은 이미지. 의존 버전은 package-lock.json으로 고정한다. 외부 CDN 없음.
FROM node:24.14.0-alpine3.22 AS build
WORKDIR /src
COPY package.json package-lock.json ./
RUN npm ci
COPY tsconfig.json ./
COPY app ./app
COPY scripts ./scripts
RUN node scripts/build.mjs

# 왜 Caddy: 직접 만든 정적 서버 대신 표준 file_server를 쓴다(ADR 0018). 게이트웨이도 Caddy라 같은 도구다. 태그 고정(2-alpine이 아니라 정확한 버전).
FROM caddy:2.11.7-alpine
ARG REVISION=n/a
ARG BOUNDARY_CONTRACTS=v3.4.17
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
