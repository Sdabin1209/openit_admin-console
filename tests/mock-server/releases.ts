// 모의 릴리스 읽기(I4 일부)와 활성화·롤백(I5). HTTP.md와 PUBLIC_API.md E절의 규칙을 따른다. 운영 서버가 아니다.
// 규칙: 운영자(operator) 역할이 아니면 네 경로 모두 403. 행위자는 헤더 X-Openit-User로만 정하고 본문의 역할 값은 무시한다.
import { ACTION_RULES_VERSION, PIPELINE_SCHEMA_VERSION } from "../../app/types/contract-validators.cjs";
import type { IncomingMessage, ServerResponse } from "node:http";
import type { PointerRecord as ActivePointer } from "../../app/types/PointerRecord.ts";
import type { ReleaseRow as ReleaseSummary } from "../../app/types/ReleaseRow.ts";
import type { RollbackOutcome as RollbackReceipt } from "../../app/types/RollbackOutcome.ts";

const H0 = "sha256:" + "0".repeat(64);
const V = PIPELINE_SCHEMA_VERSION;
type Send = (res: ServerResponse, status: number, body: unknown) => void;
type Err = (res: ServerResponse, status: number, code: string, message: string, details?: Record<string, unknown>) => void;

function manifest(n: number): ReleaseSummary & Record<string, unknown> {
  return {
    pipeline_schema_version: V, release_id: `rel-000${n}`, created_at: `2026-10-0${n * 2}T00:00:00Z`, gate_decision_id: `gd-000${n}`,
    question_set: { id: "qs-main", version: "3", content_hash: H0 }, lora_a: { id: "lora-a", version: `1.${n}.0`, content_hash: H0 }, lora_b: { id: "lora-b", version: "1.0.1", content_hash: H0 },
    runtime_contract_version: 1, action_rules_version: ACTION_RULES_VERSION, model_runtime_version: "0.1.0", content_hash: H0,
    adapters: Object.fromEntries(["LORA_A", "LORA_B"].map((r) => [r, { adapter_hash: H0, serving_config: { protection_policy_version: "protect-1" }, serving_config_hash: H0,
      system_prompt: { path: "system_prompt.txt", sha256: "sha256:3def1bd06bba07ed86b77771064fc0dc969cc80f2997f159ee80b3de5b228b93" } }])),
  };
}

export interface OpsLogEntry { path: string; actor: string | null; body: Record<string, unknown> }

export function createReleasesMock(gatewayUser: string | undefined, now: () => string) {
  let operator = true;
  let conflictNext = false;
  let releases: (ReleaseSummary & Record<string, unknown>)[] = [];
  let pointer: ActivePointer | null = null;
  let receipts = new Map<string, RollbackReceipt>();
  let log: OpsLogEntry[] = [];
  let posts = 0;
  const reset = () => {
    operator = true; conflictNext = false; receipts = new Map(); log = []; posts = 0;
    releases = [4, 3, 2, 1].map(manifest); // 최신부터. rel-0004는 아직 활성화되지 않은 PASS 릴리스.
    pointer = { pipeline_schema_version: V, release_id: "rel-0003", pointer_version: 3, activated_at: "2026-10-14T00:00:00Z", cause: "ACTIVATE" };
  };
  reset();
  const ts = now;

  async function handle(req: IncomingMessage, res: ServerResponse, url: URL, send: Send, err: Err, body: () => Promise<unknown>): Promise<boolean> {
    const p = url.pathname;
    const isGet = req.method === "GET" && (p === "/v1/active-pointer" || p === "/v1/releases");
    const isPost = req.method === "POST" && (p === "/v1/activate" || p === "/v1/rollback");
    if (!isGet && !isPost) return false;
    if (!operator) { err(res, 403, "PERMISSION_DENIED", "operator 역할이 아니다"); return true; }
    if (isGet) {
      if (p === "/v1/active-pointer") send(res, 200, { item: pointer });
      else {
        // 쪽 넘김: 계약 HTTP.md 공통 목록 규칙(limit 기본 100·최대 500, cursor는 불투명 문자열, 응답 {items, next_cursor}).
        // 모의의 cursor는 정렬된 목록의 시작 위치를 문자열로 쓴다(cases 모의와 같은 방식).
        const rawLimit = url.searchParams.get("limit");
        const limit = rawLimit === null ? 100 : Number(rawLimit);
        if (!Number.isInteger(limit) || limit < 1) { err(res, 400, "INVALID_RECORD", "limit은 1 이상의 정수여야 한다"); return true; }
        const rawCursor = url.searchParams.get("cursor");
        const start = rawCursor === null ? 0 : Number(rawCursor);
        if (!Number.isInteger(start) || start < 0) { err(res, 400, "INVALID_RECORD", "cursor가 맞지 않다"); return true; }
        const size = Math.min(500, limit);
        send(res, 200, { items: releases.slice(start, start + size), next_cursor: start + size < releases.length ? String(start + size) : null });
      }
      return true;
    }
    posts++;
    let b: Record<string, unknown>;
    try { b = (await body()) as Record<string, unknown>; } catch { err(res, 400, "INVALID_RECORD", "JSON이 아니다"); return true; }
    const hdr = req.headers["x-openit-user"];
    const actor = typeof hdr === "string" && hdr ? hdr : (gatewayUser ?? null);
    log.push({ path: p, actor, body: b }); // 본문의 역할·사용자 값은 쓰지 않는다
    if (conflictNext) { conflictNext = false; err(res, 409, "CONFLICT", "다른 요청이 먼저 활성 포인터를 바꿨다", { reason: "POINTER_CHANGED" }); return true; }
    const find = (id: unknown) => releases.find((r) => r.release_id === id);
    const pass = (id: string) => id !== "rel-unapproved" && !!find(id);
    const bump = (rid: string, cause: string): ActivePointer => (pointer = { pipeline_schema_version: V, release_id: rid, pointer_version: (pointer?.pointer_version ?? 0) + 1, activated_at: ts(), cause });

    if (p === "/v1/activate") {
      const bad = Object.keys(b).filter((k) => !["release_id", "requested_by_role"].includes(k));
      if (bad.length) { err(res, 400, "INVALID_RECORD", `모르는 필드: ${bad.join(",")}`); return true; }
      if (typeof b.release_id !== "string" || !b.release_id) { err(res, 400, "INVALID_RECORD", "release_id 필수"); return true; }
      if (!find(b.release_id)) {
        if (b.release_id === "rel-unapproved") err(res, 412, "FAILED_PRECONDITION", "게이트 결정이 PASS가 아니다");
        else err(res, 404, "NOT_FOUND", "릴리스가 없다");
        return true;
      }
      if (pointer?.release_id === b.release_id) { err(res, 409, "CONFLICT", "이미 활성 릴리스다", { reason: "ALREADY_ACTIVE" }); return true; }
      send(res, 200, bump(b.release_id, "ACTIVATE"));
      return true;
    }
    // /v1/rollback
    const allowed = ["pipeline_schema_version", "request_id", "requested_at", "from_release_id", "to_release_id", "reason", "evidence_refs", "requested_by_role", "ext"];
    const bad = Object.keys(b).filter((k) => !allowed.includes(k));
    if (bad.length) { err(res, 400, "INVALID_RECORD", `모르는 필드: ${bad.join(",")}`); return true; }
    for (const k of ["request_id", "requested_at", "from_release_id", "to_release_id", "reason"]) {
      if (typeof b[k] !== "string" || !String(b[k]).trim()) { err(res, 400, "INVALID_RECORD", `${k} 필수`); return true; }
    }
    if (!Array.isArray(b.evidence_refs) || b.evidence_refs.length < 1 || b.evidence_refs.some((x) => typeof x !== "string" || !x)) { err(res, 400, "INVALID_RECORD", "evidence_refs는 1개 이상"); return true; }
    const prior = receipts.get(String(b.request_id));
    if (prior) { send(res, 200, prior); return true; } // 같은 request_id는 같은 결과(멱등)
    if (pointer?.release_id !== b.from_release_id) { err(res, 409, "CONFLICT", "현재 활성 릴리스가 from_release_id와 다르다", { reason: "POINTER_CHANGED" }); return true; }
    if (!find(b.to_release_id)) { err(res, 404, "NOT_FOUND", "되돌아갈 릴리스가 없다"); return true; }
    if (!pass(String(b.to_release_id))) { err(res, 412, "FAILED_PRECONDITION", "되돌아갈 릴리스가 PASS가 아니다"); return true; }
    const rc: RollbackReceipt = b.to_release_id === b.from_release_id
      ? { pipeline_schema_version: V, request_id: String(b.request_id), status: "REJECTED", reason: "같은 릴리스로는 롤백하지 않는다", decided_at: ts() }
      : { pipeline_schema_version: V, request_id: String(b.request_id), status: "APPLIED", active_pointer: bump(String(b.to_release_id), "ROLLBACK"), decided_at: ts() };
    receipts.set(rc.request_id, rc);
    send(res, 201, rc);
    return true;
  }

  return {
    handle, reset,
    setOperator: (v: boolean) => { operator = v; },
    forceConflictNext: () => { conflictNext = true; },
    /** 시험용: 가장 오래된 쪽에 릴리스 n개를 더한다(최신부터 정렬 유지). 쪽 넘김 시험에 쓴다. */
    seedOlder: (n: number) => { for (let i = 0; i < n; i++) releases.push({ ...manifest(1), release_id: `rel-old-${String(i).padStart(5, "0")}`, created_at: "2026-09-01T00:00:00Z" }); },
    /** 시험용: 다른 사람이 활성 릴리스를 먼저 바꾼 것을 흉내 낸다. */
    externalActivate: (id: string) => bump2(id),
    log: () => log,
    postCount: () => posts,
    pointer: () => pointer,
  };
  function bump2(id: string): void {
    pointer = { pipeline_schema_version: V, release_id: id, pointer_version: (pointer?.pointer_version ?? 0) + 1, activated_at: ts(), cause: "ACTIVATE" };
  }
}
