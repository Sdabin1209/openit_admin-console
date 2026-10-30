// 컴포넌트 time_display: TimeInput -> TimeText. 서버가 준 UTC 원문을 그대로 두고 괄호 안에 현지 시각을 덧붙인다. 해석할 수 없으면 원문만 보인다.
import * as v from "../types/validators.cjs";
import type { TimeInput } from "../types/TimeInput.ts";
import type { TimeText } from "../types/TimeText.ts";

export function timeDisplay(input: TimeInput): TimeText {
  v.assertValid(v.TimeInput, input, "time_display");
  const iso = input.iso;
  if (!iso) return { text: "—" };
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return { text: iso };
  try {
    const local = new Intl.DateTimeFormat("sv-SE", { timeZone: input.timeZone, year: "numeric", month: "2-digit", day: "2-digit", hour: "2-digit", minute: "2-digit", hourCycle: "h23", timeZoneName: "short" }).format(d);
    return { text: `${iso} (현지 ${local})` };
  } catch {
    return { text: iso };
  }
}
