# CR-007: 계약 PUBLIC_API B 문구와 문진 스키마 SessionResult가 어긋난다 (헤드에게)

보낸 곳: admin-console. 대상: 문진 스키마(survey-service/schema)와 boundary-contracts PUBLIC_API B. 상태: 제안(미결).

## 부족한 것
1. PUBLIC_API B(v3.2.0)는 `SessionResult`를 `"skipped": [str]`로 적지만, 문진 스키마 `SessionResult.json`은 `skipped_details: [{item, slot?, reason}]`만 갖는다(2.0.0에서 `skipped` 폐지). 이 영역은 `skipped_details`를 읽는다. B절 문장을 고치면 좋다.
2. PUBLIC_API B는 확인 표시로 `acknowledged_by`, `acknowledged_at`이 채워진다고 하지만, 문진 스키마 `SessionResult.json`(작업 트리)에는 두 필드가 없고 `additionalProperties: false`다. 스키마가 반영되기 전에는 확인된 결과가 스키마를 통과하지 못한다.
3. 문진 스키마는 태그로 고정되지 않아(이 영역의 Dockerfile `SURVEY_SCHEMA=n/a`) 영역이 버전을 박을 수 없다.

## 이 영역이 한 것
- 읽기용 투영 스키마 `ResultRecord`로 응답을 검사한다(두 필드는 선택, 모르는 필드 허용). 시험이 모의 출력을 문진 스키마 SessionResult로 검사한다(확인 표시 필드 없는 상태).
- 변경이 반영되면 투영을 생성 검증기로 바꿀 수 있다(ADR 0026).
