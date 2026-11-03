# ADR 0025: 실패 사례 검토는 `review-traces`(발화 두 칸 원문)를 읽는다

- 상태: 채택(2026-11-03, 계약 v3.2.0 `OpsFeedbackReviewTrace`, 사용자 결정 L12). 이전의 `deidentified-traces` 호출을 대체한다.

## 맥락
마스킹된 trace만으로는 검토자가 실패 원인(환자가 무엇이라 말했나)을 볼 수 없다. 계약 3.2.0이 reviewer 역할 전용 `GET /v1/review-traces/{ref}`를 더했다. 발화 두 칸(`frontend_message.utterance`, `extract_input.user_utterance`)만 원문이고 나머지는 마스킹이다. 다른 역할은 403이다.

## 결정
- `link_failure_trace`가 `review-traces`를 부르고 응답을 계약 검증기 `OpsFeedbackReviewTrace`로 검사한다. 이 콘솔은 마스킹 뷰(`deidentified-traces`)를 더 이상 부르지 않는다.
- 발화 두 칸을 사례 화면 사실 목록에 "원문, 개인정보 주의"로 보인다.
- 403이면 trace 자리에 "검토 권한 필요" 안내를 보이고 사례 화면은 연 채로 둔다(검토 제출 권한 안내와 같은 방식).

## 왜
- 따른 것: 계약 HTTP.md I7(`get_review_trace`)과 스키마 설명. 접근 기록·보존 조건은 서버 몫이다.
- 한 호출로 합쳤다: 마스킹 뷰를 따로 한 번 더 부르면 검토자가 볼 수 있는 것은 같거나 적은데 요청만 는다.

## 검토한 대안과 버리는 이유
- 두 뷰를 모두 부르고 권한이 없으면 마스킹 뷰로 대체: 두 경로의 계약 모양이 같아 얻는 것이 적고, 권한 없는 계정이 이 화면을 쓸 이유가 없다고 판단했다(사용자 조사 없음).

## 결과
- 얻는 것: 검토자가 발화를 본다. 감수하는 것: 화면에 환자 발화 원문이 뜬다. 브라우저 저장소·콘솔에 남기지 않는 규칙(brief 4절)은 그대로이고, 편집창 채우기(`prefillFromTrace`)가 `extract_input`을 통째로 넣으므로 원문 발화가 편집창에 들어간다. 검토자가 지우고 고쳐 써야 한다는 경고 문구가 있으나, 서버 쪽이 원문 제출을 거르는지는 확인하지 못했다.
- 게이트웨이 경로(reviewer 계정에게 `/v1/review-traces/*`를 여는 일)는 deploy 몫이다. `deploy-exposure.json`은 정적 화면 `/admin/*`만 선언하므로 바뀌지 않는다.

## 되돌리는 조건
계약이 검토용 뷰를 없애거나 발화 노출 정책이 바뀌면 새 ADR로 대체한다.
