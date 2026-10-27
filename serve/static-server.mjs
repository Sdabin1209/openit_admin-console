// 이미지에서 쓰는 정적 서버. 의존 없음. 설정은 환경 변수 PORT(기본 8080)만 받는다.
// /v1은 같은 출처의 게이트웨이가 프록시한다(이 서버는 /v1을 처리하지 않는다).
import { createServer } from "node:http";
import { readFile } from "node:fs/promises";
import { extname, join, normalize, resolve } from "node:path";

const root = resolve(process.env.STATIC_DIR ?? "dist");
const port = Number(process.env.PORT ?? 8080);
const MIME = { ".html": "text/html; charset=utf-8", ".js": "text/javascript; charset=utf-8", ".css": "text/css; charset=utf-8" };
// 왜: no-store는 보고서·사례 내용을 캐시에 남기지 않으려는 것, CSP는 인라인/외부 스크립트 차단(docs/adr/0006).
const HEADERS = {
  "Cache-Control": "no-store",
  "X-Content-Type-Options": "nosniff",
  "Referrer-Policy": "no-referrer",
  "Content-Security-Policy": "default-src 'self'; script-src 'self'; style-src 'self'; connect-src 'self'; base-uri 'none'; form-action 'none'; frame-ancestors 'none'",
};

const server = createServer(async (req, res) => {
  const path = new URL(req.url ?? "/", "http://x").pathname;
  if (path === "/healthz" || path === "/readyz") {
    res.writeHead(200, { "Content-Type": "application/json" });
    return res.end('{"status":"ok"}');
  }
  if (path === "/config.json") {
    // 개발 모드 전용 값. 운영에서는 설정하지 않는다(승인자는 게이트웨이가 X-Openit-User로 붙인다).
    res.writeHead(200, { ...HEADERS, "Content-Type": "application/json" });
    return res.end(JSON.stringify({ dev_approver_id: process.env.ADMIN_DEV_APPROVER_ID || null }));
  }
  if (req.method !== "GET" && req.method !== "HEAD") { res.writeHead(405); return res.end(); }
  const rel = normalize(path === "/" ? "/index.html" : path);
  const file = join(root, rel);
  if (!file.startsWith(root + "/")) { res.writeHead(404); return res.end(); }
  try {
    const data = await readFile(file);
    res.writeHead(200, { ...HEADERS, "Content-Type": MIME[extname(file)] ?? "application/octet-stream" });
    res.end(req.method === "HEAD" ? undefined : data);
  } catch {
    res.writeHead(404, HEADERS);
    res.end("not found");
  }
});
server.listen(port, "0.0.0.0", () => console.log(`admin-console static server on :${port}`));
process.on("SIGTERM", () => server.close(() => process.exit(0)));
