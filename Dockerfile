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

FROM node:24.14.0-alpine3.22
ARG REVISION=unknown
ARG BOUNDARY_CONTRACTS=v1.3.3
ARG SURVEY_SCHEMA=1
LABEL io.openit.service="admin-console" \
      io.openit.revision="${REVISION}" \
      io.openit.contracts.boundary="${BOUNDARY_CONTRACTS}" \
      io.openit.contracts.survey-schema="${SURVEY_SCHEMA}" \
      io.openit.turn-engine="n/a" \
      io.openit.model-runtime="n/a"
WORKDIR /app
COPY --from=build /src/dist ./dist
COPY serve/static-server.mjs ./serve/static-server.mjs
ENV PORT=8080 STATIC_DIR=/app/dist
USER node
EXPOSE 8080
CMD ["node", "serve/static-server.mjs"]
