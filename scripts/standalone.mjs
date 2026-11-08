import Ajv2020 from "ajv/dist/2020.js";
import addFormats from "ajv-formats";
// Ajv recommends bundling standalone validators so their format helpers ship
// with the generated artifact: https://ajv.js.org/standalone.html
import { buildSync } from "esbuild";
import { fileURLToPath } from "node:url";
export function bundleStandalone(contents) {
  return buildSync({ absWorkingDir: fileURLToPath(new URL("../", import.meta.url)), stdin: { contents, resolveDir: fileURLToPath(new URL("../", import.meta.url)),
    sourcefile: "validators.cjs", loader: "js" }, bundle: true, platform: "browser", format: "cjs",
    write: false, legalComments: "inline" }).outputFiles[0].text;
}

// 왜 strictNumbers: strict:false 가 이것도 꺼서 number 칸이 NaN·Infinity 를 받았다. 계약 I-JSON(CONVENTIONS 10절)은 비유한 수를 거부한다. 다른 strict 항목은 계약 스키마의 x- 키워드 때문에 끈 채 둔다.
export function createAjv(options = {}) {
  return addFormats(new Ajv2020({ strict: false, strictNumbers: true, ...options }));
}
