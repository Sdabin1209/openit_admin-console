# CR-001: 승인자 식별, report_hash 계산 주체, STALE_REPORT 표현

**상태: 해결(D69).** 헤드 회신: 해시는 서버 헤더 `X-Openit-Report-Hash`를 그대로 돌려보냄, 409 사유는 `details.reason`(STALE_REPORT|ALREADY_DECIDED), 승인자는 게이트웨이의 `X-Openit-User`. 아래는 원래 요청 기록이다. 브라우저의 해시 구현은 삭제했다.

- 요청 영역: admin-console, 대상: 헤드(boundary-contracts 소유), 영향: release-gate, deploy
- 근거: `HTTP.md` I5 decide 행, `CONVENTIONS.md` 2절, `ReviewReport`/`GateApproval`/`BoundaryError` 스키마(v1.3.3)를 읽고 확인한 결과.

## 1. report_hash를 누가 계산하는가 (확인한 부족)
- 확인: `report_hash`는 "승인자가 본 `ReviewReport`의 해시"이고 요청에서 선택이다. `ReviewReport`에는 해시 필드가 없고 응답 헤더 규정도 없다. 해시 규칙은 JCS+SHA-256이며 "SDK와 서비스는 자기 구현을 두지 않는다(기준 구현은 Python `canonical`)".
- 문제: 브라우저(TypeScript)는 Python 기준 구현을 쓸 수 없다. 서버가 어떤 객체(`ext` 포함 전체인지)를 해시하는지도 규정되어 있지 않다.
- 현재 구현(제안): 받은 `ReviewReport` JSON 전체를 브라우저에서 JCS 해시해 보낸다. 기준 구현이 만든 벡터 4개(숫자 `1e21`, 유니코드 키 순서, 이스케이프, 공식 예제 `ReviewReport.json` 포함)와 일치함을 시험으로 고정했다. release-gate가 같은 대상을 해시하는지는 **확인하지 못했다**.
- 제안(택일, 헤드가 정할 것):
  - A. `GET .../review-report` 응답에 서버가 계산한 해시를 싣는다(예: 응답 헤더 `X-Report-Hash` 또는 `ReviewReport.report_hash` 선택 필드 추가, MINOR). 클라이언트는 그 값을 그대로 돌려보낸다(권장: 계산 구현이 한 곳).
  - B. 해시 대상을 "받은 본문 전체"로 명문화하고, JS/TS 구현을 허용하는 예외를 CONVENTIONS 2절에 적는다(벡터 `conformance/`에 두면 좋다).
- 추가 제안: 계약 적합성 모음에 `ReviewReport` 해시 벡터를 넣어 release-gate와 이 영역이 같은 시험을 통과하게 한다.

## 2. STALE_REPORT의 표현
- 확인: `HTTP.md`는 "409(`STALE_REPORT`)"라고만 쓴다. `BoundaryError.code` 열거에 `STALE_REPORT`가 없고 9절 표는 409를 `CONFLICT`로 고정한다. 같은 409가 "다른 결정이 이미 있음"에도 쓰인다.
- 현재 구현(제안): 409 본문 어디에든 문자열 `STALE_REPORT`가 있으면 낡은 보고서, 아니면 다른 결정 충돌로 처리한다. 모의 서버는 `message`와 `details.reason`에 둔다.
- 제안: `details.reason = "STALE_REPORT"`(code는 `CONFLICT`)로 고정하고 `HTTP.md`에 쓴다. 가능하면 `details.current_report_hash`도 준다.

## 3. 승인자 ID (미정)
- 확인: 계약에 승인자를 알려 주는 호출이 없다. `approver_role`은 토큰에 묶여 서버가 검증한다(INTERFACES I5). `approver_id`는 `GateApproval`의 필수 필드(Id 형식)다.
- 현재 구현(제안): `approver_role`은 `release-approver` 상수, `approver_id`는 화면에서 직접 입력(위조 가능, 기록용).
- 제안(택일): (a) 게이트웨이가 인증한 사용자 ID를 요청 헤더로 붙이고 release-gate가 `approver_id`를 그 값으로 덮어쓴다(본문 `approver_id`는 생략 가능하게), (b) 게이트웨이의 `GET /whoami`류 읽기 경로, (c) 지금처럼 직접 입력(내부 소수 인원 가정). 운영 인증과 함께 deploy와 정할 것.
