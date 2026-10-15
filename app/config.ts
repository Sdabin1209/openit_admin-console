// 개발 모드 설정. 상대 경로로 읽어 /admin/ 같은 접두 아래에서도 같은 출처의 config.json을 찾는다(D70).
export const CONFIG_URL = "config.json";

export async function loadDevApprover(fetchFn: typeof fetch = (...a) => fetch(...a)): Promise<string | null> {
  try {
    const r = await fetchFn(CONFIG_URL, { cache: "no-store" });
    const j = (await r.json()) as { dev_approver_id?: string | null };
    return typeof j.dev_approver_id === "string" && j.dev_approver_id ? j.dev_approver_id : null;
  } catch {
    return null;
  }
}
