import { build } from "esbuild";
import { cpSync, mkdirSync, rmSync } from "node:fs";

rmSync("dist", { recursive: true, force: true });
mkdirSync("dist", { recursive: true });
await build({ entryPoints: ["app/main.ts"], bundle: true, format: "esm", target: "es2022", minify: true, sourcemap: false, outfile: "dist/app.js", logLevel: "info" });
cpSync("app/index.html", "dist/index.html");
cpSync("app/app.css", "dist/app.css");
