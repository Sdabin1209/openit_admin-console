// 모의 문진 결과(PUBLIC_API B): 목록·상세·확인 표시와 SSE result_ready. 운영 서버가 아니다.
// 규칙: clinician 역할이 아니면 403(게이트웨이가 clinician 계정에만 연다). 확인한 사람은 헤더 X-Openit-User(없으면 gatewayUser). 두 번째 ack는 처음 값 유지(멱등).
// 결과 모양은 문진 스키마 SessionResult(survey-service/schema)를 따른다. 시험이 그 스키마로 검사한다(tests/results-conformance.test.ts).
import type { IncomingMessage, ServerResponse } from "node:http";

type Send = (res: ServerResponse, status: number, body: unknown) => void;
type Err = (res: ServerResponse, status: number, code: string, message: string, details?: Record<string, unknown>) => void;
export type Rec = Record<string, unknown> & { session_id: string; status: string; ended_at: string | null };

export function sessionResult(n: number, o: Partial<Rec> = {}): Rec {
  const day = String(10 + n).padStart(2, "0");
  return {
    session_id: `s-${n}`, subject_ref: `visit-${n}`, status: "ENDED_COMPLETE", started_at: `2026-11-${day}T00:00:00Z`, ended_at: `2026-11-${day}T00:10:00Z`,
    release_id: "rel-0001", question_bank_version: "qb-1", question_set_id: "qs-main", question_set_title: "기본 문진표",
    answers: [
      { key: "Q1", value: "두통", status: "ANSWERED", precision: "exact" },
      { key: "Q7_1[soju].amount", value: 2, status: "CORRECTION", precision: "approximate" },
      { key: "Q7_1[soju].unit", value: "병", status: "ANSWERED", precision: "exact" },
    ],
    skipped_details: [{ item: "Q3", reason: "UNKNOWN" }, { item: "Q4", slot: "Q4[a].b", reason: "REASK_LIMIT" }],
    ...o,
  } as Rec;
}

export function createResultsMock(gatewayUser: string | undefined, now: () => string) {
  let clinician = true;
  // 웹 푸시(계약 3.4.0): 공개키 null이면 꺼짐. 구독은 endpoint별(같은 endpoint는 갱신, 멱등).
  let vapid: string | null = "BEl62iUYgUivxIkv69yViEuiBIa-Ib9-SkvMeAtA3LFgDzkrxZJjSgSnfckjBJuBkr3qBUYIHBQFLXYp5Nksh8U";
  const subs = new Map<string, Record<string, unknown>>();
  let rows: Rec[] = [];
  const clients = new Set<ServerResponse>();
  const reset = () => {
    clinician = true; vapid = "BEl62iUYgUivxIkv69yViEuiBIa-Ib9-SkvMeAtA3LFgDzkrxZJjSgSnfckjBJuBkr3qBUYIHBQFLXYp5Nksh8U"; subs.clear();
    // 최신부터 내려주므로 번호가 클수록 최신(시작 날짜가 큼). 4번은 직원이 종료한 부분 결과.
    rows = [sessionResult(1), sessionResult(2), sessionResult(3, { status: "ENDED_LEFT", answers: [{ key: "Q1", value: "복통", status: "ANSWERED", precision: "exact" }], skipped_details: [] }),
      sessionResult(4, { status: "ENDED_STAFF", ended_at: "2026-11-14T00:05:00Z", subject_ref: null })];
  };
  reset();

  async function handle(req: IncomingMessage, res: ServerResponse, url: URL, send: Send, err: Err, body: () => Promise<unknown>): Promise<boolean> {
    const p = url.pathname;
    const user = (typeof req.headers["x-openit-user"] === "string" && req.headers["x-openit-user"]) || gatewayUser;
    if (req.method === "GET" && p === "/v1/staff/alerts/stream") {
      if (!clinician) return err(res, 403, "PERMISSION_DENIED", "clinician 역할이 아니다"), true;
      res.writeHead(200, { "Content-Type": "text/event-stream", "Cache-Control": "no-store" });
      res.write(`event: heartbeat\ndata: {"ts":"${now()}"}\n\n`);
      clients.add(res);
      res.on("close", () => clients.delete(res));
      return true;
    }
    if (req.method === "GET" && p === "/v1/staff/push-config") return send(res, 200, { vapid_public_key: vapid }), true;
    if (req.method === "POST" && p === "/v1/staff/push-subscriptions") {
      let b: Record<string, unknown>;
      try { b = (await body()) as Record<string, unknown>; } catch { return err(res, 400, "INVALID_RECORD", "JSON이 아니다"), true; }
      const topics = b.topics === undefined ? ["alerts"] : b.topics;
      if (typeof b.endpoint !== "string" || !b.endpoint || typeof b.keys !== "object" || !Array.isArray(topics) || !topics.every((t) => t === "alerts" || t === "results")) return err(res, 400, "INVALID_RECORD", "구독 본문"), true;
      if (!clinician && topics.includes("results")) return err(res, 403, "PERMISSION_DENIED", "results는 clinician 역할만"), true;
      subs.set(b.endpoint, { ...b, topics });
      return send(res, 201, {}), true;
    }
    if (req.method === "POST" && p === "/v1/staff/push-subscriptions/unsubscribe") {
      let b: Record<string, unknown>;
      try { b = (await body()) as Record<string, unknown>; } catch { return err(res, 400, "INVALID_RECORD", "JSON이 아니다"), true; }
      if (typeof b.endpoint !== "string" || !b.endpoint) return err(res, 400, "INVALID_RECORD", "endpoint"), true;
      subs.delete(b.endpoint);
      res.writeHead(204, { "Cache-Control": "no-store" }); res.end();
      return true;
    }
    let m = /^\/v1\/results(?:\/([^/]+)(\/ack)?)?$/.exec(p);
    if (!m) return false;
    if (!clinician) return err(res, 403, "PERMISSION_DENIED", "clinician 역할이 아니다"), true;
    if (!m[1] && req.method === "GET") {
      const status = url.searchParams.get("status");
      const after = url.searchParams.get("updated_after");
      const limit = Math.min(200, Number(url.searchParams.get("limit") ?? 50) || 50);
      const start = Number(url.searchParams.get("cursor") ?? 0) || 0;
      if (url.searchParams.get("limit") !== null && !(Number(url.searchParams.get("limit")) >= 1)) return err(res, 400, "INVALID_RECORD", "limit"), true;
      const all = rows.filter((r) => (!status || r.status === status) && (!after || String(r.ended_at ?? r.started_at) > after))
        .sort((a, b) => String(b.started_at).localeCompare(String(a.started_at)));
      return send(res, 200, { items: all.slice(start, start + limit), next_cursor: start + limit < all.length ? String(start + limit) : null }), true;
    }
    const id = m[1] ? decodeURIComponent(m[1]) : "";
    const row = rows.find((r) => r.session_id === id);
    if (m[1] && !m[2] && req.method === "GET") return row ? send(res, 200, row) : err(res, 404, "NOT_FOUND", "결과가 없다"), true;
    if (m[1] && m[2] && req.method === "POST") {
      try { await body(); } catch { return err(res, 400, "INVALID_RECORD", "JSON이 아니다"), true; }
      if (!row) return err(res, 404, "NOT_FOUND", "결과가 없다"), true;
      if (!user) return err(res, 401, "PERMISSION_DENIED", "X-Openit-User 헤더가 없다"), true;
      if (!row.acknowledged_by) { row.acknowledged_by = user; row.acknowledged_at = now(); } // 두 번째부터는 처음 값 유지
      return send(res, 200, row), true;
    }
    return false;
  }

  return {
    handle, reset,
    /** 시험용: 이 계정을 clinician이 아닌 것으로 만든다(목록·상세·ack·스트림 403). */
    setClinician: (v: boolean) => { clinician = v; },
    rows: () => rows,
    /** 시험용: 푸시 공개키(null이면 푸시 꺼짐). */
    setVapid: (k: string | null) => { vapid = k; },
    pushSubs: () => [...subs.values()],
    add: (r: Rec) => { rows = [r, ...rows]; },
    /** 세션이 끝났다는 알림을 연결된 구독자 모두에게 보낸다(계약: id: 없음, data는 session_id·status·ended_at). */
    emitReady: (r: Pick<Rec, "session_id" | "status" | "ended_at">) => {
      for (const c of clients) c.write(`event: result_ready\ndata: ${JSON.stringify({ session_id: r.session_id, status: r.status, ended_at: r.ended_at })}\n\n`);
    },
    clientCount: () => clients.size,
    closeStreams: () => { for (const c of clients) c.end(); clients.clear(); },
  };
}
