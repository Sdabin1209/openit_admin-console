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
