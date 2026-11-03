# 경계 문서: admin-console

- 소유 저장소: 없음(상태를 저장하지 않는다). 브라우저 저장소도 쓰지 않는다.
- 제공 SDK: 없음(내부 `link_*` 통신 컴포넌트는 이 앱 전용, `docs/components.md`).
- 소비하는 계약: boundary-contracts(버전 정본은 Dockerfile의 ARG)의 I5 GateService 일부(`GET /v1/submissions`, `GET /v1/submissions/{id}/review-report`, `POST /v1/approvals`; 응답 헤더 `X-Openit-Report-Hash`, 게이트웨이가 붙이는 `X-Openit-User`는 서버가 사용), 스키마 `SubmissionView`, `ReviewReport`, `GateApproval`, `BoundaryError`. `pipeline_schema_version`은 계약 상수에서 온다(생성 검증기, 코드에 리터럴 없음). 읽기는 관대하게(모르는 필드·열거값 허용, 모르는 `status`/`group`은 그대로 또는 OTHER로 표시).
- 스키마 복사본은 없다. 시험이 `../boundary-contracts/schemas`를 읽어 모의 서버 출력을 검증한다.
- 장애 영향: 이 콘솔이 죽어도 문진 서비스와 게이트의 자동 검사는 영향이 없다. 출고 승인만 막힌다(게이트 API로 직접 승인은 가능). 게이트가 죽으면 목록·보고서·결정이 UNAVAILABLE로 안내되고, 결정 전송 중 연결이 끊기면 같은 결정을 다시 보내도 안전하다(서버 멱등).
- 변경 요청: `docs/change-requests/`의 CR-001~CR-006(처리 상태는 각 문서).

## 작업 단위 2: 실패 사례 검토 (I7, 소비)
- 소비하는 계약: I7 FailureStore의 `GET /v1/cases`, `GET /v1/cases/{id}`, `GET /v1/review-traces/{ref}`(reviewer 전용, 발화 두 칸만 원문), `POST /v1/cases/{id}/review`(쓰기 역할 `reviewer`). 스키마 `FailureCase`와 모델 입출력 `ActionExtractionInput`, `ActionExtraction`, `ResponseRequest`, `ResponseText`(검증 전용). `expected_kind`는 `LORA_A`/`LORA_B`이고 v1의 `PARSER`/`GENERATOR`는 없다. LORA_B의 `expected`는 문자열이다.
- 소유 저장소 없음. 입력 내용(reviewed_input, expected)은 메모리에만 두고 저장소·콘솔에 남기지 않는다.
- 장애 영향: ops-feedback이 죽으면 이 메뉴만 UNAVAILABLE 안내가 뜬다. 출고 승인 화면에는 영향이 없다.
- 변경 요청: CR-003.

## 작업 단위 5: 릴리스 운영 (I4·I5, 소비)
- 소비하는 계약: `GET /v1/active-pointer`, `GET /v1/releases`(스키마 `ActivePointer`, `ReleaseManifest`), `POST /v1/activate`(`ActivateRequest`), `POST /v1/rollback`(`RollbackRequest`, 응답 `RollbackReceipt`). 쓰기는 operator 역할만이고 행위자는 서버가 `X-Openit-User`로 기록한다. 본문에 이름은 보내지 않는다.
- 장애 영향: release-gate가 죽으면 이 메뉴가 UNAVAILABLE로 안내된다. 다른 화면은 영향이 없다.
- 변경 요청: CR-004, CR-005.
- 코드 위치: 통신 `app/components/link_release_*`, 연결 `app/wiring/ops_controller.ts`.

## 작업 단위 U83: 문진 결과 (의사용, 소비)
- 소비하는 계약(boundary-contracts v3.4.6 PUBLIC_API B): `GET /v1/results`, `GET /v1/results/{session_id}`, `POST /v1/results/{session_id}/ack`, 직원 SSE `GET /v1/staff/alerts/stream`의 `result_ready`. 문진 스키마 `SessionResult`(읽기용 투영 `ResultRecord`로 받는다, CR-007). 문진표는 여러 개이며 결과의 `question_set_title`·`question_set_id`, 릴리스 매니페스트·제출 subject의 `question_sets` 목록을 보인다(ADR 0027). 게이트웨이가 `clinician` 계정에만 연다. 403이면 "의사(clinician) 권한 필요"를 보인다.
- 소유 저장소 없음. 결과 내용은 메모리에만 두고 브라우저 저장소·콘솔 로그에 남기지 않는다. 결과에는 환자 발화 원문이 없다(계약).
- 장애 영향: 문진 서비스가 죽으면 이 탭만 안내가 뜬다. 실시간 연결이 끊겨도 목록은 새로고침으로 본다.
- 변경 요청: CR-007. 결정 근거: ADR 0026.

- 결과 탭 웹 푸시(boundary-contracts v3.4.6): `GET /v1/staff/push-config`(`PushConfig`), `POST /v1/staff/push-subscriptions`(본문 endpoint·keys·`topics:["results"]`), `POST /v1/staff/push-subscriptions/unsubscribe`, 푸시 본문 `StaffPushPayload`(`RESULT_READY`). 서비스 워커 `sw.js`가 받는다(ADR 0028). 정지 사유 `pause_reason`은 결과 상세에 있을 때 보인다(PUBLIC_API H).

- 사람 인증(헤드 ADR 0014, 이 영역 ADR 0029): 게이트웨이가 oauth2-proxy forward_auth로 인증한다. 이 영역이 쓰는 규약은 `/oauth2/start`, `/oauth2/sign_out`, `GET /oauth2/userinfo`, 401, 403 `details.reason=ACCOUNT_PENDING_APPROVAL`, Keycloak 관리 화면 링크(`/auth/admin/openit/console/#/openit/users`)다. `X-Openit-User`·`X-Openit-Roles`는 게이트웨이가 서버로 보내는 헤더라 화면은 읽지 않는다.

- 설정 환경 변수(boundary-contracts v3.4.6 `AdminConsoleEnv`): `ADMIN_HOST`(선택, 기본 `0.0.0.0`). `serve/Caddyfile`의 `bind {$ADMIN_HOST:0.0.0.0}`로 정적 서버의 바인드 주소를 정한다. TLS 사이드카 뒤에서는 `127.0.0.1`. 스모크가 `ADMIN_HOST=127.0.0.1`로 띄운 이미지가 컨테이너 안에서만 닿는지 확인한다.
