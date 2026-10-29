// 릴리스 운영 모의 서버의 출력과 클라이언트 요청이 계약 스키마(../boundary-contracts/schemas, 복사 없음)를 지키는지 검증한다.
import { PIPELINE_SCHEMA_VERSION } from "../api/contract.ts";
import { contract } from "../scripts/contract-src.mjs";
import { test, after } from "node:test";
import assert from "node:assert/strict";
import Ajv2020 from "ajv/dist/2020.js";
import addFormats from "ajv-formats";
import { ReleasesClient } from "../api/releases.ts";
import { startMock } from "./helpers.ts";

const ajv = new Ajv2020({ strict: false, allErrors: true });
(addFormats as unknown as (a: unknown) => void)(ajv);
for (const f of contract.list("schemas")) if (f.endsWith(".json")) { const sc = contract.json(`schemas/${f}`); ajv.addSchema({ ...sc, $id: sc.$id ?? f }); }
const errors = (name: string, v: unknown) => { const fn = ajv.getSchema(`${name}.schema.json`); assert.ok(fn, name); return fn!(v) ? [] : fn!.errors!; };
const check = (name: string, v: unknown) => assert.deepEqual(errors(name, v), [], name);

const s = await startMock();
after(() => s.close());
const j = async (path: string, init?: RequestInit) => { const r = await fetch(s.base + path, init); return { status: r.status, body: await r.json() }; };
const post = (path: string, body: unknown) => j(path, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) });

test("공식 예제가 스키마를 통과한다(검증기 점검)", () => {
  const ex = (n: string) => contract.json(`examples/${n}.json`);
  check("ActivePointer", ex("ActivePointer"));
  check("ReleaseManifest", ex("ReleaseManifest"));
  assert.notDeepEqual(errors("ActivePointer", { release_id: "x" }), []);
});

test("활성 포인터와 릴리스 목록이 스키마를 통과한다", async () => {
  const p = await j("/v1/active-pointer");
  assert.equal(p.status, 200);
  check("ActivePointer", p.body.item);
  const l = await j("/v1/releases");
  assert.equal(l.body.items.length, 4);
  assert.equal(l.body.next_cursor, null);
  for (const it of l.body.items) check("ReleaseManifest", it);
});

test("활성화·롤백 응답과 오류가 스키마를 통과한다", async () => {
  const a = await post("/v1/activate", { release_id: "rel-0004" });
  assert.equal(a.status, 200);
  check("ActivePointer", a.body);
  const dup = await post("/v1/activate", { release_id: "rel-0004" });
  assert.equal(dup.status, 409);
  check("BoundaryError", dup.body);
  const nopass = await post("/v1/activate", { release_id: "rel-unapproved" });
  assert.equal(nopass.status, 412);
  check("BoundaryError", nopass.body);
  const rb = { pipeline_schema_version: PIPELINE_SCHEMA_VERSION, request_id: "rb-c1", requested_at: "2026-10-27T00:00:00Z", from_release_id: "rel-0004", to_release_id: "rel-0003", reason: "x", evidence_refs: ["fc-1"] };
  const r1 = await post("/v1/rollback", rb);
  assert.equal(r1.status, 201);
  check("RollbackReceipt", r1.body);
  const rej = await post("/v1/rollback", { ...rb, request_id: "rb-c2", from_release_id: "rel-0003", to_release_id: "rel-0003" });
  assert.equal(rej.body.status, "REJECTED");
  check("RollbackReceipt", rej.body);
  s.mock.releases.setOperator(false);
  const d = await j("/v1/releases");
  assert.equal(d.status, 403);
  check("BoundaryError", d.body);
  const d2 = await post("/v1/activate", { release_id: "rel-0004" });
  assert.equal(d2.status, 403);
  s.mock.releases.setOperator(true);
});

test("클라이언트의 롤백 본문은 RollbackRequest 스키마를 그대로 지킨다(requested_by_role: operator)", async () => {
  s.mock.reset();
  const api = new ReleasesClient({ baseUrl: s.base });
  const { OpsController } = await import("../app/ops-controller.ts");
  const c = new OpsController(api);
  await c.load();
  c.startRollback();
  c.setField({ reason: "사유", evidenceText: "fc-1" });
  await c.submit();
  const body = s.mock.releases.log().at(-1)!.body;
  assert.deepEqual(errors("RollbackRequest", body), []);
  assert.equal(body.requested_by_role, "operator");
});
