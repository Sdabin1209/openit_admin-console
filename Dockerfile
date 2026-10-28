# syntax=docker/dockerfile:1
# 정적 빌드를 담은 이미지. 의존 버전은 package-lock.json으로 고정한다. 외부 CDN 없음.
FROM node:24.14.0-alpine3.22 AS build
WORKDIR /src
COPY package.json package-lock.json ./
RUN npm ci
COPY tsconfig.json ./
COPY api ./api
COPY app ./app
COPY generated ./generated
COPY scripts ./scripts
RUN node scripts/build.mjs

# 왜 Caddy: 직접 만든 정적 서버 대신 표준 file_server를 쓴다(ADR 0018). 게이트웨이도 Caddy라 같은 도구다. 태그 고정(2-alpine이 아니라 정확한 버전).
FROM caddy:2.11.7-alpine
ARG REVISION=n/a
ARG BOUNDARY_CONTRACTS=v2.2.1
# 문진 스키마는 계약 2.0부터 소비하지 않는다(모델 입출력은 boundary-contracts). ImageLabels(2.2.0): 쓰지 않으면 n/a.
ARG SURVEY_SCHEMA=n/a
LABEL io.openit.service="admin-console" \
      io.openit.revision="${REVISION}" \
      io.openit.contracts.boundary="${BOUNDARY_CONTRACTS}" \
      io.openit.contracts.survey-schema="${SURVEY_SCHEMA}" \
      io.openit.turn-engine="n/a" \
      io.openit.model-runtime="n/a"
COPY serve/Caddyfile /etc/caddy/Caddyfile
COPY --from=build /src/dist /srv
# 왜 /tmp: 비root로 실행하므로 Caddy가 쓸 수 있는 곳이 필요하다(관리 API·인증서가 꺼져 있어 쓰는 것은 거의 없다).
ENV XDG_CONFIG_HOME=/tmp XDG_DATA_HOME=/tmp
USER 65532:65532
EXPOSE 8080
CMD ["caddy", "run", "--config", "/etc/caddy/Caddyfile"]
