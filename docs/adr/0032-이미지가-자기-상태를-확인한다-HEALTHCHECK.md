# ADR 0032: 이미지가 자기 /healthz 를 보는 HEALTHCHECK 를 가진다

상태: 채택 (2026-11-05). 계약 CONVENTIONS 13절 3.4.17(영역 이미지는 자기 실행 명령, 상태 확인(Dockerfile `HEALTHCHECK`), 실행 사용자를 갖는다).

## 맥락
이미지에 HEALTHCHECK 가 없어 deploy 가 compose healthcheck 를 대신 적고 있었다. 서버의 주소·경로를 deploy 가 알게 되는 구조다(구조 규칙 1).

## 결정
Dockerfile 에 `HEALTHCHECK --interval=15s --timeout=3s --start-period=5s --retries=3 CMD wget -q -O /dev/null "http://${ADMIN_HOST:-127.0.0.1}:8080/healthz"`.

## 왜
- 계약이 이미지가 상태 확인을 갖게 정했다(3.4.17). `/healthz` 는 Caddyfile 이 이미 내는 살아 있음 경로다(워크스페이스 규칙).
- wget: `caddy:alpine` 에 busybox wget 이 있고 curl 이 없다. 패키지를 더하지 않는다.
- 주소: 서버는 `ADMIN_HOST`(기본 0.0.0.0, TLS 사이드카 뒤에서는 127.0.0.1)에 붙는다. 127.0.0.1 에만 붙은 경우와 기본 둘 다 같은 식으로 닿는다.
- 값 15s/3s/5s/3회: **측정하지 않은 시작값**이다. 15초는 이 워크스페이스의 다른 영역 이미지 값을 따른 것이고, 시작 5초는 Caddy 가 설정을 읽는 시간에 대한 가정이다. 정적 서버가 `/healthz` 를 상수로 답하므로 3초 시간 제한은 넉넉하다고 본다(측정 안 함).

## 검토한 대안
- deploy 의 compose healthcheck 유지: 서버 안의 경로·포트를 deploy 가 알게 된다. 버린다.
- Caddy 의 `caddy validate` 같은 프로세스 확인: 포트가 실제로 답하는지 보지 못한다. 버린다.

## 결과
얻는 것: 이미지가 스스로 서는 단위가 된다. `scripts/smoke.sh` 가 healthy(기본·ADMIN_HOST=127.0.0.1)와 변이(`/healthz` 를 처리하지 않는 Caddyfile 을 얹으면 unhealthy)를 이미지로 확인한다. `tests/hygiene.test.ts` 가 선언의 모양을 본다.
감수하는 것: IPv6 리터럴 `ADMIN_HOST` 는 대괄호가 없어 확인이 닿지 않는다(계약의 예는 IPv4, 해당 값은 쓰이지 않는다). 간격·시간 제한은 측정하지 않았다.

## 되돌리는 조건
정적 서버가 바뀌거나(경로·포트) 계약이 상태 확인 형식을 바꾸면 새 ADR 로 대체한다.
