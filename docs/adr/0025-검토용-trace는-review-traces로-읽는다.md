# ADR 0025: 실패 사례 검토는 `review-traces`(발화 두 칸 원문)를 읽는다

- 상태: 채택(2026-11-03, 계약 v3.2.0 `OpsFeedbackReviewTrace`, 사용자 결정 L12). 이전의 `deidentified-traces` 호출을 대체한다.

## 맥락
마스킹된 trace만으로는 검토자가 실패 원인(환자가 무엇이라 말했나)을 볼 수 없다. 계약 3.2.0이 reviewer 역할 전용 `GET /v1/review-traces/{ref}`를 더했다. 발화 두 칸(`frontend_message.utterance`, `extract_input.user_utterance`)만 원문이고 나머지는 마스킹이다. 다른 역할은 403이다.

## 결정
- `link_failure_trace`가 `review-traces`를 부르고 응답을 계약 검증기 `OpsFeedbackReviewTrace`로 검사한다. 화면 표시는 이 원문 뷰로 한다. 편집창(`reviewed_input`) 채우기는 마스킹 뷰(`GET /v1/deidentified-traces/{ref}`, `link_failure_masked_trace`)로만 한다. 두 호출을 모두 한다(헤드 결정 2026-11-03).
- 발화 두 칸을 사례 화면 사실 목록에 "원문, 개인정보 주의"로 보인다.
- 403이면 trace 자리에 "검토 권한 필요" 안내를 보이고 사례 화면은 연 채로 둔다(검토 제출 권한 안내와 같은 방식).

## 왜
- 따른 것: 계약 HTTP.md I7(`get_review_trace`)과 스키마 설명. 접근 기록·보존 조건은 서버 몫이다.
- 편집창을 마스킹본으로 채우는 이유: `reviewed_input`은 `FailureCase`에 실려 읽기 역할 전체(model-lab, synthetic-data)가 읽는다. 원문 발화가 들어가면 reviewer 전용 경계 밖으로 새는 길이 된다.

## 검토한 대안과 버리는 이유
- review-traces 한 호출만으로 표시와 채우기를 모두: 위 이유로 버린다. 채우기가 원문을 가져가면 검토자 한 번의 실수로 원문이 영구 기록에 남는다.

## 결과
- 얻는 것: 검토자가 발화를 보고, 원문은 화면 표시에만 쓰이며 편집창과 전송 본문에는 들어가지 않는다. 시험 `tests/cases.test.ts`가 편집창 초기값에 원문이 없고 `[MASKED]`가 있음을 본다.
- 감수하는 것: 호출이 둘로 늘고 화면에 환자 발화 원문이 뜬다. 브라우저 저장소·콘솔에 남기지 않는 규칙(brief 4절)은 그대로다. 검토자가 화면의 원문을 손으로 편집창에 옮겨 적는 것은 막을 수 없다(경고 문구뿐).
- 게이트웨이 경로(reviewer 계정에게 `/v1/review-traces/*`를 여는 일)는 deploy 몫이다. `deploy-exposure.json`은 정적 화면 `/admin/*`만 선언하므로 바뀌지 않는다.

## 되돌리는 조건
계약이 검토용 뷰를 없애거나 발화 노출 정책이 바뀌면 새 ADR로 대체한다.
