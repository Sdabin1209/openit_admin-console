# schemas/ (영역 내부 타입)

이 폴더는 admin-console 안의 컴포넌트가 주고받는 타입의 JSON Schema(draft 2020-12)다. 타입 하나에 파일 하나(`<타입>.schema.json`), 통과·거부 예시는 `examples/<타입>.valid*.json`, `<타입>.invalid*.json`이다. 시험 `tests/test_structure.test.ts`가 예시의 결과를 검사한다. 컴포넌트와의 대응은 `docs/components.md`.

- **영역 사이 타입은 복사하지 않는다.** 요청 본문(`ApprovalRequest`, `ActivateRequest`, `RollbackRequest`, `CaseReviewRequest`), 목록 봉투, 오류 본문, 비식별 trace, 모델 입출력(`ActionExtraction` 등)은 고정 태그의 계약 스키마를 쓴다(통신 컴포넌트가 계약 검증기를, `CaseReviewDraft`가 `$ref`로 계약을 가리킨다). 이 폴더에는 계약과 같은 이름의 파일이 없고 시험(`schemas-generated.test.ts`)이 확인한다.
- **읽기용 투영.** `SubmissionRow`, `ReportDoc`, `ApprovalRecord`, `CaseRecord`, `PointerRecord`, `ReleaseRow`, `RollbackOutcome`는 계약 응답(`SubmissionView`, `ReviewReport`, `GateApproval`, `FailureCase`, `ActivePointer`, `ReleaseManifest`, `RollbackReceipt`) 중 화면이 읽는 부분이다. 계약 사본이 아니다. 필수 필드만 적고 모르는 필드와 모르는 열거값(`status`, `cause` 등)을 받는다. 이유: 읽을 때는 관대하게(CONVENTIONS 1절, 계약 스키마 설명 "모르는 값은 그대로 보여 준다", ADR 0016·0017). 계약의 닫힌 열거로 응답을 검사하면 서버가 새 값을 추가한 날 화면이 멈춘다.
- **생성.** `app/types/`는 이 폴더와 계약 스키마에서 `node scripts/gen-types.mjs`로 생성한다(README 4절).

## 스키마 밖 조건

스키마로 쓸 수 없는 거부 조건이다. 목표 0건이지만 아래 5건은 JSON Schema가 한 문서 안의 검증이라 쓸 수 없다. 그 밖의 거부 지점(손 검사)은 모두 스키마로 옮겼다(대조는 아래 표).

| # | 위치 | 조건 | 이유 |
| --- | --- | --- | --- |
| 1 | `approval_confirm` | 확인창 입력 글이 제출 ID와 같아야 한다(앞뒤 공백 무시) | 같은 문서의 두 필드 값을 비교하는 것은 JSON Schema 2020-12에 없다(Ajv의 `$data`는 표준이 아니다) |
| 2 | `case_review_draft` | 입력·정답 글이 JSON 구문이고 객체여야 한다 | 문자열 안의 JSON을 해석하는 것은 스키마가 하지 않는다(`contentMediaType`은 주석일 뿐). 해석한 값은 출력 스키마 `CaseReviewDraft`가 계약으로 검사한다 |
| 3 | `link_gate_decide` | 응답의 제출·결정·`report_hash`가 요청과 같아야 한다 | 요청과 응답은 서로 다른 문서다. 완료 화면이 사람이 누른 결정을 보이게 하는 대조 |
| 4 | `link_release_activate` | 응답의 활성 릴리스가 요청한 릴리스와 같아야 한다 | 위와 같은 이유 |
| 5 | `link_release_rollback` | 응답의 `request_id`가 요청과 같고, 적용됐다면 활성 릴리스가 롤백 대상이어야 한다 | 위와 같은 이유 |

### 기존 거부 지점 대조 (손 검사 -> 스키마)

| 옛 코드의 거부 지점 | 지금 |
| --- | --- |
| `api/client.ts checkSubmission/checkReport`, `api/cases.ts checkCase`, `api/releases.ts checkPointer/checkRelease/checkReceipt` | 스키마 `SubmissionRow`, `ReportDoc`, `CaseRecord`, `PointerRecord`, `ReleaseRow`, `RollbackOutcome` (검증은 `link_*`) |
| `getReviewReport`의 헤더 존재·`sha256:` 형식 | `LoadedReport.reportHash` 패턴 |
| `decide`의 `assertRequest("ApprovalRequest")` 등 3종 | 계약 검증기 (`link_gate_decide`, `link_release_activate`, `link_failure_review`). 롤백 본문은 옛 코드가 검사하지 않았으나 계약 `RollbackRequest`로 검사한다(보내는 쪽이 낸다고 한 값이 계약에 맞는지 확인하는 것이라 동작 변화는 없다) |
| `readEnvelope`, `need(`active-pointer`)` | 계약 `ListEnvelope`, `ActivePointerState` |
| `assertResponse("OpsFeedbackDeidentifiedTrace")` | 계약 검증기 (`link_failure_trace`) |
| `Controller.requestDecision`: 반려 사유 필수 | `ApprovalDraft`의 `if/then` |
| `Controller.confirmMatches` | 스키마 밖 1 |
| `CasesController.buildRequest`: 종류 필수, JSON 문법, 객체, 계약 스키마 | `CaseReviewForm`의 `if/then`, 스키마 밖 2, `CaseReviewDraft`의 `$ref` |
| `OpsController.submit`: 롤백 사유·근거·활성 포인터 | `OpsRequestInput`의 `if/then` |
| `OpsController.rollbackCandidates/activateCandidates` | 거부 아님(목록 선택). `release_candidates` |
| `Http.json`의 응답 해석(JSON 아님, 4xx/5xx) | 거부가 아니라 오류 분류. `link_http_send` |
| `Controller`·`CasesController`·`OpsController`의 `phase` 가드와 `inflight` 중복 방지 | 입력 거부가 아니라 상태 기계의 중복 요청 방지. 컨트롤러(wiring)의 상태 |
| `scripts/build-image.mjs`, `scripts/setup-env.sh` | 진입점(컴포넌트 아님). 계약 `BuildImageRequest`·`SetupEnvReport`로 검증한다(ADR 0019·0020) |

## 타입 목록

| 타입 | 설명 |
| --- | --- |
| `ActivateInput` | link_release_activate의 입력. |
| `ActivePointerState` | link_release_active_pointer의 출력: 활성 릴리스가 아직 없으면 pointer가 null. |
| `ApprovalConfirmInput` | approval_confirm의 입력: 확인창에서 승인자가 입력한 글자와 보내려는 결정. 확정하려면 입력이 제출 ID와 같아야 한다(ADR 0014, 이 필드 간 같음은 스키마 밖 조건). |
| `ApprovalDecision` | approval_draft의 출력이자 approval_confirm의 입력·출력이며 link_gate_decide의 입력: 보내도 되는 결정. REJECT면 사유가 있고 APPROVE에는 사유가 없다. |
| `ApprovalDraft` | approval_draft의 입력: 승인자가 버튼을 누른 순간의 폼. 반려에는 사유가 필수(공백만은 비어 있는 것). |
| `ApprovalFailure` | approval_failure의 출력. reload_report는 보고서를 새로 불러오고 다시 결정하게 한다, back_to_report는 보고서 화면에 알림을 보이고 머문다, fail은 오류 화면. |
| `ApprovalFailureInput` | approval_failure의 입력: 어느 일을 하다(load 불러오기, decide 결정 전송) 난 오류. |
| `ApprovalRecord` | 서버가 기록한 결정(GateApproval의 읽기용 투영). |
| `ApprovalResult` | link_gate_decide의 출력. replay는 서버가 같은 결정을 이미 갖고 있어 200으로 답한 경우. |
| `ArtifactRef` | 산출물 참조(문항 세트·LoRA). 화면은 id와 version만 보이고 모르는 필드는 보존한다. |
| `CaseFailure` | case_failure의 출력. back_to_case는 사례 화면에 알림을 보이고 머문다, fail은 오류 화면(또는 trace 오류 문구). |
| `CaseFailureInput` | case_failure의 입력. |
| `CaseGetInput` | link_failure_get의 입력. version이 없으면 최신. |
| `CaseList` | link_failure_list의 출력. |
| `CaseListQuery` | link_failure_list의 입력: 필터. 빈 문자열은 안 건 것으로 본다. latest_only 기본은 true. |
| `CaseRecord` | 실패 사례(FailureCase의 읽기용 투영). 모르는 값과 필드는 받는다. |
| `CaseReviewDraft` | case_review_draft의 출력이자 link_failure_review의 입력(caseId와 함께): 보내도 되는 검토 내용. 종류가 정해지면 입력·정답은 그 종류의 모델 입출력 계약 스키마를 통과해야 한다(LORA_A: ActionExtractionInput/ActionExtraction, LORA_B: ResponseRequest/ResponseText). |
| `CaseReviewForm` | case_review_draft의 입력: 검토 폼. 입력이나 정답을 쓰면 종류(kind)를 골라야 한다. 텍스트가 JSON인지는 스키마 밖 조건. |
| `CaseReviewInput` | link_failure_review의 입력. |
| `CaseReviewResult` | link_failure_review의 출력. replay는 서버가 같은 검토를 이미 갖고 있어 200으로 답한 경우. |
| `Cell` | 지표 표의 칸. uncomputable은 n=0(계산 못 함), none은 기준 없음·비교 못 함. |
| `Comparison` | 보고서의 지표 비교 한 건(ReviewReport.comparisons 원소의 읽기용 투영). n=0과 null 기준값을 구분해서 읽는다. |
| `ErrorInfo` | 이 영역 안에서 오류를 나르는 모양. link_* 컴포넌트가 BoundaryError(HTTP 오류 본문)나 전송 실패를 이 모양으로 바꾼다. 업무 컴포넌트는 HTTP를 모르므로 이 모양만 본다. NON_API는 HTTP와 무관한 예기치 못한 예외. |
| `FormIssues` | 입력 폼 컴포넌트(approval_draft, case_review_draft, ops_request)가 입력을 거부할 때 내는 목록. path는 입력 스키마 안의 위치, message는 화면에 보일 한국어. |
| `HttpOutcome` | link_http_send의 출력. 성공(2xx, JSON 해석됨)이면 status, data, headers(키는 소문자). 실패면 ErrorInfo. |
| `HttpRequestSpec` | link_http_send의 입력. 같은 출처의 /v1 경로만 부른다(게이트 HTTP 면 밖은 부르지 않는다, 브리프 6절). GET에는 본문이 없다. |
| `HttpSendConfig` | link_http_send를 만들 때 한 번 주는 설정. baseUrl은 같은 출처(빈 문자열) 또는 http(s) 주소, timeoutMs는 응답 본문을 다 읽을 때까지의 제한(값의 근거: docs/adr/0010, 측정 안 함). |
| `ListAwaitingInput` | link_gate_list_awaiting의 입력: 다음 쪽 커서(없으면 첫 쪽)와 쪽 크기. 계약 목록 규칙의 최대 쪽 크기는 500. |
| `LoadedReport` | link_gate_review_report의 출력: 보고서와 서버가 낸 그 보고서의 해시. 해시는 계산하지 않고 응답 헤더 값 그대로다(형식만 본다). |
| `MetricGroup` | 같은 그룹의 지표 줄들. |
| `MetricRow` | 지표 표의 한 줄. worse는 참고 표시일 뿐 합격/불합격이 아니다(D53). |
| `OpsFailureInput` | ops_failure의 입력. |
| `OpsNotice` | ops_failure의 출력: 화면에 보일 알림. 오류를 종류로 구분해 보인다(403, 409, 412, 네트워크). |
| `OpsRequest` | ops_request의 출력: 보내도 되는 운영 요청 하나. |
| `OpsRequestInput` | ops_request의 입력: 릴리스 운영 화면의 확인 단계 폼. 롤백에는 사유, 근거 ID 하나 이상, 현재 활성 릴리스가 필요하다. requestId와 requestedAt은 호출자가 정해 넘긴다(같은 입력이면 같은 출력). |
| `PointerRecord` | 활성 포인터(ActivePointer의 읽기용 투영). cause의 모르는 값을 받는다. 행위자 필드는 계약에 없다(CR-004). |
| `ReleaseCandidates` | release_candidates의 출력: 활성화 후보(현재 활성보다 새 것)와 롤백 후보(현재 활성보다 오래된 것, 가까운 순). |
| `ReleaseCandidatesInput` | release_candidates의 입력: 최신부터인 릴리스 목록과 현재 활성 포인터. |
| `ReleaseList` | link_release_list의 출력: 최신부터 모든 릴리스. |
| `ReleaseRow` | 릴리스 목록의 한 줄(ReleaseManifest의 읽기용 투영). |
| `ReportDoc` | 승인 요청 보고서(ReviewReport의 읽기용 투영). 화면이 읽는 것만 필수로 하고 모르는 필드는 보존한다. |
| `ReportView` | report_view의 출력. 그룹은 SAFETY가 항상 맨 위. 합격/불합격은 없다. |
| `ReportViewRequest` | report_view의 입력: 보고서의 지표 비교들과 화면의 분리 기준·정렬. |
| `RollbackDraft` | ops_request가 내는 롤백 요청의 알맹이. 계약 RollbackRequest에서 연결 계층이 붙이는 pipeline_schema_version과 requested_by_role을 뺀 것. |
| `RollbackOutcome` | 롤백 요청에 대한 영수증(RollbackReceipt의 읽기용 투영). APPLIED면 active_pointer가 있다. |
| `Route` | route_parse의 출력. 주소의 ID를 읽을 수 없으면 bad_address. |
| `RouteInput` | route_parse의 입력: 주소의 해시(location.hash). |
| `SubmissionIdInput` | link_gate_review_report의 입력. |
| `SubmissionPage` | link_gate_list_awaiting의 출력. 다음 쪽 커서가 null이면 끝. |
| `SubmissionRow` | 승인 대기 목록의 한 줄(SubmissionView의 읽기용 투영). 읽을 때는 관대하다: 모르는 필드는 보존하고 status의 모르는 값도 받는다(CONVENTIONS 1절, ADR 0016). |
| `TimeInput` | time_display의 입력: 서버가 준 시각 원문(없을 수 있음)과 선택적 시간대. |
| `TimeText` | time_display의 출력: 원문을 그대로 두고 괄호 안에 현지 시각을 덧붙인 글. 해석할 수 없으면 원문만, 없으면 대시. |
| `TracePrefill` | case_trace_prefill의 출력: 편집창에 채울 글. 채울 입력이 trace에 없으면 null. |
| `TracePrefillInput` | case_trace_prefill의 입력: 비식별 trace와 고른 종류. |
| `TraceRefInput` | link_failure_trace의 입력. |
