// 계약 스키마(boundary-contracts, 읽기 전용)로 만든 검증기를 코드가 실제로 쓰는지 확인한다(D107 승격 스키마).
// 기대값은 계약의 examples / conformance/examples_invalid 에서 온다. 이 파일이 값을 정하지 않는다.
import { contract } from "../scripts/contract-src.mjs";
import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync, readdirSync, existsSync } from "node:fs";
import { GateClient } from "../app/wiring/gateway.ts";
import { CasesClient } from "../app/wiring/gateway.ts";
import { ReleasesClient } from "../app/wiring/gateway.ts";
import { PIPELINE_SCHEMA_VERSION, CONTRACT_VERSION, ACTION_RULES_VERSION } from "../app/types/contract-validators.cjs";
import { appSourceFiles } from "./helpers.ts";
import { trace } from "./mock-server/cases.ts";
import * as v from "../app/types/contract-validators.cjs";

const skip = !contract.available() && "고정 태그를 가진 boundary-contracts가 이웃에 없는 환경";
const ex = (n: string) => contract.json(`examples/${n}.json`);
const bad = (prefix: string): [string, unknown][] =>
  contract.list("conformance/examples_invalid").filter((f) => f.startsWith(prefix + ".")).map((f) => [f, contract.json(`conformance/examples_invalid/${f}`)]);

/** 요청 본문을 보냈는지 세는 가짜 fetch. 응답은 주어진 것을 그대로 낸다. */
function fakeFetch(respond: () => { status?: number; body: unknown; headers?: Record<string, string> }) {
  const calls: { url: string; body: unknown }[] = [];
  const f = (async (url: string, init?: { body?: string }) => {
    calls.push({ url, body: init?.body ? JSON.parse(init.body) : undefined });
    const r = respond();
    return new Response(JSON.stringify(r.body), { status: r.status ?? 200, headers: { "content-type": "application/json", ...(r.headers ?? {}) } });
  }) as unknown as typeof fetch;
  return { f, calls };
}

test("계약 버전 상수는 계약 schemas_api.py의 PIPELINE_SCHEMA_VERSION에서 생성된다", { skip }, () => {
  const py = contract.read("boundary_contracts/schemas_api.py");
  assert.equal(PIPELINE_SCHEMA_VERSION, /PIPELINE_SCHEMA_VERSION\s*=\s*"([^"]+)"/.exec(py)![1]);
});

test("승격 스키마 검증기: 계약 예시는 통과하고 examples_invalid는 모두 거부한다", { skip }, () => {
  const names = ["ApprovalRequest", "ActivateRequest", "CaseReviewRequest", "ListEnvelope", "OpsFeedbackDeidentifiedTrace", "ImageLabels"] as const;
  for (const n of names) {
    const fn = (v as unknown as Record<string, (x: unknown) => boolean>)[n];
    assert.equal(typeof fn, "function", `${n} 검증기가 생성되지 않았다`);
    const valids = contract.list("examples").filter((f) => f.startsWith(n + ".") && f.endsWith(".json"));
    assert.ok(valids.length > 0);
    for (const f of valids) assert.ok(fn(contract.json(`examples/${f}`)), `${f}는 통과해야 한다`);
    // 왜 제외: ImageLabels.bad-jobs-content는 JSON 문자열 라벨의 내용(contentSchema)이 틀린 경우라 계약 쪽도 따로 풀어 검증한다. 이 영역은 jobs·exposure 라벨을 달지 않는다.
    for (const [f, body] of bad(n).filter(([f]) => f !== "ImageLabels.bad-jobs-content.json")) assert.equal(fn(body), false, `${f}는 거부해야 한다`);
  }
});

test("승인 요청: ApprovalRequest 위반 본문은 보내지 않는다(approver_id, 낡은 해시 형식 등)", { skip }, async () => {
  for (const [f, body] of bad("ApprovalRequest")) {
    const { f: fetchFn, calls } = fakeFetch(() => ({ body: {} }));
    await assert.rejects(new GateClient({ fetch: fetchFn }).decide(body as never), /./s, f);
    assert.equal(calls.length, 0, `${f}: 서버로 나가면 안 된다`);
  }
});

test("활성화 요청: ActivateRequest 위반(잘못된 ID)은 보내지 않는다", { skip }, async () => {
  const { f, calls } = fakeFetch(() => ({ body: ex("ActivePointer") }));
  await assert.rejects(new ReleasesClient({ fetch: f }).activate("잘못된 ID!"));
  assert.equal(calls.length, 0);
});

test("검토 요청: CaseReviewRequest 위반 본문은 보내지 않는다", { skip }, async () => {
  for (const [name, body] of bad("CaseReviewRequest")) {
    const { f, calls } = fakeFetch(() => ({ body: {} }));
    await assert.rejects(new CasesClient({ fetch: f }).review("fc-1", body as never), /./s, name);
    assert.equal(calls.length, 0, `${name}: 서버로 나가면 안 된다`);
  }
});

test("목록 응답: ListEnvelope 위반(next_cursor 없음·빈 문자열·items가 배열 아님)은 오류로 받는다", { skip }, async () => {
  for (const [name, body] of bad("ListEnvelope")) {
    for (const call of [
      (o: { fetch: typeof fetch }) => new CasesClient(o).list(),
      (o: { fetch: typeof fetch }) => new ReleasesClient(o).listReleases(),
      (o: { fetch: typeof fetch }) => new GateClient(o).listAwaiting(),
    ]) {
      const { f } = fakeFetch(() => ({ body }));
      await assert.rejects(call({ fetch: f }), (e: Error) => /응답 형식/.test(e.message), name);
    }
  }
});

test("비식별 trace: 모의 서버 trace()가 OpsFeedbackDeidentifiedTrace를 통과한다", () => {
  const t = trace("tr-fc-1");
  assert.ok(v.OpsFeedbackDeidentifiedTrace(t), JSON.stringify(v.OpsFeedbackDeidentifiedTrace.errors?.slice(0, 5)));
  assert.ok(v.OpsFeedbackDeidentifiedTrace(trace("tr-fc-5")));
});

test("비식별 trace: 클라이언트는 계약 위반 trace(원문 session_id, 모르는 키 등)를 받지 않는다", { skip }, async () => {
  for (const [name, body] of bad("OpsFeedbackDeidentifiedTrace")) {
    const { f } = fakeFetch(() => ({ body }));
    await assert.rejects(new CasesClient({ fetch: f }).getTrace("tr-fc-1"), (e: Error) => /응답 형식/.test(e.message), name);
  }
  const { f } = fakeFetch(() => ({ body: ex("OpsFeedbackDeidentifiedTrace") }));
  assert.ok(await new CasesClient({ fetch: f }).getTrace("tr-fc-1"));
});

test("pipeline_schema_version 문자열 리터럴이 코드에 박혀 있지 않다(계약 상수에서 파생)", () => {
  for (const f of [...appSourceFiles(), ...readdirSync(new URL("./mock-server/", import.meta.url)).map((x) => `tests/mock-server/${x}`)]) {
    const src = readFileSync(new URL(`../${f}`, import.meta.url), "utf8");
    assert.ok(!/["']2\.[0-9]["']/.test(src), `${f}에 버전 리터럴이 있다`);
  }
});

test("Dockerfile 라벨이 ImageLabels를 통과한다(기본값 none/unknown/unset 없음)", { skip }, () => {
  const df = readFileSync(new URL("../Dockerfile", import.meta.url), "utf8");
  const final = df.slice(df.lastIndexOf("\nFROM "));
  const args: Record<string, string> = { ...Object.fromEntries([...final.matchAll(/^ARG (\w+)=(\S+)$/gm)].map((m) => [m[1], m[2]])), REVISION: "0123abc" /* 빌드 인자로 받는 값 */ };
  const labels = Object.fromEntries([...final.matchAll(/(io\.openit\.[\w.-]+)="([^"]*)"/g)].map((m) => [m[1], m[2].replace(/\$\{(\w+)\}/g, (_, k) => args[k] ?? `<${k}?>`)]));
  assert.ok(v.ImageLabels(labels), JSON.stringify([labels, v.ImageLabels.errors]));
  assert.ok(!/ARG \w+=(none|unknown|unset)\b/.test(final), "ARG 기본값에 none/unknown/unset이 있다");
});

test("계약 규칙 버전 상수는 계약 데이터 action_extraction_rules.json의 rules_version이다(코드에 리터럴로 적지 않는다)", { skip }, () => {
  assert.equal(ACTION_RULES_VERSION, JSON.parse(contract.read("boundary_contracts/data/action_extraction_rules.json")).rules_version);
});

test("실제 사용 계약 버전(생성 검증기의 원본)은 Dockerfile ARG 고정과 같다", () => {
  const df = readFileSync(new URL("../Dockerfile", import.meta.url), "utf8");
  assert.equal(/^ARG BOUNDARY_CONTRACTS=(\S+)$/m.exec(df)![1], CONTRACT_VERSION);
});

test("turn engine 의존·표지·라벨이 코드에 남아 있지 않다(계약 3.0.0, D109)", () => {
  const hits: string[] = [];
  const walk = (d: URL) => {
    for (const e of readdirSync(d, { withFileTypes: true })) {
      if (["node_modules", ".git", "dist", "docs"].includes(e.name)) continue; // docs는 이유 있는 기록 문서
      if (e.isDirectory()) walk(new URL(e.name + "/", d));
      else if (/\.(ts|mjs|json|sh|html|css)$|^Dockerfile$/.test(e.name)) {
        if (/turn[_-]engine/.test(readFileSync(new URL(e.name, d), "utf8"))) hits.push(new URL(e.name, d).pathname);
      }
    }
  };
  walk(new URL("../", import.meta.url));
  assert.deepEqual(hits, []);
});
