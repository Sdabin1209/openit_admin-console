import { build } from "esbuild";
import { cpSync, mkdirSync, rmSync } from "node:fs";

rmSync("dist", { recursive: true, force: true });
mkdirSync("dist", { recursive: true });
await build({ entryPoints: ["app/main.ts"], bundle: true, format: "esm", target: "es2022", minify: true, sourcemap: false, outfile: "dist/app.js", logLevel: "info" });
// 서비스 워커는 별도 번들이다(웹 푸시 수신, 계약 3.4.0 U92). 페이지 번들과 코드를 섞지 않는다.
await build({ entryPoints: ["app/sw.ts"], bundle: true, format: "iife", target: "es2022", minify: true, sourcemap: false, outfile: "dist/sw.js", logLevel: "info" });
cpSync("app/index.html", "dist/index.html");
cpSync("app/app.css", "dist/app.css");
