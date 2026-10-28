# admin-console 표준성·근거 전수 점검 (2026-10-29, D89)

기준: `head/docs/audit/standards-audit-spec.md`. 읽기 전용 점검이다. 코드·설정·시험은 고치지 않았고 이 보고서만 썼다. 비밀 값(환경 변수, 토큰, secrets/)은 읽지도 출력하지도 않았다.

점검 환경: 이 PC 한 환경, 정적 읽기. **실행한 것은 없다**(`npm test`, `typecheck`, `build`, `smoke`, `gen-schemas --check` 모두 이 점검에서 돌리지 않았다). 읽은 것: `CLAUDE.md`, `README.md`, `docs/`(brief, design, boundary, runbook, STATUS, ADR 0001~0012, CR-002, CR-005, CR-003 4절), `api/*`, `app/{main,controller,ops-controller,ops-view,views,time,route,validate,index.html,app.css}`, `serve/static-server.mjs`, `mock-server/{server,main,releases}.ts`와 `cases.ts` 앞부분, `scripts/*`, `Dockerfile`, `package.json`, `tsconfig.json`, `generated/contract-validators.cjs` 머리·require 줄, 시험 중 `csrf`, `gateway-identity`, `hygiene`, `config`, `schemas-generated`. 계약은 `../boundary-contracts`의 `HTTP.md`(관련 줄), `schemas/BoundaryError`, `conformance/servers.py`(경로 목록만)를 읽기 전용으로 확인했다.

분류: S 표준+근거 / S- 표준이나 근거 기록 없음 / N 표준 아님+근거(대안 비교) 있음 / N- 표준 아님+근거 없음 / O 가져다 쓸 것을 직접 만듦 / ? 표준 여부 확인 못 함.

## 0. 요약

| 분류 | 개수 |
| --- | --- |
| S | 18 |
| S- | 11 |
| N | 7 |
| N- | 14 |
| O | 2 |
| ? | 5 |
| 합계 | 57 |

핵심 발견(요소표 밖의 연결 효과 포함):

1. **릴리스 목록이 20쪽에서 조용히 잘린다**(`api/releases.ts:44-55`). 실패 사례 목록은 상한을 넘으면 오류를 던지는데(`api/cases.ts:37`) 릴리스 목록은 던지지 않고 앞 부분만 돌려준다. 화면은 이 목록에서 현재 활성 릴리스의 위치를 찾아 활성화·롤백 후보를 자른다(`app/ops-controller.ts:64-75`). 활성 릴리스가 잘린 부분에 있으면 `findIndex`가 -1이어서 활성화 후보는 **전체 릴리스**가 되고 롤백 후보는 없어진다. 모의 서버는 릴리스 목록을 항상 한 쪽으로만 내므로(`mock-server/releases.ts:202`, `next_cursor: null`) 이 경로는 시험되지 않는다(릴리스의 다쪽 시험을 찾지 못했다: `tests/cases.test.ts:178`만 다쪽 시험).
2. **모의 서버가 서버 규칙을 재구현**했고, 계약 패키지에 같은 경로를 내는 참조 서버가 이미 있는데(`boundary-contracts/conformance/servers.py:240-349`: `/v1/submissions`, `/v1/approvals`, `/v1/activate`, `/v1/rollback`, `/v1/releases`, `/v1/active-pointer`, `/v1/cases`) ADR 0005는 그것을 검토하지 않았다(O-1).
3. 클라이언트가 계약 `BoundaryError.retryable`을 쓰지 않고 상태 코드로 다시 판정한다(C9). 계약은 "호출자는 code와 retryable만으로 다음 행동을 정할 수 있어야 한다"(`schemas/BoundaryError.schema.json:4`)고 적었다.
4. 승인(되돌릴 수 없음, `docs/adr/0004` 맥락)에는 입력 확인이 없고, 되돌릴 수 있는 활성화·롤백에는 대상 ID 입력이 있다(E2, E3). 위험도와 확인 강도가 반대로 놓였고 그 이유를 적은 곳이 없다.
5. 문서 어긋남: 7절.

## 1. 결과표

### A. 구조·빌드·의존

| ID | 요소 (선택) | 분류 | 표준 | 근거 위치 | 증거 |
| --- | --- | --- | --- | --- | --- |
| A1 | UI 프레임워크 없는 TypeScript, 직접 DOM(`h()`), 컨트롤러/뷰 분리 | N | 없음(ADR이 "따른 표준은 없다"고 한 것은 아니나 인용한 표준도 없음). 브리프 7절의 "의존 최소" | ADR 0001. 대안(React/Vue, Vite/webpack)은 적었으나 "비교 측정 안 함" | `app/views.ts:8-17`, `docs/adr/0001-...md:13-20` |
| A2 | 번들러 esbuild 0.25.5, `minify:true`, `sourcemap:false`, `format:esm` | N | 없음 | ADR 0001("설정이 한 줄", 비교 측정 안 함). minify·sourcemap 끔의 이유는 기록 없음 | `scripts/build.mjs:6`, `package.json:23` |
| A3 | `tsc --noEmit` 타입 검사, `node:test` 러너, Node 24 가 TS를 직접 실행(`erasableSyntaxOnly`) | ? | `node:test`는 Node 내장. Node 24의 TypeScript 직접 실행(type stripping)의 안정성 등급은 이 점검에서 확인하지 못했다 | ADR 0001 결정 3항, ADR 0009 | `package.json:6-8,13-14`, `tsconfig.json:10` |
| A4 | 번들 target `es2022`와 브라우저 지원 기준(`<dialog>.showModal`, `color-mix`, `queueMicrotask`을 씀) | N- | 없음. browserslist 같은 지원 기준 문서 없음 | 근거 기록 없음. 브리프 5절은 "데스크톱 브라우저"까지만 | `scripts/build.mjs:6`, `app/app.css:8`, `app/views.ts:114-117`, `docs/brief.md:35` |
| A5 | 의존 고정: `package-lock.json` + `npm ci`, ajv·esbuild 등은 정확한 버전, `jsdom ^26.1.0`·`@types/jsdom ^30.0.0`은 캐럿 범위 | S- | npm 잠금 파일 관행. 워크스페이스 규칙(잠금 파일 고정) | 잠금 사용은 ADR 0011("정확한 버전으로 고정(기존 방식)")에 있으나 캐럿이 섞인 이유와 `@types/jsdom` 30 대 `jsdom` 26의 주 버전 차이는 기록 없음 | `package.json:19-25`, `Dockerfile:6` |
| A6 | devDependency 취약점 최소 범위 상향, `npm audit` 사용 | S | npm audit(GHSA 권고). 워크스페이스 규칙 | ADR 0011 | `docs/adr/0011-...md:7-17` |
| A7 | 이미지: 다단계 빌드, 베이스 `node:24.14.0-alpine3.22`(태그 고정, digest 아님), `USER node`, 포트 8080, 설정은 환경 변수 | S | 워크스페이스 CLAUDE.md "컨테이너와 개발"(D22), 12-factor 설정 | 워크스페이스 규칙. 태그 고정만으로 충분한지 digest 고정을 검토한 기록은 없다 | `Dockerfile:3,14,27-30`, `tests/hygiene.test.ts:112-121` |
| A8 | 라벨 `io.openit.contracts.survey-schema="1"` 고정 | S- | D50 라벨 키 통일(워크스페이스 규칙) | 키는 규칙에 근거. 값 `1`의 근거는 없고, 이 영역은 계약 v2.0부터 문진 스키마를 소비하지 않는다(소비는 `boundary-contracts`의 `ActionExtraction*`: `docs/STATUS.md:24`) | `Dockerfile:17,21` |
| A9 | `setup-env.sh`: `npm ci` 실패 시 5초 뒤 한 번만 재시도, `engines`를 `>=N` 꼴만 해석 | N- | 없음 | 재시도를 두는 이유는 주석에 있음("일시적 장애 대비"). 횟수 1과 5초의 근거는 없고 측정도 안 했다 | `scripts/setup-env.sh:16-18,27-32` |
| A10 | 해시(`#/...`) 라우팅, `safeDecode` | N | 없음("따른 표준은 없다"고 ADR이 밝힘) | ADR 0003(대안 History API 비교, 서버 fallback 불필요) | `app/main.ts:69-81`, `app/route.ts` |

### B. 계약 검증·생성물

| ID | 요소 (선택) | 분류 | 표준 | 근거 위치 | 증거 |
| --- | --- | --- | --- | --- | --- |
| B1 | CSP 때문에 런타임 컴파일 대신 Ajv standalone으로 검증기 생성 | S | Ajv의 공식 standalone 코드 생성 기능, JSON Schema 2020-12(`ajv/dist/2020.js`). CSP에서 `eval` 금지(`unsafe-eval` 없이) | ADR 0002 | `scripts/gen-schemas.mjs:4-5,22`, `app/validate.ts:2`, `serve/static-server.mjs:15` |
| B2 | 생성물 `generated/contract-validators.cjs`(약 117KB)를 리포에 커밋 | N | 없음. 원본 복사 금지 규칙은 지킴(스키마 JSON 복사본 없음) | ADR 0002 대안 (a)(b)(c) 비교. 단 "헤드 결정 대기"(CR-003 4절). 대안 (b)는 계약 리포의 결정이라 미정 | `docs/adr/0002-...md:3,16-19`, `tests/schemas-generated.test.ts:11-14,32-45` |
| B3 | 생성기가 이웃 **작업 트리**(`../../boundary-contracts`)를 읽고 버전은 `pyproject.toml`에서 읽음. 태그 일치는 확인하지 않음. 최신 여부 시험은 이웃이 없으면 건너뜀 | N- | 없음. 워크스페이스 규칙은 태그 설치를 말함(Python 패키지 대상, Node 영역에는 적용 방식이 정해지지 않음) | 근거 기록 없음. ADR 0002는 "원본이 없는 환경에서는 건너뛴다"를 감수 항목으로만 적음 | `scripts/gen-schemas.mjs:9,14`, `tests/schemas-generated.test.ts:11`, `Dockerfile:16` |
| B4 | Ajv 옵션 `strict:false, allErrors:true`(오류는 최대 8건 표시) | S- | JSON Schema 명세는 모르는 키워드를 무시해도 되도록 허용한다. Ajv 기본값은 strict. 이 점검에서 `strict:false`가 실제로 무시하는 키워드가 있는지는 확인하지 못했다 | 근거 기록 없음 | `scripts/gen-schemas.mjs:15`, `app/validate.ts:20` |
| B5 | 응답 검사를 스키마 검증기가 아니라 손으로 쓴 부분 검사(`checkSubmission`, `checkReport`, `checkCase`, `checkPointer`, `checkRelease`, `checkReceipt`, `need`)로 함 | N- | 없음. 같은 영역에 스키마 검증기 생성 기구가 있다 | 근거 기록 없음. 설계서·ADR에 이유 없음(방어적 최소 검사라는 설명만 코드 주석 없이 존재) | `api/client.ts:10-20`, `api/cases.ts:5-10`, `api/releases.ts:5-22` |
| B6 | `report_hash`를 계산하지 않고 응답 헤더 `X-Openit-Report-Hash`를 그대로 돌려보냄, 형식 `^sha256:[0-9a-f]{64}$` 확인 | S | 계약 HTTP.md I5(D69) | ADR 0004 3항 | `api/client.ts:51-53`, `docs/adr/0004-...md:17` |
| B7 | 화면에 보이는 해시 길이 19자(`sha256:`+12자) | N- | 없음 | ADR 0010: "길이 선택의 근거 기록 없음" | `app/views.ts:72,106`, `docs/adr/0010-...md:14` |

### C. 통신·쪽 넘김·오류·재시도

| ID | 요소 (선택) | 분류 | 표준 | 근거 위치 | 증거 |
| --- | --- | --- | --- | --- | --- |
| C1 | 목록의 `next_cursor`를 null이 될 때까지 따라감(실패 사례, 릴리스). 승인 목록은 "더 보기"로 사용자가 넘김 | S | 계약 HTTP.md 공통 목록 규칙(`items`, `next_cursor`, `cursor`, `limit`: `HTTP.md:9`) | 코드 주석, 시험 `cases.test.ts:178` | `api/cases.ts:22-36`, `api/releases.ts:41-55`, `app/controller.ts:71-82` |
| C2 | 실패 사례·릴리스 쪽 크기 500 | S | 계약의 limit 최대 500(`HTTP.md:9`) | 주석("계약의 최대값") | `api/cases.ts:23,28`, `api/releases.ts:46-47` |
| C3 | 승인 목록 쪽 크기 100 | S- | 계약의 limit 기본값 100과 같다 | ADR 0010 표는 "근거 기록 없음. 서버 상한은 계약에 없다"고 적었는데, 계약에는 기본 100·최대 500이 있다(7절) | `api/client.ts:33`, `docs/adr/0010-...md:12` |
| C4 | **최대 20쪽** 상한(실패 사례, 릴리스) | N- | 없음 | ADR 0010: "근거 기록 없음", "실제 릴리스 수를 측정하지 않았다" | `api/cases.ts:23,26`, `api/releases.ts:44-46` |
| C5 | 상한 초과 시 동작이 둘로 갈림: 실패 사례는 `ApiError`로 중단, 릴리스는 **조용히 앞 20쪽만 반환**. 이 잘린 목록으로 활성화·롤백 후보를 계산함. 릴리스 다쪽 시험 없음 | N- | 없음 | ADR 0010 13행이 "20쪽을 넘으면 오래된 릴리스가 목록에서 빠진다"고 적었으나 화면에 알리지 않는 이유는 없다 | `api/cases.ts:37`, `api/releases.ts:44-56`, `app/ops-controller.ts:64-75`, `mock-server/releases.ts:202` |
| C6 | 요청 시간 제한 방식: `AbortController`로 본문을 다 읽을 때까지 적용, 타이머 주입 | S | WHATWG DOM `AbortController`/Fetch | ADR 0010 11행(본문까지 거는 이유), 주석 | `api/http.ts:46-66,81-86` |
| C7 | 요청 시간 제한 값 15000ms | N- | 없음 | ADR 0010: "값의 근거 기록 없음(측정 안 함)" | `api/http.ts:57-58` |
| C8 | 오류 해석: `BoundaryError.code` 우선, 없으면 상태 코드, 409는 `details.reason`으로만 구분 | S | 계약 BoundaryError, HTTP.md D69 | ADR 0004 4항, 주석 | `api/http.ts:20-40` |
| C9 | `retryable`을 본문 필드가 아니라 `kind===UNAVAILABLE`이거나 status>=500으로 직접 판정 | N- | 계약 `BoundaryError`는 `retryable`을 필수 필드로 두고 호출자가 그 값으로 행동하게 정함 | 근거 기록 없음 | `api/http.ts:38`, `schemas/BoundaryError.schema.json:4,11` |
| C10 | 자동 재시도 없음. 결정 전송이 끊기면 사람에게 "같은 결정을 다시 보내도 안전"이라고 안내 | S- | RFC 9110 9.2.2는 멱등 메서드만 자동 재시도 대상으로 본다. 이 영역은 자동 재시도를 하지 않으므로 어긋나지 않는다 | 화면 문구·boundary.md 7행에 있으나 "재시도 없음"을 고른 이유를 적은 ADR은 없음 | `app/controller.ts:158-160`, `docs/boundary.md:7` |
| C11 | 중복 전송 방지(`inflight` 집합), 롤백은 확인 단계마다 `request_id`를 만들어 재전송 때 재사용, 난수는 `crypto.randomUUID`, 없으면 `getRandomValues`로 UUID v4 직접 생성 | S | 계약 `RollbackRequest.request_id`(멱등), UUID 버전 4의 비트 규칙(RFC 4122/9562에 일치하는 생성으로 보이나 이 점검에서 문서를 대조하지는 않았다) | 코드 주석(보안 컨텍스트에서만 `randomUUID`), ADR 0007 | `app/controller.ts:123-127`, `app/ops-controller.ts:52-61,112` |
| C12 | 활성화 요청에 `request_id`·`expected_pointer_version`이 없고 다른 운영자의 활성화를 조용히 덮어쓸 수 있음 | N | 없음 | CR-005(계약 변경 제안, 헤드 응답 대기), ADR 0007 15행 | `api/releases.ts:59-65`, `docs/change-requests/CR-005-activate-optimistic-concurrency.md` |
| C13 | CSRF는 게이트웨이의 `Sec-Fetch-Site`/`Origin` 검사에 의존하고, 화면은 그 방식을 깨는 전송(form POST, sendBeacon, no-cors)을 쓰지 않음. 쿠키 자격은 `same-origin` | S- | W3C Fetch Metadata Request Headers, OWASP CSRF 방어(둘 다 이름만 알고 이 점검에서 원문 대조는 하지 않았다). 시험 주석이 규칙을 적음 | ADR 없음. 시험 파일 머리 주석만 있음 | `tests/csrf.test.ts:1-2,11-26`, `api/http.ts:74-75` |
| C14 | 인증 만료(401)·로그인 페이지로의 리다이렉트 처리: 401은 `BY_STATUS`에 없어 "UNKNOWN"으로, 리다이렉트된 HTML 응답은 "서버 응답 이상"으로 보임. 별도 처리 없음 | ? | 사람 인증 방식(게이트웨이 앞단, 기본 인증 가정)이 정해지지 않아 어떤 표준 흐름이 맞는지 확인하지 못했다 | `docs/brief.md:30`, CR-002는 "사람 인증과 HTTPS 미정" | `api/http.ts:24-26,94-95` |

### D. 인증·식별·신뢰

| ID | 요소 (선택) | 분류 | 표준 | 근거 위치 | 증거 |
| --- | --- | --- | --- | --- | --- |
| D1 | 클라이언트는 승인자·행위자 이름을 본문에 싣지 않고, 서버가 `X-Openit-User`로 기록함. 개발·시험은 모의 서버가 게이트웨이를 흉내 냄 | S | 계약 HTTP.md I5 승인자 식별(D88) | ADR 0012 | `app/controller.ts:129-136`, `api/releases.ts:60-61`, `tests/gateway-identity.test.ts` |
| D2 | `X-Openit-User` 신뢰: "클라이언트가 보낸 같은 이름의 헤더는 게이트웨이가 지운다"는 계약 문장에 전적으로 기댐. 이 영역에서 그 동작을 확인할 수단이 없고(시험은 모의 서버뿐; 모의는 요청에 이미 있는 헤더를 그대로 신뢰: `server.ts:68`) 확인한 적도 없음. 이 헤더 방식(이름과 형식)이 이름 있는 표준인지 확인하지 못했다 | ? | 헤더 이름은 자체 규약이다. 프록시가 인증 결과를 헤더로 전달하는 방식 자체의 이름 있는 표준은 이 점검에서 확인하지 못했다 | ADR 0012는 "개발 경로 제거"의 이유만 적고, 서명된 단언(예: JWT 헤더) 같은 대안과의 비교는 없다. 계약 쪽 결정 D88은 읽지 못했다 | `docs/adr/0012-...md:12-16`, `docs/change-requests/CR-002-gateway-routes.md`, `mock-server/server.ts:65-71` |
| D3 | 사람 로그인·HTTPS·로그아웃·세션 수명은 이 영역에 없고 게이트웨이 몫으로 미룸 | ? | 확인하지 못함: 방식이 정해지지 않았다("기본 인증 가정"만 있음) | 브리프 7절 "미정", CR-002 | `docs/brief.md:30,43`, `docs/STATUS.md:43` |
| D4 | 본문에 `approver_role: release-approver`, `requested_by_role: operator`를 상수로 보냄(서버는 믿지 않고 기록용) | S- | 계약 INTERFACES.md 허용 역할 표(이 점검에서는 STATUS·코드 주석으로만 확인, 표 자체는 읽지 않았다) | 코드 주석, runbook 45행. 서버가 값을 믿지 않는데 보내는 이유는 계약 스키마 필수 필드라는 설명뿐 | `app/controller.ts:6`, `api/releases.ts:24-25`, `docs/runbook.md:45` |
| D5 | 토큰·비밀이 코드·빌드·브라우저에 없음, 브라우저 저장소·콘솔 사용 금지(소스 정규식 시험) | S | OWASP 비밀 관리 원칙, 워크스페이스 D84(해당 비밀 없음) | 브리프 4절, design 7절, README 3절 | `tests/hygiene.test.ts:98-106`, `docs/design.md:68-70` |

### E. 화면의 위험 작업 확인

| ID | 요소 (선택) | 분류 | 표준 | 근거 위치 | 증거 |
| --- | --- | --- | --- | --- | --- |
| E1 | 승인·반려는 `<dialog>.showModal()` 확인창, 첫 포커스는 취소 버튼, ESC는 취소 | S- | HTML 표준 `dialog`. WAI-ARIA APG의 대화상자 지침과 같은 방향으로 보이나 ADR이 인용하지 않았고 원문은 대조하지 않았다 | ADR 0004(Enter 연타 방지). 실제 브라우저 동작은 확인 못 함(jsdom만) | `app/views.ts:99-122`, `docs/adr/0004-...md:16`, `docs/adr/0009-...md:22` |
| E2 | 승인은 되돌릴 수 없는 결정인데 입력 확인 없이 확인창 한 번. 활성화·롤백(되돌릴 수 있음)에는 ID 입력을 요구 | N- | 없음 | ADR 0004 23행: "이 판단의 근거는 측정이나 문서로 남아 있지 않다(근거 기록 없음)" | `docs/adr/0004-...md:6,23`, `app/ops-controller.ts:131-133` |
| E3 | 활성화·롤백은 대상 릴리스 ID를 그대로 입력해야 실행 버튼이 켜짐 | N | 없음. ADR이 "GitHub 저장소 삭제 등의 관행을 따른 것, 표준 문서 아님"이라고 밝힘 | ADR 0007(대안 단순 확인, 이중 승인 비교). 그 선택을 뒷받침한 사고 사례·요구는 "근거 기록 없음" | `app/ops-controller.ts:131-133,140`, `docs/adr/0007-...md:12,18` |
| E4 | 활성화·롤백 확인은 모달이 아닌 페이지 안 인라인 `form`이며 승인의 확인창과 방식이 다름. 포커스는 수동 이동 | N- | 없음 | 두 방식이 다른 이유를 적은 곳이 없다(ADR 0007은 승인과 "같은 방식"이라는 단순 확인만 비교) | `app/ops-view.ts:20-53,106-108`, `docs/adr/0007-...md:18` |
| E5 | 롤백 사유(필수)·근거 ID(1개 이상) 필수, 개인정보 금지 안내 | S | 계약 `RollbackRequest`(`reason` minLength 1, `evidence_refs` minItems 1) | ADR 0007 | `app/ops-controller.ts:142-146`, `app/ops-view.ts:42` |
| E6 | 반려 사유 필수, 사유 칸에 개인정보 금지 안내 | S | 브리프 4절, 계약 HTTP.md | ADR 0004 1항 | `app/controller.ts:106-109`, `app/views.ts:91` |

### F. 정적 서버·보안 헤더·운영

| ID | 요소 (선택) | 분류 | 표준 | 근거 위치 | 증거 |
| --- | --- | --- | --- | --- | --- |
| F1 | **정적 파일 서버를 `node:http`로 직접 구현**(경로 정규화·탈출 방지, MIME 표, GET/HEAD, 404/405). 이미 있는 정적 서버(nginx, Caddy 등)를 쓰지 않음 | O | 정적 파일 서빙은 기성 서버가 제공하는 기능이다. 직접 구현에서 보이는 HTTP 의미의 빈칸: 405에 `Allow` 헤더 없음(RFC 9110 15.5.6은 405 응답에 `Allow`를 요구한다고 알고 있으나 이 점검에서 원문을 대조하지는 않았다), `HEAD`에 `Content-Length` 없음, 퍼센트 인코딩 해석 없음, SIGINT 처리 없음 | ADR 0006은 이유를 적었으나("의존 없음, 이미지 작음") nginx/Caddy와의 비교는 "비교한 기록은 없다(근거 기록 없음)". 판단 경계: 38줄이고 의존이 없어 N으로 볼 여지가 있다. 헤드 판단 필요 | `serve/static-server.mjs:18-38`, `docs/adr/0006-...md:17` |
| F2 | `/healthz`, `/readyz`를 항상 200으로 응답(의존이 없어 같은 내용) | S | 워크스페이스 규약(`/healthz` 살아 있음, `/readyz` 의존 준비됨) | 워크스페이스 CLAUDE.md, ADR 0006 | `serve/static-server.mjs:20-23` |
| F3 | CSP: `default-src 'self'; script-src 'self'; style-src 'self'; connect-src 'self'; base-uri 'none'; form-action 'none'; frame-ancestors 'none'`. 인라인 스타일·스크립트 없음(소스에서 `style` 속성 사용 없음 확인) | S | W3C Content Security Policy, OWASP 보안 헤더 지침(이름만) | ADR 0006 14행. 번들이 이 CSP 아래 실제 브라우저에서 도는지는 **확인하지 못했다**(ADR 스스로 밝힘) | `serve/static-server.mjs:15`, `docs/adr/0006-...md:14` |
| F4 | 모든 정적 응답에 `Cache-Control: no-store` | S | RFC 9111 `no-store` | ADR 0006 13행(보고서·사례 내용이 캐시에 남지 않게). 정적 자산 성능 영향은 측정 안 함 | `serve/static-server.mjs:12` |
| F5 | `X-Content-Type-Options: nosniff`, `Referrer-Policy: no-referrer` | S- | Fetch 표준(nosniff), W3C Referrer Policy | ADR 0006 결정 항에 나열만 있고 각각의 이유는 없음. `no-referrer`가 Origin 헤더에 주는 영향은 시험 주석에만 있음(`csrf.test.ts:1-2`) | `serve/static-server.mjs:13-14`, `docs/adr/0006-...md:9` |
| F6 | 넣지 않은 헤더 판단: HSTS, `Permissions-Policy`, COOP/CORP. `/healthz`와 405 응답에는 보안 헤더도 안 붙음 | ? | HTTPS 종단이 게이트웨이인지 이 점검에서 확인하지 못해 HSTS 등의 필요 여부를 판정하지 못했다 | 기록 없음. CR-002는 "HTTPS 미정" | `serve/static-server.mjs:11-16,20-24`, `docs/change-requests/CR-002-gateway-routes.md` |
| F7 | 로그: 시작 한 줄만 표준 출력. 접근 로그·감사 로그 없음, 앱은 콘솔 사용 금지(시험). 지표 없음 | S- | 12-factor 로그를 표준 출력으로(워크스페이스 규칙). 변경 감사 기록은 서버가 `X-Openit-User`로 남김 | 콘솔 금지의 이유는 design 7절(보고서 내용을 로그에 남기지 않기). 접근 로그를 두지 않은 이유는 기록 없음 | `serve/static-server.mjs:37`, `tests/hygiene.test.ts:102` |

### G. 화면 품질

| ID | 요소 (선택) | 분류 | 표준 | 근거 위치 | 증거 |
| --- | --- | --- | --- | --- | --- |
| G1 | 접근성: `lang="ko"`, `th scope`, `label for`, `aria-describedby`, `role=alert/status`, `aria-current`, 대화상자 `aria-labelledby`, 포커스 표시 외곽선, 화면 전환 때 제목으로 포커스 이동, "나빠짐"을 색만으로 쓰지 않음 | S- | HTML 의미 요소·WAI-ARIA를 쓰고 있음. 목표 수준(WCAG 몇 레벨)은 어디에도 정하지 않았다 | 브리프 5절은 "접근성 기본"뿐. ADR 없음. 대비율 측정·스크린리더·키보드 흐름·접근성 도구 검사는 **하지 않았다**(ADR 0009, README 4절). 다시 그리면 포커스를 잃어 수동 복구(ADR 0001 24행) | `app/index.html:2,10`, `app/app.css:14-17`, `app/main.ts:42-45`, `app/views.ts:35,92,103` |
| G2 | DOM은 `createElement`/`textContent`/`setAttribute`로만 만들고 `innerHTML` 금지(소스 정규식 시험) | S | OWASP DOM 기반 XSS 방어(위험 sink 회피) | ADR 0001 14행, 시험 | `app/views.ts:8-17`, `tests/hygiene.test.ts:103` |
| G3 | 시각 표시: 서버 UTC 원문 + 현지 시각 병기 | S | 계약 `Timestamp`(RFC 3339 계열 UTC), `Intl.DateTimeFormat` | ADR 0008 | `app/time.ts:3-8` |
| G4 | 현지 시각 형식을 얻으려고 `sv-SE` 로캘을 씀 | N- | 없음(ISO 비슷한 모양이 나오는 것을 이용한 관행) | ADR 0008 13행: "로캘 선택에 다른 근거는 없다(근거 기록 없음)" | `app/time.ts:7`, `docs/adr/0008-...md:13` |

### H. 시험·모의 서버

| ID | 요소 (선택) | 분류 | 표준 | 근거 위치 | 증거 |
| --- | --- | --- | --- | --- | --- |
| H1 | **모의 서버가 서버 규칙을 직접 재구현**: 승인 멱등(같은 결정 200/다른 결정 409), `details.reason`, 보고서 해시 대조 409, 헤더 없으면 401·본문 승인자 불일치 400, 활성화 409/412, 롤백 `request_id` 멱등·`from_release_id` 대조·412, 403 역할, 쪽 넘김. 또 개발용 정적 서빙도 따로 한 벌 더 구현(`server.ts:132-138`, 경로 비교에 구분자 없음, 잘못된 퍼센트 인코딩은 503) | O | 계약 패키지가 같은 경로를 내는 참조 서버를 이미 제공한다(`boundary-contracts/conformance/servers.py:66,240-349`, Python). 워크스페이스 규칙은 이웃의 메모리 구현으로 혼자 시험하라고 함. 이 점검은 그 참조 서버의 동작을 실행하거나 상세히 읽지 않았다 | ADR 0005는 "이웃 코드를 읽을 수 없다"만 적었고 계약 패키지의 참조 서버는 언급·비교하지 않았다. 이 영역이 Python을 쓰지 않는 점(브리프 1행)이 이유일 수 있으나 기록은 없다. 스키마 형태 검증만 있고 의미 규칙은 재구현본이 맞는다고 같은 쪽이 쓴 시험으로 확인 | `mock-server/server.ts:58-103,132-138`, `mock-server/releases.ts:194-248`, `docs/adr/0005-...md:19-21`, `docs/brief.md:3` |
| H2 | 모의의 보고서 해시 직렬화를 자체 구현(키 정렬 + `JSON.stringify`). 어떤 표준인지 어디에도 적지 않았고 계약의 기준 구현 `canonical.py`와의 일치 시험이 없음 | N- | 계약 `CONVENTIONS.md`의 규칙(JCS/RFC 8785을 따르는지 이 점검에서 확인하지 못함) | 근거 기록 없음 | `mock-server/server.ts:12-17`, `tests/`에서 `canonical` 검색 결과 없음 |
| H3 | 시험은 `node:test` + `jsdom`, 실제 브라우저 시험 없음, 계약 스키마·예시를 이웃 폴더에서 직접 읽음(이웃이 없으면 일부 실패 또는 건너뜀) | N | 없음 | ADR 0009(대안 Playwright, Jest/Vitest 비교, 비용 측정 안 함). 한계도 밝힘 | `docs/adr/0009-...md:11,18-23`, `README.md` 3절 |
| H4 | 시험 조건 대기 상한 `waitFor` 15000ms | N- | 없음 | ADR 0010 표: "측정 안 함", 근거 없음 | `tests/helpers.ts`(값은 ADR 0010 표로 확인, 파일 줄은 읽지 않았다) |

(행 수: A 10, B 7, C 14, D 5, E 6, F 7, G 4, H 4 = 57. 아래 집계는 이 표의 분류 열을 센 값이다.)

## 2. 분류별 집계 (표에서 센 값)

| 분류 | ID |
| --- | --- |
| S (18) | A6, A7, B1, B6, C1, C2, C6, C8, C11, D1, D5, E5, E6, F2, F3, F4, G2, G3 |
| S- (11) | A5, A8, B4, C3, C10, C13, D4, E1, F5, F7, G1 |
| N (7) | A1, A2, A10, B2, C12, E3, H3 |
| N- (14) | A4, A9, B3, B5, B7, C4, C5, C7, C9, E2, E4, G4, H2, H4 |
| O (2) | F1, H1 |
| ? (5) | A3, C14, D2, D3, F6 |

## 3. N-, O, ? 항목만 모은 목록

N- (표준 아님, 근거 없음)
- A4 번들 target과 브라우저 지원 기준이 문서에 없다.
- A9 `setup-env.sh`의 재시도 1회·5초 값에 근거가 없다.
- B3 생성기가 이웃 작업 트리를 읽고 태그 일치를 확인하지 않으며 최신 여부 시험이 이웃 부재 때 건너뛴다.
- B5 응답 검사를 스키마 검증기 대신 손으로 쓴 부분 검사로 했고 이유가 없다.
- B7 화면 해시 길이 19자의 근거가 없다.
- C4 목록 최대 20쪽 상한에 근거가 없다.
- C5 상한 초과 동작이 실패 사례(오류)와 릴리스(조용한 절단)로 갈리고, 잘린 릴리스 목록으로 활성화·롤백 후보를 계산하며 다쪽 시험이 없다.
- C7 요청 시간 제한 15000ms에 근거가 없다.
- C9 `retryable`을 계약 필드 대신 상태 코드로 다시 판정한다.
- E2 되돌릴 수 없는 승인에는 입력 확인이 없고 되돌릴 수 있는 활성화·롤백에는 있으며 이유가 없다.
- E4 활성화·롤백 확인이 승인과 다른 방식(인라인 폼)인 이유가 없다.
- G4 `sv-SE` 로캘 사용에 근거가 없다.
- H2 모의 서버의 해시 직렬화가 어떤 표준인지, 기준 구현과 일치하는지 확인 수단이 없다.
- H4 시험 대기 상한 15000ms에 근거가 없다.

O (재발명)
- F1 정적 파일 서버를 직접 구현했고 기성 서버와의 비교 기록이 없다(경계 사례, 헤드 판단 필요).
- H1 계약 패키지에 참조 서버가 있는데 모의 서버가 서버 규칙을 재구현했고 그 검토 기록이 없다.

? (표준 여부 확인 못 함)
- A3 Node 24의 TypeScript 직접 실행의 안정성 등급.
- C14 인증 만료(401)와 로그인 리다이렉트의 표준 처리(사람 인증 방식 미정).
- D2 `X-Openit-User` 방식이 이름 있는 표준인지, 게이트웨이가 클라이언트 헤더를 지우는지.
- D3 사람 로그인·HTTPS·세션 방식(미정).
- F6 HSTS 등 누락 보안 헤더가 필요한지(HTTPS 종단 위치 미확인).

## 4. 값(숫자) 출처 정리

| 값 | 출처 | 비고 |
| --- | --- | --- |
| 쪽 크기 500 | 제약(계약 limit 최대) | 측정 아님 |
| 쪽 크기 100(승인 목록) | 제약(계약 limit 기본) | ADR 0010은 근거 없음이라 적음 |
| 20쪽 | 출처 없음 | 측정 안 함 |
| 15000ms 요청 제한 | 출처 없음 | 측정 안 함 |
| 15000ms 시험 대기 상한 | 출처 없음 | 측정 안 함 |
| 해시 표시 19자 | 출처 없음 | 표시용 |
| 모의 서버 지연 300ms | 출처 없음 | 코드 주석에 "근거 없음" 명시(`mock-server/server.ts:87`) |
| `npm ci` 재시도 5초·1회 | 출처 없음 | |
| 포트 8080, 보존 기간·비식별·저장소 | 포트는 워크스페이스 규약(스모크가 호스트 포트 배정). 이 영역은 소유 저장소가 없고 보존 기간·비식별을 수행하지 않는다(`docs/boundary.md:3`) | 해당 없음 |

## 5. 해당 없음으로 판단한 항목

저장소 종류·데이터 모델(소유 저장소 없음), 보존 기간(저장 없음), 비식별 방식(이 영역은 비식별된 trace를 읽기만 함), 자격 발급·갱신·폐기(토큰을 다루지 않음), 스케줄러·잡(없음), 동시성 모델(브라우저 단일 스레드, 정적 서버는 Node 기본), 비밀 처리의 `NAME_FILE`(비밀이 없음), 메트릭(없음; F7에서 언급).

## 6. 점검하지 못한 것

- 실행하지 않았다: `npm test`, `npm run typecheck`, `npm run build`, `npm run smoke`(이미지 빌드), `node scripts/gen-schemas.mjs --check`. 따라서 README가 적은 통과 수치(85개 통과)는 이 점검의 확인이 아니다.
- 실제 브라우저에서의 CSP 아래 번들 실행, 키보드 흐름, 스크린리더, 색 대비, `<dialog>` 모달 포커스 동작. 정적 읽기만 했다.
- 실제 게이트웨이(deploy)가 `X-Openit-User`를 지우고 붙이는지, `/v1`을 어떻게 프록시하는지, CSRF 검사·HTTPS·인증. 이 영역 밖이고 deploy 리포를 읽지 않았다.
- 실제 release-gate·ops-feedback 서버의 동작. 계약 패키지의 참조 서버(`conformance/servers.py`)도 경로 목록만 보고 동작은 읽지 않았다.
- 읽지 않은 파일: `app/model.ts`, `app/cases-controller.ts`, `app/cases-view.ts`, `api/types.ts`, `mock-server/scenarios.ts`, `mock-server/cases.ts` 뒷부분, 시험 중 `audit*`, `flow`, `ui`, `cases*`, `ops*`, `mock-conformance`, `v2-report-ui`, `tests/helpers.ts`, `package-lock.json` 내용, `docs/change-requests/` 중 CR-001·CR-004·CR-006 본문과 스키마 초안, `docs/audit/structure-rules-2026-10-28.md` 본문 대부분.
- 읽기 허용 밖이라 읽지 않은 것: 헤드의 `DECISIONS.md`(D69, D70, D85, D88의 원문). 계약 `HTTP.md`는 관련 줄만, `CONVENTIONS.md`, `INTERFACES.md`, `METRICS.md`는 읽지 않았다. 그래서 JCS 규칙, 허용 역할 표, `X-Openit-User`의 결정 근거는 확인하지 못했다.
- RFC·W3C·OWASP 문서의 원문 대조는 하지 않았다. 표에 적은 표준 이름은 이름과 일반적 내용만 근거로 했고, 원문 대조를 하지 않은 곳은 해당 칸에 그렇게 적었다.
- `npm audit`는 오프라인이라 이 점검에서 다시 돌리지 않았다(ADR 0011은 2026-10-28 결과).

## 7. 문서 사이 어긋남(분류와 별개로 발견한 것)

- `docs/design.md:65`는 ajv가 "시험 전용, 이미지에 들어가지 않는다"고 쓰지만 `docs/adr/0011-...md:16`은 생성 검증기가 `ajv/dist/runtime/ucs2length`를 `require`해 번들에 그 함수가 들어간다고 쓴다. 생성물에서 `require("ajv/dist/runtime/ucs2length")` 한 건을 확인했다.
- `docs/adr/0010-...md:12`는 "서버 상한은 계약에 없다"고 쓰지만 계약 `HTTP.md:9`는 limit 기본 100·최대 500을 정한다. `api/cases.ts:23`은 500을 "계약의 최대값"이라고 적어 같은 영역의 문서끼리도 어긋난다.
- `docs/adr/0003-...md:6`은 `app/config.ts`를 가리키나 ADR 0012가 이를 없앴다.
- `docs/adr/0002-...md:3`·`docs/change-requests/CR-003` 4절은 아직 survey 스키마 기준 서술(`UtteranceParserInput` 등)이 남아 있고, `Dockerfile:17`의 `SURVEY_SCHEMA=1` 라벨도 같은 이력의 잔재로 보인다.
- `README.md` 3절은 이웃이 없으면 일부 시험이 실패한다고 쓰고 ADR 0002는 건너뛴다고 쓴다(시험별로 다를 수 있으나 이 점검에서 시험을 돌려 확인하지 않았다).
