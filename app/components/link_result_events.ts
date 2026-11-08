// 통신 컴포넌트 link_result_events: 직원·의사 콘솔 SSE `GET /v1/staff/alerts/stream`의 `result_ready`·`heartbeat`·`resync` 이벤트를 구독한다(계약 PUBLIC_API 직원 콘솔, B절).
// 입력은 스키마 하나가 아니라 구독 핸들러다(SSE는 요청-응답이 아니다). 이벤트 본문의 정본은 계약 `ResultReadyEvent`·`HeartbeatEvent`·`ResyncEvent`(x-consumers에 이 영역)이고, 받는 쪽은 다시 검증하지 않는다(ADR 0010 R7, 이 영역 ADR 0030): JSON으로 읽지 못하는 줄만 버린다.
// 왜 EventSource를 주입: 시험(Node)에는 없고, HTTP를 여는 곳은 link_* 안에만 둔다(구조 규칙). 브라우저 EventSource는 끊기면 Last-Event-ID로 스스로 다시 잇지만, 200이 아닌 응답이면 닫히고 다시 잇지 않는다(WHATWG) -> 아래 재연결 규칙.
import type { ResultReadyEvent } from "../types/contract/ResultReadyEvent.ts";
import type { HeartbeatEvent } from "../types/contract/HeartbeatEvent.ts";

export interface EventSourceLike {
  addEventListener(type: string, fn: (e: { data?: string }) => void): void;
  onopen: (() => void) | null;
  onerror: (() => void) | null;
  readyState: number;
  close(): void;
}
export type EventSourceFactory = (url: string) => EventSourceLike;
/** 닫힌 연결의 사유를 알아내는 탐침: 같은 경로를 한 번 요청해 상태와 Retry-After(초)만 돌려준다. 브라우저 EventSource는 상태 코드를 알려 주지 않는다. */
export type StreamProbe = () => Promise<{ status: number; retryAfterS: number | null }>;
export interface ReconnectPorts { probe: StreamProbe; setTimer: (fn: () => void, ms: number) => unknown; clearTimer: (h: unknown) => void; onUnauthenticated: () => void }
// 왜 이 값: 지수 백오프 시작 1초, 두 배씩, 상한 30초. 계약 PUBLIC_API는 "지수 백오프"만 정하고 값은 없다. 측정하지 않았다(시작값). Retry-After가 있으면 그 값이 우선이다(PUBLIC_API 429·503).
export const BACKOFF_START_MS = 1000;
export const BACKOFF_MAX_MS = 30_000;
export const CLOSED = 2; // EventSource.CLOSED
export interface ResultEventHandlers {
  onReady: (e: ResultReadyEvent) => void;
  /** 연결 상태: 열림(true) / 끊김 또는 거절(false). 끊김 뒤 다시 열리면 true가 다시 온다 -> 화면이 목록을 다시 맞춘다. */
  onLive: (live: boolean) => void;
  /** 서버가 이어 받을 수 없다고 알린 경우(resync). 인자는 마지막으로 받은 heartbeat의 ts(없으면 null): 화면이 `GET /v1/results?updated_after=<ts>`로 다시 맞춘다(PUBLIC_API B절). */
  onResync: (lastHeartbeatTs: string | null) => void;
}

export const RESULT_STREAM_PATH = "/v1/staff/alerts/stream";
/** 닫힌 연결의 사유를 알아내는 탐침 경로. 구독이 아니라 목록 읽기라서 `staff_alert` 전달 판정에 세지 않고 연결 상한도 쓰지 않는다(PUBLIC_API 직원 콘솔 표 SSE 행). */
export const STREAM_PROBE_PATH = "/v1/staff/alerts?status=OPEN&limit=1";

/** 구독을 시작하고 멈추는 함수를 돌려준다. */
export function createResultEvents(open: EventSourceFactory, rc?: ReconnectPorts): (h: ResultEventHandlers) => () => void {
  return (h) => {
    let stopped = false; let delay = BACKOFF_START_MS; let timer: unknown = null;
    let lastHeartbeatTs: string | null = null; // resync 때 `updated_after`로 보낼 값(PUBLIC_API B절)
    let es = connect();
    // 계약 PUBLIC_API(SSE): 200이 아니면 EventSource는 닫히고 스스로 다시 잇지 않는다 -> CLOSED면 사유를 탐침으로 보고 새로 연결한다. 401은 로그인으로(재연결 안 함), 429·503은 Retry-After를 따른다.
    function onClosed(): void {
      if (stopped || !rc) return;
      es.close();
      void rc.probe().then((p) => {
        if (stopped) return;
        if (p.status === 401) { rc.onUnauthenticated(); return; }
        let wait = delay;
        if ((p.status === 429 || p.status === 503) && p.retryAfterS !== null) wait = Math.max(0, p.retryAfterS) * 1000;
        else if (p.status === 503 || p.status === 429) wait = BACKOFF_START_MS; // PUBLIC_API: 503은 Retry-After가 없으면 1초
        else delay = Math.min(delay * 2, BACKOFF_MAX_MS);
        timer = rc.setTimer(() => { if (!stopped) es = connect(); }, wait);
      }, () => { delay = Math.min(delay * 2, BACKOFF_MAX_MS); timer = rc.setTimer(() => { if (!stopped) es = connect(); }, delay); });
    }
    function connect(): EventSourceLike {
      const e = open(RESULT_STREAM_PATH);
      wire(e);
      return e;
    }
    function wire(es: EventSourceLike): void {
    es.addEventListener("result_ready", (e) => {
      let data: unknown;
      try { data = JSON.parse(e.data ?? ""); } catch { return; }
      // 왜 검증 없이 캐스트: 게이트웨이가 낸 값은 받는 쪽이 다시 검증하지 않는다(ADR 0010 R7, 이 영역 ADR 0030). 본문이 계약 ResultReadyEvent 를 따르는지는 보내는 쪽 책임이고, 계약 예시로 처리되는지는 tests/results.test.ts 가 본다.
      if (data && typeof data === "object") h.onReady(data as ResultReadyEvent);
    });
    es.addEventListener("heartbeat", (e) => {
      try { const d = JSON.parse(e.data ?? "") as Partial<HeartbeatEvent>; if (typeof d.ts === "string") lastHeartbeatTs = d.ts; } catch { /* 깨진 줄은 버린다 */ }
    });
    es.addEventListener("resync", () => h.onResync(lastHeartbeatTs));
    es.onopen = () => { delay = BACKOFF_START_MS; h.onLive(true); };
    es.onerror = () => { h.onLive(false); if (es.readyState === CLOSED) onClosed(); };
    }
    return () => { stopped = true; if (timer !== null) rc?.clearTimer(timer); es.close(); };
  };
}
