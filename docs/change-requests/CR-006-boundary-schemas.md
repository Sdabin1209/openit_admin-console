# CR-006: admin-console이 주고받는 경계 형식의 스키마 초안 (지시서 1 B, 헤드에게)

- 요청 영역: admin-console, 대상: 헤드(boundary-contracts). 상태: **처리됨**(승격 4종은 계약 v2.2.0에 올랐고 코드가 계약 검증기를 쓴다: ADR 0017. 스키마 사본은 U49에서 지웠다: 아래 "U49 사본 정리"). 이하 본문은 당시 제안의 기록이며 아래 "스키마 위치"의 파일은 더 이상 리포에 없다(git 기록 참고).
- 근거: 자기 점검 보고서 `docs/audit/structure-rules-2026-10-28.md`의 AC-04, AC-08 및 5절(E) 표에서 "계약 스키마 없음"으로 표시된 것.
- 스키마 위치: `docs/change-requests/schemas/*.schema.json` (JSON Schema 2020-12). 예시: `schemas/examples/<이름>.valid.json`(통과), `<이름>.invalid.json`(거부). 검증 스크립트: `schemas/validate.py`.
- 공통: Id(`^[A-Za-z0-9][A-Za-z0-9._:-]*$`, 최대 128)와 Hash(`sha256:` + 64 hex) 패턴은 `_common.schema.json`의 것과 같게 인라인했다(계약 패키지에 올릴 때 `$ref`로 바꾼다).

## 형식 목록

| 이름 | 방향 | 만드는 쪽 -> 읽는 쪽 | 모르는 키 정책과 이유 |
| --- | --- | --- | --- |
| `ApprovalRequest` | admin-console이 냄 | admin-console -> release-gate (`POST /v1/approvals`) | 거부(`additionalProperties: false`). 요청 본문은 보내는 쪽이 정확히 알고, 특히 `approver_id`가 섞이면 안 된다(헤더가 유일한 길, HTTP.md I5·D88). 위조 가능한 값을 조용히 받지 않으려는 것 |
| `ActivateRequest` | 냄 | admin-console -> release-gate (`POST /v1/activate`) | 거부. 행위자 이름이 본문에 섞이는 것을 막는다(행위자는 `X-Openit-User`) |
| `CaseReviewRequest` | 냄 | admin-console -> ops-feedback (`POST /v1/cases/{id}/review`, Protocol 밖) | 거부. `expected`/`reviewed_input` 내용은 `ActionExtraction`·`ResponseText` 등 기존 계약 스키마의 일이라 여기서는 형태와 의존 관계(`expected`는 `expected_kind` 필요)만 정한다 |
| `DeidentifiedTraceView` | 받음 | ops-feedback -> admin-console (`GET /v1/deidentified-traces/{ref}`) | 허용(읽기 쪽 관용). 화면이 읽는 필드만 정하고 나머지는 무시한다. 이웃이 필드를 더해도 화면이 깨지지 않게 하려는 것이며, 읽는 필드의 이름·형식이 어긋나면 이 스키마로 알 수 있다 |
| `ListEnvelope` | 받음 | release-gate, ops-feedback -> admin-console (목록 응답) | 허용. 봉투 두 키만 정하고 원소는 호출별 계약 스키마(`SubmissionView`, `ReleaseManifest`, `FailureCase`)로 따로 검증한다 |

### ApprovalRequest
- 실제 예시의 출처: `app/controller.ts`의 `decide` 호출(`submission_id`, `decision`, `approver_role: "release-approver"`, `reason?`, `report_hash`)과 `api/types.ts`의 `DecideRequest`. 예시 파일 `examples/ApprovalRequest.valid.json`.
- 불변식: `approver_id`를 싣지 않는다(AC-02 수정). `report_hash`는 보고서 응답 헤더 `X-Openit-Report-Hash`를 계산 없이 되돌려준 값이다. 반려(`REJECT`)에는 사유가 필수다(화면이 확인창에서 강제하고 스키마의 `if/then`이 같은 규칙을 표현한다).
- 거부 예시: `approver_id`가 들어 있는 본문.
- 계약에 올릴 때 확인할 것: `pipeline_schema_version`·`ext`를 서버가 받는지(이 영역은 보내지 않는다).

### ActivateRequest
- 출처: `api/releases.ts`의 `activate`(`{ release_id, requested_by_role: REQUESTED_BY_ROLE }`, 값 `operator`).
- 불변식: 역할 값은 `operator`. 서버는 이 값을 믿지 않고 토큰으로 정한다(기록용). 이름은 보내지 않는다.
- 거부 예시: 모르는 키 `requested_by`.

### CaseReviewRequest
- 출처: `api/types.ts`의 `ReviewRequest`와 `app/cases-controller.ts`의 `buildRequest`.
- 불변식(이 영역): 확정이 아니면 `review_status`만 보낸다. `expected` 또는 `reviewed_input`을 보내면 `expected_kind`를 함께 보낸다. `LORA_A`의 정답은 객체, `LORA_B`의 정답은 비어 있지 않은 문자열이다. 내용은 보내기 전에 계약 스키마(생성 검증기)로 검증한다.
- 거부 예시: `DISMISSED`에 `expected`를 실은 본문.

### DeidentifiedTraceView
- 읽는 필드의 출처: `app/cases-view.ts`의 `traceFacts`(`contract_version`, `extract_status`, `extract_attempts`, `extract_output.action`, `extract_output.values`, `validation_ok`, `response_input.action`, `response_outcome`)와 `app/cases-controller.ts`의 `prefillFromTrace`(`extract_input`, `response_input`). 실제 예시는 모의 서버 `mock-server/cases.ts`의 `trace()` 출력이다. 값 열거(`extract_status`, `response_outcome`)와 `null` 허용은 문진 스키마 `TurnTrace`(읽기 전용 참조 `../survey-service/schema`)와 같게 맞췄다.
- 불변식: 화면은 이 필드들의 값을 해석해 판정하지 않고 그대로 보인다. 값은 비식별(마스킹)된 것으로 가정하며 화면은 저장하지 않는다.
- 거부 예시: `extract_status`가 열거 밖(`DONE`)이거나 `extract_attempts`가 0.
- 요청: INTERFACES.md I7의 "소비자는 `TurnTrace`로 검증하지 말고 구조 정보만 쓴다"를 이 부분집합 스키마로 대체해 달라(AC-04).

### ListEnvelope
- 출처: HTTP.md 공통 목록 규칙. 이 영역의 소비 코드: `api/client.ts`(`listAwaiting`), `api/releases.ts`(`listReleases`), `api/cases.ts`(`list`, AC-01에서 `next_cursor`를 따라가도록 고침).
- 불변식: `next_cursor`가 null이 될 때까지 따라간다. `cursor`는 불투명 문자열로 다루고 해석하지 않는다. 화면 쪽 `next_cursor` 누락은 null로 관용하지만(`?? null`) 스키마는 계약 문장대로 둘 다 필수로 적었다.
- 거부 예시: `next_cursor`가 없는 봉투.

## 검증

명령(이 리포 루트에서, `jsonschema` 4.10.3 사용):

```
cd docs/change-requests/schemas && python3 validate.py; echo exit=$?
```

출력(2026-10-28 실행):

```
OK   ActivateRequest.valid: 통과
OK   ActivateRequest.invalid: 거부 - Additional properties are not allowed ('requested_by' was unexpected)
OK   ApprovalRequest.valid: 통과
OK   ApprovalRequest.invalid: 거부 - Additional properties are not allowed ('approver_id' was unexpected)
OK   CaseReviewRequest.valid: 통과
OK   CaseReviewRequest.invalid: 거부 - {'review_status': 'DISMISSED', 'expected': '문장', 'expected_kind': 'LOR
OK   DeidentifiedTraceView.valid: 통과
OK   DeidentifiedTraceView.invalid: 거부 - 'DONE' is not one of ['OK', 'OUTPUT_INVALID', 'VIOLATION', 'ERROR', No
OK   ListEnvelope.valid: 통과
OK   ListEnvelope.invalid: 거부 - 'next_cursor' is a required property
exit=0
```

`validate.py`는 각 스키마가 Draft 2020-12 메타 스키마를 통과하는지(`check_schema`), `*.valid.json`이 통과하고 `*.invalid.json`이 거부되는지 확인한다. 하나라도 기대와 다르면 `FAIL`을 내고 종료 코드 1이다.

## 계약 쪽 정리 요청 (AC-08)

INTERFACES.md 한눈에 표에 admin-console을 I4 읽는 쪽, I5 쓰는 쪽(approver·operator), I7 읽는 쪽·검토 쓰는 쪽으로 넣고, I5 허용 역할 문장에 `release-approver`를 맞춰 달라. 확인한 위치는 점검 보고서 AC-08.

## U49 사본 정리 (2026-10-30)

정본은 계약 패키지(boundary-contracts)의 `schemas/`와 `examples/`, `conformance/examples_invalid/`, `conformance/promoted/admin-console.MANIFEST.json`이다. 영역 안 사본은 계약이 바뀌면 어긋나는 두 번째 정본이라 지웠다. 내용은 git 기록에 있다.

| 파일(폴더) | 분류 | 처리 | 근거 |
| --- | --- | --- | --- |
| `docs/change-requests/schemas/{ActivateRequest,ApprovalRequest,CaseReviewRequest,ListEnvelope}.schema.json` | (가) 승격 사본 | 삭제 | 계약에 같은 이름이 있다 |
| `docs/change-requests/schemas/DeidentifiedTraceView.schema.json` | (나) 쓰지 않는 초안 | 삭제 | 읽는 쪽 부분집합 스키마는 두지 않기로 했고(헤드 지시) 계약 `OpsFeedbackDeidentifiedTrace`가 대신한다. 코드는 그것을 쓴다 |
| `docs/change-requests/schemas/examples/*`(10개), `validate.py` | 위 초안의 예시·검증 스크립트 | 삭제 | 지운 초안만 검증하는 파일이다. 계약 쪽에 같은 예시가 있고 시험이 그 예시를 쓴다(`tests/contract-schemas.test.ts`) |
| `docs/change-requests/contract-ready/schemas/*`(4개) | (가) 승격 제출본 사본 | 삭제 | 계약 v2.2.0에 올라갔다 |
| `docs/change-requests/contract-ready/examples/{valid,invalid}/*`(19개) | (가) 승격 예시 사본 | 삭제 | 계약 `examples/`, `conformance/examples_invalid/`에 같은 이름이 있다 |
| `docs/change-requests/contract-ready/MANIFEST.json`, `validate.py`, `tools/capture-examples.ts` | 승격 제출 도구 | 삭제 | 계약의 `conformance/promoted/admin-console.MANIFEST.json`이 정본이다. 예시는 이미 만들어졌고 이 도구를 부르는 곳이 없다 |

합계 50개 삭제(`schemas/` 16, `contract-ready/` 34), (나) 중 영역 소유로 남긴 스키마는 없다. 복사본이 다시 생기지 않도록 `tests/schemas-generated.test.ts`의 예외 폴더를 없앴다.
