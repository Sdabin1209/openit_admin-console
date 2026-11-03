// 서비스 워커 진입점(웹 푸시 수신, 계약 3.4.0 U92). 업무 규칙은 wiring/sw_handlers.ts에 있다.
import { installPushHandlers, type SwScope } from "./wiring/sw_handlers.ts";

installPushHandlers(self as unknown as SwScope);
