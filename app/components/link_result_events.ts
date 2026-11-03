// 통신 컴포넌트 link_result_events: 직원·의사 콘솔 SSE `GET /v1/staff/alerts/stream`의 `result_ready` 이벤트를 구독한다(계약 PUBLIC_API B).
// 입력은 스키마 하나가 아니라 구독 핸들러다(SSE는 요청-응답이 아니다). 이벤트 본문은 ResultReady 스키마로 검사하고, 맞지 않으면 버린다(모르는 이벤트·깨진 본문은 무시: 계약 "모르는 클라이언트는 무시한다").
// 왜 EventSource를 주입: 시험(Node)에는 없고, HTTP를 여는 곳은 link_* 안에만 둔다(구조 규칙). 브라우저 EventSource는 끊기면 Last-Event-ID로 스스로 다시 잇는다.
import * as v from "../types/validators.cjs";
import type { ResultReady } from "../types/ResultReady.ts";

export interface EventSourceLike {
  addEventListener(type: string, fn: (e: { data?: string }) => void): void;
  onopen: (() => void) | null;
  onerror: (() => void) | null;
  readyState: number;
  close(): void;
}
export type EventSourceFactory = (url: string) => EventSourceLike;
export interface ResultEventHandlers {
  onReady: (e: ResultReady) => void;
  /** 연결 상태: 열림(true) / 끊김 또는 거절(false). 끊김 뒤 다시 열리면 true가 다시 온다 -> 화면이 목록을 다시 맞춘다. */
  onLive: (live: boolean) => void;
  /** 서버가 이어 받을 수 없다고 알린 경우(resync). 화면이 목록을 다시 읽는다. */
  onResync: () => void;
}

export const RESULT_STREAM_PATH = "/v1/staff/alerts/stream";

/** 구독을 시작하고 멈추는 함수를 돌려준다. */
export function createResultEvents(open: EventSourceFactory): (h: ResultEventHandlers) => () => void {
  return (h) => {
    const es = open(RESULT_STREAM_PATH);
    es.addEventListener("result_ready", (e) => {
      let data: unknown;
      try { data = JSON.parse(e.data ?? ""); } catch { return; }
      if (v.ResultReady(data)) h.onReady(data as ResultReady);
    });
    es.addEventListener("resync", () => h.onResync());
    es.onopen = () => h.onLive(true);
    es.onerror = () => h.onLive(false);
    return () => es.close();
  };
}
