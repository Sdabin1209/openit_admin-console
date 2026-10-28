# admin-console 구조 규칙 전수 점검 (2026-10-28, D104)

기준: `head/docs/audit/structure-rules-audit-spec.md`(R1~R7, 항목 A~G). 읽기 전용 점검이며 코드는 고치지 않았다.
점검 환경: 이 PC 한 환경. 계약 기준은 `../boundary-contracts`의 작업 트리(`git describe`: v2.1.1-1, v2.1.1 태그와 `schemas/` 차이 없음 확인: `git diff --stat v2.1.1 HEAD -- schemas`가 비어 있음).

## 0. 요약

| 심각도 | 개수 | ID |
| --- | --- | --- |
| P1 | 0 | 없음 |
| P2 | 7 | AC-01, AC-02, AC-03, AC-04, AC-05, AC-07, AC-08 |
| P3 | 7 | AC-06, AC-09, AC-10, AC-11, AC-12, AC-13, AC-14 |

P1(독립성을 깨고 실제 결합을 만드는 것)은 찾지 못했다. 이 영역은 이웃 코드를 import하지 않고 이웃 환경 변수·포트를 쓰지 않으며, 영역 간 호출은 같은 출처의 `/v1` HTTP뿐이다. 근거는 4절(D)의 검색 목록.

돌려 본 것(이 세션, 이 PC): `node scripts/gen-schemas.mjs --check` -> "generated 최신"(종료 0). `npm test` -> 81개 중 통과 81, 실패 0, 건너뜀 0. `npm run typecheck` -> 오류 없음. 계약 패키지의 적합성 시험(`../boundary-contracts/conformance`)은 Python 클라이언트·서버용이라 이 Node 영역에서 돌리지 못했다(점검하지 못한 것 참조).

## 1. A. 컴포넌트 목록

이 영역은 명시적인 컴포넌트 선언 파일이 없다(brief.md의 "컴포넌트 표"도 없고 design.md는 디렉터리 구조만 둔다). 아래는 코드에서 읽어 낸 작업 단위이며 "컴포넌트 경계가 문서로 선언돼 있지 않다"는 것 자체가 AC-05에 포함된다.

| # | 컴포넌트 | 파일 | 입력 스키마 | 출력 스키마 | 업무 |
| --- | --- | --- | --- | --- | --- |
| K1 | 공통 HTTP 하부 | `api/http.ts` | 경로·본문(JSON) | `{status, data, headers}` 또는 `ApiError`(`BoundaryError` 해석) | fetch, 시간 제한(15초), 오류 매핑 |
| K2 | 게이트 클라이언트(I5 일부) | `api/client.ts` | `DecideRequest`(`api/types.ts`) | `SubmissionView[]`, `LoadedReport`(`ReviewReport`+헤더 해시), `GateApproval` | 제출 목록·보고서·승인 결정 호출 |
| K3 | 릴리스 운영 클라이언트(I4 읽기 + I5 activate/rollback) | `api/releases.ts` | `release_id`, `RollbackBody` | `ActivePointer`, `ReleaseSummary[]`, `RollbackReceipt` | 활성 포인터·릴리스 목록 조회, 활성화, 롤백 |
| K4 | 실패 사례 클라이언트(I7) | `api/cases.ts` | `ReviewRequest`, 필터 | `FailureCase`, `DeidentifiedTrace`(=`Record<string, unknown>`) | 사례 목록·조회·trace·검토 게시 |
| K5 | 계약 타입 | `api/types.ts` | - | TS 인터페이스(스키마의 손으로 쓴 읽기용 모양) | K2~K4와 화면 사이 스키마 |
| K6 | 승인 화면 | `app/controller.ts`, `app/views.ts`, `app/model.ts` | `GateClient`, 사용자 입력(사유) | DOM, `POST /v1/approvals` 본문 | 목록 -> 보고서 -> 확인창 -> 결정 |
| K7 | 실패 사례 검토 화면 | `app/cases-controller.ts`, `app/cases-view.ts`, `app/validate.ts` | `CasesClient`, 입력(JSON 텍스트) | DOM, `ReviewRequest` | 사례 열람, 전송 전 스키마 검증, 검토 게시 |
| K8 | 릴리스 운영 화면 | `app/ops-controller.ts`, `app/ops-view.ts` | `ReleasesClient`, 입력(확인 ID, 사유, 근거 ID) | DOM, 활성화/롤백 요청 | 활성화·롤백 확인 절차 |
| K9 | 생성 검증기 | `generated/contract-validators.cjs`(+`.d.cts`), 생성기 `scripts/gen-schemas.mjs` | `ActionExtractionInput`, `ActionExtraction`, `ResponseRequest`, `ResponseText` 스키마 | 검증 함수 4개 | K7이 전송 전에 쓰는 Ajv standalone 코드 |
| K10 | 정적 서버 | `serve/static-server.mjs` | HTTP 요청, 환경 변수 `PORT`·`STATIC_DIR`·`ADMIN_DEV_APPROVER_ID` | 정적 파일, `/healthz`, `/readyz`, `/config.json` | 이미지에서 번들 서빙 |
| K11 | 모의 게이트(I5) | `mock-server/server.ts`, `scenarios.ts` | HTTP 요청 | `SubmissionView`, `ReviewReport`, `GateApproval`, `BoundaryError` | 시험·시연용 가짜 서버 |
| K12 | 모의 릴리스 운영(I4/I5) | `mock-server/releases.ts` | HTTP 요청 | `ActivePointer`, `ReleaseManifest`, `RollbackReceipt` | 같음 |
| K13 | 모의 FailureStore(I7) | `mock-server/cases.ts` | HTTP 요청 | `FailureCase`, 비식별 trace | 같음 |

접착 코드(어느 컴포넌트에도 속하지 않음): `app/main.ts`(세 컨트롤러 생성, 해시 라우팅, 렌더 서명 비교, 포커스), `app/route.ts`, `app/time.ts`, `app/config.ts`(`/config.json` 읽기), `app/index.html`, `app/app.css`, `scripts/build.mjs`, `scripts/smoke.sh`, `scripts/setup-env.sh`, `mock-server/main.ts`, `Dockerfile`, `tests/`.

참고(알려진 단서 1의 확인): "모델 패키지/제출 조회"에 해당하는 코드는 없다. I3 ModelRegistry(`/v1/packages`, `/v1/eval-reports`)를 부르는 곳이 없다(`grep -rn "packages\|eval-reports" api app mock-server serve` 결과 없음). 제출 조회는 I5의 `GET /v1/submissions*`뿐이다. "검토 화면"은 K6(출고 승인)과 K7(실패 사례)이다.

## 2. B. R3·R4 (컴포넌트 독립)

문제없음(확인):
- 컨트롤러끼리 서로의 모듈을 쓰지 않는다. `grep -n "^import" app/*.ts`로 확인: `controller.ts`는 `model.ts`의 `SortKey` 타입만, `cases-controller.ts`는 `validate.ts`만, `ops-controller.ts`는 `api/`만 가져온다.
- 전역 상태 공유 없음. 상태는 컨트롤러 인스턴스 필드(`app/controller.ts:27`, `app/cases-controller.ts:33`, `app/ops-controller.ts:253`)이고 `main.ts`가 인스턴스를 만든다. 브라우저 저장소 사용 없음(`tests/hygiene.test.ts`가 소스 검색으로 고정).
- 한 함수가 두 컴포넌트의 일을 `role`/종류 분기로 같이 하는 곳 없음. 단 아래 AC-12 참조.

### AC-09 (R3, P3) 화면 컴포넌트가 승인 화면 모듈의 DOM 헬퍼를 가져다 쓴다
- 위치: `app/cases-view.ts:4`, `app/ops-view.ts:3`
- 인용: `import { h } from "./views.ts";`
- 왜 위반인가: `h`(DOM 생성 헬퍼)는 K6의 `views.ts`에 있는데 K7·K8이 이 파일을 가져온다. 승인 화면의 내부 모듈이 바뀌면 다른 두 화면이 영향받는다. 공용 코드가 어느 컴포넌트에도 속하지 않은 채 한 컴포넌트 안에 있다.
- 최소 수정: `h`를 `app/dom.ts` 같은 공용 모듈로 옮긴다.

### AC-12 (R3·R4, P3) 공통 HTTP 하부가 I5 승인 컴포넌트 전용 오류 종류를 안다
- 위치: `api/http.ts:3-5`, `api/http.ts:31-36`
- 인용: `| "STALE_REPORT" | "ALREADY_DECIDED" | "NOT_FOUND" ...` / `if (reason === "STALE_REPORT") return new ApiError("STALE_REPORT", ...)`
- 왜 위반인가: 세 클라이언트(K2~K4)가 쓰는 공통 층(K1)이 `POST /v1/approvals` 하나에서만 의미 있는 409 사유를 해석한다. K3·K4는 이 종류를 쓰지 않는다. 계약(CONVENTIONS 10절)이 정의한 `details.reason`이므로 값 자체는 계약에 맞다. 결합은 구조 쪽이다.
- 최소 수정: 409 사유 해석을 K2에 두고 K1은 `code`/`status`/`details`를 그대로 전달한다.

## 3. C. R5 (영역 안 컴포넌트 사이 스키마)

있는 것: 클라이언트(K2~K4)와 화면(K6~K8) 사이 스키마는 `api/types.ts` 한 곳에 TS 타입으로 정의돼 있다(147줄). 화면과 생성 검증기 사이는 `generated/contract-validators.d.cts`의 타입이다. 컨트롤러 상태는 각 컨트롤러 파일의 `State` 인터페이스(`app/controller.ts:10`, `app/cases-controller.ts:16`, `app/ops-controller.ts:199`)다. 정적 서버 -> 앱의 `/config.json`은 `{dev_approver_id}` 한 필드이고 양쪽 코드(`serve/static-server.mjs:27`, `app/config.ts:6`)에 따로 쓰여 있으며 스키마 파일은 없다(AC-13).

### AC-05 (R5, P2) 컴포넌트 경계와 컴포넌트 사이 스키마가 선언돼 있지 않고, 계약 모양을 손으로 옮긴 타입과 검사가 흩어져 있다
- 위치: `api/types.ts:1-4`, `api/client.ts:10-20`, `api/releases.ts:5-22`, `api/cases.ts:5-10`
- 인용: `// 계약 스키마(../boundary-contracts/schemas)의 읽기용 모양. 스키마 복사본은 두지 않는다.` / `need(!!s && typeof s.submission_id === "string" && typeof s.status === "string" && typeof s.subject === "object", "SubmissionView");`
- 왜 위반인가: (1) 컴포넌트 표(이름, 입력·출력 스키마)가 docs에 없다. brief/design/boundary 어디에도 K1~K13 같은 목록이 없어 R2·R5의 "영역이 자기 컴포넌트 사이 스키마를 안다"를 문서로 확인할 수 없다. (2) 계약 레코드 7종(`SubmissionView`, `ReviewReport`, `GateApproval`, `FailureCase`, `ActivePointer`, `ReleaseManifest` 일부, `RollbackReceipt`)의 모양이 손으로 쓴 인터페이스(`api/types.ts`)와 손으로 쓴 부분 검사(`checkSubmission` 등, 필수 필드 일부만)로 두 번 적혀 있다. 생성 검증기(K9)는 모델 입출력 4종만 덮는다. 시험은 모의 서버 출력을 스키마로 검증하지만(`tests/mock-conformance.test.ts`) 클라이언트 타입·검사가 스키마와 맞는지는 확인하지 않는다. `checkReceipt`는 `RollbackReceipt`의 `APPLIED`면 `active_pointer` 필수 규칙을 `api/releases.ts:71`에서 따로 단언한다.
- 최소 수정: `docs/design.md`에 컴포넌트 표(위 1절)를 둔다. 읽기 모양 검증을 생성 검증기에 포함(`NAMES`에 레코드 스키마 추가, 읽기 모드는 `additionalProperties` 완화 필요)하거나 타입 정의를 스키마에서 생성한다. 어느 쪽이든 영역이 정할 일이다(ADR 필요).

### AC-13 (R5, P3) 정적 서버와 앱 사이 `/config.json` 형식이 암묵적이다
- 위치: `serve/static-server.mjs:27`, `app/config.ts:6`
- 인용: `res.end(JSON.stringify({ dev_approver_id: process.env.ADMIN_DEV_APPROVER_ID || null }));` / `const j = (await r.json()) as { dev_approver_id?: string | null };`
- 왜 위반인가: 두 컴포넌트(K10, K9 아닌 앱 접착 코드) 사이 형식이 양쪽 코드에 따로 적혀 있고 한 곳의 정의가 없다. 모의 서버도 같은 형식을 또 만든다(`mock-server/server.ts:127`).
- 최소 수정: 필드 하나뿐이므로 `api/types.ts`에 `AppConfig` 타입을 두고 문서에 적는다. (AC-02가 이 필드를 없애면 함께 해소된다.)

## 4. D. R1 (이웃 구조에 기대는 곳)

확인한 범위: 검색 패턴 `\.\./\.\./|\.\./(head|deploy|survey|release|ops|model|boundary|kiosk|synthetic|question)|head/|deploy/|release-gate|ops-feedback|Caddy|OPEN_GAPS`을 `*.ts *.mjs *.sh *.json Dockerfile *.md`에 적용(node_modules, dist, 잠금 파일 제외). 코드(`api/ app/ serve/ scripts/ Dockerfile mock-server/`)에서 이웃 패키지 import는 없음(`import` 전수 확인, `package.json` 의존에 이웃 영역 패키지 없음). 이웃 환경 변수 이름·이웃 포트·호스트는 코드에 없음(`process.env` 사용처는 `PORT`, `STATIC_DIR`, `ADMIN_DEV_APPROVER_ID`뿐).

허용 범위 안(알려진 단서 2의 확인):
- `scripts/gen-schemas.mjs:9`는 `../../boundary-contracts/`(워크스페이스 규칙이 허용한 읽기 전용 참조)의 `schemas/*.schema.json` 4개와 `pyproject.toml`(버전 문자열, `gen-schemas.mjs:14`)을 읽는다. `pyproject.toml`은 `schemas/` 밖이지만 같은 허용 폴더 안이다. 쓰기는 이 리포의 `generated/`뿐.
- 생성물과 계약 버전: 헤더가 `원본: boundary-contracts 2.1.1`과 소스별 sha256을 기록한다(`generated/contract-validators.cjs` 1~2줄). `--check`가 지금 통과하고, Dockerfile `ARG BOUNDARY_CONTRACTS=v2.1.1`(Dockerfile:16)과 v2.1.1 태그의 `schemas/`가 현재 작업 트리와 같다. 어긋남 없음(이 시점). 그러나 헤더 버전과 Dockerfile ARG를 묶는 기계 검사는 없다(`grep -n "Dockerfile\|BOUNDARY" tests/schemas-generated.test.ts` 결과 없음). 이는 AC-14에 적는다.
- 시험 4개가 `../../boundary-contracts/schemas`와 `examples`를 읽는다(`tests/mock-conformance.test.ts:10,25`, `tests/ops-conformance.test.ts:10,23`, `tests/schemas-generated.test.ts:6`, `tests/v2-report-ui.test.ts:95`). 허용 범위 안이며, 이웃이 없을 때의 동작은 README 3절에 적혀 있다.

### AC-03 (R1, P2) 허용되지 않은 이웃 폴더를 읽고, 그 상태를 이 영역 문서에 복사했다
- 위치: `docs/change-requests/CR-004-release-ops-gateway.md:3-6`, `docs/runbook.md:43`, `README.md:78`, `mock-server/scenarios.ts:33`
- 인용: (CR-004) `계약 문서와 `../deploy/config/Caddyfile`만 읽음` / (runbook) `2026-10-27 기준 `deploy/config/Caddyfile`에는 없다(CR-004).` / (scenarios) `// v2 지표(../head/docs/metrics-v2-proposal.md 제안 이름).`
- 왜 위반인가: 워크스페이스 규칙이 읽기를 허용한 이웃 경로는 `../survey-service/schema`, `../boundary-contracts`, `../head/shared/areas.json`뿐이다. `../deploy/config/Caddyfile`, `../head/docs/metrics-v2-proposal.md`, `head/docs/OPEN_GAPS.md`는 범위 밖이다. 읽은 결과가 이웃 영역(deploy)의 사실("Caddyfile에 operator 경로가 없다", `role_matchers`, `@role_operator`)과 head의 사실(OPEN_GAPS 항목 D-A)로 이 영역 문서(CR-004 1절, runbook 43행, README 5절)에 들어와 있다. 이 사실들은 시점이 지나면 어긋난다(runbook은 "2026-10-27 기준"이라고 스스로 적었다). 코드 동작에는 영향이 없다.
- 최소 수정: 이웃 사실 문장을 지우고 "게이트웨이가 열어 줘야 하는 경로" 요구만 남긴다(deploy 문서 링크). 지표 이름 주석은 계약 `METRICS.md`/`metrics.json`을 근거로 바꾼다.

### AC-04 (R1·R6, P2) 비식별 TurnTrace의 내부 필드 이름에 기댄다. 계약 스키마가 없다
- 위치: `app/cases-view.ts:26-36`, `app/cases-view.ts:79`, `app/cases-controller.ts:100`
- 인용: `["LoRA-A 추출 상태", show(trace.extract_status)],` / `const src = trace[form.kind === "LORA_A" ? "extract_input" : "response_input"];`
- 왜 위반인가: 화면이 `extract_status`, `extract_attempts`, `validation_ok`, `response_outcome`, `contract_version`, `extract_input`, `extract_output`, `response_input`, `validation_violations`를 이름으로 읽는다. 이 이름들은 survey-service의 문진 스키마 `TurnTrace`(`../survey-service/schema/schemas/TurnTrace.json`에 존재함을 확인)의 필드이고, boundary-contracts에는 이 형식의 스키마가 없다(INTERFACES.md I7: "소비자는 이것을 `TurnTrace`로 검증하지 말고 구조 정보(열거값, 식별자, 개수, 순서)만 쓴다"). `prefillFromTrace`는 `extract_input`/`response_input`을 편집 입력으로 쓴다. 이웃(ops-feedback의 비식별기, survey-service 스키마)의 구조가 바뀌면 화면이 조용히 "—"로 비어 간다(`show`가 모르는 구조를 건너뜀). 이 영역이 문진 스키마를 의존으로 선언한 곳은 없다(Dockerfile 라벨 `io.openit.contracts.survey-schema=1`만 있고 AC-14 참조).
- 최소 수정: 이 읽기를 계약에 올린다(CR: 비식별 trace의 소비자용 구조 부분집합 스키마 `DeidentifiedTraceView`를 boundary-contracts에 둔다). 그때까지 이 영역 `docs/boundary.md`에 "읽는 TurnTrace 필드" 목록을 쓰고 survey-service 스키마를 소비로 선언한다.

## 5. E. R6 (영역 간 인터페이스와 계약 스키마)

이 영역이 소비/제공하는 영역 간 인터페이스(코드 기준):

| 호출 | 방향 | 인터페이스 | 계약의 응답/요청 스키마 | 계약에 스키마가 있는가 |
| --- | --- | --- | --- | --- |
| `GET /v1/submissions` | 소비 | I5 | `SubmissionView` 목록 `{items,next_cursor}` | `SubmissionView` 있음. 목록 봉투는 스키마 없음(HTTP.md 문장) |
| `GET /v1/submissions/{id}` | 소비 | I5 | `SubmissionView` | 있음 |
| `GET /v1/submissions/{id}/review-report` | 소비 | I5 | `ReviewReport` + 헤더 `X-Openit-Report-Hash` | `ReviewReport` 있음. 헤더는 HTTP.md 문장만 |
| `POST /v1/approvals` | 제공(요청) | I5 | `GateApproval`에서 `approval_id`·`decided_at`·`report_hash` 제외 | **요청 본문 스키마 없음**(`GateApproval`을 뺀 것이라고 문장으로만). 응답 `GateApproval` 있음 |
| `GET /v1/active-pointer` | 소비 | I4 | `{item: ActivePointer \| null}` | `ActivePointer` 있음 |
| `GET /v1/releases` | 소비 | I4 | `ReleaseManifest` 목록 | 있음 |
| `POST /v1/activate` | 제공(요청) | I5 | `{release_id, requested_by_role}` | **요청 본문 스키마 없음**. 응답 `ActivePointer` 있음 |
| `POST /v1/rollback` | 제공(요청) | I5 | `RollbackRequest` | 있음. 응답 `RollbackReceipt` 있음 |
| `GET /v1/cases`, `/v1/cases/{id}` | 소비 | I7 | `FailureCase` | 있음 |
| `GET /v1/deidentified-traces/{ref}` | 소비 | I7 | 비식별 TurnTrace | **스키마 없음**(문진 스키마 형태를 따르되 통과를 보장하지 않음) |
| `POST /v1/cases/{id}/review` | 제공(요청) | I7(Protocol 밖) | `{review_status, expected?, expected_kind?, reviewed_input?}` | **요청 본문 스키마 없음**. `boundary_contracts.clients`에도 없음(HTTP.md: "Protocol 밖") |
| 헤더 `X-Openit-User` | (게이트웨이가 붙임) | I5 | 문장만 | 스키마 없음(HTTP 헤더) |

이 영역이 "제공"하는 계약은 없다(요청 본문을 보낼 뿐). 영역 안에서 정의됐지만 경계를 넘는 스키마도 없다(브라우저는 같은 출처 게이트웨이 뒤에서만 호출).

### AC-08 (R6, P2) 영역 간에 오가는데 계약 스키마가 없는 형식 (헤드 소관)
- 위치: 위 표의 굵은 항목. 코드 쪽: `api/types.ts:63-71`(`DecideRequest`), `api/releases.ts:61`(활성화 본문), `api/types.ts:99-104`(`ReviewRequest`), `api/types.ts:107`(`DeidentifiedTrace = Record<string, unknown>`)
- 인용: `export interface DecideRequest {` / `{ release_id: releaseId, requested_by_role: REQUESTED_BY_ROLE }`
- 왜 위반인가: 이 영역이 보내는 요청 본문 3종(승인, 활성화, 검토)과 읽는 비식별 trace는 계약 문서에 문장으로만 있어 스키마 검증을 할 수 없다. 그래서 이 영역의 모의 서버가 본문 검증을 손으로 다시 쓴다(AC-07). 참고로 계약 인덱스에서도 `INTERFACES.md`의 I4 "읽는 쪽" 열에 admin-console이 없고(`INTERFACES.md:18`), I5 "쓰는 쪽"에는 operator만 있으며(`INTERFACES.md:19`) `release-approver` 역할은 I5 허용 역할 문장(INTERFACES.md I5 절)에 없고 HTTP.md I5 `decide` 행에만 있다. I10 행(`INTERFACES.md:24`)만 admin-console을 "I5·I4·I7만 쓴다"고 적는다.
- 최소 수정(헤드): `DecideRequest`, `ActivateRequest`, `CaseReviewRequest` 스키마와 비식별 trace 소비용 부분 스키마를 boundary-contracts에 추가하고 INTERFACES.md 한눈에 표에 admin-console을 I4·I5·I7 읽는/쓰는 쪽으로 넣는다. 이 영역은 변경 요청 CR-005에 이어 낸다.

## 6. F. 계약 준수 (알려진 단서 3: 한 줄씩 대조)

대조 기준: `../boundary-contracts/HTTP.md`(I4, I5, I7 절, 공통), `INTERFACES.md`(I4, I5, I7), `CONVENTIONS.md` 9·10절, 스키마.

| 호출 | 계약 | 코드 | 판정 |
| --- | --- | --- | --- |
| I5 목록 | `GET /v1/submissions?status=&limit=&cursor=`, `{items,next_cursor}`, limit 기본 100/최대 500 | `api/client.ts:34-39` `status=AWAITING_APPROVAL&limit=100[&cursor]`, `next_cursor` 따라감(`app/controller.ts:74-85`) | 일치 |
| I5 단건 | `GET /v1/submissions/{id}`, 404 | `api/client.ts:43`. 404 -> `NOT_FOUND`(`api/http.ts:25`). 이 메서드는 화면에서 쓰이지 않는다(`getSubmission` 호출처 없음: `grep -rn getSubmission app` 결과 없음) | 일치(미사용) |
| I5 보고서 | `GET .../review-report`, 헤더 `X-Openit-Report-Hash`, 자동 검사 전 409 | `api/client.ts:49-53`. 헤더 형식 `^sha256:[0-9a-f]{64}$`(`_common` Hash 패턴과 같음). 409 -> `CONFLICT` | 일치 |
| I5 결정 | `POST /v1/approvals`, 201 새, 200 같은 결정, 다른 결정 409 `ALREADY_DECIDED`, 낡은 해시 409 `STALE_REPORT`, 권한 403, **`X-Openit-User` 없으면 401, 본문 `approver_id`는 무시(헤더와 다르면 거부)** | `api/client.ts:58` 본문 `{submission_id, decision, approver_role, reason?, report_hash, approver_id?(개발 모드)}`. 201/200 -> `replay`(`client.ts:64`). `details.reason` 분기(`http.ts:31-36`). 403 -> `PERMISSION_DENIED` | 개발 모드 본문 `approver_id`가 D88과 어긋남(AC-02). 401은 `code: PERMISSION_DENIED` 본문이면 `BY_CODE`로 `PERMISSION_DENIED`가 되지만 `BY_STATUS`에 401이 없다(AC-10) |
| I4 포인터 | `GET /v1/active-pointer` -> `{item: ActivePointer \| null}` | `api/releases.ts:35-38` | 일치 |
| I4 릴리스 목록 | `GET /v1/releases` 최신부터, `limit` 최대 500 | `api/releases.ts:47-49` limit 500, 최대 20쪽 | 일치. 20쪽 상한은 근거 기록 없음(ADR 0010에 명시) |
| I5 활성화 | `POST /v1/activate` `{release_id, requested_by_role}` -> `ActivePointer`. PASS 아니면 412. 사람 행위자는 `X-Openit-User` 없으면 401 | `api/releases.ts:61` `requested_by_role: "operator"`(INTERFACES.md 허용 역할 활성화 `operator`와 일치). 412 -> `FAILED_PRECONDITION` | 일치 |
| I5 롤백 | `POST /v1/rollback` 본문 `RollbackRequest`(필수 8개 필드, `evidence_refs` 최소 1) -> `RollbackReceipt` | `api/releases.ts:68`, `app/ops-controller.ts:329-332`. `pipeline_schema_version`은 현재 포인터 레코드의 값(AC-11). `tests/ops-conformance.test.ts`가 본문을 `RollbackRequest` 스키마로 검증 | 일치(AC-11 주의) |
| I7 목록 | `GET /v1/cases?...`, 목록 `{items,next_cursor}`, limit 기본 100 | `api/cases.ts:18-25` `next_cursor`를 읽지 않고 `limit`도 보내지 않음 | **어긋남 AC-01** |
| I7 단건·trace | `GET /v1/cases/{id}?version=`, `GET /v1/deidentified-traces/{ref}` | `api/cases.ts:28-38` | 일치 |
| I7 검토 | `POST /v1/cases/{id}/review`, 쓰기 `reviewer`, 201/200, 검증 규칙 | `api/cases.ts:41-43`, `app/cases-controller.ts:105-147`. DISMISSED/PENDING은 `review_status`만(`:108`) | 일치(계약에 본문 스키마 없음, AC-08) |

### AC-01 (F, P2) 실패 사례 목록이 `next_cursor`를 무시해 첫 쪽(기본 100건) 밖의 사례가 조용히 사라진다
- 위치: `api/cases.ts:18-25`
- 인용: `const { data } = await this.http.json("GET", \`/v1/cases?${q}\`); ... return d.items!.map(checkCase);`
- 왜 위반인가: HTTP.md 공통 "목록은 `{items, next_cursor}`... 쿼리 `cursor`, `limit`(기본 100, 최대 500)". 서버가 100건을 넘는 PENDING 사례를 가지면 `next_cursor`가 non-null이어도 클라이언트는 첫 쪽만 반환한다. 사용자는 목록이 전부라고 보고 검토 누락이 생긴다. 승인 목록(K2)과 릴리스 목록(K3)은 `next_cursor`를 따라가므로 K4만 다르다. 모의 서버는 항상 `next_cursor: null`을 내서(`mock-server/cases.ts:70`) 시험이 이를 잡지 못한다.
- 최소 수정: K4가 `next_cursor`를 따라가거나(상한은 ADR 0010 방식) 화면에 "더 보기"를 둔다. 모의 서버에 쪽나누기 시나리오를 추가한다.

### AC-02 (F·R1, P2) 개발 모드의 본문 `approver_id`는 계약(D88)과 어긋나고 실제 서버에서는 401이 된다
- 위치: `app/controller.ts:135`, `api/types.ts:63-67`, `serve/static-server.mjs:25-27`, `app/config.ts`
- 인용: `...(this.devApproverId ? { approver_id: this.devApproverId } : {}),` / HTTP.md I5: `**헤더가 없으면 401로 거부한다**(D88 U7 ...) ... 본문 값이 헤더와 다르면 거부`
- 왜 위반인가: 계약은 승인자 식별을 게이트웨이의 `X-Openit-User` 한 길로 정했고, 본문 `approver_id`는 무시되며 헤더가 없으면 401이다(CONVENTIONS 9절도 `POST /v1/approvals`를 401 예외로 명시). 이 영역은 "개발 모드 설정이 있을 때만" 본문에 `approver_id`를 보내는 두 번째 길(정적 서버의 `/config.json` -> 화면)을 갖고 있다. 실제 release-gate에는 통하지 않는 경로이고 문서(design.md 8절: "본문 `approver_id`는 개발 모드 설정이 있을 때만")는 D69 시점의 설명이다. 영역 간 계약에 없는 설정 경로(`ADMIN_DEV_APPROVER_ID` -> `/config.json`)가 생겼다.
- 최소 수정: 개발·시험은 계약대로 "시험용 게이트웨이가 헤더를 붙이는" 방식(이미 `gatewayUser` 옵션이 있다)으로만 하고, 본문 `approver_id`·`/config.json`·`ADMIN_DEV_APPROVER_ID`를 없앤다(ADR로 대체 기록).

### AC-10 (F, P3) 오류 매핑이 계약의 상태 코드 전부를 덮지 않는다
- 위치: `api/http.ts:20-26`
- 인용: `const BY_STATUS: Record<number, ErrorKind> = { 400: ..., 403: ..., 404: ..., 409: ..., 412: ..., 503: ... };`
- 왜 위반인가: CONVENTIONS 9절 표는 422(`UNSUPPORTED_VERSION`, `INTEGRITY_ERROR`)와 승인·활성화·롤백의 401을 정한다. 본문이 `BoundaryError`이면 `BY_CODE`가 `PERMISSION_DENIED`로 잡지만(401), `INTEGRITY_ERROR`/`UNSUPPORTED_VERSION`은 `BY_CODE`에도 없어 `UNKNOWN`("요청에 실패했다: <서버 문구>")이 된다. 게이트웨이가 만든 401(JSON 아님)도 `UNKNOWN`이다. 5xx(502/504, `UPSTREAM_UNAVAILABLE`)는 `status >= 500`으로 `UNAVAILABLE`이 되어 계약(CONVENTIONS 9절 gateway 항목)과 맞다. 사용자에게 안내 문구가 부정확해질 뿐 동작은 안전하다.
- 최소 수정: `401 -> PERMISSION_DENIED`, `422`/`INTEGRITY_ERROR`/`UNSUPPORTED_VERSION`을 "서버 응답 이상" 계열로 매핑한다.

### AC-11 (F, P3) 롤백 요청의 `pipeline_schema_version`을 현재 포인터 레코드에서 빌려 쓰고, 고정 문자열 대체값이 있다
- 위치: `app/ops-controller.ts:330`
- 인용: `pipeline_schema_version: this.state.pointer?.pipeline_schema_version ?? "2.0"`
- 왜 위반인가: 이 영역이 만드는 요청 레코드의 버전은 이 영역이 소비하는 계약 버전(Dockerfile ARG, 지금 `PIPELINE_SCHEMA_VERSION`은 "2.1")이어야 하는데, 다른 레코드(활성 포인터)가 어느 버전으로 쓰여 있는가에 따른다. 포인터가 없을 때 롤백은 막혀 있어(`:320`) 대체값 "2.0"은 닿지 않는 코드다. 같은 MAJOR라 서버는 받는다.
- 최소 수정: 소비 계약의 `pipeline_schema_version`을 한 상수로 두고 쓴다(생성기가 이미 계약 버전을 읽는다).

## 7. G. R7 (이중 검증·재구현)

### AC-06 (R7, P3) 클라이언트가 서버가 낸 응답을 요청과 다시 대조한다
- 위치: `api/client.ts:61-63`, `api/releases.ts:63`, `api/releases.ts:70-71`
- 인용: `need(a.submission_id === req.submission_id && a.decision === req.decision, ...)` / `need(r.status === "REJECTED" || (!!r.active_pointer && r.active_pointer.release_id === body.to_release_id), ...)`
- 왜 위반인가: 서버(release-gate)가 내보낸 `GateApproval`·`ActivePointer`·`RollbackReceipt`는 보증된 값인데 클라이언트가 자기 요청과 일치하는지 한 번 더 판정한다. 의도(화면이 사람이 누른 것과 다른 결과를 성공으로 보이지 않기)는 설계 기록에 있지만(STATUS.md 작업 단위 6), R7 문구로는 이웃이 보증한 값을 재검증하는 것이다. HTTP.md 공통은 클라이언트의 "읽기 모드 검증"(필수 필드·타입·패턴, `INTEGRITY_ERROR`)을 요구하므로 레코드 모양 검사(`checkX`)는 계약이 허용한다. 요청-응답 대조는 계약 요구가 아니다. 이중 판정이 거짓 양성을 낼 때 "서버 응답 이상" 문구가 뜬다.
- 최소 수정: 헤드가 R7을 이 호출에도 적용할지 정한다. 적용하면 대조를 지운다. 적용하지 않으면 ADR에 예외 근거를 쓴다.

### AC-07 (R7·E, P2) 모의 서버가 서버의 검증 규칙을 손으로 다시 쓰고, 계약에 없는 형식을 만든다 (알려진 단서 4)
- 위치: `mock-server/server.ts:62-72`, `:82`, `:87`; `mock-server/releases.ts:199`, `:213`, `:227`, `:231-234`; `mock-server/cases.ts:90-103`
- 인용: `err(res, 409, "CONFLICT", "이미 활성 릴리스다", { reason: "ALREADY_ACTIVE" })` / `{ reason: "POINTER_CHANGED" }` / `if (s.view.status !== "AWAITING_APPROVAL") return err(res, 412, ...)` / `if (JSON.stringify(ri).includes("[MASKED]")) return err(res, 400, ...)`
- 왜 위반인가: (1) 계약이 정의한 `details.reason`은 `STALE_REPORT`, `ALREADY_DECIDED`, `OUTPUT_INVALID`, `TURN_IN_PROGRESS`뿐인데(CONVENTIONS 10절, CR-004 5항이 "정하지 않았다"고 적음) 모의가 `ALREADY_ACTIVE`, `POINTER_CHANGED`를 만든다. 화면은 이 사유를 읽지 않지만(상태 코드로만 구분) 시험과 시연이 서버가 이런 값을 낸다는 인상을 준다. (2) 승인 결정에서 대기 상태가 아니면 412를 내는 것, 롤백 성공이 201인 것, 마스킹 입력 거절은 HTTP.md에 없는 서버 동작이다. (3) 승인 본문과 검토 본문의 검증을 스키마 대신 손으로 쓴 조건식으로 한다(예: `ri.user_utterance` 타입 확인, `expected.values` 배열 확인, `mock-server/cases.ts:90-103`). 계약 스키마(`ActionExtractionInput` 등)와 같은 규칙을 다시 구현한 것이고 어긋날 수 있다. (4) 보고서 해시를 자체 정규화 함수로 만든다(`mock-server/server.ts:13-17`, RFC 8785가 아님). 클라이언트는 형식(`sha256:` + 64 hex)만 확인하므로 동작은 안전하나 "해시 구현은 서버 한 곳" 규칙의 모의판이 따로 있다. ADR 0005가 한계로 인정한다(계약 문서를 읽고 만든 것이지 실제 서버가 아니다).
- 최소 수정: 모의의 본문 검증은 이미 설치돼 있는 생성 검증기나 `ajv` + 계약 스키마로 바꾸고, 계약에 없는 사유·상태는 제거하거나 "모의 전용" 시나리오로 표시한다. 같은 본문을 계약 스키마로 검증하는 시험(`ops-conformance`)이 클라이언트 쪽에는 이미 있다.

### AC-14 (R7·D, P3) 버전·계약 선언이 여러 곳에 따로 있고 기계 대조가 없다
- 위치: `Dockerfile:16-17`, `generated/contract-validators.cjs:1`, `docs/design.md:3`, `app/ops-controller.ts:330`
- 인용: `ARG BOUNDARY_CONTRACTS=v2.1.1` / `// 생성물 ... 원본: boundary-contracts 2.1.1` / `ARG SURVEY_SCHEMA=1`
- 왜 위반인가: 소비 계약 버전이 Dockerfile ARG(정본이라 선언), 생성물 헤더, 모의 서버 `V = "2.0"`(`mock-server/server.ts:23`, `releases.ts:150`, `cases.ts:7`), 롤백의 `"2.0"` 대체값, 문서에 흩어져 있다. 지금은 일치하지만(생성물 = v2.1.1 스키마 확인) 헤더와 ARG를 묶는 시험이 없다. 라벨 `io.openit.contracts.survey-schema=1`은 이 영역이 문진 스키마를 소비한다고 선언하지만 문서(boundary.md)에는 소비 선언이 없다(AC-04와 연결).
- 최소 수정: 시험이 Dockerfile ARG와 생성물 헤더 버전을 대조한다. 모의의 `V`는 한 상수로 모은다.

## 8. 문제없음으로 확인한 것 (범위 표시)

- 이웃 영역 코드 import 없음: `api/ app/ mock-server/ serve/ scripts/` 전부의 import 줄을 읽음. `package.json` 의존은 `ajv`/`esbuild`/`typescript`/`jsdom` 등 도구뿐(전체 의존 파일을 열어 이웃 패키지 이름이 없음을 확인).
- 비밀: 코드·Dockerfile에 토큰 없음(`tests/hygiene.test.ts`가 `Authorization|Bearer|TOKEN` 소스 검색으로 고정, 내가 소스를 직접 읽어도 없음). `api/http.ts:74`는 `credentials: "same-origin"`이며 `Authorization` 헤더를 만들지 않는다. 게이트웨이가 붙이는 헤더에 기대는 곳은 `X-Openit-User`(서버가 읽음, 클라이언트는 보내지도 읽지도 않음)와 인증(`Authorization`) 둘이며 둘 다 계약이 정한 것이다(HTTP.md I5, CONVENTIONS 9절). 클라이언트가 `X-Openit-User`를 쓰는 코드는 없다(`grep -rn "X-Openit-User" app api` 결과 없음, 서버·모의에만 있음).
- 시간 제한: 클라이언트 15초(`api/http.ts:58`)는 계약의 시간 상한 사슬(키오스크~모델 턴 경로)과 무관한 운영 화면 값이고 ADR 0010이 "근거 기록 없음, 측정 안 함"이라고 적는다.
- 정적 서버: `/healthz`, `/readyz`는 의존이 없어 즉시 200. 비밀·이웃 호스트 없음. 이미지 라벨 6개(Dockerfile:18-23)는 워크스페이스 D50 키와 같다.
- R3: 컨트롤러 3개의 상호 import 없음(2절). R7 외 중복 재시도: 클라이언트에 자동 재시도가 없고(재전송은 사람이 한다), 서버 멱등(같은 결정 200)에 기댄다.
- 모의 서버가 서버 형식을 만들어 쓰는 곳: 응답 본문은 계약 스키마로 시험에서 검증됨(`tests/mock-conformance.test.ts`, `tests/ops-conformance.test.ts`). 한계는 AC-07.

## 9. 점검하지 못한 것

- 실제 release-gate·ops-feedback·게이트웨이(Caddy)와 붙인 동작: 읽을 수 없는 이웃이라 모의 서버 기준으로만 대조했다. 실제 서버가 `requested_by_role`, 409 사유, 쪽나누기, `X-Openit-User` 401을 어떻게 내는지는 확인하지 못했다.
- 계약 패키지의 적합성 시험(`../boundary-contracts/conformance`)은 Python 클라이언트·서버용이라 Node 영역에서 돌리지 못했다. 이 영역의 대응 시험은 `tests/mock-conformance`, `tests/ops-conformance`(스키마로 모의 출력과 요청 검증)이며 통과했다.
- 이미지 빌드와 `/healthz` 스모크(`npm run smoke`)는 돌리지 않았다(Docker 사용 금지 조건은 없었으나 읽기 전용 점검 범위로 보았다). `npm run build`, 실제 브라우저(접근성, CSP 아래 번들 실행)도 보지 않았다.
- `app/views.ts` 60행 이후, `app/model.ts` 40행 이후, `app/ops-view.ts`, `app/cases-view.ts` 일부의 렌더링 세부와 CSS, `tests/` 14개 파일의 본문 대부분은 구조 점검에 필요한 부분(import, 위생 시험, 헬퍼)만 읽었다. 화면 표시 규칙(n=0, worse)이 `ReviewReport` 의미와 맞는지는 이 점검의 범위(구조·계약 경로)가 아니라 읽지 않았다.
- `docs/adr/` 11개와 `docs/change-requests/CR-001`의 본문은 목록과 일부만 읽었다. ADR의 값 근거 점검(D89)은 이 기준서의 범위가 아니다.
- `../deploy`(게이트웨이 구성)는 읽기 허용이 없어 읽지 않았다. 따라서 게이트웨이가 `/v1/active-pointer` 등 CR-004의 경로를 실제로 여는지는 모른다.
- `npm audit`(취약점)은 범위 밖이다.
