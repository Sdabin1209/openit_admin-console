// valid 예시를 사람이 쓰지 않고 실제 코드가 내게 하는 스크립트(wo6). 사용(리포 루트에서, npm ci 뒤):
//   node docs/change-requests/contract-ready/tools/capture-examples.ts
// 요청 본문은 api/·app/의 실제 클라이언트와 컨트롤러가 fetch로 보낸 것을 가로채 저장한다.
// 목록 응답은 모의 서버(mock-server/)가 낸 것이다: 실제 release-gate·ops-feedback 서버의 출력이 아니다(MANIFEST note).
import { writeFileSync } from "node:fs";
import type { AddressInfo } from "node:net";
import { GateClient } from "../../../../api/client.ts";
import { CasesClient } from "../../../../api/cases.ts";
import { ReleasesClient } from "../../../../api/releases.ts";
import { Controller } from "../../../../app/controller.ts";
import { CasesController } from "../../../../app/cases-controller.ts";
import { createMock } from "../../../../mock-server/server.ts";
import { VALID_LORA_A_INPUT, VALID_LORA_B_INPUT } from "../../../../mock-server/cases.ts";

const dir = new URL("../examples/valid/", import.meta.url);
const save = (name: string, v: unknown) => { writeFileSync(new URL(`${name}.json`, dir), JSON.stringify(v, null, 2) + "\n"); console.log("wrote", name); };

const mock = createMock({ now: () => "2026-10-20T00:00:00Z", gatewayUser: "capture-user" });
await new Promise<void>((r) => mock.server.listen(0, "127.0.0.1", r));
const base = `http://127.0.0.1:${(mock.server.address() as AddressInfo).port}`;
let lastBody: unknown;
const rec = (async (u: string, init?: RequestInit) => { if (init?.method === "POST") lastBody = JSON.parse(String(init.body)); return fetch(u, init); }) as typeof fetch;

try {
  // ApprovalRequest: 승인과 반려
  for (const [name, id, decision] of [["ApprovalRequest", "sub-await", "APPROVE"], ["ApprovalRequest.reject", "sub-await", "REJECT"]] as const) {
    const c = new Controller(new GateClient({ baseUrl: base, fetch: rec }));
    await c.openReport(id);
    if (decision === "REJECT") c.setDraft({ reason: "SAFETY 지표가 활성 릴리스보다 나빠졌다" });
    c.requestDecision(decision);
    c.setConfirmText(c.state.submissionId!);
    await c.confirm();
    save(name, lastBody);
    mock.reset();
  }
  // ActivateRequest
  await new ReleasesClient({ baseUrl: base, fetch: rec }).activate("rel-0004");
  save("ActivateRequest", lastBody);
  mock.reset();
  // CaseReviewRequest: 컨트롤러의 buildRequest가 만든 본문
  const cc = () => new CasesController(new CasesClient({ baseUrl: base, fetch: rec }));
  let c = cc(); await c.openCase("fc-1");
  c.setForm({ inputText: JSON.stringify({ ...VALID_LORA_A_INPUT, current_question: "두통이 있으신가요?", user_utterance: "가상 환자가 두통이 사흘 되었다고 말한다" }), expectedText: JSON.stringify({ action: "NEXT", next_item: "END", values: [] }) });
  save("CaseReviewRequest.confirmed-lora-a", c.buildRequest());
  c = cc(); await c.openCase("fc-2");
  c.setForm({ inputText: JSON.stringify({ ...VALID_LORA_B_INPUT, topic: "가상 주제" }), expectedText: "네, 알겠습니다. 약을 드시고 계신가요?" });
  save("CaseReviewRequest.confirmed-lora-b", c.buildRequest());
  for (const st of ["DISMISSED", "PENDING"] as const) { c = cc(); await c.openCase("fc-1"); c.setFormAndRender({ status: st }); save(`CaseReviewRequest.${st.toLowerCase()}`, c.buildRequest()); }
  // ListEnvelope: 쪽 크기 2로 첫 쪽(next_cursor 있음)과 끝 쪽(null)
  const get = async (p: string) => (await fetch(`${base}${p}`)).json();
  const first = await get("/v1/releases?limit=2");
  save("ListEnvelope.releases-first-page", first);
  save("ListEnvelope.releases-last-page", await get(`/v1/releases?limit=2&cursor=${first.next_cursor}`));
  save("ListEnvelope.submissions", await get("/v1/submissions?status=AWAITING_APPROVAL&limit=100"));
  save("ListEnvelope.cases", await get("/v1/cases?review_status=PENDING&latest_only=true&limit=100"));
} finally { mock.server.close(); mock.server.closeAllConnections(); }
