import { test } from "node:test";
import assert from "node:assert/strict";
import { mkdtempSync, writeFileSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { execFileSync } from "node:child_process";

test("health probe follows IPv4 and IPv6 binding without malformed URL authorities", () => {
  const path = mkdtempSync(join(tmpdir(), "admin-health-"));
  writeFileSync(join(path, "wget"), '#!/bin/sh\nfor arg do last=$arg; done\nprintf "%s" "$last"\n', { mode: 0o755 });
  try {
    for (const [host, expected] of [["0.0.0.0", "127.0.0.1"], ["::", "[::1]"], ["::1", "[::1]"], ["127.0.0.1", "127.0.0.1"]]) {
      assert.equal(execFileSync("/bin/sh", ["serve/healthcheck.sh"], { encoding: "utf8", env: { PATH: path, ADMIN_HOST: host } }), `http://${expected}:8080/healthz`);
    }
  } finally { rmSync(path, { recursive: true, force: true }); }
});
