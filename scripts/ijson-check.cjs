// 사람 입력·보내는 값의 I-JSON(RFC 7493) 점검. 계약 CONVENTIONS 10절과 boundary_contracts.strict_json 의 같은 값을 쓴다:
// 한도는 사본이 아니라 gen-schemas.mjs 가 고정 태그의 strict_json.py 에서 읽어 넣는다(limits). 이 파일은 그 한도를 받는 점검 함수 공장이다.
// 왜 값 점검: JSON.parse 가 이미 1e999 를 Infinity 로, 중복 키를 마지막 값으로 읽은 뒤라 글자 수준(중복 키)은 여기서 볼 수 없다 — 중복 키는 점검하지 못하는 한계다.
// 왜 정수 판정이 보수적: JS 는 1e20(실수 글자)과 100000000000000000000(정수 글자)을 같은 수로 읽어 구별할 수 없다. 둘 다 ±2^53 밖이면 거부한다(계약은 앞의 것만 허용하므로 조금 더 좁다).
module.exports = function makeIjson(limits) {
  const LONE = /[\ud800-\udbff](?![\udc00-\udfff])|(?<![\ud800-\udbff])[\udc00-\udfff]/;
  // 오류 문구에는 값을 싣지 않는다(검토 내용에 개인정보가 있을 수 있다, INTERFACES I7). 위치(경로)만 말한다.
  function valueProblem(value) {
    let nodes = 0;
    function walk(v, depth, path) {
      if (++nodes > limits.maxNodes) return "값이 너무 많다";
      if (typeof v === "number") {
        if (!Number.isFinite(v)) return `${path || "/"}: 유한하지 않은 수(NaN·Infinity·1e999)는 JSON 이 아니다`;
        if (Number.isInteger(v) && Math.abs(v) > limits.maxSafeInt) return `${path || "/"}: 정수가 ±2^53 범위를 벗어난다`;
        return null;
      }
      if (typeof v === "string") return LONE.test(v) ? `${path || "/"}: 짝 없는 서로게이트가 있다` : null;
      if (v === null || typeof v === "boolean") return null;
      if (typeof v !== "object") return `${path || "/"}: JSON 값이 아니다`;
      if (depth > limits.maxDepth) return `깊이가 ${limits.maxDepth} 를 넘는다`;
      if (Array.isArray(v)) { for (let i = 0; i < v.length; i++) { const p = walk(v[i], depth + 1, `${path}/${i}`); if (p) return p; } return null; }
      for (const k of Object.keys(v)) {
        if (LONE.test(k)) return `${path || "/"}: 키에 짝 없는 서로게이트가 있다`;
        const p = walk(v[k], depth + 1, `${path}/${k.replace(/~/g, "~0").replace(/\//g, "~1")}`);
        if (p) return p;
      }
      return null;
    }
    return walk(value, 1, "");
  }
  function textProblem(text) {
    return new TextEncoder().encode(text).length > limits.maxBytes ? `본문이 ${limits.maxBytes} 바이트를 넘는다` : null;
  }
  return { valueProblem, textProblem, limits };
};
