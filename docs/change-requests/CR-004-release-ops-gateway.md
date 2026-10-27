# CR-004: 릴리스 활성화·롤백 화면(D85)에 필요한 게이트웨이 경로와 계약 확인

- 요청 영역: admin-console, 대상: 헤드와 deploy(경로), 헤드(계약). 상태: 제안. release-gate 리포지토리는 읽지 않았다(계약 문서와 `../deploy/config/Caddyfile`만 읽음).

## 1. 게이트웨이 경로 (현재 Caddyfile은 아무것도 열지 않는다)
`../deploy/config/Caddyfile`은 `/v1/activate`, `/v1/rollback`, `/v1/releases*`를 "열지 않는 것"으로 두고 `handle /v1/*`이 404로 막는다. `/v1/active-pointer`도 없다. 이 화면이 같은 출처에서 부르는 경로는 다음 넷이다. 사람 인증 뒤에서 **operator 역할 계정만** 통과시키고, 아니면 403, `X-Openit-User`는 인증된 계정으로 덮어쓰고, 응답은 `Cache-Control: no-store`를 유지해 달라.

| 경로 | release-gate 토큰 |
| --- | --- |
| `GET /v1/active-pointer` | operator 읽기 |
| `GET /v1/releases` (쿼리 `limit`, `cursor`) | operator 읽기 |
| `POST /v1/activate` | operator 쓰기 |
| `POST /v1/rollback` | operator 쓰기 |

- `role_matchers`에 operator 역할(`@role_operator`)이 있어야 한다. 현재 확인되는 것은 `release-approver`와 `reviewer`뿐이다(조각 파일은 비밀 저장소라 읽지 않았다).
- 선택: 화면에 "PASS" 결과를 직접 보이려면 `GET /v1/decisions/{id}`(읽기)도 필요하다. 지금 화면은 PASS 여부를 판단하지 않고 서버의 412에 맡긴다.
- 열지 않을 것: `GET /v1/releases/{id}/bundle`, `PUT /v1/releases/*`(I9), 그 밖의 `/v1/*`.

## 2. 계약에서 확인할 것
1. **활성화한 사람과 포인터 이력이 없다.** `ActivePointer`에는 행위자 필드가 없고(`ext`뿐), I4에 포인터 변경 이력 조회가 없다. 화면은 현재 포인터(릴리스 ID, 활성화 시각, 포인터 버전, 원인)와 `GET /v1/releases` 목록만 보인다. D85가 '활성화한 사람'과 이력을 요구하면 `ActivePointer`에 `activated_by`(MINOR 정식 필드) 또는 `GET /v1/active-pointer/history`를 추가해 달라.
2. **`requested_by_role` 필수 여부.** `RollbackRequest.schema.json`은 `requested_by_role`을 필수로 두고 `HTTP.md`는 activate 본문에 `{release_id, requested_by_role}`를 쓴다. 한편 `PUBLIC_API.md` E절은 서버가 본문 값을 믿지 않고 헤더로 정한다고 한다. 이 화면은 자기 신고 값을 보내지 않기로 했으므로 본문에서 뺐다. release-gate가 이 필드가 없는 본문을 받는지 확인하지 못했다. 거절하면 400이 나므로, 스키마에서 선택으로 바꾸거나(권장) 필드를 서버가 무시한다고 명시해 달라. 시험(`tests/ops-conformance.test.ts`)은 본문이 스키마와 이 필드 하나만 다름을 고정해 둔다.
3. **롤백 대상 의미.** "이전 릴리스"를 계약이 정의하지 않는다. 화면은 `GET /v1/releases`(최신부터)에서 현재 활성 바로 다음의 더 오래된 릴리스를 기본값으로 두고 운영자가 더 오래된 것 중에서 고를 수 있게 했다. 직전에 활성이던 릴리스와 다를 수 있다.
4. **롤백 요청 필드.** `evidence_refs`는 최소 1개라 화면이 근거 ID 입력을 필수로 받는다. `request_id`는 화면이 만들고, 같은 확인 단계의 재전송은 같은 값이다(멱등 가정, 서버 규칙은 확인하지 못함).
5. **오류 모양.** 403/409/412의 `BoundaryError.details.reason`(예: 포인터가 그사이 바뀜) 값을 계약이 정하지 않았다. 화면은 상태 코드로만 구분한다. 게이트웨이의 403은 JSON이 아닌 문장일 수 있고 화면은 그것도 처리한다.
6. **목록에 PASS 아닌 릴리스가 있는지.** `GET /v1/releases`가 PASS 릴리스만 주는지 확인하지 못했다(`load_bundle`이 PASS가 아니면 412라고 한 것을 보면 아닐 수 있다). 화면은 목록의 모든 릴리스에 활성화 버튼을 주고 서버의 412를 안내한다.
