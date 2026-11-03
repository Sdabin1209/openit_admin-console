// 연결: link_* 컴포넌트에 HTTP 보내기(link_http_send)를 주입해 화면이 쓰는 클라이언트 모양으로 묶는다. 업무 규칙은 없다.
import { createHttpSend, type HttpPorts, type Timers } from "../components/link_http_send.ts";
import { createListAwaiting } from "../components/link_gate_list_awaiting.ts";
import { createReviewReport, REPORT_HASH_HEADER } from "../components/link_gate_review_report.ts";
import { createDecide } from "../components/link_gate_decide.ts";
import { createActivePointer } from "../components/link_release_active_pointer.ts";
import { createReleaseList } from "../components/link_release_list.ts";
import { createActivate } from "../components/link_release_activate.ts";
import { createRollback } from "../components/link_release_rollback.ts";
import { createFailureList } from "../components/link_failure_list.ts";
import { createFailureGet } from "../components/link_failure_get.ts";
import { createFailureTrace } from "../components/link_failure_trace.ts";
import { createFailureReview } from "../components/link_failure_review.ts";
import type { ApprovalDecision } from "../types/ApprovalDecision.ts";
import type { ApprovalResult } from "../types/ApprovalResult.ts";
import type { LoadedReport } from "../types/LoadedReport.ts";
import type { SubmissionPage } from "../types/SubmissionPage.ts";
import type { ActivePointerState } from "../types/ActivePointerState.ts";
import type { PointerRecord } from "../types/PointerRecord.ts";
import type { ReleaseRow } from "../types/ReleaseRow.ts";
import type { RollbackDraft } from "../types/RollbackDraft.ts";
import type { RollbackOutcome } from "../types/RollbackOutcome.ts";
import type { CaseRecord } from "../types/CaseRecord.ts";
import type { CaseListQuery } from "../types/CaseListQuery.ts";
import type { CaseReviewDraft } from "../types/CaseReviewDraft.ts";
import type { CaseReviewResult } from "../types/CaseReviewResult.ts";
import type { OpsFeedbackReviewTrace } from "../types/contract/OpsFeedbackReviewTrace.ts";
import { unwrap } from "./api_error.ts";

export { REPORT_HASH_HEADER };
export { ApiError } from "./api_error.ts";

export interface HttpOptions extends Partial<HttpPorts> { baseUrl?: string; timeoutMs?: number }

// 실제 타이머는 연결부(wiring)가 넣는다. 컴포넌트는 시계를 직접 읽지 않는다(ADR 0023).
export const realTimers: Timers = { set: (fn, ms) => setTimeout(fn, ms), clear: (h) => clearTimeout(h as ReturnType<typeof setTimeout>) };

// 화면 요청 대기 상한(D125, boundary-contracts CONVENTIONS.md "시간 상한 사슬"): 화면 > gateway > 서버여야 안쪽이 끝나기 전에 화면이 포기해
// 같은 요청을 이중으로 처리하지 않는다. 값은 측정이 아니라 gateway 상한(release-gate 180초, ops-feedback 60초)에 10초를 더한 여유다.
// 승인·활성화·롤백·제출 조회(release-gate 경로)는 측정 최악 승인 128초(D120) 위의 190초. 실패 사례 검토(ops-feedback 경로)는 프록시 표준 60초 위의 70초.
// 이 콘솔은 저작(question-authoring) 경로를 부르지 않는다(130초 값은 쓰지 않는다). 본문을 다 읽을 때까지 적용한다. docs/adr/0024(ADR 0010의 15초를 대체).
export const RELEASE_GATE_TIMEOUT_MS = 190_000;
export const OPS_FEEDBACK_TIMEOUT_MS = 70_000;
const send = (o: HttpOptions, defaultMs: number) => createHttpSend({ baseUrl: o.baseUrl ?? "", timeoutMs: o.timeoutMs ?? defaultMs }, { fetch: o.fetch, timers: o.timers ?? realTimers });

export class GateClient {
  private readonly list; private readonly report; private readonly decideFn;
  constructor(opts: HttpOptions = {}) {
    const s = send(opts, RELEASE_GATE_TIMEOUT_MS);
    this.list = createListAwaiting(s); this.report = createReviewReport(s); this.decideFn = createDecide(s);
  }
  async listAwaiting(cursor?: string, limit = 100): Promise<SubmissionPage> {
    return unwrap(await this.list({ ...(cursor ? { cursor } : {}), limit }));
  }
  /** 보고서와 서버가 낸 해시(응답 헤더). 해시는 계산하지 않고 그대로 돌려보낸다. */
  async getReviewReport(id: string): Promise<LoadedReport> {
    return unwrap(await this.report({ submissionId: id }));
  }
  async decide(req: ApprovalDecision): Promise<ApprovalResult> {
    return unwrap(await this.decideFn(req));
  }
}

export class ReleasesClient {
  private readonly pointer; private readonly releases; private readonly act; private readonly rb;
  constructor(opts: HttpOptions = {}) {
    const s = send(opts, RELEASE_GATE_TIMEOUT_MS);
    this.pointer = createActivePointer(s); this.releases = createReleaseList(s); this.act = createActivate(s); this.rb = createRollback(s);
  }
  /** 활성 릴리스가 아직 없으면 null. */
  async activePointer(): Promise<PointerRecord | null> {
    return unwrap<ActivePointerState>(await this.pointer()).pointer;
  }
  /** 최신부터. */
  async listReleases(): Promise<ReleaseRow[]> {
    return unwrap(await this.releases()).releases;
  }
  async activate(releaseId: string): Promise<PointerRecord> {
    return unwrap(await this.act({ releaseId }));
  }
  async rollback(body: RollbackDraft): Promise<RollbackOutcome> {
    return unwrap(await this.rb(body));
  }
}

export class CasesClient {
  private readonly listFn; private readonly getFn; private readonly traceFn; private readonly reviewFn;
  constructor(opts: HttpOptions = {}) {
    const s = send(opts, OPS_FEEDBACK_TIMEOUT_MS);
    this.listFn = createFailureList(s); this.getFn = createFailureGet(s); this.traceFn = createFailureTrace(s); this.reviewFn = createFailureReview(s);
  }
  async list(f: CaseListQuery = {}): Promise<CaseRecord[]> {
    return unwrap(await this.listFn(f)).cases;
  }
  async get(id: string, version?: number): Promise<CaseRecord> {
    return unwrap(await this.getFn({ caseId: id, ...(version === undefined ? {} : { version }) }));
  }
  async getTrace(ref: string): Promise<OpsFeedbackReviewTrace> {
    return unwrap(await this.traceFn({ ref }));
  }
  /** 201이면 새 version, 200이면 이미 같은 검토가 있던 것. */
  async review(id: string, draft: CaseReviewDraft): Promise<CaseReviewResult> {
    return unwrap(await this.reviewFn({ caseId: id, draft }));
  }
}
