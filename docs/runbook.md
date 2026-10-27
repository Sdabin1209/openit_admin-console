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
npm test                       # 42개
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
