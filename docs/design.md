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
| 결정 | `POST /v1/approvals` 본문 `{submission_id, decision, approver_role, reason?, report_hash, approver_id(개발 모드만)}` | 201 `GateApproval`, 같은 결정 재전송은 200, 다른 결정이면 409 |

오류는 `BoundaryError` 본문이다. 403은 권한 없음(토큰의 역할이 `release-approver`가 아님), 404는 대상 없음, 409는 아래 3절, 503/네트워크 오류는 `UNAVAILABLE`로 재시도 안내를 보인다. 서버 주소는 같은 출처의 `/v1`이고 `Authorization` 헤더는 게이트웨이가 붙인다(이 영역은 토큰을 다루지 않는다).

## 3. `report_hash`와 409 (D69 반영, 확인: HTTP.md I5 "승인 요청의 해시·충돌·승인자")

- 해시는 서버 한 곳이 만든다. `GET .../review-report` 응답 헤더 `X-Openit-Report-Hash`를 **계산하지 않고** 그대로 `POST /v1/approvals`의 `report_hash`로 돌려보낸다. 클라이언트에 JCS/SHA-256 구현은 없다. 헤더가 없거나 형식이 틀리면 응답을 거부한다.
- 409 사유는 `BoundaryError.details.reason`으로만 구분한다(문자열 검색 없음). `STALE_REPORT`이면 보고서를 새로 불러오고(새 헤더 해시) 처음부터 다시 확인하게 한다(자동 재전송 없음). `ALREADY_DECIDED`이면 이미 다른 결정이 있다고 알리고 목록을 새로 보게 한다.

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

모의 서버는 `X-Openit-Report-Hash`를 내고 `report_hash`를 대조하며, `X-Openit-User`(없으면 게이트웨이를 흉내 내는 옵션)를 `approver_id`로 쓰고, 같은 결정 재전송은 200, 다른 결정은 409 CONFLICT, 반려에 사유 없으면 400을 낸다. 출력은 자동 시험에서 `../boundary-contracts/schemas`로 검증한다(복사 없음).

## 5. 디렉터리 구조

```
api/          게이트 HTTP 클라이언트(types, client). UI와 무관
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

## 8. 승인자 식별 (D69 반영)

게이트웨이가 인증 뒤 `X-Openit-User`를 붙이고 서버가 그 값을 `approver_id`로 쓴다. 화면에는 승인자 입력이 없고 "게이트웨이가 인증한 사용자로 기록됨" 안내만 있다. `approver_role`은 `release-approver` 상수(기록용). 본문 `approver_id`는 개발 모드 설정 `ADMIN_DEV_APPROVER_ID`가 있을 때만 보낸다(정적 서버가 `/config.json`으로 화면에 전달, 운영에서는 설정하지 않는다).

## 9. 열린 것

실제 release-gate와의 연동 시험은 하지 못했다(모의 서버만). 게이트웨이 경로는 CR-002(헤드가 deploy에 전달). CR-001은 D69로 답을 받아 반영했다.
