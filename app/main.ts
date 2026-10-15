import { GateClient } from "../api/client.ts";
import { Controller } from "./controller.ts";
import { render } from "./views.ts";

const root = document.getElementById("app")!;
// 개발 모드 승인자 ID는 서버가 환경 변수에서 읽어 /config.json으로 준다. 없거나 실패하면 없는 것으로 본다.
async function devApprover(): Promise<string | null> {
  try {
    const r = await fetch("/config.json", { cache: "no-store" });
    const j = (await r.json()) as { dev_approver_id?: string | null };
    return typeof j.dev_approver_id === "string" && j.dev_approver_id ? j.dev_approver_id : null;
  } catch {
    return null;
  }
}
const ctl = new Controller(new GateClient({ baseUrl: "" }), await devApprover());
let last = "";
ctl.subscribe(() => {
  // 입력창 포커스를 잃지 않게 상태 단계나 내용이 바뀔 때만 다시 그린다.
  const s = ctl.state;
  const sig = [s.phase, s.submissionId, s.items.length, s.notice?.text, s.sliceKind, s.sort, s.error, s.loaded?.reportHash].join("|");
  if (sig !== last) { last = sig; render(root, ctl); }
});

function route(): void {
  const m = /^#\/s\/(.+)$/.exec(location.hash);
  last = "";
  if (m) void ctl.openReport(decodeURIComponent(m[1]));
  else void ctl.openList();
}
window.addEventListener("hashchange", route);
route();
