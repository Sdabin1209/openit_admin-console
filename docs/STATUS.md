# STATUS

## 한 일 (작업 단위 1)
- 설계서 `docs/design.md`, 경계 문서, 변경 요청 CR-001/002.
- `api/` 게이트 클라이언트와 JCS 해시, `mock-server/`, 승인 화면(목록 → 보고서 → 확인창 → 승인/반려).
- 시험 25개(D69 반영: 해시 구현 삭제, 헤더 해시, details.reason, 승인자 입력 제거)(`npm test`), 타입 검사(`npm run typecheck`), 이미지와 스모크(`npm run smoke`).

## 남은 일
- 실제 release-gate와의 연동 시험(헤더 해시, details.reason, X-Openit-User, 목록 동작).
- 실제 브라우저(레이아웃, 접근성 도구, 키보드 흐름) 확인. 지금은 jsdom 시험까지다.
- CI 이미지 빌드와 digest 게시(D24), 이미지 라벨의 `revision`은 빌드 인자.
- 후속 화면(실패 사례 검토, 문항 저작).

## 막힌 것
- CR-002(게이트웨이 경로)는 헤드가 deploy에 전달 중.

## 작업 단위 2 (실패 사례 검토)
- 한 일: 상대 경로 `config.json`(D70), `api/cases.ts`, 모의 I7(`mock-server/cases.ts`), 메뉴와 검토 화면(`app/cases-*.ts`), 문진 스키마 검증기 생성(`scripts/gen-schemas.mjs`, `generated/`), 시험(총 42개), 설계서 10절, CR-003.
- 남은 일: 실제 ops-feedback 연동 시험, 실제 브라우저 확인(편집기 사용성, CSP 아래 번들 실행), 검토 이력 화면은 버전 버튼까지만, 필터는 상태만 화면에 있음.
- 막힌 것: CR-003의 헤드 결정(검토자 기록 위치, 생성물 커밋 정책, 게이트웨이 경로).

## 작업 단위 3 (계약 v2.0.2 정렬)
- 실패 2건의 원인(원문 확인): (1) `generated/survey-validators.cjs가 원본 스키마와 같다`는 `ENOENT: ... survey-service/schema/schemas/UtteranceParserInput.json` — v2에서 문진 스키마의 파서·생성기 입출력이 삭제되고 모델 입출력은 boundary-contracts 2.0.0의 `ActionExtraction*`/`Response*`로 옮겨졌다. (2) `모의 FailureStore 출력이 FailureCase 스키마를 통과한다`는 `/expected_kind must be equal to one of the allowed values ["LORA_A","LORA_B"]` — 모의 서버가 v1 값 PARSER/GENERATOR를 냈다. 둘 다 v1.3.3 기준이 남은 한 원인이다.
- 한 일: `scripts/gen-schemas.mjs`가 `../boundary-contracts/schemas`(ActionExtractionInput, ActionExtraction, ResponseRequest, ResponseText)를 읽도록 바꾸고 `generated/contract-validators.cjs`(이름 변경)를 재생성. `expected_kind` LORA_A/LORA_B, LORA_B의 정답은 문자열(화면은 문장 그대로 입력). 알 수 없는 kind는 '알 수 없음' 표시. trace 구조 정보를 v2 TurnTrace 필드(extract_*, response_*)로 교체. 모의 서버 v2 모양과 pipeline_schema_version 2.0. Dockerfile ARG v2.0.2. 문서(boundary, design, README), `docs/runbook.md`.
- 남은 일: 실제 ops-feedback v2 서버와 연동 시험, 실제 브라우저 확인, CI digest(D24). 게이트 쪽 `ReviewReport` 화면이 v2 지표(LORA_A/LORA_B)를 읽는지는 모의 기준으로만 확인했다.
- 막힌 것: CR-003(생성물 커밋 정책) 헤드 결정 대기.

## 작업 단위 4 (v2 ReviewReport 화면 확인)
- 확인한 것: 화면(`app/model.ts`, `app/views.ts`)은 지표 이름·분리 기준(slice kind)을 해석하지 않고 `comparisons[]`의 값을 그대로 그린다. 그래서 v2 지표 이름(`action_accuracy` 등)과 `ACTION`·`REASON` 같은 새 분리 기준은 코드 변경 없이 보인다. 지표 이름의 정의는 계약 `METRICS.md`가 정본이다.
- 고친 곳: (1) 모르는 `group`이 모두 '기타'로 합쳐져 이름이 사라지던 것을 이름을 지킨 채 맨 뒤에 '(새 그룹)'으로 보이게 했다. (2) 같은 그룹 안에서 LORA_A 행이 LORA_B보다 먼저 오게 하고 역할 칸을 'LORA_A (추출)'/'LORA_B (응답)'로 표시, 행에 `data-role`을 붙였다. (3) 모의 서버 보고서에 v2 지표 행(ACTION 분리 기준, 기준 없음 포함)을 더하고 시험용 `setReport`를 추가했다.
- 시험: `tests/v2-report-ui.test.ts`(jsdom DOM 단언: 이름·값·기준값·차이·A/B·모르는 이름/그룹/분리 기준·SAFETY 없는 보고서·활성 릴리스 없음·공식 예시). 브라우저 시험은 아니다.
- 남은 일: 실제 release-gate가 내는 v2 보고서로 확인, 실제 브라우저 확인. SAFETY 구성이 바뀌면(제안서 2절) 화면의 '안전 그룹 맨 위' 규칙은 SAFETY 지표가 없을 때 그냥 빠진다.

## 작업 단위 5 (릴리스 운영 화면, D85)
- 한 일: `#/ops` 화면(`app/ops-controller.ts`, `app/ops-view.ts`, 메뉴 '릴리스 운영'), 클라이언트 `api/releases.ts`(활성 포인터·릴리스 목록·activate·rollback), 모의 서버 `mock-server/releases.ts`(operator 아니면 403, 이미 활성이거나 포인터가 바뀌면 409, PASS 아님 412, rollback 멱등). 화면은 본문에 행위자·역할을 보내지 않는다.
- 시험: `npm test` 66개 통과, 건너뜀 0, 실패 0(새 20개: 흐름 10, DOM 6, 계약 스키마 4). 흐름은 활성화→이력 갱신, 롤백, 멱등, 403, 409, 412, 네트워크. 스키마는 `../boundary-contracts/schemas`로 `ActivePointer`, `ReleaseManifest`, `RollbackReceipt`, `BoundaryError`를 검증. `npm run typecheck` 통과. `npm run smoke` 통과.
- 확인 못 한 것: 실제 release-gate와 연동(`requested_by_role` 없는 본문을 받는지, 409/412의 실제 조건, 릴리스 목록에 PASS 아닌 것이 있는지), 실제 브라우저, 게이트웨이 경로(열려 있는지는 deploy 문서가 정본, 요구는 CR-004).
- 막힌 것: CR-004(게이트웨이 경로 네 개와 operator 역할, `ActivePointer`의 행위자·이력, `requested_by_role` 필수 여부).

## 작업 단위 6 (전수 점검 지적 수정, 간헐 실패 제거)
- 간헐 실패: `ops-ui` 시험이 고정 100ms 대기 뒤 단언해 CPU 부하에서 깨졌다(부하 병렬 40회 중 14회 실패 재현, 순차 20회는 0). `tests/helpers.ts`의 `waitFor`(조건 대기, 시간은 실패 상한)로 바꿨다.
- 점검 지적 수정: 승인 확인창 첫 포커스를 취소 버튼으로(M4), 활성화·롤백 본문에 `requested_by_role: operator`(HTTP.md I5, INTERFACES.md 허용 역할; M1), 승인 완료 화면에 서버가 기록한 승인자·시각 표시와 활성 포인터 행위자 '표시할 수 없다' 이유 명시(M2), 응답 대조, 2xx 비JSON은 '서버 응답 이상', 활성화 확인에 되돌리기 안내, 본문 읽기까지 시간 제한, 잘못된 주소 인코딩 처리, 화면 전환 시 포커스 이동과 문서 제목, UTC 원문+현지 시각 병기, 사유 입력란 개인정보 경고, XSS 음성 시험. 타이머·시계·요청 ID 생성기를 주입 가능하게 하고 모의 서버 시각을 고정 시계로, 시험 사이 JSDOM 화면을 비움.
- 하지 않은 것: M3(활성화 요청에 포인터 버전 검사·요청 ID)는 계약 변경이라 CR-005로 제안. M5(인증·HTTPS)는 U5/D-A. `npm audit`은 오프라인이라 확인 못 함.
- 시험의 이웃 폴더 의존: `tests/mock-conformance`, `ops-conformance`, `schemas-generated`, `v2-report-ui`는 `../boundary-contracts`(읽기 전용, 워크스페이스 규칙이 허용)의 스키마·예제를 읽는다. 이 폴더가 없으면 해당 시험은 실패하거나 건너뛴다.

## 작업 단위 7 (지시서 1·2, 브랜치 wo2)
- 한 일: AC-01 실패 사례 목록이 `next_cursor`를 끝까지 따라감(쪽 크기 500, 최대 20쪽, ADR 0010 방식). AC-02 개발 모드 승인자 경로 제거(`ADMIN_DEV_APPROVER_ID`, `/config.json`, 본문 `approver_id`), 모의 서버는 계약대로 헤더 없으면 401(ADR 0012). AC-03 이웃 사실 복사 삭제. CR-006에 경계 형식 스키마 초안 5종(`docs/change-requests/schemas/`, `validate.py`로 검증).
- 시험: `npm test` 85개 통과, 실패 0, 건너뜀 0(이 PC 한 환경). 이 시험은 고친 쪽이 쓴 것이므로 독립 근거는 계약 HTTP.md I5·공통 목록 규칙의 문장이다.
- 하지 않은 것: AC-04·05·07(지시 범위 밖), 코드가 CR-006 스키마를 쓰도록 바꾸기(헤드가 계약에 올린 뒤).

## 작업 단위 U3 (계약 v2.2.1 핀, 손 검증을 계약 스키마로)
- 한 일: Dockerfile 계약 v2.2.1, ARG `REVISION` 기본값 `n/a`. `gen-schemas`가 `ApprovalRequest`, `ActivateRequest`, `CaseReviewRequest`, `ListEnvelope`, `OpsFeedbackDeidentifiedTrace`, `ImageLabels`와 `PIPELINE_SCHEMA_VERSION`(계약 `schemas_api.py`에서)을 생성. `api/contract.ts`가 요청은 보내기 전에, 목록 봉투와 trace는 받은 뒤 검사(손 검사 `need(Array.isArray...)`, `decision` 검사 제거). 코드의 `"2.0"` 리터럴 제거(모의 서버, 롤백 본문). 모의 `trace()`를 계약 예시 모양으로(전에는 스키마 위반 20건). ADR 0017. turn-engine·model-runtime 의존 없음.
- 시험: `tests/contract-schemas.test.ts` 9개 추가(계약 `examples`/`examples_invalid`가 기대값). `npm test` 109개 통과.
- 남은 일: 실제 ops-feedback 서버 trace가 계약을 지키는지, 실제 release-gate가 `ListEnvelope`를 지키는지(모의 기준으로만 확인). 문진 스키마 패키지는 쓰지 않는다.

## 작업 단위 4a (정적 서버를 Caddy file_server로, D111)
- 한 일: `serve/static-server.mjs`와 `npm start`를 지우고 `serve/Caddyfile` + `caddy:2.11.7-alpine` 이미지로 바꿨다(ADR 0018, ADR 0006 대체). 동작 시험 `tests/static-behavior.test.ts`(7개)를 먼저 만들어 직접 만든 서버에서 통과를 확인한 뒤 이미지에서도 통과시켰다. `npm run smoke`가 이미지에 대해 이 시험과 SIGTERM 종료 코드 0을 확인한다.
- 남은 일: 실제 브라우저에서 CSP 아래 번들 실행(이전부터), 연결 상한·timeout은 Caddy 기본값(측정 안 함).

## 작업 단위 4c (전송 계층 한도 413/414/431, 계약 2.2.2 CONVENTIONS 9절)
- 전에: 본문이 text/plain이면 `kind=UNKNOWN`, 메시지 `HTTP 413`이었다(재시도는 하지 않았으나 사용자 안내가 없었다). 본문이 retryable=true인 BoundaryError면 재시도 가능으로 읽을 수 있었다.
- 고침: `api/http.ts` `toError`가 413/414/431을 본문과 무관하게 `INVALID_RECORD`, 재시도 불가, "요청이 너무 크다" 계열 안내로 읽는다. 릴리스 운영 화면의 "(400)" 고정 문구는 실제 상태 코드를 쓴다. 시험 `tests/transport-limits.test.ts` 9개. 자동 재시도는 원래 없다(재시도는 사용자가 누른다).
- 확인 못 한 것: 실제 waitress가 내는 응답(모의 fetch로만 확인).

## 작업 단위 U42 (영역 빌드 진입점 + 계약 v2.5.1(진입점은 2.5.0에서 정해졌다))
- 한 일: `scripts/build-image.sh`(+ `build-image.mjs`)가 계약 `BuildImageRequest`를 검증하고 이미지를 만든 뒤 `BuildImageResult` 한 줄을 낸다(ADR 0019). 스모크가 이 진입점으로 빌드한다. 계약 고정을 v2.5.0으로(Dockerfile ARG, 생성 검증기에 BuildImage 2종 추가, `PIPELINE_SCHEMA_VERSION` "2.5"로 바뀌는지는 아래). 생성 검증기는 ajv 런타임 의존 없이 돈다.
- 시험: `tests/build-image.test.ts` 12개(가짜 DOCKER). 실제 docker 빌드는 `npm run smoke`.
- 남은 일: deploy `build-images.sh`가 이 진입점을 부르도록 바뀌는 것(deploy 몫).

## 작업 단위 U42 후속 (이웃 작업 트리에 기대지 않는 시험)
- 문제: 시험과 `gen-schemas`가 `../boundary-contracts`의 작업 트리를 읽어, 계약이 앞서 나가면 아무것도 안 바꾼 영역 시험이 깨졌다(main에서 `계약 버전 상수`, `generated ... 원본 스키마와 같다` 2건 실패를 a80df4a에서 재현).
- 고침: `scripts/contract-src.mjs`가 Dockerfile ARG의 고정 태그 내용을 `git show`로 읽는다. 생성기와 모든 계약 읽는 시험이 이것을 쓴다. 시험 `tests/contract-source.test.ts`(이웃이 태그보다 앞서고 수정 중이어도 같은 결과). 핀 v2.5.0 + 이웃 v2.5.1 상태에서 전체 시험 통과를 확인했다.

## 작업 단위 U43 (환경 준비 보고 + 계약 v2.6.0)
- 한 일: `scripts/setup-env.sh`가 표준 출력 마지막 줄에 계약 `SetupEnvReport`(environment: node-modules, test_command `npm test`)를 낸다. 이미 준비돼 있으면 `npm ci`를 생략한다(ADR 0020). 계약 고정 v2.6.0, 생성 검증기에 `SetupEnvReport` 추가. 시험 `tests/setup-env.test.ts` 4개.

## 작업 단위 U47 (노출 선언 라벨)
- 한 일: `deploy-exposure.json`(GET /admin/*, 계정 역할 operator·release-approver·reviewer)과 `build-image.sh`가 이를 `io.openit.exposure` 라벨로 단다(ADR 0021). 시험 `tests/exposure.test.ts` 5개, `tests/build-image.test.ts` 2개 추가.
- 어긋남(deploy와 확인 필요): 게이트웨이는 화면을 어느 계정에게나 연다. `Exposure`는 역할 1개 이상이 필수라 세 역할만 적었다.

## 작업 단위 U49 (스키마 사본 정리)
- 지운 것: `docs/change-requests/schemas/`(16개)와 `contract-ready/`(34개). 분류표는 CR-006 마지막 절. 복사본 금지 시험의 예외 폴더를 없앴다.

## 작업 단위 U300 (계약 3.0.0 전환 + U50 라벨 정직성)
- 한 일: 계약 고정 v3.0.0(Dockerfile, 생성 검증기, `PIPELINE_SCHEMA_VERSION` "3.0"). 생성물이 `CONTRACT_VERSION`과 `ACTION_RULES_VERSION`(계약 `action_extraction_rules.json`의 `rules_version`)을 상수로 낸다. turn-engine 라벨·모의 매니페스트 표지 제거, 모의 릴리스는 `action_rules_version`. `build-image.sh`는 요청 버전이 실제 사용 버전과 다르면 실패하고 라벨은 실제 사용 버전으로 찍는다(ADR 0019). 시험 고정값의 `"2.x"` 리터럴을 계약 상수로.
- 해당 없음: I9 extract, ReleaseReader, deid, SetupEnvReport(이미 environment 포함), StaticImageInterface(이 영역은 쓰지 않았다).

## 작업 단위 U400 (영역 구조 개편, D117)
- 한 일: 업무를 단계로 나눠 컴포넌트 24개(업무 12, 통신 12)로 분해(`docs/components.md`), `schemas/` 55개 + 통과·거부 예시, `app/types/` 생성(json-schema-to-typescript 15.0.4 고정, `scripts/gen-types.mjs`), 코드를 `app/components/`·`app/wiring/`(`ui/` 포함)로 이동하고 `api/`를 없앴다. 모의 서버는 `tests/mock-server/`로(시험 지원 코드). 계약 고정을 v3.1.1로 올렸다(Dockerfile ARG, 검증기 재생성). 이유와 대안은 [ADR 0022](adr/0022-영역-구조-개편-컴포넌트-스키마-타입-생성.md).
- 동작: 와이어 형식·HTTP 요청/응답·화면 문구는 바꾸지 않았다. 롤백 본문을 계약 `RollbackRequest`로 보내기 전에 검사하는 것이 추가됐다(보내는 값이 계약에 맞는지 확인할 뿐 값은 같다). 옛 `getSubmission`(어디서도 쓰지 않음)은 지웠다.
- 시험: `npm test` 162 중 통과 155, 실패 0, 건너뜀 7(전과 같은 7). 구조 검사 통과, `npm run smoke` 통과.
- 스키마 밖 조건 5건(`schemas/README.md`). 통신 기반 라이브러리 `link`(Python)는 이 영역에 해당 없음.
- 남은 일: `ui/`를 `wiring/` 아래에 둔 것(헤드 구조 검사가 `ui/`를 모름). 헤드가 `ui/`를 허용하면 한 칸 올린다. 실제 브라우저·이웃 연동은 전과 같이 확인 못 했다.
