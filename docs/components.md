# 컴포넌트 분해 (U400, D117)

입력은 이 영역이 계약(boundary-contracts, 고정 태그는 Dockerfile ARG)과 브리프(`docs/brief.md`)에서 받고 내는 것이다. 그 일을 업무 단계로 나눠 컴포넌트를 정했다. 기존 코드는 정의의 근거가 아니라 빠진 업무 규칙·거부 조건을 찾는 대조 자료로만 썼다(대조 결과는 `schemas/README.md`).

## 1. 업무와 단계

브리프의 일: 사람이 개입하는 운영 절차에 화면을 준다. 세 화면이다.

| 화면 | 업무 단계 |
| --- | --- |
| 출고 승인 | 승인 대기 목록 읽기 -> 보고서와 해시 읽기 -> 지표를 표로 만들기(SAFETY 맨 위, n=0 불신) -> 결정 초안 받기(반려는 사유 필수) -> 확인(제출 ID 입력) -> 결정 보내기 -> 오류를 다음 일로 바꾸기(STALE_REPORT면 보고서 다시) |
| 실패 사례 검토 | 사례 목록·상세·비식별 trace 읽기 -> trace로 편집창 채우기 -> 검토 폼을 검토 요청으로 바꾸기(모델 입출력 계약 검사) -> 검토 보내기 -> 오류를 다음 일로 바꾸기 |
| 릴리스 운영 | 활성 포인터·릴리스 목록 읽기 -> 활성화·롤백 후보 고르기 -> 확인 폼을 요청으로 바꾸기(롤백은 사유·근거·현재 활성 필요) -> 보내기 -> 오류를 종류로 구분해 알리기 |
| 공통 | 주소를 화면·대상으로 바꾸기, 시각 표시 |

## 2. 컴포넌트 표

컴포넌트는 `app/components/<이름>.ts`의 함수 하나이고 입력 스키마 하나에서 출력 스키마 하나를 낸다(`app/types/`는 `schemas/`에서 생성). 업무 컴포넌트는 HTTP와 계약 타입을 모른다. 폼 컴포넌트는 받아들이지 않으면 `FormIssues`를 낸다. 모든 `link_*`의 출력은 성공이면 표의 타입, 실패면 `ErrorInfo`다(`{ok:true,value}` 또는 `{ok:false,error}`).

### 업무 컴포넌트

| 컴포넌트 | 파일 | 입력 타입 | 출력 타입 | 하는 일 |
| --- | --- | --- | --- | --- |
| report_view | `components/report_view.ts` | `ReportViewRequest` | `ReportView` | 지표 비교를 그룹(SAFETY 맨 위)·슬라이스 필터·정렬한 표로 만든다. n=0은 계산 못 함, 기준 없음 구분. 합격/불합격 판단 없음(D53) |
| approval_draft | `components/approval_draft.ts` | `ApprovalDraft` | `ApprovalDecision` 또는 `FormIssues` | 결정 버튼 입력을 결정으로 만든다. 반려는 사유 필수 |
| approval_confirm | `components/approval_confirm.ts` | `ApprovalConfirmInput` | `ApprovalDecision` 또는 `FormIssues` | 확인창에 제출 ID를 그대로 입력해야 확정(ADR 0014) |
| approval_failure | `components/approval_failure.ts` | `ApprovalFailureInput` | `ApprovalFailure` | 승인 화면의 오류를 다음 일(보고서 다시, 머묾, 오류 화면)과 문구로 바꾼다 |
| case_review_draft | `components/case_review_draft.ts` | `CaseReviewForm` | `CaseReviewDraft` 또는 `FormIssues` | 검토 폼을 검토 요청으로 만든다. 종류별 모델 입출력은 계약 스키마로 검사 |
| case_trace_prefill | `components/case_trace_prefill.ts` | `TracePrefillInput` | `TracePrefill` | trace의 입력을 편집창에 채울 글로 바꾼다 |
| case_failure | `components/case_failure.ts` | `CaseFailureInput` | `CaseFailure` | 사례 화면의 오류를 다음 일과 문구로 바꾼다 |
| release_candidates | `components/release_candidates.ts` | `ReleaseCandidatesInput` | `ReleaseCandidates` | 활성화 후보(활성보다 새 것)와 롤백 후보(오래된 것)를 고른다 |
| ops_request | `components/ops_request.ts` | `OpsRequestInput` | `OpsRequest` 또는 `FormIssues` | 확인 폼을 활성화·롤백 요청으로 만든다. 롤백은 사유·근거 ID·현재 활성 필요 |
| ops_failure | `components/ops_failure.ts` | `OpsFailureInput` | `OpsNotice` | 릴리스 운영 오류를 종류(403, 409, 412, 네트워크 등)로 구분한 알림으로 바꾼다 |
| route_parse | `components/route_parse.ts` | `RouteInput` | `Route` | 주소 해시를 화면과 대상 ID로 바꾼다. 읽을 수 없는 ID는 bad_address |
| time_display | `components/time_display.ts` | `TimeInput` | `TimeText` | 서버 시각 원문 옆에 현지 시각을 덧붙인다 |

### 통신 컴포넌트 (보내는 쪽만, 받는 쪽 서버 면은 없다)

이웃을 부르는 일은 `link_*`만 한다. 통신 기반 라이브러리 `link`(D118)는 Python이라 이 영역에 해당 없다. 계약 규약(BoundaryError 해석, 401/403/409/413 구분, `retryable`, 전송 한도 응답, `X-Openit-User`는 게이트웨이가 붙임)은 `link_http_send.ts` 한 곳에서만 다룬다. 나머지 `link_*`는 그 컴포넌트를 import하지 않고 입출력 스키마(`HttpRequestSpec` -> `HttpOutcome`)만 알며, wiring이 주입한다(규칙 3). 나머지 `link_*`가 하는 일은 계약 본문 <-> 내부 타입 변환과 응답의 계약 검사뿐이다.

| 컴포넌트 | 파일 | 입력 타입 | 출력 타입 | 하는 일 |
| --- | --- | --- | --- | --- |
| link_http_send | `components/link_http_send.ts` | `HttpRequestSpec` (설정 `HttpSendConfig`) | `HttpOutcome` | 같은 출처 `/v1`로 JSON 요청을 보내고 오류를 `ErrorInfo`로 바꾼다. 본문을 다 읽을 때까지 시간 제한 |
| link_gate_list_awaiting | `components/link_gate_list_awaiting.ts` | `ListAwaitingInput` | `SubmissionPage` | I5 `GET /v1/submissions?status=AWAITING_APPROVAL` |
| link_gate_review_report | `components/link_gate_review_report.ts` | `SubmissionIdInput` | `LoadedReport` | I5 `GET .../review-report` + 응답 헤더 `X-Openit-Report-Hash` |
| link_gate_decide | `components/link_gate_decide.ts` | `ApprovalDecision` | `ApprovalResult` | I5 `POST /v1/approvals` (계약 `ApprovalRequest`) |
| link_release_active_pointer | `components/link_release_active_pointer.ts` | (없음) | `ActivePointerState` | I4 `GET /v1/active-pointer` |
| link_release_list | `components/link_release_list.ts` | (없음) | `ReleaseList` | I4 `GET /v1/releases` (모든 쪽) |
| link_release_activate | `components/link_release_activate.ts` | `ActivateInput` | `PointerRecord` | I5 `POST /v1/activate` (계약 `ActivateRequest`) |
| link_release_rollback | `components/link_release_rollback.ts` | `RollbackDraft` | `RollbackOutcome` | I5 `POST /v1/rollback` (계약 `RollbackRequest`) |
| link_failure_list | `components/link_failure_list.ts` | `CaseListQuery` | `CaseList` | I7 `GET /v1/cases` (모든 쪽) |
| link_failure_get | `components/link_failure_get.ts` | `CaseGetInput` | `CaseRecord` | I7 `GET /v1/cases/{id}` |
| link_failure_trace | `components/link_failure_trace.ts` | `TraceRefInput` | 계약 `OpsFeedbackDeidentifiedTrace` | I7 `GET /v1/deidentified-traces/{ref}` |
| link_failure_review | `components/link_failure_review.ts` | `CaseReviewInput` | `CaseReviewResult` | I7 `POST /v1/cases/{id}/review` (계약 `CaseReviewRequest`) |

## 3. 컴포넌트가 아닌 것

| 위치 | 역할 |
| --- | --- |
| `app/types/` | `schemas/`와 계약 스키마에서 생성한 타입·검증기. 손으로 고치지 않는다 |
| `app/wiring/gateway.ts` | `link_http_send`를 `link_*`에 주입해 화면이 쓰는 클라이언트(`GateClient`, `ReleasesClient`, `CasesClient`)로 묶는다 |
| `app/wiring/api_error.ts` | `ErrorInfo`를 예외 `ApiError`로 바꾸는 도구 |
| `app/wiring/approvals_controller.ts`, `cases_controller.ts`, `ops_controller.ts` | 화면 상태(단계, 진행 중 요청, 입력 중인 글)를 들고 컴포넌트의 출력을 다음 상태로 잇는다. 상태가 있으므로 컴포넌트가 아니다(DESIGN.md 2절) |
| `app/wiring/ui/` | 화면 부품(DOM 그리기). `ui/`는 DESIGN.md 3절의 이름이다. 구조 검사 6번(`head/scripts/structure-check.py`)이 `ui/`를 허용 위치로 알지 못해 `wiring/` 아래에 둔다(화면 상태를 DOM에 잇는 연결이므로 wiring의 뜻과 같다). 헤드가 검사에 `ui/`를 넣으면 한 칸 올린다 |
| `app/main.ts` | 진입점. 컨트롤러를 만들어 주소(`route_parse`)에 잇는다. 업무 규칙 없음 |
| `tests/mock-server/` | 시험·개발용 모의 게이트·모의 FailureStore. 이웃의 메모리 구현에 해당하며 앱 코드가 아니다(ADR 0005) |
| `scripts/` | 빌드, 생성(`gen-schemas.mjs`, `gen-types.mjs`), 이미지 빌드 진입점, 스모크 |

## 4. 규칙 대조

- 컴포넌트끼리 import 없음: `tests/test_structure.test.ts` 2번이 `./`로 시작하는 import를 모두 본다. 타입도 `app/types/`에서만 가져온다.
- HTTP(`fetch`, `node:http`)는 `link_*` 밖에 없음: 3번.
- 업무 컴포넌트는 입력을 스키마 검증 하나로 받는다(`v.assertValid`, 폼은 스키마 검증 실패를 `FormIssues`로). 스키마로 쓸 수 없는 조건은 `schemas/README.md` "스키마 밖 조건"에 이유와 함께 있다.
