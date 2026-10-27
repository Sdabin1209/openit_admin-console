// 시각 표시: 서버가 준 UTC 원문을 그대로 두고 괄호 안에 현지 시각을 덧붙인다. 해석할 수 없으면 원문만 보인다.
export function fmtTime(iso: string | undefined | null, timeZone?: string): string {
  if (!iso) return "—";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  try {
    const local = new Intl.DateTimeFormat("sv-SE", { timeZone, year: "numeric", month: "2-digit", day: "2-digit", hour: "2-digit", minute: "2-digit", hourCycle: "h23", timeZoneName: "short" }).format(d);
    return `${iso} (현지 ${local})`;
  } catch {
    return iso;
  }
}
