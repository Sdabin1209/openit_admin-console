# admin-console 설계 (작업 단위 1: 출고 승인 화면)

상태 표기: **확인**은 계약 파일을 읽고 확인한 것, **제안**은 이 영역이 정한 것, **미정**은 헤드나 다른 영역이 정할 것이다. 읽은 계약: `boundary-contracts` v1.3.3의 `HTTP.md`, `CONVENTIONS.md`, `INTERFACES.md`, `METRICS.md`, 스키마 `ReviewReport`, `EvaluationReport`, `GateApproval`, `SubmissionView`, `BoundaryError`, `_common`, 기준 구현 `canonical.py`와 `clients/releases.py`(읽기 전용). release-gate 리포지토리는 읽지 않았다.

## 1. 화면 흐름과 상태

목록 → 보고서 → (확인창) → 결과, 한 페이지 앱이고 해시 라우팅(`#/`, `#/s/{submission_id}`)을 쓴다.

1. 목록: `status=AWAITING_APPROVAL` 제출을 보인다(제출 ID, 제출 시각, 제출 역할, 대상 ID·버전). 새로고침 버튼. 다음 페이지가 있으면 더 보기.
2. 보고서: 맨 위에 제출 정보와 `checks`, 그 아래 **SAFETY 지표**, 그 아래 나머지 그룹(ACCURACY, PROTECTION, ROBUSTNESS, COVERAGE, REGRESSION, OTHER와 모르는 그룹)과 `notes`. 지표 표는 역할(LORA_A/B), 이름, 슬라이스, 후보 값, 표본 수, 기준값(활성 릴리스), 차이, 나빠짐 표시. 슬라이스 종류별 필터와 열 정렬이 있다.
3. 결정: 승인자 ID 입력(제안, 아래 8절), 승인/반려 버튼. 반려는 사유가 비면 막는다. 누르면 확인창(보고서 해시 앞부분, 결정, 사유를 다시 보임) → 확정하면 전송.
4. 결과: 성공이면 결정과 `approval_id`를 보이고 목록으로 돌아간다.

화면 상태(`phase`): `list-loading | list | report-loading | report | confirming | submitting | done | stale | error`. `submitting` 동안 결정 버튼은 모두 잠기고 같은 제출에 대한 요청은 하나만 날아간다(요청 키 = 제출 ID+결정).

화면은 합격/불합격을 판단하지 않는다. `worse`는 "나빠짐(참고)" 표시만 하고 색만으로 구분하지 않는다. `n=0`이면 값 칸에 "계산 못 함"을 쓰고 값과 차이를 숨긴다. 기준값의 `baseline_n`이 0이면 기준값도 "계산 못 함"이다. `baseline`이 null이면 "기준 없음"이다.

## 2. HTTP 대응표 (확인: HTTP.md I5)

| 화면 동작 | 호출 | 응답 |
| --- | --- | --- |
| 목록 | `GET /v1/submissions?status=AWAITING_APPROVAL&limit=&cursor=` | `{items: SubmissionView[], next_cursor}` |
| 제출 정보 | `GET /v1/submissions/{id}` | `SubmissionView`(404 가능) |
| 보고서 | `GET /v1/submissions/{id}/review-report` | `ReviewReport`. 자동 검사 전이면 409(CONFLICT) |
| 결정 | `POST /v1/approvals` 본문 `{submission_id, decision, approver_id, approver_role, reason?, report_hash}` | 201 `GateApproval`, 같은 결정 재전송은 200, 다른 결정이면 409 |

오류는 `BoundaryError` 본문이다. 403은 권한 없음(토큰의 역할이 `release-approver`가 아님), 404는 대상 없음, 409는 아래 3절, 503/네트워크 오류는 `UNAVAILABLE`로 재시도 안내를 보인다. 서버 주소는 같은 출처의 `/v1`이고 `Authorization` 헤더는 게이트웨이가 붙인다(이 영역은 토큰을 다루지 않는다).

## 3. `report_hash`와 STALE_REPORT

확인한 것:
- `HTTP.md`: `report_hash`는 "승인자가 본 `ReviewReport`의 해시". 요청에서 **선택**이다. 보내면 현재 보고서와 대조해 다르면 409 `STALE_REPORT`, 보내지 않으면 서버가 현재 값을 채운다.
- `CONVENTIONS.md` 2절: 해시는 `sha256:` + JCS(RFC 8785) 정규화 바이트의 SHA-256. 기준 구현은 Python `canonical.sha256_hash`뿐이고 "SDK와 서비스는 자기 구현을 두지 않는다"고 한다.
- `ReviewReport` 스키마에는 `report_hash`나 `content_hash` 필드가 없고, 응답 헤더로 해시를 주는 규정도 없다. 따라서 승인자가 본 보고서의 해시를 얻는 방법은 **클라이언트가 받은 JSON을 직접 JCS 해시**하는 것뿐이다.
- `STALE_REPORT`는 `BoundaryError.code` 열거값에 없다(409는 `CONFLICT`). 어디에 담기는지(`details`, `message`) 규정이 없다.

제안(구현한 방식):
- 해시 대상은 **받은 `ReviewReport` JSON 전체**(`ext`와 모르는 필드 포함, 파싱한 그대로, 키 제외 없음)다. 브라우저에서 RFC 8785를 TypeScript로 구현한다(`api/jcs.ts`, 숫자는 ES `Number#toString`이 JCS와 같은 규칙, 키는 UTF-16 코드 단위 순). 규약상 "자기 구현 금지"와 충돌하므로 **기준 구현이 만든 시험 벡터**(`tests/fixtures/hash-vectors.json`, `canonical.py`로 생성)와 일치하는지 자동 시험으로 고정한다. 규약 예외 승인 또는 서버가 해시를 내려 주는 방식은 변경 요청 CR-001로 올린다.
- 409 판별: 응답 본문의 `code`/`details`/`message` 어디든 `STALE_REPORT` 문자열이 있으면 낡은 보고서로 본다. 그 외의 409는 "이미 다른 결정이 있음"으로 보이고 목록을 새로 불러오게 한다(이 구분도 CR-001에서 확정 요청).
- STALE_REPORT이면 보고서를 새로 불러오고, 새 해시로 **처음부터 다시 확인**하게 한다(자동 재전송 없음). 바뀐 보고서를 승인자가 다시 읽어야 하기 때문이다.

## 4. 모의 서버 시나리오 (`mock-server/`)

`HTTP.md` I5와 스키마를 따르는 Node `http` 서버다. 시나리오는 제출 ID로 고른다(고정 데이터, 서버 시작 시 `MOCK_SCENARIO` 또는 기본 전체 세트).

| 제출 | 상태 | 용도 |
| --- | --- | --- |
| `sub-await` | AWAITING_APPROVAL | 정상 승인/반려 흐름, 지표 다양(SAFETY worse, n=0, 기준 없음, 여러 슬라이스) |
| `sub-await-stale` | AWAITING_APPROVAL | 첫 결정 시도에서 보고서가 바뀐 것으로 응답(409 STALE_REPORT), 이후 새 보고서 |
| `sub-await-403` | AWAITING_APPROVAL | 결정이 403 PERMISSION_DENIED |
| `sub-await-slow` | AWAITING_APPROVAL | 결정 응답을 지연(중복 클릭 시험) |
| `sub-pending` | PENDING_CHECK | 보고서 409 |
| `sub-rejected-auto` | REJECTED_AUTO | 목록 필터 확인 |
| `sub-rejected-human`, `sub-passed` | 사람 반려, 승인 완료 | 결정 완료 상태 |

모의 서버도 같은 JCS 해시로 현재 보고서와 `report_hash`를 대조하고, 같은 결정 재전송은 200, 다른 결정은 409 CONFLICT, 반려에 사유 없으면 400을 낸다. 출력은 자동 시험에서 `../boundary-contracts/schemas`로 검증한다(복사 없음).

## 5. 디렉터리 구조

```
api/          게이트 HTTP 클라이언트(types, jcs, client). UI와 무관
app/          화면(view-model, controller, views, main, index.html, style.css)
mock-server/  모의 게이트 + 개발용 정적 서빙
serve/        이미지에서 쓰는 정적 서버(/healthz, /readyz)
scripts/      build.mjs, smoke.sh
tests/        node:test 시험, fixtures/
Dockerfile, package.json, package-lock.json
```

## 6. 기술 선택과 이유

- TypeScript, 프레임워크 없음, 직접 DOM. 화면 둘이고 의존을 최소로 하라는 브리프에 맞다. 자바스크립트 상태는 view-model/controller에 두고 DOM은 얇게 둬서 로직을 DOM 없이 시험한다.
- 빌드는 esbuild(번들 하나, 외부 CDN 없음), 타입 검사는 tsc. 시험은 Node 내장 `node:test`(Node 24가 타입을 직접 벗긴다). 스키마 검증은 개발 의존 ajv(시험 전용, 이미지에 들어가지 않는다). 잠금 파일 `package-lock.json`, `npm ci`로 설치.
- 이미지는 다단계: Node로 빌드 → `node:alpine` 위에서 작은 정적 서버(의존 없음)를 non-root로 실행. 설정은 환경 변수(`PORT`). 브라우저 저장소를 쓰지 않고 `console`에 보고서 내용을 찍지 않는다.

## 7. 비밀과 개인정보

토큰은 코드·빌드·브라우저에 없다. 보고서는 메모리에만 두고 localStorage/sessionStorage/IndexedDB/콘솔 로그에 남기지 않는다(시험이 소스 검색으로 확인).

## 8. 승인자 식별 (미정, CR-001)

계약에는 승인자 ID를 알려 주는 호출이 없다. `approver_role`은 토큰에 묶여 서버가 검증하고 요청 값은 기록용이다(INTERFACES I5). 제안으로 `approver_role`은 `release-approver` 상수, `approver_id`는 승인자가 화면에서 직접 입력(Id 형식 검증)한다. 직접 입력은 위조 가능하므로 게이트웨이가 확인한 ID를 주는 방식이 더 낫다(CR-001).

## 9. 열린 것

실제 release-gate와의 연동 시험은 하지 못했다(모의 서버만). 보고서 해시 방식, STALE_REPORT 표현, 게이트웨이 경로(`/v1/submissions*`, `/v1/approvals`를 `release-approver` 토큰으로 프록시)는 CR-001, CR-002로 올린다.
