# CR-003: 실패 사례 검토 화면의 게이트웨이 경로, 검토자 식별, 스키마 생성물

- 요청 영역: admin-console, 대상: 헤드와 deploy. 상태: 제안. ops-feedback 리포지토리는 읽지 않았다(계약 문서만 읽음).

## 1. 게이트웨이 경로 (CR-002와 같은 방식)
이 영역은 같은 출처의 `/v1`만 부른다. 이미지는 `/v1`을 프록시하지 않는다. 사람 인증을 마친 요청에만 아래를 ops-feedback으로 전달해 달라.

| 경로 | 토큰 역할 |
| --- | --- |
| `GET /v1/cases`, `GET /v1/cases/{id}`, `GET /v1/deidentified-traces/{ref}` | 읽기 |
| `POST /v1/cases/{id}/review` | **`reviewer` 쓰기**(읽기 토큰으로 가면 403) |

- 열지 않을 것: 비식별 전 원본 trace, `publish_case`, 그 밖의 `/v1/*`.
- `/v1/cases*`와 `/v1/deidentified-traces/*`는 실패 사례(환자 발화가 비식별된 것)를 담는다. 승인 화면보다 민감하므로 **사람 인증 뒤에서만** 열고 공개 경로와 섞지 않는다. 응답은 `Cache-Control: no-store`를 유지해 달라.
- 한 사용자가 승인 경로와 검토 경로를 모두 쓸지(역할 분리)는 deploy와 헤드가 정한다. 화면은 403이면 권한 안내만 한다.

## 2. 검토자 식별 (제안: 승인자와 같은 방식)
- 확인: I7 검토 게시 본문에는 검토자 필드가 없다(`{review_status, expected?, expected_kind?, reviewed_input?}`). `FailureCase`에도 검토자·검토 시각 필드가 없다(`ext`뿐).
- 제안: 게이트웨이가 붙이는 `X-Openit-User`를 ops-feedback이 검토 기록에 쓰고(예: `FailureCase.ext["ops-feedback"].reviewed_by`), 화면은 입력창 없이 "게이트웨이가 인증한 사용자로 기록됨"만 안내한다. 지금 화면은 검토자 입력을 받지 않고 본문에 검토자를 보내지 않는다. 기록 위치는 ops-feedback과 헤드가 정할 것(MINOR 정식 필드 `reviewed_by` 추가를 권한다).

## 3. 같은 검토의 멱등 기준 (확인 필요)
HTTP.md는 "같은 검토를 다시 보내면 같은 결과(200)"라고만 쓴다. "같은 검토"가 `review_status`+`expected`+`expected_kind`+`reviewed_input`이 최신 버전과 같은 경우인지, 이전 버전과 같은 내용도 포함하는지 규정이 없다. 모의 서버는 최신 버전과 같을 때 200으로 했다. 화면은 200이면 "이미 기록된 같은 검토"로 알린다.

## 4. 문진 스키마 생성물 정책
- 화면은 `reviewed_input`·`expected`를 전송 전에 문진 스키마(`UtteranceParserInput`, `ResponseGeneratorInput`, `ParserOutput`, `GeneratorOutput`, `CONTRACT_VERSION=1`)로 검증한다. 브라우저 CSP(`script-src 'self'`)에서 런타임 컴파일이 안 되므로 `scripts/gen-schemas.mjs`가 `../survey-service/schema/schemas`를 읽어 Ajv standalone 검증 코드를 만들고, 그 **생성물 `generated/survey-validators.cjs`를 커밋**한다(이미지 빌드에 `../survey-service`가 없기 때문). 스키마 JSON 복사본은 두지 않는다. 시험이 원본과의 일치를 검사한다.
- 헤드가 정할 것: (a) 이 생성물 커밋을 허용할지, (b) 아니면 boundary-contracts나 survey-service가 브라우저용 검증기(또는 JSON Schema 번들)를 패키지로 배포할지, (c) 문진 스키마 `CONTRACT_VERSION`이 올라갈 때 이 영역에 알리는 방법.
- 서버는 `expected`가 비식별 trace의 입력과 맞는지도 검사한다(HTTP.md). 이 검사는 화면이 할 수 없어 400을 그대로 보인다.
