# 런북: admin-console

정적 웹 화면(승인, 실패 사례 검토). 서버는 정적 파일만 낸다. 계약 기준은 boundary-contracts v2.0.2.

## 설치
전제: Node 24 이상. 이미지 스모크에는 Docker와 curl.
```bash
cd admin-console
npm ci
```

## 시험
```bash
npm run typecheck
npm test                       # 66개 통과, 건너뜀 0 (작업 단위 5 기준)
node scripts/gen-schemas.mjs --check   # 생성 검증기가 ../boundary-contracts와 같은지(이웃 폴더 필요)
npm run smoke                  # 이미지 빌드, /healthz, 라벨 확인(포트는 Docker가 배정)
```

## 실행
```bash
npm run build && npm start     # dist/ 정적 서버, PORT 기본 8080
npm run mock                   # 모의 게이트·FailureStore(개발용)
docker build --build-arg REVISION=$(git rev-parse --short HEAD) -t admin-console:local .
docker run --rm -p 127.0.0.1::8080 admin-console:local
```
설정은 환경 변수(`PORT`, `STATIC_DIR`, 개발용 `ADMIN_DEV_APPROVER_ID`)로만 받는다. 비밀 값은 없다. 토큰은 게이트웨이가 붙인다.

## 계약 버전을 올릴 때
1. 이웃 `boundary-contracts`를 새 태그로 맞춘다.
2. `node scripts/gen-schemas.mjs`로 `generated/contract-validators.cjs`를 다시 만든다.
3. Dockerfile `ARG BOUNDARY_CONTRACTS`, `docs/boundary.md`를 고친다. `npm test`로 모의 서버가 새 스키마를 지키는지 확인한다.

## 장애
- `/healthz`가 응답하지 않음: 컨테이너 로그(표준 출력)를 본다. 정적 서버라 외부 의존이 없다.
- 화면이 API 오류: 게이트웨이의 `/v1` 프록시와 인증을 확인한다(이 영역 밖).

## 승인 화면의 지표 표시 (v2)
- 화면은 지표 이름과 분리 기준을 해석하지 않는다. 새 지표·새 그룹·새 분리 기준이 와도 그대로 보인다(모르는 그룹은 이름 뒤에 '(새 그룹)'). 같은 그룹 안에서 LORA_A가 LORA_B보다 먼저 나온다.
- 화면이 이상하면 `node --test tests/v2-report-ui.test.ts`로 DOM 단언을 먼저 돌린다(jsdom이며 브라우저가 아니다).

## 릴리스 운영 화면 (`#/ops`, D85)
- 하는 일: 현재 활성 릴리스와 릴리스 이력을 보고, 릴리스를 활성화하고, 이전 릴리스로 롤백한다. 두 동작 모두 대상 릴리스 ID를 입력해야 실행되고, 끝나면 영수증(포인터 버전, 시각)을 보인다.
- 게이트웨이가 열어 줘야 하는 경로(operator 역할 계정만): `GET /v1/active-pointer`, `GET /v1/releases`, `POST /v1/activate`, `POST /v1/rollback`. 2026-10-27 기준 `deploy/config/Caddyfile`에는 없다(CR-004). 없으면 화면은 404로 "요청에 실패했다"를 보인다.
- 오류 문구: 403 = operator 역할이 아님. 409 = 다른 운영자가 먼저 바꿈(화면이 현재 상태를 다시 읽는다). 412 = 게이트 결정이 PASS가 아님. 연결 실패 = 적용 여부를 모르니 새로고침으로 확인.
- 누가 했는지는 서버가 게이트웨이 헤더 `X-Openit-User`로 기록한다. 화면은 이름·역할을 보내지 않는다. 화면에서 '활성화한 사람'과 포인터 변경 이력은 볼 수 없다(계약에 없음, CR-004).
- 롤백이 이상하게 보이면 게이트에서 `GET /v1/active-pointer`로 실제 포인터를 확인한다. 롤백 요청 본문에 `requested_by_role`을 보내지 않는데, release-gate가 이를 거절하면 400이 나온다(CR-004 2항).
- 개발에서 눈으로 보기: `npm run build && npm run mock` 뒤 출력된 주소의 `#/ops`. 모의 서버는 rel-0003이 활성이고 rel-0004가 활성화 후보다.
- 시험: `node --test tests/ops.test.ts tests/ops-ui.test.ts tests/ops-conformance.test.ts` (jsdom, 브라우저 아님).
