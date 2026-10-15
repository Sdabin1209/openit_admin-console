# CR-002: 게이트웨이가 열어 줄 경로와 역할

- 요청 영역: admin-console, 대상: 헤드와 deploy. 상태: 제안(확인하지 못한 가정 포함).
- 이 영역은 같은 출처의 `/v1`만 부른다. 토큰은 코드·빌드·브라우저에 없고 게이트웨이가 붙인다(브리프 4절). 이 영역의 이미지는 정적 파일과 `/healthz`, `/readyz`만 서빙하고 `/v1`을 프록시하지 않는다.
- 요청한 경로(release-gate로 전달, `release-approver` 쓰기 토큰을 게이트웨이가 붙임):
  - `GET /v1/submissions`(쿼리 `status`, `limit`, `cursor`)
  - `GET /v1/submissions/{id}`
  - `GET /v1/submissions/{id}/review-report`
  - `POST /v1/approvals`
- 열지 않을 것: `/v1/submissions` POST(접수), `/v1/activate`, `/v1/rollback`, `/v1/releases*` (후속 화면이 필요하면 따로 요청).
- 읽기만 하는 사용자가 필요하면 읽기 토큰 경로를 분리할지 정해야 한다(현재는 승인자 한 역할 가정).
- 미정: 사람 인증(기본 인증 가정)과 HTTPS, 같은 출처 구성(정적 이미지와 게이트웨이가 한 호스트 뒤), 응답 `Cache-Control: no-store`를 게이트웨이가 유지하는지.
- 확인하지 못한 것: 실제 release-gate의 `GET /v1/submissions` 쿼리와 페이지 동작, `review-report` 409 본문.
