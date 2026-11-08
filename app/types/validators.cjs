// 생성물: scripts/gen-types.mjs (직접 고치지 않는다). 원본: schemas/, 계약 v5.0.1
"use strict";
var __getOwnPropNames = Object.getOwnPropertyNames;
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};

// node_modules/ajv/dist/runtime/ucs2length.js
var require_ucs2length = __commonJS({
  "node_modules/ajv/dist/runtime/ucs2length.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    function ucs2length(str) {
      const len = str.length;
      let length = 0;
      let pos = 0;
      let value;
      while (pos < len) {
        length++;
        value = str.charCodeAt(pos++);
        if (value >= 55296 && value <= 56319 && pos < len) {
          value = str.charCodeAt(pos);
          if ((value & 64512) === 56320)
            pos++;
        }
      }
      return length;
    }
    exports2.default = ucs2length;
    ucs2length.code = 'require("ajv/dist/runtime/ucs2length").default';
  }
});

// validators.cjs
exports.ActivateInput = validate20;
var func1 = require_ucs2length().default;
function validate20(data, { instancePath = "", parentData, parentDataProperty, rootData = data, dynamicAnchors = {} } = {}) {
  ;
  let vErrors = null;
  let errors = 0;
  const evaluated0 = validate20.evaluated;
  if (evaluated0.dynamicProps) {
    evaluated0.props = void 0;
  }
  if (evaluated0.dynamicItems) {
    evaluated0.items = void 0;
  }
  if (data && typeof data == "object" && !Array.isArray(data)) {
    if (data.releaseId === void 0) {
      const err0 = { instancePath, schemaPath: "#/required", keyword: "required", params: { missingProperty: "releaseId" }, message: "must have required property 'releaseId'" };
      if (vErrors === null) {
        vErrors = [err0];
      } else {
        vErrors.push(err0);
      }
      errors++;
    }
    for (const key0 in data) {
      if (!(key0 === "releaseId")) {
        const err1 = { instancePath, schemaPath: "#/additionalProperties", keyword: "additionalProperties", params: { additionalProperty: key0 }, message: "must NOT have additional properties" };
        if (vErrors === null) {
          vErrors = [err1];
        } else {
          vErrors.push(err1);
        }
        errors++;
      }
    }
    if (data.releaseId !== void 0) {
      let data0 = data.releaseId;
      if (typeof data0 === "string") {
        if (func1(data0) < 1) {
          const err2 = { instancePath: instancePath + "/releaseId", schemaPath: "#/properties/releaseId/minLength", keyword: "minLength", params: { limit: 1 }, message: "must NOT have fewer than 1 characters" };
          if (vErrors === null) {
            vErrors = [err2];
          } else {
            vErrors.push(err2);
          }
          errors++;
        }
      } else {
        const err3 = { instancePath: instancePath + "/releaseId", schemaPath: "#/properties/releaseId/type", keyword: "type", params: { type: "string" }, message: "must be string" };
        if (vErrors === null) {
          vErrors = [err3];
        } else {
          vErrors.push(err3);
        }
        errors++;
      }
    }
  } else {
    const err4 = { instancePath, schemaPath: "#/type", keyword: "type", params: { type: "object" }, message: "must be object" };
    if (vErrors === null) {
      vErrors = [err4];
    } else {
      vErrors.push(err4);
    }
    errors++;
  }
  validate20.errors = vErrors;
  return errors === 0;
}
validate20.evaluated = { "props": true, "dynamicProps": false, "dynamicItems": false };
exports.ActivePointerState = validate21;
function validate21(data, { instancePath = "", parentData, parentDataProperty, rootData = data, dynamicAnchors = {} } = {}) {
  ;
  let vErrors = null;
  let errors = 0;
  const evaluated0 = validate21.evaluated;
  if (evaluated0.dynamicProps) {
    evaluated0.props = void 0;
  }
  if (evaluated0.dynamicItems) {
    evaluated0.items = void 0;
  }
  if (data && typeof data == "object" && !Array.isArray(data)) {
    if (data.pointer === void 0) {
      const err0 = { instancePath, schemaPath: "#/required", keyword: "required", params: { missingProperty: "pointer" }, message: "must have required property 'pointer'" };
      if (vErrors === null) {
        vErrors = [err0];
      } else {
        vErrors.push(err0);
      }
      errors++;
    }
    for (const key0 in data) {
      if (!(key0 === "pointer")) {
        const err1 = { instancePath, schemaPath: "#/additionalProperties", keyword: "additionalProperties", params: { additionalProperty: key0 }, message: "must NOT have additional properties" };
        if (vErrors === null) {
          vErrors = [err1];
        } else {
          vErrors.push(err1);
        }
        errors++;
      }
    }
    if (data.pointer !== void 0) {
      let data0 = data.pointer;
      const _errs3 = errors;
      let valid1 = false;
      let passing0 = null;
      const _errs4 = errors;
      if (data0 && typeof data0 == "object" && !Array.isArray(data0)) {
        if (data0.release_id === void 0) {
          const err2 = { instancePath: instancePath + "/pointer", schemaPath: "PointerRecord.schema.json/required", keyword: "required", params: { missingProperty: "release_id" }, message: "must have required property 'release_id'" };
          if (vErrors === null) {
            vErrors = [err2];
          } else {
            vErrors.push(err2);
          }
          errors++;
        }
        if (data0.pointer_version === void 0) {
          const err3 = { instancePath: instancePath + "/pointer", schemaPath: "PointerRecord.schema.json/required", keyword: "required", params: { missingProperty: "pointer_version" }, message: "must have required property 'pointer_version'" };
          if (vErrors === null) {
            vErrors = [err3];
          } else {
            vErrors.push(err3);
          }
          errors++;
        }
        if (data0.activated_at === void 0) {
          const err4 = { instancePath: instancePath + "/pointer", schemaPath: "PointerRecord.schema.json/required", keyword: "required", params: { missingProperty: "activated_at" }, message: "must have required property 'activated_at'" };
          if (vErrors === null) {
            vErrors = [err4];
          } else {
            vErrors.push(err4);
          }
          errors++;
        }
        if (data0.cause === void 0) {
          const err5 = { instancePath: instancePath + "/pointer", schemaPath: "PointerRecord.schema.json/required", keyword: "required", params: { missingProperty: "cause" }, message: "must have required property 'cause'" };
          if (vErrors === null) {
            vErrors = [err5];
          } else {
            vErrors.push(err5);
          }
          errors++;
        }
        if (data0.pipeline_schema_version !== void 0) {
          if (typeof data0.pipeline_schema_version !== "string") {
            const err6 = { instancePath: instancePath + "/pointer/pipeline_schema_version", schemaPath: "PointerRecord.schema.json/properties/pipeline_schema_version/type", keyword: "type", params: { type: "string" }, message: "must be string" };
            if (vErrors === null) {
              vErrors = [err6];
            } else {
              vErrors.push(err6);
            }
            errors++;
          }
        }
        if (data0.release_id !== void 0) {
          let data2 = data0.release_id;
          if (typeof data2 === "string") {
            if (func1(data2) < 1) {
              const err7 = { instancePath: instancePath + "/pointer/release_id", schemaPath: "PointerRecord.schema.json/properties/release_id/minLength", keyword: "minLength", params: { limit: 1 }, message: "must NOT have fewer than 1 characters" };
              if (vErrors === null) {
                vErrors = [err7];
              } else {
                vErrors.push(err7);
              }
              errors++;
            }
          } else {
            const err8 = { instancePath: instancePath + "/pointer/release_id", schemaPath: "PointerRecord.schema.json/properties/release_id/type", keyword: "type", params: { type: "string" }, message: "must be string" };
            if (vErrors === null) {
              vErrors = [err8];
            } else {
              vErrors.push(err8);
            }
            errors++;
          }
        }
        if (data0.pointer_version !== void 0) {
          let data3 = data0.pointer_version;
          if (!(typeof data3 == "number" && (!(data3 % 1) && !isNaN(data3)) && isFinite(data3))) {
            const err9 = { instancePath: instancePath + "/pointer/pointer_version", schemaPath: "PointerRecord.schema.json/properties/pointer_version/type", keyword: "type", params: { type: "integer" }, message: "must be integer" };
            if (vErrors === null) {
              vErrors = [err9];
            } else {
              vErrors.push(err9);
            }
            errors++;
          }
        }
        if (data0.activated_at !== void 0) {
          if (typeof data0.activated_at !== "string") {
            const err10 = { instancePath: instancePath + "/pointer/activated_at", schemaPath: "PointerRecord.schema.json/properties/activated_at/type", keyword: "type", params: { type: "string" }, message: "must be string" };
            if (vErrors === null) {
              vErrors = [err10];
            } else {
              vErrors.push(err10);
            }
            errors++;
          }
        }
        if (data0.cause !== void 0) {
          if (typeof data0.cause !== "string") {
            const err11 = { instancePath: instancePath + "/pointer/cause", schemaPath: "PointerRecord.schema.json/properties/cause/type", keyword: "type", params: { type: "string" }, message: "must be string" };
            if (vErrors === null) {
              vErrors = [err11];
            } else {
              vErrors.push(err11);
            }
            errors++;
          }
        }
        if (data0.ext !== void 0) {
          let data6 = data0.ext;
          if (!(data6 && typeof data6 == "object" && !Array.isArray(data6))) {
            const err12 = { instancePath: instancePath + "/pointer/ext", schemaPath: "PointerRecord.schema.json/properties/ext/type", keyword: "type", params: { type: "object" }, message: "must be object" };
            if (vErrors === null) {
              vErrors = [err12];
            } else {
              vErrors.push(err12);
            }
            errors++;
          }
        }
      } else {
        const err13 = { instancePath: instancePath + "/pointer", schemaPath: "PointerRecord.schema.json/type", keyword: "type", params: { type: "object" }, message: "must be object" };
        if (vErrors === null) {
          vErrors = [err13];
        } else {
          vErrors.push(err13);
        }
        errors++;
      }
      var _valid0 = _errs4 === errors;
      if (_valid0) {
        valid1 = true;
        passing0 = 0;
        var props0 = {};
        props0.pipeline_schema_version = true;
        props0.release_id = true;
        props0.pointer_version = true;
        props0.activated_at = true;
        props0.cause = true;
        props0.ext = true;
      }
      const _errs19 = errors;
      if (data0 !== null) {
        const err14 = { instancePath: instancePath + "/pointer", schemaPath: "#/properties/pointer/oneOf/1/type", keyword: "type", params: { type: "null" }, message: "must be null" };
        if (vErrors === null) {
          vErrors = [err14];
        } else {
          vErrors.push(err14);
        }
        errors++;
      }
      var _valid0 = _errs19 === errors;
      if (_valid0 && valid1) {
        valid1 = false;
        passing0 = [passing0, 1];
      } else {
        if (_valid0) {
          valid1 = true;
          passing0 = 1;
        }
      }
      if (!valid1) {
        const err15 = { instancePath: instancePath + "/pointer", schemaPath: "#/properties/pointer/oneOf", keyword: "oneOf", params: { passingSchemas: passing0 }, message: "must match exactly one schema in oneOf" };
        if (vErrors === null) {
          vErrors = [err15];
        } else {
          vErrors.push(err15);
        }
        errors++;
      } else {
        errors = _errs3;
        if (vErrors !== null) {
          if (_errs3) {
            vErrors.length = _errs3;
          } else {
            vErrors = null;
          }
        }
      }
    }
  } else {
    const err16 = { instancePath, schemaPath: "#/type", keyword: "type", params: { type: "object" }, message: "must be object" };
    if (vErrors === null) {
      vErrors = [err16];
    } else {
      vErrors.push(err16);
    }
    errors++;
  }
  validate21.errors = vErrors;
  return errors === 0;
}
validate21.evaluated = { "props": true, "dynamicProps": false, "dynamicItems": false };
exports.ApprovalConfirmInput = validate22;
var schema35 = { "$schema": "https://json-schema.org/draft/2020-12/schema", "$id": "ApprovalDecision.schema.json", "title": "ApprovalDecision", "description": "approval_draft\uC758 \uCD9C\uB825\uC774\uC790 approval_confirm\uC758 \uC785\uB825\xB7\uCD9C\uB825\uC774\uBA70 link_gate_decide\uC758 \uC785\uB825: \uBCF4\uB0B4\uB3C4 \uB418\uB294 \uACB0\uC815. REJECT\uBA74 \uC0AC\uC720\uAC00 \uC788\uACE0 APPROVE\uC5D0\uB294 \uC0AC\uC720\uAC00 \uC5C6\uB2E4.", "type": "object", "required": ["submissionId", "decision", "reportHash"], "properties": { "submissionId": { "type": "string", "minLength": 1 }, "decision": { "enum": ["APPROVE", "REJECT"] }, "reason": { "type": "string", "minLength": 1 }, "reportHash": { "type": "string", "pattern": "^sha256:[0-9a-f]{64}$" } }, "additionalProperties": false, "allOf": [{ "if": { "properties": { "decision": { "const": "REJECT" } }, "required": ["decision"] }, "then": { "required": ["reason"] } }, { "if": { "properties": { "decision": { "const": "APPROVE" } }, "required": ["decision"] }, "then": { "not": { "required": ["reason"] } } }] };
var pattern4 = new RegExp("^sha256:[0-9a-f]{64}$", "u");
function validate22(data, { instancePath = "", parentData, parentDataProperty, rootData = data, dynamicAnchors = {} } = {}) {
  ;
  let vErrors = null;
  let errors = 0;
  const evaluated0 = validate22.evaluated;
  if (evaluated0.dynamicProps) {
    evaluated0.props = void 0;
  }
  if (evaluated0.dynamicItems) {
    evaluated0.items = void 0;
  }
  if (data && typeof data == "object" && !Array.isArray(data)) {
    if (data.decision === void 0) {
      const err0 = { instancePath, schemaPath: "#/required", keyword: "required", params: { missingProperty: "decision" }, message: "must have required property 'decision'" };
      if (vErrors === null) {
        vErrors = [err0];
      } else {
        vErrors.push(err0);
      }
      errors++;
    }
    if (data.confirmText === void 0) {
      const err1 = { instancePath, schemaPath: "#/required", keyword: "required", params: { missingProperty: "confirmText" }, message: "must have required property 'confirmText'" };
      if (vErrors === null) {
        vErrors = [err1];
      } else {
        vErrors.push(err1);
      }
      errors++;
    }
    for (const key0 in data) {
      if (!(key0 === "decision" || key0 === "confirmText")) {
        const err2 = { instancePath, schemaPath: "#/additionalProperties", keyword: "additionalProperties", params: { additionalProperty: key0 }, message: "must NOT have additional properties" };
        if (vErrors === null) {
          vErrors = [err2];
        } else {
          vErrors.push(err2);
        }
        errors++;
      }
    }
    if (data.decision !== void 0) {
      let data0 = data.decision;
      const _errs6 = errors;
      let valid3 = true;
      const _errs7 = errors;
      if (data0 && typeof data0 == "object" && !Array.isArray(data0)) {
        let missing0;
        if (data0.decision === void 0 && (missing0 = "decision")) {
          const err3 = {};
          if (vErrors === null) {
            vErrors = [err3];
          } else {
            vErrors.push(err3);
          }
          errors++;
        } else {
          if (data0.decision !== void 0) {
            if ("REJECT" !== data0.decision) {
              const err4 = {};
              if (vErrors === null) {
                vErrors = [err4];
              } else {
                vErrors.push(err4);
              }
              errors++;
            }
          }
        }
      }
      var _valid0 = _errs7 === errors;
      errors = _errs6;
      if (vErrors !== null) {
        if (_errs6) {
          vErrors.length = _errs6;
        } else {
          vErrors = null;
        }
      }
      if (_valid0) {
        const _errs9 = errors;
        if (data0 && typeof data0 == "object" && !Array.isArray(data0)) {
          if (data0.reason === void 0) {
            const err5 = { instancePath: instancePath + "/decision", schemaPath: "ApprovalDecision.schema.json/allOf/0/then/required", keyword: "required", params: { missingProperty: "reason" }, message: "must have required property 'reason'" };
            if (vErrors === null) {
              vErrors = [err5];
            } else {
              vErrors.push(err5);
            }
            errors++;
          }
        }
        var _valid0 = _errs9 === errors;
        valid3 = _valid0;
      }
      if (!valid3) {
        const err6 = { instancePath: instancePath + "/decision", schemaPath: "ApprovalDecision.schema.json/allOf/0/if", keyword: "if", params: { failingKeyword: "then" }, message: 'must match "then" schema' };
        if (vErrors === null) {
          vErrors = [err6];
        } else {
          vErrors.push(err6);
        }
        errors++;
      }
      const _errs11 = errors;
      let valid5 = true;
      const _errs12 = errors;
      if (data0 && typeof data0 == "object" && !Array.isArray(data0)) {
        let missing1;
        if (data0.decision === void 0 && (missing1 = "decision")) {
          const err7 = {};
          if (vErrors === null) {
            vErrors = [err7];
          } else {
            vErrors.push(err7);
          }
          errors++;
        } else {
          if (data0.decision !== void 0) {
            if ("APPROVE" !== data0.decision) {
              const err8 = {};
              if (vErrors === null) {
                vErrors = [err8];
              } else {
                vErrors.push(err8);
              }
              errors++;
            }
          }
        }
      }
      var _valid1 = _errs12 === errors;
      errors = _errs11;
      if (vErrors !== null) {
        if (_errs11) {
          vErrors.length = _errs11;
        } else {
          vErrors = null;
        }
      }
      if (_valid1) {
        const _errs14 = errors;
        const _errs15 = errors;
        const _errs16 = errors;
        if (data0 && typeof data0 == "object" && !Array.isArray(data0)) {
          let missing2;
          if (data0.reason === void 0 && (missing2 = "reason")) {
            const err9 = {};
            if (vErrors === null) {
              vErrors = [err9];
            } else {
              vErrors.push(err9);
            }
            errors++;
          }
        }
        var valid7 = _errs16 === errors;
        if (valid7) {
          const err10 = { instancePath: instancePath + "/decision", schemaPath: "ApprovalDecision.schema.json/allOf/1/then/not", keyword: "not", params: {}, message: "must NOT be valid" };
          if (vErrors === null) {
            vErrors = [err10];
          } else {
            vErrors.push(err10);
          }
          errors++;
        } else {
          errors = _errs15;
          if (vErrors !== null) {
            if (_errs15) {
              vErrors.length = _errs15;
            } else {
              vErrors = null;
            }
          }
        }
        var _valid1 = _errs14 === errors;
        valid5 = _valid1;
      }
      if (!valid5) {
        const err11 = { instancePath: instancePath + "/decision", schemaPath: "ApprovalDecision.schema.json/allOf/1/if", keyword: "if", params: { failingKeyword: "then" }, message: 'must match "then" schema' };
        if (vErrors === null) {
          vErrors = [err11];
        } else {
          vErrors.push(err11);
        }
        errors++;
      }
      if (data0 && typeof data0 == "object" && !Array.isArray(data0)) {
        if (data0.submissionId === void 0) {
          const err12 = { instancePath: instancePath + "/decision", schemaPath: "ApprovalDecision.schema.json/required", keyword: "required", params: { missingProperty: "submissionId" }, message: "must have required property 'submissionId'" };
          if (vErrors === null) {
            vErrors = [err12];
          } else {
            vErrors.push(err12);
          }
          errors++;
        }
        if (data0.decision === void 0) {
          const err13 = { instancePath: instancePath + "/decision", schemaPath: "ApprovalDecision.schema.json/required", keyword: "required", params: { missingProperty: "decision" }, message: "must have required property 'decision'" };
          if (vErrors === null) {
            vErrors = [err13];
          } else {
            vErrors.push(err13);
          }
          errors++;
        }
        if (data0.reportHash === void 0) {
          const err14 = { instancePath: instancePath + "/decision", schemaPath: "ApprovalDecision.schema.json/required", keyword: "required", params: { missingProperty: "reportHash" }, message: "must have required property 'reportHash'" };
          if (vErrors === null) {
            vErrors = [err14];
          } else {
            vErrors.push(err14);
          }
          errors++;
        }
        for (const key1 in data0) {
          if (!(key1 === "submissionId" || key1 === "decision" || key1 === "reason" || key1 === "reportHash")) {
            const err15 = { instancePath: instancePath + "/decision", schemaPath: "ApprovalDecision.schema.json/additionalProperties", keyword: "additionalProperties", params: { additionalProperty: key1 }, message: "must NOT have additional properties" };
            if (vErrors === null) {
              vErrors = [err15];
            } else {
              vErrors.push(err15);
            }
            errors++;
          }
        }
        if (data0.submissionId !== void 0) {
          let data3 = data0.submissionId;
          if (typeof data3 === "string") {
            if (func1(data3) < 1) {
              const err16 = { instancePath: instancePath + "/decision/submissionId", schemaPath: "ApprovalDecision.schema.json/properties/submissionId/minLength", keyword: "minLength", params: { limit: 1 }, message: "must NOT have fewer than 1 characters" };
              if (vErrors === null) {
                vErrors = [err16];
              } else {
                vErrors.push(err16);
              }
              errors++;
            }
          } else {
            const err17 = { instancePath: instancePath + "/decision/submissionId", schemaPath: "ApprovalDecision.schema.json/properties/submissionId/type", keyword: "type", params: { type: "string" }, message: "must be string" };
            if (vErrors === null) {
              vErrors = [err17];
            } else {
              vErrors.push(err17);
            }
            errors++;
          }
        }
        if (data0.decision !== void 0) {
          let data4 = data0.decision;
          if (!(data4 === "APPROVE" || data4 === "REJECT")) {
            const err18 = { instancePath: instancePath + "/decision/decision", schemaPath: "ApprovalDecision.schema.json/properties/decision/enum", keyword: "enum", params: { allowedValues: schema35.properties.decision.enum }, message: "must be equal to one of the allowed values" };
            if (vErrors === null) {
              vErrors = [err18];
            } else {
              vErrors.push(err18);
            }
            errors++;
          }
        }
        if (data0.reason !== void 0) {
          let data5 = data0.reason;
          if (typeof data5 === "string") {
            if (func1(data5) < 1) {
              const err19 = { instancePath: instancePath + "/decision/reason", schemaPath: "ApprovalDecision.schema.json/properties/reason/minLength", keyword: "minLength", params: { limit: 1 }, message: "must NOT have fewer than 1 characters" };
              if (vErrors === null) {
                vErrors = [err19];
              } else {
                vErrors.push(err19);
              }
              errors++;
            }
          } else {
            const err20 = { instancePath: instancePath + "/decision/reason", schemaPath: "ApprovalDecision.schema.json/properties/reason/type", keyword: "type", params: { type: "string" }, message: "must be string" };
            if (vErrors === null) {
              vErrors = [err20];
            } else {
              vErrors.push(err20);
            }
            errors++;
          }
        }
        if (data0.reportHash !== void 0) {
          let data6 = data0.reportHash;
          if (typeof data6 === "string") {
            if (!pattern4.test(data6)) {
              const err21 = { instancePath: instancePath + "/decision/reportHash", schemaPath: "ApprovalDecision.schema.json/properties/reportHash/pattern", keyword: "pattern", params: { pattern: "^sha256:[0-9a-f]{64}$" }, message: 'must match pattern "^sha256:[0-9a-f]{64}$"' };
              if (vErrors === null) {
                vErrors = [err21];
              } else {
                vErrors.push(err21);
              }
              errors++;
            }
          } else {
            const err22 = { instancePath: instancePath + "/decision/reportHash", schemaPath: "ApprovalDecision.schema.json/properties/reportHash/type", keyword: "type", params: { type: "string" }, message: "must be string" };
            if (vErrors === null) {
              vErrors = [err22];
            } else {
              vErrors.push(err22);
            }
            errors++;
          }
        }
      } else {
        const err23 = { instancePath: instancePath + "/decision", schemaPath: "ApprovalDecision.schema.json/type", keyword: "type", params: { type: "object" }, message: "must be object" };
        if (vErrors === null) {
          vErrors = [err23];
        } else {
          vErrors.push(err23);
        }
        errors++;
      }
    }
    if (data.confirmText !== void 0) {
      if (typeof data.confirmText !== "string") {
        const err24 = { instancePath: instancePath + "/confirmText", schemaPath: "#/properties/confirmText/type", keyword: "type", params: { type: "string" }, message: "must be string" };
        if (vErrors === null) {
          vErrors = [err24];
        } else {
          vErrors.push(err24);
        }
        errors++;
      }
    }
  } else {
    const err25 = { instancePath, schemaPath: "#/type", keyword: "type", params: { type: "object" }, message: "must be object" };
    if (vErrors === null) {
      vErrors = [err25];
    } else {
      vErrors.push(err25);
    }
    errors++;
  }
  validate22.errors = vErrors;
  return errors === 0;
}
validate22.evaluated = { "props": true, "dynamicProps": false, "dynamicItems": false };
exports.ApprovalDecision = validate23;
function validate23(data, { instancePath = "", parentData, parentDataProperty, rootData = data, dynamicAnchors = {} } = {}) {
  ;
  let vErrors = null;
  let errors = 0;
  const evaluated0 = validate23.evaluated;
  if (evaluated0.dynamicProps) {
    evaluated0.props = void 0;
  }
  if (evaluated0.dynamicItems) {
    evaluated0.items = void 0;
  }
  const _errs2 = errors;
  let valid1 = true;
  const _errs3 = errors;
  if (data && typeof data == "object" && !Array.isArray(data)) {
    let missing0;
    if (data.decision === void 0 && (missing0 = "decision")) {
      const err0 = {};
      if (vErrors === null) {
        vErrors = [err0];
      } else {
        vErrors.push(err0);
      }
      errors++;
    } else {
      if (data.decision !== void 0) {
        if ("REJECT" !== data.decision) {
          const err1 = {};
          if (vErrors === null) {
            vErrors = [err1];
          } else {
            vErrors.push(err1);
          }
          errors++;
        }
      }
    }
  }
  var _valid0 = _errs3 === errors;
  errors = _errs2;
  if (vErrors !== null) {
    if (_errs2) {
      vErrors.length = _errs2;
    } else {
      vErrors = null;
    }
  }
  if (_valid0) {
    const _errs5 = errors;
    if (data && typeof data == "object" && !Array.isArray(data)) {
      if (data.reason === void 0) {
        const err2 = { instancePath, schemaPath: "#/allOf/0/then/required", keyword: "required", params: { missingProperty: "reason" }, message: "must have required property 'reason'" };
        if (vErrors === null) {
          vErrors = [err2];
        } else {
          vErrors.push(err2);
        }
        errors++;
      }
    }
    var _valid0 = _errs5 === errors;
    valid1 = _valid0;
  }
  if (!valid1) {
    const err3 = { instancePath, schemaPath: "#/allOf/0/if", keyword: "if", params: { failingKeyword: "then" }, message: 'must match "then" schema' };
    if (vErrors === null) {
      vErrors = [err3];
    } else {
      vErrors.push(err3);
    }
    errors++;
  }
  const _errs7 = errors;
  let valid3 = true;
  const _errs8 = errors;
  if (data && typeof data == "object" && !Array.isArray(data)) {
    let missing1;
    if (data.decision === void 0 && (missing1 = "decision")) {
      const err4 = {};
      if (vErrors === null) {
        vErrors = [err4];
      } else {
        vErrors.push(err4);
      }
      errors++;
    } else {
      if (data.decision !== void 0) {
        if ("APPROVE" !== data.decision) {
          const err5 = {};
          if (vErrors === null) {
            vErrors = [err5];
          } else {
            vErrors.push(err5);
          }
          errors++;
        }
      }
    }
  }
  var _valid1 = _errs8 === errors;
  errors = _errs7;
  if (vErrors !== null) {
    if (_errs7) {
      vErrors.length = _errs7;
    } else {
      vErrors = null;
    }
  }
  if (_valid1) {
    const _errs10 = errors;
    const _errs11 = errors;
    const _errs12 = errors;
    if (data && typeof data == "object" && !Array.isArray(data)) {
      let missing2;
      if (data.reason === void 0 && (missing2 = "reason")) {
        const err6 = {};
        if (vErrors === null) {
          vErrors = [err6];
        } else {
          vErrors.push(err6);
        }
        errors++;
      }
    }
    var valid5 = _errs12 === errors;
    if (valid5) {
      const err7 = { instancePath, schemaPath: "#/allOf/1/then/not", keyword: "not", params: {}, message: "must NOT be valid" };
      if (vErrors === null) {
        vErrors = [err7];
      } else {
        vErrors.push(err7);
      }
      errors++;
    } else {
      errors = _errs11;
      if (vErrors !== null) {
        if (_errs11) {
          vErrors.length = _errs11;
        } else {
          vErrors = null;
        }
      }
    }
    var _valid1 = _errs10 === errors;
    valid3 = _valid1;
  }
  if (!valid3) {
    const err8 = { instancePath, schemaPath: "#/allOf/1/if", keyword: "if", params: { failingKeyword: "then" }, message: 'must match "then" schema' };
    if (vErrors === null) {
      vErrors = [err8];
    } else {
      vErrors.push(err8);
    }
    errors++;
  }
  if (data && typeof data == "object" && !Array.isArray(data)) {
    if (data.submissionId === void 0) {
      const err9 = { instancePath, schemaPath: "#/required", keyword: "required", params: { missingProperty: "submissionId" }, message: "must have required property 'submissionId'" };
      if (vErrors === null) {
        vErrors = [err9];
      } else {
        vErrors.push(err9);
      }
      errors++;
    }
    if (data.decision === void 0) {
      const err10 = { instancePath, schemaPath: "#/required", keyword: "required", params: { missingProperty: "decision" }, message: "must have required property 'decision'" };
      if (vErrors === null) {
        vErrors = [err10];
      } else {
        vErrors.push(err10);
      }
      errors++;
    }
    if (data.reportHash === void 0) {
      const err11 = { instancePath, schemaPath: "#/required", keyword: "required", params: { missingProperty: "reportHash" }, message: "must have required property 'reportHash'" };
      if (vErrors === null) {
        vErrors = [err11];
      } else {
        vErrors.push(err11);
      }
      errors++;
    }
    for (const key0 in data) {
      if (!(key0 === "submissionId" || key0 === "decision" || key0 === "reason" || key0 === "reportHash")) {
        const err12 = { instancePath, schemaPath: "#/additionalProperties", keyword: "additionalProperties", params: { additionalProperty: key0 }, message: "must NOT have additional properties" };
        if (vErrors === null) {
          vErrors = [err12];
        } else {
          vErrors.push(err12);
        }
        errors++;
      }
    }
    if (data.submissionId !== void 0) {
      let data2 = data.submissionId;
      if (typeof data2 === "string") {
        if (func1(data2) < 1) {
          const err13 = { instancePath: instancePath + "/submissionId", schemaPath: "#/properties/submissionId/minLength", keyword: "minLength", params: { limit: 1 }, message: "must NOT have fewer than 1 characters" };
          if (vErrors === null) {
            vErrors = [err13];
          } else {
            vErrors.push(err13);
          }
          errors++;
        }
      } else {
        const err14 = { instancePath: instancePath + "/submissionId", schemaPath: "#/properties/submissionId/type", keyword: "type", params: { type: "string" }, message: "must be string" };
        if (vErrors === null) {
          vErrors = [err14];
        } else {
          vErrors.push(err14);
        }
        errors++;
      }
    }
    if (data.decision !== void 0) {
      let data3 = data.decision;
      if (!(data3 === "APPROVE" || data3 === "REJECT")) {
        const err15 = { instancePath: instancePath + "/decision", schemaPath: "#/properties/decision/enum", keyword: "enum", params: { allowedValues: schema35.properties.decision.enum }, message: "must be equal to one of the allowed values" };
        if (vErrors === null) {
          vErrors = [err15];
        } else {
          vErrors.push(err15);
        }
        errors++;
      }
    }
    if (data.reason !== void 0) {
      let data4 = data.reason;
      if (typeof data4 === "string") {
        if (func1(data4) < 1) {
          const err16 = { instancePath: instancePath + "/reason", schemaPath: "#/properties/reason/minLength", keyword: "minLength", params: { limit: 1 }, message: "must NOT have fewer than 1 characters" };
          if (vErrors === null) {
            vErrors = [err16];
          } else {
            vErrors.push(err16);
          }
          errors++;
        }
      } else {
        const err17 = { instancePath: instancePath + "/reason", schemaPath: "#/properties/reason/type", keyword: "type", params: { type: "string" }, message: "must be string" };
        if (vErrors === null) {
          vErrors = [err17];
        } else {
          vErrors.push(err17);
        }
        errors++;
      }
    }
    if (data.reportHash !== void 0) {
      let data5 = data.reportHash;
      if (typeof data5 === "string") {
        if (!pattern4.test(data5)) {
          const err18 = { instancePath: instancePath + "/reportHash", schemaPath: "#/properties/reportHash/pattern", keyword: "pattern", params: { pattern: "^sha256:[0-9a-f]{64}$" }, message: 'must match pattern "^sha256:[0-9a-f]{64}$"' };
          if (vErrors === null) {
            vErrors = [err18];
          } else {
            vErrors.push(err18);
          }
          errors++;
        }
      } else {
        const err19 = { instancePath: instancePath + "/reportHash", schemaPath: "#/properties/reportHash/type", keyword: "type", params: { type: "string" }, message: "must be string" };
        if (vErrors === null) {
          vErrors = [err19];
        } else {
          vErrors.push(err19);
        }
        errors++;
      }
    }
  } else {
    const err20 = { instancePath, schemaPath: "#/type", keyword: "type", params: { type: "object" }, message: "must be object" };
    if (vErrors === null) {
      vErrors = [err20];
    } else {
      vErrors.push(err20);
    }
    errors++;
  }
  validate23.errors = vErrors;
  return errors === 0;
}
validate23.evaluated = { "props": true, "dynamicProps": false, "dynamicItems": false };
exports.ApprovalDraft = validate24;
var schema37 = { "$schema": "https://json-schema.org/draft/2020-12/schema", "$id": "ApprovalDraft.schema.json", "title": "ApprovalDraft", "description": "approval_draft\uC758 \uC785\uB825: \uC2B9\uC778\uC790\uAC00 \uBC84\uD2BC\uC744 \uB204\uB978 \uC21C\uAC04\uC758 \uD3FC. \uBC18\uB824\uC5D0\uB294 \uC0AC\uC720\uAC00 \uD544\uC218(\uACF5\uBC31\uB9CC\uC740 \uBE44\uC5B4 \uC788\uB294 \uAC83).", "type": "object", "required": ["submissionId", "decision", "reason", "reportHash"], "properties": { "submissionId": { "type": "string", "minLength": 1 }, "decision": { "enum": ["APPROVE", "REJECT"] }, "reason": { "type": "string" }, "reportHash": { "type": "string", "pattern": "^sha256:[0-9a-f]{64}$" } }, "additionalProperties": false, "if": { "properties": { "decision": { "const": "REJECT" } }, "required": ["decision"] }, "then": { "properties": { "reason": { "pattern": "\\S" } } } };
var pattern6 = new RegExp("\\S", "u");
function validate24(data, { instancePath = "", parentData, parentDataProperty, rootData = data, dynamicAnchors = {} } = {}) {
  ;
  let vErrors = null;
  let errors = 0;
  const evaluated0 = validate24.evaluated;
  if (evaluated0.dynamicProps) {
    evaluated0.props = void 0;
  }
  if (evaluated0.dynamicItems) {
    evaluated0.items = void 0;
  }
  const _errs1 = errors;
  let valid0 = true;
  const _errs2 = errors;
  if (data && typeof data == "object" && !Array.isArray(data)) {
    let missing0;
    if (data.decision === void 0 && (missing0 = "decision")) {
      const err0 = {};
      if (vErrors === null) {
        vErrors = [err0];
      } else {
        vErrors.push(err0);
      }
      errors++;
    } else {
      if (data.decision !== void 0) {
        if ("REJECT" !== data.decision) {
          const err1 = {};
          if (vErrors === null) {
            vErrors = [err1];
          } else {
            vErrors.push(err1);
          }
          errors++;
        }
      }
    }
  }
  var _valid0 = _errs2 === errors;
  errors = _errs1;
  if (vErrors !== null) {
    if (_errs1) {
      vErrors.length = _errs1;
    } else {
      vErrors = null;
    }
  }
  if (_valid0) {
    const _errs4 = errors;
    if (data && typeof data == "object" && !Array.isArray(data)) {
      if (data.reason !== void 0) {
        let data1 = data.reason;
        if (typeof data1 === "string") {
          if (!pattern6.test(data1)) {
            const err2 = { instancePath: instancePath + "/reason", schemaPath: "#/then/properties/reason/pattern", keyword: "pattern", params: { pattern: "\\S" }, message: 'must match pattern "\\S"' };
            if (vErrors === null) {
              vErrors = [err2];
            } else {
              vErrors.push(err2);
            }
            errors++;
          }
        }
      }
    }
    var _valid0 = _errs4 === errors;
    valid0 = _valid0;
    if (valid0) {
      var props0 = {};
      props0.reason = true;
      props0.decision = true;
    }
  }
  if (!valid0) {
    const err3 = { instancePath, schemaPath: "#/if", keyword: "if", params: { failingKeyword: "then" }, message: 'must match "then" schema' };
    if (vErrors === null) {
      vErrors = [err3];
    } else {
      vErrors.push(err3);
    }
    errors++;
  }
  if (data && typeof data == "object" && !Array.isArray(data)) {
    if (data.submissionId === void 0) {
      const err4 = { instancePath, schemaPath: "#/required", keyword: "required", params: { missingProperty: "submissionId" }, message: "must have required property 'submissionId'" };
      if (vErrors === null) {
        vErrors = [err4];
      } else {
        vErrors.push(err4);
      }
      errors++;
    }
    if (data.decision === void 0) {
      const err5 = { instancePath, schemaPath: "#/required", keyword: "required", params: { missingProperty: "decision" }, message: "must have required property 'decision'" };
      if (vErrors === null) {
        vErrors = [err5];
      } else {
        vErrors.push(err5);
      }
      errors++;
    }
    if (data.reason === void 0) {
      const err6 = { instancePath, schemaPath: "#/required", keyword: "required", params: { missingProperty: "reason" }, message: "must have required property 'reason'" };
      if (vErrors === null) {
        vErrors = [err6];
      } else {
        vErrors.push(err6);
      }
      errors++;
    }
    if (data.reportHash === void 0) {
      const err7 = { instancePath, schemaPath: "#/required", keyword: "required", params: { missingProperty: "reportHash" }, message: "must have required property 'reportHash'" };
      if (vErrors === null) {
        vErrors = [err7];
      } else {
        vErrors.push(err7);
      }
      errors++;
    }
    for (const key0 in data) {
      if (!(key0 === "submissionId" || key0 === "decision" || key0 === "reason" || key0 === "reportHash")) {
        const err8 = { instancePath, schemaPath: "#/additionalProperties", keyword: "additionalProperties", params: { additionalProperty: key0 }, message: "must NOT have additional properties" };
        if (vErrors === null) {
          vErrors = [err8];
        } else {
          vErrors.push(err8);
        }
        errors++;
      }
    }
    if (data.submissionId !== void 0) {
      let data2 = data.submissionId;
      if (typeof data2 === "string") {
        if (func1(data2) < 1) {
          const err9 = { instancePath: instancePath + "/submissionId", schemaPath: "#/properties/submissionId/minLength", keyword: "minLength", params: { limit: 1 }, message: "must NOT have fewer than 1 characters" };
          if (vErrors === null) {
            vErrors = [err9];
          } else {
            vErrors.push(err9);
          }
          errors++;
        }
      } else {
        const err10 = { instancePath: instancePath + "/submissionId", schemaPath: "#/properties/submissionId/type", keyword: "type", params: { type: "string" }, message: "must be string" };
        if (vErrors === null) {
          vErrors = [err10];
        } else {
          vErrors.push(err10);
        }
        errors++;
      }
    }
    if (data.decision !== void 0) {
      let data3 = data.decision;
      if (!(data3 === "APPROVE" || data3 === "REJECT")) {
        const err11 = { instancePath: instancePath + "/decision", schemaPath: "#/properties/decision/enum", keyword: "enum", params: { allowedValues: schema37.properties.decision.enum }, message: "must be equal to one of the allowed values" };
        if (vErrors === null) {
          vErrors = [err11];
        } else {
          vErrors.push(err11);
        }
        errors++;
      }
    }
    if (data.reason !== void 0) {
      if (typeof data.reason !== "string") {
        const err12 = { instancePath: instancePath + "/reason", schemaPath: "#/properties/reason/type", keyword: "type", params: { type: "string" }, message: "must be string" };
        if (vErrors === null) {
          vErrors = [err12];
        } else {
          vErrors.push(err12);
        }
        errors++;
      }
    }
    if (data.reportHash !== void 0) {
      let data5 = data.reportHash;
      if (typeof data5 === "string") {
        if (!pattern4.test(data5)) {
          const err13 = { instancePath: instancePath + "/reportHash", schemaPath: "#/properties/reportHash/pattern", keyword: "pattern", params: { pattern: "^sha256:[0-9a-f]{64}$" }, message: 'must match pattern "^sha256:[0-9a-f]{64}$"' };
          if (vErrors === null) {
            vErrors = [err13];
          } else {
            vErrors.push(err13);
          }
          errors++;
        }
      } else {
        const err14 = { instancePath: instancePath + "/reportHash", schemaPath: "#/properties/reportHash/type", keyword: "type", params: { type: "string" }, message: "must be string" };
        if (vErrors === null) {
          vErrors = [err14];
        } else {
          vErrors.push(err14);
        }
        errors++;
      }
    }
  } else {
    const err15 = { instancePath, schemaPath: "#/type", keyword: "type", params: { type: "object" }, message: "must be object" };
    if (vErrors === null) {
      vErrors = [err15];
    } else {
      vErrors.push(err15);
    }
    errors++;
  }
  validate24.errors = vErrors;
  return errors === 0;
}
validate24.evaluated = { "props": true, "dynamicProps": false, "dynamicItems": false };
exports.ApprovalFailure = validate25;
var schema38 = { "$schema": "https://json-schema.org/draft/2020-12/schema", "$id": "ApprovalFailure.schema.json", "title": "ApprovalFailure", "description": "approval_failure\uC758 \uCD9C\uB825. reload_report\uB294 \uBCF4\uACE0\uC11C\uB97C \uC0C8\uB85C \uBD88\uB7EC\uC624\uACE0 \uB2E4\uC2DC \uACB0\uC815\uD558\uAC8C \uD55C\uB2E4, back_to_report\uB294 \uBCF4\uACE0\uC11C \uD654\uBA74\uC5D0 \uC54C\uB9BC\uC744 \uBCF4\uC774\uACE0 \uBA38\uBB38\uB2E4, fail\uC740 \uC624\uB958 \uD654\uBA74.", "type": "object", "required": ["action"], "properties": { "action": { "enum": ["reload_report", "back_to_report", "fail"] }, "notice": { "type": "object", "required": ["kind", "text"], "properties": { "kind": { "enum": ["stale", "badresponse", "conflict", "denied", "retry", "invalid"] }, "text": { "type": "string", "minLength": 1 } }, "additionalProperties": false }, "errorText": { "type": "string", "minLength": 1 } }, "additionalProperties": false, "allOf": [{ "if": { "properties": { "action": { "const": "fail" } }, "required": ["action"] }, "then": { "required": ["errorText"] }, "else": { "required": ["notice"] } }] };
function validate25(data, { instancePath = "", parentData, parentDataProperty, rootData = data, dynamicAnchors = {} } = {}) {
  ;
  let vErrors = null;
  let errors = 0;
  const evaluated0 = validate25.evaluated;
  if (evaluated0.dynamicProps) {
    evaluated0.props = void 0;
  }
  if (evaluated0.dynamicItems) {
    evaluated0.items = void 0;
  }
  const _errs2 = errors;
  let valid1 = true;
  const _errs3 = errors;
  if (data && typeof data == "object" && !Array.isArray(data)) {
    let missing0;
    if (data.action === void 0 && (missing0 = "action")) {
      const err0 = {};
      if (vErrors === null) {
        vErrors = [err0];
      } else {
        vErrors.push(err0);
      }
      errors++;
    } else {
      if (data.action !== void 0) {
        if ("fail" !== data.action) {
          const err1 = {};
          if (vErrors === null) {
            vErrors = [err1];
          } else {
            vErrors.push(err1);
          }
          errors++;
        }
      }
    }
  }
  var _valid0 = _errs3 === errors;
  errors = _errs2;
  if (vErrors !== null) {
    if (_errs2) {
      vErrors.length = _errs2;
    } else {
      vErrors = null;
    }
  }
  let ifClause0;
  if (_valid0) {
    const _errs5 = errors;
    if (data && typeof data == "object" && !Array.isArray(data)) {
      if (data.errorText === void 0) {
        const err2 = { instancePath, schemaPath: "#/allOf/0/then/required", keyword: "required", params: { missingProperty: "errorText" }, message: "must have required property 'errorText'" };
        if (vErrors === null) {
          vErrors = [err2];
        } else {
          vErrors.push(err2);
        }
        errors++;
      }
    }
    var _valid0 = _errs5 === errors;
    valid1 = _valid0;
    ifClause0 = "then";
  } else {
    const _errs6 = errors;
    if (data && typeof data == "object" && !Array.isArray(data)) {
      if (data.notice === void 0) {
        const err3 = { instancePath, schemaPath: "#/allOf/0/else/required", keyword: "required", params: { missingProperty: "notice" }, message: "must have required property 'notice'" };
        if (vErrors === null) {
          vErrors = [err3];
        } else {
          vErrors.push(err3);
        }
        errors++;
      }
    }
    var _valid0 = _errs6 === errors;
    valid1 = _valid0;
    ifClause0 = "else";
  }
  if (!valid1) {
    const err4 = { instancePath, schemaPath: "#/allOf/0/if", keyword: "if", params: { failingKeyword: ifClause0 }, message: 'must match "' + ifClause0 + '" schema' };
    if (vErrors === null) {
      vErrors = [err4];
    } else {
      vErrors.push(err4);
    }
    errors++;
  }
  if (data && typeof data == "object" && !Array.isArray(data)) {
    if (data.action === void 0) {
      const err5 = { instancePath, schemaPath: "#/required", keyword: "required", params: { missingProperty: "action" }, message: "must have required property 'action'" };
      if (vErrors === null) {
        vErrors = [err5];
      } else {
        vErrors.push(err5);
      }
      errors++;
    }
    for (const key0 in data) {
      if (!(key0 === "action" || key0 === "notice" || key0 === "errorText")) {
        const err6 = { instancePath, schemaPath: "#/additionalProperties", keyword: "additionalProperties", params: { additionalProperty: key0 }, message: "must NOT have additional properties" };
        if (vErrors === null) {
          vErrors = [err6];
        } else {
          vErrors.push(err6);
        }
        errors++;
      }
    }
    if (data.action !== void 0) {
      let data1 = data.action;
      if (!(data1 === "reload_report" || data1 === "back_to_report" || data1 === "fail")) {
        const err7 = { instancePath: instancePath + "/action", schemaPath: "#/properties/action/enum", keyword: "enum", params: { allowedValues: schema38.properties.action.enum }, message: "must be equal to one of the allowed values" };
        if (vErrors === null) {
          vErrors = [err7];
        } else {
          vErrors.push(err7);
        }
        errors++;
      }
    }
    if (data.notice !== void 0) {
      let data2 = data.notice;
      if (data2 && typeof data2 == "object" && !Array.isArray(data2)) {
        if (data2.kind === void 0) {
          const err8 = { instancePath: instancePath + "/notice", schemaPath: "#/properties/notice/required", keyword: "required", params: { missingProperty: "kind" }, message: "must have required property 'kind'" };
          if (vErrors === null) {
            vErrors = [err8];
          } else {
            vErrors.push(err8);
          }
          errors++;
        }
        if (data2.text === void 0) {
          const err9 = { instancePath: instancePath + "/notice", schemaPath: "#/properties/notice/required", keyword: "required", params: { missingProperty: "text" }, message: "must have required property 'text'" };
          if (vErrors === null) {
            vErrors = [err9];
          } else {
            vErrors.push(err9);
          }
          errors++;
        }
        for (const key1 in data2) {
          if (!(key1 === "kind" || key1 === "text")) {
            const err10 = { instancePath: instancePath + "/notice", schemaPath: "#/properties/notice/additionalProperties", keyword: "additionalProperties", params: { additionalProperty: key1 }, message: "must NOT have additional properties" };
            if (vErrors === null) {
              vErrors = [err10];
            } else {
              vErrors.push(err10);
            }
            errors++;
          }
        }
        if (data2.kind !== void 0) {
          let data3 = data2.kind;
          if (!(data3 === "stale" || data3 === "badresponse" || data3 === "conflict" || data3 === "denied" || data3 === "retry" || data3 === "invalid")) {
            const err11 = { instancePath: instancePath + "/notice/kind", schemaPath: "#/properties/notice/properties/kind/enum", keyword: "enum", params: { allowedValues: schema38.properties.notice.properties.kind.enum }, message: "must be equal to one of the allowed values" };
            if (vErrors === null) {
              vErrors = [err11];
            } else {
              vErrors.push(err11);
            }
            errors++;
          }
        }
        if (data2.text !== void 0) {
          let data4 = data2.text;
          if (typeof data4 === "string") {
            if (func1(data4) < 1) {
              const err12 = { instancePath: instancePath + "/notice/text", schemaPath: "#/properties/notice/properties/text/minLength", keyword: "minLength", params: { limit: 1 }, message: "must NOT have fewer than 1 characters" };
              if (vErrors === null) {
                vErrors = [err12];
              } else {
                vErrors.push(err12);
              }
              errors++;
            }
          } else {
            const err13 = { instancePath: instancePath + "/notice/text", schemaPath: "#/properties/notice/properties/text/type", keyword: "type", params: { type: "string" }, message: "must be string" };
            if (vErrors === null) {
              vErrors = [err13];
            } else {
              vErrors.push(err13);
            }
            errors++;
          }
        }
      } else {
        const err14 = { instancePath: instancePath + "/notice", schemaPath: "#/properties/notice/type", keyword: "type", params: { type: "object" }, message: "must be object" };
        if (vErrors === null) {
          vErrors = [err14];
        } else {
          vErrors.push(err14);
        }
        errors++;
      }
    }
    if (data.errorText !== void 0) {
      let data5 = data.errorText;
      if (typeof data5 === "string") {
        if (func1(data5) < 1) {
          const err15 = { instancePath: instancePath + "/errorText", schemaPath: "#/properties/errorText/minLength", keyword: "minLength", params: { limit: 1 }, message: "must NOT have fewer than 1 characters" };
          if (vErrors === null) {
            vErrors = [err15];
          } else {
            vErrors.push(err15);
          }
          errors++;
        }
      } else {
        const err16 = { instancePath: instancePath + "/errorText", schemaPath: "#/properties/errorText/type", keyword: "type", params: { type: "string" }, message: "must be string" };
        if (vErrors === null) {
          vErrors = [err16];
        } else {
          vErrors.push(err16);
        }
        errors++;
      }
    }
  } else {
    const err17 = { instancePath, schemaPath: "#/type", keyword: "type", params: { type: "object" }, message: "must be object" };
    if (vErrors === null) {
      vErrors = [err17];
    } else {
      vErrors.push(err17);
    }
    errors++;
  }
  validate25.errors = vErrors;
  return errors === 0;
}
validate25.evaluated = { "props": true, "dynamicProps": false, "dynamicItems": false };
exports.ApprovalFailureInput = validate26;
var schema39 = { "$schema": "https://json-schema.org/draft/2020-12/schema", "$id": "ApprovalFailureInput.schema.json", "title": "ApprovalFailureInput", "description": "approval_failure\uC758 \uC785\uB825: \uC5B4\uB290 \uC77C\uC744 \uD558\uB2E4(load \uBD88\uB7EC\uC624\uAE30, decide \uACB0\uC815 \uC804\uC1A1) \uB09C \uC624\uB958.", "type": "object", "required": ["context", "error"], "properties": { "context": { "enum": ["load", "decide"] }, "error": { "$ref": "ErrorInfo.schema.json" } }, "additionalProperties": false };
var schema40 = { "$schema": "https://json-schema.org/draft/2020-12/schema", "$id": "ErrorInfo.schema.json", "title": "ErrorInfo", "description": "\uC774 \uC601\uC5ED \uC548\uC5D0\uC11C \uC624\uB958\uB97C \uB098\uB974\uB294 \uBAA8\uC591. link_* \uCEF4\uD3EC\uB10C\uD2B8\uAC00 BoundaryError(HTTP \uC624\uB958 \uBCF8\uBB38)\uB098 \uC804\uC1A1 \uC2E4\uD328\uB97C \uC774 \uBAA8\uC591\uC73C\uB85C \uBC14\uAFBC\uB2E4. \uC5C5\uBB34 \uCEF4\uD3EC\uB10C\uD2B8\uB294 HTTP\uB97C \uBAA8\uB974\uBBC0\uB85C \uC774 \uBAA8\uC591\uB9CC \uBCF8\uB2E4. NON_API\uB294 HTTP\uC640 \uBB34\uAD00\uD55C \uC608\uAE30\uCE58 \uBABB\uD55C \uC608\uC678.", "type": "object", "required": ["kind", "status", "message", "retryable"], "properties": { "kind": { "enum": ["UNAUTHENTICATED", "ACCOUNT_PENDING", "STALE_REPORT", "ALREADY_DECIDED", "NOT_FOUND", "PERMISSION_DENIED", "INVALID_RECORD", "CONFLICT", "FAILED_PRECONDITION", "UNAVAILABLE", "BAD_RESPONSE", "UNKNOWN", "NON_API"] }, "status": { "type": "integer", "minimum": 0, "maximum": 599 }, "message": { "type": "string" }, "retryable": { "type": "boolean" } }, "additionalProperties": false };
function validate26(data, { instancePath = "", parentData, parentDataProperty, rootData = data, dynamicAnchors = {} } = {}) {
  ;
  let vErrors = null;
  let errors = 0;
  const evaluated0 = validate26.evaluated;
  if (evaluated0.dynamicProps) {
    evaluated0.props = void 0;
  }
  if (evaluated0.dynamicItems) {
    evaluated0.items = void 0;
  }
  if (data && typeof data == "object" && !Array.isArray(data)) {
    if (data.context === void 0) {
      const err0 = { instancePath, schemaPath: "#/required", keyword: "required", params: { missingProperty: "context" }, message: "must have required property 'context'" };
      if (vErrors === null) {
        vErrors = [err0];
      } else {
        vErrors.push(err0);
      }
      errors++;
    }
    if (data.error === void 0) {
      const err1 = { instancePath, schemaPath: "#/required", keyword: "required", params: { missingProperty: "error" }, message: "must have required property 'error'" };
      if (vErrors === null) {
        vErrors = [err1];
      } else {
        vErrors.push(err1);
      }
      errors++;
    }
    for (const key0 in data) {
      if (!(key0 === "context" || key0 === "error")) {
        const err2 = { instancePath, schemaPath: "#/additionalProperties", keyword: "additionalProperties", params: { additionalProperty: key0 }, message: "must NOT have additional properties" };
        if (vErrors === null) {
          vErrors = [err2];
        } else {
          vErrors.push(err2);
        }
        errors++;
      }
    }
    if (data.context !== void 0) {
      let data0 = data.context;
      if (!(data0 === "load" || data0 === "decide")) {
        const err3 = { instancePath: instancePath + "/context", schemaPath: "#/properties/context/enum", keyword: "enum", params: { allowedValues: schema39.properties.context.enum }, message: "must be equal to one of the allowed values" };
        if (vErrors === null) {
          vErrors = [err3];
        } else {
          vErrors.push(err3);
        }
        errors++;
      }
    }
    if (data.error !== void 0) {
      let data1 = data.error;
      if (data1 && typeof data1 == "object" && !Array.isArray(data1)) {
        if (data1.kind === void 0) {
          const err4 = { instancePath: instancePath + "/error", schemaPath: "ErrorInfo.schema.json/required", keyword: "required", params: { missingProperty: "kind" }, message: "must have required property 'kind'" };
          if (vErrors === null) {
            vErrors = [err4];
          } else {
            vErrors.push(err4);
          }
          errors++;
        }
        if (data1.status === void 0) {
          const err5 = { instancePath: instancePath + "/error", schemaPath: "ErrorInfo.schema.json/required", keyword: "required", params: { missingProperty: "status" }, message: "must have required property 'status'" };
          if (vErrors === null) {
            vErrors = [err5];
          } else {
            vErrors.push(err5);
          }
          errors++;
        }
        if (data1.message === void 0) {
          const err6 = { instancePath: instancePath + "/error", schemaPath: "ErrorInfo.schema.json/required", keyword: "required", params: { missingProperty: "message" }, message: "must have required property 'message'" };
          if (vErrors === null) {
            vErrors = [err6];
          } else {
            vErrors.push(err6);
          }
          errors++;
        }
        if (data1.retryable === void 0) {
          const err7 = { instancePath: instancePath + "/error", schemaPath: "ErrorInfo.schema.json/required", keyword: "required", params: { missingProperty: "retryable" }, message: "must have required property 'retryable'" };
          if (vErrors === null) {
            vErrors = [err7];
          } else {
            vErrors.push(err7);
          }
          errors++;
        }
        for (const key1 in data1) {
          if (!(key1 === "kind" || key1 === "status" || key1 === "message" || key1 === "retryable")) {
            const err8 = { instancePath: instancePath + "/error", schemaPath: "ErrorInfo.schema.json/additionalProperties", keyword: "additionalProperties", params: { additionalProperty: key1 }, message: "must NOT have additional properties" };
            if (vErrors === null) {
              vErrors = [err8];
            } else {
              vErrors.push(err8);
            }
            errors++;
          }
        }
        if (data1.kind !== void 0) {
          let data2 = data1.kind;
          if (!(data2 === "UNAUTHENTICATED" || data2 === "ACCOUNT_PENDING" || data2 === "STALE_REPORT" || data2 === "ALREADY_DECIDED" || data2 === "NOT_FOUND" || data2 === "PERMISSION_DENIED" || data2 === "INVALID_RECORD" || data2 === "CONFLICT" || data2 === "FAILED_PRECONDITION" || data2 === "UNAVAILABLE" || data2 === "BAD_RESPONSE" || data2 === "UNKNOWN" || data2 === "NON_API")) {
            const err9 = { instancePath: instancePath + "/error/kind", schemaPath: "ErrorInfo.schema.json/properties/kind/enum", keyword: "enum", params: { allowedValues: schema40.properties.kind.enum }, message: "must be equal to one of the allowed values" };
            if (vErrors === null) {
              vErrors = [err9];
            } else {
              vErrors.push(err9);
            }
            errors++;
          }
        }
        if (data1.status !== void 0) {
          let data3 = data1.status;
          if (!(typeof data3 == "number" && (!(data3 % 1) && !isNaN(data3)) && isFinite(data3))) {
            const err10 = { instancePath: instancePath + "/error/status", schemaPath: "ErrorInfo.schema.json/properties/status/type", keyword: "type", params: { type: "integer" }, message: "must be integer" };
            if (vErrors === null) {
              vErrors = [err10];
            } else {
              vErrors.push(err10);
            }
            errors++;
          }
          if (typeof data3 == "number" && isFinite(data3)) {
            if (data3 > 599 || isNaN(data3)) {
              const err11 = { instancePath: instancePath + "/error/status", schemaPath: "ErrorInfo.schema.json/properties/status/maximum", keyword: "maximum", params: { comparison: "<=", limit: 599 }, message: "must be <= 599" };
              if (vErrors === null) {
                vErrors = [err11];
              } else {
                vErrors.push(err11);
              }
              errors++;
            }
            if (data3 < 0 || isNaN(data3)) {
              const err12 = { instancePath: instancePath + "/error/status", schemaPath: "ErrorInfo.schema.json/properties/status/minimum", keyword: "minimum", params: { comparison: ">=", limit: 0 }, message: "must be >= 0" };
              if (vErrors === null) {
                vErrors = [err12];
              } else {
                vErrors.push(err12);
              }
              errors++;
            }
          }
        }
        if (data1.message !== void 0) {
          if (typeof data1.message !== "string") {
            const err13 = { instancePath: instancePath + "/error/message", schemaPath: "ErrorInfo.schema.json/properties/message/type", keyword: "type", params: { type: "string" }, message: "must be string" };
            if (vErrors === null) {
              vErrors = [err13];
            } else {
              vErrors.push(err13);
            }
            errors++;
          }
        }
        if (data1.retryable !== void 0) {
          if (typeof data1.retryable !== "boolean") {
            const err14 = { instancePath: instancePath + "/error/retryable", schemaPath: "ErrorInfo.schema.json/properties/retryable/type", keyword: "type", params: { type: "boolean" }, message: "must be boolean" };
            if (vErrors === null) {
              vErrors = [err14];
            } else {
              vErrors.push(err14);
            }
            errors++;
          }
        }
      } else {
        const err15 = { instancePath: instancePath + "/error", schemaPath: "ErrorInfo.schema.json/type", keyword: "type", params: { type: "object" }, message: "must be object" };
        if (vErrors === null) {
          vErrors = [err15];
        } else {
          vErrors.push(err15);
        }
        errors++;
      }
    }
  } else {
    const err16 = { instancePath, schemaPath: "#/type", keyword: "type", params: { type: "object" }, message: "must be object" };
    if (vErrors === null) {
      vErrors = [err16];
    } else {
      vErrors.push(err16);
    }
    errors++;
  }
  validate26.errors = vErrors;
  return errors === 0;
}
validate26.evaluated = { "props": true, "dynamicProps": false, "dynamicItems": false };
exports.ApprovalRecord = validate27;
function validate27(data, { instancePath = "", parentData, parentDataProperty, rootData = data, dynamicAnchors = {} } = {}) {
  ;
  let vErrors = null;
  let errors = 0;
  const evaluated0 = validate27.evaluated;
  if (evaluated0.dynamicProps) {
    evaluated0.props = void 0;
  }
  if (evaluated0.dynamicItems) {
    evaluated0.items = void 0;
  }
  if (data && typeof data == "object" && !Array.isArray(data)) {
    if (data.approval_id === void 0) {
      const err0 = { instancePath, schemaPath: "#/required", keyword: "required", params: { missingProperty: "approval_id" }, message: "must have required property 'approval_id'" };
      if (vErrors === null) {
        vErrors = [err0];
      } else {
        vErrors.push(err0);
      }
      errors++;
    }
    if (data.submission_id === void 0) {
      const err1 = { instancePath, schemaPath: "#/required", keyword: "required", params: { missingProperty: "submission_id" }, message: "must have required property 'submission_id'" };
      if (vErrors === null) {
        vErrors = [err1];
      } else {
        vErrors.push(err1);
      }
      errors++;
    }
    if (data.decision === void 0) {
      const err2 = { instancePath, schemaPath: "#/required", keyword: "required", params: { missingProperty: "decision" }, message: "must have required property 'decision'" };
      if (vErrors === null) {
        vErrors = [err2];
      } else {
        vErrors.push(err2);
      }
      errors++;
    }
    if (data.approver_id === void 0) {
      const err3 = { instancePath, schemaPath: "#/required", keyword: "required", params: { missingProperty: "approver_id" }, message: "must have required property 'approver_id'" };
      if (vErrors === null) {
        vErrors = [err3];
      } else {
        vErrors.push(err3);
      }
      errors++;
    }
    if (data.approver_role === void 0) {
      const err4 = { instancePath, schemaPath: "#/required", keyword: "required", params: { missingProperty: "approver_role" }, message: "must have required property 'approver_role'" };
      if (vErrors === null) {
        vErrors = [err4];
      } else {
        vErrors.push(err4);
      }
      errors++;
    }
    if (data.decided_at === void 0) {
      const err5 = { instancePath, schemaPath: "#/required", keyword: "required", params: { missingProperty: "decided_at" }, message: "must have required property 'decided_at'" };
      if (vErrors === null) {
        vErrors = [err5];
      } else {
        vErrors.push(err5);
      }
      errors++;
    }
    if (data.pipeline_schema_version !== void 0) {
      if (typeof data.pipeline_schema_version !== "string") {
        const err6 = { instancePath: instancePath + "/pipeline_schema_version", schemaPath: "#/properties/pipeline_schema_version/type", keyword: "type", params: { type: "string" }, message: "must be string" };
        if (vErrors === null) {
          vErrors = [err6];
        } else {
          vErrors.push(err6);
        }
        errors++;
      }
    }
    if (data.approval_id !== void 0) {
      let data1 = data.approval_id;
      if (typeof data1 === "string") {
        if (func1(data1) < 1) {
          const err7 = { instancePath: instancePath + "/approval_id", schemaPath: "#/properties/approval_id/minLength", keyword: "minLength", params: { limit: 1 }, message: "must NOT have fewer than 1 characters" };
          if (vErrors === null) {
            vErrors = [err7];
          } else {
            vErrors.push(err7);
          }
          errors++;
        }
      } else {
        const err8 = { instancePath: instancePath + "/approval_id", schemaPath: "#/properties/approval_id/type", keyword: "type", params: { type: "string" }, message: "must be string" };
        if (vErrors === null) {
          vErrors = [err8];
        } else {
          vErrors.push(err8);
        }
        errors++;
      }
    }
    if (data.submission_id !== void 0) {
      let data2 = data.submission_id;
      if (typeof data2 === "string") {
        if (func1(data2) < 1) {
          const err9 = { instancePath: instancePath + "/submission_id", schemaPath: "#/properties/submission_id/minLength", keyword: "minLength", params: { limit: 1 }, message: "must NOT have fewer than 1 characters" };
          if (vErrors === null) {
            vErrors = [err9];
          } else {
            vErrors.push(err9);
          }
          errors++;
        }
      } else {
        const err10 = { instancePath: instancePath + "/submission_id", schemaPath: "#/properties/submission_id/type", keyword: "type", params: { type: "string" }, message: "must be string" };
        if (vErrors === null) {
          vErrors = [err10];
        } else {
          vErrors.push(err10);
        }
        errors++;
      }
    }
    if (data.decision !== void 0) {
      if (typeof data.decision !== "string") {
        const err11 = { instancePath: instancePath + "/decision", schemaPath: "#/properties/decision/type", keyword: "type", params: { type: "string" }, message: "must be string" };
        if (vErrors === null) {
          vErrors = [err11];
        } else {
          vErrors.push(err11);
        }
        errors++;
      }
    }
    if (data.reason !== void 0) {
      if (typeof data.reason !== "string") {
        const err12 = { instancePath: instancePath + "/reason", schemaPath: "#/properties/reason/type", keyword: "type", params: { type: "string" }, message: "must be string" };
        if (vErrors === null) {
          vErrors = [err12];
        } else {
          vErrors.push(err12);
        }
        errors++;
      }
    }
    if (data.approver_id !== void 0) {
      if (typeof data.approver_id !== "string") {
        const err13 = { instancePath: instancePath + "/approver_id", schemaPath: "#/properties/approver_id/type", keyword: "type", params: { type: "string" }, message: "must be string" };
        if (vErrors === null) {
          vErrors = [err13];
        } else {
          vErrors.push(err13);
        }
        errors++;
      }
    }
    if (data.approver_role !== void 0) {
      if (typeof data.approver_role !== "string") {
        const err14 = { instancePath: instancePath + "/approver_role", schemaPath: "#/properties/approver_role/type", keyword: "type", params: { type: "string" }, message: "must be string" };
        if (vErrors === null) {
          vErrors = [err14];
        } else {
          vErrors.push(err14);
        }
        errors++;
      }
    }
    if (data.decided_at !== void 0) {
      if (typeof data.decided_at !== "string") {
        const err15 = { instancePath: instancePath + "/decided_at", schemaPath: "#/properties/decided_at/type", keyword: "type", params: { type: "string" }, message: "must be string" };
        if (vErrors === null) {
          vErrors = [err15];
        } else {
          vErrors.push(err15);
        }
        errors++;
      }
    }
    if (data.report_hash !== void 0) {
      if (typeof data.report_hash !== "string") {
        const err16 = { instancePath: instancePath + "/report_hash", schemaPath: "#/properties/report_hash/type", keyword: "type", params: { type: "string" }, message: "must be string" };
        if (vErrors === null) {
          vErrors = [err16];
        } else {
          vErrors.push(err16);
        }
        errors++;
      }
    }
  } else {
    const err17 = { instancePath, schemaPath: "#/type", keyword: "type", params: { type: "object" }, message: "must be object" };
    if (vErrors === null) {
      vErrors = [err17];
    } else {
      vErrors.push(err17);
    }
    errors++;
  }
  validate27.errors = vErrors;
  return errors === 0;
}
validate27.evaluated = { "props": { "pipeline_schema_version": true, "approval_id": true, "submission_id": true, "decision": true, "reason": true, "approver_id": true, "approver_role": true, "decided_at": true, "report_hash": true }, "dynamicProps": false, "dynamicItems": false };
exports.ApprovalResult = validate28;
function validate28(data, { instancePath = "", parentData, parentDataProperty, rootData = data, dynamicAnchors = {} } = {}) {
  ;
  let vErrors = null;
  let errors = 0;
  const evaluated0 = validate28.evaluated;
  if (evaluated0.dynamicProps) {
    evaluated0.props = void 0;
  }
  if (evaluated0.dynamicItems) {
    evaluated0.items = void 0;
  }
  if (data && typeof data == "object" && !Array.isArray(data)) {
    if (data.approval === void 0) {
      const err0 = { instancePath, schemaPath: "#/required", keyword: "required", params: { missingProperty: "approval" }, message: "must have required property 'approval'" };
      if (vErrors === null) {
        vErrors = [err0];
      } else {
        vErrors.push(err0);
      }
      errors++;
    }
    if (data.replay === void 0) {
      const err1 = { instancePath, schemaPath: "#/required", keyword: "required", params: { missingProperty: "replay" }, message: "must have required property 'replay'" };
      if (vErrors === null) {
        vErrors = [err1];
      } else {
        vErrors.push(err1);
      }
      errors++;
    }
    for (const key0 in data) {
      if (!(key0 === "approval" || key0 === "replay")) {
        const err2 = { instancePath, schemaPath: "#/additionalProperties", keyword: "additionalProperties", params: { additionalProperty: key0 }, message: "must NOT have additional properties" };
        if (vErrors === null) {
          vErrors = [err2];
        } else {
          vErrors.push(err2);
        }
        errors++;
      }
    }
    if (data.approval !== void 0) {
      let data0 = data.approval;
      if (data0 && typeof data0 == "object" && !Array.isArray(data0)) {
        if (data0.approval_id === void 0) {
          const err3 = { instancePath: instancePath + "/approval", schemaPath: "ApprovalRecord.schema.json/required", keyword: "required", params: { missingProperty: "approval_id" }, message: "must have required property 'approval_id'" };
          if (vErrors === null) {
            vErrors = [err3];
          } else {
            vErrors.push(err3);
          }
          errors++;
        }
        if (data0.submission_id === void 0) {
          const err4 = { instancePath: instancePath + "/approval", schemaPath: "ApprovalRecord.schema.json/required", keyword: "required", params: { missingProperty: "submission_id" }, message: "must have required property 'submission_id'" };
          if (vErrors === null) {
            vErrors = [err4];
          } else {
            vErrors.push(err4);
          }
          errors++;
        }
        if (data0.decision === void 0) {
          const err5 = { instancePath: instancePath + "/approval", schemaPath: "ApprovalRecord.schema.json/required", keyword: "required", params: { missingProperty: "decision" }, message: "must have required property 'decision'" };
          if (vErrors === null) {
            vErrors = [err5];
          } else {
            vErrors.push(err5);
          }
          errors++;
        }
        if (data0.approver_id === void 0) {
          const err6 = { instancePath: instancePath + "/approval", schemaPath: "ApprovalRecord.schema.json/required", keyword: "required", params: { missingProperty: "approver_id" }, message: "must have required property 'approver_id'" };
          if (vErrors === null) {
            vErrors = [err6];
          } else {
            vErrors.push(err6);
          }
          errors++;
        }
        if (data0.approver_role === void 0) {
          const err7 = { instancePath: instancePath + "/approval", schemaPath: "ApprovalRecord.schema.json/required", keyword: "required", params: { missingProperty: "approver_role" }, message: "must have required property 'approver_role'" };
          if (vErrors === null) {
            vErrors = [err7];
          } else {
            vErrors.push(err7);
          }
          errors++;
        }
        if (data0.decided_at === void 0) {
          const err8 = { instancePath: instancePath + "/approval", schemaPath: "ApprovalRecord.schema.json/required", keyword: "required", params: { missingProperty: "decided_at" }, message: "must have required property 'decided_at'" };
          if (vErrors === null) {
            vErrors = [err8];
          } else {
            vErrors.push(err8);
          }
          errors++;
        }
        if (data0.pipeline_schema_version !== void 0) {
          if (typeof data0.pipeline_schema_version !== "string") {
            const err9 = { instancePath: instancePath + "/approval/pipeline_schema_version", schemaPath: "ApprovalRecord.schema.json/properties/pipeline_schema_version/type", keyword: "type", params: { type: "string" }, message: "must be string" };
            if (vErrors === null) {
              vErrors = [err9];
            } else {
              vErrors.push(err9);
            }
            errors++;
          }
        }
        if (data0.approval_id !== void 0) {
          let data2 = data0.approval_id;
          if (typeof data2 === "string") {
            if (func1(data2) < 1) {
              const err10 = { instancePath: instancePath + "/approval/approval_id", schemaPath: "ApprovalRecord.schema.json/properties/approval_id/minLength", keyword: "minLength", params: { limit: 1 }, message: "must NOT have fewer than 1 characters" };
              if (vErrors === null) {
                vErrors = [err10];
              } else {
                vErrors.push(err10);
              }
              errors++;
            }
          } else {
            const err11 = { instancePath: instancePath + "/approval/approval_id", schemaPath: "ApprovalRecord.schema.json/properties/approval_id/type", keyword: "type", params: { type: "string" }, message: "must be string" };
            if (vErrors === null) {
              vErrors = [err11];
            } else {
              vErrors.push(err11);
            }
            errors++;
          }
        }
        if (data0.submission_id !== void 0) {
          let data3 = data0.submission_id;
          if (typeof data3 === "string") {
            if (func1(data3) < 1) {
              const err12 = { instancePath: instancePath + "/approval/submission_id", schemaPath: "ApprovalRecord.schema.json/properties/submission_id/minLength", keyword: "minLength", params: { limit: 1 }, message: "must NOT have fewer than 1 characters" };
              if (vErrors === null) {
                vErrors = [err12];
              } else {
                vErrors.push(err12);
              }
              errors++;
            }
          } else {
            const err13 = { instancePath: instancePath + "/approval/submission_id", schemaPath: "ApprovalRecord.schema.json/properties/submission_id/type", keyword: "type", params: { type: "string" }, message: "must be string" };
            if (vErrors === null) {
              vErrors = [err13];
            } else {
              vErrors.push(err13);
            }
            errors++;
          }
        }
        if (data0.decision !== void 0) {
          if (typeof data0.decision !== "string") {
            const err14 = { instancePath: instancePath + "/approval/decision", schemaPath: "ApprovalRecord.schema.json/properties/decision/type", keyword: "type", params: { type: "string" }, message: "must be string" };
            if (vErrors === null) {
              vErrors = [err14];
            } else {
              vErrors.push(err14);
            }
            errors++;
          }
        }
        if (data0.reason !== void 0) {
          if (typeof data0.reason !== "string") {
            const err15 = { instancePath: instancePath + "/approval/reason", schemaPath: "ApprovalRecord.schema.json/properties/reason/type", keyword: "type", params: { type: "string" }, message: "must be string" };
            if (vErrors === null) {
              vErrors = [err15];
            } else {
              vErrors.push(err15);
            }
            errors++;
          }
        }
        if (data0.approver_id !== void 0) {
          if (typeof data0.approver_id !== "string") {
            const err16 = { instancePath: instancePath + "/approval/approver_id", schemaPath: "ApprovalRecord.schema.json/properties/approver_id/type", keyword: "type", params: { type: "string" }, message: "must be string" };
            if (vErrors === null) {
              vErrors = [err16];
            } else {
              vErrors.push(err16);
            }
            errors++;
          }
        }
        if (data0.approver_role !== void 0) {
          if (typeof data0.approver_role !== "string") {
            const err17 = { instancePath: instancePath + "/approval/approver_role", schemaPath: "ApprovalRecord.schema.json/properties/approver_role/type", keyword: "type", params: { type: "string" }, message: "must be string" };
            if (vErrors === null) {
              vErrors = [err17];
            } else {
              vErrors.push(err17);
            }
            errors++;
          }
        }
        if (data0.decided_at !== void 0) {
          if (typeof data0.decided_at !== "string") {
            const err18 = { instancePath: instancePath + "/approval/decided_at", schemaPath: "ApprovalRecord.schema.json/properties/decided_at/type", keyword: "type", params: { type: "string" }, message: "must be string" };
            if (vErrors === null) {
              vErrors = [err18];
            } else {
              vErrors.push(err18);
            }
            errors++;
          }
        }
        if (data0.report_hash !== void 0) {
          if (typeof data0.report_hash !== "string") {
            const err19 = { instancePath: instancePath + "/approval/report_hash", schemaPath: "ApprovalRecord.schema.json/properties/report_hash/type", keyword: "type", params: { type: "string" }, message: "must be string" };
            if (vErrors === null) {
              vErrors = [err19];
            } else {
              vErrors.push(err19);
            }
            errors++;
          }
        }
      } else {
        const err20 = { instancePath: instancePath + "/approval", schemaPath: "ApprovalRecord.schema.json/type", keyword: "type", params: { type: "object" }, message: "must be object" };
        if (vErrors === null) {
          vErrors = [err20];
        } else {
          vErrors.push(err20);
        }
        errors++;
      }
    }
    if (data.replay !== void 0) {
      if (typeof data.replay !== "boolean") {
        const err21 = { instancePath: instancePath + "/replay", schemaPath: "#/properties/replay/type", keyword: "type", params: { type: "boolean" }, message: "must be boolean" };
        if (vErrors === null) {
          vErrors = [err21];
        } else {
          vErrors.push(err21);
        }
        errors++;
      }
    }
  } else {
    const err22 = { instancePath, schemaPath: "#/type", keyword: "type", params: { type: "object" }, message: "must be object" };
    if (vErrors === null) {
      vErrors = [err22];
    } else {
      vErrors.push(err22);
    }
    errors++;
  }
  validate28.errors = vErrors;
  return errors === 0;
}
validate28.evaluated = { "props": true, "dynamicProps": false, "dynamicItems": false };
exports.ArtifactRefRow = validate29;
function validate29(data, { instancePath = "", parentData, parentDataProperty, rootData = data, dynamicAnchors = {} } = {}) {
  ;
  let vErrors = null;
  let errors = 0;
  const evaluated0 = validate29.evaluated;
  if (evaluated0.dynamicProps) {
    evaluated0.props = void 0;
  }
  if (evaluated0.dynamicItems) {
    evaluated0.items = void 0;
  }
  if (data && typeof data == "object" && !Array.isArray(data)) {
    if (data.id === void 0) {
      const err0 = { instancePath, schemaPath: "#/required", keyword: "required", params: { missingProperty: "id" }, message: "must have required property 'id'" };
      if (vErrors === null) {
        vErrors = [err0];
      } else {
        vErrors.push(err0);
      }
      errors++;
    }
    if (data.version === void 0) {
      const err1 = { instancePath, schemaPath: "#/required", keyword: "required", params: { missingProperty: "version" }, message: "must have required property 'version'" };
      if (vErrors === null) {
        vErrors = [err1];
      } else {
        vErrors.push(err1);
      }
      errors++;
    }
    if (data.content_hash === void 0) {
      const err2 = { instancePath, schemaPath: "#/required", keyword: "required", params: { missingProperty: "content_hash" }, message: "must have required property 'content_hash'" };
      if (vErrors === null) {
        vErrors = [err2];
      } else {
        vErrors.push(err2);
      }
      errors++;
    }
    if (data.id !== void 0) {
      if (typeof data.id !== "string") {
        const err3 = { instancePath: instancePath + "/id", schemaPath: "#/properties/id/type", keyword: "type", params: { type: "string" }, message: "must be string" };
        if (vErrors === null) {
          vErrors = [err3];
        } else {
          vErrors.push(err3);
        }
        errors++;
      }
    }
    if (data.version !== void 0) {
      if (typeof data.version !== "string") {
        const err4 = { instancePath: instancePath + "/version", schemaPath: "#/properties/version/type", keyword: "type", params: { type: "string" }, message: "must be string" };
        if (vErrors === null) {
          vErrors = [err4];
        } else {
          vErrors.push(err4);
        }
        errors++;
      }
    }
    if (data.content_hash !== void 0) {
      if (typeof data.content_hash !== "string") {
        const err5 = { instancePath: instancePath + "/content_hash", schemaPath: "#/properties/content_hash/type", keyword: "type", params: { type: "string" }, message: "must be string" };
        if (vErrors === null) {
          vErrors = [err5];
        } else {
          vErrors.push(err5);
        }
        errors++;
      }
    }
  } else {
    const err6 = { instancePath, schemaPath: "#/type", keyword: "type", params: { type: "object" }, message: "must be object" };
    if (vErrors === null) {
      vErrors = [err6];
    } else {
      vErrors.push(err6);
    }
    errors++;
  }
  validate29.errors = vErrors;
  return errors === 0;
}
validate29.evaluated = { "props": { "id": true, "version": true, "content_hash": true }, "dynamicProps": false, "dynamicItems": false };
exports.CaseFailure = validate30;
var schema45 = { "$schema": "https://json-schema.org/draft/2020-12/schema", "$id": "CaseFailure.schema.json", "title": "CaseFailure", "description": "case_failure\uC758 \uCD9C\uB825. back_to_case\uB294 \uC0AC\uB840 \uD654\uBA74\uC5D0 \uC54C\uB9BC\uC744 \uBCF4\uC774\uACE0 \uBA38\uBB38\uB2E4, fail\uC740 \uC624\uB958 \uD654\uBA74(\uB610\uB294 trace \uC624\uB958 \uBB38\uAD6C).", "type": "object", "required": ["action"], "properties": { "action": { "enum": ["back_to_case", "fail"] }, "notice": { "type": "object", "required": ["kind", "text"], "properties": { "kind": { "enum": ["invalid", "denied", "retry", "notfound"] }, "text": { "type": "string", "minLength": 1 } }, "additionalProperties": false }, "errorText": { "type": "string", "minLength": 1 } }, "additionalProperties": false, "allOf": [{ "if": { "properties": { "action": { "const": "fail" } }, "required": ["action"] }, "then": { "required": ["errorText"] }, "else": { "required": ["notice"] } }] };
function validate30(data, { instancePath = "", parentData, parentDataProperty, rootData = data, dynamicAnchors = {} } = {}) {
  ;
  let vErrors = null;
  let errors = 0;
  const evaluated0 = validate30.evaluated;
  if (evaluated0.dynamicProps) {
    evaluated0.props = void 0;
  }
  if (evaluated0.dynamicItems) {
    evaluated0.items = void 0;
  }
  const _errs2 = errors;
  let valid1 = true;
  const _errs3 = errors;
  if (data && typeof data == "object" && !Array.isArray(data)) {
    let missing0;
    if (data.action === void 0 && (missing0 = "action")) {
      const err0 = {};
      if (vErrors === null) {
        vErrors = [err0];
      } else {
        vErrors.push(err0);
      }
      errors++;
    } else {
      if (data.action !== void 0) {
        if ("fail" !== data.action) {
          const err1 = {};
          if (vErrors === null) {
            vErrors = [err1];
          } else {
            vErrors.push(err1);
          }
          errors++;
        }
      }
    }
  }
  var _valid0 = _errs3 === errors;
  errors = _errs2;
  if (vErrors !== null) {
    if (_errs2) {
      vErrors.length = _errs2;
    } else {
      vErrors = null;
    }
  }
  let ifClause0;
  if (_valid0) {
    const _errs5 = errors;
    if (data && typeof data == "object" && !Array.isArray(data)) {
      if (data.errorText === void 0) {
        const err2 = { instancePath, schemaPath: "#/allOf/0/then/required", keyword: "required", params: { missingProperty: "errorText" }, message: "must have required property 'errorText'" };
        if (vErrors === null) {
          vErrors = [err2];
        } else {
          vErrors.push(err2);
        }
        errors++;
      }
    }
    var _valid0 = _errs5 === errors;
    valid1 = _valid0;
    ifClause0 = "then";
  } else {
    const _errs6 = errors;
    if (data && typeof data == "object" && !Array.isArray(data)) {
      if (data.notice === void 0) {
        const err3 = { instancePath, schemaPath: "#/allOf/0/else/required", keyword: "required", params: { missingProperty: "notice" }, message: "must have required property 'notice'" };
        if (vErrors === null) {
          vErrors = [err3];
        } else {
          vErrors.push(err3);
        }
        errors++;
      }
    }
    var _valid0 = _errs6 === errors;
    valid1 = _valid0;
    ifClause0 = "else";
  }
  if (!valid1) {
    const err4 = { instancePath, schemaPath: "#/allOf/0/if", keyword: "if", params: { failingKeyword: ifClause0 }, message: 'must match "' + ifClause0 + '" schema' };
    if (vErrors === null) {
      vErrors = [err4];
    } else {
      vErrors.push(err4);
    }
    errors++;
  }
  if (data && typeof data == "object" && !Array.isArray(data)) {
    if (data.action === void 0) {
      const err5 = { instancePath, schemaPath: "#/required", keyword: "required", params: { missingProperty: "action" }, message: "must have required property 'action'" };
      if (vErrors === null) {
        vErrors = [err5];
      } else {
        vErrors.push(err5);
      }
      errors++;
    }
    for (const key0 in data) {
      if (!(key0 === "action" || key0 === "notice" || key0 === "errorText")) {
        const err6 = { instancePath, schemaPath: "#/additionalProperties", keyword: "additionalProperties", params: { additionalProperty: key0 }, message: "must NOT have additional properties" };
        if (vErrors === null) {
          vErrors = [err6];
        } else {
          vErrors.push(err6);
        }
        errors++;
      }
    }
    if (data.action !== void 0) {
      let data1 = data.action;
      if (!(data1 === "back_to_case" || data1 === "fail")) {
        const err7 = { instancePath: instancePath + "/action", schemaPath: "#/properties/action/enum", keyword: "enum", params: { allowedValues: schema45.properties.action.enum }, message: "must be equal to one of the allowed values" };
        if (vErrors === null) {
          vErrors = [err7];
        } else {
          vErrors.push(err7);
        }
        errors++;
      }
    }
    if (data.notice !== void 0) {
      let data2 = data.notice;
      if (data2 && typeof data2 == "object" && !Array.isArray(data2)) {
        if (data2.kind === void 0) {
          const err8 = { instancePath: instancePath + "/notice", schemaPath: "#/properties/notice/required", keyword: "required", params: { missingProperty: "kind" }, message: "must have required property 'kind'" };
          if (vErrors === null) {
            vErrors = [err8];
          } else {
            vErrors.push(err8);
          }
          errors++;
        }
        if (data2.text === void 0) {
          const err9 = { instancePath: instancePath + "/notice", schemaPath: "#/properties/notice/required", keyword: "required", params: { missingProperty: "text" }, message: "must have required property 'text'" };
          if (vErrors === null) {
            vErrors = [err9];
          } else {
            vErrors.push(err9);
          }
          errors++;
        }
        for (const key1 in data2) {
          if (!(key1 === "kind" || key1 === "text")) {
            const err10 = { instancePath: instancePath + "/notice", schemaPath: "#/properties/notice/additionalProperties", keyword: "additionalProperties", params: { additionalProperty: key1 }, message: "must NOT have additional properties" };
            if (vErrors === null) {
              vErrors = [err10];
            } else {
              vErrors.push(err10);
            }
            errors++;
          }
        }
        if (data2.kind !== void 0) {
          let data3 = data2.kind;
          if (!(data3 === "invalid" || data3 === "denied" || data3 === "retry" || data3 === "notfound")) {
            const err11 = { instancePath: instancePath + "/notice/kind", schemaPath: "#/properties/notice/properties/kind/enum", keyword: "enum", params: { allowedValues: schema45.properties.notice.properties.kind.enum }, message: "must be equal to one of the allowed values" };
            if (vErrors === null) {
              vErrors = [err11];
            } else {
              vErrors.push(err11);
            }
            errors++;
          }
        }
        if (data2.text !== void 0) {
          let data4 = data2.text;
          if (typeof data4 === "string") {
            if (func1(data4) < 1) {
              const err12 = { instancePath: instancePath + "/notice/text", schemaPath: "#/properties/notice/properties/text/minLength", keyword: "minLength", params: { limit: 1 }, message: "must NOT have fewer than 1 characters" };
              if (vErrors === null) {
                vErrors = [err12];
              } else {
                vErrors.push(err12);
              }
              errors++;
            }
          } else {
            const err13 = { instancePath: instancePath + "/notice/text", schemaPath: "#/properties/notice/properties/text/type", keyword: "type", params: { type: "string" }, message: "must be string" };
            if (vErrors === null) {
              vErrors = [err13];
            } else {
              vErrors.push(err13);
            }
            errors++;
          }
        }
      } else {
        const err14 = { instancePath: instancePath + "/notice", schemaPath: "#/properties/notice/type", keyword: "type", params: { type: "object" }, message: "must be object" };
        if (vErrors === null) {
          vErrors = [err14];
        } else {
          vErrors.push(err14);
        }
        errors++;
      }
    }
    if (data.errorText !== void 0) {
      let data5 = data.errorText;
      if (typeof data5 === "string") {
        if (func1(data5) < 1) {
          const err15 = { instancePath: instancePath + "/errorText", schemaPath: "#/properties/errorText/minLength", keyword: "minLength", params: { limit: 1 }, message: "must NOT have fewer than 1 characters" };
          if (vErrors === null) {
            vErrors = [err15];
          } else {
            vErrors.push(err15);
          }
          errors++;
        }
      } else {
        const err16 = { instancePath: instancePath + "/errorText", schemaPath: "#/properties/errorText/type", keyword: "type", params: { type: "string" }, message: "must be string" };
        if (vErrors === null) {
          vErrors = [err16];
        } else {
          vErrors.push(err16);
        }
        errors++;
      }
    }
  } else {
    const err17 = { instancePath, schemaPath: "#/type", keyword: "type", params: { type: "object" }, message: "must be object" };
    if (vErrors === null) {
      vErrors = [err17];
    } else {
      vErrors.push(err17);
    }
    errors++;
  }
  validate30.errors = vErrors;
  return errors === 0;
}
validate30.evaluated = { "props": true, "dynamicProps": false, "dynamicItems": false };
exports.CaseFailureInput = validate31;
var schema46 = { "$schema": "https://json-schema.org/draft/2020-12/schema", "$id": "CaseFailureInput.schema.json", "title": "CaseFailureInput", "description": "case_failure\uC758 \uC785\uB825.", "type": "object", "required": ["context", "error"], "properties": { "context": { "enum": ["load", "submit"] }, "error": { "$ref": "ErrorInfo.schema.json" } }, "additionalProperties": false };
function validate31(data, { instancePath = "", parentData, parentDataProperty, rootData = data, dynamicAnchors = {} } = {}) {
  ;
  let vErrors = null;
  let errors = 0;
  const evaluated0 = validate31.evaluated;
  if (evaluated0.dynamicProps) {
    evaluated0.props = void 0;
  }
  if (evaluated0.dynamicItems) {
    evaluated0.items = void 0;
  }
  if (data && typeof data == "object" && !Array.isArray(data)) {
    if (data.context === void 0) {
      const err0 = { instancePath, schemaPath: "#/required", keyword: "required", params: { missingProperty: "context" }, message: "must have required property 'context'" };
      if (vErrors === null) {
        vErrors = [err0];
      } else {
        vErrors.push(err0);
      }
      errors++;
    }
    if (data.error === void 0) {
      const err1 = { instancePath, schemaPath: "#/required", keyword: "required", params: { missingProperty: "error" }, message: "must have required property 'error'" };
      if (vErrors === null) {
        vErrors = [err1];
      } else {
        vErrors.push(err1);
      }
      errors++;
    }
    for (const key0 in data) {
      if (!(key0 === "context" || key0 === "error")) {
        const err2 = { instancePath, schemaPath: "#/additionalProperties", keyword: "additionalProperties", params: { additionalProperty: key0 }, message: "must NOT have additional properties" };
        if (vErrors === null) {
          vErrors = [err2];
        } else {
          vErrors.push(err2);
        }
        errors++;
      }
    }
    if (data.context !== void 0) {
      let data0 = data.context;
      if (!(data0 === "load" || data0 === "submit")) {
        const err3 = { instancePath: instancePath + "/context", schemaPath: "#/properties/context/enum", keyword: "enum", params: { allowedValues: schema46.properties.context.enum }, message: "must be equal to one of the allowed values" };
        if (vErrors === null) {
          vErrors = [err3];
        } else {
          vErrors.push(err3);
        }
        errors++;
      }
    }
    if (data.error !== void 0) {
      let data1 = data.error;
      if (data1 && typeof data1 == "object" && !Array.isArray(data1)) {
        if (data1.kind === void 0) {
          const err4 = { instancePath: instancePath + "/error", schemaPath: "ErrorInfo.schema.json/required", keyword: "required", params: { missingProperty: "kind" }, message: "must have required property 'kind'" };
          if (vErrors === null) {
            vErrors = [err4];
          } else {
            vErrors.push(err4);
          }
          errors++;
        }
        if (data1.status === void 0) {
          const err5 = { instancePath: instancePath + "/error", schemaPath: "ErrorInfo.schema.json/required", keyword: "required", params: { missingProperty: "status" }, message: "must have required property 'status'" };
          if (vErrors === null) {
            vErrors = [err5];
          } else {
            vErrors.push(err5);
          }
          errors++;
        }
        if (data1.message === void 0) {
          const err6 = { instancePath: instancePath + "/error", schemaPath: "ErrorInfo.schema.json/required", keyword: "required", params: { missingProperty: "message" }, message: "must have required property 'message'" };
          if (vErrors === null) {
            vErrors = [err6];
          } else {
            vErrors.push(err6);
          }
          errors++;
        }
        if (data1.retryable === void 0) {
          const err7 = { instancePath: instancePath + "/error", schemaPath: "ErrorInfo.schema.json/required", keyword: "required", params: { missingProperty: "retryable" }, message: "must have required property 'retryable'" };
          if (vErrors === null) {
            vErrors = [err7];
          } else {
            vErrors.push(err7);
          }
          errors++;
        }
        for (const key1 in data1) {
          if (!(key1 === "kind" || key1 === "status" || key1 === "message" || key1 === "retryable")) {
            const err8 = { instancePath: instancePath + "/error", schemaPath: "ErrorInfo.schema.json/additionalProperties", keyword: "additionalProperties", params: { additionalProperty: key1 }, message: "must NOT have additional properties" };
            if (vErrors === null) {
              vErrors = [err8];
            } else {
              vErrors.push(err8);
            }
            errors++;
          }
        }
        if (data1.kind !== void 0) {
          let data2 = data1.kind;
          if (!(data2 === "UNAUTHENTICATED" || data2 === "ACCOUNT_PENDING" || data2 === "STALE_REPORT" || data2 === "ALREADY_DECIDED" || data2 === "NOT_FOUND" || data2 === "PERMISSION_DENIED" || data2 === "INVALID_RECORD" || data2 === "CONFLICT" || data2 === "FAILED_PRECONDITION" || data2 === "UNAVAILABLE" || data2 === "BAD_RESPONSE" || data2 === "UNKNOWN" || data2 === "NON_API")) {
            const err9 = { instancePath: instancePath + "/error/kind", schemaPath: "ErrorInfo.schema.json/properties/kind/enum", keyword: "enum", params: { allowedValues: schema40.properties.kind.enum }, message: "must be equal to one of the allowed values" };
            if (vErrors === null) {
              vErrors = [err9];
            } else {
              vErrors.push(err9);
            }
            errors++;
          }
        }
        if (data1.status !== void 0) {
          let data3 = data1.status;
          if (!(typeof data3 == "number" && (!(data3 % 1) && !isNaN(data3)) && isFinite(data3))) {
            const err10 = { instancePath: instancePath + "/error/status", schemaPath: "ErrorInfo.schema.json/properties/status/type", keyword: "type", params: { type: "integer" }, message: "must be integer" };
            if (vErrors === null) {
              vErrors = [err10];
            } else {
              vErrors.push(err10);
            }
            errors++;
          }
          if (typeof data3 == "number" && isFinite(data3)) {
            if (data3 > 599 || isNaN(data3)) {
              const err11 = { instancePath: instancePath + "/error/status", schemaPath: "ErrorInfo.schema.json/properties/status/maximum", keyword: "maximum", params: { comparison: "<=", limit: 599 }, message: "must be <= 599" };
              if (vErrors === null) {
                vErrors = [err11];
              } else {
                vErrors.push(err11);
              }
              errors++;
            }
            if (data3 < 0 || isNaN(data3)) {
              const err12 = { instancePath: instancePath + "/error/status", schemaPath: "ErrorInfo.schema.json/properties/status/minimum", keyword: "minimum", params: { comparison: ">=", limit: 0 }, message: "must be >= 0" };
              if (vErrors === null) {
                vErrors = [err12];
              } else {
                vErrors.push(err12);
              }
              errors++;
            }
          }
        }
        if (data1.message !== void 0) {
          if (typeof data1.message !== "string") {
            const err13 = { instancePath: instancePath + "/error/message", schemaPath: "ErrorInfo.schema.json/properties/message/type", keyword: "type", params: { type: "string" }, message: "must be string" };
            if (vErrors === null) {
              vErrors = [err13];
            } else {
              vErrors.push(err13);
            }
            errors++;
          }
        }
        if (data1.retryable !== void 0) {
          if (typeof data1.retryable !== "boolean") {
            const err14 = { instancePath: instancePath + "/error/retryable", schemaPath: "ErrorInfo.schema.json/properties/retryable/type", keyword: "type", params: { type: "boolean" }, message: "must be boolean" };
            if (vErrors === null) {
              vErrors = [err14];
            } else {
              vErrors.push(err14);
            }
            errors++;
          }
        }
      } else {
        const err15 = { instancePath: instancePath + "/error", schemaPath: "ErrorInfo.schema.json/type", keyword: "type", params: { type: "object" }, message: "must be object" };
        if (vErrors === null) {
          vErrors = [err15];
        } else {
          vErrors.push(err15);
        }
        errors++;
      }
    }
  } else {
    const err16 = { instancePath, schemaPath: "#/type", keyword: "type", params: { type: "object" }, message: "must be object" };
    if (vErrors === null) {
      vErrors = [err16];
    } else {
      vErrors.push(err16);
    }
    errors++;
  }
  validate31.errors = vErrors;
  return errors === 0;
}
validate31.evaluated = { "props": true, "dynamicProps": false, "dynamicItems": false };
exports.CaseGetInput = validate32;
function validate32(data, { instancePath = "", parentData, parentDataProperty, rootData = data, dynamicAnchors = {} } = {}) {
  ;
  let vErrors = null;
  let errors = 0;
  const evaluated0 = validate32.evaluated;
  if (evaluated0.dynamicProps) {
    evaluated0.props = void 0;
  }
  if (evaluated0.dynamicItems) {
    evaluated0.items = void 0;
  }
  if (data && typeof data == "object" && !Array.isArray(data)) {
    if (data.caseId === void 0) {
      const err0 = { instancePath, schemaPath: "#/required", keyword: "required", params: { missingProperty: "caseId" }, message: "must have required property 'caseId'" };
      if (vErrors === null) {
        vErrors = [err0];
      } else {
        vErrors.push(err0);
      }
      errors++;
    }
    for (const key0 in data) {
      if (!(key0 === "caseId" || key0 === "version")) {
        const err1 = { instancePath, schemaPath: "#/additionalProperties", keyword: "additionalProperties", params: { additionalProperty: key0 }, message: "must NOT have additional properties" };
        if (vErrors === null) {
          vErrors = [err1];
        } else {
          vErrors.push(err1);
        }
        errors++;
      }
    }
    if (data.caseId !== void 0) {
      let data0 = data.caseId;
      if (typeof data0 === "string") {
        if (func1(data0) < 1) {
          const err2 = { instancePath: instancePath + "/caseId", schemaPath: "#/properties/caseId/minLength", keyword: "minLength", params: { limit: 1 }, message: "must NOT have fewer than 1 characters" };
          if (vErrors === null) {
            vErrors = [err2];
          } else {
            vErrors.push(err2);
          }
          errors++;
        }
      } else {
        const err3 = { instancePath: instancePath + "/caseId", schemaPath: "#/properties/caseId/type", keyword: "type", params: { type: "string" }, message: "must be string" };
        if (vErrors === null) {
          vErrors = [err3];
        } else {
          vErrors.push(err3);
        }
        errors++;
      }
    }
    if (data.version !== void 0) {
      let data1 = data.version;
      if (!(typeof data1 == "number" && (!(data1 % 1) && !isNaN(data1)) && isFinite(data1))) {
        const err4 = { instancePath: instancePath + "/version", schemaPath: "#/properties/version/type", keyword: "type", params: { type: "integer" }, message: "must be integer" };
        if (vErrors === null) {
          vErrors = [err4];
        } else {
          vErrors.push(err4);
        }
        errors++;
      }
      if (typeof data1 == "number" && isFinite(data1)) {
        if (data1 < 1 || isNaN(data1)) {
          const err5 = { instancePath: instancePath + "/version", schemaPath: "#/properties/version/minimum", keyword: "minimum", params: { comparison: ">=", limit: 1 }, message: "must be >= 1" };
          if (vErrors === null) {
            vErrors = [err5];
          } else {
            vErrors.push(err5);
          }
          errors++;
        }
      }
    }
  } else {
    const err6 = { instancePath, schemaPath: "#/type", keyword: "type", params: { type: "object" }, message: "must be object" };
    if (vErrors === null) {
      vErrors = [err6];
    } else {
      vErrors.push(err6);
    }
    errors++;
  }
  validate32.errors = vErrors;
  return errors === 0;
}
validate32.evaluated = { "props": true, "dynamicProps": false, "dynamicItems": false };
exports.CaseList = validate33;
var schema50 = { "$schema": "https://json-schema.org/draft/2020-12/schema", "$id": "CaseRecord.schema.json", "title": "CaseRecord", "description": "\uC2E4\uD328 \uC0AC\uB840(FailureCase\uC758 \uC77D\uAE30\uC6A9 \uD22C\uC601). \uBAA8\uB974\uB294 \uAC12\uACFC \uD544\uB4DC\uB294 \uBC1B\uB294\uB2E4.", "type": "object", "required": ["case_id", "version", "review_status", "failure_type", "deidentified_trace_ref"], "properties": { "pipeline_schema_version": { "type": "string" }, "case_id": { "type": "string", "minLength": 1 }, "version": { "type": "integer", "minimum": 1 }, "created_at": { "type": "string" }, "source_release_id": { "type": "string" }, "runtime_contract_version": { "type": "number" }, "deidentified": { "type": "boolean" }, "deidentified_trace_ref": { "type": "string", "minLength": 1 }, "failure_type": { "type": "string" }, "detection_method": { "type": "string" }, "review_status": { "type": "string" }, "expected": { "type": ["object", "string"] }, "expected_kind": { "type": "string" }, "reviewed_input": { "type": "object" }, "question_set": { "$ref": "ArtifactRefRow.schema.json" }, "ext": { "type": "object" } } };
function validate34(data, { instancePath = "", parentData, parentDataProperty, rootData = data, dynamicAnchors = {} } = {}) {
  ;
  let vErrors = null;
  let errors = 0;
  const evaluated0 = validate34.evaluated;
  if (evaluated0.dynamicProps) {
    evaluated0.props = void 0;
  }
  if (evaluated0.dynamicItems) {
    evaluated0.items = void 0;
  }
  if (data && typeof data == "object" && !Array.isArray(data)) {
    if (data.case_id === void 0) {
      const err0 = { instancePath, schemaPath: "#/required", keyword: "required", params: { missingProperty: "case_id" }, message: "must have required property 'case_id'" };
      if (vErrors === null) {
        vErrors = [err0];
      } else {
        vErrors.push(err0);
      }
      errors++;
    }
    if (data.version === void 0) {
      const err1 = { instancePath, schemaPath: "#/required", keyword: "required", params: { missingProperty: "version" }, message: "must have required property 'version'" };
      if (vErrors === null) {
        vErrors = [err1];
      } else {
        vErrors.push(err1);
      }
      errors++;
    }
    if (data.review_status === void 0) {
      const err2 = { instancePath, schemaPath: "#/required", keyword: "required", params: { missingProperty: "review_status" }, message: "must have required property 'review_status'" };
      if (vErrors === null) {
        vErrors = [err2];
      } else {
        vErrors.push(err2);
      }
      errors++;
    }
    if (data.failure_type === void 0) {
      const err3 = { instancePath, schemaPath: "#/required", keyword: "required", params: { missingProperty: "failure_type" }, message: "must have required property 'failure_type'" };
      if (vErrors === null) {
        vErrors = [err3];
      } else {
        vErrors.push(err3);
      }
      errors++;
    }
    if (data.deidentified_trace_ref === void 0) {
      const err4 = { instancePath, schemaPath: "#/required", keyword: "required", params: { missingProperty: "deidentified_trace_ref" }, message: "must have required property 'deidentified_trace_ref'" };
      if (vErrors === null) {
        vErrors = [err4];
      } else {
        vErrors.push(err4);
      }
      errors++;
    }
    if (data.pipeline_schema_version !== void 0) {
      if (typeof data.pipeline_schema_version !== "string") {
        const err5 = { instancePath: instancePath + "/pipeline_schema_version", schemaPath: "#/properties/pipeline_schema_version/type", keyword: "type", params: { type: "string" }, message: "must be string" };
        if (vErrors === null) {
          vErrors = [err5];
        } else {
          vErrors.push(err5);
        }
        errors++;
      }
    }
    if (data.case_id !== void 0) {
      let data1 = data.case_id;
      if (typeof data1 === "string") {
        if (func1(data1) < 1) {
          const err6 = { instancePath: instancePath + "/case_id", schemaPath: "#/properties/case_id/minLength", keyword: "minLength", params: { limit: 1 }, message: "must NOT have fewer than 1 characters" };
          if (vErrors === null) {
            vErrors = [err6];
          } else {
            vErrors.push(err6);
          }
          errors++;
        }
      } else {
        const err7 = { instancePath: instancePath + "/case_id", schemaPath: "#/properties/case_id/type", keyword: "type", params: { type: "string" }, message: "must be string" };
        if (vErrors === null) {
          vErrors = [err7];
        } else {
          vErrors.push(err7);
        }
        errors++;
      }
    }
    if (data.version !== void 0) {
      let data2 = data.version;
      if (!(typeof data2 == "number" && (!(data2 % 1) && !isNaN(data2)) && isFinite(data2))) {
        const err8 = { instancePath: instancePath + "/version", schemaPath: "#/properties/version/type", keyword: "type", params: { type: "integer" }, message: "must be integer" };
        if (vErrors === null) {
          vErrors = [err8];
        } else {
          vErrors.push(err8);
        }
        errors++;
      }
      if (typeof data2 == "number" && isFinite(data2)) {
        if (data2 < 1 || isNaN(data2)) {
          const err9 = { instancePath: instancePath + "/version", schemaPath: "#/properties/version/minimum", keyword: "minimum", params: { comparison: ">=", limit: 1 }, message: "must be >= 1" };
          if (vErrors === null) {
            vErrors = [err9];
          } else {
            vErrors.push(err9);
          }
          errors++;
        }
      }
    }
    if (data.created_at !== void 0) {
      if (typeof data.created_at !== "string") {
        const err10 = { instancePath: instancePath + "/created_at", schemaPath: "#/properties/created_at/type", keyword: "type", params: { type: "string" }, message: "must be string" };
        if (vErrors === null) {
          vErrors = [err10];
        } else {
          vErrors.push(err10);
        }
        errors++;
      }
    }
    if (data.source_release_id !== void 0) {
      if (typeof data.source_release_id !== "string") {
        const err11 = { instancePath: instancePath + "/source_release_id", schemaPath: "#/properties/source_release_id/type", keyword: "type", params: { type: "string" }, message: "must be string" };
        if (vErrors === null) {
          vErrors = [err11];
        } else {
          vErrors.push(err11);
        }
        errors++;
      }
    }
    if (data.runtime_contract_version !== void 0) {
      let data5 = data.runtime_contract_version;
      if (!(typeof data5 == "number" && isFinite(data5))) {
        const err12 = { instancePath: instancePath + "/runtime_contract_version", schemaPath: "#/properties/runtime_contract_version/type", keyword: "type", params: { type: "number" }, message: "must be number" };
        if (vErrors === null) {
          vErrors = [err12];
        } else {
          vErrors.push(err12);
        }
        errors++;
      }
    }
    if (data.deidentified !== void 0) {
      if (typeof data.deidentified !== "boolean") {
        const err13 = { instancePath: instancePath + "/deidentified", schemaPath: "#/properties/deidentified/type", keyword: "type", params: { type: "boolean" }, message: "must be boolean" };
        if (vErrors === null) {
          vErrors = [err13];
        } else {
          vErrors.push(err13);
        }
        errors++;
      }
    }
    if (data.deidentified_trace_ref !== void 0) {
      let data7 = data.deidentified_trace_ref;
      if (typeof data7 === "string") {
        if (func1(data7) < 1) {
          const err14 = { instancePath: instancePath + "/deidentified_trace_ref", schemaPath: "#/properties/deidentified_trace_ref/minLength", keyword: "minLength", params: { limit: 1 }, message: "must NOT have fewer than 1 characters" };
          if (vErrors === null) {
            vErrors = [err14];
          } else {
            vErrors.push(err14);
          }
          errors++;
        }
      } else {
        const err15 = { instancePath: instancePath + "/deidentified_trace_ref", schemaPath: "#/properties/deidentified_trace_ref/type", keyword: "type", params: { type: "string" }, message: "must be string" };
        if (vErrors === null) {
          vErrors = [err15];
        } else {
          vErrors.push(err15);
        }
        errors++;
      }
    }
    if (data.failure_type !== void 0) {
      if (typeof data.failure_type !== "string") {
        const err16 = { instancePath: instancePath + "/failure_type", schemaPath: "#/properties/failure_type/type", keyword: "type", params: { type: "string" }, message: "must be string" };
        if (vErrors === null) {
          vErrors = [err16];
        } else {
          vErrors.push(err16);
        }
        errors++;
      }
    }
    if (data.detection_method !== void 0) {
      if (typeof data.detection_method !== "string") {
        const err17 = { instancePath: instancePath + "/detection_method", schemaPath: "#/properties/detection_method/type", keyword: "type", params: { type: "string" }, message: "must be string" };
        if (vErrors === null) {
          vErrors = [err17];
        } else {
          vErrors.push(err17);
        }
        errors++;
      }
    }
    if (data.review_status !== void 0) {
      if (typeof data.review_status !== "string") {
        const err18 = { instancePath: instancePath + "/review_status", schemaPath: "#/properties/review_status/type", keyword: "type", params: { type: "string" }, message: "must be string" };
        if (vErrors === null) {
          vErrors = [err18];
        } else {
          vErrors.push(err18);
        }
        errors++;
      }
    }
    if (data.expected !== void 0) {
      let data11 = data.expected;
      if (!(data11 && typeof data11 == "object" && !Array.isArray(data11)) && typeof data11 !== "string") {
        const err19 = { instancePath: instancePath + "/expected", schemaPath: "#/properties/expected/type", keyword: "type", params: { type: schema50.properties.expected.type }, message: "must be object,string" };
        if (vErrors === null) {
          vErrors = [err19];
        } else {
          vErrors.push(err19);
        }
        errors++;
      }
    }
    if (data.expected_kind !== void 0) {
      if (typeof data.expected_kind !== "string") {
        const err20 = { instancePath: instancePath + "/expected_kind", schemaPath: "#/properties/expected_kind/type", keyword: "type", params: { type: "string" }, message: "must be string" };
        if (vErrors === null) {
          vErrors = [err20];
        } else {
          vErrors.push(err20);
        }
        errors++;
      }
    }
    if (data.reviewed_input !== void 0) {
      let data13 = data.reviewed_input;
      if (!(data13 && typeof data13 == "object" && !Array.isArray(data13))) {
        const err21 = { instancePath: instancePath + "/reviewed_input", schemaPath: "#/properties/reviewed_input/type", keyword: "type", params: { type: "object" }, message: "must be object" };
        if (vErrors === null) {
          vErrors = [err21];
        } else {
          vErrors.push(err21);
        }
        errors++;
      }
    }
    if (data.question_set !== void 0) {
      let data14 = data.question_set;
      if (data14 && typeof data14 == "object" && !Array.isArray(data14)) {
        if (data14.id === void 0) {
          const err22 = { instancePath: instancePath + "/question_set", schemaPath: "ArtifactRefRow.schema.json/required", keyword: "required", params: { missingProperty: "id" }, message: "must have required property 'id'" };
          if (vErrors === null) {
            vErrors = [err22];
          } else {
            vErrors.push(err22);
          }
          errors++;
        }
        if (data14.version === void 0) {
          const err23 = { instancePath: instancePath + "/question_set", schemaPath: "ArtifactRefRow.schema.json/required", keyword: "required", params: { missingProperty: "version" }, message: "must have required property 'version'" };
          if (vErrors === null) {
            vErrors = [err23];
          } else {
            vErrors.push(err23);
          }
          errors++;
        }
        if (data14.content_hash === void 0) {
          const err24 = { instancePath: instancePath + "/question_set", schemaPath: "ArtifactRefRow.schema.json/required", keyword: "required", params: { missingProperty: "content_hash" }, message: "must have required property 'content_hash'" };
          if (vErrors === null) {
            vErrors = [err24];
          } else {
            vErrors.push(err24);
          }
          errors++;
        }
        if (data14.id !== void 0) {
          if (typeof data14.id !== "string") {
            const err25 = { instancePath: instancePath + "/question_set/id", schemaPath: "ArtifactRefRow.schema.json/properties/id/type", keyword: "type", params: { type: "string" }, message: "must be string" };
            if (vErrors === null) {
              vErrors = [err25];
            } else {
              vErrors.push(err25);
            }
            errors++;
          }
        }
        if (data14.version !== void 0) {
          if (typeof data14.version !== "string") {
            const err26 = { instancePath: instancePath + "/question_set/version", schemaPath: "ArtifactRefRow.schema.json/properties/version/type", keyword: "type", params: { type: "string" }, message: "must be string" };
            if (vErrors === null) {
              vErrors = [err26];
            } else {
              vErrors.push(err26);
            }
            errors++;
          }
        }
        if (data14.content_hash !== void 0) {
          if (typeof data14.content_hash !== "string") {
            const err27 = { instancePath: instancePath + "/question_set/content_hash", schemaPath: "ArtifactRefRow.schema.json/properties/content_hash/type", keyword: "type", params: { type: "string" }, message: "must be string" };
            if (vErrors === null) {
              vErrors = [err27];
            } else {
              vErrors.push(err27);
            }
            errors++;
          }
        }
      } else {
        const err28 = { instancePath: instancePath + "/question_set", schemaPath: "ArtifactRefRow.schema.json/type", keyword: "type", params: { type: "object" }, message: "must be object" };
        if (vErrors === null) {
          vErrors = [err28];
        } else {
          vErrors.push(err28);
        }
        errors++;
      }
    }
    if (data.ext !== void 0) {
      let data18 = data.ext;
      if (!(data18 && typeof data18 == "object" && !Array.isArray(data18))) {
        const err29 = { instancePath: instancePath + "/ext", schemaPath: "#/properties/ext/type", keyword: "type", params: { type: "object" }, message: "must be object" };
        if (vErrors === null) {
          vErrors = [err29];
        } else {
          vErrors.push(err29);
        }
        errors++;
      }
    }
  } else {
    const err30 = { instancePath, schemaPath: "#/type", keyword: "type", params: { type: "object" }, message: "must be object" };
    if (vErrors === null) {
      vErrors = [err30];
    } else {
      vErrors.push(err30);
    }
    errors++;
  }
  validate34.errors = vErrors;
  return errors === 0;
}
validate34.evaluated = { "props": { "pipeline_schema_version": true, "case_id": true, "version": true, "created_at": true, "source_release_id": true, "runtime_contract_version": true, "deidentified": true, "deidentified_trace_ref": true, "failure_type": true, "detection_method": true, "review_status": true, "expected": true, "expected_kind": true, "reviewed_input": true, "question_set": true, "ext": true }, "dynamicProps": false, "dynamicItems": false };
function validate33(data, { instancePath = "", parentData, parentDataProperty, rootData = data, dynamicAnchors = {} } = {}) {
  ;
  let vErrors = null;
  let errors = 0;
  const evaluated0 = validate33.evaluated;
  if (evaluated0.dynamicProps) {
    evaluated0.props = void 0;
  }
  if (evaluated0.dynamicItems) {
    evaluated0.items = void 0;
  }
  if (data && typeof data == "object" && !Array.isArray(data)) {
    if (data.cases === void 0) {
      const err0 = { instancePath, schemaPath: "#/required", keyword: "required", params: { missingProperty: "cases" }, message: "must have required property 'cases'" };
      if (vErrors === null) {
        vErrors = [err0];
      } else {
        vErrors.push(err0);
      }
      errors++;
    }
    for (const key0 in data) {
      if (!(key0 === "cases")) {
        const err1 = { instancePath, schemaPath: "#/additionalProperties", keyword: "additionalProperties", params: { additionalProperty: key0 }, message: "must NOT have additional properties" };
        if (vErrors === null) {
          vErrors = [err1];
        } else {
          vErrors.push(err1);
        }
        errors++;
      }
    }
    if (data.cases !== void 0) {
      let data0 = data.cases;
      if (Array.isArray(data0)) {
        const len0 = data0.length;
        for (let i0 = 0; i0 < len0; i0++) {
          if (!validate34(data0[i0], { instancePath: instancePath + "/cases/" + i0, parentData: data0, parentDataProperty: i0, rootData, dynamicAnchors })) {
            vErrors = vErrors === null ? validate34.errors : vErrors.concat(validate34.errors);
            errors = vErrors.length;
          }
        }
      } else {
        const err2 = { instancePath: instancePath + "/cases", schemaPath: "#/properties/cases/type", keyword: "type", params: { type: "array" }, message: "must be array" };
        if (vErrors === null) {
          vErrors = [err2];
        } else {
          vErrors.push(err2);
        }
        errors++;
      }
    }
  } else {
    const err3 = { instancePath, schemaPath: "#/type", keyword: "type", params: { type: "object" }, message: "must be object" };
    if (vErrors === null) {
      vErrors = [err3];
    } else {
      vErrors.push(err3);
    }
    errors++;
  }
  validate33.errors = vErrors;
  return errors === 0;
}
validate33.evaluated = { "props": true, "dynamicProps": false, "dynamicItems": false };
exports.CaseListQuery = validate36;
function validate36(data, { instancePath = "", parentData, parentDataProperty, rootData = data, dynamicAnchors = {} } = {}) {
  ;
  let vErrors = null;
  let errors = 0;
  const evaluated0 = validate36.evaluated;
  if (evaluated0.dynamicProps) {
    evaluated0.props = void 0;
  }
  if (evaluated0.dynamicItems) {
    evaluated0.items = void 0;
  }
  if (data && typeof data == "object" && !Array.isArray(data)) {
    for (const key0 in data) {
      if (!(key0 === "review_status" || key0 === "failure_type" || key0 === "source_release_id" || key0 === "latest_only")) {
        const err0 = { instancePath, schemaPath: "#/additionalProperties", keyword: "additionalProperties", params: { additionalProperty: key0 }, message: "must NOT have additional properties" };
        if (vErrors === null) {
          vErrors = [err0];
        } else {
          vErrors.push(err0);
        }
        errors++;
      }
    }
    if (data.review_status !== void 0) {
      if (typeof data.review_status !== "string") {
        const err1 = { instancePath: instancePath + "/review_status", schemaPath: "#/properties/review_status/type", keyword: "type", params: { type: "string" }, message: "must be string" };
        if (vErrors === null) {
          vErrors = [err1];
        } else {
          vErrors.push(err1);
        }
        errors++;
      }
    }
    if (data.failure_type !== void 0) {
      if (typeof data.failure_type !== "string") {
        const err2 = { instancePath: instancePath + "/failure_type", schemaPath: "#/properties/failure_type/type", keyword: "type", params: { type: "string" }, message: "must be string" };
        if (vErrors === null) {
          vErrors = [err2];
        } else {
          vErrors.push(err2);
        }
        errors++;
      }
    }
    if (data.source_release_id !== void 0) {
      if (typeof data.source_release_id !== "string") {
        const err3 = { instancePath: instancePath + "/source_release_id", schemaPath: "#/properties/source_release_id/type", keyword: "type", params: { type: "string" }, message: "must be string" };
        if (vErrors === null) {
          vErrors = [err3];
        } else {
          vErrors.push(err3);
        }
        errors++;
      }
    }
    if (data.latest_only !== void 0) {
      if (typeof data.latest_only !== "boolean") {
        const err4 = { instancePath: instancePath + "/latest_only", schemaPath: "#/properties/latest_only/type", keyword: "type", params: { type: "boolean" }, message: "must be boolean" };
        if (vErrors === null) {
          vErrors = [err4];
        } else {
          vErrors.push(err4);
        }
        errors++;
      }
    }
  } else {
    const err5 = { instancePath, schemaPath: "#/type", keyword: "type", params: { type: "object" }, message: "must be object" };
    if (vErrors === null) {
      vErrors = [err5];
    } else {
      vErrors.push(err5);
    }
    errors++;
  }
  validate36.errors = vErrors;
  return errors === 0;
}
validate36.evaluated = { "props": true, "dynamicProps": false, "dynamicItems": false };
exports.CaseRecord = validate34;
exports.CaseReviewDraft = validate37;
var schema53 = { "$schema": "https://json-schema.org/draft/2020-12/schema", "$id": "CaseReviewDraft.schema.json", "title": "CaseReviewDraft", "description": "case_review_draft\uC758 \uCD9C\uB825\uC774\uC790 link_failure_review\uC758 \uC785\uB825(caseId\uC640 \uD568\uAED8): \uBCF4\uB0B4\uB3C4 \uB418\uB294 \uAC80\uD1A0 \uB0B4\uC6A9. \uC885\uB958\uAC00 \uC815\uD574\uC9C0\uBA74 \uC785\uB825\xB7\uC815\uB2F5\uC740 \uADF8 \uC885\uB958\uC758 \uBAA8\uB378 \uC785\uCD9C\uB825 \uACC4\uC57D \uC2A4\uD0A4\uB9C8\uB97C \uD1B5\uACFC\uD574\uC57C \uD55C\uB2E4(LORA_A: ActionExtractionInput/ActionExtraction, LORA_B: ResponseRequest/ResponseText).", "type": "object", "required": ["review_status"], "properties": { "review_status": { "enum": ["PENDING", "CONFIRMED", "DISMISSED"] }, "expected_kind": { "enum": ["LORA_A", "LORA_B"] }, "reviewed_input": { "type": "object" }, "expected": { "type": ["object", "string"] } }, "additionalProperties": false, "allOf": [{ "if": { "properties": { "review_status": { "enum": ["PENDING", "DISMISSED"] } }, "required": ["review_status"] }, "then": { "properties": { "expected_kind": false, "reviewed_input": false, "expected": false } } }, { "if": { "properties": { "expected_kind": { "const": "LORA_A" } }, "required": ["expected_kind"] }, "then": { "properties": { "reviewed_input": { "$ref": "ActionExtractionInput.schema.json" }, "expected": { "$ref": "ActionExtraction.schema.json" } } } }, { "if": { "properties": { "expected_kind": { "const": "LORA_B" } }, "required": ["expected_kind"] }, "then": { "properties": { "reviewed_input": { "$ref": "ResponseRequest.schema.json" }, "expected": { "$ref": "ResponseText.schema.json" } } } }, { "if": { "anyOf": [{ "required": ["reviewed_input"] }, { "required": ["expected"] }] }, "then": { "required": ["expected_kind"] } }] };
var schema57 = { "$schema": "https://json-schema.org/draft/2020-12/schema", "title": "ActionExtraction", "description": "LoRA-A \uCD9C\uB825(2.0.0, D74). \uAC12 \uCD94\uCD9C\xB7\uC815\uADDC\uD654\xB7\uC808\uCC28(action)\xB7\uB2E4\uC74C \uBB38\uD56D(next_item)\uC744 \uD55C \uBC88\uC5D0 \uB0B8\uB2E4. \uC11C\uBE44\uC2A4\uC5D0\uB294 \uC815\uADDC\uD654\uAE30\uC640 Plan \uCF54\uB4DC\uAC00 \uC5C6\uB2E4. \uBAA8\uB378\uC774 \uB0B4\uB294 JSON \uADF8\uB300\uB85C(\uD0A4 \uC21C\uC11C\uB294 \uC0AC\uC804\uC21C)\uC774\uACE0 \uBAA8\uB378 \uCD9C\uB825\uC774\uB77C ext\uB97C \uB450\uC9C0 \uC54A\uB294\uB2E4. \uC81C\uC57D \uB514\uCF54\uB529 \uC5D4\uC9C4\uC774 allOf/if/then\uC744 \uBB34\uC2DC\uD560 \uC218 \uC788\uC73C\uBBC0\uB85C(HTTP.md I9) action\uBCC4 \uADDC\uCE59\uC740 \uC0AC\uD6C4 \uAC80\uC99D\uC774 \uB9E1\uB294\uB2E4.", "x-producers": ["admin-console", "model-runtime"], "x-consumers": ["model-lab", "ops-feedback", "survey-service", "synthetic-data"], "type": "object", "additionalProperties": false, "required": ["values", "action", "next_item"], "properties": { "action": { "enum": ["NEXT", "CORRECT", "REASK", "CONFIRM", "HOLD", "SKIP", "REDIRECT"], "description": "START\uB294 A\uAC00 \uB0B4\uC9C0 \uC54A\uB294\uB2E4(\uC11C\uBE44\uC2A4\uAC00 \uC2DC\uC791\uD560 \uB54C B \uC785\uB825\uC5D0\uB9CC \uC4F4\uB2E4)." }, "next_item": { "type": "string", "pattern": "^(END|Q[0-9]+(\\.D[0-9]{2})?(_[0-9]+)?)$(?![\\s\\S])", "description": "\uCD94\uB860 \uC11C\uBC84\uAC00 action\xB7targets\xB7values\uC640 \uBB38\uD56D \uC21C\uC11C\uD45C\uB85C \uC815\uD574 \uCC44\uC6B0\uB294 \uAC12(3.1.3, \uADDC\uCE59 next_item.derived_by=server). \uBB38\uD56D ID \uBB38\uBC95(Q \uBC88\uD638 \uD615\uC2DD)\uC740 \uD559\uC2B5 \uB370\uC774\uD130\uC14B(labels.py)\uC774 \uC815\uBCF8\uC778 \uBAA8\uB378 \uC785\uCD9C\uB825\uC758 \uBC94\uC704\uB2E4: \uC774 \uAD6C\uC870\uC640 \uB2E4\uB978 \uBB38\uC9C4\uD45C\uB294 \uAC8C\uC774\uD2B8\uAC00 QUESTION_MODEL_COMPAT \uB85C \uBC18\uB824\uD558\uBBC0\uB85C(U81, ModelPackageManifest.lineage.question_sets) \uCD9C\uACE0\uB41C \uB9B4\uB9AC\uC2A4\uC758 \uBB38\uD56D ID \uB294 \uD56D\uC0C1 \uC774 \uBB38\uBC95\uC774\uB2E4(3.4.4 \uAC80\uD1A0 B-18 \uD310\uC815: \uC601\uC5ED \uB0B4\uBD80 \uBB38\uBC95\uC774 \uC0C8\uC5B4 \uB098\uC628 \uAC83\uC774 \uC544\uB2C8\uB77C \uBAA8\uB378\uC774 \uBC1B\uB294 \uC785\uB825\uC758 \uBC94\uC704). \uBAA8\uB378 \uCD9C\uB825\uC758 \uAC12\uC740 \uC11C\uBC84\uAC00 \uB36E\uC5B4\uC4F4\uB2E4. \uC758\uBBF8: \uB2E4\uC74C\uC5D0 \uBB3C\uC744 \uBB38\uD56D \uB610\uB294 END. REASK\xB7REDIRECT\uB294 \uC785\uB825 question_id\uC640 \uAC19\uB2E4. CONFIRM\uC740 \uB300\uC0C1 \uCE78\uC758 \uBB38\uD56D\uC774\uBA70 \uC785\uB825 question_id\uC640 \uB2E4\uB97C \uC218 \uC788\uB2E4(\uB370\uC774\uD130 \uD655\uC778). NEXT\xB7CORRECT\xB7HOLD\xB7SKIP\uC740 \uAC19\uC740 \uB9D0\uC5D0\uC11C \uC77C\uBD80 \uCE78\uC774 \uC774\uBBF8 \uCC44\uC6CC\uC9C4 \uBB38\uD56D(\uC608: Q4 \uC608\uC640 Q4_1.status \uB3D9\uC2DC)\uC73C\uB85C \uB118\uC5B4\uAC08 \uC218 \uC788\uACE0 \uC774\uB97C \uACC4\uC57D\uC73C\uB85C \uC778\uC815\uD55C\uB2E4." }, "note": { "type": "string", "minLength": 1, "description": "REDIRECT\uC758 OUT_OF_SCHEMA\uB9CC. \uBB38\uC9C4\uD45C\uC5D0 \uC5C6\uB294 \uAC74\uAC15 \uC815\uBCF4\uC758 \uC9E7\uC740 \uC694\uC57D." }, "reason": { "enum": ["MISSING", "OUT_OF_RANGE", "UNKNOWN_UNIT", "VAGUE_QUANTITY", "RANGE_SPANS_OPTIONS", "COUNT_EXCEEDS_DAYS", "OTHER_BEVERAGE", "BEVERAGE_MISSING", "MISSING_NUMBER", "UNPARSED_VALUE", "INVALID_OPTION", "CONFLICT_WITH_PREVIOUS", "CONFLICT_DOES_NOT_DRINK", "CONFLICT_MAX_BELOW_USUAL", "UNCERTAIN", "REQUEST_SKIP", "REFUSED", "ASK_PURPOSE", "OFF_TOPIC", "OUT_OF_SCHEMA"], "description": "NEXT\xB7CORRECT\uC5D0\uB294 \uC5C6\uB2E4. action\uBCC4 \uD5C8\uC6A9\uAC12\uC740 allOf \uCC38\uACE0. OTHER_BEVERAGE, MISSING_NUMBER, UNPARSED_VALUE, INVALID_OPTION 4\uC885\uC740 \uD559\uC2B5 \uB370\uC774\uD130\uC5D0 \uC788\uC5B4 \uACC4\uC57D\uC73C\uB85C \uC778\uC815\uD55C\uB2E4(\uB370\uC774\uD130\uC14B \uB2F4\uB2F9\uC758 \uC815\uB9AC \uC694\uCCAD\uC740 V2_DRAFT.md\uC758 \uC5F4\uB9B0 \uD56D\uBAA9)." }, "targets": { "type": "array", "minItems": 1, "items": { "$comment": "\uBAA8\uB378 \uD0A4 \uBB38\uBC95(CONVENTIONS 10\uC808): \uBB38\uD56D.\uCE78 \uB610\uB294 \uBB38\uD56D[\uC885\uB958].\uCE78. \uBB38\uD56D ID\uB294 Q1.D01, Q4_1, Q10 \uD615\uD0DC. \uC885\uB958 \uAD04\uD638\uB294 \uC220 \uCE78\uC5D0\uB9CC \uBD99\uACE0, \uC885\uB958\uB97C \uBAA8\uB974\uB294 \uC220 \uCE78(BEVERAGE_MISSING)\uC740 \uAD04\uD638 \uC5C6\uB294 Q7_1.amount \uD615\uD0DC\uB85C \uB0B8\uB2E4(\uACC4\uC57D\uC73C\uB85C \uC778\uC815, 2.0.0). SlotRef \uBB38\uC790\uC5F4(ChangeClassification.affected_slots)\uACFC\uB294 \uB2E4\uB978 \uBB38\uBC95\uC774\uB2E4.", "type": "string", "pattern": "^Q[0-9]+(\\.D[0-9]{2})?(_[0-9]+)?(\\[(soju|beer|spirits|makgeolli|wine)\\])?\\.[a-z][a-z_]*$(?![\\s\\S])", "maxLength": 128 }, "description": "REASK\xB7CONFIRM\xB7HOLD\xB7SKIP\uB9CC. \uD56D\uBAA9\uC740 values\uC758 key \uC911 \uD558\uB098(\uC2A4\uD0A4\uB9C8\uB85C \uD45C\uD604 \uBABB \uD568, \uC758\uBBF8 \uAC80\uC99D). \uADFC\uAC70: \uC0C1\uD55C 256 \uC740 \uCE21\uC815 \uCD5C\uB300(\uC2AC\uB86F 52)\uC758 \uC57D 5\uBC30 \uC5EC\uC720\uB97C \uB454 \uC124\uACC4 \uC0C1\uD55C(D125 '\uC0C1\uD55C\uC740 \uCE21\uC815 \uCD5C\uC545 \uC704 \uC5EC\uC720'). \uCE21\uC815: \uD604\uC7AC \uC6B4\uC601 \uBB38\uC9C4\uD45C 2\uC885(question-authoring/forms/health-screening-v1.txt, health-screening-short-order.txt) \uAC01\uAC01 \uBB38\uD56D 31\xB7\uC2AC\uB86F 52\xB7\uBB38\uD56D\uB2F9 \uCD5C\uB300 4(2026-11-08 \uD5E4\uB4DC grep \uCE21\uC815). \uD559\uC2B5 \uB370\uC774\uD130 \uCD5C\uC885\uBCF8(reference/openit-server/data/final lora_a_*.jsonl 32,170\uD589, 2026-11-08 \uCE21\uC815)\uC758 \uCD5C\uB300\uB294 targets 4\xB7values 4\xB7key 22\uC790\uB85C \uC774 \uC0C1\uD55C \uC548\uC774\uB2E4. \uBAA8\uB378 \uC785\uCD9C\uB825 \uC815\uBCF8(labels.py)\uC5D0\uB294 \uC22B\uC790 \uC0C1\uD55C\uC774 \uC5C6\uACE0 \uAC12\uC774 \uBB38\uD56D \uC740\uD589\uC758 \uCE78\uC5D0\uC11C\uB9CC \uB098\uC628\uB2E4\uB294 \uAD6C\uC870\uC801 \uC0C1\uD55C\uBFD0\uC774\uB2E4. \uBB38\uC9C4\uD45C\uAC00 \uCEE4\uC9C0\uBA74 \uB2E4\uC2DC \uC7B0\uB2E4.", "maxItems": 256 }, "values": { "type": "array", "items": { "type": "object", "additionalProperties": false, "required": ["key", "value", "precision", "status", "save"], "properties": { "key": { "$comment": "\uBAA8\uB378 \uD0A4 \uBB38\uBC95(CONVENTIONS 10\uC808): \uBB38\uD56D.\uCE78 \uB610\uB294 \uBB38\uD56D[\uC885\uB958].\uCE78. \uBB38\uD56D ID\uB294 Q1.D01, Q4_1, Q10 \uD615\uD0DC. \uC885\uB958 \uAD04\uD638\uB294 \uC220 \uCE78\uC5D0\uB9CC \uBD99\uACE0, \uC885\uB958\uB97C \uBAA8\uB974\uB294 \uC220 \uCE78(BEVERAGE_MISSING)\uC740 \uAD04\uD638 \uC5C6\uB294 Q7_1.amount \uD615\uD0DC\uB85C \uB0B8\uB2E4(\uACC4\uC57D\uC73C\uB85C \uC778\uC815, 2.0.0). SlotRef \uBB38\uC790\uC5F4(ChangeClassification.affected_slots)\uACFC\uB294 \uB2E4\uB978 \uBB38\uBC95\uC774\uB2E4.", "type": "string", "pattern": "^Q[0-9]+(\\.D[0-9]{2})?(_[0-9]+)?(\\[(soju|beer|spirits|makgeolli|wine)\\])?\\.[a-z][a-z_]*$(?![\\s\\S])", "maxLength": 128, "description": "\uADFC\uAC70: \uAE38\uC774 \uC0C1\uD55C 128 \uC740 \uACC4\uC57D Id \uC0C1\uD55C\uACFC \uAC19\uC740 \uC124\uACC4 \uC0C1\uD55C(CONVENTIONS 2\uC808, \uCE21\uC815 \uC548 \uD568; \uD559\uC2B5 \uB370\uC774\uD130 \uCD5C\uB300 22\uC790, 2026-11-08). 5.0.0(CaseReviewRequest.expected \uB85C \uC0AC\uB78C\uC774 \uB123\uB294 \uACBD\uB85C\uC758 \uC0C1\uD55C, \uACB0\uD568 \uB300\uC7A5 #10)." }, "precision": { "enum": ["exact", "approximate", "unspecified"] }, "save": { "type": "boolean" }, "status": { "enum": ["ANSWERED", "CORRECTION", "MISSING", "UNCLEAR", "CONFLICT", "UNKNOWN", "REJECTED"] }, "value": { "$comment": "\uCE78 \uAC12. \uB370\uC774\uD130\uC5D0\uC11C \uD655\uC778\uD55C \uD615\uD0DC: \uBD88\uB9AC\uC5B8, \uC22B\uC790(\uC815\uC218\xB7\uC18C\uC218), \uC120\uD0DD\uC9C0 \uCF54\uB4DC \uBB38\uC790\uC5F4, null.", "type": ["boolean", "number", "string", "null"] } }, "allOf": [{ "if": { "properties": { "status": { "enum": ["ANSWERED", "CORRECTION"] } }, "required": ["status"] }, "then": { "properties": { "save": { "const": true }, "precision": { "enum": ["exact", "approximate"] }, "value": { "type": ["boolean", "number", "string"] } } }, "else": { "properties": { "save": { "const": false } } } }, { "if": { "properties": { "status": { "enum": ["MISSING", "UNCLEAR", "UNKNOWN", "REJECTED"] } }, "required": ["status"] }, "then": { "properties": { "value": { "type": "null" }, "precision": { "const": "unspecified" } } } }] }, "description": "\uC774\uBC88 \uB9D0\uC5D0\uC11C \uC815\uD55C \uCE78 \uAC12\uB4E4. REDIRECT\uB294 \uBE48 \uBAA9\uB85D. \uADFC\uAC70: \uC0C1\uD55C 256 \uC740 \uCE21\uC815 \uCD5C\uB300(\uC2AC\uB86F 52)\uC758 \uC57D 5\uBC30 \uC5EC\uC720\uB97C \uB454 \uC124\uACC4 \uC0C1\uD55C(D125). \uCE21\uC815: \uD604\uC7AC \uC6B4\uC601 \uBB38\uC9C4\uD45C 2\uC885(question-authoring/forms/health-screening-v1.txt, health-screening-short-order.txt) \uAC01\uAC01 \uBB38\uD56D 31\xB7\uC2AC\uB86F 52\xB7\uBB38\uD56D\uB2F9 \uCD5C\uB300 4(2026-11-08 \uD5E4\uB4DC grep \uCE21\uC815). \uD559\uC2B5 \uB370\uC774\uD130 \uCD5C\uC885\uBCF8(reference/openit-server/data/final lora_a_*.jsonl 32,170\uD589, 2026-11-08 \uCE21\uC815)\uC758 \uCD5C\uB300\uB294 targets 4\xB7values 4\xB7key 22\uC790\uB85C \uC774 \uC0C1\uD55C \uC548\uC774\uB2E4. \uBAA8\uB378 \uC785\uCD9C\uB825 \uC815\uBCF8(labels.py)\uC5D0\uB294 \uC22B\uC790 \uC0C1\uD55C\uC774 \uC5C6\uACE0 \uAC12\uC774 \uBB38\uD56D \uC740\uD589\uC758 \uCE78\uC5D0\uC11C\uB9CC \uB098\uC628\uB2E4\uB294 \uAD6C\uC870\uC801 \uC0C1\uD55C\uBFD0\uC774\uB2E4. \uBB38\uC9C4\uD45C\uAC00 \uCEE4\uC9C0\uBA74 \uB2E4\uC2DC \uC7B0\uB2E4.", "maxItems": 256 } }, "allOf": [{ "if": { "properties": { "action": { "const": "NEXT" } }, "required": ["action"] }, "then": { "properties": { "reason": false, "targets": false, "note": false } } }, { "if": { "properties": { "action": { "const": "CORRECT" } }, "required": ["action"] }, "then": { "properties": { "reason": false, "targets": false, "note": false } } }, { "if": { "properties": { "action": { "const": "REASK" } }, "required": ["action"] }, "then": { "required": ["reason", "targets"], "properties": { "reason": { "enum": ["MISSING", "OUT_OF_RANGE", "UNKNOWN_UNIT", "VAGUE_QUANTITY", "RANGE_SPANS_OPTIONS", "COUNT_EXCEEDS_DAYS", "OTHER_BEVERAGE", "BEVERAGE_MISSING", "MISSING_NUMBER", "UNPARSED_VALUE", "INVALID_OPTION"] }, "note": false } } }, { "if": { "properties": { "action": { "const": "CONFIRM" } }, "required": ["action"] }, "then": { "required": ["reason", "targets"], "properties": { "reason": { "enum": ["CONFLICT_WITH_PREVIOUS", "CONFLICT_DOES_NOT_DRINK", "CONFLICT_MAX_BELOW_USUAL"] }, "note": false } } }, { "if": { "properties": { "action": { "const": "HOLD" } }, "required": ["action"] }, "then": { "required": ["reason", "targets"], "properties": { "reason": { "enum": ["UNCERTAIN"] }, "note": false } } }, { "if": { "properties": { "action": { "const": "SKIP" } }, "required": ["action"] }, "then": { "required": ["reason", "targets"], "properties": { "reason": { "enum": ["REQUEST_SKIP", "REFUSED"] }, "note": false } } }, { "if": { "properties": { "action": { "const": "REDIRECT" } }, "required": ["action"] }, "then": { "required": ["reason"], "properties": { "reason": { "enum": ["ASK_PURPOSE", "OFF_TOPIC", "OUT_OF_SCHEMA"] }, "targets": false, "values": { "maxItems": 0 } } } }, { "if": { "properties": { "reason": { "const": "OUT_OF_SCHEMA" } }, "required": ["reason"] }, "then": { "required": ["note"] }, "else": { "properties": { "note": false } } }] };
var schema54 = { "$schema": "https://json-schema.org/draft/2020-12/schema", "title": "ActionExtractionInput", "description": "LoRA-A \uC785\uB825(2.0.0, D74). \uD658\uC790 \uBC1C\uD654 1\uD134\uACFC \uC9C1\uC804 \uBB38\uB9E5. \uBAA8\uB378\uC774 \uBC1B\uB294 JSON \uADF8\uB300\uB85C\uC774\uBA70 \uD559\uC2B5 \uB370\uC774\uD130\uC758 user \uBA54\uC2DC\uC9C0 \uB0B4\uC6A9\uC774\uB2E4. \uC2DC\uC2A4\uD15C \uD504\uB86C\uD504\uD2B8\uB294 \uBCC4\uB3C4(serving_config\uC758 \uD504\uB86C\uD504\uD2B8 \uD15C\uD50C\uB9BF \uBC84\uC804).", "x-producers": ["admin-console", "survey-service", "synthetic-data"], "x-consumers": ["model-lab", "model-runtime", "ops-feedback"], "type": "object", "additionalProperties": false, "required": ["question_id", "current_question", "user_utterance", "state"], "properties": { "question_id": { "$ref": "_common.schema.json#/$defs/QuestionId", "description": "\uC0C1\uB2F4\uC6D0\uC774 \uC9C0\uAE08 \uBB3B\uACE0 \uC788\uB294 \uBB38\uD56D. \uC815\uC815\xB7\uCDA9\uB3CC \uD750\uB984\uC5D0\uC11C\uB294 \uAC12\uC758 \uBB38\uD56D\uC774 \uC544\uB2C8\uB77C \uADF8\uB54C \uBB3B\uB358 \uBB38\uD56D\uC774\uB2E4." }, "current_question": { "type": "string", "minLength": 1, "description": "\uC0C1\uB2F4\uC6D0\uC774 \uBC29\uAE08 \uD55C \uB9D0(\uC55E LoRA-B \uC751\uB2F5 \uADF8\uB300\uB85C \uB610\uB294 \uBB38\uD56D \uC740\uD589 \uC9C8\uBB38)." }, "user_utterance": { "type": "string", "minLength": 1, "description": "\uD658\uC790 \uB9D0 1\uD134." }, "state": { "type": "object", "description": "\uC800\uC7A5 \uAC12. \uC9C0\uAE08 \uBB38\uD56D(\uC7AC\uC9C8\uBB38 \uC911\uC778 \uCE78 \uD3EC\uD568), \uC9C1\uC804\uC5D0 \uBB3C\uC740 \uBB38\uD56D, \uCC38\uC870 \uC6D0\uCC9C \uBB38\uD56D. \uCCAB \uBB38\uD56D\uC774\uBA74 \uBE44\uC5B4 \uC788\uB2E4.", "propertyNames": { "pattern": "^Q[0-9]+(\\.D[0-9]{2})?(_[0-9]+)?(\\[(soju|beer|spirits|makgeolli|wine)\\])?\\.[a-z][a-z_]*$(?![\\s\\S])" }, "additionalProperties": { "type": "object", "additionalProperties": false, "required": ["value", "status"], "properties": { "value": { "$comment": "\uCE78 \uAC12. \uB370\uC774\uD130\uC5D0\uC11C \uD655\uC778\uD55C \uD615\uD0DC: \uBD88\uB9AC\uC5B8, \uC22B\uC790(\uC815\uC218\xB7\uC18C\uC218), \uC120\uD0DD\uC9C0 \uCF54\uB4DC \uBB38\uC790\uC5F4, null.", "type": ["boolean", "number", "string", "null"] }, "status": { "enum": ["ANSWERED", "CORRECTION", "MISSING", "UNCLEAR", "CONFLICT", "UNKNOWN", "REJECTED"] } } } } } };
var pattern8 = new RegExp("^Q[0-9]+(\\.D[0-9]{2})?(_[0-9]+)?$(?![\\s\\S])", "u");
var pattern9 = new RegExp("^Q[0-9]+(\\.D[0-9]{2})?(_[0-9]+)?(\\[(soju|beer|spirits|makgeolli|wine)\\])?\\.[a-z][a-z_]*$(?![\\s\\S])", "u");
function validate38(data, { instancePath = "", parentData, parentDataProperty, rootData = data, dynamicAnchors = {} } = {}) {
  let vErrors = null;
  let errors = 0;
  const evaluated0 = validate38.evaluated;
  if (evaluated0.dynamicProps) {
    evaluated0.props = void 0;
  }
  if (evaluated0.dynamicItems) {
    evaluated0.items = void 0;
  }
  if (data && typeof data == "object" && !Array.isArray(data)) {
    if (data.question_id === void 0) {
      const err0 = { instancePath, schemaPath: "#/required", keyword: "required", params: { missingProperty: "question_id" }, message: "must have required property 'question_id'" };
      if (vErrors === null) {
        vErrors = [err0];
      } else {
        vErrors.push(err0);
      }
      errors++;
    }
    if (data.current_question === void 0) {
      const err1 = { instancePath, schemaPath: "#/required", keyword: "required", params: { missingProperty: "current_question" }, message: "must have required property 'current_question'" };
      if (vErrors === null) {
        vErrors = [err1];
      } else {
        vErrors.push(err1);
      }
      errors++;
    }
    if (data.user_utterance === void 0) {
      const err2 = { instancePath, schemaPath: "#/required", keyword: "required", params: { missingProperty: "user_utterance" }, message: "must have required property 'user_utterance'" };
      if (vErrors === null) {
        vErrors = [err2];
      } else {
        vErrors.push(err2);
      }
      errors++;
    }
    if (data.state === void 0) {
      const err3 = { instancePath, schemaPath: "#/required", keyword: "required", params: { missingProperty: "state" }, message: "must have required property 'state'" };
      if (vErrors === null) {
        vErrors = [err3];
      } else {
        vErrors.push(err3);
      }
      errors++;
    }
    for (const key0 in data) {
      if (!(key0 === "question_id" || key0 === "current_question" || key0 === "user_utterance" || key0 === "state")) {
        const err4 = { instancePath, schemaPath: "#/additionalProperties", keyword: "additionalProperties", params: { additionalProperty: key0 }, message: "must NOT have additional properties" };
        if (vErrors === null) {
          vErrors = [err4];
        } else {
          vErrors.push(err4);
        }
        errors++;
      }
    }
    if (data.question_id !== void 0) {
      let data0 = data.question_id;
      if (typeof data0 === "string") {
        if (!pattern8.test(data0)) {
          const err5 = { instancePath: instancePath + "/question_id", schemaPath: "_common.schema.json#/$defs/QuestionId/pattern", keyword: "pattern", params: { pattern: "^Q[0-9]+(\\.D[0-9]{2})?(_[0-9]+)?$(?![\\s\\S])" }, message: 'must match pattern "^Q[0-9]+(\\.D[0-9]{2})?(_[0-9]+)?$(?![\\s\\S])"' };
          if (vErrors === null) {
            vErrors = [err5];
          } else {
            vErrors.push(err5);
          }
          errors++;
        }
      } else {
        const err6 = { instancePath: instancePath + "/question_id", schemaPath: "_common.schema.json#/$defs/QuestionId/type", keyword: "type", params: { type: "string" }, message: "must be string" };
        if (vErrors === null) {
          vErrors = [err6];
        } else {
          vErrors.push(err6);
        }
        errors++;
      }
    }
    if (data.current_question !== void 0) {
      let data1 = data.current_question;
      if (typeof data1 === "string") {
        if (func1(data1) < 1) {
          const err7 = { instancePath: instancePath + "/current_question", schemaPath: "#/properties/current_question/minLength", keyword: "minLength", params: { limit: 1 }, message: "must NOT have fewer than 1 characters" };
          if (vErrors === null) {
            vErrors = [err7];
          } else {
            vErrors.push(err7);
          }
          errors++;
        }
      } else {
        const err8 = { instancePath: instancePath + "/current_question", schemaPath: "#/properties/current_question/type", keyword: "type", params: { type: "string" }, message: "must be string" };
        if (vErrors === null) {
          vErrors = [err8];
        } else {
          vErrors.push(err8);
        }
        errors++;
      }
    }
    if (data.user_utterance !== void 0) {
      let data2 = data.user_utterance;
      if (typeof data2 === "string") {
        if (func1(data2) < 1) {
          const err9 = { instancePath: instancePath + "/user_utterance", schemaPath: "#/properties/user_utterance/minLength", keyword: "minLength", params: { limit: 1 }, message: "must NOT have fewer than 1 characters" };
          if (vErrors === null) {
            vErrors = [err9];
          } else {
            vErrors.push(err9);
          }
          errors++;
        }
      } else {
        const err10 = { instancePath: instancePath + "/user_utterance", schemaPath: "#/properties/user_utterance/type", keyword: "type", params: { type: "string" }, message: "must be string" };
        if (vErrors === null) {
          vErrors = [err10];
        } else {
          vErrors.push(err10);
        }
        errors++;
      }
    }
    if (data.state !== void 0) {
      let data3 = data.state;
      if (data3 && typeof data3 == "object" && !Array.isArray(data3)) {
        for (const key1 in data3) {
          const _errs11 = errors;
          if (typeof key1 === "string") {
            if (!pattern9.test(key1)) {
              const err11 = { instancePath: instancePath + "/state", schemaPath: "#/properties/state/propertyNames/pattern", keyword: "pattern", params: { pattern: "^Q[0-9]+(\\.D[0-9]{2})?(_[0-9]+)?(\\[(soju|beer|spirits|makgeolli|wine)\\])?\\.[a-z][a-z_]*$(?![\\s\\S])" }, message: 'must match pattern "^Q[0-9]+(\\.D[0-9]{2})?(_[0-9]+)?(\\[(soju|beer|spirits|makgeolli|wine)\\])?\\.[a-z][a-z_]*$(?![\\s\\S])"', propertyName: key1 };
              if (vErrors === null) {
                vErrors = [err11];
              } else {
                vErrors.push(err11);
              }
              errors++;
            }
          }
          var valid2 = _errs11 === errors;
          if (!valid2) {
            const err12 = { instancePath: instancePath + "/state", schemaPath: "#/properties/state/propertyNames", keyword: "propertyNames", params: { propertyName: key1 }, message: "property name must be valid" };
            if (vErrors === null) {
              vErrors = [err12];
            } else {
              vErrors.push(err12);
            }
            errors++;
          }
        }
        for (const key2 in data3) {
          let data4 = data3[key2];
          if (data4 && typeof data4 == "object" && !Array.isArray(data4)) {
            if (data4.value === void 0) {
              const err13 = { instancePath: instancePath + "/state/" + key2.replace(/~/g, "~0").replace(/\//g, "~1"), schemaPath: "#/properties/state/additionalProperties/required", keyword: "required", params: { missingProperty: "value" }, message: "must have required property 'value'" };
              if (vErrors === null) {
                vErrors = [err13];
              } else {
                vErrors.push(err13);
              }
              errors++;
            }
            if (data4.status === void 0) {
              const err14 = { instancePath: instancePath + "/state/" + key2.replace(/~/g, "~0").replace(/\//g, "~1"), schemaPath: "#/properties/state/additionalProperties/required", keyword: "required", params: { missingProperty: "status" }, message: "must have required property 'status'" };
              if (vErrors === null) {
                vErrors = [err14];
              } else {
                vErrors.push(err14);
              }
              errors++;
            }
            for (const key3 in data4) {
              if (!(key3 === "value" || key3 === "status")) {
                const err15 = { instancePath: instancePath + "/state/" + key2.replace(/~/g, "~0").replace(/\//g, "~1"), schemaPath: "#/properties/state/additionalProperties/additionalProperties", keyword: "additionalProperties", params: { additionalProperty: key3 }, message: "must NOT have additional properties" };
                if (vErrors === null) {
                  vErrors = [err15];
                } else {
                  vErrors.push(err15);
                }
                errors++;
              }
            }
            if (data4.value !== void 0) {
              let data5 = data4.value;
              if (typeof data5 !== "boolean" && !(typeof data5 == "number" && isFinite(data5)) && typeof data5 !== "string" && data5 !== null) {
                const err16 = { instancePath: instancePath + "/state/" + key2.replace(/~/g, "~0").replace(/\//g, "~1") + "/value", schemaPath: "#/properties/state/additionalProperties/properties/value/type", keyword: "type", params: { type: schema54.properties.state.additionalProperties.properties.value.type }, message: "must be boolean,number,string,null" };
                if (vErrors === null) {
                  vErrors = [err16];
                } else {
                  vErrors.push(err16);
                }
                errors++;
              }
            }
            if (data4.status !== void 0) {
              let data6 = data4.status;
              if (!(data6 === "ANSWERED" || data6 === "CORRECTION" || data6 === "MISSING" || data6 === "UNCLEAR" || data6 === "CONFLICT" || data6 === "UNKNOWN" || data6 === "REJECTED")) {
                const err17 = { instancePath: instancePath + "/state/" + key2.replace(/~/g, "~0").replace(/\//g, "~1") + "/status", schemaPath: "#/properties/state/additionalProperties/properties/status/enum", keyword: "enum", params: { allowedValues: schema54.properties.state.additionalProperties.properties.status.enum }, message: "must be equal to one of the allowed values" };
                if (vErrors === null) {
                  vErrors = [err17];
                } else {
                  vErrors.push(err17);
                }
                errors++;
              }
            }
          } else {
            const err18 = { instancePath: instancePath + "/state/" + key2.replace(/~/g, "~0").replace(/\//g, "~1"), schemaPath: "#/properties/state/additionalProperties/type", keyword: "type", params: { type: "object" }, message: "must be object" };
            if (vErrors === null) {
              vErrors = [err18];
            } else {
              vErrors.push(err18);
            }
            errors++;
          }
        }
      } else {
        const err19 = { instancePath: instancePath + "/state", schemaPath: "#/properties/state/type", keyword: "type", params: { type: "object" }, message: "must be object" };
        if (vErrors === null) {
          vErrors = [err19];
        } else {
          vErrors.push(err19);
        }
        errors++;
      }
    }
  } else {
    const err20 = { instancePath, schemaPath: "#/type", keyword: "type", params: { type: "object" }, message: "must be object" };
    if (vErrors === null) {
      vErrors = [err20];
    } else {
      vErrors.push(err20);
    }
    errors++;
  }
  validate38.errors = vErrors;
  return errors === 0;
}
validate38.evaluated = { "props": true, "dynamicProps": false, "dynamicItems": false };
var schema58 = { "$schema": "https://json-schema.org/draft/2020-12/schema", "title": "ResponseRequest", "description": "LoRA-B \uC785\uB825(2.0.0, D74). A \uCD9C\uB825\uC744 \uBC1B\uC740 \uC11C\uBE44\uC2A4\uAC00 \uD45C \uCC3E\uAE30(\uBB38\uD56D \uBC88\uD638\uB85C \uC9C8\uBB38 \uBB38\uC7A5, \uCE78\uC73C\uB85C \uC0AC\uB78C \uB9D0 \uC124\uBA85)\uB9CC\uC73C\uB85C \uC870\uB9BD\uD55C\uB2E4. \uBAA8\uB378 \uD638\uCD9C \uC5C6\uC74C, \uD310\uB2E8 \uC5C6\uC74C. \uC2DC\uC791(START)\uC740 A\uB97C \uAC70\uCE58\uC9C0 \uC54A\uACE0 \uC11C\uBE44\uC2A4\uAC00 \uC9C1\uC811 \uB9CC\uB4E0\uB2E4. \uCD9C\uB825\uC740 JSON\uC774 \uC544\uB2C8\uB77C \uC751\uB2F5 \uBB38\uC7A5 \uD14D\uC2A4\uD2B8(ResponseText).", "x-producers": ["survey-service", "synthetic-data"], "x-consumers": ["model-runtime", "model-lab"], "type": "object", "additionalProperties": false, "required": ["action", "topic", "next"], "properties": { "action": { "enum": ["START", "NEXT", "CORRECT", "REASK", "CONFIRM", "HOLD", "SKIP", "REDIRECT"] }, "reason": { "enum": ["MISSING", "OUT_OF_RANGE", "UNKNOWN_UNIT", "VAGUE_QUANTITY", "RANGE_SPANS_OPTIONS", "COUNT_EXCEEDS_DAYS", "OTHER_BEVERAGE", "BEVERAGE_MISSING", "MISSING_NUMBER", "UNPARSED_VALUE", "INVALID_OPTION", "CONFLICT_WITH_PREVIOUS", "CONFLICT_DOES_NOT_DRINK", "CONFLICT_MAX_BELOW_USUAL", "UNCERTAIN", "REQUEST_SKIP", "REFUSED", "ASK_PURPOSE", "OFF_TOPIC", "OUT_OF_SCHEMA"] }, "topic": { "type": "string", "minLength": 1, "description": "\uC9C0\uAE08 \uB2E4\uB8E8\uB294 \uBB38\uD56D\uC744 \uC0AC\uB78C \uB9D0\uB85C(START\uB294 \uCCAB \uBB38\uD56D). IO_SPEC \uBCF8\uBB38\uC5D0\uB294 \uC5C6\uACE0 \uB370\uC774\uD130\uC5D0 \uC788\uB2E4." }, "user_utterance": { "type": "string", "minLength": 1, "description": "\uD658\uC790 \uB9D0. START\uC5D0\uB294 \uC5C6\uB2E4." }, "known": { "type": "string", "description": "\uB418\uC9DA\uC744 \uC218 \uC788\uB294 \uAC12\uC744 \uC0AC\uB78C \uB9D0\uB85C. \uAC12\uC774 \uC5C6\uC73C\uBA74 \uBE48 \uBB38\uC790\uC5F4(CONFIRM\uC740 \uD56D\uC0C1 \uBE48 \uBB38\uC790\uC5F4). START\uC5D0\uB294 \uC5C6\uB2E4." }, "ask": { "type": "string", "minLength": 1, "description": "REASK\xB7CONFIRM\uC5D0\uC11C \uB2E4\uC2DC \uBB3C\uC744 \uAC83." }, "previous": { "type": "string", "minLength": 1, "description": "CONFIRM\uC758 \uC774\uC804 \uAC12(\uC0AC\uB78C \uB9D0)." }, "current": { "type": "string", "minLength": 1, "description": "CONFIRM\uC758 \uC774\uBC88 \uAC12(\uC0AC\uB78C \uB9D0)." }, "hold": { "type": "string", "minLength": 1, "description": "HOLD\xB7SKIP\uC5D0\uC11C \uBE44\uC6CC \uB450\uB294 \uBD80\uBD84\uC758 \uC9E7\uC740 \uC774\uB984." }, "note": { "type": "string", "minLength": 1, "description": "REDIRECT OUT_OF_SCHEMA\uC758 \uC694\uC57D(A \uCD9C\uB825 note \uADF8\uB300\uB85C)." }, "next": { "oneOf": [{ "type": "object", "additionalProperties": false, "required": ["type", "question_id", "text"], "properties": { "type": { "enum": ["NEXT", "SAME"] }, "question_id": { "$ref": "_common.schema.json#/$defs/QuestionId" }, "text": { "type": "string", "minLength": 1 } } }, { "type": "object", "additionalProperties": false, "required": ["type"], "properties": { "type": { "const": "END" } } }], "description": "type: NEXT(\uB2E4\uC74C \uBB38\uD56D) / SAME(\uAC19\uC740 \uBB38\uD56D \uB2E4\uC2DC) / END(\uB9C8\uBB34\uB9AC, type\uB9CC). text\uB294 \uBB38\uD56D \uC740\uD589\uC758 \uC9C8\uBB38 \uBB38\uC7A5." } }, "allOf": [{ "if": { "properties": { "action": { "const": "START" } }, "required": ["action"] }, "then": { "required": ["action", "topic", "next"], "properties": { "reason": false, "user_utterance": false, "known": false, "ask": false, "previous": false, "current": false, "hold": false, "note": false, "next": { "properties": { "type": { "const": "NEXT" }, "question_id": { "$ref": "_common.schema.json#/$defs/QuestionId", "$comment": "3.3.0: START \uC758 \uCCAB \uBB38\uD56D\uC740 \uC138\uC158\uC758 \uBB38\uC9C4\uD45C \uC21C\uC11C \uCCAB \uBB38\uD56D\uC774\uB2E4(\uBB38\uC9C4\uD45C\uB9C8\uB2E4 \uB2E4\uB97C \uC218 \uC788\uB2E4). 3.2.x \uAE4C\uC9C0\uB294 \uD559\uC2B5 \uB370\uC774\uD130\uC14B v2 \uC758 \uCCAB \uBB38\uD56D Q1.D01 \uB85C \uACE0\uC815\uD588\uC5C8\uB2E4." } } } } } }, { "if": { "properties": { "action": { "const": "NEXT" } }, "required": ["action"] }, "then": { "required": ["action", "topic", "user_utterance", "known", "next"], "properties": { "reason": false, "ask": false, "previous": false, "current": false, "hold": false, "note": false, "next": { "properties": { "type": { "enum": ["NEXT", "END"] } } } } } }, { "if": { "properties": { "action": { "const": "CORRECT" } }, "required": ["action"] }, "then": { "required": ["action", "topic", "user_utterance", "known", "next"], "properties": { "reason": false, "ask": false, "previous": false, "current": false, "hold": false, "note": false, "next": { "properties": { "type": { "enum": ["NEXT", "END"] } } } } } }, { "if": { "properties": { "action": { "const": "REASK" } }, "required": ["action"] }, "then": { "required": ["action", "topic", "user_utterance", "known", "next", "reason", "ask"], "properties": { "previous": false, "current": false, "hold": false, "note": false, "next": { "properties": { "type": { "enum": ["SAME"] } } }, "reason": { "enum": ["MISSING", "OUT_OF_RANGE", "UNKNOWN_UNIT", "VAGUE_QUANTITY", "RANGE_SPANS_OPTIONS", "COUNT_EXCEEDS_DAYS", "OTHER_BEVERAGE", "BEVERAGE_MISSING", "MISSING_NUMBER", "UNPARSED_VALUE", "INVALID_OPTION"] } } } }, { "if": { "properties": { "action": { "const": "CONFIRM" } }, "required": ["action"] }, "then": { "required": ["action", "topic", "user_utterance", "known", "next", "reason", "ask", "previous", "current"], "properties": { "hold": false, "note": false, "next": { "properties": { "type": { "enum": ["SAME"] } } }, "reason": { "enum": ["CONFLICT_WITH_PREVIOUS", "CONFLICT_DOES_NOT_DRINK", "CONFLICT_MAX_BELOW_USUAL"] }, "known": { "const": "" } } } }, { "if": { "properties": { "action": { "const": "HOLD" } }, "required": ["action"] }, "then": { "required": ["action", "topic", "user_utterance", "known", "next", "reason", "hold"], "properties": { "ask": false, "previous": false, "current": false, "note": false, "next": { "properties": { "type": { "enum": ["NEXT", "END"] } } }, "reason": { "enum": ["UNCERTAIN"] } } } }, { "if": { "properties": { "action": { "const": "SKIP" } }, "required": ["action"] }, "then": { "required": ["action", "topic", "user_utterance", "known", "next", "reason", "hold"], "properties": { "ask": false, "previous": false, "current": false, "note": false, "next": { "properties": { "type": { "enum": ["NEXT", "END"] } } }, "reason": { "enum": ["REQUEST_SKIP", "REFUSED"] } } } }, { "if": { "properties": { "action": { "const": "REDIRECT" } }, "required": ["action"] }, "then": { "required": ["action", "topic", "user_utterance", "known", "next", "reason"], "properties": { "ask": false, "previous": false, "current": false, "hold": false, "next": { "properties": { "type": { "enum": ["SAME"] } } }, "reason": { "enum": ["ASK_PURPOSE", "OFF_TOPIC", "OUT_OF_SCHEMA"] } } } }, { "if": { "properties": { "reason": { "const": "OUT_OF_SCHEMA" } }, "required": ["reason"] }, "then": { "required": ["note"] }, "else": { "properties": { "note": false } } }] };
var func24 = Object.prototype.hasOwnProperty;
function validate41(data, { instancePath = "", parentData, parentDataProperty, rootData = data, dynamicAnchors = {} } = {}) {
  let vErrors = null;
  let errors = 0;
  const evaluated0 = validate41.evaluated;
  if (evaluated0.dynamicProps) {
    evaluated0.props = void 0;
  }
  if (evaluated0.dynamicItems) {
    evaluated0.items = void 0;
  }
  const _errs2 = errors;
  let valid1 = true;
  const _errs3 = errors;
  if (data && typeof data == "object" && !Array.isArray(data)) {
    let missing0;
    if (data.action === void 0 && (missing0 = "action")) {
      const err0 = {};
      if (vErrors === null) {
        vErrors = [err0];
      } else {
        vErrors.push(err0);
      }
      errors++;
    } else {
      if (data.action !== void 0) {
        if ("START" !== data.action) {
          const err1 = {};
          if (vErrors === null) {
            vErrors = [err1];
          } else {
            vErrors.push(err1);
          }
          errors++;
        }
      }
    }
  }
  var _valid0 = _errs3 === errors;
  errors = _errs2;
  if (vErrors !== null) {
    if (_errs2) {
      vErrors.length = _errs2;
    } else {
      vErrors = null;
    }
  }
  if (_valid0) {
    const _errs5 = errors;
    if (data && typeof data == "object" && !Array.isArray(data)) {
      if (data.action === void 0) {
        const err2 = { instancePath, schemaPath: "#/allOf/0/then/required", keyword: "required", params: { missingProperty: "action" }, message: "must have required property 'action'" };
        if (vErrors === null) {
          vErrors = [err2];
        } else {
          vErrors.push(err2);
        }
        errors++;
      }
      if (data.topic === void 0) {
        const err3 = { instancePath, schemaPath: "#/allOf/0/then/required", keyword: "required", params: { missingProperty: "topic" }, message: "must have required property 'topic'" };
        if (vErrors === null) {
          vErrors = [err3];
        } else {
          vErrors.push(err3);
        }
        errors++;
      }
      if (data.next === void 0) {
        const err4 = { instancePath, schemaPath: "#/allOf/0/then/required", keyword: "required", params: { missingProperty: "next" }, message: "must have required property 'next'" };
        if (vErrors === null) {
          vErrors = [err4];
        } else {
          vErrors.push(err4);
        }
        errors++;
      }
      if (data.reason !== void 0) {
        const err5 = { instancePath: instancePath + "/reason", schemaPath: "#/allOf/0/then/properties/reason/false schema", keyword: "false schema", params: {}, message: "boolean schema is false" };
        if (vErrors === null) {
          vErrors = [err5];
        } else {
          vErrors.push(err5);
        }
        errors++;
      }
      if (data.user_utterance !== void 0) {
        const err6 = { instancePath: instancePath + "/user_utterance", schemaPath: "#/allOf/0/then/properties/user_utterance/false schema", keyword: "false schema", params: {}, message: "boolean schema is false" };
        if (vErrors === null) {
          vErrors = [err6];
        } else {
          vErrors.push(err6);
        }
        errors++;
      }
      if (data.known !== void 0) {
        const err7 = { instancePath: instancePath + "/known", schemaPath: "#/allOf/0/then/properties/known/false schema", keyword: "false schema", params: {}, message: "boolean schema is false" };
        if (vErrors === null) {
          vErrors = [err7];
        } else {
          vErrors.push(err7);
        }
        errors++;
      }
      if (data.ask !== void 0) {
        const err8 = { instancePath: instancePath + "/ask", schemaPath: "#/allOf/0/then/properties/ask/false schema", keyword: "false schema", params: {}, message: "boolean schema is false" };
        if (vErrors === null) {
          vErrors = [err8];
        } else {
          vErrors.push(err8);
        }
        errors++;
      }
      if (data.previous !== void 0) {
        const err9 = { instancePath: instancePath + "/previous", schemaPath: "#/allOf/0/then/properties/previous/false schema", keyword: "false schema", params: {}, message: "boolean schema is false" };
        if (vErrors === null) {
          vErrors = [err9];
        } else {
          vErrors.push(err9);
        }
        errors++;
      }
      if (data.current !== void 0) {
        const err10 = { instancePath: instancePath + "/current", schemaPath: "#/allOf/0/then/properties/current/false schema", keyword: "false schema", params: {}, message: "boolean schema is false" };
        if (vErrors === null) {
          vErrors = [err10];
        } else {
          vErrors.push(err10);
        }
        errors++;
      }
      if (data.hold !== void 0) {
        const err11 = { instancePath: instancePath + "/hold", schemaPath: "#/allOf/0/then/properties/hold/false schema", keyword: "false schema", params: {}, message: "boolean schema is false" };
        if (vErrors === null) {
          vErrors = [err11];
        } else {
          vErrors.push(err11);
        }
        errors++;
      }
      if (data.note !== void 0) {
        const err12 = { instancePath: instancePath + "/note", schemaPath: "#/allOf/0/then/properties/note/false schema", keyword: "false schema", params: {}, message: "boolean schema is false" };
        if (vErrors === null) {
          vErrors = [err12];
        } else {
          vErrors.push(err12);
        }
        errors++;
      }
      if (data.next !== void 0) {
        let data9 = data.next;
        if (data9 && typeof data9 == "object" && !Array.isArray(data9)) {
          if (data9.type !== void 0) {
            if ("NEXT" !== data9.type) {
              const err13 = { instancePath: instancePath + "/next/type", schemaPath: "#/allOf/0/then/properties/next/properties/type/const", keyword: "const", params: { allowedValue: "NEXT" }, message: "must be equal to constant" };
              if (vErrors === null) {
                vErrors = [err13];
              } else {
                vErrors.push(err13);
              }
              errors++;
            }
          }
          if (data9.question_id !== void 0) {
            let data11 = data9.question_id;
            if (typeof data11 === "string") {
              if (!pattern8.test(data11)) {
                const err14 = { instancePath: instancePath + "/next/question_id", schemaPath: "_common.schema.json#/$defs/QuestionId/pattern", keyword: "pattern", params: { pattern: "^Q[0-9]+(\\.D[0-9]{2})?(_[0-9]+)?$(?![\\s\\S])" }, message: 'must match pattern "^Q[0-9]+(\\.D[0-9]{2})?(_[0-9]+)?$(?![\\s\\S])"' };
                if (vErrors === null) {
                  vErrors = [err14];
                } else {
                  vErrors.push(err14);
                }
                errors++;
              }
            } else {
              const err15 = { instancePath: instancePath + "/next/question_id", schemaPath: "_common.schema.json#/$defs/QuestionId/type", keyword: "type", params: { type: "string" }, message: "must be string" };
              if (vErrors === null) {
                vErrors = [err15];
              } else {
                vErrors.push(err15);
              }
              errors++;
            }
          }
        }
      }
    }
    var _valid0 = _errs5 === errors;
    valid1 = _valid0;
    if (valid1) {
      var props0 = {};
      props0.reason = true;
      props0.user_utterance = true;
      props0.known = true;
      props0.ask = true;
      props0.previous = true;
      props0.current = true;
      props0.hold = true;
      props0.note = true;
      props0.next = true;
      props0.action = true;
    }
  }
  if (!valid1) {
    const err16 = { instancePath, schemaPath: "#/allOf/0/if", keyword: "if", params: { failingKeyword: "then" }, message: 'must match "then" schema' };
    if (vErrors === null) {
      vErrors = [err16];
    } else {
      vErrors.push(err16);
    }
    errors++;
  }
  const _errs13 = errors;
  let valid6 = true;
  const _errs14 = errors;
  if (data && typeof data == "object" && !Array.isArray(data)) {
    let missing1;
    if (data.action === void 0 && (missing1 = "action")) {
      const err17 = {};
      if (vErrors === null) {
        vErrors = [err17];
      } else {
        vErrors.push(err17);
      }
      errors++;
    } else {
      if (data.action !== void 0) {
        if ("NEXT" !== data.action) {
          const err18 = {};
          if (vErrors === null) {
            vErrors = [err18];
          } else {
            vErrors.push(err18);
          }
          errors++;
        }
      }
    }
  }
  var _valid1 = _errs14 === errors;
  errors = _errs13;
  if (vErrors !== null) {
    if (_errs13) {
      vErrors.length = _errs13;
    } else {
      vErrors = null;
    }
  }
  if (_valid1) {
    const _errs16 = errors;
    if (data && typeof data == "object" && !Array.isArray(data)) {
      if (data.action === void 0) {
        const err19 = { instancePath, schemaPath: "#/allOf/1/then/required", keyword: "required", params: { missingProperty: "action" }, message: "must have required property 'action'" };
        if (vErrors === null) {
          vErrors = [err19];
        } else {
          vErrors.push(err19);
        }
        errors++;
      }
      if (data.topic === void 0) {
        const err20 = { instancePath, schemaPath: "#/allOf/1/then/required", keyword: "required", params: { missingProperty: "topic" }, message: "must have required property 'topic'" };
        if (vErrors === null) {
          vErrors = [err20];
        } else {
          vErrors.push(err20);
        }
        errors++;
      }
      if (data.user_utterance === void 0) {
        const err21 = { instancePath, schemaPath: "#/allOf/1/then/required", keyword: "required", params: { missingProperty: "user_utterance" }, message: "must have required property 'user_utterance'" };
        if (vErrors === null) {
          vErrors = [err21];
        } else {
          vErrors.push(err21);
        }
        errors++;
      }
      if (data.known === void 0) {
        const err22 = { instancePath, schemaPath: "#/allOf/1/then/required", keyword: "required", params: { missingProperty: "known" }, message: "must have required property 'known'" };
        if (vErrors === null) {
          vErrors = [err22];
        } else {
          vErrors.push(err22);
        }
        errors++;
      }
      if (data.next === void 0) {
        const err23 = { instancePath, schemaPath: "#/allOf/1/then/required", keyword: "required", params: { missingProperty: "next" }, message: "must have required property 'next'" };
        if (vErrors === null) {
          vErrors = [err23];
        } else {
          vErrors.push(err23);
        }
        errors++;
      }
      if (data.reason !== void 0) {
        const err24 = { instancePath: instancePath + "/reason", schemaPath: "#/allOf/1/then/properties/reason/false schema", keyword: "false schema", params: {}, message: "boolean schema is false" };
        if (vErrors === null) {
          vErrors = [err24];
        } else {
          vErrors.push(err24);
        }
        errors++;
      }
      if (data.ask !== void 0) {
        const err25 = { instancePath: instancePath + "/ask", schemaPath: "#/allOf/1/then/properties/ask/false schema", keyword: "false schema", params: {}, message: "boolean schema is false" };
        if (vErrors === null) {
          vErrors = [err25];
        } else {
          vErrors.push(err25);
        }
        errors++;
      }
      if (data.previous !== void 0) {
        const err26 = { instancePath: instancePath + "/previous", schemaPath: "#/allOf/1/then/properties/previous/false schema", keyword: "false schema", params: {}, message: "boolean schema is false" };
        if (vErrors === null) {
          vErrors = [err26];
        } else {
          vErrors.push(err26);
        }
        errors++;
      }
      if (data.current !== void 0) {
        const err27 = { instancePath: instancePath + "/current", schemaPath: "#/allOf/1/then/properties/current/false schema", keyword: "false schema", params: {}, message: "boolean schema is false" };
        if (vErrors === null) {
          vErrors = [err27];
        } else {
          vErrors.push(err27);
        }
        errors++;
      }
      if (data.hold !== void 0) {
        const err28 = { instancePath: instancePath + "/hold", schemaPath: "#/allOf/1/then/properties/hold/false schema", keyword: "false schema", params: {}, message: "boolean schema is false" };
        if (vErrors === null) {
          vErrors = [err28];
        } else {
          vErrors.push(err28);
        }
        errors++;
      }
      if (data.note !== void 0) {
        const err29 = { instancePath: instancePath + "/note", schemaPath: "#/allOf/1/then/properties/note/false schema", keyword: "false schema", params: {}, message: "boolean schema is false" };
        if (vErrors === null) {
          vErrors = [err29];
        } else {
          vErrors.push(err29);
        }
        errors++;
      }
      if (data.next !== void 0) {
        let data19 = data.next;
        if (data19 && typeof data19 == "object" && !Array.isArray(data19)) {
          if (data19.type !== void 0) {
            let data20 = data19.type;
            if (!(data20 === "NEXT" || data20 === "END")) {
              const err30 = { instancePath: instancePath + "/next/type", schemaPath: "#/allOf/1/then/properties/next/properties/type/enum", keyword: "enum", params: { allowedValues: schema58.allOf[1].then.properties.next.properties.type.enum }, message: "must be equal to one of the allowed values" };
              if (vErrors === null) {
                vErrors = [err30];
              } else {
                vErrors.push(err30);
              }
              errors++;
            }
          }
        }
      }
    }
    var _valid1 = _errs16 === errors;
    valid6 = _valid1;
    if (valid6) {
      var props1 = {};
      props1.reason = true;
      props1.ask = true;
      props1.previous = true;
      props1.current = true;
      props1.hold = true;
      props1.note = true;
      props1.next = true;
      props1.action = true;
    }
  }
  if (!valid6) {
    const err31 = { instancePath, schemaPath: "#/allOf/1/if", keyword: "if", params: { failingKeyword: "then" }, message: 'must match "then" schema' };
    if (vErrors === null) {
      vErrors = [err31];
    } else {
      vErrors.push(err31);
    }
    errors++;
  }
  if (props0 !== true && props1 !== void 0) {
    if (props1 === true) {
      props0 = true;
    } else {
      props0 = props0 || {};
      Object.assign(props0, props1);
    }
  }
  const _errs20 = errors;
  let valid10 = true;
  const _errs21 = errors;
  if (data && typeof data == "object" && !Array.isArray(data)) {
    let missing2;
    if (data.action === void 0 && (missing2 = "action")) {
      const err32 = {};
      if (vErrors === null) {
        vErrors = [err32];
      } else {
        vErrors.push(err32);
      }
      errors++;
    } else {
      if (data.action !== void 0) {
        if ("CORRECT" !== data.action) {
          const err33 = {};
          if (vErrors === null) {
            vErrors = [err33];
          } else {
            vErrors.push(err33);
          }
          errors++;
        }
      }
    }
  }
  var _valid2 = _errs21 === errors;
  errors = _errs20;
  if (vErrors !== null) {
    if (_errs20) {
      vErrors.length = _errs20;
    } else {
      vErrors = null;
    }
  }
  if (_valid2) {
    const _errs23 = errors;
    if (data && typeof data == "object" && !Array.isArray(data)) {
      if (data.action === void 0) {
        const err34 = { instancePath, schemaPath: "#/allOf/2/then/required", keyword: "required", params: { missingProperty: "action" }, message: "must have required property 'action'" };
        if (vErrors === null) {
          vErrors = [err34];
        } else {
          vErrors.push(err34);
        }
        errors++;
      }
      if (data.topic === void 0) {
        const err35 = { instancePath, schemaPath: "#/allOf/2/then/required", keyword: "required", params: { missingProperty: "topic" }, message: "must have required property 'topic'" };
        if (vErrors === null) {
          vErrors = [err35];
        } else {
          vErrors.push(err35);
        }
        errors++;
      }
      if (data.user_utterance === void 0) {
        const err36 = { instancePath, schemaPath: "#/allOf/2/then/required", keyword: "required", params: { missingProperty: "user_utterance" }, message: "must have required property 'user_utterance'" };
        if (vErrors === null) {
          vErrors = [err36];
        } else {
          vErrors.push(err36);
        }
        errors++;
      }
      if (data.known === void 0) {
        const err37 = { instancePath, schemaPath: "#/allOf/2/then/required", keyword: "required", params: { missingProperty: "known" }, message: "must have required property 'known'" };
        if (vErrors === null) {
          vErrors = [err37];
        } else {
          vErrors.push(err37);
        }
        errors++;
      }
      if (data.next === void 0) {
        const err38 = { instancePath, schemaPath: "#/allOf/2/then/required", keyword: "required", params: { missingProperty: "next" }, message: "must have required property 'next'" };
        if (vErrors === null) {
          vErrors = [err38];
        } else {
          vErrors.push(err38);
        }
        errors++;
      }
      if (data.reason !== void 0) {
        const err39 = { instancePath: instancePath + "/reason", schemaPath: "#/allOf/2/then/properties/reason/false schema", keyword: "false schema", params: {}, message: "boolean schema is false" };
        if (vErrors === null) {
          vErrors = [err39];
        } else {
          vErrors.push(err39);
        }
        errors++;
      }
      if (data.ask !== void 0) {
        const err40 = { instancePath: instancePath + "/ask", schemaPath: "#/allOf/2/then/properties/ask/false schema", keyword: "false schema", params: {}, message: "boolean schema is false" };
        if (vErrors === null) {
          vErrors = [err40];
        } else {
          vErrors.push(err40);
        }
        errors++;
      }
      if (data.previous !== void 0) {
        const err41 = { instancePath: instancePath + "/previous", schemaPath: "#/allOf/2/then/properties/previous/false schema", keyword: "false schema", params: {}, message: "boolean schema is false" };
        if (vErrors === null) {
          vErrors = [err41];
        } else {
          vErrors.push(err41);
        }
        errors++;
      }
      if (data.current !== void 0) {
        const err42 = { instancePath: instancePath + "/current", schemaPath: "#/allOf/2/then/properties/current/false schema", keyword: "false schema", params: {}, message: "boolean schema is false" };
        if (vErrors === null) {
          vErrors = [err42];
        } else {
          vErrors.push(err42);
        }
        errors++;
      }
      if (data.hold !== void 0) {
        const err43 = { instancePath: instancePath + "/hold", schemaPath: "#/allOf/2/then/properties/hold/false schema", keyword: "false schema", params: {}, message: "boolean schema is false" };
        if (vErrors === null) {
          vErrors = [err43];
        } else {
          vErrors.push(err43);
        }
        errors++;
      }
      if (data.note !== void 0) {
        const err44 = { instancePath: instancePath + "/note", schemaPath: "#/allOf/2/then/properties/note/false schema", keyword: "false schema", params: {}, message: "boolean schema is false" };
        if (vErrors === null) {
          vErrors = [err44];
        } else {
          vErrors.push(err44);
        }
        errors++;
      }
      if (data.next !== void 0) {
        let data28 = data.next;
        if (data28 && typeof data28 == "object" && !Array.isArray(data28)) {
          if (data28.type !== void 0) {
            let data29 = data28.type;
            if (!(data29 === "NEXT" || data29 === "END")) {
              const err45 = { instancePath: instancePath + "/next/type", schemaPath: "#/allOf/2/then/properties/next/properties/type/enum", keyword: "enum", params: { allowedValues: schema58.allOf[2].then.properties.next.properties.type.enum }, message: "must be equal to one of the allowed values" };
              if (vErrors === null) {
                vErrors = [err45];
              } else {
                vErrors.push(err45);
              }
              errors++;
            }
          }
        }
      }
    }
    var _valid2 = _errs23 === errors;
    valid10 = _valid2;
    if (valid10) {
      var props2 = {};
      props2.reason = true;
      props2.ask = true;
      props2.previous = true;
      props2.current = true;
      props2.hold = true;
      props2.note = true;
      props2.next = true;
      props2.action = true;
    }
  }
  if (!valid10) {
    const err46 = { instancePath, schemaPath: "#/allOf/2/if", keyword: "if", params: { failingKeyword: "then" }, message: 'must match "then" schema' };
    if (vErrors === null) {
      vErrors = [err46];
    } else {
      vErrors.push(err46);
    }
    errors++;
  }
  if (props0 !== true && props2 !== void 0) {
    if (props2 === true) {
      props0 = true;
    } else {
      props0 = props0 || {};
      Object.assign(props0, props2);
    }
  }
  const _errs27 = errors;
  let valid14 = true;
  const _errs28 = errors;
  if (data && typeof data == "object" && !Array.isArray(data)) {
    let missing3;
    if (data.action === void 0 && (missing3 = "action")) {
      const err47 = {};
      if (vErrors === null) {
        vErrors = [err47];
      } else {
        vErrors.push(err47);
      }
      errors++;
    } else {
      if (data.action !== void 0) {
        if ("REASK" !== data.action) {
          const err48 = {};
          if (vErrors === null) {
            vErrors = [err48];
          } else {
            vErrors.push(err48);
          }
          errors++;
        }
      }
    }
  }
  var _valid3 = _errs28 === errors;
  errors = _errs27;
  if (vErrors !== null) {
    if (_errs27) {
      vErrors.length = _errs27;
    } else {
      vErrors = null;
    }
  }
  if (_valid3) {
    const _errs30 = errors;
    if (data && typeof data == "object" && !Array.isArray(data)) {
      if (data.action === void 0) {
        const err49 = { instancePath, schemaPath: "#/allOf/3/then/required", keyword: "required", params: { missingProperty: "action" }, message: "must have required property 'action'" };
        if (vErrors === null) {
          vErrors = [err49];
        } else {
          vErrors.push(err49);
        }
        errors++;
      }
      if (data.topic === void 0) {
        const err50 = { instancePath, schemaPath: "#/allOf/3/then/required", keyword: "required", params: { missingProperty: "topic" }, message: "must have required property 'topic'" };
        if (vErrors === null) {
          vErrors = [err50];
        } else {
          vErrors.push(err50);
        }
        errors++;
      }
      if (data.user_utterance === void 0) {
        const err51 = { instancePath, schemaPath: "#/allOf/3/then/required", keyword: "required", params: { missingProperty: "user_utterance" }, message: "must have required property 'user_utterance'" };
        if (vErrors === null) {
          vErrors = [err51];
        } else {
          vErrors.push(err51);
        }
        errors++;
      }
      if (data.known === void 0) {
        const err52 = { instancePath, schemaPath: "#/allOf/3/then/required", keyword: "required", params: { missingProperty: "known" }, message: "must have required property 'known'" };
        if (vErrors === null) {
          vErrors = [err52];
        } else {
          vErrors.push(err52);
        }
        errors++;
      }
      if (data.next === void 0) {
        const err53 = { instancePath, schemaPath: "#/allOf/3/then/required", keyword: "required", params: { missingProperty: "next" }, message: "must have required property 'next'" };
        if (vErrors === null) {
          vErrors = [err53];
        } else {
          vErrors.push(err53);
        }
        errors++;
      }
      if (data.reason === void 0) {
        const err54 = { instancePath, schemaPath: "#/allOf/3/then/required", keyword: "required", params: { missingProperty: "reason" }, message: "must have required property 'reason'" };
        if (vErrors === null) {
          vErrors = [err54];
        } else {
          vErrors.push(err54);
        }
        errors++;
      }
      if (data.ask === void 0) {
        const err55 = { instancePath, schemaPath: "#/allOf/3/then/required", keyword: "required", params: { missingProperty: "ask" }, message: "must have required property 'ask'" };
        if (vErrors === null) {
          vErrors = [err55];
        } else {
          vErrors.push(err55);
        }
        errors++;
      }
      if (data.previous !== void 0) {
        const err56 = { instancePath: instancePath + "/previous", schemaPath: "#/allOf/3/then/properties/previous/false schema", keyword: "false schema", params: {}, message: "boolean schema is false" };
        if (vErrors === null) {
          vErrors = [err56];
        } else {
          vErrors.push(err56);
        }
        errors++;
      }
      if (data.current !== void 0) {
        const err57 = { instancePath: instancePath + "/current", schemaPath: "#/allOf/3/then/properties/current/false schema", keyword: "false schema", params: {}, message: "boolean schema is false" };
        if (vErrors === null) {
          vErrors = [err57];
        } else {
          vErrors.push(err57);
        }
        errors++;
      }
      if (data.hold !== void 0) {
        const err58 = { instancePath: instancePath + "/hold", schemaPath: "#/allOf/3/then/properties/hold/false schema", keyword: "false schema", params: {}, message: "boolean schema is false" };
        if (vErrors === null) {
          vErrors = [err58];
        } else {
          vErrors.push(err58);
        }
        errors++;
      }
      if (data.note !== void 0) {
        const err59 = { instancePath: instancePath + "/note", schemaPath: "#/allOf/3/then/properties/note/false schema", keyword: "false schema", params: {}, message: "boolean schema is false" };
        if (vErrors === null) {
          vErrors = [err59];
        } else {
          vErrors.push(err59);
        }
        errors++;
      }
      if (data.next !== void 0) {
        let data35 = data.next;
        if (data35 && typeof data35 == "object" && !Array.isArray(data35)) {
          if (data35.type !== void 0) {
            if (!(data35.type === "SAME")) {
              const err60 = { instancePath: instancePath + "/next/type", schemaPath: "#/allOf/3/then/properties/next/properties/type/enum", keyword: "enum", params: { allowedValues: schema58.allOf[3].then.properties.next.properties.type.enum }, message: "must be equal to one of the allowed values" };
              if (vErrors === null) {
                vErrors = [err60];
              } else {
                vErrors.push(err60);
              }
              errors++;
            }
          }
        }
      }
      if (data.reason !== void 0) {
        let data37 = data.reason;
        if (!(data37 === "MISSING" || data37 === "OUT_OF_RANGE" || data37 === "UNKNOWN_UNIT" || data37 === "VAGUE_QUANTITY" || data37 === "RANGE_SPANS_OPTIONS" || data37 === "COUNT_EXCEEDS_DAYS" || data37 === "OTHER_BEVERAGE" || data37 === "BEVERAGE_MISSING" || data37 === "MISSING_NUMBER" || data37 === "UNPARSED_VALUE" || data37 === "INVALID_OPTION")) {
          const err61 = { instancePath: instancePath + "/reason", schemaPath: "#/allOf/3/then/properties/reason/enum", keyword: "enum", params: { allowedValues: schema58.allOf[3].then.properties.reason.enum }, message: "must be equal to one of the allowed values" };
          if (vErrors === null) {
            vErrors = [err61];
          } else {
            vErrors.push(err61);
          }
          errors++;
        }
      }
    }
    var _valid3 = _errs30 === errors;
    valid14 = _valid3;
    if (valid14) {
      var props3 = {};
      props3.previous = true;
      props3.current = true;
      props3.hold = true;
      props3.note = true;
      props3.next = true;
      props3.reason = true;
      props3.action = true;
    }
  }
  if (!valid14) {
    const err62 = { instancePath, schemaPath: "#/allOf/3/if", keyword: "if", params: { failingKeyword: "then" }, message: 'must match "then" schema' };
    if (vErrors === null) {
      vErrors = [err62];
    } else {
      vErrors.push(err62);
    }
    errors++;
  }
  if (props0 !== true && props3 !== void 0) {
    if (props3 === true) {
      props0 = true;
    } else {
      props0 = props0 || {};
      Object.assign(props0, props3);
    }
  }
  const _errs35 = errors;
  let valid18 = true;
  const _errs36 = errors;
  if (data && typeof data == "object" && !Array.isArray(data)) {
    let missing4;
    if (data.action === void 0 && (missing4 = "action")) {
      const err63 = {};
      if (vErrors === null) {
        vErrors = [err63];
      } else {
        vErrors.push(err63);
      }
      errors++;
    } else {
      if (data.action !== void 0) {
        if ("CONFIRM" !== data.action) {
          const err64 = {};
          if (vErrors === null) {
            vErrors = [err64];
          } else {
            vErrors.push(err64);
          }
          errors++;
        }
      }
    }
  }
  var _valid4 = _errs36 === errors;
  errors = _errs35;
  if (vErrors !== null) {
    if (_errs35) {
      vErrors.length = _errs35;
    } else {
      vErrors = null;
    }
  }
  if (_valid4) {
    const _errs38 = errors;
    if (data && typeof data == "object" && !Array.isArray(data)) {
      if (data.action === void 0) {
        const err65 = { instancePath, schemaPath: "#/allOf/4/then/required", keyword: "required", params: { missingProperty: "action" }, message: "must have required property 'action'" };
        if (vErrors === null) {
          vErrors = [err65];
        } else {
          vErrors.push(err65);
        }
        errors++;
      }
      if (data.topic === void 0) {
        const err66 = { instancePath, schemaPath: "#/allOf/4/then/required", keyword: "required", params: { missingProperty: "topic" }, message: "must have required property 'topic'" };
        if (vErrors === null) {
          vErrors = [err66];
        } else {
          vErrors.push(err66);
        }
        errors++;
      }
      if (data.user_utterance === void 0) {
        const err67 = { instancePath, schemaPath: "#/allOf/4/then/required", keyword: "required", params: { missingProperty: "user_utterance" }, message: "must have required property 'user_utterance'" };
        if (vErrors === null) {
          vErrors = [err67];
        } else {
          vErrors.push(err67);
        }
        errors++;
      }
      if (data.known === void 0) {
        const err68 = { instancePath, schemaPath: "#/allOf/4/then/required", keyword: "required", params: { missingProperty: "known" }, message: "must have required property 'known'" };
        if (vErrors === null) {
          vErrors = [err68];
        } else {
          vErrors.push(err68);
        }
        errors++;
      }
      if (data.next === void 0) {
        const err69 = { instancePath, schemaPath: "#/allOf/4/then/required", keyword: "required", params: { missingProperty: "next" }, message: "must have required property 'next'" };
        if (vErrors === null) {
          vErrors = [err69];
        } else {
          vErrors.push(err69);
        }
        errors++;
      }
      if (data.reason === void 0) {
        const err70 = { instancePath, schemaPath: "#/allOf/4/then/required", keyword: "required", params: { missingProperty: "reason" }, message: "must have required property 'reason'" };
        if (vErrors === null) {
          vErrors = [err70];
        } else {
          vErrors.push(err70);
        }
        errors++;
      }
      if (data.ask === void 0) {
        const err71 = { instancePath, schemaPath: "#/allOf/4/then/required", keyword: "required", params: { missingProperty: "ask" }, message: "must have required property 'ask'" };
        if (vErrors === null) {
          vErrors = [err71];
        } else {
          vErrors.push(err71);
        }
        errors++;
      }
      if (data.previous === void 0) {
        const err72 = { instancePath, schemaPath: "#/allOf/4/then/required", keyword: "required", params: { missingProperty: "previous" }, message: "must have required property 'previous'" };
        if (vErrors === null) {
          vErrors = [err72];
        } else {
          vErrors.push(err72);
        }
        errors++;
      }
      if (data.current === void 0) {
        const err73 = { instancePath, schemaPath: "#/allOf/4/then/required", keyword: "required", params: { missingProperty: "current" }, message: "must have required property 'current'" };
        if (vErrors === null) {
          vErrors = [err73];
        } else {
          vErrors.push(err73);
        }
        errors++;
      }
      if (data.hold !== void 0) {
        const err74 = { instancePath: instancePath + "/hold", schemaPath: "#/allOf/4/then/properties/hold/false schema", keyword: "false schema", params: {}, message: "boolean schema is false" };
        if (vErrors === null) {
          vErrors = [err74];
        } else {
          vErrors.push(err74);
        }
        errors++;
      }
      if (data.note !== void 0) {
        const err75 = { instancePath: instancePath + "/note", schemaPath: "#/allOf/4/then/properties/note/false schema", keyword: "false schema", params: {}, message: "boolean schema is false" };
        if (vErrors === null) {
          vErrors = [err75];
        } else {
          vErrors.push(err75);
        }
        errors++;
      }
      if (data.next !== void 0) {
        let data41 = data.next;
        if (data41 && typeof data41 == "object" && !Array.isArray(data41)) {
          if (data41.type !== void 0) {
            if (!(data41.type === "SAME")) {
              const err76 = { instancePath: instancePath + "/next/type", schemaPath: "#/allOf/4/then/properties/next/properties/type/enum", keyword: "enum", params: { allowedValues: schema58.allOf[4].then.properties.next.properties.type.enum }, message: "must be equal to one of the allowed values" };
              if (vErrors === null) {
                vErrors = [err76];
              } else {
                vErrors.push(err76);
              }
              errors++;
            }
          }
        }
      }
      if (data.reason !== void 0) {
        let data43 = data.reason;
        if (!(data43 === "CONFLICT_WITH_PREVIOUS" || data43 === "CONFLICT_DOES_NOT_DRINK" || data43 === "CONFLICT_MAX_BELOW_USUAL")) {
          const err77 = { instancePath: instancePath + "/reason", schemaPath: "#/allOf/4/then/properties/reason/enum", keyword: "enum", params: { allowedValues: schema58.allOf[4].then.properties.reason.enum }, message: "must be equal to one of the allowed values" };
          if (vErrors === null) {
            vErrors = [err77];
          } else {
            vErrors.push(err77);
          }
          errors++;
        }
      }
      if (data.known !== void 0) {
        if ("" !== data.known) {
          const err78 = { instancePath: instancePath + "/known", schemaPath: "#/allOf/4/then/properties/known/const", keyword: "const", params: { allowedValue: "" }, message: "must be equal to constant" };
          if (vErrors === null) {
            vErrors = [err78];
          } else {
            vErrors.push(err78);
          }
          errors++;
        }
      }
    }
    var _valid4 = _errs38 === errors;
    valid18 = _valid4;
    if (valid18) {
      var props4 = {};
      props4.hold = true;
      props4.note = true;
      props4.next = true;
      props4.reason = true;
      props4.known = true;
      props4.action = true;
    }
  }
  if (!valid18) {
    const err79 = { instancePath, schemaPath: "#/allOf/4/if", keyword: "if", params: { failingKeyword: "then" }, message: 'must match "then" schema' };
    if (vErrors === null) {
      vErrors = [err79];
    } else {
      vErrors.push(err79);
    }
    errors++;
  }
  if (props0 !== true && props4 !== void 0) {
    if (props4 === true) {
      props0 = true;
    } else {
      props0 = props0 || {};
      Object.assign(props0, props4);
    }
  }
  const _errs44 = errors;
  let valid22 = true;
  const _errs45 = errors;
  if (data && typeof data == "object" && !Array.isArray(data)) {
    let missing5;
    if (data.action === void 0 && (missing5 = "action")) {
      const err80 = {};
      if (vErrors === null) {
        vErrors = [err80];
      } else {
        vErrors.push(err80);
      }
      errors++;
    } else {
      if (data.action !== void 0) {
        if ("HOLD" !== data.action) {
          const err81 = {};
          if (vErrors === null) {
            vErrors = [err81];
          } else {
            vErrors.push(err81);
          }
          errors++;
        }
      }
    }
  }
  var _valid5 = _errs45 === errors;
  errors = _errs44;
  if (vErrors !== null) {
    if (_errs44) {
      vErrors.length = _errs44;
    } else {
      vErrors = null;
    }
  }
  if (_valid5) {
    const _errs47 = errors;
    if (data && typeof data == "object" && !Array.isArray(data)) {
      if (data.action === void 0) {
        const err82 = { instancePath, schemaPath: "#/allOf/5/then/required", keyword: "required", params: { missingProperty: "action" }, message: "must have required property 'action'" };
        if (vErrors === null) {
          vErrors = [err82];
        } else {
          vErrors.push(err82);
        }
        errors++;
      }
      if (data.topic === void 0) {
        const err83 = { instancePath, schemaPath: "#/allOf/5/then/required", keyword: "required", params: { missingProperty: "topic" }, message: "must have required property 'topic'" };
        if (vErrors === null) {
          vErrors = [err83];
        } else {
          vErrors.push(err83);
        }
        errors++;
      }
      if (data.user_utterance === void 0) {
        const err84 = { instancePath, schemaPath: "#/allOf/5/then/required", keyword: "required", params: { missingProperty: "user_utterance" }, message: "must have required property 'user_utterance'" };
        if (vErrors === null) {
          vErrors = [err84];
        } else {
          vErrors.push(err84);
        }
        errors++;
      }
      if (data.known === void 0) {
        const err85 = { instancePath, schemaPath: "#/allOf/5/then/required", keyword: "required", params: { missingProperty: "known" }, message: "must have required property 'known'" };
        if (vErrors === null) {
          vErrors = [err85];
        } else {
          vErrors.push(err85);
        }
        errors++;
      }
      if (data.next === void 0) {
        const err86 = { instancePath, schemaPath: "#/allOf/5/then/required", keyword: "required", params: { missingProperty: "next" }, message: "must have required property 'next'" };
        if (vErrors === null) {
          vErrors = [err86];
        } else {
          vErrors.push(err86);
        }
        errors++;
      }
      if (data.reason === void 0) {
        const err87 = { instancePath, schemaPath: "#/allOf/5/then/required", keyword: "required", params: { missingProperty: "reason" }, message: "must have required property 'reason'" };
        if (vErrors === null) {
          vErrors = [err87];
        } else {
          vErrors.push(err87);
        }
        errors++;
      }
      if (data.hold === void 0) {
        const err88 = { instancePath, schemaPath: "#/allOf/5/then/required", keyword: "required", params: { missingProperty: "hold" }, message: "must have required property 'hold'" };
        if (vErrors === null) {
          vErrors = [err88];
        } else {
          vErrors.push(err88);
        }
        errors++;
      }
      if (data.ask !== void 0) {
        const err89 = { instancePath: instancePath + "/ask", schemaPath: "#/allOf/5/then/properties/ask/false schema", keyword: "false schema", params: {}, message: "boolean schema is false" };
        if (vErrors === null) {
          vErrors = [err89];
        } else {
          vErrors.push(err89);
        }
        errors++;
      }
      if (data.previous !== void 0) {
        const err90 = { instancePath: instancePath + "/previous", schemaPath: "#/allOf/5/then/properties/previous/false schema", keyword: "false schema", params: {}, message: "boolean schema is false" };
        if (vErrors === null) {
          vErrors = [err90];
        } else {
          vErrors.push(err90);
        }
        errors++;
      }
      if (data.current !== void 0) {
        const err91 = { instancePath: instancePath + "/current", schemaPath: "#/allOf/5/then/properties/current/false schema", keyword: "false schema", params: {}, message: "boolean schema is false" };
        if (vErrors === null) {
          vErrors = [err91];
        } else {
          vErrors.push(err91);
        }
        errors++;
      }
      if (data.note !== void 0) {
        const err92 = { instancePath: instancePath + "/note", schemaPath: "#/allOf/5/then/properties/note/false schema", keyword: "false schema", params: {}, message: "boolean schema is false" };
        if (vErrors === null) {
          vErrors = [err92];
        } else {
          vErrors.push(err92);
        }
        errors++;
      }
      if (data.next !== void 0) {
        let data50 = data.next;
        if (data50 && typeof data50 == "object" && !Array.isArray(data50)) {
          if (data50.type !== void 0) {
            let data51 = data50.type;
            if (!(data51 === "NEXT" || data51 === "END")) {
              const err93 = { instancePath: instancePath + "/next/type", schemaPath: "#/allOf/5/then/properties/next/properties/type/enum", keyword: "enum", params: { allowedValues: schema58.allOf[5].then.properties.next.properties.type.enum }, message: "must be equal to one of the allowed values" };
              if (vErrors === null) {
                vErrors = [err93];
              } else {
                vErrors.push(err93);
              }
              errors++;
            }
          }
        }
      }
      if (data.reason !== void 0) {
        if (!(data.reason === "UNCERTAIN")) {
          const err94 = { instancePath: instancePath + "/reason", schemaPath: "#/allOf/5/then/properties/reason/enum", keyword: "enum", params: { allowedValues: schema58.allOf[5].then.properties.reason.enum }, message: "must be equal to one of the allowed values" };
          if (vErrors === null) {
            vErrors = [err94];
          } else {
            vErrors.push(err94);
          }
          errors++;
        }
      }
    }
    var _valid5 = _errs47 === errors;
    valid22 = _valid5;
    if (valid22) {
      var props5 = {};
      props5.ask = true;
      props5.previous = true;
      props5.current = true;
      props5.note = true;
      props5.next = true;
      props5.reason = true;
      props5.action = true;
    }
  }
  if (!valid22) {
    const err95 = { instancePath, schemaPath: "#/allOf/5/if", keyword: "if", params: { failingKeyword: "then" }, message: 'must match "then" schema' };
    if (vErrors === null) {
      vErrors = [err95];
    } else {
      vErrors.push(err95);
    }
    errors++;
  }
  if (props0 !== true && props5 !== void 0) {
    if (props5 === true) {
      props0 = true;
    } else {
      props0 = props0 || {};
      Object.assign(props0, props5);
    }
  }
  const _errs52 = errors;
  let valid26 = true;
  const _errs53 = errors;
  if (data && typeof data == "object" && !Array.isArray(data)) {
    let missing6;
    if (data.action === void 0 && (missing6 = "action")) {
      const err96 = {};
      if (vErrors === null) {
        vErrors = [err96];
      } else {
        vErrors.push(err96);
      }
      errors++;
    } else {
      if (data.action !== void 0) {
        if ("SKIP" !== data.action) {
          const err97 = {};
          if (vErrors === null) {
            vErrors = [err97];
          } else {
            vErrors.push(err97);
          }
          errors++;
        }
      }
    }
  }
  var _valid6 = _errs53 === errors;
  errors = _errs52;
  if (vErrors !== null) {
    if (_errs52) {
      vErrors.length = _errs52;
    } else {
      vErrors = null;
    }
  }
  if (_valid6) {
    const _errs55 = errors;
    if (data && typeof data == "object" && !Array.isArray(data)) {
      if (data.action === void 0) {
        const err98 = { instancePath, schemaPath: "#/allOf/6/then/required", keyword: "required", params: { missingProperty: "action" }, message: "must have required property 'action'" };
        if (vErrors === null) {
          vErrors = [err98];
        } else {
          vErrors.push(err98);
        }
        errors++;
      }
      if (data.topic === void 0) {
        const err99 = { instancePath, schemaPath: "#/allOf/6/then/required", keyword: "required", params: { missingProperty: "topic" }, message: "must have required property 'topic'" };
        if (vErrors === null) {
          vErrors = [err99];
        } else {
          vErrors.push(err99);
        }
        errors++;
      }
      if (data.user_utterance === void 0) {
        const err100 = { instancePath, schemaPath: "#/allOf/6/then/required", keyword: "required", params: { missingProperty: "user_utterance" }, message: "must have required property 'user_utterance'" };
        if (vErrors === null) {
          vErrors = [err100];
        } else {
          vErrors.push(err100);
        }
        errors++;
      }
      if (data.known === void 0) {
        const err101 = { instancePath, schemaPath: "#/allOf/6/then/required", keyword: "required", params: { missingProperty: "known" }, message: "must have required property 'known'" };
        if (vErrors === null) {
          vErrors = [err101];
        } else {
          vErrors.push(err101);
        }
        errors++;
      }
      if (data.next === void 0) {
        const err102 = { instancePath, schemaPath: "#/allOf/6/then/required", keyword: "required", params: { missingProperty: "next" }, message: "must have required property 'next'" };
        if (vErrors === null) {
          vErrors = [err102];
        } else {
          vErrors.push(err102);
        }
        errors++;
      }
      if (data.reason === void 0) {
        const err103 = { instancePath, schemaPath: "#/allOf/6/then/required", keyword: "required", params: { missingProperty: "reason" }, message: "must have required property 'reason'" };
        if (vErrors === null) {
          vErrors = [err103];
        } else {
          vErrors.push(err103);
        }
        errors++;
      }
      if (data.hold === void 0) {
        const err104 = { instancePath, schemaPath: "#/allOf/6/then/required", keyword: "required", params: { missingProperty: "hold" }, message: "must have required property 'hold'" };
        if (vErrors === null) {
          vErrors = [err104];
        } else {
          vErrors.push(err104);
        }
        errors++;
      }
      if (data.ask !== void 0) {
        const err105 = { instancePath: instancePath + "/ask", schemaPath: "#/allOf/6/then/properties/ask/false schema", keyword: "false schema", params: {}, message: "boolean schema is false" };
        if (vErrors === null) {
          vErrors = [err105];
        } else {
          vErrors.push(err105);
        }
        errors++;
      }
      if (data.previous !== void 0) {
        const err106 = { instancePath: instancePath + "/previous", schemaPath: "#/allOf/6/then/properties/previous/false schema", keyword: "false schema", params: {}, message: "boolean schema is false" };
        if (vErrors === null) {
          vErrors = [err106];
        } else {
          vErrors.push(err106);
        }
        errors++;
      }
      if (data.current !== void 0) {
        const err107 = { instancePath: instancePath + "/current", schemaPath: "#/allOf/6/then/properties/current/false schema", keyword: "false schema", params: {}, message: "boolean schema is false" };
        if (vErrors === null) {
          vErrors = [err107];
        } else {
          vErrors.push(err107);
        }
        errors++;
      }
      if (data.note !== void 0) {
        const err108 = { instancePath: instancePath + "/note", schemaPath: "#/allOf/6/then/properties/note/false schema", keyword: "false schema", params: {}, message: "boolean schema is false" };
        if (vErrors === null) {
          vErrors = [err108];
        } else {
          vErrors.push(err108);
        }
        errors++;
      }
      if (data.next !== void 0) {
        let data58 = data.next;
        if (data58 && typeof data58 == "object" && !Array.isArray(data58)) {
          if (data58.type !== void 0) {
            let data59 = data58.type;
            if (!(data59 === "NEXT" || data59 === "END")) {
              const err109 = { instancePath: instancePath + "/next/type", schemaPath: "#/allOf/6/then/properties/next/properties/type/enum", keyword: "enum", params: { allowedValues: schema58.allOf[6].then.properties.next.properties.type.enum }, message: "must be equal to one of the allowed values" };
              if (vErrors === null) {
                vErrors = [err109];
              } else {
                vErrors.push(err109);
              }
              errors++;
            }
          }
        }
      }
      if (data.reason !== void 0) {
        let data60 = data.reason;
        if (!(data60 === "REQUEST_SKIP" || data60 === "REFUSED")) {
          const err110 = { instancePath: instancePath + "/reason", schemaPath: "#/allOf/6/then/properties/reason/enum", keyword: "enum", params: { allowedValues: schema58.allOf[6].then.properties.reason.enum }, message: "must be equal to one of the allowed values" };
          if (vErrors === null) {
            vErrors = [err110];
          } else {
            vErrors.push(err110);
          }
          errors++;
        }
      }
    }
    var _valid6 = _errs55 === errors;
    valid26 = _valid6;
    if (valid26) {
      var props6 = {};
      props6.ask = true;
      props6.previous = true;
      props6.current = true;
      props6.note = true;
      props6.next = true;
      props6.reason = true;
      props6.action = true;
    }
  }
  if (!valid26) {
    const err111 = { instancePath, schemaPath: "#/allOf/6/if", keyword: "if", params: { failingKeyword: "then" }, message: 'must match "then" schema' };
    if (vErrors === null) {
      vErrors = [err111];
    } else {
      vErrors.push(err111);
    }
    errors++;
  }
  if (props0 !== true && props6 !== void 0) {
    if (props6 === true) {
      props0 = true;
    } else {
      props0 = props0 || {};
      Object.assign(props0, props6);
    }
  }
  const _errs60 = errors;
  let valid30 = true;
  const _errs61 = errors;
  if (data && typeof data == "object" && !Array.isArray(data)) {
    let missing7;
    if (data.action === void 0 && (missing7 = "action")) {
      const err112 = {};
      if (vErrors === null) {
        vErrors = [err112];
      } else {
        vErrors.push(err112);
      }
      errors++;
    } else {
      if (data.action !== void 0) {
        if ("REDIRECT" !== data.action) {
          const err113 = {};
          if (vErrors === null) {
            vErrors = [err113];
          } else {
            vErrors.push(err113);
          }
          errors++;
        }
      }
    }
  }
  var _valid7 = _errs61 === errors;
  errors = _errs60;
  if (vErrors !== null) {
    if (_errs60) {
      vErrors.length = _errs60;
    } else {
      vErrors = null;
    }
  }
  if (_valid7) {
    const _errs63 = errors;
    if (data && typeof data == "object" && !Array.isArray(data)) {
      if (data.action === void 0) {
        const err114 = { instancePath, schemaPath: "#/allOf/7/then/required", keyword: "required", params: { missingProperty: "action" }, message: "must have required property 'action'" };
        if (vErrors === null) {
          vErrors = [err114];
        } else {
          vErrors.push(err114);
        }
        errors++;
      }
      if (data.topic === void 0) {
        const err115 = { instancePath, schemaPath: "#/allOf/7/then/required", keyword: "required", params: { missingProperty: "topic" }, message: "must have required property 'topic'" };
        if (vErrors === null) {
          vErrors = [err115];
        } else {
          vErrors.push(err115);
        }
        errors++;
      }
      if (data.user_utterance === void 0) {
        const err116 = { instancePath, schemaPath: "#/allOf/7/then/required", keyword: "required", params: { missingProperty: "user_utterance" }, message: "must have required property 'user_utterance'" };
        if (vErrors === null) {
          vErrors = [err116];
        } else {
          vErrors.push(err116);
        }
        errors++;
      }
      if (data.known === void 0) {
        const err117 = { instancePath, schemaPath: "#/allOf/7/then/required", keyword: "required", params: { missingProperty: "known" }, message: "must have required property 'known'" };
        if (vErrors === null) {
          vErrors = [err117];
        } else {
          vErrors.push(err117);
        }
        errors++;
      }
      if (data.next === void 0) {
        const err118 = { instancePath, schemaPath: "#/allOf/7/then/required", keyword: "required", params: { missingProperty: "next" }, message: "must have required property 'next'" };
        if (vErrors === null) {
          vErrors = [err118];
        } else {
          vErrors.push(err118);
        }
        errors++;
      }
      if (data.reason === void 0) {
        const err119 = { instancePath, schemaPath: "#/allOf/7/then/required", keyword: "required", params: { missingProperty: "reason" }, message: "must have required property 'reason'" };
        if (vErrors === null) {
          vErrors = [err119];
        } else {
          vErrors.push(err119);
        }
        errors++;
      }
      if (data.ask !== void 0) {
        const err120 = { instancePath: instancePath + "/ask", schemaPath: "#/allOf/7/then/properties/ask/false schema", keyword: "false schema", params: {}, message: "boolean schema is false" };
        if (vErrors === null) {
          vErrors = [err120];
        } else {
          vErrors.push(err120);
        }
        errors++;
      }
      if (data.previous !== void 0) {
        const err121 = { instancePath: instancePath + "/previous", schemaPath: "#/allOf/7/then/properties/previous/false schema", keyword: "false schema", params: {}, message: "boolean schema is false" };
        if (vErrors === null) {
          vErrors = [err121];
        } else {
          vErrors.push(err121);
        }
        errors++;
      }
      if (data.current !== void 0) {
        const err122 = { instancePath: instancePath + "/current", schemaPath: "#/allOf/7/then/properties/current/false schema", keyword: "false schema", params: {}, message: "boolean schema is false" };
        if (vErrors === null) {
          vErrors = [err122];
        } else {
          vErrors.push(err122);
        }
        errors++;
      }
      if (data.hold !== void 0) {
        const err123 = { instancePath: instancePath + "/hold", schemaPath: "#/allOf/7/then/properties/hold/false schema", keyword: "false schema", params: {}, message: "boolean schema is false" };
        if (vErrors === null) {
          vErrors = [err123];
        } else {
          vErrors.push(err123);
        }
        errors++;
      }
      if (data.next !== void 0) {
        let data66 = data.next;
        if (data66 && typeof data66 == "object" && !Array.isArray(data66)) {
          if (data66.type !== void 0) {
            if (!(data66.type === "SAME")) {
              const err124 = { instancePath: instancePath + "/next/type", schemaPath: "#/allOf/7/then/properties/next/properties/type/enum", keyword: "enum", params: { allowedValues: schema58.allOf[7].then.properties.next.properties.type.enum }, message: "must be equal to one of the allowed values" };
              if (vErrors === null) {
                vErrors = [err124];
              } else {
                vErrors.push(err124);
              }
              errors++;
            }
          }
        }
      }
      if (data.reason !== void 0) {
        let data68 = data.reason;
        if (!(data68 === "ASK_PURPOSE" || data68 === "OFF_TOPIC" || data68 === "OUT_OF_SCHEMA")) {
          const err125 = { instancePath: instancePath + "/reason", schemaPath: "#/allOf/7/then/properties/reason/enum", keyword: "enum", params: { allowedValues: schema58.allOf[7].then.properties.reason.enum }, message: "must be equal to one of the allowed values" };
          if (vErrors === null) {
            vErrors = [err125];
          } else {
            vErrors.push(err125);
          }
          errors++;
        }
      }
    }
    var _valid7 = _errs63 === errors;
    valid30 = _valid7;
    if (valid30) {
      var props7 = {};
      props7.ask = true;
      props7.previous = true;
      props7.current = true;
      props7.hold = true;
      props7.next = true;
      props7.reason = true;
      props7.action = true;
    }
  }
  if (!valid30) {
    const err126 = { instancePath, schemaPath: "#/allOf/7/if", keyword: "if", params: { failingKeyword: "then" }, message: 'must match "then" schema' };
    if (vErrors === null) {
      vErrors = [err126];
    } else {
      vErrors.push(err126);
    }
    errors++;
  }
  if (props0 !== true && props7 !== void 0) {
    if (props7 === true) {
      props0 = true;
    } else {
      props0 = props0 || {};
      Object.assign(props0, props7);
    }
  }
  const _errs68 = errors;
  let valid34 = true;
  const _errs69 = errors;
  if (data && typeof data == "object" && !Array.isArray(data)) {
    let missing8;
    if (data.reason === void 0 && (missing8 = "reason")) {
      const err127 = {};
      if (vErrors === null) {
        vErrors = [err127];
      } else {
        vErrors.push(err127);
      }
      errors++;
    } else {
      if (data.reason !== void 0) {
        if ("OUT_OF_SCHEMA" !== data.reason) {
          const err128 = {};
          if (vErrors === null) {
            vErrors = [err128];
          } else {
            vErrors.push(err128);
          }
          errors++;
        }
      }
    }
  }
  var _valid8 = _errs69 === errors;
  errors = _errs68;
  if (vErrors !== null) {
    if (_errs68) {
      vErrors.length = _errs68;
    } else {
      vErrors = null;
    }
  }
  let ifClause0;
  if (_valid8) {
    const _errs71 = errors;
    if (data && typeof data == "object" && !Array.isArray(data)) {
      if (data.note === void 0) {
        const err129 = { instancePath, schemaPath: "#/allOf/8/then/required", keyword: "required", params: { missingProperty: "note" }, message: "must have required property 'note'" };
        if (vErrors === null) {
          vErrors = [err129];
        } else {
          vErrors.push(err129);
        }
        errors++;
      }
    }
    var _valid8 = _errs71 === errors;
    valid34 = _valid8;
    ifClause0 = "then";
  } else {
    const _errs72 = errors;
    if (data && typeof data == "object" && !Array.isArray(data)) {
      if (data.note !== void 0) {
        const err130 = { instancePath: instancePath + "/note", schemaPath: "#/allOf/8/else/properties/note/false schema", keyword: "false schema", params: {}, message: "boolean schema is false" };
        if (vErrors === null) {
          vErrors = [err130];
        } else {
          vErrors.push(err130);
        }
        errors++;
      }
    }
    var _valid8 = _errs72 === errors;
    valid34 = _valid8;
    if (valid34) {
      var props8 = {};
      props8.note = true;
      props8.reason = true;
    }
    ifClause0 = "else";
  }
  if (!valid34) {
    const err131 = { instancePath, schemaPath: "#/allOf/8/if", keyword: "if", params: { failingKeyword: ifClause0 }, message: 'must match "' + ifClause0 + '" schema' };
    if (vErrors === null) {
      vErrors = [err131];
    } else {
      vErrors.push(err131);
    }
    errors++;
  }
  if (props0 !== true && props8 !== void 0) {
    if (props8 === true) {
      props0 = true;
    } else {
      props0 = props0 || {};
      Object.assign(props0, props8);
    }
  }
  if (data && typeof data == "object" && !Array.isArray(data)) {
    if (data.action === void 0) {
      const err132 = { instancePath, schemaPath: "#/required", keyword: "required", params: { missingProperty: "action" }, message: "must have required property 'action'" };
      if (vErrors === null) {
        vErrors = [err132];
      } else {
        vErrors.push(err132);
      }
      errors++;
    }
    if (data.topic === void 0) {
      const err133 = { instancePath, schemaPath: "#/required", keyword: "required", params: { missingProperty: "topic" }, message: "must have required property 'topic'" };
      if (vErrors === null) {
        vErrors = [err133];
      } else {
        vErrors.push(err133);
      }
      errors++;
    }
    if (data.next === void 0) {
      const err134 = { instancePath, schemaPath: "#/required", keyword: "required", params: { missingProperty: "next" }, message: "must have required property 'next'" };
      if (vErrors === null) {
        vErrors = [err134];
      } else {
        vErrors.push(err134);
      }
      errors++;
    }
    for (const key0 in data) {
      if (!func24.call(schema58.properties, key0)) {
        const err135 = { instancePath, schemaPath: "#/additionalProperties", keyword: "additionalProperties", params: { additionalProperty: key0 }, message: "must NOT have additional properties" };
        if (vErrors === null) {
          vErrors = [err135];
        } else {
          vErrors.push(err135);
        }
        errors++;
      }
    }
    if (data.action !== void 0) {
      let data71 = data.action;
      if (!(data71 === "START" || data71 === "NEXT" || data71 === "CORRECT" || data71 === "REASK" || data71 === "CONFIRM" || data71 === "HOLD" || data71 === "SKIP" || data71 === "REDIRECT")) {
        const err136 = { instancePath: instancePath + "/action", schemaPath: "#/properties/action/enum", keyword: "enum", params: { allowedValues: schema58.properties.action.enum }, message: "must be equal to one of the allowed values" };
        if (vErrors === null) {
          vErrors = [err136];
        } else {
          vErrors.push(err136);
        }
        errors++;
      }
    }
    if (data.reason !== void 0) {
      let data72 = data.reason;
      if (!(data72 === "MISSING" || data72 === "OUT_OF_RANGE" || data72 === "UNKNOWN_UNIT" || data72 === "VAGUE_QUANTITY" || data72 === "RANGE_SPANS_OPTIONS" || data72 === "COUNT_EXCEEDS_DAYS" || data72 === "OTHER_BEVERAGE" || data72 === "BEVERAGE_MISSING" || data72 === "MISSING_NUMBER" || data72 === "UNPARSED_VALUE" || data72 === "INVALID_OPTION" || data72 === "CONFLICT_WITH_PREVIOUS" || data72 === "CONFLICT_DOES_NOT_DRINK" || data72 === "CONFLICT_MAX_BELOW_USUAL" || data72 === "UNCERTAIN" || data72 === "REQUEST_SKIP" || data72 === "REFUSED" || data72 === "ASK_PURPOSE" || data72 === "OFF_TOPIC" || data72 === "OUT_OF_SCHEMA")) {
        const err137 = { instancePath: instancePath + "/reason", schemaPath: "#/properties/reason/enum", keyword: "enum", params: { allowedValues: schema58.properties.reason.enum }, message: "must be equal to one of the allowed values" };
        if (vErrors === null) {
          vErrors = [err137];
        } else {
          vErrors.push(err137);
        }
        errors++;
      }
    }
    if (data.topic !== void 0) {
      let data73 = data.topic;
      if (typeof data73 === "string") {
        if (func1(data73) < 1) {
          const err138 = { instancePath: instancePath + "/topic", schemaPath: "#/properties/topic/minLength", keyword: "minLength", params: { limit: 1 }, message: "must NOT have fewer than 1 characters" };
          if (vErrors === null) {
            vErrors = [err138];
          } else {
            vErrors.push(err138);
          }
          errors++;
        }
      } else {
        const err139 = { instancePath: instancePath + "/topic", schemaPath: "#/properties/topic/type", keyword: "type", params: { type: "string" }, message: "must be string" };
        if (vErrors === null) {
          vErrors = [err139];
        } else {
          vErrors.push(err139);
        }
        errors++;
      }
    }
    if (data.user_utterance !== void 0) {
      let data74 = data.user_utterance;
      if (typeof data74 === "string") {
        if (func1(data74) < 1) {
          const err140 = { instancePath: instancePath + "/user_utterance", schemaPath: "#/properties/user_utterance/minLength", keyword: "minLength", params: { limit: 1 }, message: "must NOT have fewer than 1 characters" };
          if (vErrors === null) {
            vErrors = [err140];
          } else {
            vErrors.push(err140);
          }
          errors++;
        }
      } else {
        const err141 = { instancePath: instancePath + "/user_utterance", schemaPath: "#/properties/user_utterance/type", keyword: "type", params: { type: "string" }, message: "must be string" };
        if (vErrors === null) {
          vErrors = [err141];
        } else {
          vErrors.push(err141);
        }
        errors++;
      }
    }
    if (data.known !== void 0) {
      if (typeof data.known !== "string") {
        const err142 = { instancePath: instancePath + "/known", schemaPath: "#/properties/known/type", keyword: "type", params: { type: "string" }, message: "must be string" };
        if (vErrors === null) {
          vErrors = [err142];
        } else {
          vErrors.push(err142);
        }
        errors++;
      }
    }
    if (data.ask !== void 0) {
      let data76 = data.ask;
      if (typeof data76 === "string") {
        if (func1(data76) < 1) {
          const err143 = { instancePath: instancePath + "/ask", schemaPath: "#/properties/ask/minLength", keyword: "minLength", params: { limit: 1 }, message: "must NOT have fewer than 1 characters" };
          if (vErrors === null) {
            vErrors = [err143];
          } else {
            vErrors.push(err143);
          }
          errors++;
        }
      } else {
        const err144 = { instancePath: instancePath + "/ask", schemaPath: "#/properties/ask/type", keyword: "type", params: { type: "string" }, message: "must be string" };
        if (vErrors === null) {
          vErrors = [err144];
        } else {
          vErrors.push(err144);
        }
        errors++;
      }
    }
    if (data.previous !== void 0) {
      let data77 = data.previous;
      if (typeof data77 === "string") {
        if (func1(data77) < 1) {
          const err145 = { instancePath: instancePath + "/previous", schemaPath: "#/properties/previous/minLength", keyword: "minLength", params: { limit: 1 }, message: "must NOT have fewer than 1 characters" };
          if (vErrors === null) {
            vErrors = [err145];
          } else {
            vErrors.push(err145);
          }
          errors++;
        }
      } else {
        const err146 = { instancePath: instancePath + "/previous", schemaPath: "#/properties/previous/type", keyword: "type", params: { type: "string" }, message: "must be string" };
        if (vErrors === null) {
          vErrors = [err146];
        } else {
          vErrors.push(err146);
        }
        errors++;
      }
    }
    if (data.current !== void 0) {
      let data78 = data.current;
      if (typeof data78 === "string") {
        if (func1(data78) < 1) {
          const err147 = { instancePath: instancePath + "/current", schemaPath: "#/properties/current/minLength", keyword: "minLength", params: { limit: 1 }, message: "must NOT have fewer than 1 characters" };
          if (vErrors === null) {
            vErrors = [err147];
          } else {
            vErrors.push(err147);
          }
          errors++;
        }
      } else {
        const err148 = { instancePath: instancePath + "/current", schemaPath: "#/properties/current/type", keyword: "type", params: { type: "string" }, message: "must be string" };
        if (vErrors === null) {
          vErrors = [err148];
        } else {
          vErrors.push(err148);
        }
        errors++;
      }
    }
    if (data.hold !== void 0) {
      let data79 = data.hold;
      if (typeof data79 === "string") {
        if (func1(data79) < 1) {
          const err149 = { instancePath: instancePath + "/hold", schemaPath: "#/properties/hold/minLength", keyword: "minLength", params: { limit: 1 }, message: "must NOT have fewer than 1 characters" };
          if (vErrors === null) {
            vErrors = [err149];
          } else {
            vErrors.push(err149);
          }
          errors++;
        }
      } else {
        const err150 = { instancePath: instancePath + "/hold", schemaPath: "#/properties/hold/type", keyword: "type", params: { type: "string" }, message: "must be string" };
        if (vErrors === null) {
          vErrors = [err150];
        } else {
          vErrors.push(err150);
        }
        errors++;
      }
    }
    if (data.note !== void 0) {
      let data80 = data.note;
      if (typeof data80 === "string") {
        if (func1(data80) < 1) {
          const err151 = { instancePath: instancePath + "/note", schemaPath: "#/properties/note/minLength", keyword: "minLength", params: { limit: 1 }, message: "must NOT have fewer than 1 characters" };
          if (vErrors === null) {
            vErrors = [err151];
          } else {
            vErrors.push(err151);
          }
          errors++;
        }
      } else {
        const err152 = { instancePath: instancePath + "/note", schemaPath: "#/properties/note/type", keyword: "type", params: { type: "string" }, message: "must be string" };
        if (vErrors === null) {
          vErrors = [err152];
        } else {
          vErrors.push(err152);
        }
        errors++;
      }
    }
    if (data.next !== void 0) {
      let data81 = data.next;
      const _errs93 = errors;
      let valid38 = false;
      let passing0 = null;
      const _errs94 = errors;
      if (data81 && typeof data81 == "object" && !Array.isArray(data81)) {
        if (data81.type === void 0) {
          const err153 = { instancePath: instancePath + "/next", schemaPath: "#/properties/next/oneOf/0/required", keyword: "required", params: { missingProperty: "type" }, message: "must have required property 'type'" };
          if (vErrors === null) {
            vErrors = [err153];
          } else {
            vErrors.push(err153);
          }
          errors++;
        }
        if (data81.question_id === void 0) {
          const err154 = { instancePath: instancePath + "/next", schemaPath: "#/properties/next/oneOf/0/required", keyword: "required", params: { missingProperty: "question_id" }, message: "must have required property 'question_id'" };
          if (vErrors === null) {
            vErrors = [err154];
          } else {
            vErrors.push(err154);
          }
          errors++;
        }
        if (data81.text === void 0) {
          const err155 = { instancePath: instancePath + "/next", schemaPath: "#/properties/next/oneOf/0/required", keyword: "required", params: { missingProperty: "text" }, message: "must have required property 'text'" };
          if (vErrors === null) {
            vErrors = [err155];
          } else {
            vErrors.push(err155);
          }
          errors++;
        }
        for (const key1 in data81) {
          if (!(key1 === "type" || key1 === "question_id" || key1 === "text")) {
            const err156 = { instancePath: instancePath + "/next", schemaPath: "#/properties/next/oneOf/0/additionalProperties", keyword: "additionalProperties", params: { additionalProperty: key1 }, message: "must NOT have additional properties" };
            if (vErrors === null) {
              vErrors = [err156];
            } else {
              vErrors.push(err156);
            }
            errors++;
          }
        }
        if (data81.type !== void 0) {
          let data82 = data81.type;
          if (!(data82 === "NEXT" || data82 === "SAME")) {
            const err157 = { instancePath: instancePath + "/next/type", schemaPath: "#/properties/next/oneOf/0/properties/type/enum", keyword: "enum", params: { allowedValues: schema58.properties.next.oneOf[0].properties.type.enum }, message: "must be equal to one of the allowed values" };
            if (vErrors === null) {
              vErrors = [err157];
            } else {
              vErrors.push(err157);
            }
            errors++;
          }
        }
        if (data81.question_id !== void 0) {
          let data83 = data81.question_id;
          if (typeof data83 === "string") {
            if (!pattern8.test(data83)) {
              const err158 = { instancePath: instancePath + "/next/question_id", schemaPath: "_common.schema.json#/$defs/QuestionId/pattern", keyword: "pattern", params: { pattern: "^Q[0-9]+(\\.D[0-9]{2})?(_[0-9]+)?$(?![\\s\\S])" }, message: 'must match pattern "^Q[0-9]+(\\.D[0-9]{2})?(_[0-9]+)?$(?![\\s\\S])"' };
              if (vErrors === null) {
                vErrors = [err158];
              } else {
                vErrors.push(err158);
              }
              errors++;
            }
          } else {
            const err159 = { instancePath: instancePath + "/next/question_id", schemaPath: "_common.schema.json#/$defs/QuestionId/type", keyword: "type", params: { type: "string" }, message: "must be string" };
            if (vErrors === null) {
              vErrors = [err159];
            } else {
              vErrors.push(err159);
            }
            errors++;
          }
        }
        if (data81.text !== void 0) {
          let data84 = data81.text;
          if (typeof data84 === "string") {
            if (func1(data84) < 1) {
              const err160 = { instancePath: instancePath + "/next/text", schemaPath: "#/properties/next/oneOf/0/properties/text/minLength", keyword: "minLength", params: { limit: 1 }, message: "must NOT have fewer than 1 characters" };
              if (vErrors === null) {
                vErrors = [err160];
              } else {
                vErrors.push(err160);
              }
              errors++;
            }
          } else {
            const err161 = { instancePath: instancePath + "/next/text", schemaPath: "#/properties/next/oneOf/0/properties/text/type", keyword: "type", params: { type: "string" }, message: "must be string" };
            if (vErrors === null) {
              vErrors = [err161];
            } else {
              vErrors.push(err161);
            }
            errors++;
          }
        }
      } else {
        const err162 = { instancePath: instancePath + "/next", schemaPath: "#/properties/next/oneOf/0/type", keyword: "type", params: { type: "object" }, message: "must be object" };
        if (vErrors === null) {
          vErrors = [err162];
        } else {
          vErrors.push(err162);
        }
        errors++;
      }
      var _valid9 = _errs94 === errors;
      if (_valid9) {
        valid38 = true;
        passing0 = 0;
        var props9 = true;
      }
      const _errs103 = errors;
      if (data81 && typeof data81 == "object" && !Array.isArray(data81)) {
        if (data81.type === void 0) {
          const err163 = { instancePath: instancePath + "/next", schemaPath: "#/properties/next/oneOf/1/required", keyword: "required", params: { missingProperty: "type" }, message: "must have required property 'type'" };
          if (vErrors === null) {
            vErrors = [err163];
          } else {
            vErrors.push(err163);
          }
          errors++;
        }
        for (const key2 in data81) {
          if (!(key2 === "type")) {
            const err164 = { instancePath: instancePath + "/next", schemaPath: "#/properties/next/oneOf/1/additionalProperties", keyword: "additionalProperties", params: { additionalProperty: key2 }, message: "must NOT have additional properties" };
            if (vErrors === null) {
              vErrors = [err164];
            } else {
              vErrors.push(err164);
            }
            errors++;
          }
        }
        if (data81.type !== void 0) {
          if ("END" !== data81.type) {
            const err165 = { instancePath: instancePath + "/next/type", schemaPath: "#/properties/next/oneOf/1/properties/type/const", keyword: "const", params: { allowedValue: "END" }, message: "must be equal to constant" };
            if (vErrors === null) {
              vErrors = [err165];
            } else {
              vErrors.push(err165);
            }
            errors++;
          }
        }
      } else {
        const err166 = { instancePath: instancePath + "/next", schemaPath: "#/properties/next/oneOf/1/type", keyword: "type", params: { type: "object" }, message: "must be object" };
        if (vErrors === null) {
          vErrors = [err166];
        } else {
          vErrors.push(err166);
        }
        errors++;
      }
      var _valid9 = _errs103 === errors;
      if (_valid9 && valid38) {
        valid38 = false;
        passing0 = [passing0, 1];
      } else {
        if (_valid9) {
          valid38 = true;
          passing0 = 1;
          if (props9 !== true) {
            props9 = true;
          }
        }
      }
      if (!valid38) {
        const err167 = { instancePath: instancePath + "/next", schemaPath: "#/properties/next/oneOf", keyword: "oneOf", params: { passingSchemas: passing0 }, message: "must match exactly one schema in oneOf" };
        if (vErrors === null) {
          vErrors = [err167];
        } else {
          vErrors.push(err167);
        }
        errors++;
      } else {
        errors = _errs93;
        if (vErrors !== null) {
          if (_errs93) {
            vErrors.length = _errs93;
          } else {
            vErrors = null;
          }
        }
      }
    }
  } else {
    const err168 = { instancePath, schemaPath: "#/type", keyword: "type", params: { type: "object" }, message: "must be object" };
    if (vErrors === null) {
      vErrors = [err168];
    } else {
      vErrors.push(err168);
    }
    errors++;
  }
  validate41.errors = vErrors;
  return errors === 0;
}
validate41.evaluated = { "props": true, "dynamicProps": false, "dynamicItems": false };
var pattern10 = new RegExp("^(END|Q[0-9]+(\\.D[0-9]{2})?(_[0-9]+)?)$(?![\\s\\S])", "u");
function validate37(data, { instancePath = "", parentData, parentDataProperty, rootData = data, dynamicAnchors = {} } = {}) {
  ;
  let vErrors = null;
  let errors = 0;
  const evaluated0 = validate37.evaluated;
  if (evaluated0.dynamicProps) {
    evaluated0.props = void 0;
  }
  if (evaluated0.dynamicItems) {
    evaluated0.items = void 0;
  }
  const _errs2 = errors;
  let valid1 = true;
  const _errs3 = errors;
  if (data && typeof data == "object" && !Array.isArray(data)) {
    let missing0;
    if (data.review_status === void 0 && (missing0 = "review_status")) {
      const err0 = {};
      if (vErrors === null) {
        vErrors = [err0];
      } else {
        vErrors.push(err0);
      }
      errors++;
    } else {
      if (data.review_status !== void 0) {
        let data0 = data.review_status;
        if (!(data0 === "PENDING" || data0 === "DISMISSED")) {
          const err1 = {};
          if (vErrors === null) {
            vErrors = [err1];
          } else {
            vErrors.push(err1);
          }
          errors++;
        }
      }
    }
  }
  var _valid0 = _errs3 === errors;
  errors = _errs2;
  if (vErrors !== null) {
    if (_errs2) {
      vErrors.length = _errs2;
    } else {
      vErrors = null;
    }
  }
  if (_valid0) {
    const _errs5 = errors;
    if (data && typeof data == "object" && !Array.isArray(data)) {
      if (data.expected_kind !== void 0) {
        const err2 = { instancePath: instancePath + "/expected_kind", schemaPath: "#/allOf/0/then/properties/expected_kind/false schema", keyword: "false schema", params: {}, message: "boolean schema is false" };
        if (vErrors === null) {
          vErrors = [err2];
        } else {
          vErrors.push(err2);
        }
        errors++;
      }
      if (data.reviewed_input !== void 0) {
        const err3 = { instancePath: instancePath + "/reviewed_input", schemaPath: "#/allOf/0/then/properties/reviewed_input/false schema", keyword: "false schema", params: {}, message: "boolean schema is false" };
        if (vErrors === null) {
          vErrors = [err3];
        } else {
          vErrors.push(err3);
        }
        errors++;
      }
      if (data.expected !== void 0) {
        const err4 = { instancePath: instancePath + "/expected", schemaPath: "#/allOf/0/then/properties/expected/false schema", keyword: "false schema", params: {}, message: "boolean schema is false" };
        if (vErrors === null) {
          vErrors = [err4];
        } else {
          vErrors.push(err4);
        }
        errors++;
      }
    }
    var _valid0 = _errs5 === errors;
    valid1 = _valid0;
    if (valid1) {
      var props0 = {};
      props0.expected_kind = true;
      props0.reviewed_input = true;
      props0.expected = true;
      props0.review_status = true;
    }
  }
  if (!valid1) {
    const err5 = { instancePath, schemaPath: "#/allOf/0/if", keyword: "if", params: { failingKeyword: "then" }, message: 'must match "then" schema' };
    if (vErrors === null) {
      vErrors = [err5];
    } else {
      vErrors.push(err5);
    }
    errors++;
  }
  const _errs7 = errors;
  let valid4 = true;
  const _errs8 = errors;
  if (data && typeof data == "object" && !Array.isArray(data)) {
    let missing1;
    if (data.expected_kind === void 0 && (missing1 = "expected_kind")) {
      const err6 = {};
      if (vErrors === null) {
        vErrors = [err6];
      } else {
        vErrors.push(err6);
      }
      errors++;
    } else {
      if (data.expected_kind !== void 0) {
        if ("LORA_A" !== data.expected_kind) {
          const err7 = {};
          if (vErrors === null) {
            vErrors = [err7];
          } else {
            vErrors.push(err7);
          }
          errors++;
        }
      }
    }
  }
  var _valid1 = _errs8 === errors;
  errors = _errs7;
  if (vErrors !== null) {
    if (_errs7) {
      vErrors.length = _errs7;
    } else {
      vErrors = null;
    }
  }
  if (_valid1) {
    const _errs10 = errors;
    if (data && typeof data == "object" && !Array.isArray(data)) {
      if (data.reviewed_input !== void 0) {
        if (!validate38(data.reviewed_input, { instancePath: instancePath + "/reviewed_input", parentData: data, parentDataProperty: "reviewed_input", rootData, dynamicAnchors })) {
          vErrors = vErrors === null ? validate38.errors : vErrors.concat(validate38.errors);
          errors = vErrors.length;
        }
      }
      if (data.expected !== void 0) {
        let data6 = data.expected;
        const _errs16 = errors;
        let valid9 = true;
        const _errs17 = errors;
        if (data6 && typeof data6 == "object" && !Array.isArray(data6)) {
          let missing2;
          if (data6.action === void 0 && (missing2 = "action")) {
            const err8 = {};
            if (vErrors === null) {
              vErrors = [err8];
            } else {
              vErrors.push(err8);
            }
            errors++;
          } else {
            if (data6.action !== void 0) {
              if ("NEXT" !== data6.action) {
                const err9 = {};
                if (vErrors === null) {
                  vErrors = [err9];
                } else {
                  vErrors.push(err9);
                }
                errors++;
              }
            }
          }
        }
        var _valid2 = _errs17 === errors;
        errors = _errs16;
        if (vErrors !== null) {
          if (_errs16) {
            vErrors.length = _errs16;
          } else {
            vErrors = null;
          }
        }
        if (_valid2) {
          const _errs19 = errors;
          if (data6 && typeof data6 == "object" && !Array.isArray(data6)) {
            if (data6.reason !== void 0) {
              const err10 = { instancePath: instancePath + "/expected/reason", schemaPath: "ActionExtraction.schema.json/allOf/0/then/properties/reason/false schema", keyword: "false schema", params: {}, message: "boolean schema is false" };
              if (vErrors === null) {
                vErrors = [err10];
              } else {
                vErrors.push(err10);
              }
              errors++;
            }
            if (data6.targets !== void 0) {
              const err11 = { instancePath: instancePath + "/expected/targets", schemaPath: "ActionExtraction.schema.json/allOf/0/then/properties/targets/false schema", keyword: "false schema", params: {}, message: "boolean schema is false" };
              if (vErrors === null) {
                vErrors = [err11];
              } else {
                vErrors.push(err11);
              }
              errors++;
            }
            if (data6.note !== void 0) {
              const err12 = { instancePath: instancePath + "/expected/note", schemaPath: "ActionExtraction.schema.json/allOf/0/then/properties/note/false schema", keyword: "false schema", params: {}, message: "boolean schema is false" };
              if (vErrors === null) {
                vErrors = [err12];
              } else {
                vErrors.push(err12);
              }
              errors++;
            }
          }
          var _valid2 = _errs19 === errors;
          valid9 = _valid2;
          if (valid9) {
            var props1 = {};
            props1.reason = true;
            props1.targets = true;
            props1.note = true;
            props1.action = true;
          }
        }
        if (!valid9) {
          const err13 = { instancePath: instancePath + "/expected", schemaPath: "ActionExtraction.schema.json/allOf/0/if", keyword: "if", params: { failingKeyword: "then" }, message: 'must match "then" schema' };
          if (vErrors === null) {
            vErrors = [err13];
          } else {
            vErrors.push(err13);
          }
          errors++;
        }
        const _errs21 = errors;
        let valid12 = true;
        const _errs22 = errors;
        if (data6 && typeof data6 == "object" && !Array.isArray(data6)) {
          let missing3;
          if (data6.action === void 0 && (missing3 = "action")) {
            const err14 = {};
            if (vErrors === null) {
              vErrors = [err14];
            } else {
              vErrors.push(err14);
            }
            errors++;
          } else {
            if (data6.action !== void 0) {
              if ("CORRECT" !== data6.action) {
                const err15 = {};
                if (vErrors === null) {
                  vErrors = [err15];
                } else {
                  vErrors.push(err15);
                }
                errors++;
              }
            }
          }
        }
        var _valid3 = _errs22 === errors;
        errors = _errs21;
        if (vErrors !== null) {
          if (_errs21) {
            vErrors.length = _errs21;
          } else {
            vErrors = null;
          }
        }
        if (_valid3) {
          const _errs24 = errors;
          if (data6 && typeof data6 == "object" && !Array.isArray(data6)) {
            if (data6.reason !== void 0) {
              const err16 = { instancePath: instancePath + "/expected/reason", schemaPath: "ActionExtraction.schema.json/allOf/1/then/properties/reason/false schema", keyword: "false schema", params: {}, message: "boolean schema is false" };
              if (vErrors === null) {
                vErrors = [err16];
              } else {
                vErrors.push(err16);
              }
              errors++;
            }
            if (data6.targets !== void 0) {
              const err17 = { instancePath: instancePath + "/expected/targets", schemaPath: "ActionExtraction.schema.json/allOf/1/then/properties/targets/false schema", keyword: "false schema", params: {}, message: "boolean schema is false" };
              if (vErrors === null) {
                vErrors = [err17];
              } else {
                vErrors.push(err17);
              }
              errors++;
            }
            if (data6.note !== void 0) {
              const err18 = { instancePath: instancePath + "/expected/note", schemaPath: "ActionExtraction.schema.json/allOf/1/then/properties/note/false schema", keyword: "false schema", params: {}, message: "boolean schema is false" };
              if (vErrors === null) {
                vErrors = [err18];
              } else {
                vErrors.push(err18);
              }
              errors++;
            }
          }
          var _valid3 = _errs24 === errors;
          valid12 = _valid3;
          if (valid12) {
            var props2 = {};
            props2.reason = true;
            props2.targets = true;
            props2.note = true;
            props2.action = true;
          }
        }
        if (!valid12) {
          const err19 = { instancePath: instancePath + "/expected", schemaPath: "ActionExtraction.schema.json/allOf/1/if", keyword: "if", params: { failingKeyword: "then" }, message: 'must match "then" schema' };
          if (vErrors === null) {
            vErrors = [err19];
          } else {
            vErrors.push(err19);
          }
          errors++;
        }
        if (props1 !== true && props2 !== void 0) {
          if (props2 === true) {
            props1 = true;
          } else {
            props1 = props1 || {};
            Object.assign(props1, props2);
          }
        }
        const _errs26 = errors;
        let valid15 = true;
        const _errs27 = errors;
        if (data6 && typeof data6 == "object" && !Array.isArray(data6)) {
          let missing4;
          if (data6.action === void 0 && (missing4 = "action")) {
            const err20 = {};
            if (vErrors === null) {
              vErrors = [err20];
            } else {
              vErrors.push(err20);
            }
            errors++;
          } else {
            if (data6.action !== void 0) {
              if ("REASK" !== data6.action) {
                const err21 = {};
                if (vErrors === null) {
                  vErrors = [err21];
                } else {
                  vErrors.push(err21);
                }
                errors++;
              }
            }
          }
        }
        var _valid4 = _errs27 === errors;
        errors = _errs26;
        if (vErrors !== null) {
          if (_errs26) {
            vErrors.length = _errs26;
          } else {
            vErrors = null;
          }
        }
        if (_valid4) {
          const _errs29 = errors;
          if (data6 && typeof data6 == "object" && !Array.isArray(data6)) {
            if (data6.reason === void 0) {
              const err22 = { instancePath: instancePath + "/expected", schemaPath: "ActionExtraction.schema.json/allOf/2/then/required", keyword: "required", params: { missingProperty: "reason" }, message: "must have required property 'reason'" };
              if (vErrors === null) {
                vErrors = [err22];
              } else {
                vErrors.push(err22);
              }
              errors++;
            }
            if (data6.targets === void 0) {
              const err23 = { instancePath: instancePath + "/expected", schemaPath: "ActionExtraction.schema.json/allOf/2/then/required", keyword: "required", params: { missingProperty: "targets" }, message: "must have required property 'targets'" };
              if (vErrors === null) {
                vErrors = [err23];
              } else {
                vErrors.push(err23);
              }
              errors++;
            }
            if (data6.reason !== void 0) {
              let data16 = data6.reason;
              if (!(data16 === "MISSING" || data16 === "OUT_OF_RANGE" || data16 === "UNKNOWN_UNIT" || data16 === "VAGUE_QUANTITY" || data16 === "RANGE_SPANS_OPTIONS" || data16 === "COUNT_EXCEEDS_DAYS" || data16 === "OTHER_BEVERAGE" || data16 === "BEVERAGE_MISSING" || data16 === "MISSING_NUMBER" || data16 === "UNPARSED_VALUE" || data16 === "INVALID_OPTION")) {
                const err24 = { instancePath: instancePath + "/expected/reason", schemaPath: "ActionExtraction.schema.json/allOf/2/then/properties/reason/enum", keyword: "enum", params: { allowedValues: schema57.allOf[2].then.properties.reason.enum }, message: "must be equal to one of the allowed values" };
                if (vErrors === null) {
                  vErrors = [err24];
                } else {
                  vErrors.push(err24);
                }
                errors++;
              }
            }
            if (data6.note !== void 0) {
              const err25 = { instancePath: instancePath + "/expected/note", schemaPath: "ActionExtraction.schema.json/allOf/2/then/properties/note/false schema", keyword: "false schema", params: {}, message: "boolean schema is false" };
              if (vErrors === null) {
                vErrors = [err25];
              } else {
                vErrors.push(err25);
              }
              errors++;
            }
          }
          var _valid4 = _errs29 === errors;
          valid15 = _valid4;
          if (valid15) {
            var props3 = {};
            props3.reason = true;
            props3.note = true;
            props3.action = true;
          }
        }
        if (!valid15) {
          const err26 = { instancePath: instancePath + "/expected", schemaPath: "ActionExtraction.schema.json/allOf/2/if", keyword: "if", params: { failingKeyword: "then" }, message: 'must match "then" schema' };
          if (vErrors === null) {
            vErrors = [err26];
          } else {
            vErrors.push(err26);
          }
          errors++;
        }
        if (props1 !== true && props3 !== void 0) {
          if (props3 === true) {
            props1 = true;
          } else {
            props1 = props1 || {};
            Object.assign(props1, props3);
          }
        }
        const _errs32 = errors;
        let valid18 = true;
        const _errs33 = errors;
        if (data6 && typeof data6 == "object" && !Array.isArray(data6)) {
          let missing5;
          if (data6.action === void 0 && (missing5 = "action")) {
            const err27 = {};
            if (vErrors === null) {
              vErrors = [err27];
            } else {
              vErrors.push(err27);
            }
            errors++;
          } else {
            if (data6.action !== void 0) {
              if ("CONFIRM" !== data6.action) {
                const err28 = {};
                if (vErrors === null) {
                  vErrors = [err28];
                } else {
                  vErrors.push(err28);
                }
                errors++;
              }
            }
          }
        }
        var _valid5 = _errs33 === errors;
        errors = _errs32;
        if (vErrors !== null) {
          if (_errs32) {
            vErrors.length = _errs32;
          } else {
            vErrors = null;
          }
        }
        if (_valid5) {
          const _errs35 = errors;
          if (data6 && typeof data6 == "object" && !Array.isArray(data6)) {
            if (data6.reason === void 0) {
              const err29 = { instancePath: instancePath + "/expected", schemaPath: "ActionExtraction.schema.json/allOf/3/then/required", keyword: "required", params: { missingProperty: "reason" }, message: "must have required property 'reason'" };
              if (vErrors === null) {
                vErrors = [err29];
              } else {
                vErrors.push(err29);
              }
              errors++;
            }
            if (data6.targets === void 0) {
              const err30 = { instancePath: instancePath + "/expected", schemaPath: "ActionExtraction.schema.json/allOf/3/then/required", keyword: "required", params: { missingProperty: "targets" }, message: "must have required property 'targets'" };
              if (vErrors === null) {
                vErrors = [err30];
              } else {
                vErrors.push(err30);
              }
              errors++;
            }
            if (data6.reason !== void 0) {
              let data19 = data6.reason;
              if (!(data19 === "CONFLICT_WITH_PREVIOUS" || data19 === "CONFLICT_DOES_NOT_DRINK" || data19 === "CONFLICT_MAX_BELOW_USUAL")) {
                const err31 = { instancePath: instancePath + "/expected/reason", schemaPath: "ActionExtraction.schema.json/allOf/3/then/properties/reason/enum", keyword: "enum", params: { allowedValues: schema57.allOf[3].then.properties.reason.enum }, message: "must be equal to one of the allowed values" };
                if (vErrors === null) {
                  vErrors = [err31];
                } else {
                  vErrors.push(err31);
                }
                errors++;
              }
            }
            if (data6.note !== void 0) {
              const err32 = { instancePath: instancePath + "/expected/note", schemaPath: "ActionExtraction.schema.json/allOf/3/then/properties/note/false schema", keyword: "false schema", params: {}, message: "boolean schema is false" };
              if (vErrors === null) {
                vErrors = [err32];
              } else {
                vErrors.push(err32);
              }
              errors++;
            }
          }
          var _valid5 = _errs35 === errors;
          valid18 = _valid5;
          if (valid18) {
            var props4 = {};
            props4.reason = true;
            props4.note = true;
            props4.action = true;
          }
        }
        if (!valid18) {
          const err33 = { instancePath: instancePath + "/expected", schemaPath: "ActionExtraction.schema.json/allOf/3/if", keyword: "if", params: { failingKeyword: "then" }, message: 'must match "then" schema' };
          if (vErrors === null) {
            vErrors = [err33];
          } else {
            vErrors.push(err33);
          }
          errors++;
        }
        if (props1 !== true && props4 !== void 0) {
          if (props4 === true) {
            props1 = true;
          } else {
            props1 = props1 || {};
            Object.assign(props1, props4);
          }
        }
        const _errs38 = errors;
        let valid21 = true;
        const _errs39 = errors;
        if (data6 && typeof data6 == "object" && !Array.isArray(data6)) {
          let missing6;
          if (data6.action === void 0 && (missing6 = "action")) {
            const err34 = {};
            if (vErrors === null) {
              vErrors = [err34];
            } else {
              vErrors.push(err34);
            }
            errors++;
          } else {
            if (data6.action !== void 0) {
              if ("HOLD" !== data6.action) {
                const err35 = {};
                if (vErrors === null) {
                  vErrors = [err35];
                } else {
                  vErrors.push(err35);
                }
                errors++;
              }
            }
          }
        }
        var _valid6 = _errs39 === errors;
        errors = _errs38;
        if (vErrors !== null) {
          if (_errs38) {
            vErrors.length = _errs38;
          } else {
            vErrors = null;
          }
        }
        if (_valid6) {
          const _errs41 = errors;
          if (data6 && typeof data6 == "object" && !Array.isArray(data6)) {
            if (data6.reason === void 0) {
              const err36 = { instancePath: instancePath + "/expected", schemaPath: "ActionExtraction.schema.json/allOf/4/then/required", keyword: "required", params: { missingProperty: "reason" }, message: "must have required property 'reason'" };
              if (vErrors === null) {
                vErrors = [err36];
              } else {
                vErrors.push(err36);
              }
              errors++;
            }
            if (data6.targets === void 0) {
              const err37 = { instancePath: instancePath + "/expected", schemaPath: "ActionExtraction.schema.json/allOf/4/then/required", keyword: "required", params: { missingProperty: "targets" }, message: "must have required property 'targets'" };
              if (vErrors === null) {
                vErrors = [err37];
              } else {
                vErrors.push(err37);
              }
              errors++;
            }
            if (data6.reason !== void 0) {
              if (!(data6.reason === "UNCERTAIN")) {
                const err38 = { instancePath: instancePath + "/expected/reason", schemaPath: "ActionExtraction.schema.json/allOf/4/then/properties/reason/enum", keyword: "enum", params: { allowedValues: schema57.allOf[4].then.properties.reason.enum }, message: "must be equal to one of the allowed values" };
                if (vErrors === null) {
                  vErrors = [err38];
                } else {
                  vErrors.push(err38);
                }
                errors++;
              }
            }
            if (data6.note !== void 0) {
              const err39 = { instancePath: instancePath + "/expected/note", schemaPath: "ActionExtraction.schema.json/allOf/4/then/properties/note/false schema", keyword: "false schema", params: {}, message: "boolean schema is false" };
              if (vErrors === null) {
                vErrors = [err39];
              } else {
                vErrors.push(err39);
              }
              errors++;
            }
          }
          var _valid6 = _errs41 === errors;
          valid21 = _valid6;
          if (valid21) {
            var props5 = {};
            props5.reason = true;
            props5.note = true;
            props5.action = true;
          }
        }
        if (!valid21) {
          const err40 = { instancePath: instancePath + "/expected", schemaPath: "ActionExtraction.schema.json/allOf/4/if", keyword: "if", params: { failingKeyword: "then" }, message: 'must match "then" schema' };
          if (vErrors === null) {
            vErrors = [err40];
          } else {
            vErrors.push(err40);
          }
          errors++;
        }
        if (props1 !== true && props5 !== void 0) {
          if (props5 === true) {
            props1 = true;
          } else {
            props1 = props1 || {};
            Object.assign(props1, props5);
          }
        }
        const _errs44 = errors;
        let valid24 = true;
        const _errs45 = errors;
        if (data6 && typeof data6 == "object" && !Array.isArray(data6)) {
          let missing7;
          if (data6.action === void 0 && (missing7 = "action")) {
            const err41 = {};
            if (vErrors === null) {
              vErrors = [err41];
            } else {
              vErrors.push(err41);
            }
            errors++;
          } else {
            if (data6.action !== void 0) {
              if ("SKIP" !== data6.action) {
                const err42 = {};
                if (vErrors === null) {
                  vErrors = [err42];
                } else {
                  vErrors.push(err42);
                }
                errors++;
              }
            }
          }
        }
        var _valid7 = _errs45 === errors;
        errors = _errs44;
        if (vErrors !== null) {
          if (_errs44) {
            vErrors.length = _errs44;
          } else {
            vErrors = null;
          }
        }
        if (_valid7) {
          const _errs47 = errors;
          if (data6 && typeof data6 == "object" && !Array.isArray(data6)) {
            if (data6.reason === void 0) {
              const err43 = { instancePath: instancePath + "/expected", schemaPath: "ActionExtraction.schema.json/allOf/5/then/required", keyword: "required", params: { missingProperty: "reason" }, message: "must have required property 'reason'" };
              if (vErrors === null) {
                vErrors = [err43];
              } else {
                vErrors.push(err43);
              }
              errors++;
            }
            if (data6.targets === void 0) {
              const err44 = { instancePath: instancePath + "/expected", schemaPath: "ActionExtraction.schema.json/allOf/5/then/required", keyword: "required", params: { missingProperty: "targets" }, message: "must have required property 'targets'" };
              if (vErrors === null) {
                vErrors = [err44];
              } else {
                vErrors.push(err44);
              }
              errors++;
            }
            if (data6.reason !== void 0) {
              let data25 = data6.reason;
              if (!(data25 === "REQUEST_SKIP" || data25 === "REFUSED")) {
                const err45 = { instancePath: instancePath + "/expected/reason", schemaPath: "ActionExtraction.schema.json/allOf/5/then/properties/reason/enum", keyword: "enum", params: { allowedValues: schema57.allOf[5].then.properties.reason.enum }, message: "must be equal to one of the allowed values" };
                if (vErrors === null) {
                  vErrors = [err45];
                } else {
                  vErrors.push(err45);
                }
                errors++;
              }
            }
            if (data6.note !== void 0) {
              const err46 = { instancePath: instancePath + "/expected/note", schemaPath: "ActionExtraction.schema.json/allOf/5/then/properties/note/false schema", keyword: "false schema", params: {}, message: "boolean schema is false" };
              if (vErrors === null) {
                vErrors = [err46];
              } else {
                vErrors.push(err46);
              }
              errors++;
            }
          }
          var _valid7 = _errs47 === errors;
          valid24 = _valid7;
          if (valid24) {
            var props6 = {};
            props6.reason = true;
            props6.note = true;
            props6.action = true;
          }
        }
        if (!valid24) {
          const err47 = { instancePath: instancePath + "/expected", schemaPath: "ActionExtraction.schema.json/allOf/5/if", keyword: "if", params: { failingKeyword: "then" }, message: 'must match "then" schema' };
          if (vErrors === null) {
            vErrors = [err47];
          } else {
            vErrors.push(err47);
          }
          errors++;
        }
        if (props1 !== true && props6 !== void 0) {
          if (props6 === true) {
            props1 = true;
          } else {
            props1 = props1 || {};
            Object.assign(props1, props6);
          }
        }
        const _errs50 = errors;
        let valid27 = true;
        const _errs51 = errors;
        if (data6 && typeof data6 == "object" && !Array.isArray(data6)) {
          let missing8;
          if (data6.action === void 0 && (missing8 = "action")) {
            const err48 = {};
            if (vErrors === null) {
              vErrors = [err48];
            } else {
              vErrors.push(err48);
            }
            errors++;
          } else {
            if (data6.action !== void 0) {
              if ("REDIRECT" !== data6.action) {
                const err49 = {};
                if (vErrors === null) {
                  vErrors = [err49];
                } else {
                  vErrors.push(err49);
                }
                errors++;
              }
            }
          }
        }
        var _valid8 = _errs51 === errors;
        errors = _errs50;
        if (vErrors !== null) {
          if (_errs50) {
            vErrors.length = _errs50;
          } else {
            vErrors = null;
          }
        }
        if (_valid8) {
          const _errs53 = errors;
          if (data6 && typeof data6 == "object" && !Array.isArray(data6)) {
            if (data6.reason === void 0) {
              const err50 = { instancePath: instancePath + "/expected", schemaPath: "ActionExtraction.schema.json/allOf/6/then/required", keyword: "required", params: { missingProperty: "reason" }, message: "must have required property 'reason'" };
              if (vErrors === null) {
                vErrors = [err50];
              } else {
                vErrors.push(err50);
              }
              errors++;
            }
            if (data6.reason !== void 0) {
              let data28 = data6.reason;
              if (!(data28 === "ASK_PURPOSE" || data28 === "OFF_TOPIC" || data28 === "OUT_OF_SCHEMA")) {
                const err51 = { instancePath: instancePath + "/expected/reason", schemaPath: "ActionExtraction.schema.json/allOf/6/then/properties/reason/enum", keyword: "enum", params: { allowedValues: schema57.allOf[6].then.properties.reason.enum }, message: "must be equal to one of the allowed values" };
                if (vErrors === null) {
                  vErrors = [err51];
                } else {
                  vErrors.push(err51);
                }
                errors++;
              }
            }
            if (data6.targets !== void 0) {
              const err52 = { instancePath: instancePath + "/expected/targets", schemaPath: "ActionExtraction.schema.json/allOf/6/then/properties/targets/false schema", keyword: "false schema", params: {}, message: "boolean schema is false" };
              if (vErrors === null) {
                vErrors = [err52];
              } else {
                vErrors.push(err52);
              }
              errors++;
            }
            if (data6.values !== void 0) {
              let data30 = data6.values;
              if (Array.isArray(data30)) {
                if (data30.length > 0) {
                  const err53 = { instancePath: instancePath + "/expected/values", schemaPath: "ActionExtraction.schema.json/allOf/6/then/properties/values/maxItems", keyword: "maxItems", params: { limit: 0 }, message: "must NOT have more than 0 items" };
                  if (vErrors === null) {
                    vErrors = [err53];
                  } else {
                    vErrors.push(err53);
                  }
                  errors++;
                }
              }
            }
          }
          var _valid8 = _errs53 === errors;
          valid27 = _valid8;
          if (valid27) {
            var props7 = {};
            props7.reason = true;
            props7.targets = true;
            props7.values = true;
            props7.action = true;
          }
        }
        if (!valid27) {
          const err54 = { instancePath: instancePath + "/expected", schemaPath: "ActionExtraction.schema.json/allOf/6/if", keyword: "if", params: { failingKeyword: "then" }, message: 'must match "then" schema' };
          if (vErrors === null) {
            vErrors = [err54];
          } else {
            vErrors.push(err54);
          }
          errors++;
        }
        if (props1 !== true && props7 !== void 0) {
          if (props7 === true) {
            props1 = true;
          } else {
            props1 = props1 || {};
            Object.assign(props1, props7);
          }
        }
        const _errs57 = errors;
        let valid30 = true;
        const _errs58 = errors;
        if (data6 && typeof data6 == "object" && !Array.isArray(data6)) {
          let missing9;
          if (data6.reason === void 0 && (missing9 = "reason")) {
            const err55 = {};
            if (vErrors === null) {
              vErrors = [err55];
            } else {
              vErrors.push(err55);
            }
            errors++;
          } else {
            if (data6.reason !== void 0) {
              if ("OUT_OF_SCHEMA" !== data6.reason) {
                const err56 = {};
                if (vErrors === null) {
                  vErrors = [err56];
                } else {
                  vErrors.push(err56);
                }
                errors++;
              }
            }
          }
        }
        var _valid9 = _errs58 === errors;
        errors = _errs57;
        if (vErrors !== null) {
          if (_errs57) {
            vErrors.length = _errs57;
          } else {
            vErrors = null;
          }
        }
        let ifClause0;
        if (_valid9) {
          const _errs60 = errors;
          if (data6 && typeof data6 == "object" && !Array.isArray(data6)) {
            if (data6.note === void 0) {
              const err57 = { instancePath: instancePath + "/expected", schemaPath: "ActionExtraction.schema.json/allOf/7/then/required", keyword: "required", params: { missingProperty: "note" }, message: "must have required property 'note'" };
              if (vErrors === null) {
                vErrors = [err57];
              } else {
                vErrors.push(err57);
              }
              errors++;
            }
          }
          var _valid9 = _errs60 === errors;
          valid30 = _valid9;
          ifClause0 = "then";
        } else {
          const _errs61 = errors;
          if (data6 && typeof data6 == "object" && !Array.isArray(data6)) {
            if (data6.note !== void 0) {
              const err58 = { instancePath: instancePath + "/expected/note", schemaPath: "ActionExtraction.schema.json/allOf/7/else/properties/note/false schema", keyword: "false schema", params: {}, message: "boolean schema is false" };
              if (vErrors === null) {
                vErrors = [err58];
              } else {
                vErrors.push(err58);
              }
              errors++;
            }
          }
          var _valid9 = _errs61 === errors;
          valid30 = _valid9;
          if (valid30) {
            var props8 = {};
            props8.note = true;
            props8.reason = true;
          }
          ifClause0 = "else";
        }
        if (!valid30) {
          const err59 = { instancePath: instancePath + "/expected", schemaPath: "ActionExtraction.schema.json/allOf/7/if", keyword: "if", params: { failingKeyword: ifClause0 }, message: 'must match "' + ifClause0 + '" schema' };
          if (vErrors === null) {
            vErrors = [err59];
          } else {
            vErrors.push(err59);
          }
          errors++;
        }
        if (props1 !== true && props8 !== void 0) {
          if (props8 === true) {
            props1 = true;
          } else {
            props1 = props1 || {};
            Object.assign(props1, props8);
          }
        }
        if (data6 && typeof data6 == "object" && !Array.isArray(data6)) {
          if (data6.values === void 0) {
            const err60 = { instancePath: instancePath + "/expected", schemaPath: "ActionExtraction.schema.json/required", keyword: "required", params: { missingProperty: "values" }, message: "must have required property 'values'" };
            if (vErrors === null) {
              vErrors = [err60];
            } else {
              vErrors.push(err60);
            }
            errors++;
          }
          if (data6.action === void 0) {
            const err61 = { instancePath: instancePath + "/expected", schemaPath: "ActionExtraction.schema.json/required", keyword: "required", params: { missingProperty: "action" }, message: "must have required property 'action'" };
            if (vErrors === null) {
              vErrors = [err61];
            } else {
              vErrors.push(err61);
            }
            errors++;
          }
          if (data6.next_item === void 0) {
            const err62 = { instancePath: instancePath + "/expected", schemaPath: "ActionExtraction.schema.json/required", keyword: "required", params: { missingProperty: "next_item" }, message: "must have required property 'next_item'" };
            if (vErrors === null) {
              vErrors = [err62];
            } else {
              vErrors.push(err62);
            }
            errors++;
          }
          for (const key0 in data6) {
            if (!(key0 === "action" || key0 === "next_item" || key0 === "note" || key0 === "reason" || key0 === "targets" || key0 === "values")) {
              const err63 = { instancePath: instancePath + "/expected", schemaPath: "ActionExtraction.schema.json/additionalProperties", keyword: "additionalProperties", params: { additionalProperty: key0 }, message: "must NOT have additional properties" };
              if (vErrors === null) {
                vErrors = [err63];
              } else {
                vErrors.push(err63);
              }
              errors++;
            }
          }
          if (data6.action !== void 0) {
            let data33 = data6.action;
            if (!(data33 === "NEXT" || data33 === "CORRECT" || data33 === "REASK" || data33 === "CONFIRM" || data33 === "HOLD" || data33 === "SKIP" || data33 === "REDIRECT")) {
              const err64 = { instancePath: instancePath + "/expected/action", schemaPath: "ActionExtraction.schema.json/properties/action/enum", keyword: "enum", params: { allowedValues: schema57.properties.action.enum }, message: "must be equal to one of the allowed values" };
              if (vErrors === null) {
                vErrors = [err64];
              } else {
                vErrors.push(err64);
              }
              errors++;
            }
          }
          if (data6.next_item !== void 0) {
            let data34 = data6.next_item;
            if (typeof data34 === "string") {
              if (!pattern10.test(data34)) {
                const err65 = { instancePath: instancePath + "/expected/next_item", schemaPath: "ActionExtraction.schema.json/properties/next_item/pattern", keyword: "pattern", params: { pattern: "^(END|Q[0-9]+(\\.D[0-9]{2})?(_[0-9]+)?)$(?![\\s\\S])" }, message: 'must match pattern "^(END|Q[0-9]+(\\.D[0-9]{2})?(_[0-9]+)?)$(?![\\s\\S])"' };
                if (vErrors === null) {
                  vErrors = [err65];
                } else {
                  vErrors.push(err65);
                }
                errors++;
              }
            } else {
              const err66 = { instancePath: instancePath + "/expected/next_item", schemaPath: "ActionExtraction.schema.json/properties/next_item/type", keyword: "type", params: { type: "string" }, message: "must be string" };
              if (vErrors === null) {
                vErrors = [err66];
              } else {
                vErrors.push(err66);
              }
              errors++;
            }
          }
          if (data6.note !== void 0) {
            let data35 = data6.note;
            if (typeof data35 === "string") {
              if (func1(data35) < 1) {
                const err67 = { instancePath: instancePath + "/expected/note", schemaPath: "ActionExtraction.schema.json/properties/note/minLength", keyword: "minLength", params: { limit: 1 }, message: "must NOT have fewer than 1 characters" };
                if (vErrors === null) {
                  vErrors = [err67];
                } else {
                  vErrors.push(err67);
                }
                errors++;
              }
            } else {
              const err68 = { instancePath: instancePath + "/expected/note", schemaPath: "ActionExtraction.schema.json/properties/note/type", keyword: "type", params: { type: "string" }, message: "must be string" };
              if (vErrors === null) {
                vErrors = [err68];
              } else {
                vErrors.push(err68);
              }
              errors++;
            }
          }
          if (data6.reason !== void 0) {
            let data36 = data6.reason;
            if (!(data36 === "MISSING" || data36 === "OUT_OF_RANGE" || data36 === "UNKNOWN_UNIT" || data36 === "VAGUE_QUANTITY" || data36 === "RANGE_SPANS_OPTIONS" || data36 === "COUNT_EXCEEDS_DAYS" || data36 === "OTHER_BEVERAGE" || data36 === "BEVERAGE_MISSING" || data36 === "MISSING_NUMBER" || data36 === "UNPARSED_VALUE" || data36 === "INVALID_OPTION" || data36 === "CONFLICT_WITH_PREVIOUS" || data36 === "CONFLICT_DOES_NOT_DRINK" || data36 === "CONFLICT_MAX_BELOW_USUAL" || data36 === "UNCERTAIN" || data36 === "REQUEST_SKIP" || data36 === "REFUSED" || data36 === "ASK_PURPOSE" || data36 === "OFF_TOPIC" || data36 === "OUT_OF_SCHEMA")) {
              const err69 = { instancePath: instancePath + "/expected/reason", schemaPath: "ActionExtraction.schema.json/properties/reason/enum", keyword: "enum", params: { allowedValues: schema57.properties.reason.enum }, message: "must be equal to one of the allowed values" };
              if (vErrors === null) {
                vErrors = [err69];
              } else {
                vErrors.push(err69);
              }
              errors++;
            }
          }
          if (data6.targets !== void 0) {
            let data37 = data6.targets;
            if (Array.isArray(data37)) {
              if (data37.length > 256) {
                const err70 = { instancePath: instancePath + "/expected/targets", schemaPath: "ActionExtraction.schema.json/properties/targets/maxItems", keyword: "maxItems", params: { limit: 256 }, message: "must NOT have more than 256 items" };
                if (vErrors === null) {
                  vErrors = [err70];
                } else {
                  vErrors.push(err70);
                }
                errors++;
              }
              if (data37.length < 1) {
                const err71 = { instancePath: instancePath + "/expected/targets", schemaPath: "ActionExtraction.schema.json/properties/targets/minItems", keyword: "minItems", params: { limit: 1 }, message: "must NOT have fewer than 1 items" };
                if (vErrors === null) {
                  vErrors = [err71];
                } else {
                  vErrors.push(err71);
                }
                errors++;
              }
              const len0 = data37.length;
              for (let i0 = 0; i0 < len0; i0++) {
                let data38 = data37[i0];
                if (typeof data38 === "string") {
                  if (func1(data38) > 128) {
                    const err72 = { instancePath: instancePath + "/expected/targets/" + i0, schemaPath: "ActionExtraction.schema.json/properties/targets/items/maxLength", keyword: "maxLength", params: { limit: 128 }, message: "must NOT have more than 128 characters" };
                    if (vErrors === null) {
                      vErrors = [err72];
                    } else {
                      vErrors.push(err72);
                    }
                    errors++;
                  }
                  if (!pattern9.test(data38)) {
                    const err73 = { instancePath: instancePath + "/expected/targets/" + i0, schemaPath: "ActionExtraction.schema.json/properties/targets/items/pattern", keyword: "pattern", params: { pattern: "^Q[0-9]+(\\.D[0-9]{2})?(_[0-9]+)?(\\[(soju|beer|spirits|makgeolli|wine)\\])?\\.[a-z][a-z_]*$(?![\\s\\S])" }, message: 'must match pattern "^Q[0-9]+(\\.D[0-9]{2})?(_[0-9]+)?(\\[(soju|beer|spirits|makgeolli|wine)\\])?\\.[a-z][a-z_]*$(?![\\s\\S])"' };
                    if (vErrors === null) {
                      vErrors = [err73];
                    } else {
                      vErrors.push(err73);
                    }
                    errors++;
                  }
                } else {
                  const err74 = { instancePath: instancePath + "/expected/targets/" + i0, schemaPath: "ActionExtraction.schema.json/properties/targets/items/type", keyword: "type", params: { type: "string" }, message: "must be string" };
                  if (vErrors === null) {
                    vErrors = [err74];
                  } else {
                    vErrors.push(err74);
                  }
                  errors++;
                }
              }
            } else {
              const err75 = { instancePath: instancePath + "/expected/targets", schemaPath: "ActionExtraction.schema.json/properties/targets/type", keyword: "type", params: { type: "array" }, message: "must be array" };
              if (vErrors === null) {
                vErrors = [err75];
              } else {
                vErrors.push(err75);
              }
              errors++;
            }
          }
          if (data6.values !== void 0) {
            let data39 = data6.values;
            if (Array.isArray(data39)) {
              if (data39.length > 256) {
                const err76 = { instancePath: instancePath + "/expected/values", schemaPath: "ActionExtraction.schema.json/properties/values/maxItems", keyword: "maxItems", params: { limit: 256 }, message: "must NOT have more than 256 items" };
                if (vErrors === null) {
                  vErrors = [err76];
                } else {
                  vErrors.push(err76);
                }
                errors++;
              }
              const len1 = data39.length;
              for (let i1 = 0; i1 < len1; i1++) {
                let data40 = data39[i1];
                const _errs79 = errors;
                let valid39 = true;
                const _errs80 = errors;
                if (data40 && typeof data40 == "object" && !Array.isArray(data40)) {
                  let missing10;
                  if (data40.status === void 0 && (missing10 = "status")) {
                    const err77 = {};
                    if (vErrors === null) {
                      vErrors = [err77];
                    } else {
                      vErrors.push(err77);
                    }
                    errors++;
                  } else {
                    if (data40.status !== void 0) {
                      let data41 = data40.status;
                      if (!(data41 === "ANSWERED" || data41 === "CORRECTION")) {
                        const err78 = {};
                        if (vErrors === null) {
                          vErrors = [err78];
                        } else {
                          vErrors.push(err78);
                        }
                        errors++;
                      }
                    }
                  }
                }
                var _valid10 = _errs80 === errors;
                errors = _errs79;
                if (vErrors !== null) {
                  if (_errs79) {
                    vErrors.length = _errs79;
                  } else {
                    vErrors = null;
                  }
                }
                let ifClause1;
                if (_valid10) {
                  const _errs82 = errors;
                  if (data40 && typeof data40 == "object" && !Array.isArray(data40)) {
                    if (data40.save !== void 0) {
                      if (true !== data40.save) {
                        const err79 = { instancePath: instancePath + "/expected/values/" + i1 + "/save", schemaPath: "ActionExtraction.schema.json/properties/values/items/allOf/0/then/properties/save/const", keyword: "const", params: { allowedValue: true }, message: "must be equal to constant" };
                        if (vErrors === null) {
                          vErrors = [err79];
                        } else {
                          vErrors.push(err79);
                        }
                        errors++;
                      }
                    }
                    if (data40.precision !== void 0) {
                      let data43 = data40.precision;
                      if (!(data43 === "exact" || data43 === "approximate")) {
                        const err80 = { instancePath: instancePath + "/expected/values/" + i1 + "/precision", schemaPath: "ActionExtraction.schema.json/properties/values/items/allOf/0/then/properties/precision/enum", keyword: "enum", params: { allowedValues: schema57.properties.values.items.allOf[0].then.properties.precision.enum }, message: "must be equal to one of the allowed values" };
                        if (vErrors === null) {
                          vErrors = [err80];
                        } else {
                          vErrors.push(err80);
                        }
                        errors++;
                      }
                    }
                    if (data40.value !== void 0) {
                      let data44 = data40.value;
                      if (typeof data44 !== "boolean" && !(typeof data44 == "number" && isFinite(data44)) && typeof data44 !== "string") {
                        const err81 = { instancePath: instancePath + "/expected/values/" + i1 + "/value", schemaPath: "ActionExtraction.schema.json/properties/values/items/allOf/0/then/properties/value/type", keyword: "type", params: { type: schema57.properties.values.items.allOf[0].then.properties.value.type }, message: "must be boolean,number,string" };
                        if (vErrors === null) {
                          vErrors = [err81];
                        } else {
                          vErrors.push(err81);
                        }
                        errors++;
                      }
                    }
                  }
                  var _valid10 = _errs82 === errors;
                  valid39 = _valid10;
                  if (valid39) {
                    var props9 = {};
                    props9.save = true;
                    props9.precision = true;
                    props9.value = true;
                    props9.status = true;
                  }
                  ifClause1 = "then";
                } else {
                  const _errs87 = errors;
                  if (data40 && typeof data40 == "object" && !Array.isArray(data40)) {
                    if (data40.save !== void 0) {
                      if (false !== data40.save) {
                        const err82 = { instancePath: instancePath + "/expected/values/" + i1 + "/save", schemaPath: "ActionExtraction.schema.json/properties/values/items/allOf/0/else/properties/save/const", keyword: "const", params: { allowedValue: false }, message: "must be equal to constant" };
                        if (vErrors === null) {
                          vErrors = [err82];
                        } else {
                          vErrors.push(err82);
                        }
                        errors++;
                      }
                    }
                  }
                  var _valid10 = _errs87 === errors;
                  valid39 = _valid10;
                  if (valid39) {
                    if (props9 !== true) {
                      props9 = props9 || {};
                      props9.save = true;
                    }
                  }
                  ifClause1 = "else";
                }
                if (!valid39) {
                  const err83 = { instancePath: instancePath + "/expected/values/" + i1, schemaPath: "ActionExtraction.schema.json/properties/values/items/allOf/0/if", keyword: "if", params: { failingKeyword: ifClause1 }, message: 'must match "' + ifClause1 + '" schema' };
                  if (vErrors === null) {
                    vErrors = [err83];
                  } else {
                    vErrors.push(err83);
                  }
                  errors++;
                }
                const _errs90 = errors;
                let valid43 = true;
                const _errs91 = errors;
                if (data40 && typeof data40 == "object" && !Array.isArray(data40)) {
                  let missing11;
                  if (data40.status === void 0 && (missing11 = "status")) {
                    const err84 = {};
                    if (vErrors === null) {
                      vErrors = [err84];
                    } else {
                      vErrors.push(err84);
                    }
                    errors++;
                  } else {
                    if (data40.status !== void 0) {
                      let data46 = data40.status;
                      if (!(data46 === "MISSING" || data46 === "UNCLEAR" || data46 === "UNKNOWN" || data46 === "REJECTED")) {
                        const err85 = {};
                        if (vErrors === null) {
                          vErrors = [err85];
                        } else {
                          vErrors.push(err85);
                        }
                        errors++;
                      }
                    }
                  }
                }
                var _valid11 = _errs91 === errors;
                errors = _errs90;
                if (vErrors !== null) {
                  if (_errs90) {
                    vErrors.length = _errs90;
                  } else {
                    vErrors = null;
                  }
                }
                if (_valid11) {
                  const _errs93 = errors;
                  if (data40 && typeof data40 == "object" && !Array.isArray(data40)) {
                    if (data40.value !== void 0) {
                      if (data40.value !== null) {
                        const err86 = { instancePath: instancePath + "/expected/values/" + i1 + "/value", schemaPath: "ActionExtraction.schema.json/properties/values/items/allOf/1/then/properties/value/type", keyword: "type", params: { type: "null" }, message: "must be null" };
                        if (vErrors === null) {
                          vErrors = [err86];
                        } else {
                          vErrors.push(err86);
                        }
                        errors++;
                      }
                    }
                    if (data40.precision !== void 0) {
                      if ("unspecified" !== data40.precision) {
                        const err87 = { instancePath: instancePath + "/expected/values/" + i1 + "/precision", schemaPath: "ActionExtraction.schema.json/properties/values/items/allOf/1/then/properties/precision/const", keyword: "const", params: { allowedValue: "unspecified" }, message: "must be equal to constant" };
                        if (vErrors === null) {
                          vErrors = [err87];
                        } else {
                          vErrors.push(err87);
                        }
                        errors++;
                      }
                    }
                  }
                  var _valid11 = _errs93 === errors;
                  valid43 = _valid11;
                  if (valid43) {
                    var props10 = {};
                    props10.value = true;
                    props10.precision = true;
                    props10.status = true;
                  }
                }
                if (!valid43) {
                  const err88 = { instancePath: instancePath + "/expected/values/" + i1, schemaPath: "ActionExtraction.schema.json/properties/values/items/allOf/1/if", keyword: "if", params: { failingKeyword: "then" }, message: 'must match "then" schema' };
                  if (vErrors === null) {
                    vErrors = [err88];
                  } else {
                    vErrors.push(err88);
                  }
                  errors++;
                }
                if (props9 !== true && props10 !== void 0) {
                  if (props10 === true) {
                    props9 = true;
                  } else {
                    props9 = props9 || {};
                    Object.assign(props9, props10);
                  }
                }
                if (data40 && typeof data40 == "object" && !Array.isArray(data40)) {
                  if (data40.key === void 0) {
                    const err89 = { instancePath: instancePath + "/expected/values/" + i1, schemaPath: "ActionExtraction.schema.json/properties/values/items/required", keyword: "required", params: { missingProperty: "key" }, message: "must have required property 'key'" };
                    if (vErrors === null) {
                      vErrors = [err89];
                    } else {
                      vErrors.push(err89);
                    }
                    errors++;
                  }
                  if (data40.value === void 0) {
                    const err90 = { instancePath: instancePath + "/expected/values/" + i1, schemaPath: "ActionExtraction.schema.json/properties/values/items/required", keyword: "required", params: { missingProperty: "value" }, message: "must have required property 'value'" };
                    if (vErrors === null) {
                      vErrors = [err90];
                    } else {
                      vErrors.push(err90);
                    }
                    errors++;
                  }
                  if (data40.precision === void 0) {
                    const err91 = { instancePath: instancePath + "/expected/values/" + i1, schemaPath: "ActionExtraction.schema.json/properties/values/items/required", keyword: "required", params: { missingProperty: "precision" }, message: "must have required property 'precision'" };
                    if (vErrors === null) {
                      vErrors = [err91];
                    } else {
                      vErrors.push(err91);
                    }
                    errors++;
                  }
                  if (data40.status === void 0) {
                    const err92 = { instancePath: instancePath + "/expected/values/" + i1, schemaPath: "ActionExtraction.schema.json/properties/values/items/required", keyword: "required", params: { missingProperty: "status" }, message: "must have required property 'status'" };
                    if (vErrors === null) {
                      vErrors = [err92];
                    } else {
                      vErrors.push(err92);
                    }
                    errors++;
                  }
                  if (data40.save === void 0) {
                    const err93 = { instancePath: instancePath + "/expected/values/" + i1, schemaPath: "ActionExtraction.schema.json/properties/values/items/required", keyword: "required", params: { missingProperty: "save" }, message: "must have required property 'save'" };
                    if (vErrors === null) {
                      vErrors = [err93];
                    } else {
                      vErrors.push(err93);
                    }
                    errors++;
                  }
                  for (const key1 in data40) {
                    if (!(key1 === "key" || key1 === "precision" || key1 === "save" || key1 === "status" || key1 === "value")) {
                      const err94 = { instancePath: instancePath + "/expected/values/" + i1, schemaPath: "ActionExtraction.schema.json/properties/values/items/additionalProperties", keyword: "additionalProperties", params: { additionalProperty: key1 }, message: "must NOT have additional properties" };
                      if (vErrors === null) {
                        vErrors = [err94];
                      } else {
                        vErrors.push(err94);
                      }
                      errors++;
                    }
                  }
                  if (data40.key !== void 0) {
                    let data49 = data40.key;
                    if (typeof data49 === "string") {
                      if (func1(data49) > 128) {
                        const err95 = { instancePath: instancePath + "/expected/values/" + i1 + "/key", schemaPath: "ActionExtraction.schema.json/properties/values/items/properties/key/maxLength", keyword: "maxLength", params: { limit: 128 }, message: "must NOT have more than 128 characters" };
                        if (vErrors === null) {
                          vErrors = [err95];
                        } else {
                          vErrors.push(err95);
                        }
                        errors++;
                      }
                      if (!pattern9.test(data49)) {
                        const err96 = { instancePath: instancePath + "/expected/values/" + i1 + "/key", schemaPath: "ActionExtraction.schema.json/properties/values/items/properties/key/pattern", keyword: "pattern", params: { pattern: "^Q[0-9]+(\\.D[0-9]{2})?(_[0-9]+)?(\\[(soju|beer|spirits|makgeolli|wine)\\])?\\.[a-z][a-z_]*$(?![\\s\\S])" }, message: 'must match pattern "^Q[0-9]+(\\.D[0-9]{2})?(_[0-9]+)?(\\[(soju|beer|spirits|makgeolli|wine)\\])?\\.[a-z][a-z_]*$(?![\\s\\S])"' };
                        if (vErrors === null) {
                          vErrors = [err96];
                        } else {
                          vErrors.push(err96);
                        }
                        errors++;
                      }
                    } else {
                      const err97 = { instancePath: instancePath + "/expected/values/" + i1 + "/key", schemaPath: "ActionExtraction.schema.json/properties/values/items/properties/key/type", keyword: "type", params: { type: "string" }, message: "must be string" };
                      if (vErrors === null) {
                        vErrors = [err97];
                      } else {
                        vErrors.push(err97);
                      }
                      errors++;
                    }
                  }
                  if (data40.precision !== void 0) {
                    let data50 = data40.precision;
                    if (!(data50 === "exact" || data50 === "approximate" || data50 === "unspecified")) {
                      const err98 = { instancePath: instancePath + "/expected/values/" + i1 + "/precision", schemaPath: "ActionExtraction.schema.json/properties/values/items/properties/precision/enum", keyword: "enum", params: { allowedValues: schema57.properties.values.items.properties.precision.enum }, message: "must be equal to one of the allowed values" };
                      if (vErrors === null) {
                        vErrors = [err98];
                      } else {
                        vErrors.push(err98);
                      }
                      errors++;
                    }
                  }
                  if (data40.save !== void 0) {
                    if (typeof data40.save !== "boolean") {
                      const err99 = { instancePath: instancePath + "/expected/values/" + i1 + "/save", schemaPath: "ActionExtraction.schema.json/properties/values/items/properties/save/type", keyword: "type", params: { type: "boolean" }, message: "must be boolean" };
                      if (vErrors === null) {
                        vErrors = [err99];
                      } else {
                        vErrors.push(err99);
                      }
                      errors++;
                    }
                  }
                  if (data40.status !== void 0) {
                    let data52 = data40.status;
                    if (!(data52 === "ANSWERED" || data52 === "CORRECTION" || data52 === "MISSING" || data52 === "UNCLEAR" || data52 === "CONFLICT" || data52 === "UNKNOWN" || data52 === "REJECTED")) {
                      const err100 = { instancePath: instancePath + "/expected/values/" + i1 + "/status", schemaPath: "ActionExtraction.schema.json/properties/values/items/properties/status/enum", keyword: "enum", params: { allowedValues: schema57.properties.values.items.properties.status.enum }, message: "must be equal to one of the allowed values" };
                      if (vErrors === null) {
                        vErrors = [err100];
                      } else {
                        vErrors.push(err100);
                      }
                      errors++;
                    }
                  }
                  if (data40.value !== void 0) {
                    let data53 = data40.value;
                    if (typeof data53 !== "boolean" && !(typeof data53 == "number" && isFinite(data53)) && typeof data53 !== "string" && data53 !== null) {
                      const err101 = { instancePath: instancePath + "/expected/values/" + i1 + "/value", schemaPath: "ActionExtraction.schema.json/properties/values/items/properties/value/type", keyword: "type", params: { type: schema57.properties.values.items.properties.value.type }, message: "must be boolean,number,string,null" };
                      if (vErrors === null) {
                        vErrors = [err101];
                      } else {
                        vErrors.push(err101);
                      }
                      errors++;
                    }
                  }
                } else {
                  const err102 = { instancePath: instancePath + "/expected/values/" + i1, schemaPath: "ActionExtraction.schema.json/properties/values/items/type", keyword: "type", params: { type: "object" }, message: "must be object" };
                  if (vErrors === null) {
                    vErrors = [err102];
                  } else {
                    vErrors.push(err102);
                  }
                  errors++;
                }
              }
            } else {
              const err103 = { instancePath: instancePath + "/expected/values", schemaPath: "ActionExtraction.schema.json/properties/values/type", keyword: "type", params: { type: "array" }, message: "must be array" };
              if (vErrors === null) {
                vErrors = [err103];
              } else {
                vErrors.push(err103);
              }
              errors++;
            }
          }
        } else {
          const err104 = { instancePath: instancePath + "/expected", schemaPath: "ActionExtraction.schema.json/type", keyword: "type", params: { type: "object" }, message: "must be object" };
          if (vErrors === null) {
            vErrors = [err104];
          } else {
            vErrors.push(err104);
          }
          errors++;
        }
      }
    }
    var _valid1 = _errs10 === errors;
    valid4 = _valid1;
    if (valid4) {
      var props11 = {};
      props11.reviewed_input = true;
      props11.expected = true;
      props11.expected_kind = true;
    }
  }
  if (!valid4) {
    const err105 = { instancePath, schemaPath: "#/allOf/1/if", keyword: "if", params: { failingKeyword: "then" }, message: 'must match "then" schema' };
    if (vErrors === null) {
      vErrors = [err105];
    } else {
      vErrors.push(err105);
    }
    errors++;
  }
  if (props0 !== true && props11 !== void 0) {
    if (props11 === true) {
      props0 = true;
    } else {
      props0 = props0 || {};
      Object.assign(props0, props11);
    }
  }
  const _errs109 = errors;
  let valid47 = true;
  const _errs110 = errors;
  if (data && typeof data == "object" && !Array.isArray(data)) {
    let missing12;
    if (data.expected_kind === void 0 && (missing12 = "expected_kind")) {
      const err106 = {};
      if (vErrors === null) {
        vErrors = [err106];
      } else {
        vErrors.push(err106);
      }
      errors++;
    } else {
      if (data.expected_kind !== void 0) {
        if ("LORA_B" !== data.expected_kind) {
          const err107 = {};
          if (vErrors === null) {
            vErrors = [err107];
          } else {
            vErrors.push(err107);
          }
          errors++;
        }
      }
    }
  }
  var _valid12 = _errs110 === errors;
  errors = _errs109;
  if (vErrors !== null) {
    if (_errs109) {
      vErrors.length = _errs109;
    } else {
      vErrors = null;
    }
  }
  if (_valid12) {
    const _errs112 = errors;
    if (data && typeof data == "object" && !Array.isArray(data)) {
      if (data.reviewed_input !== void 0) {
        if (!validate41(data.reviewed_input, { instancePath: instancePath + "/reviewed_input", parentData: data, parentDataProperty: "reviewed_input", rootData, dynamicAnchors })) {
          vErrors = vErrors === null ? validate41.errors : vErrors.concat(validate41.errors);
          errors = vErrors.length;
        }
      }
      if (data.expected !== void 0) {
        let data56 = data.expected;
        if (typeof data56 === "string") {
          if (func1(data56) < 1) {
            const err108 = { instancePath: instancePath + "/expected", schemaPath: "ResponseText.schema.json/minLength", keyword: "minLength", params: { limit: 1 }, message: "must NOT have fewer than 1 characters" };
            if (vErrors === null) {
              vErrors = [err108];
            } else {
              vErrors.push(err108);
            }
            errors++;
          }
        } else {
          const err109 = { instancePath: instancePath + "/expected", schemaPath: "ResponseText.schema.json/type", keyword: "type", params: { type: "string" }, message: "must be string" };
          if (vErrors === null) {
            vErrors = [err109];
          } else {
            vErrors.push(err109);
          }
          errors++;
        }
      }
    }
    var _valid12 = _errs112 === errors;
    valid47 = _valid12;
    if (valid47) {
      var props12 = {};
      props12.reviewed_input = true;
      props12.expected = true;
      props12.expected_kind = true;
    }
  }
  if (!valid47) {
    const err110 = { instancePath, schemaPath: "#/allOf/2/if", keyword: "if", params: { failingKeyword: "then" }, message: 'must match "then" schema' };
    if (vErrors === null) {
      vErrors = [err110];
    } else {
      vErrors.push(err110);
    }
    errors++;
  }
  if (props0 !== true && props12 !== void 0) {
    if (props12 === true) {
      props0 = true;
    } else {
      props0 = props0 || {};
      Object.assign(props0, props12);
    }
  }
  const _errs118 = errors;
  let valid51 = true;
  const _errs119 = errors;
  const _errs120 = errors;
  let valid52 = false;
  const _errs121 = errors;
  if (data && typeof data == "object" && !Array.isArray(data)) {
    let missing13;
    if (data.reviewed_input === void 0 && (missing13 = "reviewed_input")) {
      const err111 = {};
      if (vErrors === null) {
        vErrors = [err111];
      } else {
        vErrors.push(err111);
      }
      errors++;
    }
  }
  var _valid14 = _errs121 === errors;
  valid52 = valid52 || _valid14;
  const _errs122 = errors;
  if (data && typeof data == "object" && !Array.isArray(data)) {
    let missing14;
    if (data.expected === void 0 && (missing14 = "expected")) {
      const err112 = {};
      if (vErrors === null) {
        vErrors = [err112];
      } else {
        vErrors.push(err112);
      }
      errors++;
    }
  }
  var _valid14 = _errs122 === errors;
  valid52 = valid52 || _valid14;
  if (!valid52) {
    const err113 = {};
    if (vErrors === null) {
      vErrors = [err113];
    } else {
      vErrors.push(err113);
    }
    errors++;
  } else {
    errors = _errs120;
    if (vErrors !== null) {
      if (_errs120) {
        vErrors.length = _errs120;
      } else {
        vErrors = null;
      }
    }
  }
  var _valid13 = _errs119 === errors;
  errors = _errs118;
  if (vErrors !== null) {
    if (_errs118) {
      vErrors.length = _errs118;
    } else {
      vErrors = null;
    }
  }
  if (_valid13) {
    const _errs123 = errors;
    if (data && typeof data == "object" && !Array.isArray(data)) {
      if (data.expected_kind === void 0) {
        const err114 = { instancePath, schemaPath: "#/allOf/3/then/required", keyword: "required", params: { missingProperty: "expected_kind" }, message: "must have required property 'expected_kind'" };
        if (vErrors === null) {
          vErrors = [err114];
        } else {
          vErrors.push(err114);
        }
        errors++;
      }
    }
    var _valid13 = _errs123 === errors;
    valid51 = _valid13;
  }
  if (!valid51) {
    const err115 = { instancePath, schemaPath: "#/allOf/3/if", keyword: "if", params: { failingKeyword: "then" }, message: 'must match "then" schema' };
    if (vErrors === null) {
      vErrors = [err115];
    } else {
      vErrors.push(err115);
    }
    errors++;
  }
  if (data && typeof data == "object" && !Array.isArray(data)) {
    if (data.review_status === void 0) {
      const err116 = { instancePath, schemaPath: "#/required", keyword: "required", params: { missingProperty: "review_status" }, message: "must have required property 'review_status'" };
      if (vErrors === null) {
        vErrors = [err116];
      } else {
        vErrors.push(err116);
      }
      errors++;
    }
    for (const key2 in data) {
      if (!(key2 === "review_status" || key2 === "expected_kind" || key2 === "reviewed_input" || key2 === "expected")) {
        const err117 = { instancePath, schemaPath: "#/additionalProperties", keyword: "additionalProperties", params: { additionalProperty: key2 }, message: "must NOT have additional properties" };
        if (vErrors === null) {
          vErrors = [err117];
        } else {
          vErrors.push(err117);
        }
        errors++;
      }
    }
    if (data.review_status !== void 0) {
      let data57 = data.review_status;
      if (!(data57 === "PENDING" || data57 === "CONFIRMED" || data57 === "DISMISSED")) {
        const err118 = { instancePath: instancePath + "/review_status", schemaPath: "#/properties/review_status/enum", keyword: "enum", params: { allowedValues: schema53.properties.review_status.enum }, message: "must be equal to one of the allowed values" };
        if (vErrors === null) {
          vErrors = [err118];
        } else {
          vErrors.push(err118);
        }
        errors++;
      }
    }
    if (data.expected_kind !== void 0) {
      let data58 = data.expected_kind;
      if (!(data58 === "LORA_A" || data58 === "LORA_B")) {
        const err119 = { instancePath: instancePath + "/expected_kind", schemaPath: "#/properties/expected_kind/enum", keyword: "enum", params: { allowedValues: schema53.properties.expected_kind.enum }, message: "must be equal to one of the allowed values" };
        if (vErrors === null) {
          vErrors = [err119];
        } else {
          vErrors.push(err119);
        }
        errors++;
      }
    }
    if (data.reviewed_input !== void 0) {
      let data59 = data.reviewed_input;
      if (!(data59 && typeof data59 == "object" && !Array.isArray(data59))) {
        const err120 = { instancePath: instancePath + "/reviewed_input", schemaPath: "#/properties/reviewed_input/type", keyword: "type", params: { type: "object" }, message: "must be object" };
        if (vErrors === null) {
          vErrors = [err120];
        } else {
          vErrors.push(err120);
        }
        errors++;
      }
    }
    if (data.expected !== void 0) {
      let data60 = data.expected;
      if (!(data60 && typeof data60 == "object" && !Array.isArray(data60)) && typeof data60 !== "string") {
        const err121 = { instancePath: instancePath + "/expected", schemaPath: "#/properties/expected/type", keyword: "type", params: { type: schema53.properties.expected.type }, message: "must be object,string" };
        if (vErrors === null) {
          vErrors = [err121];
        } else {
          vErrors.push(err121);
        }
        errors++;
      }
    }
  } else {
    const err122 = { instancePath, schemaPath: "#/type", keyword: "type", params: { type: "object" }, message: "must be object" };
    if (vErrors === null) {
      vErrors = [err122];
    } else {
      vErrors.push(err122);
    }
    errors++;
  }
  validate37.errors = vErrors;
  return errors === 0;
}
validate37.evaluated = { "props": true, "dynamicProps": false, "dynamicItems": false };
exports.CaseReviewForm = validate43;
var schema62 = { "$schema": "https://json-schema.org/draft/2020-12/schema", "$id": "CaseReviewForm.schema.json", "title": "CaseReviewForm", "description": "case_review_draft\uC758 \uC785\uB825: \uAC80\uD1A0 \uD3FC. \uC785\uB825\uC774\uB098 \uC815\uB2F5\uC744 \uC4F0\uBA74 \uC885\uB958(kind)\uB97C \uACE8\uB77C\uC57C \uD55C\uB2E4. \uD14D\uC2A4\uD2B8\uAC00 JSON\uC778\uC9C0\uB294 \uC2A4\uD0A4\uB9C8 \uBC16 \uC870\uAC74.", "type": "object", "required": ["status", "kind", "inputText", "expectedText"], "properties": { "status": { "enum": ["PENDING", "CONFIRMED", "DISMISSED"] }, "kind": { "enum": ["", "LORA_A", "LORA_B"] }, "inputText": { "type": "string" }, "expectedText": { "type": "string" } }, "additionalProperties": false, "if": { "properties": { "status": { "const": "CONFIRMED" } }, "required": ["status"], "anyOf": [{ "properties": { "inputText": { "pattern": "\\S" } } }, { "properties": { "expectedText": { "pattern": "\\S" } } }] }, "then": { "properties": { "kind": { "enum": ["LORA_A", "LORA_B"] } } } };
function validate43(data, { instancePath = "", parentData, parentDataProperty, rootData = data, dynamicAnchors = {} } = {}) {
  ;
  let vErrors = null;
  let errors = 0;
  const evaluated0 = validate43.evaluated;
  if (evaluated0.dynamicProps) {
    evaluated0.props = void 0;
  }
  if (evaluated0.dynamicItems) {
    evaluated0.items = void 0;
  }
  const _errs1 = errors;
  let valid0 = true;
  const _errs2 = errors;
  const _errs3 = errors;
  let valid1 = false;
  const _errs4 = errors;
  if (data && typeof data == "object" && !Array.isArray(data)) {
    if (data.inputText !== void 0) {
      let data0 = data.inputText;
      if (typeof data0 === "string") {
        if (!pattern6.test(data0)) {
          const err0 = {};
          if (vErrors === null) {
            vErrors = [err0];
          } else {
            vErrors.push(err0);
          }
          errors++;
        }
      }
    }
  }
  var _valid1 = _errs4 === errors;
  valid1 = valid1 || _valid1;
  if (_valid1) {
    var props0 = {};
    props0.inputText = true;
  }
  const _errs6 = errors;
  if (data && typeof data == "object" && !Array.isArray(data)) {
    if (data.expectedText !== void 0) {
      let data1 = data.expectedText;
      if (typeof data1 === "string") {
        if (!pattern6.test(data1)) {
          const err1 = {};
          if (vErrors === null) {
            vErrors = [err1];
          } else {
            vErrors.push(err1);
          }
          errors++;
        }
      }
    }
  }
  var _valid1 = _errs6 === errors;
  valid1 = valid1 || _valid1;
  if (_valid1) {
    if (props0 !== true) {
      props0 = props0 || {};
      props0.expectedText = true;
    }
  }
  if (!valid1) {
    const err2 = {};
    if (vErrors === null) {
      vErrors = [err2];
    } else {
      vErrors.push(err2);
    }
    errors++;
  } else {
    errors = _errs3;
    if (vErrors !== null) {
      if (_errs3) {
        vErrors.length = _errs3;
      } else {
        vErrors = null;
      }
    }
  }
  if (errors === _errs2) {
    if (data && typeof data == "object" && !Array.isArray(data)) {
      let missing0;
      if (data.status === void 0 && (missing0 = "status")) {
        const err3 = {};
        if (vErrors === null) {
          vErrors = [err3];
        } else {
          vErrors.push(err3);
        }
        errors++;
      } else {
        if (props0 !== true) {
          props0 = props0 || {};
          props0.status = true;
        }
        if (data.status !== void 0) {
          if ("CONFIRMED" !== data.status) {
            const err4 = {};
            if (vErrors === null) {
              vErrors = [err4];
            } else {
              vErrors.push(err4);
            }
            errors++;
          }
        }
      }
    }
  }
  var _valid0 = _errs2 === errors;
  errors = _errs1;
  if (vErrors !== null) {
    if (_errs1) {
      vErrors.length = _errs1;
    } else {
      vErrors = null;
    }
  }
  if (_valid0) {
    const _errs9 = errors;
    if (data && typeof data == "object" && !Array.isArray(data)) {
      if (data.kind !== void 0) {
        let data3 = data.kind;
        if (!(data3 === "LORA_A" || data3 === "LORA_B")) {
          const err5 = { instancePath: instancePath + "/kind", schemaPath: "#/then/properties/kind/enum", keyword: "enum", params: { allowedValues: schema62.then.properties.kind.enum }, message: "must be equal to one of the allowed values" };
          if (vErrors === null) {
            vErrors = [err5];
          } else {
            vErrors.push(err5);
          }
          errors++;
        }
      }
    }
    var _valid0 = _errs9 === errors;
    valid0 = _valid0;
    if (valid0) {
      if (props0 !== true) {
        props0 = props0 || {};
        props0.kind = true;
      }
    }
  }
  if (!valid0) {
    const err6 = { instancePath, schemaPath: "#/if", keyword: "if", params: { failingKeyword: "then" }, message: 'must match "then" schema' };
    if (vErrors === null) {
      vErrors = [err6];
    } else {
      vErrors.push(err6);
    }
    errors++;
  }
  if (data && typeof data == "object" && !Array.isArray(data)) {
    if (data.status === void 0) {
      const err7 = { instancePath, schemaPath: "#/required", keyword: "required", params: { missingProperty: "status" }, message: "must have required property 'status'" };
      if (vErrors === null) {
        vErrors = [err7];
      } else {
        vErrors.push(err7);
      }
      errors++;
    }
    if (data.kind === void 0) {
      const err8 = { instancePath, schemaPath: "#/required", keyword: "required", params: { missingProperty: "kind" }, message: "must have required property 'kind'" };
      if (vErrors === null) {
        vErrors = [err8];
      } else {
        vErrors.push(err8);
      }
      errors++;
    }
    if (data.inputText === void 0) {
      const err9 = { instancePath, schemaPath: "#/required", keyword: "required", params: { missingProperty: "inputText" }, message: "must have required property 'inputText'" };
      if (vErrors === null) {
        vErrors = [err9];
      } else {
        vErrors.push(err9);
      }
      errors++;
    }
    if (data.expectedText === void 0) {
      const err10 = { instancePath, schemaPath: "#/required", keyword: "required", params: { missingProperty: "expectedText" }, message: "must have required property 'expectedText'" };
      if (vErrors === null) {
        vErrors = [err10];
      } else {
        vErrors.push(err10);
      }
      errors++;
    }
    for (const key0 in data) {
      if (!(key0 === "status" || key0 === "kind" || key0 === "inputText" || key0 === "expectedText")) {
        const err11 = { instancePath, schemaPath: "#/additionalProperties", keyword: "additionalProperties", params: { additionalProperty: key0 }, message: "must NOT have additional properties" };
        if (vErrors === null) {
          vErrors = [err11];
        } else {
          vErrors.push(err11);
        }
        errors++;
      }
    }
    if (data.status !== void 0) {
      let data4 = data.status;
      if (!(data4 === "PENDING" || data4 === "CONFIRMED" || data4 === "DISMISSED")) {
        const err12 = { instancePath: instancePath + "/status", schemaPath: "#/properties/status/enum", keyword: "enum", params: { allowedValues: schema62.properties.status.enum }, message: "must be equal to one of the allowed values" };
        if (vErrors === null) {
          vErrors = [err12];
        } else {
          vErrors.push(err12);
        }
        errors++;
      }
    }
    if (data.kind !== void 0) {
      let data5 = data.kind;
      if (!(data5 === "" || data5 === "LORA_A" || data5 === "LORA_B")) {
        const err13 = { instancePath: instancePath + "/kind", schemaPath: "#/properties/kind/enum", keyword: "enum", params: { allowedValues: schema62.properties.kind.enum }, message: "must be equal to one of the allowed values" };
        if (vErrors === null) {
          vErrors = [err13];
        } else {
          vErrors.push(err13);
        }
        errors++;
      }
    }
    if (data.inputText !== void 0) {
      if (typeof data.inputText !== "string") {
        const err14 = { instancePath: instancePath + "/inputText", schemaPath: "#/properties/inputText/type", keyword: "type", params: { type: "string" }, message: "must be string" };
        if (vErrors === null) {
          vErrors = [err14];
        } else {
          vErrors.push(err14);
        }
        errors++;
      }
    }
    if (data.expectedText !== void 0) {
      if (typeof data.expectedText !== "string") {
        const err15 = { instancePath: instancePath + "/expectedText", schemaPath: "#/properties/expectedText/type", keyword: "type", params: { type: "string" }, message: "must be string" };
        if (vErrors === null) {
          vErrors = [err15];
        } else {
          vErrors.push(err15);
        }
        errors++;
      }
    }
  } else {
    const err16 = { instancePath, schemaPath: "#/type", keyword: "type", params: { type: "object" }, message: "must be object" };
    if (vErrors === null) {
      vErrors = [err16];
    } else {
      vErrors.push(err16);
    }
    errors++;
  }
  validate43.errors = vErrors;
  return errors === 0;
}
validate43.evaluated = { "props": true, "dynamicProps": false, "dynamicItems": false };
exports.CaseReviewInput = validate44;
function validate44(data, { instancePath = "", parentData, parentDataProperty, rootData = data, dynamicAnchors = {} } = {}) {
  ;
  let vErrors = null;
  let errors = 0;
  const evaluated0 = validate44.evaluated;
  if (evaluated0.dynamicProps) {
    evaluated0.props = void 0;
  }
  if (evaluated0.dynamicItems) {
    evaluated0.items = void 0;
  }
  if (data && typeof data == "object" && !Array.isArray(data)) {
    if (data.caseId === void 0) {
      const err0 = { instancePath, schemaPath: "#/required", keyword: "required", params: { missingProperty: "caseId" }, message: "must have required property 'caseId'" };
      if (vErrors === null) {
        vErrors = [err0];
      } else {
        vErrors.push(err0);
      }
      errors++;
    }
    if (data.draft === void 0) {
      const err1 = { instancePath, schemaPath: "#/required", keyword: "required", params: { missingProperty: "draft" }, message: "must have required property 'draft'" };
      if (vErrors === null) {
        vErrors = [err1];
      } else {
        vErrors.push(err1);
      }
      errors++;
    }
    for (const key0 in data) {
      if (!(key0 === "caseId" || key0 === "draft")) {
        const err2 = { instancePath, schemaPath: "#/additionalProperties", keyword: "additionalProperties", params: { additionalProperty: key0 }, message: "must NOT have additional properties" };
        if (vErrors === null) {
          vErrors = [err2];
        } else {
          vErrors.push(err2);
        }
        errors++;
      }
    }
    if (data.caseId !== void 0) {
      let data0 = data.caseId;
      if (typeof data0 === "string") {
        if (func1(data0) < 1) {
          const err3 = { instancePath: instancePath + "/caseId", schemaPath: "#/properties/caseId/minLength", keyword: "minLength", params: { limit: 1 }, message: "must NOT have fewer than 1 characters" };
          if (vErrors === null) {
            vErrors = [err3];
          } else {
            vErrors.push(err3);
          }
          errors++;
        }
      } else {
        const err4 = { instancePath: instancePath + "/caseId", schemaPath: "#/properties/caseId/type", keyword: "type", params: { type: "string" }, message: "must be string" };
        if (vErrors === null) {
          vErrors = [err4];
        } else {
          vErrors.push(err4);
        }
        errors++;
      }
    }
    if (data.draft !== void 0) {
      if (!validate37(data.draft, { instancePath: instancePath + "/draft", parentData: data, parentDataProperty: "draft", rootData, dynamicAnchors })) {
        vErrors = vErrors === null ? validate37.errors : vErrors.concat(validate37.errors);
        errors = vErrors.length;
      }
    }
  } else {
    const err5 = { instancePath, schemaPath: "#/type", keyword: "type", params: { type: "object" }, message: "must be object" };
    if (vErrors === null) {
      vErrors = [err5];
    } else {
      vErrors.push(err5);
    }
    errors++;
  }
  validate44.errors = vErrors;
  return errors === 0;
}
validate44.evaluated = { "props": true, "dynamicProps": false, "dynamicItems": false };
exports.CaseReviewResult = validate46;
function validate46(data, { instancePath = "", parentData, parentDataProperty, rootData = data, dynamicAnchors = {} } = {}) {
  ;
  let vErrors = null;
  let errors = 0;
  const evaluated0 = validate46.evaluated;
  if (evaluated0.dynamicProps) {
    evaluated0.props = void 0;
  }
  if (evaluated0.dynamicItems) {
    evaluated0.items = void 0;
  }
  if (data && typeof data == "object" && !Array.isArray(data)) {
    if (data.case === void 0) {
      const err0 = { instancePath, schemaPath: "#/required", keyword: "required", params: { missingProperty: "case" }, message: "must have required property 'case'" };
      if (vErrors === null) {
        vErrors = [err0];
      } else {
        vErrors.push(err0);
      }
      errors++;
    }
    if (data.replay === void 0) {
      const err1 = { instancePath, schemaPath: "#/required", keyword: "required", params: { missingProperty: "replay" }, message: "must have required property 'replay'" };
      if (vErrors === null) {
        vErrors = [err1];
      } else {
        vErrors.push(err1);
      }
      errors++;
    }
    for (const key0 in data) {
      if (!(key0 === "case" || key0 === "replay")) {
        const err2 = { instancePath, schemaPath: "#/additionalProperties", keyword: "additionalProperties", params: { additionalProperty: key0 }, message: "must NOT have additional properties" };
        if (vErrors === null) {
          vErrors = [err2];
        } else {
          vErrors.push(err2);
        }
        errors++;
      }
    }
    if (data.case !== void 0) {
      if (!validate34(data.case, { instancePath: instancePath + "/case", parentData: data, parentDataProperty: "case", rootData, dynamicAnchors })) {
        vErrors = vErrors === null ? validate34.errors : vErrors.concat(validate34.errors);
        errors = vErrors.length;
      }
    }
    if (data.replay !== void 0) {
      if (typeof data.replay !== "boolean") {
        const err3 = { instancePath: instancePath + "/replay", schemaPath: "#/properties/replay/type", keyword: "type", params: { type: "boolean" }, message: "must be boolean" };
        if (vErrors === null) {
          vErrors = [err3];
        } else {
          vErrors.push(err3);
        }
        errors++;
      }
    }
  } else {
    const err4 = { instancePath, schemaPath: "#/type", keyword: "type", params: { type: "object" }, message: "must be object" };
    if (vErrors === null) {
      vErrors = [err4];
    } else {
      vErrors.push(err4);
    }
    errors++;
  }
  validate46.errors = vErrors;
  return errors === 0;
}
validate46.evaluated = { "props": true, "dynamicProps": false, "dynamicItems": false };
exports.Cell = validate48;
var schema65 = { "$schema": "https://json-schema.org/draft/2020-12/schema", "$id": "Cell.schema.json", "title": "Cell", "description": "\uC9C0\uD45C \uD45C\uC758 \uCE78. uncomputable\uC740 n=0(\uACC4\uC0B0 \uBABB \uD568), none\uC740 \uAE30\uC900 \uC5C6\uC74C\xB7\uBE44\uAD50 \uBABB \uD568.", "type": "object", "required": ["kind", "text"], "properties": { "kind": { "enum": ["value", "uncomputable", "none"] }, "text": { "type": "string", "minLength": 1 } }, "additionalProperties": false };
function validate48(data, { instancePath = "", parentData, parentDataProperty, rootData = data, dynamicAnchors = {} } = {}) {
  ;
  let vErrors = null;
  let errors = 0;
  const evaluated0 = validate48.evaluated;
  if (evaluated0.dynamicProps) {
    evaluated0.props = void 0;
  }
  if (evaluated0.dynamicItems) {
    evaluated0.items = void 0;
  }
  if (data && typeof data == "object" && !Array.isArray(data)) {
    if (data.kind === void 0) {
      const err0 = { instancePath, schemaPath: "#/required", keyword: "required", params: { missingProperty: "kind" }, message: "must have required property 'kind'" };
      if (vErrors === null) {
        vErrors = [err0];
      } else {
        vErrors.push(err0);
      }
      errors++;
    }
    if (data.text === void 0) {
      const err1 = { instancePath, schemaPath: "#/required", keyword: "required", params: { missingProperty: "text" }, message: "must have required property 'text'" };
      if (vErrors === null) {
        vErrors = [err1];
      } else {
        vErrors.push(err1);
      }
      errors++;
    }
    for (const key0 in data) {
      if (!(key0 === "kind" || key0 === "text")) {
        const err2 = { instancePath, schemaPath: "#/additionalProperties", keyword: "additionalProperties", params: { additionalProperty: key0 }, message: "must NOT have additional properties" };
        if (vErrors === null) {
          vErrors = [err2];
        } else {
          vErrors.push(err2);
        }
        errors++;
      }
    }
    if (data.kind !== void 0) {
      let data0 = data.kind;
      if (!(data0 === "value" || data0 === "uncomputable" || data0 === "none")) {
        const err3 = { instancePath: instancePath + "/kind", schemaPath: "#/properties/kind/enum", keyword: "enum", params: { allowedValues: schema65.properties.kind.enum }, message: "must be equal to one of the allowed values" };
        if (vErrors === null) {
          vErrors = [err3];
        } else {
          vErrors.push(err3);
        }
        errors++;
      }
    }
    if (data.text !== void 0) {
      let data1 = data.text;
      if (typeof data1 === "string") {
        if (func1(data1) < 1) {
          const err4 = { instancePath: instancePath + "/text", schemaPath: "#/properties/text/minLength", keyword: "minLength", params: { limit: 1 }, message: "must NOT have fewer than 1 characters" };
          if (vErrors === null) {
            vErrors = [err4];
          } else {
            vErrors.push(err4);
          }
          errors++;
        }
      } else {
        const err5 = { instancePath: instancePath + "/text", schemaPath: "#/properties/text/type", keyword: "type", params: { type: "string" }, message: "must be string" };
        if (vErrors === null) {
          vErrors = [err5];
        } else {
          vErrors.push(err5);
        }
        errors++;
      }
    }
  } else {
    const err6 = { instancePath, schemaPath: "#/type", keyword: "type", params: { type: "object" }, message: "must be object" };
    if (vErrors === null) {
      vErrors = [err6];
    } else {
      vErrors.push(err6);
    }
    errors++;
  }
  validate48.errors = vErrors;
  return errors === 0;
}
validate48.evaluated = { "props": true, "dynamicProps": false, "dynamicItems": false };
exports.Comparison = validate49;
var schema66 = { "$schema": "https://json-schema.org/draft/2020-12/schema", "$id": "Comparison.schema.json", "title": "Comparison", "description": "\uBCF4\uACE0\uC11C\uC758 \uC9C0\uD45C \uBE44\uAD50 \uD55C \uAC74(ReviewReport.comparisons \uC6D0\uC18C\uC758 \uC77D\uAE30\uC6A9 \uD22C\uC601). n=0\uACFC null \uAE30\uC900\uAC12\uC744 \uAD6C\uBD84\uD574\uC11C \uC77D\uB294\uB2E4.", "type": "object", "required": ["role", "name", "group", "candidate", "higher_is_better"], "properties": { "role": { "type": "string" }, "name": { "type": "string" }, "group": { "type": "string" }, "slice": { "type": "object", "required": ["kind", "value"], "properties": { "kind": { "type": "string" }, "value": { "type": "string" } } }, "candidate": { "type": "number" }, "candidate_n": { "type": "integer", "minimum": 0 }, "baseline": { "type": ["number", "null"] }, "baseline_n": { "type": ["integer", "null"], "minimum": 0 }, "delta": { "type": ["number", "null"] }, "higher_is_better": { "type": "boolean" }, "worse": { "type": ["boolean", "null"] } } };
function validate49(data, { instancePath = "", parentData, parentDataProperty, rootData = data, dynamicAnchors = {} } = {}) {
  ;
  let vErrors = null;
  let errors = 0;
  const evaluated0 = validate49.evaluated;
  if (evaluated0.dynamicProps) {
    evaluated0.props = void 0;
  }
  if (evaluated0.dynamicItems) {
    evaluated0.items = void 0;
  }
  if (data && typeof data == "object" && !Array.isArray(data)) {
    if (data.role === void 0) {
      const err0 = { instancePath, schemaPath: "#/required", keyword: "required", params: { missingProperty: "role" }, message: "must have required property 'role'" };
      if (vErrors === null) {
        vErrors = [err0];
      } else {
        vErrors.push(err0);
      }
      errors++;
    }
    if (data.name === void 0) {
      const err1 = { instancePath, schemaPath: "#/required", keyword: "required", params: { missingProperty: "name" }, message: "must have required property 'name'" };
      if (vErrors === null) {
        vErrors = [err1];
      } else {
        vErrors.push(err1);
      }
      errors++;
    }
    if (data.group === void 0) {
      const err2 = { instancePath, schemaPath: "#/required", keyword: "required", params: { missingProperty: "group" }, message: "must have required property 'group'" };
      if (vErrors === null) {
        vErrors = [err2];
      } else {
        vErrors.push(err2);
      }
      errors++;
    }
    if (data.candidate === void 0) {
      const err3 = { instancePath, schemaPath: "#/required", keyword: "required", params: { missingProperty: "candidate" }, message: "must have required property 'candidate'" };
      if (vErrors === null) {
        vErrors = [err3];
      } else {
        vErrors.push(err3);
      }
      errors++;
    }
    if (data.higher_is_better === void 0) {
      const err4 = { instancePath, schemaPath: "#/required", keyword: "required", params: { missingProperty: "higher_is_better" }, message: "must have required property 'higher_is_better'" };
      if (vErrors === null) {
        vErrors = [err4];
      } else {
        vErrors.push(err4);
      }
      errors++;
    }
    if (data.role !== void 0) {
      if (typeof data.role !== "string") {
        const err5 = { instancePath: instancePath + "/role", schemaPath: "#/properties/role/type", keyword: "type", params: { type: "string" }, message: "must be string" };
        if (vErrors === null) {
          vErrors = [err5];
        } else {
          vErrors.push(err5);
        }
        errors++;
      }
    }
    if (data.name !== void 0) {
      if (typeof data.name !== "string") {
        const err6 = { instancePath: instancePath + "/name", schemaPath: "#/properties/name/type", keyword: "type", params: { type: "string" }, message: "must be string" };
        if (vErrors === null) {
          vErrors = [err6];
        } else {
          vErrors.push(err6);
        }
        errors++;
      }
    }
    if (data.group !== void 0) {
      if (typeof data.group !== "string") {
        const err7 = { instancePath: instancePath + "/group", schemaPath: "#/properties/group/type", keyword: "type", params: { type: "string" }, message: "must be string" };
        if (vErrors === null) {
          vErrors = [err7];
        } else {
          vErrors.push(err7);
        }
        errors++;
      }
    }
    if (data.slice !== void 0) {
      let data3 = data.slice;
      if (data3 && typeof data3 == "object" && !Array.isArray(data3)) {
        if (data3.kind === void 0) {
          const err8 = { instancePath: instancePath + "/slice", schemaPath: "#/properties/slice/required", keyword: "required", params: { missingProperty: "kind" }, message: "must have required property 'kind'" };
          if (vErrors === null) {
            vErrors = [err8];
          } else {
            vErrors.push(err8);
          }
          errors++;
        }
        if (data3.value === void 0) {
          const err9 = { instancePath: instancePath + "/slice", schemaPath: "#/properties/slice/required", keyword: "required", params: { missingProperty: "value" }, message: "must have required property 'value'" };
          if (vErrors === null) {
            vErrors = [err9];
          } else {
            vErrors.push(err9);
          }
          errors++;
        }
        if (data3.kind !== void 0) {
          if (typeof data3.kind !== "string") {
            const err10 = { instancePath: instancePath + "/slice/kind", schemaPath: "#/properties/slice/properties/kind/type", keyword: "type", params: { type: "string" }, message: "must be string" };
            if (vErrors === null) {
              vErrors = [err10];
            } else {
              vErrors.push(err10);
            }
            errors++;
          }
        }
        if (data3.value !== void 0) {
          if (typeof data3.value !== "string") {
            const err11 = { instancePath: instancePath + "/slice/value", schemaPath: "#/properties/slice/properties/value/type", keyword: "type", params: { type: "string" }, message: "must be string" };
            if (vErrors === null) {
              vErrors = [err11];
            } else {
              vErrors.push(err11);
            }
            errors++;
          }
        }
      } else {
        const err12 = { instancePath: instancePath + "/slice", schemaPath: "#/properties/slice/type", keyword: "type", params: { type: "object" }, message: "must be object" };
        if (vErrors === null) {
          vErrors = [err12];
        } else {
          vErrors.push(err12);
        }
        errors++;
      }
    }
    if (data.candidate !== void 0) {
      let data6 = data.candidate;
      if (!(typeof data6 == "number" && isFinite(data6))) {
        const err13 = { instancePath: instancePath + "/candidate", schemaPath: "#/properties/candidate/type", keyword: "type", params: { type: "number" }, message: "must be number" };
        if (vErrors === null) {
          vErrors = [err13];
        } else {
          vErrors.push(err13);
        }
        errors++;
      }
    }
    if (data.candidate_n !== void 0) {
      let data7 = data.candidate_n;
      if (!(typeof data7 == "number" && (!(data7 % 1) && !isNaN(data7)) && isFinite(data7))) {
        const err14 = { instancePath: instancePath + "/candidate_n", schemaPath: "#/properties/candidate_n/type", keyword: "type", params: { type: "integer" }, message: "must be integer" };
        if (vErrors === null) {
          vErrors = [err14];
        } else {
          vErrors.push(err14);
        }
        errors++;
      }
      if (typeof data7 == "number" && isFinite(data7)) {
        if (data7 < 0 || isNaN(data7)) {
          const err15 = { instancePath: instancePath + "/candidate_n", schemaPath: "#/properties/candidate_n/minimum", keyword: "minimum", params: { comparison: ">=", limit: 0 }, message: "must be >= 0" };
          if (vErrors === null) {
            vErrors = [err15];
          } else {
            vErrors.push(err15);
          }
          errors++;
        }
      }
    }
    if (data.baseline !== void 0) {
      let data8 = data.baseline;
      if (!(typeof data8 == "number" && isFinite(data8)) && data8 !== null) {
        const err16 = { instancePath: instancePath + "/baseline", schemaPath: "#/properties/baseline/type", keyword: "type", params: { type: schema66.properties.baseline.type }, message: "must be number,null" };
        if (vErrors === null) {
          vErrors = [err16];
        } else {
          vErrors.push(err16);
        }
        errors++;
      }
    }
    if (data.baseline_n !== void 0) {
      let data9 = data.baseline_n;
      if (!(typeof data9 == "number" && (!(data9 % 1) && !isNaN(data9)) && isFinite(data9)) && data9 !== null) {
        const err17 = { instancePath: instancePath + "/baseline_n", schemaPath: "#/properties/baseline_n/type", keyword: "type", params: { type: schema66.properties.baseline_n.type }, message: "must be integer,null" };
        if (vErrors === null) {
          vErrors = [err17];
        } else {
          vErrors.push(err17);
        }
        errors++;
      }
      if (typeof data9 == "number" && isFinite(data9)) {
        if (data9 < 0 || isNaN(data9)) {
          const err18 = { instancePath: instancePath + "/baseline_n", schemaPath: "#/properties/baseline_n/minimum", keyword: "minimum", params: { comparison: ">=", limit: 0 }, message: "must be >= 0" };
          if (vErrors === null) {
            vErrors = [err18];
          } else {
            vErrors.push(err18);
          }
          errors++;
        }
      }
    }
    if (data.delta !== void 0) {
      let data10 = data.delta;
      if (!(typeof data10 == "number" && isFinite(data10)) && data10 !== null) {
        const err19 = { instancePath: instancePath + "/delta", schemaPath: "#/properties/delta/type", keyword: "type", params: { type: schema66.properties.delta.type }, message: "must be number,null" };
        if (vErrors === null) {
          vErrors = [err19];
        } else {
          vErrors.push(err19);
        }
        errors++;
      }
    }
    if (data.higher_is_better !== void 0) {
      if (typeof data.higher_is_better !== "boolean") {
        const err20 = { instancePath: instancePath + "/higher_is_better", schemaPath: "#/properties/higher_is_better/type", keyword: "type", params: { type: "boolean" }, message: "must be boolean" };
        if (vErrors === null) {
          vErrors = [err20];
        } else {
          vErrors.push(err20);
        }
        errors++;
      }
    }
    if (data.worse !== void 0) {
      let data12 = data.worse;
      if (typeof data12 !== "boolean" && data12 !== null) {
        const err21 = { instancePath: instancePath + "/worse", schemaPath: "#/properties/worse/type", keyword: "type", params: { type: schema66.properties.worse.type }, message: "must be boolean,null" };
        if (vErrors === null) {
          vErrors = [err21];
        } else {
          vErrors.push(err21);
        }
        errors++;
      }
    }
  } else {
    const err22 = { instancePath, schemaPath: "#/type", keyword: "type", params: { type: "object" }, message: "must be object" };
    if (vErrors === null) {
      vErrors = [err22];
    } else {
      vErrors.push(err22);
    }
    errors++;
  }
  validate49.errors = vErrors;
  return errors === 0;
}
validate49.evaluated = { "props": { "role": true, "name": true, "group": true, "slice": true, "candidate": true, "candidate_n": true, "baseline": true, "baseline_n": true, "delta": true, "higher_is_better": true, "worse": true }, "dynamicProps": false, "dynamicItems": false };
exports.ErrorInfo = validate50;
function validate50(data, { instancePath = "", parentData, parentDataProperty, rootData = data, dynamicAnchors = {} } = {}) {
  ;
  let vErrors = null;
  let errors = 0;
  const evaluated0 = validate50.evaluated;
  if (evaluated0.dynamicProps) {
    evaluated0.props = void 0;
  }
  if (evaluated0.dynamicItems) {
    evaluated0.items = void 0;
  }
  if (data && typeof data == "object" && !Array.isArray(data)) {
    if (data.kind === void 0) {
      const err0 = { instancePath, schemaPath: "#/required", keyword: "required", params: { missingProperty: "kind" }, message: "must have required property 'kind'" };
      if (vErrors === null) {
        vErrors = [err0];
      } else {
        vErrors.push(err0);
      }
      errors++;
    }
    if (data.status === void 0) {
      const err1 = { instancePath, schemaPath: "#/required", keyword: "required", params: { missingProperty: "status" }, message: "must have required property 'status'" };
      if (vErrors === null) {
        vErrors = [err1];
      } else {
        vErrors.push(err1);
      }
      errors++;
    }
    if (data.message === void 0) {
      const err2 = { instancePath, schemaPath: "#/required", keyword: "required", params: { missingProperty: "message" }, message: "must have required property 'message'" };
      if (vErrors === null) {
        vErrors = [err2];
      } else {
        vErrors.push(err2);
      }
      errors++;
    }
    if (data.retryable === void 0) {
      const err3 = { instancePath, schemaPath: "#/required", keyword: "required", params: { missingProperty: "retryable" }, message: "must have required property 'retryable'" };
      if (vErrors === null) {
        vErrors = [err3];
      } else {
        vErrors.push(err3);
      }
      errors++;
    }
    for (const key0 in data) {
      if (!(key0 === "kind" || key0 === "status" || key0 === "message" || key0 === "retryable")) {
        const err4 = { instancePath, schemaPath: "#/additionalProperties", keyword: "additionalProperties", params: { additionalProperty: key0 }, message: "must NOT have additional properties" };
        if (vErrors === null) {
          vErrors = [err4];
        } else {
          vErrors.push(err4);
        }
        errors++;
      }
    }
    if (data.kind !== void 0) {
      let data0 = data.kind;
      if (!(data0 === "UNAUTHENTICATED" || data0 === "ACCOUNT_PENDING" || data0 === "STALE_REPORT" || data0 === "ALREADY_DECIDED" || data0 === "NOT_FOUND" || data0 === "PERMISSION_DENIED" || data0 === "INVALID_RECORD" || data0 === "CONFLICT" || data0 === "FAILED_PRECONDITION" || data0 === "UNAVAILABLE" || data0 === "BAD_RESPONSE" || data0 === "UNKNOWN" || data0 === "NON_API")) {
        const err5 = { instancePath: instancePath + "/kind", schemaPath: "#/properties/kind/enum", keyword: "enum", params: { allowedValues: schema40.properties.kind.enum }, message: "must be equal to one of the allowed values" };
        if (vErrors === null) {
          vErrors = [err5];
        } else {
          vErrors.push(err5);
        }
        errors++;
      }
    }
    if (data.status !== void 0) {
      let data1 = data.status;
      if (!(typeof data1 == "number" && (!(data1 % 1) && !isNaN(data1)) && isFinite(data1))) {
        const err6 = { instancePath: instancePath + "/status", schemaPath: "#/properties/status/type", keyword: "type", params: { type: "integer" }, message: "must be integer" };
        if (vErrors === null) {
          vErrors = [err6];
        } else {
          vErrors.push(err6);
        }
        errors++;
      }
      if (typeof data1 == "number" && isFinite(data1)) {
        if (data1 > 599 || isNaN(data1)) {
          const err7 = { instancePath: instancePath + "/status", schemaPath: "#/properties/status/maximum", keyword: "maximum", params: { comparison: "<=", limit: 599 }, message: "must be <= 599" };
          if (vErrors === null) {
            vErrors = [err7];
          } else {
            vErrors.push(err7);
          }
          errors++;
        }
        if (data1 < 0 || isNaN(data1)) {
          const err8 = { instancePath: instancePath + "/status", schemaPath: "#/properties/status/minimum", keyword: "minimum", params: { comparison: ">=", limit: 0 }, message: "must be >= 0" };
          if (vErrors === null) {
            vErrors = [err8];
          } else {
            vErrors.push(err8);
          }
          errors++;
        }
      }
    }
    if (data.message !== void 0) {
      if (typeof data.message !== "string") {
        const err9 = { instancePath: instancePath + "/message", schemaPath: "#/properties/message/type", keyword: "type", params: { type: "string" }, message: "must be string" };
        if (vErrors === null) {
          vErrors = [err9];
        } else {
          vErrors.push(err9);
        }
        errors++;
      }
    }
    if (data.retryable !== void 0) {
      if (typeof data.retryable !== "boolean") {
        const err10 = { instancePath: instancePath + "/retryable", schemaPath: "#/properties/retryable/type", keyword: "type", params: { type: "boolean" }, message: "must be boolean" };
        if (vErrors === null) {
          vErrors = [err10];
        } else {
          vErrors.push(err10);
        }
        errors++;
      }
    }
  } else {
    const err11 = { instancePath, schemaPath: "#/type", keyword: "type", params: { type: "object" }, message: "must be object" };
    if (vErrors === null) {
      vErrors = [err11];
    } else {
      vErrors.push(err11);
    }
    errors++;
  }
  validate50.errors = vErrors;
  return errors === 0;
}
validate50.evaluated = { "props": true, "dynamicProps": false, "dynamicItems": false };
exports.FormIssues = validate51;
function validate51(data, { instancePath = "", parentData, parentDataProperty, rootData = data, dynamicAnchors = {} } = {}) {
  ;
  let vErrors = null;
  let errors = 0;
  const evaluated0 = validate51.evaluated;
  if (evaluated0.dynamicProps) {
    evaluated0.props = void 0;
  }
  if (evaluated0.dynamicItems) {
    evaluated0.items = void 0;
  }
  if (data && typeof data == "object" && !Array.isArray(data)) {
    if (data.issues === void 0) {
      const err0 = { instancePath, schemaPath: "#/required", keyword: "required", params: { missingProperty: "issues" }, message: "must have required property 'issues'" };
      if (vErrors === null) {
        vErrors = [err0];
      } else {
        vErrors.push(err0);
      }
      errors++;
    }
    for (const key0 in data) {
      if (!(key0 === "issues")) {
        const err1 = { instancePath, schemaPath: "#/additionalProperties", keyword: "additionalProperties", params: { additionalProperty: key0 }, message: "must NOT have additional properties" };
        if (vErrors === null) {
          vErrors = [err1];
        } else {
          vErrors.push(err1);
        }
        errors++;
      }
    }
    if (data.issues !== void 0) {
      let data0 = data.issues;
      if (Array.isArray(data0)) {
        if (data0.length < 1) {
          const err2 = { instancePath: instancePath + "/issues", schemaPath: "#/properties/issues/minItems", keyword: "minItems", params: { limit: 1 }, message: "must NOT have fewer than 1 items" };
          if (vErrors === null) {
            vErrors = [err2];
          } else {
            vErrors.push(err2);
          }
          errors++;
        }
        const len0 = data0.length;
        for (let i0 = 0; i0 < len0; i0++) {
          let data1 = data0[i0];
          if (data1 && typeof data1 == "object" && !Array.isArray(data1)) {
            if (data1.path === void 0) {
              const err3 = { instancePath: instancePath + "/issues/" + i0, schemaPath: "#/properties/issues/items/required", keyword: "required", params: { missingProperty: "path" }, message: "must have required property 'path'" };
              if (vErrors === null) {
                vErrors = [err3];
              } else {
                vErrors.push(err3);
              }
              errors++;
            }
            if (data1.message === void 0) {
              const err4 = { instancePath: instancePath + "/issues/" + i0, schemaPath: "#/properties/issues/items/required", keyword: "required", params: { missingProperty: "message" }, message: "must have required property 'message'" };
              if (vErrors === null) {
                vErrors = [err4];
              } else {
                vErrors.push(err4);
              }
              errors++;
            }
            for (const key1 in data1) {
              if (!(key1 === "path" || key1 === "message")) {
                const err5 = { instancePath: instancePath + "/issues/" + i0, schemaPath: "#/properties/issues/items/additionalProperties", keyword: "additionalProperties", params: { additionalProperty: key1 }, message: "must NOT have additional properties" };
                if (vErrors === null) {
                  vErrors = [err5];
                } else {
                  vErrors.push(err5);
                }
                errors++;
              }
            }
            if (data1.path !== void 0) {
              if (typeof data1.path !== "string") {
                const err6 = { instancePath: instancePath + "/issues/" + i0 + "/path", schemaPath: "#/properties/issues/items/properties/path/type", keyword: "type", params: { type: "string" }, message: "must be string" };
                if (vErrors === null) {
                  vErrors = [err6];
                } else {
                  vErrors.push(err6);
                }
                errors++;
              }
            }
            if (data1.message !== void 0) {
              let data3 = data1.message;
              if (typeof data3 === "string") {
                if (func1(data3) < 1) {
                  const err7 = { instancePath: instancePath + "/issues/" + i0 + "/message", schemaPath: "#/properties/issues/items/properties/message/minLength", keyword: "minLength", params: { limit: 1 }, message: "must NOT have fewer than 1 characters" };
                  if (vErrors === null) {
                    vErrors = [err7];
                  } else {
                    vErrors.push(err7);
                  }
                  errors++;
                }
              } else {
                const err8 = { instancePath: instancePath + "/issues/" + i0 + "/message", schemaPath: "#/properties/issues/items/properties/message/type", keyword: "type", params: { type: "string" }, message: "must be string" };
                if (vErrors === null) {
                  vErrors = [err8];
                } else {
                  vErrors.push(err8);
                }
                errors++;
              }
            }
          } else {
            const err9 = { instancePath: instancePath + "/issues/" + i0, schemaPath: "#/properties/issues/items/type", keyword: "type", params: { type: "object" }, message: "must be object" };
            if (vErrors === null) {
              vErrors = [err9];
            } else {
              vErrors.push(err9);
            }
            errors++;
          }
        }
      } else {
        const err10 = { instancePath: instancePath + "/issues", schemaPath: "#/properties/issues/type", keyword: "type", params: { type: "array" }, message: "must be array" };
        if (vErrors === null) {
          vErrors = [err10];
        } else {
          vErrors.push(err10);
        }
        errors++;
      }
    }
  } else {
    const err11 = { instancePath, schemaPath: "#/type", keyword: "type", params: { type: "object" }, message: "must be object" };
    if (vErrors === null) {
      vErrors = [err11];
    } else {
      vErrors.push(err11);
    }
    errors++;
  }
  validate51.errors = vErrors;
  return errors === 0;
}
validate51.evaluated = { "props": true, "dynamicProps": false, "dynamicItems": false };
exports.HttpOutcome = validate52;
function validate52(data, { instancePath = "", parentData, parentDataProperty, rootData = data, dynamicAnchors = {} } = {}) {
  ;
  let vErrors = null;
  let errors = 0;
  const evaluated0 = validate52.evaluated;
  if (evaluated0.dynamicProps) {
    evaluated0.props = void 0;
  }
  if (evaluated0.dynamicItems) {
    evaluated0.items = void 0;
  }
  const _errs0 = errors;
  let valid0 = false;
  let passing0 = null;
  const _errs1 = errors;
  if (data && typeof data == "object" && !Array.isArray(data)) {
    if (data.ok === void 0) {
      const err0 = { instancePath, schemaPath: "#/oneOf/0/required", keyword: "required", params: { missingProperty: "ok" }, message: "must have required property 'ok'" };
      if (vErrors === null) {
        vErrors = [err0];
      } else {
        vErrors.push(err0);
      }
      errors++;
    }
    if (data.status === void 0) {
      const err1 = { instancePath, schemaPath: "#/oneOf/0/required", keyword: "required", params: { missingProperty: "status" }, message: "must have required property 'status'" };
      if (vErrors === null) {
        vErrors = [err1];
      } else {
        vErrors.push(err1);
      }
      errors++;
    }
    if (data.data === void 0) {
      const err2 = { instancePath, schemaPath: "#/oneOf/0/required", keyword: "required", params: { missingProperty: "data" }, message: "must have required property 'data'" };
      if (vErrors === null) {
        vErrors = [err2];
      } else {
        vErrors.push(err2);
      }
      errors++;
    }
    if (data.headers === void 0) {
      const err3 = { instancePath, schemaPath: "#/oneOf/0/required", keyword: "required", params: { missingProperty: "headers" }, message: "must have required property 'headers'" };
      if (vErrors === null) {
        vErrors = [err3];
      } else {
        vErrors.push(err3);
      }
      errors++;
    }
    for (const key0 in data) {
      if (!(key0 === "ok" || key0 === "status" || key0 === "data" || key0 === "headers")) {
        const err4 = { instancePath, schemaPath: "#/oneOf/0/additionalProperties", keyword: "additionalProperties", params: { additionalProperty: key0 }, message: "must NOT have additional properties" };
        if (vErrors === null) {
          vErrors = [err4];
        } else {
          vErrors.push(err4);
        }
        errors++;
      }
    }
    if (data.ok !== void 0) {
      if (true !== data.ok) {
        const err5 = { instancePath: instancePath + "/ok", schemaPath: "#/oneOf/0/properties/ok/const", keyword: "const", params: { allowedValue: true }, message: "must be equal to constant" };
        if (vErrors === null) {
          vErrors = [err5];
        } else {
          vErrors.push(err5);
        }
        errors++;
      }
    }
    if (data.status !== void 0) {
      let data1 = data.status;
      if (!(typeof data1 == "number" && (!(data1 % 1) && !isNaN(data1)) && isFinite(data1))) {
        const err6 = { instancePath: instancePath + "/status", schemaPath: "#/oneOf/0/properties/status/type", keyword: "type", params: { type: "integer" }, message: "must be integer" };
        if (vErrors === null) {
          vErrors = [err6];
        } else {
          vErrors.push(err6);
        }
        errors++;
      }
      if (typeof data1 == "number" && isFinite(data1)) {
        if (data1 > 299 || isNaN(data1)) {
          const err7 = { instancePath: instancePath + "/status", schemaPath: "#/oneOf/0/properties/status/maximum", keyword: "maximum", params: { comparison: "<=", limit: 299 }, message: "must be <= 299" };
          if (vErrors === null) {
            vErrors = [err7];
          } else {
            vErrors.push(err7);
          }
          errors++;
        }
        if (data1 < 200 || isNaN(data1)) {
          const err8 = { instancePath: instancePath + "/status", schemaPath: "#/oneOf/0/properties/status/minimum", keyword: "minimum", params: { comparison: ">=", limit: 200 }, message: "must be >= 200" };
          if (vErrors === null) {
            vErrors = [err8];
          } else {
            vErrors.push(err8);
          }
          errors++;
        }
      }
    }
    if (data.headers !== void 0) {
      let data2 = data.headers;
      if (data2 && typeof data2 == "object" && !Array.isArray(data2)) {
        for (const key1 in data2) {
          if (typeof data2[key1] !== "string") {
            const err9 = { instancePath: instancePath + "/headers/" + key1.replace(/~/g, "~0").replace(/\//g, "~1"), schemaPath: "#/oneOf/0/properties/headers/additionalProperties/type", keyword: "type", params: { type: "string" }, message: "must be string" };
            if (vErrors === null) {
              vErrors = [err9];
            } else {
              vErrors.push(err9);
            }
            errors++;
          }
        }
      } else {
        const err10 = { instancePath: instancePath + "/headers", schemaPath: "#/oneOf/0/properties/headers/type", keyword: "type", params: { type: "object" }, message: "must be object" };
        if (vErrors === null) {
          vErrors = [err10];
        } else {
          vErrors.push(err10);
        }
        errors++;
      }
    }
  } else {
    const err11 = { instancePath, schemaPath: "#/oneOf/0/type", keyword: "type", params: { type: "object" }, message: "must be object" };
    if (vErrors === null) {
      vErrors = [err11];
    } else {
      vErrors.push(err11);
    }
    errors++;
  }
  var _valid0 = _errs1 === errors;
  if (_valid0) {
    valid0 = true;
    passing0 = 0;
    var props0 = true;
  }
  const _errs12 = errors;
  if (data && typeof data == "object" && !Array.isArray(data)) {
    if (data.ok === void 0) {
      const err12 = { instancePath, schemaPath: "#/oneOf/1/required", keyword: "required", params: { missingProperty: "ok" }, message: "must have required property 'ok'" };
      if (vErrors === null) {
        vErrors = [err12];
      } else {
        vErrors.push(err12);
      }
      errors++;
    }
    if (data.error === void 0) {
      const err13 = { instancePath, schemaPath: "#/oneOf/1/required", keyword: "required", params: { missingProperty: "error" }, message: "must have required property 'error'" };
      if (vErrors === null) {
        vErrors = [err13];
      } else {
        vErrors.push(err13);
      }
      errors++;
    }
    for (const key2 in data) {
      if (!(key2 === "ok" || key2 === "error")) {
        const err14 = { instancePath, schemaPath: "#/oneOf/1/additionalProperties", keyword: "additionalProperties", params: { additionalProperty: key2 }, message: "must NOT have additional properties" };
        if (vErrors === null) {
          vErrors = [err14];
        } else {
          vErrors.push(err14);
        }
        errors++;
      }
    }
    if (data.ok !== void 0) {
      if (false !== data.ok) {
        const err15 = { instancePath: instancePath + "/ok", schemaPath: "#/oneOf/1/properties/ok/const", keyword: "const", params: { allowedValue: false }, message: "must be equal to constant" };
        if (vErrors === null) {
          vErrors = [err15];
        } else {
          vErrors.push(err15);
        }
        errors++;
      }
    }
    if (data.error !== void 0) {
      let data5 = data.error;
      if (data5 && typeof data5 == "object" && !Array.isArray(data5)) {
        if (data5.kind === void 0) {
          const err16 = { instancePath: instancePath + "/error", schemaPath: "ErrorInfo.schema.json/required", keyword: "required", params: { missingProperty: "kind" }, message: "must have required property 'kind'" };
          if (vErrors === null) {
            vErrors = [err16];
          } else {
            vErrors.push(err16);
          }
          errors++;
        }
        if (data5.status === void 0) {
          const err17 = { instancePath: instancePath + "/error", schemaPath: "ErrorInfo.schema.json/required", keyword: "required", params: { missingProperty: "status" }, message: "must have required property 'status'" };
          if (vErrors === null) {
            vErrors = [err17];
          } else {
            vErrors.push(err17);
          }
          errors++;
        }
        if (data5.message === void 0) {
          const err18 = { instancePath: instancePath + "/error", schemaPath: "ErrorInfo.schema.json/required", keyword: "required", params: { missingProperty: "message" }, message: "must have required property 'message'" };
          if (vErrors === null) {
            vErrors = [err18];
          } else {
            vErrors.push(err18);
          }
          errors++;
        }
        if (data5.retryable === void 0) {
          const err19 = { instancePath: instancePath + "/error", schemaPath: "ErrorInfo.schema.json/required", keyword: "required", params: { missingProperty: "retryable" }, message: "must have required property 'retryable'" };
          if (vErrors === null) {
            vErrors = [err19];
          } else {
            vErrors.push(err19);
          }
          errors++;
        }
        for (const key3 in data5) {
          if (!(key3 === "kind" || key3 === "status" || key3 === "message" || key3 === "retryable")) {
            const err20 = { instancePath: instancePath + "/error", schemaPath: "ErrorInfo.schema.json/additionalProperties", keyword: "additionalProperties", params: { additionalProperty: key3 }, message: "must NOT have additional properties" };
            if (vErrors === null) {
              vErrors = [err20];
            } else {
              vErrors.push(err20);
            }
            errors++;
          }
        }
        if (data5.kind !== void 0) {
          let data6 = data5.kind;
          if (!(data6 === "UNAUTHENTICATED" || data6 === "ACCOUNT_PENDING" || data6 === "STALE_REPORT" || data6 === "ALREADY_DECIDED" || data6 === "NOT_FOUND" || data6 === "PERMISSION_DENIED" || data6 === "INVALID_RECORD" || data6 === "CONFLICT" || data6 === "FAILED_PRECONDITION" || data6 === "UNAVAILABLE" || data6 === "BAD_RESPONSE" || data6 === "UNKNOWN" || data6 === "NON_API")) {
            const err21 = { instancePath: instancePath + "/error/kind", schemaPath: "ErrorInfo.schema.json/properties/kind/enum", keyword: "enum", params: { allowedValues: schema40.properties.kind.enum }, message: "must be equal to one of the allowed values" };
            if (vErrors === null) {
              vErrors = [err21];
            } else {
              vErrors.push(err21);
            }
            errors++;
          }
        }
        if (data5.status !== void 0) {
          let data7 = data5.status;
          if (!(typeof data7 == "number" && (!(data7 % 1) && !isNaN(data7)) && isFinite(data7))) {
            const err22 = { instancePath: instancePath + "/error/status", schemaPath: "ErrorInfo.schema.json/properties/status/type", keyword: "type", params: { type: "integer" }, message: "must be integer" };
            if (vErrors === null) {
              vErrors = [err22];
            } else {
              vErrors.push(err22);
            }
            errors++;
          }
          if (typeof data7 == "number" && isFinite(data7)) {
            if (data7 > 599 || isNaN(data7)) {
              const err23 = { instancePath: instancePath + "/error/status", schemaPath: "ErrorInfo.schema.json/properties/status/maximum", keyword: "maximum", params: { comparison: "<=", limit: 599 }, message: "must be <= 599" };
              if (vErrors === null) {
                vErrors = [err23];
              } else {
                vErrors.push(err23);
              }
              errors++;
            }
            if (data7 < 0 || isNaN(data7)) {
              const err24 = { instancePath: instancePath + "/error/status", schemaPath: "ErrorInfo.schema.json/properties/status/minimum", keyword: "minimum", params: { comparison: ">=", limit: 0 }, message: "must be >= 0" };
              if (vErrors === null) {
                vErrors = [err24];
              } else {
                vErrors.push(err24);
              }
              errors++;
            }
          }
        }
        if (data5.message !== void 0) {
          if (typeof data5.message !== "string") {
            const err25 = { instancePath: instancePath + "/error/message", schemaPath: "ErrorInfo.schema.json/properties/message/type", keyword: "type", params: { type: "string" }, message: "must be string" };
            if (vErrors === null) {
              vErrors = [err25];
            } else {
              vErrors.push(err25);
            }
            errors++;
          }
        }
        if (data5.retryable !== void 0) {
          if (typeof data5.retryable !== "boolean") {
            const err26 = { instancePath: instancePath + "/error/retryable", schemaPath: "ErrorInfo.schema.json/properties/retryable/type", keyword: "type", params: { type: "boolean" }, message: "must be boolean" };
            if (vErrors === null) {
              vErrors = [err26];
            } else {
              vErrors.push(err26);
            }
            errors++;
          }
        }
      } else {
        const err27 = { instancePath: instancePath + "/error", schemaPath: "ErrorInfo.schema.json/type", keyword: "type", params: { type: "object" }, message: "must be object" };
        if (vErrors === null) {
          vErrors = [err27];
        } else {
          vErrors.push(err27);
        }
        errors++;
      }
    }
  } else {
    const err28 = { instancePath, schemaPath: "#/oneOf/1/type", keyword: "type", params: { type: "object" }, message: "must be object" };
    if (vErrors === null) {
      vErrors = [err28];
    } else {
      vErrors.push(err28);
    }
    errors++;
  }
  var _valid0 = _errs12 === errors;
  if (_valid0 && valid0) {
    valid0 = false;
    passing0 = [passing0, 1];
  } else {
    if (_valid0) {
      valid0 = true;
      passing0 = 1;
      if (props0 !== true) {
        props0 = true;
      }
    }
  }
  if (!valid0) {
    const err29 = { instancePath, schemaPath: "#/oneOf", keyword: "oneOf", params: { passingSchemas: passing0 }, message: "must match exactly one schema in oneOf" };
    if (vErrors === null) {
      vErrors = [err29];
    } else {
      vErrors.push(err29);
    }
    errors++;
  } else {
    errors = _errs0;
    if (vErrors !== null) {
      if (_errs0) {
        vErrors.length = _errs0;
      } else {
        vErrors = null;
      }
    }
  }
  validate52.errors = vErrors;
  evaluated0.props = props0;
  return errors === 0;
}
validate52.evaluated = { "dynamicProps": true, "dynamicItems": false };
exports.HttpRequestSpec = validate53;
var schema71 = { "$schema": "https://json-schema.org/draft/2020-12/schema", "$id": "HttpRequestSpec.schema.json", "title": "HttpRequestSpec", "description": "link_http_send\uC758 \uC785\uB825. \uAC19\uC740 \uCD9C\uCC98\uC758 /v1 \uACBD\uB85C\uC640 \uB85C\uADF8\uC778 \uC0AC\uC6A9\uC790 \uD655\uC778 /oauth2/userinfo(oauth2-proxy \uD45C\uC900, ADR 0029)\uB9CC \uBD80\uB978\uB2E4(\uAC8C\uC774\uD2B8 HTTP \uBA74 \uBC16\uC740 \uBD80\uB974\uC9C0 \uC54A\uB294\uB2E4, \uBE0C\uB9AC\uD504 6\uC808). GET\uC5D0\uB294 \uBCF8\uBB38\uC774 \uC5C6\uB2E4.", "type": "object", "required": ["method", "path"], "properties": { "method": { "enum": ["GET", "POST"] }, "path": { "type": "string", "pattern": "^(/v1/\\S*|/oauth2/userinfo)$" }, "body": {} }, "additionalProperties": false, "if": { "properties": { "method": { "const": "GET" } }, "required": ["method"] }, "then": { "not": { "required": ["body"] } } };
var pattern17 = new RegExp("^(/v1/\\S*|/oauth2/userinfo)$", "u");
function validate53(data, { instancePath = "", parentData, parentDataProperty, rootData = data, dynamicAnchors = {} } = {}) {
  ;
  let vErrors = null;
  let errors = 0;
  const evaluated0 = validate53.evaluated;
  if (evaluated0.dynamicProps) {
    evaluated0.props = void 0;
  }
  if (evaluated0.dynamicItems) {
    evaluated0.items = void 0;
  }
  const _errs1 = errors;
  let valid0 = true;
  const _errs2 = errors;
  if (data && typeof data == "object" && !Array.isArray(data)) {
    let missing0;
    if (data.method === void 0 && (missing0 = "method")) {
      const err0 = {};
      if (vErrors === null) {
        vErrors = [err0];
      } else {
        vErrors.push(err0);
      }
      errors++;
    } else {
      if (data.method !== void 0) {
        if ("GET" !== data.method) {
          const err1 = {};
          if (vErrors === null) {
            vErrors = [err1];
          } else {
            vErrors.push(err1);
          }
          errors++;
        }
      }
    }
  }
  var _valid0 = _errs2 === errors;
  errors = _errs1;
  if (vErrors !== null) {
    if (_errs1) {
      vErrors.length = _errs1;
    } else {
      vErrors = null;
    }
  }
  if (_valid0) {
    const _errs4 = errors;
    const _errs5 = errors;
    const _errs6 = errors;
    if (data && typeof data == "object" && !Array.isArray(data)) {
      let missing1;
      if (data.body === void 0 && (missing1 = "body")) {
        const err2 = {};
        if (vErrors === null) {
          vErrors = [err2];
        } else {
          vErrors.push(err2);
        }
        errors++;
      }
    }
    var valid2 = _errs6 === errors;
    if (valid2) {
      const err3 = { instancePath, schemaPath: "#/then/not", keyword: "not", params: {}, message: "must NOT be valid" };
      if (vErrors === null) {
        vErrors = [err3];
      } else {
        vErrors.push(err3);
      }
      errors++;
    } else {
      errors = _errs5;
      if (vErrors !== null) {
        if (_errs5) {
          vErrors.length = _errs5;
        } else {
          vErrors = null;
        }
      }
    }
    var _valid0 = _errs4 === errors;
    valid0 = _valid0;
  }
  if (!valid0) {
    const err4 = { instancePath, schemaPath: "#/if", keyword: "if", params: { failingKeyword: "then" }, message: 'must match "then" schema' };
    if (vErrors === null) {
      vErrors = [err4];
    } else {
      vErrors.push(err4);
    }
    errors++;
  }
  if (data && typeof data == "object" && !Array.isArray(data)) {
    if (data.method === void 0) {
      const err5 = { instancePath, schemaPath: "#/required", keyword: "required", params: { missingProperty: "method" }, message: "must have required property 'method'" };
      if (vErrors === null) {
        vErrors = [err5];
      } else {
        vErrors.push(err5);
      }
      errors++;
    }
    if (data.path === void 0) {
      const err6 = { instancePath, schemaPath: "#/required", keyword: "required", params: { missingProperty: "path" }, message: "must have required property 'path'" };
      if (vErrors === null) {
        vErrors = [err6];
      } else {
        vErrors.push(err6);
      }
      errors++;
    }
    for (const key0 in data) {
      if (!(key0 === "method" || key0 === "path" || key0 === "body")) {
        const err7 = { instancePath, schemaPath: "#/additionalProperties", keyword: "additionalProperties", params: { additionalProperty: key0 }, message: "must NOT have additional properties" };
        if (vErrors === null) {
          vErrors = [err7];
        } else {
          vErrors.push(err7);
        }
        errors++;
      }
    }
    if (data.method !== void 0) {
      let data1 = data.method;
      if (!(data1 === "GET" || data1 === "POST")) {
        const err8 = { instancePath: instancePath + "/method", schemaPath: "#/properties/method/enum", keyword: "enum", params: { allowedValues: schema71.properties.method.enum }, message: "must be equal to one of the allowed values" };
        if (vErrors === null) {
          vErrors = [err8];
        } else {
          vErrors.push(err8);
        }
        errors++;
      }
    }
    if (data.path !== void 0) {
      let data2 = data.path;
      if (typeof data2 === "string") {
        if (!pattern17.test(data2)) {
          const err9 = { instancePath: instancePath + "/path", schemaPath: "#/properties/path/pattern", keyword: "pattern", params: { pattern: "^(/v1/\\S*|/oauth2/userinfo)$" }, message: 'must match pattern "^(/v1/\\S*|/oauth2/userinfo)$"' };
          if (vErrors === null) {
            vErrors = [err9];
          } else {
            vErrors.push(err9);
          }
          errors++;
        }
      } else {
        const err10 = { instancePath: instancePath + "/path", schemaPath: "#/properties/path/type", keyword: "type", params: { type: "string" }, message: "must be string" };
        if (vErrors === null) {
          vErrors = [err10];
        } else {
          vErrors.push(err10);
        }
        errors++;
      }
    }
  } else {
    const err11 = { instancePath, schemaPath: "#/type", keyword: "type", params: { type: "object" }, message: "must be object" };
    if (vErrors === null) {
      vErrors = [err11];
    } else {
      vErrors.push(err11);
    }
    errors++;
  }
  validate53.errors = vErrors;
  return errors === 0;
}
validate53.evaluated = { "props": true, "dynamicProps": false, "dynamicItems": false };
exports.HttpSendConfig = validate54;
var pattern18 = new RegExp("^(https?://\\S+)?$", "u");
function validate54(data, { instancePath = "", parentData, parentDataProperty, rootData = data, dynamicAnchors = {} } = {}) {
  ;
  let vErrors = null;
  let errors = 0;
  const evaluated0 = validate54.evaluated;
  if (evaluated0.dynamicProps) {
    evaluated0.props = void 0;
  }
  if (evaluated0.dynamicItems) {
    evaluated0.items = void 0;
  }
  if (data && typeof data == "object" && !Array.isArray(data)) {
    if (data.baseUrl === void 0) {
      const err0 = { instancePath, schemaPath: "#/required", keyword: "required", params: { missingProperty: "baseUrl" }, message: "must have required property 'baseUrl'" };
      if (vErrors === null) {
        vErrors = [err0];
      } else {
        vErrors.push(err0);
      }
      errors++;
    }
    if (data.timeoutMs === void 0) {
      const err1 = { instancePath, schemaPath: "#/required", keyword: "required", params: { missingProperty: "timeoutMs" }, message: "must have required property 'timeoutMs'" };
      if (vErrors === null) {
        vErrors = [err1];
      } else {
        vErrors.push(err1);
      }
      errors++;
    }
    for (const key0 in data) {
      if (!(key0 === "baseUrl" || key0 === "timeoutMs")) {
        const err2 = { instancePath, schemaPath: "#/additionalProperties", keyword: "additionalProperties", params: { additionalProperty: key0 }, message: "must NOT have additional properties" };
        if (vErrors === null) {
          vErrors = [err2];
        } else {
          vErrors.push(err2);
        }
        errors++;
      }
    }
    if (data.baseUrl !== void 0) {
      let data0 = data.baseUrl;
      if (typeof data0 === "string") {
        if (!pattern18.test(data0)) {
          const err3 = { instancePath: instancePath + "/baseUrl", schemaPath: "#/properties/baseUrl/pattern", keyword: "pattern", params: { pattern: "^(https?://\\S+)?$" }, message: 'must match pattern "^(https?://\\S+)?$"' };
          if (vErrors === null) {
            vErrors = [err3];
          } else {
            vErrors.push(err3);
          }
          errors++;
        }
      } else {
        const err4 = { instancePath: instancePath + "/baseUrl", schemaPath: "#/properties/baseUrl/type", keyword: "type", params: { type: "string" }, message: "must be string" };
        if (vErrors === null) {
          vErrors = [err4];
        } else {
          vErrors.push(err4);
        }
        errors++;
      }
    }
    if (data.timeoutMs !== void 0) {
      let data1 = data.timeoutMs;
      if (!(typeof data1 == "number" && (!(data1 % 1) && !isNaN(data1)) && isFinite(data1))) {
        const err5 = { instancePath: instancePath + "/timeoutMs", schemaPath: "#/properties/timeoutMs/type", keyword: "type", params: { type: "integer" }, message: "must be integer" };
        if (vErrors === null) {
          vErrors = [err5];
        } else {
          vErrors.push(err5);
        }
        errors++;
      }
      if (typeof data1 == "number" && isFinite(data1)) {
        if (data1 < 1 || isNaN(data1)) {
          const err6 = { instancePath: instancePath + "/timeoutMs", schemaPath: "#/properties/timeoutMs/minimum", keyword: "minimum", params: { comparison: ">=", limit: 1 }, message: "must be >= 1" };
          if (vErrors === null) {
            vErrors = [err6];
          } else {
            vErrors.push(err6);
          }
          errors++;
        }
      }
    }
  } else {
    const err7 = { instancePath, schemaPath: "#/type", keyword: "type", params: { type: "object" }, message: "must be object" };
    if (vErrors === null) {
      vErrors = [err7];
    } else {
      vErrors.push(err7);
    }
    errors++;
  }
  validate54.errors = vErrors;
  return errors === 0;
}
validate54.evaluated = { "props": true, "dynamicProps": false, "dynamicItems": false };
exports.ListAwaitingInput = validate55;
function validate55(data, { instancePath = "", parentData, parentDataProperty, rootData = data, dynamicAnchors = {} } = {}) {
  ;
  let vErrors = null;
  let errors = 0;
  const evaluated0 = validate55.evaluated;
  if (evaluated0.dynamicProps) {
    evaluated0.props = void 0;
  }
  if (evaluated0.dynamicItems) {
    evaluated0.items = void 0;
  }
  if (data && typeof data == "object" && !Array.isArray(data)) {
    for (const key0 in data) {
      if (!(key0 === "cursor" || key0 === "limit")) {
        const err0 = { instancePath, schemaPath: "#/additionalProperties", keyword: "additionalProperties", params: { additionalProperty: key0 }, message: "must NOT have additional properties" };
        if (vErrors === null) {
          vErrors = [err0];
        } else {
          vErrors.push(err0);
        }
        errors++;
      }
    }
    if (data.cursor !== void 0) {
      let data0 = data.cursor;
      if (typeof data0 === "string") {
        if (func1(data0) < 1) {
          const err1 = { instancePath: instancePath + "/cursor", schemaPath: "#/properties/cursor/minLength", keyword: "minLength", params: { limit: 1 }, message: "must NOT have fewer than 1 characters" };
          if (vErrors === null) {
            vErrors = [err1];
          } else {
            vErrors.push(err1);
          }
          errors++;
        }
      } else {
        const err2 = { instancePath: instancePath + "/cursor", schemaPath: "#/properties/cursor/type", keyword: "type", params: { type: "string" }, message: "must be string" };
        if (vErrors === null) {
          vErrors = [err2];
        } else {
          vErrors.push(err2);
        }
        errors++;
      }
    }
    if (data.limit !== void 0) {
      let data1 = data.limit;
      if (!(typeof data1 == "number" && (!(data1 % 1) && !isNaN(data1)) && isFinite(data1))) {
        const err3 = { instancePath: instancePath + "/limit", schemaPath: "#/properties/limit/type", keyword: "type", params: { type: "integer" }, message: "must be integer" };
        if (vErrors === null) {
          vErrors = [err3];
        } else {
          vErrors.push(err3);
        }
        errors++;
      }
      if (typeof data1 == "number" && isFinite(data1)) {
        if (data1 > 500 || isNaN(data1)) {
          const err4 = { instancePath: instancePath + "/limit", schemaPath: "#/properties/limit/maximum", keyword: "maximum", params: { comparison: "<=", limit: 500 }, message: "must be <= 500" };
          if (vErrors === null) {
            vErrors = [err4];
          } else {
            vErrors.push(err4);
          }
          errors++;
        }
        if (data1 < 1 || isNaN(data1)) {
          const err5 = { instancePath: instancePath + "/limit", schemaPath: "#/properties/limit/minimum", keyword: "minimum", params: { comparison: ">=", limit: 1 }, message: "must be >= 1" };
          if (vErrors === null) {
            vErrors = [err5];
          } else {
            vErrors.push(err5);
          }
          errors++;
        }
      }
    }
  } else {
    const err6 = { instancePath, schemaPath: "#/type", keyword: "type", params: { type: "object" }, message: "must be object" };
    if (vErrors === null) {
      vErrors = [err6];
    } else {
      vErrors.push(err6);
    }
    errors++;
  }
  validate55.errors = vErrors;
  return errors === 0;
}
validate55.evaluated = { "props": true, "dynamicProps": false, "dynamicItems": false };
exports.LoadedReport = validate56;
var schema75 = { "$schema": "https://json-schema.org/draft/2020-12/schema", "$id": "ReportDoc.schema.json", "title": "ReportDoc", "description": "\uC2B9\uC778 \uC694\uCCAD \uBCF4\uACE0\uC11C(ReviewReport\uC758 \uC77D\uAE30\uC6A9 \uD22C\uC601). \uD654\uBA74\uC774 \uC77D\uB294 \uAC83\uB9CC \uD544\uC218\uB85C \uD558\uACE0 \uBAA8\uB974\uB294 \uD544\uB4DC\uB294 \uBCF4\uC874\uD55C\uB2E4.", "type": "object", "required": ["submission_id", "checks", "comparisons", "subject"], "properties": { "pipeline_schema_version": { "type": "string" }, "submission_id": { "type": "string", "minLength": 1 }, "generated_at": { "type": "string" }, "subject": { "type": "object" }, "active_release_id": { "type": ["string", "null"] }, "checks": { "type": "array", "items": { "type": "object", "required": ["kind", "result"], "properties": { "kind": { "type": "string" }, "result": { "type": "string" }, "detail": { "type": "string" }, "evidence_ref": { "type": "string" } } } }, "reports": { "type": "object", "additionalProperties": { "type": "string" } }, "comparisons": { "type": "array", "items": { "$ref": "Comparison.schema.json" } }, "notes": { "type": "array", "items": { "type": "string" } }, "ext": { "type": "object" } } };
function validate57(data, { instancePath = "", parentData, parentDataProperty, rootData = data, dynamicAnchors = {} } = {}) {
  ;
  let vErrors = null;
  let errors = 0;
  const evaluated0 = validate57.evaluated;
  if (evaluated0.dynamicProps) {
    evaluated0.props = void 0;
  }
  if (evaluated0.dynamicItems) {
    evaluated0.items = void 0;
  }
  if (data && typeof data == "object" && !Array.isArray(data)) {
    if (data.submission_id === void 0) {
      const err0 = { instancePath, schemaPath: "#/required", keyword: "required", params: { missingProperty: "submission_id" }, message: "must have required property 'submission_id'" };
      if (vErrors === null) {
        vErrors = [err0];
      } else {
        vErrors.push(err0);
      }
      errors++;
    }
    if (data.checks === void 0) {
      const err1 = { instancePath, schemaPath: "#/required", keyword: "required", params: { missingProperty: "checks" }, message: "must have required property 'checks'" };
      if (vErrors === null) {
        vErrors = [err1];
      } else {
        vErrors.push(err1);
      }
      errors++;
    }
    if (data.comparisons === void 0) {
      const err2 = { instancePath, schemaPath: "#/required", keyword: "required", params: { missingProperty: "comparisons" }, message: "must have required property 'comparisons'" };
      if (vErrors === null) {
        vErrors = [err2];
      } else {
        vErrors.push(err2);
      }
      errors++;
    }
    if (data.subject === void 0) {
      const err3 = { instancePath, schemaPath: "#/required", keyword: "required", params: { missingProperty: "subject" }, message: "must have required property 'subject'" };
      if (vErrors === null) {
        vErrors = [err3];
      } else {
        vErrors.push(err3);
      }
      errors++;
    }
    if (data.pipeline_schema_version !== void 0) {
      if (typeof data.pipeline_schema_version !== "string") {
        const err4 = { instancePath: instancePath + "/pipeline_schema_version", schemaPath: "#/properties/pipeline_schema_version/type", keyword: "type", params: { type: "string" }, message: "must be string" };
        if (vErrors === null) {
          vErrors = [err4];
        } else {
          vErrors.push(err4);
        }
        errors++;
      }
    }
    if (data.submission_id !== void 0) {
      let data1 = data.submission_id;
      if (typeof data1 === "string") {
        if (func1(data1) < 1) {
          const err5 = { instancePath: instancePath + "/submission_id", schemaPath: "#/properties/submission_id/minLength", keyword: "minLength", params: { limit: 1 }, message: "must NOT have fewer than 1 characters" };
          if (vErrors === null) {
            vErrors = [err5];
          } else {
            vErrors.push(err5);
          }
          errors++;
        }
      } else {
        const err6 = { instancePath: instancePath + "/submission_id", schemaPath: "#/properties/submission_id/type", keyword: "type", params: { type: "string" }, message: "must be string" };
        if (vErrors === null) {
          vErrors = [err6];
        } else {
          vErrors.push(err6);
        }
        errors++;
      }
    }
    if (data.generated_at !== void 0) {
      if (typeof data.generated_at !== "string") {
        const err7 = { instancePath: instancePath + "/generated_at", schemaPath: "#/properties/generated_at/type", keyword: "type", params: { type: "string" }, message: "must be string" };
        if (vErrors === null) {
          vErrors = [err7];
        } else {
          vErrors.push(err7);
        }
        errors++;
      }
    }
    if (data.subject !== void 0) {
      let data3 = data.subject;
      if (!(data3 && typeof data3 == "object" && !Array.isArray(data3))) {
        const err8 = { instancePath: instancePath + "/subject", schemaPath: "#/properties/subject/type", keyword: "type", params: { type: "object" }, message: "must be object" };
        if (vErrors === null) {
          vErrors = [err8];
        } else {
          vErrors.push(err8);
        }
        errors++;
      }
    }
    if (data.active_release_id !== void 0) {
      let data4 = data.active_release_id;
      if (typeof data4 !== "string" && data4 !== null) {
        const err9 = { instancePath: instancePath + "/active_release_id", schemaPath: "#/properties/active_release_id/type", keyword: "type", params: { type: schema75.properties.active_release_id.type }, message: "must be string,null" };
        if (vErrors === null) {
          vErrors = [err9];
        } else {
          vErrors.push(err9);
        }
        errors++;
      }
    }
    if (data.checks !== void 0) {
      let data5 = data.checks;
      if (Array.isArray(data5)) {
        const len0 = data5.length;
        for (let i0 = 0; i0 < len0; i0++) {
          let data6 = data5[i0];
          if (data6 && typeof data6 == "object" && !Array.isArray(data6)) {
            if (data6.kind === void 0) {
              const err10 = { instancePath: instancePath + "/checks/" + i0, schemaPath: "#/properties/checks/items/required", keyword: "required", params: { missingProperty: "kind" }, message: "must have required property 'kind'" };
              if (vErrors === null) {
                vErrors = [err10];
              } else {
                vErrors.push(err10);
              }
              errors++;
            }
            if (data6.result === void 0) {
              const err11 = { instancePath: instancePath + "/checks/" + i0, schemaPath: "#/properties/checks/items/required", keyword: "required", params: { missingProperty: "result" }, message: "must have required property 'result'" };
              if (vErrors === null) {
                vErrors = [err11];
              } else {
                vErrors.push(err11);
              }
              errors++;
            }
            if (data6.kind !== void 0) {
              if (typeof data6.kind !== "string") {
                const err12 = { instancePath: instancePath + "/checks/" + i0 + "/kind", schemaPath: "#/properties/checks/items/properties/kind/type", keyword: "type", params: { type: "string" }, message: "must be string" };
                if (vErrors === null) {
                  vErrors = [err12];
                } else {
                  vErrors.push(err12);
                }
                errors++;
              }
            }
            if (data6.result !== void 0) {
              if (typeof data6.result !== "string") {
                const err13 = { instancePath: instancePath + "/checks/" + i0 + "/result", schemaPath: "#/properties/checks/items/properties/result/type", keyword: "type", params: { type: "string" }, message: "must be string" };
                if (vErrors === null) {
                  vErrors = [err13];
                } else {
                  vErrors.push(err13);
                }
                errors++;
              }
            }
            if (data6.detail !== void 0) {
              if (typeof data6.detail !== "string") {
                const err14 = { instancePath: instancePath + "/checks/" + i0 + "/detail", schemaPath: "#/properties/checks/items/properties/detail/type", keyword: "type", params: { type: "string" }, message: "must be string" };
                if (vErrors === null) {
                  vErrors = [err14];
                } else {
                  vErrors.push(err14);
                }
                errors++;
              }
            }
            if (data6.evidence_ref !== void 0) {
              if (typeof data6.evidence_ref !== "string") {
                const err15 = { instancePath: instancePath + "/checks/" + i0 + "/evidence_ref", schemaPath: "#/properties/checks/items/properties/evidence_ref/type", keyword: "type", params: { type: "string" }, message: "must be string" };
                if (vErrors === null) {
                  vErrors = [err15];
                } else {
                  vErrors.push(err15);
                }
                errors++;
              }
            }
          } else {
            const err16 = { instancePath: instancePath + "/checks/" + i0, schemaPath: "#/properties/checks/items/type", keyword: "type", params: { type: "object" }, message: "must be object" };
            if (vErrors === null) {
              vErrors = [err16];
            } else {
              vErrors.push(err16);
            }
            errors++;
          }
        }
      } else {
        const err17 = { instancePath: instancePath + "/checks", schemaPath: "#/properties/checks/type", keyword: "type", params: { type: "array" }, message: "must be array" };
        if (vErrors === null) {
          vErrors = [err17];
        } else {
          vErrors.push(err17);
        }
        errors++;
      }
    }
    if (data.reports !== void 0) {
      let data11 = data.reports;
      if (data11 && typeof data11 == "object" && !Array.isArray(data11)) {
        for (const key0 in data11) {
          if (typeof data11[key0] !== "string") {
            const err18 = { instancePath: instancePath + "/reports/" + key0.replace(/~/g, "~0").replace(/\//g, "~1"), schemaPath: "#/properties/reports/additionalProperties/type", keyword: "type", params: { type: "string" }, message: "must be string" };
            if (vErrors === null) {
              vErrors = [err18];
            } else {
              vErrors.push(err18);
            }
            errors++;
          }
        }
      } else {
        const err19 = { instancePath: instancePath + "/reports", schemaPath: "#/properties/reports/type", keyword: "type", params: { type: "object" }, message: "must be object" };
        if (vErrors === null) {
          vErrors = [err19];
        } else {
          vErrors.push(err19);
        }
        errors++;
      }
    }
    if (data.comparisons !== void 0) {
      let data13 = data.comparisons;
      if (Array.isArray(data13)) {
        const len1 = data13.length;
        for (let i1 = 0; i1 < len1; i1++) {
          let data14 = data13[i1];
          if (data14 && typeof data14 == "object" && !Array.isArray(data14)) {
            if (data14.role === void 0) {
              const err20 = { instancePath: instancePath + "/comparisons/" + i1, schemaPath: "Comparison.schema.json/required", keyword: "required", params: { missingProperty: "role" }, message: "must have required property 'role'" };
              if (vErrors === null) {
                vErrors = [err20];
              } else {
                vErrors.push(err20);
              }
              errors++;
            }
            if (data14.name === void 0) {
              const err21 = { instancePath: instancePath + "/comparisons/" + i1, schemaPath: "Comparison.schema.json/required", keyword: "required", params: { missingProperty: "name" }, message: "must have required property 'name'" };
              if (vErrors === null) {
                vErrors = [err21];
              } else {
                vErrors.push(err21);
              }
              errors++;
            }
            if (data14.group === void 0) {
              const err22 = { instancePath: instancePath + "/comparisons/" + i1, schemaPath: "Comparison.schema.json/required", keyword: "required", params: { missingProperty: "group" }, message: "must have required property 'group'" };
              if (vErrors === null) {
                vErrors = [err22];
              } else {
                vErrors.push(err22);
              }
              errors++;
            }
            if (data14.candidate === void 0) {
              const err23 = { instancePath: instancePath + "/comparisons/" + i1, schemaPath: "Comparison.schema.json/required", keyword: "required", params: { missingProperty: "candidate" }, message: "must have required property 'candidate'" };
              if (vErrors === null) {
                vErrors = [err23];
              } else {
                vErrors.push(err23);
              }
              errors++;
            }
            if (data14.higher_is_better === void 0) {
              const err24 = { instancePath: instancePath + "/comparisons/" + i1, schemaPath: "Comparison.schema.json/required", keyword: "required", params: { missingProperty: "higher_is_better" }, message: "must have required property 'higher_is_better'" };
              if (vErrors === null) {
                vErrors = [err24];
              } else {
                vErrors.push(err24);
              }
              errors++;
            }
            if (data14.role !== void 0) {
              if (typeof data14.role !== "string") {
                const err25 = { instancePath: instancePath + "/comparisons/" + i1 + "/role", schemaPath: "Comparison.schema.json/properties/role/type", keyword: "type", params: { type: "string" }, message: "must be string" };
                if (vErrors === null) {
                  vErrors = [err25];
                } else {
                  vErrors.push(err25);
                }
                errors++;
              }
            }
            if (data14.name !== void 0) {
              if (typeof data14.name !== "string") {
                const err26 = { instancePath: instancePath + "/comparisons/" + i1 + "/name", schemaPath: "Comparison.schema.json/properties/name/type", keyword: "type", params: { type: "string" }, message: "must be string" };
                if (vErrors === null) {
                  vErrors = [err26];
                } else {
                  vErrors.push(err26);
                }
                errors++;
              }
            }
            if (data14.group !== void 0) {
              if (typeof data14.group !== "string") {
                const err27 = { instancePath: instancePath + "/comparisons/" + i1 + "/group", schemaPath: "Comparison.schema.json/properties/group/type", keyword: "type", params: { type: "string" }, message: "must be string" };
                if (vErrors === null) {
                  vErrors = [err27];
                } else {
                  vErrors.push(err27);
                }
                errors++;
              }
            }
            if (data14.slice !== void 0) {
              let data18 = data14.slice;
              if (data18 && typeof data18 == "object" && !Array.isArray(data18)) {
                if (data18.kind === void 0) {
                  const err28 = { instancePath: instancePath + "/comparisons/" + i1 + "/slice", schemaPath: "Comparison.schema.json/properties/slice/required", keyword: "required", params: { missingProperty: "kind" }, message: "must have required property 'kind'" };
                  if (vErrors === null) {
                    vErrors = [err28];
                  } else {
                    vErrors.push(err28);
                  }
                  errors++;
                }
                if (data18.value === void 0) {
                  const err29 = { instancePath: instancePath + "/comparisons/" + i1 + "/slice", schemaPath: "Comparison.schema.json/properties/slice/required", keyword: "required", params: { missingProperty: "value" }, message: "must have required property 'value'" };
                  if (vErrors === null) {
                    vErrors = [err29];
                  } else {
                    vErrors.push(err29);
                  }
                  errors++;
                }
                if (data18.kind !== void 0) {
                  if (typeof data18.kind !== "string") {
                    const err30 = { instancePath: instancePath + "/comparisons/" + i1 + "/slice/kind", schemaPath: "Comparison.schema.json/properties/slice/properties/kind/type", keyword: "type", params: { type: "string" }, message: "must be string" };
                    if (vErrors === null) {
                      vErrors = [err30];
                    } else {
                      vErrors.push(err30);
                    }
                    errors++;
                  }
                }
                if (data18.value !== void 0) {
                  if (typeof data18.value !== "string") {
                    const err31 = { instancePath: instancePath + "/comparisons/" + i1 + "/slice/value", schemaPath: "Comparison.schema.json/properties/slice/properties/value/type", keyword: "type", params: { type: "string" }, message: "must be string" };
                    if (vErrors === null) {
                      vErrors = [err31];
                    } else {
                      vErrors.push(err31);
                    }
                    errors++;
                  }
                }
              } else {
                const err32 = { instancePath: instancePath + "/comparisons/" + i1 + "/slice", schemaPath: "Comparison.schema.json/properties/slice/type", keyword: "type", params: { type: "object" }, message: "must be object" };
                if (vErrors === null) {
                  vErrors = [err32];
                } else {
                  vErrors.push(err32);
                }
                errors++;
              }
            }
            if (data14.candidate !== void 0) {
              let data21 = data14.candidate;
              if (!(typeof data21 == "number" && isFinite(data21))) {
                const err33 = { instancePath: instancePath + "/comparisons/" + i1 + "/candidate", schemaPath: "Comparison.schema.json/properties/candidate/type", keyword: "type", params: { type: "number" }, message: "must be number" };
                if (vErrors === null) {
                  vErrors = [err33];
                } else {
                  vErrors.push(err33);
                }
                errors++;
              }
            }
            if (data14.candidate_n !== void 0) {
              let data22 = data14.candidate_n;
              if (!(typeof data22 == "number" && (!(data22 % 1) && !isNaN(data22)) && isFinite(data22))) {
                const err34 = { instancePath: instancePath + "/comparisons/" + i1 + "/candidate_n", schemaPath: "Comparison.schema.json/properties/candidate_n/type", keyword: "type", params: { type: "integer" }, message: "must be integer" };
                if (vErrors === null) {
                  vErrors = [err34];
                } else {
                  vErrors.push(err34);
                }
                errors++;
              }
              if (typeof data22 == "number" && isFinite(data22)) {
                if (data22 < 0 || isNaN(data22)) {
                  const err35 = { instancePath: instancePath + "/comparisons/" + i1 + "/candidate_n", schemaPath: "Comparison.schema.json/properties/candidate_n/minimum", keyword: "minimum", params: { comparison: ">=", limit: 0 }, message: "must be >= 0" };
                  if (vErrors === null) {
                    vErrors = [err35];
                  } else {
                    vErrors.push(err35);
                  }
                  errors++;
                }
              }
            }
            if (data14.baseline !== void 0) {
              let data23 = data14.baseline;
              if (!(typeof data23 == "number" && isFinite(data23)) && data23 !== null) {
                const err36 = { instancePath: instancePath + "/comparisons/" + i1 + "/baseline", schemaPath: "Comparison.schema.json/properties/baseline/type", keyword: "type", params: { type: schema66.properties.baseline.type }, message: "must be number,null" };
                if (vErrors === null) {
                  vErrors = [err36];
                } else {
                  vErrors.push(err36);
                }
                errors++;
              }
            }
            if (data14.baseline_n !== void 0) {
              let data24 = data14.baseline_n;
              if (!(typeof data24 == "number" && (!(data24 % 1) && !isNaN(data24)) && isFinite(data24)) && data24 !== null) {
                const err37 = { instancePath: instancePath + "/comparisons/" + i1 + "/baseline_n", schemaPath: "Comparison.schema.json/properties/baseline_n/type", keyword: "type", params: { type: schema66.properties.baseline_n.type }, message: "must be integer,null" };
                if (vErrors === null) {
                  vErrors = [err37];
                } else {
                  vErrors.push(err37);
                }
                errors++;
              }
              if (typeof data24 == "number" && isFinite(data24)) {
                if (data24 < 0 || isNaN(data24)) {
                  const err38 = { instancePath: instancePath + "/comparisons/" + i1 + "/baseline_n", schemaPath: "Comparison.schema.json/properties/baseline_n/minimum", keyword: "minimum", params: { comparison: ">=", limit: 0 }, message: "must be >= 0" };
                  if (vErrors === null) {
                    vErrors = [err38];
                  } else {
                    vErrors.push(err38);
                  }
                  errors++;
                }
              }
            }
            if (data14.delta !== void 0) {
              let data25 = data14.delta;
              if (!(typeof data25 == "number" && isFinite(data25)) && data25 !== null) {
                const err39 = { instancePath: instancePath + "/comparisons/" + i1 + "/delta", schemaPath: "Comparison.schema.json/properties/delta/type", keyword: "type", params: { type: schema66.properties.delta.type }, message: "must be number,null" };
                if (vErrors === null) {
                  vErrors = [err39];
                } else {
                  vErrors.push(err39);
                }
                errors++;
              }
            }
            if (data14.higher_is_better !== void 0) {
              if (typeof data14.higher_is_better !== "boolean") {
                const err40 = { instancePath: instancePath + "/comparisons/" + i1 + "/higher_is_better", schemaPath: "Comparison.schema.json/properties/higher_is_better/type", keyword: "type", params: { type: "boolean" }, message: "must be boolean" };
                if (vErrors === null) {
                  vErrors = [err40];
                } else {
                  vErrors.push(err40);
                }
                errors++;
              }
            }
            if (data14.worse !== void 0) {
              let data27 = data14.worse;
              if (typeof data27 !== "boolean" && data27 !== null) {
                const err41 = { instancePath: instancePath + "/comparisons/" + i1 + "/worse", schemaPath: "Comparison.schema.json/properties/worse/type", keyword: "type", params: { type: schema66.properties.worse.type }, message: "must be boolean,null" };
                if (vErrors === null) {
                  vErrors = [err41];
                } else {
                  vErrors.push(err41);
                }
                errors++;
              }
            }
          } else {
            const err42 = { instancePath: instancePath + "/comparisons/" + i1, schemaPath: "Comparison.schema.json/type", keyword: "type", params: { type: "object" }, message: "must be object" };
            if (vErrors === null) {
              vErrors = [err42];
            } else {
              vErrors.push(err42);
            }
            errors++;
          }
        }
      } else {
        const err43 = { instancePath: instancePath + "/comparisons", schemaPath: "#/properties/comparisons/type", keyword: "type", params: { type: "array" }, message: "must be array" };
        if (vErrors === null) {
          vErrors = [err43];
        } else {
          vErrors.push(err43);
        }
        errors++;
      }
    }
    if (data.notes !== void 0) {
      let data28 = data.notes;
      if (Array.isArray(data28)) {
        const len2 = data28.length;
        for (let i2 = 0; i2 < len2; i2++) {
          if (typeof data28[i2] !== "string") {
            const err44 = { instancePath: instancePath + "/notes/" + i2, schemaPath: "#/properties/notes/items/type", keyword: "type", params: { type: "string" }, message: "must be string" };
            if (vErrors === null) {
              vErrors = [err44];
            } else {
              vErrors.push(err44);
            }
            errors++;
          }
        }
      } else {
        const err45 = { instancePath: instancePath + "/notes", schemaPath: "#/properties/notes/type", keyword: "type", params: { type: "array" }, message: "must be array" };
        if (vErrors === null) {
          vErrors = [err45];
        } else {
          vErrors.push(err45);
        }
        errors++;
      }
    }
    if (data.ext !== void 0) {
      let data30 = data.ext;
      if (!(data30 && typeof data30 == "object" && !Array.isArray(data30))) {
        const err46 = { instancePath: instancePath + "/ext", schemaPath: "#/properties/ext/type", keyword: "type", params: { type: "object" }, message: "must be object" };
        if (vErrors === null) {
          vErrors = [err46];
        } else {
          vErrors.push(err46);
        }
        errors++;
      }
    }
  } else {
    const err47 = { instancePath, schemaPath: "#/type", keyword: "type", params: { type: "object" }, message: "must be object" };
    if (vErrors === null) {
      vErrors = [err47];
    } else {
      vErrors.push(err47);
    }
    errors++;
  }
  validate57.errors = vErrors;
  return errors === 0;
}
validate57.evaluated = { "props": { "pipeline_schema_version": true, "submission_id": true, "generated_at": true, "subject": true, "active_release_id": true, "checks": true, "reports": true, "comparisons": true, "notes": true, "ext": true }, "dynamicProps": false, "dynamicItems": false };
function validate56(data, { instancePath = "", parentData, parentDataProperty, rootData = data, dynamicAnchors = {} } = {}) {
  ;
  let vErrors = null;
  let errors = 0;
  const evaluated0 = validate56.evaluated;
  if (evaluated0.dynamicProps) {
    evaluated0.props = void 0;
  }
  if (evaluated0.dynamicItems) {
    evaluated0.items = void 0;
  }
  if (data && typeof data == "object" && !Array.isArray(data)) {
    if (data.report === void 0) {
      const err0 = { instancePath, schemaPath: "#/required", keyword: "required", params: { missingProperty: "report" }, message: "must have required property 'report'" };
      if (vErrors === null) {
        vErrors = [err0];
      } else {
        vErrors.push(err0);
      }
      errors++;
    }
    if (data.reportHash === void 0) {
      const err1 = { instancePath, schemaPath: "#/required", keyword: "required", params: { missingProperty: "reportHash" }, message: "must have required property 'reportHash'" };
      if (vErrors === null) {
        vErrors = [err1];
      } else {
        vErrors.push(err1);
      }
      errors++;
    }
    for (const key0 in data) {
      if (!(key0 === "report" || key0 === "reportHash")) {
        const err2 = { instancePath, schemaPath: "#/additionalProperties", keyword: "additionalProperties", params: { additionalProperty: key0 }, message: "must NOT have additional properties" };
        if (vErrors === null) {
          vErrors = [err2];
        } else {
          vErrors.push(err2);
        }
        errors++;
      }
    }
    if (data.report !== void 0) {
      if (!validate57(data.report, { instancePath: instancePath + "/report", parentData: data, parentDataProperty: "report", rootData, dynamicAnchors })) {
        vErrors = vErrors === null ? validate57.errors : vErrors.concat(validate57.errors);
        errors = vErrors.length;
      }
    }
    if (data.reportHash !== void 0) {
      let data1 = data.reportHash;
      if (typeof data1 === "string") {
        if (!pattern4.test(data1)) {
          const err3 = { instancePath: instancePath + "/reportHash", schemaPath: "#/properties/reportHash/pattern", keyword: "pattern", params: { pattern: "^sha256:[0-9a-f]{64}$" }, message: 'must match pattern "^sha256:[0-9a-f]{64}$"' };
          if (vErrors === null) {
            vErrors = [err3];
          } else {
            vErrors.push(err3);
          }
          errors++;
        }
      } else {
        const err4 = { instancePath: instancePath + "/reportHash", schemaPath: "#/properties/reportHash/type", keyword: "type", params: { type: "string" }, message: "must be string" };
        if (vErrors === null) {
          vErrors = [err4];
        } else {
          vErrors.push(err4);
        }
        errors++;
      }
    }
  } else {
    const err5 = { instancePath, schemaPath: "#/type", keyword: "type", params: { type: "object" }, message: "must be object" };
    if (vErrors === null) {
      vErrors = [err5];
    } else {
      vErrors.push(err5);
    }
    errors++;
  }
  validate56.errors = vErrors;
  return errors === 0;
}
validate56.evaluated = { "props": true, "dynamicProps": false, "dynamicItems": false };
exports.MetricGroup = validate59;
var schema78 = { "$schema": "https://json-schema.org/draft/2020-12/schema", "$id": "MetricRow.schema.json", "title": "MetricRow", "description": "\uC9C0\uD45C \uD45C\uC758 \uD55C \uC904. worse\uB294 \uCC38\uACE0 \uD45C\uC2DC\uC77C \uBFD0 \uD569\uACA9/\uBD88\uD569\uACA9\uC774 \uC544\uB2C8\uB2E4(D53).", "type": "object", "required": ["key", "role", "name", "group", "sliceKind", "sliceLabel", "candidate", "candidateN", "baseline", "baselineN", "delta", "worse", "worseKnown", "direction", "sortCandidate", "sortDelta"], "properties": { "key": { "type": "string" }, "role": { "type": "string" }, "name": { "type": "string" }, "group": { "type": "string", "minLength": 1 }, "sliceKind": { "type": "string" }, "sliceLabel": { "type": "string" }, "candidate": { "$ref": "Cell.schema.json" }, "candidateN": { "type": "string" }, "baseline": { "$ref": "Cell.schema.json" }, "baselineN": { "type": "string" }, "delta": { "$ref": "Cell.schema.json" }, "worse": { "type": "boolean" }, "worseKnown": { "type": "boolean" }, "direction": { "type": "string" }, "sortCandidate": { "type": ["number", "null"] }, "sortDelta": { "type": ["number", "null"] } }, "additionalProperties": false };
function validate60(data, { instancePath = "", parentData, parentDataProperty, rootData = data, dynamicAnchors = {} } = {}) {
  ;
  let vErrors = null;
  let errors = 0;
  const evaluated0 = validate60.evaluated;
  if (evaluated0.dynamicProps) {
    evaluated0.props = void 0;
  }
  if (evaluated0.dynamicItems) {
    evaluated0.items = void 0;
  }
  if (data && typeof data == "object" && !Array.isArray(data)) {
    if (data.key === void 0) {
      const err0 = { instancePath, schemaPath: "#/required", keyword: "required", params: { missingProperty: "key" }, message: "must have required property 'key'" };
      if (vErrors === null) {
        vErrors = [err0];
      } else {
        vErrors.push(err0);
      }
      errors++;
    }
    if (data.role === void 0) {
      const err1 = { instancePath, schemaPath: "#/required", keyword: "required", params: { missingProperty: "role" }, message: "must have required property 'role'" };
      if (vErrors === null) {
        vErrors = [err1];
      } else {
        vErrors.push(err1);
      }
      errors++;
    }
    if (data.name === void 0) {
      const err2 = { instancePath, schemaPath: "#/required", keyword: "required", params: { missingProperty: "name" }, message: "must have required property 'name'" };
      if (vErrors === null) {
        vErrors = [err2];
      } else {
        vErrors.push(err2);
      }
      errors++;
    }
    if (data.group === void 0) {
      const err3 = { instancePath, schemaPath: "#/required", keyword: "required", params: { missingProperty: "group" }, message: "must have required property 'group'" };
      if (vErrors === null) {
        vErrors = [err3];
      } else {
        vErrors.push(err3);
      }
      errors++;
    }
    if (data.sliceKind === void 0) {
      const err4 = { instancePath, schemaPath: "#/required", keyword: "required", params: { missingProperty: "sliceKind" }, message: "must have required property 'sliceKind'" };
      if (vErrors === null) {
        vErrors = [err4];
      } else {
        vErrors.push(err4);
      }
      errors++;
    }
    if (data.sliceLabel === void 0) {
      const err5 = { instancePath, schemaPath: "#/required", keyword: "required", params: { missingProperty: "sliceLabel" }, message: "must have required property 'sliceLabel'" };
      if (vErrors === null) {
        vErrors = [err5];
      } else {
        vErrors.push(err5);
      }
      errors++;
    }
    if (data.candidate === void 0) {
      const err6 = { instancePath, schemaPath: "#/required", keyword: "required", params: { missingProperty: "candidate" }, message: "must have required property 'candidate'" };
      if (vErrors === null) {
        vErrors = [err6];
      } else {
        vErrors.push(err6);
      }
      errors++;
    }
    if (data.candidateN === void 0) {
      const err7 = { instancePath, schemaPath: "#/required", keyword: "required", params: { missingProperty: "candidateN" }, message: "must have required property 'candidateN'" };
      if (vErrors === null) {
        vErrors = [err7];
      } else {
        vErrors.push(err7);
      }
      errors++;
    }
    if (data.baseline === void 0) {
      const err8 = { instancePath, schemaPath: "#/required", keyword: "required", params: { missingProperty: "baseline" }, message: "must have required property 'baseline'" };
      if (vErrors === null) {
        vErrors = [err8];
      } else {
        vErrors.push(err8);
      }
      errors++;
    }
    if (data.baselineN === void 0) {
      const err9 = { instancePath, schemaPath: "#/required", keyword: "required", params: { missingProperty: "baselineN" }, message: "must have required property 'baselineN'" };
      if (vErrors === null) {
        vErrors = [err9];
      } else {
        vErrors.push(err9);
      }
      errors++;
    }
    if (data.delta === void 0) {
      const err10 = { instancePath, schemaPath: "#/required", keyword: "required", params: { missingProperty: "delta" }, message: "must have required property 'delta'" };
      if (vErrors === null) {
        vErrors = [err10];
      } else {
        vErrors.push(err10);
      }
      errors++;
    }
    if (data.worse === void 0) {
      const err11 = { instancePath, schemaPath: "#/required", keyword: "required", params: { missingProperty: "worse" }, message: "must have required property 'worse'" };
      if (vErrors === null) {
        vErrors = [err11];
      } else {
        vErrors.push(err11);
      }
      errors++;
    }
    if (data.worseKnown === void 0) {
      const err12 = { instancePath, schemaPath: "#/required", keyword: "required", params: { missingProperty: "worseKnown" }, message: "must have required property 'worseKnown'" };
      if (vErrors === null) {
        vErrors = [err12];
      } else {
        vErrors.push(err12);
      }
      errors++;
    }
    if (data.direction === void 0) {
      const err13 = { instancePath, schemaPath: "#/required", keyword: "required", params: { missingProperty: "direction" }, message: "must have required property 'direction'" };
      if (vErrors === null) {
        vErrors = [err13];
      } else {
        vErrors.push(err13);
      }
      errors++;
    }
    if (data.sortCandidate === void 0) {
      const err14 = { instancePath, schemaPath: "#/required", keyword: "required", params: { missingProperty: "sortCandidate" }, message: "must have required property 'sortCandidate'" };
      if (vErrors === null) {
        vErrors = [err14];
      } else {
        vErrors.push(err14);
      }
      errors++;
    }
    if (data.sortDelta === void 0) {
      const err15 = { instancePath, schemaPath: "#/required", keyword: "required", params: { missingProperty: "sortDelta" }, message: "must have required property 'sortDelta'" };
      if (vErrors === null) {
        vErrors = [err15];
      } else {
        vErrors.push(err15);
      }
      errors++;
    }
    for (const key0 in data) {
      if (!func24.call(schema78.properties, key0)) {
        const err16 = { instancePath, schemaPath: "#/additionalProperties", keyword: "additionalProperties", params: { additionalProperty: key0 }, message: "must NOT have additional properties" };
        if (vErrors === null) {
          vErrors = [err16];
        } else {
          vErrors.push(err16);
        }
        errors++;
      }
    }
    if (data.key !== void 0) {
      if (typeof data.key !== "string") {
        const err17 = { instancePath: instancePath + "/key", schemaPath: "#/properties/key/type", keyword: "type", params: { type: "string" }, message: "must be string" };
        if (vErrors === null) {
          vErrors = [err17];
        } else {
          vErrors.push(err17);
        }
        errors++;
      }
    }
    if (data.role !== void 0) {
      if (typeof data.role !== "string") {
        const err18 = { instancePath: instancePath + "/role", schemaPath: "#/properties/role/type", keyword: "type", params: { type: "string" }, message: "must be string" };
        if (vErrors === null) {
          vErrors = [err18];
        } else {
          vErrors.push(err18);
        }
        errors++;
      }
    }
    if (data.name !== void 0) {
      if (typeof data.name !== "string") {
        const err19 = { instancePath: instancePath + "/name", schemaPath: "#/properties/name/type", keyword: "type", params: { type: "string" }, message: "must be string" };
        if (vErrors === null) {
          vErrors = [err19];
        } else {
          vErrors.push(err19);
        }
        errors++;
      }
    }
    if (data.group !== void 0) {
      let data3 = data.group;
      if (typeof data3 === "string") {
        if (func1(data3) < 1) {
          const err20 = { instancePath: instancePath + "/group", schemaPath: "#/properties/group/minLength", keyword: "minLength", params: { limit: 1 }, message: "must NOT have fewer than 1 characters" };
          if (vErrors === null) {
            vErrors = [err20];
          } else {
            vErrors.push(err20);
          }
          errors++;
        }
      } else {
        const err21 = { instancePath: instancePath + "/group", schemaPath: "#/properties/group/type", keyword: "type", params: { type: "string" }, message: "must be string" };
        if (vErrors === null) {
          vErrors = [err21];
        } else {
          vErrors.push(err21);
        }
        errors++;
      }
    }
    if (data.sliceKind !== void 0) {
      if (typeof data.sliceKind !== "string") {
        const err22 = { instancePath: instancePath + "/sliceKind", schemaPath: "#/properties/sliceKind/type", keyword: "type", params: { type: "string" }, message: "must be string" };
        if (vErrors === null) {
          vErrors = [err22];
        } else {
          vErrors.push(err22);
        }
        errors++;
      }
    }
    if (data.sliceLabel !== void 0) {
      if (typeof data.sliceLabel !== "string") {
        const err23 = { instancePath: instancePath + "/sliceLabel", schemaPath: "#/properties/sliceLabel/type", keyword: "type", params: { type: "string" }, message: "must be string" };
        if (vErrors === null) {
          vErrors = [err23];
        } else {
          vErrors.push(err23);
        }
        errors++;
      }
    }
    if (data.candidate !== void 0) {
      let data6 = data.candidate;
      if (data6 && typeof data6 == "object" && !Array.isArray(data6)) {
        if (data6.kind === void 0) {
          const err24 = { instancePath: instancePath + "/candidate", schemaPath: "Cell.schema.json/required", keyword: "required", params: { missingProperty: "kind" }, message: "must have required property 'kind'" };
          if (vErrors === null) {
            vErrors = [err24];
          } else {
            vErrors.push(err24);
          }
          errors++;
        }
        if (data6.text === void 0) {
          const err25 = { instancePath: instancePath + "/candidate", schemaPath: "Cell.schema.json/required", keyword: "required", params: { missingProperty: "text" }, message: "must have required property 'text'" };
          if (vErrors === null) {
            vErrors = [err25];
          } else {
            vErrors.push(err25);
          }
          errors++;
        }
        for (const key1 in data6) {
          if (!(key1 === "kind" || key1 === "text")) {
            const err26 = { instancePath: instancePath + "/candidate", schemaPath: "Cell.schema.json/additionalProperties", keyword: "additionalProperties", params: { additionalProperty: key1 }, message: "must NOT have additional properties" };
            if (vErrors === null) {
              vErrors = [err26];
            } else {
              vErrors.push(err26);
            }
            errors++;
          }
        }
        if (data6.kind !== void 0) {
          let data7 = data6.kind;
          if (!(data7 === "value" || data7 === "uncomputable" || data7 === "none")) {
            const err27 = { instancePath: instancePath + "/candidate/kind", schemaPath: "Cell.schema.json/properties/kind/enum", keyword: "enum", params: { allowedValues: schema65.properties.kind.enum }, message: "must be equal to one of the allowed values" };
            if (vErrors === null) {
              vErrors = [err27];
            } else {
              vErrors.push(err27);
            }
            errors++;
          }
        }
        if (data6.text !== void 0) {
          let data8 = data6.text;
          if (typeof data8 === "string") {
            if (func1(data8) < 1) {
              const err28 = { instancePath: instancePath + "/candidate/text", schemaPath: "Cell.schema.json/properties/text/minLength", keyword: "minLength", params: { limit: 1 }, message: "must NOT have fewer than 1 characters" };
              if (vErrors === null) {
                vErrors = [err28];
              } else {
                vErrors.push(err28);
              }
              errors++;
            }
          } else {
            const err29 = { instancePath: instancePath + "/candidate/text", schemaPath: "Cell.schema.json/properties/text/type", keyword: "type", params: { type: "string" }, message: "must be string" };
            if (vErrors === null) {
              vErrors = [err29];
            } else {
              vErrors.push(err29);
            }
            errors++;
          }
        }
      } else {
        const err30 = { instancePath: instancePath + "/candidate", schemaPath: "Cell.schema.json/type", keyword: "type", params: { type: "object" }, message: "must be object" };
        if (vErrors === null) {
          vErrors = [err30];
        } else {
          vErrors.push(err30);
        }
        errors++;
      }
    }
    if (data.candidateN !== void 0) {
      if (typeof data.candidateN !== "string") {
        const err31 = { instancePath: instancePath + "/candidateN", schemaPath: "#/properties/candidateN/type", keyword: "type", params: { type: "string" }, message: "must be string" };
        if (vErrors === null) {
          vErrors = [err31];
        } else {
          vErrors.push(err31);
        }
        errors++;
      }
    }
    if (data.baseline !== void 0) {
      let data10 = data.baseline;
      if (data10 && typeof data10 == "object" && !Array.isArray(data10)) {
        if (data10.kind === void 0) {
          const err32 = { instancePath: instancePath + "/baseline", schemaPath: "Cell.schema.json/required", keyword: "required", params: { missingProperty: "kind" }, message: "must have required property 'kind'" };
          if (vErrors === null) {
            vErrors = [err32];
          } else {
            vErrors.push(err32);
          }
          errors++;
        }
        if (data10.text === void 0) {
          const err33 = { instancePath: instancePath + "/baseline", schemaPath: "Cell.schema.json/required", keyword: "required", params: { missingProperty: "text" }, message: "must have required property 'text'" };
          if (vErrors === null) {
            vErrors = [err33];
          } else {
            vErrors.push(err33);
          }
          errors++;
        }
        for (const key2 in data10) {
          if (!(key2 === "kind" || key2 === "text")) {
            const err34 = { instancePath: instancePath + "/baseline", schemaPath: "Cell.schema.json/additionalProperties", keyword: "additionalProperties", params: { additionalProperty: key2 }, message: "must NOT have additional properties" };
            if (vErrors === null) {
              vErrors = [err34];
            } else {
              vErrors.push(err34);
            }
            errors++;
          }
        }
        if (data10.kind !== void 0) {
          let data11 = data10.kind;
          if (!(data11 === "value" || data11 === "uncomputable" || data11 === "none")) {
            const err35 = { instancePath: instancePath + "/baseline/kind", schemaPath: "Cell.schema.json/properties/kind/enum", keyword: "enum", params: { allowedValues: schema65.properties.kind.enum }, message: "must be equal to one of the allowed values" };
            if (vErrors === null) {
              vErrors = [err35];
            } else {
              vErrors.push(err35);
            }
            errors++;
          }
        }
        if (data10.text !== void 0) {
          let data12 = data10.text;
          if (typeof data12 === "string") {
            if (func1(data12) < 1) {
              const err36 = { instancePath: instancePath + "/baseline/text", schemaPath: "Cell.schema.json/properties/text/minLength", keyword: "minLength", params: { limit: 1 }, message: "must NOT have fewer than 1 characters" };
              if (vErrors === null) {
                vErrors = [err36];
              } else {
                vErrors.push(err36);
              }
              errors++;
            }
          } else {
            const err37 = { instancePath: instancePath + "/baseline/text", schemaPath: "Cell.schema.json/properties/text/type", keyword: "type", params: { type: "string" }, message: "must be string" };
            if (vErrors === null) {
              vErrors = [err37];
            } else {
              vErrors.push(err37);
            }
            errors++;
          }
        }
      } else {
        const err38 = { instancePath: instancePath + "/baseline", schemaPath: "Cell.schema.json/type", keyword: "type", params: { type: "object" }, message: "must be object" };
        if (vErrors === null) {
          vErrors = [err38];
        } else {
          vErrors.push(err38);
        }
        errors++;
      }
    }
    if (data.baselineN !== void 0) {
      if (typeof data.baselineN !== "string") {
        const err39 = { instancePath: instancePath + "/baselineN", schemaPath: "#/properties/baselineN/type", keyword: "type", params: { type: "string" }, message: "must be string" };
        if (vErrors === null) {
          vErrors = [err39];
        } else {
          vErrors.push(err39);
        }
        errors++;
      }
    }
    if (data.delta !== void 0) {
      let data14 = data.delta;
      if (data14 && typeof data14 == "object" && !Array.isArray(data14)) {
        if (data14.kind === void 0) {
          const err40 = { instancePath: instancePath + "/delta", schemaPath: "Cell.schema.json/required", keyword: "required", params: { missingProperty: "kind" }, message: "must have required property 'kind'" };
          if (vErrors === null) {
            vErrors = [err40];
          } else {
            vErrors.push(err40);
          }
          errors++;
        }
        if (data14.text === void 0) {
          const err41 = { instancePath: instancePath + "/delta", schemaPath: "Cell.schema.json/required", keyword: "required", params: { missingProperty: "text" }, message: "must have required property 'text'" };
          if (vErrors === null) {
            vErrors = [err41];
          } else {
            vErrors.push(err41);
          }
          errors++;
        }
        for (const key3 in data14) {
          if (!(key3 === "kind" || key3 === "text")) {
            const err42 = { instancePath: instancePath + "/delta", schemaPath: "Cell.schema.json/additionalProperties", keyword: "additionalProperties", params: { additionalProperty: key3 }, message: "must NOT have additional properties" };
            if (vErrors === null) {
              vErrors = [err42];
            } else {
              vErrors.push(err42);
            }
            errors++;
          }
        }
        if (data14.kind !== void 0) {
          let data15 = data14.kind;
          if (!(data15 === "value" || data15 === "uncomputable" || data15 === "none")) {
            const err43 = { instancePath: instancePath + "/delta/kind", schemaPath: "Cell.schema.json/properties/kind/enum", keyword: "enum", params: { allowedValues: schema65.properties.kind.enum }, message: "must be equal to one of the allowed values" };
            if (vErrors === null) {
              vErrors = [err43];
            } else {
              vErrors.push(err43);
            }
            errors++;
          }
        }
        if (data14.text !== void 0) {
          let data16 = data14.text;
          if (typeof data16 === "string") {
            if (func1(data16) < 1) {
              const err44 = { instancePath: instancePath + "/delta/text", schemaPath: "Cell.schema.json/properties/text/minLength", keyword: "minLength", params: { limit: 1 }, message: "must NOT have fewer than 1 characters" };
              if (vErrors === null) {
                vErrors = [err44];
              } else {
                vErrors.push(err44);
              }
              errors++;
            }
          } else {
            const err45 = { instancePath: instancePath + "/delta/text", schemaPath: "Cell.schema.json/properties/text/type", keyword: "type", params: { type: "string" }, message: "must be string" };
            if (vErrors === null) {
              vErrors = [err45];
            } else {
              vErrors.push(err45);
            }
            errors++;
          }
        }
      } else {
        const err46 = { instancePath: instancePath + "/delta", schemaPath: "Cell.schema.json/type", keyword: "type", params: { type: "object" }, message: "must be object" };
        if (vErrors === null) {
          vErrors = [err46];
        } else {
          vErrors.push(err46);
        }
        errors++;
      }
    }
    if (data.worse !== void 0) {
      if (typeof data.worse !== "boolean") {
        const err47 = { instancePath: instancePath + "/worse", schemaPath: "#/properties/worse/type", keyword: "type", params: { type: "boolean" }, message: "must be boolean" };
        if (vErrors === null) {
          vErrors = [err47];
        } else {
          vErrors.push(err47);
        }
        errors++;
      }
    }
    if (data.worseKnown !== void 0) {
      if (typeof data.worseKnown !== "boolean") {
        const err48 = { instancePath: instancePath + "/worseKnown", schemaPath: "#/properties/worseKnown/type", keyword: "type", params: { type: "boolean" }, message: "must be boolean" };
        if (vErrors === null) {
          vErrors = [err48];
        } else {
          vErrors.push(err48);
        }
        errors++;
      }
    }
    if (data.direction !== void 0) {
      if (typeof data.direction !== "string") {
        const err49 = { instancePath: instancePath + "/direction", schemaPath: "#/properties/direction/type", keyword: "type", params: { type: "string" }, message: "must be string" };
        if (vErrors === null) {
          vErrors = [err49];
        } else {
          vErrors.push(err49);
        }
        errors++;
      }
    }
    if (data.sortCandidate !== void 0) {
      let data20 = data.sortCandidate;
      if (!(typeof data20 == "number" && isFinite(data20)) && data20 !== null) {
        const err50 = { instancePath: instancePath + "/sortCandidate", schemaPath: "#/properties/sortCandidate/type", keyword: "type", params: { type: schema78.properties.sortCandidate.type }, message: "must be number,null" };
        if (vErrors === null) {
          vErrors = [err50];
        } else {
          vErrors.push(err50);
        }
        errors++;
      }
    }
    if (data.sortDelta !== void 0) {
      let data21 = data.sortDelta;
      if (!(typeof data21 == "number" && isFinite(data21)) && data21 !== null) {
        const err51 = { instancePath: instancePath + "/sortDelta", schemaPath: "#/properties/sortDelta/type", keyword: "type", params: { type: schema78.properties.sortDelta.type }, message: "must be number,null" };
        if (vErrors === null) {
          vErrors = [err51];
        } else {
          vErrors.push(err51);
        }
        errors++;
      }
    }
  } else {
    const err52 = { instancePath, schemaPath: "#/type", keyword: "type", params: { type: "object" }, message: "must be object" };
    if (vErrors === null) {
      vErrors = [err52];
    } else {
      vErrors.push(err52);
    }
    errors++;
  }
  validate60.errors = vErrors;
  return errors === 0;
}
validate60.evaluated = { "props": true, "dynamicProps": false, "dynamicItems": false };
function validate59(data, { instancePath = "", parentData, parentDataProperty, rootData = data, dynamicAnchors = {} } = {}) {
  ;
  let vErrors = null;
  let errors = 0;
  const evaluated0 = validate59.evaluated;
  if (evaluated0.dynamicProps) {
    evaluated0.props = void 0;
  }
  if (evaluated0.dynamicItems) {
    evaluated0.items = void 0;
  }
  if (data && typeof data == "object" && !Array.isArray(data)) {
    if (data.group === void 0) {
      const err0 = { instancePath, schemaPath: "#/required", keyword: "required", params: { missingProperty: "group" }, message: "must have required property 'group'" };
      if (vErrors === null) {
        vErrors = [err0];
      } else {
        vErrors.push(err0);
      }
      errors++;
    }
    if (data.label === void 0) {
      const err1 = { instancePath, schemaPath: "#/required", keyword: "required", params: { missingProperty: "label" }, message: "must have required property 'label'" };
      if (vErrors === null) {
        vErrors = [err1];
      } else {
        vErrors.push(err1);
      }
      errors++;
    }
    if (data.rows === void 0) {
      const err2 = { instancePath, schemaPath: "#/required", keyword: "required", params: { missingProperty: "rows" }, message: "must have required property 'rows'" };
      if (vErrors === null) {
        vErrors = [err2];
      } else {
        vErrors.push(err2);
      }
      errors++;
    }
    for (const key0 in data) {
      if (!(key0 === "group" || key0 === "label" || key0 === "rows")) {
        const err3 = { instancePath, schemaPath: "#/additionalProperties", keyword: "additionalProperties", params: { additionalProperty: key0 }, message: "must NOT have additional properties" };
        if (vErrors === null) {
          vErrors = [err3];
        } else {
          vErrors.push(err3);
        }
        errors++;
      }
    }
    if (data.group !== void 0) {
      let data0 = data.group;
      if (typeof data0 === "string") {
        if (func1(data0) < 1) {
          const err4 = { instancePath: instancePath + "/group", schemaPath: "#/properties/group/minLength", keyword: "minLength", params: { limit: 1 }, message: "must NOT have fewer than 1 characters" };
          if (vErrors === null) {
            vErrors = [err4];
          } else {
            vErrors.push(err4);
          }
          errors++;
        }
      } else {
        const err5 = { instancePath: instancePath + "/group", schemaPath: "#/properties/group/type", keyword: "type", params: { type: "string" }, message: "must be string" };
        if (vErrors === null) {
          vErrors = [err5];
        } else {
          vErrors.push(err5);
        }
        errors++;
      }
    }
    if (data.label !== void 0) {
      let data1 = data.label;
      if (typeof data1 === "string") {
        if (func1(data1) < 1) {
          const err6 = { instancePath: instancePath + "/label", schemaPath: "#/properties/label/minLength", keyword: "minLength", params: { limit: 1 }, message: "must NOT have fewer than 1 characters" };
          if (vErrors === null) {
            vErrors = [err6];
          } else {
            vErrors.push(err6);
          }
          errors++;
        }
      } else {
        const err7 = { instancePath: instancePath + "/label", schemaPath: "#/properties/label/type", keyword: "type", params: { type: "string" }, message: "must be string" };
        if (vErrors === null) {
          vErrors = [err7];
        } else {
          vErrors.push(err7);
        }
        errors++;
      }
    }
    if (data.rows !== void 0) {
      let data2 = data.rows;
      if (Array.isArray(data2)) {
        const len0 = data2.length;
        for (let i0 = 0; i0 < len0; i0++) {
          if (!validate60(data2[i0], { instancePath: instancePath + "/rows/" + i0, parentData: data2, parentDataProperty: i0, rootData, dynamicAnchors })) {
            vErrors = vErrors === null ? validate60.errors : vErrors.concat(validate60.errors);
            errors = vErrors.length;
          }
        }
      } else {
        const err8 = { instancePath: instancePath + "/rows", schemaPath: "#/properties/rows/type", keyword: "type", params: { type: "array" }, message: "must be array" };
        if (vErrors === null) {
          vErrors = [err8];
        } else {
          vErrors.push(err8);
        }
        errors++;
      }
    }
  } else {
    const err9 = { instancePath, schemaPath: "#/type", keyword: "type", params: { type: "object" }, message: "must be object" };
    if (vErrors === null) {
      vErrors = [err9];
    } else {
      vErrors.push(err9);
    }
    errors++;
  }
  validate59.errors = vErrors;
  return errors === 0;
}
validate59.evaluated = { "props": true, "dynamicProps": false, "dynamicItems": false };
exports.MetricRow = validate60;
exports.OpsFailureInput = validate62;
function validate62(data, { instancePath = "", parentData, parentDataProperty, rootData = data, dynamicAnchors = {} } = {}) {
  ;
  let vErrors = null;
  let errors = 0;
  const evaluated0 = validate62.evaluated;
  if (evaluated0.dynamicProps) {
    evaluated0.props = void 0;
  }
  if (evaluated0.dynamicItems) {
    evaluated0.items = void 0;
  }
  if (data && typeof data == "object" && !Array.isArray(data)) {
    if (data.error === void 0) {
      const err0 = { instancePath, schemaPath: "#/required", keyword: "required", params: { missingProperty: "error" }, message: "must have required property 'error'" };
      if (vErrors === null) {
        vErrors = [err0];
      } else {
        vErrors.push(err0);
      }
      errors++;
    }
    for (const key0 in data) {
      if (!(key0 === "error")) {
        const err1 = { instancePath, schemaPath: "#/additionalProperties", keyword: "additionalProperties", params: { additionalProperty: key0 }, message: "must NOT have additional properties" };
        if (vErrors === null) {
          vErrors = [err1];
        } else {
          vErrors.push(err1);
        }
        errors++;
      }
    }
    if (data.error !== void 0) {
      let data0 = data.error;
      if (data0 && typeof data0 == "object" && !Array.isArray(data0)) {
        if (data0.kind === void 0) {
          const err2 = { instancePath: instancePath + "/error", schemaPath: "ErrorInfo.schema.json/required", keyword: "required", params: { missingProperty: "kind" }, message: "must have required property 'kind'" };
          if (vErrors === null) {
            vErrors = [err2];
          } else {
            vErrors.push(err2);
          }
          errors++;
        }
        if (data0.status === void 0) {
          const err3 = { instancePath: instancePath + "/error", schemaPath: "ErrorInfo.schema.json/required", keyword: "required", params: { missingProperty: "status" }, message: "must have required property 'status'" };
          if (vErrors === null) {
            vErrors = [err3];
          } else {
            vErrors.push(err3);
          }
          errors++;
        }
        if (data0.message === void 0) {
          const err4 = { instancePath: instancePath + "/error", schemaPath: "ErrorInfo.schema.json/required", keyword: "required", params: { missingProperty: "message" }, message: "must have required property 'message'" };
          if (vErrors === null) {
            vErrors = [err4];
          } else {
            vErrors.push(err4);
          }
          errors++;
        }
        if (data0.retryable === void 0) {
          const err5 = { instancePath: instancePath + "/error", schemaPath: "ErrorInfo.schema.json/required", keyword: "required", params: { missingProperty: "retryable" }, message: "must have required property 'retryable'" };
          if (vErrors === null) {
            vErrors = [err5];
          } else {
            vErrors.push(err5);
          }
          errors++;
        }
        for (const key1 in data0) {
          if (!(key1 === "kind" || key1 === "status" || key1 === "message" || key1 === "retryable")) {
            const err6 = { instancePath: instancePath + "/error", schemaPath: "ErrorInfo.schema.json/additionalProperties", keyword: "additionalProperties", params: { additionalProperty: key1 }, message: "must NOT have additional properties" };
            if (vErrors === null) {
              vErrors = [err6];
            } else {
              vErrors.push(err6);
            }
            errors++;
          }
        }
        if (data0.kind !== void 0) {
          let data1 = data0.kind;
          if (!(data1 === "UNAUTHENTICATED" || data1 === "ACCOUNT_PENDING" || data1 === "STALE_REPORT" || data1 === "ALREADY_DECIDED" || data1 === "NOT_FOUND" || data1 === "PERMISSION_DENIED" || data1 === "INVALID_RECORD" || data1 === "CONFLICT" || data1 === "FAILED_PRECONDITION" || data1 === "UNAVAILABLE" || data1 === "BAD_RESPONSE" || data1 === "UNKNOWN" || data1 === "NON_API")) {
            const err7 = { instancePath: instancePath + "/error/kind", schemaPath: "ErrorInfo.schema.json/properties/kind/enum", keyword: "enum", params: { allowedValues: schema40.properties.kind.enum }, message: "must be equal to one of the allowed values" };
            if (vErrors === null) {
              vErrors = [err7];
            } else {
              vErrors.push(err7);
            }
            errors++;
          }
        }
        if (data0.status !== void 0) {
          let data2 = data0.status;
          if (!(typeof data2 == "number" && (!(data2 % 1) && !isNaN(data2)) && isFinite(data2))) {
            const err8 = { instancePath: instancePath + "/error/status", schemaPath: "ErrorInfo.schema.json/properties/status/type", keyword: "type", params: { type: "integer" }, message: "must be integer" };
            if (vErrors === null) {
              vErrors = [err8];
            } else {
              vErrors.push(err8);
            }
            errors++;
          }
          if (typeof data2 == "number" && isFinite(data2)) {
            if (data2 > 599 || isNaN(data2)) {
              const err9 = { instancePath: instancePath + "/error/status", schemaPath: "ErrorInfo.schema.json/properties/status/maximum", keyword: "maximum", params: { comparison: "<=", limit: 599 }, message: "must be <= 599" };
              if (vErrors === null) {
                vErrors = [err9];
              } else {
                vErrors.push(err9);
              }
              errors++;
            }
            if (data2 < 0 || isNaN(data2)) {
              const err10 = { instancePath: instancePath + "/error/status", schemaPath: "ErrorInfo.schema.json/properties/status/minimum", keyword: "minimum", params: { comparison: ">=", limit: 0 }, message: "must be >= 0" };
              if (vErrors === null) {
                vErrors = [err10];
              } else {
                vErrors.push(err10);
              }
              errors++;
            }
          }
        }
        if (data0.message !== void 0) {
          if (typeof data0.message !== "string") {
            const err11 = { instancePath: instancePath + "/error/message", schemaPath: "ErrorInfo.schema.json/properties/message/type", keyword: "type", params: { type: "string" }, message: "must be string" };
            if (vErrors === null) {
              vErrors = [err11];
            } else {
              vErrors.push(err11);
            }
            errors++;
          }
        }
        if (data0.retryable !== void 0) {
          if (typeof data0.retryable !== "boolean") {
            const err12 = { instancePath: instancePath + "/error/retryable", schemaPath: "ErrorInfo.schema.json/properties/retryable/type", keyword: "type", params: { type: "boolean" }, message: "must be boolean" };
            if (vErrors === null) {
              vErrors = [err12];
            } else {
              vErrors.push(err12);
            }
            errors++;
          }
        }
      } else {
        const err13 = { instancePath: instancePath + "/error", schemaPath: "ErrorInfo.schema.json/type", keyword: "type", params: { type: "object" }, message: "must be object" };
        if (vErrors === null) {
          vErrors = [err13];
        } else {
          vErrors.push(err13);
        }
        errors++;
      }
    }
  } else {
    const err14 = { instancePath, schemaPath: "#/type", keyword: "type", params: { type: "object" }, message: "must be object" };
    if (vErrors === null) {
      vErrors = [err14];
    } else {
      vErrors.push(err14);
    }
    errors++;
  }
  validate62.errors = vErrors;
  return errors === 0;
}
validate62.evaluated = { "props": true, "dynamicProps": false, "dynamicItems": false };
exports.OpsNotice = validate63;
var schema84 = { "$schema": "https://json-schema.org/draft/2020-12/schema", "$id": "OpsNotice.schema.json", "title": "OpsNotice", "description": "ops_failure\uC758 \uCD9C\uB825: \uD654\uBA74\uC5D0 \uBCF4\uC77C \uC54C\uB9BC. \uC624\uB958\uB97C \uC885\uB958\uB85C \uAD6C\uBD84\uD574 \uBCF4\uC778\uB2E4(403, 409, 412, \uB124\uD2B8\uC6CC\uD06C).", "type": "object", "required": ["kind", "text"], "properties": { "kind": { "enum": ["badresponse", "denied", "conflict", "precondition", "network", "invalid", "notfound", "other"] }, "text": { "type": "string", "minLength": 1 } }, "additionalProperties": false };
function validate63(data, { instancePath = "", parentData, parentDataProperty, rootData = data, dynamicAnchors = {} } = {}) {
  ;
  let vErrors = null;
  let errors = 0;
  const evaluated0 = validate63.evaluated;
  if (evaluated0.dynamicProps) {
    evaluated0.props = void 0;
  }
  if (evaluated0.dynamicItems) {
    evaluated0.items = void 0;
  }
  if (data && typeof data == "object" && !Array.isArray(data)) {
    if (data.kind === void 0) {
      const err0 = { instancePath, schemaPath: "#/required", keyword: "required", params: { missingProperty: "kind" }, message: "must have required property 'kind'" };
      if (vErrors === null) {
        vErrors = [err0];
      } else {
        vErrors.push(err0);
      }
      errors++;
    }
    if (data.text === void 0) {
      const err1 = { instancePath, schemaPath: "#/required", keyword: "required", params: { missingProperty: "text" }, message: "must have required property 'text'" };
      if (vErrors === null) {
        vErrors = [err1];
      } else {
        vErrors.push(err1);
      }
      errors++;
    }
    for (const key0 in data) {
      if (!(key0 === "kind" || key0 === "text")) {
        const err2 = { instancePath, schemaPath: "#/additionalProperties", keyword: "additionalProperties", params: { additionalProperty: key0 }, message: "must NOT have additional properties" };
        if (vErrors === null) {
          vErrors = [err2];
        } else {
          vErrors.push(err2);
        }
        errors++;
      }
    }
    if (data.kind !== void 0) {
      let data0 = data.kind;
      if (!(data0 === "badresponse" || data0 === "denied" || data0 === "conflict" || data0 === "precondition" || data0 === "network" || data0 === "invalid" || data0 === "notfound" || data0 === "other")) {
        const err3 = { instancePath: instancePath + "/kind", schemaPath: "#/properties/kind/enum", keyword: "enum", params: { allowedValues: schema84.properties.kind.enum }, message: "must be equal to one of the allowed values" };
        if (vErrors === null) {
          vErrors = [err3];
        } else {
          vErrors.push(err3);
        }
        errors++;
      }
    }
    if (data.text !== void 0) {
      let data1 = data.text;
      if (typeof data1 === "string") {
        if (func1(data1) < 1) {
          const err4 = { instancePath: instancePath + "/text", schemaPath: "#/properties/text/minLength", keyword: "minLength", params: { limit: 1 }, message: "must NOT have fewer than 1 characters" };
          if (vErrors === null) {
            vErrors = [err4];
          } else {
            vErrors.push(err4);
          }
          errors++;
        }
      } else {
        const err5 = { instancePath: instancePath + "/text", schemaPath: "#/properties/text/type", keyword: "type", params: { type: "string" }, message: "must be string" };
        if (vErrors === null) {
          vErrors = [err5];
        } else {
          vErrors.push(err5);
        }
        errors++;
      }
    }
  } else {
    const err6 = { instancePath, schemaPath: "#/type", keyword: "type", params: { type: "object" }, message: "must be object" };
    if (vErrors === null) {
      vErrors = [err6];
    } else {
      vErrors.push(err6);
    }
    errors++;
  }
  validate63.errors = vErrors;
  return errors === 0;
}
validate63.evaluated = { "props": true, "dynamicProps": false, "dynamicItems": false };
exports.OpsRequest = validate64;
var schema85 = { "$schema": "https://json-schema.org/draft/2020-12/schema", "$id": "OpsRequest.schema.json", "title": "OpsRequest", "description": "ops_request\uC758 \uCD9C\uB825: \uBCF4\uB0B4\uB3C4 \uB418\uB294 \uC6B4\uC601 \uC694\uCCAD \uD558\uB098.", "type": "object", "required": ["kind"], "properties": { "kind": { "enum": ["activate", "rollback"] }, "releaseId": { "type": "string", "minLength": 1 }, "rollback": { "$ref": "RollbackDraft.schema.json" } }, "additionalProperties": false, "allOf": [{ "if": { "properties": { "kind": { "const": "activate" } }, "required": ["kind"] }, "then": { "required": ["releaseId"], "not": { "required": ["rollback"] } } }, { "if": { "properties": { "kind": { "const": "rollback" } }, "required": ["kind"] }, "then": { "required": ["rollback"], "not": { "required": ["releaseId"] } } }] };
function validate64(data, { instancePath = "", parentData, parentDataProperty, rootData = data, dynamicAnchors = {} } = {}) {
  ;
  let vErrors = null;
  let errors = 0;
  const evaluated0 = validate64.evaluated;
  if (evaluated0.dynamicProps) {
    evaluated0.props = void 0;
  }
  if (evaluated0.dynamicItems) {
    evaluated0.items = void 0;
  }
  const _errs2 = errors;
  let valid1 = true;
  const _errs3 = errors;
  if (data && typeof data == "object" && !Array.isArray(data)) {
    let missing0;
    if (data.kind === void 0 && (missing0 = "kind")) {
      const err0 = {};
      if (vErrors === null) {
        vErrors = [err0];
      } else {
        vErrors.push(err0);
      }
      errors++;
    } else {
      if (data.kind !== void 0) {
        if ("activate" !== data.kind) {
          const err1 = {};
          if (vErrors === null) {
            vErrors = [err1];
          } else {
            vErrors.push(err1);
          }
          errors++;
        }
      }
    }
  }
  var _valid0 = _errs3 === errors;
  errors = _errs2;
  if (vErrors !== null) {
    if (_errs2) {
      vErrors.length = _errs2;
    } else {
      vErrors = null;
    }
  }
  if (_valid0) {
    const _errs5 = errors;
    const _errs6 = errors;
    const _errs7 = errors;
    if (data && typeof data == "object" && !Array.isArray(data)) {
      let missing1;
      if (data.rollback === void 0 && (missing1 = "rollback")) {
        const err2 = {};
        if (vErrors === null) {
          vErrors = [err2];
        } else {
          vErrors.push(err2);
        }
        errors++;
      }
    }
    var valid3 = _errs7 === errors;
    if (valid3) {
      const err3 = { instancePath, schemaPath: "#/allOf/0/then/not", keyword: "not", params: {}, message: "must NOT be valid" };
      if (vErrors === null) {
        vErrors = [err3];
      } else {
        vErrors.push(err3);
      }
      errors++;
    } else {
      errors = _errs6;
      if (vErrors !== null) {
        if (_errs6) {
          vErrors.length = _errs6;
        } else {
          vErrors = null;
        }
      }
    }
    if (data && typeof data == "object" && !Array.isArray(data)) {
      if (data.releaseId === void 0) {
        const err4 = { instancePath, schemaPath: "#/allOf/0/then/required", keyword: "required", params: { missingProperty: "releaseId" }, message: "must have required property 'releaseId'" };
        if (vErrors === null) {
          vErrors = [err4];
        } else {
          vErrors.push(err4);
        }
        errors++;
      }
    }
    var _valid0 = _errs5 === errors;
    valid1 = _valid0;
  }
  if (!valid1) {
    const err5 = { instancePath, schemaPath: "#/allOf/0/if", keyword: "if", params: { failingKeyword: "then" }, message: 'must match "then" schema' };
    if (vErrors === null) {
      vErrors = [err5];
    } else {
      vErrors.push(err5);
    }
    errors++;
  }
  const _errs9 = errors;
  let valid4 = true;
  const _errs10 = errors;
  if (data && typeof data == "object" && !Array.isArray(data)) {
    let missing2;
    if (data.kind === void 0 && (missing2 = "kind")) {
      const err6 = {};
      if (vErrors === null) {
        vErrors = [err6];
      } else {
        vErrors.push(err6);
      }
      errors++;
    } else {
      if (data.kind !== void 0) {
        if ("rollback" !== data.kind) {
          const err7 = {};
          if (vErrors === null) {
            vErrors = [err7];
          } else {
            vErrors.push(err7);
          }
          errors++;
        }
      }
    }
  }
  var _valid1 = _errs10 === errors;
  errors = _errs9;
  if (vErrors !== null) {
    if (_errs9) {
      vErrors.length = _errs9;
    } else {
      vErrors = null;
    }
  }
  if (_valid1) {
    const _errs12 = errors;
    const _errs13 = errors;
    const _errs14 = errors;
    if (data && typeof data == "object" && !Array.isArray(data)) {
      let missing3;
      if (data.releaseId === void 0 && (missing3 = "releaseId")) {
        const err8 = {};
        if (vErrors === null) {
          vErrors = [err8];
        } else {
          vErrors.push(err8);
        }
        errors++;
      }
    }
    var valid6 = _errs14 === errors;
    if (valid6) {
      const err9 = { instancePath, schemaPath: "#/allOf/1/then/not", keyword: "not", params: {}, message: "must NOT be valid" };
      if (vErrors === null) {
        vErrors = [err9];
      } else {
        vErrors.push(err9);
      }
      errors++;
    } else {
      errors = _errs13;
      if (vErrors !== null) {
        if (_errs13) {
          vErrors.length = _errs13;
        } else {
          vErrors = null;
        }
      }
    }
    if (data && typeof data == "object" && !Array.isArray(data)) {
      if (data.rollback === void 0) {
        const err10 = { instancePath, schemaPath: "#/allOf/1/then/required", keyword: "required", params: { missingProperty: "rollback" }, message: "must have required property 'rollback'" };
        if (vErrors === null) {
          vErrors = [err10];
        } else {
          vErrors.push(err10);
        }
        errors++;
      }
    }
    var _valid1 = _errs12 === errors;
    valid4 = _valid1;
  }
  if (!valid4) {
    const err11 = { instancePath, schemaPath: "#/allOf/1/if", keyword: "if", params: { failingKeyword: "then" }, message: 'must match "then" schema' };
    if (vErrors === null) {
      vErrors = [err11];
    } else {
      vErrors.push(err11);
    }
    errors++;
  }
  if (data && typeof data == "object" && !Array.isArray(data)) {
    if (data.kind === void 0) {
      const err12 = { instancePath, schemaPath: "#/required", keyword: "required", params: { missingProperty: "kind" }, message: "must have required property 'kind'" };
      if (vErrors === null) {
        vErrors = [err12];
      } else {
        vErrors.push(err12);
      }
      errors++;
    }
    for (const key0 in data) {
      if (!(key0 === "kind" || key0 === "releaseId" || key0 === "rollback")) {
        const err13 = { instancePath, schemaPath: "#/additionalProperties", keyword: "additionalProperties", params: { additionalProperty: key0 }, message: "must NOT have additional properties" };
        if (vErrors === null) {
          vErrors = [err13];
        } else {
          vErrors.push(err13);
        }
        errors++;
      }
    }
    if (data.kind !== void 0) {
      let data2 = data.kind;
      if (!(data2 === "activate" || data2 === "rollback")) {
        const err14 = { instancePath: instancePath + "/kind", schemaPath: "#/properties/kind/enum", keyword: "enum", params: { allowedValues: schema85.properties.kind.enum }, message: "must be equal to one of the allowed values" };
        if (vErrors === null) {
          vErrors = [err14];
        } else {
          vErrors.push(err14);
        }
        errors++;
      }
    }
    if (data.releaseId !== void 0) {
      let data3 = data.releaseId;
      if (typeof data3 === "string") {
        if (func1(data3) < 1) {
          const err15 = { instancePath: instancePath + "/releaseId", schemaPath: "#/properties/releaseId/minLength", keyword: "minLength", params: { limit: 1 }, message: "must NOT have fewer than 1 characters" };
          if (vErrors === null) {
            vErrors = [err15];
          } else {
            vErrors.push(err15);
          }
          errors++;
        }
      } else {
        const err16 = { instancePath: instancePath + "/releaseId", schemaPath: "#/properties/releaseId/type", keyword: "type", params: { type: "string" }, message: "must be string" };
        if (vErrors === null) {
          vErrors = [err16];
        } else {
          vErrors.push(err16);
        }
        errors++;
      }
    }
    if (data.rollback !== void 0) {
      let data4 = data.rollback;
      if (data4 && typeof data4 == "object" && !Array.isArray(data4)) {
        if (data4.request_id === void 0) {
          const err17 = { instancePath: instancePath + "/rollback", schemaPath: "RollbackDraft.schema.json/required", keyword: "required", params: { missingProperty: "request_id" }, message: "must have required property 'request_id'" };
          if (vErrors === null) {
            vErrors = [err17];
          } else {
            vErrors.push(err17);
          }
          errors++;
        }
        if (data4.requested_at === void 0) {
          const err18 = { instancePath: instancePath + "/rollback", schemaPath: "RollbackDraft.schema.json/required", keyword: "required", params: { missingProperty: "requested_at" }, message: "must have required property 'requested_at'" };
          if (vErrors === null) {
            vErrors = [err18];
          } else {
            vErrors.push(err18);
          }
          errors++;
        }
        if (data4.from_release_id === void 0) {
          const err19 = { instancePath: instancePath + "/rollback", schemaPath: "RollbackDraft.schema.json/required", keyword: "required", params: { missingProperty: "from_release_id" }, message: "must have required property 'from_release_id'" };
          if (vErrors === null) {
            vErrors = [err19];
          } else {
            vErrors.push(err19);
          }
          errors++;
        }
        if (data4.to_release_id === void 0) {
          const err20 = { instancePath: instancePath + "/rollback", schemaPath: "RollbackDraft.schema.json/required", keyword: "required", params: { missingProperty: "to_release_id" }, message: "must have required property 'to_release_id'" };
          if (vErrors === null) {
            vErrors = [err20];
          } else {
            vErrors.push(err20);
          }
          errors++;
        }
        if (data4.reason === void 0) {
          const err21 = { instancePath: instancePath + "/rollback", schemaPath: "RollbackDraft.schema.json/required", keyword: "required", params: { missingProperty: "reason" }, message: "must have required property 'reason'" };
          if (vErrors === null) {
            vErrors = [err21];
          } else {
            vErrors.push(err21);
          }
          errors++;
        }
        if (data4.evidence_refs === void 0) {
          const err22 = { instancePath: instancePath + "/rollback", schemaPath: "RollbackDraft.schema.json/required", keyword: "required", params: { missingProperty: "evidence_refs" }, message: "must have required property 'evidence_refs'" };
          if (vErrors === null) {
            vErrors = [err22];
          } else {
            vErrors.push(err22);
          }
          errors++;
        }
        for (const key1 in data4) {
          if (!(key1 === "request_id" || key1 === "requested_at" || key1 === "from_release_id" || key1 === "to_release_id" || key1 === "reason" || key1 === "evidence_refs")) {
            const err23 = { instancePath: instancePath + "/rollback", schemaPath: "RollbackDraft.schema.json/additionalProperties", keyword: "additionalProperties", params: { additionalProperty: key1 }, message: "must NOT have additional properties" };
            if (vErrors === null) {
              vErrors = [err23];
            } else {
              vErrors.push(err23);
            }
            errors++;
          }
        }
        if (data4.request_id !== void 0) {
          let data5 = data4.request_id;
          if (typeof data5 === "string") {
            if (func1(data5) < 1) {
              const err24 = { instancePath: instancePath + "/rollback/request_id", schemaPath: "RollbackDraft.schema.json/properties/request_id/minLength", keyword: "minLength", params: { limit: 1 }, message: "must NOT have fewer than 1 characters" };
              if (vErrors === null) {
                vErrors = [err24];
              } else {
                vErrors.push(err24);
              }
              errors++;
            }
          } else {
            const err25 = { instancePath: instancePath + "/rollback/request_id", schemaPath: "RollbackDraft.schema.json/properties/request_id/type", keyword: "type", params: { type: "string" }, message: "must be string" };
            if (vErrors === null) {
              vErrors = [err25];
            } else {
              vErrors.push(err25);
            }
            errors++;
          }
        }
        if (data4.requested_at !== void 0) {
          let data6 = data4.requested_at;
          if (typeof data6 === "string") {
            if (func1(data6) < 1) {
              const err26 = { instancePath: instancePath + "/rollback/requested_at", schemaPath: "RollbackDraft.schema.json/properties/requested_at/minLength", keyword: "minLength", params: { limit: 1 }, message: "must NOT have fewer than 1 characters" };
              if (vErrors === null) {
                vErrors = [err26];
              } else {
                vErrors.push(err26);
              }
              errors++;
            }
          } else {
            const err27 = { instancePath: instancePath + "/rollback/requested_at", schemaPath: "RollbackDraft.schema.json/properties/requested_at/type", keyword: "type", params: { type: "string" }, message: "must be string" };
            if (vErrors === null) {
              vErrors = [err27];
            } else {
              vErrors.push(err27);
            }
            errors++;
          }
        }
        if (data4.from_release_id !== void 0) {
          let data7 = data4.from_release_id;
          if (typeof data7 === "string") {
            if (func1(data7) < 1) {
              const err28 = { instancePath: instancePath + "/rollback/from_release_id", schemaPath: "RollbackDraft.schema.json/properties/from_release_id/minLength", keyword: "minLength", params: { limit: 1 }, message: "must NOT have fewer than 1 characters" };
              if (vErrors === null) {
                vErrors = [err28];
              } else {
                vErrors.push(err28);
              }
              errors++;
            }
          } else {
            const err29 = { instancePath: instancePath + "/rollback/from_release_id", schemaPath: "RollbackDraft.schema.json/properties/from_release_id/type", keyword: "type", params: { type: "string" }, message: "must be string" };
            if (vErrors === null) {
              vErrors = [err29];
            } else {
              vErrors.push(err29);
            }
            errors++;
          }
        }
        if (data4.to_release_id !== void 0) {
          let data8 = data4.to_release_id;
          if (typeof data8 === "string") {
            if (func1(data8) < 1) {
              const err30 = { instancePath: instancePath + "/rollback/to_release_id", schemaPath: "RollbackDraft.schema.json/properties/to_release_id/minLength", keyword: "minLength", params: { limit: 1 }, message: "must NOT have fewer than 1 characters" };
              if (vErrors === null) {
                vErrors = [err30];
              } else {
                vErrors.push(err30);
              }
              errors++;
            }
          } else {
            const err31 = { instancePath: instancePath + "/rollback/to_release_id", schemaPath: "RollbackDraft.schema.json/properties/to_release_id/type", keyword: "type", params: { type: "string" }, message: "must be string" };
            if (vErrors === null) {
              vErrors = [err31];
            } else {
              vErrors.push(err31);
            }
            errors++;
          }
        }
        if (data4.reason !== void 0) {
          let data9 = data4.reason;
          if (typeof data9 === "string") {
            if (func1(data9) < 1) {
              const err32 = { instancePath: instancePath + "/rollback/reason", schemaPath: "RollbackDraft.schema.json/properties/reason/minLength", keyword: "minLength", params: { limit: 1 }, message: "must NOT have fewer than 1 characters" };
              if (vErrors === null) {
                vErrors = [err32];
              } else {
                vErrors.push(err32);
              }
              errors++;
            }
          } else {
            const err33 = { instancePath: instancePath + "/rollback/reason", schemaPath: "RollbackDraft.schema.json/properties/reason/type", keyword: "type", params: { type: "string" }, message: "must be string" };
            if (vErrors === null) {
              vErrors = [err33];
            } else {
              vErrors.push(err33);
            }
            errors++;
          }
        }
        if (data4.evidence_refs !== void 0) {
          let data10 = data4.evidence_refs;
          if (Array.isArray(data10)) {
            if (data10.length < 1) {
              const err34 = { instancePath: instancePath + "/rollback/evidence_refs", schemaPath: "RollbackDraft.schema.json/properties/evidence_refs/minItems", keyword: "minItems", params: { limit: 1 }, message: "must NOT have fewer than 1 items" };
              if (vErrors === null) {
                vErrors = [err34];
              } else {
                vErrors.push(err34);
              }
              errors++;
            }
            const len0 = data10.length;
            for (let i0 = 0; i0 < len0; i0++) {
              let data11 = data10[i0];
              if (typeof data11 === "string") {
                if (func1(data11) < 1) {
                  const err35 = { instancePath: instancePath + "/rollback/evidence_refs/" + i0, schemaPath: "RollbackDraft.schema.json/properties/evidence_refs/items/minLength", keyword: "minLength", params: { limit: 1 }, message: "must NOT have fewer than 1 characters" };
                  if (vErrors === null) {
                    vErrors = [err35];
                  } else {
                    vErrors.push(err35);
                  }
                  errors++;
                }
              } else {
                const err36 = { instancePath: instancePath + "/rollback/evidence_refs/" + i0, schemaPath: "RollbackDraft.schema.json/properties/evidence_refs/items/type", keyword: "type", params: { type: "string" }, message: "must be string" };
                if (vErrors === null) {
                  vErrors = [err36];
                } else {
                  vErrors.push(err36);
                }
                errors++;
              }
            }
          } else {
            const err37 = { instancePath: instancePath + "/rollback/evidence_refs", schemaPath: "RollbackDraft.schema.json/properties/evidence_refs/type", keyword: "type", params: { type: "array" }, message: "must be array" };
            if (vErrors === null) {
              vErrors = [err37];
            } else {
              vErrors.push(err37);
            }
            errors++;
          }
        }
      } else {
        const err38 = { instancePath: instancePath + "/rollback", schemaPath: "RollbackDraft.schema.json/type", keyword: "type", params: { type: "object" }, message: "must be object" };
        if (vErrors === null) {
          vErrors = [err38];
        } else {
          vErrors.push(err38);
        }
        errors++;
      }
    }
  } else {
    const err39 = { instancePath, schemaPath: "#/type", keyword: "type", params: { type: "object" }, message: "must be object" };
    if (vErrors === null) {
      vErrors = [err39];
    } else {
      vErrors.push(err39);
    }
    errors++;
  }
  validate64.errors = vErrors;
  return errors === 0;
}
validate64.evaluated = { "props": true, "dynamicProps": false, "dynamicItems": false };
exports.OpsRequestInput = validate65;
var schema87 = { "$schema": "https://json-schema.org/draft/2020-12/schema", "$id": "OpsRequestInput.schema.json", "title": "OpsRequestInput", "description": "ops_request\uC758 \uC785\uB825: \uB9B4\uB9AC\uC2A4 \uC6B4\uC601 \uD654\uBA74\uC758 \uD655\uC778 \uB2E8\uACC4 \uD3FC. \uB864\uBC31\uC5D0\uB294 \uC0AC\uC720, \uADFC\uAC70 ID \uD558\uB098 \uC774\uC0C1, \uD604\uC7AC \uD65C\uC131 \uB9B4\uB9AC\uC2A4\uAC00 \uD544\uC694\uD558\uB2E4. requestId\uC640 requestedAt\uC740 \uD638\uCD9C\uC790\uAC00 \uC815\uD574 \uB118\uAE34\uB2E4(\uAC19\uC740 \uC785\uB825\uC774\uBA74 \uAC19\uC740 \uCD9C\uB825).", "type": "object", "required": ["kind", "target", "reason", "evidenceText", "requestId", "requestedAt", "pointerReleaseId"], "properties": { "kind": { "enum": ["activate", "rollback"] }, "target": { "type": "string", "minLength": 1 }, "reason": { "type": "string" }, "evidenceText": { "type": "string" }, "requestId": { "type": "string", "minLength": 1 }, "requestedAt": { "type": "string", "minLength": 1 }, "pointerReleaseId": { "type": ["string", "null"] } }, "additionalProperties": false, "if": { "properties": { "kind": { "const": "rollback" } }, "required": ["kind"] }, "then": { "properties": { "reason": { "pattern": "\\S" }, "evidenceText": { "pattern": "[^\\s,]" }, "pointerReleaseId": { "type": "string", "minLength": 1 } } } };
var pattern21 = new RegExp("[^\\s,]", "u");
function validate65(data, { instancePath = "", parentData, parentDataProperty, rootData = data, dynamicAnchors = {} } = {}) {
  ;
  let vErrors = null;
  let errors = 0;
  const evaluated0 = validate65.evaluated;
  if (evaluated0.dynamicProps) {
    evaluated0.props = void 0;
  }
  if (evaluated0.dynamicItems) {
    evaluated0.items = void 0;
  }
  const _errs1 = errors;
  let valid0 = true;
  const _errs2 = errors;
  if (data && typeof data == "object" && !Array.isArray(data)) {
    let missing0;
    if (data.kind === void 0 && (missing0 = "kind")) {
      const err0 = {};
      if (vErrors === null) {
        vErrors = [err0];
      } else {
        vErrors.push(err0);
      }
      errors++;
    } else {
      if (data.kind !== void 0) {
        if ("rollback" !== data.kind) {
          const err1 = {};
          if (vErrors === null) {
            vErrors = [err1];
          } else {
            vErrors.push(err1);
          }
          errors++;
        }
      }
    }
  }
  var _valid0 = _errs2 === errors;
  errors = _errs1;
  if (vErrors !== null) {
    if (_errs1) {
      vErrors.length = _errs1;
    } else {
      vErrors = null;
    }
  }
  if (_valid0) {
    const _errs4 = errors;
    if (data && typeof data == "object" && !Array.isArray(data)) {
      if (data.reason !== void 0) {
        let data1 = data.reason;
        if (typeof data1 === "string") {
          if (!pattern6.test(data1)) {
            const err2 = { instancePath: instancePath + "/reason", schemaPath: "#/then/properties/reason/pattern", keyword: "pattern", params: { pattern: "\\S" }, message: 'must match pattern "\\S"' };
            if (vErrors === null) {
              vErrors = [err2];
            } else {
              vErrors.push(err2);
            }
            errors++;
          }
        }
      }
      if (data.evidenceText !== void 0) {
        let data2 = data.evidenceText;
        if (typeof data2 === "string") {
          if (!pattern21.test(data2)) {
            const err3 = { instancePath: instancePath + "/evidenceText", schemaPath: "#/then/properties/evidenceText/pattern", keyword: "pattern", params: { pattern: "[^\\s,]" }, message: 'must match pattern "[^\\s,]"' };
            if (vErrors === null) {
              vErrors = [err3];
            } else {
              vErrors.push(err3);
            }
            errors++;
          }
        }
      }
      if (data.pointerReleaseId !== void 0) {
        let data3 = data.pointerReleaseId;
        if (typeof data3 === "string") {
          if (func1(data3) < 1) {
            const err4 = { instancePath: instancePath + "/pointerReleaseId", schemaPath: "#/then/properties/pointerReleaseId/minLength", keyword: "minLength", params: { limit: 1 }, message: "must NOT have fewer than 1 characters" };
            if (vErrors === null) {
              vErrors = [err4];
            } else {
              vErrors.push(err4);
            }
            errors++;
          }
        } else {
          const err5 = { instancePath: instancePath + "/pointerReleaseId", schemaPath: "#/then/properties/pointerReleaseId/type", keyword: "type", params: { type: "string" }, message: "must be string" };
          if (vErrors === null) {
            vErrors = [err5];
          } else {
            vErrors.push(err5);
          }
          errors++;
        }
      }
    }
    var _valid0 = _errs4 === errors;
    valid0 = _valid0;
    if (valid0) {
      var props0 = {};
      props0.reason = true;
      props0.evidenceText = true;
      props0.pointerReleaseId = true;
      props0.kind = true;
    }
  }
  if (!valid0) {
    const err6 = { instancePath, schemaPath: "#/if", keyword: "if", params: { failingKeyword: "then" }, message: 'must match "then" schema' };
    if (vErrors === null) {
      vErrors = [err6];
    } else {
      vErrors.push(err6);
    }
    errors++;
  }
  if (data && typeof data == "object" && !Array.isArray(data)) {
    if (data.kind === void 0) {
      const err7 = { instancePath, schemaPath: "#/required", keyword: "required", params: { missingProperty: "kind" }, message: "must have required property 'kind'" };
      if (vErrors === null) {
        vErrors = [err7];
      } else {
        vErrors.push(err7);
      }
      errors++;
    }
    if (data.target === void 0) {
      const err8 = { instancePath, schemaPath: "#/required", keyword: "required", params: { missingProperty: "target" }, message: "must have required property 'target'" };
      if (vErrors === null) {
        vErrors = [err8];
      } else {
        vErrors.push(err8);
      }
      errors++;
    }
    if (data.reason === void 0) {
      const err9 = { instancePath, schemaPath: "#/required", keyword: "required", params: { missingProperty: "reason" }, message: "must have required property 'reason'" };
      if (vErrors === null) {
        vErrors = [err9];
      } else {
        vErrors.push(err9);
      }
      errors++;
    }
    if (data.evidenceText === void 0) {
      const err10 = { instancePath, schemaPath: "#/required", keyword: "required", params: { missingProperty: "evidenceText" }, message: "must have required property 'evidenceText'" };
      if (vErrors === null) {
        vErrors = [err10];
      } else {
        vErrors.push(err10);
      }
      errors++;
    }
    if (data.requestId === void 0) {
      const err11 = { instancePath, schemaPath: "#/required", keyword: "required", params: { missingProperty: "requestId" }, message: "must have required property 'requestId'" };
      if (vErrors === null) {
        vErrors = [err11];
      } else {
        vErrors.push(err11);
      }
      errors++;
    }
    if (data.requestedAt === void 0) {
      const err12 = { instancePath, schemaPath: "#/required", keyword: "required", params: { missingProperty: "requestedAt" }, message: "must have required property 'requestedAt'" };
      if (vErrors === null) {
        vErrors = [err12];
      } else {
        vErrors.push(err12);
      }
      errors++;
    }
    if (data.pointerReleaseId === void 0) {
      const err13 = { instancePath, schemaPath: "#/required", keyword: "required", params: { missingProperty: "pointerReleaseId" }, message: "must have required property 'pointerReleaseId'" };
      if (vErrors === null) {
        vErrors = [err13];
      } else {
        vErrors.push(err13);
      }
      errors++;
    }
    for (const key0 in data) {
      if (!(key0 === "kind" || key0 === "target" || key0 === "reason" || key0 === "evidenceText" || key0 === "requestId" || key0 === "requestedAt" || key0 === "pointerReleaseId")) {
        const err14 = { instancePath, schemaPath: "#/additionalProperties", keyword: "additionalProperties", params: { additionalProperty: key0 }, message: "must NOT have additional properties" };
        if (vErrors === null) {
          vErrors = [err14];
        } else {
          vErrors.push(err14);
        }
        errors++;
      }
    }
    if (data.kind !== void 0) {
      let data4 = data.kind;
      if (!(data4 === "activate" || data4 === "rollback")) {
        const err15 = { instancePath: instancePath + "/kind", schemaPath: "#/properties/kind/enum", keyword: "enum", params: { allowedValues: schema87.properties.kind.enum }, message: "must be equal to one of the allowed values" };
        if (vErrors === null) {
          vErrors = [err15];
        } else {
          vErrors.push(err15);
        }
        errors++;
      }
    }
    if (data.target !== void 0) {
      let data5 = data.target;
      if (typeof data5 === "string") {
        if (func1(data5) < 1) {
          const err16 = { instancePath: instancePath + "/target", schemaPath: "#/properties/target/minLength", keyword: "minLength", params: { limit: 1 }, message: "must NOT have fewer than 1 characters" };
          if (vErrors === null) {
            vErrors = [err16];
          } else {
            vErrors.push(err16);
          }
          errors++;
        }
      } else {
        const err17 = { instancePath: instancePath + "/target", schemaPath: "#/properties/target/type", keyword: "type", params: { type: "string" }, message: "must be string" };
        if (vErrors === null) {
          vErrors = [err17];
        } else {
          vErrors.push(err17);
        }
        errors++;
      }
    }
    if (data.reason !== void 0) {
      if (typeof data.reason !== "string") {
        const err18 = { instancePath: instancePath + "/reason", schemaPath: "#/properties/reason/type", keyword: "type", params: { type: "string" }, message: "must be string" };
        if (vErrors === null) {
          vErrors = [err18];
        } else {
          vErrors.push(err18);
        }
        errors++;
      }
    }
    if (data.evidenceText !== void 0) {
      if (typeof data.evidenceText !== "string") {
        const err19 = { instancePath: instancePath + "/evidenceText", schemaPath: "#/properties/evidenceText/type", keyword: "type", params: { type: "string" }, message: "must be string" };
        if (vErrors === null) {
          vErrors = [err19];
        } else {
          vErrors.push(err19);
        }
        errors++;
      }
    }
    if (data.requestId !== void 0) {
      let data8 = data.requestId;
      if (typeof data8 === "string") {
        if (func1(data8) < 1) {
          const err20 = { instancePath: instancePath + "/requestId", schemaPath: "#/properties/requestId/minLength", keyword: "minLength", params: { limit: 1 }, message: "must NOT have fewer than 1 characters" };
          if (vErrors === null) {
            vErrors = [err20];
          } else {
            vErrors.push(err20);
          }
          errors++;
        }
      } else {
        const err21 = { instancePath: instancePath + "/requestId", schemaPath: "#/properties/requestId/type", keyword: "type", params: { type: "string" }, message: "must be string" };
        if (vErrors === null) {
          vErrors = [err21];
        } else {
          vErrors.push(err21);
        }
        errors++;
      }
    }
    if (data.requestedAt !== void 0) {
      let data9 = data.requestedAt;
      if (typeof data9 === "string") {
        if (func1(data9) < 1) {
          const err22 = { instancePath: instancePath + "/requestedAt", schemaPath: "#/properties/requestedAt/minLength", keyword: "minLength", params: { limit: 1 }, message: "must NOT have fewer than 1 characters" };
          if (vErrors === null) {
            vErrors = [err22];
          } else {
            vErrors.push(err22);
          }
          errors++;
        }
      } else {
        const err23 = { instancePath: instancePath + "/requestedAt", schemaPath: "#/properties/requestedAt/type", keyword: "type", params: { type: "string" }, message: "must be string" };
        if (vErrors === null) {
          vErrors = [err23];
        } else {
          vErrors.push(err23);
        }
        errors++;
      }
    }
    if (data.pointerReleaseId !== void 0) {
      let data10 = data.pointerReleaseId;
      if (typeof data10 !== "string" && data10 !== null) {
        const err24 = { instancePath: instancePath + "/pointerReleaseId", schemaPath: "#/properties/pointerReleaseId/type", keyword: "type", params: { type: schema87.properties.pointerReleaseId.type }, message: "must be string,null" };
        if (vErrors === null) {
          vErrors = [err24];
        } else {
          vErrors.push(err24);
        }
        errors++;
      }
    }
  } else {
    const err25 = { instancePath, schemaPath: "#/type", keyword: "type", params: { type: "object" }, message: "must be object" };
    if (vErrors === null) {
      vErrors = [err25];
    } else {
      vErrors.push(err25);
    }
    errors++;
  }
  validate65.errors = vErrors;
  return errors === 0;
}
validate65.evaluated = { "props": true, "dynamicProps": false, "dynamicItems": false };
exports.PointerRecord = validate66;
function validate66(data, { instancePath = "", parentData, parentDataProperty, rootData = data, dynamicAnchors = {} } = {}) {
  ;
  let vErrors = null;
  let errors = 0;
  const evaluated0 = validate66.evaluated;
  if (evaluated0.dynamicProps) {
    evaluated0.props = void 0;
  }
  if (evaluated0.dynamicItems) {
    evaluated0.items = void 0;
  }
  if (data && typeof data == "object" && !Array.isArray(data)) {
    if (data.release_id === void 0) {
      const err0 = { instancePath, schemaPath: "#/required", keyword: "required", params: { missingProperty: "release_id" }, message: "must have required property 'release_id'" };
      if (vErrors === null) {
        vErrors = [err0];
      } else {
        vErrors.push(err0);
      }
      errors++;
    }
    if (data.pointer_version === void 0) {
      const err1 = { instancePath, schemaPath: "#/required", keyword: "required", params: { missingProperty: "pointer_version" }, message: "must have required property 'pointer_version'" };
      if (vErrors === null) {
        vErrors = [err1];
      } else {
        vErrors.push(err1);
      }
      errors++;
    }
    if (data.activated_at === void 0) {
      const err2 = { instancePath, schemaPath: "#/required", keyword: "required", params: { missingProperty: "activated_at" }, message: "must have required property 'activated_at'" };
      if (vErrors === null) {
        vErrors = [err2];
      } else {
        vErrors.push(err2);
      }
      errors++;
    }
    if (data.cause === void 0) {
      const err3 = { instancePath, schemaPath: "#/required", keyword: "required", params: { missingProperty: "cause" }, message: "must have required property 'cause'" };
      if (vErrors === null) {
        vErrors = [err3];
      } else {
        vErrors.push(err3);
      }
      errors++;
    }
    if (data.pipeline_schema_version !== void 0) {
      if (typeof data.pipeline_schema_version !== "string") {
        const err4 = { instancePath: instancePath + "/pipeline_schema_version", schemaPath: "#/properties/pipeline_schema_version/type", keyword: "type", params: { type: "string" }, message: "must be string" };
        if (vErrors === null) {
          vErrors = [err4];
        } else {
          vErrors.push(err4);
        }
        errors++;
      }
    }
    if (data.release_id !== void 0) {
      let data1 = data.release_id;
      if (typeof data1 === "string") {
        if (func1(data1) < 1) {
          const err5 = { instancePath: instancePath + "/release_id", schemaPath: "#/properties/release_id/minLength", keyword: "minLength", params: { limit: 1 }, message: "must NOT have fewer than 1 characters" };
          if (vErrors === null) {
            vErrors = [err5];
          } else {
            vErrors.push(err5);
          }
          errors++;
        }
      } else {
        const err6 = { instancePath: instancePath + "/release_id", schemaPath: "#/properties/release_id/type", keyword: "type", params: { type: "string" }, message: "must be string" };
        if (vErrors === null) {
          vErrors = [err6];
        } else {
          vErrors.push(err6);
        }
        errors++;
      }
    }
    if (data.pointer_version !== void 0) {
      let data2 = data.pointer_version;
      if (!(typeof data2 == "number" && (!(data2 % 1) && !isNaN(data2)) && isFinite(data2))) {
        const err7 = { instancePath: instancePath + "/pointer_version", schemaPath: "#/properties/pointer_version/type", keyword: "type", params: { type: "integer" }, message: "must be integer" };
        if (vErrors === null) {
          vErrors = [err7];
        } else {
          vErrors.push(err7);
        }
        errors++;
      }
    }
    if (data.activated_at !== void 0) {
      if (typeof data.activated_at !== "string") {
        const err8 = { instancePath: instancePath + "/activated_at", schemaPath: "#/properties/activated_at/type", keyword: "type", params: { type: "string" }, message: "must be string" };
        if (vErrors === null) {
          vErrors = [err8];
        } else {
          vErrors.push(err8);
        }
        errors++;
      }
    }
    if (data.cause !== void 0) {
      if (typeof data.cause !== "string") {
        const err9 = { instancePath: instancePath + "/cause", schemaPath: "#/properties/cause/type", keyword: "type", params: { type: "string" }, message: "must be string" };
        if (vErrors === null) {
          vErrors = [err9];
        } else {
          vErrors.push(err9);
        }
        errors++;
      }
    }
    if (data.ext !== void 0) {
      let data5 = data.ext;
      if (!(data5 && typeof data5 == "object" && !Array.isArray(data5))) {
        const err10 = { instancePath: instancePath + "/ext", schemaPath: "#/properties/ext/type", keyword: "type", params: { type: "object" }, message: "must be object" };
        if (vErrors === null) {
          vErrors = [err10];
        } else {
          vErrors.push(err10);
        }
        errors++;
      }
    }
  } else {
    const err11 = { instancePath, schemaPath: "#/type", keyword: "type", params: { type: "object" }, message: "must be object" };
    if (vErrors === null) {
      vErrors = [err11];
    } else {
      vErrors.push(err11);
    }
    errors++;
  }
  validate66.errors = vErrors;
  return errors === 0;
}
validate66.evaluated = { "props": { "pipeline_schema_version": true, "release_id": true, "pointer_version": true, "activated_at": true, "cause": true, "ext": true }, "dynamicProps": false, "dynamicItems": false };
exports.PushEndpointInput = validate67;
function validate67(data, { instancePath = "", parentData, parentDataProperty, rootData = data, dynamicAnchors = {} } = {}) {
  ;
  let vErrors = null;
  let errors = 0;
  const evaluated0 = validate67.evaluated;
  if (evaluated0.dynamicProps) {
    evaluated0.props = void 0;
  }
  if (evaluated0.dynamicItems) {
    evaluated0.items = void 0;
  }
  if (data && typeof data == "object" && !Array.isArray(data)) {
    if (data.endpoint === void 0) {
      const err0 = { instancePath, schemaPath: "#/required", keyword: "required", params: { missingProperty: "endpoint" }, message: "must have required property 'endpoint'" };
      if (vErrors === null) {
        vErrors = [err0];
      } else {
        vErrors.push(err0);
      }
      errors++;
    }
    for (const key0 in data) {
      if (!(key0 === "endpoint")) {
        const err1 = { instancePath, schemaPath: "#/additionalProperties", keyword: "additionalProperties", params: { additionalProperty: key0 }, message: "must NOT have additional properties" };
        if (vErrors === null) {
          vErrors = [err1];
        } else {
          vErrors.push(err1);
        }
        errors++;
      }
    }
    if (data.endpoint !== void 0) {
      let data0 = data.endpoint;
      if (typeof data0 === "string") {
        if (func1(data0) < 1) {
          const err2 = { instancePath: instancePath + "/endpoint", schemaPath: "#/properties/endpoint/minLength", keyword: "minLength", params: { limit: 1 }, message: "must NOT have fewer than 1 characters" };
          if (vErrors === null) {
            vErrors = [err2];
          } else {
            vErrors.push(err2);
          }
          errors++;
        }
      } else {
        const err3 = { instancePath: instancePath + "/endpoint", schemaPath: "#/properties/endpoint/type", keyword: "type", params: { type: "string" }, message: "must be string" };
        if (vErrors === null) {
          vErrors = [err3];
        } else {
          vErrors.push(err3);
        }
        errors++;
      }
    }
  } else {
    const err4 = { instancePath, schemaPath: "#/type", keyword: "type", params: { type: "object" }, message: "must be object" };
    if (vErrors === null) {
      vErrors = [err4];
    } else {
      vErrors.push(err4);
    }
    errors++;
  }
  validate67.errors = vErrors;
  return errors === 0;
}
validate67.evaluated = { "props": true, "dynamicProps": false, "dynamicItems": false };
exports.PushNotice = validate68;
var schema90 = { "$schema": "https://json-schema.org/draft/2020-12/schema", "$id": "PushNotice.schema.json", "title": "PushNotice", "description": "push_notice\uC758 \uCD9C\uB825: \uC11C\uBE44\uC2A4 \uC6CC\uCEE4\uAC00 \uB744\uC6B8 \uC54C\uB9BC. sessionId\uAC00 \uC788\uC73C\uBA74 \uD074\uB9AD\uC774 \uACB0\uACFC \uC0C1\uC138\uB85C \uAC00\uACE0, \uC5C6\uC73C\uBA74 \uACB0\uACFC \uBAA9\uB85D\uC73C\uB85C \uAC04\uB2E4.", "type": "object", "required": ["title", "body", "tag", "sessionId"], "properties": { "title": { "type": "string", "minLength": 1 }, "body": { "type": "string" }, "tag": { "type": "string", "minLength": 1 }, "sessionId": { "type": ["string", "null"] } }, "additionalProperties": false };
function validate68(data, { instancePath = "", parentData, parentDataProperty, rootData = data, dynamicAnchors = {} } = {}) {
  ;
  let vErrors = null;
  let errors = 0;
  const evaluated0 = validate68.evaluated;
  if (evaluated0.dynamicProps) {
    evaluated0.props = void 0;
  }
  if (evaluated0.dynamicItems) {
    evaluated0.items = void 0;
  }
  if (data && typeof data == "object" && !Array.isArray(data)) {
    if (data.title === void 0) {
      const err0 = { instancePath, schemaPath: "#/required", keyword: "required", params: { missingProperty: "title" }, message: "must have required property 'title'" };
      if (vErrors === null) {
        vErrors = [err0];
      } else {
        vErrors.push(err0);
      }
      errors++;
    }
    if (data.body === void 0) {
      const err1 = { instancePath, schemaPath: "#/required", keyword: "required", params: { missingProperty: "body" }, message: "must have required property 'body'" };
      if (vErrors === null) {
        vErrors = [err1];
      } else {
        vErrors.push(err1);
      }
      errors++;
    }
    if (data.tag === void 0) {
      const err2 = { instancePath, schemaPath: "#/required", keyword: "required", params: { missingProperty: "tag" }, message: "must have required property 'tag'" };
      if (vErrors === null) {
        vErrors = [err2];
      } else {
        vErrors.push(err2);
      }
      errors++;
    }
    if (data.sessionId === void 0) {
      const err3 = { instancePath, schemaPath: "#/required", keyword: "required", params: { missingProperty: "sessionId" }, message: "must have required property 'sessionId'" };
      if (vErrors === null) {
        vErrors = [err3];
      } else {
        vErrors.push(err3);
      }
      errors++;
    }
    for (const key0 in data) {
      if (!(key0 === "title" || key0 === "body" || key0 === "tag" || key0 === "sessionId")) {
        const err4 = { instancePath, schemaPath: "#/additionalProperties", keyword: "additionalProperties", params: { additionalProperty: key0 }, message: "must NOT have additional properties" };
        if (vErrors === null) {
          vErrors = [err4];
        } else {
          vErrors.push(err4);
        }
        errors++;
      }
    }
    if (data.title !== void 0) {
      let data0 = data.title;
      if (typeof data0 === "string") {
        if (func1(data0) < 1) {
          const err5 = { instancePath: instancePath + "/title", schemaPath: "#/properties/title/minLength", keyword: "minLength", params: { limit: 1 }, message: "must NOT have fewer than 1 characters" };
          if (vErrors === null) {
            vErrors = [err5];
          } else {
            vErrors.push(err5);
          }
          errors++;
        }
      } else {
        const err6 = { instancePath: instancePath + "/title", schemaPath: "#/properties/title/type", keyword: "type", params: { type: "string" }, message: "must be string" };
        if (vErrors === null) {
          vErrors = [err6];
        } else {
          vErrors.push(err6);
        }
        errors++;
      }
    }
    if (data.body !== void 0) {
      if (typeof data.body !== "string") {
        const err7 = { instancePath: instancePath + "/body", schemaPath: "#/properties/body/type", keyword: "type", params: { type: "string" }, message: "must be string" };
        if (vErrors === null) {
          vErrors = [err7];
        } else {
          vErrors.push(err7);
        }
        errors++;
      }
    }
    if (data.tag !== void 0) {
      let data2 = data.tag;
      if (typeof data2 === "string") {
        if (func1(data2) < 1) {
          const err8 = { instancePath: instancePath + "/tag", schemaPath: "#/properties/tag/minLength", keyword: "minLength", params: { limit: 1 }, message: "must NOT have fewer than 1 characters" };
          if (vErrors === null) {
            vErrors = [err8];
          } else {
            vErrors.push(err8);
          }
          errors++;
        }
      } else {
        const err9 = { instancePath: instancePath + "/tag", schemaPath: "#/properties/tag/type", keyword: "type", params: { type: "string" }, message: "must be string" };
        if (vErrors === null) {
          vErrors = [err9];
        } else {
          vErrors.push(err9);
        }
        errors++;
      }
    }
    if (data.sessionId !== void 0) {
      let data3 = data.sessionId;
      if (typeof data3 !== "string" && data3 !== null) {
        const err10 = { instancePath: instancePath + "/sessionId", schemaPath: "#/properties/sessionId/type", keyword: "type", params: { type: schema90.properties.sessionId.type }, message: "must be string,null" };
        if (vErrors === null) {
          vErrors = [err10];
        } else {
          vErrors.push(err10);
        }
        errors++;
      }
    }
  } else {
    const err11 = { instancePath, schemaPath: "#/type", keyword: "type", params: { type: "object" }, message: "must be object" };
    if (vErrors === null) {
      vErrors = [err11];
    } else {
      vErrors.push(err11);
    }
    errors++;
  }
  validate68.errors = vErrors;
  return errors === 0;
}
validate68.evaluated = { "props": true, "dynamicProps": false, "dynamicItems": false };
exports.PushSubscriptionInput = validate69;
function validate69(data, { instancePath = "", parentData, parentDataProperty, rootData = data, dynamicAnchors = {} } = {}) {
  ;
  let vErrors = null;
  let errors = 0;
  const evaluated0 = validate69.evaluated;
  if (evaluated0.dynamicProps) {
    evaluated0.props = void 0;
  }
  if (evaluated0.dynamicItems) {
    evaluated0.items = void 0;
  }
  if (data && typeof data == "object" && !Array.isArray(data)) {
    if (data.endpoint === void 0) {
      const err0 = { instancePath, schemaPath: "#/required", keyword: "required", params: { missingProperty: "endpoint" }, message: "must have required property 'endpoint'" };
      if (vErrors === null) {
        vErrors = [err0];
      } else {
        vErrors.push(err0);
      }
      errors++;
    }
    if (data.keys === void 0) {
      const err1 = { instancePath, schemaPath: "#/required", keyword: "required", params: { missingProperty: "keys" }, message: "must have required property 'keys'" };
      if (vErrors === null) {
        vErrors = [err1];
      } else {
        vErrors.push(err1);
      }
      errors++;
    }
    if (data.endpoint !== void 0) {
      let data0 = data.endpoint;
      if (typeof data0 === "string") {
        if (func1(data0) < 1) {
          const err2 = { instancePath: instancePath + "/endpoint", schemaPath: "#/properties/endpoint/minLength", keyword: "minLength", params: { limit: 1 }, message: "must NOT have fewer than 1 characters" };
          if (vErrors === null) {
            vErrors = [err2];
          } else {
            vErrors.push(err2);
          }
          errors++;
        }
      } else {
        const err3 = { instancePath: instancePath + "/endpoint", schemaPath: "#/properties/endpoint/type", keyword: "type", params: { type: "string" }, message: "must be string" };
        if (vErrors === null) {
          vErrors = [err3];
        } else {
          vErrors.push(err3);
        }
        errors++;
      }
    }
    if (data.keys !== void 0) {
      let data1 = data.keys;
      if (data1 && typeof data1 == "object" && !Array.isArray(data1)) {
        if (data1.p256dh === void 0) {
          const err4 = { instancePath: instancePath + "/keys", schemaPath: "#/properties/keys/required", keyword: "required", params: { missingProperty: "p256dh" }, message: "must have required property 'p256dh'" };
          if (vErrors === null) {
            vErrors = [err4];
          } else {
            vErrors.push(err4);
          }
          errors++;
        }
        if (data1.auth === void 0) {
          const err5 = { instancePath: instancePath + "/keys", schemaPath: "#/properties/keys/required", keyword: "required", params: { missingProperty: "auth" }, message: "must have required property 'auth'" };
          if (vErrors === null) {
            vErrors = [err5];
          } else {
            vErrors.push(err5);
          }
          errors++;
        }
        if (data1.p256dh !== void 0) {
          let data2 = data1.p256dh;
          if (typeof data2 === "string") {
            if (func1(data2) < 1) {
              const err6 = { instancePath: instancePath + "/keys/p256dh", schemaPath: "#/properties/keys/properties/p256dh/minLength", keyword: "minLength", params: { limit: 1 }, message: "must NOT have fewer than 1 characters" };
              if (vErrors === null) {
                vErrors = [err6];
              } else {
                vErrors.push(err6);
              }
              errors++;
            }
          } else {
            const err7 = { instancePath: instancePath + "/keys/p256dh", schemaPath: "#/properties/keys/properties/p256dh/type", keyword: "type", params: { type: "string" }, message: "must be string" };
            if (vErrors === null) {
              vErrors = [err7];
            } else {
              vErrors.push(err7);
            }
            errors++;
          }
        }
        if (data1.auth !== void 0) {
          let data3 = data1.auth;
          if (typeof data3 === "string") {
            if (func1(data3) < 1) {
              const err8 = { instancePath: instancePath + "/keys/auth", schemaPath: "#/properties/keys/properties/auth/minLength", keyword: "minLength", params: { limit: 1 }, message: "must NOT have fewer than 1 characters" };
              if (vErrors === null) {
                vErrors = [err8];
              } else {
                vErrors.push(err8);
              }
              errors++;
            }
          } else {
            const err9 = { instancePath: instancePath + "/keys/auth", schemaPath: "#/properties/keys/properties/auth/type", keyword: "type", params: { type: "string" }, message: "must be string" };
            if (vErrors === null) {
              vErrors = [err9];
            } else {
              vErrors.push(err9);
            }
            errors++;
          }
        }
      } else {
        const err10 = { instancePath: instancePath + "/keys", schemaPath: "#/properties/keys/type", keyword: "type", params: { type: "object" }, message: "must be object" };
        if (vErrors === null) {
          vErrors = [err10];
        } else {
          vErrors.push(err10);
        }
        errors++;
      }
    }
  } else {
    const err11 = { instancePath, schemaPath: "#/type", keyword: "type", params: { type: "object" }, message: "must be object" };
    if (vErrors === null) {
      vErrors = [err11];
    } else {
      vErrors.push(err11);
    }
    errors++;
  }
  validate69.errors = vErrors;
  return errors === 0;
}
validate69.evaluated = { "props": { "endpoint": true, "keys": true }, "dynamicProps": false, "dynamicItems": false };
exports.QuestionSetRef = validate70;
function validate70(data, { instancePath = "", parentData, parentDataProperty, rootData = data, dynamicAnchors = {} } = {}) {
  ;
  let vErrors = null;
  let errors = 0;
  const evaluated0 = validate70.evaluated;
  if (evaluated0.dynamicProps) {
    evaluated0.props = void 0;
  }
  if (evaluated0.dynamicItems) {
    evaluated0.items = void 0;
  }
  if (data && typeof data == "object" && !Array.isArray(data)) {
    if (data.id === void 0) {
      const err0 = { instancePath, schemaPath: "#/required", keyword: "required", params: { missingProperty: "id" }, message: "must have required property 'id'" };
      if (vErrors === null) {
        vErrors = [err0];
      } else {
        vErrors.push(err0);
      }
      errors++;
    }
    if (data.version === void 0) {
      const err1 = { instancePath, schemaPath: "#/required", keyword: "required", params: { missingProperty: "version" }, message: "must have required property 'version'" };
      if (vErrors === null) {
        vErrors = [err1];
      } else {
        vErrors.push(err1);
      }
      errors++;
    }
    if (data.id !== void 0) {
      let data0 = data.id;
      if (typeof data0 === "string") {
        if (func1(data0) < 1) {
          const err2 = { instancePath: instancePath + "/id", schemaPath: "#/properties/id/minLength", keyword: "minLength", params: { limit: 1 }, message: "must NOT have fewer than 1 characters" };
          if (vErrors === null) {
            vErrors = [err2];
          } else {
            vErrors.push(err2);
          }
          errors++;
        }
      } else {
        const err3 = { instancePath: instancePath + "/id", schemaPath: "#/properties/id/type", keyword: "type", params: { type: "string" }, message: "must be string" };
        if (vErrors === null) {
          vErrors = [err3];
        } else {
          vErrors.push(err3);
        }
        errors++;
      }
    }
    if (data.version !== void 0) {
      if (typeof data.version !== "string") {
        const err4 = { instancePath: instancePath + "/version", schemaPath: "#/properties/version/type", keyword: "type", params: { type: "string" }, message: "must be string" };
        if (vErrors === null) {
          vErrors = [err4];
        } else {
          vErrors.push(err4);
        }
        errors++;
      }
    }
    if (data.title !== void 0) {
      if (typeof data.title !== "string") {
        const err5 = { instancePath: instancePath + "/title", schemaPath: "#/properties/title/type", keyword: "type", params: { type: "string" }, message: "must be string" };
        if (vErrors === null) {
          vErrors = [err5];
        } else {
          vErrors.push(err5);
        }
        errors++;
      }
    }
    if (data.content_hash !== void 0) {
      if (typeof data.content_hash !== "string") {
        const err6 = { instancePath: instancePath + "/content_hash", schemaPath: "#/properties/content_hash/type", keyword: "type", params: { type: "string" }, message: "must be string" };
        if (vErrors === null) {
          vErrors = [err6];
        } else {
          vErrors.push(err6);
        }
        errors++;
      }
    }
  } else {
    const err7 = { instancePath, schemaPath: "#/type", keyword: "type", params: { type: "object" }, message: "must be object" };
    if (vErrors === null) {
      vErrors = [err7];
    } else {
      vErrors.push(err7);
    }
    errors++;
  }
  validate70.errors = vErrors;
  return errors === 0;
}
validate70.evaluated = { "props": { "id": true, "version": true, "title": true, "content_hash": true }, "dynamicProps": false, "dynamicItems": false };
exports.ReleaseCandidates = validate71;
function validate72(data, { instancePath = "", parentData, parentDataProperty, rootData = data, dynamicAnchors = {} } = {}) {
  ;
  let vErrors = null;
  let errors = 0;
  const evaluated0 = validate72.evaluated;
  if (evaluated0.dynamicProps) {
    evaluated0.props = void 0;
  }
  if (evaluated0.dynamicItems) {
    evaluated0.items = void 0;
  }
  if (data && typeof data == "object" && !Array.isArray(data)) {
    if (data.release_id === void 0) {
      const err0 = { instancePath, schemaPath: "#/required", keyword: "required", params: { missingProperty: "release_id" }, message: "must have required property 'release_id'" };
      if (vErrors === null) {
        vErrors = [err0];
      } else {
        vErrors.push(err0);
      }
      errors++;
    }
    if (data.created_at === void 0) {
      const err1 = { instancePath, schemaPath: "#/required", keyword: "required", params: { missingProperty: "created_at" }, message: "must have required property 'created_at'" };
      if (vErrors === null) {
        vErrors = [err1];
      } else {
        vErrors.push(err1);
      }
      errors++;
    }
    if (data.gate_decision_id === void 0) {
      const err2 = { instancePath, schemaPath: "#/required", keyword: "required", params: { missingProperty: "gate_decision_id" }, message: "must have required property 'gate_decision_id'" };
      if (vErrors === null) {
        vErrors = [err2];
      } else {
        vErrors.push(err2);
      }
      errors++;
    }
    if (data.release_id !== void 0) {
      let data0 = data.release_id;
      if (typeof data0 === "string") {
        if (func1(data0) < 1) {
          const err3 = { instancePath: instancePath + "/release_id", schemaPath: "#/properties/release_id/minLength", keyword: "minLength", params: { limit: 1 }, message: "must NOT have fewer than 1 characters" };
          if (vErrors === null) {
            vErrors = [err3];
          } else {
            vErrors.push(err3);
          }
          errors++;
        }
      } else {
        const err4 = { instancePath: instancePath + "/release_id", schemaPath: "#/properties/release_id/type", keyword: "type", params: { type: "string" }, message: "must be string" };
        if (vErrors === null) {
          vErrors = [err4];
        } else {
          vErrors.push(err4);
        }
        errors++;
      }
    }
    if (data.created_at !== void 0) {
      if (typeof data.created_at !== "string") {
        const err5 = { instancePath: instancePath + "/created_at", schemaPath: "#/properties/created_at/type", keyword: "type", params: { type: "string" }, message: "must be string" };
        if (vErrors === null) {
          vErrors = [err5];
        } else {
          vErrors.push(err5);
        }
        errors++;
      }
    }
    if (data.gate_decision_id !== void 0) {
      if (typeof data.gate_decision_id !== "string") {
        const err6 = { instancePath: instancePath + "/gate_decision_id", schemaPath: "#/properties/gate_decision_id/type", keyword: "type", params: { type: "string" }, message: "must be string" };
        if (vErrors === null) {
          vErrors = [err6];
        } else {
          vErrors.push(err6);
        }
        errors++;
      }
    }
    if (data.lora_a !== void 0) {
      let data3 = data.lora_a;
      if (data3 && typeof data3 == "object" && !Array.isArray(data3)) {
        if (data3.id === void 0) {
          const err7 = { instancePath: instancePath + "/lora_a", schemaPath: "ArtifactRefRow.schema.json/required", keyword: "required", params: { missingProperty: "id" }, message: "must have required property 'id'" };
          if (vErrors === null) {
            vErrors = [err7];
          } else {
            vErrors.push(err7);
          }
          errors++;
        }
        if (data3.version === void 0) {
          const err8 = { instancePath: instancePath + "/lora_a", schemaPath: "ArtifactRefRow.schema.json/required", keyword: "required", params: { missingProperty: "version" }, message: "must have required property 'version'" };
          if (vErrors === null) {
            vErrors = [err8];
          } else {
            vErrors.push(err8);
          }
          errors++;
        }
        if (data3.content_hash === void 0) {
          const err9 = { instancePath: instancePath + "/lora_a", schemaPath: "ArtifactRefRow.schema.json/required", keyword: "required", params: { missingProperty: "content_hash" }, message: "must have required property 'content_hash'" };
          if (vErrors === null) {
            vErrors = [err9];
          } else {
            vErrors.push(err9);
          }
          errors++;
        }
        if (data3.id !== void 0) {
          if (typeof data3.id !== "string") {
            const err10 = { instancePath: instancePath + "/lora_a/id", schemaPath: "ArtifactRefRow.schema.json/properties/id/type", keyword: "type", params: { type: "string" }, message: "must be string" };
            if (vErrors === null) {
              vErrors = [err10];
            } else {
              vErrors.push(err10);
            }
            errors++;
          }
        }
        if (data3.version !== void 0) {
          if (typeof data3.version !== "string") {
            const err11 = { instancePath: instancePath + "/lora_a/version", schemaPath: "ArtifactRefRow.schema.json/properties/version/type", keyword: "type", params: { type: "string" }, message: "must be string" };
            if (vErrors === null) {
              vErrors = [err11];
            } else {
              vErrors.push(err11);
            }
            errors++;
          }
        }
        if (data3.content_hash !== void 0) {
          if (typeof data3.content_hash !== "string") {
            const err12 = { instancePath: instancePath + "/lora_a/content_hash", schemaPath: "ArtifactRefRow.schema.json/properties/content_hash/type", keyword: "type", params: { type: "string" }, message: "must be string" };
            if (vErrors === null) {
              vErrors = [err12];
            } else {
              vErrors.push(err12);
            }
            errors++;
          }
        }
      } else {
        const err13 = { instancePath: instancePath + "/lora_a", schemaPath: "ArtifactRefRow.schema.json/type", keyword: "type", params: { type: "object" }, message: "must be object" };
        if (vErrors === null) {
          vErrors = [err13];
        } else {
          vErrors.push(err13);
        }
        errors++;
      }
    }
    if (data.lora_b !== void 0) {
      let data7 = data.lora_b;
      if (data7 && typeof data7 == "object" && !Array.isArray(data7)) {
        if (data7.id === void 0) {
          const err14 = { instancePath: instancePath + "/lora_b", schemaPath: "ArtifactRefRow.schema.json/required", keyword: "required", params: { missingProperty: "id" }, message: "must have required property 'id'" };
          if (vErrors === null) {
            vErrors = [err14];
          } else {
            vErrors.push(err14);
          }
          errors++;
        }
        if (data7.version === void 0) {
          const err15 = { instancePath: instancePath + "/lora_b", schemaPath: "ArtifactRefRow.schema.json/required", keyword: "required", params: { missingProperty: "version" }, message: "must have required property 'version'" };
          if (vErrors === null) {
            vErrors = [err15];
          } else {
            vErrors.push(err15);
          }
          errors++;
        }
        if (data7.content_hash === void 0) {
          const err16 = { instancePath: instancePath + "/lora_b", schemaPath: "ArtifactRefRow.schema.json/required", keyword: "required", params: { missingProperty: "content_hash" }, message: "must have required property 'content_hash'" };
          if (vErrors === null) {
            vErrors = [err16];
          } else {
            vErrors.push(err16);
          }
          errors++;
        }
        if (data7.id !== void 0) {
          if (typeof data7.id !== "string") {
            const err17 = { instancePath: instancePath + "/lora_b/id", schemaPath: "ArtifactRefRow.schema.json/properties/id/type", keyword: "type", params: { type: "string" }, message: "must be string" };
            if (vErrors === null) {
              vErrors = [err17];
            } else {
              vErrors.push(err17);
            }
            errors++;
          }
        }
        if (data7.version !== void 0) {
          if (typeof data7.version !== "string") {
            const err18 = { instancePath: instancePath + "/lora_b/version", schemaPath: "ArtifactRefRow.schema.json/properties/version/type", keyword: "type", params: { type: "string" }, message: "must be string" };
            if (vErrors === null) {
              vErrors = [err18];
            } else {
              vErrors.push(err18);
            }
            errors++;
          }
        }
        if (data7.content_hash !== void 0) {
          if (typeof data7.content_hash !== "string") {
            const err19 = { instancePath: instancePath + "/lora_b/content_hash", schemaPath: "ArtifactRefRow.schema.json/properties/content_hash/type", keyword: "type", params: { type: "string" }, message: "must be string" };
            if (vErrors === null) {
              vErrors = [err19];
            } else {
              vErrors.push(err19);
            }
            errors++;
          }
        }
      } else {
        const err20 = { instancePath: instancePath + "/lora_b", schemaPath: "ArtifactRefRow.schema.json/type", keyword: "type", params: { type: "object" }, message: "must be object" };
        if (vErrors === null) {
          vErrors = [err20];
        } else {
          vErrors.push(err20);
        }
        errors++;
      }
    }
    if (data.question_sets !== void 0) {
      let data11 = data.question_sets;
      if (Array.isArray(data11)) {
        const len0 = data11.length;
        for (let i0 = 0; i0 < len0; i0++) {
          let data12 = data11[i0];
          if (data12 && typeof data12 == "object" && !Array.isArray(data12)) {
            if (data12.id === void 0) {
              const err21 = { instancePath: instancePath + "/question_sets/" + i0, schemaPath: "QuestionSetRef.schema.json/required", keyword: "required", params: { missingProperty: "id" }, message: "must have required property 'id'" };
              if (vErrors === null) {
                vErrors = [err21];
              } else {
                vErrors.push(err21);
              }
              errors++;
            }
            if (data12.version === void 0) {
              const err22 = { instancePath: instancePath + "/question_sets/" + i0, schemaPath: "QuestionSetRef.schema.json/required", keyword: "required", params: { missingProperty: "version" }, message: "must have required property 'version'" };
              if (vErrors === null) {
                vErrors = [err22];
              } else {
                vErrors.push(err22);
              }
              errors++;
            }
            if (data12.id !== void 0) {
              let data13 = data12.id;
              if (typeof data13 === "string") {
                if (func1(data13) < 1) {
                  const err23 = { instancePath: instancePath + "/question_sets/" + i0 + "/id", schemaPath: "QuestionSetRef.schema.json/properties/id/minLength", keyword: "minLength", params: { limit: 1 }, message: "must NOT have fewer than 1 characters" };
                  if (vErrors === null) {
                    vErrors = [err23];
                  } else {
                    vErrors.push(err23);
                  }
                  errors++;
                }
              } else {
                const err24 = { instancePath: instancePath + "/question_sets/" + i0 + "/id", schemaPath: "QuestionSetRef.schema.json/properties/id/type", keyword: "type", params: { type: "string" }, message: "must be string" };
                if (vErrors === null) {
                  vErrors = [err24];
                } else {
                  vErrors.push(err24);
                }
                errors++;
              }
            }
            if (data12.version !== void 0) {
              if (typeof data12.version !== "string") {
                const err25 = { instancePath: instancePath + "/question_sets/" + i0 + "/version", schemaPath: "QuestionSetRef.schema.json/properties/version/type", keyword: "type", params: { type: "string" }, message: "must be string" };
                if (vErrors === null) {
                  vErrors = [err25];
                } else {
                  vErrors.push(err25);
                }
                errors++;
              }
            }
            if (data12.title !== void 0) {
              if (typeof data12.title !== "string") {
                const err26 = { instancePath: instancePath + "/question_sets/" + i0 + "/title", schemaPath: "QuestionSetRef.schema.json/properties/title/type", keyword: "type", params: { type: "string" }, message: "must be string" };
                if (vErrors === null) {
                  vErrors = [err26];
                } else {
                  vErrors.push(err26);
                }
                errors++;
              }
            }
            if (data12.content_hash !== void 0) {
              if (typeof data12.content_hash !== "string") {
                const err27 = { instancePath: instancePath + "/question_sets/" + i0 + "/content_hash", schemaPath: "QuestionSetRef.schema.json/properties/content_hash/type", keyword: "type", params: { type: "string" }, message: "must be string" };
                if (vErrors === null) {
                  vErrors = [err27];
                } else {
                  vErrors.push(err27);
                }
                errors++;
              }
            }
          } else {
            const err28 = { instancePath: instancePath + "/question_sets/" + i0, schemaPath: "QuestionSetRef.schema.json/type", keyword: "type", params: { type: "object" }, message: "must be object" };
            if (vErrors === null) {
              vErrors = [err28];
            } else {
              vErrors.push(err28);
            }
            errors++;
          }
        }
      } else {
        const err29 = { instancePath: instancePath + "/question_sets", schemaPath: "#/properties/question_sets/type", keyword: "type", params: { type: "array" }, message: "must be array" };
        if (vErrors === null) {
          vErrors = [err29];
        } else {
          vErrors.push(err29);
        }
        errors++;
      }
    }
  } else {
    const err30 = { instancePath, schemaPath: "#/type", keyword: "type", params: { type: "object" }, message: "must be object" };
    if (vErrors === null) {
      vErrors = [err30];
    } else {
      vErrors.push(err30);
    }
    errors++;
  }
  validate72.errors = vErrors;
  return errors === 0;
}
validate72.evaluated = { "props": { "release_id": true, "created_at": true, "gate_decision_id": true, "lora_a": true, "lora_b": true, "question_sets": true }, "dynamicProps": false, "dynamicItems": false };
function validate71(data, { instancePath = "", parentData, parentDataProperty, rootData = data, dynamicAnchors = {} } = {}) {
  ;
  let vErrors = null;
  let errors = 0;
  const evaluated0 = validate71.evaluated;
  if (evaluated0.dynamicProps) {
    evaluated0.props = void 0;
  }
  if (evaluated0.dynamicItems) {
    evaluated0.items = void 0;
  }
  if (data && typeof data == "object" && !Array.isArray(data)) {
    if (data.activate === void 0) {
      const err0 = { instancePath, schemaPath: "#/required", keyword: "required", params: { missingProperty: "activate" }, message: "must have required property 'activate'" };
      if (vErrors === null) {
        vErrors = [err0];
      } else {
        vErrors.push(err0);
      }
      errors++;
    }
    if (data.rollback === void 0) {
      const err1 = { instancePath, schemaPath: "#/required", keyword: "required", params: { missingProperty: "rollback" }, message: "must have required property 'rollback'" };
      if (vErrors === null) {
        vErrors = [err1];
      } else {
        vErrors.push(err1);
      }
      errors++;
    }
    for (const key0 in data) {
      if (!(key0 === "activate" || key0 === "rollback")) {
        const err2 = { instancePath, schemaPath: "#/additionalProperties", keyword: "additionalProperties", params: { additionalProperty: key0 }, message: "must NOT have additional properties" };
        if (vErrors === null) {
          vErrors = [err2];
        } else {
          vErrors.push(err2);
        }
        errors++;
      }
    }
    if (data.activate !== void 0) {
      let data0 = data.activate;
      if (Array.isArray(data0)) {
        const len0 = data0.length;
        for (let i0 = 0; i0 < len0; i0++) {
          if (!validate72(data0[i0], { instancePath: instancePath + "/activate/" + i0, parentData: data0, parentDataProperty: i0, rootData, dynamicAnchors })) {
            vErrors = vErrors === null ? validate72.errors : vErrors.concat(validate72.errors);
            errors = vErrors.length;
          }
        }
      } else {
        const err3 = { instancePath: instancePath + "/activate", schemaPath: "#/properties/activate/type", keyword: "type", params: { type: "array" }, message: "must be array" };
        if (vErrors === null) {
          vErrors = [err3];
        } else {
          vErrors.push(err3);
        }
        errors++;
      }
    }
    if (data.rollback !== void 0) {
      let data2 = data.rollback;
      if (Array.isArray(data2)) {
        const len1 = data2.length;
        for (let i1 = 0; i1 < len1; i1++) {
          if (!validate72(data2[i1], { instancePath: instancePath + "/rollback/" + i1, parentData: data2, parentDataProperty: i1, rootData, dynamicAnchors })) {
            vErrors = vErrors === null ? validate72.errors : vErrors.concat(validate72.errors);
            errors = vErrors.length;
          }
        }
      } else {
        const err4 = { instancePath: instancePath + "/rollback", schemaPath: "#/properties/rollback/type", keyword: "type", params: { type: "array" }, message: "must be array" };
        if (vErrors === null) {
          vErrors = [err4];
        } else {
          vErrors.push(err4);
        }
        errors++;
      }
    }
  } else {
    const err5 = { instancePath, schemaPath: "#/type", keyword: "type", params: { type: "object" }, message: "must be object" };
    if (vErrors === null) {
      vErrors = [err5];
    } else {
      vErrors.push(err5);
    }
    errors++;
  }
  validate71.errors = vErrors;
  return errors === 0;
}
validate71.evaluated = { "props": true, "dynamicProps": false, "dynamicItems": false };
exports.ReleaseCandidatesInput = validate75;
function validate75(data, { instancePath = "", parentData, parentDataProperty, rootData = data, dynamicAnchors = {} } = {}) {
  ;
  let vErrors = null;
  let errors = 0;
  const evaluated0 = validate75.evaluated;
  if (evaluated0.dynamicProps) {
    evaluated0.props = void 0;
  }
  if (evaluated0.dynamicItems) {
    evaluated0.items = void 0;
  }
  if (data && typeof data == "object" && !Array.isArray(data)) {
    if (data.releases === void 0) {
      const err0 = { instancePath, schemaPath: "#/required", keyword: "required", params: { missingProperty: "releases" }, message: "must have required property 'releases'" };
      if (vErrors === null) {
        vErrors = [err0];
      } else {
        vErrors.push(err0);
      }
      errors++;
    }
    if (data.pointer === void 0) {
      const err1 = { instancePath, schemaPath: "#/required", keyword: "required", params: { missingProperty: "pointer" }, message: "must have required property 'pointer'" };
      if (vErrors === null) {
        vErrors = [err1];
      } else {
        vErrors.push(err1);
      }
      errors++;
    }
    for (const key0 in data) {
      if (!(key0 === "releases" || key0 === "pointer")) {
        const err2 = { instancePath, schemaPath: "#/additionalProperties", keyword: "additionalProperties", params: { additionalProperty: key0 }, message: "must NOT have additional properties" };
        if (vErrors === null) {
          vErrors = [err2];
        } else {
          vErrors.push(err2);
        }
        errors++;
      }
    }
    if (data.releases !== void 0) {
      let data0 = data.releases;
      if (Array.isArray(data0)) {
        const len0 = data0.length;
        for (let i0 = 0; i0 < len0; i0++) {
          if (!validate72(data0[i0], { instancePath: instancePath + "/releases/" + i0, parentData: data0, parentDataProperty: i0, rootData, dynamicAnchors })) {
            vErrors = vErrors === null ? validate72.errors : vErrors.concat(validate72.errors);
            errors = vErrors.length;
          }
        }
      } else {
        const err3 = { instancePath: instancePath + "/releases", schemaPath: "#/properties/releases/type", keyword: "type", params: { type: "array" }, message: "must be array" };
        if (vErrors === null) {
          vErrors = [err3];
        } else {
          vErrors.push(err3);
        }
        errors++;
      }
    }
    if (data.pointer !== void 0) {
      let data2 = data.pointer;
      const _errs6 = errors;
      let valid3 = false;
      let passing0 = null;
      const _errs7 = errors;
      if (data2 && typeof data2 == "object" && !Array.isArray(data2)) {
        if (data2.release_id === void 0) {
          const err4 = { instancePath: instancePath + "/pointer", schemaPath: "PointerRecord.schema.json/required", keyword: "required", params: { missingProperty: "release_id" }, message: "must have required property 'release_id'" };
          if (vErrors === null) {
            vErrors = [err4];
          } else {
            vErrors.push(err4);
          }
          errors++;
        }
        if (data2.pointer_version === void 0) {
          const err5 = { instancePath: instancePath + "/pointer", schemaPath: "PointerRecord.schema.json/required", keyword: "required", params: { missingProperty: "pointer_version" }, message: "must have required property 'pointer_version'" };
          if (vErrors === null) {
            vErrors = [err5];
          } else {
            vErrors.push(err5);
          }
          errors++;
        }
        if (data2.activated_at === void 0) {
          const err6 = { instancePath: instancePath + "/pointer", schemaPath: "PointerRecord.schema.json/required", keyword: "required", params: { missingProperty: "activated_at" }, message: "must have required property 'activated_at'" };
          if (vErrors === null) {
            vErrors = [err6];
          } else {
            vErrors.push(err6);
          }
          errors++;
        }
        if (data2.cause === void 0) {
          const err7 = { instancePath: instancePath + "/pointer", schemaPath: "PointerRecord.schema.json/required", keyword: "required", params: { missingProperty: "cause" }, message: "must have required property 'cause'" };
          if (vErrors === null) {
            vErrors = [err7];
          } else {
            vErrors.push(err7);
          }
          errors++;
        }
        if (data2.pipeline_schema_version !== void 0) {
          if (typeof data2.pipeline_schema_version !== "string") {
            const err8 = { instancePath: instancePath + "/pointer/pipeline_schema_version", schemaPath: "PointerRecord.schema.json/properties/pipeline_schema_version/type", keyword: "type", params: { type: "string" }, message: "must be string" };
            if (vErrors === null) {
              vErrors = [err8];
            } else {
              vErrors.push(err8);
            }
            errors++;
          }
        }
        if (data2.release_id !== void 0) {
          let data4 = data2.release_id;
          if (typeof data4 === "string") {
            if (func1(data4) < 1) {
              const err9 = { instancePath: instancePath + "/pointer/release_id", schemaPath: "PointerRecord.schema.json/properties/release_id/minLength", keyword: "minLength", params: { limit: 1 }, message: "must NOT have fewer than 1 characters" };
              if (vErrors === null) {
                vErrors = [err9];
              } else {
                vErrors.push(err9);
              }
              errors++;
            }
          } else {
            const err10 = { instancePath: instancePath + "/pointer/release_id", schemaPath: "PointerRecord.schema.json/properties/release_id/type", keyword: "type", params: { type: "string" }, message: "must be string" };
            if (vErrors === null) {
              vErrors = [err10];
            } else {
              vErrors.push(err10);
            }
            errors++;
          }
        }
        if (data2.pointer_version !== void 0) {
          let data5 = data2.pointer_version;
          if (!(typeof data5 == "number" && (!(data5 % 1) && !isNaN(data5)) && isFinite(data5))) {
            const err11 = { instancePath: instancePath + "/pointer/pointer_version", schemaPath: "PointerRecord.schema.json/properties/pointer_version/type", keyword: "type", params: { type: "integer" }, message: "must be integer" };
            if (vErrors === null) {
              vErrors = [err11];
            } else {
              vErrors.push(err11);
            }
            errors++;
          }
        }
        if (data2.activated_at !== void 0) {
          if (typeof data2.activated_at !== "string") {
            const err12 = { instancePath: instancePath + "/pointer/activated_at", schemaPath: "PointerRecord.schema.json/properties/activated_at/type", keyword: "type", params: { type: "string" }, message: "must be string" };
            if (vErrors === null) {
              vErrors = [err12];
            } else {
              vErrors.push(err12);
            }
            errors++;
          }
        }
        if (data2.cause !== void 0) {
          if (typeof data2.cause !== "string") {
            const err13 = { instancePath: instancePath + "/pointer/cause", schemaPath: "PointerRecord.schema.json/properties/cause/type", keyword: "type", params: { type: "string" }, message: "must be string" };
            if (vErrors === null) {
              vErrors = [err13];
            } else {
              vErrors.push(err13);
            }
            errors++;
          }
        }
        if (data2.ext !== void 0) {
          let data8 = data2.ext;
          if (!(data8 && typeof data8 == "object" && !Array.isArray(data8))) {
            const err14 = { instancePath: instancePath + "/pointer/ext", schemaPath: "PointerRecord.schema.json/properties/ext/type", keyword: "type", params: { type: "object" }, message: "must be object" };
            if (vErrors === null) {
              vErrors = [err14];
            } else {
              vErrors.push(err14);
            }
            errors++;
          }
        }
      } else {
        const err15 = { instancePath: instancePath + "/pointer", schemaPath: "PointerRecord.schema.json/type", keyword: "type", params: { type: "object" }, message: "must be object" };
        if (vErrors === null) {
          vErrors = [err15];
        } else {
          vErrors.push(err15);
        }
        errors++;
      }
      var _valid0 = _errs7 === errors;
      if (_valid0) {
        valid3 = true;
        passing0 = 0;
        var props0 = {};
        props0.pipeline_schema_version = true;
        props0.release_id = true;
        props0.pointer_version = true;
        props0.activated_at = true;
        props0.cause = true;
        props0.ext = true;
      }
      const _errs22 = errors;
      if (data2 !== null) {
        const err16 = { instancePath: instancePath + "/pointer", schemaPath: "#/properties/pointer/oneOf/1/type", keyword: "type", params: { type: "null" }, message: "must be null" };
        if (vErrors === null) {
          vErrors = [err16];
        } else {
          vErrors.push(err16);
        }
        errors++;
      }
      var _valid0 = _errs22 === errors;
      if (_valid0 && valid3) {
        valid3 = false;
        passing0 = [passing0, 1];
      } else {
        if (_valid0) {
          valid3 = true;
          passing0 = 1;
        }
      }
      if (!valid3) {
        const err17 = { instancePath: instancePath + "/pointer", schemaPath: "#/properties/pointer/oneOf", keyword: "oneOf", params: { passingSchemas: passing0 }, message: "must match exactly one schema in oneOf" };
        if (vErrors === null) {
          vErrors = [err17];
        } else {
          vErrors.push(err17);
        }
        errors++;
      } else {
        errors = _errs6;
        if (vErrors !== null) {
          if (_errs6) {
            vErrors.length = _errs6;
          } else {
            vErrors = null;
          }
        }
      }
    }
  } else {
    const err18 = { instancePath, schemaPath: "#/type", keyword: "type", params: { type: "object" }, message: "must be object" };
    if (vErrors === null) {
      vErrors = [err18];
    } else {
      vErrors.push(err18);
    }
    errors++;
  }
  validate75.errors = vErrors;
  return errors === 0;
}
validate75.evaluated = { "props": true, "dynamicProps": false, "dynamicItems": false };
exports.ReleaseList = validate77;
function validate77(data, { instancePath = "", parentData, parentDataProperty, rootData = data, dynamicAnchors = {} } = {}) {
  ;
  let vErrors = null;
  let errors = 0;
  const evaluated0 = validate77.evaluated;
  if (evaluated0.dynamicProps) {
    evaluated0.props = void 0;
  }
  if (evaluated0.dynamicItems) {
    evaluated0.items = void 0;
  }
  if (data && typeof data == "object" && !Array.isArray(data)) {
    if (data.releases === void 0) {
      const err0 = { instancePath, schemaPath: "#/required", keyword: "required", params: { missingProperty: "releases" }, message: "must have required property 'releases'" };
      if (vErrors === null) {
        vErrors = [err0];
      } else {
        vErrors.push(err0);
      }
      errors++;
    }
    for (const key0 in data) {
      if (!(key0 === "releases")) {
        const err1 = { instancePath, schemaPath: "#/additionalProperties", keyword: "additionalProperties", params: { additionalProperty: key0 }, message: "must NOT have additional properties" };
        if (vErrors === null) {
          vErrors = [err1];
        } else {
          vErrors.push(err1);
        }
        errors++;
      }
    }
    if (data.releases !== void 0) {
      let data0 = data.releases;
      if (Array.isArray(data0)) {
        const len0 = data0.length;
        for (let i0 = 0; i0 < len0; i0++) {
          if (!validate72(data0[i0], { instancePath: instancePath + "/releases/" + i0, parentData: data0, parentDataProperty: i0, rootData, dynamicAnchors })) {
            vErrors = vErrors === null ? validate72.errors : vErrors.concat(validate72.errors);
            errors = vErrors.length;
          }
        }
      } else {
        const err2 = { instancePath: instancePath + "/releases", schemaPath: "#/properties/releases/type", keyword: "type", params: { type: "array" }, message: "must be array" };
        if (vErrors === null) {
          vErrors = [err2];
        } else {
          vErrors.push(err2);
        }
        errors++;
      }
    }
  } else {
    const err3 = { instancePath, schemaPath: "#/type", keyword: "type", params: { type: "object" }, message: "must be object" };
    if (vErrors === null) {
      vErrors = [err3];
    } else {
      vErrors.push(err3);
    }
    errors++;
  }
  validate77.errors = vErrors;
  return errors === 0;
}
validate77.evaluated = { "props": true, "dynamicProps": false, "dynamicItems": false };
exports.ReleaseRow = validate72;
exports.ReportDoc = validate57;
exports.ReportView = validate79;
function validate79(data, { instancePath = "", parentData, parentDataProperty, rootData = data, dynamicAnchors = {} } = {}) {
  ;
  let vErrors = null;
  let errors = 0;
  const evaluated0 = validate79.evaluated;
  if (evaluated0.dynamicProps) {
    evaluated0.props = void 0;
  }
  if (evaluated0.dynamicItems) {
    evaluated0.items = void 0;
  }
  if (data && typeof data == "object" && !Array.isArray(data)) {
    if (data.groups === void 0) {
      const err0 = { instancePath, schemaPath: "#/required", keyword: "required", params: { missingProperty: "groups" }, message: "must have required property 'groups'" };
      if (vErrors === null) {
        vErrors = [err0];
      } else {
        vErrors.push(err0);
      }
      errors++;
    }
    if (data.sliceKinds === void 0) {
      const err1 = { instancePath, schemaPath: "#/required", keyword: "required", params: { missingProperty: "sliceKinds" }, message: "must have required property 'sliceKinds'" };
      if (vErrors === null) {
        vErrors = [err1];
      } else {
        vErrors.push(err1);
      }
      errors++;
    }
    if (data.worseCount === void 0) {
      const err2 = { instancePath, schemaPath: "#/required", keyword: "required", params: { missingProperty: "worseCount" }, message: "must have required property 'worseCount'" };
      if (vErrors === null) {
        vErrors = [err2];
      } else {
        vErrors.push(err2);
      }
      errors++;
    }
    for (const key0 in data) {
      if (!(key0 === "groups" || key0 === "sliceKinds" || key0 === "worseCount")) {
        const err3 = { instancePath, schemaPath: "#/additionalProperties", keyword: "additionalProperties", params: { additionalProperty: key0 }, message: "must NOT have additional properties" };
        if (vErrors === null) {
          vErrors = [err3];
        } else {
          vErrors.push(err3);
        }
        errors++;
      }
    }
    if (data.groups !== void 0) {
      let data0 = data.groups;
      if (Array.isArray(data0)) {
        const len0 = data0.length;
        for (let i0 = 0; i0 < len0; i0++) {
          if (!validate59(data0[i0], { instancePath: instancePath + "/groups/" + i0, parentData: data0, parentDataProperty: i0, rootData, dynamicAnchors })) {
            vErrors = vErrors === null ? validate59.errors : vErrors.concat(validate59.errors);
            errors = vErrors.length;
          }
        }
      } else {
        const err4 = { instancePath: instancePath + "/groups", schemaPath: "#/properties/groups/type", keyword: "type", params: { type: "array" }, message: "must be array" };
        if (vErrors === null) {
          vErrors = [err4];
        } else {
          vErrors.push(err4);
        }
        errors++;
      }
    }
    if (data.sliceKinds !== void 0) {
      let data2 = data.sliceKinds;
      if (Array.isArray(data2)) {
        const len1 = data2.length;
        for (let i1 = 0; i1 < len1; i1++) {
          let data3 = data2[i1];
          if (typeof data3 === "string") {
            if (func1(data3) < 1) {
              const err5 = { instancePath: instancePath + "/sliceKinds/" + i1, schemaPath: "#/properties/sliceKinds/items/minLength", keyword: "minLength", params: { limit: 1 }, message: "must NOT have fewer than 1 characters" };
              if (vErrors === null) {
                vErrors = [err5];
              } else {
                vErrors.push(err5);
              }
              errors++;
            }
          } else {
            const err6 = { instancePath: instancePath + "/sliceKinds/" + i1, schemaPath: "#/properties/sliceKinds/items/type", keyword: "type", params: { type: "string" }, message: "must be string" };
            if (vErrors === null) {
              vErrors = [err6];
            } else {
              vErrors.push(err6);
            }
            errors++;
          }
        }
      } else {
        const err7 = { instancePath: instancePath + "/sliceKinds", schemaPath: "#/properties/sliceKinds/type", keyword: "type", params: { type: "array" }, message: "must be array" };
        if (vErrors === null) {
          vErrors = [err7];
        } else {
          vErrors.push(err7);
        }
        errors++;
      }
    }
    if (data.worseCount !== void 0) {
      let data4 = data.worseCount;
      if (!(typeof data4 == "number" && (!(data4 % 1) && !isNaN(data4)) && isFinite(data4))) {
        const err8 = { instancePath: instancePath + "/worseCount", schemaPath: "#/properties/worseCount/type", keyword: "type", params: { type: "integer" }, message: "must be integer" };
        if (vErrors === null) {
          vErrors = [err8];
        } else {
          vErrors.push(err8);
        }
        errors++;
      }
      if (typeof data4 == "number" && isFinite(data4)) {
        if (data4 < 0 || isNaN(data4)) {
          const err9 = { instancePath: instancePath + "/worseCount", schemaPath: "#/properties/worseCount/minimum", keyword: "minimum", params: { comparison: ">=", limit: 0 }, message: "must be >= 0" };
          if (vErrors === null) {
            vErrors = [err9];
          } else {
            vErrors.push(err9);
          }
          errors++;
        }
      }
    }
  } else {
    const err10 = { instancePath, schemaPath: "#/type", keyword: "type", params: { type: "object" }, message: "must be object" };
    if (vErrors === null) {
      vErrors = [err10];
    } else {
      vErrors.push(err10);
    }
    errors++;
  }
  validate79.errors = vErrors;
  return errors === 0;
}
validate79.evaluated = { "props": true, "dynamicProps": false, "dynamicItems": false };
exports.ReportViewRequest = validate81;
var schema102 = { "$schema": "https://json-schema.org/draft/2020-12/schema", "$id": "ReportViewRequest.schema.json", "title": "ReportViewRequest", "description": "report_view\uC758 \uC785\uB825: \uBCF4\uACE0\uC11C\uC758 \uC9C0\uD45C \uBE44\uAD50\uB4E4\uACFC \uD654\uBA74\uC758 \uBD84\uB9AC \uAE30\uC900\xB7\uC815\uB82C.", "type": "object", "required": ["comparisons", "sliceKind", "sort"], "properties": { "comparisons": { "type": "array", "items": { "$ref": "Comparison.schema.json" } }, "sliceKind": { "type": "string", "minLength": 1 }, "sort": { "enum": ["default", "name", "candidate", "delta", "worse"] } }, "additionalProperties": false };
function validate81(data, { instancePath = "", parentData, parentDataProperty, rootData = data, dynamicAnchors = {} } = {}) {
  ;
  let vErrors = null;
  let errors = 0;
  const evaluated0 = validate81.evaluated;
  if (evaluated0.dynamicProps) {
    evaluated0.props = void 0;
  }
  if (evaluated0.dynamicItems) {
    evaluated0.items = void 0;
  }
  if (data && typeof data == "object" && !Array.isArray(data)) {
    if (data.comparisons === void 0) {
      const err0 = { instancePath, schemaPath: "#/required", keyword: "required", params: { missingProperty: "comparisons" }, message: "must have required property 'comparisons'" };
      if (vErrors === null) {
        vErrors = [err0];
      } else {
        vErrors.push(err0);
      }
      errors++;
    }
    if (data.sliceKind === void 0) {
      const err1 = { instancePath, schemaPath: "#/required", keyword: "required", params: { missingProperty: "sliceKind" }, message: "must have required property 'sliceKind'" };
      if (vErrors === null) {
        vErrors = [err1];
      } else {
        vErrors.push(err1);
      }
      errors++;
    }
    if (data.sort === void 0) {
      const err2 = { instancePath, schemaPath: "#/required", keyword: "required", params: { missingProperty: "sort" }, message: "must have required property 'sort'" };
      if (vErrors === null) {
        vErrors = [err2];
      } else {
        vErrors.push(err2);
      }
      errors++;
    }
    for (const key0 in data) {
      if (!(key0 === "comparisons" || key0 === "sliceKind" || key0 === "sort")) {
        const err3 = { instancePath, schemaPath: "#/additionalProperties", keyword: "additionalProperties", params: { additionalProperty: key0 }, message: "must NOT have additional properties" };
        if (vErrors === null) {
          vErrors = [err3];
        } else {
          vErrors.push(err3);
        }
        errors++;
      }
    }
    if (data.comparisons !== void 0) {
      let data0 = data.comparisons;
      if (Array.isArray(data0)) {
        const len0 = data0.length;
        for (let i0 = 0; i0 < len0; i0++) {
          let data1 = data0[i0];
          if (data1 && typeof data1 == "object" && !Array.isArray(data1)) {
            if (data1.role === void 0) {
              const err4 = { instancePath: instancePath + "/comparisons/" + i0, schemaPath: "Comparison.schema.json/required", keyword: "required", params: { missingProperty: "role" }, message: "must have required property 'role'" };
              if (vErrors === null) {
                vErrors = [err4];
              } else {
                vErrors.push(err4);
              }
              errors++;
            }
            if (data1.name === void 0) {
              const err5 = { instancePath: instancePath + "/comparisons/" + i0, schemaPath: "Comparison.schema.json/required", keyword: "required", params: { missingProperty: "name" }, message: "must have required property 'name'" };
              if (vErrors === null) {
                vErrors = [err5];
              } else {
                vErrors.push(err5);
              }
              errors++;
            }
            if (data1.group === void 0) {
              const err6 = { instancePath: instancePath + "/comparisons/" + i0, schemaPath: "Comparison.schema.json/required", keyword: "required", params: { missingProperty: "group" }, message: "must have required property 'group'" };
              if (vErrors === null) {
                vErrors = [err6];
              } else {
                vErrors.push(err6);
              }
              errors++;
            }
            if (data1.candidate === void 0) {
              const err7 = { instancePath: instancePath + "/comparisons/" + i0, schemaPath: "Comparison.schema.json/required", keyword: "required", params: { missingProperty: "candidate" }, message: "must have required property 'candidate'" };
              if (vErrors === null) {
                vErrors = [err7];
              } else {
                vErrors.push(err7);
              }
              errors++;
            }
            if (data1.higher_is_better === void 0) {
              const err8 = { instancePath: instancePath + "/comparisons/" + i0, schemaPath: "Comparison.schema.json/required", keyword: "required", params: { missingProperty: "higher_is_better" }, message: "must have required property 'higher_is_better'" };
              if (vErrors === null) {
                vErrors = [err8];
              } else {
                vErrors.push(err8);
              }
              errors++;
            }
            if (data1.role !== void 0) {
              if (typeof data1.role !== "string") {
                const err9 = { instancePath: instancePath + "/comparisons/" + i0 + "/role", schemaPath: "Comparison.schema.json/properties/role/type", keyword: "type", params: { type: "string" }, message: "must be string" };
                if (vErrors === null) {
                  vErrors = [err9];
                } else {
                  vErrors.push(err9);
                }
                errors++;
              }
            }
            if (data1.name !== void 0) {
              if (typeof data1.name !== "string") {
                const err10 = { instancePath: instancePath + "/comparisons/" + i0 + "/name", schemaPath: "Comparison.schema.json/properties/name/type", keyword: "type", params: { type: "string" }, message: "must be string" };
                if (vErrors === null) {
                  vErrors = [err10];
                } else {
                  vErrors.push(err10);
                }
                errors++;
              }
            }
            if (data1.group !== void 0) {
              if (typeof data1.group !== "string") {
                const err11 = { instancePath: instancePath + "/comparisons/" + i0 + "/group", schemaPath: "Comparison.schema.json/properties/group/type", keyword: "type", params: { type: "string" }, message: "must be string" };
                if (vErrors === null) {
                  vErrors = [err11];
                } else {
                  vErrors.push(err11);
                }
                errors++;
              }
            }
            if (data1.slice !== void 0) {
              let data5 = data1.slice;
              if (data5 && typeof data5 == "object" && !Array.isArray(data5)) {
                if (data5.kind === void 0) {
                  const err12 = { instancePath: instancePath + "/comparisons/" + i0 + "/slice", schemaPath: "Comparison.schema.json/properties/slice/required", keyword: "required", params: { missingProperty: "kind" }, message: "must have required property 'kind'" };
                  if (vErrors === null) {
                    vErrors = [err12];
                  } else {
                    vErrors.push(err12);
                  }
                  errors++;
                }
                if (data5.value === void 0) {
                  const err13 = { instancePath: instancePath + "/comparisons/" + i0 + "/slice", schemaPath: "Comparison.schema.json/properties/slice/required", keyword: "required", params: { missingProperty: "value" }, message: "must have required property 'value'" };
                  if (vErrors === null) {
                    vErrors = [err13];
                  } else {
                    vErrors.push(err13);
                  }
                  errors++;
                }
                if (data5.kind !== void 0) {
                  if (typeof data5.kind !== "string") {
                    const err14 = { instancePath: instancePath + "/comparisons/" + i0 + "/slice/kind", schemaPath: "Comparison.schema.json/properties/slice/properties/kind/type", keyword: "type", params: { type: "string" }, message: "must be string" };
                    if (vErrors === null) {
                      vErrors = [err14];
                    } else {
                      vErrors.push(err14);
                    }
                    errors++;
                  }
                }
                if (data5.value !== void 0) {
                  if (typeof data5.value !== "string") {
                    const err15 = { instancePath: instancePath + "/comparisons/" + i0 + "/slice/value", schemaPath: "Comparison.schema.json/properties/slice/properties/value/type", keyword: "type", params: { type: "string" }, message: "must be string" };
                    if (vErrors === null) {
                      vErrors = [err15];
                    } else {
                      vErrors.push(err15);
                    }
                    errors++;
                  }
                }
              } else {
                const err16 = { instancePath: instancePath + "/comparisons/" + i0 + "/slice", schemaPath: "Comparison.schema.json/properties/slice/type", keyword: "type", params: { type: "object" }, message: "must be object" };
                if (vErrors === null) {
                  vErrors = [err16];
                } else {
                  vErrors.push(err16);
                }
                errors++;
              }
            }
            if (data1.candidate !== void 0) {
              let data8 = data1.candidate;
              if (!(typeof data8 == "number" && isFinite(data8))) {
                const err17 = { instancePath: instancePath + "/comparisons/" + i0 + "/candidate", schemaPath: "Comparison.schema.json/properties/candidate/type", keyword: "type", params: { type: "number" }, message: "must be number" };
                if (vErrors === null) {
                  vErrors = [err17];
                } else {
                  vErrors.push(err17);
                }
                errors++;
              }
            }
            if (data1.candidate_n !== void 0) {
              let data9 = data1.candidate_n;
              if (!(typeof data9 == "number" && (!(data9 % 1) && !isNaN(data9)) && isFinite(data9))) {
                const err18 = { instancePath: instancePath + "/comparisons/" + i0 + "/candidate_n", schemaPath: "Comparison.schema.json/properties/candidate_n/type", keyword: "type", params: { type: "integer" }, message: "must be integer" };
                if (vErrors === null) {
                  vErrors = [err18];
                } else {
                  vErrors.push(err18);
                }
                errors++;
              }
              if (typeof data9 == "number" && isFinite(data9)) {
                if (data9 < 0 || isNaN(data9)) {
                  const err19 = { instancePath: instancePath + "/comparisons/" + i0 + "/candidate_n", schemaPath: "Comparison.schema.json/properties/candidate_n/minimum", keyword: "minimum", params: { comparison: ">=", limit: 0 }, message: "must be >= 0" };
                  if (vErrors === null) {
                    vErrors = [err19];
                  } else {
                    vErrors.push(err19);
                  }
                  errors++;
                }
              }
            }
            if (data1.baseline !== void 0) {
              let data10 = data1.baseline;
              if (!(typeof data10 == "number" && isFinite(data10)) && data10 !== null) {
                const err20 = { instancePath: instancePath + "/comparisons/" + i0 + "/baseline", schemaPath: "Comparison.schema.json/properties/baseline/type", keyword: "type", params: { type: schema66.properties.baseline.type }, message: "must be number,null" };
                if (vErrors === null) {
                  vErrors = [err20];
                } else {
                  vErrors.push(err20);
                }
                errors++;
              }
            }
            if (data1.baseline_n !== void 0) {
              let data11 = data1.baseline_n;
              if (!(typeof data11 == "number" && (!(data11 % 1) && !isNaN(data11)) && isFinite(data11)) && data11 !== null) {
                const err21 = { instancePath: instancePath + "/comparisons/" + i0 + "/baseline_n", schemaPath: "Comparison.schema.json/properties/baseline_n/type", keyword: "type", params: { type: schema66.properties.baseline_n.type }, message: "must be integer,null" };
                if (vErrors === null) {
                  vErrors = [err21];
                } else {
                  vErrors.push(err21);
                }
                errors++;
              }
              if (typeof data11 == "number" && isFinite(data11)) {
                if (data11 < 0 || isNaN(data11)) {
                  const err22 = { instancePath: instancePath + "/comparisons/" + i0 + "/baseline_n", schemaPath: "Comparison.schema.json/properties/baseline_n/minimum", keyword: "minimum", params: { comparison: ">=", limit: 0 }, message: "must be >= 0" };
                  if (vErrors === null) {
                    vErrors = [err22];
                  } else {
                    vErrors.push(err22);
                  }
                  errors++;
                }
              }
            }
            if (data1.delta !== void 0) {
              let data12 = data1.delta;
              if (!(typeof data12 == "number" && isFinite(data12)) && data12 !== null) {
                const err23 = { instancePath: instancePath + "/comparisons/" + i0 + "/delta", schemaPath: "Comparison.schema.json/properties/delta/type", keyword: "type", params: { type: schema66.properties.delta.type }, message: "must be number,null" };
                if (vErrors === null) {
                  vErrors = [err23];
                } else {
                  vErrors.push(err23);
                }
                errors++;
              }
            }
            if (data1.higher_is_better !== void 0) {
              if (typeof data1.higher_is_better !== "boolean") {
                const err24 = { instancePath: instancePath + "/comparisons/" + i0 + "/higher_is_better", schemaPath: "Comparison.schema.json/properties/higher_is_better/type", keyword: "type", params: { type: "boolean" }, message: "must be boolean" };
                if (vErrors === null) {
                  vErrors = [err24];
                } else {
                  vErrors.push(err24);
                }
                errors++;
              }
            }
            if (data1.worse !== void 0) {
              let data14 = data1.worse;
              if (typeof data14 !== "boolean" && data14 !== null) {
                const err25 = { instancePath: instancePath + "/comparisons/" + i0 + "/worse", schemaPath: "Comparison.schema.json/properties/worse/type", keyword: "type", params: { type: schema66.properties.worse.type }, message: "must be boolean,null" };
                if (vErrors === null) {
                  vErrors = [err25];
                } else {
                  vErrors.push(err25);
                }
                errors++;
              }
            }
          } else {
            const err26 = { instancePath: instancePath + "/comparisons/" + i0, schemaPath: "Comparison.schema.json/type", keyword: "type", params: { type: "object" }, message: "must be object" };
            if (vErrors === null) {
              vErrors = [err26];
            } else {
              vErrors.push(err26);
            }
            errors++;
          }
        }
      } else {
        const err27 = { instancePath: instancePath + "/comparisons", schemaPath: "#/properties/comparisons/type", keyword: "type", params: { type: "array" }, message: "must be array" };
        if (vErrors === null) {
          vErrors = [err27];
        } else {
          vErrors.push(err27);
        }
        errors++;
      }
    }
    if (data.sliceKind !== void 0) {
      let data15 = data.sliceKind;
      if (typeof data15 === "string") {
        if (func1(data15) < 1) {
          const err28 = { instancePath: instancePath + "/sliceKind", schemaPath: "#/properties/sliceKind/minLength", keyword: "minLength", params: { limit: 1 }, message: "must NOT have fewer than 1 characters" };
          if (vErrors === null) {
            vErrors = [err28];
          } else {
            vErrors.push(err28);
          }
          errors++;
        }
      } else {
        const err29 = { instancePath: instancePath + "/sliceKind", schemaPath: "#/properties/sliceKind/type", keyword: "type", params: { type: "string" }, message: "must be string" };
        if (vErrors === null) {
          vErrors = [err29];
        } else {
          vErrors.push(err29);
        }
        errors++;
      }
    }
    if (data.sort !== void 0) {
      let data16 = data.sort;
      if (!(data16 === "default" || data16 === "name" || data16 === "candidate" || data16 === "delta" || data16 === "worse")) {
        const err30 = { instancePath: instancePath + "/sort", schemaPath: "#/properties/sort/enum", keyword: "enum", params: { allowedValues: schema102.properties.sort.enum }, message: "must be equal to one of the allowed values" };
        if (vErrors === null) {
          vErrors = [err30];
        } else {
          vErrors.push(err30);
        }
        errors++;
      }
    }
  } else {
    const err31 = { instancePath, schemaPath: "#/type", keyword: "type", params: { type: "object" }, message: "must be object" };
    if (vErrors === null) {
      vErrors = [err31];
    } else {
      vErrors.push(err31);
    }
    errors++;
  }
  validate81.errors = vErrors;
  return errors === 0;
}
validate81.evaluated = { "props": true, "dynamicProps": false, "dynamicItems": false };
exports.ResultIdInput = validate82;
function validate82(data, { instancePath = "", parentData, parentDataProperty, rootData = data, dynamicAnchors = {} } = {}) {
  ;
  let vErrors = null;
  let errors = 0;
  const evaluated0 = validate82.evaluated;
  if (evaluated0.dynamicProps) {
    evaluated0.props = void 0;
  }
  if (evaluated0.dynamicItems) {
    evaluated0.items = void 0;
  }
  if (data && typeof data == "object" && !Array.isArray(data)) {
    if (data.sessionId === void 0) {
      const err0 = { instancePath, schemaPath: "#/required", keyword: "required", params: { missingProperty: "sessionId" }, message: "must have required property 'sessionId'" };
      if (vErrors === null) {
        vErrors = [err0];
      } else {
        vErrors.push(err0);
      }
      errors++;
    }
    for (const key0 in data) {
      if (!(key0 === "sessionId")) {
        const err1 = { instancePath, schemaPath: "#/additionalProperties", keyword: "additionalProperties", params: { additionalProperty: key0 }, message: "must NOT have additional properties" };
        if (vErrors === null) {
          vErrors = [err1];
        } else {
          vErrors.push(err1);
        }
        errors++;
      }
    }
    if (data.sessionId !== void 0) {
      let data0 = data.sessionId;
      if (typeof data0 === "string") {
        if (func1(data0) < 1) {
          const err2 = { instancePath: instancePath + "/sessionId", schemaPath: "#/properties/sessionId/minLength", keyword: "minLength", params: { limit: 1 }, message: "must NOT have fewer than 1 characters" };
          if (vErrors === null) {
            vErrors = [err2];
          } else {
            vErrors.push(err2);
          }
          errors++;
        }
      } else {
        const err3 = { instancePath: instancePath + "/sessionId", schemaPath: "#/properties/sessionId/type", keyword: "type", params: { type: "string" }, message: "must be string" };
        if (vErrors === null) {
          vErrors = [err3];
        } else {
          vErrors.push(err3);
        }
        errors++;
      }
    }
  } else {
    const err4 = { instancePath, schemaPath: "#/type", keyword: "type", params: { type: "object" }, message: "must be object" };
    if (vErrors === null) {
      vErrors = [err4];
    } else {
      vErrors.push(err4);
    }
    errors++;
  }
  validate82.errors = vErrors;
  return errors === 0;
}
validate82.evaluated = { "props": true, "dynamicProps": false, "dynamicItems": false };
exports.ResultListQuery = validate83;
function validate83(data, { instancePath = "", parentData, parentDataProperty, rootData = data, dynamicAnchors = {} } = {}) {
  ;
  let vErrors = null;
  let errors = 0;
  const evaluated0 = validate83.evaluated;
  if (evaluated0.dynamicProps) {
    evaluated0.props = void 0;
  }
  if (evaluated0.dynamicItems) {
    evaluated0.items = void 0;
  }
  if (data && typeof data == "object" && !Array.isArray(data)) {
    for (const key0 in data) {
      if (!(key0 === "status" || key0 === "updated_after" || key0 === "limit" || key0 === "cursor")) {
        const err0 = { instancePath, schemaPath: "#/additionalProperties", keyword: "additionalProperties", params: { additionalProperty: key0 }, message: "must NOT have additional properties" };
        if (vErrors === null) {
          vErrors = [err0];
        } else {
          vErrors.push(err0);
        }
        errors++;
      }
    }
    if (data.status !== void 0) {
      if (typeof data.status !== "string") {
        const err1 = { instancePath: instancePath + "/status", schemaPath: "#/properties/status/type", keyword: "type", params: { type: "string" }, message: "must be string" };
        if (vErrors === null) {
          vErrors = [err1];
        } else {
          vErrors.push(err1);
        }
        errors++;
      }
    }
    if (data.updated_after !== void 0) {
      if (typeof data.updated_after !== "string") {
        const err2 = { instancePath: instancePath + "/updated_after", schemaPath: "#/properties/updated_after/type", keyword: "type", params: { type: "string" }, message: "must be string" };
        if (vErrors === null) {
          vErrors = [err2];
        } else {
          vErrors.push(err2);
        }
        errors++;
      }
    }
    if (data.limit !== void 0) {
      let data2 = data.limit;
      if (!(typeof data2 == "number" && (!(data2 % 1) && !isNaN(data2)) && isFinite(data2))) {
        const err3 = { instancePath: instancePath + "/limit", schemaPath: "#/properties/limit/type", keyword: "type", params: { type: "integer" }, message: "must be integer" };
        if (vErrors === null) {
          vErrors = [err3];
        } else {
          vErrors.push(err3);
        }
        errors++;
      }
      if (typeof data2 == "number" && isFinite(data2)) {
        if (data2 > 200 || isNaN(data2)) {
          const err4 = { instancePath: instancePath + "/limit", schemaPath: "#/properties/limit/maximum", keyword: "maximum", params: { comparison: "<=", limit: 200 }, message: "must be <= 200" };
          if (vErrors === null) {
            vErrors = [err4];
          } else {
            vErrors.push(err4);
          }
          errors++;
        }
        if (data2 < 1 || isNaN(data2)) {
          const err5 = { instancePath: instancePath + "/limit", schemaPath: "#/properties/limit/minimum", keyword: "minimum", params: { comparison: ">=", limit: 1 }, message: "must be >= 1" };
          if (vErrors === null) {
            vErrors = [err5];
          } else {
            vErrors.push(err5);
          }
          errors++;
        }
      }
    }
    if (data.cursor !== void 0) {
      if (typeof data.cursor !== "string") {
        const err6 = { instancePath: instancePath + "/cursor", schemaPath: "#/properties/cursor/type", keyword: "type", params: { type: "string" }, message: "must be string" };
        if (vErrors === null) {
          vErrors = [err6];
        } else {
          vErrors.push(err6);
        }
        errors++;
      }
    }
  } else {
    const err7 = { instancePath, schemaPath: "#/type", keyword: "type", params: { type: "object" }, message: "must be object" };
    if (vErrors === null) {
      vErrors = [err7];
    } else {
      vErrors.push(err7);
    }
    errors++;
  }
  validate83.errors = vErrors;
  return errors === 0;
}
validate83.evaluated = { "props": true, "dynamicProps": false, "dynamicItems": false };
exports.ResultPage = validate84;
function validate84(data, { instancePath = "", parentData, parentDataProperty, rootData = data, dynamicAnchors = {} } = {}) {
  ;
  let vErrors = null;
  let errors = 0;
  const evaluated0 = validate84.evaluated;
  if (evaluated0.dynamicProps) {
    evaluated0.props = void 0;
  }
  if (evaluated0.dynamicItems) {
    evaluated0.items = void 0;
  }
  if (data && typeof data == "object" && !Array.isArray(data)) {
    if (data.items === void 0) {
      const err0 = { instancePath, schemaPath: "#/required", keyword: "required", params: { missingProperty: "items" }, message: "must have required property 'items'" };
      if (vErrors === null) {
        vErrors = [err0];
      } else {
        vErrors.push(err0);
      }
      errors++;
    }
    if (data.next_cursor === void 0) {
      const err1 = { instancePath, schemaPath: "#/required", keyword: "required", params: { missingProperty: "next_cursor" }, message: "must have required property 'next_cursor'" };
      if (vErrors === null) {
        vErrors = [err1];
      } else {
        vErrors.push(err1);
      }
      errors++;
    }
    for (const key0 in data) {
      if (!(key0 === "items" || key0 === "next_cursor")) {
        const err2 = { instancePath, schemaPath: "#/additionalProperties", keyword: "additionalProperties", params: { additionalProperty: key0 }, message: "must NOT have additional properties" };
        if (vErrors === null) {
          vErrors = [err2];
        } else {
          vErrors.push(err2);
        }
        errors++;
      }
    }
    if (data.items !== void 0) {
      let data0 = data.items;
      if (Array.isArray(data0)) {
        const len0 = data0.length;
        for (let i0 = 0; i0 < len0; i0++) {
          let data1 = data0[i0];
          if (data1 && typeof data1 == "object" && !Array.isArray(data1)) {
            if (data1.session_id === void 0) {
              const err3 = { instancePath: instancePath + "/items/" + i0, schemaPath: "ResultRecord.schema.json/required", keyword: "required", params: { missingProperty: "session_id" }, message: "must have required property 'session_id'" };
              if (vErrors === null) {
                vErrors = [err3];
              } else {
                vErrors.push(err3);
              }
              errors++;
            }
            if (data1.status === void 0) {
              const err4 = { instancePath: instancePath + "/items/" + i0, schemaPath: "ResultRecord.schema.json/required", keyword: "required", params: { missingProperty: "status" }, message: "must have required property 'status'" };
              if (vErrors === null) {
                vErrors = [err4];
              } else {
                vErrors.push(err4);
              }
              errors++;
            }
            if (data1.answers === void 0) {
              const err5 = { instancePath: instancePath + "/items/" + i0, schemaPath: "ResultRecord.schema.json/required", keyword: "required", params: { missingProperty: "answers" }, message: "must have required property 'answers'" };
              if (vErrors === null) {
                vErrors = [err5];
              } else {
                vErrors.push(err5);
              }
              errors++;
            }
            if (data1.skipped_details === void 0) {
              const err6 = { instancePath: instancePath + "/items/" + i0, schemaPath: "ResultRecord.schema.json/required", keyword: "required", params: { missingProperty: "skipped_details" }, message: "must have required property 'skipped_details'" };
              if (vErrors === null) {
                vErrors = [err6];
              } else {
                vErrors.push(err6);
              }
              errors++;
            }
            if (data1.session_id !== void 0) {
              let data2 = data1.session_id;
              if (typeof data2 === "string") {
                if (func1(data2) < 1) {
                  const err7 = { instancePath: instancePath + "/items/" + i0 + "/session_id", schemaPath: "ResultRecord.schema.json/properties/session_id/minLength", keyword: "minLength", params: { limit: 1 }, message: "must NOT have fewer than 1 characters" };
                  if (vErrors === null) {
                    vErrors = [err7];
                  } else {
                    vErrors.push(err7);
                  }
                  errors++;
                }
              } else {
                const err8 = { instancePath: instancePath + "/items/" + i0 + "/session_id", schemaPath: "ResultRecord.schema.json/properties/session_id/type", keyword: "type", params: { type: "string" }, message: "must be string" };
                if (vErrors === null) {
                  vErrors = [err8];
                } else {
                  vErrors.push(err8);
                }
                errors++;
              }
            }
            if (data1.subject_ref !== void 0) {
              let data3 = data1.subject_ref;
              const _errs10 = errors;
              let valid5 = false;
              const _errs11 = errors;
              if (typeof data3 !== "string") {
                const err9 = { instancePath: instancePath + "/items/" + i0 + "/subject_ref", schemaPath: "ResultRecord.schema.json/properties/subject_ref/anyOf/0/type", keyword: "type", params: { type: "string" }, message: "must be string" };
                if (vErrors === null) {
                  vErrors = [err9];
                } else {
                  vErrors.push(err9);
                }
                errors++;
              }
              var _valid0 = _errs11 === errors;
              valid5 = valid5 || _valid0;
              const _errs13 = errors;
              if (data3 !== null) {
                const err10 = { instancePath: instancePath + "/items/" + i0 + "/subject_ref", schemaPath: "ResultRecord.schema.json/properties/subject_ref/anyOf/1/type", keyword: "type", params: { type: "null" }, message: "must be null" };
                if (vErrors === null) {
                  vErrors = [err10];
                } else {
                  vErrors.push(err10);
                }
                errors++;
              }
              var _valid0 = _errs13 === errors;
              valid5 = valid5 || _valid0;
              if (!valid5) {
                const err11 = { instancePath: instancePath + "/items/" + i0 + "/subject_ref", schemaPath: "ResultRecord.schema.json/properties/subject_ref/anyOf", keyword: "anyOf", params: {}, message: "must match a schema in anyOf" };
                if (vErrors === null) {
                  vErrors = [err11];
                } else {
                  vErrors.push(err11);
                }
                errors++;
              } else {
                errors = _errs10;
                if (vErrors !== null) {
                  if (_errs10) {
                    vErrors.length = _errs10;
                  } else {
                    vErrors = null;
                  }
                }
              }
            }
            if (data1.status !== void 0) {
              let data4 = data1.status;
              if (typeof data4 === "string") {
                if (func1(data4) < 1) {
                  const err12 = { instancePath: instancePath + "/items/" + i0 + "/status", schemaPath: "ResultRecord.schema.json/properties/status/minLength", keyword: "minLength", params: { limit: 1 }, message: "must NOT have fewer than 1 characters" };
                  if (vErrors === null) {
                    vErrors = [err12];
                  } else {
                    vErrors.push(err12);
                  }
                  errors++;
                }
              } else {
                const err13 = { instancePath: instancePath + "/items/" + i0 + "/status", schemaPath: "ResultRecord.schema.json/properties/status/type", keyword: "type", params: { type: "string" }, message: "must be string" };
                if (vErrors === null) {
                  vErrors = [err13];
                } else {
                  vErrors.push(err13);
                }
                errors++;
              }
            }
            if (data1.started_at !== void 0) {
              let data5 = data1.started_at;
              const _errs18 = errors;
              let valid6 = false;
              const _errs19 = errors;
              if (typeof data5 !== "string") {
                const err14 = { instancePath: instancePath + "/items/" + i0 + "/started_at", schemaPath: "ResultRecord.schema.json/properties/started_at/anyOf/0/type", keyword: "type", params: { type: "string" }, message: "must be string" };
                if (vErrors === null) {
                  vErrors = [err14];
                } else {
                  vErrors.push(err14);
                }
                errors++;
              }
              var _valid1 = _errs19 === errors;
              valid6 = valid6 || _valid1;
              const _errs21 = errors;
              if (data5 !== null) {
                const err15 = { instancePath: instancePath + "/items/" + i0 + "/started_at", schemaPath: "ResultRecord.schema.json/properties/started_at/anyOf/1/type", keyword: "type", params: { type: "null" }, message: "must be null" };
                if (vErrors === null) {
                  vErrors = [err15];
                } else {
                  vErrors.push(err15);
                }
                errors++;
              }
              var _valid1 = _errs21 === errors;
              valid6 = valid6 || _valid1;
              if (!valid6) {
                const err16 = { instancePath: instancePath + "/items/" + i0 + "/started_at", schemaPath: "ResultRecord.schema.json/properties/started_at/anyOf", keyword: "anyOf", params: {}, message: "must match a schema in anyOf" };
                if (vErrors === null) {
                  vErrors = [err16];
                } else {
                  vErrors.push(err16);
                }
                errors++;
              } else {
                errors = _errs18;
                if (vErrors !== null) {
                  if (_errs18) {
                    vErrors.length = _errs18;
                  } else {
                    vErrors = null;
                  }
                }
              }
            }
            if (data1.ended_at !== void 0) {
              let data6 = data1.ended_at;
              const _errs24 = errors;
              let valid7 = false;
              const _errs25 = errors;
              if (typeof data6 !== "string") {
                const err17 = { instancePath: instancePath + "/items/" + i0 + "/ended_at", schemaPath: "ResultRecord.schema.json/properties/ended_at/anyOf/0/type", keyword: "type", params: { type: "string" }, message: "must be string" };
                if (vErrors === null) {
                  vErrors = [err17];
                } else {
                  vErrors.push(err17);
                }
                errors++;
              }
              var _valid2 = _errs25 === errors;
              valid7 = valid7 || _valid2;
              const _errs27 = errors;
              if (data6 !== null) {
                const err18 = { instancePath: instancePath + "/items/" + i0 + "/ended_at", schemaPath: "ResultRecord.schema.json/properties/ended_at/anyOf/1/type", keyword: "type", params: { type: "null" }, message: "must be null" };
                if (vErrors === null) {
                  vErrors = [err18];
                } else {
                  vErrors.push(err18);
                }
                errors++;
              }
              var _valid2 = _errs27 === errors;
              valid7 = valid7 || _valid2;
              if (!valid7) {
                const err19 = { instancePath: instancePath + "/items/" + i0 + "/ended_at", schemaPath: "ResultRecord.schema.json/properties/ended_at/anyOf", keyword: "anyOf", params: {}, message: "must match a schema in anyOf" };
                if (vErrors === null) {
                  vErrors = [err19];
                } else {
                  vErrors.push(err19);
                }
                errors++;
              } else {
                errors = _errs24;
                if (vErrors !== null) {
                  if (_errs24) {
                    vErrors.length = _errs24;
                  } else {
                    vErrors = null;
                  }
                }
              }
            }
            if (data1.release_id !== void 0) {
              let data7 = data1.release_id;
              const _errs30 = errors;
              let valid8 = false;
              const _errs31 = errors;
              if (typeof data7 !== "string") {
                const err20 = { instancePath: instancePath + "/items/" + i0 + "/release_id", schemaPath: "ResultRecord.schema.json/properties/release_id/anyOf/0/type", keyword: "type", params: { type: "string" }, message: "must be string" };
                if (vErrors === null) {
                  vErrors = [err20];
                } else {
                  vErrors.push(err20);
                }
                errors++;
              }
              var _valid3 = _errs31 === errors;
              valid8 = valid8 || _valid3;
              const _errs33 = errors;
              if (data7 !== null) {
                const err21 = { instancePath: instancePath + "/items/" + i0 + "/release_id", schemaPath: "ResultRecord.schema.json/properties/release_id/anyOf/1/type", keyword: "type", params: { type: "null" }, message: "must be null" };
                if (vErrors === null) {
                  vErrors = [err21];
                } else {
                  vErrors.push(err21);
                }
                errors++;
              }
              var _valid3 = _errs33 === errors;
              valid8 = valid8 || _valid3;
              if (!valid8) {
                const err22 = { instancePath: instancePath + "/items/" + i0 + "/release_id", schemaPath: "ResultRecord.schema.json/properties/release_id/anyOf", keyword: "anyOf", params: {}, message: "must match a schema in anyOf" };
                if (vErrors === null) {
                  vErrors = [err22];
                } else {
                  vErrors.push(err22);
                }
                errors++;
              } else {
                errors = _errs30;
                if (vErrors !== null) {
                  if (_errs30) {
                    vErrors.length = _errs30;
                  } else {
                    vErrors = null;
                  }
                }
              }
            }
            if (data1.question_bank_version !== void 0) {
              let data8 = data1.question_bank_version;
              const _errs36 = errors;
              let valid9 = false;
              const _errs37 = errors;
              if (typeof data8 !== "string") {
                const err23 = { instancePath: instancePath + "/items/" + i0 + "/question_bank_version", schemaPath: "ResultRecord.schema.json/properties/question_bank_version/anyOf/0/type", keyword: "type", params: { type: "string" }, message: "must be string" };
                if (vErrors === null) {
                  vErrors = [err23];
                } else {
                  vErrors.push(err23);
                }
                errors++;
              }
              var _valid4 = _errs37 === errors;
              valid9 = valid9 || _valid4;
              const _errs39 = errors;
              if (data8 !== null) {
                const err24 = { instancePath: instancePath + "/items/" + i0 + "/question_bank_version", schemaPath: "ResultRecord.schema.json/properties/question_bank_version/anyOf/1/type", keyword: "type", params: { type: "null" }, message: "must be null" };
                if (vErrors === null) {
                  vErrors = [err24];
                } else {
                  vErrors.push(err24);
                }
                errors++;
              }
              var _valid4 = _errs39 === errors;
              valid9 = valid9 || _valid4;
              if (!valid9) {
                const err25 = { instancePath: instancePath + "/items/" + i0 + "/question_bank_version", schemaPath: "ResultRecord.schema.json/properties/question_bank_version/anyOf", keyword: "anyOf", params: {}, message: "must match a schema in anyOf" };
                if (vErrors === null) {
                  vErrors = [err25];
                } else {
                  vErrors.push(err25);
                }
                errors++;
              } else {
                errors = _errs36;
                if (vErrors !== null) {
                  if (_errs36) {
                    vErrors.length = _errs36;
                  } else {
                    vErrors = null;
                  }
                }
              }
            }
            if (data1.question_set_id !== void 0) {
              let data9 = data1.question_set_id;
              const _errs42 = errors;
              let valid10 = false;
              const _errs43 = errors;
              if (typeof data9 !== "string") {
                const err26 = { instancePath: instancePath + "/items/" + i0 + "/question_set_id", schemaPath: "ResultRecord.schema.json/properties/question_set_id/anyOf/0/type", keyword: "type", params: { type: "string" }, message: "must be string" };
                if (vErrors === null) {
                  vErrors = [err26];
                } else {
                  vErrors.push(err26);
                }
                errors++;
              }
              var _valid5 = _errs43 === errors;
              valid10 = valid10 || _valid5;
              const _errs45 = errors;
              if (data9 !== null) {
                const err27 = { instancePath: instancePath + "/items/" + i0 + "/question_set_id", schemaPath: "ResultRecord.schema.json/properties/question_set_id/anyOf/1/type", keyword: "type", params: { type: "null" }, message: "must be null" };
                if (vErrors === null) {
                  vErrors = [err27];
                } else {
                  vErrors.push(err27);
                }
                errors++;
              }
              var _valid5 = _errs45 === errors;
              valid10 = valid10 || _valid5;
              if (!valid10) {
                const err28 = { instancePath: instancePath + "/items/" + i0 + "/question_set_id", schemaPath: "ResultRecord.schema.json/properties/question_set_id/anyOf", keyword: "anyOf", params: {}, message: "must match a schema in anyOf" };
                if (vErrors === null) {
                  vErrors = [err28];
                } else {
                  vErrors.push(err28);
                }
                errors++;
              } else {
                errors = _errs42;
                if (vErrors !== null) {
                  if (_errs42) {
                    vErrors.length = _errs42;
                  } else {
                    vErrors = null;
                  }
                }
              }
            }
            if (data1.question_set_title !== void 0) {
              let data10 = data1.question_set_title;
              const _errs48 = errors;
              let valid11 = false;
              const _errs49 = errors;
              if (typeof data10 !== "string") {
                const err29 = { instancePath: instancePath + "/items/" + i0 + "/question_set_title", schemaPath: "ResultRecord.schema.json/properties/question_set_title/anyOf/0/type", keyword: "type", params: { type: "string" }, message: "must be string" };
                if (vErrors === null) {
                  vErrors = [err29];
                } else {
                  vErrors.push(err29);
                }
                errors++;
              }
              var _valid6 = _errs49 === errors;
              valid11 = valid11 || _valid6;
              const _errs51 = errors;
              if (data10 !== null) {
                const err30 = { instancePath: instancePath + "/items/" + i0 + "/question_set_title", schemaPath: "ResultRecord.schema.json/properties/question_set_title/anyOf/1/type", keyword: "type", params: { type: "null" }, message: "must be null" };
                if (vErrors === null) {
                  vErrors = [err30];
                } else {
                  vErrors.push(err30);
                }
                errors++;
              }
              var _valid6 = _errs51 === errors;
              valid11 = valid11 || _valid6;
              if (!valid11) {
                const err31 = { instancePath: instancePath + "/items/" + i0 + "/question_set_title", schemaPath: "ResultRecord.schema.json/properties/question_set_title/anyOf", keyword: "anyOf", params: {}, message: "must match a schema in anyOf" };
                if (vErrors === null) {
                  vErrors = [err31];
                } else {
                  vErrors.push(err31);
                }
                errors++;
              } else {
                errors = _errs48;
                if (vErrors !== null) {
                  if (_errs48) {
                    vErrors.length = _errs48;
                  } else {
                    vErrors = null;
                  }
                }
              }
            }
            if (data1.pause_reason !== void 0) {
              let data11 = data1.pause_reason;
              const _errs54 = errors;
              let valid12 = false;
              const _errs55 = errors;
              if (typeof data11 !== "string") {
                const err32 = { instancePath: instancePath + "/items/" + i0 + "/pause_reason", schemaPath: "ResultRecord.schema.json/properties/pause_reason/anyOf/0/type", keyword: "type", params: { type: "string" }, message: "must be string" };
                if (vErrors === null) {
                  vErrors = [err32];
                } else {
                  vErrors.push(err32);
                }
                errors++;
              }
              var _valid7 = _errs55 === errors;
              valid12 = valid12 || _valid7;
              const _errs57 = errors;
              if (data11 !== null) {
                const err33 = { instancePath: instancePath + "/items/" + i0 + "/pause_reason", schemaPath: "ResultRecord.schema.json/properties/pause_reason/anyOf/1/type", keyword: "type", params: { type: "null" }, message: "must be null" };
                if (vErrors === null) {
                  vErrors = [err33];
                } else {
                  vErrors.push(err33);
                }
                errors++;
              }
              var _valid7 = _errs57 === errors;
              valid12 = valid12 || _valid7;
              if (!valid12) {
                const err34 = { instancePath: instancePath + "/items/" + i0 + "/pause_reason", schemaPath: "ResultRecord.schema.json/properties/pause_reason/anyOf", keyword: "anyOf", params: {}, message: "must match a schema in anyOf" };
                if (vErrors === null) {
                  vErrors = [err34];
                } else {
                  vErrors.push(err34);
                }
                errors++;
              } else {
                errors = _errs54;
                if (vErrors !== null) {
                  if (_errs54) {
                    vErrors.length = _errs54;
                  } else {
                    vErrors = null;
                  }
                }
              }
            }
            if (data1.answers !== void 0) {
              let data12 = data1.answers;
              if (Array.isArray(data12)) {
                const len1 = data12.length;
                for (let i1 = 0; i1 < len1; i1++) {
                  let data13 = data12[i1];
                  if (data13 && typeof data13 == "object" && !Array.isArray(data13)) {
                    if (data13.key === void 0) {
                      const err35 = { instancePath: instancePath + "/items/" + i0 + "/answers/" + i1, schemaPath: "ResultRecord.schema.json/properties/answers/items/required", keyword: "required", params: { missingProperty: "key" }, message: "must have required property 'key'" };
                      if (vErrors === null) {
                        vErrors = [err35];
                      } else {
                        vErrors.push(err35);
                      }
                      errors++;
                    }
                    if (data13.value === void 0) {
                      const err36 = { instancePath: instancePath + "/items/" + i0 + "/answers/" + i1, schemaPath: "ResultRecord.schema.json/properties/answers/items/required", keyword: "required", params: { missingProperty: "value" }, message: "must have required property 'value'" };
                      if (vErrors === null) {
                        vErrors = [err36];
                      } else {
                        vErrors.push(err36);
                      }
                      errors++;
                    }
                    if (data13.status === void 0) {
                      const err37 = { instancePath: instancePath + "/items/" + i0 + "/answers/" + i1, schemaPath: "ResultRecord.schema.json/properties/answers/items/required", keyword: "required", params: { missingProperty: "status" }, message: "must have required property 'status'" };
                      if (vErrors === null) {
                        vErrors = [err37];
                      } else {
                        vErrors.push(err37);
                      }
                      errors++;
                    }
                    if (data13.key !== void 0) {
                      let data14 = data13.key;
                      if (typeof data14 === "string") {
                        if (func1(data14) < 1) {
                          const err38 = { instancePath: instancePath + "/items/" + i0 + "/answers/" + i1 + "/key", schemaPath: "ResultRecord.schema.json/properties/answers/items/properties/key/minLength", keyword: "minLength", params: { limit: 1 }, message: "must NOT have fewer than 1 characters" };
                          if (vErrors === null) {
                            vErrors = [err38];
                          } else {
                            vErrors.push(err38);
                          }
                          errors++;
                        }
                      } else {
                        const err39 = { instancePath: instancePath + "/items/" + i0 + "/answers/" + i1 + "/key", schemaPath: "ResultRecord.schema.json/properties/answers/items/properties/key/type", keyword: "type", params: { type: "string" }, message: "must be string" };
                        if (vErrors === null) {
                          vErrors = [err39];
                        } else {
                          vErrors.push(err39);
                        }
                        errors++;
                      }
                    }
                    if (data13.status !== void 0) {
                      if (typeof data13.status !== "string") {
                        const err40 = { instancePath: instancePath + "/items/" + i0 + "/answers/" + i1 + "/status", schemaPath: "ResultRecord.schema.json/properties/answers/items/properties/status/type", keyword: "type", params: { type: "string" }, message: "must be string" };
                        if (vErrors === null) {
                          vErrors = [err40];
                        } else {
                          vErrors.push(err40);
                        }
                        errors++;
                      }
                    }
                    if (data13.precision !== void 0) {
                      if (typeof data13.precision !== "string") {
                        const err41 = { instancePath: instancePath + "/items/" + i0 + "/answers/" + i1 + "/precision", schemaPath: "ResultRecord.schema.json/properties/answers/items/properties/precision/type", keyword: "type", params: { type: "string" }, message: "must be string" };
                        if (vErrors === null) {
                          vErrors = [err41];
                        } else {
                          vErrors.push(err41);
                        }
                        errors++;
                      }
                    }
                  } else {
                    const err42 = { instancePath: instancePath + "/items/" + i0 + "/answers/" + i1, schemaPath: "ResultRecord.schema.json/properties/answers/items/type", keyword: "type", params: { type: "object" }, message: "must be object" };
                    if (vErrors === null) {
                      vErrors = [err42];
                    } else {
                      vErrors.push(err42);
                    }
                    errors++;
                  }
                }
              } else {
                const err43 = { instancePath: instancePath + "/items/" + i0 + "/answers", schemaPath: "ResultRecord.schema.json/properties/answers/type", keyword: "type", params: { type: "array" }, message: "must be array" };
                if (vErrors === null) {
                  vErrors = [err43];
                } else {
                  vErrors.push(err43);
                }
                errors++;
              }
            }
            if (data1.skipped_details !== void 0) {
              let data17 = data1.skipped_details;
              if (Array.isArray(data17)) {
                const len2 = data17.length;
                for (let i2 = 0; i2 < len2; i2++) {
                  let data18 = data17[i2];
                  if (data18 && typeof data18 == "object" && !Array.isArray(data18)) {
                    if (data18.item === void 0) {
                      const err44 = { instancePath: instancePath + "/items/" + i0 + "/skipped_details/" + i2, schemaPath: "ResultRecord.schema.json/properties/skipped_details/items/required", keyword: "required", params: { missingProperty: "item" }, message: "must have required property 'item'" };
                      if (vErrors === null) {
                        vErrors = [err44];
                      } else {
                        vErrors.push(err44);
                      }
                      errors++;
                    }
                    if (data18.reason === void 0) {
                      const err45 = { instancePath: instancePath + "/items/" + i0 + "/skipped_details/" + i2, schemaPath: "ResultRecord.schema.json/properties/skipped_details/items/required", keyword: "required", params: { missingProperty: "reason" }, message: "must have required property 'reason'" };
                      if (vErrors === null) {
                        vErrors = [err45];
                      } else {
                        vErrors.push(err45);
                      }
                      errors++;
                    }
                    if (data18.item !== void 0) {
                      let data19 = data18.item;
                      if (typeof data19 === "string") {
                        if (func1(data19) < 1) {
                          const err46 = { instancePath: instancePath + "/items/" + i0 + "/skipped_details/" + i2 + "/item", schemaPath: "ResultRecord.schema.json/properties/skipped_details/items/properties/item/minLength", keyword: "minLength", params: { limit: 1 }, message: "must NOT have fewer than 1 characters" };
                          if (vErrors === null) {
                            vErrors = [err46];
                          } else {
                            vErrors.push(err46);
                          }
                          errors++;
                        }
                      } else {
                        const err47 = { instancePath: instancePath + "/items/" + i0 + "/skipped_details/" + i2 + "/item", schemaPath: "ResultRecord.schema.json/properties/skipped_details/items/properties/item/type", keyword: "type", params: { type: "string" }, message: "must be string" };
                        if (vErrors === null) {
                          vErrors = [err47];
                        } else {
                          vErrors.push(err47);
                        }
                        errors++;
                      }
                    }
                    if (data18.slot !== void 0) {
                      let data20 = data18.slot;
                      if (typeof data20 === "string") {
                        if (func1(data20) < 1) {
                          const err48 = { instancePath: instancePath + "/items/" + i0 + "/skipped_details/" + i2 + "/slot", schemaPath: "ResultRecord.schema.json/properties/skipped_details/items/properties/slot/minLength", keyword: "minLength", params: { limit: 1 }, message: "must NOT have fewer than 1 characters" };
                          if (vErrors === null) {
                            vErrors = [err48];
                          } else {
                            vErrors.push(err48);
                          }
                          errors++;
                        }
                      } else {
                        const err49 = { instancePath: instancePath + "/items/" + i0 + "/skipped_details/" + i2 + "/slot", schemaPath: "ResultRecord.schema.json/properties/skipped_details/items/properties/slot/type", keyword: "type", params: { type: "string" }, message: "must be string" };
                        if (vErrors === null) {
                          vErrors = [err49];
                        } else {
                          vErrors.push(err49);
                        }
                        errors++;
                      }
                    }
                    if (data18.reason !== void 0) {
                      let data21 = data18.reason;
                      if (typeof data21 === "string") {
                        if (func1(data21) < 1) {
                          const err50 = { instancePath: instancePath + "/items/" + i0 + "/skipped_details/" + i2 + "/reason", schemaPath: "ResultRecord.schema.json/properties/skipped_details/items/properties/reason/minLength", keyword: "minLength", params: { limit: 1 }, message: "must NOT have fewer than 1 characters" };
                          if (vErrors === null) {
                            vErrors = [err50];
                          } else {
                            vErrors.push(err50);
                          }
                          errors++;
                        }
                      } else {
                        const err51 = { instancePath: instancePath + "/items/" + i0 + "/skipped_details/" + i2 + "/reason", schemaPath: "ResultRecord.schema.json/properties/skipped_details/items/properties/reason/type", keyword: "type", params: { type: "string" }, message: "must be string" };
                        if (vErrors === null) {
                          vErrors = [err51];
                        } else {
                          vErrors.push(err51);
                        }
                        errors++;
                      }
                    }
                  } else {
                    const err52 = { instancePath: instancePath + "/items/" + i0 + "/skipped_details/" + i2, schemaPath: "ResultRecord.schema.json/properties/skipped_details/items/type", keyword: "type", params: { type: "object" }, message: "must be object" };
                    if (vErrors === null) {
                      vErrors = [err52];
                    } else {
                      vErrors.push(err52);
                    }
                    errors++;
                  }
                }
              } else {
                const err53 = { instancePath: instancePath + "/items/" + i0 + "/skipped_details", schemaPath: "ResultRecord.schema.json/properties/skipped_details/type", keyword: "type", params: { type: "array" }, message: "must be array" };
                if (vErrors === null) {
                  vErrors = [err53];
                } else {
                  vErrors.push(err53);
                }
                errors++;
              }
            }
            if (data1.acknowledged_by !== void 0) {
              let data22 = data1.acknowledged_by;
              const _errs80 = errors;
              let valid19 = false;
              const _errs81 = errors;
              if (typeof data22 !== "string") {
                const err54 = { instancePath: instancePath + "/items/" + i0 + "/acknowledged_by", schemaPath: "ResultRecord.schema.json/properties/acknowledged_by/anyOf/0/type", keyword: "type", params: { type: "string" }, message: "must be string" };
                if (vErrors === null) {
                  vErrors = [err54];
                } else {
                  vErrors.push(err54);
                }
                errors++;
              }
              var _valid8 = _errs81 === errors;
              valid19 = valid19 || _valid8;
              const _errs83 = errors;
              if (data22 !== null) {
                const err55 = { instancePath: instancePath + "/items/" + i0 + "/acknowledged_by", schemaPath: "ResultRecord.schema.json/properties/acknowledged_by/anyOf/1/type", keyword: "type", params: { type: "null" }, message: "must be null" };
                if (vErrors === null) {
                  vErrors = [err55];
                } else {
                  vErrors.push(err55);
                }
                errors++;
              }
              var _valid8 = _errs83 === errors;
              valid19 = valid19 || _valid8;
              if (!valid19) {
                const err56 = { instancePath: instancePath + "/items/" + i0 + "/acknowledged_by", schemaPath: "ResultRecord.schema.json/properties/acknowledged_by/anyOf", keyword: "anyOf", params: {}, message: "must match a schema in anyOf" };
                if (vErrors === null) {
                  vErrors = [err56];
                } else {
                  vErrors.push(err56);
                }
                errors++;
              } else {
                errors = _errs80;
                if (vErrors !== null) {
                  if (_errs80) {
                    vErrors.length = _errs80;
                  } else {
                    vErrors = null;
                  }
                }
              }
            }
            if (data1.acknowledged_at !== void 0) {
              let data23 = data1.acknowledged_at;
              const _errs86 = errors;
              let valid20 = false;
              const _errs87 = errors;
              if (typeof data23 !== "string") {
                const err57 = { instancePath: instancePath + "/items/" + i0 + "/acknowledged_at", schemaPath: "ResultRecord.schema.json/properties/acknowledged_at/anyOf/0/type", keyword: "type", params: { type: "string" }, message: "must be string" };
                if (vErrors === null) {
                  vErrors = [err57];
                } else {
                  vErrors.push(err57);
                }
                errors++;
              }
              var _valid9 = _errs87 === errors;
              valid20 = valid20 || _valid9;
              const _errs89 = errors;
              if (data23 !== null) {
                const err58 = { instancePath: instancePath + "/items/" + i0 + "/acknowledged_at", schemaPath: "ResultRecord.schema.json/properties/acknowledged_at/anyOf/1/type", keyword: "type", params: { type: "null" }, message: "must be null" };
                if (vErrors === null) {
                  vErrors = [err58];
                } else {
                  vErrors.push(err58);
                }
                errors++;
              }
              var _valid9 = _errs89 === errors;
              valid20 = valid20 || _valid9;
              if (!valid20) {
                const err59 = { instancePath: instancePath + "/items/" + i0 + "/acknowledged_at", schemaPath: "ResultRecord.schema.json/properties/acknowledged_at/anyOf", keyword: "anyOf", params: {}, message: "must match a schema in anyOf" };
                if (vErrors === null) {
                  vErrors = [err59];
                } else {
                  vErrors.push(err59);
                }
                errors++;
              } else {
                errors = _errs86;
                if (vErrors !== null) {
                  if (_errs86) {
                    vErrors.length = _errs86;
                  } else {
                    vErrors = null;
                  }
                }
              }
            }
          } else {
            const err60 = { instancePath: instancePath + "/items/" + i0, schemaPath: "ResultRecord.schema.json/type", keyword: "type", params: { type: "object" }, message: "must be object" };
            if (vErrors === null) {
              vErrors = [err60];
            } else {
              vErrors.push(err60);
            }
            errors++;
          }
        }
      } else {
        const err61 = { instancePath: instancePath + "/items", schemaPath: "#/properties/items/type", keyword: "type", params: { type: "array" }, message: "must be array" };
        if (vErrors === null) {
          vErrors = [err61];
        } else {
          vErrors.push(err61);
        }
        errors++;
      }
    }
    if (data.next_cursor !== void 0) {
      let data24 = data.next_cursor;
      const _errs92 = errors;
      let valid21 = false;
      const _errs93 = errors;
      if (typeof data24 !== "string") {
        const err62 = { instancePath: instancePath + "/next_cursor", schemaPath: "#/properties/next_cursor/anyOf/0/type", keyword: "type", params: { type: "string" }, message: "must be string" };
        if (vErrors === null) {
          vErrors = [err62];
        } else {
          vErrors.push(err62);
        }
        errors++;
      }
      var _valid10 = _errs93 === errors;
      valid21 = valid21 || _valid10;
      const _errs95 = errors;
      if (data24 !== null) {
        const err63 = { instancePath: instancePath + "/next_cursor", schemaPath: "#/properties/next_cursor/anyOf/1/type", keyword: "type", params: { type: "null" }, message: "must be null" };
        if (vErrors === null) {
          vErrors = [err63];
        } else {
          vErrors.push(err63);
        }
        errors++;
      }
      var _valid10 = _errs95 === errors;
      valid21 = valid21 || _valid10;
      if (!valid21) {
        const err64 = { instancePath: instancePath + "/next_cursor", schemaPath: "#/properties/next_cursor/anyOf", keyword: "anyOf", params: {}, message: "must match a schema in anyOf" };
        if (vErrors === null) {
          vErrors = [err64];
        } else {
          vErrors.push(err64);
        }
        errors++;
      } else {
        errors = _errs92;
        if (vErrors !== null) {
          if (_errs92) {
            vErrors.length = _errs92;
          } else {
            vErrors = null;
          }
        }
      }
    }
  } else {
    const err65 = { instancePath, schemaPath: "#/type", keyword: "type", params: { type: "object" }, message: "must be object" };
    if (vErrors === null) {
      vErrors = [err65];
    } else {
      vErrors.push(err65);
    }
    errors++;
  }
  validate84.errors = vErrors;
  return errors === 0;
}
validate84.evaluated = { "props": true, "dynamicProps": false, "dynamicItems": false };
exports.ResultRecord = validate85;
function validate85(data, { instancePath = "", parentData, parentDataProperty, rootData = data, dynamicAnchors = {} } = {}) {
  ;
  let vErrors = null;
  let errors = 0;
  const evaluated0 = validate85.evaluated;
  if (evaluated0.dynamicProps) {
    evaluated0.props = void 0;
  }
  if (evaluated0.dynamicItems) {
    evaluated0.items = void 0;
  }
  if (data && typeof data == "object" && !Array.isArray(data)) {
    if (data.session_id === void 0) {
      const err0 = { instancePath, schemaPath: "#/required", keyword: "required", params: { missingProperty: "session_id" }, message: "must have required property 'session_id'" };
      if (vErrors === null) {
        vErrors = [err0];
      } else {
        vErrors.push(err0);
      }
      errors++;
    }
    if (data.status === void 0) {
      const err1 = { instancePath, schemaPath: "#/required", keyword: "required", params: { missingProperty: "status" }, message: "must have required property 'status'" };
      if (vErrors === null) {
        vErrors = [err1];
      } else {
        vErrors.push(err1);
      }
      errors++;
    }
    if (data.answers === void 0) {
      const err2 = { instancePath, schemaPath: "#/required", keyword: "required", params: { missingProperty: "answers" }, message: "must have required property 'answers'" };
      if (vErrors === null) {
        vErrors = [err2];
      } else {
        vErrors.push(err2);
      }
      errors++;
    }
    if (data.skipped_details === void 0) {
      const err3 = { instancePath, schemaPath: "#/required", keyword: "required", params: { missingProperty: "skipped_details" }, message: "must have required property 'skipped_details'" };
      if (vErrors === null) {
        vErrors = [err3];
      } else {
        vErrors.push(err3);
      }
      errors++;
    }
    if (data.session_id !== void 0) {
      let data0 = data.session_id;
      if (typeof data0 === "string") {
        if (func1(data0) < 1) {
          const err4 = { instancePath: instancePath + "/session_id", schemaPath: "#/properties/session_id/minLength", keyword: "minLength", params: { limit: 1 }, message: "must NOT have fewer than 1 characters" };
          if (vErrors === null) {
            vErrors = [err4];
          } else {
            vErrors.push(err4);
          }
          errors++;
        }
      } else {
        const err5 = { instancePath: instancePath + "/session_id", schemaPath: "#/properties/session_id/type", keyword: "type", params: { type: "string" }, message: "must be string" };
        if (vErrors === null) {
          vErrors = [err5];
        } else {
          vErrors.push(err5);
        }
        errors++;
      }
    }
    if (data.subject_ref !== void 0) {
      let data1 = data.subject_ref;
      const _errs4 = errors;
      let valid1 = false;
      const _errs5 = errors;
      if (typeof data1 !== "string") {
        const err6 = { instancePath: instancePath + "/subject_ref", schemaPath: "#/properties/subject_ref/anyOf/0/type", keyword: "type", params: { type: "string" }, message: "must be string" };
        if (vErrors === null) {
          vErrors = [err6];
        } else {
          vErrors.push(err6);
        }
        errors++;
      }
      var _valid0 = _errs5 === errors;
      valid1 = valid1 || _valid0;
      const _errs7 = errors;
      if (data1 !== null) {
        const err7 = { instancePath: instancePath + "/subject_ref", schemaPath: "#/properties/subject_ref/anyOf/1/type", keyword: "type", params: { type: "null" }, message: "must be null" };
        if (vErrors === null) {
          vErrors = [err7];
        } else {
          vErrors.push(err7);
        }
        errors++;
      }
      var _valid0 = _errs7 === errors;
      valid1 = valid1 || _valid0;
      if (!valid1) {
        const err8 = { instancePath: instancePath + "/subject_ref", schemaPath: "#/properties/subject_ref/anyOf", keyword: "anyOf", params: {}, message: "must match a schema in anyOf" };
        if (vErrors === null) {
          vErrors = [err8];
        } else {
          vErrors.push(err8);
        }
        errors++;
      } else {
        errors = _errs4;
        if (vErrors !== null) {
          if (_errs4) {
            vErrors.length = _errs4;
          } else {
            vErrors = null;
          }
        }
      }
    }
    if (data.status !== void 0) {
      let data2 = data.status;
      if (typeof data2 === "string") {
        if (func1(data2) < 1) {
          const err9 = { instancePath: instancePath + "/status", schemaPath: "#/properties/status/minLength", keyword: "minLength", params: { limit: 1 }, message: "must NOT have fewer than 1 characters" };
          if (vErrors === null) {
            vErrors = [err9];
          } else {
            vErrors.push(err9);
          }
          errors++;
        }
      } else {
        const err10 = { instancePath: instancePath + "/status", schemaPath: "#/properties/status/type", keyword: "type", params: { type: "string" }, message: "must be string" };
        if (vErrors === null) {
          vErrors = [err10];
        } else {
          vErrors.push(err10);
        }
        errors++;
      }
    }
    if (data.started_at !== void 0) {
      let data3 = data.started_at;
      const _errs12 = errors;
      let valid2 = false;
      const _errs13 = errors;
      if (typeof data3 !== "string") {
        const err11 = { instancePath: instancePath + "/started_at", schemaPath: "#/properties/started_at/anyOf/0/type", keyword: "type", params: { type: "string" }, message: "must be string" };
        if (vErrors === null) {
          vErrors = [err11];
        } else {
          vErrors.push(err11);
        }
        errors++;
      }
      var _valid1 = _errs13 === errors;
      valid2 = valid2 || _valid1;
      const _errs15 = errors;
      if (data3 !== null) {
        const err12 = { instancePath: instancePath + "/started_at", schemaPath: "#/properties/started_at/anyOf/1/type", keyword: "type", params: { type: "null" }, message: "must be null" };
        if (vErrors === null) {
          vErrors = [err12];
        } else {
          vErrors.push(err12);
        }
        errors++;
      }
      var _valid1 = _errs15 === errors;
      valid2 = valid2 || _valid1;
      if (!valid2) {
        const err13 = { instancePath: instancePath + "/started_at", schemaPath: "#/properties/started_at/anyOf", keyword: "anyOf", params: {}, message: "must match a schema in anyOf" };
        if (vErrors === null) {
          vErrors = [err13];
        } else {
          vErrors.push(err13);
        }
        errors++;
      } else {
        errors = _errs12;
        if (vErrors !== null) {
          if (_errs12) {
            vErrors.length = _errs12;
          } else {
            vErrors = null;
          }
        }
      }
    }
    if (data.ended_at !== void 0) {
      let data4 = data.ended_at;
      const _errs18 = errors;
      let valid3 = false;
      const _errs19 = errors;
      if (typeof data4 !== "string") {
        const err14 = { instancePath: instancePath + "/ended_at", schemaPath: "#/properties/ended_at/anyOf/0/type", keyword: "type", params: { type: "string" }, message: "must be string" };
        if (vErrors === null) {
          vErrors = [err14];
        } else {
          vErrors.push(err14);
        }
        errors++;
      }
      var _valid2 = _errs19 === errors;
      valid3 = valid3 || _valid2;
      const _errs21 = errors;
      if (data4 !== null) {
        const err15 = { instancePath: instancePath + "/ended_at", schemaPath: "#/properties/ended_at/anyOf/1/type", keyword: "type", params: { type: "null" }, message: "must be null" };
        if (vErrors === null) {
          vErrors = [err15];
        } else {
          vErrors.push(err15);
        }
        errors++;
      }
      var _valid2 = _errs21 === errors;
      valid3 = valid3 || _valid2;
      if (!valid3) {
        const err16 = { instancePath: instancePath + "/ended_at", schemaPath: "#/properties/ended_at/anyOf", keyword: "anyOf", params: {}, message: "must match a schema in anyOf" };
        if (vErrors === null) {
          vErrors = [err16];
        } else {
          vErrors.push(err16);
        }
        errors++;
      } else {
        errors = _errs18;
        if (vErrors !== null) {
          if (_errs18) {
            vErrors.length = _errs18;
          } else {
            vErrors = null;
          }
        }
      }
    }
    if (data.release_id !== void 0) {
      let data5 = data.release_id;
      const _errs24 = errors;
      let valid4 = false;
      const _errs25 = errors;
      if (typeof data5 !== "string") {
        const err17 = { instancePath: instancePath + "/release_id", schemaPath: "#/properties/release_id/anyOf/0/type", keyword: "type", params: { type: "string" }, message: "must be string" };
        if (vErrors === null) {
          vErrors = [err17];
        } else {
          vErrors.push(err17);
        }
        errors++;
      }
      var _valid3 = _errs25 === errors;
      valid4 = valid4 || _valid3;
      const _errs27 = errors;
      if (data5 !== null) {
        const err18 = { instancePath: instancePath + "/release_id", schemaPath: "#/properties/release_id/anyOf/1/type", keyword: "type", params: { type: "null" }, message: "must be null" };
        if (vErrors === null) {
          vErrors = [err18];
        } else {
          vErrors.push(err18);
        }
        errors++;
      }
      var _valid3 = _errs27 === errors;
      valid4 = valid4 || _valid3;
      if (!valid4) {
        const err19 = { instancePath: instancePath + "/release_id", schemaPath: "#/properties/release_id/anyOf", keyword: "anyOf", params: {}, message: "must match a schema in anyOf" };
        if (vErrors === null) {
          vErrors = [err19];
        } else {
          vErrors.push(err19);
        }
        errors++;
      } else {
        errors = _errs24;
        if (vErrors !== null) {
          if (_errs24) {
            vErrors.length = _errs24;
          } else {
            vErrors = null;
          }
        }
      }
    }
    if (data.question_bank_version !== void 0) {
      let data6 = data.question_bank_version;
      const _errs30 = errors;
      let valid5 = false;
      const _errs31 = errors;
      if (typeof data6 !== "string") {
        const err20 = { instancePath: instancePath + "/question_bank_version", schemaPath: "#/properties/question_bank_version/anyOf/0/type", keyword: "type", params: { type: "string" }, message: "must be string" };
        if (vErrors === null) {
          vErrors = [err20];
        } else {
          vErrors.push(err20);
        }
        errors++;
      }
      var _valid4 = _errs31 === errors;
      valid5 = valid5 || _valid4;
      const _errs33 = errors;
      if (data6 !== null) {
        const err21 = { instancePath: instancePath + "/question_bank_version", schemaPath: "#/properties/question_bank_version/anyOf/1/type", keyword: "type", params: { type: "null" }, message: "must be null" };
        if (vErrors === null) {
          vErrors = [err21];
        } else {
          vErrors.push(err21);
        }
        errors++;
      }
      var _valid4 = _errs33 === errors;
      valid5 = valid5 || _valid4;
      if (!valid5) {
        const err22 = { instancePath: instancePath + "/question_bank_version", schemaPath: "#/properties/question_bank_version/anyOf", keyword: "anyOf", params: {}, message: "must match a schema in anyOf" };
        if (vErrors === null) {
          vErrors = [err22];
        } else {
          vErrors.push(err22);
        }
        errors++;
      } else {
        errors = _errs30;
        if (vErrors !== null) {
          if (_errs30) {
            vErrors.length = _errs30;
          } else {
            vErrors = null;
          }
        }
      }
    }
    if (data.question_set_id !== void 0) {
      let data7 = data.question_set_id;
      const _errs36 = errors;
      let valid6 = false;
      const _errs37 = errors;
      if (typeof data7 !== "string") {
        const err23 = { instancePath: instancePath + "/question_set_id", schemaPath: "#/properties/question_set_id/anyOf/0/type", keyword: "type", params: { type: "string" }, message: "must be string" };
        if (vErrors === null) {
          vErrors = [err23];
        } else {
          vErrors.push(err23);
        }
        errors++;
      }
      var _valid5 = _errs37 === errors;
      valid6 = valid6 || _valid5;
      const _errs39 = errors;
      if (data7 !== null) {
        const err24 = { instancePath: instancePath + "/question_set_id", schemaPath: "#/properties/question_set_id/anyOf/1/type", keyword: "type", params: { type: "null" }, message: "must be null" };
        if (vErrors === null) {
          vErrors = [err24];
        } else {
          vErrors.push(err24);
        }
        errors++;
      }
      var _valid5 = _errs39 === errors;
      valid6 = valid6 || _valid5;
      if (!valid6) {
        const err25 = { instancePath: instancePath + "/question_set_id", schemaPath: "#/properties/question_set_id/anyOf", keyword: "anyOf", params: {}, message: "must match a schema in anyOf" };
        if (vErrors === null) {
          vErrors = [err25];
        } else {
          vErrors.push(err25);
        }
        errors++;
      } else {
        errors = _errs36;
        if (vErrors !== null) {
          if (_errs36) {
            vErrors.length = _errs36;
          } else {
            vErrors = null;
          }
        }
      }
    }
    if (data.question_set_title !== void 0) {
      let data8 = data.question_set_title;
      const _errs42 = errors;
      let valid7 = false;
      const _errs43 = errors;
      if (typeof data8 !== "string") {
        const err26 = { instancePath: instancePath + "/question_set_title", schemaPath: "#/properties/question_set_title/anyOf/0/type", keyword: "type", params: { type: "string" }, message: "must be string" };
        if (vErrors === null) {
          vErrors = [err26];
        } else {
          vErrors.push(err26);
        }
        errors++;
      }
      var _valid6 = _errs43 === errors;
      valid7 = valid7 || _valid6;
      const _errs45 = errors;
      if (data8 !== null) {
        const err27 = { instancePath: instancePath + "/question_set_title", schemaPath: "#/properties/question_set_title/anyOf/1/type", keyword: "type", params: { type: "null" }, message: "must be null" };
        if (vErrors === null) {
          vErrors = [err27];
        } else {
          vErrors.push(err27);
        }
        errors++;
      }
      var _valid6 = _errs45 === errors;
      valid7 = valid7 || _valid6;
      if (!valid7) {
        const err28 = { instancePath: instancePath + "/question_set_title", schemaPath: "#/properties/question_set_title/anyOf", keyword: "anyOf", params: {}, message: "must match a schema in anyOf" };
        if (vErrors === null) {
          vErrors = [err28];
        } else {
          vErrors.push(err28);
        }
        errors++;
      } else {
        errors = _errs42;
        if (vErrors !== null) {
          if (_errs42) {
            vErrors.length = _errs42;
          } else {
            vErrors = null;
          }
        }
      }
    }
    if (data.pause_reason !== void 0) {
      let data9 = data.pause_reason;
      const _errs48 = errors;
      let valid8 = false;
      const _errs49 = errors;
      if (typeof data9 !== "string") {
        const err29 = { instancePath: instancePath + "/pause_reason", schemaPath: "#/properties/pause_reason/anyOf/0/type", keyword: "type", params: { type: "string" }, message: "must be string" };
        if (vErrors === null) {
          vErrors = [err29];
        } else {
          vErrors.push(err29);
        }
        errors++;
      }
      var _valid7 = _errs49 === errors;
      valid8 = valid8 || _valid7;
      const _errs51 = errors;
      if (data9 !== null) {
        const err30 = { instancePath: instancePath + "/pause_reason", schemaPath: "#/properties/pause_reason/anyOf/1/type", keyword: "type", params: { type: "null" }, message: "must be null" };
        if (vErrors === null) {
          vErrors = [err30];
        } else {
          vErrors.push(err30);
        }
        errors++;
      }
      var _valid7 = _errs51 === errors;
      valid8 = valid8 || _valid7;
      if (!valid8) {
        const err31 = { instancePath: instancePath + "/pause_reason", schemaPath: "#/properties/pause_reason/anyOf", keyword: "anyOf", params: {}, message: "must match a schema in anyOf" };
        if (vErrors === null) {
          vErrors = [err31];
        } else {
          vErrors.push(err31);
        }
        errors++;
      } else {
        errors = _errs48;
        if (vErrors !== null) {
          if (_errs48) {
            vErrors.length = _errs48;
          } else {
            vErrors = null;
          }
        }
      }
    }
    if (data.answers !== void 0) {
      let data10 = data.answers;
      if (Array.isArray(data10)) {
        const len0 = data10.length;
        for (let i0 = 0; i0 < len0; i0++) {
          let data11 = data10[i0];
          if (data11 && typeof data11 == "object" && !Array.isArray(data11)) {
            if (data11.key === void 0) {
              const err32 = { instancePath: instancePath + "/answers/" + i0, schemaPath: "#/properties/answers/items/required", keyword: "required", params: { missingProperty: "key" }, message: "must have required property 'key'" };
              if (vErrors === null) {
                vErrors = [err32];
              } else {
                vErrors.push(err32);
              }
              errors++;
            }
            if (data11.value === void 0) {
              const err33 = { instancePath: instancePath + "/answers/" + i0, schemaPath: "#/properties/answers/items/required", keyword: "required", params: { missingProperty: "value" }, message: "must have required property 'value'" };
              if (vErrors === null) {
                vErrors = [err33];
              } else {
                vErrors.push(err33);
              }
              errors++;
            }
            if (data11.status === void 0) {
              const err34 = { instancePath: instancePath + "/answers/" + i0, schemaPath: "#/properties/answers/items/required", keyword: "required", params: { missingProperty: "status" }, message: "must have required property 'status'" };
              if (vErrors === null) {
                vErrors = [err34];
              } else {
                vErrors.push(err34);
              }
              errors++;
            }
            if (data11.key !== void 0) {
              let data12 = data11.key;
              if (typeof data12 === "string") {
                if (func1(data12) < 1) {
                  const err35 = { instancePath: instancePath + "/answers/" + i0 + "/key", schemaPath: "#/properties/answers/items/properties/key/minLength", keyword: "minLength", params: { limit: 1 }, message: "must NOT have fewer than 1 characters" };
                  if (vErrors === null) {
                    vErrors = [err35];
                  } else {
                    vErrors.push(err35);
                  }
                  errors++;
                }
              } else {
                const err36 = { instancePath: instancePath + "/answers/" + i0 + "/key", schemaPath: "#/properties/answers/items/properties/key/type", keyword: "type", params: { type: "string" }, message: "must be string" };
                if (vErrors === null) {
                  vErrors = [err36];
                } else {
                  vErrors.push(err36);
                }
                errors++;
              }
            }
            if (data11.status !== void 0) {
              if (typeof data11.status !== "string") {
                const err37 = { instancePath: instancePath + "/answers/" + i0 + "/status", schemaPath: "#/properties/answers/items/properties/status/type", keyword: "type", params: { type: "string" }, message: "must be string" };
                if (vErrors === null) {
                  vErrors = [err37];
                } else {
                  vErrors.push(err37);
                }
                errors++;
              }
            }
            if (data11.precision !== void 0) {
              if (typeof data11.precision !== "string") {
                const err38 = { instancePath: instancePath + "/answers/" + i0 + "/precision", schemaPath: "#/properties/answers/items/properties/precision/type", keyword: "type", params: { type: "string" }, message: "must be string" };
                if (vErrors === null) {
                  vErrors = [err38];
                } else {
                  vErrors.push(err38);
                }
                errors++;
              }
            }
          } else {
            const err39 = { instancePath: instancePath + "/answers/" + i0, schemaPath: "#/properties/answers/items/type", keyword: "type", params: { type: "object" }, message: "must be object" };
            if (vErrors === null) {
              vErrors = [err39];
            } else {
              vErrors.push(err39);
            }
            errors++;
          }
        }
      } else {
        const err40 = { instancePath: instancePath + "/answers", schemaPath: "#/properties/answers/type", keyword: "type", params: { type: "array" }, message: "must be array" };
        if (vErrors === null) {
          vErrors = [err40];
        } else {
          vErrors.push(err40);
        }
        errors++;
      }
    }
    if (data.skipped_details !== void 0) {
      let data15 = data.skipped_details;
      if (Array.isArray(data15)) {
        const len1 = data15.length;
        for (let i1 = 0; i1 < len1; i1++) {
          let data16 = data15[i1];
          if (data16 && typeof data16 == "object" && !Array.isArray(data16)) {
            if (data16.item === void 0) {
              const err41 = { instancePath: instancePath + "/skipped_details/" + i1, schemaPath: "#/properties/skipped_details/items/required", keyword: "required", params: { missingProperty: "item" }, message: "must have required property 'item'" };
              if (vErrors === null) {
                vErrors = [err41];
              } else {
                vErrors.push(err41);
              }
              errors++;
            }
            if (data16.reason === void 0) {
              const err42 = { instancePath: instancePath + "/skipped_details/" + i1, schemaPath: "#/properties/skipped_details/items/required", keyword: "required", params: { missingProperty: "reason" }, message: "must have required property 'reason'" };
              if (vErrors === null) {
                vErrors = [err42];
              } else {
                vErrors.push(err42);
              }
              errors++;
            }
            if (data16.item !== void 0) {
              let data17 = data16.item;
              if (typeof data17 === "string") {
                if (func1(data17) < 1) {
                  const err43 = { instancePath: instancePath + "/skipped_details/" + i1 + "/item", schemaPath: "#/properties/skipped_details/items/properties/item/minLength", keyword: "minLength", params: { limit: 1 }, message: "must NOT have fewer than 1 characters" };
                  if (vErrors === null) {
                    vErrors = [err43];
                  } else {
                    vErrors.push(err43);
                  }
                  errors++;
                }
              } else {
                const err44 = { instancePath: instancePath + "/skipped_details/" + i1 + "/item", schemaPath: "#/properties/skipped_details/items/properties/item/type", keyword: "type", params: { type: "string" }, message: "must be string" };
                if (vErrors === null) {
                  vErrors = [err44];
                } else {
                  vErrors.push(err44);
                }
                errors++;
              }
            }
            if (data16.slot !== void 0) {
              let data18 = data16.slot;
              if (typeof data18 === "string") {
                if (func1(data18) < 1) {
                  const err45 = { instancePath: instancePath + "/skipped_details/" + i1 + "/slot", schemaPath: "#/properties/skipped_details/items/properties/slot/minLength", keyword: "minLength", params: { limit: 1 }, message: "must NOT have fewer than 1 characters" };
                  if (vErrors === null) {
                    vErrors = [err45];
                  } else {
                    vErrors.push(err45);
                  }
                  errors++;
                }
              } else {
                const err46 = { instancePath: instancePath + "/skipped_details/" + i1 + "/slot", schemaPath: "#/properties/skipped_details/items/properties/slot/type", keyword: "type", params: { type: "string" }, message: "must be string" };
                if (vErrors === null) {
                  vErrors = [err46];
                } else {
                  vErrors.push(err46);
                }
                errors++;
              }
            }
            if (data16.reason !== void 0) {
              let data19 = data16.reason;
              if (typeof data19 === "string") {
                if (func1(data19) < 1) {
                  const err47 = { instancePath: instancePath + "/skipped_details/" + i1 + "/reason", schemaPath: "#/properties/skipped_details/items/properties/reason/minLength", keyword: "minLength", params: { limit: 1 }, message: "must NOT have fewer than 1 characters" };
                  if (vErrors === null) {
                    vErrors = [err47];
                  } else {
                    vErrors.push(err47);
                  }
                  errors++;
                }
              } else {
                const err48 = { instancePath: instancePath + "/skipped_details/" + i1 + "/reason", schemaPath: "#/properties/skipped_details/items/properties/reason/type", keyword: "type", params: { type: "string" }, message: "must be string" };
                if (vErrors === null) {
                  vErrors = [err48];
                } else {
                  vErrors.push(err48);
                }
                errors++;
              }
            }
          } else {
            const err49 = { instancePath: instancePath + "/skipped_details/" + i1, schemaPath: "#/properties/skipped_details/items/type", keyword: "type", params: { type: "object" }, message: "must be object" };
            if (vErrors === null) {
              vErrors = [err49];
            } else {
              vErrors.push(err49);
            }
            errors++;
          }
        }
      } else {
        const err50 = { instancePath: instancePath + "/skipped_details", schemaPath: "#/properties/skipped_details/type", keyword: "type", params: { type: "array" }, message: "must be array" };
        if (vErrors === null) {
          vErrors = [err50];
        } else {
          vErrors.push(err50);
        }
        errors++;
      }
    }
    if (data.acknowledged_by !== void 0) {
      let data20 = data.acknowledged_by;
      const _errs74 = errors;
      let valid15 = false;
      const _errs75 = errors;
      if (typeof data20 !== "string") {
        const err51 = { instancePath: instancePath + "/acknowledged_by", schemaPath: "#/properties/acknowledged_by/anyOf/0/type", keyword: "type", params: { type: "string" }, message: "must be string" };
        if (vErrors === null) {
          vErrors = [err51];
        } else {
          vErrors.push(err51);
        }
        errors++;
      }
      var _valid8 = _errs75 === errors;
      valid15 = valid15 || _valid8;
      const _errs77 = errors;
      if (data20 !== null) {
        const err52 = { instancePath: instancePath + "/acknowledged_by", schemaPath: "#/properties/acknowledged_by/anyOf/1/type", keyword: "type", params: { type: "null" }, message: "must be null" };
        if (vErrors === null) {
          vErrors = [err52];
        } else {
          vErrors.push(err52);
        }
        errors++;
      }
      var _valid8 = _errs77 === errors;
      valid15 = valid15 || _valid8;
      if (!valid15) {
        const err53 = { instancePath: instancePath + "/acknowledged_by", schemaPath: "#/properties/acknowledged_by/anyOf", keyword: "anyOf", params: {}, message: "must match a schema in anyOf" };
        if (vErrors === null) {
          vErrors = [err53];
        } else {
          vErrors.push(err53);
        }
        errors++;
      } else {
        errors = _errs74;
        if (vErrors !== null) {
          if (_errs74) {
            vErrors.length = _errs74;
          } else {
            vErrors = null;
          }
        }
      }
    }
    if (data.acknowledged_at !== void 0) {
      let data21 = data.acknowledged_at;
      const _errs80 = errors;
      let valid16 = false;
      const _errs81 = errors;
      if (typeof data21 !== "string") {
        const err54 = { instancePath: instancePath + "/acknowledged_at", schemaPath: "#/properties/acknowledged_at/anyOf/0/type", keyword: "type", params: { type: "string" }, message: "must be string" };
        if (vErrors === null) {
          vErrors = [err54];
        } else {
          vErrors.push(err54);
        }
        errors++;
      }
      var _valid9 = _errs81 === errors;
      valid16 = valid16 || _valid9;
      const _errs83 = errors;
      if (data21 !== null) {
        const err55 = { instancePath: instancePath + "/acknowledged_at", schemaPath: "#/properties/acknowledged_at/anyOf/1/type", keyword: "type", params: { type: "null" }, message: "must be null" };
        if (vErrors === null) {
          vErrors = [err55];
        } else {
          vErrors.push(err55);
        }
        errors++;
      }
      var _valid9 = _errs83 === errors;
      valid16 = valid16 || _valid9;
      if (!valid16) {
        const err56 = { instancePath: instancePath + "/acknowledged_at", schemaPath: "#/properties/acknowledged_at/anyOf", keyword: "anyOf", params: {}, message: "must match a schema in anyOf" };
        if (vErrors === null) {
          vErrors = [err56];
        } else {
          vErrors.push(err56);
        }
        errors++;
      } else {
        errors = _errs80;
        if (vErrors !== null) {
          if (_errs80) {
            vErrors.length = _errs80;
          } else {
            vErrors = null;
          }
        }
      }
    }
  } else {
    const err57 = { instancePath, schemaPath: "#/type", keyword: "type", params: { type: "object" }, message: "must be object" };
    if (vErrors === null) {
      vErrors = [err57];
    } else {
      vErrors.push(err57);
    }
    errors++;
  }
  validate85.errors = vErrors;
  return errors === 0;
}
validate85.evaluated = { "props": { "session_id": true, "subject_ref": true, "status": true, "started_at": true, "ended_at": true, "release_id": true, "question_bank_version": true, "question_set_id": true, "question_set_title": true, "pause_reason": true, "answers": true, "skipped_details": true, "acknowledged_by": true, "acknowledged_at": true }, "dynamicProps": false, "dynamicItems": false };
exports.RollbackDraft = validate86;
function validate86(data, { instancePath = "", parentData, parentDataProperty, rootData = data, dynamicAnchors = {} } = {}) {
  ;
  let vErrors = null;
  let errors = 0;
  const evaluated0 = validate86.evaluated;
  if (evaluated0.dynamicProps) {
    evaluated0.props = void 0;
  }
  if (evaluated0.dynamicItems) {
    evaluated0.items = void 0;
  }
  if (data && typeof data == "object" && !Array.isArray(data)) {
    if (data.request_id === void 0) {
      const err0 = { instancePath, schemaPath: "#/required", keyword: "required", params: { missingProperty: "request_id" }, message: "must have required property 'request_id'" };
      if (vErrors === null) {
        vErrors = [err0];
      } else {
        vErrors.push(err0);
      }
      errors++;
    }
    if (data.requested_at === void 0) {
      const err1 = { instancePath, schemaPath: "#/required", keyword: "required", params: { missingProperty: "requested_at" }, message: "must have required property 'requested_at'" };
      if (vErrors === null) {
        vErrors = [err1];
      } else {
        vErrors.push(err1);
      }
      errors++;
    }
    if (data.from_release_id === void 0) {
      const err2 = { instancePath, schemaPath: "#/required", keyword: "required", params: { missingProperty: "from_release_id" }, message: "must have required property 'from_release_id'" };
      if (vErrors === null) {
        vErrors = [err2];
      } else {
        vErrors.push(err2);
      }
      errors++;
    }
    if (data.to_release_id === void 0) {
      const err3 = { instancePath, schemaPath: "#/required", keyword: "required", params: { missingProperty: "to_release_id" }, message: "must have required property 'to_release_id'" };
      if (vErrors === null) {
        vErrors = [err3];
      } else {
        vErrors.push(err3);
      }
      errors++;
    }
    if (data.reason === void 0) {
      const err4 = { instancePath, schemaPath: "#/required", keyword: "required", params: { missingProperty: "reason" }, message: "must have required property 'reason'" };
      if (vErrors === null) {
        vErrors = [err4];
      } else {
        vErrors.push(err4);
      }
      errors++;
    }
    if (data.evidence_refs === void 0) {
      const err5 = { instancePath, schemaPath: "#/required", keyword: "required", params: { missingProperty: "evidence_refs" }, message: "must have required property 'evidence_refs'" };
      if (vErrors === null) {
        vErrors = [err5];
      } else {
        vErrors.push(err5);
      }
      errors++;
    }
    for (const key0 in data) {
      if (!(key0 === "request_id" || key0 === "requested_at" || key0 === "from_release_id" || key0 === "to_release_id" || key0 === "reason" || key0 === "evidence_refs")) {
        const err6 = { instancePath, schemaPath: "#/additionalProperties", keyword: "additionalProperties", params: { additionalProperty: key0 }, message: "must NOT have additional properties" };
        if (vErrors === null) {
          vErrors = [err6];
        } else {
          vErrors.push(err6);
        }
        errors++;
      }
    }
    if (data.request_id !== void 0) {
      let data0 = data.request_id;
      if (typeof data0 === "string") {
        if (func1(data0) < 1) {
          const err7 = { instancePath: instancePath + "/request_id", schemaPath: "#/properties/request_id/minLength", keyword: "minLength", params: { limit: 1 }, message: "must NOT have fewer than 1 characters" };
          if (vErrors === null) {
            vErrors = [err7];
          } else {
            vErrors.push(err7);
          }
          errors++;
        }
      } else {
        const err8 = { instancePath: instancePath + "/request_id", schemaPath: "#/properties/request_id/type", keyword: "type", params: { type: "string" }, message: "must be string" };
        if (vErrors === null) {
          vErrors = [err8];
        } else {
          vErrors.push(err8);
        }
        errors++;
      }
    }
    if (data.requested_at !== void 0) {
      let data1 = data.requested_at;
      if (typeof data1 === "string") {
        if (func1(data1) < 1) {
          const err9 = { instancePath: instancePath + "/requested_at", schemaPath: "#/properties/requested_at/minLength", keyword: "minLength", params: { limit: 1 }, message: "must NOT have fewer than 1 characters" };
          if (vErrors === null) {
            vErrors = [err9];
          } else {
            vErrors.push(err9);
          }
          errors++;
        }
      } else {
        const err10 = { instancePath: instancePath + "/requested_at", schemaPath: "#/properties/requested_at/type", keyword: "type", params: { type: "string" }, message: "must be string" };
        if (vErrors === null) {
          vErrors = [err10];
        } else {
          vErrors.push(err10);
        }
        errors++;
      }
    }
    if (data.from_release_id !== void 0) {
      let data2 = data.from_release_id;
      if (typeof data2 === "string") {
        if (func1(data2) < 1) {
          const err11 = { instancePath: instancePath + "/from_release_id", schemaPath: "#/properties/from_release_id/minLength", keyword: "minLength", params: { limit: 1 }, message: "must NOT have fewer than 1 characters" };
          if (vErrors === null) {
            vErrors = [err11];
          } else {
            vErrors.push(err11);
          }
          errors++;
        }
      } else {
        const err12 = { instancePath: instancePath + "/from_release_id", schemaPath: "#/properties/from_release_id/type", keyword: "type", params: { type: "string" }, message: "must be string" };
        if (vErrors === null) {
          vErrors = [err12];
        } else {
          vErrors.push(err12);
        }
        errors++;
      }
    }
    if (data.to_release_id !== void 0) {
      let data3 = data.to_release_id;
      if (typeof data3 === "string") {
        if (func1(data3) < 1) {
          const err13 = { instancePath: instancePath + "/to_release_id", schemaPath: "#/properties/to_release_id/minLength", keyword: "minLength", params: { limit: 1 }, message: "must NOT have fewer than 1 characters" };
          if (vErrors === null) {
            vErrors = [err13];
          } else {
            vErrors.push(err13);
          }
          errors++;
        }
      } else {
        const err14 = { instancePath: instancePath + "/to_release_id", schemaPath: "#/properties/to_release_id/type", keyword: "type", params: { type: "string" }, message: "must be string" };
        if (vErrors === null) {
          vErrors = [err14];
        } else {
          vErrors.push(err14);
        }
        errors++;
      }
    }
    if (data.reason !== void 0) {
      let data4 = data.reason;
      if (typeof data4 === "string") {
        if (func1(data4) < 1) {
          const err15 = { instancePath: instancePath + "/reason", schemaPath: "#/properties/reason/minLength", keyword: "minLength", params: { limit: 1 }, message: "must NOT have fewer than 1 characters" };
          if (vErrors === null) {
            vErrors = [err15];
          } else {
            vErrors.push(err15);
          }
          errors++;
        }
      } else {
        const err16 = { instancePath: instancePath + "/reason", schemaPath: "#/properties/reason/type", keyword: "type", params: { type: "string" }, message: "must be string" };
        if (vErrors === null) {
          vErrors = [err16];
        } else {
          vErrors.push(err16);
        }
        errors++;
      }
    }
    if (data.evidence_refs !== void 0) {
      let data5 = data.evidence_refs;
      if (Array.isArray(data5)) {
        if (data5.length < 1) {
          const err17 = { instancePath: instancePath + "/evidence_refs", schemaPath: "#/properties/evidence_refs/minItems", keyword: "minItems", params: { limit: 1 }, message: "must NOT have fewer than 1 items" };
          if (vErrors === null) {
            vErrors = [err17];
          } else {
            vErrors.push(err17);
          }
          errors++;
        }
        const len0 = data5.length;
        for (let i0 = 0; i0 < len0; i0++) {
          let data6 = data5[i0];
          if (typeof data6 === "string") {
            if (func1(data6) < 1) {
              const err18 = { instancePath: instancePath + "/evidence_refs/" + i0, schemaPath: "#/properties/evidence_refs/items/minLength", keyword: "minLength", params: { limit: 1 }, message: "must NOT have fewer than 1 characters" };
              if (vErrors === null) {
                vErrors = [err18];
              } else {
                vErrors.push(err18);
              }
              errors++;
            }
          } else {
            const err19 = { instancePath: instancePath + "/evidence_refs/" + i0, schemaPath: "#/properties/evidence_refs/items/type", keyword: "type", params: { type: "string" }, message: "must be string" };
            if (vErrors === null) {
              vErrors = [err19];
            } else {
              vErrors.push(err19);
            }
            errors++;
          }
        }
      } else {
        const err20 = { instancePath: instancePath + "/evidence_refs", schemaPath: "#/properties/evidence_refs/type", keyword: "type", params: { type: "array" }, message: "must be array" };
        if (vErrors === null) {
          vErrors = [err20];
        } else {
          vErrors.push(err20);
        }
        errors++;
      }
    }
  } else {
    const err21 = { instancePath, schemaPath: "#/type", keyword: "type", params: { type: "object" }, message: "must be object" };
    if (vErrors === null) {
      vErrors = [err21];
    } else {
      vErrors.push(err21);
    }
    errors++;
  }
  validate86.errors = vErrors;
  return errors === 0;
}
validate86.evaluated = { "props": true, "dynamicProps": false, "dynamicItems": false };
exports.RollbackOutcome = validate87;
function validate87(data, { instancePath = "", parentData, parentDataProperty, rootData = data, dynamicAnchors = {} } = {}) {
  ;
  let vErrors = null;
  let errors = 0;
  const evaluated0 = validate87.evaluated;
  if (evaluated0.dynamicProps) {
    evaluated0.props = void 0;
  }
  if (evaluated0.dynamicItems) {
    evaluated0.items = void 0;
  }
  if (data && typeof data == "object" && !Array.isArray(data)) {
    if (data.request_id === void 0) {
      const err0 = { instancePath, schemaPath: "#/required", keyword: "required", params: { missingProperty: "request_id" }, message: "must have required property 'request_id'" };
      if (vErrors === null) {
        vErrors = [err0];
      } else {
        vErrors.push(err0);
      }
      errors++;
    }
    if (data.status === void 0) {
      const err1 = { instancePath, schemaPath: "#/required", keyword: "required", params: { missingProperty: "status" }, message: "must have required property 'status'" };
      if (vErrors === null) {
        vErrors = [err1];
      } else {
        vErrors.push(err1);
      }
      errors++;
    }
    if (data.decided_at === void 0) {
      const err2 = { instancePath, schemaPath: "#/required", keyword: "required", params: { missingProperty: "decided_at" }, message: "must have required property 'decided_at'" };
      if (vErrors === null) {
        vErrors = [err2];
      } else {
        vErrors.push(err2);
      }
      errors++;
    }
    if (data.pipeline_schema_version !== void 0) {
      if (typeof data.pipeline_schema_version !== "string") {
        const err3 = { instancePath: instancePath + "/pipeline_schema_version", schemaPath: "#/properties/pipeline_schema_version/type", keyword: "type", params: { type: "string" }, message: "must be string" };
        if (vErrors === null) {
          vErrors = [err3];
        } else {
          vErrors.push(err3);
        }
        errors++;
      }
    }
    if (data.request_id !== void 0) {
      let data1 = data.request_id;
      if (typeof data1 === "string") {
        if (func1(data1) < 1) {
          const err4 = { instancePath: instancePath + "/request_id", schemaPath: "#/properties/request_id/minLength", keyword: "minLength", params: { limit: 1 }, message: "must NOT have fewer than 1 characters" };
          if (vErrors === null) {
            vErrors = [err4];
          } else {
            vErrors.push(err4);
          }
          errors++;
        }
      } else {
        const err5 = { instancePath: instancePath + "/request_id", schemaPath: "#/properties/request_id/type", keyword: "type", params: { type: "string" }, message: "must be string" };
        if (vErrors === null) {
          vErrors = [err5];
        } else {
          vErrors.push(err5);
        }
        errors++;
      }
    }
    if (data.status !== void 0) {
      if (typeof data.status !== "string") {
        const err6 = { instancePath: instancePath + "/status", schemaPath: "#/properties/status/type", keyword: "type", params: { type: "string" }, message: "must be string" };
        if (vErrors === null) {
          vErrors = [err6];
        } else {
          vErrors.push(err6);
        }
        errors++;
      }
    }
    if (data.reason !== void 0) {
      if (typeof data.reason !== "string") {
        const err7 = { instancePath: instancePath + "/reason", schemaPath: "#/properties/reason/type", keyword: "type", params: { type: "string" }, message: "must be string" };
        if (vErrors === null) {
          vErrors = [err7];
        } else {
          vErrors.push(err7);
        }
        errors++;
      }
    }
    if (data.active_pointer !== void 0) {
      let data4 = data.active_pointer;
      if (data4 && typeof data4 == "object" && !Array.isArray(data4)) {
        if (data4.release_id === void 0) {
          const err8 = { instancePath: instancePath + "/active_pointer", schemaPath: "PointerRecord.schema.json/required", keyword: "required", params: { missingProperty: "release_id" }, message: "must have required property 'release_id'" };
          if (vErrors === null) {
            vErrors = [err8];
          } else {
            vErrors.push(err8);
          }
          errors++;
        }
        if (data4.pointer_version === void 0) {
          const err9 = { instancePath: instancePath + "/active_pointer", schemaPath: "PointerRecord.schema.json/required", keyword: "required", params: { missingProperty: "pointer_version" }, message: "must have required property 'pointer_version'" };
          if (vErrors === null) {
            vErrors = [err9];
          } else {
            vErrors.push(err9);
          }
          errors++;
        }
        if (data4.activated_at === void 0) {
          const err10 = { instancePath: instancePath + "/active_pointer", schemaPath: "PointerRecord.schema.json/required", keyword: "required", params: { missingProperty: "activated_at" }, message: "must have required property 'activated_at'" };
          if (vErrors === null) {
            vErrors = [err10];
          } else {
            vErrors.push(err10);
          }
          errors++;
        }
        if (data4.cause === void 0) {
          const err11 = { instancePath: instancePath + "/active_pointer", schemaPath: "PointerRecord.schema.json/required", keyword: "required", params: { missingProperty: "cause" }, message: "must have required property 'cause'" };
          if (vErrors === null) {
            vErrors = [err11];
          } else {
            vErrors.push(err11);
          }
          errors++;
        }
        if (data4.pipeline_schema_version !== void 0) {
          if (typeof data4.pipeline_schema_version !== "string") {
            const err12 = { instancePath: instancePath + "/active_pointer/pipeline_schema_version", schemaPath: "PointerRecord.schema.json/properties/pipeline_schema_version/type", keyword: "type", params: { type: "string" }, message: "must be string" };
            if (vErrors === null) {
              vErrors = [err12];
            } else {
              vErrors.push(err12);
            }
            errors++;
          }
        }
        if (data4.release_id !== void 0) {
          let data6 = data4.release_id;
          if (typeof data6 === "string") {
            if (func1(data6) < 1) {
              const err13 = { instancePath: instancePath + "/active_pointer/release_id", schemaPath: "PointerRecord.schema.json/properties/release_id/minLength", keyword: "minLength", params: { limit: 1 }, message: "must NOT have fewer than 1 characters" };
              if (vErrors === null) {
                vErrors = [err13];
              } else {
                vErrors.push(err13);
              }
              errors++;
            }
          } else {
            const err14 = { instancePath: instancePath + "/active_pointer/release_id", schemaPath: "PointerRecord.schema.json/properties/release_id/type", keyword: "type", params: { type: "string" }, message: "must be string" };
            if (vErrors === null) {
              vErrors = [err14];
            } else {
              vErrors.push(err14);
            }
            errors++;
          }
        }
        if (data4.pointer_version !== void 0) {
          let data7 = data4.pointer_version;
          if (!(typeof data7 == "number" && (!(data7 % 1) && !isNaN(data7)) && isFinite(data7))) {
            const err15 = { instancePath: instancePath + "/active_pointer/pointer_version", schemaPath: "PointerRecord.schema.json/properties/pointer_version/type", keyword: "type", params: { type: "integer" }, message: "must be integer" };
            if (vErrors === null) {
              vErrors = [err15];
            } else {
              vErrors.push(err15);
            }
            errors++;
          }
        }
        if (data4.activated_at !== void 0) {
          if (typeof data4.activated_at !== "string") {
            const err16 = { instancePath: instancePath + "/active_pointer/activated_at", schemaPath: "PointerRecord.schema.json/properties/activated_at/type", keyword: "type", params: { type: "string" }, message: "must be string" };
            if (vErrors === null) {
              vErrors = [err16];
            } else {
              vErrors.push(err16);
            }
            errors++;
          }
        }
        if (data4.cause !== void 0) {
          if (typeof data4.cause !== "string") {
            const err17 = { instancePath: instancePath + "/active_pointer/cause", schemaPath: "PointerRecord.schema.json/properties/cause/type", keyword: "type", params: { type: "string" }, message: "must be string" };
            if (vErrors === null) {
              vErrors = [err17];
            } else {
              vErrors.push(err17);
            }
            errors++;
          }
        }
        if (data4.ext !== void 0) {
          let data10 = data4.ext;
          if (!(data10 && typeof data10 == "object" && !Array.isArray(data10))) {
            const err18 = { instancePath: instancePath + "/active_pointer/ext", schemaPath: "PointerRecord.schema.json/properties/ext/type", keyword: "type", params: { type: "object" }, message: "must be object" };
            if (vErrors === null) {
              vErrors = [err18];
            } else {
              vErrors.push(err18);
            }
            errors++;
          }
        }
      } else {
        const err19 = { instancePath: instancePath + "/active_pointer", schemaPath: "PointerRecord.schema.json/type", keyword: "type", params: { type: "object" }, message: "must be object" };
        if (vErrors === null) {
          vErrors = [err19];
        } else {
          vErrors.push(err19);
        }
        errors++;
      }
    }
    if (data.decided_at !== void 0) {
      if (typeof data.decided_at !== "string") {
        const err20 = { instancePath: instancePath + "/decided_at", schemaPath: "#/properties/decided_at/type", keyword: "type", params: { type: "string" }, message: "must be string" };
        if (vErrors === null) {
          vErrors = [err20];
        } else {
          vErrors.push(err20);
        }
        errors++;
      }
    }
  } else {
    const err21 = { instancePath, schemaPath: "#/type", keyword: "type", params: { type: "object" }, message: "must be object" };
    if (vErrors === null) {
      vErrors = [err21];
    } else {
      vErrors.push(err21);
    }
    errors++;
  }
  validate87.errors = vErrors;
  return errors === 0;
}
validate87.evaluated = { "props": { "pipeline_schema_version": true, "request_id": true, "status": true, "reason": true, "active_pointer": true, "decided_at": true }, "dynamicProps": false, "dynamicItems": false };
exports.Route = validate88;
var schema112 = { "$schema": "https://json-schema.org/draft/2020-12/schema", "$id": "Route.schema.json", "title": "Route", "description": "route_parse\uC758 \uCD9C\uB825. \uC8FC\uC18C\uC758 ID\uB97C \uC77D\uC744 \uC218 \uC5C6\uC73C\uBA74 bad_address.", "type": "object", "required": ["screen", "view"], "properties": { "screen": { "enum": ["approvals", "cases", "ops", "results", "bad_address"] }, "view": { "enum": ["list", "detail", "none"] }, "id": { "type": "string", "minLength": 1 } }, "additionalProperties": false, "if": { "properties": { "view": { "const": "detail" } }, "required": ["view"] }, "then": { "required": ["id"] }, "else": { "not": { "required": ["id"] } } };
function validate88(data, { instancePath = "", parentData, parentDataProperty, rootData = data, dynamicAnchors = {} } = {}) {
  ;
  let vErrors = null;
  let errors = 0;
  const evaluated0 = validate88.evaluated;
  if (evaluated0.dynamicProps) {
    evaluated0.props = void 0;
  }
  if (evaluated0.dynamicItems) {
    evaluated0.items = void 0;
  }
  const _errs1 = errors;
  let valid0 = true;
  const _errs2 = errors;
  if (data && typeof data == "object" && !Array.isArray(data)) {
    let missing0;
    if (data.view === void 0 && (missing0 = "view")) {
      const err0 = {};
      if (vErrors === null) {
        vErrors = [err0];
      } else {
        vErrors.push(err0);
      }
      errors++;
    } else {
      if (data.view !== void 0) {
        if ("detail" !== data.view) {
          const err1 = {};
          if (vErrors === null) {
            vErrors = [err1];
          } else {
            vErrors.push(err1);
          }
          errors++;
        }
      }
    }
  }
  var _valid0 = _errs2 === errors;
  errors = _errs1;
  if (vErrors !== null) {
    if (_errs1) {
      vErrors.length = _errs1;
    } else {
      vErrors = null;
    }
  }
  let ifClause0;
  if (_valid0) {
    const _errs4 = errors;
    if (data && typeof data == "object" && !Array.isArray(data)) {
      if (data.id === void 0) {
        const err2 = { instancePath, schemaPath: "#/then/required", keyword: "required", params: { missingProperty: "id" }, message: "must have required property 'id'" };
        if (vErrors === null) {
          vErrors = [err2];
        } else {
          vErrors.push(err2);
        }
        errors++;
      }
    }
    var _valid0 = _errs4 === errors;
    valid0 = _valid0;
    ifClause0 = "then";
  } else {
    const _errs5 = errors;
    const _errs6 = errors;
    const _errs7 = errors;
    if (data && typeof data == "object" && !Array.isArray(data)) {
      let missing1;
      if (data.id === void 0 && (missing1 = "id")) {
        const err3 = {};
        if (vErrors === null) {
          vErrors = [err3];
        } else {
          vErrors.push(err3);
        }
        errors++;
      }
    }
    var valid2 = _errs7 === errors;
    if (valid2) {
      const err4 = { instancePath, schemaPath: "#/else/not", keyword: "not", params: {}, message: "must NOT be valid" };
      if (vErrors === null) {
        vErrors = [err4];
      } else {
        vErrors.push(err4);
      }
      errors++;
    } else {
      errors = _errs6;
      if (vErrors !== null) {
        if (_errs6) {
          vErrors.length = _errs6;
        } else {
          vErrors = null;
        }
      }
    }
    var _valid0 = _errs5 === errors;
    valid0 = _valid0;
    ifClause0 = "else";
  }
  if (!valid0) {
    const err5 = { instancePath, schemaPath: "#/if", keyword: "if", params: { failingKeyword: ifClause0 }, message: 'must match "' + ifClause0 + '" schema' };
    if (vErrors === null) {
      vErrors = [err5];
    } else {
      vErrors.push(err5);
    }
    errors++;
  }
  if (data && typeof data == "object" && !Array.isArray(data)) {
    if (data.screen === void 0) {
      const err6 = { instancePath, schemaPath: "#/required", keyword: "required", params: { missingProperty: "screen" }, message: "must have required property 'screen'" };
      if (vErrors === null) {
        vErrors = [err6];
      } else {
        vErrors.push(err6);
      }
      errors++;
    }
    if (data.view === void 0) {
      const err7 = { instancePath, schemaPath: "#/required", keyword: "required", params: { missingProperty: "view" }, message: "must have required property 'view'" };
      if (vErrors === null) {
        vErrors = [err7];
      } else {
        vErrors.push(err7);
      }
      errors++;
    }
    for (const key0 in data) {
      if (!(key0 === "screen" || key0 === "view" || key0 === "id")) {
        const err8 = { instancePath, schemaPath: "#/additionalProperties", keyword: "additionalProperties", params: { additionalProperty: key0 }, message: "must NOT have additional properties" };
        if (vErrors === null) {
          vErrors = [err8];
        } else {
          vErrors.push(err8);
        }
        errors++;
      }
    }
    if (data.screen !== void 0) {
      let data1 = data.screen;
      if (!(data1 === "approvals" || data1 === "cases" || data1 === "ops" || data1 === "results" || data1 === "bad_address")) {
        const err9 = { instancePath: instancePath + "/screen", schemaPath: "#/properties/screen/enum", keyword: "enum", params: { allowedValues: schema112.properties.screen.enum }, message: "must be equal to one of the allowed values" };
        if (vErrors === null) {
          vErrors = [err9];
        } else {
          vErrors.push(err9);
        }
        errors++;
      }
    }
    if (data.view !== void 0) {
      let data2 = data.view;
      if (!(data2 === "list" || data2 === "detail" || data2 === "none")) {
        const err10 = { instancePath: instancePath + "/view", schemaPath: "#/properties/view/enum", keyword: "enum", params: { allowedValues: schema112.properties.view.enum }, message: "must be equal to one of the allowed values" };
        if (vErrors === null) {
          vErrors = [err10];
        } else {
          vErrors.push(err10);
        }
        errors++;
      }
    }
    if (data.id !== void 0) {
      let data3 = data.id;
      if (typeof data3 === "string") {
        if (func1(data3) < 1) {
          const err11 = { instancePath: instancePath + "/id", schemaPath: "#/properties/id/minLength", keyword: "minLength", params: { limit: 1 }, message: "must NOT have fewer than 1 characters" };
          if (vErrors === null) {
            vErrors = [err11];
          } else {
            vErrors.push(err11);
          }
          errors++;
        }
      } else {
        const err12 = { instancePath: instancePath + "/id", schemaPath: "#/properties/id/type", keyword: "type", params: { type: "string" }, message: "must be string" };
        if (vErrors === null) {
          vErrors = [err12];
        } else {
          vErrors.push(err12);
        }
        errors++;
      }
    }
  } else {
    const err13 = { instancePath, schemaPath: "#/type", keyword: "type", params: { type: "object" }, message: "must be object" };
    if (vErrors === null) {
      vErrors = [err13];
    } else {
      vErrors.push(err13);
    }
    errors++;
  }
  validate88.errors = vErrors;
  return errors === 0;
}
validate88.evaluated = { "props": true, "dynamicProps": false, "dynamicItems": false };
exports.RouteInput = validate89;
function validate89(data, { instancePath = "", parentData, parentDataProperty, rootData = data, dynamicAnchors = {} } = {}) {
  ;
  let vErrors = null;
  let errors = 0;
  const evaluated0 = validate89.evaluated;
  if (evaluated0.dynamicProps) {
    evaluated0.props = void 0;
  }
  if (evaluated0.dynamicItems) {
    evaluated0.items = void 0;
  }
  if (data && typeof data == "object" && !Array.isArray(data)) {
    if (data.hash === void 0) {
      const err0 = { instancePath, schemaPath: "#/required", keyword: "required", params: { missingProperty: "hash" }, message: "must have required property 'hash'" };
      if (vErrors === null) {
        vErrors = [err0];
      } else {
        vErrors.push(err0);
      }
      errors++;
    }
    for (const key0 in data) {
      if (!(key0 === "hash")) {
        const err1 = { instancePath, schemaPath: "#/additionalProperties", keyword: "additionalProperties", params: { additionalProperty: key0 }, message: "must NOT have additional properties" };
        if (vErrors === null) {
          vErrors = [err1];
        } else {
          vErrors.push(err1);
        }
        errors++;
      }
    }
    if (data.hash !== void 0) {
      if (typeof data.hash !== "string") {
        const err2 = { instancePath: instancePath + "/hash", schemaPath: "#/properties/hash/type", keyword: "type", params: { type: "string" }, message: "must be string" };
        if (vErrors === null) {
          vErrors = [err2];
        } else {
          vErrors.push(err2);
        }
        errors++;
      }
    }
  } else {
    const err3 = { instancePath, schemaPath: "#/type", keyword: "type", params: { type: "object" }, message: "must be object" };
    if (vErrors === null) {
      vErrors = [err3];
    } else {
      vErrors.push(err3);
    }
    errors++;
  }
  validate89.errors = vErrors;
  return errors === 0;
}
validate89.evaluated = { "props": true, "dynamicProps": false, "dynamicItems": false };
exports.SessionView = validate90;
function validate90(data, { instancePath = "", parentData, parentDataProperty, rootData = data, dynamicAnchors = {} } = {}) {
  ;
  let vErrors = null;
  let errors = 0;
  const evaluated0 = validate90.evaluated;
  if (evaluated0.dynamicProps) {
    evaluated0.props = void 0;
  }
  if (evaluated0.dynamicItems) {
    evaluated0.items = void 0;
  }
  if (data && typeof data == "object" && !Array.isArray(data)) {
    if (data.label === void 0) {
      const err0 = { instancePath, schemaPath: "#/required", keyword: "required", params: { missingProperty: "label" }, message: "must have required property 'label'" };
      if (vErrors === null) {
        vErrors = [err0];
      } else {
        vErrors.push(err0);
      }
      errors++;
    }
    if (data.roles === void 0) {
      const err1 = { instancePath, schemaPath: "#/required", keyword: "required", params: { missingProperty: "roles" }, message: "must have required property 'roles'" };
      if (vErrors === null) {
        vErrors = [err1];
      } else {
        vErrors.push(err1);
      }
      errors++;
    }
    if (data.isAdmin === void 0) {
      const err2 = { instancePath, schemaPath: "#/required", keyword: "required", params: { missingProperty: "isAdmin" }, message: "must have required property 'isAdmin'" };
      if (vErrors === null) {
        vErrors = [err2];
      } else {
        vErrors.push(err2);
      }
      errors++;
    }
    if (data.adminUrl === void 0) {
      const err3 = { instancePath, schemaPath: "#/required", keyword: "required", params: { missingProperty: "adminUrl" }, message: "must have required property 'adminUrl'" };
      if (vErrors === null) {
        vErrors = [err3];
      } else {
        vErrors.push(err3);
      }
      errors++;
    }
    if (data.logoutUrl === void 0) {
      const err4 = { instancePath, schemaPath: "#/required", keyword: "required", params: { missingProperty: "logoutUrl" }, message: "must have required property 'logoutUrl'" };
      if (vErrors === null) {
        vErrors = [err4];
      } else {
        vErrors.push(err4);
      }
      errors++;
    }
    for (const key0 in data) {
      if (!(key0 === "label" || key0 === "roles" || key0 === "isAdmin" || key0 === "adminUrl" || key0 === "logoutUrl")) {
        const err5 = { instancePath, schemaPath: "#/additionalProperties", keyword: "additionalProperties", params: { additionalProperty: key0 }, message: "must NOT have additional properties" };
        if (vErrors === null) {
          vErrors = [err5];
        } else {
          vErrors.push(err5);
        }
        errors++;
      }
    }
    if (data.label !== void 0) {
      let data0 = data.label;
      if (typeof data0 === "string") {
        if (func1(data0) < 1) {
          const err6 = { instancePath: instancePath + "/label", schemaPath: "#/properties/label/minLength", keyword: "minLength", params: { limit: 1 }, message: "must NOT have fewer than 1 characters" };
          if (vErrors === null) {
            vErrors = [err6];
          } else {
            vErrors.push(err6);
          }
          errors++;
        }
      } else {
        const err7 = { instancePath: instancePath + "/label", schemaPath: "#/properties/label/type", keyword: "type", params: { type: "string" }, message: "must be string" };
        if (vErrors === null) {
          vErrors = [err7];
        } else {
          vErrors.push(err7);
        }
        errors++;
      }
    }
    if (data.roles !== void 0) {
      let data1 = data.roles;
      if (Array.isArray(data1)) {
        const len0 = data1.length;
        for (let i0 = 0; i0 < len0; i0++) {
          if (typeof data1[i0] !== "string") {
            const err8 = { instancePath: instancePath + "/roles/" + i0, schemaPath: "#/properties/roles/items/type", keyword: "type", params: { type: "string" }, message: "must be string" };
            if (vErrors === null) {
              vErrors = [err8];
            } else {
              vErrors.push(err8);
            }
            errors++;
          }
        }
      } else {
        const err9 = { instancePath: instancePath + "/roles", schemaPath: "#/properties/roles/type", keyword: "type", params: { type: "array" }, message: "must be array" };
        if (vErrors === null) {
          vErrors = [err9];
        } else {
          vErrors.push(err9);
        }
        errors++;
      }
    }
    if (data.isAdmin !== void 0) {
      if (typeof data.isAdmin !== "boolean") {
        const err10 = { instancePath: instancePath + "/isAdmin", schemaPath: "#/properties/isAdmin/type", keyword: "type", params: { type: "boolean" }, message: "must be boolean" };
        if (vErrors === null) {
          vErrors = [err10];
        } else {
          vErrors.push(err10);
        }
        errors++;
      }
    }
    if (data.adminUrl !== void 0) {
      if (typeof data.adminUrl !== "string") {
        const err11 = { instancePath: instancePath + "/adminUrl", schemaPath: "#/properties/adminUrl/type", keyword: "type", params: { type: "string" }, message: "must be string" };
        if (vErrors === null) {
          vErrors = [err11];
        } else {
          vErrors.push(err11);
        }
        errors++;
      }
    }
    if (data.logoutUrl !== void 0) {
      if (typeof data.logoutUrl !== "string") {
        const err12 = { instancePath: instancePath + "/logoutUrl", schemaPath: "#/properties/logoutUrl/type", keyword: "type", params: { type: "string" }, message: "must be string" };
        if (vErrors === null) {
          vErrors = [err12];
        } else {
          vErrors.push(err12);
        }
        errors++;
      }
    }
  } else {
    const err13 = { instancePath, schemaPath: "#/type", keyword: "type", params: { type: "object" }, message: "must be object" };
    if (vErrors === null) {
      vErrors = [err13];
    } else {
      vErrors.push(err13);
    }
    errors++;
  }
  validate90.errors = vErrors;
  return errors === 0;
}
validate90.evaluated = { "props": true, "dynamicProps": false, "dynamicItems": false };
exports.SheetView = validate91;
var schema115 = { "$schema": "https://json-schema.org/draft/2020-12/schema", "$id": "SheetView.schema.json", "title": "SheetView", "description": "result_sheet\uC758 \uCD9C\uB825: \uBB38\uC9C4\uD45C \uBAA8\uC591(\uBB38\uD56D\uBCC4 \uCE78\uACFC \uAC12, \uBE48\uCE78\uACFC \uC0AC\uC720, \uD655\uC778 \uD45C\uC2DC). \uC644\uB8CC \uC5EC\uBD80\uB294 status\uAC00 ENDED_COMPLETE\uC778\uC9C0\uB85C\uB9CC \uC815\uD55C\uB2E4.", "type": "object", "required": ["sessionId", "setText", "statusText", "complete", "groups", "blanks", "ack"], "properties": { "sessionId": { "type": "string", "minLength": 1 }, "setText": { "type": "string" }, "statusText": { "type": "string" }, "pauseText": { "type": ["string", "null"] }, "complete": { "type": "boolean" }, "groups": { "type": "array", "items": { "type": "object", "required": ["item", "rows"], "properties": { "item": { "type": "string" }, "rows": { "type": "array", "items": { "type": "object", "required": ["slot", "valueText", "statusText", "precision"], "properties": { "slot": { "type": "string" }, "valueText": { "type": "string" }, "statusText": { "type": "string" }, "precision": { "type": "string" } }, "additionalProperties": false } } }, "additionalProperties": false } }, "blanks": { "type": "array", "items": { "type": "object", "required": ["item", "reasonCode", "reasonText"], "properties": { "item": { "type": "string" }, "slot": { "type": "string" }, "reasonCode": { "type": "string" }, "reasonText": { "type": "string" } }, "additionalProperties": false } }, "ack": { "type": "object", "required": ["acknowledged", "text"], "properties": { "acknowledged": { "type": "boolean" }, "text": { "type": "string" } }, "additionalProperties": false } }, "additionalProperties": false };
function validate91(data, { instancePath = "", parentData, parentDataProperty, rootData = data, dynamicAnchors = {} } = {}) {
  ;
  let vErrors = null;
  let errors = 0;
  const evaluated0 = validate91.evaluated;
  if (evaluated0.dynamicProps) {
    evaluated0.props = void 0;
  }
  if (evaluated0.dynamicItems) {
    evaluated0.items = void 0;
  }
  if (data && typeof data == "object" && !Array.isArray(data)) {
    if (data.sessionId === void 0) {
      const err0 = { instancePath, schemaPath: "#/required", keyword: "required", params: { missingProperty: "sessionId" }, message: "must have required property 'sessionId'" };
      if (vErrors === null) {
        vErrors = [err0];
      } else {
        vErrors.push(err0);
      }
      errors++;
    }
    if (data.setText === void 0) {
      const err1 = { instancePath, schemaPath: "#/required", keyword: "required", params: { missingProperty: "setText" }, message: "must have required property 'setText'" };
      if (vErrors === null) {
        vErrors = [err1];
      } else {
        vErrors.push(err1);
      }
      errors++;
    }
    if (data.statusText === void 0) {
      const err2 = { instancePath, schemaPath: "#/required", keyword: "required", params: { missingProperty: "statusText" }, message: "must have required property 'statusText'" };
      if (vErrors === null) {
        vErrors = [err2];
      } else {
        vErrors.push(err2);
      }
      errors++;
    }
    if (data.complete === void 0) {
      const err3 = { instancePath, schemaPath: "#/required", keyword: "required", params: { missingProperty: "complete" }, message: "must have required property 'complete'" };
      if (vErrors === null) {
        vErrors = [err3];
      } else {
        vErrors.push(err3);
      }
      errors++;
    }
    if (data.groups === void 0) {
      const err4 = { instancePath, schemaPath: "#/required", keyword: "required", params: { missingProperty: "groups" }, message: "must have required property 'groups'" };
      if (vErrors === null) {
        vErrors = [err4];
      } else {
        vErrors.push(err4);
      }
      errors++;
    }
    if (data.blanks === void 0) {
      const err5 = { instancePath, schemaPath: "#/required", keyword: "required", params: { missingProperty: "blanks" }, message: "must have required property 'blanks'" };
      if (vErrors === null) {
        vErrors = [err5];
      } else {
        vErrors.push(err5);
      }
      errors++;
    }
    if (data.ack === void 0) {
      const err6 = { instancePath, schemaPath: "#/required", keyword: "required", params: { missingProperty: "ack" }, message: "must have required property 'ack'" };
      if (vErrors === null) {
        vErrors = [err6];
      } else {
        vErrors.push(err6);
      }
      errors++;
    }
    for (const key0 in data) {
      if (!(key0 === "sessionId" || key0 === "setText" || key0 === "statusText" || key0 === "pauseText" || key0 === "complete" || key0 === "groups" || key0 === "blanks" || key0 === "ack")) {
        const err7 = { instancePath, schemaPath: "#/additionalProperties", keyword: "additionalProperties", params: { additionalProperty: key0 }, message: "must NOT have additional properties" };
        if (vErrors === null) {
          vErrors = [err7];
        } else {
          vErrors.push(err7);
        }
        errors++;
      }
    }
    if (data.sessionId !== void 0) {
      let data0 = data.sessionId;
      if (typeof data0 === "string") {
        if (func1(data0) < 1) {
          const err8 = { instancePath: instancePath + "/sessionId", schemaPath: "#/properties/sessionId/minLength", keyword: "minLength", params: { limit: 1 }, message: "must NOT have fewer than 1 characters" };
          if (vErrors === null) {
            vErrors = [err8];
          } else {
            vErrors.push(err8);
          }
          errors++;
        }
      } else {
        const err9 = { instancePath: instancePath + "/sessionId", schemaPath: "#/properties/sessionId/type", keyword: "type", params: { type: "string" }, message: "must be string" };
        if (vErrors === null) {
          vErrors = [err9];
        } else {
          vErrors.push(err9);
        }
        errors++;
      }
    }
    if (data.setText !== void 0) {
      if (typeof data.setText !== "string") {
        const err10 = { instancePath: instancePath + "/setText", schemaPath: "#/properties/setText/type", keyword: "type", params: { type: "string" }, message: "must be string" };
        if (vErrors === null) {
          vErrors = [err10];
        } else {
          vErrors.push(err10);
        }
        errors++;
      }
    }
    if (data.statusText !== void 0) {
      if (typeof data.statusText !== "string") {
        const err11 = { instancePath: instancePath + "/statusText", schemaPath: "#/properties/statusText/type", keyword: "type", params: { type: "string" }, message: "must be string" };
        if (vErrors === null) {
          vErrors = [err11];
        } else {
          vErrors.push(err11);
        }
        errors++;
      }
    }
    if (data.pauseText !== void 0) {
      let data3 = data.pauseText;
      if (typeof data3 !== "string" && data3 !== null) {
        const err12 = { instancePath: instancePath + "/pauseText", schemaPath: "#/properties/pauseText/type", keyword: "type", params: { type: schema115.properties.pauseText.type }, message: "must be string,null" };
        if (vErrors === null) {
          vErrors = [err12];
        } else {
          vErrors.push(err12);
        }
        errors++;
      }
    }
    if (data.complete !== void 0) {
      if (typeof data.complete !== "boolean") {
        const err13 = { instancePath: instancePath + "/complete", schemaPath: "#/properties/complete/type", keyword: "type", params: { type: "boolean" }, message: "must be boolean" };
        if (vErrors === null) {
          vErrors = [err13];
        } else {
          vErrors.push(err13);
        }
        errors++;
      }
    }
    if (data.groups !== void 0) {
      let data5 = data.groups;
      if (Array.isArray(data5)) {
        const len0 = data5.length;
        for (let i0 = 0; i0 < len0; i0++) {
          let data6 = data5[i0];
          if (data6 && typeof data6 == "object" && !Array.isArray(data6)) {
            if (data6.item === void 0) {
              const err14 = { instancePath: instancePath + "/groups/" + i0, schemaPath: "#/properties/groups/items/required", keyword: "required", params: { missingProperty: "item" }, message: "must have required property 'item'" };
              if (vErrors === null) {
                vErrors = [err14];
              } else {
                vErrors.push(err14);
              }
              errors++;
            }
            if (data6.rows === void 0) {
              const err15 = { instancePath: instancePath + "/groups/" + i0, schemaPath: "#/properties/groups/items/required", keyword: "required", params: { missingProperty: "rows" }, message: "must have required property 'rows'" };
              if (vErrors === null) {
                vErrors = [err15];
              } else {
                vErrors.push(err15);
              }
              errors++;
            }
            for (const key1 in data6) {
              if (!(key1 === "item" || key1 === "rows")) {
                const err16 = { instancePath: instancePath + "/groups/" + i0, schemaPath: "#/properties/groups/items/additionalProperties", keyword: "additionalProperties", params: { additionalProperty: key1 }, message: "must NOT have additional properties" };
                if (vErrors === null) {
                  vErrors = [err16];
                } else {
                  vErrors.push(err16);
                }
                errors++;
              }
            }
            if (data6.item !== void 0) {
              if (typeof data6.item !== "string") {
                const err17 = { instancePath: instancePath + "/groups/" + i0 + "/item", schemaPath: "#/properties/groups/items/properties/item/type", keyword: "type", params: { type: "string" }, message: "must be string" };
                if (vErrors === null) {
                  vErrors = [err17];
                } else {
                  vErrors.push(err17);
                }
                errors++;
              }
            }
            if (data6.rows !== void 0) {
              let data8 = data6.rows;
              if (Array.isArray(data8)) {
                const len1 = data8.length;
                for (let i1 = 0; i1 < len1; i1++) {
                  let data9 = data8[i1];
                  if (data9 && typeof data9 == "object" && !Array.isArray(data9)) {
                    if (data9.slot === void 0) {
                      const err18 = { instancePath: instancePath + "/groups/" + i0 + "/rows/" + i1, schemaPath: "#/properties/groups/items/properties/rows/items/required", keyword: "required", params: { missingProperty: "slot" }, message: "must have required property 'slot'" };
                      if (vErrors === null) {
                        vErrors = [err18];
                      } else {
                        vErrors.push(err18);
                      }
                      errors++;
                    }
                    if (data9.valueText === void 0) {
                      const err19 = { instancePath: instancePath + "/groups/" + i0 + "/rows/" + i1, schemaPath: "#/properties/groups/items/properties/rows/items/required", keyword: "required", params: { missingProperty: "valueText" }, message: "must have required property 'valueText'" };
                      if (vErrors === null) {
                        vErrors = [err19];
                      } else {
                        vErrors.push(err19);
                      }
                      errors++;
                    }
                    if (data9.statusText === void 0) {
                      const err20 = { instancePath: instancePath + "/groups/" + i0 + "/rows/" + i1, schemaPath: "#/properties/groups/items/properties/rows/items/required", keyword: "required", params: { missingProperty: "statusText" }, message: "must have required property 'statusText'" };
                      if (vErrors === null) {
                        vErrors = [err20];
                      } else {
                        vErrors.push(err20);
                      }
                      errors++;
                    }
                    if (data9.precision === void 0) {
                      const err21 = { instancePath: instancePath + "/groups/" + i0 + "/rows/" + i1, schemaPath: "#/properties/groups/items/properties/rows/items/required", keyword: "required", params: { missingProperty: "precision" }, message: "must have required property 'precision'" };
                      if (vErrors === null) {
                        vErrors = [err21];
                      } else {
                        vErrors.push(err21);
                      }
                      errors++;
                    }
                    for (const key2 in data9) {
                      if (!(key2 === "slot" || key2 === "valueText" || key2 === "statusText" || key2 === "precision")) {
                        const err22 = { instancePath: instancePath + "/groups/" + i0 + "/rows/" + i1, schemaPath: "#/properties/groups/items/properties/rows/items/additionalProperties", keyword: "additionalProperties", params: { additionalProperty: key2 }, message: "must NOT have additional properties" };
                        if (vErrors === null) {
                          vErrors = [err22];
                        } else {
                          vErrors.push(err22);
                        }
                        errors++;
                      }
                    }
                    if (data9.slot !== void 0) {
                      if (typeof data9.slot !== "string") {
                        const err23 = { instancePath: instancePath + "/groups/" + i0 + "/rows/" + i1 + "/slot", schemaPath: "#/properties/groups/items/properties/rows/items/properties/slot/type", keyword: "type", params: { type: "string" }, message: "must be string" };
                        if (vErrors === null) {
                          vErrors = [err23];
                        } else {
                          vErrors.push(err23);
                        }
                        errors++;
                      }
                    }
                    if (data9.valueText !== void 0) {
                      if (typeof data9.valueText !== "string") {
                        const err24 = { instancePath: instancePath + "/groups/" + i0 + "/rows/" + i1 + "/valueText", schemaPath: "#/properties/groups/items/properties/rows/items/properties/valueText/type", keyword: "type", params: { type: "string" }, message: "must be string" };
                        if (vErrors === null) {
                          vErrors = [err24];
                        } else {
                          vErrors.push(err24);
                        }
                        errors++;
                      }
                    }
                    if (data9.statusText !== void 0) {
                      if (typeof data9.statusText !== "string") {
                        const err25 = { instancePath: instancePath + "/groups/" + i0 + "/rows/" + i1 + "/statusText", schemaPath: "#/properties/groups/items/properties/rows/items/properties/statusText/type", keyword: "type", params: { type: "string" }, message: "must be string" };
                        if (vErrors === null) {
                          vErrors = [err25];
                        } else {
                          vErrors.push(err25);
                        }
                        errors++;
                      }
                    }
                    if (data9.precision !== void 0) {
                      if (typeof data9.precision !== "string") {
                        const err26 = { instancePath: instancePath + "/groups/" + i0 + "/rows/" + i1 + "/precision", schemaPath: "#/properties/groups/items/properties/rows/items/properties/precision/type", keyword: "type", params: { type: "string" }, message: "must be string" };
                        if (vErrors === null) {
                          vErrors = [err26];
                        } else {
                          vErrors.push(err26);
                        }
                        errors++;
                      }
                    }
                  } else {
                    const err27 = { instancePath: instancePath + "/groups/" + i0 + "/rows/" + i1, schemaPath: "#/properties/groups/items/properties/rows/items/type", keyword: "type", params: { type: "object" }, message: "must be object" };
                    if (vErrors === null) {
                      vErrors = [err27];
                    } else {
                      vErrors.push(err27);
                    }
                    errors++;
                  }
                }
              } else {
                const err28 = { instancePath: instancePath + "/groups/" + i0 + "/rows", schemaPath: "#/properties/groups/items/properties/rows/type", keyword: "type", params: { type: "array" }, message: "must be array" };
                if (vErrors === null) {
                  vErrors = [err28];
                } else {
                  vErrors.push(err28);
                }
                errors++;
              }
            }
          } else {
            const err29 = { instancePath: instancePath + "/groups/" + i0, schemaPath: "#/properties/groups/items/type", keyword: "type", params: { type: "object" }, message: "must be object" };
            if (vErrors === null) {
              vErrors = [err29];
            } else {
              vErrors.push(err29);
            }
            errors++;
          }
        }
      } else {
        const err30 = { instancePath: instancePath + "/groups", schemaPath: "#/properties/groups/type", keyword: "type", params: { type: "array" }, message: "must be array" };
        if (vErrors === null) {
          vErrors = [err30];
        } else {
          vErrors.push(err30);
        }
        errors++;
      }
    }
    if (data.blanks !== void 0) {
      let data14 = data.blanks;
      if (Array.isArray(data14)) {
        const len2 = data14.length;
        for (let i2 = 0; i2 < len2; i2++) {
          let data15 = data14[i2];
          if (data15 && typeof data15 == "object" && !Array.isArray(data15)) {
            if (data15.item === void 0) {
              const err31 = { instancePath: instancePath + "/blanks/" + i2, schemaPath: "#/properties/blanks/items/required", keyword: "required", params: { missingProperty: "item" }, message: "must have required property 'item'" };
              if (vErrors === null) {
                vErrors = [err31];
              } else {
                vErrors.push(err31);
              }
              errors++;
            }
            if (data15.reasonCode === void 0) {
              const err32 = { instancePath: instancePath + "/blanks/" + i2, schemaPath: "#/properties/blanks/items/required", keyword: "required", params: { missingProperty: "reasonCode" }, message: "must have required property 'reasonCode'" };
              if (vErrors === null) {
                vErrors = [err32];
              } else {
                vErrors.push(err32);
              }
              errors++;
            }
            if (data15.reasonText === void 0) {
              const err33 = { instancePath: instancePath + "/blanks/" + i2, schemaPath: "#/properties/blanks/items/required", keyword: "required", params: { missingProperty: "reasonText" }, message: "must have required property 'reasonText'" };
              if (vErrors === null) {
                vErrors = [err33];
              } else {
                vErrors.push(err33);
              }
              errors++;
            }
            for (const key3 in data15) {
              if (!(key3 === "item" || key3 === "slot" || key3 === "reasonCode" || key3 === "reasonText")) {
                const err34 = { instancePath: instancePath + "/blanks/" + i2, schemaPath: "#/properties/blanks/items/additionalProperties", keyword: "additionalProperties", params: { additionalProperty: key3 }, message: "must NOT have additional properties" };
                if (vErrors === null) {
                  vErrors = [err34];
                } else {
                  vErrors.push(err34);
                }
                errors++;
              }
            }
            if (data15.item !== void 0) {
              if (typeof data15.item !== "string") {
                const err35 = { instancePath: instancePath + "/blanks/" + i2 + "/item", schemaPath: "#/properties/blanks/items/properties/item/type", keyword: "type", params: { type: "string" }, message: "must be string" };
                if (vErrors === null) {
                  vErrors = [err35];
                } else {
                  vErrors.push(err35);
                }
                errors++;
              }
            }
            if (data15.slot !== void 0) {
              if (typeof data15.slot !== "string") {
                const err36 = { instancePath: instancePath + "/blanks/" + i2 + "/slot", schemaPath: "#/properties/blanks/items/properties/slot/type", keyword: "type", params: { type: "string" }, message: "must be string" };
                if (vErrors === null) {
                  vErrors = [err36];
                } else {
                  vErrors.push(err36);
                }
                errors++;
              }
            }
            if (data15.reasonCode !== void 0) {
              if (typeof data15.reasonCode !== "string") {
                const err37 = { instancePath: instancePath + "/blanks/" + i2 + "/reasonCode", schemaPath: "#/properties/blanks/items/properties/reasonCode/type", keyword: "type", params: { type: "string" }, message: "must be string" };
                if (vErrors === null) {
                  vErrors = [err37];
                } else {
                  vErrors.push(err37);
                }
                errors++;
              }
            }
            if (data15.reasonText !== void 0) {
              if (typeof data15.reasonText !== "string") {
                const err38 = { instancePath: instancePath + "/blanks/" + i2 + "/reasonText", schemaPath: "#/properties/blanks/items/properties/reasonText/type", keyword: "type", params: { type: "string" }, message: "must be string" };
                if (vErrors === null) {
                  vErrors = [err38];
                } else {
                  vErrors.push(err38);
                }
                errors++;
              }
            }
          } else {
            const err39 = { instancePath: instancePath + "/blanks/" + i2, schemaPath: "#/properties/blanks/items/type", keyword: "type", params: { type: "object" }, message: "must be object" };
            if (vErrors === null) {
              vErrors = [err39];
            } else {
              vErrors.push(err39);
            }
            errors++;
          }
        }
      } else {
        const err40 = { instancePath: instancePath + "/blanks", schemaPath: "#/properties/blanks/type", keyword: "type", params: { type: "array" }, message: "must be array" };
        if (vErrors === null) {
          vErrors = [err40];
        } else {
          vErrors.push(err40);
        }
        errors++;
      }
    }
    if (data.ack !== void 0) {
      let data20 = data.ack;
      if (data20 && typeof data20 == "object" && !Array.isArray(data20)) {
        if (data20.acknowledged === void 0) {
          const err41 = { instancePath: instancePath + "/ack", schemaPath: "#/properties/ack/required", keyword: "required", params: { missingProperty: "acknowledged" }, message: "must have required property 'acknowledged'" };
          if (vErrors === null) {
            vErrors = [err41];
          } else {
            vErrors.push(err41);
          }
          errors++;
        }
        if (data20.text === void 0) {
          const err42 = { instancePath: instancePath + "/ack", schemaPath: "#/properties/ack/required", keyword: "required", params: { missingProperty: "text" }, message: "must have required property 'text'" };
          if (vErrors === null) {
            vErrors = [err42];
          } else {
            vErrors.push(err42);
          }
          errors++;
        }
        for (const key4 in data20) {
          if (!(key4 === "acknowledged" || key4 === "text")) {
            const err43 = { instancePath: instancePath + "/ack", schemaPath: "#/properties/ack/additionalProperties", keyword: "additionalProperties", params: { additionalProperty: key4 }, message: "must NOT have additional properties" };
            if (vErrors === null) {
              vErrors = [err43];
            } else {
              vErrors.push(err43);
            }
            errors++;
          }
        }
        if (data20.acknowledged !== void 0) {
          if (typeof data20.acknowledged !== "boolean") {
            const err44 = { instancePath: instancePath + "/ack/acknowledged", schemaPath: "#/properties/ack/properties/acknowledged/type", keyword: "type", params: { type: "boolean" }, message: "must be boolean" };
            if (vErrors === null) {
              vErrors = [err44];
            } else {
              vErrors.push(err44);
            }
            errors++;
          }
        }
        if (data20.text !== void 0) {
          if (typeof data20.text !== "string") {
            const err45 = { instancePath: instancePath + "/ack/text", schemaPath: "#/properties/ack/properties/text/type", keyword: "type", params: { type: "string" }, message: "must be string" };
            if (vErrors === null) {
              vErrors = [err45];
            } else {
              vErrors.push(err45);
            }
            errors++;
          }
        }
      } else {
        const err46 = { instancePath: instancePath + "/ack", schemaPath: "#/properties/ack/type", keyword: "type", params: { type: "object" }, message: "must be object" };
        if (vErrors === null) {
          vErrors = [err46];
        } else {
          vErrors.push(err46);
        }
        errors++;
      }
    }
  } else {
    const err47 = { instancePath, schemaPath: "#/type", keyword: "type", params: { type: "object" }, message: "must be object" };
    if (vErrors === null) {
      vErrors = [err47];
    } else {
      vErrors.push(err47);
    }
    errors++;
  }
  validate91.errors = vErrors;
  return errors === 0;
}
validate91.evaluated = { "props": true, "dynamicProps": false, "dynamicItems": false };
exports.SubmissionIdInput = validate92;
function validate92(data, { instancePath = "", parentData, parentDataProperty, rootData = data, dynamicAnchors = {} } = {}) {
  ;
  let vErrors = null;
  let errors = 0;
  const evaluated0 = validate92.evaluated;
  if (evaluated0.dynamicProps) {
    evaluated0.props = void 0;
  }
  if (evaluated0.dynamicItems) {
    evaluated0.items = void 0;
  }
  if (data && typeof data == "object" && !Array.isArray(data)) {
    if (data.submissionId === void 0) {
      const err0 = { instancePath, schemaPath: "#/required", keyword: "required", params: { missingProperty: "submissionId" }, message: "must have required property 'submissionId'" };
      if (vErrors === null) {
        vErrors = [err0];
      } else {
        vErrors.push(err0);
      }
      errors++;
    }
    for (const key0 in data) {
      if (!(key0 === "submissionId")) {
        const err1 = { instancePath, schemaPath: "#/additionalProperties", keyword: "additionalProperties", params: { additionalProperty: key0 }, message: "must NOT have additional properties" };
        if (vErrors === null) {
          vErrors = [err1];
        } else {
          vErrors.push(err1);
        }
        errors++;
      }
    }
    if (data.submissionId !== void 0) {
      let data0 = data.submissionId;
      if (typeof data0 === "string") {
        if (func1(data0) < 1) {
          const err2 = { instancePath: instancePath + "/submissionId", schemaPath: "#/properties/submissionId/minLength", keyword: "minLength", params: { limit: 1 }, message: "must NOT have fewer than 1 characters" };
          if (vErrors === null) {
            vErrors = [err2];
          } else {
            vErrors.push(err2);
          }
          errors++;
        }
      } else {
        const err3 = { instancePath: instancePath + "/submissionId", schemaPath: "#/properties/submissionId/type", keyword: "type", params: { type: "string" }, message: "must be string" };
        if (vErrors === null) {
          vErrors = [err3];
        } else {
          vErrors.push(err3);
        }
        errors++;
      }
    }
  } else {
    const err4 = { instancePath, schemaPath: "#/type", keyword: "type", params: { type: "object" }, message: "must be object" };
    if (vErrors === null) {
      vErrors = [err4];
    } else {
      vErrors.push(err4);
    }
    errors++;
  }
  validate92.errors = vErrors;
  return errors === 0;
}
validate92.evaluated = { "props": true, "dynamicProps": false, "dynamicItems": false };
exports.SubmissionPage = validate93;
var schema117 = { "$schema": "https://json-schema.org/draft/2020-12/schema", "$id": "SubmissionPage.schema.json", "title": "SubmissionPage", "description": "link_gate_list_awaiting\uC758 \uCD9C\uB825. \uB2E4\uC74C \uCABD \uCEE4\uC11C\uAC00 null\uC774\uBA74 \uB05D.", "type": "object", "required": ["items", "nextCursor"], "properties": { "items": { "type": "array", "items": { "$ref": "SubmissionRow.schema.json" } }, "nextCursor": { "type": ["string", "null"] } }, "additionalProperties": false };
var schema118 = { "$schema": "https://json-schema.org/draft/2020-12/schema", "$id": "SubmissionRow.schema.json", "title": "SubmissionRow", "description": "\uC2B9\uC778 \uB300\uAE30 \uBAA9\uB85D\uC758 \uD55C \uC904(SubmissionView\uC758 \uC77D\uAE30\uC6A9 \uD22C\uC601). \uC77D\uC744 \uB54C\uB294 \uAD00\uB300\uD558\uB2E4: \uBAA8\uB974\uB294 \uD544\uB4DC\uB294 \uBCF4\uC874\uD558\uACE0 status\uC758 \uBAA8\uB974\uB294 \uAC12\uB3C4 \uBC1B\uB294\uB2E4(CONVENTIONS 1\uC808, ADR 0016).", "type": "object", "required": ["submission_id", "status", "subject"], "properties": { "submission_id": { "type": "string", "minLength": 1 }, "status": { "type": "string" }, "subject": { "type": "object" }, "submitted_at": { "type": "string" }, "submitted_by_role": { "type": "string" }, "updated_at": { "type": "string" }, "decision_id": { "type": ["string", "null"] }, "approval_id": { "type": ["string", "null"] }, "release_id": { "type": ["string", "null"] } } };
function validate93(data, { instancePath = "", parentData, parentDataProperty, rootData = data, dynamicAnchors = {} } = {}) {
  ;
  let vErrors = null;
  let errors = 0;
  const evaluated0 = validate93.evaluated;
  if (evaluated0.dynamicProps) {
    evaluated0.props = void 0;
  }
  if (evaluated0.dynamicItems) {
    evaluated0.items = void 0;
  }
  if (data && typeof data == "object" && !Array.isArray(data)) {
    if (data.items === void 0) {
      const err0 = { instancePath, schemaPath: "#/required", keyword: "required", params: { missingProperty: "items" }, message: "must have required property 'items'" };
      if (vErrors === null) {
        vErrors = [err0];
      } else {
        vErrors.push(err0);
      }
      errors++;
    }
    if (data.nextCursor === void 0) {
      const err1 = { instancePath, schemaPath: "#/required", keyword: "required", params: { missingProperty: "nextCursor" }, message: "must have required property 'nextCursor'" };
      if (vErrors === null) {
        vErrors = [err1];
      } else {
        vErrors.push(err1);
      }
      errors++;
    }
    for (const key0 in data) {
      if (!(key0 === "items" || key0 === "nextCursor")) {
        const err2 = { instancePath, schemaPath: "#/additionalProperties", keyword: "additionalProperties", params: { additionalProperty: key0 }, message: "must NOT have additional properties" };
        if (vErrors === null) {
          vErrors = [err2];
        } else {
          vErrors.push(err2);
        }
        errors++;
      }
    }
    if (data.items !== void 0) {
      let data0 = data.items;
      if (Array.isArray(data0)) {
        const len0 = data0.length;
        for (let i0 = 0; i0 < len0; i0++) {
          let data1 = data0[i0];
          if (data1 && typeof data1 == "object" && !Array.isArray(data1)) {
            if (data1.submission_id === void 0) {
              const err3 = { instancePath: instancePath + "/items/" + i0, schemaPath: "SubmissionRow.schema.json/required", keyword: "required", params: { missingProperty: "submission_id" }, message: "must have required property 'submission_id'" };
              if (vErrors === null) {
                vErrors = [err3];
              } else {
                vErrors.push(err3);
              }
              errors++;
            }
            if (data1.status === void 0) {
              const err4 = { instancePath: instancePath + "/items/" + i0, schemaPath: "SubmissionRow.schema.json/required", keyword: "required", params: { missingProperty: "status" }, message: "must have required property 'status'" };
              if (vErrors === null) {
                vErrors = [err4];
              } else {
                vErrors.push(err4);
              }
              errors++;
            }
            if (data1.subject === void 0) {
              const err5 = { instancePath: instancePath + "/items/" + i0, schemaPath: "SubmissionRow.schema.json/required", keyword: "required", params: { missingProperty: "subject" }, message: "must have required property 'subject'" };
              if (vErrors === null) {
                vErrors = [err5];
              } else {
                vErrors.push(err5);
              }
              errors++;
            }
            if (data1.submission_id !== void 0) {
              let data2 = data1.submission_id;
              if (typeof data2 === "string") {
                if (func1(data2) < 1) {
                  const err6 = { instancePath: instancePath + "/items/" + i0 + "/submission_id", schemaPath: "SubmissionRow.schema.json/properties/submission_id/minLength", keyword: "minLength", params: { limit: 1 }, message: "must NOT have fewer than 1 characters" };
                  if (vErrors === null) {
                    vErrors = [err6];
                  } else {
                    vErrors.push(err6);
                  }
                  errors++;
                }
              } else {
                const err7 = { instancePath: instancePath + "/items/" + i0 + "/submission_id", schemaPath: "SubmissionRow.schema.json/properties/submission_id/type", keyword: "type", params: { type: "string" }, message: "must be string" };
                if (vErrors === null) {
                  vErrors = [err7];
                } else {
                  vErrors.push(err7);
                }
                errors++;
              }
            }
            if (data1.status !== void 0) {
              if (typeof data1.status !== "string") {
                const err8 = { instancePath: instancePath + "/items/" + i0 + "/status", schemaPath: "SubmissionRow.schema.json/properties/status/type", keyword: "type", params: { type: "string" }, message: "must be string" };
                if (vErrors === null) {
                  vErrors = [err8];
                } else {
                  vErrors.push(err8);
                }
                errors++;
              }
            }
            if (data1.subject !== void 0) {
              let data4 = data1.subject;
              if (!(data4 && typeof data4 == "object" && !Array.isArray(data4))) {
                const err9 = { instancePath: instancePath + "/items/" + i0 + "/subject", schemaPath: "SubmissionRow.schema.json/properties/subject/type", keyword: "type", params: { type: "object" }, message: "must be object" };
                if (vErrors === null) {
                  vErrors = [err9];
                } else {
                  vErrors.push(err9);
                }
                errors++;
              }
            }
            if (data1.submitted_at !== void 0) {
              if (typeof data1.submitted_at !== "string") {
                const err10 = { instancePath: instancePath + "/items/" + i0 + "/submitted_at", schemaPath: "SubmissionRow.schema.json/properties/submitted_at/type", keyword: "type", params: { type: "string" }, message: "must be string" };
                if (vErrors === null) {
                  vErrors = [err10];
                } else {
                  vErrors.push(err10);
                }
                errors++;
              }
            }
            if (data1.submitted_by_role !== void 0) {
              if (typeof data1.submitted_by_role !== "string") {
                const err11 = { instancePath: instancePath + "/items/" + i0 + "/submitted_by_role", schemaPath: "SubmissionRow.schema.json/properties/submitted_by_role/type", keyword: "type", params: { type: "string" }, message: "must be string" };
                if (vErrors === null) {
                  vErrors = [err11];
                } else {
                  vErrors.push(err11);
                }
                errors++;
              }
            }
            if (data1.updated_at !== void 0) {
              if (typeof data1.updated_at !== "string") {
                const err12 = { instancePath: instancePath + "/items/" + i0 + "/updated_at", schemaPath: "SubmissionRow.schema.json/properties/updated_at/type", keyword: "type", params: { type: "string" }, message: "must be string" };
                if (vErrors === null) {
                  vErrors = [err12];
                } else {
                  vErrors.push(err12);
                }
                errors++;
              }
            }
            if (data1.decision_id !== void 0) {
              let data8 = data1.decision_id;
              if (typeof data8 !== "string" && data8 !== null) {
                const err13 = { instancePath: instancePath + "/items/" + i0 + "/decision_id", schemaPath: "SubmissionRow.schema.json/properties/decision_id/type", keyword: "type", params: { type: schema118.properties.decision_id.type }, message: "must be string,null" };
                if (vErrors === null) {
                  vErrors = [err13];
                } else {
                  vErrors.push(err13);
                }
                errors++;
              }
            }
            if (data1.approval_id !== void 0) {
              let data9 = data1.approval_id;
              if (typeof data9 !== "string" && data9 !== null) {
                const err14 = { instancePath: instancePath + "/items/" + i0 + "/approval_id", schemaPath: "SubmissionRow.schema.json/properties/approval_id/type", keyword: "type", params: { type: schema118.properties.approval_id.type }, message: "must be string,null" };
                if (vErrors === null) {
                  vErrors = [err14];
                } else {
                  vErrors.push(err14);
                }
                errors++;
              }
            }
            if (data1.release_id !== void 0) {
              let data10 = data1.release_id;
              if (typeof data10 !== "string" && data10 !== null) {
                const err15 = { instancePath: instancePath + "/items/" + i0 + "/release_id", schemaPath: "SubmissionRow.schema.json/properties/release_id/type", keyword: "type", params: { type: schema118.properties.release_id.type }, message: "must be string,null" };
                if (vErrors === null) {
                  vErrors = [err15];
                } else {
                  vErrors.push(err15);
                }
                errors++;
              }
            }
          } else {
            const err16 = { instancePath: instancePath + "/items/" + i0, schemaPath: "SubmissionRow.schema.json/type", keyword: "type", params: { type: "object" }, message: "must be object" };
            if (vErrors === null) {
              vErrors = [err16];
            } else {
              vErrors.push(err16);
            }
            errors++;
          }
        }
      } else {
        const err17 = { instancePath: instancePath + "/items", schemaPath: "#/properties/items/type", keyword: "type", params: { type: "array" }, message: "must be array" };
        if (vErrors === null) {
          vErrors = [err17];
        } else {
          vErrors.push(err17);
        }
        errors++;
      }
    }
    if (data.nextCursor !== void 0) {
      let data11 = data.nextCursor;
      if (typeof data11 !== "string" && data11 !== null) {
        const err18 = { instancePath: instancePath + "/nextCursor", schemaPath: "#/properties/nextCursor/type", keyword: "type", params: { type: schema117.properties.nextCursor.type }, message: "must be string,null" };
        if (vErrors === null) {
          vErrors = [err18];
        } else {
          vErrors.push(err18);
        }
        errors++;
      }
    }
  } else {
    const err19 = { instancePath, schemaPath: "#/type", keyword: "type", params: { type: "object" }, message: "must be object" };
    if (vErrors === null) {
      vErrors = [err19];
    } else {
      vErrors.push(err19);
    }
    errors++;
  }
  validate93.errors = vErrors;
  return errors === 0;
}
validate93.evaluated = { "props": true, "dynamicProps": false, "dynamicItems": false };
exports.SubmissionRow = validate94;
function validate94(data, { instancePath = "", parentData, parentDataProperty, rootData = data, dynamicAnchors = {} } = {}) {
  ;
  let vErrors = null;
  let errors = 0;
  const evaluated0 = validate94.evaluated;
  if (evaluated0.dynamicProps) {
    evaluated0.props = void 0;
  }
  if (evaluated0.dynamicItems) {
    evaluated0.items = void 0;
  }
  if (data && typeof data == "object" && !Array.isArray(data)) {
    if (data.submission_id === void 0) {
      const err0 = { instancePath, schemaPath: "#/required", keyword: "required", params: { missingProperty: "submission_id" }, message: "must have required property 'submission_id'" };
      if (vErrors === null) {
        vErrors = [err0];
      } else {
        vErrors.push(err0);
      }
      errors++;
    }
    if (data.status === void 0) {
      const err1 = { instancePath, schemaPath: "#/required", keyword: "required", params: { missingProperty: "status" }, message: "must have required property 'status'" };
      if (vErrors === null) {
        vErrors = [err1];
      } else {
        vErrors.push(err1);
      }
      errors++;
    }
    if (data.subject === void 0) {
      const err2 = { instancePath, schemaPath: "#/required", keyword: "required", params: { missingProperty: "subject" }, message: "must have required property 'subject'" };
      if (vErrors === null) {
        vErrors = [err2];
      } else {
        vErrors.push(err2);
      }
      errors++;
    }
    if (data.submission_id !== void 0) {
      let data0 = data.submission_id;
      if (typeof data0 === "string") {
        if (func1(data0) < 1) {
          const err3 = { instancePath: instancePath + "/submission_id", schemaPath: "#/properties/submission_id/minLength", keyword: "minLength", params: { limit: 1 }, message: "must NOT have fewer than 1 characters" };
          if (vErrors === null) {
            vErrors = [err3];
          } else {
            vErrors.push(err3);
          }
          errors++;
        }
      } else {
        const err4 = { instancePath: instancePath + "/submission_id", schemaPath: "#/properties/submission_id/type", keyword: "type", params: { type: "string" }, message: "must be string" };
        if (vErrors === null) {
          vErrors = [err4];
        } else {
          vErrors.push(err4);
        }
        errors++;
      }
    }
    if (data.status !== void 0) {
      if (typeof data.status !== "string") {
        const err5 = { instancePath: instancePath + "/status", schemaPath: "#/properties/status/type", keyword: "type", params: { type: "string" }, message: "must be string" };
        if (vErrors === null) {
          vErrors = [err5];
        } else {
          vErrors.push(err5);
        }
        errors++;
      }
    }
    if (data.subject !== void 0) {
      let data2 = data.subject;
      if (!(data2 && typeof data2 == "object" && !Array.isArray(data2))) {
        const err6 = { instancePath: instancePath + "/subject", schemaPath: "#/properties/subject/type", keyword: "type", params: { type: "object" }, message: "must be object" };
        if (vErrors === null) {
          vErrors = [err6];
        } else {
          vErrors.push(err6);
        }
        errors++;
      }
    }
    if (data.submitted_at !== void 0) {
      if (typeof data.submitted_at !== "string") {
        const err7 = { instancePath: instancePath + "/submitted_at", schemaPath: "#/properties/submitted_at/type", keyword: "type", params: { type: "string" }, message: "must be string" };
        if (vErrors === null) {
          vErrors = [err7];
        } else {
          vErrors.push(err7);
        }
        errors++;
      }
    }
    if (data.submitted_by_role !== void 0) {
      if (typeof data.submitted_by_role !== "string") {
        const err8 = { instancePath: instancePath + "/submitted_by_role", schemaPath: "#/properties/submitted_by_role/type", keyword: "type", params: { type: "string" }, message: "must be string" };
        if (vErrors === null) {
          vErrors = [err8];
        } else {
          vErrors.push(err8);
        }
        errors++;
      }
    }
    if (data.updated_at !== void 0) {
      if (typeof data.updated_at !== "string") {
        const err9 = { instancePath: instancePath + "/updated_at", schemaPath: "#/properties/updated_at/type", keyword: "type", params: { type: "string" }, message: "must be string" };
        if (vErrors === null) {
          vErrors = [err9];
        } else {
          vErrors.push(err9);
        }
        errors++;
      }
    }
    if (data.decision_id !== void 0) {
      let data6 = data.decision_id;
      if (typeof data6 !== "string" && data6 !== null) {
        const err10 = { instancePath: instancePath + "/decision_id", schemaPath: "#/properties/decision_id/type", keyword: "type", params: { type: schema118.properties.decision_id.type }, message: "must be string,null" };
        if (vErrors === null) {
          vErrors = [err10];
        } else {
          vErrors.push(err10);
        }
        errors++;
      }
    }
    if (data.approval_id !== void 0) {
      let data7 = data.approval_id;
      if (typeof data7 !== "string" && data7 !== null) {
        const err11 = { instancePath: instancePath + "/approval_id", schemaPath: "#/properties/approval_id/type", keyword: "type", params: { type: schema118.properties.approval_id.type }, message: "must be string,null" };
        if (vErrors === null) {
          vErrors = [err11];
        } else {
          vErrors.push(err11);
        }
        errors++;
      }
    }
    if (data.release_id !== void 0) {
      let data8 = data.release_id;
      if (typeof data8 !== "string" && data8 !== null) {
        const err12 = { instancePath: instancePath + "/release_id", schemaPath: "#/properties/release_id/type", keyword: "type", params: { type: schema118.properties.release_id.type }, message: "must be string,null" };
        if (vErrors === null) {
          vErrors = [err12];
        } else {
          vErrors.push(err12);
        }
        errors++;
      }
    }
  } else {
    const err13 = { instancePath, schemaPath: "#/type", keyword: "type", params: { type: "object" }, message: "must be object" };
    if (vErrors === null) {
      vErrors = [err13];
    } else {
      vErrors.push(err13);
    }
    errors++;
  }
  validate94.errors = vErrors;
  return errors === 0;
}
validate94.evaluated = { "props": { "submission_id": true, "status": true, "subject": true, "submitted_at": true, "submitted_by_role": true, "updated_at": true, "decision_id": true, "approval_id": true, "release_id": true }, "dynamicProps": false, "dynamicItems": false };
exports.TimeInput = validate95;
var schema120 = { "$schema": "https://json-schema.org/draft/2020-12/schema", "$id": "TimeInput.schema.json", "title": "TimeInput", "description": "time_display\uC758 \uC785\uB825: \uC11C\uBC84\uAC00 \uC900 \uC2DC\uAC01 \uC6D0\uBB38(\uC5C6\uC744 \uC218 \uC788\uC74C)\uACFC \uC120\uD0DD\uC801 \uC2DC\uAC04\uB300.", "type": "object", "required": ["iso"], "properties": { "iso": { "type": ["string", "null"] }, "timeZone": { "type": "string" } }, "additionalProperties": false };
function validate95(data, { instancePath = "", parentData, parentDataProperty, rootData = data, dynamicAnchors = {} } = {}) {
  ;
  let vErrors = null;
  let errors = 0;
  const evaluated0 = validate95.evaluated;
  if (evaluated0.dynamicProps) {
    evaluated0.props = void 0;
  }
  if (evaluated0.dynamicItems) {
    evaluated0.items = void 0;
  }
  if (data && typeof data == "object" && !Array.isArray(data)) {
    if (data.iso === void 0) {
      const err0 = { instancePath, schemaPath: "#/required", keyword: "required", params: { missingProperty: "iso" }, message: "must have required property 'iso'" };
      if (vErrors === null) {
        vErrors = [err0];
      } else {
        vErrors.push(err0);
      }
      errors++;
    }
    for (const key0 in data) {
      if (!(key0 === "iso" || key0 === "timeZone")) {
        const err1 = { instancePath, schemaPath: "#/additionalProperties", keyword: "additionalProperties", params: { additionalProperty: key0 }, message: "must NOT have additional properties" };
        if (vErrors === null) {
          vErrors = [err1];
        } else {
          vErrors.push(err1);
        }
        errors++;
      }
    }
    if (data.iso !== void 0) {
      let data0 = data.iso;
      if (typeof data0 !== "string" && data0 !== null) {
        const err2 = { instancePath: instancePath + "/iso", schemaPath: "#/properties/iso/type", keyword: "type", params: { type: schema120.properties.iso.type }, message: "must be string,null" };
        if (vErrors === null) {
          vErrors = [err2];
        } else {
          vErrors.push(err2);
        }
        errors++;
      }
    }
    if (data.timeZone !== void 0) {
      if (typeof data.timeZone !== "string") {
        const err3 = { instancePath: instancePath + "/timeZone", schemaPath: "#/properties/timeZone/type", keyword: "type", params: { type: "string" }, message: "must be string" };
        if (vErrors === null) {
          vErrors = [err3];
        } else {
          vErrors.push(err3);
        }
        errors++;
      }
    }
  } else {
    const err4 = { instancePath, schemaPath: "#/type", keyword: "type", params: { type: "object" }, message: "must be object" };
    if (vErrors === null) {
      vErrors = [err4];
    } else {
      vErrors.push(err4);
    }
    errors++;
  }
  validate95.errors = vErrors;
  return errors === 0;
}
validate95.evaluated = { "props": true, "dynamicProps": false, "dynamicItems": false };
exports.TimeText = validate96;
function validate96(data, { instancePath = "", parentData, parentDataProperty, rootData = data, dynamicAnchors = {} } = {}) {
  ;
  let vErrors = null;
  let errors = 0;
  const evaluated0 = validate96.evaluated;
  if (evaluated0.dynamicProps) {
    evaluated0.props = void 0;
  }
  if (evaluated0.dynamicItems) {
    evaluated0.items = void 0;
  }
  if (data && typeof data == "object" && !Array.isArray(data)) {
    if (data.text === void 0) {
      const err0 = { instancePath, schemaPath: "#/required", keyword: "required", params: { missingProperty: "text" }, message: "must have required property 'text'" };
      if (vErrors === null) {
        vErrors = [err0];
      } else {
        vErrors.push(err0);
      }
      errors++;
    }
    for (const key0 in data) {
      if (!(key0 === "text")) {
        const err1 = { instancePath, schemaPath: "#/additionalProperties", keyword: "additionalProperties", params: { additionalProperty: key0 }, message: "must NOT have additional properties" };
        if (vErrors === null) {
          vErrors = [err1];
        } else {
          vErrors.push(err1);
        }
        errors++;
      }
    }
    if (data.text !== void 0) {
      let data0 = data.text;
      if (typeof data0 === "string") {
        if (func1(data0) < 1) {
          const err2 = { instancePath: instancePath + "/text", schemaPath: "#/properties/text/minLength", keyword: "minLength", params: { limit: 1 }, message: "must NOT have fewer than 1 characters" };
          if (vErrors === null) {
            vErrors = [err2];
          } else {
            vErrors.push(err2);
          }
          errors++;
        }
      } else {
        const err3 = { instancePath: instancePath + "/text", schemaPath: "#/properties/text/type", keyword: "type", params: { type: "string" }, message: "must be string" };
        if (vErrors === null) {
          vErrors = [err3];
        } else {
          vErrors.push(err3);
        }
        errors++;
      }
    }
  } else {
    const err4 = { instancePath, schemaPath: "#/type", keyword: "type", params: { type: "object" }, message: "must be object" };
    if (vErrors === null) {
      vErrors = [err4];
    } else {
      vErrors.push(err4);
    }
    errors++;
  }
  validate96.errors = vErrors;
  return errors === 0;
}
validate96.evaluated = { "props": true, "dynamicProps": false, "dynamicItems": false };
exports.TracePrefill = validate97;
var schema122 = { "$schema": "https://json-schema.org/draft/2020-12/schema", "$id": "TracePrefill.schema.json", "title": "TracePrefill", "description": "case_trace_prefill\uC758 \uCD9C\uB825: \uD3B8\uC9D1\uCC3D\uC5D0 \uCC44\uC6B8 \uAE00. \uCC44\uC6B8 \uC785\uB825\uC774 trace\uC5D0 \uC5C6\uC73C\uBA74 null.", "type": "object", "required": ["inputText"], "properties": { "inputText": { "type": ["string", "null"] } }, "additionalProperties": false };
function validate97(data, { instancePath = "", parentData, parentDataProperty, rootData = data, dynamicAnchors = {} } = {}) {
  ;
  let vErrors = null;
  let errors = 0;
  const evaluated0 = validate97.evaluated;
  if (evaluated0.dynamicProps) {
    evaluated0.props = void 0;
  }
  if (evaluated0.dynamicItems) {
    evaluated0.items = void 0;
  }
  if (data && typeof data == "object" && !Array.isArray(data)) {
    if (data.inputText === void 0) {
      const err0 = { instancePath, schemaPath: "#/required", keyword: "required", params: { missingProperty: "inputText" }, message: "must have required property 'inputText'" };
      if (vErrors === null) {
        vErrors = [err0];
      } else {
        vErrors.push(err0);
      }
      errors++;
    }
    for (const key0 in data) {
      if (!(key0 === "inputText")) {
        const err1 = { instancePath, schemaPath: "#/additionalProperties", keyword: "additionalProperties", params: { additionalProperty: key0 }, message: "must NOT have additional properties" };
        if (vErrors === null) {
          vErrors = [err1];
        } else {
          vErrors.push(err1);
        }
        errors++;
      }
    }
    if (data.inputText !== void 0) {
      let data0 = data.inputText;
      if (typeof data0 !== "string" && data0 !== null) {
        const err2 = { instancePath: instancePath + "/inputText", schemaPath: "#/properties/inputText/type", keyword: "type", params: { type: schema122.properties.inputText.type }, message: "must be string,null" };
        if (vErrors === null) {
          vErrors = [err2];
        } else {
          vErrors.push(err2);
        }
        errors++;
      }
    }
  } else {
    const err3 = { instancePath, schemaPath: "#/type", keyword: "type", params: { type: "object" }, message: "must be object" };
    if (vErrors === null) {
      vErrors = [err3];
    } else {
      vErrors.push(err3);
    }
    errors++;
  }
  validate97.errors = vErrors;
  return errors === 0;
}
validate97.evaluated = { "props": true, "dynamicProps": false, "dynamicItems": false };
exports.TracePrefillInput = validate98;
var schema123 = { "$schema": "https://json-schema.org/draft/2020-12/schema", "$id": "TracePrefillInput.schema.json", "title": "TracePrefillInput", "description": "case_trace_prefill\uC758 \uC785\uB825: \uBE44\uC2DD\uBCC4 trace\uC640 \uACE0\uB978 \uC885\uB958.", "type": "object", "required": ["trace", "kind"], "properties": { "trace": { "type": "object" }, "kind": { "enum": ["LORA_A", "LORA_B"] } }, "additionalProperties": false };
function validate98(data, { instancePath = "", parentData, parentDataProperty, rootData = data, dynamicAnchors = {} } = {}) {
  ;
  let vErrors = null;
  let errors = 0;
  const evaluated0 = validate98.evaluated;
  if (evaluated0.dynamicProps) {
    evaluated0.props = void 0;
  }
  if (evaluated0.dynamicItems) {
    evaluated0.items = void 0;
  }
  if (data && typeof data == "object" && !Array.isArray(data)) {
    if (data.trace === void 0) {
      const err0 = { instancePath, schemaPath: "#/required", keyword: "required", params: { missingProperty: "trace" }, message: "must have required property 'trace'" };
      if (vErrors === null) {
        vErrors = [err0];
      } else {
        vErrors.push(err0);
      }
      errors++;
    }
    if (data.kind === void 0) {
      const err1 = { instancePath, schemaPath: "#/required", keyword: "required", params: { missingProperty: "kind" }, message: "must have required property 'kind'" };
      if (vErrors === null) {
        vErrors = [err1];
      } else {
        vErrors.push(err1);
      }
      errors++;
    }
    for (const key0 in data) {
      if (!(key0 === "trace" || key0 === "kind")) {
        const err2 = { instancePath, schemaPath: "#/additionalProperties", keyword: "additionalProperties", params: { additionalProperty: key0 }, message: "must NOT have additional properties" };
        if (vErrors === null) {
          vErrors = [err2];
        } else {
          vErrors.push(err2);
        }
        errors++;
      }
    }
    if (data.trace !== void 0) {
      let data0 = data.trace;
      if (!(data0 && typeof data0 == "object" && !Array.isArray(data0))) {
        const err3 = { instancePath: instancePath + "/trace", schemaPath: "#/properties/trace/type", keyword: "type", params: { type: "object" }, message: "must be object" };
        if (vErrors === null) {
          vErrors = [err3];
        } else {
          vErrors.push(err3);
        }
        errors++;
      }
    }
    if (data.kind !== void 0) {
      let data1 = data.kind;
      if (!(data1 === "LORA_A" || data1 === "LORA_B")) {
        const err4 = { instancePath: instancePath + "/kind", schemaPath: "#/properties/kind/enum", keyword: "enum", params: { allowedValues: schema123.properties.kind.enum }, message: "must be equal to one of the allowed values" };
        if (vErrors === null) {
          vErrors = [err4];
        } else {
          vErrors.push(err4);
        }
        errors++;
      }
    }
  } else {
    const err5 = { instancePath, schemaPath: "#/type", keyword: "type", params: { type: "object" }, message: "must be object" };
    if (vErrors === null) {
      vErrors = [err5];
    } else {
      vErrors.push(err5);
    }
    errors++;
  }
  validate98.errors = vErrors;
  return errors === 0;
}
validate98.evaluated = { "props": true, "dynamicProps": false, "dynamicItems": false };
exports.TraceRefInput = validate99;
function validate99(data, { instancePath = "", parentData, parentDataProperty, rootData = data, dynamicAnchors = {} } = {}) {
  ;
  let vErrors = null;
  let errors = 0;
  const evaluated0 = validate99.evaluated;
  if (evaluated0.dynamicProps) {
    evaluated0.props = void 0;
  }
  if (evaluated0.dynamicItems) {
    evaluated0.items = void 0;
  }
  if (data && typeof data == "object" && !Array.isArray(data)) {
    if (data.ref === void 0) {
      const err0 = { instancePath, schemaPath: "#/required", keyword: "required", params: { missingProperty: "ref" }, message: "must have required property 'ref'" };
      if (vErrors === null) {
        vErrors = [err0];
      } else {
        vErrors.push(err0);
      }
      errors++;
    }
    for (const key0 in data) {
      if (!(key0 === "ref")) {
        const err1 = { instancePath, schemaPath: "#/additionalProperties", keyword: "additionalProperties", params: { additionalProperty: key0 }, message: "must NOT have additional properties" };
        if (vErrors === null) {
          vErrors = [err1];
        } else {
          vErrors.push(err1);
        }
        errors++;
      }
    }
    if (data.ref !== void 0) {
      let data0 = data.ref;
      if (typeof data0 === "string") {
        if (func1(data0) < 1) {
          const err2 = { instancePath: instancePath + "/ref", schemaPath: "#/properties/ref/minLength", keyword: "minLength", params: { limit: 1 }, message: "must NOT have fewer than 1 characters" };
          if (vErrors === null) {
            vErrors = [err2];
          } else {
            vErrors.push(err2);
          }
          errors++;
        }
      } else {
        const err3 = { instancePath: instancePath + "/ref", schemaPath: "#/properties/ref/type", keyword: "type", params: { type: "string" }, message: "must be string" };
        if (vErrors === null) {
          vErrors = [err3];
        } else {
          vErrors.push(err3);
        }
        errors++;
      }
    }
  } else {
    const err4 = { instancePath, schemaPath: "#/type", keyword: "type", params: { type: "object" }, message: "must be object" };
    if (vErrors === null) {
      vErrors = [err4];
    } else {
      vErrors.push(err4);
    }
    errors++;
  }
  validate99.errors = vErrors;
  return errors === 0;
}
validate99.evaluated = { "props": true, "dynamicProps": false, "dynamicItems": false };

exports.issues = function issues(fn) { return (fn.errors || []).map((e) => ({ path: e.instancePath, message: e.message || e.keyword, keyword: e.keyword })); };
exports.assertValid = function assertValid(fn, data, what) { if (!fn(data)) throw new TypeError(what + " 입력/출력이 스키마에 맞지 않는다: " + exports.issues(fn).slice(0, 3).map((i) => (i.path || "(최상위)") + " " + i.message).join("; ")); return data; };
