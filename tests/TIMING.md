# 시험의 시간 사용 목록 (U422)

원칙: 시험 중 실제 시간을 기다리거나 재서 판정하는 곳이 0이다. 시간 제한은 (a) 타이머에 넘기는 값을 직접 확인하고 (b) 시험이 쥔 가짜 시계가 즉시 만료를 알릴 때 우리 처리를 확인한다. 실제 서버·정적 서버(Caddy) 동작은 `npm run smoke`의 몫이다. 이 영역에는 `time.*`류, 소켓 타이밍, docker pause, 신호 시험이 없었다(TypeScript).

처리 코드: 1 = 우리 코드의 시간(시계 주입, ADR 0023), 2 = 라이브러리 안의 시간, 3 = 속도 측정, 지움, 매달림 감시.

| 시험(파일) | 목적 한 줄 | 처리 | 바뀐 시험 |
| --- | --- | --- | --- |
| tests/audit.test.ts "시간 제한은 본문을 다 읽을 때까지 걸려 있다" | 헤더만 오고 본문이 멈추면 우리가 UNAVAILABLE(재시도 가능)로 처리하고 타이머를 지운다 | 1 (가짜 시계, 이미 있던 시험) | 넘긴 제한 값 `ms === 1` 단언 추가 |
| tests/audit.test.ts "시간 제한 기본값 15000ms가 타이머에 넘어간다" | 우리가 정한 기본 제한 값이 타이머에 그대로 간다 | 1 (값 확인, 시간을 재지 않는다) | 새 시험 |
| tests/flow.test.ts "중복 클릭", tests/ui.test.ts "승인 버튼 → 확인창" | 확정을 여러 번 눌러도 요청은 한 번, 전송 중 버튼 잠금 | 1 (사건 대기) | 모의 서버의 느린 응답이 `setTimeout` 지연이었다 -> 시험이 쥔 문(`slowGate.hold()`/`release()`)으로 요청을 처리 중으로 붙잡고, 서버 도착(`postCount`)을 조건 대기한 뒤 해제 |
| tests/helpers.ts `waitFor` | 모의 서버·DOM 사건을 기다린다 | 매달림 감시 | 바깥 마감 하나 `HANG_GUARD_SECONDS = 300`(상수 하나). 사이 양보는 타이머 없이 `setImmediate`. 옛 15초·5ms 폴링 제거 |
| tests/helpers.ts `Http` 기본 시계 | 모의 서버로 왕복할 때 시험이 실제 타이머를 쓰지 않는다 | 1 | 만료하지 않는 시계를 기본으로 주입 |
| tests/mock-server/* 의 `new Date()` | 모의 서버의 기본 시각 | 지움 | 기본값 제거(`now` 필수). 개발용 `tests/mock-server/main.ts`만 실제 시각을 넣는다 |

동작 코드 쪽: 컴포넌트가 시계를 직접 읽는 곳 0. `link_http_send`는 `Timers`를 필수로 주입받고, 실제 타이머는 `app/wiring/gateway.ts`가 넣는다. `time_display`의 `new Date(iso)`는 받은 문자열을 해석할 뿐 현재 시각을 읽지 않는다. 화면 컨트롤러의 `now`(`ops_controller`)는 wiring이 주입하는 시계다. 이유는 [ADR 0023](../docs/adr/0023-시계-주입.md).

지운 시험: 없음. smoke·E2E에서 봐야 할 것: Caddy 정적 서버의 연결·종료 동작은 기존대로 `npm run smoke`.
