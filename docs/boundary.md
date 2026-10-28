# 경계 문서: admin-console

- 소유 저장소: 없음(상태를 저장하지 않는다). 브라우저 저장소도 쓰지 않는다.
- 제공 SDK: 없음(내부 `api/` 클라이언트는 이 앱 전용).
- 소비하는 계약: boundary-contracts(버전 정본은 Dockerfile의 ARG)의 I5 GateService 일부(`GET /v1/submissions`, `GET /v1/submissions/{id}`, `GET /v1/submissions/{id}/review-report`, `POST /v1/approvals`; 응답 헤더 `X-Openit-Report-Hash`, 게이트웨이가 붙이는 `X-Openit-User`는 서버가 사용), 스키마 `SubmissionView`, `ReviewReport`, `GateApproval`, `BoundaryError`. `pipeline_schema_version` 2.x(MAJOR 2). 읽기는 관대하게(모르는 필드·열거값 허용, 모르는 `status`/`group`은 그대로 또는 OTHER로 표시).
- 스키마 복사본은 없다. 시험이 `../boundary-contracts/schemas`를 읽어 모의 서버 출력을 검증한다.
- 장애 영향: 이 콘솔이 죽어도 문진 서비스와 게이트의 자동 검사는 영향이 없다. 출고 승인만 막힌다(게이트 API로 직접 승인은 가능). 게이트가 죽으면 목록·보고서·결정이 UNAVAILABLE로 안내되고, 결정 전송 중 연결이 끊기면 같은 결정을 다시 보내도 안전하다(서버 멱등).
- 변경 요청: `docs/change-requests/`의 CR-001(해결), CR-002.

## 작업 단위 2: 실패 사례 검토 (I7, 소비)
- 소비하는 계약: I7 FailureStore의 `GET /v1/cases`, `GET /v1/cases/{id}`, `GET /v1/deidentified-traces/{ref}`, `POST /v1/cases/{id}/review`(쓰기 역할 `reviewer`). 스키마 `FailureCase`와 모델 입출력 `ActionExtractionInput`, `ActionExtraction`, `ResponseRequest`, `ResponseText`(검증 전용). `expected_kind`는 `LORA_A`/`LORA_B`이고 v1의 `PARSER`/`GENERATOR`는 없다. LORA_B의 `expected`는 문자열이다.
- 소유 저장소 없음. 입력 내용(reviewed_input, expected)은 메모리에만 두고 저장소·콘솔에 남기지 않는다.
- 장애 영향: ops-feedback이 죽으면 이 메뉴만 UNAVAILABLE 안내가 뜬다. 출고 승인 화면에는 영향이 없다.
- 변경 요청: CR-003.
