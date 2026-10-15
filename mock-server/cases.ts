// 모의 FailureStore(I7). HTTP.md의 경로와 상태 코드를 따른다. 운영 서버가 아니다.
import type { IncomingMessage, ServerResponse } from "node:http";
import type { FailureCase } from "../api/types.ts";

const H0 = "sha256:" + "0".repeat(64);
const V = "1.3";

const SM = { question_sentences: [], refusal_explanations: [], reask_sentences: [], choices: [], guide_sentences: [], fixed_sentences: [] };
export const VALID_PARSER_INPUT = { utterance: "[MASKED]", last_directive: null, awaiting_questions: [], question_names: [], answered_slots: [], guide_list: [] };
export const VALID_GENERATOR_INPUT = {
  directive: { action: "ASK_NEXT", targets: [], target_pending_id: null, awaiting: null, say_values: [], reask_reasons: [], notices: [], sentence_materials: SM },
  utterance: "[MASKED]",
};

function mk(id: string, version: number, status: string, o: Partial<FailureCase> = {}): FailureCase {
  return {
    pipeline_schema_version: V, case_id: id, version, created_at: `2026-10-15T0${version}:00:00Z`, source_release_id: "rel-0001",
    runtime_contract_version: 1, deidentified: true, deidentified_trace_ref: `tr-${id}`, failure_type: "UNCLASSIFIED", detection_method: "RULE",
    review_status: status, question_set: { id: "qs-main", version: "3", content_hash: H0 }, ...o,
  };
}

export function initialCases(): Map<string, FailureCase[]> {
  const rows: FailureCase[][] = [
    [mk("fc-1", 1, "PENDING", { failure_type: "PARSER_MISS", expected_kind: "PARSER" })],
    [mk("fc-2", 1, "PENDING", { failure_type: "FORBIDDEN_EXPRESSION", detection_method: "MODEL", expected_kind: "GENERATOR", source_release_id: "rel-0002" })],
    [mk("fc-3", 1, "PENDING", { detection_method: "FEEDBACK" })],
    [mk("fc-403", 1, "PENDING", { failure_type: "READ_ONLY_TOKEN_CASE" })],
    [mk("fc-4", 1, "PENDING", { failure_type: "PARSER_MISS" }),
     mk("fc-4", 2, "CONFIRMED", { failure_type: "PARSER_MISS", expected_kind: "PARSER", expected: { items: [] }, reviewed_input: { ...VALID_PARSER_INPUT, utterance: "가상 환자가 두통이 사흘 되었다고 말한다" } })],
    [mk("fc-5", 1, "PENDING", { failure_type: "FALLBACK" }), mk("fc-5", 2, "DISMISSED", { failure_type: "FALLBACK" })],
  ];
  return new Map(rows.map((r) => [r[0].case_id, r]));
}

export function trace(ref: string): Record<string, unknown> | null {
  if (!ref.startsWith("tr-fc-")) return null;
  return {
    session_id: "s-masked", turn_id: "t-1", contract_version: 1, turn_index: 3,
    parser_input: VALID_PARSER_INPUT,
    parser_output: { items: [{ item_no: 1, intent: "ANSWER" }], intent: "ANSWER" },
    judge_output: { verdicts: [] },
    generator_input: VALID_GENERATOR_INPUT,
    generator_output: { response_text: "[MASKED]", is_fallback: ref.endsWith("fc-5") },
  };
}

type Send = (res: ServerResponse, status: number, body: unknown) => void;
type Err = (res: ServerResponse, status: number, code: string, message: string, details?: Record<string, unknown>) => void;

const same = (a: unknown, b: unknown) => JSON.stringify(a ?? null) === JSON.stringify(b ?? null);

export interface CasesMock { store: Map<string, FailureCase[]>; reviewPosts: () => number; reset: () => void; handle: (req: IncomingMessage, res: ServerResponse, url: URL, send: Send, err: Err, readBody: () => Promise<unknown>) => Promise<boolean> }

export function createCasesMock(): CasesMock {
  let store = initialCases();
  let posts = 0;
  const m: CasesMock = {
    get store() { return store; },
    reviewPosts: () => posts,
    reset: () => { store = initialCases(); posts = 0; },
    async handle(req, res, url, send, err, readBody) {
      const p = url.pathname;
      if (req.method === "GET" && p === "/v1/cases") {
        const q = url.searchParams;
        const latestOnly = q.get("latest_only") !== "false";
        let items = [...store.values()].flatMap((vs) => (latestOnly ? [vs[vs.length - 1]] : vs));
        for (const [param, field] of [["review_status", "review_status"], ["failure_type", "failure_type"], ["source_release_id", "source_release_id"]] as const) {
          const want = q.get(param);
          if (want) items = items.filter((c) => c[field] === want);
        }
        items.sort((a, b) => a.case_id.localeCompare(b.case_id));
        return send(res, 200, { items, next_cursor: null }), true;
      }
      let mm = /^\/v1\/cases\/([^/]+)$/.exec(p);
      if (req.method === "GET" && mm) {
        const vs = store.get(decodeURIComponent(mm[1]));
        if (!vs) return err(res, 404, "NOT_FOUND", "사례가 없다"), true;
        const ver = url.searchParams.get("version");
        const c = ver ? vs.find((x) => x.version === Number(ver)) : vs[vs.length - 1];
        if (!c) return err(res, 404, "NOT_FOUND", "그 버전이 없다"), true;
        return send(res, 200, c), true;
      }
      mm = /^\/v1\/deidentified-traces\/([^/]+)$/.exec(p);
      if (req.method === "GET" && mm) {
        const t = trace(decodeURIComponent(mm[1]));
        return t ? send(res, 200, t) : err(res, 404, "NOT_FOUND", "trace가 없다"), true;
      }
      mm = /^\/v1\/cases\/([^/]+)\/review$/.exec(p);
      if (req.method === "POST" && mm) {
        posts++;
        let b: Record<string, unknown>;
        try { b = (await readBody()) as Record<string, unknown>; } catch { return err(res, 400, "INVALID_RECORD", "JSON이 아니다"), true; }
        const id = decodeURIComponent(mm[1]);
        const vs = store.get(id);
        if (!vs) return err(res, 404, "NOT_FOUND", "사례가 없다"), true;
        if (id === "fc-403") return err(res, 403, "PERMISSION_DENIED", "reviewer 역할이 아니다(읽기 토큰)"), true; // 읽기 토큰으로 검토한 경우를 흉내
        const allowed = new Set(["review_status", "expected", "expected_kind", "reviewed_input"]);
        const bad = Object.keys(b).filter((k) => !allowed.has(k));
        if (bad.length) return err(res, 400, "INVALID_RECORD", `모르는 필드: ${bad.join(",")}`), true;
        if (!["CONFIRMED", "DISMISSED", "PENDING"].includes(String(b.review_status))) return err(res, 400, "INVALID_RECORD", "review_status가 맞지 않다"), true;
        const kind = b.expected_kind;
        if (kind !== undefined && kind !== "PARSER" && kind !== "GENERATOR") return err(res, 400, "INVALID_RECORD", "expected_kind가 맞지 않다"), true;
        if ((b.expected !== undefined || b.reviewed_input !== undefined) && kind === undefined) return err(res, 400, "INVALID_RECORD", "expected_kind가 필요하다"), true;
        const ri = b.reviewed_input as Record<string, unknown> | undefined;
        if (ri !== undefined) {
          if (typeof ri !== "object" || ri === null || Array.isArray(ri)) return err(res, 400, "INVALID_RECORD", "reviewed_input은 객체여야 한다"), true;
          if (kind === "PARSER" && typeof ri.utterance !== "string") return err(res, 400, "INVALID_RECORD", "reviewed_input이 UtteranceParserInput이 아니다"), true;
          if (kind === "GENERATOR" && !(typeof ri.directive === "object" && "utterance" in ri)) return err(res, 400, "INVALID_RECORD", "reviewed_input이 ResponseGeneratorInput이 아니다"), true;
          if (JSON.stringify(ri).includes("[MASKED]")) return err(res, 400, "INVALID_RECORD", "마스킹된 입력을 그대로 쓸 수 없다. 개인정보 없는 문장으로 고쳐 써야 한다"), true;
        }
        const ex = b.expected as Record<string, unknown> | undefined;
        if (ex !== undefined) {
          if (typeof ex !== "object" || ex === null) return err(res, 400, "INVALID_RECORD", "expected는 객체여야 한다"), true;
          if (kind === "PARSER" && !Array.isArray(ex.items)) return err(res, 400, "INVALID_RECORD", "expected가 ParserOutput이 아니다"), true;
          if (kind === "GENERATOR" && typeof ex.response_text !== "string") return err(res, 400, "INVALID_RECORD", "expected가 GeneratorOutput이 아니다"), true;
        }
        const last = vs[vs.length - 1];
        if (last.review_status === b.review_status && same(last.expected, b.expected) && same(last.reviewed_input, b.reviewed_input)
          && (b.expected_kind === undefined ? true : last.expected_kind === b.expected_kind)) return send(res, 200, last), true;
        const next: FailureCase = { ...last, version: last.version + 1, created_at: new Date().toISOString().replace(/\.\d+Z$/, "Z"), review_status: String(b.review_status) };
        for (const k of ["expected", "expected_kind", "reviewed_input"] as const) { if (b[k] !== undefined) (next as unknown as Record<string, unknown>)[k] = b[k]; else delete next[k]; }
        if (b.expected_kind === undefined && last.expected_kind) next.expected_kind = last.expected_kind;
        vs.push(next);
        return send(res, 201, next), true;
      }
      return false;
    },
  };
  return m;
}
