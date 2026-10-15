import { test } from "node:test";
import assert from "node:assert/strict";
import { createHash, randomBytes } from "node:crypto";
import { readFileSync } from "node:fs";
import { canonicalize, sha256Hash, sha256Hex } from "../api/jcs.ts";

const vectors = JSON.parse(readFileSync(new URL("./fixtures/hash-vectors.json", import.meta.url), "utf8")).vectors as { json: string; hash: string }[];

test("기준 구현(canonical.py)이 만든 벡터와 같은 해시", () => {
  assert.ok(vectors.length >= 4);
  for (const v of vectors) assert.equal(sha256Hash(JSON.parse(v.json)), v.hash, v.json.slice(0, 60));
});

test("sha256 순수 구현은 node:crypto와 같다", () => {
  for (const n of [0, 1, 55, 56, 63, 64, 65, 119, 120, 1000, 4097]) {
    const b = randomBytes(n);
    assert.equal(sha256Hex(b), createHash("sha256").update(b).digest("hex"), `len ${n}`);
  }
});

test("정규화: 키 정렬, 공백 없음, -0은 0, NaN 거부", () => {
  assert.equal(canonicalize({ b: [1, 2], a: -0 }), '{"a":0,"b":[1,2]}');
  assert.throws(() => canonicalize({ a: NaN }));
});
