// 모의 게이트(I5) 서버. HTTP.md의 경로와 상태 코드를 따른다. 운영 서버가 아니다.
import { createServer, type IncomingMessage, type Server, type ServerResponse } from "node:http";
import { existsSync, readFileSync, statSync } from "node:fs";
import { extname, join, normalize } from "node:path";
import { createHash } from "node:crypto";
import type { GateApproval } from "../api/types.ts";
import { baseReport, initialScenarios, type Scenario } from "./scenarios.ts";

// 모의 서버 전용 해시. 클라이언트는 이 값을 계산하지 않고 헤더로 받아 돌려보낸다.
function sha256Hash(v: unknown): string {
  const canon = (x: unknown): string => Array.isArray(x) ? `[${x.map(canon).join(",")}]`
    : x && typeof x === "object" ? `{${Object.keys(x).sort().map((k) => JSON.stringify(k) + ":" + canon((x as Record<string, unknown>)[k])).join(",")}}` : JSON.stringify(x);
  return "sha256:" + createHash("sha256").update(canon(v)).digest("hex");
}

export interface MockOptions { staticDir?: string; slowMs?: number; gatewayUser?: string; devApproverId?: string }
export interface MockHandle { server: Server; approvals: GateApproval[]; postCount: () => number; reset: () => void; currentHash: (id: string) => string | null }

const V = "1.3";
const MIME: Record<string, string> = { ".html": "text/html; charset=utf-8", ".js": "text/javascript", ".css": "text/css" };

export function createMock(opts: MockOptions = {}): MockHandle {
  let scenarios = new Map<string, Scenario>();
  const approvals: GateApproval[] = [];
  let posts = 0;
  const reset = () => {
    scenarios = new Map(initialScenarios().map((s) => [s.view.submission_id, s]));
    approvals.length = 0;
    posts = 0;
  };
  reset();

  const reportOf = (s: Scenario) => baseReport(s.view.submission_id, s.reportVersion);
  const send = (res: ServerResponse, status: number, body: unknown) => {
    res.writeHead(status, { "Content-Type": "application/json; charset=utf-8" });
    res.end(JSON.stringify(body));
  };
  const err = (res: ServerResponse, status: number, code: string, message: string, details?: Record<string, unknown>) =>
    send(res, status, { pipeline_schema_version: V, code, message, retryable: code === "UNAVAILABLE", ...(details ? { details } : {}) });

  async function body(req: IncomingMessage): Promise<unknown> {
    const chunks: Buffer[] = [];
    for await (const c of req) chunks.push(c as Buffer);
    return JSON.parse(Buffer.concat(chunks).toString("utf8"));
  }

  async function decide(req: IncomingMessage, res: ServerResponse) {
    posts++;
    let b: Record<string, unknown>;
    try { b = (await body(req)) as Record<string, unknown>; } catch { return err(res, 400, "INVALID_RECORD", "JSON이 아니다"); }
    const allowed = new Set(["submission_id", "decision", "reason", "approver_id", "approver_role", "report_hash", "pipeline_schema_version", "ext"]);
    const bad = Object.keys(b).filter((k) => !allowed.has(k));
    if (bad.length) return err(res, 400, "INVALID_RECORD", `모르는 필드: ${bad.join(",")}`);
    const hdr = req.headers["x-openit-user"];
    const user = typeof hdr === "string" && hdr ? hdr : opts.gatewayUser; // 게이트웨이가 붙인 헤더(없으면 모의가 흉내)
    if (user) b.approver_id = user; // 헤더가 있으면 본문 값은 무시
    for (const k of ["submission_id", "decision", "approver_id", "approver_role"]) {
      if (typeof b[k] !== "string" || !b[k]) return err(res, 400, "INVALID_RECORD", `${k} 필수`);
    }
    if (b.decision !== "APPROVE" && b.decision !== "REJECT") return err(res, 400, "INVALID_RECORD", "decision은 APPROVE|REJECT");
    if (b.decision === "REJECT" && (typeof b.reason !== "string" || !b.reason.trim())) return err(res, 400, "INVALID_RECORD", "반려에는 reason이 필수다");
    if (b.report_hash !== undefined && !/^sha256:[0-9a-f]{64}$/.test(String(b.report_hash))) return err(res, 400, "INVALID_RECORD", "report_hash 형식");
    const s = scenarios.get(String(b.submission_id));
    if (!s) return err(res, 404, "NOT_FOUND", "제출이 없다");
    if (s.behavior === "denied") return err(res, 403, "PERMISSION_DENIED", "release-approver 역할이 아니다");
    const prior = approvals.find((a) => a.submission_id === s.view.submission_id);
    if (prior) {
      if (prior.decision === b.decision) return send(res, 200, prior);
      return err(res, 409, "CONFLICT", "같은 제출에 다른 결정이 이미 있다", { reason: "ALREADY_DECIDED" });
    }
    if (s.view.status !== "AWAITING_APPROVAL") return err(res, 412, "FAILED_PRECONDITION", `승인 대기 상태가 아니다: ${s.view.status}`);
    if (s.behavior === "slow") await new Promise((r) => setTimeout(r, opts.slowMs ?? 300));
    if (s.behavior === "stale" && s.reportVersion === 1) s.reportVersion = 2; // 승인자가 보는 사이 보고서가 바뀐 것을 흉내
    const current = sha256Hash(reportOf(s));
    if (b.report_hash !== undefined && b.report_hash !== current) {
      return err(res, 409, "CONFLICT", "보고서가 바뀌었다", { reason: "STALE_REPORT" });
    }
    const n = approvals.length + 1;
    const a: GateApproval = {
      pipeline_schema_version: V, approval_id: `ap-${n}`, submission_id: s.view.submission_id, decision: String(b.decision),
      ...(typeof b.reason === "string" ? { reason: b.reason } : {}), approver_id: String(b.approver_id), approver_role: String(b.approver_role),
      decided_at: new Date().toISOString().replace(/\.\d+Z$/, "Z"), report_hash: (b.report_hash as string | undefined) ?? current,
    };
    approvals.push(a);
    s.view = { ...s.view, status: a.decision === "APPROVE" ? "PASSED" : "REJECTED_HUMAN", approval_id: a.approval_id, decision_id: `dec-${n}`,
      release_id: a.decision === "APPROVE" ? `rel-m${n}` : null, updated_at: a.decided_at };
    return send(res, 201, a);
  }

  const server = createServer(async (req, res) => {
    try {
      const url = new URL(req.url ?? "/", "http://x");
      const p = url.pathname;
      if (p === "/healthz" || p === "/readyz") return send(res, 200, { status: "ok" });
      if (req.method === "GET" && p === "/v1/submissions") {
        const status = url.searchParams.get("status");
        const limit = Math.min(500, Number(url.searchParams.get("limit") ?? 100) || 100);
        const start = Number(url.searchParams.get("cursor") ?? 0) || 0;
        const all = [...scenarios.values()].map((s) => s.view).filter((v) => !status || v.status === status)
          .sort((a, b) => b.submitted_at.localeCompare(a.submitted_at));
        const items = all.slice(start, start + limit);
        return send(res, 200, { items, next_cursor: start + limit < all.length ? String(start + limit) : null });
      }
      let m = /^\/v1\/submissions\/([^/]+)(\/review-report)?$/.exec(p);
      if (req.method === "GET" && m) {
        const s = scenarios.get(decodeURIComponent(m[1]));
        if (!s) return err(res, 404, "NOT_FOUND", "제출이 없다");
        if (!m[2]) return send(res, 200, s.view);
        if (!s.hasReport) return err(res, 409, "CONFLICT", "자동 검사가 끝나지 않았다");
        const rep = reportOf(s);
        res.writeHead(200, { "Content-Type": "application/json; charset=utf-8", "X-Openit-Report-Hash": sha256Hash(rep) });
        return res.end(JSON.stringify(rep));
      }
      if (p === "/config.json") return send(res, 200, { dev_approver_id: opts.devApproverId ?? null });
      if (req.method === "POST" && p === "/v1/approvals") return await decide(req, res);
      if (req.method === "GET" && opts.staticDir && !p.startsWith("/v1")) {
        const rel = normalize(p === "/" ? "/index.html" : p).replace(/^(\.\.[/\\])+/, "");
        const f = join(opts.staticDir, rel);
        if (f.startsWith(opts.staticDir) && existsSync(f) && statSync(f).isFile()) {
          res.writeHead(200, { "Content-Type": MIME[extname(f)] ?? "application/octet-stream" });
          return res.end(readFileSync(f));
        }
      }
      return err(res, 404, "NOT_FOUND", "경로가 없다");
    } catch {
      return err(res, 503, "UNAVAILABLE", "모의 서버 내부 오류");
    }
  });
  return { server, approvals, postCount: () => posts, reset, currentHash: (id) => { const s = scenarios.get(id); return s ? sha256Hash(reportOf(s)) : null; } };
}
