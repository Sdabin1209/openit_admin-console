# CR-005: 활성화 요청에 포인터 버전 검사와 요청 ID (제안)

- 요청 영역: admin-console, 대상: 헤드(계약), release-gate. 상태: 제안. 전수 점검 지적 M3에 대한 것이다. 이 영역은 계약을 고치지 않는다.

## 문제
`POST /v1/activate` 본문은 `{release_id, requested_by_role}`뿐이다(HTTP.md I5). 화면은 운영자가 본 활성 포인터(예: 버전 3)를 기준으로 활성화를 확인받지만, 서버는 그 사이 다른 운영자가 포인터를 바꿨는지 알 방법이 없다. 서버가 409를 내는 조건은 '이미 활성'뿐이라, 다른 운영자가 방금 다른 릴리스를 활성화했어도 이쪽 요청이 조용히 덮어쓴다(롤백은 `from_release_id`가 있어 막힌다). 또 요청 ID가 없어 재전송이 멱등인지 알 수 없다(롤백에는 `request_id`가 있다).

## 제안(선택은 헤드)
1. `activate` 본문에 선택 필드 `expected_pointer_version`(정수)을 더한다. 있으면 현재 `pointer_version`과 다를 때 409(`details.reason: POINTER_CHANGED`).
2. `activate` 본문에 선택 필드 `request_id`(Id)를 더하고, 같은 `request_id`의 재전송은 같은 `ActivePointer`를 돌려준다(200).
3. 둘 다 선택이면 기존 클라이언트는 그대로 동작한다(MINOR).

## 이 영역이 하는 일
계약이 바뀌면 화면은 본 포인터 버전을 `expected_pointer_version`으로, 확인 단계의 요청 ID를 `request_id`로 보낸다(`app/ops-controller.ts`는 이미 확인 단계마다 요청 ID를 만든다). 그때까지는 새로고침 후 확인하는 절차에 의존한다(runbook).
