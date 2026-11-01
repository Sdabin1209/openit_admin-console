// 요청이 오래 걸릴 때 화면에 보일 단계(0 없음, 1 진행 표시, 2 안내). DOM 없음. 시계는 주입받는다(ADR 0023).
import type { Timers } from "../components/link_http_send.ts";

// 왜 1초·10초: 화면 응답 지침(Nielsen, Response Times): 1초를 넘으면 진행 표시, 10초를 넘으면 안내 문구.
// 요청 대기 상한을 190초/70초로 늘린 조건이다(ADR 0024, D125).
export const PROGRESS_AFTER_MS = 1_000;
export const NOTICE_AFTER_MS = 10_000;
export const PROGRESS_TEXT = "처리 중…";
export const NOTICE_TEXT = "서버가 처리하고 있습니다. 잠시만 기다려 주세요";
export type SlowStage = 0 | 1 | 2;

export class SlowNotice {
  stage: SlowStage = 0;
  private handles: unknown[] = [];
  private lastPhase: string | null = null;
  /** timers가 없으면 표시를 만들지 않는다(시험·미주입). 실제 타이머는 main.ts가 넣는다. */
  private readonly timers: Timers | undefined;
  private readonly onChange: () => void;
  constructor(timers: Timers | undefined, onChange: () => void) { this.timers = timers; this.onChange = onChange; }

  /** 컨트롤러가 상태를 바꿀 때마다 부른다. 대기 단계(busy)에 들어오거나 다른 대기 단계로 바뀌면 처음부터 센다. */
  track(phase: string, busy: boolean): void {
    if (!busy) { this.lastPhase = null; this.stop(); return; }
    if (phase === this.lastPhase) return;
    this.lastPhase = phase;
    this.stop();
    const t = this.timers;
    if (!t) return;
    this.handles = [t.set(() => this.go(1), PROGRESS_AFTER_MS), t.set(() => this.go(2), NOTICE_AFTER_MS)];
  }
  private go(s: SlowStage): void { this.stage = s; this.onChange(); }
  private stop(): void {
    const t = this.timers;
    if (t) for (const h of this.handles) t.clear(h);
    this.handles = [];
    this.stage = 0;
  }
}

export const slowText = (s: SlowStage): string | null => (s === 2 ? NOTICE_TEXT : s === 1 ? PROGRESS_TEXT : null);
