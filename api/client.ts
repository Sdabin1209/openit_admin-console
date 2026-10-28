// 게이트(I5) HTTP 클라이언트.
import { ApiError, Http, need, type HttpOptions } from "./http.ts";
import { assertRequest, readEnvelope } from "./contract.ts";
import type { DecideRequest, GateApproval, LoadedReport, ReviewReport, SubmissionView } from "./types.ts";

export { ApiError };
export type { ErrorKind } from "./http.ts";

export const REPORT_HASH_HEADER = "X-Openit-Report-Hash";

export function checkSubmission(x: unknown): SubmissionView {
  const s = x as SubmissionView;
  need(!!s && typeof s.submission_id === "string" && typeof s.status === "string" && typeof s.subject === "object", "SubmissionView");
  return s;
}

export function checkReport(x: unknown): ReviewReport {
  const r = x as ReviewReport;
  need(!!r && typeof r.submission_id === "string" && Array.isArray(r.checks) && Array.isArray(r.comparisons) && typeof r.subject === "object", "ReviewReport");
  return r;
}

export type GateClientOptions = HttpOptions;

export class GateClient {
  private readonly http: Http;
  constructor(opts: GateClientOptions = {}) {
    this.http = new Http(opts);
  }
  private json(method: string, path: string, body?: unknown) {
    return this.http.json(method, path, body);
  }

  async listAwaiting(cursor?: string, limit = 100 /* 쪽 크기: 근거 기록 없음, docs/adr/0010 */): Promise<{ items: SubmissionView[]; nextCursor: string | null }> {
    const q = new URLSearchParams({ status: "AWAITING_APPROVAL", limit: String(limit) });
    if (cursor) q.set("cursor", cursor);
    const { data } = await this.json("GET", `/v1/submissions?${q}`);
    const { items, next } = readEnvelope(data, "제출");
    return { items: items.map(checkSubmission), nextCursor: next };
  }

  async getSubmission(id: string): Promise<SubmissionView> {
    const { data } = await this.json("GET", `/v1/submissions/${encodeURIComponent(id)}`);
    return checkSubmission(data);
  }

  /** 보고서와 서버가 낸 해시(응답 헤더). 해시는 계산하지 않고 그대로 돌려보낸다. */
  async getReviewReport(id: string): Promise<LoadedReport> {
    const { data, headers } = await this.json("GET", `/v1/submissions/${encodeURIComponent(id)}/review-report`);
    const report = checkReport(data);
    const reportHash = headers.get(REPORT_HASH_HEADER);
    need(!!reportHash && /^sha256:[0-9a-f]{64}$/.test(reportHash), `${REPORT_HASH_HEADER} 헤더`);
    return { report, reportHash: reportHash! };
  }

  async decide(req: DecideRequest): Promise<{ approval: GateApproval; replay: boolean }> {
    // 계약 ApprovalRequest: 모르는 키(approver_id 등)·반려 사유 없음·해시 형식을 한 곳에서 거부한다(decision 값 검사도 포함).
    assertRequest("ApprovalRequest", req);
    const { status, data } = await this.json("POST", "/v1/approvals", req);
    const a = data as GateApproval;
    need(!!a && typeof a.approval_id === "string", "GateApproval");
    // 응답 대조: 완료 화면이 사람이 누른 결정과 같은 것을 보이는지 확인한다(다르면 성공으로 보이지 않는다).
    need(a.submission_id === req.submission_id && a.decision === req.decision, "응답의 제출·결정이 요청과 다르다");
    need(a.report_hash === undefined || a.report_hash === req.report_hash, "응답의 report_hash가 요청과 다르다");
    return { approval: a, replay: status === 200 };
  }
}
