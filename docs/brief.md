# 영역 브리프: 운영 콘솔 (admin-console)

> **성격(D68).** 사람이 직접 쓰는 내부 운영 화면의 영역이다. 키오스크 프론트(`kiosk-frontend`)와 달리 환자용이 아니고, 이 프로젝트가 계속 소유한다. 영역 사이는 **HTTP 계약으로만** 만난다(`../boundary-contracts/HTTP.md`). 다른 영역의 코드를 읽거나 가져오지 않는다. 이 영역은 Node/TypeScript이며 Python 규칙(venv, pip)은 해당하지 않는다. 나머지 공통 규칙(커밋, 변경 요청, 컨테이너 규약, 한국어)은 같다. 자매 영역 `kiosk-frontend`의 구조(프레임워크 없는 TypeScript, esbuild, 모의 서버, 정적 이미지)를 참고해도 되지만 그 리포를 읽을 수는 없으니 이 브리프와 계약을 기준으로 만든다.

## 1. 목적과 범위

- 목적: 사람이 개입하는 운영 절차에 화면을 준다. 지금 목표는 **출고 승인 화면 하나**다(작업 단위 1). 이후 실패 사례 검토 화면, 문항 저작 화면이 이어진다.
- 하는 일(작업 단위 1): AI 학습 담당자(`release-approver`)가 승인 대기 제출 목록을 보고, 한 건을 열어 승인 요청 보고서(`ReviewReport`)를 읽고 승인 또는 반려하는 화면.
- 하지 않는 일: 승인 판단 로직(사람이 한다), 지표 계산, 릴리스 활성화/롤백 UI(후속), 서버 토큰 보관.

## 2. 소유하는 것

- 소유: 이 리포지토리의 웹 앱, 게이트 HTTP 클라이언트 모듈(`api/`), 게이트 면의 **모의 서버**(`mock-server/`).
- 모의 서버: `HTTP.md` I5와 스키마를 읽어 만든다. 승인 대기, 자동 반려, 사람 반려, 승인 완료, 낡은 `report_hash`(409 STALE_REPORT), 권한 오류(403)를 시나리오로 낼 수 있어야 한다.
- 산출물: 정적 빌드를 담은 이미지(non-root, `/healthz`, 라벨 `io.openit.*` 중 해당하는 것, 고정 포트 금지 스모크).

## 3. 소비하는 것

- **I5 GateService**(`HTTP.md`): `GET /v1/submissions?status=AWAITING_APPROVAL`(`SubmissionView` 목록), `GET /v1/submissions/{id}`, `GET /v1/submissions/{id}/review-report`(`ReviewReport`), `POST /v1/approvals`(본문 `submission_id`, `decision` APPROVE|REJECT, `approver_id`, `approver_role`, 반려 사유 `reason`, `report_hash`).
- 스키마: `../boundary-contracts/schemas`의 `SubmissionView`, `ReviewReport`, `EvaluationReport`, `GateApproval`, `GateDecision`, `BoundaryError`. 복사본을 리포에 두지 않고 생성·검증 스크립트가 읽어 온다.
- 서버 주소는 같은 출처의 `/v1`이다(배포의 게이트웨이가 프록시하고 인증을 붙인다).

## 4. 상위 수용 기준

- 모의 서버만으로 승인 흐름 전체가 시연되고 자동 시험이 통과한다.
- 보고서 화면: **SAFETY 그룹 지표를 맨 위에** 보이고, 지표마다 후보 값·표본 수(`n`)·활성 릴리스 기준값·차이·`worse` 표시를 보인다. `n=0`은 "계산 못 함"으로 표시하고 값을 믿지 않게 한다. 슬라이스(문항 세트, 본/미본 문항, 문항유형 등)별로 볼 수 있다. 자동 검사 결과(`checks`)와 노트를 보인다. **합격/불합격을 화면이 판단하지 않는다**(`worse`는 참고 표시일 뿐, 임계치 없음, D53).
- 결정 전에 확인창을 거치고, 승인자가 본 `ReviewReport`의 `report_hash`(해시 계산이 필요하면 `CONVENTIONS.md`의 규칙을 따른다)를 함께 보낸다. 409 `STALE_REPORT`이면 보고서를 새로 불러오고 다시 확인하게 한다. 반려는 사유가 필수다. 같은 결정의 중복 클릭은 한 번만 간다.
- 환자 개인정보를 다루지 않는다. 브라우저 저장소(localStorage 등)와 콘솔 로그에 보고서 내용이나 토큰을 남기지 않는다. 외부 CDN을 쓰지 않는다(의존은 잠금 파일로 고정).
- 서버 토큰이 코드·빌드·브라우저에 들어가지 않는다. 인증은 배포의 게이트웨이가 붙인다. 사람 로그인은 게이트웨이 앞단(기본 인증 가정)이고 이 영역은 승인자 식별자를 게이트웨이가 알려 주는 방식(예: 응답의 `/whoami` 같은 호출은 없음)이 계약에 없으므로, 승인자 ID 입력 방식은 변경 요청으로 헤드에게 올린다.
- 이미지가 빌드되고 `/healthz`에 응답한다(스모크, 고정 포트 금지).

## 5. 비기능 요구

- 데스크톱 브라우저. 한국어. 표가 크므로 정렬과 필터가 쉬워야 한다. 접근성 기본.

## 6. 건드리면 안 되는 경계

- 게이트의 HTTP 면 외의 경로를 호출하지 않는다. `boundary-contracts`를 수정하지 않는다(변경 요청).

## 7. 이 영역에 해당하는 열린 결정

- 승인자 식별 방식(미정, 변경 요청으로 올릴 것). 운영 인증과 HTTPS는 deploy와 함께 정한다(미정).
- 기술 스택: TypeScript와 빌드 도구는 영역이 정한다. 의존은 최소로 한다.
