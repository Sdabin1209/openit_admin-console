// 생성물: scripts/gen-schemas.mjs (직접 고치지 않는다). 원본: boundary-contracts 3.6.3
// source-sha256: {"ActionExtractionInput":"5d8219840abc35a788947b75c390028f63df43c9bc85aa0f5011a09b7b7dccd3","ActionExtraction":"e94bc343c12eeb875066ea375dc75459d23e884435ef4c720e6f7db5b2ff016e","ResponseRequest":"2333c8bf227525f28b0ebf826cd42ae890be381d41903fc71d0c8257356fdc6d","ResponseText":"360d9cba82e1722765bc516e6039bed6481cefcbb155d40015fda07e8cd4db15","ApprovalRequest":"a438c099a921b489f835b2e9ca8ce2b18bbb9dd68ed974b4b05f9e93683afad1","ActivateRequest":"8623ac0d8e672ff32ca7663514b6d1a84ec6edd98911bc4f6a830ce5bb9dca50","RollbackRequest":"23599ffd4220568be6da141aaa516429b63bbf1fd038541484106754b01e76f2","CaseReviewRequest":"84e069fd849438cc14670c027496b9300379018b1cc2421cbcee9f75cb07568e","ListEnvelope":"b9ce90cd9e01babf51e24216b39f121ef5aa311510393f505fc4fd140380ef54","OpsFeedbackReviewTrace":"9d789b882cb967e64c640bfb18f74c9d819f4ef6504abb9c2f7e893570ff5919","OpsFeedbackDeidentifiedTrace":"606e30023a6c4c73a4380aabffb3df4a11dcbc68ba709b3ce67652db32eca76c","ImageLabels":"b7da6ef66b5d0417ac1aa339396d722aa399c47ab5a4bc01257d4588a3cf38ec","BuildImageRequest":"22affad023cf23c94da62bd00cedb1624a1e31ed9fd44e98dcca7405fcb60ba5","BuildImageResult":"34f3df4286df83c47a5690cbfc80a19d83a187f9c1067fed622bf9e457a8481b","SetupEnvReport":"cd3635790ff666a9b1f9865d925d29a0dc54af1058584667a09452874a3d78af","Exposure":"e8130b5245248b533ad3c2887dcfd89e9e89f1281662a74d8cb50bd043114fa5","ContainerInputs":"c8c424e3ad9cae9d3241704e4840d264bee988d4dc8f25c379163db1060e1aa6","PushConfig":"64ccc7791ede5e1d61c6b5373172e00511b8eb198f33916c1552a14fc8f9121f","StaffPushPayload":"134a5206da0ab467c8b8c7b904f5a807a8f81992ddfa653b110a30db1306fbb4","PushSubscriptionRequest":"dade21a99f2f3e0b030340099991095307b00dbf5bda2b8331775771fda69a06","HealthStatus":"6ae4fe634b3ca9602a9f15d02ca7f4bd66dd5b33918885c056e6af44c7236278","_common":"debc4ce0d9ac648d4e11025b0a01648bd82884103b6870321d72fd594acfa9fb"}
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

// node_modules/ajv-formats/dist/formats.js
var require_formats = __commonJS({
  "node_modules/ajv-formats/dist/formats.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.formatNames = exports2.fastFormats = exports2.fullFormats = void 0;
    function fmtDef(validate, compare) {
      return { validate, compare };
    }
    exports2.fullFormats = {
      // date: http://tools.ietf.org/html/rfc3339#section-5.6
      date: fmtDef(date, compareDate),
      // date-time: http://tools.ietf.org/html/rfc3339#section-5.6
      time: fmtDef(getTime(true), compareTime),
      "date-time": fmtDef(getDateTime(true), compareDateTime),
      "iso-time": fmtDef(getTime(), compareIsoTime),
      "iso-date-time": fmtDef(getDateTime(), compareIsoDateTime),
      // duration: https://tools.ietf.org/html/rfc3339#appendix-A
      duration: /^P(?!$)((\d+Y)?(\d+M)?(\d+D)?(T(?=\d)(\d+H)?(\d+M)?(\d+S)?)?|(\d+W)?)$/,
      uri,
      "uri-reference": /^(?:[a-z][a-z0-9+\-.]*:)?(?:\/?\/(?:(?:[a-z0-9\-._~!$&'()*+,;=:]|%[0-9a-f]{2})*@)?(?:\[(?:(?:(?:(?:[0-9a-f]{1,4}:){6}|::(?:[0-9a-f]{1,4}:){5}|(?:[0-9a-f]{1,4})?::(?:[0-9a-f]{1,4}:){4}|(?:(?:[0-9a-f]{1,4}:){0,1}[0-9a-f]{1,4})?::(?:[0-9a-f]{1,4}:){3}|(?:(?:[0-9a-f]{1,4}:){0,2}[0-9a-f]{1,4})?::(?:[0-9a-f]{1,4}:){2}|(?:(?:[0-9a-f]{1,4}:){0,3}[0-9a-f]{1,4})?::[0-9a-f]{1,4}:|(?:(?:[0-9a-f]{1,4}:){0,4}[0-9a-f]{1,4})?::)(?:[0-9a-f]{1,4}:[0-9a-f]{1,4}|(?:(?:25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(?:25[0-5]|2[0-4]\d|[01]?\d\d?))|(?:(?:[0-9a-f]{1,4}:){0,5}[0-9a-f]{1,4})?::[0-9a-f]{1,4}|(?:(?:[0-9a-f]{1,4}:){0,6}[0-9a-f]{1,4})?::)|[Vv][0-9a-f]+\.[a-z0-9\-._~!$&'()*+,;=:]+)\]|(?:(?:25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(?:25[0-5]|2[0-4]\d|[01]?\d\d?)|(?:[a-z0-9\-._~!$&'"()*+,;=]|%[0-9a-f]{2})*)(?::\d*)?(?:\/(?:[a-z0-9\-._~!$&'"()*+,;=:@]|%[0-9a-f]{2})*)*|\/(?:(?:[a-z0-9\-._~!$&'"()*+,;=:@]|%[0-9a-f]{2})+(?:\/(?:[a-z0-9\-._~!$&'"()*+,;=:@]|%[0-9a-f]{2})*)*)?|(?:[a-z0-9\-._~!$&'"()*+,;=:@]|%[0-9a-f]{2})+(?:\/(?:[a-z0-9\-._~!$&'"()*+,;=:@]|%[0-9a-f]{2})*)*)?(?:\?(?:[a-z0-9\-._~!$&'"()*+,;=:@/?]|%[0-9a-f]{2})*)?(?:#(?:[a-z0-9\-._~!$&'"()*+,;=:@/?]|%[0-9a-f]{2})*)?$/i,
      // uri-template: https://tools.ietf.org/html/rfc6570
      "uri-template": /^(?:(?:[^\x00-\x20"'<>%\\^`{|}]|%[0-9a-f]{2})|\{[+#./;?&=,!@|]?(?:[a-z0-9_]|%[0-9a-f]{2})+(?::[1-9][0-9]{0,3}|\*)?(?:,(?:[a-z0-9_]|%[0-9a-f]{2})+(?::[1-9][0-9]{0,3}|\*)?)*\})*$/i,
      // For the source: https://gist.github.com/dperini/729294
      // For test cases: https://mathiasbynens.be/demo/url-regex
      url: /^(?:https?|ftp):\/\/(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z0-9\u{00a1}-\u{ffff}]+-)*[a-z0-9\u{00a1}-\u{ffff}]+)(?:\.(?:[a-z0-9\u{00a1}-\u{ffff}]+-)*[a-z0-9\u{00a1}-\u{ffff}]+)*(?:\.(?:[a-z\u{00a1}-\u{ffff}]{2,})))(?::\d{2,5})?(?:\/[^\s]*)?$/iu,
      email: /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/i,
      hostname: /^(?=.{1,253}\.?$)[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?(?:\.[a-z0-9](?:[-0-9a-z]{0,61}[0-9a-z])?)*\.?$/i,
      // optimized https://www.safaribooksonline.com/library/view/regular-expressions-cookbook/9780596802837/ch07s16.html
      ipv4: /^(?:(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)\.){3}(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)$/,
      ipv6: /^((([0-9a-f]{1,4}:){7}([0-9a-f]{1,4}|:))|(([0-9a-f]{1,4}:){6}(:[0-9a-f]{1,4}|((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9a-f]{1,4}:){5}(((:[0-9a-f]{1,4}){1,2})|:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9a-f]{1,4}:){4}(((:[0-9a-f]{1,4}){1,3})|((:[0-9a-f]{1,4})?:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9a-f]{1,4}:){3}(((:[0-9a-f]{1,4}){1,4})|((:[0-9a-f]{1,4}){0,2}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9a-f]{1,4}:){2}(((:[0-9a-f]{1,4}){1,5})|((:[0-9a-f]{1,4}){0,3}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9a-f]{1,4}:){1}(((:[0-9a-f]{1,4}){1,6})|((:[0-9a-f]{1,4}){0,4}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(:(((:[0-9a-f]{1,4}){1,7})|((:[0-9a-f]{1,4}){0,5}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:)))$/i,
      regex,
      // uuid: http://tools.ietf.org/html/rfc4122
      uuid: /^(?:urn:uuid:)?[0-9a-f]{8}-(?:[0-9a-f]{4}-){3}[0-9a-f]{12}$/i,
      // JSON-pointer: https://tools.ietf.org/html/rfc6901
      // uri fragment: https://tools.ietf.org/html/rfc3986#appendix-A
      "json-pointer": /^(?:\/(?:[^~/]|~0|~1)*)*$/,
      "json-pointer-uri-fragment": /^#(?:\/(?:[a-z0-9_\-.!$&'()*+,;:=@]|%[0-9a-f]{2}|~0|~1)*)*$/i,
      // relative JSON-pointer: http://tools.ietf.org/html/draft-luff-relative-json-pointer-00
      "relative-json-pointer": /^(?:0|[1-9][0-9]*)(?:#|(?:\/(?:[^~/]|~0|~1)*)*)$/,
      // the following formats are used by the openapi specification: https://spec.openapis.org/oas/v3.0.0#data-types
      // byte: https://github.com/miguelmota/is-base64
      byte,
      // signed 32 bit integer
      int32: { type: "number", validate: validateInt32 },
      // signed 64 bit integer
      int64: { type: "number", validate: validateInt64 },
      // C-type float
      float: { type: "number", validate: validateNumber },
      // C-type double
      double: { type: "number", validate: validateNumber },
      // hint to the UI to hide input strings
      password: true,
      // unchecked string payload
      binary: true
    };
    exports2.fastFormats = {
      ...exports2.fullFormats,
      date: fmtDef(/^\d\d\d\d-[0-1]\d-[0-3]\d$/, compareDate),
      time: fmtDef(/^(?:[0-2]\d:[0-5]\d:[0-5]\d|23:59:60)(?:\.\d+)?(?:z|[+-]\d\d(?::?\d\d)?)$/i, compareTime),
      "date-time": fmtDef(/^\d\d\d\d-[0-1]\d-[0-3]\dt(?:[0-2]\d:[0-5]\d:[0-5]\d|23:59:60)(?:\.\d+)?(?:z|[+-]\d\d(?::?\d\d)?)$/i, compareDateTime),
      "iso-time": fmtDef(/^(?:[0-2]\d:[0-5]\d:[0-5]\d|23:59:60)(?:\.\d+)?(?:z|[+-]\d\d(?::?\d\d)?)?$/i, compareIsoTime),
      "iso-date-time": fmtDef(/^\d\d\d\d-[0-1]\d-[0-3]\d[t\s](?:[0-2]\d:[0-5]\d:[0-5]\d|23:59:60)(?:\.\d+)?(?:z|[+-]\d\d(?::?\d\d)?)?$/i, compareIsoDateTime),
      // uri: https://github.com/mafintosh/is-my-json-valid/blob/master/formats.js
      uri: /^(?:[a-z][a-z0-9+\-.]*:)(?:\/?\/)?[^\s]*$/i,
      "uri-reference": /^(?:(?:[a-z][a-z0-9+\-.]*:)?\/?\/)?(?:[^\\\s#][^\s#]*)?(?:#[^\\\s]*)?$/i,
      // email (sources from jsen validator):
      // http://stackoverflow.com/questions/201323/using-a-regular-expression-to-validate-an-email-address#answer-8829363
      // http://www.w3.org/TR/html5/forms.html#valid-e-mail-address (search for 'wilful violation')
      email: /^[a-z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?(?:\.[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?)*$/i
    };
    exports2.formatNames = Object.keys(exports2.fullFormats);
    function isLeapYear(year) {
      return year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0);
    }
    var DATE = /^(\d\d\d\d)-(\d\d)-(\d\d)$/;
    var DAYS = [0, 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    function date(str) {
      const matches = DATE.exec(str);
      if (!matches)
        return false;
      const year = +matches[1];
      const month = +matches[2];
      const day = +matches[3];
      return month >= 1 && month <= 12 && day >= 1 && day <= (month === 2 && isLeapYear(year) ? 29 : DAYS[month]);
    }
    function compareDate(d1, d2) {
      if (!(d1 && d2))
        return void 0;
      if (d1 > d2)
        return 1;
      if (d1 < d2)
        return -1;
      return 0;
    }
    var TIME = /^(\d\d):(\d\d):(\d\d(?:\.\d+)?)(z|([+-])(\d\d)(?::?(\d\d))?)?$/i;
    function getTime(strictTimeZone) {
      return function time(str) {
        const matches = TIME.exec(str);
        if (!matches)
          return false;
        const hr = +matches[1];
        const min = +matches[2];
        const sec = +matches[3];
        const tz = matches[4];
        const tzSign = matches[5] === "-" ? -1 : 1;
        const tzH = +(matches[6] || 0);
        const tzM = +(matches[7] || 0);
        if (tzH > 23 || tzM > 59 || strictTimeZone && !tz)
          return false;
        if (hr <= 23 && min <= 59 && sec < 60)
          return true;
        const utcMin = min - tzM * tzSign;
        const utcHr = hr - tzH * tzSign - (utcMin < 0 ? 1 : 0);
        return (utcHr === 23 || utcHr === -1) && (utcMin === 59 || utcMin === -1) && sec < 61;
      };
    }
    function compareTime(s1, s2) {
      if (!(s1 && s2))
        return void 0;
      const t1 = (/* @__PURE__ */ new Date("2020-01-01T" + s1)).valueOf();
      const t2 = (/* @__PURE__ */ new Date("2020-01-01T" + s2)).valueOf();
      if (!(t1 && t2))
        return void 0;
      return t1 - t2;
    }
    function compareIsoTime(t1, t2) {
      if (!(t1 && t2))
        return void 0;
      const a1 = TIME.exec(t1);
      const a2 = TIME.exec(t2);
      if (!(a1 && a2))
        return void 0;
      t1 = a1[1] + a1[2] + a1[3];
      t2 = a2[1] + a2[2] + a2[3];
      if (t1 > t2)
        return 1;
      if (t1 < t2)
        return -1;
      return 0;
    }
    var DATE_TIME_SEPARATOR = /t|\s/i;
    function getDateTime(strictTimeZone) {
      const time = getTime(strictTimeZone);
      return function date_time(str) {
        const dateTime = str.split(DATE_TIME_SEPARATOR);
        return dateTime.length === 2 && date(dateTime[0]) && time(dateTime[1]);
      };
    }
    function compareDateTime(dt1, dt2) {
      if (!(dt1 && dt2))
        return void 0;
      const d1 = new Date(dt1).valueOf();
      const d2 = new Date(dt2).valueOf();
      if (!(d1 && d2))
        return void 0;
      return d1 - d2;
    }
    function compareIsoDateTime(dt1, dt2) {
      if (!(dt1 && dt2))
        return void 0;
      const [d1, t1] = dt1.split(DATE_TIME_SEPARATOR);
      const [d2, t2] = dt2.split(DATE_TIME_SEPARATOR);
      const res = compareDate(d1, d2);
      if (res === void 0)
        return void 0;
      return res || compareTime(t1, t2);
    }
    var NOT_URI_FRAGMENT = /\/|:/;
    var URI = /^(?:[a-z][a-z0-9+\-.]*:)(?:\/?\/(?:(?:[a-z0-9\-._~!$&'()*+,;=:]|%[0-9a-f]{2})*@)?(?:\[(?:(?:(?:(?:[0-9a-f]{1,4}:){6}|::(?:[0-9a-f]{1,4}:){5}|(?:[0-9a-f]{1,4})?::(?:[0-9a-f]{1,4}:){4}|(?:(?:[0-9a-f]{1,4}:){0,1}[0-9a-f]{1,4})?::(?:[0-9a-f]{1,4}:){3}|(?:(?:[0-9a-f]{1,4}:){0,2}[0-9a-f]{1,4})?::(?:[0-9a-f]{1,4}:){2}|(?:(?:[0-9a-f]{1,4}:){0,3}[0-9a-f]{1,4})?::[0-9a-f]{1,4}:|(?:(?:[0-9a-f]{1,4}:){0,4}[0-9a-f]{1,4})?::)(?:[0-9a-f]{1,4}:[0-9a-f]{1,4}|(?:(?:25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(?:25[0-5]|2[0-4]\d|[01]?\d\d?))|(?:(?:[0-9a-f]{1,4}:){0,5}[0-9a-f]{1,4})?::[0-9a-f]{1,4}|(?:(?:[0-9a-f]{1,4}:){0,6}[0-9a-f]{1,4})?::)|[Vv][0-9a-f]+\.[a-z0-9\-._~!$&'()*+,;=:]+)\]|(?:(?:25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(?:25[0-5]|2[0-4]\d|[01]?\d\d?)|(?:[a-z0-9\-._~!$&'()*+,;=]|%[0-9a-f]{2})*)(?::\d*)?(?:\/(?:[a-z0-9\-._~!$&'()*+,;=:@]|%[0-9a-f]{2})*)*|\/(?:(?:[a-z0-9\-._~!$&'()*+,;=:@]|%[0-9a-f]{2})+(?:\/(?:[a-z0-9\-._~!$&'()*+,;=:@]|%[0-9a-f]{2})*)*)?|(?:[a-z0-9\-._~!$&'()*+,;=:@]|%[0-9a-f]{2})+(?:\/(?:[a-z0-9\-._~!$&'()*+,;=:@]|%[0-9a-f]{2})*)*)(?:\?(?:[a-z0-9\-._~!$&'()*+,;=:@/?]|%[0-9a-f]{2})*)?(?:#(?:[a-z0-9\-._~!$&'()*+,;=:@/?]|%[0-9a-f]{2})*)?$/i;
    function uri(str) {
      return NOT_URI_FRAGMENT.test(str) && URI.test(str);
    }
    var BYTE = /^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$/gm;
    function byte(str) {
      BYTE.lastIndex = 0;
      return BYTE.test(str);
    }
    var MIN_INT32 = -(2 ** 31);
    var MAX_INT32 = 2 ** 31 - 1;
    function validateInt32(value) {
      return Number.isInteger(value) && value <= MAX_INT32 && value >= MIN_INT32;
    }
    function validateInt64(value) {
      return Number.isInteger(value);
    }
    function validateNumber() {
      return true;
    }
    var Z_ANCHOR = /[^\\]\\Z/;
    function regex(str) {
      if (Z_ANCHOR.test(str))
        return false;
      try {
        new RegExp(str);
        return true;
      } catch (e) {
        return false;
      }
    }
  }
});

// node_modules/fast-deep-equal/index.js
var require_fast_deep_equal = __commonJS({
  "node_modules/fast-deep-equal/index.js"(exports2, module2) {
    "use strict";
    module2.exports = function equal(a, b) {
      if (a === b) return true;
      if (a && b && typeof a == "object" && typeof b == "object") {
        if (a.constructor !== b.constructor) return false;
        var length, i, keys;
        if (Array.isArray(a)) {
          length = a.length;
          if (length != b.length) return false;
          for (i = length; i-- !== 0; )
            if (!equal(a[i], b[i])) return false;
          return true;
        }
        if (a.constructor === RegExp) return a.source === b.source && a.flags === b.flags;
        if (a.valueOf !== Object.prototype.valueOf) return a.valueOf() === b.valueOf();
        if (a.toString !== Object.prototype.toString) return a.toString() === b.toString();
        keys = Object.keys(a);
        length = keys.length;
        if (length !== Object.keys(b).length) return false;
        for (i = length; i-- !== 0; )
          if (!Object.prototype.hasOwnProperty.call(b, keys[i])) return false;
        for (i = length; i-- !== 0; ) {
          var key = keys[i];
          if (!equal(a[key], b[key])) return false;
        }
        return true;
      }
      return a !== a && b !== b;
    };
  }
});

// node_modules/ajv/dist/runtime/equal.js
var require_equal = __commonJS({
  "node_modules/ajv/dist/runtime/equal.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    var equal = require_fast_deep_equal();
    equal.code = 'require("ajv/dist/runtime/equal").default';
    exports2.default = equal;
  }
});

// validators.cjs
exports.ActionExtractionInput = validate20;
var schema31 = { "$schema": "https://json-schema.org/draft/2020-12/schema", "title": "ActionExtractionInput", "description": "LoRA-A \uC785\uB825(2.0.0, D74). \uD658\uC790 \uBC1C\uD654 1\uD134\uACFC \uC9C1\uC804 \uBB38\uB9E5. \uBAA8\uB378\uC774 \uBC1B\uB294 JSON \uADF8\uB300\uB85C\uC774\uBA70 \uD559\uC2B5 \uB370\uC774\uD130\uC758 user \uBA54\uC2DC\uC9C0 \uB0B4\uC6A9\uC774\uB2E4. \uC2DC\uC2A4\uD15C \uD504\uB86C\uD504\uD2B8\uB294 \uBCC4\uB3C4(serving_config\uC758 \uD504\uB86C\uD504\uD2B8 \uD15C\uD50C\uB9BF \uBC84\uC804).", "x-producers": ["survey-service", "synthetic-data"], "x-consumers": ["model-runtime", "model-lab"], "type": "object", "additionalProperties": false, "required": ["question_id", "current_question", "user_utterance", "state"], "properties": { "question_id": { "type": "string", "pattern": "^Q[0-9]+(\\.D[0-9]{2})?(_[0-9]+)?$", "description": "\uC0C1\uB2F4\uC6D0\uC774 \uC9C0\uAE08 \uBB3B\uACE0 \uC788\uB294 \uBB38\uD56D. \uC815\uC815\xB7\uCDA9\uB3CC \uD750\uB984\uC5D0\uC11C\uB294 \uAC12\uC758 \uBB38\uD56D\uC774 \uC544\uB2C8\uB77C \uADF8\uB54C \uBB3B\uB358 \uBB38\uD56D\uC774\uB2E4." }, "current_question": { "type": "string", "minLength": 1, "description": "\uC0C1\uB2F4\uC6D0\uC774 \uBC29\uAE08 \uD55C \uB9D0(\uC55E LoRA-B \uC751\uB2F5 \uADF8\uB300\uB85C \uB610\uB294 \uBB38\uD56D \uC740\uD589 \uC9C8\uBB38)." }, "user_utterance": { "type": "string", "minLength": 1, "description": "\uD658\uC790 \uB9D0 1\uD134." }, "state": { "type": "object", "description": "\uC800\uC7A5 \uAC12. \uC9C0\uAE08 \uBB38\uD56D(\uC7AC\uC9C8\uBB38 \uC911\uC778 \uCE78 \uD3EC\uD568), \uC9C1\uC804\uC5D0 \uBB3C\uC740 \uBB38\uD56D, \uCC38\uC870 \uC6D0\uCC9C \uBB38\uD56D. \uCCAB \uBB38\uD56D\uC774\uBA74 \uBE44\uC5B4 \uC788\uB2E4.", "propertyNames": { "pattern": "^Q[0-9]+(\\.D[0-9]{2})?(_[0-9]+)?(\\[(soju|beer|spirits|makgeolli|wine)\\])?\\.[a-z][a-z_]*$" }, "additionalProperties": { "type": "object", "additionalProperties": false, "required": ["value", "status"], "properties": { "value": { "$comment": "\uCE78 \uAC12. \uB370\uC774\uD130\uC5D0\uC11C \uD655\uC778\uD55C \uD615\uD0DC: \uBD88\uB9AC\uC5B8, \uC22B\uC790(\uC815\uC218\xB7\uC18C\uC218), \uC120\uD0DD\uC9C0 \uCF54\uB4DC \uBB38\uC790\uC5F4, null.", "type": ["boolean", "number", "string", "null"] }, "status": { "enum": ["ANSWERED", "CORRECTION", "MISSING", "UNCLEAR", "CONFLICT", "UNKNOWN", "REJECTED"] } } } } } };
var pattern4 = new RegExp("^Q[0-9]+(\\.D[0-9]{2})?(_[0-9]+)?$", "u");
var pattern5 = new RegExp("^Q[0-9]+(\\.D[0-9]{2})?(_[0-9]+)?(\\[(soju|beer|spirits|makgeolli|wine)\\])?\\.[a-z][a-z_]*$", "u");
var func1 = require_ucs2length().default;
function validate20(data, { instancePath = "", parentData, parentDataProperty, rootData = data, dynamicAnchors = {} } = {}) {
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
        if (!pattern4.test(data0)) {
          const err5 = { instancePath: instancePath + "/question_id", schemaPath: "#/properties/question_id/pattern", keyword: "pattern", params: { pattern: "^Q[0-9]+(\\.D[0-9]{2})?(_[0-9]+)?$" }, message: 'must match pattern "^Q[0-9]+(\\.D[0-9]{2})?(_[0-9]+)?$"' };
          if (vErrors === null) {
            vErrors = [err5];
          } else {
            vErrors.push(err5);
          }
          errors++;
        }
      } else {
        const err6 = { instancePath: instancePath + "/question_id", schemaPath: "#/properties/question_id/type", keyword: "type", params: { type: "string" }, message: "must be string" };
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
          const _errs10 = errors;
          if (typeof key1 === "string") {
            if (!pattern5.test(key1)) {
              const err11 = { instancePath: instancePath + "/state", schemaPath: "#/properties/state/propertyNames/pattern", keyword: "pattern", params: { pattern: "^Q[0-9]+(\\.D[0-9]{2})?(_[0-9]+)?(\\[(soju|beer|spirits|makgeolli|wine)\\])?\\.[a-z][a-z_]*$" }, message: 'must match pattern "^Q[0-9]+(\\.D[0-9]{2})?(_[0-9]+)?(\\[(soju|beer|spirits|makgeolli|wine)\\])?\\.[a-z][a-z_]*$"', propertyName: key1 };
              if (vErrors === null) {
                vErrors = [err11];
              } else {
                vErrors.push(err11);
              }
              errors++;
            }
          }
          var valid1 = _errs10 === errors;
          if (!valid1) {
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
              if (typeof data5 !== "boolean" && !(typeof data5 == "number") && typeof data5 !== "string" && data5 !== null) {
                const err16 = { instancePath: instancePath + "/state/" + key2.replace(/~/g, "~0").replace(/\//g, "~1") + "/value", schemaPath: "#/properties/state/additionalProperties/properties/value/type", keyword: "type", params: { type: schema31.properties.state.additionalProperties.properties.value.type }, message: "must be boolean,number,string,null" };
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
                const err17 = { instancePath: instancePath + "/state/" + key2.replace(/~/g, "~0").replace(/\//g, "~1") + "/status", schemaPath: "#/properties/state/additionalProperties/properties/status/enum", keyword: "enum", params: { allowedValues: schema31.properties.state.additionalProperties.properties.status.enum }, message: "must be equal to one of the allowed values" };
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
  validate20.errors = vErrors;
  return errors === 0;
}
validate20.evaluated = { "props": true, "dynamicProps": false, "dynamicItems": false };
exports.ActionExtraction = validate21;
var schema32 = { "$schema": "https://json-schema.org/draft/2020-12/schema", "title": "ActionExtraction", "description": "LoRA-A \uCD9C\uB825(2.0.0, D74). \uAC12 \uCD94\uCD9C\xB7\uC815\uADDC\uD654\xB7\uC808\uCC28(action)\xB7\uB2E4\uC74C \uBB38\uD56D(next_item)\uC744 \uD55C \uBC88\uC5D0 \uB0B8\uB2E4. \uC11C\uBE44\uC2A4\uC5D0\uB294 \uC815\uADDC\uD654\uAE30\uC640 Plan \uCF54\uB4DC\uAC00 \uC5C6\uB2E4. \uBAA8\uB378\uC774 \uB0B4\uB294 JSON \uADF8\uB300\uB85C(\uD0A4 \uC21C\uC11C\uB294 \uC0AC\uC804\uC21C)\uC774\uACE0 \uBAA8\uB378 \uCD9C\uB825\uC774\uB77C ext\uB97C \uB450\uC9C0 \uC54A\uB294\uB2E4. \uC81C\uC57D \uB514\uCF54\uB529 \uC5D4\uC9C4\uC774 allOf/if/then\uC744 \uBB34\uC2DC\uD560 \uC218 \uC788\uC73C\uBBC0\uB85C(HTTP.md I9) action\uBCC4 \uADDC\uCE59\uC740 \uC0AC\uD6C4 \uAC80\uC99D\uC774 \uB9E1\uB294\uB2E4.", "x-producers": ["model-runtime"], "x-consumers": ["survey-service", "model-lab", "synthetic-data"], "type": "object", "additionalProperties": false, "required": ["values", "action", "next_item"], "properties": { "action": { "enum": ["NEXT", "CORRECT", "REASK", "CONFIRM", "HOLD", "SKIP", "REDIRECT"], "description": "START\uB294 A\uAC00 \uB0B4\uC9C0 \uC54A\uB294\uB2E4(\uC11C\uBE44\uC2A4\uAC00 \uC2DC\uC791\uD560 \uB54C B \uC785\uB825\uC5D0\uB9CC \uC4F4\uB2E4)." }, "next_item": { "type": "string", "pattern": "^(END|Q[0-9]+(\\.D[0-9]{2})?(_[0-9]+)?)$", "description": "\uCD94\uB860 \uC11C\uBC84\uAC00 action\xB7targets\xB7values\uC640 \uBB38\uD56D \uC21C\uC11C\uD45C\uB85C \uC815\uD574 \uCC44\uC6B0\uB294 \uAC12(3.1.3, \uADDC\uCE59 next_item.derived_by=server). \uBB38\uD56D ID \uBB38\uBC95(Q \uBC88\uD638 \uD615\uC2DD)\uC740 \uD559\uC2B5 \uB370\uC774\uD130\uC14B(labels.py)\uC774 \uC815\uBCF8\uC778 \uBAA8\uB378 \uC785\uCD9C\uB825\uC758 \uBC94\uC704\uB2E4: \uC774 \uAD6C\uC870\uC640 \uB2E4\uB978 \uBB38\uC9C4\uD45C\uB294 \uAC8C\uC774\uD2B8\uAC00 QUESTION_MODEL_COMPAT \uB85C \uBC18\uB824\uD558\uBBC0\uB85C(U81, ModelPackageManifest.lineage.question_sets) \uCD9C\uACE0\uB41C \uB9B4\uB9AC\uC2A4\uC758 \uBB38\uD56D ID \uB294 \uD56D\uC0C1 \uC774 \uBB38\uBC95\uC774\uB2E4(3.4.4 \uAC80\uD1A0 B-18 \uD310\uC815: \uC601\uC5ED \uB0B4\uBD80 \uBB38\uBC95\uC774 \uC0C8\uC5B4 \uB098\uC628 \uAC83\uC774 \uC544\uB2C8\uB77C \uBAA8\uB378\uC774 \uBC1B\uB294 \uC785\uB825\uC758 \uBC94\uC704). \uBAA8\uB378 \uCD9C\uB825\uC758 \uAC12\uC740 \uC11C\uBC84\uAC00 \uB36E\uC5B4\uC4F4\uB2E4. \uC758\uBBF8: \uB2E4\uC74C\uC5D0 \uBB3C\uC744 \uBB38\uD56D \uB610\uB294 END. REASK\xB7REDIRECT\uB294 \uC785\uB825 question_id\uC640 \uAC19\uB2E4. CONFIRM\uC740 \uB300\uC0C1 \uCE78\uC758 \uBB38\uD56D\uC774\uBA70 \uC785\uB825 question_id\uC640 \uB2E4\uB97C \uC218 \uC788\uB2E4(\uB370\uC774\uD130 \uD655\uC778). NEXT\xB7CORRECT\xB7HOLD\xB7SKIP\uC740 \uAC19\uC740 \uB9D0\uC5D0\uC11C \uC77C\uBD80 \uCE78\uC774 \uC774\uBBF8 \uCC44\uC6CC\uC9C4 \uBB38\uD56D(\uC608: Q4 \uC608\uC640 Q4_1.status \uB3D9\uC2DC)\uC73C\uB85C \uB118\uC5B4\uAC08 \uC218 \uC788\uACE0 \uC774\uB97C \uACC4\uC57D\uC73C\uB85C \uC778\uC815\uD55C\uB2E4." }, "note": { "type": "string", "minLength": 1, "description": "REDIRECT\uC758 OUT_OF_SCHEMA\uB9CC. \uBB38\uC9C4\uD45C\uC5D0 \uC5C6\uB294 \uAC74\uAC15 \uC815\uBCF4\uC758 \uC9E7\uC740 \uC694\uC57D." }, "reason": { "enum": ["MISSING", "OUT_OF_RANGE", "UNKNOWN_UNIT", "VAGUE_QUANTITY", "RANGE_SPANS_OPTIONS", "COUNT_EXCEEDS_DAYS", "OTHER_BEVERAGE", "BEVERAGE_MISSING", "MISSING_NUMBER", "UNPARSED_VALUE", "INVALID_OPTION", "CONFLICT_WITH_PREVIOUS", "CONFLICT_DOES_NOT_DRINK", "CONFLICT_MAX_BELOW_USUAL", "UNCERTAIN", "REQUEST_SKIP", "REFUSED", "ASK_PURPOSE", "OFF_TOPIC", "OUT_OF_SCHEMA"], "description": "NEXT\xB7CORRECT\uC5D0\uB294 \uC5C6\uB2E4. action\uBCC4 \uD5C8\uC6A9\uAC12\uC740 allOf \uCC38\uACE0. OTHER_BEVERAGE, MISSING_NUMBER, UNPARSED_VALUE, INVALID_OPTION 4\uC885\uC740 \uD559\uC2B5 \uB370\uC774\uD130\uC5D0 \uC788\uC5B4 \uACC4\uC57D\uC73C\uB85C \uC778\uC815\uD55C\uB2E4(\uB370\uC774\uD130\uC14B \uB2F4\uB2F9\uC758 \uC815\uB9AC \uC694\uCCAD\uC740 V2_DRAFT.md\uC758 \uC5F4\uB9B0 \uD56D\uBAA9)." }, "targets": { "type": "array", "minItems": 1, "items": { "$comment": "\uBAA8\uB378 \uD0A4 \uBB38\uBC95(CONVENTIONS 10\uC808): \uBB38\uD56D.\uCE78 \uB610\uB294 \uBB38\uD56D[\uC885\uB958].\uCE78. \uBB38\uD56D ID\uB294 Q1.D01, Q4_1, Q10 \uD615\uD0DC. \uC885\uB958 \uAD04\uD638\uB294 \uC220 \uCE78\uC5D0\uB9CC \uBD99\uACE0, \uC885\uB958\uB97C \uBAA8\uB974\uB294 \uC220 \uCE78(BEVERAGE_MISSING)\uC740 \uAD04\uD638 \uC5C6\uB294 Q7_1.amount \uD615\uD0DC\uB85C \uB0B8\uB2E4(\uACC4\uC57D\uC73C\uB85C \uC778\uC815, 2.0.0). SlotRef \uBB38\uC790\uC5F4(ChangeClassification.affected_slots)\uACFC\uB294 \uB2E4\uB978 \uBB38\uBC95\uC774\uB2E4.", "type": "string", "pattern": "^Q[0-9]+(\\.D[0-9]{2})?(_[0-9]+)?(\\[(soju|beer|spirits|makgeolli|wine)\\])?\\.[a-z][a-z_]*$" }, "description": "REASK\xB7CONFIRM\xB7HOLD\xB7SKIP\uB9CC. \uD56D\uBAA9\uC740 values\uC758 key \uC911 \uD558\uB098(\uC2A4\uD0A4\uB9C8\uB85C \uD45C\uD604 \uBABB \uD568, \uC758\uBBF8 \uAC80\uC99D)." }, "values": { "type": "array", "items": { "type": "object", "additionalProperties": false, "required": ["key", "value", "precision", "status", "save"], "properties": { "key": { "$comment": "\uBAA8\uB378 \uD0A4 \uBB38\uBC95(CONVENTIONS 10\uC808): \uBB38\uD56D.\uCE78 \uB610\uB294 \uBB38\uD56D[\uC885\uB958].\uCE78. \uBB38\uD56D ID\uB294 Q1.D01, Q4_1, Q10 \uD615\uD0DC. \uC885\uB958 \uAD04\uD638\uB294 \uC220 \uCE78\uC5D0\uB9CC \uBD99\uACE0, \uC885\uB958\uB97C \uBAA8\uB974\uB294 \uC220 \uCE78(BEVERAGE_MISSING)\uC740 \uAD04\uD638 \uC5C6\uB294 Q7_1.amount \uD615\uD0DC\uB85C \uB0B8\uB2E4(\uACC4\uC57D\uC73C\uB85C \uC778\uC815, 2.0.0). SlotRef \uBB38\uC790\uC5F4(ChangeClassification.affected_slots)\uACFC\uB294 \uB2E4\uB978 \uBB38\uBC95\uC774\uB2E4.", "type": "string", "pattern": "^Q[0-9]+(\\.D[0-9]{2})?(_[0-9]+)?(\\[(soju|beer|spirits|makgeolli|wine)\\])?\\.[a-z][a-z_]*$" }, "precision": { "enum": ["exact", "approximate", "unspecified"] }, "save": { "type": "boolean" }, "status": { "enum": ["ANSWERED", "CORRECTION", "MISSING", "UNCLEAR", "CONFLICT", "UNKNOWN", "REJECTED"] }, "value": { "$comment": "\uCE78 \uAC12. \uB370\uC774\uD130\uC5D0\uC11C \uD655\uC778\uD55C \uD615\uD0DC: \uBD88\uB9AC\uC5B8, \uC22B\uC790(\uC815\uC218\xB7\uC18C\uC218), \uC120\uD0DD\uC9C0 \uCF54\uB4DC \uBB38\uC790\uC5F4, null.", "type": ["boolean", "number", "string", "null"] } }, "allOf": [{ "if": { "properties": { "status": { "enum": ["ANSWERED", "CORRECTION"] } }, "required": ["status"] }, "then": { "properties": { "save": { "const": true }, "precision": { "enum": ["exact", "approximate"] }, "value": { "type": ["boolean", "number", "string"] } } }, "else": { "properties": { "save": { "const": false } } } }, { "if": { "properties": { "status": { "enum": ["MISSING", "UNCLEAR", "UNKNOWN", "REJECTED"] } }, "required": ["status"] }, "then": { "properties": { "value": { "type": "null" }, "precision": { "const": "unspecified" } } } }] }, "description": "\uC774\uBC88 \uB9D0\uC5D0\uC11C \uC815\uD55C \uCE78 \uAC12\uB4E4. REDIRECT\uB294 \uBE48 \uBAA9\uB85D." } }, "allOf": [{ "if": { "properties": { "action": { "const": "NEXT" } }, "required": ["action"] }, "then": { "properties": { "reason": false, "targets": false, "note": false } } }, { "if": { "properties": { "action": { "const": "CORRECT" } }, "required": ["action"] }, "then": { "properties": { "reason": false, "targets": false, "note": false } } }, { "if": { "properties": { "action": { "const": "REASK" } }, "required": ["action"] }, "then": { "required": ["reason", "targets"], "properties": { "reason": { "enum": ["MISSING", "OUT_OF_RANGE", "UNKNOWN_UNIT", "VAGUE_QUANTITY", "RANGE_SPANS_OPTIONS", "COUNT_EXCEEDS_DAYS", "OTHER_BEVERAGE", "BEVERAGE_MISSING", "MISSING_NUMBER", "UNPARSED_VALUE", "INVALID_OPTION"] }, "note": false } } }, { "if": { "properties": { "action": { "const": "CONFIRM" } }, "required": ["action"] }, "then": { "required": ["reason", "targets"], "properties": { "reason": { "enum": ["CONFLICT_WITH_PREVIOUS", "CONFLICT_DOES_NOT_DRINK", "CONFLICT_MAX_BELOW_USUAL"] }, "note": false } } }, { "if": { "properties": { "action": { "const": "HOLD" } }, "required": ["action"] }, "then": { "required": ["reason", "targets"], "properties": { "reason": { "enum": ["UNCERTAIN"] }, "note": false } } }, { "if": { "properties": { "action": { "const": "SKIP" } }, "required": ["action"] }, "then": { "required": ["reason", "targets"], "properties": { "reason": { "enum": ["REQUEST_SKIP", "REFUSED"] }, "note": false } } }, { "if": { "properties": { "action": { "const": "REDIRECT" } }, "required": ["action"] }, "then": { "required": ["reason"], "properties": { "reason": { "enum": ["ASK_PURPOSE", "OFF_TOPIC", "OUT_OF_SCHEMA"] }, "targets": false, "values": { "maxItems": 0 } } } }, { "if": { "properties": { "reason": { "const": "OUT_OF_SCHEMA" } }, "required": ["reason"] }, "then": { "required": ["note"] }, "else": { "properties": { "note": false } } }] };
var pattern6 = new RegExp("^(END|Q[0-9]+(\\.D[0-9]{2})?(_[0-9]+)?)$", "u");
function validate21(data, { instancePath = "", parentData, parentDataProperty, rootData = data, dynamicAnchors = {} } = {}) {
  let vErrors = null;
  let errors = 0;
  const evaluated0 = validate21.evaluated;
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
        if ("NEXT" !== data.action) {
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
      if (data.reason !== void 0) {
        const err2 = { instancePath: instancePath + "/reason", schemaPath: "#/allOf/0/then/properties/reason/false schema", keyword: "false schema", params: {}, message: "boolean schema is false" };
        if (vErrors === null) {
          vErrors = [err2];
        } else {
          vErrors.push(err2);
        }
        errors++;
      }
      if (data.targets !== void 0) {
        const err3 = { instancePath: instancePath + "/targets", schemaPath: "#/allOf/0/then/properties/targets/false schema", keyword: "false schema", params: {}, message: "boolean schema is false" };
        if (vErrors === null) {
          vErrors = [err3];
        } else {
          vErrors.push(err3);
        }
        errors++;
      }
      if (data.note !== void 0) {
        const err4 = { instancePath: instancePath + "/note", schemaPath: "#/allOf/0/then/properties/note/false schema", keyword: "false schema", params: {}, message: "boolean schema is false" };
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
      props0.reason = true;
      props0.targets = true;
      props0.note = true;
      props0.action = true;
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
    if (data.action === void 0 && (missing1 = "action")) {
      const err6 = {};
      if (vErrors === null) {
        vErrors = [err6];
      } else {
        vErrors.push(err6);
      }
      errors++;
    } else {
      if (data.action !== void 0) {
        if ("CORRECT" !== data.action) {
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
      if (data.reason !== void 0) {
        const err8 = { instancePath: instancePath + "/reason", schemaPath: "#/allOf/1/then/properties/reason/false schema", keyword: "false schema", params: {}, message: "boolean schema is false" };
        if (vErrors === null) {
          vErrors = [err8];
        } else {
          vErrors.push(err8);
        }
        errors++;
      }
      if (data.targets !== void 0) {
        const err9 = { instancePath: instancePath + "/targets", schemaPath: "#/allOf/1/then/properties/targets/false schema", keyword: "false schema", params: {}, message: "boolean schema is false" };
        if (vErrors === null) {
          vErrors = [err9];
        } else {
          vErrors.push(err9);
        }
        errors++;
      }
      if (data.note !== void 0) {
        const err10 = { instancePath: instancePath + "/note", schemaPath: "#/allOf/1/then/properties/note/false schema", keyword: "false schema", params: {}, message: "boolean schema is false" };
        if (vErrors === null) {
          vErrors = [err10];
        } else {
          vErrors.push(err10);
        }
        errors++;
      }
    }
    var _valid1 = _errs10 === errors;
    valid4 = _valid1;
    if (valid4) {
      var props1 = {};
      props1.reason = true;
      props1.targets = true;
      props1.note = true;
      props1.action = true;
    }
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
  if (props0 !== true && props1 !== void 0) {
    if (props1 === true) {
      props0 = true;
    } else {
      props0 = props0 || {};
      Object.assign(props0, props1);
    }
  }
  const _errs12 = errors;
  let valid7 = true;
  const _errs13 = errors;
  if (data && typeof data == "object" && !Array.isArray(data)) {
    let missing2;
    if (data.action === void 0 && (missing2 = "action")) {
      const err12 = {};
      if (vErrors === null) {
        vErrors = [err12];
      } else {
        vErrors.push(err12);
      }
      errors++;
    } else {
      if (data.action !== void 0) {
        if ("REASK" !== data.action) {
          const err13 = {};
          if (vErrors === null) {
            vErrors = [err13];
          } else {
            vErrors.push(err13);
          }
          errors++;
        }
      }
    }
  }
  var _valid2 = _errs13 === errors;
  errors = _errs12;
  if (vErrors !== null) {
    if (_errs12) {
      vErrors.length = _errs12;
    } else {
      vErrors = null;
    }
  }
  if (_valid2) {
    const _errs15 = errors;
    if (data && typeof data == "object" && !Array.isArray(data)) {
      if (data.reason === void 0) {
        const err14 = { instancePath, schemaPath: "#/allOf/2/then/required", keyword: "required", params: { missingProperty: "reason" }, message: "must have required property 'reason'" };
        if (vErrors === null) {
          vErrors = [err14];
        } else {
          vErrors.push(err14);
        }
        errors++;
      }
      if (data.targets === void 0) {
        const err15 = { instancePath, schemaPath: "#/allOf/2/then/required", keyword: "required", params: { missingProperty: "targets" }, message: "must have required property 'targets'" };
        if (vErrors === null) {
          vErrors = [err15];
        } else {
          vErrors.push(err15);
        }
        errors++;
      }
      if (data.reason !== void 0) {
        let data9 = data.reason;
        if (!(data9 === "MISSING" || data9 === "OUT_OF_RANGE" || data9 === "UNKNOWN_UNIT" || data9 === "VAGUE_QUANTITY" || data9 === "RANGE_SPANS_OPTIONS" || data9 === "COUNT_EXCEEDS_DAYS" || data9 === "OTHER_BEVERAGE" || data9 === "BEVERAGE_MISSING" || data9 === "MISSING_NUMBER" || data9 === "UNPARSED_VALUE" || data9 === "INVALID_OPTION")) {
          const err16 = { instancePath: instancePath + "/reason", schemaPath: "#/allOf/2/then/properties/reason/enum", keyword: "enum", params: { allowedValues: schema32.allOf[2].then.properties.reason.enum }, message: "must be equal to one of the allowed values" };
          if (vErrors === null) {
            vErrors = [err16];
          } else {
            vErrors.push(err16);
          }
          errors++;
        }
      }
      if (data.note !== void 0) {
        const err17 = { instancePath: instancePath + "/note", schemaPath: "#/allOf/2/then/properties/note/false schema", keyword: "false schema", params: {}, message: "boolean schema is false" };
        if (vErrors === null) {
          vErrors = [err17];
        } else {
          vErrors.push(err17);
        }
        errors++;
      }
    }
    var _valid2 = _errs15 === errors;
    valid7 = _valid2;
    if (valid7) {
      var props2 = {};
      props2.reason = true;
      props2.note = true;
      props2.action = true;
    }
  }
  if (!valid7) {
    const err18 = { instancePath, schemaPath: "#/allOf/2/if", keyword: "if", params: { failingKeyword: "then" }, message: 'must match "then" schema' };
    if (vErrors === null) {
      vErrors = [err18];
    } else {
      vErrors.push(err18);
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
  const _errs18 = errors;
  let valid10 = true;
  const _errs19 = errors;
  if (data && typeof data == "object" && !Array.isArray(data)) {
    let missing3;
    if (data.action === void 0 && (missing3 = "action")) {
      const err19 = {};
      if (vErrors === null) {
        vErrors = [err19];
      } else {
        vErrors.push(err19);
      }
      errors++;
    } else {
      if (data.action !== void 0) {
        if ("CONFIRM" !== data.action) {
          const err20 = {};
          if (vErrors === null) {
            vErrors = [err20];
          } else {
            vErrors.push(err20);
          }
          errors++;
        }
      }
    }
  }
  var _valid3 = _errs19 === errors;
  errors = _errs18;
  if (vErrors !== null) {
    if (_errs18) {
      vErrors.length = _errs18;
    } else {
      vErrors = null;
    }
  }
  if (_valid3) {
    const _errs21 = errors;
    if (data && typeof data == "object" && !Array.isArray(data)) {
      if (data.reason === void 0) {
        const err21 = { instancePath, schemaPath: "#/allOf/3/then/required", keyword: "required", params: { missingProperty: "reason" }, message: "must have required property 'reason'" };
        if (vErrors === null) {
          vErrors = [err21];
        } else {
          vErrors.push(err21);
        }
        errors++;
      }
      if (data.targets === void 0) {
        const err22 = { instancePath, schemaPath: "#/allOf/3/then/required", keyword: "required", params: { missingProperty: "targets" }, message: "must have required property 'targets'" };
        if (vErrors === null) {
          vErrors = [err22];
        } else {
          vErrors.push(err22);
        }
        errors++;
      }
      if (data.reason !== void 0) {
        let data12 = data.reason;
        if (!(data12 === "CONFLICT_WITH_PREVIOUS" || data12 === "CONFLICT_DOES_NOT_DRINK" || data12 === "CONFLICT_MAX_BELOW_USUAL")) {
          const err23 = { instancePath: instancePath + "/reason", schemaPath: "#/allOf/3/then/properties/reason/enum", keyword: "enum", params: { allowedValues: schema32.allOf[3].then.properties.reason.enum }, message: "must be equal to one of the allowed values" };
          if (vErrors === null) {
            vErrors = [err23];
          } else {
            vErrors.push(err23);
          }
          errors++;
        }
      }
      if (data.note !== void 0) {
        const err24 = { instancePath: instancePath + "/note", schemaPath: "#/allOf/3/then/properties/note/false schema", keyword: "false schema", params: {}, message: "boolean schema is false" };
        if (vErrors === null) {
          vErrors = [err24];
        } else {
          vErrors.push(err24);
        }
        errors++;
      }
    }
    var _valid3 = _errs21 === errors;
    valid10 = _valid3;
    if (valid10) {
      var props3 = {};
      props3.reason = true;
      props3.note = true;
      props3.action = true;
    }
  }
  if (!valid10) {
    const err25 = { instancePath, schemaPath: "#/allOf/3/if", keyword: "if", params: { failingKeyword: "then" }, message: 'must match "then" schema' };
    if (vErrors === null) {
      vErrors = [err25];
    } else {
      vErrors.push(err25);
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
  const _errs24 = errors;
  let valid13 = true;
  const _errs25 = errors;
  if (data && typeof data == "object" && !Array.isArray(data)) {
    let missing4;
    if (data.action === void 0 && (missing4 = "action")) {
      const err26 = {};
      if (vErrors === null) {
        vErrors = [err26];
      } else {
        vErrors.push(err26);
      }
      errors++;
    } else {
      if (data.action !== void 0) {
        if ("HOLD" !== data.action) {
          const err27 = {};
          if (vErrors === null) {
            vErrors = [err27];
          } else {
            vErrors.push(err27);
          }
          errors++;
        }
      }
    }
  }
  var _valid4 = _errs25 === errors;
  errors = _errs24;
  if (vErrors !== null) {
    if (_errs24) {
      vErrors.length = _errs24;
    } else {
      vErrors = null;
    }
  }
  if (_valid4) {
    const _errs27 = errors;
    if (data && typeof data == "object" && !Array.isArray(data)) {
      if (data.reason === void 0) {
        const err28 = { instancePath, schemaPath: "#/allOf/4/then/required", keyword: "required", params: { missingProperty: "reason" }, message: "must have required property 'reason'" };
        if (vErrors === null) {
          vErrors = [err28];
        } else {
          vErrors.push(err28);
        }
        errors++;
      }
      if (data.targets === void 0) {
        const err29 = { instancePath, schemaPath: "#/allOf/4/then/required", keyword: "required", params: { missingProperty: "targets" }, message: "must have required property 'targets'" };
        if (vErrors === null) {
          vErrors = [err29];
        } else {
          vErrors.push(err29);
        }
        errors++;
      }
      if (data.reason !== void 0) {
        if (!(data.reason === "UNCERTAIN")) {
          const err30 = { instancePath: instancePath + "/reason", schemaPath: "#/allOf/4/then/properties/reason/enum", keyword: "enum", params: { allowedValues: schema32.allOf[4].then.properties.reason.enum }, message: "must be equal to one of the allowed values" };
          if (vErrors === null) {
            vErrors = [err30];
          } else {
            vErrors.push(err30);
          }
          errors++;
        }
      }
      if (data.note !== void 0) {
        const err31 = { instancePath: instancePath + "/note", schemaPath: "#/allOf/4/then/properties/note/false schema", keyword: "false schema", params: {}, message: "boolean schema is false" };
        if (vErrors === null) {
          vErrors = [err31];
        } else {
          vErrors.push(err31);
        }
        errors++;
      }
    }
    var _valid4 = _errs27 === errors;
    valid13 = _valid4;
    if (valid13) {
      var props4 = {};
      props4.reason = true;
      props4.note = true;
      props4.action = true;
    }
  }
  if (!valid13) {
    const err32 = { instancePath, schemaPath: "#/allOf/4/if", keyword: "if", params: { failingKeyword: "then" }, message: 'must match "then" schema' };
    if (vErrors === null) {
      vErrors = [err32];
    } else {
      vErrors.push(err32);
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
  const _errs30 = errors;
  let valid16 = true;
  const _errs31 = errors;
  if (data && typeof data == "object" && !Array.isArray(data)) {
    let missing5;
    if (data.action === void 0 && (missing5 = "action")) {
      const err33 = {};
      if (vErrors === null) {
        vErrors = [err33];
      } else {
        vErrors.push(err33);
      }
      errors++;
    } else {
      if (data.action !== void 0) {
        if ("SKIP" !== data.action) {
          const err34 = {};
          if (vErrors === null) {
            vErrors = [err34];
          } else {
            vErrors.push(err34);
          }
          errors++;
        }
      }
    }
  }
  var _valid5 = _errs31 === errors;
  errors = _errs30;
  if (vErrors !== null) {
    if (_errs30) {
      vErrors.length = _errs30;
    } else {
      vErrors = null;
    }
  }
  if (_valid5) {
    const _errs33 = errors;
    if (data && typeof data == "object" && !Array.isArray(data)) {
      if (data.reason === void 0) {
        const err35 = { instancePath, schemaPath: "#/allOf/5/then/required", keyword: "required", params: { missingProperty: "reason" }, message: "must have required property 'reason'" };
        if (vErrors === null) {
          vErrors = [err35];
        } else {
          vErrors.push(err35);
        }
        errors++;
      }
      if (data.targets === void 0) {
        const err36 = { instancePath, schemaPath: "#/allOf/5/then/required", keyword: "required", params: { missingProperty: "targets" }, message: "must have required property 'targets'" };
        if (vErrors === null) {
          vErrors = [err36];
        } else {
          vErrors.push(err36);
        }
        errors++;
      }
      if (data.reason !== void 0) {
        let data18 = data.reason;
        if (!(data18 === "REQUEST_SKIP" || data18 === "REFUSED")) {
          const err37 = { instancePath: instancePath + "/reason", schemaPath: "#/allOf/5/then/properties/reason/enum", keyword: "enum", params: { allowedValues: schema32.allOf[5].then.properties.reason.enum }, message: "must be equal to one of the allowed values" };
          if (vErrors === null) {
            vErrors = [err37];
          } else {
            vErrors.push(err37);
          }
          errors++;
        }
      }
      if (data.note !== void 0) {
        const err38 = { instancePath: instancePath + "/note", schemaPath: "#/allOf/5/then/properties/note/false schema", keyword: "false schema", params: {}, message: "boolean schema is false" };
        if (vErrors === null) {
          vErrors = [err38];
        } else {
          vErrors.push(err38);
        }
        errors++;
      }
    }
    var _valid5 = _errs33 === errors;
    valid16 = _valid5;
    if (valid16) {
      var props5 = {};
      props5.reason = true;
      props5.note = true;
      props5.action = true;
    }
  }
  if (!valid16) {
    const err39 = { instancePath, schemaPath: "#/allOf/5/if", keyword: "if", params: { failingKeyword: "then" }, message: 'must match "then" schema' };
    if (vErrors === null) {
      vErrors = [err39];
    } else {
      vErrors.push(err39);
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
  const _errs36 = errors;
  let valid19 = true;
  const _errs37 = errors;
  if (data && typeof data == "object" && !Array.isArray(data)) {
    let missing6;
    if (data.action === void 0 && (missing6 = "action")) {
      const err40 = {};
      if (vErrors === null) {
        vErrors = [err40];
      } else {
        vErrors.push(err40);
      }
      errors++;
    } else {
      if (data.action !== void 0) {
        if ("REDIRECT" !== data.action) {
          const err41 = {};
          if (vErrors === null) {
            vErrors = [err41];
          } else {
            vErrors.push(err41);
          }
          errors++;
        }
      }
    }
  }
  var _valid6 = _errs37 === errors;
  errors = _errs36;
  if (vErrors !== null) {
    if (_errs36) {
      vErrors.length = _errs36;
    } else {
      vErrors = null;
    }
  }
  if (_valid6) {
    const _errs39 = errors;
    if (data && typeof data == "object" && !Array.isArray(data)) {
      if (data.reason === void 0) {
        const err42 = { instancePath, schemaPath: "#/allOf/6/then/required", keyword: "required", params: { missingProperty: "reason" }, message: "must have required property 'reason'" };
        if (vErrors === null) {
          vErrors = [err42];
        } else {
          vErrors.push(err42);
        }
        errors++;
      }
      if (data.reason !== void 0) {
        let data21 = data.reason;
        if (!(data21 === "ASK_PURPOSE" || data21 === "OFF_TOPIC" || data21 === "OUT_OF_SCHEMA")) {
          const err43 = { instancePath: instancePath + "/reason", schemaPath: "#/allOf/6/then/properties/reason/enum", keyword: "enum", params: { allowedValues: schema32.allOf[6].then.properties.reason.enum }, message: "must be equal to one of the allowed values" };
          if (vErrors === null) {
            vErrors = [err43];
          } else {
            vErrors.push(err43);
          }
          errors++;
        }
      }
      if (data.targets !== void 0) {
        const err44 = { instancePath: instancePath + "/targets", schemaPath: "#/allOf/6/then/properties/targets/false schema", keyword: "false schema", params: {}, message: "boolean schema is false" };
        if (vErrors === null) {
          vErrors = [err44];
        } else {
          vErrors.push(err44);
        }
        errors++;
      }
      if (data.values !== void 0) {
        let data23 = data.values;
        if (Array.isArray(data23)) {
          if (data23.length > 0) {
            const err45 = { instancePath: instancePath + "/values", schemaPath: "#/allOf/6/then/properties/values/maxItems", keyword: "maxItems", params: { limit: 0 }, message: "must NOT have more than 0 items" };
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
    var _valid6 = _errs39 === errors;
    valid19 = _valid6;
    if (valid19) {
      var props6 = {};
      props6.reason = true;
      props6.targets = true;
      props6.values = true;
      props6.action = true;
    }
  }
  if (!valid19) {
    const err46 = { instancePath, schemaPath: "#/allOf/6/if", keyword: "if", params: { failingKeyword: "then" }, message: 'must match "then" schema' };
    if (vErrors === null) {
      vErrors = [err46];
    } else {
      vErrors.push(err46);
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
  const _errs43 = errors;
  let valid22 = true;
  const _errs44 = errors;
  if (data && typeof data == "object" && !Array.isArray(data)) {
    let missing7;
    if (data.reason === void 0 && (missing7 = "reason")) {
      const err47 = {};
      if (vErrors === null) {
        vErrors = [err47];
      } else {
        vErrors.push(err47);
      }
      errors++;
    } else {
      if (data.reason !== void 0) {
        if ("OUT_OF_SCHEMA" !== data.reason) {
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
  var _valid7 = _errs44 === errors;
  errors = _errs43;
  if (vErrors !== null) {
    if (_errs43) {
      vErrors.length = _errs43;
    } else {
      vErrors = null;
    }
  }
  let ifClause0;
  if (_valid7) {
    const _errs46 = errors;
    if (data && typeof data == "object" && !Array.isArray(data)) {
      if (data.note === void 0) {
        const err49 = { instancePath, schemaPath: "#/allOf/7/then/required", keyword: "required", params: { missingProperty: "note" }, message: "must have required property 'note'" };
        if (vErrors === null) {
          vErrors = [err49];
        } else {
          vErrors.push(err49);
        }
        errors++;
      }
    }
    var _valid7 = _errs46 === errors;
    valid22 = _valid7;
    ifClause0 = "then";
  } else {
    const _errs47 = errors;
    if (data && typeof data == "object" && !Array.isArray(data)) {
      if (data.note !== void 0) {
        const err50 = { instancePath: instancePath + "/note", schemaPath: "#/allOf/7/else/properties/note/false schema", keyword: "false schema", params: {}, message: "boolean schema is false" };
        if (vErrors === null) {
          vErrors = [err50];
        } else {
          vErrors.push(err50);
        }
        errors++;
      }
    }
    var _valid7 = _errs47 === errors;
    valid22 = _valid7;
    if (valid22) {
      var props7 = {};
      props7.note = true;
      props7.reason = true;
    }
    ifClause0 = "else";
  }
  if (!valid22) {
    const err51 = { instancePath, schemaPath: "#/allOf/7/if", keyword: "if", params: { failingKeyword: ifClause0 }, message: 'must match "' + ifClause0 + '" schema' };
    if (vErrors === null) {
      vErrors = [err51];
    } else {
      vErrors.push(err51);
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
  if (data && typeof data == "object" && !Array.isArray(data)) {
    if (data.values === void 0) {
      const err52 = { instancePath, schemaPath: "#/required", keyword: "required", params: { missingProperty: "values" }, message: "must have required property 'values'" };
      if (vErrors === null) {
        vErrors = [err52];
      } else {
        vErrors.push(err52);
      }
      errors++;
    }
    if (data.action === void 0) {
      const err53 = { instancePath, schemaPath: "#/required", keyword: "required", params: { missingProperty: "action" }, message: "must have required property 'action'" };
      if (vErrors === null) {
        vErrors = [err53];
      } else {
        vErrors.push(err53);
      }
      errors++;
    }
    if (data.next_item === void 0) {
      const err54 = { instancePath, schemaPath: "#/required", keyword: "required", params: { missingProperty: "next_item" }, message: "must have required property 'next_item'" };
      if (vErrors === null) {
        vErrors = [err54];
      } else {
        vErrors.push(err54);
      }
      errors++;
    }
    for (const key0 in data) {
      if (!(key0 === "action" || key0 === "next_item" || key0 === "note" || key0 === "reason" || key0 === "targets" || key0 === "values")) {
        const err55 = { instancePath, schemaPath: "#/additionalProperties", keyword: "additionalProperties", params: { additionalProperty: key0 }, message: "must NOT have additional properties" };
        if (vErrors === null) {
          vErrors = [err55];
        } else {
          vErrors.push(err55);
        }
        errors++;
      }
    }
    if (data.action !== void 0) {
      let data26 = data.action;
      if (!(data26 === "NEXT" || data26 === "CORRECT" || data26 === "REASK" || data26 === "CONFIRM" || data26 === "HOLD" || data26 === "SKIP" || data26 === "REDIRECT")) {
        const err56 = { instancePath: instancePath + "/action", schemaPath: "#/properties/action/enum", keyword: "enum", params: { allowedValues: schema32.properties.action.enum }, message: "must be equal to one of the allowed values" };
        if (vErrors === null) {
          vErrors = [err56];
        } else {
          vErrors.push(err56);
        }
        errors++;
      }
    }
    if (data.next_item !== void 0) {
      let data27 = data.next_item;
      if (typeof data27 === "string") {
        if (!pattern6.test(data27)) {
          const err57 = { instancePath: instancePath + "/next_item", schemaPath: "#/properties/next_item/pattern", keyword: "pattern", params: { pattern: "^(END|Q[0-9]+(\\.D[0-9]{2})?(_[0-9]+)?)$" }, message: 'must match pattern "^(END|Q[0-9]+(\\.D[0-9]{2})?(_[0-9]+)?)$"' };
          if (vErrors === null) {
            vErrors = [err57];
          } else {
            vErrors.push(err57);
          }
          errors++;
        }
      } else {
        const err58 = { instancePath: instancePath + "/next_item", schemaPath: "#/properties/next_item/type", keyword: "type", params: { type: "string" }, message: "must be string" };
        if (vErrors === null) {
          vErrors = [err58];
        } else {
          vErrors.push(err58);
        }
        errors++;
      }
    }
    if (data.note !== void 0) {
      let data28 = data.note;
      if (typeof data28 === "string") {
        if (func1(data28) < 1) {
          const err59 = { instancePath: instancePath + "/note", schemaPath: "#/properties/note/minLength", keyword: "minLength", params: { limit: 1 }, message: "must NOT have fewer than 1 characters" };
          if (vErrors === null) {
            vErrors = [err59];
          } else {
            vErrors.push(err59);
          }
          errors++;
        }
      } else {
        const err60 = { instancePath: instancePath + "/note", schemaPath: "#/properties/note/type", keyword: "type", params: { type: "string" }, message: "must be string" };
        if (vErrors === null) {
          vErrors = [err60];
        } else {
          vErrors.push(err60);
        }
        errors++;
      }
    }
    if (data.reason !== void 0) {
      let data29 = data.reason;
      if (!(data29 === "MISSING" || data29 === "OUT_OF_RANGE" || data29 === "UNKNOWN_UNIT" || data29 === "VAGUE_QUANTITY" || data29 === "RANGE_SPANS_OPTIONS" || data29 === "COUNT_EXCEEDS_DAYS" || data29 === "OTHER_BEVERAGE" || data29 === "BEVERAGE_MISSING" || data29 === "MISSING_NUMBER" || data29 === "UNPARSED_VALUE" || data29 === "INVALID_OPTION" || data29 === "CONFLICT_WITH_PREVIOUS" || data29 === "CONFLICT_DOES_NOT_DRINK" || data29 === "CONFLICT_MAX_BELOW_USUAL" || data29 === "UNCERTAIN" || data29 === "REQUEST_SKIP" || data29 === "REFUSED" || data29 === "ASK_PURPOSE" || data29 === "OFF_TOPIC" || data29 === "OUT_OF_SCHEMA")) {
        const err61 = { instancePath: instancePath + "/reason", schemaPath: "#/properties/reason/enum", keyword: "enum", params: { allowedValues: schema32.properties.reason.enum }, message: "must be equal to one of the allowed values" };
        if (vErrors === null) {
          vErrors = [err61];
        } else {
          vErrors.push(err61);
        }
        errors++;
      }
    }
    if (data.targets !== void 0) {
      let data30 = data.targets;
      if (Array.isArray(data30)) {
        if (data30.length < 1) {
          const err62 = { instancePath: instancePath + "/targets", schemaPath: "#/properties/targets/minItems", keyword: "minItems", params: { limit: 1 }, message: "must NOT have fewer than 1 items" };
          if (vErrors === null) {
            vErrors = [err62];
          } else {
            vErrors.push(err62);
          }
          errors++;
        }
        const len0 = data30.length;
        for (let i0 = 0; i0 < len0; i0++) {
          let data31 = data30[i0];
          if (typeof data31 === "string") {
            if (!pattern5.test(data31)) {
              const err63 = { instancePath: instancePath + "/targets/" + i0, schemaPath: "#/properties/targets/items/pattern", keyword: "pattern", params: { pattern: "^Q[0-9]+(\\.D[0-9]{2})?(_[0-9]+)?(\\[(soju|beer|spirits|makgeolli|wine)\\])?\\.[a-z][a-z_]*$" }, message: 'must match pattern "^Q[0-9]+(\\.D[0-9]{2})?(_[0-9]+)?(\\[(soju|beer|spirits|makgeolli|wine)\\])?\\.[a-z][a-z_]*$"' };
              if (vErrors === null) {
                vErrors = [err63];
              } else {
                vErrors.push(err63);
              }
              errors++;
            }
          } else {
            const err64 = { instancePath: instancePath + "/targets/" + i0, schemaPath: "#/properties/targets/items/type", keyword: "type", params: { type: "string" }, message: "must be string" };
            if (vErrors === null) {
              vErrors = [err64];
            } else {
              vErrors.push(err64);
            }
            errors++;
          }
        }
      } else {
        const err65 = { instancePath: instancePath + "/targets", schemaPath: "#/properties/targets/type", keyword: "type", params: { type: "array" }, message: "must be array" };
        if (vErrors === null) {
          vErrors = [err65];
        } else {
          vErrors.push(err65);
        }
        errors++;
      }
    }
    if (data.values !== void 0) {
      let data32 = data.values;
      if (Array.isArray(data32)) {
        const len1 = data32.length;
        for (let i1 = 0; i1 < len1; i1++) {
          let data33 = data32[i1];
          const _errs65 = errors;
          let valid31 = true;
          const _errs66 = errors;
          if (data33 && typeof data33 == "object" && !Array.isArray(data33)) {
            let missing8;
            if (data33.status === void 0 && (missing8 = "status")) {
              const err66 = {};
              if (vErrors === null) {
                vErrors = [err66];
              } else {
                vErrors.push(err66);
              }
              errors++;
            } else {
              if (data33.status !== void 0) {
                let data34 = data33.status;
                if (!(data34 === "ANSWERED" || data34 === "CORRECTION")) {
                  const err67 = {};
                  if (vErrors === null) {
                    vErrors = [err67];
                  } else {
                    vErrors.push(err67);
                  }
                  errors++;
                }
              }
            }
          }
          var _valid8 = _errs66 === errors;
          errors = _errs65;
          if (vErrors !== null) {
            if (_errs65) {
              vErrors.length = _errs65;
            } else {
              vErrors = null;
            }
          }
          let ifClause1;
          if (_valid8) {
            const _errs68 = errors;
            if (data33 && typeof data33 == "object" && !Array.isArray(data33)) {
              if (data33.save !== void 0) {
                if (true !== data33.save) {
                  const err68 = { instancePath: instancePath + "/values/" + i1 + "/save", schemaPath: "#/properties/values/items/allOf/0/then/properties/save/const", keyword: "const", params: { allowedValue: true }, message: "must be equal to constant" };
                  if (vErrors === null) {
                    vErrors = [err68];
                  } else {
                    vErrors.push(err68);
                  }
                  errors++;
                }
              }
              if (data33.precision !== void 0) {
                let data36 = data33.precision;
                if (!(data36 === "exact" || data36 === "approximate")) {
                  const err69 = { instancePath: instancePath + "/values/" + i1 + "/precision", schemaPath: "#/properties/values/items/allOf/0/then/properties/precision/enum", keyword: "enum", params: { allowedValues: schema32.properties.values.items.allOf[0].then.properties.precision.enum }, message: "must be equal to one of the allowed values" };
                  if (vErrors === null) {
                    vErrors = [err69];
                  } else {
                    vErrors.push(err69);
                  }
                  errors++;
                }
              }
              if (data33.value !== void 0) {
                let data37 = data33.value;
                if (typeof data37 !== "boolean" && !(typeof data37 == "number") && typeof data37 !== "string") {
                  const err70 = { instancePath: instancePath + "/values/" + i1 + "/value", schemaPath: "#/properties/values/items/allOf/0/then/properties/value/type", keyword: "type", params: { type: schema32.properties.values.items.allOf[0].then.properties.value.type }, message: "must be boolean,number,string" };
                  if (vErrors === null) {
                    vErrors = [err70];
                  } else {
                    vErrors.push(err70);
                  }
                  errors++;
                }
              }
            }
            var _valid8 = _errs68 === errors;
            valid31 = _valid8;
            if (valid31) {
              var props8 = {};
              props8.save = true;
              props8.precision = true;
              props8.value = true;
              props8.status = true;
            }
            ifClause1 = "then";
          } else {
            const _errs73 = errors;
            if (data33 && typeof data33 == "object" && !Array.isArray(data33)) {
              if (data33.save !== void 0) {
                if (false !== data33.save) {
                  const err71 = { instancePath: instancePath + "/values/" + i1 + "/save", schemaPath: "#/properties/values/items/allOf/0/else/properties/save/const", keyword: "const", params: { allowedValue: false }, message: "must be equal to constant" };
                  if (vErrors === null) {
                    vErrors = [err71];
                  } else {
                    vErrors.push(err71);
                  }
                  errors++;
                }
              }
            }
            var _valid8 = _errs73 === errors;
            valid31 = _valid8;
            if (valid31) {
              if (props8 !== true) {
                props8 = props8 || {};
                props8.save = true;
              }
            }
            ifClause1 = "else";
          }
          if (!valid31) {
            const err72 = { instancePath: instancePath + "/values/" + i1, schemaPath: "#/properties/values/items/allOf/0/if", keyword: "if", params: { failingKeyword: ifClause1 }, message: 'must match "' + ifClause1 + '" schema' };
            if (vErrors === null) {
              vErrors = [err72];
            } else {
              vErrors.push(err72);
            }
            errors++;
          }
          const _errs76 = errors;
          let valid35 = true;
          const _errs77 = errors;
          if (data33 && typeof data33 == "object" && !Array.isArray(data33)) {
            let missing9;
            if (data33.status === void 0 && (missing9 = "status")) {
              const err73 = {};
              if (vErrors === null) {
                vErrors = [err73];
              } else {
                vErrors.push(err73);
              }
              errors++;
            } else {
              if (data33.status !== void 0) {
                let data39 = data33.status;
                if (!(data39 === "MISSING" || data39 === "UNCLEAR" || data39 === "UNKNOWN" || data39 === "REJECTED")) {
                  const err74 = {};
                  if (vErrors === null) {
                    vErrors = [err74];
                  } else {
                    vErrors.push(err74);
                  }
                  errors++;
                }
              }
            }
          }
          var _valid9 = _errs77 === errors;
          errors = _errs76;
          if (vErrors !== null) {
            if (_errs76) {
              vErrors.length = _errs76;
            } else {
              vErrors = null;
            }
          }
          if (_valid9) {
            const _errs79 = errors;
            if (data33 && typeof data33 == "object" && !Array.isArray(data33)) {
              if (data33.value !== void 0) {
                if (data33.value !== null) {
                  const err75 = { instancePath: instancePath + "/values/" + i1 + "/value", schemaPath: "#/properties/values/items/allOf/1/then/properties/value/type", keyword: "type", params: { type: "null" }, message: "must be null" };
                  if (vErrors === null) {
                    vErrors = [err75];
                  } else {
                    vErrors.push(err75);
                  }
                  errors++;
                }
              }
              if (data33.precision !== void 0) {
                if ("unspecified" !== data33.precision) {
                  const err76 = { instancePath: instancePath + "/values/" + i1 + "/precision", schemaPath: "#/properties/values/items/allOf/1/then/properties/precision/const", keyword: "const", params: { allowedValue: "unspecified" }, message: "must be equal to constant" };
                  if (vErrors === null) {
                    vErrors = [err76];
                  } else {
                    vErrors.push(err76);
                  }
                  errors++;
                }
              }
            }
            var _valid9 = _errs79 === errors;
            valid35 = _valid9;
            if (valid35) {
              var props9 = {};
              props9.value = true;
              props9.precision = true;
              props9.status = true;
            }
          }
          if (!valid35) {
            const err77 = { instancePath: instancePath + "/values/" + i1, schemaPath: "#/properties/values/items/allOf/1/if", keyword: "if", params: { failingKeyword: "then" }, message: 'must match "then" schema' };
            if (vErrors === null) {
              vErrors = [err77];
            } else {
              vErrors.push(err77);
            }
            errors++;
          }
          if (props8 !== true && props9 !== void 0) {
            if (props9 === true) {
              props8 = true;
            } else {
              props8 = props8 || {};
              Object.assign(props8, props9);
            }
          }
          if (data33 && typeof data33 == "object" && !Array.isArray(data33)) {
            if (data33.key === void 0) {
              const err78 = { instancePath: instancePath + "/values/" + i1, schemaPath: "#/properties/values/items/required", keyword: "required", params: { missingProperty: "key" }, message: "must have required property 'key'" };
              if (vErrors === null) {
                vErrors = [err78];
              } else {
                vErrors.push(err78);
              }
              errors++;
            }
            if (data33.value === void 0) {
              const err79 = { instancePath: instancePath + "/values/" + i1, schemaPath: "#/properties/values/items/required", keyword: "required", params: { missingProperty: "value" }, message: "must have required property 'value'" };
              if (vErrors === null) {
                vErrors = [err79];
              } else {
                vErrors.push(err79);
              }
              errors++;
            }
            if (data33.precision === void 0) {
              const err80 = { instancePath: instancePath + "/values/" + i1, schemaPath: "#/properties/values/items/required", keyword: "required", params: { missingProperty: "precision" }, message: "must have required property 'precision'" };
              if (vErrors === null) {
                vErrors = [err80];
              } else {
                vErrors.push(err80);
              }
              errors++;
            }
            if (data33.status === void 0) {
              const err81 = { instancePath: instancePath + "/values/" + i1, schemaPath: "#/properties/values/items/required", keyword: "required", params: { missingProperty: "status" }, message: "must have required property 'status'" };
              if (vErrors === null) {
                vErrors = [err81];
              } else {
                vErrors.push(err81);
              }
              errors++;
            }
            if (data33.save === void 0) {
              const err82 = { instancePath: instancePath + "/values/" + i1, schemaPath: "#/properties/values/items/required", keyword: "required", params: { missingProperty: "save" }, message: "must have required property 'save'" };
              if (vErrors === null) {
                vErrors = [err82];
              } else {
                vErrors.push(err82);
              }
              errors++;
            }
            for (const key1 in data33) {
              if (!(key1 === "key" || key1 === "precision" || key1 === "save" || key1 === "status" || key1 === "value")) {
                const err83 = { instancePath: instancePath + "/values/" + i1, schemaPath: "#/properties/values/items/additionalProperties", keyword: "additionalProperties", params: { additionalProperty: key1 }, message: "must NOT have additional properties" };
                if (vErrors === null) {
                  vErrors = [err83];
                } else {
                  vErrors.push(err83);
                }
                errors++;
              }
            }
            if (data33.key !== void 0) {
              let data42 = data33.key;
              if (typeof data42 === "string") {
                if (!pattern5.test(data42)) {
                  const err84 = { instancePath: instancePath + "/values/" + i1 + "/key", schemaPath: "#/properties/values/items/properties/key/pattern", keyword: "pattern", params: { pattern: "^Q[0-9]+(\\.D[0-9]{2})?(_[0-9]+)?(\\[(soju|beer|spirits|makgeolli|wine)\\])?\\.[a-z][a-z_]*$" }, message: 'must match pattern "^Q[0-9]+(\\.D[0-9]{2})?(_[0-9]+)?(\\[(soju|beer|spirits|makgeolli|wine)\\])?\\.[a-z][a-z_]*$"' };
                  if (vErrors === null) {
                    vErrors = [err84];
                  } else {
                    vErrors.push(err84);
                  }
                  errors++;
                }
              } else {
                const err85 = { instancePath: instancePath + "/values/" + i1 + "/key", schemaPath: "#/properties/values/items/properties/key/type", keyword: "type", params: { type: "string" }, message: "must be string" };
                if (vErrors === null) {
                  vErrors = [err85];
                } else {
                  vErrors.push(err85);
                }
                errors++;
              }
            }
            if (data33.precision !== void 0) {
              let data43 = data33.precision;
              if (!(data43 === "exact" || data43 === "approximate" || data43 === "unspecified")) {
                const err86 = { instancePath: instancePath + "/values/" + i1 + "/precision", schemaPath: "#/properties/values/items/properties/precision/enum", keyword: "enum", params: { allowedValues: schema32.properties.values.items.properties.precision.enum }, message: "must be equal to one of the allowed values" };
                if (vErrors === null) {
                  vErrors = [err86];
                } else {
                  vErrors.push(err86);
                }
                errors++;
              }
            }
            if (data33.save !== void 0) {
              if (typeof data33.save !== "boolean") {
                const err87 = { instancePath: instancePath + "/values/" + i1 + "/save", schemaPath: "#/properties/values/items/properties/save/type", keyword: "type", params: { type: "boolean" }, message: "must be boolean" };
                if (vErrors === null) {
                  vErrors = [err87];
                } else {
                  vErrors.push(err87);
                }
                errors++;
              }
            }
            if (data33.status !== void 0) {
              let data45 = data33.status;
              if (!(data45 === "ANSWERED" || data45 === "CORRECTION" || data45 === "MISSING" || data45 === "UNCLEAR" || data45 === "CONFLICT" || data45 === "UNKNOWN" || data45 === "REJECTED")) {
                const err88 = { instancePath: instancePath + "/values/" + i1 + "/status", schemaPath: "#/properties/values/items/properties/status/enum", keyword: "enum", params: { allowedValues: schema32.properties.values.items.properties.status.enum }, message: "must be equal to one of the allowed values" };
                if (vErrors === null) {
                  vErrors = [err88];
                } else {
                  vErrors.push(err88);
                }
                errors++;
              }
            }
            if (data33.value !== void 0) {
              let data46 = data33.value;
              if (typeof data46 !== "boolean" && !(typeof data46 == "number") && typeof data46 !== "string" && data46 !== null) {
                const err89 = { instancePath: instancePath + "/values/" + i1 + "/value", schemaPath: "#/properties/values/items/properties/value/type", keyword: "type", params: { type: schema32.properties.values.items.properties.value.type }, message: "must be boolean,number,string,null" };
                if (vErrors === null) {
                  vErrors = [err89];
                } else {
                  vErrors.push(err89);
                }
                errors++;
              }
            }
          } else {
            const err90 = { instancePath: instancePath + "/values/" + i1, schemaPath: "#/properties/values/items/type", keyword: "type", params: { type: "object" }, message: "must be object" };
            if (vErrors === null) {
              vErrors = [err90];
            } else {
              vErrors.push(err90);
            }
            errors++;
          }
        }
      } else {
        const err91 = { instancePath: instancePath + "/values", schemaPath: "#/properties/values/type", keyword: "type", params: { type: "array" }, message: "must be array" };
        if (vErrors === null) {
          vErrors = [err91];
        } else {
          vErrors.push(err91);
        }
        errors++;
      }
    }
  } else {
    const err92 = { instancePath, schemaPath: "#/type", keyword: "type", params: { type: "object" }, message: "must be object" };
    if (vErrors === null) {
      vErrors = [err92];
    } else {
      vErrors.push(err92);
    }
    errors++;
  }
  validate21.errors = vErrors;
  return errors === 0;
}
validate21.evaluated = { "props": true, "dynamicProps": false, "dynamicItems": false };
exports.ResponseRequest = validate22;
var schema33 = { "$schema": "https://json-schema.org/draft/2020-12/schema", "title": "ResponseRequest", "description": "LoRA-B \uC785\uB825(2.0.0, D74). A \uCD9C\uB825\uC744 \uBC1B\uC740 \uC11C\uBE44\uC2A4\uAC00 \uD45C \uCC3E\uAE30(\uBB38\uD56D \uBC88\uD638\uB85C \uC9C8\uBB38 \uBB38\uC7A5, \uCE78\uC73C\uB85C \uC0AC\uB78C \uB9D0 \uC124\uBA85)\uB9CC\uC73C\uB85C \uC870\uB9BD\uD55C\uB2E4. \uBAA8\uB378 \uD638\uCD9C \uC5C6\uC74C, \uD310\uB2E8 \uC5C6\uC74C. \uC2DC\uC791(START)\uC740 A\uB97C \uAC70\uCE58\uC9C0 \uC54A\uACE0 \uC11C\uBE44\uC2A4\uAC00 \uC9C1\uC811 \uB9CC\uB4E0\uB2E4. \uCD9C\uB825\uC740 JSON\uC774 \uC544\uB2C8\uB77C \uC751\uB2F5 \uBB38\uC7A5 \uD14D\uC2A4\uD2B8(ResponseText).", "x-producers": ["survey-service", "synthetic-data"], "x-consumers": ["model-runtime", "model-lab"], "type": "object", "additionalProperties": false, "required": ["action", "topic", "next"], "properties": { "action": { "enum": ["START", "NEXT", "CORRECT", "REASK", "CONFIRM", "HOLD", "SKIP", "REDIRECT"] }, "reason": { "enum": ["MISSING", "OUT_OF_RANGE", "UNKNOWN_UNIT", "VAGUE_QUANTITY", "RANGE_SPANS_OPTIONS", "COUNT_EXCEEDS_DAYS", "OTHER_BEVERAGE", "BEVERAGE_MISSING", "MISSING_NUMBER", "UNPARSED_VALUE", "INVALID_OPTION", "CONFLICT_WITH_PREVIOUS", "CONFLICT_DOES_NOT_DRINK", "CONFLICT_MAX_BELOW_USUAL", "UNCERTAIN", "REQUEST_SKIP", "REFUSED", "ASK_PURPOSE", "OFF_TOPIC", "OUT_OF_SCHEMA"] }, "topic": { "type": "string", "minLength": 1, "description": "\uC9C0\uAE08 \uB2E4\uB8E8\uB294 \uBB38\uD56D\uC744 \uC0AC\uB78C \uB9D0\uB85C(START\uB294 \uCCAB \uBB38\uD56D). IO_SPEC \uBCF8\uBB38\uC5D0\uB294 \uC5C6\uACE0 \uB370\uC774\uD130\uC5D0 \uC788\uB2E4." }, "user_utterance": { "type": "string", "minLength": 1, "description": "\uD658\uC790 \uB9D0. START\uC5D0\uB294 \uC5C6\uB2E4." }, "known": { "type": "string", "description": "\uB418\uC9DA\uC744 \uC218 \uC788\uB294 \uAC12\uC744 \uC0AC\uB78C \uB9D0\uB85C. \uAC12\uC774 \uC5C6\uC73C\uBA74 \uBE48 \uBB38\uC790\uC5F4(CONFIRM\uC740 \uD56D\uC0C1 \uBE48 \uBB38\uC790\uC5F4). START\uC5D0\uB294 \uC5C6\uB2E4." }, "ask": { "type": "string", "minLength": 1, "description": "REASK\xB7CONFIRM\uC5D0\uC11C \uB2E4\uC2DC \uBB3C\uC744 \uAC83." }, "previous": { "type": "string", "minLength": 1, "description": "CONFIRM\uC758 \uC774\uC804 \uAC12(\uC0AC\uB78C \uB9D0)." }, "current": { "type": "string", "minLength": 1, "description": "CONFIRM\uC758 \uC774\uBC88 \uAC12(\uC0AC\uB78C \uB9D0)." }, "hold": { "type": "string", "minLength": 1, "description": "HOLD\xB7SKIP\uC5D0\uC11C \uBE44\uC6CC \uB450\uB294 \uBD80\uBD84\uC758 \uC9E7\uC740 \uC774\uB984." }, "note": { "type": "string", "minLength": 1, "description": "REDIRECT OUT_OF_SCHEMA\uC758 \uC694\uC57D(A \uCD9C\uB825 note \uADF8\uB300\uB85C)." }, "next": { "oneOf": [{ "type": "object", "additionalProperties": false, "required": ["type", "question_id", "text"], "properties": { "type": { "enum": ["NEXT", "SAME"] }, "question_id": { "type": "string", "pattern": "^Q[0-9]+(\\.D[0-9]{2})?(_[0-9]+)?$" }, "text": { "type": "string", "minLength": 1 } } }, { "type": "object", "additionalProperties": false, "required": ["type"], "properties": { "type": { "const": "END" } } }], "description": "type: NEXT(\uB2E4\uC74C \uBB38\uD56D) / SAME(\uAC19\uC740 \uBB38\uD56D \uB2E4\uC2DC) / END(\uB9C8\uBB34\uB9AC, type\uB9CC). text\uB294 \uBB38\uD56D \uC740\uD589\uC758 \uC9C8\uBB38 \uBB38\uC7A5." } }, "allOf": [{ "if": { "properties": { "action": { "const": "START" } }, "required": ["action"] }, "then": { "required": ["action", "topic", "next"], "properties": { "reason": false, "user_utterance": false, "known": false, "ask": false, "previous": false, "current": false, "hold": false, "note": false, "next": { "properties": { "type": { "const": "NEXT" }, "question_id": { "type": "string", "minLength": 1, "$comment": "3.3.0: START \uC758 \uCCAB \uBB38\uD56D\uC740 \uC138\uC158\uC758 \uBB38\uC9C4\uD45C \uC21C\uC11C \uCCAB \uBB38\uD56D\uC774\uB2E4(\uBB38\uC9C4\uD45C\uB9C8\uB2E4 \uB2E4\uB97C \uC218 \uC788\uB2E4). 3.2.x \uAE4C\uC9C0\uB294 \uD559\uC2B5 \uB370\uC774\uD130\uC14B v2 \uC758 \uCCAB \uBB38\uD56D Q1.D01 \uB85C \uACE0\uC815\uD588\uC5C8\uB2E4." } } } } } }, { "if": { "properties": { "action": { "const": "NEXT" } }, "required": ["action"] }, "then": { "required": ["action", "topic", "user_utterance", "known", "next"], "properties": { "reason": false, "ask": false, "previous": false, "current": false, "hold": false, "note": false, "next": { "properties": { "type": { "enum": ["NEXT", "END"] } } } } } }, { "if": { "properties": { "action": { "const": "CORRECT" } }, "required": ["action"] }, "then": { "required": ["action", "topic", "user_utterance", "known", "next"], "properties": { "reason": false, "ask": false, "previous": false, "current": false, "hold": false, "note": false, "next": { "properties": { "type": { "enum": ["NEXT", "END"] } } } } } }, { "if": { "properties": { "action": { "const": "REASK" } }, "required": ["action"] }, "then": { "required": ["action", "topic", "user_utterance", "known", "next", "reason", "ask"], "properties": { "previous": false, "current": false, "hold": false, "note": false, "next": { "properties": { "type": { "enum": ["SAME"] } } }, "reason": { "enum": ["MISSING", "OUT_OF_RANGE", "UNKNOWN_UNIT", "VAGUE_QUANTITY", "RANGE_SPANS_OPTIONS", "COUNT_EXCEEDS_DAYS", "OTHER_BEVERAGE", "BEVERAGE_MISSING", "MISSING_NUMBER", "UNPARSED_VALUE", "INVALID_OPTION"] } } } }, { "if": { "properties": { "action": { "const": "CONFIRM" } }, "required": ["action"] }, "then": { "required": ["action", "topic", "user_utterance", "known", "next", "reason", "ask", "previous", "current"], "properties": { "hold": false, "note": false, "next": { "properties": { "type": { "enum": ["SAME"] } } }, "reason": { "enum": ["CONFLICT_WITH_PREVIOUS", "CONFLICT_DOES_NOT_DRINK", "CONFLICT_MAX_BELOW_USUAL"] }, "known": { "const": "" } } } }, { "if": { "properties": { "action": { "const": "HOLD" } }, "required": ["action"] }, "then": { "required": ["action", "topic", "user_utterance", "known", "next", "reason", "hold"], "properties": { "ask": false, "previous": false, "current": false, "note": false, "next": { "properties": { "type": { "enum": ["NEXT", "END"] } } }, "reason": { "enum": ["UNCERTAIN"] } } } }, { "if": { "properties": { "action": { "const": "SKIP" } }, "required": ["action"] }, "then": { "required": ["action", "topic", "user_utterance", "known", "next", "reason", "hold"], "properties": { "ask": false, "previous": false, "current": false, "note": false, "next": { "properties": { "type": { "enum": ["NEXT", "END"] } } }, "reason": { "enum": ["REQUEST_SKIP", "REFUSED"] } } } }, { "if": { "properties": { "action": { "const": "REDIRECT" } }, "required": ["action"] }, "then": { "required": ["action", "topic", "user_utterance", "known", "next", "reason"], "properties": { "ask": false, "previous": false, "current": false, "hold": false, "next": { "properties": { "type": { "enum": ["SAME"] } } }, "reason": { "enum": ["ASK_PURPOSE", "OFF_TOPIC", "OUT_OF_SCHEMA"] } } } }, { "if": { "properties": { "reason": { "const": "OUT_OF_SCHEMA" } }, "required": ["reason"] }, "then": { "required": ["note"] }, "else": { "properties": { "note": false } } }] };
var func5 = Object.prototype.hasOwnProperty;
function validate22(data, { instancePath = "", parentData, parentDataProperty, rootData = data, dynamicAnchors = {} } = {}) {
  let vErrors = null;
  let errors = 0;
  const evaluated0 = validate22.evaluated;
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
              if (func1(data11) < 1) {
                const err14 = { instancePath: instancePath + "/next/question_id", schemaPath: "#/allOf/0/then/properties/next/properties/question_id/minLength", keyword: "minLength", params: { limit: 1 }, message: "must NOT have fewer than 1 characters" };
                if (vErrors === null) {
                  vErrors = [err14];
                } else {
                  vErrors.push(err14);
                }
                errors++;
              }
            } else {
              const err15 = { instancePath: instancePath + "/next/question_id", schemaPath: "#/allOf/0/then/properties/next/properties/question_id/type", keyword: "type", params: { type: "string" }, message: "must be string" };
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
  const _errs12 = errors;
  let valid5 = true;
  const _errs13 = errors;
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
  var _valid1 = _errs13 === errors;
  errors = _errs12;
  if (vErrors !== null) {
    if (_errs12) {
      vErrors.length = _errs12;
    } else {
      vErrors = null;
    }
  }
  if (_valid1) {
    const _errs15 = errors;
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
              const err30 = { instancePath: instancePath + "/next/type", schemaPath: "#/allOf/1/then/properties/next/properties/type/enum", keyword: "enum", params: { allowedValues: schema33.allOf[1].then.properties.next.properties.type.enum }, message: "must be equal to one of the allowed values" };
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
    var _valid1 = _errs15 === errors;
    valid5 = _valid1;
    if (valid5) {
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
  if (!valid5) {
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
  const _errs19 = errors;
  let valid9 = true;
  const _errs20 = errors;
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
  var _valid2 = _errs20 === errors;
  errors = _errs19;
  if (vErrors !== null) {
    if (_errs19) {
      vErrors.length = _errs19;
    } else {
      vErrors = null;
    }
  }
  if (_valid2) {
    const _errs22 = errors;
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
              const err45 = { instancePath: instancePath + "/next/type", schemaPath: "#/allOf/2/then/properties/next/properties/type/enum", keyword: "enum", params: { allowedValues: schema33.allOf[2].then.properties.next.properties.type.enum }, message: "must be equal to one of the allowed values" };
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
    var _valid2 = _errs22 === errors;
    valid9 = _valid2;
    if (valid9) {
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
  if (!valid9) {
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
  const _errs26 = errors;
  let valid13 = true;
  const _errs27 = errors;
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
  var _valid3 = _errs27 === errors;
  errors = _errs26;
  if (vErrors !== null) {
    if (_errs26) {
      vErrors.length = _errs26;
    } else {
      vErrors = null;
    }
  }
  if (_valid3) {
    const _errs29 = errors;
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
              const err60 = { instancePath: instancePath + "/next/type", schemaPath: "#/allOf/3/then/properties/next/properties/type/enum", keyword: "enum", params: { allowedValues: schema33.allOf[3].then.properties.next.properties.type.enum }, message: "must be equal to one of the allowed values" };
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
          const err61 = { instancePath: instancePath + "/reason", schemaPath: "#/allOf/3/then/properties/reason/enum", keyword: "enum", params: { allowedValues: schema33.allOf[3].then.properties.reason.enum }, message: "must be equal to one of the allowed values" };
          if (vErrors === null) {
            vErrors = [err61];
          } else {
            vErrors.push(err61);
          }
          errors++;
        }
      }
    }
    var _valid3 = _errs29 === errors;
    valid13 = _valid3;
    if (valid13) {
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
  if (!valid13) {
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
  const _errs34 = errors;
  let valid17 = true;
  const _errs35 = errors;
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
  var _valid4 = _errs35 === errors;
  errors = _errs34;
  if (vErrors !== null) {
    if (_errs34) {
      vErrors.length = _errs34;
    } else {
      vErrors = null;
    }
  }
  if (_valid4) {
    const _errs37 = errors;
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
              const err76 = { instancePath: instancePath + "/next/type", schemaPath: "#/allOf/4/then/properties/next/properties/type/enum", keyword: "enum", params: { allowedValues: schema33.allOf[4].then.properties.next.properties.type.enum }, message: "must be equal to one of the allowed values" };
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
          const err77 = { instancePath: instancePath + "/reason", schemaPath: "#/allOf/4/then/properties/reason/enum", keyword: "enum", params: { allowedValues: schema33.allOf[4].then.properties.reason.enum }, message: "must be equal to one of the allowed values" };
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
    var _valid4 = _errs37 === errors;
    valid17 = _valid4;
    if (valid17) {
      var props4 = {};
      props4.hold = true;
      props4.note = true;
      props4.next = true;
      props4.reason = true;
      props4.known = true;
      props4.action = true;
    }
  }
  if (!valid17) {
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
  const _errs43 = errors;
  let valid21 = true;
  const _errs44 = errors;
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
  var _valid5 = _errs44 === errors;
  errors = _errs43;
  if (vErrors !== null) {
    if (_errs43) {
      vErrors.length = _errs43;
    } else {
      vErrors = null;
    }
  }
  if (_valid5) {
    const _errs46 = errors;
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
              const err93 = { instancePath: instancePath + "/next/type", schemaPath: "#/allOf/5/then/properties/next/properties/type/enum", keyword: "enum", params: { allowedValues: schema33.allOf[5].then.properties.next.properties.type.enum }, message: "must be equal to one of the allowed values" };
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
          const err94 = { instancePath: instancePath + "/reason", schemaPath: "#/allOf/5/then/properties/reason/enum", keyword: "enum", params: { allowedValues: schema33.allOf[5].then.properties.reason.enum }, message: "must be equal to one of the allowed values" };
          if (vErrors === null) {
            vErrors = [err94];
          } else {
            vErrors.push(err94);
          }
          errors++;
        }
      }
    }
    var _valid5 = _errs46 === errors;
    valid21 = _valid5;
    if (valid21) {
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
  if (!valid21) {
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
  const _errs51 = errors;
  let valid25 = true;
  const _errs52 = errors;
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
  var _valid6 = _errs52 === errors;
  errors = _errs51;
  if (vErrors !== null) {
    if (_errs51) {
      vErrors.length = _errs51;
    } else {
      vErrors = null;
    }
  }
  if (_valid6) {
    const _errs54 = errors;
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
              const err109 = { instancePath: instancePath + "/next/type", schemaPath: "#/allOf/6/then/properties/next/properties/type/enum", keyword: "enum", params: { allowedValues: schema33.allOf[6].then.properties.next.properties.type.enum }, message: "must be equal to one of the allowed values" };
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
          const err110 = { instancePath: instancePath + "/reason", schemaPath: "#/allOf/6/then/properties/reason/enum", keyword: "enum", params: { allowedValues: schema33.allOf[6].then.properties.reason.enum }, message: "must be equal to one of the allowed values" };
          if (vErrors === null) {
            vErrors = [err110];
          } else {
            vErrors.push(err110);
          }
          errors++;
        }
      }
    }
    var _valid6 = _errs54 === errors;
    valid25 = _valid6;
    if (valid25) {
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
  if (!valid25) {
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
  const _errs59 = errors;
  let valid29 = true;
  const _errs60 = errors;
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
  var _valid7 = _errs60 === errors;
  errors = _errs59;
  if (vErrors !== null) {
    if (_errs59) {
      vErrors.length = _errs59;
    } else {
      vErrors = null;
    }
  }
  if (_valid7) {
    const _errs62 = errors;
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
              const err124 = { instancePath: instancePath + "/next/type", schemaPath: "#/allOf/7/then/properties/next/properties/type/enum", keyword: "enum", params: { allowedValues: schema33.allOf[7].then.properties.next.properties.type.enum }, message: "must be equal to one of the allowed values" };
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
          const err125 = { instancePath: instancePath + "/reason", schemaPath: "#/allOf/7/then/properties/reason/enum", keyword: "enum", params: { allowedValues: schema33.allOf[7].then.properties.reason.enum }, message: "must be equal to one of the allowed values" };
          if (vErrors === null) {
            vErrors = [err125];
          } else {
            vErrors.push(err125);
          }
          errors++;
        }
      }
    }
    var _valid7 = _errs62 === errors;
    valid29 = _valid7;
    if (valid29) {
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
  if (!valid29) {
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
  const _errs67 = errors;
  let valid33 = true;
  const _errs68 = errors;
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
  var _valid8 = _errs68 === errors;
  errors = _errs67;
  if (vErrors !== null) {
    if (_errs67) {
      vErrors.length = _errs67;
    } else {
      vErrors = null;
    }
  }
  let ifClause0;
  if (_valid8) {
    const _errs70 = errors;
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
    var _valid8 = _errs70 === errors;
    valid33 = _valid8;
    ifClause0 = "then";
  } else {
    const _errs71 = errors;
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
    var _valid8 = _errs71 === errors;
    valid33 = _valid8;
    if (valid33) {
      var props8 = {};
      props8.note = true;
      props8.reason = true;
    }
    ifClause0 = "else";
  }
  if (!valid33) {
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
      if (!func5.call(schema33.properties, key0)) {
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
        const err136 = { instancePath: instancePath + "/action", schemaPath: "#/properties/action/enum", keyword: "enum", params: { allowedValues: schema33.properties.action.enum }, message: "must be equal to one of the allowed values" };
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
        const err137 = { instancePath: instancePath + "/reason", schemaPath: "#/properties/reason/enum", keyword: "enum", params: { allowedValues: schema33.properties.reason.enum }, message: "must be equal to one of the allowed values" };
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
      const _errs92 = errors;
      let valid37 = false;
      let passing0 = null;
      const _errs93 = errors;
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
            const err157 = { instancePath: instancePath + "/next/type", schemaPath: "#/properties/next/oneOf/0/properties/type/enum", keyword: "enum", params: { allowedValues: schema33.properties.next.oneOf[0].properties.type.enum }, message: "must be equal to one of the allowed values" };
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
            if (!pattern4.test(data83)) {
              const err158 = { instancePath: instancePath + "/next/question_id", schemaPath: "#/properties/next/oneOf/0/properties/question_id/pattern", keyword: "pattern", params: { pattern: "^Q[0-9]+(\\.D[0-9]{2})?(_[0-9]+)?$" }, message: 'must match pattern "^Q[0-9]+(\\.D[0-9]{2})?(_[0-9]+)?$"' };
              if (vErrors === null) {
                vErrors = [err158];
              } else {
                vErrors.push(err158);
              }
              errors++;
            }
          } else {
            const err159 = { instancePath: instancePath + "/next/question_id", schemaPath: "#/properties/next/oneOf/0/properties/question_id/type", keyword: "type", params: { type: "string" }, message: "must be string" };
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
      var _valid9 = _errs93 === errors;
      if (_valid9) {
        valid37 = true;
        passing0 = 0;
        var props9 = true;
      }
      const _errs101 = errors;
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
      var _valid9 = _errs101 === errors;
      if (_valid9 && valid37) {
        valid37 = false;
        passing0 = [passing0, 1];
      } else {
        if (_valid9) {
          valid37 = true;
          passing0 = 1;
          if (props9 !== true) {
            props9 = true;
          }
        }
      }
      if (!valid37) {
        const err167 = { instancePath: instancePath + "/next", schemaPath: "#/properties/next/oneOf", keyword: "oneOf", params: { passingSchemas: passing0 }, message: "must match exactly one schema in oneOf" };
        if (vErrors === null) {
          vErrors = [err167];
        } else {
          vErrors.push(err167);
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
    const err168 = { instancePath, schemaPath: "#/type", keyword: "type", params: { type: "object" }, message: "must be object" };
    if (vErrors === null) {
      vErrors = [err168];
    } else {
      vErrors.push(err168);
    }
    errors++;
  }
  validate22.errors = vErrors;
  return errors === 0;
}
validate22.evaluated = { "props": true, "dynamicProps": false, "dynamicItems": false };
exports.ResponseText = validate23;
function validate23(data, { instancePath = "", parentData, parentDataProperty, rootData = data, dynamicAnchors = {} } = {}) {
  let vErrors = null;
  let errors = 0;
  const evaluated0 = validate23.evaluated;
  if (evaluated0.dynamicProps) {
    evaluated0.props = void 0;
  }
  if (evaluated0.dynamicItems) {
    evaluated0.items = void 0;
  }
  if (typeof data === "string") {
    if (func1(data) < 1) {
      const err0 = { instancePath, schemaPath: "#/minLength", keyword: "minLength", params: { limit: 1 }, message: "must NOT have fewer than 1 characters" };
      if (vErrors === null) {
        vErrors = [err0];
      } else {
        vErrors.push(err0);
      }
      errors++;
    }
  } else {
    const err1 = { instancePath, schemaPath: "#/type", keyword: "type", params: { type: "string" }, message: "must be string" };
    if (vErrors === null) {
      vErrors = [err1];
    } else {
      vErrors.push(err1);
    }
    errors++;
  }
  validate23.errors = vErrors;
  return errors === 0;
}
validate23.evaluated = { "dynamicProps": false, "dynamicItems": false };
exports.ApprovalRequest = validate24;
var schema35 = { "$schema": "https://json-schema.org/draft/2020-12/schema", "$id": "ApprovalRequest.schema.json", "title": "ApprovalRequest", "description": "POST /v1/approvals \uBCF8\uBB38(I5 decide). \uB9CC\uB4DC\uB294 \uCABD: admin-console. \uC77D\uB294 \uCABD: release-gate. GateApproval\uC5D0\uC11C \uC11C\uBC84\uAC00 \uC815\uD558\uB294 pipeline_schema_version, approval_id, decided_at, approver_id\uB97C \uBE80 \uAC83\uC5D0 report_hash\uB97C \uB354\uD55C\uB2E4. approver_id\uB294 \uBCF4\uB0B4\uC9C0 \uC54A\uB294\uB2E4(X-Openit-User\uAC00 \uC720\uC77C\uD55C \uAE38, HTTP.md I5\xB7D88). \uBC18\uB824(REJECT)\uC5D0\uB294 reason\uC774 \uD544\uC218\uB2E4.", "x-producers": ["admin-console"], "x-consumers": ["release-gate"], "type": "object", "additionalProperties": false, "required": ["submission_id", "decision", "report_hash"], "properties": { "submission_id": { "$ref": "_common.schema.json#/$defs/Id" }, "decision": { "enum": ["APPROVE", "REJECT"] }, "approver_role": { "const": "release-approver", "description": "Optional audit claim; authenticated token determines the role." }, "reason": { "type": "string", "minLength": 1, "description": "\uBC18\uB824\uC5D0\uB294 \uD544\uC218" }, "report_hash": { "$ref": "_common.schema.json#/$defs/Hash", "description": "GET review-report \uC751\uB2F5 \uD5E4\uB354 X-Openit-Report-Hash\uB97C \uADF8\uB300\uB85C \uB3CC\uB824\uC900 \uAC12. \uD654\uBA74\uC740 \uACC4\uC0B0\uD558\uC9C0 \uC54A\uB294\uB2E4" } }, "if": { "properties": { "decision": { "const": "REJECT" } }, "required": ["decision"] }, "then": { "required": ["reason"] } };
var pattern10 = new RegExp("^[A-Za-z0-9][A-Za-z0-9._:-]*$", "u");
var pattern11 = new RegExp("^sha256:[0-9a-f]{64}$", "u");
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
      if (data.reason === void 0) {
        const err2 = { instancePath, schemaPath: "#/then/required", keyword: "required", params: { missingProperty: "reason" }, message: "must have required property 'reason'" };
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
    if (data.submission_id === void 0) {
      const err4 = { instancePath, schemaPath: "#/required", keyword: "required", params: { missingProperty: "submission_id" }, message: "must have required property 'submission_id'" };
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
    if (data.report_hash === void 0) {
      const err6 = { instancePath, schemaPath: "#/required", keyword: "required", params: { missingProperty: "report_hash" }, message: "must have required property 'report_hash'" };
      if (vErrors === null) {
        vErrors = [err6];
      } else {
        vErrors.push(err6);
      }
      errors++;
    }
    for (const key0 in data) {
      if (!(key0 === "submission_id" || key0 === "decision" || key0 === "approver_role" || key0 === "reason" || key0 === "report_hash")) {
        const err7 = { instancePath, schemaPath: "#/additionalProperties", keyword: "additionalProperties", params: { additionalProperty: key0 }, message: "must NOT have additional properties" };
        if (vErrors === null) {
          vErrors = [err7];
        } else {
          vErrors.push(err7);
        }
        errors++;
      }
    }
    if (data.submission_id !== void 0) {
      let data1 = data.submission_id;
      if (typeof data1 === "string") {
        if (func1(data1) > 128) {
          const err8 = { instancePath: instancePath + "/submission_id", schemaPath: "_common.schema.json#/$defs/Id/maxLength", keyword: "maxLength", params: { limit: 128 }, message: "must NOT have more than 128 characters" };
          if (vErrors === null) {
            vErrors = [err8];
          } else {
            vErrors.push(err8);
          }
          errors++;
        }
        if (func1(data1) < 1) {
          const err9 = { instancePath: instancePath + "/submission_id", schemaPath: "_common.schema.json#/$defs/Id/minLength", keyword: "minLength", params: { limit: 1 }, message: "must NOT have fewer than 1 characters" };
          if (vErrors === null) {
            vErrors = [err9];
          } else {
            vErrors.push(err9);
          }
          errors++;
        }
        if (!pattern10.test(data1)) {
          const err10 = { instancePath: instancePath + "/submission_id", schemaPath: "_common.schema.json#/$defs/Id/pattern", keyword: "pattern", params: { pattern: "^[A-Za-z0-9][A-Za-z0-9._:-]*$" }, message: 'must match pattern "^[A-Za-z0-9][A-Za-z0-9._:-]*$"' };
          if (vErrors === null) {
            vErrors = [err10];
          } else {
            vErrors.push(err10);
          }
          errors++;
        }
      } else {
        const err11 = { instancePath: instancePath + "/submission_id", schemaPath: "_common.schema.json#/$defs/Id/type", keyword: "type", params: { type: "string" }, message: "must be string" };
        if (vErrors === null) {
          vErrors = [err11];
        } else {
          vErrors.push(err11);
        }
        errors++;
      }
    }
    if (data.decision !== void 0) {
      let data2 = data.decision;
      if (!(data2 === "APPROVE" || data2 === "REJECT")) {
        const err12 = { instancePath: instancePath + "/decision", schemaPath: "#/properties/decision/enum", keyword: "enum", params: { allowedValues: schema35.properties.decision.enum }, message: "must be equal to one of the allowed values" };
        if (vErrors === null) {
          vErrors = [err12];
        } else {
          vErrors.push(err12);
        }
        errors++;
      }
    }
    if (data.approver_role !== void 0) {
      if ("release-approver" !== data.approver_role) {
        const err13 = { instancePath: instancePath + "/approver_role", schemaPath: "#/properties/approver_role/const", keyword: "const", params: { allowedValue: "release-approver" }, message: "must be equal to constant" };
        if (vErrors === null) {
          vErrors = [err13];
        } else {
          vErrors.push(err13);
        }
        errors++;
      }
    }
    if (data.reason !== void 0) {
      let data4 = data.reason;
      if (typeof data4 === "string") {
        if (func1(data4) < 1) {
          const err14 = { instancePath: instancePath + "/reason", schemaPath: "#/properties/reason/minLength", keyword: "minLength", params: { limit: 1 }, message: "must NOT have fewer than 1 characters" };
          if (vErrors === null) {
            vErrors = [err14];
          } else {
            vErrors.push(err14);
          }
          errors++;
        }
      } else {
        const err15 = { instancePath: instancePath + "/reason", schemaPath: "#/properties/reason/type", keyword: "type", params: { type: "string" }, message: "must be string" };
        if (vErrors === null) {
          vErrors = [err15];
        } else {
          vErrors.push(err15);
        }
        errors++;
      }
    }
    if (data.report_hash !== void 0) {
      let data5 = data.report_hash;
      if (typeof data5 === "string") {
        if (!pattern11.test(data5)) {
          const err16 = { instancePath: instancePath + "/report_hash", schemaPath: "_common.schema.json#/$defs/Hash/pattern", keyword: "pattern", params: { pattern: "^sha256:[0-9a-f]{64}$" }, message: 'must match pattern "^sha256:[0-9a-f]{64}$"' };
          if (vErrors === null) {
            vErrors = [err16];
          } else {
            vErrors.push(err16);
          }
          errors++;
        }
      } else {
        const err17 = { instancePath: instancePath + "/report_hash", schemaPath: "_common.schema.json#/$defs/Hash/type", keyword: "type", params: { type: "string" }, message: "must be string" };
        if (vErrors === null) {
          vErrors = [err17];
        } else {
          vErrors.push(err17);
        }
        errors++;
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
  validate24.errors = vErrors;
  return errors === 0;
}
validate24.evaluated = { "props": true, "dynamicProps": false, "dynamicItems": false };
exports.ActivateRequest = validate26;
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
    if (data.release_id === void 0) {
      const err0 = { instancePath, schemaPath: "#/required", keyword: "required", params: { missingProperty: "release_id" }, message: "must have required property 'release_id'" };
      if (vErrors === null) {
        vErrors = [err0];
      } else {
        vErrors.push(err0);
      }
      errors++;
    }
    for (const key0 in data) {
      if (!(key0 === "release_id" || key0 === "requested_by_role")) {
        const err1 = { instancePath, schemaPath: "#/additionalProperties", keyword: "additionalProperties", params: { additionalProperty: key0 }, message: "must NOT have additional properties" };
        if (vErrors === null) {
          vErrors = [err1];
        } else {
          vErrors.push(err1);
        }
        errors++;
      }
    }
    if (data.release_id !== void 0) {
      let data0 = data.release_id;
      if (typeof data0 === "string") {
        if (func1(data0) > 128) {
          const err2 = { instancePath: instancePath + "/release_id", schemaPath: "_common.schema.json#/$defs/Id/maxLength", keyword: "maxLength", params: { limit: 128 }, message: "must NOT have more than 128 characters" };
          if (vErrors === null) {
            vErrors = [err2];
          } else {
            vErrors.push(err2);
          }
          errors++;
        }
        if (func1(data0) < 1) {
          const err3 = { instancePath: instancePath + "/release_id", schemaPath: "_common.schema.json#/$defs/Id/minLength", keyword: "minLength", params: { limit: 1 }, message: "must NOT have fewer than 1 characters" };
          if (vErrors === null) {
            vErrors = [err3];
          } else {
            vErrors.push(err3);
          }
          errors++;
        }
        if (!pattern10.test(data0)) {
          const err4 = { instancePath: instancePath + "/release_id", schemaPath: "_common.schema.json#/$defs/Id/pattern", keyword: "pattern", params: { pattern: "^[A-Za-z0-9][A-Za-z0-9._:-]*$" }, message: 'must match pattern "^[A-Za-z0-9][A-Za-z0-9._:-]*$"' };
          if (vErrors === null) {
            vErrors = [err4];
          } else {
            vErrors.push(err4);
          }
          errors++;
        }
      } else {
        const err5 = { instancePath: instancePath + "/release_id", schemaPath: "_common.schema.json#/$defs/Id/type", keyword: "type", params: { type: "string" }, message: "must be string" };
        if (vErrors === null) {
          vErrors = [err5];
        } else {
          vErrors.push(err5);
        }
        errors++;
      }
    }
    if (data.requested_by_role !== void 0) {
      if ("operator" !== data.requested_by_role) {
        const err6 = { instancePath: instancePath + "/requested_by_role", schemaPath: "#/properties/requested_by_role/const", keyword: "const", params: { allowedValue: "operator" }, message: "must be equal to constant" };
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
  validate26.errors = vErrors;
  return errors === 0;
}
validate26.evaluated = { "props": true, "dynamicProps": false, "dynamicItems": false };
exports.RollbackRequest = validate27;
var schema41 = { "$schema": "https://json-schema.org/draft/2020-12/schema", "title": "RollbackRequest", "description": "\uC6B4\uC601 \uAD00\uCE21\uC774 \uAC8C\uC774\uD2B8\uC5D0 \uBCF4\uB0B4\uB294 \uB864\uBC31 \uC694\uCCAD. \uC694\uCCAD\uB9CC \uD558\uBA70 \uD65C\uC131 \uD3EC\uC778\uD130\uB294 \uAC8C\uC774\uD2B8\uB9CC \uBC14\uAFBC\uB2E4.", "x-producers": ["ops-feedback", "admin-console"], "x-consumers": ["release-gate"], "type": "object", "additionalProperties": false, "required": ["pipeline_schema_version", "request_id", "requested_at", "from_release_id", "to_release_id", "reason", "evidence_refs", "requested_by_role"], "properties": { "pipeline_schema_version": { "$ref": "_common.schema.json#/$defs/PipelineSchemaVersion" }, "request_id": { "$ref": "_common.schema.json#/$defs/Id" }, "requested_at": { "$ref": "_common.schema.json#/$defs/Timestamp" }, "from_release_id": { "$ref": "_common.schema.json#/$defs/Id" }, "to_release_id": { "$ref": "_common.schema.json#/$defs/Id" }, "reason": { "type": "string", "minLength": 1 }, "evidence_refs": { "type": "array", "minItems": 1, "items": { "$ref": "_common.schema.json#/$defs/Id" }, "description": "\uADFC\uAC70 \uC2DD\uBCC4\uC790. \uC694\uCCAD\uD558\uB294 \uC601\uC5ED(ops-feedback)\uC774 \uD574\uC11D\uD558\uB294 \uBD88\uD22C\uBA85\uD55C Id(\uC9C0\uD45C \uC2A4\uB0C5\uC0F7, FailureCase.case_id \uB4F1)\uC774\uACE0 \uAC8C\uC774\uD2B8\uB294 \uD574\uC11D\uD558\uC9C0 \uC54A\uACE0 \uAE30\uB85D\uB9CC \uD55C\uB2E4." }, "requested_by_role": { "type": "string", "minLength": 1 }, "ext": { "type": "object", "description": "\uC601\uC5ED\uC774 \uACC4\uC57D\uC744 \uBC14\uAFB8\uC9C0 \uC54A\uACE0 \uB367\uBD99\uC774\uB294 \uBD80\uAC00 \uC815\uBCF4. \uD0A4\uB294 \uC601\uC5ED \uC774\uB984(\uC608: 'model-lab')\uC774\uACE0 \uAC12\uC740 \uADF8 \uC601\uC5ED\uC774 \uC815\uD55C\uB2E4. \uB2E4\uB978 \uC601\uC5ED\uC740 \uC774\uD574\uD558\uC9C0 \uBABB\uD574\uB3C4 \uBCF4\uC874\uD558\uACE0 \uC804\uB2EC\uD574\uC57C \uD558\uBA70, \uD310\uB2E8\uC5D0 \uC4F0\uC9C0 \uC54A\uB294\uB2E4. \uC5EC\uB7EC \uC601\uC5ED\uC774 \uD544\uC694\uB85C \uD558\uAC8C \uB418\uBA74 \uC815\uC2DD \uD544\uB4DC\uB85C \uC62C\uB9B0\uB2E4." } } };
var pattern13 = new RegExp("^(0|[1-9][0-9]*)\\.(0|[1-9][0-9]*)$", "u");
var pattern15 = new RegExp("Z$", "u");
var formats0 = require_formats().fullFormats["date-time"];
function validate27(data, { instancePath = "", parentData, parentDataProperty, rootData = data, dynamicAnchors = {} } = {}) {
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
    if (data.pipeline_schema_version === void 0) {
      const err0 = { instancePath, schemaPath: "#/required", keyword: "required", params: { missingProperty: "pipeline_schema_version" }, message: "must have required property 'pipeline_schema_version'" };
      if (vErrors === null) {
        vErrors = [err0];
      } else {
        vErrors.push(err0);
      }
      errors++;
    }
    if (data.request_id === void 0) {
      const err1 = { instancePath, schemaPath: "#/required", keyword: "required", params: { missingProperty: "request_id" }, message: "must have required property 'request_id'" };
      if (vErrors === null) {
        vErrors = [err1];
      } else {
        vErrors.push(err1);
      }
      errors++;
    }
    if (data.requested_at === void 0) {
      const err2 = { instancePath, schemaPath: "#/required", keyword: "required", params: { missingProperty: "requested_at" }, message: "must have required property 'requested_at'" };
      if (vErrors === null) {
        vErrors = [err2];
      } else {
        vErrors.push(err2);
      }
      errors++;
    }
    if (data.from_release_id === void 0) {
      const err3 = { instancePath, schemaPath: "#/required", keyword: "required", params: { missingProperty: "from_release_id" }, message: "must have required property 'from_release_id'" };
      if (vErrors === null) {
        vErrors = [err3];
      } else {
        vErrors.push(err3);
      }
      errors++;
    }
    if (data.to_release_id === void 0) {
      const err4 = { instancePath, schemaPath: "#/required", keyword: "required", params: { missingProperty: "to_release_id" }, message: "must have required property 'to_release_id'" };
      if (vErrors === null) {
        vErrors = [err4];
      } else {
        vErrors.push(err4);
      }
      errors++;
    }
    if (data.reason === void 0) {
      const err5 = { instancePath, schemaPath: "#/required", keyword: "required", params: { missingProperty: "reason" }, message: "must have required property 'reason'" };
      if (vErrors === null) {
        vErrors = [err5];
      } else {
        vErrors.push(err5);
      }
      errors++;
    }
    if (data.evidence_refs === void 0) {
      const err6 = { instancePath, schemaPath: "#/required", keyword: "required", params: { missingProperty: "evidence_refs" }, message: "must have required property 'evidence_refs'" };
      if (vErrors === null) {
        vErrors = [err6];
      } else {
        vErrors.push(err6);
      }
      errors++;
    }
    if (data.requested_by_role === void 0) {
      const err7 = { instancePath, schemaPath: "#/required", keyword: "required", params: { missingProperty: "requested_by_role" }, message: "must have required property 'requested_by_role'" };
      if (vErrors === null) {
        vErrors = [err7];
      } else {
        vErrors.push(err7);
      }
      errors++;
    }
    for (const key0 in data) {
      if (!func5.call(schema41.properties, key0)) {
        const err8 = { instancePath, schemaPath: "#/additionalProperties", keyword: "additionalProperties", params: { additionalProperty: key0 }, message: "must NOT have additional properties" };
        if (vErrors === null) {
          vErrors = [err8];
        } else {
          vErrors.push(err8);
        }
        errors++;
      }
    }
    if (data.pipeline_schema_version !== void 0) {
      let data0 = data.pipeline_schema_version;
      if (typeof data0 === "string") {
        if (!pattern13.test(data0)) {
          const err9 = { instancePath: instancePath + "/pipeline_schema_version", schemaPath: "_common.schema.json#/$defs/PipelineSchemaVersion/pattern", keyword: "pattern", params: { pattern: "^(0|[1-9][0-9]*)\\.(0|[1-9][0-9]*)$" }, message: 'must match pattern "^(0|[1-9][0-9]*)\\.(0|[1-9][0-9]*)$"' };
          if (vErrors === null) {
            vErrors = [err9];
          } else {
            vErrors.push(err9);
          }
          errors++;
        }
      } else {
        const err10 = { instancePath: instancePath + "/pipeline_schema_version", schemaPath: "_common.schema.json#/$defs/PipelineSchemaVersion/type", keyword: "type", params: { type: "string" }, message: "must be string" };
        if (vErrors === null) {
          vErrors = [err10];
        } else {
          vErrors.push(err10);
        }
        errors++;
      }
    }
    if (data.request_id !== void 0) {
      let data1 = data.request_id;
      if (typeof data1 === "string") {
        if (func1(data1) > 128) {
          const err11 = { instancePath: instancePath + "/request_id", schemaPath: "_common.schema.json#/$defs/Id/maxLength", keyword: "maxLength", params: { limit: 128 }, message: "must NOT have more than 128 characters" };
          if (vErrors === null) {
            vErrors = [err11];
          } else {
            vErrors.push(err11);
          }
          errors++;
        }
        if (func1(data1) < 1) {
          const err12 = { instancePath: instancePath + "/request_id", schemaPath: "_common.schema.json#/$defs/Id/minLength", keyword: "minLength", params: { limit: 1 }, message: "must NOT have fewer than 1 characters" };
          if (vErrors === null) {
            vErrors = [err12];
          } else {
            vErrors.push(err12);
          }
          errors++;
        }
        if (!pattern10.test(data1)) {
          const err13 = { instancePath: instancePath + "/request_id", schemaPath: "_common.schema.json#/$defs/Id/pattern", keyword: "pattern", params: { pattern: "^[A-Za-z0-9][A-Za-z0-9._:-]*$" }, message: 'must match pattern "^[A-Za-z0-9][A-Za-z0-9._:-]*$"' };
          if (vErrors === null) {
            vErrors = [err13];
          } else {
            vErrors.push(err13);
          }
          errors++;
        }
      } else {
        const err14 = { instancePath: instancePath + "/request_id", schemaPath: "_common.schema.json#/$defs/Id/type", keyword: "type", params: { type: "string" }, message: "must be string" };
        if (vErrors === null) {
          vErrors = [err14];
        } else {
          vErrors.push(err14);
        }
        errors++;
      }
    }
    if (data.requested_at !== void 0) {
      let data2 = data.requested_at;
      if (typeof data2 === "string") {
        if (!pattern15.test(data2)) {
          const err15 = { instancePath: instancePath + "/requested_at", schemaPath: "_common.schema.json#/$defs/Timestamp/pattern", keyword: "pattern", params: { pattern: "Z$" }, message: 'must match pattern "Z$"' };
          if (vErrors === null) {
            vErrors = [err15];
          } else {
            vErrors.push(err15);
          }
          errors++;
        }
        if (!formats0.validate(data2)) {
          const err16 = { instancePath: instancePath + "/requested_at", schemaPath: "_common.schema.json#/$defs/Timestamp/format", keyword: "format", params: { format: "date-time" }, message: 'must match format "date-time"' };
          if (vErrors === null) {
            vErrors = [err16];
          } else {
            vErrors.push(err16);
          }
          errors++;
        }
      } else {
        const err17 = { instancePath: instancePath + "/requested_at", schemaPath: "_common.schema.json#/$defs/Timestamp/type", keyword: "type", params: { type: "string" }, message: "must be string" };
        if (vErrors === null) {
          vErrors = [err17];
        } else {
          vErrors.push(err17);
        }
        errors++;
      }
    }
    if (data.from_release_id !== void 0) {
      let data3 = data.from_release_id;
      if (typeof data3 === "string") {
        if (func1(data3) > 128) {
          const err18 = { instancePath: instancePath + "/from_release_id", schemaPath: "_common.schema.json#/$defs/Id/maxLength", keyword: "maxLength", params: { limit: 128 }, message: "must NOT have more than 128 characters" };
          if (vErrors === null) {
            vErrors = [err18];
          } else {
            vErrors.push(err18);
          }
          errors++;
        }
        if (func1(data3) < 1) {
          const err19 = { instancePath: instancePath + "/from_release_id", schemaPath: "_common.schema.json#/$defs/Id/minLength", keyword: "minLength", params: { limit: 1 }, message: "must NOT have fewer than 1 characters" };
          if (vErrors === null) {
            vErrors = [err19];
          } else {
            vErrors.push(err19);
          }
          errors++;
        }
        if (!pattern10.test(data3)) {
          const err20 = { instancePath: instancePath + "/from_release_id", schemaPath: "_common.schema.json#/$defs/Id/pattern", keyword: "pattern", params: { pattern: "^[A-Za-z0-9][A-Za-z0-9._:-]*$" }, message: 'must match pattern "^[A-Za-z0-9][A-Za-z0-9._:-]*$"' };
          if (vErrors === null) {
            vErrors = [err20];
          } else {
            vErrors.push(err20);
          }
          errors++;
        }
      } else {
        const err21 = { instancePath: instancePath + "/from_release_id", schemaPath: "_common.schema.json#/$defs/Id/type", keyword: "type", params: { type: "string" }, message: "must be string" };
        if (vErrors === null) {
          vErrors = [err21];
        } else {
          vErrors.push(err21);
        }
        errors++;
      }
    }
    if (data.to_release_id !== void 0) {
      let data4 = data.to_release_id;
      if (typeof data4 === "string") {
        if (func1(data4) > 128) {
          const err22 = { instancePath: instancePath + "/to_release_id", schemaPath: "_common.schema.json#/$defs/Id/maxLength", keyword: "maxLength", params: { limit: 128 }, message: "must NOT have more than 128 characters" };
          if (vErrors === null) {
            vErrors = [err22];
          } else {
            vErrors.push(err22);
          }
          errors++;
        }
        if (func1(data4) < 1) {
          const err23 = { instancePath: instancePath + "/to_release_id", schemaPath: "_common.schema.json#/$defs/Id/minLength", keyword: "minLength", params: { limit: 1 }, message: "must NOT have fewer than 1 characters" };
          if (vErrors === null) {
            vErrors = [err23];
          } else {
            vErrors.push(err23);
          }
          errors++;
        }
        if (!pattern10.test(data4)) {
          const err24 = { instancePath: instancePath + "/to_release_id", schemaPath: "_common.schema.json#/$defs/Id/pattern", keyword: "pattern", params: { pattern: "^[A-Za-z0-9][A-Za-z0-9._:-]*$" }, message: 'must match pattern "^[A-Za-z0-9][A-Za-z0-9._:-]*$"' };
          if (vErrors === null) {
            vErrors = [err24];
          } else {
            vErrors.push(err24);
          }
          errors++;
        }
      } else {
        const err25 = { instancePath: instancePath + "/to_release_id", schemaPath: "_common.schema.json#/$defs/Id/type", keyword: "type", params: { type: "string" }, message: "must be string" };
        if (vErrors === null) {
          vErrors = [err25];
        } else {
          vErrors.push(err25);
        }
        errors++;
      }
    }
    if (data.reason !== void 0) {
      let data5 = data.reason;
      if (typeof data5 === "string") {
        if (func1(data5) < 1) {
          const err26 = { instancePath: instancePath + "/reason", schemaPath: "#/properties/reason/minLength", keyword: "minLength", params: { limit: 1 }, message: "must NOT have fewer than 1 characters" };
          if (vErrors === null) {
            vErrors = [err26];
          } else {
            vErrors.push(err26);
          }
          errors++;
        }
      } else {
        const err27 = { instancePath: instancePath + "/reason", schemaPath: "#/properties/reason/type", keyword: "type", params: { type: "string" }, message: "must be string" };
        if (vErrors === null) {
          vErrors = [err27];
        } else {
          vErrors.push(err27);
        }
        errors++;
      }
    }
    if (data.evidence_refs !== void 0) {
      let data6 = data.evidence_refs;
      if (Array.isArray(data6)) {
        if (data6.length < 1) {
          const err28 = { instancePath: instancePath + "/evidence_refs", schemaPath: "#/properties/evidence_refs/minItems", keyword: "minItems", params: { limit: 1 }, message: "must NOT have fewer than 1 items" };
          if (vErrors === null) {
            vErrors = [err28];
          } else {
            vErrors.push(err28);
          }
          errors++;
        }
        const len0 = data6.length;
        for (let i0 = 0; i0 < len0; i0++) {
          let data7 = data6[i0];
          if (typeof data7 === "string") {
            if (func1(data7) > 128) {
              const err29 = { instancePath: instancePath + "/evidence_refs/" + i0, schemaPath: "_common.schema.json#/$defs/Id/maxLength", keyword: "maxLength", params: { limit: 128 }, message: "must NOT have more than 128 characters" };
              if (vErrors === null) {
                vErrors = [err29];
              } else {
                vErrors.push(err29);
              }
              errors++;
            }
            if (func1(data7) < 1) {
              const err30 = { instancePath: instancePath + "/evidence_refs/" + i0, schemaPath: "_common.schema.json#/$defs/Id/minLength", keyword: "minLength", params: { limit: 1 }, message: "must NOT have fewer than 1 characters" };
              if (vErrors === null) {
                vErrors = [err30];
              } else {
                vErrors.push(err30);
              }
              errors++;
            }
            if (!pattern10.test(data7)) {
              const err31 = { instancePath: instancePath + "/evidence_refs/" + i0, schemaPath: "_common.schema.json#/$defs/Id/pattern", keyword: "pattern", params: { pattern: "^[A-Za-z0-9][A-Za-z0-9._:-]*$" }, message: 'must match pattern "^[A-Za-z0-9][A-Za-z0-9._:-]*$"' };
              if (vErrors === null) {
                vErrors = [err31];
              } else {
                vErrors.push(err31);
              }
              errors++;
            }
          } else {
            const err32 = { instancePath: instancePath + "/evidence_refs/" + i0, schemaPath: "_common.schema.json#/$defs/Id/type", keyword: "type", params: { type: "string" }, message: "must be string" };
            if (vErrors === null) {
              vErrors = [err32];
            } else {
              vErrors.push(err32);
            }
            errors++;
          }
        }
      } else {
        const err33 = { instancePath: instancePath + "/evidence_refs", schemaPath: "#/properties/evidence_refs/type", keyword: "type", params: { type: "array" }, message: "must be array" };
        if (vErrors === null) {
          vErrors = [err33];
        } else {
          vErrors.push(err33);
        }
        errors++;
      }
    }
    if (data.requested_by_role !== void 0) {
      let data8 = data.requested_by_role;
      if (typeof data8 === "string") {
        if (func1(data8) < 1) {
          const err34 = { instancePath: instancePath + "/requested_by_role", schemaPath: "#/properties/requested_by_role/minLength", keyword: "minLength", params: { limit: 1 }, message: "must NOT have fewer than 1 characters" };
          if (vErrors === null) {
            vErrors = [err34];
          } else {
            vErrors.push(err34);
          }
          errors++;
        }
      } else {
        const err35 = { instancePath: instancePath + "/requested_by_role", schemaPath: "#/properties/requested_by_role/type", keyword: "type", params: { type: "string" }, message: "must be string" };
        if (vErrors === null) {
          vErrors = [err35];
        } else {
          vErrors.push(err35);
        }
        errors++;
      }
    }
    if (data.ext !== void 0) {
      let data9 = data.ext;
      if (!(data9 && typeof data9 == "object" && !Array.isArray(data9))) {
        const err36 = { instancePath: instancePath + "/ext", schemaPath: "#/properties/ext/type", keyword: "type", params: { type: "object" }, message: "must be object" };
        if (vErrors === null) {
          vErrors = [err36];
        } else {
          vErrors.push(err36);
        }
        errors++;
      }
    }
  } else {
    const err37 = { instancePath, schemaPath: "#/type", keyword: "type", params: { type: "object" }, message: "must be object" };
    if (vErrors === null) {
      vErrors = [err37];
    } else {
      vErrors.push(err37);
    }
    errors++;
  }
  validate27.errors = vErrors;
  return errors === 0;
}
validate27.evaluated = { "props": true, "dynamicProps": false, "dynamicItems": false };
exports.CaseReviewRequest = validate28;
var schema48 = { "$schema": "https://json-schema.org/draft/2020-12/schema", "$id": "CaseReviewRequest.schema.json", "title": "CaseReviewRequest", "description": "POST /v1/cases/{case_id}/review \uBCF8\uBB38(I7, Protocol \uBC16). \uB9CC\uB4DC\uB294 \uCABD: admin-console(\uAC80\uD1A0\uC790 \uD654\uBA74). \uC77D\uB294 \uCABD: ops-feedback. expected\uAC00 \uC788\uC73C\uBA74 expected_kind \uD544\uC218(HTTP.md I7). expected/reviewed_input\uC758 \uB0B4\uC6A9 \uAC80\uC99D(ActionExtraction \uB4F1)\uC740 \uC774 \uC2A4\uD0A4\uB9C8\uAC00 \uC544\uB2C8\uB77C \uD574\uB2F9 \uACC4\uC57D \uC2A4\uD0A4\uB9C8\uC640 \uC11C\uBC84\uC758 \uC77C\uC774\uB2E4. \uD654\uBA74\uC740 CONFIRMED\uAC00 \uC544\uB2CC \uACB0\uC815\uC5D0\uB294 review_status\uB9CC \uBCF4\uB0B8\uB2E4.", "x-producers": ["admin-console"], "x-consumers": ["ops-feedback"], "type": "object", "additionalProperties": false, "required": ["review_status"], "properties": { "review_status": { "enum": ["CONFIRMED", "DISMISSED", "PENDING"] }, "expected": { "type": ["object", "string"], "description": "LORA_A\uBA74 ActionExtraction(\uAC1D\uCCB4), LORA_B\uBA74 ResponseText(\uBE44\uC5B4 \uC788\uC9C0 \uC54A\uC740 \uBB38\uC790\uC5F4)" }, "expected_kind": { "enum": ["LORA_A", "LORA_B"] }, "reviewed_input": { "type": "object", "description": "LORA_A\uBA74 ActionExtractionInput, LORA_B\uBA74 ResponseRequest. \uAC1C\uC778\uC815\uBCF4 \uC5C6\uC774 \uACE0\uCCD0 \uC4F4 \uAC83" } }, "dependentRequired": { "expected": ["expected_kind"], "reviewed_input": ["expected_kind"] }, "allOf": [{ "if": { "properties": { "review_status": { "enum": ["DISMISSED", "PENDING"] } }, "required": ["review_status"] }, "then": { "not": { "anyOf": [{ "required": ["expected"] }, { "required": ["reviewed_input"] }, { "required": ["expected_kind"] }] } } }, { "if": { "properties": { "expected_kind": { "const": "LORA_A" } }, "required": ["expected_kind", "expected"] }, "then": { "properties": { "expected": { "type": "object" } } } }, { "if": { "properties": { "expected_kind": { "const": "LORA_B" } }, "required": ["expected_kind", "expected"] }, "then": { "properties": { "expected": { "type": "string", "minLength": 1 } } } }] };
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
        if (!(data0 === "DISMISSED" || data0 === "PENDING")) {
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
    const _errs8 = errors;
    let valid4 = false;
    const _errs9 = errors;
    if (data && typeof data == "object" && !Array.isArray(data)) {
      let missing1;
      if (data.expected === void 0 && (missing1 = "expected")) {
        const err2 = {};
        if (vErrors === null) {
          vErrors = [err2];
        } else {
          vErrors.push(err2);
        }
        errors++;
      }
    }
    var _valid1 = _errs9 === errors;
    valid4 = valid4 || _valid1;
    const _errs10 = errors;
    if (data && typeof data == "object" && !Array.isArray(data)) {
      let missing2;
      if (data.reviewed_input === void 0 && (missing2 = "reviewed_input")) {
        const err3 = {};
        if (vErrors === null) {
          vErrors = [err3];
        } else {
          vErrors.push(err3);
        }
        errors++;
      }
    }
    var _valid1 = _errs10 === errors;
    valid4 = valid4 || _valid1;
    const _errs11 = errors;
    if (data && typeof data == "object" && !Array.isArray(data)) {
      let missing3;
      if (data.expected_kind === void 0 && (missing3 = "expected_kind")) {
        const err4 = {};
        if (vErrors === null) {
          vErrors = [err4];
        } else {
          vErrors.push(err4);
        }
        errors++;
      }
    }
    var _valid1 = _errs11 === errors;
    valid4 = valid4 || _valid1;
    if (!valid4) {
      const err5 = {};
      if (vErrors === null) {
        vErrors = [err5];
      } else {
        vErrors.push(err5);
      }
      errors++;
    } else {
      errors = _errs8;
      if (vErrors !== null) {
        if (_errs8) {
          vErrors.length = _errs8;
        } else {
          vErrors = null;
        }
      }
    }
    var valid3 = _errs7 === errors;
    if (valid3) {
      const err6 = { instancePath, schemaPath: "#/allOf/0/then/not", keyword: "not", params: {}, message: "must NOT be valid" };
      if (vErrors === null) {
        vErrors = [err6];
      } else {
        vErrors.push(err6);
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
    valid1 = _valid0;
  }
  if (!valid1) {
    const err7 = { instancePath, schemaPath: "#/allOf/0/if", keyword: "if", params: { failingKeyword: "then" }, message: 'must match "then" schema' };
    if (vErrors === null) {
      vErrors = [err7];
    } else {
      vErrors.push(err7);
    }
    errors++;
  }
  const _errs13 = errors;
  let valid5 = true;
  const _errs14 = errors;
  if (data && typeof data == "object" && !Array.isArray(data)) {
    let missing4;
    if (data.expected_kind === void 0 && (missing4 = "expected_kind") || data.expected === void 0 && (missing4 = "expected")) {
      const err8 = {};
      if (vErrors === null) {
        vErrors = [err8];
      } else {
        vErrors.push(err8);
      }
      errors++;
    } else {
      if (data.expected_kind !== void 0) {
        if ("LORA_A" !== data.expected_kind) {
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
  var _valid2 = _errs14 === errors;
  errors = _errs13;
  if (vErrors !== null) {
    if (_errs13) {
      vErrors.length = _errs13;
    } else {
      vErrors = null;
    }
  }
  if (_valid2) {
    const _errs16 = errors;
    if (data && typeof data == "object" && !Array.isArray(data)) {
      if (data.expected !== void 0) {
        let data2 = data.expected;
        if (!(data2 && typeof data2 == "object" && !Array.isArray(data2))) {
          const err10 = { instancePath: instancePath + "/expected", schemaPath: "#/allOf/1/then/properties/expected/type", keyword: "type", params: { type: "object" }, message: "must be object" };
          if (vErrors === null) {
            vErrors = [err10];
          } else {
            vErrors.push(err10);
          }
          errors++;
        }
      }
    }
    var _valid2 = _errs16 === errors;
    valid5 = _valid2;
    if (valid5) {
      var props0 = {};
      props0.expected = true;
      props0.expected_kind = true;
    }
  }
  if (!valid5) {
    const err11 = { instancePath, schemaPath: "#/allOf/1/if", keyword: "if", params: { failingKeyword: "then" }, message: 'must match "then" schema' };
    if (vErrors === null) {
      vErrors = [err11];
    } else {
      vErrors.push(err11);
    }
    errors++;
  }
  if (props0 !== true) {
    props0 = props0 || {};
    props0.review_status = true;
  }
  const _errs20 = errors;
  let valid8 = true;
  const _errs21 = errors;
  if (data && typeof data == "object" && !Array.isArray(data)) {
    let missing5;
    if (data.expected_kind === void 0 && (missing5 = "expected_kind") || data.expected === void 0 && (missing5 = "expected")) {
      const err12 = {};
      if (vErrors === null) {
        vErrors = [err12];
      } else {
        vErrors.push(err12);
      }
      errors++;
    } else {
      if (data.expected_kind !== void 0) {
        if ("LORA_B" !== data.expected_kind) {
          const err13 = {};
          if (vErrors === null) {
            vErrors = [err13];
          } else {
            vErrors.push(err13);
          }
          errors++;
        }
      }
    }
  }
  var _valid3 = _errs21 === errors;
  errors = _errs20;
  if (vErrors !== null) {
    if (_errs20) {
      vErrors.length = _errs20;
    } else {
      vErrors = null;
    }
  }
  if (_valid3) {
    const _errs23 = errors;
    if (data && typeof data == "object" && !Array.isArray(data)) {
      if (data.expected !== void 0) {
        let data4 = data.expected;
        if (typeof data4 === "string") {
          if (func1(data4) < 1) {
            const err14 = { instancePath: instancePath + "/expected", schemaPath: "#/allOf/2/then/properties/expected/minLength", keyword: "minLength", params: { limit: 1 }, message: "must NOT have fewer than 1 characters" };
            if (vErrors === null) {
              vErrors = [err14];
            } else {
              vErrors.push(err14);
            }
            errors++;
          }
        } else {
          const err15 = { instancePath: instancePath + "/expected", schemaPath: "#/allOf/2/then/properties/expected/type", keyword: "type", params: { type: "string" }, message: "must be string" };
          if (vErrors === null) {
            vErrors = [err15];
          } else {
            vErrors.push(err15);
          }
          errors++;
        }
      }
    }
    var _valid3 = _errs23 === errors;
    valid8 = _valid3;
    if (valid8) {
      var props1 = {};
      props1.expected = true;
      props1.expected_kind = true;
    }
  }
  if (!valid8) {
    const err16 = { instancePath, schemaPath: "#/allOf/2/if", keyword: "if", params: { failingKeyword: "then" }, message: 'must match "then" schema' };
    if (vErrors === null) {
      vErrors = [err16];
    } else {
      vErrors.push(err16);
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
  if (data && typeof data == "object" && !Array.isArray(data)) {
    if (data.review_status === void 0) {
      const err17 = { instancePath, schemaPath: "#/required", keyword: "required", params: { missingProperty: "review_status" }, message: "must have required property 'review_status'" };
      if (vErrors === null) {
        vErrors = [err17];
      } else {
        vErrors.push(err17);
      }
      errors++;
    }
    for (const key0 in data) {
      if (!(key0 === "review_status" || key0 === "expected" || key0 === "expected_kind" || key0 === "reviewed_input")) {
        const err18 = { instancePath, schemaPath: "#/additionalProperties", keyword: "additionalProperties", params: { additionalProperty: key0 }, message: "must NOT have additional properties" };
        if (vErrors === null) {
          vErrors = [err18];
        } else {
          vErrors.push(err18);
        }
        errors++;
      }
    }
    if (data.review_status !== void 0) {
      let data5 = data.review_status;
      if (!(data5 === "CONFIRMED" || data5 === "DISMISSED" || data5 === "PENDING")) {
        const err19 = { instancePath: instancePath + "/review_status", schemaPath: "#/properties/review_status/enum", keyword: "enum", params: { allowedValues: schema48.properties.review_status.enum }, message: "must be equal to one of the allowed values" };
        if (vErrors === null) {
          vErrors = [err19];
        } else {
          vErrors.push(err19);
        }
        errors++;
      }
    }
    if (data.expected !== void 0) {
      let data6 = data.expected;
      if (!(data6 && typeof data6 == "object" && !Array.isArray(data6)) && typeof data6 !== "string") {
        const err20 = { instancePath: instancePath + "/expected", schemaPath: "#/properties/expected/type", keyword: "type", params: { type: schema48.properties.expected.type }, message: "must be object,string" };
        if (vErrors === null) {
          vErrors = [err20];
        } else {
          vErrors.push(err20);
        }
        errors++;
      }
    }
    if (data.expected_kind !== void 0) {
      let data7 = data.expected_kind;
      if (!(data7 === "LORA_A" || data7 === "LORA_B")) {
        const err21 = { instancePath: instancePath + "/expected_kind", schemaPath: "#/properties/expected_kind/enum", keyword: "enum", params: { allowedValues: schema48.properties.expected_kind.enum }, message: "must be equal to one of the allowed values" };
        if (vErrors === null) {
          vErrors = [err21];
        } else {
          vErrors.push(err21);
        }
        errors++;
      }
    }
    if (data.reviewed_input !== void 0) {
      let data8 = data.reviewed_input;
      if (!(data8 && typeof data8 == "object" && !Array.isArray(data8))) {
        const err22 = { instancePath: instancePath + "/reviewed_input", schemaPath: "#/properties/reviewed_input/type", keyword: "type", params: { type: "object" }, message: "must be object" };
        if (vErrors === null) {
          vErrors = [err22];
        } else {
          vErrors.push(err22);
        }
        errors++;
      }
    }
    if (data.expected !== void 0) {
      if (data.expected_kind === void 0) {
        const err23 = { instancePath, schemaPath: "#/dependentRequired", keyword: "dependentRequired", params: {
          property: "expected",
          missingProperty: "expected_kind",
          depsCount: 1,
          deps: "expected_kind"
        }, message: "must have property expected_kind when property expected is present" };
        if (vErrors === null) {
          vErrors = [err23];
        } else {
          vErrors.push(err23);
        }
        errors++;
      }
    }
    if (data.reviewed_input !== void 0) {
      if (data.expected_kind === void 0) {
        const err24 = { instancePath, schemaPath: "#/dependentRequired", keyword: "dependentRequired", params: {
          property: "reviewed_input",
          missingProperty: "expected_kind",
          depsCount: 1,
          deps: "expected_kind"
        }, message: "must have property expected_kind when property reviewed_input is present" };
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
  validate28.errors = vErrors;
  return errors === 0;
}
validate28.evaluated = { "props": true, "dynamicProps": false, "dynamicItems": false };
exports.ListEnvelope = validate29;
var schema49 = { "$schema": "https://json-schema.org/draft/2020-12/schema", "$id": "ListEnvelope.schema.json", "title": "ListEnvelope", "description": "HTTP.md \uACF5\uD1B5 \uBAA9\uB85D \uBD09\uD22C {items, next_cursor}. HTTP.md \uC758 \uBAA8\uB4E0 \uBAA9\uB85D \uC751\uB2F5(I1\xB7I2\xB7I3\xB7I4\xB7I5\xB7I7)\uC774 \uC774 \uBD09\uD22C\uB2E4(3.4.4 \uAC80\uD1A0 A-11). items \uC6D0\uC18C\uC758 \uBAA8\uC591\uC740 \uC815\uD558\uC9C0 \uC54A\uACE0(2.6.0) \uC6D0\uC18C\uB294 \uD638\uCD9C\uBCC4 \uACC4\uC57D \uC2A4\uD0A4\uB9C8(SubmissionView, ReleaseManifest, FailureCase)\uB85C \uB530\uB85C \uAC80\uC99D\uD55C\uB2E4. \uCFFC\uB9AC: cursor(\uBD88\uD22C\uBA85 \uBB38\uC790\uC5F4), limit(\uAE30\uBCF8 100, \uCD5C\uB300 500). \uBAA8\uB974\uB294 \uD0A4\uB294 \uD5C8\uC6A9\uD55C\uB2E4(\uC77D\uAE30 \uCABD \uAD00\uC6A9).", "x-producers": ["question-authoring", "synthetic-data", "model-lab", "release-gate", "ops-feedback"], "x-consumers": ["*"], "type": "object", "additionalProperties": true, "required": ["items", "next_cursor"], "properties": { "items": { "type": "array", "description": "\uC6D0\uC18C \uBAA8\uC591\uC740 \uD638\uCD9C\uBCC4 \uACC4\uC57D(\uAC1D\uCCB4 \uC2A4\uD0A4\uB9C8 \uB610\uB294 ID \uBB38\uC790\uC5F4)\uC774 \uC815\uD558\uACE0 \uD074\uB77C\uC774\uC5B8\uD2B8\uAC00 \uB530\uB85C \uAC80\uC99D\uD55C\uB2E4. 2.6.0(U45): \uAC1D\uCCB4\uB85C\uB9CC \uB450\uB358 \uAC83\uC744 \uD480\uC5C8\uB2E4(\uC9C8\uBB38 \uC138\uD2B8\xB7\uB370\uC774\uD130\uC14B\xB7\uC5B4\uB311\uD130 \uBAA9\uB85D\uC740 ID \uBB38\uC790\uC5F4\uC744 \uB0B8\uB2E4)" }, "next_cursor": { "type": ["string", "null"], "minLength": 1 } } };
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
    if (data.items !== void 0) {
      if (!Array.isArray(data.items)) {
        const err2 = { instancePath: instancePath + "/items", schemaPath: "#/properties/items/type", keyword: "type", params: { type: "array" }, message: "must be array" };
        if (vErrors === null) {
          vErrors = [err2];
        } else {
          vErrors.push(err2);
        }
        errors++;
      }
    }
    if (data.next_cursor !== void 0) {
      let data1 = data.next_cursor;
      if (typeof data1 !== "string" && data1 !== null) {
        const err3 = { instancePath: instancePath + "/next_cursor", schemaPath: "#/properties/next_cursor/type", keyword: "type", params: { type: schema49.properties.next_cursor.type }, message: "must be string,null" };
        if (vErrors === null) {
          vErrors = [err3];
        } else {
          vErrors.push(err3);
        }
        errors++;
      }
      if (typeof data1 === "string") {
        if (func1(data1) < 1) {
          const err4 = { instancePath: instancePath + "/next_cursor", schemaPath: "#/properties/next_cursor/minLength", keyword: "minLength", params: { limit: 1 }, message: "must NOT have fewer than 1 characters" };
          if (vErrors === null) {
            vErrors = [err4];
          } else {
            vErrors.push(err4);
          }
          errors++;
        }
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
  validate29.errors = vErrors;
  return errors === 0;
}
validate29.evaluated = { "props": true, "dynamicProps": false, "dynamicItems": false };
exports.OpsFeedbackReviewTrace = validate30;
var schema50 = { "$schema": "https://json-schema.org/draft/2020-12/schema", "$id": "OpsFeedbackReviewTrace.schema.json", "title": "OpsFeedbackReviewTrace", "description": "I7 `GET /v1/review-traces/{ref}`(reviewer \uC5ED\uD560 \uC804\uC6A9)\uAC00 \uB3CC\uB824\uC8FC\uB294 \uAC80\uD1A0\uC6A9 trace(3.2.0, L12, \uC0AC\uC6A9\uC790 \uACB0\uC815 2026-11-03). OpsFeedbackDeidentifiedTrace \uC640 \uAC19\uC740 \uBAA8\uC591\uC774\uB418 \uD658\uC790 \uBC1C\uD654 \uB450 \uCE78(frontend_message.utterance, extract_input.user_utterance)\uB9CC \uC6D0\uBB38 \uBB38\uC790\uC5F4(\uCD5C\uB300 1000\uC790, \uBB38\uC9C4 \uC2A4\uD0A4\uB9C8 UtteranceBody \uC0C1\uD55C)\uC744 \uD5C8\uC6A9\uD55C\uB2E4. \uC65C: \uBC1C\uD654 \uC5C6\uC774\uB294 \uAC80\uD1A0\uC790\uAC00 \uC2E4\uD328 \uC6D0\uC778\uC744 \uBCFC \uC218 \uC5C6\uB2E4. \uC870\uAC74: reviewer \uC5ED\uD560\uB9CC \uC77D\uACE0, \uC77D\uC744 \uB54C\uB9C8\uB2E4 \uC811\uADFC \uAE30\uB85D\uC744 \uB0A8\uAE30\uBA70(\uBCF4\uC874 365\uC77C, \uAC10\uC0AC \uAE30\uB85D), \uD655\uC815 \uC0AC\uB840\uC640 \uAC19\uC740 \uBCF4\uC874(180\uC77C), \uC678\uBD80 \uC804\uC1A1 \uC5C6\uC74C. \uAE30\uC874 get_trace \uB294 \uADF8\uB300\uB85C \uB9C8\uC2A4\uD0B9\uB41C \uBDF0\uB97C \uB0B8\uB2E4.", "x-producers": ["ops-feedback"], "x-consumers": ["admin-console"], "type": "object", "additionalProperties": false, "required": ["session_id", "turn_id", "contract_version", "frontend_message", "intervention_decision", "orchestrator_input", "extract_input", "extract_output", "extract_attempts", "extract_status", "extract_protections", "validation_ok", "validation_violations", "response_input", "response_output", "response_outcome", "response_protections", "frontend_input", "staff_console_input", "dispatch_input", "dispatch_output", "orchestrator_output", "session_before", "session_after", "log_entry", "persistence_load_request", "persistence_load_result", "persistence_commit_request", "persistence_commit_result"], "properties": { "session_id": { "$ref": "#/$defs/Pseudonym" }, "turn_id": { "$ref": "#/$defs/Pseudonym" }, "contract_version": { "type": "integer", "minimum": 1 }, "turn_index": { "type": "integer", "minimum": 0 }, "frontend_message": { "oneOf": [{ "type": "null" }, { "type": "object", "required": ["session_id", "kind"], "properties": { "session_id": { "$ref": "#/$defs/Pseudonym" }, "kind": { "enum": ["SESSION_START", "UTTERANCE", "SESSION_END"] }, "utterance": { "$ref": "#/$defs/UtteranceOrRedacted" } }, "additionalProperties": false }] }, "extract_input": { "oneOf": [{ "type": "null" }, { "type": "object", "required": ["question_id", "current_question", "user_utterance", "state"], "properties": { "question_id": { "$ref": "#/$defs/Ident" }, "current_question": { "$ref": "#/$defs/Redacted" }, "user_utterance": { "$ref": "#/$defs/UtteranceOrRedacted" }, "state": { "type": "object" } } }] }, "extract_output": { "oneOf": [{ "type": "null" }, { "type": "object", "properties": { "values": { "type": "array", "items": { "type": "object", "properties": { "key": { "$ref": "#/$defs/Redacted" }, "value": { "$ref": "#/$defs/Redacted" }, "precision": { "$ref": "#/$defs/Redacted" }, "status": { "$ref": "#/$defs/Redacted" }, "save": { "type": "boolean" } } } }, "action": { "type": "string", "pattern": "^[A-Z][A-Z0-9_]{0,31}$|^\\[MASKED\\]$" }, "next_item": { "oneOf": [{ "type": "null" }, { "$ref": "#/$defs/Ident" }] }, "reason": { "$ref": "#/$defs/Redacted" }, "note": { "$ref": "#/$defs/Redacted" }, "targets": { "type": "array" } } }] }, "extract_attempts": { "oneOf": [{ "type": "null" }, { "type": "integer", "minimum": 1, "maximum": 2 }] }, "extract_status": { "enum": ["OK", "OUTPUT_INVALID", "VIOLATION", "ERROR", null] }, "extract_protections": { "$ref": "#/$defs/CountMap" }, "validation_ok": { "type": ["boolean", "null"] }, "validation_violations": { "type": ["array", "null"] }, "response_input": { "oneOf": [{ "type": "null" }, { "type": "object", "required": ["action", "topic", "next"], "properties": { "action": { "type": "string" }, "topic": { "$ref": "#/$defs/Redacted" }, "next": { "type": "object" } } }] }, "response_output": { "oneOf": [{ "type": "null" }, { "$ref": "#/$defs/Redacted" }] }, "response_outcome": { "enum": ["ok", "fallback", "fixed", null] }, "response_protections": { "$ref": "#/$defs/CountMap" }, "intervention_decision": { "type": ["object", "null"] }, "orchestrator_input": { "type": ["object", "null"] }, "frontend_input": { "oneOf": [{ "type": "null" }, { "type": "object", "properties": { "turn_failure_signal": { "oneOf": [{ "type": "null" }, { "$ref": "#/$defs/TurnFailureSignal" }] } } }] }, "staff_console_input": { "type": ["object", "null"] }, "dispatch_input": { "type": ["object", "null"] }, "dispatch_output": { "type": ["object", "null"] }, "orchestrator_output": { "oneOf": [{ "type": "null" }, { "$ref": "#/$defs/OrchestratorOutputView" }] }, "session_before": { "type": ["object", "null"] }, "session_after": { "type": ["object", "null"] }, "log_entry": { "oneOf": [{ "type": "null" }, { "$ref": "#/$defs/LogEntryView" }] }, "persistence_load_request": { "type": ["object", "null"] }, "persistence_load_result": { "type": ["object", "null"] }, "persistence_commit_request": { "type": ["object", "null"] }, "persistence_commit_result": { "oneOf": [{ "type": "null" }, { "type": "object", "properties": { "session_id": { "$ref": "#/$defs/Pseudonym" }, "status": { "enum": ["OK", "REVISION_CONFLICT", "DB_ERROR"] }, "write_outcome": { "enum": ["APPLIED", "NOT_APPLIED", "UNKNOWN"] } } }] } }, "$defs": { "Pseudonym": { "type": "string", "pattern": "^p-[0-9a-f]{32}$", "description": "HMAC-SHA256(\uD0A4=salt, \uBA54\uC2DC\uC9C0=JCS({key,value}))\uC758 \uC55E 128\uBE44\uD2B8 16\uC9C4 32\uC790(ADR 0016). \uAC19\uC740 salt\xB7\uD0A4\xB7\uAC12\uC774\uBA74 \uAC19\uB2E4. salt\uB294 \uC774 \uC601\uC5ED\uB9CC \uC548\uB2E4. \uC18C\uBE44\uC790\uB294 \uC6D0 \uAC12\uC73C\uB85C \uB418\uB3CC\uB9B4 \uC218 \uC5C6\uACE0 \uB418\uB3CC\uB9AC\uB824 \uD574\uC11C\uB3C4 \uC548 \uB41C\uB2E4. salt\uB97C \uBC14\uAFB8\uBA74 \uAC12\uC774 \uBAA8\uB450 \uB2EC\uB77C\uC9C4\uB2E4(ADR 0017)." }, "Redacted": { "enum": ["[MASKED]", "[DROPPED]"], "description": "\uC790\uC720 \uBB38\uC790\uC5F4 \uC78E\uC758 \uBE44\uC2DD\uBCC4 \uACB0\uACFC. \uC815\uCC45 unlisted_string_action\uC774 mask\uBA74 [MASKED], drop\uC774\uBA74 \uD0A4\uB97C \uC9C0\uC6B0\uAC70\uB098 [DROPPED]. \uC81C\uC548: \uC18C\uBE44\uC790\uB294 \uC774 \uAC12\uC744 \uB0B4\uC6A9\uC73C\uB85C \uC4F0\uC9C0 \uC54A\uB294\uB2E4." }, "Ident": { "type": "string", "pattern": "^([A-Za-z0-9][A-Za-z0-9_.\\-]{0,63}|\\[MASKED\\])$", "description": "keep \uD0A4\uC758 \uC2DD\uBCC4\uC790 \uBAA8\uC591 \uAC12(\uBB38\uD56D ID \uB4F1). \uD328\uD134\uC5D0 \uB9DE\uC9C0 \uC54A\uC73C\uBA74 \uB9C8\uC2A4\uD0B9\uB41C\uB2E4." }, "CountMap": { "oneOf": [{ "type": "null" }, { "type": "object", "propertyNames": { "pattern": "^[A-Z][A-Z0-9_]{0,31}$" }, "additionalProperties": { "type": "integer", "minimum": 0 } }], "description": "\uADDC\uCE59 \uCF54\uB4DC -> \uAC74\uC218. \uC815\uCC45\uC774 keep_count_map_keys\uB85C \uD5C8\uC6A9\uD558\uC9C0 \uC54A\uC73C\uBA74 {} \uB610\uB294 \uC81C\uAC70" }, "TurnFailureSignal": { "type": "object", "description": "\uC815\uC9C0\xB7\uC54C\uB9BC \uC2E0\uD638. pause_reason\uC740 \uACC4\uC57D 2.1.0 \uC774\uD6C4 optional(\uC5C6\uC73C\uBA74 \uBBF8\uC0C1, \uBAA8\uB974\uB294 \uAC12\uC740 \uC77D\uB294 \uCABD\uC774 OTHER\uB85C \uCDE8\uAE09). \uBE44\uC2DD\uBCC4 \uC815\uCC45 keep_pause_reason\uC774 \uAEBC\uC838 \uC788\uC73C\uBA74 \uC5C6\uB2E4.", "properties": { "session_id": { "$ref": "#/$defs/Pseudonym" }, "write_committed": { "enum": ["COMMITTED", "NOT_COMMITTED"] }, "staff_alert": { "enum": ["NONE", "DELIVERED", "DELIVERY_FAILED"] }, "pause_reason": { "enum": ["RISK", "REASK_LIMIT", "OTHER"] } } }, "LogEntryView": { "type": "object", "description": "log_entry\uC758 \uC77C\uBD80. \uB098\uBA38\uC9C0 \uD0A4\uB294 \uAC80\uC0AC\uD558\uC9C0 \uC54A\uB294\uB2E4.", "properties": { "turn_result": { "oneOf": [{ "const": "COMMITTED" }, { "const": "NOT_APPLICABLE" }, { "type": "object", "required": ["failed_steps"], "properties": { "failed_steps": { "type": "array", "minItems": 1, "items": { "type": "object", "required": ["phase", "step"], "properties": { "phase": { "enum": ["BEFORE_COMMIT", "AFTER_COMMIT"] }, "step": { "enum": ["LoRA-A", "VALIDATE", "COMMIT", "DELIVER_STAFF", "LoRA-B", "DELIVER_FRONT"] } } } } } }] }, "staff_alert_delivery": { "enum": ["SUCCESS", "FAILURE", "NOT_APPLICABLE"] }, "turn_failure_signal": { "oneOf": [{ "type": "null" }, { "$ref": "#/$defs/TurnFailureSignal" }] } } }, "OrchestratorOutputView": { "type": "object", "description": "orchestrator_output\uC758 \uC77C\uBD80. \uB098\uBA38\uC9C0 \uD0A4\uB294 \uAC80\uC0AC\uD558\uC9C0 \uC54A\uB294\uB2E4.", "properties": { "turn_failure_signal": { "oneOf": [{ "type": "null" }, { "$ref": "#/$defs/TurnFailureSignal" }] }, "intervention_result": { "oneOf": [{ "type": "null" }, { "type": "object", "properties": { "session_id": { "$ref": "#/$defs/Pseudonym" }, "result": { "enum": ["APPLIED", "IGNORED", "FAILED"] } } }] }, "log_entry": { "oneOf": [{ "type": "null" }, { "$ref": "#/$defs/LogEntryView" }] } } }, "UtteranceOrRedacted": { "oneOf": [{ "$ref": "#/$defs/Redacted" }, { "type": "string", "minLength": 1, "maxLength": 1e3 }], "description": "\uAC80\uD1A0 \uC0AC\uBCF8\uC5D0\uC11C\uB294 \uC6D0\uBB38, \uC815\uCC45\uC774 \uB044\uBA74 \uB9C8\uC2A4\uD0B9 \uD1A0\uD070" } } };
var schema55 = { "enum": ["[MASKED]", "[DROPPED]"], "description": "\uC790\uC720 \uBB38\uC790\uC5F4 \uC78E\uC758 \uBE44\uC2DD\uBCC4 \uACB0\uACFC. \uC815\uCC45 unlisted_string_action\uC774 mask\uBA74 [MASKED], drop\uC774\uBA74 \uD0A4\uB97C \uC9C0\uC6B0\uAC70\uB098 [DROPPED]. \uC81C\uC548: \uC18C\uBE44\uC790\uB294 \uC774 \uAC12\uC744 \uB0B4\uC6A9\uC73C\uB85C \uC4F0\uC9C0 \uC54A\uB294\uB2E4." };
var pattern19 = new RegExp("^p-[0-9a-f]{32}$", "u");
var pattern22 = new RegExp("^([A-Za-z0-9][A-Za-z0-9_.\\-]{0,63}|\\[MASKED\\])$", "u");
var pattern23 = new RegExp("^[A-Z][A-Z0-9_]{0,31}$|^\\[MASKED\\]$", "u");
var pattern25 = new RegExp("^[A-Z][A-Z0-9_]{0,31}$", "u");
function validate31(data, { instancePath = "", parentData, parentDataProperty, rootData = data, dynamicAnchors = {} } = {}) {
  let vErrors = null;
  let errors = 0;
  const evaluated0 = validate31.evaluated;
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
  if (!(data === "[MASKED]" || data === "[DROPPED]")) {
    const err0 = { instancePath, schemaPath: "#/$defs/Redacted/enum", keyword: "enum", params: { allowedValues: schema55.enum }, message: "must be equal to one of the allowed values" };
    if (vErrors === null) {
      vErrors = [err0];
    } else {
      vErrors.push(err0);
    }
    errors++;
  }
  var _valid0 = _errs1 === errors;
  if (_valid0) {
    valid0 = true;
    passing0 = 0;
  }
  const _errs3 = errors;
  if (typeof data === "string") {
    if (func1(data) > 1e3) {
      const err1 = { instancePath, schemaPath: "#/oneOf/1/maxLength", keyword: "maxLength", params: { limit: 1e3 }, message: "must NOT have more than 1000 characters" };
      if (vErrors === null) {
        vErrors = [err1];
      } else {
        vErrors.push(err1);
      }
      errors++;
    }
    if (func1(data) < 1) {
      const err2 = { instancePath, schemaPath: "#/oneOf/1/minLength", keyword: "minLength", params: { limit: 1 }, message: "must NOT have fewer than 1 characters" };
      if (vErrors === null) {
        vErrors = [err2];
      } else {
        vErrors.push(err2);
      }
      errors++;
    }
  } else {
    const err3 = { instancePath, schemaPath: "#/oneOf/1/type", keyword: "type", params: { type: "string" }, message: "must be string" };
    if (vErrors === null) {
      vErrors = [err3];
    } else {
      vErrors.push(err3);
    }
    errors++;
  }
  var _valid0 = _errs3 === errors;
  if (_valid0 && valid0) {
    valid0 = false;
    passing0 = [passing0, 1];
  } else {
    if (_valid0) {
      valid0 = true;
      passing0 = 1;
    }
  }
  if (!valid0) {
    const err4 = { instancePath, schemaPath: "#/oneOf", keyword: "oneOf", params: { passingSchemas: passing0 }, message: "must match exactly one schema in oneOf" };
    if (vErrors === null) {
      vErrors = [err4];
    } else {
      vErrors.push(err4);
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
  validate31.errors = vErrors;
  return errors === 0;
}
validate31.evaluated = { "dynamicProps": false, "dynamicItems": false };
var schema69 = { "type": "object", "description": "\uC815\uC9C0\xB7\uC54C\uB9BC \uC2E0\uD638. pause_reason\uC740 \uACC4\uC57D 2.1.0 \uC774\uD6C4 optional(\uC5C6\uC73C\uBA74 \uBBF8\uC0C1, \uBAA8\uB974\uB294 \uAC12\uC740 \uC77D\uB294 \uCABD\uC774 OTHER\uB85C \uCDE8\uAE09). \uBE44\uC2DD\uBCC4 \uC815\uCC45 keep_pause_reason\uC774 \uAEBC\uC838 \uC788\uC73C\uBA74 \uC5C6\uB2E4.", "properties": { "session_id": { "$ref": "#/$defs/Pseudonym" }, "write_committed": { "enum": ["COMMITTED", "NOT_COMMITTED"] }, "staff_alert": { "enum": ["NONE", "DELIVERED", "DELIVERY_FAILED"] }, "pause_reason": { "enum": ["RISK", "REASK_LIMIT", "OTHER"] } } };
function validate34(data, { instancePath = "", parentData, parentDataProperty, rootData = data, dynamicAnchors = {} } = {}) {
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
    if (data.session_id !== void 0) {
      let data0 = data.session_id;
      if (typeof data0 === "string") {
        if (!pattern19.test(data0)) {
          const err0 = { instancePath: instancePath + "/session_id", schemaPath: "#/$defs/Pseudonym/pattern", keyword: "pattern", params: { pattern: "^p-[0-9a-f]{32}$" }, message: 'must match pattern "^p-[0-9a-f]{32}$"' };
          if (vErrors === null) {
            vErrors = [err0];
          } else {
            vErrors.push(err0);
          }
          errors++;
        }
      } else {
        const err1 = { instancePath: instancePath + "/session_id", schemaPath: "#/$defs/Pseudonym/type", keyword: "type", params: { type: "string" }, message: "must be string" };
        if (vErrors === null) {
          vErrors = [err1];
        } else {
          vErrors.push(err1);
        }
        errors++;
      }
    }
    if (data.write_committed !== void 0) {
      let data1 = data.write_committed;
      if (!(data1 === "COMMITTED" || data1 === "NOT_COMMITTED")) {
        const err2 = { instancePath: instancePath + "/write_committed", schemaPath: "#/properties/write_committed/enum", keyword: "enum", params: { allowedValues: schema69.properties.write_committed.enum }, message: "must be equal to one of the allowed values" };
        if (vErrors === null) {
          vErrors = [err2];
        } else {
          vErrors.push(err2);
        }
        errors++;
      }
    }
    if (data.staff_alert !== void 0) {
      let data2 = data.staff_alert;
      if (!(data2 === "NONE" || data2 === "DELIVERED" || data2 === "DELIVERY_FAILED")) {
        const err3 = { instancePath: instancePath + "/staff_alert", schemaPath: "#/properties/staff_alert/enum", keyword: "enum", params: { allowedValues: schema69.properties.staff_alert.enum }, message: "must be equal to one of the allowed values" };
        if (vErrors === null) {
          vErrors = [err3];
        } else {
          vErrors.push(err3);
        }
        errors++;
      }
    }
    if (data.pause_reason !== void 0) {
      let data3 = data.pause_reason;
      if (!(data3 === "RISK" || data3 === "REASK_LIMIT" || data3 === "OTHER")) {
        const err4 = { instancePath: instancePath + "/pause_reason", schemaPath: "#/properties/pause_reason/enum", keyword: "enum", params: { allowedValues: schema69.properties.pause_reason.enum }, message: "must be equal to one of the allowed values" };
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
  validate34.errors = vErrors;
  return errors === 0;
}
validate34.evaluated = { "props": { "session_id": true, "write_committed": true, "staff_alert": true, "pause_reason": true }, "dynamicProps": false, "dynamicItems": false };
var schema71 = { "type": "object", "description": "orchestrator_output\uC758 \uC77C\uBD80. \uB098\uBA38\uC9C0 \uD0A4\uB294 \uAC80\uC0AC\uD558\uC9C0 \uC54A\uB294\uB2E4.", "properties": { "turn_failure_signal": { "oneOf": [{ "type": "null" }, { "$ref": "#/$defs/TurnFailureSignal" }] }, "intervention_result": { "oneOf": [{ "type": "null" }, { "type": "object", "properties": { "session_id": { "$ref": "#/$defs/Pseudonym" }, "result": { "enum": ["APPLIED", "IGNORED", "FAILED"] } } }] }, "log_entry": { "oneOf": [{ "type": "null" }, { "$ref": "#/$defs/LogEntryView" }] } } };
var schema73 = { "type": "object", "description": "log_entry\uC758 \uC77C\uBD80. \uB098\uBA38\uC9C0 \uD0A4\uB294 \uAC80\uC0AC\uD558\uC9C0 \uC54A\uB294\uB2E4.", "properties": { "turn_result": { "oneOf": [{ "const": "COMMITTED" }, { "const": "NOT_APPLICABLE" }, { "type": "object", "required": ["failed_steps"], "properties": { "failed_steps": { "type": "array", "minItems": 1, "items": { "type": "object", "required": ["phase", "step"], "properties": { "phase": { "enum": ["BEFORE_COMMIT", "AFTER_COMMIT"] }, "step": { "enum": ["LoRA-A", "VALIDATE", "COMMIT", "DELIVER_STAFF", "LoRA-B", "DELIVER_FRONT"] } } } } } }] }, "staff_alert_delivery": { "enum": ["SUCCESS", "FAILURE", "NOT_APPLICABLE"] }, "turn_failure_signal": { "oneOf": [{ "type": "null" }, { "$ref": "#/$defs/TurnFailureSignal" }] } } };
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
    if (data.turn_result !== void 0) {
      let data0 = data.turn_result;
      const _errs2 = errors;
      let valid1 = false;
      let passing0 = null;
      const _errs3 = errors;
      if ("COMMITTED" !== data0) {
        const err0 = { instancePath: instancePath + "/turn_result", schemaPath: "#/properties/turn_result/oneOf/0/const", keyword: "const", params: { allowedValue: "COMMITTED" }, message: "must be equal to constant" };
        if (vErrors === null) {
          vErrors = [err0];
        } else {
          vErrors.push(err0);
        }
        errors++;
      }
      var _valid0 = _errs3 === errors;
      if (_valid0) {
        valid1 = true;
        passing0 = 0;
      }
      const _errs4 = errors;
      if ("NOT_APPLICABLE" !== data0) {
        const err1 = { instancePath: instancePath + "/turn_result", schemaPath: "#/properties/turn_result/oneOf/1/const", keyword: "const", params: { allowedValue: "NOT_APPLICABLE" }, message: "must be equal to constant" };
        if (vErrors === null) {
          vErrors = [err1];
        } else {
          vErrors.push(err1);
        }
        errors++;
      }
      var _valid0 = _errs4 === errors;
      if (_valid0 && valid1) {
        valid1 = false;
        passing0 = [passing0, 1];
      } else {
        if (_valid0) {
          valid1 = true;
          passing0 = 1;
        }
        const _errs5 = errors;
        if (data0 && typeof data0 == "object" && !Array.isArray(data0)) {
          if (data0.failed_steps === void 0) {
            const err2 = { instancePath: instancePath + "/turn_result", schemaPath: "#/properties/turn_result/oneOf/2/required", keyword: "required", params: { missingProperty: "failed_steps" }, message: "must have required property 'failed_steps'" };
            if (vErrors === null) {
              vErrors = [err2];
            } else {
              vErrors.push(err2);
            }
            errors++;
          }
          if (data0.failed_steps !== void 0) {
            let data1 = data0.failed_steps;
            if (Array.isArray(data1)) {
              if (data1.length < 1) {
                const err3 = { instancePath: instancePath + "/turn_result/failed_steps", schemaPath: "#/properties/turn_result/oneOf/2/properties/failed_steps/minItems", keyword: "minItems", params: { limit: 1 }, message: "must NOT have fewer than 1 items" };
                if (vErrors === null) {
                  vErrors = [err3];
                } else {
                  vErrors.push(err3);
                }
                errors++;
              }
              const len0 = data1.length;
              for (let i0 = 0; i0 < len0; i0++) {
                let data2 = data1[i0];
                if (data2 && typeof data2 == "object" && !Array.isArray(data2)) {
                  if (data2.phase === void 0) {
                    const err4 = { instancePath: instancePath + "/turn_result/failed_steps/" + i0, schemaPath: "#/properties/turn_result/oneOf/2/properties/failed_steps/items/required", keyword: "required", params: { missingProperty: "phase" }, message: "must have required property 'phase'" };
                    if (vErrors === null) {
                      vErrors = [err4];
                    } else {
                      vErrors.push(err4);
                    }
                    errors++;
                  }
                  if (data2.step === void 0) {
                    const err5 = { instancePath: instancePath + "/turn_result/failed_steps/" + i0, schemaPath: "#/properties/turn_result/oneOf/2/properties/failed_steps/items/required", keyword: "required", params: { missingProperty: "step" }, message: "must have required property 'step'" };
                    if (vErrors === null) {
                      vErrors = [err5];
                    } else {
                      vErrors.push(err5);
                    }
                    errors++;
                  }
                  if (data2.phase !== void 0) {
                    let data3 = data2.phase;
                    if (!(data3 === "BEFORE_COMMIT" || data3 === "AFTER_COMMIT")) {
                      const err6 = { instancePath: instancePath + "/turn_result/failed_steps/" + i0 + "/phase", schemaPath: "#/properties/turn_result/oneOf/2/properties/failed_steps/items/properties/phase/enum", keyword: "enum", params: { allowedValues: schema73.properties.turn_result.oneOf[2].properties.failed_steps.items.properties.phase.enum }, message: "must be equal to one of the allowed values" };
                      if (vErrors === null) {
                        vErrors = [err6];
                      } else {
                        vErrors.push(err6);
                      }
                      errors++;
                    }
                  }
                  if (data2.step !== void 0) {
                    let data4 = data2.step;
                    if (!(data4 === "LoRA-A" || data4 === "VALIDATE" || data4 === "COMMIT" || data4 === "DELIVER_STAFF" || data4 === "LoRA-B" || data4 === "DELIVER_FRONT")) {
                      const err7 = { instancePath: instancePath + "/turn_result/failed_steps/" + i0 + "/step", schemaPath: "#/properties/turn_result/oneOf/2/properties/failed_steps/items/properties/step/enum", keyword: "enum", params: { allowedValues: schema73.properties.turn_result.oneOf[2].properties.failed_steps.items.properties.step.enum }, message: "must be equal to one of the allowed values" };
                      if (vErrors === null) {
                        vErrors = [err7];
                      } else {
                        vErrors.push(err7);
                      }
                      errors++;
                    }
                  }
                } else {
                  const err8 = { instancePath: instancePath + "/turn_result/failed_steps/" + i0, schemaPath: "#/properties/turn_result/oneOf/2/properties/failed_steps/items/type", keyword: "type", params: { type: "object" }, message: "must be object" };
                  if (vErrors === null) {
                    vErrors = [err8];
                  } else {
                    vErrors.push(err8);
                  }
                  errors++;
                }
              }
            } else {
              const err9 = { instancePath: instancePath + "/turn_result/failed_steps", schemaPath: "#/properties/turn_result/oneOf/2/properties/failed_steps/type", keyword: "type", params: { type: "array" }, message: "must be array" };
              if (vErrors === null) {
                vErrors = [err9];
              } else {
                vErrors.push(err9);
              }
              errors++;
            }
          }
        } else {
          const err10 = { instancePath: instancePath + "/turn_result", schemaPath: "#/properties/turn_result/oneOf/2/type", keyword: "type", params: { type: "object" }, message: "must be object" };
          if (vErrors === null) {
            vErrors = [err10];
          } else {
            vErrors.push(err10);
          }
          errors++;
        }
        var _valid0 = _errs5 === errors;
        if (_valid0 && valid1) {
          valid1 = false;
          passing0 = [passing0, 2];
        } else {
          if (_valid0) {
            valid1 = true;
            passing0 = 2;
            var props0 = {};
            props0.failed_steps = true;
          }
        }
      }
      if (!valid1) {
        const err11 = { instancePath: instancePath + "/turn_result", schemaPath: "#/properties/turn_result/oneOf", keyword: "oneOf", params: { passingSchemas: passing0 }, message: "must match exactly one schema in oneOf" };
        if (vErrors === null) {
          vErrors = [err11];
        } else {
          vErrors.push(err11);
        }
        errors++;
      } else {
        errors = _errs2;
        if (vErrors !== null) {
          if (_errs2) {
            vErrors.length = _errs2;
          } else {
            vErrors = null;
          }
        }
      }
    }
    if (data.staff_alert_delivery !== void 0) {
      let data5 = data.staff_alert_delivery;
      if (!(data5 === "SUCCESS" || data5 === "FAILURE" || data5 === "NOT_APPLICABLE")) {
        const err12 = { instancePath: instancePath + "/staff_alert_delivery", schemaPath: "#/properties/staff_alert_delivery/enum", keyword: "enum", params: { allowedValues: schema73.properties.staff_alert_delivery.enum }, message: "must be equal to one of the allowed values" };
        if (vErrors === null) {
          vErrors = [err12];
        } else {
          vErrors.push(err12);
        }
        errors++;
      }
    }
    if (data.turn_failure_signal !== void 0) {
      let data6 = data.turn_failure_signal;
      const _errs15 = errors;
      let valid6 = false;
      let passing1 = null;
      const _errs16 = errors;
      if (data6 !== null) {
        const err13 = { instancePath: instancePath + "/turn_failure_signal", schemaPath: "#/properties/turn_failure_signal/oneOf/0/type", keyword: "type", params: { type: "null" }, message: "must be null" };
        if (vErrors === null) {
          vErrors = [err13];
        } else {
          vErrors.push(err13);
        }
        errors++;
      }
      var _valid1 = _errs16 === errors;
      if (_valid1) {
        valid6 = true;
        passing1 = 0;
      }
      const _errs18 = errors;
      if (!validate34(data6, { instancePath: instancePath + "/turn_failure_signal", parentData: data, parentDataProperty: "turn_failure_signal", rootData, dynamicAnchors })) {
        vErrors = vErrors === null ? validate34.errors : vErrors.concat(validate34.errors);
        errors = vErrors.length;
      }
      var _valid1 = _errs18 === errors;
      if (_valid1 && valid6) {
        valid6 = false;
        passing1 = [passing1, 1];
      } else {
        if (_valid1) {
          valid6 = true;
          passing1 = 1;
          var props1 = {};
          props1.session_id = true;
          props1.write_committed = true;
          props1.staff_alert = true;
          props1.pause_reason = true;
        }
      }
      if (!valid6) {
        const err14 = { instancePath: instancePath + "/turn_failure_signal", schemaPath: "#/properties/turn_failure_signal/oneOf", keyword: "oneOf", params: { passingSchemas: passing1 }, message: "must match exactly one schema in oneOf" };
        if (vErrors === null) {
          vErrors = [err14];
        } else {
          vErrors.push(err14);
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
  validate38.errors = vErrors;
  return errors === 0;
}
validate38.evaluated = { "props": { "turn_result": true, "staff_alert_delivery": true, "turn_failure_signal": true }, "dynamicProps": false, "dynamicItems": false };
function validate36(data, { instancePath = "", parentData, parentDataProperty, rootData = data, dynamicAnchors = {} } = {}) {
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
    if (data.turn_failure_signal !== void 0) {
      let data0 = data.turn_failure_signal;
      const _errs2 = errors;
      let valid1 = false;
      let passing0 = null;
      const _errs3 = errors;
      if (data0 !== null) {
        const err0 = { instancePath: instancePath + "/turn_failure_signal", schemaPath: "#/properties/turn_failure_signal/oneOf/0/type", keyword: "type", params: { type: "null" }, message: "must be null" };
        if (vErrors === null) {
          vErrors = [err0];
        } else {
          vErrors.push(err0);
        }
        errors++;
      }
      var _valid0 = _errs3 === errors;
      if (_valid0) {
        valid1 = true;
        passing0 = 0;
      }
      const _errs5 = errors;
      if (!validate34(data0, { instancePath: instancePath + "/turn_failure_signal", parentData: data, parentDataProperty: "turn_failure_signal", rootData, dynamicAnchors })) {
        vErrors = vErrors === null ? validate34.errors : vErrors.concat(validate34.errors);
        errors = vErrors.length;
      }
      var _valid0 = _errs5 === errors;
      if (_valid0 && valid1) {
        valid1 = false;
        passing0 = [passing0, 1];
      } else {
        if (_valid0) {
          valid1 = true;
          passing0 = 1;
          var props0 = {};
          props0.session_id = true;
          props0.write_committed = true;
          props0.staff_alert = true;
          props0.pause_reason = true;
        }
      }
      if (!valid1) {
        const err1 = { instancePath: instancePath + "/turn_failure_signal", schemaPath: "#/properties/turn_failure_signal/oneOf", keyword: "oneOf", params: { passingSchemas: passing0 }, message: "must match exactly one schema in oneOf" };
        if (vErrors === null) {
          vErrors = [err1];
        } else {
          vErrors.push(err1);
        }
        errors++;
      } else {
        errors = _errs2;
        if (vErrors !== null) {
          if (_errs2) {
            vErrors.length = _errs2;
          } else {
            vErrors = null;
          }
        }
      }
    }
    if (data.intervention_result !== void 0) {
      let data1 = data.intervention_result;
      const _errs7 = errors;
      let valid2 = false;
      let passing1 = null;
      const _errs8 = errors;
      if (data1 !== null) {
        const err2 = { instancePath: instancePath + "/intervention_result", schemaPath: "#/properties/intervention_result/oneOf/0/type", keyword: "type", params: { type: "null" }, message: "must be null" };
        if (vErrors === null) {
          vErrors = [err2];
        } else {
          vErrors.push(err2);
        }
        errors++;
      }
      var _valid1 = _errs8 === errors;
      if (_valid1) {
        valid2 = true;
        passing1 = 0;
      }
      const _errs10 = errors;
      if (data1 && typeof data1 == "object" && !Array.isArray(data1)) {
        if (data1.session_id !== void 0) {
          let data2 = data1.session_id;
          if (typeof data2 === "string") {
            if (!pattern19.test(data2)) {
              const err3 = { instancePath: instancePath + "/intervention_result/session_id", schemaPath: "#/$defs/Pseudonym/pattern", keyword: "pattern", params: { pattern: "^p-[0-9a-f]{32}$" }, message: 'must match pattern "^p-[0-9a-f]{32}$"' };
              if (vErrors === null) {
                vErrors = [err3];
              } else {
                vErrors.push(err3);
              }
              errors++;
            }
          } else {
            const err4 = { instancePath: instancePath + "/intervention_result/session_id", schemaPath: "#/$defs/Pseudonym/type", keyword: "type", params: { type: "string" }, message: "must be string" };
            if (vErrors === null) {
              vErrors = [err4];
            } else {
              vErrors.push(err4);
            }
            errors++;
          }
        }
        if (data1.result !== void 0) {
          let data3 = data1.result;
          if (!(data3 === "APPLIED" || data3 === "IGNORED" || data3 === "FAILED")) {
            const err5 = { instancePath: instancePath + "/intervention_result/result", schemaPath: "#/properties/intervention_result/oneOf/1/properties/result/enum", keyword: "enum", params: { allowedValues: schema71.properties.intervention_result.oneOf[1].properties.result.enum }, message: "must be equal to one of the allowed values" };
            if (vErrors === null) {
              vErrors = [err5];
            } else {
              vErrors.push(err5);
            }
            errors++;
          }
        }
      } else {
        const err6 = { instancePath: instancePath + "/intervention_result", schemaPath: "#/properties/intervention_result/oneOf/1/type", keyword: "type", params: { type: "object" }, message: "must be object" };
        if (vErrors === null) {
          vErrors = [err6];
        } else {
          vErrors.push(err6);
        }
        errors++;
      }
      var _valid1 = _errs10 === errors;
      if (_valid1 && valid2) {
        valid2 = false;
        passing1 = [passing1, 1];
      } else {
        if (_valid1) {
          valid2 = true;
          passing1 = 1;
          var props1 = {};
          props1.session_id = true;
          props1.result = true;
        }
      }
      if (!valid2) {
        const err7 = { instancePath: instancePath + "/intervention_result", schemaPath: "#/properties/intervention_result/oneOf", keyword: "oneOf", params: { passingSchemas: passing1 }, message: "must match exactly one schema in oneOf" };
        if (vErrors === null) {
          vErrors = [err7];
        } else {
          vErrors.push(err7);
        }
        errors++;
      } else {
        errors = _errs7;
        if (vErrors !== null) {
          if (_errs7) {
            vErrors.length = _errs7;
          } else {
            vErrors = null;
          }
        }
      }
    }
    if (data.log_entry !== void 0) {
      let data4 = data.log_entry;
      const _errs17 = errors;
      let valid5 = false;
      let passing2 = null;
      const _errs18 = errors;
      if (data4 !== null) {
        const err8 = { instancePath: instancePath + "/log_entry", schemaPath: "#/properties/log_entry/oneOf/0/type", keyword: "type", params: { type: "null" }, message: "must be null" };
        if (vErrors === null) {
          vErrors = [err8];
        } else {
          vErrors.push(err8);
        }
        errors++;
      }
      var _valid2 = _errs18 === errors;
      if (_valid2) {
        valid5 = true;
        passing2 = 0;
      }
      const _errs20 = errors;
      if (!validate38(data4, { instancePath: instancePath + "/log_entry", parentData: data, parentDataProperty: "log_entry", rootData, dynamicAnchors })) {
        vErrors = vErrors === null ? validate38.errors : vErrors.concat(validate38.errors);
        errors = vErrors.length;
      }
      var _valid2 = _errs20 === errors;
      if (_valid2 && valid5) {
        valid5 = false;
        passing2 = [passing2, 1];
      } else {
        if (_valid2) {
          valid5 = true;
          passing2 = 1;
          var props2 = {};
          props2.turn_result = true;
          props2.staff_alert_delivery = true;
          props2.turn_failure_signal = true;
        }
      }
      if (!valid5) {
        const err9 = { instancePath: instancePath + "/log_entry", schemaPath: "#/properties/log_entry/oneOf", keyword: "oneOf", params: { passingSchemas: passing2 }, message: "must match exactly one schema in oneOf" };
        if (vErrors === null) {
          vErrors = [err9];
        } else {
          vErrors.push(err9);
        }
        errors++;
      } else {
        errors = _errs17;
        if (vErrors !== null) {
          if (_errs17) {
            vErrors.length = _errs17;
          } else {
            vErrors = null;
          }
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
  validate36.errors = vErrors;
  return errors === 0;
}
validate36.evaluated = { "props": { "turn_failure_signal": true, "intervention_result": true, "log_entry": true }, "dynamicProps": false, "dynamicItems": false };
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
    if (data.turn_id === void 0) {
      const err1 = { instancePath, schemaPath: "#/required", keyword: "required", params: { missingProperty: "turn_id" }, message: "must have required property 'turn_id'" };
      if (vErrors === null) {
        vErrors = [err1];
      } else {
        vErrors.push(err1);
      }
      errors++;
    }
    if (data.contract_version === void 0) {
      const err2 = { instancePath, schemaPath: "#/required", keyword: "required", params: { missingProperty: "contract_version" }, message: "must have required property 'contract_version'" };
      if (vErrors === null) {
        vErrors = [err2];
      } else {
        vErrors.push(err2);
      }
      errors++;
    }
    if (data.frontend_message === void 0) {
      const err3 = { instancePath, schemaPath: "#/required", keyword: "required", params: { missingProperty: "frontend_message" }, message: "must have required property 'frontend_message'" };
      if (vErrors === null) {
        vErrors = [err3];
      } else {
        vErrors.push(err3);
      }
      errors++;
    }
    if (data.intervention_decision === void 0) {
      const err4 = { instancePath, schemaPath: "#/required", keyword: "required", params: { missingProperty: "intervention_decision" }, message: "must have required property 'intervention_decision'" };
      if (vErrors === null) {
        vErrors = [err4];
      } else {
        vErrors.push(err4);
      }
      errors++;
    }
    if (data.orchestrator_input === void 0) {
      const err5 = { instancePath, schemaPath: "#/required", keyword: "required", params: { missingProperty: "orchestrator_input" }, message: "must have required property 'orchestrator_input'" };
      if (vErrors === null) {
        vErrors = [err5];
      } else {
        vErrors.push(err5);
      }
      errors++;
    }
    if (data.extract_input === void 0) {
      const err6 = { instancePath, schemaPath: "#/required", keyword: "required", params: { missingProperty: "extract_input" }, message: "must have required property 'extract_input'" };
      if (vErrors === null) {
        vErrors = [err6];
      } else {
        vErrors.push(err6);
      }
      errors++;
    }
    if (data.extract_output === void 0) {
      const err7 = { instancePath, schemaPath: "#/required", keyword: "required", params: { missingProperty: "extract_output" }, message: "must have required property 'extract_output'" };
      if (vErrors === null) {
        vErrors = [err7];
      } else {
        vErrors.push(err7);
      }
      errors++;
    }
    if (data.extract_attempts === void 0) {
      const err8 = { instancePath, schemaPath: "#/required", keyword: "required", params: { missingProperty: "extract_attempts" }, message: "must have required property 'extract_attempts'" };
      if (vErrors === null) {
        vErrors = [err8];
      } else {
        vErrors.push(err8);
      }
      errors++;
    }
    if (data.extract_status === void 0) {
      const err9 = { instancePath, schemaPath: "#/required", keyword: "required", params: { missingProperty: "extract_status" }, message: "must have required property 'extract_status'" };
      if (vErrors === null) {
        vErrors = [err9];
      } else {
        vErrors.push(err9);
      }
      errors++;
    }
    if (data.extract_protections === void 0) {
      const err10 = { instancePath, schemaPath: "#/required", keyword: "required", params: { missingProperty: "extract_protections" }, message: "must have required property 'extract_protections'" };
      if (vErrors === null) {
        vErrors = [err10];
      } else {
        vErrors.push(err10);
      }
      errors++;
    }
    if (data.validation_ok === void 0) {
      const err11 = { instancePath, schemaPath: "#/required", keyword: "required", params: { missingProperty: "validation_ok" }, message: "must have required property 'validation_ok'" };
      if (vErrors === null) {
        vErrors = [err11];
      } else {
        vErrors.push(err11);
      }
      errors++;
    }
    if (data.validation_violations === void 0) {
      const err12 = { instancePath, schemaPath: "#/required", keyword: "required", params: { missingProperty: "validation_violations" }, message: "must have required property 'validation_violations'" };
      if (vErrors === null) {
        vErrors = [err12];
      } else {
        vErrors.push(err12);
      }
      errors++;
    }
    if (data.response_input === void 0) {
      const err13 = { instancePath, schemaPath: "#/required", keyword: "required", params: { missingProperty: "response_input" }, message: "must have required property 'response_input'" };
      if (vErrors === null) {
        vErrors = [err13];
      } else {
        vErrors.push(err13);
      }
      errors++;
    }
    if (data.response_output === void 0) {
      const err14 = { instancePath, schemaPath: "#/required", keyword: "required", params: { missingProperty: "response_output" }, message: "must have required property 'response_output'" };
      if (vErrors === null) {
        vErrors = [err14];
      } else {
        vErrors.push(err14);
      }
      errors++;
    }
    if (data.response_outcome === void 0) {
      const err15 = { instancePath, schemaPath: "#/required", keyword: "required", params: { missingProperty: "response_outcome" }, message: "must have required property 'response_outcome'" };
      if (vErrors === null) {
        vErrors = [err15];
      } else {
        vErrors.push(err15);
      }
      errors++;
    }
    if (data.response_protections === void 0) {
      const err16 = { instancePath, schemaPath: "#/required", keyword: "required", params: { missingProperty: "response_protections" }, message: "must have required property 'response_protections'" };
      if (vErrors === null) {
        vErrors = [err16];
      } else {
        vErrors.push(err16);
      }
      errors++;
    }
    if (data.frontend_input === void 0) {
      const err17 = { instancePath, schemaPath: "#/required", keyword: "required", params: { missingProperty: "frontend_input" }, message: "must have required property 'frontend_input'" };
      if (vErrors === null) {
        vErrors = [err17];
      } else {
        vErrors.push(err17);
      }
      errors++;
    }
    if (data.staff_console_input === void 0) {
      const err18 = { instancePath, schemaPath: "#/required", keyword: "required", params: { missingProperty: "staff_console_input" }, message: "must have required property 'staff_console_input'" };
      if (vErrors === null) {
        vErrors = [err18];
      } else {
        vErrors.push(err18);
      }
      errors++;
    }
    if (data.dispatch_input === void 0) {
      const err19 = { instancePath, schemaPath: "#/required", keyword: "required", params: { missingProperty: "dispatch_input" }, message: "must have required property 'dispatch_input'" };
      if (vErrors === null) {
        vErrors = [err19];
      } else {
        vErrors.push(err19);
      }
      errors++;
    }
    if (data.dispatch_output === void 0) {
      const err20 = { instancePath, schemaPath: "#/required", keyword: "required", params: { missingProperty: "dispatch_output" }, message: "must have required property 'dispatch_output'" };
      if (vErrors === null) {
        vErrors = [err20];
      } else {
        vErrors.push(err20);
      }
      errors++;
    }
    if (data.orchestrator_output === void 0) {
      const err21 = { instancePath, schemaPath: "#/required", keyword: "required", params: { missingProperty: "orchestrator_output" }, message: "must have required property 'orchestrator_output'" };
      if (vErrors === null) {
        vErrors = [err21];
      } else {
        vErrors.push(err21);
      }
      errors++;
    }
    if (data.session_before === void 0) {
      const err22 = { instancePath, schemaPath: "#/required", keyword: "required", params: { missingProperty: "session_before" }, message: "must have required property 'session_before'" };
      if (vErrors === null) {
        vErrors = [err22];
      } else {
        vErrors.push(err22);
      }
      errors++;
    }
    if (data.session_after === void 0) {
      const err23 = { instancePath, schemaPath: "#/required", keyword: "required", params: { missingProperty: "session_after" }, message: "must have required property 'session_after'" };
      if (vErrors === null) {
        vErrors = [err23];
      } else {
        vErrors.push(err23);
      }
      errors++;
    }
    if (data.log_entry === void 0) {
      const err24 = { instancePath, schemaPath: "#/required", keyword: "required", params: { missingProperty: "log_entry" }, message: "must have required property 'log_entry'" };
      if (vErrors === null) {
        vErrors = [err24];
      } else {
        vErrors.push(err24);
      }
      errors++;
    }
    if (data.persistence_load_request === void 0) {
      const err25 = { instancePath, schemaPath: "#/required", keyword: "required", params: { missingProperty: "persistence_load_request" }, message: "must have required property 'persistence_load_request'" };
      if (vErrors === null) {
        vErrors = [err25];
      } else {
        vErrors.push(err25);
      }
      errors++;
    }
    if (data.persistence_load_result === void 0) {
      const err26 = { instancePath, schemaPath: "#/required", keyword: "required", params: { missingProperty: "persistence_load_result" }, message: "must have required property 'persistence_load_result'" };
      if (vErrors === null) {
        vErrors = [err26];
      } else {
        vErrors.push(err26);
      }
      errors++;
    }
    if (data.persistence_commit_request === void 0) {
      const err27 = { instancePath, schemaPath: "#/required", keyword: "required", params: { missingProperty: "persistence_commit_request" }, message: "must have required property 'persistence_commit_request'" };
      if (vErrors === null) {
        vErrors = [err27];
      } else {
        vErrors.push(err27);
      }
      errors++;
    }
    if (data.persistence_commit_result === void 0) {
      const err28 = { instancePath, schemaPath: "#/required", keyword: "required", params: { missingProperty: "persistence_commit_result" }, message: "must have required property 'persistence_commit_result'" };
      if (vErrors === null) {
        vErrors = [err28];
      } else {
        vErrors.push(err28);
      }
      errors++;
    }
    for (const key0 in data) {
      if (!func5.call(schema50.properties, key0)) {
        const err29 = { instancePath, schemaPath: "#/additionalProperties", keyword: "additionalProperties", params: { additionalProperty: key0 }, message: "must NOT have additional properties" };
        if (vErrors === null) {
          vErrors = [err29];
        } else {
          vErrors.push(err29);
        }
        errors++;
      }
    }
    if (data.session_id !== void 0) {
      let data0 = data.session_id;
      if (typeof data0 === "string") {
        if (!pattern19.test(data0)) {
          const err30 = { instancePath: instancePath + "/session_id", schemaPath: "#/$defs/Pseudonym/pattern", keyword: "pattern", params: { pattern: "^p-[0-9a-f]{32}$" }, message: 'must match pattern "^p-[0-9a-f]{32}$"' };
          if (vErrors === null) {
            vErrors = [err30];
          } else {
            vErrors.push(err30);
          }
          errors++;
        }
      } else {
        const err31 = { instancePath: instancePath + "/session_id", schemaPath: "#/$defs/Pseudonym/type", keyword: "type", params: { type: "string" }, message: "must be string" };
        if (vErrors === null) {
          vErrors = [err31];
        } else {
          vErrors.push(err31);
        }
        errors++;
      }
    }
    if (data.turn_id !== void 0) {
      let data1 = data.turn_id;
      if (typeof data1 === "string") {
        if (!pattern19.test(data1)) {
          const err32 = { instancePath: instancePath + "/turn_id", schemaPath: "#/$defs/Pseudonym/pattern", keyword: "pattern", params: { pattern: "^p-[0-9a-f]{32}$" }, message: 'must match pattern "^p-[0-9a-f]{32}$"' };
          if (vErrors === null) {
            vErrors = [err32];
          } else {
            vErrors.push(err32);
          }
          errors++;
        }
      } else {
        const err33 = { instancePath: instancePath + "/turn_id", schemaPath: "#/$defs/Pseudonym/type", keyword: "type", params: { type: "string" }, message: "must be string" };
        if (vErrors === null) {
          vErrors = [err33];
        } else {
          vErrors.push(err33);
        }
        errors++;
      }
    }
    if (data.contract_version !== void 0) {
      let data2 = data.contract_version;
      if (!(typeof data2 == "number" && (!(data2 % 1) && !isNaN(data2)))) {
        const err34 = { instancePath: instancePath + "/contract_version", schemaPath: "#/properties/contract_version/type", keyword: "type", params: { type: "integer" }, message: "must be integer" };
        if (vErrors === null) {
          vErrors = [err34];
        } else {
          vErrors.push(err34);
        }
        errors++;
      }
      if (typeof data2 == "number") {
        if (data2 < 1 || isNaN(data2)) {
          const err35 = { instancePath: instancePath + "/contract_version", schemaPath: "#/properties/contract_version/minimum", keyword: "minimum", params: { comparison: ">=", limit: 1 }, message: "must be >= 1" };
          if (vErrors === null) {
            vErrors = [err35];
          } else {
            vErrors.push(err35);
          }
          errors++;
        }
      }
    }
    if (data.turn_index !== void 0) {
      let data3 = data.turn_index;
      if (!(typeof data3 == "number" && (!(data3 % 1) && !isNaN(data3)))) {
        const err36 = { instancePath: instancePath + "/turn_index", schemaPath: "#/properties/turn_index/type", keyword: "type", params: { type: "integer" }, message: "must be integer" };
        if (vErrors === null) {
          vErrors = [err36];
        } else {
          vErrors.push(err36);
        }
        errors++;
      }
      if (typeof data3 == "number") {
        if (data3 < 0 || isNaN(data3)) {
          const err37 = { instancePath: instancePath + "/turn_index", schemaPath: "#/properties/turn_index/minimum", keyword: "minimum", params: { comparison: ">=", limit: 0 }, message: "must be >= 0" };
          if (vErrors === null) {
            vErrors = [err37];
          } else {
            vErrors.push(err37);
          }
          errors++;
        }
      }
    }
    if (data.frontend_message !== void 0) {
      let data4 = data.frontend_message;
      const _errs13 = errors;
      let valid3 = false;
      let passing0 = null;
      const _errs14 = errors;
      if (data4 !== null) {
        const err38 = { instancePath: instancePath + "/frontend_message", schemaPath: "#/properties/frontend_message/oneOf/0/type", keyword: "type", params: { type: "null" }, message: "must be null" };
        if (vErrors === null) {
          vErrors = [err38];
        } else {
          vErrors.push(err38);
        }
        errors++;
      }
      var _valid0 = _errs14 === errors;
      if (_valid0) {
        valid3 = true;
        passing0 = 0;
      }
      const _errs16 = errors;
      if (data4 && typeof data4 == "object" && !Array.isArray(data4)) {
        if (data4.session_id === void 0) {
          const err39 = { instancePath: instancePath + "/frontend_message", schemaPath: "#/properties/frontend_message/oneOf/1/required", keyword: "required", params: { missingProperty: "session_id" }, message: "must have required property 'session_id'" };
          if (vErrors === null) {
            vErrors = [err39];
          } else {
            vErrors.push(err39);
          }
          errors++;
        }
        if (data4.kind === void 0) {
          const err40 = { instancePath: instancePath + "/frontend_message", schemaPath: "#/properties/frontend_message/oneOf/1/required", keyword: "required", params: { missingProperty: "kind" }, message: "must have required property 'kind'" };
          if (vErrors === null) {
            vErrors = [err40];
          } else {
            vErrors.push(err40);
          }
          errors++;
        }
        for (const key1 in data4) {
          if (!(key1 === "session_id" || key1 === "kind" || key1 === "utterance")) {
            const err41 = { instancePath: instancePath + "/frontend_message", schemaPath: "#/properties/frontend_message/oneOf/1/additionalProperties", keyword: "additionalProperties", params: { additionalProperty: key1 }, message: "must NOT have additional properties" };
            if (vErrors === null) {
              vErrors = [err41];
            } else {
              vErrors.push(err41);
            }
            errors++;
          }
        }
        if (data4.session_id !== void 0) {
          let data5 = data4.session_id;
          if (typeof data5 === "string") {
            if (!pattern19.test(data5)) {
              const err42 = { instancePath: instancePath + "/frontend_message/session_id", schemaPath: "#/$defs/Pseudonym/pattern", keyword: "pattern", params: { pattern: "^p-[0-9a-f]{32}$" }, message: 'must match pattern "^p-[0-9a-f]{32}$"' };
              if (vErrors === null) {
                vErrors = [err42];
              } else {
                vErrors.push(err42);
              }
              errors++;
            }
          } else {
            const err43 = { instancePath: instancePath + "/frontend_message/session_id", schemaPath: "#/$defs/Pseudonym/type", keyword: "type", params: { type: "string" }, message: "must be string" };
            if (vErrors === null) {
              vErrors = [err43];
            } else {
              vErrors.push(err43);
            }
            errors++;
          }
        }
        if (data4.kind !== void 0) {
          let data6 = data4.kind;
          if (!(data6 === "SESSION_START" || data6 === "UTTERANCE" || data6 === "SESSION_END")) {
            const err44 = { instancePath: instancePath + "/frontend_message/kind", schemaPath: "#/properties/frontend_message/oneOf/1/properties/kind/enum", keyword: "enum", params: { allowedValues: schema50.properties.frontend_message.oneOf[1].properties.kind.enum }, message: "must be equal to one of the allowed values" };
            if (vErrors === null) {
              vErrors = [err44];
            } else {
              vErrors.push(err44);
            }
            errors++;
          }
        }
        if (data4.utterance !== void 0) {
          if (!validate31(data4.utterance, { instancePath: instancePath + "/frontend_message/utterance", parentData: data4, parentDataProperty: "utterance", rootData, dynamicAnchors })) {
            vErrors = vErrors === null ? validate31.errors : vErrors.concat(validate31.errors);
            errors = vErrors.length;
          }
        }
      } else {
        const err45 = { instancePath: instancePath + "/frontend_message", schemaPath: "#/properties/frontend_message/oneOf/1/type", keyword: "type", params: { type: "object" }, message: "must be object" };
        if (vErrors === null) {
          vErrors = [err45];
        } else {
          vErrors.push(err45);
        }
        errors++;
      }
      var _valid0 = _errs16 === errors;
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
        const err46 = { instancePath: instancePath + "/frontend_message", schemaPath: "#/properties/frontend_message/oneOf", keyword: "oneOf", params: { passingSchemas: passing0 }, message: "must match exactly one schema in oneOf" };
        if (vErrors === null) {
          vErrors = [err46];
        } else {
          vErrors.push(err46);
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
    }
    if (data.extract_input !== void 0) {
      let data8 = data.extract_input;
      const _errs25 = errors;
      let valid6 = false;
      let passing1 = null;
      const _errs26 = errors;
      if (data8 !== null) {
        const err47 = { instancePath: instancePath + "/extract_input", schemaPath: "#/properties/extract_input/oneOf/0/type", keyword: "type", params: { type: "null" }, message: "must be null" };
        if (vErrors === null) {
          vErrors = [err47];
        } else {
          vErrors.push(err47);
        }
        errors++;
      }
      var _valid1 = _errs26 === errors;
      if (_valid1) {
        valid6 = true;
        passing1 = 0;
      }
      const _errs28 = errors;
      if (data8 && typeof data8 == "object" && !Array.isArray(data8)) {
        if (data8.question_id === void 0) {
          const err48 = { instancePath: instancePath + "/extract_input", schemaPath: "#/properties/extract_input/oneOf/1/required", keyword: "required", params: { missingProperty: "question_id" }, message: "must have required property 'question_id'" };
          if (vErrors === null) {
            vErrors = [err48];
          } else {
            vErrors.push(err48);
          }
          errors++;
        }
        if (data8.current_question === void 0) {
          const err49 = { instancePath: instancePath + "/extract_input", schemaPath: "#/properties/extract_input/oneOf/1/required", keyword: "required", params: { missingProperty: "current_question" }, message: "must have required property 'current_question'" };
          if (vErrors === null) {
            vErrors = [err49];
          } else {
            vErrors.push(err49);
          }
          errors++;
        }
        if (data8.user_utterance === void 0) {
          const err50 = { instancePath: instancePath + "/extract_input", schemaPath: "#/properties/extract_input/oneOf/1/required", keyword: "required", params: { missingProperty: "user_utterance" }, message: "must have required property 'user_utterance'" };
          if (vErrors === null) {
            vErrors = [err50];
          } else {
            vErrors.push(err50);
          }
          errors++;
        }
        if (data8.state === void 0) {
          const err51 = { instancePath: instancePath + "/extract_input", schemaPath: "#/properties/extract_input/oneOf/1/required", keyword: "required", params: { missingProperty: "state" }, message: "must have required property 'state'" };
          if (vErrors === null) {
            vErrors = [err51];
          } else {
            vErrors.push(err51);
          }
          errors++;
        }
        if (data8.question_id !== void 0) {
          let data9 = data8.question_id;
          if (typeof data9 === "string") {
            if (!pattern22.test(data9)) {
              const err52 = { instancePath: instancePath + "/extract_input/question_id", schemaPath: "#/$defs/Ident/pattern", keyword: "pattern", params: { pattern: "^([A-Za-z0-9][A-Za-z0-9_.\\-]{0,63}|\\[MASKED\\])$" }, message: 'must match pattern "^([A-Za-z0-9][A-Za-z0-9_.\\-]{0,63}|\\[MASKED\\])$"' };
              if (vErrors === null) {
                vErrors = [err52];
              } else {
                vErrors.push(err52);
              }
              errors++;
            }
          } else {
            const err53 = { instancePath: instancePath + "/extract_input/question_id", schemaPath: "#/$defs/Ident/type", keyword: "type", params: { type: "string" }, message: "must be string" };
            if (vErrors === null) {
              vErrors = [err53];
            } else {
              vErrors.push(err53);
            }
            errors++;
          }
        }
        if (data8.current_question !== void 0) {
          let data10 = data8.current_question;
          if (!(data10 === "[MASKED]" || data10 === "[DROPPED]")) {
            const err54 = { instancePath: instancePath + "/extract_input/current_question", schemaPath: "#/$defs/Redacted/enum", keyword: "enum", params: { allowedValues: schema55.enum }, message: "must be equal to one of the allowed values" };
            if (vErrors === null) {
              vErrors = [err54];
            } else {
              vErrors.push(err54);
            }
            errors++;
          }
        }
        if (data8.user_utterance !== void 0) {
          if (!validate31(data8.user_utterance, { instancePath: instancePath + "/extract_input/user_utterance", parentData: data8, parentDataProperty: "user_utterance", rootData, dynamicAnchors })) {
            vErrors = vErrors === null ? validate31.errors : vErrors.concat(validate31.errors);
            errors = vErrors.length;
          }
        }
        if (data8.state !== void 0) {
          let data12 = data8.state;
          if (!(data12 && typeof data12 == "object" && !Array.isArray(data12))) {
            const err55 = { instancePath: instancePath + "/extract_input/state", schemaPath: "#/properties/extract_input/oneOf/1/properties/state/type", keyword: "type", params: { type: "object" }, message: "must be object" };
            if (vErrors === null) {
              vErrors = [err55];
            } else {
              vErrors.push(err55);
            }
            errors++;
          }
        }
      } else {
        const err56 = { instancePath: instancePath + "/extract_input", schemaPath: "#/properties/extract_input/oneOf/1/type", keyword: "type", params: { type: "object" }, message: "must be object" };
        if (vErrors === null) {
          vErrors = [err56];
        } else {
          vErrors.push(err56);
        }
        errors++;
      }
      var _valid1 = _errs28 === errors;
      if (_valid1 && valid6) {
        valid6 = false;
        passing1 = [passing1, 1];
      } else {
        if (_valid1) {
          valid6 = true;
          passing1 = 1;
          var props1 = {};
          props1.question_id = true;
          props1.current_question = true;
          props1.user_utterance = true;
          props1.state = true;
        }
      }
      if (!valid6) {
        const err57 = { instancePath: instancePath + "/extract_input", schemaPath: "#/properties/extract_input/oneOf", keyword: "oneOf", params: { passingSchemas: passing1 }, message: "must match exactly one schema in oneOf" };
        if (vErrors === null) {
          vErrors = [err57];
        } else {
          vErrors.push(err57);
        }
        errors++;
      } else {
        errors = _errs25;
        if (vErrors !== null) {
          if (_errs25) {
            vErrors.length = _errs25;
          } else {
            vErrors = null;
          }
        }
      }
    }
    if (data.extract_output !== void 0) {
      let data13 = data.extract_output;
      const _errs39 = errors;
      let valid10 = false;
      let passing2 = null;
      const _errs40 = errors;
      if (data13 !== null) {
        const err58 = { instancePath: instancePath + "/extract_output", schemaPath: "#/properties/extract_output/oneOf/0/type", keyword: "type", params: { type: "null" }, message: "must be null" };
        if (vErrors === null) {
          vErrors = [err58];
        } else {
          vErrors.push(err58);
        }
        errors++;
      }
      var _valid2 = _errs40 === errors;
      if (_valid2) {
        valid10 = true;
        passing2 = 0;
      }
      const _errs42 = errors;
      if (data13 && typeof data13 == "object" && !Array.isArray(data13)) {
        if (data13.values !== void 0) {
          let data14 = data13.values;
          if (Array.isArray(data14)) {
            const len0 = data14.length;
            for (let i0 = 0; i0 < len0; i0++) {
              let data15 = data14[i0];
              if (data15 && typeof data15 == "object" && !Array.isArray(data15)) {
                if (data15.key !== void 0) {
                  let data16 = data15.key;
                  if (!(data16 === "[MASKED]" || data16 === "[DROPPED]")) {
                    const err59 = { instancePath: instancePath + "/extract_output/values/" + i0 + "/key", schemaPath: "#/$defs/Redacted/enum", keyword: "enum", params: { allowedValues: schema55.enum }, message: "must be equal to one of the allowed values" };
                    if (vErrors === null) {
                      vErrors = [err59];
                    } else {
                      vErrors.push(err59);
                    }
                    errors++;
                  }
                }
                if (data15.value !== void 0) {
                  let data17 = data15.value;
                  if (!(data17 === "[MASKED]" || data17 === "[DROPPED]")) {
                    const err60 = { instancePath: instancePath + "/extract_output/values/" + i0 + "/value", schemaPath: "#/$defs/Redacted/enum", keyword: "enum", params: { allowedValues: schema55.enum }, message: "must be equal to one of the allowed values" };
                    if (vErrors === null) {
                      vErrors = [err60];
                    } else {
                      vErrors.push(err60);
                    }
                    errors++;
                  }
                }
                if (data15.precision !== void 0) {
                  let data18 = data15.precision;
                  if (!(data18 === "[MASKED]" || data18 === "[DROPPED]")) {
                    const err61 = { instancePath: instancePath + "/extract_output/values/" + i0 + "/precision", schemaPath: "#/$defs/Redacted/enum", keyword: "enum", params: { allowedValues: schema55.enum }, message: "must be equal to one of the allowed values" };
                    if (vErrors === null) {
                      vErrors = [err61];
                    } else {
                      vErrors.push(err61);
                    }
                    errors++;
                  }
                }
                if (data15.status !== void 0) {
                  let data19 = data15.status;
                  if (!(data19 === "[MASKED]" || data19 === "[DROPPED]")) {
                    const err62 = { instancePath: instancePath + "/extract_output/values/" + i0 + "/status", schemaPath: "#/$defs/Redacted/enum", keyword: "enum", params: { allowedValues: schema55.enum }, message: "must be equal to one of the allowed values" };
                    if (vErrors === null) {
                      vErrors = [err62];
                    } else {
                      vErrors.push(err62);
                    }
                    errors++;
                  }
                }
                if (data15.save !== void 0) {
                  if (typeof data15.save !== "boolean") {
                    const err63 = { instancePath: instancePath + "/extract_output/values/" + i0 + "/save", schemaPath: "#/properties/extract_output/oneOf/1/properties/values/items/properties/save/type", keyword: "type", params: { type: "boolean" }, message: "must be boolean" };
                    if (vErrors === null) {
                      vErrors = [err63];
                    } else {
                      vErrors.push(err63);
                    }
                    errors++;
                  }
                }
              } else {
                const err64 = { instancePath: instancePath + "/extract_output/values/" + i0, schemaPath: "#/properties/extract_output/oneOf/1/properties/values/items/type", keyword: "type", params: { type: "object" }, message: "must be object" };
                if (vErrors === null) {
                  vErrors = [err64];
                } else {
                  vErrors.push(err64);
                }
                errors++;
              }
            }
          } else {
            const err65 = { instancePath: instancePath + "/extract_output/values", schemaPath: "#/properties/extract_output/oneOf/1/properties/values/type", keyword: "type", params: { type: "array" }, message: "must be array" };
            if (vErrors === null) {
              vErrors = [err65];
            } else {
              vErrors.push(err65);
            }
            errors++;
          }
        }
        if (data13.action !== void 0) {
          let data21 = data13.action;
          if (typeof data21 === "string") {
            if (!pattern23.test(data21)) {
              const err66 = { instancePath: instancePath + "/extract_output/action", schemaPath: "#/properties/extract_output/oneOf/1/properties/action/pattern", keyword: "pattern", params: { pattern: "^[A-Z][A-Z0-9_]{0,31}$|^\\[MASKED\\]$" }, message: 'must match pattern "^[A-Z][A-Z0-9_]{0,31}$|^\\[MASKED\\]$"' };
              if (vErrors === null) {
                vErrors = [err66];
              } else {
                vErrors.push(err66);
              }
              errors++;
            }
          } else {
            const err67 = { instancePath: instancePath + "/extract_output/action", schemaPath: "#/properties/extract_output/oneOf/1/properties/action/type", keyword: "type", params: { type: "string" }, message: "must be string" };
            if (vErrors === null) {
              vErrors = [err67];
            } else {
              vErrors.push(err67);
            }
            errors++;
          }
        }
        if (data13.next_item !== void 0) {
          let data22 = data13.next_item;
          const _errs61 = errors;
          let valid19 = false;
          let passing3 = null;
          const _errs62 = errors;
          if (data22 !== null) {
            const err68 = { instancePath: instancePath + "/extract_output/next_item", schemaPath: "#/properties/extract_output/oneOf/1/properties/next_item/oneOf/0/type", keyword: "type", params: { type: "null" }, message: "must be null" };
            if (vErrors === null) {
              vErrors = [err68];
            } else {
              vErrors.push(err68);
            }
            errors++;
          }
          var _valid3 = _errs62 === errors;
          if (_valid3) {
            valid19 = true;
            passing3 = 0;
          }
          const _errs64 = errors;
          if (typeof data22 === "string") {
            if (!pattern22.test(data22)) {
              const err69 = { instancePath: instancePath + "/extract_output/next_item", schemaPath: "#/$defs/Ident/pattern", keyword: "pattern", params: { pattern: "^([A-Za-z0-9][A-Za-z0-9_.\\-]{0,63}|\\[MASKED\\])$" }, message: 'must match pattern "^([A-Za-z0-9][A-Za-z0-9_.\\-]{0,63}|\\[MASKED\\])$"' };
              if (vErrors === null) {
                vErrors = [err69];
              } else {
                vErrors.push(err69);
              }
              errors++;
            }
          } else {
            const err70 = { instancePath: instancePath + "/extract_output/next_item", schemaPath: "#/$defs/Ident/type", keyword: "type", params: { type: "string" }, message: "must be string" };
            if (vErrors === null) {
              vErrors = [err70];
            } else {
              vErrors.push(err70);
            }
            errors++;
          }
          var _valid3 = _errs64 === errors;
          if (_valid3 && valid19) {
            valid19 = false;
            passing3 = [passing3, 1];
          } else {
            if (_valid3) {
              valid19 = true;
              passing3 = 1;
            }
          }
          if (!valid19) {
            const err71 = { instancePath: instancePath + "/extract_output/next_item", schemaPath: "#/properties/extract_output/oneOf/1/properties/next_item/oneOf", keyword: "oneOf", params: { passingSchemas: passing3 }, message: "must match exactly one schema in oneOf" };
            if (vErrors === null) {
              vErrors = [err71];
            } else {
              vErrors.push(err71);
            }
            errors++;
          } else {
            errors = _errs61;
            if (vErrors !== null) {
              if (_errs61) {
                vErrors.length = _errs61;
              } else {
                vErrors = null;
              }
            }
          }
        }
        if (data13.reason !== void 0) {
          let data23 = data13.reason;
          if (!(data23 === "[MASKED]" || data23 === "[DROPPED]")) {
            const err72 = { instancePath: instancePath + "/extract_output/reason", schemaPath: "#/$defs/Redacted/enum", keyword: "enum", params: { allowedValues: schema55.enum }, message: "must be equal to one of the allowed values" };
            if (vErrors === null) {
              vErrors = [err72];
            } else {
              vErrors.push(err72);
            }
            errors++;
          }
        }
        if (data13.note !== void 0) {
          let data24 = data13.note;
          if (!(data24 === "[MASKED]" || data24 === "[DROPPED]")) {
            const err73 = { instancePath: instancePath + "/extract_output/note", schemaPath: "#/$defs/Redacted/enum", keyword: "enum", params: { allowedValues: schema55.enum }, message: "must be equal to one of the allowed values" };
            if (vErrors === null) {
              vErrors = [err73];
            } else {
              vErrors.push(err73);
            }
            errors++;
          }
        }
        if (data13.targets !== void 0) {
          if (!Array.isArray(data13.targets)) {
            const err74 = { instancePath: instancePath + "/extract_output/targets", schemaPath: "#/properties/extract_output/oneOf/1/properties/targets/type", keyword: "type", params: { type: "array" }, message: "must be array" };
            if (vErrors === null) {
              vErrors = [err74];
            } else {
              vErrors.push(err74);
            }
            errors++;
          }
        }
      } else {
        const err75 = { instancePath: instancePath + "/extract_output", schemaPath: "#/properties/extract_output/oneOf/1/type", keyword: "type", params: { type: "object" }, message: "must be object" };
        if (vErrors === null) {
          vErrors = [err75];
        } else {
          vErrors.push(err75);
        }
        errors++;
      }
      var _valid2 = _errs42 === errors;
      if (_valid2 && valid10) {
        valid10 = false;
        passing2 = [passing2, 1];
      } else {
        if (_valid2) {
          valid10 = true;
          passing2 = 1;
          var props2 = {};
          props2.values = true;
          props2.action = true;
          props2.next_item = true;
          props2.reason = true;
          props2.note = true;
          props2.targets = true;
        }
      }
      if (!valid10) {
        const err76 = { instancePath: instancePath + "/extract_output", schemaPath: "#/properties/extract_output/oneOf", keyword: "oneOf", params: { passingSchemas: passing2 }, message: "must match exactly one schema in oneOf" };
        if (vErrors === null) {
          vErrors = [err76];
        } else {
          vErrors.push(err76);
        }
        errors++;
      } else {
        errors = _errs39;
        if (vErrors !== null) {
          if (_errs39) {
            vErrors.length = _errs39;
          } else {
            vErrors = null;
          }
        }
      }
    }
    if (data.extract_attempts !== void 0) {
      let data26 = data.extract_attempts;
      const _errs74 = errors;
      let valid23 = false;
      let passing4 = null;
      const _errs75 = errors;
      if (data26 !== null) {
        const err77 = { instancePath: instancePath + "/extract_attempts", schemaPath: "#/properties/extract_attempts/oneOf/0/type", keyword: "type", params: { type: "null" }, message: "must be null" };
        if (vErrors === null) {
          vErrors = [err77];
        } else {
          vErrors.push(err77);
        }
        errors++;
      }
      var _valid4 = _errs75 === errors;
      if (_valid4) {
        valid23 = true;
        passing4 = 0;
      }
      const _errs77 = errors;
      if (!(typeof data26 == "number" && (!(data26 % 1) && !isNaN(data26)))) {
        const err78 = { instancePath: instancePath + "/extract_attempts", schemaPath: "#/properties/extract_attempts/oneOf/1/type", keyword: "type", params: { type: "integer" }, message: "must be integer" };
        if (vErrors === null) {
          vErrors = [err78];
        } else {
          vErrors.push(err78);
        }
        errors++;
      }
      if (typeof data26 == "number") {
        if (data26 > 2 || isNaN(data26)) {
          const err79 = { instancePath: instancePath + "/extract_attempts", schemaPath: "#/properties/extract_attempts/oneOf/1/maximum", keyword: "maximum", params: { comparison: "<=", limit: 2 }, message: "must be <= 2" };
          if (vErrors === null) {
            vErrors = [err79];
          } else {
            vErrors.push(err79);
          }
          errors++;
        }
        if (data26 < 1 || isNaN(data26)) {
          const err80 = { instancePath: instancePath + "/extract_attempts", schemaPath: "#/properties/extract_attempts/oneOf/1/minimum", keyword: "minimum", params: { comparison: ">=", limit: 1 }, message: "must be >= 1" };
          if (vErrors === null) {
            vErrors = [err80];
          } else {
            vErrors.push(err80);
          }
          errors++;
        }
      }
      var _valid4 = _errs77 === errors;
      if (_valid4 && valid23) {
        valid23 = false;
        passing4 = [passing4, 1];
      } else {
        if (_valid4) {
          valid23 = true;
          passing4 = 1;
        }
      }
      if (!valid23) {
        const err81 = { instancePath: instancePath + "/extract_attempts", schemaPath: "#/properties/extract_attempts/oneOf", keyword: "oneOf", params: { passingSchemas: passing4 }, message: "must match exactly one schema in oneOf" };
        if (vErrors === null) {
          vErrors = [err81];
        } else {
          vErrors.push(err81);
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
    if (data.extract_status !== void 0) {
      let data27 = data.extract_status;
      if (!(data27 === "OK" || data27 === "OUTPUT_INVALID" || data27 === "VIOLATION" || data27 === "ERROR" || data27 === null)) {
        const err82 = { instancePath: instancePath + "/extract_status", schemaPath: "#/properties/extract_status/enum", keyword: "enum", params: { allowedValues: schema50.properties.extract_status.enum }, message: "must be equal to one of the allowed values" };
        if (vErrors === null) {
          vErrors = [err82];
        } else {
          vErrors.push(err82);
        }
        errors++;
      }
    }
    if (data.extract_protections !== void 0) {
      let data28 = data.extract_protections;
      const _errs82 = errors;
      let valid25 = false;
      let passing5 = null;
      const _errs83 = errors;
      if (data28 !== null) {
        const err83 = { instancePath: instancePath + "/extract_protections", schemaPath: "#/$defs/CountMap/oneOf/0/type", keyword: "type", params: { type: "null" }, message: "must be null" };
        if (vErrors === null) {
          vErrors = [err83];
        } else {
          vErrors.push(err83);
        }
        errors++;
      }
      var _valid5 = _errs83 === errors;
      if (_valid5) {
        valid25 = true;
        passing5 = 0;
      }
      const _errs85 = errors;
      if (data28 && typeof data28 == "object" && !Array.isArray(data28)) {
        for (const key2 in data28) {
          const _errs87 = errors;
          if (typeof key2 === "string") {
            if (!pattern25.test(key2)) {
              const err84 = { instancePath: instancePath + "/extract_protections", schemaPath: "#/$defs/CountMap/oneOf/1/propertyNames/pattern", keyword: "pattern", params: { pattern: "^[A-Z][A-Z0-9_]{0,31}$" }, message: 'must match pattern "^[A-Z][A-Z0-9_]{0,31}$"', propertyName: key2 };
              if (vErrors === null) {
                vErrors = [err84];
              } else {
                vErrors.push(err84);
              }
              errors++;
            }
          }
          var valid26 = _errs87 === errors;
          if (!valid26) {
            const err85 = { instancePath: instancePath + "/extract_protections", schemaPath: "#/$defs/CountMap/oneOf/1/propertyNames", keyword: "propertyNames", params: { propertyName: key2 }, message: "property name must be valid" };
            if (vErrors === null) {
              vErrors = [err85];
            } else {
              vErrors.push(err85);
            }
            errors++;
          }
        }
        for (const key3 in data28) {
          let data29 = data28[key3];
          if (!(typeof data29 == "number" && (!(data29 % 1) && !isNaN(data29)))) {
            const err86 = { instancePath: instancePath + "/extract_protections/" + key3.replace(/~/g, "~0").replace(/\//g, "~1"), schemaPath: "#/$defs/CountMap/oneOf/1/additionalProperties/type", keyword: "type", params: { type: "integer" }, message: "must be integer" };
            if (vErrors === null) {
              vErrors = [err86];
            } else {
              vErrors.push(err86);
            }
            errors++;
          }
          if (typeof data29 == "number") {
            if (data29 < 0 || isNaN(data29)) {
              const err87 = { instancePath: instancePath + "/extract_protections/" + key3.replace(/~/g, "~0").replace(/\//g, "~1"), schemaPath: "#/$defs/CountMap/oneOf/1/additionalProperties/minimum", keyword: "minimum", params: { comparison: ">=", limit: 0 }, message: "must be >= 0" };
              if (vErrors === null) {
                vErrors = [err87];
              } else {
                vErrors.push(err87);
              }
              errors++;
            }
          }
        }
      } else {
        const err88 = { instancePath: instancePath + "/extract_protections", schemaPath: "#/$defs/CountMap/oneOf/1/type", keyword: "type", params: { type: "object" }, message: "must be object" };
        if (vErrors === null) {
          vErrors = [err88];
        } else {
          vErrors.push(err88);
        }
        errors++;
      }
      var _valid5 = _errs85 === errors;
      if (_valid5 && valid25) {
        valid25 = false;
        passing5 = [passing5, 1];
      } else {
        if (_valid5) {
          valid25 = true;
          passing5 = 1;
        }
      }
      if (!valid25) {
        const err89 = { instancePath: instancePath + "/extract_protections", schemaPath: "#/$defs/CountMap/oneOf", keyword: "oneOf", params: { passingSchemas: passing5 }, message: "must match exactly one schema in oneOf" };
        if (vErrors === null) {
          vErrors = [err89];
        } else {
          vErrors.push(err89);
        }
        errors++;
      } else {
        errors = _errs82;
        if (vErrors !== null) {
          if (_errs82) {
            vErrors.length = _errs82;
          } else {
            vErrors = null;
          }
        }
      }
    }
    if (data.validation_ok !== void 0) {
      let data30 = data.validation_ok;
      if (typeof data30 !== "boolean" && data30 !== null) {
        const err90 = { instancePath: instancePath + "/validation_ok", schemaPath: "#/properties/validation_ok/type", keyword: "type", params: { type: schema50.properties.validation_ok.type }, message: "must be boolean,null" };
        if (vErrors === null) {
          vErrors = [err90];
        } else {
          vErrors.push(err90);
        }
        errors++;
      }
    }
    if (data.validation_violations !== void 0) {
      let data31 = data.validation_violations;
      if (!Array.isArray(data31) && data31 !== null) {
        const err91 = { instancePath: instancePath + "/validation_violations", schemaPath: "#/properties/validation_violations/type", keyword: "type", params: { type: schema50.properties.validation_violations.type }, message: "must be array,null" };
        if (vErrors === null) {
          vErrors = [err91];
        } else {
          vErrors.push(err91);
        }
        errors++;
      }
    }
    if (data.response_input !== void 0) {
      let data32 = data.response_input;
      const _errs96 = errors;
      let valid28 = false;
      let passing6 = null;
      const _errs97 = errors;
      if (data32 !== null) {
        const err92 = { instancePath: instancePath + "/response_input", schemaPath: "#/properties/response_input/oneOf/0/type", keyword: "type", params: { type: "null" }, message: "must be null" };
        if (vErrors === null) {
          vErrors = [err92];
        } else {
          vErrors.push(err92);
        }
        errors++;
      }
      var _valid6 = _errs97 === errors;
      if (_valid6) {
        valid28 = true;
        passing6 = 0;
      }
      const _errs99 = errors;
      if (data32 && typeof data32 == "object" && !Array.isArray(data32)) {
        if (data32.action === void 0) {
          const err93 = { instancePath: instancePath + "/response_input", schemaPath: "#/properties/response_input/oneOf/1/required", keyword: "required", params: { missingProperty: "action" }, message: "must have required property 'action'" };
          if (vErrors === null) {
            vErrors = [err93];
          } else {
            vErrors.push(err93);
          }
          errors++;
        }
        if (data32.topic === void 0) {
          const err94 = { instancePath: instancePath + "/response_input", schemaPath: "#/properties/response_input/oneOf/1/required", keyword: "required", params: { missingProperty: "topic" }, message: "must have required property 'topic'" };
          if (vErrors === null) {
            vErrors = [err94];
          } else {
            vErrors.push(err94);
          }
          errors++;
        }
        if (data32.next === void 0) {
          const err95 = { instancePath: instancePath + "/response_input", schemaPath: "#/properties/response_input/oneOf/1/required", keyword: "required", params: { missingProperty: "next" }, message: "must have required property 'next'" };
          if (vErrors === null) {
            vErrors = [err95];
          } else {
            vErrors.push(err95);
          }
          errors++;
        }
        if (data32.action !== void 0) {
          if (typeof data32.action !== "string") {
            const err96 = { instancePath: instancePath + "/response_input/action", schemaPath: "#/properties/response_input/oneOf/1/properties/action/type", keyword: "type", params: { type: "string" }, message: "must be string" };
            if (vErrors === null) {
              vErrors = [err96];
            } else {
              vErrors.push(err96);
            }
            errors++;
          }
        }
        if (data32.topic !== void 0) {
          let data34 = data32.topic;
          if (!(data34 === "[MASKED]" || data34 === "[DROPPED]")) {
            const err97 = { instancePath: instancePath + "/response_input/topic", schemaPath: "#/$defs/Redacted/enum", keyword: "enum", params: { allowedValues: schema55.enum }, message: "must be equal to one of the allowed values" };
            if (vErrors === null) {
              vErrors = [err97];
            } else {
              vErrors.push(err97);
            }
            errors++;
          }
        }
        if (data32.next !== void 0) {
          let data35 = data32.next;
          if (!(data35 && typeof data35 == "object" && !Array.isArray(data35))) {
            const err98 = { instancePath: instancePath + "/response_input/next", schemaPath: "#/properties/response_input/oneOf/1/properties/next/type", keyword: "type", params: { type: "object" }, message: "must be object" };
            if (vErrors === null) {
              vErrors = [err98];
            } else {
              vErrors.push(err98);
            }
            errors++;
          }
        }
      } else {
        const err99 = { instancePath: instancePath + "/response_input", schemaPath: "#/properties/response_input/oneOf/1/type", keyword: "type", params: { type: "object" }, message: "must be object" };
        if (vErrors === null) {
          vErrors = [err99];
        } else {
          vErrors.push(err99);
        }
        errors++;
      }
      var _valid6 = _errs99 === errors;
      if (_valid6 && valid28) {
        valid28 = false;
        passing6 = [passing6, 1];
      } else {
        if (_valid6) {
          valid28 = true;
          passing6 = 1;
          var props4 = {};
          props4.action = true;
          props4.topic = true;
          props4.next = true;
        }
      }
      if (!valid28) {
        const err100 = { instancePath: instancePath + "/response_input", schemaPath: "#/properties/response_input/oneOf", keyword: "oneOf", params: { passingSchemas: passing6 }, message: "must match exactly one schema in oneOf" };
        if (vErrors === null) {
          vErrors = [err100];
        } else {
          vErrors.push(err100);
        }
        errors++;
      } else {
        errors = _errs96;
        if (vErrors !== null) {
          if (_errs96) {
            vErrors.length = _errs96;
          } else {
            vErrors = null;
          }
        }
      }
    }
    if (data.response_output !== void 0) {
      let data36 = data.response_output;
      const _errs108 = errors;
      let valid31 = false;
      let passing7 = null;
      const _errs109 = errors;
      if (data36 !== null) {
        const err101 = { instancePath: instancePath + "/response_output", schemaPath: "#/properties/response_output/oneOf/0/type", keyword: "type", params: { type: "null" }, message: "must be null" };
        if (vErrors === null) {
          vErrors = [err101];
        } else {
          vErrors.push(err101);
        }
        errors++;
      }
      var _valid7 = _errs109 === errors;
      if (_valid7) {
        valid31 = true;
        passing7 = 0;
      }
      const _errs111 = errors;
      if (!(data36 === "[MASKED]" || data36 === "[DROPPED]")) {
        const err102 = { instancePath: instancePath + "/response_output", schemaPath: "#/$defs/Redacted/enum", keyword: "enum", params: { allowedValues: schema55.enum }, message: "must be equal to one of the allowed values" };
        if (vErrors === null) {
          vErrors = [err102];
        } else {
          vErrors.push(err102);
        }
        errors++;
      }
      var _valid7 = _errs111 === errors;
      if (_valid7 && valid31) {
        valid31 = false;
        passing7 = [passing7, 1];
      } else {
        if (_valid7) {
          valid31 = true;
          passing7 = 1;
        }
      }
      if (!valid31) {
        const err103 = { instancePath: instancePath + "/response_output", schemaPath: "#/properties/response_output/oneOf", keyword: "oneOf", params: { passingSchemas: passing7 }, message: "must match exactly one schema in oneOf" };
        if (vErrors === null) {
          vErrors = [err103];
        } else {
          vErrors.push(err103);
        }
        errors++;
      } else {
        errors = _errs108;
        if (vErrors !== null) {
          if (_errs108) {
            vErrors.length = _errs108;
          } else {
            vErrors = null;
          }
        }
      }
    }
    if (data.response_outcome !== void 0) {
      let data37 = data.response_outcome;
      if (!(data37 === "ok" || data37 === "fallback" || data37 === "fixed" || data37 === null)) {
        const err104 = { instancePath: instancePath + "/response_outcome", schemaPath: "#/properties/response_outcome/enum", keyword: "enum", params: { allowedValues: schema50.properties.response_outcome.enum }, message: "must be equal to one of the allowed values" };
        if (vErrors === null) {
          vErrors = [err104];
        } else {
          vErrors.push(err104);
        }
        errors++;
      }
    }
    if (data.response_protections !== void 0) {
      let data38 = data.response_protections;
      const _errs116 = errors;
      let valid34 = false;
      let passing8 = null;
      const _errs117 = errors;
      if (data38 !== null) {
        const err105 = { instancePath: instancePath + "/response_protections", schemaPath: "#/$defs/CountMap/oneOf/0/type", keyword: "type", params: { type: "null" }, message: "must be null" };
        if (vErrors === null) {
          vErrors = [err105];
        } else {
          vErrors.push(err105);
        }
        errors++;
      }
      var _valid8 = _errs117 === errors;
      if (_valid8) {
        valid34 = true;
        passing8 = 0;
      }
      const _errs119 = errors;
      if (data38 && typeof data38 == "object" && !Array.isArray(data38)) {
        for (const key4 in data38) {
          const _errs121 = errors;
          if (typeof key4 === "string") {
            if (!pattern25.test(key4)) {
              const err106 = { instancePath: instancePath + "/response_protections", schemaPath: "#/$defs/CountMap/oneOf/1/propertyNames/pattern", keyword: "pattern", params: { pattern: "^[A-Z][A-Z0-9_]{0,31}$" }, message: 'must match pattern "^[A-Z][A-Z0-9_]{0,31}$"', propertyName: key4 };
              if (vErrors === null) {
                vErrors = [err106];
              } else {
                vErrors.push(err106);
              }
              errors++;
            }
          }
          var valid35 = _errs121 === errors;
          if (!valid35) {
            const err107 = { instancePath: instancePath + "/response_protections", schemaPath: "#/$defs/CountMap/oneOf/1/propertyNames", keyword: "propertyNames", params: { propertyName: key4 }, message: "property name must be valid" };
            if (vErrors === null) {
              vErrors = [err107];
            } else {
              vErrors.push(err107);
            }
            errors++;
          }
        }
        for (const key5 in data38) {
          let data39 = data38[key5];
          if (!(typeof data39 == "number" && (!(data39 % 1) && !isNaN(data39)))) {
            const err108 = { instancePath: instancePath + "/response_protections/" + key5.replace(/~/g, "~0").replace(/\//g, "~1"), schemaPath: "#/$defs/CountMap/oneOf/1/additionalProperties/type", keyword: "type", params: { type: "integer" }, message: "must be integer" };
            if (vErrors === null) {
              vErrors = [err108];
            } else {
              vErrors.push(err108);
            }
            errors++;
          }
          if (typeof data39 == "number") {
            if (data39 < 0 || isNaN(data39)) {
              const err109 = { instancePath: instancePath + "/response_protections/" + key5.replace(/~/g, "~0").replace(/\//g, "~1"), schemaPath: "#/$defs/CountMap/oneOf/1/additionalProperties/minimum", keyword: "minimum", params: { comparison: ">=", limit: 0 }, message: "must be >= 0" };
              if (vErrors === null) {
                vErrors = [err109];
              } else {
                vErrors.push(err109);
              }
              errors++;
            }
          }
        }
      } else {
        const err110 = { instancePath: instancePath + "/response_protections", schemaPath: "#/$defs/CountMap/oneOf/1/type", keyword: "type", params: { type: "object" }, message: "must be object" };
        if (vErrors === null) {
          vErrors = [err110];
        } else {
          vErrors.push(err110);
        }
        errors++;
      }
      var _valid8 = _errs119 === errors;
      if (_valid8 && valid34) {
        valid34 = false;
        passing8 = [passing8, 1];
      } else {
        if (_valid8) {
          valid34 = true;
          passing8 = 1;
        }
      }
      if (!valid34) {
        const err111 = { instancePath: instancePath + "/response_protections", schemaPath: "#/$defs/CountMap/oneOf", keyword: "oneOf", params: { passingSchemas: passing8 }, message: "must match exactly one schema in oneOf" };
        if (vErrors === null) {
          vErrors = [err111];
        } else {
          vErrors.push(err111);
        }
        errors++;
      } else {
        errors = _errs116;
        if (vErrors !== null) {
          if (_errs116) {
            vErrors.length = _errs116;
          } else {
            vErrors = null;
          }
        }
      }
    }
    if (data.intervention_decision !== void 0) {
      let data40 = data.intervention_decision;
      if (!(data40 && typeof data40 == "object" && !Array.isArray(data40)) && data40 !== null) {
        const err112 = { instancePath: instancePath + "/intervention_decision", schemaPath: "#/properties/intervention_decision/type", keyword: "type", params: { type: schema50.properties.intervention_decision.type }, message: "must be object,null" };
        if (vErrors === null) {
          vErrors = [err112];
        } else {
          vErrors.push(err112);
        }
        errors++;
      }
    }
    if (data.orchestrator_input !== void 0) {
      let data41 = data.orchestrator_input;
      if (!(data41 && typeof data41 == "object" && !Array.isArray(data41)) && data41 !== null) {
        const err113 = { instancePath: instancePath + "/orchestrator_input", schemaPath: "#/properties/orchestrator_input/type", keyword: "type", params: { type: schema50.properties.orchestrator_input.type }, message: "must be object,null" };
        if (vErrors === null) {
          vErrors = [err113];
        } else {
          vErrors.push(err113);
        }
        errors++;
      }
    }
    if (data.frontend_input !== void 0) {
      let data42 = data.frontend_input;
      const _errs130 = errors;
      let valid37 = false;
      let passing9 = null;
      const _errs131 = errors;
      if (data42 !== null) {
        const err114 = { instancePath: instancePath + "/frontend_input", schemaPath: "#/properties/frontend_input/oneOf/0/type", keyword: "type", params: { type: "null" }, message: "must be null" };
        if (vErrors === null) {
          vErrors = [err114];
        } else {
          vErrors.push(err114);
        }
        errors++;
      }
      var _valid9 = _errs131 === errors;
      if (_valid9) {
        valid37 = true;
        passing9 = 0;
      }
      const _errs133 = errors;
      if (data42 && typeof data42 == "object" && !Array.isArray(data42)) {
        if (data42.turn_failure_signal !== void 0) {
          let data43 = data42.turn_failure_signal;
          const _errs136 = errors;
          let valid39 = false;
          let passing10 = null;
          const _errs137 = errors;
          if (data43 !== null) {
            const err115 = { instancePath: instancePath + "/frontend_input/turn_failure_signal", schemaPath: "#/properties/frontend_input/oneOf/1/properties/turn_failure_signal/oneOf/0/type", keyword: "type", params: { type: "null" }, message: "must be null" };
            if (vErrors === null) {
              vErrors = [err115];
            } else {
              vErrors.push(err115);
            }
            errors++;
          }
          var _valid10 = _errs137 === errors;
          if (_valid10) {
            valid39 = true;
            passing10 = 0;
          }
          const _errs139 = errors;
          if (!validate34(data43, { instancePath: instancePath + "/frontend_input/turn_failure_signal", parentData: data42, parentDataProperty: "turn_failure_signal", rootData, dynamicAnchors })) {
            vErrors = vErrors === null ? validate34.errors : vErrors.concat(validate34.errors);
            errors = vErrors.length;
          }
          var _valid10 = _errs139 === errors;
          if (_valid10 && valid39) {
            valid39 = false;
            passing10 = [passing10, 1];
          } else {
            if (_valid10) {
              valid39 = true;
              passing10 = 1;
              var props6 = {};
              props6.session_id = true;
              props6.write_committed = true;
              props6.staff_alert = true;
              props6.pause_reason = true;
            }
          }
          if (!valid39) {
            const err116 = { instancePath: instancePath + "/frontend_input/turn_failure_signal", schemaPath: "#/properties/frontend_input/oneOf/1/properties/turn_failure_signal/oneOf", keyword: "oneOf", params: { passingSchemas: passing10 }, message: "must match exactly one schema in oneOf" };
            if (vErrors === null) {
              vErrors = [err116];
            } else {
              vErrors.push(err116);
            }
            errors++;
          } else {
            errors = _errs136;
            if (vErrors !== null) {
              if (_errs136) {
                vErrors.length = _errs136;
              } else {
                vErrors = null;
              }
            }
          }
        }
      } else {
        const err117 = { instancePath: instancePath + "/frontend_input", schemaPath: "#/properties/frontend_input/oneOf/1/type", keyword: "type", params: { type: "object" }, message: "must be object" };
        if (vErrors === null) {
          vErrors = [err117];
        } else {
          vErrors.push(err117);
        }
        errors++;
      }
      var _valid9 = _errs133 === errors;
      if (_valid9 && valid37) {
        valid37 = false;
        passing9 = [passing9, 1];
      } else {
        if (_valid9) {
          valid37 = true;
          passing9 = 1;
          var props7 = {};
          props7.turn_failure_signal = true;
        }
      }
      if (!valid37) {
        const err118 = { instancePath: instancePath + "/frontend_input", schemaPath: "#/properties/frontend_input/oneOf", keyword: "oneOf", params: { passingSchemas: passing9 }, message: "must match exactly one schema in oneOf" };
        if (vErrors === null) {
          vErrors = [err118];
        } else {
          vErrors.push(err118);
        }
        errors++;
      } else {
        errors = _errs130;
        if (vErrors !== null) {
          if (_errs130) {
            vErrors.length = _errs130;
          } else {
            vErrors = null;
          }
        }
      }
    }
    if (data.staff_console_input !== void 0) {
      let data44 = data.staff_console_input;
      if (!(data44 && typeof data44 == "object" && !Array.isArray(data44)) && data44 !== null) {
        const err119 = { instancePath: instancePath + "/staff_console_input", schemaPath: "#/properties/staff_console_input/type", keyword: "type", params: { type: schema50.properties.staff_console_input.type }, message: "must be object,null" };
        if (vErrors === null) {
          vErrors = [err119];
        } else {
          vErrors.push(err119);
        }
        errors++;
      }
    }
    if (data.dispatch_input !== void 0) {
      let data45 = data.dispatch_input;
      if (!(data45 && typeof data45 == "object" && !Array.isArray(data45)) && data45 !== null) {
        const err120 = { instancePath: instancePath + "/dispatch_input", schemaPath: "#/properties/dispatch_input/type", keyword: "type", params: { type: schema50.properties.dispatch_input.type }, message: "must be object,null" };
        if (vErrors === null) {
          vErrors = [err120];
        } else {
          vErrors.push(err120);
        }
        errors++;
      }
    }
    if (data.dispatch_output !== void 0) {
      let data46 = data.dispatch_output;
      if (!(data46 && typeof data46 == "object" && !Array.isArray(data46)) && data46 !== null) {
        const err121 = { instancePath: instancePath + "/dispatch_output", schemaPath: "#/properties/dispatch_output/type", keyword: "type", params: { type: schema50.properties.dispatch_output.type }, message: "must be object,null" };
        if (vErrors === null) {
          vErrors = [err121];
        } else {
          vErrors.push(err121);
        }
        errors++;
      }
    }
    if (data.orchestrator_output !== void 0) {
      let data47 = data.orchestrator_output;
      const _errs147 = errors;
      let valid40 = false;
      let passing11 = null;
      const _errs148 = errors;
      if (data47 !== null) {
        const err122 = { instancePath: instancePath + "/orchestrator_output", schemaPath: "#/properties/orchestrator_output/oneOf/0/type", keyword: "type", params: { type: "null" }, message: "must be null" };
        if (vErrors === null) {
          vErrors = [err122];
        } else {
          vErrors.push(err122);
        }
        errors++;
      }
      var _valid11 = _errs148 === errors;
      if (_valid11) {
        valid40 = true;
        passing11 = 0;
      }
      const _errs150 = errors;
      if (!validate36(data47, { instancePath: instancePath + "/orchestrator_output", parentData: data, parentDataProperty: "orchestrator_output", rootData, dynamicAnchors })) {
        vErrors = vErrors === null ? validate36.errors : vErrors.concat(validate36.errors);
        errors = vErrors.length;
      }
      var _valid11 = _errs150 === errors;
      if (_valid11 && valid40) {
        valid40 = false;
        passing11 = [passing11, 1];
      } else {
        if (_valid11) {
          valid40 = true;
          passing11 = 1;
          var props8 = {};
          props8.turn_failure_signal = true;
          props8.intervention_result = true;
          props8.log_entry = true;
        }
      }
      if (!valid40) {
        const err123 = { instancePath: instancePath + "/orchestrator_output", schemaPath: "#/properties/orchestrator_output/oneOf", keyword: "oneOf", params: { passingSchemas: passing11 }, message: "must match exactly one schema in oneOf" };
        if (vErrors === null) {
          vErrors = [err123];
        } else {
          vErrors.push(err123);
        }
        errors++;
      } else {
        errors = _errs147;
        if (vErrors !== null) {
          if (_errs147) {
            vErrors.length = _errs147;
          } else {
            vErrors = null;
          }
        }
      }
    }
    if (data.session_before !== void 0) {
      let data48 = data.session_before;
      if (!(data48 && typeof data48 == "object" && !Array.isArray(data48)) && data48 !== null) {
        const err124 = { instancePath: instancePath + "/session_before", schemaPath: "#/properties/session_before/type", keyword: "type", params: { type: schema50.properties.session_before.type }, message: "must be object,null" };
        if (vErrors === null) {
          vErrors = [err124];
        } else {
          vErrors.push(err124);
        }
        errors++;
      }
    }
    if (data.session_after !== void 0) {
      let data49 = data.session_after;
      if (!(data49 && typeof data49 == "object" && !Array.isArray(data49)) && data49 !== null) {
        const err125 = { instancePath: instancePath + "/session_after", schemaPath: "#/properties/session_after/type", keyword: "type", params: { type: schema50.properties.session_after.type }, message: "must be object,null" };
        if (vErrors === null) {
          vErrors = [err125];
        } else {
          vErrors.push(err125);
        }
        errors++;
      }
    }
    if (data.log_entry !== void 0) {
      let data50 = data.log_entry;
      const _errs156 = errors;
      let valid41 = false;
      let passing12 = null;
      const _errs157 = errors;
      if (data50 !== null) {
        const err126 = { instancePath: instancePath + "/log_entry", schemaPath: "#/properties/log_entry/oneOf/0/type", keyword: "type", params: { type: "null" }, message: "must be null" };
        if (vErrors === null) {
          vErrors = [err126];
        } else {
          vErrors.push(err126);
        }
        errors++;
      }
      var _valid12 = _errs157 === errors;
      if (_valid12) {
        valid41 = true;
        passing12 = 0;
      }
      const _errs159 = errors;
      if (!validate38(data50, { instancePath: instancePath + "/log_entry", parentData: data, parentDataProperty: "log_entry", rootData, dynamicAnchors })) {
        vErrors = vErrors === null ? validate38.errors : vErrors.concat(validate38.errors);
        errors = vErrors.length;
      }
      var _valid12 = _errs159 === errors;
      if (_valid12 && valid41) {
        valid41 = false;
        passing12 = [passing12, 1];
      } else {
        if (_valid12) {
          valid41 = true;
          passing12 = 1;
          var props9 = {};
          props9.turn_result = true;
          props9.staff_alert_delivery = true;
          props9.turn_failure_signal = true;
        }
      }
      if (!valid41) {
        const err127 = { instancePath: instancePath + "/log_entry", schemaPath: "#/properties/log_entry/oneOf", keyword: "oneOf", params: { passingSchemas: passing12 }, message: "must match exactly one schema in oneOf" };
        if (vErrors === null) {
          vErrors = [err127];
        } else {
          vErrors.push(err127);
        }
        errors++;
      } else {
        errors = _errs156;
        if (vErrors !== null) {
          if (_errs156) {
            vErrors.length = _errs156;
          } else {
            vErrors = null;
          }
        }
      }
    }
    if (data.persistence_load_request !== void 0) {
      let data51 = data.persistence_load_request;
      if (!(data51 && typeof data51 == "object" && !Array.isArray(data51)) && data51 !== null) {
        const err128 = { instancePath: instancePath + "/persistence_load_request", schemaPath: "#/properties/persistence_load_request/type", keyword: "type", params: { type: schema50.properties.persistence_load_request.type }, message: "must be object,null" };
        if (vErrors === null) {
          vErrors = [err128];
        } else {
          vErrors.push(err128);
        }
        errors++;
      }
    }
    if (data.persistence_load_result !== void 0) {
      let data52 = data.persistence_load_result;
      if (!(data52 && typeof data52 == "object" && !Array.isArray(data52)) && data52 !== null) {
        const err129 = { instancePath: instancePath + "/persistence_load_result", schemaPath: "#/properties/persistence_load_result/type", keyword: "type", params: { type: schema50.properties.persistence_load_result.type }, message: "must be object,null" };
        if (vErrors === null) {
          vErrors = [err129];
        } else {
          vErrors.push(err129);
        }
        errors++;
      }
    }
    if (data.persistence_commit_request !== void 0) {
      let data53 = data.persistence_commit_request;
      if (!(data53 && typeof data53 == "object" && !Array.isArray(data53)) && data53 !== null) {
        const err130 = { instancePath: instancePath + "/persistence_commit_request", schemaPath: "#/properties/persistence_commit_request/type", keyword: "type", params: { type: schema50.properties.persistence_commit_request.type }, message: "must be object,null" };
        if (vErrors === null) {
          vErrors = [err130];
        } else {
          vErrors.push(err130);
        }
        errors++;
      }
    }
    if (data.persistence_commit_result !== void 0) {
      let data54 = data.persistence_commit_result;
      const _errs167 = errors;
      let valid42 = false;
      let passing13 = null;
      const _errs168 = errors;
      if (data54 !== null) {
        const err131 = { instancePath: instancePath + "/persistence_commit_result", schemaPath: "#/properties/persistence_commit_result/oneOf/0/type", keyword: "type", params: { type: "null" }, message: "must be null" };
        if (vErrors === null) {
          vErrors = [err131];
        } else {
          vErrors.push(err131);
        }
        errors++;
      }
      var _valid13 = _errs168 === errors;
      if (_valid13) {
        valid42 = true;
        passing13 = 0;
      }
      const _errs170 = errors;
      if (data54 && typeof data54 == "object" && !Array.isArray(data54)) {
        if (data54.session_id !== void 0) {
          let data55 = data54.session_id;
          if (typeof data55 === "string") {
            if (!pattern19.test(data55)) {
              const err132 = { instancePath: instancePath + "/persistence_commit_result/session_id", schemaPath: "#/$defs/Pseudonym/pattern", keyword: "pattern", params: { pattern: "^p-[0-9a-f]{32}$" }, message: 'must match pattern "^p-[0-9a-f]{32}$"' };
              if (vErrors === null) {
                vErrors = [err132];
              } else {
                vErrors.push(err132);
              }
              errors++;
            }
          } else {
            const err133 = { instancePath: instancePath + "/persistence_commit_result/session_id", schemaPath: "#/$defs/Pseudonym/type", keyword: "type", params: { type: "string" }, message: "must be string" };
            if (vErrors === null) {
              vErrors = [err133];
            } else {
              vErrors.push(err133);
            }
            errors++;
          }
        }
        if (data54.status !== void 0) {
          let data56 = data54.status;
          if (!(data56 === "OK" || data56 === "REVISION_CONFLICT" || data56 === "DB_ERROR")) {
            const err134 = { instancePath: instancePath + "/persistence_commit_result/status", schemaPath: "#/properties/persistence_commit_result/oneOf/1/properties/status/enum", keyword: "enum", params: { allowedValues: schema50.properties.persistence_commit_result.oneOf[1].properties.status.enum }, message: "must be equal to one of the allowed values" };
            if (vErrors === null) {
              vErrors = [err134];
            } else {
              vErrors.push(err134);
            }
            errors++;
          }
        }
        if (data54.write_outcome !== void 0) {
          let data57 = data54.write_outcome;
          if (!(data57 === "APPLIED" || data57 === "NOT_APPLIED" || data57 === "UNKNOWN")) {
            const err135 = { instancePath: instancePath + "/persistence_commit_result/write_outcome", schemaPath: "#/properties/persistence_commit_result/oneOf/1/properties/write_outcome/enum", keyword: "enum", params: { allowedValues: schema50.properties.persistence_commit_result.oneOf[1].properties.write_outcome.enum }, message: "must be equal to one of the allowed values" };
            if (vErrors === null) {
              vErrors = [err135];
            } else {
              vErrors.push(err135);
            }
            errors++;
          }
        }
      } else {
        const err136 = { instancePath: instancePath + "/persistence_commit_result", schemaPath: "#/properties/persistence_commit_result/oneOf/1/type", keyword: "type", params: { type: "object" }, message: "must be object" };
        if (vErrors === null) {
          vErrors = [err136];
        } else {
          vErrors.push(err136);
        }
        errors++;
      }
      var _valid13 = _errs170 === errors;
      if (_valid13 && valid42) {
        valid42 = false;
        passing13 = [passing13, 1];
      } else {
        if (_valid13) {
          valid42 = true;
          passing13 = 1;
          var props10 = {};
          props10.session_id = true;
          props10.status = true;
          props10.write_outcome = true;
        }
      }
      if (!valid42) {
        const err137 = { instancePath: instancePath + "/persistence_commit_result", schemaPath: "#/properties/persistence_commit_result/oneOf", keyword: "oneOf", params: { passingSchemas: passing13 }, message: "must match exactly one schema in oneOf" };
        if (vErrors === null) {
          vErrors = [err137];
        } else {
          vErrors.push(err137);
        }
        errors++;
      } else {
        errors = _errs167;
        if (vErrors !== null) {
          if (_errs167) {
            vErrors.length = _errs167;
          } else {
            vErrors = null;
          }
        }
      }
    }
  } else {
    const err138 = { instancePath, schemaPath: "#/type", keyword: "type", params: { type: "object" }, message: "must be object" };
    if (vErrors === null) {
      vErrors = [err138];
    } else {
      vErrors.push(err138);
    }
    errors++;
  }
  validate30.errors = vErrors;
  return errors === 0;
}
validate30.evaluated = { "props": true, "dynamicProps": false, "dynamicItems": false };
exports.OpsFeedbackDeidentifiedTrace = validate43;
var schema75 = { "$schema": "https://json-schema.org/draft/2020-12/schema", "$id": "OpsFeedbackDeidentifiedTrace.schema.json", "title": "OpsFeedbackDeidentifiedTrace", "description": 'I7 `GET /v1/deidentified-traces/{ref}`(`get_trace`)\uAC00 \uB3CC\uB824\uC8FC\uB294 \uBE44\uC2DD\uBCC4 TurnTrace. \uC815\uBCF8\uC774\uB2E4: admin-console(\uC0AC\uB840 \uD654\uBA74)\uACFC model-lab(\uD68C\uADC0 \uD3C9\uAC00)\uC740 \uC774 \uC2A4\uD0A4\uB9C8\uB97C \uC77D\uACE0 \uC77D\uB294 \uCABD \uBD80\uBD84\uC9D1\uD569 \uC2A4\uD0A4\uB9C8\uB97C \uB530\uB85C \uB450\uC9C0 \uC54A\uB294\uB2E4. \uACC4\uC57D `TraceEnvelope`\uC640\uC758 \uAD00\uACC4: \uAC19\uC740 \uAC83\uC774 \uC544\uB2C8\uB2E4. `TraceEnvelope.trace`(\uBB38\uC9C4 \uC2A4\uD0A4\uB9C8 `TurnTrace`)\uC5D0\uC11C ops-feedback \uBE44\uC2DD\uBCC4 \uCC98\uB9AC\uAE30\uAC00 \uB9CC\uB4E0 \uBE44\uC2DD\uBCC4 \uBDF0\uC774\uACE0 \uBD09\uD22C \uD544\uB4DC(pipeline_schema_version, release_id, runtime_contract_version, sent_at, ext)\uB294 \uC5C6\uB2E4. \uB9B4\uB9AC\uC2A4\uB294 `FailureCase.source_release_id`, \uBB38\uC9C4 \uC2A4\uD0A4\uB9C8 \uBC84\uC804\uC740 `contract_version`\uC5D0 \uC788\uB2E4. \uB9CC\uB4DC\uB294 \uCABD: ops-feedback \uBE44\uC2DD\uBCC4 \uCC98\uB9AC\uAE30. \uC77D\uB294 \uCABD: admin-console, model-lab, synthetic-data, \uBB38\uD56D \uC800\uC791(I7 \uC18C\uBE44\uC790). \uCD5C\uC0C1\uC704 \uD0A4\uB294 `TurnTrace`(contract_version 1)\uC640 \uAC19\uACE0(29\uAC1C \uD544\uC218 + `turn_index` \uC120\uD0DD) \uBAA8\uB974\uB294 \uCD5C\uC0C1\uC704 \uD0A4\uB294 \uAC70\uBD80\uD55C\uB2E4(\uD5C8\uC6A9 \uBAA9\uB85D \uBC29\uC2DD\uC774\uB77C \uBAA8\uB974\uB294 \uD0A4\uB294 \uC774\uBBF8 \uC81C\uAC70\uB418\uC5B4 \uC788\uB2E4). \uC548\uCABD \uAC1D\uCCB4\uB294 \uBE44\uC2DD\uBCC4\uC774 \uBCF4\uC7A5\uD558\uB294 \uAC83\uB9CC \uC801\uB294\uB2E4: (1) \uC790\uC720 \uBB38\uC790\uC5F4 \uC78E\uC740 "[MASKED]"/"[DROPPED]"\uC774\uAC70\uB098 keep \uD0A4\uC758 \uC2DD\uBCC4\uC790 \uBAA8\uC591 \uAC12\uC774\uB2E4, (2) session_id/turn_id(\uC5B4\uB514\uC5D0 \uB098\uC624\uB4E0)\uB294 \uC758\uC0AC \uC2DD\uBCC4\uC790 p-<32 hex>\uC774\uB2E4, (3) \uAD6C\uC870 \uC5C6\uB294 \uC790\uC720 \uAC1D\uCCB4(extract_input.state, response_input.next \uB4F1)\uB294 \uBE44\uC6CC\uC9C4\uB2E4. \uC2E4\uD328 \uC0AC\uB840 \uD654\uBA74\uACFC \uADDC\uCE59 \uD0D0\uC9C0\uAC00 \uC77D\uB294 \uC548\uCABD \uD544\uB4DC(turn_failure_signal, log_entry.turn_result, intervention_result, persistence_commit_result)\uB9CC \uC815\uBC00\uD558\uAC8C \uC801\uACE0 \uB098\uBA38\uC9C0 \uC548\uCABD \uAC1D\uCCB4\uB294 object \uB610\uB294 null\uB85C\uB9CC \uAC80\uC0AC\uD55C\uB2E4(\uBB38\uC9C4 \uC2A4\uD0A4\uB9C8 \uBCF5\uC0AC\uBCF8\uC744 \uB9CC\uB4E4\uC9C0 \uC54A\uAE30 \uC704\uD574). \uBC1C\uD654 \uBB38\uC7A5 \uBCF4\uC874 \uBC94\uC704\uB294 \uC0AC\uC6A9\uC790 \uACB0\uC815(O19) \uC804\uC774\uB77C \uAE30\uBCF8 \uC815\uCC45\uC5D0\uC11C \uC790\uC720 \uBB38\uC7A5\uC740 \uBAA8\uB450 \uB9C8\uC2A4\uD0B9\uB41C\uB2E4. \uC774\uC6C3 \uCABD \uBBF8\uD655\uC778: admin-console\uC774 \uD654\uBA74\uC5D0 \uC4F0\uB294 \uD544\uB4DC \uBAA9\uB85D\uACFC model-lab \uD68C\uADC0 \uD3C9\uAC00\uAC00 \uC4F0\uB294 \uD544\uB4DC \uBAA9\uB85D\uC740 \uC774 \uC601\uC5ED\uC774 \uC77D\uC9C0 \uBABB\uD588\uB2E4. \uCD5C\uC0C1\uC704 29\uAC1C \uD544\uB4DC\uAC00 \uBAA8\uB450 \uC788\uC73C\uBBC0\uB85C \uC5B4\uB5A4 \uD544\uB4DC\uB97C \uC77D\uB4E0 \uC790\uB9AC\uB294 \uC788\uC73C\uB098, \uB9C8\uC2A4\uD0B9\uB41C \uAC12\uC73C\uB85C \uD68C\uADC0 \uD3C9\uAC00\uAC00 \uC131\uB9BD\uD558\uB294\uC9C0\uB294 \uD655\uC778\uD558\uC9C0 \uBABB\uD588\uB2E4.', "x-producers": ["ops-feedback"], "x-consumers": ["admin-console", "model-lab"], "type": "object", "additionalProperties": false, "required": ["session_id", "turn_id", "contract_version", "frontend_message", "intervention_decision", "orchestrator_input", "extract_input", "extract_output", "extract_attempts", "extract_status", "extract_protections", "validation_ok", "validation_violations", "response_input", "response_output", "response_outcome", "response_protections", "frontend_input", "staff_console_input", "dispatch_input", "dispatch_output", "orchestrator_output", "session_before", "session_after", "log_entry", "persistence_load_request", "persistence_load_result", "persistence_commit_request", "persistence_commit_result"], "properties": { "session_id": { "$ref": "#/$defs/Pseudonym" }, "turn_id": { "$ref": "#/$defs/Pseudonym" }, "contract_version": { "type": "integer", "minimum": 1 }, "turn_index": { "type": "integer", "minimum": 0 }, "frontend_message": { "oneOf": [{ "type": "null" }, { "type": "object", "required": ["session_id", "kind"], "properties": { "session_id": { "$ref": "#/$defs/Pseudonym" }, "kind": { "enum": ["SESSION_START", "UTTERANCE", "SESSION_END"] }, "utterance": { "$ref": "#/$defs/Redacted" } }, "additionalProperties": false }] }, "extract_input": { "oneOf": [{ "type": "null" }, { "type": "object", "required": ["question_id", "current_question", "user_utterance", "state"], "properties": { "question_id": { "$ref": "#/$defs/Ident" }, "current_question": { "$ref": "#/$defs/Redacted" }, "user_utterance": { "$ref": "#/$defs/Redacted" }, "state": { "type": "object" } } }] }, "extract_output": { "oneOf": [{ "type": "null" }, { "type": "object", "properties": { "values": { "type": "array", "items": { "type": "object", "properties": { "key": { "$ref": "#/$defs/Redacted" }, "value": { "$ref": "#/$defs/Redacted" }, "precision": { "$ref": "#/$defs/Redacted" }, "status": { "$ref": "#/$defs/Redacted" }, "save": { "type": "boolean" } } } }, "action": { "type": "string", "pattern": "^[A-Z][A-Z0-9_]{0,31}$|^\\[MASKED\\]$" }, "next_item": { "oneOf": [{ "type": "null" }, { "$ref": "#/$defs/Ident" }] }, "reason": { "$ref": "#/$defs/Redacted" }, "note": { "$ref": "#/$defs/Redacted" }, "targets": { "type": "array" } } }] }, "extract_attempts": { "oneOf": [{ "type": "null" }, { "type": "integer", "minimum": 1, "maximum": 2 }] }, "extract_status": { "enum": ["OK", "OUTPUT_INVALID", "VIOLATION", "ERROR", null] }, "extract_protections": { "$ref": "#/$defs/CountMap" }, "validation_ok": { "type": ["boolean", "null"] }, "validation_violations": { "type": ["array", "null"] }, "response_input": { "oneOf": [{ "type": "null" }, { "type": "object", "required": ["action", "topic", "next"], "properties": { "action": { "type": "string" }, "topic": { "$ref": "#/$defs/Redacted" }, "next": { "type": "object" } } }] }, "response_output": { "oneOf": [{ "type": "null" }, { "$ref": "#/$defs/Redacted" }] }, "response_outcome": { "enum": ["ok", "fallback", "fixed", null] }, "response_protections": { "$ref": "#/$defs/CountMap" }, "intervention_decision": { "type": ["object", "null"] }, "orchestrator_input": { "type": ["object", "null"] }, "frontend_input": { "oneOf": [{ "type": "null" }, { "type": "object", "properties": { "turn_failure_signal": { "oneOf": [{ "type": "null" }, { "$ref": "#/$defs/TurnFailureSignal" }] } } }] }, "staff_console_input": { "type": ["object", "null"] }, "dispatch_input": { "type": ["object", "null"] }, "dispatch_output": { "type": ["object", "null"] }, "orchestrator_output": { "oneOf": [{ "type": "null" }, { "$ref": "#/$defs/OrchestratorOutputView" }] }, "session_before": { "type": ["object", "null"] }, "session_after": { "type": ["object", "null"] }, "log_entry": { "oneOf": [{ "type": "null" }, { "$ref": "#/$defs/LogEntryView" }] }, "persistence_load_request": { "type": ["object", "null"] }, "persistence_load_result": { "type": ["object", "null"] }, "persistence_commit_request": { "type": ["object", "null"] }, "persistence_commit_result": { "oneOf": [{ "type": "null" }, { "type": "object", "properties": { "session_id": { "$ref": "#/$defs/Pseudonym" }, "status": { "enum": ["OK", "REVISION_CONFLICT", "DB_ERROR"] }, "write_outcome": { "enum": ["APPLIED", "NOT_APPLIED", "UNKNOWN"] } } }] } }, "$defs": { "Pseudonym": { "type": "string", "pattern": "^p-[0-9a-f]{32}$", "description": "HMAC-SHA256(\uD0A4=salt, \uBA54\uC2DC\uC9C0=JCS({key,value}))\uC758 \uC55E 128\uBE44\uD2B8 16\uC9C4 32\uC790(ADR 0016). \uAC19\uC740 salt\xB7\uD0A4\xB7\uAC12\uC774\uBA74 \uAC19\uB2E4. salt\uB294 \uC774 \uC601\uC5ED\uB9CC \uC548\uB2E4. \uC18C\uBE44\uC790\uB294 \uC6D0 \uAC12\uC73C\uB85C \uB418\uB3CC\uB9B4 \uC218 \uC5C6\uACE0 \uB418\uB3CC\uB9AC\uB824 \uD574\uC11C\uB3C4 \uC548 \uB41C\uB2E4. salt\uB97C \uBC14\uAFB8\uBA74 \uAC12\uC774 \uBAA8\uB450 \uB2EC\uB77C\uC9C4\uB2E4(ADR 0017)." }, "Redacted": { "enum": ["[MASKED]", "[DROPPED]"], "description": "\uC790\uC720 \uBB38\uC790\uC5F4 \uC78E\uC758 \uBE44\uC2DD\uBCC4 \uACB0\uACFC. \uC815\uCC45 unlisted_string_action\uC774 mask\uBA74 [MASKED], drop\uC774\uBA74 \uD0A4\uB97C \uC9C0\uC6B0\uAC70\uB098 [DROPPED]. \uC81C\uC548: \uC18C\uBE44\uC790\uB294 \uC774 \uAC12\uC744 \uB0B4\uC6A9\uC73C\uB85C \uC4F0\uC9C0 \uC54A\uB294\uB2E4." }, "Ident": { "type": "string", "pattern": "^([A-Za-z0-9][A-Za-z0-9_.\\-]{0,63}|\\[MASKED\\])$", "description": "keep \uD0A4\uC758 \uC2DD\uBCC4\uC790 \uBAA8\uC591 \uAC12(\uBB38\uD56D ID \uB4F1). \uD328\uD134\uC5D0 \uB9DE\uC9C0 \uC54A\uC73C\uBA74 \uB9C8\uC2A4\uD0B9\uB41C\uB2E4." }, "CountMap": { "oneOf": [{ "type": "null" }, { "type": "object", "propertyNames": { "pattern": "^[A-Z][A-Z0-9_]{0,31}$" }, "additionalProperties": { "type": "integer", "minimum": 0 } }], "description": "\uADDC\uCE59 \uCF54\uB4DC -> \uAC74\uC218. \uC815\uCC45\uC774 keep_count_map_keys\uB85C \uD5C8\uC6A9\uD558\uC9C0 \uC54A\uC73C\uBA74 {} \uB610\uB294 \uC81C\uAC70" }, "TurnFailureSignal": { "type": "object", "description": "\uC815\uC9C0\xB7\uC54C\uB9BC \uC2E0\uD638. pause_reason\uC740 \uACC4\uC57D 2.1.0 \uC774\uD6C4 optional(\uC5C6\uC73C\uBA74 \uBBF8\uC0C1, \uBAA8\uB974\uB294 \uAC12\uC740 \uC77D\uB294 \uCABD\uC774 OTHER\uB85C \uCDE8\uAE09). \uBE44\uC2DD\uBCC4 \uC815\uCC45 keep_pause_reason\uC774 \uAEBC\uC838 \uC788\uC73C\uBA74 \uC5C6\uB2E4.", "properties": { "session_id": { "$ref": "#/$defs/Pseudonym" }, "write_committed": { "enum": ["COMMITTED", "NOT_COMMITTED"] }, "staff_alert": { "enum": ["NONE", "DELIVERED", "DELIVERY_FAILED"] }, "pause_reason": { "enum": ["RISK", "REASK_LIMIT", "OTHER"] } } }, "LogEntryView": { "type": "object", "description": "log_entry\uC758 \uC77C\uBD80. \uB098\uBA38\uC9C0 \uD0A4\uB294 \uAC80\uC0AC\uD558\uC9C0 \uC54A\uB294\uB2E4.", "properties": { "turn_result": { "oneOf": [{ "const": "COMMITTED" }, { "const": "NOT_APPLICABLE" }, { "type": "object", "required": ["failed_steps"], "properties": { "failed_steps": { "type": "array", "minItems": 1, "items": { "type": "object", "required": ["phase", "step"], "properties": { "phase": { "enum": ["BEFORE_COMMIT", "AFTER_COMMIT"] }, "step": { "enum": ["LoRA-A", "VALIDATE", "COMMIT", "DELIVER_STAFF", "LoRA-B", "DELIVER_FRONT"] } } } } } }] }, "staff_alert_delivery": { "enum": ["SUCCESS", "FAILURE", "NOT_APPLICABLE"] }, "turn_failure_signal": { "oneOf": [{ "type": "null" }, { "$ref": "#/$defs/TurnFailureSignal" }] } } }, "OrchestratorOutputView": { "type": "object", "description": "orchestrator_output\uC758 \uC77C\uBD80. \uB098\uBA38\uC9C0 \uD0A4\uB294 \uAC80\uC0AC\uD558\uC9C0 \uC54A\uB294\uB2E4.", "properties": { "turn_failure_signal": { "oneOf": [{ "type": "null" }, { "$ref": "#/$defs/TurnFailureSignal" }] }, "intervention_result": { "oneOf": [{ "type": "null" }, { "type": "object", "properties": { "session_id": { "$ref": "#/$defs/Pseudonym" }, "result": { "enum": ["APPLIED", "IGNORED", "FAILED"] } } }] }, "log_entry": { "oneOf": [{ "type": "null" }, { "$ref": "#/$defs/LogEntryView" }] } } } } };
var schema79 = { "enum": ["[MASKED]", "[DROPPED]"], "description": "\uC790\uC720 \uBB38\uC790\uC5F4 \uC78E\uC758 \uBE44\uC2DD\uBCC4 \uACB0\uACFC. \uC815\uCC45 unlisted_string_action\uC774 mask\uBA74 [MASKED], drop\uC774\uBA74 \uD0A4\uB97C \uC9C0\uC6B0\uAC70\uB098 [DROPPED]. \uC81C\uC548: \uC18C\uBE44\uC790\uB294 \uC774 \uAC12\uC744 \uB0B4\uC6A9\uC73C\uB85C \uC4F0\uC9C0 \uC54A\uB294\uB2E4." };
var schema94 = { "type": "object", "description": "\uC815\uC9C0\xB7\uC54C\uB9BC \uC2E0\uD638. pause_reason\uC740 \uACC4\uC57D 2.1.0 \uC774\uD6C4 optional(\uC5C6\uC73C\uBA74 \uBBF8\uC0C1, \uBAA8\uB974\uB294 \uAC12\uC740 \uC77D\uB294 \uCABD\uC774 OTHER\uB85C \uCDE8\uAE09). \uBE44\uC2DD\uBCC4 \uC815\uCC45 keep_pause_reason\uC774 \uAEBC\uC838 \uC788\uC73C\uBA74 \uC5C6\uB2E4.", "properties": { "session_id": { "$ref": "#/$defs/Pseudonym" }, "write_committed": { "enum": ["COMMITTED", "NOT_COMMITTED"] }, "staff_alert": { "enum": ["NONE", "DELIVERED", "DELIVERY_FAILED"] }, "pause_reason": { "enum": ["RISK", "REASK_LIMIT", "OTHER"] } } };
function validate44(data, { instancePath = "", parentData, parentDataProperty, rootData = data, dynamicAnchors = {} } = {}) {
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
    if (data.session_id !== void 0) {
      let data0 = data.session_id;
      if (typeof data0 === "string") {
        if (!pattern19.test(data0)) {
          const err0 = { instancePath: instancePath + "/session_id", schemaPath: "#/$defs/Pseudonym/pattern", keyword: "pattern", params: { pattern: "^p-[0-9a-f]{32}$" }, message: 'must match pattern "^p-[0-9a-f]{32}$"' };
          if (vErrors === null) {
            vErrors = [err0];
          } else {
            vErrors.push(err0);
          }
          errors++;
        }
      } else {
        const err1 = { instancePath: instancePath + "/session_id", schemaPath: "#/$defs/Pseudonym/type", keyword: "type", params: { type: "string" }, message: "must be string" };
        if (vErrors === null) {
          vErrors = [err1];
        } else {
          vErrors.push(err1);
        }
        errors++;
      }
    }
    if (data.write_committed !== void 0) {
      let data1 = data.write_committed;
      if (!(data1 === "COMMITTED" || data1 === "NOT_COMMITTED")) {
        const err2 = { instancePath: instancePath + "/write_committed", schemaPath: "#/properties/write_committed/enum", keyword: "enum", params: { allowedValues: schema94.properties.write_committed.enum }, message: "must be equal to one of the allowed values" };
        if (vErrors === null) {
          vErrors = [err2];
        } else {
          vErrors.push(err2);
        }
        errors++;
      }
    }
    if (data.staff_alert !== void 0) {
      let data2 = data.staff_alert;
      if (!(data2 === "NONE" || data2 === "DELIVERED" || data2 === "DELIVERY_FAILED")) {
        const err3 = { instancePath: instancePath + "/staff_alert", schemaPath: "#/properties/staff_alert/enum", keyword: "enum", params: { allowedValues: schema94.properties.staff_alert.enum }, message: "must be equal to one of the allowed values" };
        if (vErrors === null) {
          vErrors = [err3];
        } else {
          vErrors.push(err3);
        }
        errors++;
      }
    }
    if (data.pause_reason !== void 0) {
      let data3 = data.pause_reason;
      if (!(data3 === "RISK" || data3 === "REASK_LIMIT" || data3 === "OTHER")) {
        const err4 = { instancePath: instancePath + "/pause_reason", schemaPath: "#/properties/pause_reason/enum", keyword: "enum", params: { allowedValues: schema94.properties.pause_reason.enum }, message: "must be equal to one of the allowed values" };
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
  validate44.errors = vErrors;
  return errors === 0;
}
validate44.evaluated = { "props": { "session_id": true, "write_committed": true, "staff_alert": true, "pause_reason": true }, "dynamicProps": false, "dynamicItems": false };
var schema96 = { "type": "object", "description": "orchestrator_output\uC758 \uC77C\uBD80. \uB098\uBA38\uC9C0 \uD0A4\uB294 \uAC80\uC0AC\uD558\uC9C0 \uC54A\uB294\uB2E4.", "properties": { "turn_failure_signal": { "oneOf": [{ "type": "null" }, { "$ref": "#/$defs/TurnFailureSignal" }] }, "intervention_result": { "oneOf": [{ "type": "null" }, { "type": "object", "properties": { "session_id": { "$ref": "#/$defs/Pseudonym" }, "result": { "enum": ["APPLIED", "IGNORED", "FAILED"] } } }] }, "log_entry": { "oneOf": [{ "type": "null" }, { "$ref": "#/$defs/LogEntryView" }] } } };
var schema98 = { "type": "object", "description": "log_entry\uC758 \uC77C\uBD80. \uB098\uBA38\uC9C0 \uD0A4\uB294 \uAC80\uC0AC\uD558\uC9C0 \uC54A\uB294\uB2E4.", "properties": { "turn_result": { "oneOf": [{ "const": "COMMITTED" }, { "const": "NOT_APPLICABLE" }, { "type": "object", "required": ["failed_steps"], "properties": { "failed_steps": { "type": "array", "minItems": 1, "items": { "type": "object", "required": ["phase", "step"], "properties": { "phase": { "enum": ["BEFORE_COMMIT", "AFTER_COMMIT"] }, "step": { "enum": ["LoRA-A", "VALIDATE", "COMMIT", "DELIVER_STAFF", "LoRA-B", "DELIVER_FRONT"] } } } } } }] }, "staff_alert_delivery": { "enum": ["SUCCESS", "FAILURE", "NOT_APPLICABLE"] }, "turn_failure_signal": { "oneOf": [{ "type": "null" }, { "$ref": "#/$defs/TurnFailureSignal" }] } } };
function validate48(data, { instancePath = "", parentData, parentDataProperty, rootData = data, dynamicAnchors = {} } = {}) {
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
    if (data.turn_result !== void 0) {
      let data0 = data.turn_result;
      const _errs2 = errors;
      let valid1 = false;
      let passing0 = null;
      const _errs3 = errors;
      if ("COMMITTED" !== data0) {
        const err0 = { instancePath: instancePath + "/turn_result", schemaPath: "#/properties/turn_result/oneOf/0/const", keyword: "const", params: { allowedValue: "COMMITTED" }, message: "must be equal to constant" };
        if (vErrors === null) {
          vErrors = [err0];
        } else {
          vErrors.push(err0);
        }
        errors++;
      }
      var _valid0 = _errs3 === errors;
      if (_valid0) {
        valid1 = true;
        passing0 = 0;
      }
      const _errs4 = errors;
      if ("NOT_APPLICABLE" !== data0) {
        const err1 = { instancePath: instancePath + "/turn_result", schemaPath: "#/properties/turn_result/oneOf/1/const", keyword: "const", params: { allowedValue: "NOT_APPLICABLE" }, message: "must be equal to constant" };
        if (vErrors === null) {
          vErrors = [err1];
        } else {
          vErrors.push(err1);
        }
        errors++;
      }
      var _valid0 = _errs4 === errors;
      if (_valid0 && valid1) {
        valid1 = false;
        passing0 = [passing0, 1];
      } else {
        if (_valid0) {
          valid1 = true;
          passing0 = 1;
        }
        const _errs5 = errors;
        if (data0 && typeof data0 == "object" && !Array.isArray(data0)) {
          if (data0.failed_steps === void 0) {
            const err2 = { instancePath: instancePath + "/turn_result", schemaPath: "#/properties/turn_result/oneOf/2/required", keyword: "required", params: { missingProperty: "failed_steps" }, message: "must have required property 'failed_steps'" };
            if (vErrors === null) {
              vErrors = [err2];
            } else {
              vErrors.push(err2);
            }
            errors++;
          }
          if (data0.failed_steps !== void 0) {
            let data1 = data0.failed_steps;
            if (Array.isArray(data1)) {
              if (data1.length < 1) {
                const err3 = { instancePath: instancePath + "/turn_result/failed_steps", schemaPath: "#/properties/turn_result/oneOf/2/properties/failed_steps/minItems", keyword: "minItems", params: { limit: 1 }, message: "must NOT have fewer than 1 items" };
                if (vErrors === null) {
                  vErrors = [err3];
                } else {
                  vErrors.push(err3);
                }
                errors++;
              }
              const len0 = data1.length;
              for (let i0 = 0; i0 < len0; i0++) {
                let data2 = data1[i0];
                if (data2 && typeof data2 == "object" && !Array.isArray(data2)) {
                  if (data2.phase === void 0) {
                    const err4 = { instancePath: instancePath + "/turn_result/failed_steps/" + i0, schemaPath: "#/properties/turn_result/oneOf/2/properties/failed_steps/items/required", keyword: "required", params: { missingProperty: "phase" }, message: "must have required property 'phase'" };
                    if (vErrors === null) {
                      vErrors = [err4];
                    } else {
                      vErrors.push(err4);
                    }
                    errors++;
                  }
                  if (data2.step === void 0) {
                    const err5 = { instancePath: instancePath + "/turn_result/failed_steps/" + i0, schemaPath: "#/properties/turn_result/oneOf/2/properties/failed_steps/items/required", keyword: "required", params: { missingProperty: "step" }, message: "must have required property 'step'" };
                    if (vErrors === null) {
                      vErrors = [err5];
                    } else {
                      vErrors.push(err5);
                    }
                    errors++;
                  }
                  if (data2.phase !== void 0) {
                    let data3 = data2.phase;
                    if (!(data3 === "BEFORE_COMMIT" || data3 === "AFTER_COMMIT")) {
                      const err6 = { instancePath: instancePath + "/turn_result/failed_steps/" + i0 + "/phase", schemaPath: "#/properties/turn_result/oneOf/2/properties/failed_steps/items/properties/phase/enum", keyword: "enum", params: { allowedValues: schema98.properties.turn_result.oneOf[2].properties.failed_steps.items.properties.phase.enum }, message: "must be equal to one of the allowed values" };
                      if (vErrors === null) {
                        vErrors = [err6];
                      } else {
                        vErrors.push(err6);
                      }
                      errors++;
                    }
                  }
                  if (data2.step !== void 0) {
                    let data4 = data2.step;
                    if (!(data4 === "LoRA-A" || data4 === "VALIDATE" || data4 === "COMMIT" || data4 === "DELIVER_STAFF" || data4 === "LoRA-B" || data4 === "DELIVER_FRONT")) {
                      const err7 = { instancePath: instancePath + "/turn_result/failed_steps/" + i0 + "/step", schemaPath: "#/properties/turn_result/oneOf/2/properties/failed_steps/items/properties/step/enum", keyword: "enum", params: { allowedValues: schema98.properties.turn_result.oneOf[2].properties.failed_steps.items.properties.step.enum }, message: "must be equal to one of the allowed values" };
                      if (vErrors === null) {
                        vErrors = [err7];
                      } else {
                        vErrors.push(err7);
                      }
                      errors++;
                    }
                  }
                } else {
                  const err8 = { instancePath: instancePath + "/turn_result/failed_steps/" + i0, schemaPath: "#/properties/turn_result/oneOf/2/properties/failed_steps/items/type", keyword: "type", params: { type: "object" }, message: "must be object" };
                  if (vErrors === null) {
                    vErrors = [err8];
                  } else {
                    vErrors.push(err8);
                  }
                  errors++;
                }
              }
            } else {
              const err9 = { instancePath: instancePath + "/turn_result/failed_steps", schemaPath: "#/properties/turn_result/oneOf/2/properties/failed_steps/type", keyword: "type", params: { type: "array" }, message: "must be array" };
              if (vErrors === null) {
                vErrors = [err9];
              } else {
                vErrors.push(err9);
              }
              errors++;
            }
          }
        } else {
          const err10 = { instancePath: instancePath + "/turn_result", schemaPath: "#/properties/turn_result/oneOf/2/type", keyword: "type", params: { type: "object" }, message: "must be object" };
          if (vErrors === null) {
            vErrors = [err10];
          } else {
            vErrors.push(err10);
          }
          errors++;
        }
        var _valid0 = _errs5 === errors;
        if (_valid0 && valid1) {
          valid1 = false;
          passing0 = [passing0, 2];
        } else {
          if (_valid0) {
            valid1 = true;
            passing0 = 2;
            var props0 = {};
            props0.failed_steps = true;
          }
        }
      }
      if (!valid1) {
        const err11 = { instancePath: instancePath + "/turn_result", schemaPath: "#/properties/turn_result/oneOf", keyword: "oneOf", params: { passingSchemas: passing0 }, message: "must match exactly one schema in oneOf" };
        if (vErrors === null) {
          vErrors = [err11];
        } else {
          vErrors.push(err11);
        }
        errors++;
      } else {
        errors = _errs2;
        if (vErrors !== null) {
          if (_errs2) {
            vErrors.length = _errs2;
          } else {
            vErrors = null;
          }
        }
      }
    }
    if (data.staff_alert_delivery !== void 0) {
      let data5 = data.staff_alert_delivery;
      if (!(data5 === "SUCCESS" || data5 === "FAILURE" || data5 === "NOT_APPLICABLE")) {
        const err12 = { instancePath: instancePath + "/staff_alert_delivery", schemaPath: "#/properties/staff_alert_delivery/enum", keyword: "enum", params: { allowedValues: schema98.properties.staff_alert_delivery.enum }, message: "must be equal to one of the allowed values" };
        if (vErrors === null) {
          vErrors = [err12];
        } else {
          vErrors.push(err12);
        }
        errors++;
      }
    }
    if (data.turn_failure_signal !== void 0) {
      let data6 = data.turn_failure_signal;
      const _errs15 = errors;
      let valid6 = false;
      let passing1 = null;
      const _errs16 = errors;
      if (data6 !== null) {
        const err13 = { instancePath: instancePath + "/turn_failure_signal", schemaPath: "#/properties/turn_failure_signal/oneOf/0/type", keyword: "type", params: { type: "null" }, message: "must be null" };
        if (vErrors === null) {
          vErrors = [err13];
        } else {
          vErrors.push(err13);
        }
        errors++;
      }
      var _valid1 = _errs16 === errors;
      if (_valid1) {
        valid6 = true;
        passing1 = 0;
      }
      const _errs18 = errors;
      if (!validate44(data6, { instancePath: instancePath + "/turn_failure_signal", parentData: data, parentDataProperty: "turn_failure_signal", rootData, dynamicAnchors })) {
        vErrors = vErrors === null ? validate44.errors : vErrors.concat(validate44.errors);
        errors = vErrors.length;
      }
      var _valid1 = _errs18 === errors;
      if (_valid1 && valid6) {
        valid6 = false;
        passing1 = [passing1, 1];
      } else {
        if (_valid1) {
          valid6 = true;
          passing1 = 1;
          var props1 = {};
          props1.session_id = true;
          props1.write_committed = true;
          props1.staff_alert = true;
          props1.pause_reason = true;
        }
      }
      if (!valid6) {
        const err14 = { instancePath: instancePath + "/turn_failure_signal", schemaPath: "#/properties/turn_failure_signal/oneOf", keyword: "oneOf", params: { passingSchemas: passing1 }, message: "must match exactly one schema in oneOf" };
        if (vErrors === null) {
          vErrors = [err14];
        } else {
          vErrors.push(err14);
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
  validate48.errors = vErrors;
  return errors === 0;
}
validate48.evaluated = { "props": { "turn_result": true, "staff_alert_delivery": true, "turn_failure_signal": true }, "dynamicProps": false, "dynamicItems": false };
function validate46(data, { instancePath = "", parentData, parentDataProperty, rootData = data, dynamicAnchors = {} } = {}) {
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
    if (data.turn_failure_signal !== void 0) {
      let data0 = data.turn_failure_signal;
      const _errs2 = errors;
      let valid1 = false;
      let passing0 = null;
      const _errs3 = errors;
      if (data0 !== null) {
        const err0 = { instancePath: instancePath + "/turn_failure_signal", schemaPath: "#/properties/turn_failure_signal/oneOf/0/type", keyword: "type", params: { type: "null" }, message: "must be null" };
        if (vErrors === null) {
          vErrors = [err0];
        } else {
          vErrors.push(err0);
        }
        errors++;
      }
      var _valid0 = _errs3 === errors;
      if (_valid0) {
        valid1 = true;
        passing0 = 0;
      }
      const _errs5 = errors;
      if (!validate44(data0, { instancePath: instancePath + "/turn_failure_signal", parentData: data, parentDataProperty: "turn_failure_signal", rootData, dynamicAnchors })) {
        vErrors = vErrors === null ? validate44.errors : vErrors.concat(validate44.errors);
        errors = vErrors.length;
      }
      var _valid0 = _errs5 === errors;
      if (_valid0 && valid1) {
        valid1 = false;
        passing0 = [passing0, 1];
      } else {
        if (_valid0) {
          valid1 = true;
          passing0 = 1;
          var props0 = {};
          props0.session_id = true;
          props0.write_committed = true;
          props0.staff_alert = true;
          props0.pause_reason = true;
        }
      }
      if (!valid1) {
        const err1 = { instancePath: instancePath + "/turn_failure_signal", schemaPath: "#/properties/turn_failure_signal/oneOf", keyword: "oneOf", params: { passingSchemas: passing0 }, message: "must match exactly one schema in oneOf" };
        if (vErrors === null) {
          vErrors = [err1];
        } else {
          vErrors.push(err1);
        }
        errors++;
      } else {
        errors = _errs2;
        if (vErrors !== null) {
          if (_errs2) {
            vErrors.length = _errs2;
          } else {
            vErrors = null;
          }
        }
      }
    }
    if (data.intervention_result !== void 0) {
      let data1 = data.intervention_result;
      const _errs7 = errors;
      let valid2 = false;
      let passing1 = null;
      const _errs8 = errors;
      if (data1 !== null) {
        const err2 = { instancePath: instancePath + "/intervention_result", schemaPath: "#/properties/intervention_result/oneOf/0/type", keyword: "type", params: { type: "null" }, message: "must be null" };
        if (vErrors === null) {
          vErrors = [err2];
        } else {
          vErrors.push(err2);
        }
        errors++;
      }
      var _valid1 = _errs8 === errors;
      if (_valid1) {
        valid2 = true;
        passing1 = 0;
      }
      const _errs10 = errors;
      if (data1 && typeof data1 == "object" && !Array.isArray(data1)) {
        if (data1.session_id !== void 0) {
          let data2 = data1.session_id;
          if (typeof data2 === "string") {
            if (!pattern19.test(data2)) {
              const err3 = { instancePath: instancePath + "/intervention_result/session_id", schemaPath: "#/$defs/Pseudonym/pattern", keyword: "pattern", params: { pattern: "^p-[0-9a-f]{32}$" }, message: 'must match pattern "^p-[0-9a-f]{32}$"' };
              if (vErrors === null) {
                vErrors = [err3];
              } else {
                vErrors.push(err3);
              }
              errors++;
            }
          } else {
            const err4 = { instancePath: instancePath + "/intervention_result/session_id", schemaPath: "#/$defs/Pseudonym/type", keyword: "type", params: { type: "string" }, message: "must be string" };
            if (vErrors === null) {
              vErrors = [err4];
            } else {
              vErrors.push(err4);
            }
            errors++;
          }
        }
        if (data1.result !== void 0) {
          let data3 = data1.result;
          if (!(data3 === "APPLIED" || data3 === "IGNORED" || data3 === "FAILED")) {
            const err5 = { instancePath: instancePath + "/intervention_result/result", schemaPath: "#/properties/intervention_result/oneOf/1/properties/result/enum", keyword: "enum", params: { allowedValues: schema96.properties.intervention_result.oneOf[1].properties.result.enum }, message: "must be equal to one of the allowed values" };
            if (vErrors === null) {
              vErrors = [err5];
            } else {
              vErrors.push(err5);
            }
            errors++;
          }
        }
      } else {
        const err6 = { instancePath: instancePath + "/intervention_result", schemaPath: "#/properties/intervention_result/oneOf/1/type", keyword: "type", params: { type: "object" }, message: "must be object" };
        if (vErrors === null) {
          vErrors = [err6];
        } else {
          vErrors.push(err6);
        }
        errors++;
      }
      var _valid1 = _errs10 === errors;
      if (_valid1 && valid2) {
        valid2 = false;
        passing1 = [passing1, 1];
      } else {
        if (_valid1) {
          valid2 = true;
          passing1 = 1;
          var props1 = {};
          props1.session_id = true;
          props1.result = true;
        }
      }
      if (!valid2) {
        const err7 = { instancePath: instancePath + "/intervention_result", schemaPath: "#/properties/intervention_result/oneOf", keyword: "oneOf", params: { passingSchemas: passing1 }, message: "must match exactly one schema in oneOf" };
        if (vErrors === null) {
          vErrors = [err7];
        } else {
          vErrors.push(err7);
        }
        errors++;
      } else {
        errors = _errs7;
        if (vErrors !== null) {
          if (_errs7) {
            vErrors.length = _errs7;
          } else {
            vErrors = null;
          }
        }
      }
    }
    if (data.log_entry !== void 0) {
      let data4 = data.log_entry;
      const _errs17 = errors;
      let valid5 = false;
      let passing2 = null;
      const _errs18 = errors;
      if (data4 !== null) {
        const err8 = { instancePath: instancePath + "/log_entry", schemaPath: "#/properties/log_entry/oneOf/0/type", keyword: "type", params: { type: "null" }, message: "must be null" };
        if (vErrors === null) {
          vErrors = [err8];
        } else {
          vErrors.push(err8);
        }
        errors++;
      }
      var _valid2 = _errs18 === errors;
      if (_valid2) {
        valid5 = true;
        passing2 = 0;
      }
      const _errs20 = errors;
      if (!validate48(data4, { instancePath: instancePath + "/log_entry", parentData: data, parentDataProperty: "log_entry", rootData, dynamicAnchors })) {
        vErrors = vErrors === null ? validate48.errors : vErrors.concat(validate48.errors);
        errors = vErrors.length;
      }
      var _valid2 = _errs20 === errors;
      if (_valid2 && valid5) {
        valid5 = false;
        passing2 = [passing2, 1];
      } else {
        if (_valid2) {
          valid5 = true;
          passing2 = 1;
          var props2 = {};
          props2.turn_result = true;
          props2.staff_alert_delivery = true;
          props2.turn_failure_signal = true;
        }
      }
      if (!valid5) {
        const err9 = { instancePath: instancePath + "/log_entry", schemaPath: "#/properties/log_entry/oneOf", keyword: "oneOf", params: { passingSchemas: passing2 }, message: "must match exactly one schema in oneOf" };
        if (vErrors === null) {
          vErrors = [err9];
        } else {
          vErrors.push(err9);
        }
        errors++;
      } else {
        errors = _errs17;
        if (vErrors !== null) {
          if (_errs17) {
            vErrors.length = _errs17;
          } else {
            vErrors = null;
          }
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
  validate46.errors = vErrors;
  return errors === 0;
}
validate46.evaluated = { "props": { "turn_failure_signal": true, "intervention_result": true, "log_entry": true }, "dynamicProps": false, "dynamicItems": false };
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
    if (data.turn_id === void 0) {
      const err1 = { instancePath, schemaPath: "#/required", keyword: "required", params: { missingProperty: "turn_id" }, message: "must have required property 'turn_id'" };
      if (vErrors === null) {
        vErrors = [err1];
      } else {
        vErrors.push(err1);
      }
      errors++;
    }
    if (data.contract_version === void 0) {
      const err2 = { instancePath, schemaPath: "#/required", keyword: "required", params: { missingProperty: "contract_version" }, message: "must have required property 'contract_version'" };
      if (vErrors === null) {
        vErrors = [err2];
      } else {
        vErrors.push(err2);
      }
      errors++;
    }
    if (data.frontend_message === void 0) {
      const err3 = { instancePath, schemaPath: "#/required", keyword: "required", params: { missingProperty: "frontend_message" }, message: "must have required property 'frontend_message'" };
      if (vErrors === null) {
        vErrors = [err3];
      } else {
        vErrors.push(err3);
      }
      errors++;
    }
    if (data.intervention_decision === void 0) {
      const err4 = { instancePath, schemaPath: "#/required", keyword: "required", params: { missingProperty: "intervention_decision" }, message: "must have required property 'intervention_decision'" };
      if (vErrors === null) {
        vErrors = [err4];
      } else {
        vErrors.push(err4);
      }
      errors++;
    }
    if (data.orchestrator_input === void 0) {
      const err5 = { instancePath, schemaPath: "#/required", keyword: "required", params: { missingProperty: "orchestrator_input" }, message: "must have required property 'orchestrator_input'" };
      if (vErrors === null) {
        vErrors = [err5];
      } else {
        vErrors.push(err5);
      }
      errors++;
    }
    if (data.extract_input === void 0) {
      const err6 = { instancePath, schemaPath: "#/required", keyword: "required", params: { missingProperty: "extract_input" }, message: "must have required property 'extract_input'" };
      if (vErrors === null) {
        vErrors = [err6];
      } else {
        vErrors.push(err6);
      }
      errors++;
    }
    if (data.extract_output === void 0) {
      const err7 = { instancePath, schemaPath: "#/required", keyword: "required", params: { missingProperty: "extract_output" }, message: "must have required property 'extract_output'" };
      if (vErrors === null) {
        vErrors = [err7];
      } else {
        vErrors.push(err7);
      }
      errors++;
    }
    if (data.extract_attempts === void 0) {
      const err8 = { instancePath, schemaPath: "#/required", keyword: "required", params: { missingProperty: "extract_attempts" }, message: "must have required property 'extract_attempts'" };
      if (vErrors === null) {
        vErrors = [err8];
      } else {
        vErrors.push(err8);
      }
      errors++;
    }
    if (data.extract_status === void 0) {
      const err9 = { instancePath, schemaPath: "#/required", keyword: "required", params: { missingProperty: "extract_status" }, message: "must have required property 'extract_status'" };
      if (vErrors === null) {
        vErrors = [err9];
      } else {
        vErrors.push(err9);
      }
      errors++;
    }
    if (data.extract_protections === void 0) {
      const err10 = { instancePath, schemaPath: "#/required", keyword: "required", params: { missingProperty: "extract_protections" }, message: "must have required property 'extract_protections'" };
      if (vErrors === null) {
        vErrors = [err10];
      } else {
        vErrors.push(err10);
      }
      errors++;
    }
    if (data.validation_ok === void 0) {
      const err11 = { instancePath, schemaPath: "#/required", keyword: "required", params: { missingProperty: "validation_ok" }, message: "must have required property 'validation_ok'" };
      if (vErrors === null) {
        vErrors = [err11];
      } else {
        vErrors.push(err11);
      }
      errors++;
    }
    if (data.validation_violations === void 0) {
      const err12 = { instancePath, schemaPath: "#/required", keyword: "required", params: { missingProperty: "validation_violations" }, message: "must have required property 'validation_violations'" };
      if (vErrors === null) {
        vErrors = [err12];
      } else {
        vErrors.push(err12);
      }
      errors++;
    }
    if (data.response_input === void 0) {
      const err13 = { instancePath, schemaPath: "#/required", keyword: "required", params: { missingProperty: "response_input" }, message: "must have required property 'response_input'" };
      if (vErrors === null) {
        vErrors = [err13];
      } else {
        vErrors.push(err13);
      }
      errors++;
    }
    if (data.response_output === void 0) {
      const err14 = { instancePath, schemaPath: "#/required", keyword: "required", params: { missingProperty: "response_output" }, message: "must have required property 'response_output'" };
      if (vErrors === null) {
        vErrors = [err14];
      } else {
        vErrors.push(err14);
      }
      errors++;
    }
    if (data.response_outcome === void 0) {
      const err15 = { instancePath, schemaPath: "#/required", keyword: "required", params: { missingProperty: "response_outcome" }, message: "must have required property 'response_outcome'" };
      if (vErrors === null) {
        vErrors = [err15];
      } else {
        vErrors.push(err15);
      }
      errors++;
    }
    if (data.response_protections === void 0) {
      const err16 = { instancePath, schemaPath: "#/required", keyword: "required", params: { missingProperty: "response_protections" }, message: "must have required property 'response_protections'" };
      if (vErrors === null) {
        vErrors = [err16];
      } else {
        vErrors.push(err16);
      }
      errors++;
    }
    if (data.frontend_input === void 0) {
      const err17 = { instancePath, schemaPath: "#/required", keyword: "required", params: { missingProperty: "frontend_input" }, message: "must have required property 'frontend_input'" };
      if (vErrors === null) {
        vErrors = [err17];
      } else {
        vErrors.push(err17);
      }
      errors++;
    }
    if (data.staff_console_input === void 0) {
      const err18 = { instancePath, schemaPath: "#/required", keyword: "required", params: { missingProperty: "staff_console_input" }, message: "must have required property 'staff_console_input'" };
      if (vErrors === null) {
        vErrors = [err18];
      } else {
        vErrors.push(err18);
      }
      errors++;
    }
    if (data.dispatch_input === void 0) {
      const err19 = { instancePath, schemaPath: "#/required", keyword: "required", params: { missingProperty: "dispatch_input" }, message: "must have required property 'dispatch_input'" };
      if (vErrors === null) {
        vErrors = [err19];
      } else {
        vErrors.push(err19);
      }
      errors++;
    }
    if (data.dispatch_output === void 0) {
      const err20 = { instancePath, schemaPath: "#/required", keyword: "required", params: { missingProperty: "dispatch_output" }, message: "must have required property 'dispatch_output'" };
      if (vErrors === null) {
        vErrors = [err20];
      } else {
        vErrors.push(err20);
      }
      errors++;
    }
    if (data.orchestrator_output === void 0) {
      const err21 = { instancePath, schemaPath: "#/required", keyword: "required", params: { missingProperty: "orchestrator_output" }, message: "must have required property 'orchestrator_output'" };
      if (vErrors === null) {
        vErrors = [err21];
      } else {
        vErrors.push(err21);
      }
      errors++;
    }
    if (data.session_before === void 0) {
      const err22 = { instancePath, schemaPath: "#/required", keyword: "required", params: { missingProperty: "session_before" }, message: "must have required property 'session_before'" };
      if (vErrors === null) {
        vErrors = [err22];
      } else {
        vErrors.push(err22);
      }
      errors++;
    }
    if (data.session_after === void 0) {
      const err23 = { instancePath, schemaPath: "#/required", keyword: "required", params: { missingProperty: "session_after" }, message: "must have required property 'session_after'" };
      if (vErrors === null) {
        vErrors = [err23];
      } else {
        vErrors.push(err23);
      }
      errors++;
    }
    if (data.log_entry === void 0) {
      const err24 = { instancePath, schemaPath: "#/required", keyword: "required", params: { missingProperty: "log_entry" }, message: "must have required property 'log_entry'" };
      if (vErrors === null) {
        vErrors = [err24];
      } else {
        vErrors.push(err24);
      }
      errors++;
    }
    if (data.persistence_load_request === void 0) {
      const err25 = { instancePath, schemaPath: "#/required", keyword: "required", params: { missingProperty: "persistence_load_request" }, message: "must have required property 'persistence_load_request'" };
      if (vErrors === null) {
        vErrors = [err25];
      } else {
        vErrors.push(err25);
      }
      errors++;
    }
    if (data.persistence_load_result === void 0) {
      const err26 = { instancePath, schemaPath: "#/required", keyword: "required", params: { missingProperty: "persistence_load_result" }, message: "must have required property 'persistence_load_result'" };
      if (vErrors === null) {
        vErrors = [err26];
      } else {
        vErrors.push(err26);
      }
      errors++;
    }
    if (data.persistence_commit_request === void 0) {
      const err27 = { instancePath, schemaPath: "#/required", keyword: "required", params: { missingProperty: "persistence_commit_request" }, message: "must have required property 'persistence_commit_request'" };
      if (vErrors === null) {
        vErrors = [err27];
      } else {
        vErrors.push(err27);
      }
      errors++;
    }
    if (data.persistence_commit_result === void 0) {
      const err28 = { instancePath, schemaPath: "#/required", keyword: "required", params: { missingProperty: "persistence_commit_result" }, message: "must have required property 'persistence_commit_result'" };
      if (vErrors === null) {
        vErrors = [err28];
      } else {
        vErrors.push(err28);
      }
      errors++;
    }
    for (const key0 in data) {
      if (!func5.call(schema75.properties, key0)) {
        const err29 = { instancePath, schemaPath: "#/additionalProperties", keyword: "additionalProperties", params: { additionalProperty: key0 }, message: "must NOT have additional properties" };
        if (vErrors === null) {
          vErrors = [err29];
        } else {
          vErrors.push(err29);
        }
        errors++;
      }
    }
    if (data.session_id !== void 0) {
      let data0 = data.session_id;
      if (typeof data0 === "string") {
        if (!pattern19.test(data0)) {
          const err30 = { instancePath: instancePath + "/session_id", schemaPath: "#/$defs/Pseudonym/pattern", keyword: "pattern", params: { pattern: "^p-[0-9a-f]{32}$" }, message: 'must match pattern "^p-[0-9a-f]{32}$"' };
          if (vErrors === null) {
            vErrors = [err30];
          } else {
            vErrors.push(err30);
          }
          errors++;
        }
      } else {
        const err31 = { instancePath: instancePath + "/session_id", schemaPath: "#/$defs/Pseudonym/type", keyword: "type", params: { type: "string" }, message: "must be string" };
        if (vErrors === null) {
          vErrors = [err31];
        } else {
          vErrors.push(err31);
        }
        errors++;
      }
    }
    if (data.turn_id !== void 0) {
      let data1 = data.turn_id;
      if (typeof data1 === "string") {
        if (!pattern19.test(data1)) {
          const err32 = { instancePath: instancePath + "/turn_id", schemaPath: "#/$defs/Pseudonym/pattern", keyword: "pattern", params: { pattern: "^p-[0-9a-f]{32}$" }, message: 'must match pattern "^p-[0-9a-f]{32}$"' };
          if (vErrors === null) {
            vErrors = [err32];
          } else {
            vErrors.push(err32);
          }
          errors++;
        }
      } else {
        const err33 = { instancePath: instancePath + "/turn_id", schemaPath: "#/$defs/Pseudonym/type", keyword: "type", params: { type: "string" }, message: "must be string" };
        if (vErrors === null) {
          vErrors = [err33];
        } else {
          vErrors.push(err33);
        }
        errors++;
      }
    }
    if (data.contract_version !== void 0) {
      let data2 = data.contract_version;
      if (!(typeof data2 == "number" && (!(data2 % 1) && !isNaN(data2)))) {
        const err34 = { instancePath: instancePath + "/contract_version", schemaPath: "#/properties/contract_version/type", keyword: "type", params: { type: "integer" }, message: "must be integer" };
        if (vErrors === null) {
          vErrors = [err34];
        } else {
          vErrors.push(err34);
        }
        errors++;
      }
      if (typeof data2 == "number") {
        if (data2 < 1 || isNaN(data2)) {
          const err35 = { instancePath: instancePath + "/contract_version", schemaPath: "#/properties/contract_version/minimum", keyword: "minimum", params: { comparison: ">=", limit: 1 }, message: "must be >= 1" };
          if (vErrors === null) {
            vErrors = [err35];
          } else {
            vErrors.push(err35);
          }
          errors++;
        }
      }
    }
    if (data.turn_index !== void 0) {
      let data3 = data.turn_index;
      if (!(typeof data3 == "number" && (!(data3 % 1) && !isNaN(data3)))) {
        const err36 = { instancePath: instancePath + "/turn_index", schemaPath: "#/properties/turn_index/type", keyword: "type", params: { type: "integer" }, message: "must be integer" };
        if (vErrors === null) {
          vErrors = [err36];
        } else {
          vErrors.push(err36);
        }
        errors++;
      }
      if (typeof data3 == "number") {
        if (data3 < 0 || isNaN(data3)) {
          const err37 = { instancePath: instancePath + "/turn_index", schemaPath: "#/properties/turn_index/minimum", keyword: "minimum", params: { comparison: ">=", limit: 0 }, message: "must be >= 0" };
          if (vErrors === null) {
            vErrors = [err37];
          } else {
            vErrors.push(err37);
          }
          errors++;
        }
      }
    }
    if (data.frontend_message !== void 0) {
      let data4 = data.frontend_message;
      const _errs13 = errors;
      let valid3 = false;
      let passing0 = null;
      const _errs14 = errors;
      if (data4 !== null) {
        const err38 = { instancePath: instancePath + "/frontend_message", schemaPath: "#/properties/frontend_message/oneOf/0/type", keyword: "type", params: { type: "null" }, message: "must be null" };
        if (vErrors === null) {
          vErrors = [err38];
        } else {
          vErrors.push(err38);
        }
        errors++;
      }
      var _valid0 = _errs14 === errors;
      if (_valid0) {
        valid3 = true;
        passing0 = 0;
      }
      const _errs16 = errors;
      if (data4 && typeof data4 == "object" && !Array.isArray(data4)) {
        if (data4.session_id === void 0) {
          const err39 = { instancePath: instancePath + "/frontend_message", schemaPath: "#/properties/frontend_message/oneOf/1/required", keyword: "required", params: { missingProperty: "session_id" }, message: "must have required property 'session_id'" };
          if (vErrors === null) {
            vErrors = [err39];
          } else {
            vErrors.push(err39);
          }
          errors++;
        }
        if (data4.kind === void 0) {
          const err40 = { instancePath: instancePath + "/frontend_message", schemaPath: "#/properties/frontend_message/oneOf/1/required", keyword: "required", params: { missingProperty: "kind" }, message: "must have required property 'kind'" };
          if (vErrors === null) {
            vErrors = [err40];
          } else {
            vErrors.push(err40);
          }
          errors++;
        }
        for (const key1 in data4) {
          if (!(key1 === "session_id" || key1 === "kind" || key1 === "utterance")) {
            const err41 = { instancePath: instancePath + "/frontend_message", schemaPath: "#/properties/frontend_message/oneOf/1/additionalProperties", keyword: "additionalProperties", params: { additionalProperty: key1 }, message: "must NOT have additional properties" };
            if (vErrors === null) {
              vErrors = [err41];
            } else {
              vErrors.push(err41);
            }
            errors++;
          }
        }
        if (data4.session_id !== void 0) {
          let data5 = data4.session_id;
          if (typeof data5 === "string") {
            if (!pattern19.test(data5)) {
              const err42 = { instancePath: instancePath + "/frontend_message/session_id", schemaPath: "#/$defs/Pseudonym/pattern", keyword: "pattern", params: { pattern: "^p-[0-9a-f]{32}$" }, message: 'must match pattern "^p-[0-9a-f]{32}$"' };
              if (vErrors === null) {
                vErrors = [err42];
              } else {
                vErrors.push(err42);
              }
              errors++;
            }
          } else {
            const err43 = { instancePath: instancePath + "/frontend_message/session_id", schemaPath: "#/$defs/Pseudonym/type", keyword: "type", params: { type: "string" }, message: "must be string" };
            if (vErrors === null) {
              vErrors = [err43];
            } else {
              vErrors.push(err43);
            }
            errors++;
          }
        }
        if (data4.kind !== void 0) {
          let data6 = data4.kind;
          if (!(data6 === "SESSION_START" || data6 === "UTTERANCE" || data6 === "SESSION_END")) {
            const err44 = { instancePath: instancePath + "/frontend_message/kind", schemaPath: "#/properties/frontend_message/oneOf/1/properties/kind/enum", keyword: "enum", params: { allowedValues: schema75.properties.frontend_message.oneOf[1].properties.kind.enum }, message: "must be equal to one of the allowed values" };
            if (vErrors === null) {
              vErrors = [err44];
            } else {
              vErrors.push(err44);
            }
            errors++;
          }
        }
        if (data4.utterance !== void 0) {
          let data7 = data4.utterance;
          if (!(data7 === "[MASKED]" || data7 === "[DROPPED]")) {
            const err45 = { instancePath: instancePath + "/frontend_message/utterance", schemaPath: "#/$defs/Redacted/enum", keyword: "enum", params: { allowedValues: schema79.enum }, message: "must be equal to one of the allowed values" };
            if (vErrors === null) {
              vErrors = [err45];
            } else {
              vErrors.push(err45);
            }
            errors++;
          }
        }
      } else {
        const err46 = { instancePath: instancePath + "/frontend_message", schemaPath: "#/properties/frontend_message/oneOf/1/type", keyword: "type", params: { type: "object" }, message: "must be object" };
        if (vErrors === null) {
          vErrors = [err46];
        } else {
          vErrors.push(err46);
        }
        errors++;
      }
      var _valid0 = _errs16 === errors;
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
        const err47 = { instancePath: instancePath + "/frontend_message", schemaPath: "#/properties/frontend_message/oneOf", keyword: "oneOf", params: { passingSchemas: passing0 }, message: "must match exactly one schema in oneOf" };
        if (vErrors === null) {
          vErrors = [err47];
        } else {
          vErrors.push(err47);
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
    }
    if (data.extract_input !== void 0) {
      let data8 = data.extract_input;
      const _errs26 = errors;
      let valid7 = false;
      let passing1 = null;
      const _errs27 = errors;
      if (data8 !== null) {
        const err48 = { instancePath: instancePath + "/extract_input", schemaPath: "#/properties/extract_input/oneOf/0/type", keyword: "type", params: { type: "null" }, message: "must be null" };
        if (vErrors === null) {
          vErrors = [err48];
        } else {
          vErrors.push(err48);
        }
        errors++;
      }
      var _valid1 = _errs27 === errors;
      if (_valid1) {
        valid7 = true;
        passing1 = 0;
      }
      const _errs29 = errors;
      if (data8 && typeof data8 == "object" && !Array.isArray(data8)) {
        if (data8.question_id === void 0) {
          const err49 = { instancePath: instancePath + "/extract_input", schemaPath: "#/properties/extract_input/oneOf/1/required", keyword: "required", params: { missingProperty: "question_id" }, message: "must have required property 'question_id'" };
          if (vErrors === null) {
            vErrors = [err49];
          } else {
            vErrors.push(err49);
          }
          errors++;
        }
        if (data8.current_question === void 0) {
          const err50 = { instancePath: instancePath + "/extract_input", schemaPath: "#/properties/extract_input/oneOf/1/required", keyword: "required", params: { missingProperty: "current_question" }, message: "must have required property 'current_question'" };
          if (vErrors === null) {
            vErrors = [err50];
          } else {
            vErrors.push(err50);
          }
          errors++;
        }
        if (data8.user_utterance === void 0) {
          const err51 = { instancePath: instancePath + "/extract_input", schemaPath: "#/properties/extract_input/oneOf/1/required", keyword: "required", params: { missingProperty: "user_utterance" }, message: "must have required property 'user_utterance'" };
          if (vErrors === null) {
            vErrors = [err51];
          } else {
            vErrors.push(err51);
          }
          errors++;
        }
        if (data8.state === void 0) {
          const err52 = { instancePath: instancePath + "/extract_input", schemaPath: "#/properties/extract_input/oneOf/1/required", keyword: "required", params: { missingProperty: "state" }, message: "must have required property 'state'" };
          if (vErrors === null) {
            vErrors = [err52];
          } else {
            vErrors.push(err52);
          }
          errors++;
        }
        if (data8.question_id !== void 0) {
          let data9 = data8.question_id;
          if (typeof data9 === "string") {
            if (!pattern22.test(data9)) {
              const err53 = { instancePath: instancePath + "/extract_input/question_id", schemaPath: "#/$defs/Ident/pattern", keyword: "pattern", params: { pattern: "^([A-Za-z0-9][A-Za-z0-9_.\\-]{0,63}|\\[MASKED\\])$" }, message: 'must match pattern "^([A-Za-z0-9][A-Za-z0-9_.\\-]{0,63}|\\[MASKED\\])$"' };
              if (vErrors === null) {
                vErrors = [err53];
              } else {
                vErrors.push(err53);
              }
              errors++;
            }
          } else {
            const err54 = { instancePath: instancePath + "/extract_input/question_id", schemaPath: "#/$defs/Ident/type", keyword: "type", params: { type: "string" }, message: "must be string" };
            if (vErrors === null) {
              vErrors = [err54];
            } else {
              vErrors.push(err54);
            }
            errors++;
          }
        }
        if (data8.current_question !== void 0) {
          let data10 = data8.current_question;
          if (!(data10 === "[MASKED]" || data10 === "[DROPPED]")) {
            const err55 = { instancePath: instancePath + "/extract_input/current_question", schemaPath: "#/$defs/Redacted/enum", keyword: "enum", params: { allowedValues: schema79.enum }, message: "must be equal to one of the allowed values" };
            if (vErrors === null) {
              vErrors = [err55];
            } else {
              vErrors.push(err55);
            }
            errors++;
          }
        }
        if (data8.user_utterance !== void 0) {
          let data11 = data8.user_utterance;
          if (!(data11 === "[MASKED]" || data11 === "[DROPPED]")) {
            const err56 = { instancePath: instancePath + "/extract_input/user_utterance", schemaPath: "#/$defs/Redacted/enum", keyword: "enum", params: { allowedValues: schema79.enum }, message: "must be equal to one of the allowed values" };
            if (vErrors === null) {
              vErrors = [err56];
            } else {
              vErrors.push(err56);
            }
            errors++;
          }
        }
        if (data8.state !== void 0) {
          let data12 = data8.state;
          if (!(data12 && typeof data12 == "object" && !Array.isArray(data12))) {
            const err57 = { instancePath: instancePath + "/extract_input/state", schemaPath: "#/properties/extract_input/oneOf/1/properties/state/type", keyword: "type", params: { type: "object" }, message: "must be object" };
            if (vErrors === null) {
              vErrors = [err57];
            } else {
              vErrors.push(err57);
            }
            errors++;
          }
        }
      } else {
        const err58 = { instancePath: instancePath + "/extract_input", schemaPath: "#/properties/extract_input/oneOf/1/type", keyword: "type", params: { type: "object" }, message: "must be object" };
        if (vErrors === null) {
          vErrors = [err58];
        } else {
          vErrors.push(err58);
        }
        errors++;
      }
      var _valid1 = _errs29 === errors;
      if (_valid1 && valid7) {
        valid7 = false;
        passing1 = [passing1, 1];
      } else {
        if (_valid1) {
          valid7 = true;
          passing1 = 1;
          var props1 = {};
          props1.question_id = true;
          props1.current_question = true;
          props1.user_utterance = true;
          props1.state = true;
        }
      }
      if (!valid7) {
        const err59 = { instancePath: instancePath + "/extract_input", schemaPath: "#/properties/extract_input/oneOf", keyword: "oneOf", params: { passingSchemas: passing1 }, message: "must match exactly one schema in oneOf" };
        if (vErrors === null) {
          vErrors = [err59];
        } else {
          vErrors.push(err59);
        }
        errors++;
      } else {
        errors = _errs26;
        if (vErrors !== null) {
          if (_errs26) {
            vErrors.length = _errs26;
          } else {
            vErrors = null;
          }
        }
      }
    }
    if (data.extract_output !== void 0) {
      let data13 = data.extract_output;
      const _errs41 = errors;
      let valid12 = false;
      let passing2 = null;
      const _errs42 = errors;
      if (data13 !== null) {
        const err60 = { instancePath: instancePath + "/extract_output", schemaPath: "#/properties/extract_output/oneOf/0/type", keyword: "type", params: { type: "null" }, message: "must be null" };
        if (vErrors === null) {
          vErrors = [err60];
        } else {
          vErrors.push(err60);
        }
        errors++;
      }
      var _valid2 = _errs42 === errors;
      if (_valid2) {
        valid12 = true;
        passing2 = 0;
      }
      const _errs44 = errors;
      if (data13 && typeof data13 == "object" && !Array.isArray(data13)) {
        if (data13.values !== void 0) {
          let data14 = data13.values;
          if (Array.isArray(data14)) {
            const len0 = data14.length;
            for (let i0 = 0; i0 < len0; i0++) {
              let data15 = data14[i0];
              if (data15 && typeof data15 == "object" && !Array.isArray(data15)) {
                if (data15.key !== void 0) {
                  let data16 = data15.key;
                  if (!(data16 === "[MASKED]" || data16 === "[DROPPED]")) {
                    const err61 = { instancePath: instancePath + "/extract_output/values/" + i0 + "/key", schemaPath: "#/$defs/Redacted/enum", keyword: "enum", params: { allowedValues: schema79.enum }, message: "must be equal to one of the allowed values" };
                    if (vErrors === null) {
                      vErrors = [err61];
                    } else {
                      vErrors.push(err61);
                    }
                    errors++;
                  }
                }
                if (data15.value !== void 0) {
                  let data17 = data15.value;
                  if (!(data17 === "[MASKED]" || data17 === "[DROPPED]")) {
                    const err62 = { instancePath: instancePath + "/extract_output/values/" + i0 + "/value", schemaPath: "#/$defs/Redacted/enum", keyword: "enum", params: { allowedValues: schema79.enum }, message: "must be equal to one of the allowed values" };
                    if (vErrors === null) {
                      vErrors = [err62];
                    } else {
                      vErrors.push(err62);
                    }
                    errors++;
                  }
                }
                if (data15.precision !== void 0) {
                  let data18 = data15.precision;
                  if (!(data18 === "[MASKED]" || data18 === "[DROPPED]")) {
                    const err63 = { instancePath: instancePath + "/extract_output/values/" + i0 + "/precision", schemaPath: "#/$defs/Redacted/enum", keyword: "enum", params: { allowedValues: schema79.enum }, message: "must be equal to one of the allowed values" };
                    if (vErrors === null) {
                      vErrors = [err63];
                    } else {
                      vErrors.push(err63);
                    }
                    errors++;
                  }
                }
                if (data15.status !== void 0) {
                  let data19 = data15.status;
                  if (!(data19 === "[MASKED]" || data19 === "[DROPPED]")) {
                    const err64 = { instancePath: instancePath + "/extract_output/values/" + i0 + "/status", schemaPath: "#/$defs/Redacted/enum", keyword: "enum", params: { allowedValues: schema79.enum }, message: "must be equal to one of the allowed values" };
                    if (vErrors === null) {
                      vErrors = [err64];
                    } else {
                      vErrors.push(err64);
                    }
                    errors++;
                  }
                }
                if (data15.save !== void 0) {
                  if (typeof data15.save !== "boolean") {
                    const err65 = { instancePath: instancePath + "/extract_output/values/" + i0 + "/save", schemaPath: "#/properties/extract_output/oneOf/1/properties/values/items/properties/save/type", keyword: "type", params: { type: "boolean" }, message: "must be boolean" };
                    if (vErrors === null) {
                      vErrors = [err65];
                    } else {
                      vErrors.push(err65);
                    }
                    errors++;
                  }
                }
              } else {
                const err66 = { instancePath: instancePath + "/extract_output/values/" + i0, schemaPath: "#/properties/extract_output/oneOf/1/properties/values/items/type", keyword: "type", params: { type: "object" }, message: "must be object" };
                if (vErrors === null) {
                  vErrors = [err66];
                } else {
                  vErrors.push(err66);
                }
                errors++;
              }
            }
          } else {
            const err67 = { instancePath: instancePath + "/extract_output/values", schemaPath: "#/properties/extract_output/oneOf/1/properties/values/type", keyword: "type", params: { type: "array" }, message: "must be array" };
            if (vErrors === null) {
              vErrors = [err67];
            } else {
              vErrors.push(err67);
            }
            errors++;
          }
        }
        if (data13.action !== void 0) {
          let data21 = data13.action;
          if (typeof data21 === "string") {
            if (!pattern23.test(data21)) {
              const err68 = { instancePath: instancePath + "/extract_output/action", schemaPath: "#/properties/extract_output/oneOf/1/properties/action/pattern", keyword: "pattern", params: { pattern: "^[A-Z][A-Z0-9_]{0,31}$|^\\[MASKED\\]$" }, message: 'must match pattern "^[A-Z][A-Z0-9_]{0,31}$|^\\[MASKED\\]$"' };
              if (vErrors === null) {
                vErrors = [err68];
              } else {
                vErrors.push(err68);
              }
              errors++;
            }
          } else {
            const err69 = { instancePath: instancePath + "/extract_output/action", schemaPath: "#/properties/extract_output/oneOf/1/properties/action/type", keyword: "type", params: { type: "string" }, message: "must be string" };
            if (vErrors === null) {
              vErrors = [err69];
            } else {
              vErrors.push(err69);
            }
            errors++;
          }
        }
        if (data13.next_item !== void 0) {
          let data22 = data13.next_item;
          const _errs63 = errors;
          let valid21 = false;
          let passing3 = null;
          const _errs64 = errors;
          if (data22 !== null) {
            const err70 = { instancePath: instancePath + "/extract_output/next_item", schemaPath: "#/properties/extract_output/oneOf/1/properties/next_item/oneOf/0/type", keyword: "type", params: { type: "null" }, message: "must be null" };
            if (vErrors === null) {
              vErrors = [err70];
            } else {
              vErrors.push(err70);
            }
            errors++;
          }
          var _valid3 = _errs64 === errors;
          if (_valid3) {
            valid21 = true;
            passing3 = 0;
          }
          const _errs66 = errors;
          if (typeof data22 === "string") {
            if (!pattern22.test(data22)) {
              const err71 = { instancePath: instancePath + "/extract_output/next_item", schemaPath: "#/$defs/Ident/pattern", keyword: "pattern", params: { pattern: "^([A-Za-z0-9][A-Za-z0-9_.\\-]{0,63}|\\[MASKED\\])$" }, message: 'must match pattern "^([A-Za-z0-9][A-Za-z0-9_.\\-]{0,63}|\\[MASKED\\])$"' };
              if (vErrors === null) {
                vErrors = [err71];
              } else {
                vErrors.push(err71);
              }
              errors++;
            }
          } else {
            const err72 = { instancePath: instancePath + "/extract_output/next_item", schemaPath: "#/$defs/Ident/type", keyword: "type", params: { type: "string" }, message: "must be string" };
            if (vErrors === null) {
              vErrors = [err72];
            } else {
              vErrors.push(err72);
            }
            errors++;
          }
          var _valid3 = _errs66 === errors;
          if (_valid3 && valid21) {
            valid21 = false;
            passing3 = [passing3, 1];
          } else {
            if (_valid3) {
              valid21 = true;
              passing3 = 1;
            }
          }
          if (!valid21) {
            const err73 = { instancePath: instancePath + "/extract_output/next_item", schemaPath: "#/properties/extract_output/oneOf/1/properties/next_item/oneOf", keyword: "oneOf", params: { passingSchemas: passing3 }, message: "must match exactly one schema in oneOf" };
            if (vErrors === null) {
              vErrors = [err73];
            } else {
              vErrors.push(err73);
            }
            errors++;
          } else {
            errors = _errs63;
            if (vErrors !== null) {
              if (_errs63) {
                vErrors.length = _errs63;
              } else {
                vErrors = null;
              }
            }
          }
        }
        if (data13.reason !== void 0) {
          let data23 = data13.reason;
          if (!(data23 === "[MASKED]" || data23 === "[DROPPED]")) {
            const err74 = { instancePath: instancePath + "/extract_output/reason", schemaPath: "#/$defs/Redacted/enum", keyword: "enum", params: { allowedValues: schema79.enum }, message: "must be equal to one of the allowed values" };
            if (vErrors === null) {
              vErrors = [err74];
            } else {
              vErrors.push(err74);
            }
            errors++;
          }
        }
        if (data13.note !== void 0) {
          let data24 = data13.note;
          if (!(data24 === "[MASKED]" || data24 === "[DROPPED]")) {
            const err75 = { instancePath: instancePath + "/extract_output/note", schemaPath: "#/$defs/Redacted/enum", keyword: "enum", params: { allowedValues: schema79.enum }, message: "must be equal to one of the allowed values" };
            if (vErrors === null) {
              vErrors = [err75];
            } else {
              vErrors.push(err75);
            }
            errors++;
          }
        }
        if (data13.targets !== void 0) {
          if (!Array.isArray(data13.targets)) {
            const err76 = { instancePath: instancePath + "/extract_output/targets", schemaPath: "#/properties/extract_output/oneOf/1/properties/targets/type", keyword: "type", params: { type: "array" }, message: "must be array" };
            if (vErrors === null) {
              vErrors = [err76];
            } else {
              vErrors.push(err76);
            }
            errors++;
          }
        }
      } else {
        const err77 = { instancePath: instancePath + "/extract_output", schemaPath: "#/properties/extract_output/oneOf/1/type", keyword: "type", params: { type: "object" }, message: "must be object" };
        if (vErrors === null) {
          vErrors = [err77];
        } else {
          vErrors.push(err77);
        }
        errors++;
      }
      var _valid2 = _errs44 === errors;
      if (_valid2 && valid12) {
        valid12 = false;
        passing2 = [passing2, 1];
      } else {
        if (_valid2) {
          valid12 = true;
          passing2 = 1;
          var props2 = {};
          props2.values = true;
          props2.action = true;
          props2.next_item = true;
          props2.reason = true;
          props2.note = true;
          props2.targets = true;
        }
      }
      if (!valid12) {
        const err78 = { instancePath: instancePath + "/extract_output", schemaPath: "#/properties/extract_output/oneOf", keyword: "oneOf", params: { passingSchemas: passing2 }, message: "must match exactly one schema in oneOf" };
        if (vErrors === null) {
          vErrors = [err78];
        } else {
          vErrors.push(err78);
        }
        errors++;
      } else {
        errors = _errs41;
        if (vErrors !== null) {
          if (_errs41) {
            vErrors.length = _errs41;
          } else {
            vErrors = null;
          }
        }
      }
    }
    if (data.extract_attempts !== void 0) {
      let data26 = data.extract_attempts;
      const _errs76 = errors;
      let valid25 = false;
      let passing4 = null;
      const _errs77 = errors;
      if (data26 !== null) {
        const err79 = { instancePath: instancePath + "/extract_attempts", schemaPath: "#/properties/extract_attempts/oneOf/0/type", keyword: "type", params: { type: "null" }, message: "must be null" };
        if (vErrors === null) {
          vErrors = [err79];
        } else {
          vErrors.push(err79);
        }
        errors++;
      }
      var _valid4 = _errs77 === errors;
      if (_valid4) {
        valid25 = true;
        passing4 = 0;
      }
      const _errs79 = errors;
      if (!(typeof data26 == "number" && (!(data26 % 1) && !isNaN(data26)))) {
        const err80 = { instancePath: instancePath + "/extract_attempts", schemaPath: "#/properties/extract_attempts/oneOf/1/type", keyword: "type", params: { type: "integer" }, message: "must be integer" };
        if (vErrors === null) {
          vErrors = [err80];
        } else {
          vErrors.push(err80);
        }
        errors++;
      }
      if (typeof data26 == "number") {
        if (data26 > 2 || isNaN(data26)) {
          const err81 = { instancePath: instancePath + "/extract_attempts", schemaPath: "#/properties/extract_attempts/oneOf/1/maximum", keyword: "maximum", params: { comparison: "<=", limit: 2 }, message: "must be <= 2" };
          if (vErrors === null) {
            vErrors = [err81];
          } else {
            vErrors.push(err81);
          }
          errors++;
        }
        if (data26 < 1 || isNaN(data26)) {
          const err82 = { instancePath: instancePath + "/extract_attempts", schemaPath: "#/properties/extract_attempts/oneOf/1/minimum", keyword: "minimum", params: { comparison: ">=", limit: 1 }, message: "must be >= 1" };
          if (vErrors === null) {
            vErrors = [err82];
          } else {
            vErrors.push(err82);
          }
          errors++;
        }
      }
      var _valid4 = _errs79 === errors;
      if (_valid4 && valid25) {
        valid25 = false;
        passing4 = [passing4, 1];
      } else {
        if (_valid4) {
          valid25 = true;
          passing4 = 1;
        }
      }
      if (!valid25) {
        const err83 = { instancePath: instancePath + "/extract_attempts", schemaPath: "#/properties/extract_attempts/oneOf", keyword: "oneOf", params: { passingSchemas: passing4 }, message: "must match exactly one schema in oneOf" };
        if (vErrors === null) {
          vErrors = [err83];
        } else {
          vErrors.push(err83);
        }
        errors++;
      } else {
        errors = _errs76;
        if (vErrors !== null) {
          if (_errs76) {
            vErrors.length = _errs76;
          } else {
            vErrors = null;
          }
        }
      }
    }
    if (data.extract_status !== void 0) {
      let data27 = data.extract_status;
      if (!(data27 === "OK" || data27 === "OUTPUT_INVALID" || data27 === "VIOLATION" || data27 === "ERROR" || data27 === null)) {
        const err84 = { instancePath: instancePath + "/extract_status", schemaPath: "#/properties/extract_status/enum", keyword: "enum", params: { allowedValues: schema75.properties.extract_status.enum }, message: "must be equal to one of the allowed values" };
        if (vErrors === null) {
          vErrors = [err84];
        } else {
          vErrors.push(err84);
        }
        errors++;
      }
    }
    if (data.extract_protections !== void 0) {
      let data28 = data.extract_protections;
      const _errs84 = errors;
      let valid27 = false;
      let passing5 = null;
      const _errs85 = errors;
      if (data28 !== null) {
        const err85 = { instancePath: instancePath + "/extract_protections", schemaPath: "#/$defs/CountMap/oneOf/0/type", keyword: "type", params: { type: "null" }, message: "must be null" };
        if (vErrors === null) {
          vErrors = [err85];
        } else {
          vErrors.push(err85);
        }
        errors++;
      }
      var _valid5 = _errs85 === errors;
      if (_valid5) {
        valid27 = true;
        passing5 = 0;
      }
      const _errs87 = errors;
      if (data28 && typeof data28 == "object" && !Array.isArray(data28)) {
        for (const key2 in data28) {
          const _errs89 = errors;
          if (typeof key2 === "string") {
            if (!pattern25.test(key2)) {
              const err86 = { instancePath: instancePath + "/extract_protections", schemaPath: "#/$defs/CountMap/oneOf/1/propertyNames/pattern", keyword: "pattern", params: { pattern: "^[A-Z][A-Z0-9_]{0,31}$" }, message: 'must match pattern "^[A-Z][A-Z0-9_]{0,31}$"', propertyName: key2 };
              if (vErrors === null) {
                vErrors = [err86];
              } else {
                vErrors.push(err86);
              }
              errors++;
            }
          }
          var valid28 = _errs89 === errors;
          if (!valid28) {
            const err87 = { instancePath: instancePath + "/extract_protections", schemaPath: "#/$defs/CountMap/oneOf/1/propertyNames", keyword: "propertyNames", params: { propertyName: key2 }, message: "property name must be valid" };
            if (vErrors === null) {
              vErrors = [err87];
            } else {
              vErrors.push(err87);
            }
            errors++;
          }
        }
        for (const key3 in data28) {
          let data29 = data28[key3];
          if (!(typeof data29 == "number" && (!(data29 % 1) && !isNaN(data29)))) {
            const err88 = { instancePath: instancePath + "/extract_protections/" + key3.replace(/~/g, "~0").replace(/\//g, "~1"), schemaPath: "#/$defs/CountMap/oneOf/1/additionalProperties/type", keyword: "type", params: { type: "integer" }, message: "must be integer" };
            if (vErrors === null) {
              vErrors = [err88];
            } else {
              vErrors.push(err88);
            }
            errors++;
          }
          if (typeof data29 == "number") {
            if (data29 < 0 || isNaN(data29)) {
              const err89 = { instancePath: instancePath + "/extract_protections/" + key3.replace(/~/g, "~0").replace(/\//g, "~1"), schemaPath: "#/$defs/CountMap/oneOf/1/additionalProperties/minimum", keyword: "minimum", params: { comparison: ">=", limit: 0 }, message: "must be >= 0" };
              if (vErrors === null) {
                vErrors = [err89];
              } else {
                vErrors.push(err89);
              }
              errors++;
            }
          }
        }
      } else {
        const err90 = { instancePath: instancePath + "/extract_protections", schemaPath: "#/$defs/CountMap/oneOf/1/type", keyword: "type", params: { type: "object" }, message: "must be object" };
        if (vErrors === null) {
          vErrors = [err90];
        } else {
          vErrors.push(err90);
        }
        errors++;
      }
      var _valid5 = _errs87 === errors;
      if (_valid5 && valid27) {
        valid27 = false;
        passing5 = [passing5, 1];
      } else {
        if (_valid5) {
          valid27 = true;
          passing5 = 1;
        }
      }
      if (!valid27) {
        const err91 = { instancePath: instancePath + "/extract_protections", schemaPath: "#/$defs/CountMap/oneOf", keyword: "oneOf", params: { passingSchemas: passing5 }, message: "must match exactly one schema in oneOf" };
        if (vErrors === null) {
          vErrors = [err91];
        } else {
          vErrors.push(err91);
        }
        errors++;
      } else {
        errors = _errs84;
        if (vErrors !== null) {
          if (_errs84) {
            vErrors.length = _errs84;
          } else {
            vErrors = null;
          }
        }
      }
    }
    if (data.validation_ok !== void 0) {
      let data30 = data.validation_ok;
      if (typeof data30 !== "boolean" && data30 !== null) {
        const err92 = { instancePath: instancePath + "/validation_ok", schemaPath: "#/properties/validation_ok/type", keyword: "type", params: { type: schema75.properties.validation_ok.type }, message: "must be boolean,null" };
        if (vErrors === null) {
          vErrors = [err92];
        } else {
          vErrors.push(err92);
        }
        errors++;
      }
    }
    if (data.validation_violations !== void 0) {
      let data31 = data.validation_violations;
      if (!Array.isArray(data31) && data31 !== null) {
        const err93 = { instancePath: instancePath + "/validation_violations", schemaPath: "#/properties/validation_violations/type", keyword: "type", params: { type: schema75.properties.validation_violations.type }, message: "must be array,null" };
        if (vErrors === null) {
          vErrors = [err93];
        } else {
          vErrors.push(err93);
        }
        errors++;
      }
    }
    if (data.response_input !== void 0) {
      let data32 = data.response_input;
      const _errs98 = errors;
      let valid30 = false;
      let passing6 = null;
      const _errs99 = errors;
      if (data32 !== null) {
        const err94 = { instancePath: instancePath + "/response_input", schemaPath: "#/properties/response_input/oneOf/0/type", keyword: "type", params: { type: "null" }, message: "must be null" };
        if (vErrors === null) {
          vErrors = [err94];
        } else {
          vErrors.push(err94);
        }
        errors++;
      }
      var _valid6 = _errs99 === errors;
      if (_valid6) {
        valid30 = true;
        passing6 = 0;
      }
      const _errs101 = errors;
      if (data32 && typeof data32 == "object" && !Array.isArray(data32)) {
        if (data32.action === void 0) {
          const err95 = { instancePath: instancePath + "/response_input", schemaPath: "#/properties/response_input/oneOf/1/required", keyword: "required", params: { missingProperty: "action" }, message: "must have required property 'action'" };
          if (vErrors === null) {
            vErrors = [err95];
          } else {
            vErrors.push(err95);
          }
          errors++;
        }
        if (data32.topic === void 0) {
          const err96 = { instancePath: instancePath + "/response_input", schemaPath: "#/properties/response_input/oneOf/1/required", keyword: "required", params: { missingProperty: "topic" }, message: "must have required property 'topic'" };
          if (vErrors === null) {
            vErrors = [err96];
          } else {
            vErrors.push(err96);
          }
          errors++;
        }
        if (data32.next === void 0) {
          const err97 = { instancePath: instancePath + "/response_input", schemaPath: "#/properties/response_input/oneOf/1/required", keyword: "required", params: { missingProperty: "next" }, message: "must have required property 'next'" };
          if (vErrors === null) {
            vErrors = [err97];
          } else {
            vErrors.push(err97);
          }
          errors++;
        }
        if (data32.action !== void 0) {
          if (typeof data32.action !== "string") {
            const err98 = { instancePath: instancePath + "/response_input/action", schemaPath: "#/properties/response_input/oneOf/1/properties/action/type", keyword: "type", params: { type: "string" }, message: "must be string" };
            if (vErrors === null) {
              vErrors = [err98];
            } else {
              vErrors.push(err98);
            }
            errors++;
          }
        }
        if (data32.topic !== void 0) {
          let data34 = data32.topic;
          if (!(data34 === "[MASKED]" || data34 === "[DROPPED]")) {
            const err99 = { instancePath: instancePath + "/response_input/topic", schemaPath: "#/$defs/Redacted/enum", keyword: "enum", params: { allowedValues: schema79.enum }, message: "must be equal to one of the allowed values" };
            if (vErrors === null) {
              vErrors = [err99];
            } else {
              vErrors.push(err99);
            }
            errors++;
          }
        }
        if (data32.next !== void 0) {
          let data35 = data32.next;
          if (!(data35 && typeof data35 == "object" && !Array.isArray(data35))) {
            const err100 = { instancePath: instancePath + "/response_input/next", schemaPath: "#/properties/response_input/oneOf/1/properties/next/type", keyword: "type", params: { type: "object" }, message: "must be object" };
            if (vErrors === null) {
              vErrors = [err100];
            } else {
              vErrors.push(err100);
            }
            errors++;
          }
        }
      } else {
        const err101 = { instancePath: instancePath + "/response_input", schemaPath: "#/properties/response_input/oneOf/1/type", keyword: "type", params: { type: "object" }, message: "must be object" };
        if (vErrors === null) {
          vErrors = [err101];
        } else {
          vErrors.push(err101);
        }
        errors++;
      }
      var _valid6 = _errs101 === errors;
      if (_valid6 && valid30) {
        valid30 = false;
        passing6 = [passing6, 1];
      } else {
        if (_valid6) {
          valid30 = true;
          passing6 = 1;
          var props4 = {};
          props4.action = true;
          props4.topic = true;
          props4.next = true;
        }
      }
      if (!valid30) {
        const err102 = { instancePath: instancePath + "/response_input", schemaPath: "#/properties/response_input/oneOf", keyword: "oneOf", params: { passingSchemas: passing6 }, message: "must match exactly one schema in oneOf" };
        if (vErrors === null) {
          vErrors = [err102];
        } else {
          vErrors.push(err102);
        }
        errors++;
      } else {
        errors = _errs98;
        if (vErrors !== null) {
          if (_errs98) {
            vErrors.length = _errs98;
          } else {
            vErrors = null;
          }
        }
      }
    }
    if (data.response_output !== void 0) {
      let data36 = data.response_output;
      const _errs110 = errors;
      let valid33 = false;
      let passing7 = null;
      const _errs111 = errors;
      if (data36 !== null) {
        const err103 = { instancePath: instancePath + "/response_output", schemaPath: "#/properties/response_output/oneOf/0/type", keyword: "type", params: { type: "null" }, message: "must be null" };
        if (vErrors === null) {
          vErrors = [err103];
        } else {
          vErrors.push(err103);
        }
        errors++;
      }
      var _valid7 = _errs111 === errors;
      if (_valid7) {
        valid33 = true;
        passing7 = 0;
      }
      const _errs113 = errors;
      if (!(data36 === "[MASKED]" || data36 === "[DROPPED]")) {
        const err104 = { instancePath: instancePath + "/response_output", schemaPath: "#/$defs/Redacted/enum", keyword: "enum", params: { allowedValues: schema79.enum }, message: "must be equal to one of the allowed values" };
        if (vErrors === null) {
          vErrors = [err104];
        } else {
          vErrors.push(err104);
        }
        errors++;
      }
      var _valid7 = _errs113 === errors;
      if (_valid7 && valid33) {
        valid33 = false;
        passing7 = [passing7, 1];
      } else {
        if (_valid7) {
          valid33 = true;
          passing7 = 1;
        }
      }
      if (!valid33) {
        const err105 = { instancePath: instancePath + "/response_output", schemaPath: "#/properties/response_output/oneOf", keyword: "oneOf", params: { passingSchemas: passing7 }, message: "must match exactly one schema in oneOf" };
        if (vErrors === null) {
          vErrors = [err105];
        } else {
          vErrors.push(err105);
        }
        errors++;
      } else {
        errors = _errs110;
        if (vErrors !== null) {
          if (_errs110) {
            vErrors.length = _errs110;
          } else {
            vErrors = null;
          }
        }
      }
    }
    if (data.response_outcome !== void 0) {
      let data37 = data.response_outcome;
      if (!(data37 === "ok" || data37 === "fallback" || data37 === "fixed" || data37 === null)) {
        const err106 = { instancePath: instancePath + "/response_outcome", schemaPath: "#/properties/response_outcome/enum", keyword: "enum", params: { allowedValues: schema75.properties.response_outcome.enum }, message: "must be equal to one of the allowed values" };
        if (vErrors === null) {
          vErrors = [err106];
        } else {
          vErrors.push(err106);
        }
        errors++;
      }
    }
    if (data.response_protections !== void 0) {
      let data38 = data.response_protections;
      const _errs118 = errors;
      let valid36 = false;
      let passing8 = null;
      const _errs119 = errors;
      if (data38 !== null) {
        const err107 = { instancePath: instancePath + "/response_protections", schemaPath: "#/$defs/CountMap/oneOf/0/type", keyword: "type", params: { type: "null" }, message: "must be null" };
        if (vErrors === null) {
          vErrors = [err107];
        } else {
          vErrors.push(err107);
        }
        errors++;
      }
      var _valid8 = _errs119 === errors;
      if (_valid8) {
        valid36 = true;
        passing8 = 0;
      }
      const _errs121 = errors;
      if (data38 && typeof data38 == "object" && !Array.isArray(data38)) {
        for (const key4 in data38) {
          const _errs123 = errors;
          if (typeof key4 === "string") {
            if (!pattern25.test(key4)) {
              const err108 = { instancePath: instancePath + "/response_protections", schemaPath: "#/$defs/CountMap/oneOf/1/propertyNames/pattern", keyword: "pattern", params: { pattern: "^[A-Z][A-Z0-9_]{0,31}$" }, message: 'must match pattern "^[A-Z][A-Z0-9_]{0,31}$"', propertyName: key4 };
              if (vErrors === null) {
                vErrors = [err108];
              } else {
                vErrors.push(err108);
              }
              errors++;
            }
          }
          var valid37 = _errs123 === errors;
          if (!valid37) {
            const err109 = { instancePath: instancePath + "/response_protections", schemaPath: "#/$defs/CountMap/oneOf/1/propertyNames", keyword: "propertyNames", params: { propertyName: key4 }, message: "property name must be valid" };
            if (vErrors === null) {
              vErrors = [err109];
            } else {
              vErrors.push(err109);
            }
            errors++;
          }
        }
        for (const key5 in data38) {
          let data39 = data38[key5];
          if (!(typeof data39 == "number" && (!(data39 % 1) && !isNaN(data39)))) {
            const err110 = { instancePath: instancePath + "/response_protections/" + key5.replace(/~/g, "~0").replace(/\//g, "~1"), schemaPath: "#/$defs/CountMap/oneOf/1/additionalProperties/type", keyword: "type", params: { type: "integer" }, message: "must be integer" };
            if (vErrors === null) {
              vErrors = [err110];
            } else {
              vErrors.push(err110);
            }
            errors++;
          }
          if (typeof data39 == "number") {
            if (data39 < 0 || isNaN(data39)) {
              const err111 = { instancePath: instancePath + "/response_protections/" + key5.replace(/~/g, "~0").replace(/\//g, "~1"), schemaPath: "#/$defs/CountMap/oneOf/1/additionalProperties/minimum", keyword: "minimum", params: { comparison: ">=", limit: 0 }, message: "must be >= 0" };
              if (vErrors === null) {
                vErrors = [err111];
              } else {
                vErrors.push(err111);
              }
              errors++;
            }
          }
        }
      } else {
        const err112 = { instancePath: instancePath + "/response_protections", schemaPath: "#/$defs/CountMap/oneOf/1/type", keyword: "type", params: { type: "object" }, message: "must be object" };
        if (vErrors === null) {
          vErrors = [err112];
        } else {
          vErrors.push(err112);
        }
        errors++;
      }
      var _valid8 = _errs121 === errors;
      if (_valid8 && valid36) {
        valid36 = false;
        passing8 = [passing8, 1];
      } else {
        if (_valid8) {
          valid36 = true;
          passing8 = 1;
        }
      }
      if (!valid36) {
        const err113 = { instancePath: instancePath + "/response_protections", schemaPath: "#/$defs/CountMap/oneOf", keyword: "oneOf", params: { passingSchemas: passing8 }, message: "must match exactly one schema in oneOf" };
        if (vErrors === null) {
          vErrors = [err113];
        } else {
          vErrors.push(err113);
        }
        errors++;
      } else {
        errors = _errs118;
        if (vErrors !== null) {
          if (_errs118) {
            vErrors.length = _errs118;
          } else {
            vErrors = null;
          }
        }
      }
    }
    if (data.intervention_decision !== void 0) {
      let data40 = data.intervention_decision;
      if (!(data40 && typeof data40 == "object" && !Array.isArray(data40)) && data40 !== null) {
        const err114 = { instancePath: instancePath + "/intervention_decision", schemaPath: "#/properties/intervention_decision/type", keyword: "type", params: { type: schema75.properties.intervention_decision.type }, message: "must be object,null" };
        if (vErrors === null) {
          vErrors = [err114];
        } else {
          vErrors.push(err114);
        }
        errors++;
      }
    }
    if (data.orchestrator_input !== void 0) {
      let data41 = data.orchestrator_input;
      if (!(data41 && typeof data41 == "object" && !Array.isArray(data41)) && data41 !== null) {
        const err115 = { instancePath: instancePath + "/orchestrator_input", schemaPath: "#/properties/orchestrator_input/type", keyword: "type", params: { type: schema75.properties.orchestrator_input.type }, message: "must be object,null" };
        if (vErrors === null) {
          vErrors = [err115];
        } else {
          vErrors.push(err115);
        }
        errors++;
      }
    }
    if (data.frontend_input !== void 0) {
      let data42 = data.frontend_input;
      const _errs132 = errors;
      let valid39 = false;
      let passing9 = null;
      const _errs133 = errors;
      if (data42 !== null) {
        const err116 = { instancePath: instancePath + "/frontend_input", schemaPath: "#/properties/frontend_input/oneOf/0/type", keyword: "type", params: { type: "null" }, message: "must be null" };
        if (vErrors === null) {
          vErrors = [err116];
        } else {
          vErrors.push(err116);
        }
        errors++;
      }
      var _valid9 = _errs133 === errors;
      if (_valid9) {
        valid39 = true;
        passing9 = 0;
      }
      const _errs135 = errors;
      if (data42 && typeof data42 == "object" && !Array.isArray(data42)) {
        if (data42.turn_failure_signal !== void 0) {
          let data43 = data42.turn_failure_signal;
          const _errs138 = errors;
          let valid41 = false;
          let passing10 = null;
          const _errs139 = errors;
          if (data43 !== null) {
            const err117 = { instancePath: instancePath + "/frontend_input/turn_failure_signal", schemaPath: "#/properties/frontend_input/oneOf/1/properties/turn_failure_signal/oneOf/0/type", keyword: "type", params: { type: "null" }, message: "must be null" };
            if (vErrors === null) {
              vErrors = [err117];
            } else {
              vErrors.push(err117);
            }
            errors++;
          }
          var _valid10 = _errs139 === errors;
          if (_valid10) {
            valid41 = true;
            passing10 = 0;
          }
          const _errs141 = errors;
          if (!validate44(data43, { instancePath: instancePath + "/frontend_input/turn_failure_signal", parentData: data42, parentDataProperty: "turn_failure_signal", rootData, dynamicAnchors })) {
            vErrors = vErrors === null ? validate44.errors : vErrors.concat(validate44.errors);
            errors = vErrors.length;
          }
          var _valid10 = _errs141 === errors;
          if (_valid10 && valid41) {
            valid41 = false;
            passing10 = [passing10, 1];
          } else {
            if (_valid10) {
              valid41 = true;
              passing10 = 1;
              var props6 = {};
              props6.session_id = true;
              props6.write_committed = true;
              props6.staff_alert = true;
              props6.pause_reason = true;
            }
          }
          if (!valid41) {
            const err118 = { instancePath: instancePath + "/frontend_input/turn_failure_signal", schemaPath: "#/properties/frontend_input/oneOf/1/properties/turn_failure_signal/oneOf", keyword: "oneOf", params: { passingSchemas: passing10 }, message: "must match exactly one schema in oneOf" };
            if (vErrors === null) {
              vErrors = [err118];
            } else {
              vErrors.push(err118);
            }
            errors++;
          } else {
            errors = _errs138;
            if (vErrors !== null) {
              if (_errs138) {
                vErrors.length = _errs138;
              } else {
                vErrors = null;
              }
            }
          }
        }
      } else {
        const err119 = { instancePath: instancePath + "/frontend_input", schemaPath: "#/properties/frontend_input/oneOf/1/type", keyword: "type", params: { type: "object" }, message: "must be object" };
        if (vErrors === null) {
          vErrors = [err119];
        } else {
          vErrors.push(err119);
        }
        errors++;
      }
      var _valid9 = _errs135 === errors;
      if (_valid9 && valid39) {
        valid39 = false;
        passing9 = [passing9, 1];
      } else {
        if (_valid9) {
          valid39 = true;
          passing9 = 1;
          var props7 = {};
          props7.turn_failure_signal = true;
        }
      }
      if (!valid39) {
        const err120 = { instancePath: instancePath + "/frontend_input", schemaPath: "#/properties/frontend_input/oneOf", keyword: "oneOf", params: { passingSchemas: passing9 }, message: "must match exactly one schema in oneOf" };
        if (vErrors === null) {
          vErrors = [err120];
        } else {
          vErrors.push(err120);
        }
        errors++;
      } else {
        errors = _errs132;
        if (vErrors !== null) {
          if (_errs132) {
            vErrors.length = _errs132;
          } else {
            vErrors = null;
          }
        }
      }
    }
    if (data.staff_console_input !== void 0) {
      let data44 = data.staff_console_input;
      if (!(data44 && typeof data44 == "object" && !Array.isArray(data44)) && data44 !== null) {
        const err121 = { instancePath: instancePath + "/staff_console_input", schemaPath: "#/properties/staff_console_input/type", keyword: "type", params: { type: schema75.properties.staff_console_input.type }, message: "must be object,null" };
        if (vErrors === null) {
          vErrors = [err121];
        } else {
          vErrors.push(err121);
        }
        errors++;
      }
    }
    if (data.dispatch_input !== void 0) {
      let data45 = data.dispatch_input;
      if (!(data45 && typeof data45 == "object" && !Array.isArray(data45)) && data45 !== null) {
        const err122 = { instancePath: instancePath + "/dispatch_input", schemaPath: "#/properties/dispatch_input/type", keyword: "type", params: { type: schema75.properties.dispatch_input.type }, message: "must be object,null" };
        if (vErrors === null) {
          vErrors = [err122];
        } else {
          vErrors.push(err122);
        }
        errors++;
      }
    }
    if (data.dispatch_output !== void 0) {
      let data46 = data.dispatch_output;
      if (!(data46 && typeof data46 == "object" && !Array.isArray(data46)) && data46 !== null) {
        const err123 = { instancePath: instancePath + "/dispatch_output", schemaPath: "#/properties/dispatch_output/type", keyword: "type", params: { type: schema75.properties.dispatch_output.type }, message: "must be object,null" };
        if (vErrors === null) {
          vErrors = [err123];
        } else {
          vErrors.push(err123);
        }
        errors++;
      }
    }
    if (data.orchestrator_output !== void 0) {
      let data47 = data.orchestrator_output;
      const _errs149 = errors;
      let valid42 = false;
      let passing11 = null;
      const _errs150 = errors;
      if (data47 !== null) {
        const err124 = { instancePath: instancePath + "/orchestrator_output", schemaPath: "#/properties/orchestrator_output/oneOf/0/type", keyword: "type", params: { type: "null" }, message: "must be null" };
        if (vErrors === null) {
          vErrors = [err124];
        } else {
          vErrors.push(err124);
        }
        errors++;
      }
      var _valid11 = _errs150 === errors;
      if (_valid11) {
        valid42 = true;
        passing11 = 0;
      }
      const _errs152 = errors;
      if (!validate46(data47, { instancePath: instancePath + "/orchestrator_output", parentData: data, parentDataProperty: "orchestrator_output", rootData, dynamicAnchors })) {
        vErrors = vErrors === null ? validate46.errors : vErrors.concat(validate46.errors);
        errors = vErrors.length;
      }
      var _valid11 = _errs152 === errors;
      if (_valid11 && valid42) {
        valid42 = false;
        passing11 = [passing11, 1];
      } else {
        if (_valid11) {
          valid42 = true;
          passing11 = 1;
          var props8 = {};
          props8.turn_failure_signal = true;
          props8.intervention_result = true;
          props8.log_entry = true;
        }
      }
      if (!valid42) {
        const err125 = { instancePath: instancePath + "/orchestrator_output", schemaPath: "#/properties/orchestrator_output/oneOf", keyword: "oneOf", params: { passingSchemas: passing11 }, message: "must match exactly one schema in oneOf" };
        if (vErrors === null) {
          vErrors = [err125];
        } else {
          vErrors.push(err125);
        }
        errors++;
      } else {
        errors = _errs149;
        if (vErrors !== null) {
          if (_errs149) {
            vErrors.length = _errs149;
          } else {
            vErrors = null;
          }
        }
      }
    }
    if (data.session_before !== void 0) {
      let data48 = data.session_before;
      if (!(data48 && typeof data48 == "object" && !Array.isArray(data48)) && data48 !== null) {
        const err126 = { instancePath: instancePath + "/session_before", schemaPath: "#/properties/session_before/type", keyword: "type", params: { type: schema75.properties.session_before.type }, message: "must be object,null" };
        if (vErrors === null) {
          vErrors = [err126];
        } else {
          vErrors.push(err126);
        }
        errors++;
      }
    }
    if (data.session_after !== void 0) {
      let data49 = data.session_after;
      if (!(data49 && typeof data49 == "object" && !Array.isArray(data49)) && data49 !== null) {
        const err127 = { instancePath: instancePath + "/session_after", schemaPath: "#/properties/session_after/type", keyword: "type", params: { type: schema75.properties.session_after.type }, message: "must be object,null" };
        if (vErrors === null) {
          vErrors = [err127];
        } else {
          vErrors.push(err127);
        }
        errors++;
      }
    }
    if (data.log_entry !== void 0) {
      let data50 = data.log_entry;
      const _errs158 = errors;
      let valid43 = false;
      let passing12 = null;
      const _errs159 = errors;
      if (data50 !== null) {
        const err128 = { instancePath: instancePath + "/log_entry", schemaPath: "#/properties/log_entry/oneOf/0/type", keyword: "type", params: { type: "null" }, message: "must be null" };
        if (vErrors === null) {
          vErrors = [err128];
        } else {
          vErrors.push(err128);
        }
        errors++;
      }
      var _valid12 = _errs159 === errors;
      if (_valid12) {
        valid43 = true;
        passing12 = 0;
      }
      const _errs161 = errors;
      if (!validate48(data50, { instancePath: instancePath + "/log_entry", parentData: data, parentDataProperty: "log_entry", rootData, dynamicAnchors })) {
        vErrors = vErrors === null ? validate48.errors : vErrors.concat(validate48.errors);
        errors = vErrors.length;
      }
      var _valid12 = _errs161 === errors;
      if (_valid12 && valid43) {
        valid43 = false;
        passing12 = [passing12, 1];
      } else {
        if (_valid12) {
          valid43 = true;
          passing12 = 1;
          var props9 = {};
          props9.turn_result = true;
          props9.staff_alert_delivery = true;
          props9.turn_failure_signal = true;
        }
      }
      if (!valid43) {
        const err129 = { instancePath: instancePath + "/log_entry", schemaPath: "#/properties/log_entry/oneOf", keyword: "oneOf", params: { passingSchemas: passing12 }, message: "must match exactly one schema in oneOf" };
        if (vErrors === null) {
          vErrors = [err129];
        } else {
          vErrors.push(err129);
        }
        errors++;
      } else {
        errors = _errs158;
        if (vErrors !== null) {
          if (_errs158) {
            vErrors.length = _errs158;
          } else {
            vErrors = null;
          }
        }
      }
    }
    if (data.persistence_load_request !== void 0) {
      let data51 = data.persistence_load_request;
      if (!(data51 && typeof data51 == "object" && !Array.isArray(data51)) && data51 !== null) {
        const err130 = { instancePath: instancePath + "/persistence_load_request", schemaPath: "#/properties/persistence_load_request/type", keyword: "type", params: { type: schema75.properties.persistence_load_request.type }, message: "must be object,null" };
        if (vErrors === null) {
          vErrors = [err130];
        } else {
          vErrors.push(err130);
        }
        errors++;
      }
    }
    if (data.persistence_load_result !== void 0) {
      let data52 = data.persistence_load_result;
      if (!(data52 && typeof data52 == "object" && !Array.isArray(data52)) && data52 !== null) {
        const err131 = { instancePath: instancePath + "/persistence_load_result", schemaPath: "#/properties/persistence_load_result/type", keyword: "type", params: { type: schema75.properties.persistence_load_result.type }, message: "must be object,null" };
        if (vErrors === null) {
          vErrors = [err131];
        } else {
          vErrors.push(err131);
        }
        errors++;
      }
    }
    if (data.persistence_commit_request !== void 0) {
      let data53 = data.persistence_commit_request;
      if (!(data53 && typeof data53 == "object" && !Array.isArray(data53)) && data53 !== null) {
        const err132 = { instancePath: instancePath + "/persistence_commit_request", schemaPath: "#/properties/persistence_commit_request/type", keyword: "type", params: { type: schema75.properties.persistence_commit_request.type }, message: "must be object,null" };
        if (vErrors === null) {
          vErrors = [err132];
        } else {
          vErrors.push(err132);
        }
        errors++;
      }
    }
    if (data.persistence_commit_result !== void 0) {
      let data54 = data.persistence_commit_result;
      const _errs169 = errors;
      let valid44 = false;
      let passing13 = null;
      const _errs170 = errors;
      if (data54 !== null) {
        const err133 = { instancePath: instancePath + "/persistence_commit_result", schemaPath: "#/properties/persistence_commit_result/oneOf/0/type", keyword: "type", params: { type: "null" }, message: "must be null" };
        if (vErrors === null) {
          vErrors = [err133];
        } else {
          vErrors.push(err133);
        }
        errors++;
      }
      var _valid13 = _errs170 === errors;
      if (_valid13) {
        valid44 = true;
        passing13 = 0;
      }
      const _errs172 = errors;
      if (data54 && typeof data54 == "object" && !Array.isArray(data54)) {
        if (data54.session_id !== void 0) {
          let data55 = data54.session_id;
          if (typeof data55 === "string") {
            if (!pattern19.test(data55)) {
              const err134 = { instancePath: instancePath + "/persistence_commit_result/session_id", schemaPath: "#/$defs/Pseudonym/pattern", keyword: "pattern", params: { pattern: "^p-[0-9a-f]{32}$" }, message: 'must match pattern "^p-[0-9a-f]{32}$"' };
              if (vErrors === null) {
                vErrors = [err134];
              } else {
                vErrors.push(err134);
              }
              errors++;
            }
          } else {
            const err135 = { instancePath: instancePath + "/persistence_commit_result/session_id", schemaPath: "#/$defs/Pseudonym/type", keyword: "type", params: { type: "string" }, message: "must be string" };
            if (vErrors === null) {
              vErrors = [err135];
            } else {
              vErrors.push(err135);
            }
            errors++;
          }
        }
        if (data54.status !== void 0) {
          let data56 = data54.status;
          if (!(data56 === "OK" || data56 === "REVISION_CONFLICT" || data56 === "DB_ERROR")) {
            const err136 = { instancePath: instancePath + "/persistence_commit_result/status", schemaPath: "#/properties/persistence_commit_result/oneOf/1/properties/status/enum", keyword: "enum", params: { allowedValues: schema75.properties.persistence_commit_result.oneOf[1].properties.status.enum }, message: "must be equal to one of the allowed values" };
            if (vErrors === null) {
              vErrors = [err136];
            } else {
              vErrors.push(err136);
            }
            errors++;
          }
        }
        if (data54.write_outcome !== void 0) {
          let data57 = data54.write_outcome;
          if (!(data57 === "APPLIED" || data57 === "NOT_APPLIED" || data57 === "UNKNOWN")) {
            const err137 = { instancePath: instancePath + "/persistence_commit_result/write_outcome", schemaPath: "#/properties/persistence_commit_result/oneOf/1/properties/write_outcome/enum", keyword: "enum", params: { allowedValues: schema75.properties.persistence_commit_result.oneOf[1].properties.write_outcome.enum }, message: "must be equal to one of the allowed values" };
            if (vErrors === null) {
              vErrors = [err137];
            } else {
              vErrors.push(err137);
            }
            errors++;
          }
        }
      } else {
        const err138 = { instancePath: instancePath + "/persistence_commit_result", schemaPath: "#/properties/persistence_commit_result/oneOf/1/type", keyword: "type", params: { type: "object" }, message: "must be object" };
        if (vErrors === null) {
          vErrors = [err138];
        } else {
          vErrors.push(err138);
        }
        errors++;
      }
      var _valid13 = _errs172 === errors;
      if (_valid13 && valid44) {
        valid44 = false;
        passing13 = [passing13, 1];
      } else {
        if (_valid13) {
          valid44 = true;
          passing13 = 1;
          var props10 = {};
          props10.session_id = true;
          props10.status = true;
          props10.write_outcome = true;
        }
      }
      if (!valid44) {
        const err139 = { instancePath: instancePath + "/persistence_commit_result", schemaPath: "#/properties/persistence_commit_result/oneOf", keyword: "oneOf", params: { passingSchemas: passing13 }, message: "must match exactly one schema in oneOf" };
        if (vErrors === null) {
          vErrors = [err139];
        } else {
          vErrors.push(err139);
        }
        errors++;
      } else {
        errors = _errs169;
        if (vErrors !== null) {
          if (_errs169) {
            vErrors.length = _errs169;
          } else {
            vErrors = null;
          }
        }
      }
    }
  } else {
    const err140 = { instancePath, schemaPath: "#/type", keyword: "type", params: { type: "object" }, message: "must be object" };
    if (vErrors === null) {
      vErrors = [err140];
    } else {
      vErrors.push(err140);
    }
    errors++;
  }
  validate43.errors = vErrors;
  return errors === 0;
}
validate43.evaluated = { "props": true, "dynamicProps": false, "dynamicItems": false };
exports.ImageLabels = validate53;
var pattern41 = new RegExp("^io\\.openit\\.(?!(service|revision|contracts\\.boundary|contracts\\.survey-schema|model-runtime|variant|app-version|langgraph|jobs|exposure|database|inputs)$)", "u");
var pattern42 = new RegExp("^[a-z][a-z0-9-]*$", "u");
var pattern43 = new RegExp("^[0-9a-f]{7,40}$", "u");
var pattern44 = new RegExp("^v[0-9]+\\.[0-9]+\\.[0-9]+$", "u");
var pattern45 = new RegExp("^([0-9]+|n/a)$", "u");
var pattern46 = new RegExp("^(v[0-9]+\\.[0-9]+\\.[0-9]+|n/a)$", "u");
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
  if (data && typeof data == "object" && !Array.isArray(data)) {
    if (data["io.openit.service"] === void 0) {
      const err0 = { instancePath, schemaPath: "#/required", keyword: "required", params: { missingProperty: "io.openit.service" }, message: "must have required property 'io.openit.service'" };
      if (vErrors === null) {
        vErrors = [err0];
      } else {
        vErrors.push(err0);
      }
      errors++;
    }
    if (data["io.openit.revision"] === void 0) {
      const err1 = { instancePath, schemaPath: "#/required", keyword: "required", params: { missingProperty: "io.openit.revision" }, message: "must have required property 'io.openit.revision'" };
      if (vErrors === null) {
        vErrors = [err1];
      } else {
        vErrors.push(err1);
      }
      errors++;
    }
    if (data["io.openit.contracts.boundary"] === void 0) {
      const err2 = { instancePath, schemaPath: "#/required", keyword: "required", params: { missingProperty: "io.openit.contracts.boundary" }, message: "must have required property 'io.openit.contracts.boundary'" };
      if (vErrors === null) {
        vErrors = [err2];
      } else {
        vErrors.push(err2);
      }
      errors++;
    }
    if (data["io.openit.contracts.survey-schema"] === void 0) {
      const err3 = { instancePath, schemaPath: "#/required", keyword: "required", params: { missingProperty: "io.openit.contracts.survey-schema" }, message: "must have required property 'io.openit.contracts.survey-schema'" };
      if (vErrors === null) {
        vErrors = [err3];
      } else {
        vErrors.push(err3);
      }
      errors++;
    }
    if (data["io.openit.inputs"] === void 0) {
      const err4 = { instancePath, schemaPath: "#/required", keyword: "required", params: { missingProperty: "io.openit.inputs" }, message: "must have required property 'io.openit.inputs'" };
      if (vErrors === null) {
        vErrors = [err4];
      } else {
        vErrors.push(err4);
      }
      errors++;
    }
    for (const key0 in data) {
      const _errs1 = errors;
      const _errs2 = errors;
      const _errs3 = errors;
      if (typeof key0 === "string") {
        if (!pattern41.test(key0)) {
          const err5 = {};
          if (vErrors === null) {
            vErrors = [err5];
          } else {
            vErrors.push(err5);
          }
          errors++;
        }
      }
      var valid1 = _errs3 === errors;
      if (valid1) {
        const err6 = { instancePath, schemaPath: "#/propertyNames/not", keyword: "not", params: {}, message: "must NOT be valid", propertyName: key0 };
        if (vErrors === null) {
          vErrors = [err6];
        } else {
          vErrors.push(err6);
        }
        errors++;
      } else {
        errors = _errs2;
        if (vErrors !== null) {
          if (_errs2) {
            vErrors.length = _errs2;
          } else {
            vErrors = null;
          }
        }
      }
      var valid0 = _errs1 === errors;
      if (!valid0) {
        const err7 = { instancePath, schemaPath: "#/propertyNames", keyword: "propertyNames", params: { propertyName: key0 }, message: "property name must be valid" };
        if (vErrors === null) {
          vErrors = [err7];
        } else {
          vErrors.push(err7);
        }
        errors++;
      }
    }
    if (data["io.openit.service"] !== void 0) {
      let data0 = data["io.openit.service"];
      if (typeof data0 === "string") {
        if (!pattern42.test(data0)) {
          const err8 = { instancePath: instancePath + "/io.openit.service", schemaPath: "#/properties/io.openit.service/pattern", keyword: "pattern", params: { pattern: "^[a-z][a-z0-9-]*$" }, message: 'must match pattern "^[a-z][a-z0-9-]*$"' };
          if (vErrors === null) {
            vErrors = [err8];
          } else {
            vErrors.push(err8);
          }
          errors++;
        }
      } else {
        const err9 = { instancePath: instancePath + "/io.openit.service", schemaPath: "#/properties/io.openit.service/type", keyword: "type", params: { type: "string" }, message: "must be string" };
        if (vErrors === null) {
          vErrors = [err9];
        } else {
          vErrors.push(err9);
        }
        errors++;
      }
    }
    if (data["io.openit.revision"] !== void 0) {
      let data1 = data["io.openit.revision"];
      if (typeof data1 === "string") {
        if (!pattern43.test(data1)) {
          const err10 = { instancePath: instancePath + "/io.openit.revision", schemaPath: "#/properties/io.openit.revision/pattern", keyword: "pattern", params: { pattern: "^[0-9a-f]{7,40}$" }, message: 'must match pattern "^[0-9a-f]{7,40}$"' };
          if (vErrors === null) {
            vErrors = [err10];
          } else {
            vErrors.push(err10);
          }
          errors++;
        }
      } else {
        const err11 = { instancePath: instancePath + "/io.openit.revision", schemaPath: "#/properties/io.openit.revision/type", keyword: "type", params: { type: "string" }, message: "must be string" };
        if (vErrors === null) {
          vErrors = [err11];
        } else {
          vErrors.push(err11);
        }
        errors++;
      }
    }
    if (data["io.openit.contracts.boundary"] !== void 0) {
      let data2 = data["io.openit.contracts.boundary"];
      if (typeof data2 === "string") {
        if (!pattern44.test(data2)) {
          const err12 = { instancePath: instancePath + "/io.openit.contracts.boundary", schemaPath: "#/properties/io.openit.contracts.boundary/pattern", keyword: "pattern", params: { pattern: "^v[0-9]+\\.[0-9]+\\.[0-9]+$" }, message: 'must match pattern "^v[0-9]+\\.[0-9]+\\.[0-9]+$"' };
          if (vErrors === null) {
            vErrors = [err12];
          } else {
            vErrors.push(err12);
          }
          errors++;
        }
      } else {
        const err13 = { instancePath: instancePath + "/io.openit.contracts.boundary", schemaPath: "#/properties/io.openit.contracts.boundary/type", keyword: "type", params: { type: "string" }, message: "must be string" };
        if (vErrors === null) {
          vErrors = [err13];
        } else {
          vErrors.push(err13);
        }
        errors++;
      }
    }
    if (data["io.openit.contracts.survey-schema"] !== void 0) {
      let data3 = data["io.openit.contracts.survey-schema"];
      if (typeof data3 === "string") {
        if (!pattern45.test(data3)) {
          const err14 = { instancePath: instancePath + "/io.openit.contracts.survey-schema", schemaPath: "#/properties/io.openit.contracts.survey-schema/pattern", keyword: "pattern", params: { pattern: "^([0-9]+|n/a)$" }, message: 'must match pattern "^([0-9]+|n/a)$"' };
          if (vErrors === null) {
            vErrors = [err14];
          } else {
            vErrors.push(err14);
          }
          errors++;
        }
      } else {
        const err15 = { instancePath: instancePath + "/io.openit.contracts.survey-schema", schemaPath: "#/properties/io.openit.contracts.survey-schema/type", keyword: "type", params: { type: "string" }, message: "must be string" };
        if (vErrors === null) {
          vErrors = [err15];
        } else {
          vErrors.push(err15);
        }
        errors++;
      }
    }
    if (data["io.openit.model-runtime"] !== void 0) {
      let data4 = data["io.openit.model-runtime"];
      if (typeof data4 === "string") {
        if (!pattern46.test(data4)) {
          const err16 = { instancePath: instancePath + "/io.openit.model-runtime", schemaPath: "#/properties/io.openit.model-runtime/pattern", keyword: "pattern", params: { pattern: "^(v[0-9]+\\.[0-9]+\\.[0-9]+|n/a)$" }, message: 'must match pattern "^(v[0-9]+\\.[0-9]+\\.[0-9]+|n/a)$"' };
          if (vErrors === null) {
            vErrors = [err16];
          } else {
            vErrors.push(err16);
          }
          errors++;
        }
      } else {
        const err17 = { instancePath: instancePath + "/io.openit.model-runtime", schemaPath: "#/properties/io.openit.model-runtime/type", keyword: "type", params: { type: "string" }, message: "must be string" };
        if (vErrors === null) {
          vErrors = [err17];
        } else {
          vErrors.push(err17);
        }
        errors++;
      }
    }
    if (data["io.openit.variant"] !== void 0) {
      let data5 = data["io.openit.variant"];
      if (typeof data5 === "string") {
        if (!pattern42.test(data5)) {
          const err18 = { instancePath: instancePath + "/io.openit.variant", schemaPath: "#/properties/io.openit.variant/pattern", keyword: "pattern", params: { pattern: "^[a-z][a-z0-9-]*$" }, message: 'must match pattern "^[a-z][a-z0-9-]*$"' };
          if (vErrors === null) {
            vErrors = [err18];
          } else {
            vErrors.push(err18);
          }
          errors++;
        }
      } else {
        const err19 = { instancePath: instancePath + "/io.openit.variant", schemaPath: "#/properties/io.openit.variant/type", keyword: "type", params: { type: "string" }, message: "must be string" };
        if (vErrors === null) {
          vErrors = [err19];
        } else {
          vErrors.push(err19);
        }
        errors++;
      }
    }
    if (data["io.openit.app-version"] !== void 0) {
      let data6 = data["io.openit.app-version"];
      if (typeof data6 === "string") {
        if (func1(data6) < 1) {
          const err20 = { instancePath: instancePath + "/io.openit.app-version", schemaPath: "#/properties/io.openit.app-version/minLength", keyword: "minLength", params: { limit: 1 }, message: "must NOT have fewer than 1 characters" };
          if (vErrors === null) {
            vErrors = [err20];
          } else {
            vErrors.push(err20);
          }
          errors++;
        }
      } else {
        const err21 = { instancePath: instancePath + "/io.openit.app-version", schemaPath: "#/properties/io.openit.app-version/type", keyword: "type", params: { type: "string" }, message: "must be string" };
        if (vErrors === null) {
          vErrors = [err21];
        } else {
          vErrors.push(err21);
        }
        errors++;
      }
    }
    if (data["io.openit.langgraph"] !== void 0) {
      let data7 = data["io.openit.langgraph"];
      if (typeof data7 === "string") {
        if (func1(data7) < 1) {
          const err22 = { instancePath: instancePath + "/io.openit.langgraph", schemaPath: "#/properties/io.openit.langgraph/minLength", keyword: "minLength", params: { limit: 1 }, message: "must NOT have fewer than 1 characters" };
          if (vErrors === null) {
            vErrors = [err22];
          } else {
            vErrors.push(err22);
          }
          errors++;
        }
      } else {
        const err23 = { instancePath: instancePath + "/io.openit.langgraph", schemaPath: "#/properties/io.openit.langgraph/type", keyword: "type", params: { type: "string" }, message: "must be string" };
        if (vErrors === null) {
          vErrors = [err23];
        } else {
          vErrors.push(err23);
        }
        errors++;
      }
    }
    if (data["io.openit.jobs"] !== void 0) {
      if (typeof data["io.openit.jobs"] !== "string") {
        const err24 = { instancePath: instancePath + "/io.openit.jobs", schemaPath: "#/properties/io.openit.jobs/type", keyword: "type", params: { type: "string" }, message: "must be string" };
        if (vErrors === null) {
          vErrors = [err24];
        } else {
          vErrors.push(err24);
        }
        errors++;
      }
    }
    if (data["io.openit.exposure"] !== void 0) {
      if (typeof data["io.openit.exposure"] !== "string") {
        const err25 = { instancePath: instancePath + "/io.openit.exposure", schemaPath: "#/properties/io.openit.exposure/type", keyword: "type", params: { type: "string" }, message: "must be string" };
        if (vErrors === null) {
          vErrors = [err25];
        } else {
          vErrors.push(err25);
        }
        errors++;
      }
    }
    if (data["io.openit.database"] !== void 0) {
      if (typeof data["io.openit.database"] !== "string") {
        const err26 = { instancePath: instancePath + "/io.openit.database", schemaPath: "#/properties/io.openit.database/type", keyword: "type", params: { type: "string" }, message: "must be string" };
        if (vErrors === null) {
          vErrors = [err26];
        } else {
          vErrors.push(err26);
        }
        errors++;
      }
    }
    if (data["io.openit.inputs"] !== void 0) {
      if (typeof data["io.openit.inputs"] !== "string") {
        const err27 = { instancePath: instancePath + "/io.openit.inputs", schemaPath: "#/properties/io.openit.inputs/type", keyword: "type", params: { type: "string" }, message: "must be string" };
        if (vErrors === null) {
          vErrors = [err27];
        } else {
          vErrors.push(err27);
        }
        errors++;
      }
    }
  } else {
    const err28 = { instancePath, schemaPath: "#/type", keyword: "type", params: { type: "object" }, message: "must be object" };
    if (vErrors === null) {
      vErrors = [err28];
    } else {
      vErrors.push(err28);
    }
    errors++;
  }
  validate53.errors = vErrors;
  return errors === 0;
}
validate53.evaluated = { "props": { "io.openit.service": true, "io.openit.revision": true, "io.openit.contracts.boundary": true, "io.openit.contracts.survey-schema": true, "io.openit.model-runtime": true, "io.openit.variant": true, "io.openit.app-version": true, "io.openit.langgraph": true, "io.openit.jobs": true, "io.openit.exposure": true, "io.openit.database": true, "io.openit.inputs": true }, "dynamicProps": false, "dynamicItems": false };
exports.BuildImageRequest = validate54;
var pattern48 = new RegExp("^/", "u");
var pattern56 = new RegExp("^[a-z0-9-]+$", "u");
var pattern57 = new RegExp("^[a-z0-9./_-]+:[A-Za-z0-9._-]+$", "u");
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
    if (data.source_dir === void 0) {
      const err0 = { instancePath, schemaPath: "#/required", keyword: "required", params: { missingProperty: "source_dir" }, message: "must have required property 'source_dir'" };
      if (vErrors === null) {
        vErrors = [err0];
      } else {
        vErrors.push(err0);
      }
      errors++;
    }
    if (data.revision === void 0) {
      const err1 = { instancePath, schemaPath: "#/required", keyword: "required", params: { missingProperty: "revision" }, message: "must have required property 'revision'" };
      if (vErrors === null) {
        vErrors = [err1];
      } else {
        vErrors.push(err1);
      }
      errors++;
    }
    if (data.versions === void 0) {
      const err2 = { instancePath, schemaPath: "#/required", keyword: "required", params: { missingProperty: "versions" }, message: "must have required property 'versions'" };
      if (vErrors === null) {
        vErrors = [err2];
      } else {
        vErrors.push(err2);
      }
      errors++;
    }
    if (data.image_tag === void 0) {
      const err3 = { instancePath, schemaPath: "#/required", keyword: "required", params: { missingProperty: "image_tag" }, message: "must have required property 'image_tag'" };
      if (vErrors === null) {
        vErrors = [err3];
      } else {
        vErrors.push(err3);
      }
      errors++;
    }
    for (const key0 in data) {
      if (!(key0 === "source_dir" || key0 === "revision" || key0 === "versions" || key0 === "dependency_sources" || key0 === "variant" || key0 === "image_tag")) {
        const err4 = { instancePath, schemaPath: "#/additionalProperties", keyword: "additionalProperties", params: { additionalProperty: key0 }, message: "must NOT have additional properties" };
        if (vErrors === null) {
          vErrors = [err4];
        } else {
          vErrors.push(err4);
        }
        errors++;
      }
    }
    if (data.source_dir !== void 0) {
      let data0 = data.source_dir;
      if (typeof data0 === "string") {
        if (func1(data0) < 1) {
          const err5 = { instancePath: instancePath + "/source_dir", schemaPath: "#/properties/source_dir/minLength", keyword: "minLength", params: { limit: 1 }, message: "must NOT have fewer than 1 characters" };
          if (vErrors === null) {
            vErrors = [err5];
          } else {
            vErrors.push(err5);
          }
          errors++;
        }
        if (!pattern48.test(data0)) {
          const err6 = { instancePath: instancePath + "/source_dir", schemaPath: "#/properties/source_dir/pattern", keyword: "pattern", params: { pattern: "^/" }, message: 'must match pattern "^/"' };
          if (vErrors === null) {
            vErrors = [err6];
          } else {
            vErrors.push(err6);
          }
          errors++;
        }
      } else {
        const err7 = { instancePath: instancePath + "/source_dir", schemaPath: "#/properties/source_dir/type", keyword: "type", params: { type: "string" }, message: "must be string" };
        if (vErrors === null) {
          vErrors = [err7];
        } else {
          vErrors.push(err7);
        }
        errors++;
      }
    }
    if (data.revision !== void 0) {
      let data1 = data.revision;
      if (typeof data1 === "string") {
        if (!pattern43.test(data1)) {
          const err8 = { instancePath: instancePath + "/revision", schemaPath: "#/properties/revision/pattern", keyword: "pattern", params: { pattern: "^[0-9a-f]{7,40}$" }, message: 'must match pattern "^[0-9a-f]{7,40}$"' };
          if (vErrors === null) {
            vErrors = [err8];
          } else {
            vErrors.push(err8);
          }
          errors++;
        }
      } else {
        const err9 = { instancePath: instancePath + "/revision", schemaPath: "#/properties/revision/type", keyword: "type", params: { type: "string" }, message: "must be string" };
        if (vErrors === null) {
          vErrors = [err9];
        } else {
          vErrors.push(err9);
        }
        errors++;
      }
    }
    if (data.versions !== void 0) {
      let data2 = data.versions;
      if (data2 && typeof data2 == "object" && !Array.isArray(data2)) {
        if (data2.boundary === void 0) {
          const err10 = { instancePath: instancePath + "/versions", schemaPath: "#/properties/versions/required", keyword: "required", params: { missingProperty: "boundary" }, message: "must have required property 'boundary'" };
          if (vErrors === null) {
            vErrors = [err10];
          } else {
            vErrors.push(err10);
          }
          errors++;
        }
        for (const key1 in data2) {
          if (!(key1 === "boundary" || key1 === "model_runtime" || key1 === "survey_schema")) {
            const err11 = { instancePath: instancePath + "/versions", schemaPath: "#/properties/versions/additionalProperties", keyword: "additionalProperties", params: { additionalProperty: key1 }, message: "must NOT have additional properties" };
            if (vErrors === null) {
              vErrors = [err11];
            } else {
              vErrors.push(err11);
            }
            errors++;
          }
        }
        if (data2.boundary !== void 0) {
          let data3 = data2.boundary;
          if (typeof data3 === "string") {
            if (!pattern44.test(data3)) {
              const err12 = { instancePath: instancePath + "/versions/boundary", schemaPath: "#/properties/versions/properties/boundary/pattern", keyword: "pattern", params: { pattern: "^v[0-9]+\\.[0-9]+\\.[0-9]+$" }, message: 'must match pattern "^v[0-9]+\\.[0-9]+\\.[0-9]+$"' };
              if (vErrors === null) {
                vErrors = [err12];
              } else {
                vErrors.push(err12);
              }
              errors++;
            }
          } else {
            const err13 = { instancePath: instancePath + "/versions/boundary", schemaPath: "#/properties/versions/properties/boundary/type", keyword: "type", params: { type: "string" }, message: "must be string" };
            if (vErrors === null) {
              vErrors = [err13];
            } else {
              vErrors.push(err13);
            }
            errors++;
          }
        }
        if (data2.model_runtime !== void 0) {
          let data4 = data2.model_runtime;
          if (typeof data4 === "string") {
            if (!pattern44.test(data4)) {
              const err14 = { instancePath: instancePath + "/versions/model_runtime", schemaPath: "#/properties/versions/properties/model_runtime/pattern", keyword: "pattern", params: { pattern: "^v[0-9]+\\.[0-9]+\\.[0-9]+$" }, message: 'must match pattern "^v[0-9]+\\.[0-9]+\\.[0-9]+$"' };
              if (vErrors === null) {
                vErrors = [err14];
              } else {
                vErrors.push(err14);
              }
              errors++;
            }
          } else {
            const err15 = { instancePath: instancePath + "/versions/model_runtime", schemaPath: "#/properties/versions/properties/model_runtime/type", keyword: "type", params: { type: "string" }, message: "must be string" };
            if (vErrors === null) {
              vErrors = [err15];
            } else {
              vErrors.push(err15);
            }
            errors++;
          }
        }
        if (data2.survey_schema !== void 0) {
          let data5 = data2.survey_schema;
          if (typeof data5 === "string") {
            if (!pattern44.test(data5)) {
              const err16 = { instancePath: instancePath + "/versions/survey_schema", schemaPath: "#/properties/versions/properties/survey_schema/pattern", keyword: "pattern", params: { pattern: "^v[0-9]+\\.[0-9]+\\.[0-9]+$" }, message: 'must match pattern "^v[0-9]+\\.[0-9]+\\.[0-9]+$"' };
              if (vErrors === null) {
                vErrors = [err16];
              } else {
                vErrors.push(err16);
              }
              errors++;
            }
          } else {
            const err17 = { instancePath: instancePath + "/versions/survey_schema", schemaPath: "#/properties/versions/properties/survey_schema/type", keyword: "type", params: { type: "string" }, message: "must be string" };
            if (vErrors === null) {
              vErrors = [err17];
            } else {
              vErrors.push(err17);
            }
            errors++;
          }
        }
      } else {
        const err18 = { instancePath: instancePath + "/versions", schemaPath: "#/properties/versions/type", keyword: "type", params: { type: "object" }, message: "must be object" };
        if (vErrors === null) {
          vErrors = [err18];
        } else {
          vErrors.push(err18);
        }
        errors++;
      }
    }
    if (data.dependency_sources !== void 0) {
      let data6 = data.dependency_sources;
      if (data6 && typeof data6 == "object" && !Array.isArray(data6)) {
        for (const key2 in data6) {
          if (!(key2 === "boundary" || key2 === "model_runtime" || key2 === "survey_schema")) {
            const err19 = { instancePath: instancePath + "/dependency_sources", schemaPath: "#/properties/dependency_sources/additionalProperties", keyword: "additionalProperties", params: { additionalProperty: key2 }, message: "must NOT have additional properties" };
            if (vErrors === null) {
              vErrors = [err19];
            } else {
              vErrors.push(err19);
            }
            errors++;
          }
        }
        if (data6.boundary !== void 0) {
          let data7 = data6.boundary;
          if (typeof data7 === "string") {
            if (func1(data7) < 1) {
              const err20 = { instancePath: instancePath + "/dependency_sources/boundary", schemaPath: "#/properties/dependency_sources/properties/boundary/minLength", keyword: "minLength", params: { limit: 1 }, message: "must NOT have fewer than 1 characters" };
              if (vErrors === null) {
                vErrors = [err20];
              } else {
                vErrors.push(err20);
              }
              errors++;
            }
            if (!pattern48.test(data7)) {
              const err21 = { instancePath: instancePath + "/dependency_sources/boundary", schemaPath: "#/properties/dependency_sources/properties/boundary/pattern", keyword: "pattern", params: { pattern: "^/" }, message: 'must match pattern "^/"' };
              if (vErrors === null) {
                vErrors = [err21];
              } else {
                vErrors.push(err21);
              }
              errors++;
            }
          } else {
            const err22 = { instancePath: instancePath + "/dependency_sources/boundary", schemaPath: "#/properties/dependency_sources/properties/boundary/type", keyword: "type", params: { type: "string" }, message: "must be string" };
            if (vErrors === null) {
              vErrors = [err22];
            } else {
              vErrors.push(err22);
            }
            errors++;
          }
        }
        if (data6.model_runtime !== void 0) {
          let data8 = data6.model_runtime;
          if (typeof data8 === "string") {
            if (func1(data8) < 1) {
              const err23 = { instancePath: instancePath + "/dependency_sources/model_runtime", schemaPath: "#/properties/dependency_sources/properties/model_runtime/minLength", keyword: "minLength", params: { limit: 1 }, message: "must NOT have fewer than 1 characters" };
              if (vErrors === null) {
                vErrors = [err23];
              } else {
                vErrors.push(err23);
              }
              errors++;
            }
            if (!pattern48.test(data8)) {
              const err24 = { instancePath: instancePath + "/dependency_sources/model_runtime", schemaPath: "#/properties/dependency_sources/properties/model_runtime/pattern", keyword: "pattern", params: { pattern: "^/" }, message: 'must match pattern "^/"' };
              if (vErrors === null) {
                vErrors = [err24];
              } else {
                vErrors.push(err24);
              }
              errors++;
            }
          } else {
            const err25 = { instancePath: instancePath + "/dependency_sources/model_runtime", schemaPath: "#/properties/dependency_sources/properties/model_runtime/type", keyword: "type", params: { type: "string" }, message: "must be string" };
            if (vErrors === null) {
              vErrors = [err25];
            } else {
              vErrors.push(err25);
            }
            errors++;
          }
        }
        if (data6.survey_schema !== void 0) {
          let data9 = data6.survey_schema;
          if (typeof data9 === "string") {
            if (func1(data9) < 1) {
              const err26 = { instancePath: instancePath + "/dependency_sources/survey_schema", schemaPath: "#/properties/dependency_sources/properties/survey_schema/minLength", keyword: "minLength", params: { limit: 1 }, message: "must NOT have fewer than 1 characters" };
              if (vErrors === null) {
                vErrors = [err26];
              } else {
                vErrors.push(err26);
              }
              errors++;
            }
            if (!pattern48.test(data9)) {
              const err27 = { instancePath: instancePath + "/dependency_sources/survey_schema", schemaPath: "#/properties/dependency_sources/properties/survey_schema/pattern", keyword: "pattern", params: { pattern: "^/" }, message: 'must match pattern "^/"' };
              if (vErrors === null) {
                vErrors = [err27];
              } else {
                vErrors.push(err27);
              }
              errors++;
            }
          } else {
            const err28 = { instancePath: instancePath + "/dependency_sources/survey_schema", schemaPath: "#/properties/dependency_sources/properties/survey_schema/type", keyword: "type", params: { type: "string" }, message: "must be string" };
            if (vErrors === null) {
              vErrors = [err28];
            } else {
              vErrors.push(err28);
            }
            errors++;
          }
        }
      } else {
        const err29 = { instancePath: instancePath + "/dependency_sources", schemaPath: "#/properties/dependency_sources/type", keyword: "type", params: { type: "object" }, message: "must be object" };
        if (vErrors === null) {
          vErrors = [err29];
        } else {
          vErrors.push(err29);
        }
        errors++;
      }
    }
    if (data.variant !== void 0) {
      let data10 = data.variant;
      if (typeof data10 === "string") {
        if (!pattern56.test(data10)) {
          const err30 = { instancePath: instancePath + "/variant", schemaPath: "#/properties/variant/pattern", keyword: "pattern", params: { pattern: "^[a-z0-9-]+$" }, message: 'must match pattern "^[a-z0-9-]+$"' };
          if (vErrors === null) {
            vErrors = [err30];
          } else {
            vErrors.push(err30);
          }
          errors++;
        }
      } else {
        const err31 = { instancePath: instancePath + "/variant", schemaPath: "#/properties/variant/type", keyword: "type", params: { type: "string" }, message: "must be string" };
        if (vErrors === null) {
          vErrors = [err31];
        } else {
          vErrors.push(err31);
        }
        errors++;
      }
    }
    if (data.image_tag !== void 0) {
      let data11 = data.image_tag;
      if (typeof data11 === "string") {
        if (!pattern57.test(data11)) {
          const err32 = { instancePath: instancePath + "/image_tag", schemaPath: "#/properties/image_tag/pattern", keyword: "pattern", params: { pattern: "^[a-z0-9./_-]+:[A-Za-z0-9._-]+$" }, message: 'must match pattern "^[a-z0-9./_-]+:[A-Za-z0-9._-]+$"' };
          if (vErrors === null) {
            vErrors = [err32];
          } else {
            vErrors.push(err32);
          }
          errors++;
        }
      } else {
        const err33 = { instancePath: instancePath + "/image_tag", schemaPath: "#/properties/image_tag/type", keyword: "type", params: { type: "string" }, message: "must be string" };
        if (vErrors === null) {
          vErrors = [err33];
        } else {
          vErrors.push(err33);
        }
        errors++;
      }
    }
  } else {
    const err34 = { instancePath, schemaPath: "#/type", keyword: "type", params: { type: "object" }, message: "must be object" };
    if (vErrors === null) {
      vErrors = [err34];
    } else {
      vErrors.push(err34);
    }
    errors++;
  }
  validate54.errors = vErrors;
  return errors === 0;
}
validate54.evaluated = { "props": true, "dynamicProps": false, "dynamicItems": false };
exports.BuildImageResult = validate55;
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
    if (data.image === void 0) {
      const err0 = { instancePath, schemaPath: "#/required", keyword: "required", params: { missingProperty: "image" }, message: "must have required property 'image'" };
      if (vErrors === null) {
        vErrors = [err0];
      } else {
        vErrors.push(err0);
      }
      errors++;
    }
    if (data.image_id === void 0) {
      const err1 = { instancePath, schemaPath: "#/required", keyword: "required", params: { missingProperty: "image_id" }, message: "must have required property 'image_id'" };
      if (vErrors === null) {
        vErrors = [err1];
      } else {
        vErrors.push(err1);
      }
      errors++;
    }
    if (data.labels === void 0) {
      const err2 = { instancePath, schemaPath: "#/required", keyword: "required", params: { missingProperty: "labels" }, message: "must have required property 'labels'" };
      if (vErrors === null) {
        vErrors = [err2];
      } else {
        vErrors.push(err2);
      }
      errors++;
    }
    for (const key0 in data) {
      if (!(key0 === "image" || key0 === "image_id" || key0 === "labels")) {
        const err3 = { instancePath, schemaPath: "#/additionalProperties", keyword: "additionalProperties", params: { additionalProperty: key0 }, message: "must NOT have additional properties" };
        if (vErrors === null) {
          vErrors = [err3];
        } else {
          vErrors.push(err3);
        }
        errors++;
      }
    }
    if (data.image !== void 0) {
      let data0 = data.image;
      if (typeof data0 === "string") {
        if (!pattern57.test(data0)) {
          const err4 = { instancePath: instancePath + "/image", schemaPath: "#/properties/image/pattern", keyword: "pattern", params: { pattern: "^[a-z0-9./_-]+:[A-Za-z0-9._-]+$" }, message: 'must match pattern "^[a-z0-9./_-]+:[A-Za-z0-9._-]+$"' };
          if (vErrors === null) {
            vErrors = [err4];
          } else {
            vErrors.push(err4);
          }
          errors++;
        }
      } else {
        const err5 = { instancePath: instancePath + "/image", schemaPath: "#/properties/image/type", keyword: "type", params: { type: "string" }, message: "must be string" };
        if (vErrors === null) {
          vErrors = [err5];
        } else {
          vErrors.push(err5);
        }
        errors++;
      }
    }
    if (data.image_id !== void 0) {
      let data1 = data.image_id;
      if (typeof data1 === "string") {
        if (!pattern11.test(data1)) {
          const err6 = { instancePath: instancePath + "/image_id", schemaPath: "_common.schema.json#/$defs/Hash/pattern", keyword: "pattern", params: { pattern: "^sha256:[0-9a-f]{64}$" }, message: 'must match pattern "^sha256:[0-9a-f]{64}$"' };
          if (vErrors === null) {
            vErrors = [err6];
          } else {
            vErrors.push(err6);
          }
          errors++;
        }
      } else {
        const err7 = { instancePath: instancePath + "/image_id", schemaPath: "_common.schema.json#/$defs/Hash/type", keyword: "type", params: { type: "string" }, message: "must be string" };
        if (vErrors === null) {
          vErrors = [err7];
        } else {
          vErrors.push(err7);
        }
        errors++;
      }
    }
    if (data.labels !== void 0) {
      if (!validate53(data.labels, { instancePath: instancePath + "/labels", parentData: data, parentDataProperty: "labels", rootData, dynamicAnchors })) {
        vErrors = vErrors === null ? validate53.errors : vErrors.concat(validate53.errors);
        errors = vErrors.length;
      }
    }
  } else {
    const err8 = { instancePath, schemaPath: "#/type", keyword: "type", params: { type: "object" }, message: "must be object" };
    if (vErrors === null) {
      vErrors = [err8];
    } else {
      vErrors.push(err8);
    }
    errors++;
  }
  validate55.errors = vErrors;
  return errors === 0;
}
validate55.evaluated = { "props": true, "dynamicProps": false, "dynamicItems": false };
exports.SetupEnvReport = validate57;
var schema104 = { "$schema": "https://json-schema.org/draft/2020-12/schema", "$id": "SetupEnvReport.schema.json", "title": "SetupEnvReport", "description": "\uC601\uC5ED scripts/setup-env.sh \uADDC\uC57D\uC758 \uACB0\uACFC \uD55C \uC904 (\uC601\uC5ED -> deploy prepare-areas.sh). \uADDC\uC57D: \uC601\uC5ED\uC740 \uC790\uAE30 \uB9AC\uD3EC \uB8E8\uD2B8\uC5D0\uC11C `bash scripts/setup-env.sh` \uB85C \uC2DC\uD5D8 \uD658\uACBD(\uD30C\uC774\uC36C .venv \uB610\uB294 node_modules)\uC744 \uC900\uBE44\uD558\uACE0, \uC774\uBBF8 \uC900\uBE44\uB3FC \uC788\uC73C\uBA74 \uC544\uBB34\uAC83\uB3C4 \uBC14\uAFB8\uC9C0 \uC54A\uB294\uB2E4(\uBA71\uB4F1). \uC778\uC790 \uC5C6\uC74C. \uBE44\uBC00 \uAC12\uC744 \uB2E4\uB8E8\uAC70\uB098 \uCD9C\uB825\uD558\uC9C0 \uC54A\uB294\uB2E4. \uC885\uB8CC \uCF54\uB4DC 0 \uC131\uACF5, 0 \uC774 \uC544\uB2C8\uBA74 \uC2E4\uD328. \uC774 \uC2A4\uD0A4\uB9C8\uB294 \uADF8 \uACB0\uACFC\uB97C deploy \uAC00 \uC694\uC57D\uD45C\uC5D0 \uC4F0\uB294 \uBAA8\uC591\uC774\uB2E4(\uD604\uC7AC prepare-areas.sh \uB294 \uC885\uB8CC \uCF54\uB4DC\uC640 \uC18C\uC694 \uC2DC\uAC04\uB9CC \uC4F4\uB2E4: status \uB294 'ok' \uB610\uB294 'fail', \uC2A4\uD06C\uB9BD\uD2B8\xB7\uD3F4\uB354 \uBD80\uC7AC\uB294 deploy \uAC00 \uCC44\uC6B4\uB2E4). \uC601\uC5ED\uC774 environment\uB97C \uC120\uC5B8\uD558\uBA74 doctor.sh \uAC00 .venv\xB7node_modules \uACBD\uB85C\uB97C \uCD94\uCE21\uD558\uC9C0 \uC54A\uC544\uB3C4 \uB41C\uB2E4.", "x-producers": ["*"], "x-consumers": ["deploy"], "type": "object", "properties": { "area": { "type": "string", "pattern": "^[a-z][a-z0-9-]*$" }, "status": { "enum": ["ok", "fail", "script-missing", "folder-missing"] }, "exit_code": { "type": "integer", "minimum": 0, "maximum": 255 }, "seconds": { "type": "integer", "minimum": 0 }, "environment": { "type": "object", "properties": { "kind": { "enum": ["python-venv", "node-modules"] }, "path": { "type": "string", "pattern": "^[^/]" }, "test_command": { "type": "array", "minItems": 1, "items": { "type": "string", "minLength": 1 }, "description": "\uB9AC\uD3EC \uB8E8\uD2B8\uC5D0\uC11C \uC2E4\uD589\uD560 \uC2DC\uD5D8 \uBA85\uB839 argv. \uC178\uC744 \uAC70\uCE58\uC9C0 \uC54A\uB294\uB2E4. \uC885\uB8CC \uCF54\uB4DC 0\uC774\uBA74 \uD1B5\uACFC" } }, "required": ["kind", "path", "test_command"], "additionalProperties": false, "description": '\uC900\uBE44\uB41C \uC2DC\uD5D8 \uD658\uACBD(2.6.0 \uD655\uC815, OPEN_GAPS U43). path\uB294 \uC601\uC5ED \uB9AC\uD3EC \uB8E8\uD2B8 \uAE30\uC900 \uC0C1\uB300 \uACBD\uB85C. test_command\uB294 \uB9AC\uD3EC \uB8E8\uD2B8\uC5D0\uC11C \uC601\uC5ED \uC2DC\uD5D8 \uC804\uCCB4\uB97C \uB3CC\uB9AC\uB294 argv(\uC608: [".venv/bin/python","-m","pytest","-q"], ["npm","test"]). deploy\uB294 \uC774\uAC83\uB9CC \uC77D\uACE0 \uC774\uC6C3\uC758 .venv\xB7node_modules \uACBD\uB85C\uB098 \uC2DC\uD5D8 \uB3C4\uAD6C\uB97C \uC9D0\uC791\uD558\uC9C0 \uC54A\uB294\uB2E4(\uAD6C\uC870 \uADDC\uCE59 1). 3.0.0: status\uAC00 ok\uBA74 \uD544\uC218(\uC601\uC5ED\uC774 \uC900\uBE44\uD55C \uD658\uACBD\uACFC \uC2DC\uD5D8 \uBA85\uB839\uC744 \uBC18\uB4DC\uC2DC \uC120\uC5B8\uD55C\uB2E4). \uC2E4\uD328\xB7\uC2A4\uD06C\uB9BD\uD2B8 \uC5C6\uC74C\xB7\uD3F4\uB354 \uC5C6\uC74C \uBCF4\uACE0\uC5D0\uB294 \uC5C6\uB2E4.' } }, "required": ["area", "status", "exit_code", "seconds"], "additionalProperties": false, "allOf": [{ "if": { "properties": { "status": { "const": "ok" } }, "required": ["status"] }, "then": { "required": ["environment"] } }] };
var pattern61 = new RegExp("^[^/]", "u");
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
  const _errs2 = errors;
  let valid1 = true;
  const _errs3 = errors;
  if (data && typeof data == "object" && !Array.isArray(data)) {
    let missing0;
    if (data.status === void 0 && (missing0 = "status")) {
      const err0 = {};
      if (vErrors === null) {
        vErrors = [err0];
      } else {
        vErrors.push(err0);
      }
      errors++;
    } else {
      if (data.status !== void 0) {
        if ("ok" !== data.status) {
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
      if (data.environment === void 0) {
        const err2 = { instancePath, schemaPath: "#/allOf/0/then/required", keyword: "required", params: { missingProperty: "environment" }, message: "must have required property 'environment'" };
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
  if (data && typeof data == "object" && !Array.isArray(data)) {
    if (data.area === void 0) {
      const err4 = { instancePath, schemaPath: "#/required", keyword: "required", params: { missingProperty: "area" }, message: "must have required property 'area'" };
      if (vErrors === null) {
        vErrors = [err4];
      } else {
        vErrors.push(err4);
      }
      errors++;
    }
    if (data.status === void 0) {
      const err5 = { instancePath, schemaPath: "#/required", keyword: "required", params: { missingProperty: "status" }, message: "must have required property 'status'" };
      if (vErrors === null) {
        vErrors = [err5];
      } else {
        vErrors.push(err5);
      }
      errors++;
    }
    if (data.exit_code === void 0) {
      const err6 = { instancePath, schemaPath: "#/required", keyword: "required", params: { missingProperty: "exit_code" }, message: "must have required property 'exit_code'" };
      if (vErrors === null) {
        vErrors = [err6];
      } else {
        vErrors.push(err6);
      }
      errors++;
    }
    if (data.seconds === void 0) {
      const err7 = { instancePath, schemaPath: "#/required", keyword: "required", params: { missingProperty: "seconds" }, message: "must have required property 'seconds'" };
      if (vErrors === null) {
        vErrors = [err7];
      } else {
        vErrors.push(err7);
      }
      errors++;
    }
    for (const key0 in data) {
      if (!(key0 === "area" || key0 === "status" || key0 === "exit_code" || key0 === "seconds" || key0 === "environment")) {
        const err8 = { instancePath, schemaPath: "#/additionalProperties", keyword: "additionalProperties", params: { additionalProperty: key0 }, message: "must NOT have additional properties" };
        if (vErrors === null) {
          vErrors = [err8];
        } else {
          vErrors.push(err8);
        }
        errors++;
      }
    }
    if (data.area !== void 0) {
      let data1 = data.area;
      if (typeof data1 === "string") {
        if (!pattern42.test(data1)) {
          const err9 = { instancePath: instancePath + "/area", schemaPath: "#/properties/area/pattern", keyword: "pattern", params: { pattern: "^[a-z][a-z0-9-]*$" }, message: 'must match pattern "^[a-z][a-z0-9-]*$"' };
          if (vErrors === null) {
            vErrors = [err9];
          } else {
            vErrors.push(err9);
          }
          errors++;
        }
      } else {
        const err10 = { instancePath: instancePath + "/area", schemaPath: "#/properties/area/type", keyword: "type", params: { type: "string" }, message: "must be string" };
        if (vErrors === null) {
          vErrors = [err10];
        } else {
          vErrors.push(err10);
        }
        errors++;
      }
    }
    if (data.status !== void 0) {
      let data2 = data.status;
      if (!(data2 === "ok" || data2 === "fail" || data2 === "script-missing" || data2 === "folder-missing")) {
        const err11 = { instancePath: instancePath + "/status", schemaPath: "#/properties/status/enum", keyword: "enum", params: { allowedValues: schema104.properties.status.enum }, message: "must be equal to one of the allowed values" };
        if (vErrors === null) {
          vErrors = [err11];
        } else {
          vErrors.push(err11);
        }
        errors++;
      }
    }
    if (data.exit_code !== void 0) {
      let data3 = data.exit_code;
      if (!(typeof data3 == "number" && (!(data3 % 1) && !isNaN(data3)))) {
        const err12 = { instancePath: instancePath + "/exit_code", schemaPath: "#/properties/exit_code/type", keyword: "type", params: { type: "integer" }, message: "must be integer" };
        if (vErrors === null) {
          vErrors = [err12];
        } else {
          vErrors.push(err12);
        }
        errors++;
      }
      if (typeof data3 == "number") {
        if (data3 > 255 || isNaN(data3)) {
          const err13 = { instancePath: instancePath + "/exit_code", schemaPath: "#/properties/exit_code/maximum", keyword: "maximum", params: { comparison: "<=", limit: 255 }, message: "must be <= 255" };
          if (vErrors === null) {
            vErrors = [err13];
          } else {
            vErrors.push(err13);
          }
          errors++;
        }
        if (data3 < 0 || isNaN(data3)) {
          const err14 = { instancePath: instancePath + "/exit_code", schemaPath: "#/properties/exit_code/minimum", keyword: "minimum", params: { comparison: ">=", limit: 0 }, message: "must be >= 0" };
          if (vErrors === null) {
            vErrors = [err14];
          } else {
            vErrors.push(err14);
          }
          errors++;
        }
      }
    }
    if (data.seconds !== void 0) {
      let data4 = data.seconds;
      if (!(typeof data4 == "number" && (!(data4 % 1) && !isNaN(data4)))) {
        const err15 = { instancePath: instancePath + "/seconds", schemaPath: "#/properties/seconds/type", keyword: "type", params: { type: "integer" }, message: "must be integer" };
        if (vErrors === null) {
          vErrors = [err15];
        } else {
          vErrors.push(err15);
        }
        errors++;
      }
      if (typeof data4 == "number") {
        if (data4 < 0 || isNaN(data4)) {
          const err16 = { instancePath: instancePath + "/seconds", schemaPath: "#/properties/seconds/minimum", keyword: "minimum", params: { comparison: ">=", limit: 0 }, message: "must be >= 0" };
          if (vErrors === null) {
            vErrors = [err16];
          } else {
            vErrors.push(err16);
          }
          errors++;
        }
      }
    }
    if (data.environment !== void 0) {
      let data5 = data.environment;
      if (data5 && typeof data5 == "object" && !Array.isArray(data5)) {
        if (data5.kind === void 0) {
          const err17 = { instancePath: instancePath + "/environment", schemaPath: "#/properties/environment/required", keyword: "required", params: { missingProperty: "kind" }, message: "must have required property 'kind'" };
          if (vErrors === null) {
            vErrors = [err17];
          } else {
            vErrors.push(err17);
          }
          errors++;
        }
        if (data5.path === void 0) {
          const err18 = { instancePath: instancePath + "/environment", schemaPath: "#/properties/environment/required", keyword: "required", params: { missingProperty: "path" }, message: "must have required property 'path'" };
          if (vErrors === null) {
            vErrors = [err18];
          } else {
            vErrors.push(err18);
          }
          errors++;
        }
        if (data5.test_command === void 0) {
          const err19 = { instancePath: instancePath + "/environment", schemaPath: "#/properties/environment/required", keyword: "required", params: { missingProperty: "test_command" }, message: "must have required property 'test_command'" };
          if (vErrors === null) {
            vErrors = [err19];
          } else {
            vErrors.push(err19);
          }
          errors++;
        }
        for (const key1 in data5) {
          if (!(key1 === "kind" || key1 === "path" || key1 === "test_command")) {
            const err20 = { instancePath: instancePath + "/environment", schemaPath: "#/properties/environment/additionalProperties", keyword: "additionalProperties", params: { additionalProperty: key1 }, message: "must NOT have additional properties" };
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
          if (!(data6 === "python-venv" || data6 === "node-modules")) {
            const err21 = { instancePath: instancePath + "/environment/kind", schemaPath: "#/properties/environment/properties/kind/enum", keyword: "enum", params: { allowedValues: schema104.properties.environment.properties.kind.enum }, message: "must be equal to one of the allowed values" };
            if (vErrors === null) {
              vErrors = [err21];
            } else {
              vErrors.push(err21);
            }
            errors++;
          }
        }
        if (data5.path !== void 0) {
          let data7 = data5.path;
          if (typeof data7 === "string") {
            if (!pattern61.test(data7)) {
              const err22 = { instancePath: instancePath + "/environment/path", schemaPath: "#/properties/environment/properties/path/pattern", keyword: "pattern", params: { pattern: "^[^/]" }, message: 'must match pattern "^[^/]"' };
              if (vErrors === null) {
                vErrors = [err22];
              } else {
                vErrors.push(err22);
              }
              errors++;
            }
          } else {
            const err23 = { instancePath: instancePath + "/environment/path", schemaPath: "#/properties/environment/properties/path/type", keyword: "type", params: { type: "string" }, message: "must be string" };
            if (vErrors === null) {
              vErrors = [err23];
            } else {
              vErrors.push(err23);
            }
            errors++;
          }
        }
        if (data5.test_command !== void 0) {
          let data8 = data5.test_command;
          if (Array.isArray(data8)) {
            if (data8.length < 1) {
              const err24 = { instancePath: instancePath + "/environment/test_command", schemaPath: "#/properties/environment/properties/test_command/minItems", keyword: "minItems", params: { limit: 1 }, message: "must NOT have fewer than 1 items" };
              if (vErrors === null) {
                vErrors = [err24];
              } else {
                vErrors.push(err24);
              }
              errors++;
            }
            const len0 = data8.length;
            for (let i0 = 0; i0 < len0; i0++) {
              let data9 = data8[i0];
              if (typeof data9 === "string") {
                if (func1(data9) < 1) {
                  const err25 = { instancePath: instancePath + "/environment/test_command/" + i0, schemaPath: "#/properties/environment/properties/test_command/items/minLength", keyword: "minLength", params: { limit: 1 }, message: "must NOT have fewer than 1 characters" };
                  if (vErrors === null) {
                    vErrors = [err25];
                  } else {
                    vErrors.push(err25);
                  }
                  errors++;
                }
              } else {
                const err26 = { instancePath: instancePath + "/environment/test_command/" + i0, schemaPath: "#/properties/environment/properties/test_command/items/type", keyword: "type", params: { type: "string" }, message: "must be string" };
                if (vErrors === null) {
                  vErrors = [err26];
                } else {
                  vErrors.push(err26);
                }
                errors++;
              }
            }
          } else {
            const err27 = { instancePath: instancePath + "/environment/test_command", schemaPath: "#/properties/environment/properties/test_command/type", keyword: "type", params: { type: "array" }, message: "must be array" };
            if (vErrors === null) {
              vErrors = [err27];
            } else {
              vErrors.push(err27);
            }
            errors++;
          }
        }
      } else {
        const err28 = { instancePath: instancePath + "/environment", schemaPath: "#/properties/environment/type", keyword: "type", params: { type: "object" }, message: "must be object" };
        if (vErrors === null) {
          vErrors = [err28];
        } else {
          vErrors.push(err28);
        }
        errors++;
      }
    }
  } else {
    const err29 = { instancePath, schemaPath: "#/type", keyword: "type", params: { type: "object" }, message: "must be object" };
    if (vErrors === null) {
      vErrors = [err29];
    } else {
      vErrors.push(err29);
    }
    errors++;
  }
  validate57.errors = vErrors;
  return errors === 0;
}
validate57.evaluated = { "props": true, "dynamicProps": false, "dynamicItems": false };
exports.Exposure = validate58;
var schema106 = { "type": "object", "properties": { "paths": { "type": "array", "minItems": 1, "items": { "type": "string", "pattern": "^/" } }, "methods": { "type": "array", "uniqueItems": true, "items": { "enum": ["GET", "POST", "PUT", "PATCH", "DELETE"] }, "description": "\uBE44\uC6B0\uBA74 \uBAA8\uB4E0 \uBA54\uC11C\uB4DC" }, "auth": { "type": "object", "properties": { "kind": { "enum": ["device-token", "account", "authenticated", "machine-token", "none", "denied"], "description": "device-token: \uD0A4\uC624\uC2A4\uD06C \uAE30\uAE30(mTLS/\uAE30\uAE30 \uD1A0\uD070). account: \uC0AC\uB78C \uACC4\uC815(roles \uD544\uC218). authenticated: \uB85C\uADF8\uC778\uD55C \uC0AC\uB78C \uACC4\uC815\uC774\uBA74 \uC5ED\uD560\uACFC \uBB34\uAD00\uD558\uAC8C \uC5F0\uB2E4(3.4.0, U82: \uB370\uC774\uD130 \uC5C6\uB294 \uD654\uBA74 \uC815\uC801 \uD30C\uC77C \u2014 \uAC00\uC785 \uC2B9\uC778 \uB300\uAE30 \uACC4\uC815\uC5D0\uAC8C \uC548\uB0B4\uB97C \uBCF4\uC774\uB824\uBA74 \uD654\uBA74\uC774 \uC5F4\uB824\uC57C \uD55C\uB2E4; roles \uB97C \uC4F0\uC9C0 \uC54A\uB294\uB2E4). machine-token: (3.4.7 \uC815\uC815) \uBE44\uC0AC\uB78C \uD638\uCD9C\uC790\uC758 \uACBD\uB85C. \uAC8C\uC774\uD2B8\uC6E8\uC774\uB294 \uD1A0\uD070\uC744 \uB300\uC870\uD558\uC9C0 \uC54A\uACE0 \uBC1B\uB294 \uC11C\uBE44\uC2A4\uAC00 \uB300\uC870\uD55C\uB2E4(RUNTIME R3.23). platform \uACF5\uAC1C \uC785\uAD6C\uB294 \uC774 \uACBD\uB85C\uB97C \uB0B4\uBCF4\uB0B4\uC9C0 \uC54A\uB294\uB2E4(denied \uC640 \uAC19\uB2E4): compose \uBC16 \uD638\uCD9C\uC790\uB294 R1.5 \uC758 hosts \uD45C\uB85C \uBC1B\uB294 \uC601\uC5ED\uC758 \uAC8C\uC774\uD2B8\uC6E8\uC774\uC5D0 \uBC14\uB85C \uAC04\uB2E4. \uAC12\uC740 4.0.0 \uC5D0\uC11C \uBE80\uB2E4. none: \uC778\uC99D \uC5C6\uC74C(/healthz \uB4F1). (3.4.9) \uC601\uC5ED\uC758 /healthz\xB7/readyz\xB7/metrics \uB294 \uC601\uC5ED \uAC8C\uC774\uD2B8\uC6E8\uC774 \uC6A9\uC774\uACE0 platform \uACF5\uAC1C \uC785\uAD6C\uB294 \uB0B4\uBCF4\uB0B4\uC9C0 \uC54A\uB294\uB2E4(CONVENTIONS 2\uC808 \uC0C1\uD0DC \uACBD\uB85C \uADDC\uCE59). denied: \uBC16\uC5D0\uC11C \uB2FF\uC744 \uC218 \uC5C6\uC74C denied \uB294 platform \uACF5\uAC1C \uC785\uAD6C\uC5D0\uC11C \uB0B4\uBCF4\uB0B4\uC9C0 \uC54A\uB294\uB2E4\uB294 \uB73B\uC774\uB2E4. \uC601\uC5ED \uAC8C\uC774\uD2B8\uC6E8\uC774\uC5D0\uC11C \uC774 \uACBD\uB85C\uB97C \uC81C\uAC70\uD558\uC9C0 \uC54A\uB294\uB2E4. \uC601\uC5ED \uAC04 \uC694\uCCAD\uC758 \uC11C\uBE44\uC2A4 \uD1A0\uD070\uC740 \uBC1B\uB294 \uC11C\uBE44\uC2A4\uAC00 \uAC80\uC0AC\uD55C\uB2E4(R3.23)." }, "roles": { "type": "array", "uniqueItems": true, "items": { "type": "string", "pattern": "^[a-z][a-z-]*$" } } }, "required": ["kind"], "if": { "properties": { "kind": { "const": "account" } } }, "then": { "required": ["roles"], "properties": { "roles": { "minItems": 1 } } }, "additionalProperties": false }, "upstream_token": { "type": "string", "pattern": "^[a-z][a-z0-9-]*$", "description": "gateway \uAC00 \uC0C1\uB958\uC5D0 \uBD99\uC774\uB294 \uC11C\uBE44\uC2A4 \uD1A0\uD070\uC758 \uBE44\uBC00 \uC774\uB984(\uAC12 \uC544\uB2D8)" }, "user_header": { "enum": ["set", "strip"], "description": "set=\uC778\uC99D\uB41C \uACC4\uC815 ID \uB97C X-Openit-User \uB85C \uBD99\uC784(\uD074\uB77C\uC774\uC5B8\uD2B8 \uAC12\uC740 \uB36E\uC5B4\uC500), strip=\uC9C0\uC6C0" }, "streaming": { "type": "boolean" }, "timeouts_ms": { "type": "object", "properties": { "dial": { "type": "integer", "minimum": 1 }, "response_header": { "type": "integer", "minimum": 1 }, "read": { "type": "integer", "minimum": 1 } }, "additionalProperties": false }, "max_body_bytes": { "type": "integer", "minimum": 1, "maximum": 8589934592, "description": "3.4.7(RUNTIME R3.5\xB7R10.13): \uC774 \uACBD\uB85C\uC758 \uC694\uCCAD \uBCF8\uBB38 \uC0C1\uD55C(\uBC14\uC774\uD2B8). platform \uACF5\uAC1C \uC785\uAD6C\uC640 \uC601\uC5ED \uAC8C\uC774\uD2B8\uC6E8\uC774\uAC00 \uB458 \uB2E4 \uC774 \uAC12\uC73C\uB85C 413 \uC744 \uB0B8\uB2E4(\uC571\uC5D0 \uB2FF\uAE30 \uC804). \uC5C6\uC73C\uBA74 8MiB(8388608, \uC9C0\uAE08\uAE4C\uC9C0\uC758 \uACF5\uAC1C \uC785\uAD6C \uAE30\uBCF8, \uC2DC\uC791\uAC12\xB7\uCE21\uC815 \uC548 \uD568). \uC0C1\uD55C\uC740 \uD074\uB77C\uC774\uC5B8\uD2B8 max_tar_bytes 8GiB. \uAC12\uC740 \uBC1B\uB294 \uC601\uC5ED\uC774 ADR \uB85C \uADFC\uAC70\uC640 \uD568\uAED8 \uC815\uD55C\uB2E4" }, "upstream_port": { "type": "integer", "minimum": 1, "maximum": 65535, "description": "3.4.7: \uC601\uC5ED \uAC8C\uC774\uD2B8\uC6E8\uC774\uAC00 \uC774 \uACBD\uB85C\uB97C \uB118\uAE38 \uC601\uC5ED \uC548 \uCEF4\uD3EC\uB10C\uD2B8\uC758 loopback \uD3EC\uD2B8(\uAC19\uC740 \uB124\uD2B8\uC6CC\uD06C \uACF5\uAC04 127.0.0.1). \uC5C6\uC73C\uBA74 \uADF8 \uC601\uC5ED \uC11C\uBE44\uC2A4 \uD558\uB098(\uBC30\uD3EC \uC124\uC815\uC758 \uC571 \uD3EC\uD2B8)\uB85C \uB118\uAE34\uB2E4. \uC601\uC5ED \uC548 \uAD6C\uC131\uC740 \uC601\uC5ED\uC774 \uC815\uD558\uACE0, \uC774 \uAC12\uC740 \uBC30\uD3EC \uB54C \uAC8C\uC774\uD2B8\uC6E8\uC774 \uC124\uC815\uC744 \uB9CC\uB4DC\uB294 \uC785\uB825\uC774\uB2E4(CONVENTIONS 13\uC808 \uC608\uC678)" } }, "required": ["paths", "auth"], "additionalProperties": false };
var pattern65 = new RegExp("^[a-z][a-z-]*$", "u");
var func0 = require_equal().default;
function validate58(data, { instancePath = "", parentData, parentDataProperty, rootData = data, dynamicAnchors = {} } = {}) {
  ;
  let vErrors = null;
  let errors = 0;
  const evaluated0 = validate58.evaluated;
  if (evaluated0.dynamicProps) {
    evaluated0.props = void 0;
  }
  if (evaluated0.dynamicItems) {
    evaluated0.items = void 0;
  }
  if (data && typeof data == "object" && !Array.isArray(data)) {
    if (data.service === void 0) {
      const err0 = { instancePath, schemaPath: "#/required", keyword: "required", params: { missingProperty: "service" }, message: "must have required property 'service'" };
      if (vErrors === null) {
        vErrors = [err0];
      } else {
        vErrors.push(err0);
      }
      errors++;
    }
    if (data.routes === void 0) {
      const err1 = { instancePath, schemaPath: "#/required", keyword: "required", params: { missingProperty: "routes" }, message: "must have required property 'routes'" };
      if (vErrors === null) {
        vErrors = [err1];
      } else {
        vErrors.push(err1);
      }
      errors++;
    }
    for (const key0 in data) {
      if (!(key0 === "service" || key0 === "egress" || key0 === "routes")) {
        const err2 = { instancePath, schemaPath: "#/additionalProperties", keyword: "additionalProperties", params: { additionalProperty: key0 }, message: "must NOT have additional properties" };
        if (vErrors === null) {
          vErrors = [err2];
        } else {
          vErrors.push(err2);
        }
        errors++;
      }
    }
    if (data.service !== void 0) {
      let data0 = data.service;
      if (typeof data0 === "string") {
        if (!pattern42.test(data0)) {
          const err3 = { instancePath: instancePath + "/service", schemaPath: "#/properties/service/pattern", keyword: "pattern", params: { pattern: "^[a-z][a-z0-9-]*$" }, message: 'must match pattern "^[a-z][a-z0-9-]*$"' };
          if (vErrors === null) {
            vErrors = [err3];
          } else {
            vErrors.push(err3);
          }
          errors++;
        }
      } else {
        const err4 = { instancePath: instancePath + "/service", schemaPath: "#/properties/service/type", keyword: "type", params: { type: "string" }, message: "must be string" };
        if (vErrors === null) {
          vErrors = [err4];
        } else {
          vErrors.push(err4);
        }
        errors++;
      }
    }
    if (data.egress !== void 0) {
      let data1 = data.egress;
      if (Array.isArray(data1)) {
        const len0 = data1.length;
        for (let i0 = 0; i0 < len0; i0++) {
          let data2 = data1[i0];
          const _errs7 = errors;
          let valid3 = false;
          let passing0 = null;
          const _errs8 = errors;
          if (typeof data2 === "string") {
            if (!pattern42.test(data2)) {
              const err5 = { instancePath: instancePath + "/egress/" + i0, schemaPath: "#/properties/egress/items/oneOf/0/pattern", keyword: "pattern", params: { pattern: "^[a-z][a-z0-9-]*$" }, message: 'must match pattern "^[a-z][a-z0-9-]*$"' };
              if (vErrors === null) {
                vErrors = [err5];
              } else {
                vErrors.push(err5);
              }
              errors++;
            }
          } else {
            const err6 = { instancePath: instancePath + "/egress/" + i0, schemaPath: "#/properties/egress/items/oneOf/0/type", keyword: "type", params: { type: "string" }, message: "must be string" };
            if (vErrors === null) {
              vErrors = [err6];
            } else {
              vErrors.push(err6);
            }
            errors++;
          }
          var _valid0 = _errs8 === errors;
          if (_valid0) {
            valid3 = true;
            passing0 = 0;
          }
          const _errs10 = errors;
          if ("external:web-push" !== data2) {
            const err7 = { instancePath: instancePath + "/egress/" + i0, schemaPath: "#/properties/egress/items/oneOf/1/const", keyword: "const", params: { allowedValue: "external:web-push" }, message: "must be equal to constant" };
            if (vErrors === null) {
              vErrors = [err7];
            } else {
              vErrors.push(err7);
            }
            errors++;
          }
          var _valid0 = _errs10 === errors;
          if (_valid0 && valid3) {
            valid3 = false;
            passing0 = [passing0, 1];
          } else {
            if (_valid0) {
              valid3 = true;
              passing0 = 1;
            }
            const _errs11 = errors;
            if ("external:backup" !== data2) {
              const err8 = { instancePath: instancePath + "/egress/" + i0, schemaPath: "#/properties/egress/items/oneOf/2/const", keyword: "const", params: { allowedValue: "external:backup" }, message: "must be equal to constant" };
              if (vErrors === null) {
                vErrors = [err8];
              } else {
                vErrors.push(err8);
              }
              errors++;
            }
            var _valid0 = _errs11 === errors;
            if (_valid0 && valid3) {
              valid3 = false;
              passing0 = [passing0, 2];
            } else {
              if (_valid0) {
                valid3 = true;
                passing0 = 2;
              }
            }
          }
          if (!valid3) {
            const err9 = { instancePath: instancePath + "/egress/" + i0, schemaPath: "#/properties/egress/items/oneOf", keyword: "oneOf", params: { passingSchemas: passing0 }, message: "must match exactly one schema in oneOf" };
            if (vErrors === null) {
              vErrors = [err9];
            } else {
              vErrors.push(err9);
            }
            errors++;
          } else {
            errors = _errs7;
            if (vErrors !== null) {
              if (_errs7) {
                vErrors.length = _errs7;
              } else {
                vErrors = null;
              }
            }
          }
        }
        let i1 = data1.length;
        let j0;
        if (i1 > 1) {
          outer0: for (; i1--; ) {
            for (j0 = i1; j0--; ) {
              if (func0(data1[i1], data1[j0])) {
                const err10 = { instancePath: instancePath + "/egress", schemaPath: "#/properties/egress/uniqueItems", keyword: "uniqueItems", params: { i: i1, j: j0 }, message: "must NOT have duplicate items (items ## " + j0 + " and " + i1 + " are identical)" };
                if (vErrors === null) {
                  vErrors = [err10];
                } else {
                  vErrors.push(err10);
                }
                errors++;
                break outer0;
              }
            }
          }
        }
      } else {
        const err11 = { instancePath: instancePath + "/egress", schemaPath: "#/properties/egress/type", keyword: "type", params: { type: "array" }, message: "must be array" };
        if (vErrors === null) {
          vErrors = [err11];
        } else {
          vErrors.push(err11);
        }
        errors++;
      }
    }
    if (data.routes !== void 0) {
      let data3 = data.routes;
      if (Array.isArray(data3)) {
        if (data3.length < 1) {
          const err12 = { instancePath: instancePath + "/routes", schemaPath: "#/properties/routes/minItems", keyword: "minItems", params: { limit: 1 }, message: "must NOT have fewer than 1 items" };
          if (vErrors === null) {
            vErrors = [err12];
          } else {
            vErrors.push(err12);
          }
          errors++;
        }
        const len1 = data3.length;
        for (let i2 = 0; i2 < len1; i2++) {
          let data4 = data3[i2];
          if (data4 && typeof data4 == "object" && !Array.isArray(data4)) {
            if (data4.paths === void 0) {
              const err13 = { instancePath: instancePath + "/routes/" + i2, schemaPath: "#/$defs/route/required", keyword: "required", params: { missingProperty: "paths" }, message: "must have required property 'paths'" };
              if (vErrors === null) {
                vErrors = [err13];
              } else {
                vErrors.push(err13);
              }
              errors++;
            }
            if (data4.auth === void 0) {
              const err14 = { instancePath: instancePath + "/routes/" + i2, schemaPath: "#/$defs/route/required", keyword: "required", params: { missingProperty: "auth" }, message: "must have required property 'auth'" };
              if (vErrors === null) {
                vErrors = [err14];
              } else {
                vErrors.push(err14);
              }
              errors++;
            }
            for (const key1 in data4) {
              if (!func5.call(schema106.properties, key1)) {
                const err15 = { instancePath: instancePath + "/routes/" + i2, schemaPath: "#/$defs/route/additionalProperties", keyword: "additionalProperties", params: { additionalProperty: key1 }, message: "must NOT have additional properties" };
                if (vErrors === null) {
                  vErrors = [err15];
                } else {
                  vErrors.push(err15);
                }
                errors++;
              }
            }
            if (data4.paths !== void 0) {
              let data5 = data4.paths;
              if (Array.isArray(data5)) {
                if (data5.length < 1) {
                  const err16 = { instancePath: instancePath + "/routes/" + i2 + "/paths", schemaPath: "#/$defs/route/properties/paths/minItems", keyword: "minItems", params: { limit: 1 }, message: "must NOT have fewer than 1 items" };
                  if (vErrors === null) {
                    vErrors = [err16];
                  } else {
                    vErrors.push(err16);
                  }
                  errors++;
                }
                const len2 = data5.length;
                for (let i3 = 0; i3 < len2; i3++) {
                  let data6 = data5[i3];
                  if (typeof data6 === "string") {
                    if (!pattern48.test(data6)) {
                      const err17 = { instancePath: instancePath + "/routes/" + i2 + "/paths/" + i3, schemaPath: "#/$defs/route/properties/paths/items/pattern", keyword: "pattern", params: { pattern: "^/" }, message: 'must match pattern "^/"' };
                      if (vErrors === null) {
                        vErrors = [err17];
                      } else {
                        vErrors.push(err17);
                      }
                      errors++;
                    }
                  } else {
                    const err18 = { instancePath: instancePath + "/routes/" + i2 + "/paths/" + i3, schemaPath: "#/$defs/route/properties/paths/items/type", keyword: "type", params: { type: "string" }, message: "must be string" };
                    if (vErrors === null) {
                      vErrors = [err18];
                    } else {
                      vErrors.push(err18);
                    }
                    errors++;
                  }
                }
              } else {
                const err19 = { instancePath: instancePath + "/routes/" + i2 + "/paths", schemaPath: "#/$defs/route/properties/paths/type", keyword: "type", params: { type: "array" }, message: "must be array" };
                if (vErrors === null) {
                  vErrors = [err19];
                } else {
                  vErrors.push(err19);
                }
                errors++;
              }
            }
            if (data4.methods !== void 0) {
              let data7 = data4.methods;
              if (Array.isArray(data7)) {
                const len3 = data7.length;
                for (let i4 = 0; i4 < len3; i4++) {
                  let data8 = data7[i4];
                  if (!(data8 === "GET" || data8 === "POST" || data8 === "PUT" || data8 === "PATCH" || data8 === "DELETE")) {
                    const err20 = { instancePath: instancePath + "/routes/" + i2 + "/methods/" + i4, schemaPath: "#/$defs/route/properties/methods/items/enum", keyword: "enum", params: { allowedValues: schema106.properties.methods.items.enum }, message: "must be equal to one of the allowed values" };
                    if (vErrors === null) {
                      vErrors = [err20];
                    } else {
                      vErrors.push(err20);
                    }
                    errors++;
                  }
                }
                let i5 = data7.length;
                let j1;
                if (i5 > 1) {
                  outer1: for (; i5--; ) {
                    for (j1 = i5; j1--; ) {
                      if (func0(data7[i5], data7[j1])) {
                        const err21 = { instancePath: instancePath + "/routes/" + i2 + "/methods", schemaPath: "#/$defs/route/properties/methods/uniqueItems", keyword: "uniqueItems", params: { i: i5, j: j1 }, message: "must NOT have duplicate items (items ## " + j1 + " and " + i5 + " are identical)" };
                        if (vErrors === null) {
                          vErrors = [err21];
                        } else {
                          vErrors.push(err21);
                        }
                        errors++;
                        break outer1;
                      }
                    }
                  }
                }
              } else {
                const err22 = { instancePath: instancePath + "/routes/" + i2 + "/methods", schemaPath: "#/$defs/route/properties/methods/type", keyword: "type", params: { type: "array" }, message: "must be array" };
                if (vErrors === null) {
                  vErrors = [err22];
                } else {
                  vErrors.push(err22);
                }
                errors++;
              }
            }
            if (data4.auth !== void 0) {
              let data9 = data4.auth;
              const _errs27 = errors;
              let valid14 = true;
              const _errs28 = errors;
              if (data9 && typeof data9 == "object" && !Array.isArray(data9)) {
                if (data9.kind !== void 0) {
                  if ("account" !== data9.kind) {
                    const err23 = {};
                    if (vErrors === null) {
                      vErrors = [err23];
                    } else {
                      vErrors.push(err23);
                    }
                    errors++;
                  }
                }
              }
              var _valid1 = _errs28 === errors;
              errors = _errs27;
              if (vErrors !== null) {
                if (_errs27) {
                  vErrors.length = _errs27;
                } else {
                  vErrors = null;
                }
              }
              if (_valid1) {
                const _errs30 = errors;
                if (data9 && typeof data9 == "object" && !Array.isArray(data9)) {
                  if (data9.roles === void 0) {
                    const err24 = { instancePath: instancePath + "/routes/" + i2 + "/auth", schemaPath: "#/$defs/route/properties/auth/then/required", keyword: "required", params: { missingProperty: "roles" }, message: "must have required property 'roles'" };
                    if (vErrors === null) {
                      vErrors = [err24];
                    } else {
                      vErrors.push(err24);
                    }
                    errors++;
                  }
                  if (data9.roles !== void 0) {
                    let data11 = data9.roles;
                    if (Array.isArray(data11)) {
                      if (data11.length < 1) {
                        const err25 = { instancePath: instancePath + "/routes/" + i2 + "/auth/roles", schemaPath: "#/$defs/route/properties/auth/then/properties/roles/minItems", keyword: "minItems", params: { limit: 1 }, message: "must NOT have fewer than 1 items" };
                        if (vErrors === null) {
                          vErrors = [err25];
                        } else {
                          vErrors.push(err25);
                        }
                        errors++;
                      }
                    }
                  }
                }
                var _valid1 = _errs30 === errors;
                valid14 = _valid1;
                if (valid14) {
                  var props0 = {};
                  props0.roles = true;
                  props0.kind = true;
                }
              }
              if (!valid14) {
                const err26 = { instancePath: instancePath + "/routes/" + i2 + "/auth", schemaPath: "#/$defs/route/properties/auth/if", keyword: "if", params: { failingKeyword: "then" }, message: 'must match "then" schema' };
                if (vErrors === null) {
                  vErrors = [err26];
                } else {
                  vErrors.push(err26);
                }
                errors++;
              }
              if (data9 && typeof data9 == "object" && !Array.isArray(data9)) {
                if (data9.kind === void 0) {
                  const err27 = { instancePath: instancePath + "/routes/" + i2 + "/auth", schemaPath: "#/$defs/route/properties/auth/required", keyword: "required", params: { missingProperty: "kind" }, message: "must have required property 'kind'" };
                  if (vErrors === null) {
                    vErrors = [err27];
                  } else {
                    vErrors.push(err27);
                  }
                  errors++;
                }
                for (const key2 in data9) {
                  if (!(key2 === "kind" || key2 === "roles")) {
                    const err28 = { instancePath: instancePath + "/routes/" + i2 + "/auth", schemaPath: "#/$defs/route/properties/auth/additionalProperties", keyword: "additionalProperties", params: { additionalProperty: key2 }, message: "must NOT have additional properties" };
                    if (vErrors === null) {
                      vErrors = [err28];
                    } else {
                      vErrors.push(err28);
                    }
                    errors++;
                  }
                }
                if (data9.kind !== void 0) {
                  let data12 = data9.kind;
                  if (!(data12 === "device-token" || data12 === "account" || data12 === "authenticated" || data12 === "machine-token" || data12 === "none" || data12 === "denied")) {
                    const err29 = { instancePath: instancePath + "/routes/" + i2 + "/auth/kind", schemaPath: "#/$defs/route/properties/auth/properties/kind/enum", keyword: "enum", params: { allowedValues: schema106.properties.auth.properties.kind.enum }, message: "must be equal to one of the allowed values" };
                    if (vErrors === null) {
                      vErrors = [err29];
                    } else {
                      vErrors.push(err29);
                    }
                    errors++;
                  }
                }
                if (data9.roles !== void 0) {
                  let data13 = data9.roles;
                  if (Array.isArray(data13)) {
                    const len4 = data13.length;
                    for (let i6 = 0; i6 < len4; i6++) {
                      let data14 = data13[i6];
                      if (typeof data14 === "string") {
                        if (!pattern65.test(data14)) {
                          const err30 = { instancePath: instancePath + "/routes/" + i2 + "/auth/roles/" + i6, schemaPath: "#/$defs/route/properties/auth/properties/roles/items/pattern", keyword: "pattern", params: { pattern: "^[a-z][a-z-]*$" }, message: 'must match pattern "^[a-z][a-z-]*$"' };
                          if (vErrors === null) {
                            vErrors = [err30];
                          } else {
                            vErrors.push(err30);
                          }
                          errors++;
                        }
                      } else {
                        const err31 = { instancePath: instancePath + "/routes/" + i2 + "/auth/roles/" + i6, schemaPath: "#/$defs/route/properties/auth/properties/roles/items/type", keyword: "type", params: { type: "string" }, message: "must be string" };
                        if (vErrors === null) {
                          vErrors = [err31];
                        } else {
                          vErrors.push(err31);
                        }
                        errors++;
                      }
                    }
                    let i7 = data13.length;
                    let j2;
                    if (i7 > 1) {
                      const indices0 = {};
                      for (; i7--; ) {
                        let item0 = data13[i7];
                        if (typeof item0 !== "string") {
                          continue;
                        }
                        if (typeof indices0[item0] == "number") {
                          j2 = indices0[item0];
                          const err32 = { instancePath: instancePath + "/routes/" + i2 + "/auth/roles", schemaPath: "#/$defs/route/properties/auth/properties/roles/uniqueItems", keyword: "uniqueItems", params: { i: i7, j: j2 }, message: "must NOT have duplicate items (items ## " + j2 + " and " + i7 + " are identical)" };
                          if (vErrors === null) {
                            vErrors = [err32];
                          } else {
                            vErrors.push(err32);
                          }
                          errors++;
                          break;
                        }
                        indices0[item0] = i7;
                      }
                    }
                  } else {
                    const err33 = { instancePath: instancePath + "/routes/" + i2 + "/auth/roles", schemaPath: "#/$defs/route/properties/auth/properties/roles/type", keyword: "type", params: { type: "array" }, message: "must be array" };
                    if (vErrors === null) {
                      vErrors = [err33];
                    } else {
                      vErrors.push(err33);
                    }
                    errors++;
                  }
                }
              } else {
                const err34 = { instancePath: instancePath + "/routes/" + i2 + "/auth", schemaPath: "#/$defs/route/properties/auth/type", keyword: "type", params: { type: "object" }, message: "must be object" };
                if (vErrors === null) {
                  vErrors = [err34];
                } else {
                  vErrors.push(err34);
                }
                errors++;
              }
            }
            if (data4.upstream_token !== void 0) {
              let data15 = data4.upstream_token;
              if (typeof data15 === "string") {
                if (!pattern42.test(data15)) {
                  const err35 = { instancePath: instancePath + "/routes/" + i2 + "/upstream_token", schemaPath: "#/$defs/route/properties/upstream_token/pattern", keyword: "pattern", params: { pattern: "^[a-z][a-z0-9-]*$" }, message: 'must match pattern "^[a-z][a-z0-9-]*$"' };
                  if (vErrors === null) {
                    vErrors = [err35];
                  } else {
                    vErrors.push(err35);
                  }
                  errors++;
                }
              } else {
                const err36 = { instancePath: instancePath + "/routes/" + i2 + "/upstream_token", schemaPath: "#/$defs/route/properties/upstream_token/type", keyword: "type", params: { type: "string" }, message: "must be string" };
                if (vErrors === null) {
                  vErrors = [err36];
                } else {
                  vErrors.push(err36);
                }
                errors++;
              }
            }
            if (data4.user_header !== void 0) {
              let data16 = data4.user_header;
              if (!(data16 === "set" || data16 === "strip")) {
                const err37 = { instancePath: instancePath + "/routes/" + i2 + "/user_header", schemaPath: "#/$defs/route/properties/user_header/enum", keyword: "enum", params: { allowedValues: schema106.properties.user_header.enum }, message: "must be equal to one of the allowed values" };
                if (vErrors === null) {
                  vErrors = [err37];
                } else {
                  vErrors.push(err37);
                }
                errors++;
              }
            }
            if (data4.streaming !== void 0) {
              if (typeof data4.streaming !== "boolean") {
                const err38 = { instancePath: instancePath + "/routes/" + i2 + "/streaming", schemaPath: "#/$defs/route/properties/streaming/type", keyword: "type", params: { type: "boolean" }, message: "must be boolean" };
                if (vErrors === null) {
                  vErrors = [err38];
                } else {
                  vErrors.push(err38);
                }
                errors++;
              }
            }
            if (data4.timeouts_ms !== void 0) {
              let data18 = data4.timeouts_ms;
              if (data18 && typeof data18 == "object" && !Array.isArray(data18)) {
                for (const key3 in data18) {
                  if (!(key3 === "dial" || key3 === "response_header" || key3 === "read")) {
                    const err39 = { instancePath: instancePath + "/routes/" + i2 + "/timeouts_ms", schemaPath: "#/$defs/route/properties/timeouts_ms/additionalProperties", keyword: "additionalProperties", params: { additionalProperty: key3 }, message: "must NOT have additional properties" };
                    if (vErrors === null) {
                      vErrors = [err39];
                    } else {
                      vErrors.push(err39);
                    }
                    errors++;
                  }
                }
                if (data18.dial !== void 0) {
                  let data19 = data18.dial;
                  if (!(typeof data19 == "number" && (!(data19 % 1) && !isNaN(data19)))) {
                    const err40 = { instancePath: instancePath + "/routes/" + i2 + "/timeouts_ms/dial", schemaPath: "#/$defs/route/properties/timeouts_ms/properties/dial/type", keyword: "type", params: { type: "integer" }, message: "must be integer" };
                    if (vErrors === null) {
                      vErrors = [err40];
                    } else {
                      vErrors.push(err40);
                    }
                    errors++;
                  }
                  if (typeof data19 == "number") {
                    if (data19 < 1 || isNaN(data19)) {
                      const err41 = { instancePath: instancePath + "/routes/" + i2 + "/timeouts_ms/dial", schemaPath: "#/$defs/route/properties/timeouts_ms/properties/dial/minimum", keyword: "minimum", params: { comparison: ">=", limit: 1 }, message: "must be >= 1" };
                      if (vErrors === null) {
                        vErrors = [err41];
                      } else {
                        vErrors.push(err41);
                      }
                      errors++;
                    }
                  }
                }
                if (data18.response_header !== void 0) {
                  let data20 = data18.response_header;
                  if (!(typeof data20 == "number" && (!(data20 % 1) && !isNaN(data20)))) {
                    const err42 = { instancePath: instancePath + "/routes/" + i2 + "/timeouts_ms/response_header", schemaPath: "#/$defs/route/properties/timeouts_ms/properties/response_header/type", keyword: "type", params: { type: "integer" }, message: "must be integer" };
                    if (vErrors === null) {
                      vErrors = [err42];
                    } else {
                      vErrors.push(err42);
                    }
                    errors++;
                  }
                  if (typeof data20 == "number") {
                    if (data20 < 1 || isNaN(data20)) {
                      const err43 = { instancePath: instancePath + "/routes/" + i2 + "/timeouts_ms/response_header", schemaPath: "#/$defs/route/properties/timeouts_ms/properties/response_header/minimum", keyword: "minimum", params: { comparison: ">=", limit: 1 }, message: "must be >= 1" };
                      if (vErrors === null) {
                        vErrors = [err43];
                      } else {
                        vErrors.push(err43);
                      }
                      errors++;
                    }
                  }
                }
                if (data18.read !== void 0) {
                  let data21 = data18.read;
                  if (!(typeof data21 == "number" && (!(data21 % 1) && !isNaN(data21)))) {
                    const err44 = { instancePath: instancePath + "/routes/" + i2 + "/timeouts_ms/read", schemaPath: "#/$defs/route/properties/timeouts_ms/properties/read/type", keyword: "type", params: { type: "integer" }, message: "must be integer" };
                    if (vErrors === null) {
                      vErrors = [err44];
                    } else {
                      vErrors.push(err44);
                    }
                    errors++;
                  }
                  if (typeof data21 == "number") {
                    if (data21 < 1 || isNaN(data21)) {
                      const err45 = { instancePath: instancePath + "/routes/" + i2 + "/timeouts_ms/read", schemaPath: "#/$defs/route/properties/timeouts_ms/properties/read/minimum", keyword: "minimum", params: { comparison: ">=", limit: 1 }, message: "must be >= 1" };
                      if (vErrors === null) {
                        vErrors = [err45];
                      } else {
                        vErrors.push(err45);
                      }
                      errors++;
                    }
                  }
                }
              } else {
                const err46 = { instancePath: instancePath + "/routes/" + i2 + "/timeouts_ms", schemaPath: "#/$defs/route/properties/timeouts_ms/type", keyword: "type", params: { type: "object" }, message: "must be object" };
                if (vErrors === null) {
                  vErrors = [err46];
                } else {
                  vErrors.push(err46);
                }
                errors++;
              }
            }
            if (data4.max_body_bytes !== void 0) {
              let data22 = data4.max_body_bytes;
              if (!(typeof data22 == "number" && (!(data22 % 1) && !isNaN(data22)))) {
                const err47 = { instancePath: instancePath + "/routes/" + i2 + "/max_body_bytes", schemaPath: "#/$defs/route/properties/max_body_bytes/type", keyword: "type", params: { type: "integer" }, message: "must be integer" };
                if (vErrors === null) {
                  vErrors = [err47];
                } else {
                  vErrors.push(err47);
                }
                errors++;
              }
              if (typeof data22 == "number") {
                if (data22 > 8589934592 || isNaN(data22)) {
                  const err48 = { instancePath: instancePath + "/routes/" + i2 + "/max_body_bytes", schemaPath: "#/$defs/route/properties/max_body_bytes/maximum", keyword: "maximum", params: { comparison: "<=", limit: 8589934592 }, message: "must be <= 8589934592" };
                  if (vErrors === null) {
                    vErrors = [err48];
                  } else {
                    vErrors.push(err48);
                  }
                  errors++;
                }
                if (data22 < 1 || isNaN(data22)) {
                  const err49 = { instancePath: instancePath + "/routes/" + i2 + "/max_body_bytes", schemaPath: "#/$defs/route/properties/max_body_bytes/minimum", keyword: "minimum", params: { comparison: ">=", limit: 1 }, message: "must be >= 1" };
                  if (vErrors === null) {
                    vErrors = [err49];
                  } else {
                    vErrors.push(err49);
                  }
                  errors++;
                }
              }
            }
            if (data4.upstream_port !== void 0) {
              let data23 = data4.upstream_port;
              if (!(typeof data23 == "number" && (!(data23 % 1) && !isNaN(data23)))) {
                const err50 = { instancePath: instancePath + "/routes/" + i2 + "/upstream_port", schemaPath: "#/$defs/route/properties/upstream_port/type", keyword: "type", params: { type: "integer" }, message: "must be integer" };
                if (vErrors === null) {
                  vErrors = [err50];
                } else {
                  vErrors.push(err50);
                }
                errors++;
              }
              if (typeof data23 == "number") {
                if (data23 > 65535 || isNaN(data23)) {
                  const err51 = { instancePath: instancePath + "/routes/" + i2 + "/upstream_port", schemaPath: "#/$defs/route/properties/upstream_port/maximum", keyword: "maximum", params: { comparison: "<=", limit: 65535 }, message: "must be <= 65535" };
                  if (vErrors === null) {
                    vErrors = [err51];
                  } else {
                    vErrors.push(err51);
                  }
                  errors++;
                }
                if (data23 < 1 || isNaN(data23)) {
                  const err52 = { instancePath: instancePath + "/routes/" + i2 + "/upstream_port", schemaPath: "#/$defs/route/properties/upstream_port/minimum", keyword: "minimum", params: { comparison: ">=", limit: 1 }, message: "must be >= 1" };
                  if (vErrors === null) {
                    vErrors = [err52];
                  } else {
                    vErrors.push(err52);
                  }
                  errors++;
                }
              }
            }
          } else {
            const err53 = { instancePath: instancePath + "/routes/" + i2, schemaPath: "#/$defs/route/type", keyword: "type", params: { type: "object" }, message: "must be object" };
            if (vErrors === null) {
              vErrors = [err53];
            } else {
              vErrors.push(err53);
            }
            errors++;
          }
        }
      } else {
        const err54 = { instancePath: instancePath + "/routes", schemaPath: "#/properties/routes/type", keyword: "type", params: { type: "array" }, message: "must be array" };
        if (vErrors === null) {
          vErrors = [err54];
        } else {
          vErrors.push(err54);
        }
        errors++;
      }
    }
  } else {
    const err55 = { instancePath, schemaPath: "#/type", keyword: "type", params: { type: "object" }, message: "must be object" };
    if (vErrors === null) {
      vErrors = [err55];
    } else {
      vErrors.push(err55);
    }
    errors++;
  }
  validate58.errors = vErrors;
  return errors === 0;
}
validate58.evaluated = { "props": true, "dynamicProps": false, "dynamicItems": false };
exports.ContainerInputs = validate59;
var schema107 = { "$schema": "https://json-schema.org/draft/2020-12/schema", "$id": "https://openit.example/schemas/ContainerInputs.schema.json", "title": "ContainerInputs", "description": "3.5.0(2026-11-06): \uC601\uC5ED \uC774\uBBF8\uC9C0\uAC00 \uCEE8\uD14C\uC774\uB108 \uBC16(\uBC30\uCE58 \uC601\uC5ED)\uC5D0\uC11C \uC8FC\uC785\uBC1B\uC544\uC57C \uD558\uB294 \uAC83 \uC804\uBD80. \uC774\uBBF8\uC9C0\uB97C \uB9CC\uB4DC\uB294 \uC601\uC5ED\uC774 \uC120\uC5B8\uD558\uACE0(\uB77C\uBCA8 io.openit.inputs), \uB744\uC6B0\uB294 \uC601\uC5ED(deploy)\uC740 \uC774 \uC120\uC5B8\uACFC \uC815\uD655\uD788 \uAC19\uAC8C \uC8FC\uC785\uD55C\uB2E4. \uD658\uACBD \uBCC0\uC218\uC758 \uC774\uB984\xB7\uAC12\uC740 env_schema \uAC00 \uAC00\uB9AC\uD0A4\uB294 \uACC4\uC57D Env \uAC00 \uC815\uD55C\uB2E4. \uC774 \uC120\uC5B8\uC5D0 \uC5C6\uB294 \uC8FC\uC785(\uD30C\uC77C\xB7\uC4F0\uAE30 \uB9C8\uC6B4\uD2B8\xB7\uAD8C\uD55C)\uC740 \uD558\uC9C0 \uC54A\uACE0, \uC120\uC5B8\uB41C \uAC83\uC740 \uBE60\uB728\uB9AC\uC9C0 \uC54A\uB294\uB2E4. \uC65C: \uD30C\uC77C \uAD8C\uD55C\xB7\uC4F0\uAE30 \uACBD\uB85C\xB7\uC2E4\uD589 \uC0AC\uC6A9\uC790\xB7argv \uAC00 \uBB38\uC7A5 \uADDC\uCE59(CLAUDE.md '\uC774\uBBF8\uC9C0\uB294 \uB2E4\uC74C\uC744 \uC9C0\uD0A8\uB2E4')\uBFD0\uC774\uB77C \uB450 \uC601\uC5ED\uC774 \uAC01\uC790 \uD574\uC11D\uD588\uACE0, 2026-11-06 E2E \uAE30\uB3D9 \uC2E4\uD328 \uB124 \uAC74(DB \uBE44\uBC00 \uC77D\uAE30, TLS \uC0AC\uBCF8 \uACBD\uB85C, \uC7A1 argv, \uD1A0\uD070 \uC774\uB984)\uC774 \uBAA8\uB450 \uADF8 \uC5B4\uAE0B\uB0A8\uC774\uC5C8\uB2E4.", "x-producers": ["*"], "x-consumers": ["deploy"], "type": "object", "additionalProperties": false, "required": ["schema_version", "image", "read_only_root", "exec_absolute_argv", "role_env", "roles", "jobs"], "properties": { "schema_version": { "const": 1 }, "image": { "type": "string", "pattern": "^[a-z][a-z0-9-]*$", "description": "\uAC8C\uC2DC \uC774\uBBF8\uC9C0 \uC774\uB984(\uB77C\uBCA8 io.openit.service \uC640 \uAC19\uB2E4)" }, "read_only_root": { "const": true, "description": "\uB8E8\uD2B8 \uD30C\uC77C \uC2DC\uC2A4\uD15C\uC740 \uC77D\uAE30 \uC804\uC6A9\uC73C\uB85C \uB744\uC6B4\uB2E4. \uC4F0\uAE30\uB294 roles.*.writable \uC5D0 \uC120\uC5B8\uD55C \uACBD\uB85C\uB9CC" }, "exec_absolute_argv": { "const": true, "description": "\uBA85\uB839\uC758 \uCCAB \uC778\uC790\uAC00 \uC808\uB300 \uACBD\uB85C\uBA74 \uC774\uBBF8\uC9C0 \uC9C4\uC785\uC810\uC740 \uC11C\uBC84 \uC900\uBE44 \uC5C6\uC774 \uADF8 argv \uB97C \uADF8\uB300\uB85C \uC2E4\uD589\uD55C\uB2E4(\uC7A1 \uC120\uC5B8 JobsDeclaration.argv \uC758 \uC2E4\uD589 \uADDC\uCE59, Docker \uD45C\uC900 \uC9C4\uC785\uC810 \uAD00\uB840)" }, "role_env": { "type": ["string", "null"], "pattern": "^[A-Z][A-Z0-9_]*$", "description": "\uC5ED\uD560\uC744 \uACE0\uB974\uB294 \uD658\uACBD \uBCC0\uC218 \uC774\uB984(\uC608: STEP_ROLE). \uC5ED\uD560\uC774 \uD558\uB098\uBA74 null \uC774\uACE0 roles \uC758 \uD0A4\uB294 default \uD558\uB098\uB2E4" }, "roles": { "type": "object", "minProperties": 1, "propertyNames": { "pattern": "^[a-z][a-z0-9-]*$" }, "additionalProperties": { "allOf": [{ "$ref": "#/$defs/InputSet" }, { "not": { "required": ["config_paths"] } }] } }, "jobs": { "type": "object", "propertyNames": { "pattern": "^[a-z][a-z0-9-]*$" }, "additionalProperties": { "$ref": "#/$defs/InputSet" }, "description": "\uC7A1\uB9C8\uB2E4(\uD0A4 = \uC774 \uC774\uBBF8\uC9C0 \uB77C\uBCA8 io.openit.jobs \uC758 \uC7A1 \uC774\uB984, argv \uB85C \uACE0\uB978\uB2E4) \uADF8 \uC7A1 \uCEE8\uD14C\uC774\uB108\uAC00 \uBC1B\uB294 \uAC83. \uC7A1\uC774 \uC5C6\uC73C\uBA74 \uBE48 \uAC1D\uCCB4" } }, "allOf": [{ "if": { "properties": { "role_env": { "type": "null" } } }, "then": { "properties": { "roles": { "required": ["default"], "maxProperties": 1 } } } }], "$defs": { "Process": { "type": "object", "additionalProperties": false, "required": ["uid", "gid"], "description": "\uC8FC\uC785\uB41C \uD30C\uC77C\uC744 \uC77D\uACE0 \uC120\uC5B8\uB41C \uACBD\uB85C\uC5D0 \uC4F0\uB294 \uD504\uB85C\uC138\uC2A4\uC758 \uC22B\uC790 \uC0AC\uC6A9\uC790\xB7\uADF8\uB8F9. \uC774\uB984(app, postgres)\uC774 \uC544\uB2C8\uB77C \uC22B\uC790\uB2E4: \uBC30\uCE58 \uC601\uC5ED\uC740 \uC774\uBBF8\uC9C0 \uC548\uC758 /etc/passwd \uB97C \uBAA8\uB978\uB2E4(\uAD6C\uC870 \uADDC\uCE59 1)", "properties": { "uid": { "type": "integer", "minimum": 0, "maximum": 2147483647 }, "gid": { "type": "integer", "minimum": 0, "maximum": 2147483647 } } }, "File": { "type": "object", "additionalProperties": false, "required": ["path", "kind", "required", "opened_by"], "properties": { "path_env": { "type": ["string", "null"], "pattern": "^[A-Z][A-Z0-9_]*$", "description": "\uACBD\uB85C\uB97C \uC8FC\uB294 \uD658\uACBD \uBCC0\uC218(\uC608: DB_PASSWORD_FILE). null \uC774\uBA74 path \uACE0\uC815" }, "path": { "type": "string", "pattern": "^/[^\\s]*$", "description": "path_env \uAC00 \uC5C6\uC744 \uB54C \uC774\uBBF8\uC9C0\uAC00 \uC77D\uB294 \uACBD\uB85C(path_env \uAC00 \uC788\uC73C\uBA74 \uADF8 \uAE30\uBCF8\uAC12)" }, "directory": { "type": "boolean", "default": false, "description": "\uCC38\uC774\uBA74 \uD3F4\uB354(\uADF8 \uC548\uC758 \uD30C\uC77C \uC804\uBD80\uB97C \uC77D\uB294\uB2E4)" }, "kind": { "enum": ["secret", "config", "certificate", "ca-bundle", "declaration"], "description": "secret \uC740 \uAC12\uC774 \uBE44\uBC00\uC774\uB2E4(D84): \uBC30\uCE58 \uC601\uC5ED\uC740 \uB2E4\uB978 \uC0AC\uC6A9\uC790\uAC00 \uC77D\uC9C0 \uBABB\uD558\uAC8C \uC8FC\uB418 read_by \uB294 \uC77D\uC744 \uC218 \uC788\uC5B4\uC57C \uD55C\uB2E4" }, "schema": { "type": ["string", "null"], "pattern": "^[A-Z][A-Za-z0-9]*$", "description": "\uB0B4\uC6A9\uC774 \uB530\uB974\uB294 \uACC4\uC57D \uC2A4\uD0A4\uB9C8 \uC774\uB984(\uC788\uC73C\uBA74)" }, "required": { "type": "boolean" }, "opened_by": { "const": "start-process", "description": "\uC8FC\uC785\uB41C \uD30C\uC77C\uC740 \uCEE8\uD14C\uC774\uB108\uC758 \uC2DC\uC791 \uD504\uB85C\uC138\uC2A4(process \uC758 uid, \uBC30\uCE58 \uC601\uC5ED\uC774 \uBD99\uC778 \uBCF4\uC870 \uADF8\uB8F9 \uD3EC\uD568)\uAC00 \uC5F0\uB2E4. \uBC30\uCE58 \uC601\uC5ED\uC740 \uD30C\uC77C\uC744 0640\xB7\uADF8\uB8F9 SECRETS_GID \uB85C \uB450\uACE0 \uADF8 \uADF8\uB8F9\uC744 \uBCF4\uC870 \uADF8\uB8F9\uC73C\uB85C \uBD99\uC778\uB2E4. \uC0AC\uC6A9\uC790\uB97C \uBC14\uAFBC(gosu\xB7setpriv) \uB4A4\uC5D0\uB294 \uBCF4\uC870 \uADF8\uB8F9\uC774 \uC0AC\uB77C\uC9C0\uBBC0\uB85C \uADF8 \uC804\uC5D0 \uC5F4\uAC70\uB098 \uC2DC\uC791 \uD504\uB85C\uC138\uC2A4\uAC00 \uC790\uAE30 \uC0AC\uBCF8\uC744 \uB9CC\uB4E4\uC5B4 \uB118\uAE34\uB2E4(2026-11-06 DB \uBE44\uBC00 \uC77D\uAE30 \uC2E4\uD328\uC758 \uC6D0\uC778)" } } }, "Writable": { "type": "object", "additionalProperties": false, "required": ["path", "persist", "written_by"], "properties": { "path": { "type": "string", "pattern": "^/[^\\s]*$" }, "persist": { "type": "boolean", "description": "\uCC38\uC774\uBA74 \uB2E4\uC2DC \uC2DC\uC791\uD574\uB3C4 \uB0A8\uC544\uC57C \uD55C\uB2E4(\uC774\uB984 \uC788\uB294 \uBCFC\uB968). \uAC70\uC9D3\uC774\uBA74 tmpfs \uB85C \uCDA9\uBD84\uD558\uB2E4" }, "written_by": { "$ref": "#/$defs/Process", "description": "\uC774 \uACBD\uB85C\uC5D0 \uC4F0\uB294 \uD504\uB85C\uC138\uC2A4. \uBC30\uCE58 \uC601\uC5ED\uC740 \uC774 \uC0AC\uC6A9\uC790\uAC00 \uC4F8 \uC218 \uC788\uAC8C \uC900\uB2E4(tmpfs uid/gid/mode \uB610\uB294 \uBCFC\uB968 \uC18C\uC720)" } } }, "InputSet": { "type": "object", "additionalProperties": false, "required": ["env_schema", "process", "files", "writable", "capabilities", "sysctls"], "properties": { "env_schema": { "type": "string", "pattern": "^[A-Z][A-Za-z0-9]*Env$", "description": "\uC774 \uC5ED\uD560\uC774 \uBC1B\uB294 \uD658\uACBD \uBCC0\uC218\uC758 \uACC4\uC57D \uC2A4\uD0A4\uB9C8 \uC774\uB984" }, "process": { "$ref": "#/$defs/Process", "description": "\uCEE8\uD14C\uC774\uB108\uAC00 \uC2DC\uC791\uD558\uB294 \uC0AC\uC6A9\uC790(\uC774\uBBF8\uC9C0 USER \uC758 \uC22B\uC790). \uBC30\uCE58 \uC601\uC5ED\uC740 user \uB97C \uB36E\uC5B4\uC4F0\uC9C0 \uC54A\uB294\uB2E4" }, "files": { "type": "array", "items": { "$ref": "#/$defs/File" } }, "writable": { "type": "array", "items": { "$ref": "#/$defs/Writable" } }, "capabilities": { "type": "array", "uniqueItems": true, "items": { "enum": ["NET_BIND_SERVICE", "CHOWN", "SETUID", "SETGID", "DAC_OVERRIDE", "FOWNER", "KILL"] }, "description": "cap_drop ALL \uB4A4\uC5D0 \uB354\uD574\uC57C \uD558\uB294 \uAC83\uB9CC. \uBE44\uC5B4 \uC788\uC73C\uBA74 \uB354\uD558\uC9C0 \uC54A\uB294\uB2E4" }, "sysctls": { "type": "object", "propertyNames": { "enum": ["net.ipv4.ip_unprivileged_port_start"] }, "additionalProperties": { "type": "integer", "minimum": 0 }, "description": "\uBC30\uCE58 \uC601\uC5ED\uC774 \uC774 \uAC12\uC73C\uB85C \uC918\uC57C \uD558\uB294 \uCEE4\uB110 \uB9E4\uAC1C\uBCC0\uC218(\uC774\uB984 \uACF5\uAC04 \uC548). \uC5C6\uC73C\uBA74 \uC8FC\uC9C0 \uC54A\uB294\uB2E4. \uC608: root \uAC00 \uC544\uB2CC \uC0AC\uC6A9\uC790\uAC00 1024 \uC544\uB798 \uD3EC\uD2B8\uB97C \uC5F4 \uB54C net.ipv4.ip_unprivileged_port_start=0" }, "config_paths": { "type": "object", "description": "Job config directory paths. Resolve relative values against the config file container directory. Only these declared paths can be mounted; configuration content is validated against JobsDeclaration.config.schema first.", "propertyNames": { "type": "string", "pattern": "^/(?:[^~/]|~[01])*(?:/(?:[^~/]|~[01])*)*$", "description": "RFC 6901 JSON Pointer in the job config declared by JobsDeclaration.config." }, "additionalProperties": { "$ref": "#/$defs/ConfigPath" } } } }, "ConfigPath": { "type": "object", "additionalProperties": false, "required": ["access", "required"], "properties": { "access": { "enum": ["read", "write"], "description": "Directory bind: read-only input or writable job output. The process identity is InputSet.process." }, "required": { "type": "boolean", "description": "If false, an absent config member does not declare a mount (e.g. HTTP/memory store has no file root)." } } } }, "examples": [{ "schema_version": 1, "image": "survey-service", "read_only_root": true, "exec_absolute_argv": true, "role_env": null, "roles": { "default": { "env_schema": "SurveyServiceEnv", "process": { "uid": 10001, "gid": 10001 }, "capabilities": [], "files": [{ "path_env": "SURVEY_DB_PASSWORD_FILE", "path": "/run/secrets/survey-db-password", "kind": "secret", "schema": null, "required": true, "opened_by": "start-process" }], "writable": [{ "path": "/data", "persist": true, "written_by": { "uid": 10001, "gid": 10001 } }, { "path": "/tmp", "persist": false, "written_by": { "uid": 10001, "gid": 10001 } }], "sysctls": {} } }, "jobs": {} }] };
var pattern68 = new RegExp("^[A-Z][A-Z0-9_]*$", "u");
var schema108 = { "type": "object", "additionalProperties": false, "required": ["env_schema", "process", "files", "writable", "capabilities", "sysctls"], "properties": { "env_schema": { "type": "string", "pattern": "^[A-Z][A-Za-z0-9]*Env$", "description": "\uC774 \uC5ED\uD560\uC774 \uBC1B\uB294 \uD658\uACBD \uBCC0\uC218\uC758 \uACC4\uC57D \uC2A4\uD0A4\uB9C8 \uC774\uB984" }, "process": { "$ref": "#/$defs/Process", "description": "\uCEE8\uD14C\uC774\uB108\uAC00 \uC2DC\uC791\uD558\uB294 \uC0AC\uC6A9\uC790(\uC774\uBBF8\uC9C0 USER \uC758 \uC22B\uC790). \uBC30\uCE58 \uC601\uC5ED\uC740 user \uB97C \uB36E\uC5B4\uC4F0\uC9C0 \uC54A\uB294\uB2E4" }, "files": { "type": "array", "items": { "$ref": "#/$defs/File" } }, "writable": { "type": "array", "items": { "$ref": "#/$defs/Writable" } }, "capabilities": { "type": "array", "uniqueItems": true, "items": { "enum": ["NET_BIND_SERVICE", "CHOWN", "SETUID", "SETGID", "DAC_OVERRIDE", "FOWNER", "KILL"] }, "description": "cap_drop ALL \uB4A4\uC5D0 \uB354\uD574\uC57C \uD558\uB294 \uAC83\uB9CC. \uBE44\uC5B4 \uC788\uC73C\uBA74 \uB354\uD558\uC9C0 \uC54A\uB294\uB2E4" }, "sysctls": { "type": "object", "propertyNames": { "enum": ["net.ipv4.ip_unprivileged_port_start"] }, "additionalProperties": { "type": "integer", "minimum": 0 }, "description": "\uBC30\uCE58 \uC601\uC5ED\uC774 \uC774 \uAC12\uC73C\uB85C \uC918\uC57C \uD558\uB294 \uCEE4\uB110 \uB9E4\uAC1C\uBCC0\uC218(\uC774\uB984 \uACF5\uAC04 \uC548). \uC5C6\uC73C\uBA74 \uC8FC\uC9C0 \uC54A\uB294\uB2E4. \uC608: root \uAC00 \uC544\uB2CC \uC0AC\uC6A9\uC790\uAC00 1024 \uC544\uB798 \uD3EC\uD2B8\uB97C \uC5F4 \uB54C net.ipv4.ip_unprivileged_port_start=0" }, "config_paths": { "type": "object", "description": "Job config directory paths. Resolve relative values against the config file container directory. Only these declared paths can be mounted; configuration content is validated against JobsDeclaration.config.schema first.", "propertyNames": { "type": "string", "pattern": "^/(?:[^~/]|~[01])*(?:/(?:[^~/]|~[01])*)*$", "description": "RFC 6901 JSON Pointer in the job config declared by JobsDeclaration.config." }, "additionalProperties": { "$ref": "#/$defs/ConfigPath" } } } };
var schema110 = { "type": "object", "additionalProperties": false, "required": ["path", "kind", "required", "opened_by"], "properties": { "path_env": { "type": ["string", "null"], "pattern": "^[A-Z][A-Z0-9_]*$", "description": "\uACBD\uB85C\uB97C \uC8FC\uB294 \uD658\uACBD \uBCC0\uC218(\uC608: DB_PASSWORD_FILE). null \uC774\uBA74 path \uACE0\uC815" }, "path": { "type": "string", "pattern": "^/[^\\s]*$", "description": "path_env \uAC00 \uC5C6\uC744 \uB54C \uC774\uBBF8\uC9C0\uAC00 \uC77D\uB294 \uACBD\uB85C(path_env \uAC00 \uC788\uC73C\uBA74 \uADF8 \uAE30\uBCF8\uAC12)" }, "directory": { "type": "boolean", "default": false, "description": "\uCC38\uC774\uBA74 \uD3F4\uB354(\uADF8 \uC548\uC758 \uD30C\uC77C \uC804\uBD80\uB97C \uC77D\uB294\uB2E4)" }, "kind": { "enum": ["secret", "config", "certificate", "ca-bundle", "declaration"], "description": "secret \uC740 \uAC12\uC774 \uBE44\uBC00\uC774\uB2E4(D84): \uBC30\uCE58 \uC601\uC5ED\uC740 \uB2E4\uB978 \uC0AC\uC6A9\uC790\uAC00 \uC77D\uC9C0 \uBABB\uD558\uAC8C \uC8FC\uB418 read_by \uB294 \uC77D\uC744 \uC218 \uC788\uC5B4\uC57C \uD55C\uB2E4" }, "schema": { "type": ["string", "null"], "pattern": "^[A-Z][A-Za-z0-9]*$", "description": "\uB0B4\uC6A9\uC774 \uB530\uB974\uB294 \uACC4\uC57D \uC2A4\uD0A4\uB9C8 \uC774\uB984(\uC788\uC73C\uBA74)" }, "required": { "type": "boolean" }, "opened_by": { "const": "start-process", "description": "\uC8FC\uC785\uB41C \uD30C\uC77C\uC740 \uCEE8\uD14C\uC774\uB108\uC758 \uC2DC\uC791 \uD504\uB85C\uC138\uC2A4(process \uC758 uid, \uBC30\uCE58 \uC601\uC5ED\uC774 \uBD99\uC778 \uBCF4\uC870 \uADF8\uB8F9 \uD3EC\uD568)\uAC00 \uC5F0\uB2E4. \uBC30\uCE58 \uC601\uC5ED\uC740 \uD30C\uC77C\uC744 0640\xB7\uADF8\uB8F9 SECRETS_GID \uB85C \uB450\uACE0 \uADF8 \uADF8\uB8F9\uC744 \uBCF4\uC870 \uADF8\uB8F9\uC73C\uB85C \uBD99\uC778\uB2E4. \uC0AC\uC6A9\uC790\uB97C \uBC14\uAFBC(gosu\xB7setpriv) \uB4A4\uC5D0\uB294 \uBCF4\uC870 \uADF8\uB8F9\uC774 \uC0AC\uB77C\uC9C0\uBBC0\uB85C \uADF8 \uC804\uC5D0 \uC5F4\uAC70\uB098 \uC2DC\uC791 \uD504\uB85C\uC138\uC2A4\uAC00 \uC790\uAE30 \uC0AC\uBCF8\uC744 \uB9CC\uB4E4\uC5B4 \uB118\uAE34\uB2E4(2026-11-06 DB \uBE44\uBC00 \uC77D\uAE30 \uC2E4\uD328\uC758 \uC6D0\uC778)" } } };
var schema113 = { "type": "object", "additionalProperties": false, "required": ["access", "required"], "properties": { "access": { "enum": ["read", "write"], "description": "Directory bind: read-only input or writable job output. The process identity is InputSet.process." }, "required": { "type": "boolean", "description": "If false, an absent config member does not declare a mount (e.g. HTTP/memory store has no file root)." } } };
var pattern70 = new RegExp("^[A-Z][A-Za-z0-9]*Env$", "u");
var pattern72 = new RegExp("^/[^\\s]*$", "u");
var pattern73 = new RegExp("^[A-Z][A-Za-z0-9]*$", "u");
var pattern75 = new RegExp("^/(?:[^~/]|~[01])*(?:/(?:[^~/]|~[01])*)*$", "u");
function validate61(data, { instancePath = "", parentData, parentDataProperty, rootData = data, dynamicAnchors = {} } = {}) {
  let vErrors = null;
  let errors = 0;
  const evaluated0 = validate61.evaluated;
  if (evaluated0.dynamicProps) {
    evaluated0.props = void 0;
  }
  if (evaluated0.dynamicItems) {
    evaluated0.items = void 0;
  }
  if (data && typeof data == "object" && !Array.isArray(data)) {
    if (data.path === void 0) {
      const err0 = { instancePath, schemaPath: "#/required", keyword: "required", params: { missingProperty: "path" }, message: "must have required property 'path'" };
      if (vErrors === null) {
        vErrors = [err0];
      } else {
        vErrors.push(err0);
      }
      errors++;
    }
    if (data.persist === void 0) {
      const err1 = { instancePath, schemaPath: "#/required", keyword: "required", params: { missingProperty: "persist" }, message: "must have required property 'persist'" };
      if (vErrors === null) {
        vErrors = [err1];
      } else {
        vErrors.push(err1);
      }
      errors++;
    }
    if (data.written_by === void 0) {
      const err2 = { instancePath, schemaPath: "#/required", keyword: "required", params: { missingProperty: "written_by" }, message: "must have required property 'written_by'" };
      if (vErrors === null) {
        vErrors = [err2];
      } else {
        vErrors.push(err2);
      }
      errors++;
    }
    for (const key0 in data) {
      if (!(key0 === "path" || key0 === "persist" || key0 === "written_by")) {
        const err3 = { instancePath, schemaPath: "#/additionalProperties", keyword: "additionalProperties", params: { additionalProperty: key0 }, message: "must NOT have additional properties" };
        if (vErrors === null) {
          vErrors = [err3];
        } else {
          vErrors.push(err3);
        }
        errors++;
      }
    }
    if (data.path !== void 0) {
      let data0 = data.path;
      if (typeof data0 === "string") {
        if (!pattern72.test(data0)) {
          const err4 = { instancePath: instancePath + "/path", schemaPath: "#/properties/path/pattern", keyword: "pattern", params: { pattern: "^/[^\\s]*$" }, message: 'must match pattern "^/[^\\s]*$"' };
          if (vErrors === null) {
            vErrors = [err4];
          } else {
            vErrors.push(err4);
          }
          errors++;
        }
      } else {
        const err5 = { instancePath: instancePath + "/path", schemaPath: "#/properties/path/type", keyword: "type", params: { type: "string" }, message: "must be string" };
        if (vErrors === null) {
          vErrors = [err5];
        } else {
          vErrors.push(err5);
        }
        errors++;
      }
    }
    if (data.persist !== void 0) {
      if (typeof data.persist !== "boolean") {
        const err6 = { instancePath: instancePath + "/persist", schemaPath: "#/properties/persist/type", keyword: "type", params: { type: "boolean" }, message: "must be boolean" };
        if (vErrors === null) {
          vErrors = [err6];
        } else {
          vErrors.push(err6);
        }
        errors++;
      }
    }
    if (data.written_by !== void 0) {
      let data2 = data.written_by;
      if (data2 && typeof data2 == "object" && !Array.isArray(data2)) {
        if (data2.uid === void 0) {
          const err7 = { instancePath: instancePath + "/written_by", schemaPath: "#/$defs/Process/required", keyword: "required", params: { missingProperty: "uid" }, message: "must have required property 'uid'" };
          if (vErrors === null) {
            vErrors = [err7];
          } else {
            vErrors.push(err7);
          }
          errors++;
        }
        if (data2.gid === void 0) {
          const err8 = { instancePath: instancePath + "/written_by", schemaPath: "#/$defs/Process/required", keyword: "required", params: { missingProperty: "gid" }, message: "must have required property 'gid'" };
          if (vErrors === null) {
            vErrors = [err8];
          } else {
            vErrors.push(err8);
          }
          errors++;
        }
        for (const key1 in data2) {
          if (!(key1 === "uid" || key1 === "gid")) {
            const err9 = { instancePath: instancePath + "/written_by", schemaPath: "#/$defs/Process/additionalProperties", keyword: "additionalProperties", params: { additionalProperty: key1 }, message: "must NOT have additional properties" };
            if (vErrors === null) {
              vErrors = [err9];
            } else {
              vErrors.push(err9);
            }
            errors++;
          }
        }
        if (data2.uid !== void 0) {
          let data3 = data2.uid;
          if (!(typeof data3 == "number" && (!(data3 % 1) && !isNaN(data3)))) {
            const err10 = { instancePath: instancePath + "/written_by/uid", schemaPath: "#/$defs/Process/properties/uid/type", keyword: "type", params: { type: "integer" }, message: "must be integer" };
            if (vErrors === null) {
              vErrors = [err10];
            } else {
              vErrors.push(err10);
            }
            errors++;
          }
          if (typeof data3 == "number") {
            if (data3 > 2147483647 || isNaN(data3)) {
              const err11 = { instancePath: instancePath + "/written_by/uid", schemaPath: "#/$defs/Process/properties/uid/maximum", keyword: "maximum", params: { comparison: "<=", limit: 2147483647 }, message: "must be <= 2147483647" };
              if (vErrors === null) {
                vErrors = [err11];
              } else {
                vErrors.push(err11);
              }
              errors++;
            }
            if (data3 < 0 || isNaN(data3)) {
              const err12 = { instancePath: instancePath + "/written_by/uid", schemaPath: "#/$defs/Process/properties/uid/minimum", keyword: "minimum", params: { comparison: ">=", limit: 0 }, message: "must be >= 0" };
              if (vErrors === null) {
                vErrors = [err12];
              } else {
                vErrors.push(err12);
              }
              errors++;
            }
          }
        }
        if (data2.gid !== void 0) {
          let data4 = data2.gid;
          if (!(typeof data4 == "number" && (!(data4 % 1) && !isNaN(data4)))) {
            const err13 = { instancePath: instancePath + "/written_by/gid", schemaPath: "#/$defs/Process/properties/gid/type", keyword: "type", params: { type: "integer" }, message: "must be integer" };
            if (vErrors === null) {
              vErrors = [err13];
            } else {
              vErrors.push(err13);
            }
            errors++;
          }
          if (typeof data4 == "number") {
            if (data4 > 2147483647 || isNaN(data4)) {
              const err14 = { instancePath: instancePath + "/written_by/gid", schemaPath: "#/$defs/Process/properties/gid/maximum", keyword: "maximum", params: { comparison: "<=", limit: 2147483647 }, message: "must be <= 2147483647" };
              if (vErrors === null) {
                vErrors = [err14];
              } else {
                vErrors.push(err14);
              }
              errors++;
            }
            if (data4 < 0 || isNaN(data4)) {
              const err15 = { instancePath: instancePath + "/written_by/gid", schemaPath: "#/$defs/Process/properties/gid/minimum", keyword: "minimum", params: { comparison: ">=", limit: 0 }, message: "must be >= 0" };
              if (vErrors === null) {
                vErrors = [err15];
              } else {
                vErrors.push(err15);
              }
              errors++;
            }
          }
        }
      } else {
        const err16 = { instancePath: instancePath + "/written_by", schemaPath: "#/$defs/Process/type", keyword: "type", params: { type: "object" }, message: "must be object" };
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
  validate61.errors = vErrors;
  return errors === 0;
}
validate61.evaluated = { "props": true, "dynamicProps": false, "dynamicItems": false };
function validate60(data, { instancePath = "", parentData, parentDataProperty, rootData = data, dynamicAnchors = {} } = {}) {
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
    if (data.env_schema === void 0) {
      const err0 = { instancePath, schemaPath: "#/required", keyword: "required", params: { missingProperty: "env_schema" }, message: "must have required property 'env_schema'" };
      if (vErrors === null) {
        vErrors = [err0];
      } else {
        vErrors.push(err0);
      }
      errors++;
    }
    if (data.process === void 0) {
      const err1 = { instancePath, schemaPath: "#/required", keyword: "required", params: { missingProperty: "process" }, message: "must have required property 'process'" };
      if (vErrors === null) {
        vErrors = [err1];
      } else {
        vErrors.push(err1);
      }
      errors++;
    }
    if (data.files === void 0) {
      const err2 = { instancePath, schemaPath: "#/required", keyword: "required", params: { missingProperty: "files" }, message: "must have required property 'files'" };
      if (vErrors === null) {
        vErrors = [err2];
      } else {
        vErrors.push(err2);
      }
      errors++;
    }
    if (data.writable === void 0) {
      const err3 = { instancePath, schemaPath: "#/required", keyword: "required", params: { missingProperty: "writable" }, message: "must have required property 'writable'" };
      if (vErrors === null) {
        vErrors = [err3];
      } else {
        vErrors.push(err3);
      }
      errors++;
    }
    if (data.capabilities === void 0) {
      const err4 = { instancePath, schemaPath: "#/required", keyword: "required", params: { missingProperty: "capabilities" }, message: "must have required property 'capabilities'" };
      if (vErrors === null) {
        vErrors = [err4];
      } else {
        vErrors.push(err4);
      }
      errors++;
    }
    if (data.sysctls === void 0) {
      const err5 = { instancePath, schemaPath: "#/required", keyword: "required", params: { missingProperty: "sysctls" }, message: "must have required property 'sysctls'" };
      if (vErrors === null) {
        vErrors = [err5];
      } else {
        vErrors.push(err5);
      }
      errors++;
    }
    for (const key0 in data) {
      if (!(key0 === "env_schema" || key0 === "process" || key0 === "files" || key0 === "writable" || key0 === "capabilities" || key0 === "sysctls" || key0 === "config_paths")) {
        const err6 = { instancePath, schemaPath: "#/additionalProperties", keyword: "additionalProperties", params: { additionalProperty: key0 }, message: "must NOT have additional properties" };
        if (vErrors === null) {
          vErrors = [err6];
        } else {
          vErrors.push(err6);
        }
        errors++;
      }
    }
    if (data.env_schema !== void 0) {
      let data0 = data.env_schema;
      if (typeof data0 === "string") {
        if (!pattern70.test(data0)) {
          const err7 = { instancePath: instancePath + "/env_schema", schemaPath: "#/properties/env_schema/pattern", keyword: "pattern", params: { pattern: "^[A-Z][A-Za-z0-9]*Env$" }, message: 'must match pattern "^[A-Z][A-Za-z0-9]*Env$"' };
          if (vErrors === null) {
            vErrors = [err7];
          } else {
            vErrors.push(err7);
          }
          errors++;
        }
      } else {
        const err8 = { instancePath: instancePath + "/env_schema", schemaPath: "#/properties/env_schema/type", keyword: "type", params: { type: "string" }, message: "must be string" };
        if (vErrors === null) {
          vErrors = [err8];
        } else {
          vErrors.push(err8);
        }
        errors++;
      }
    }
    if (data.process !== void 0) {
      let data1 = data.process;
      if (data1 && typeof data1 == "object" && !Array.isArray(data1)) {
        if (data1.uid === void 0) {
          const err9 = { instancePath: instancePath + "/process", schemaPath: "#/$defs/Process/required", keyword: "required", params: { missingProperty: "uid" }, message: "must have required property 'uid'" };
          if (vErrors === null) {
            vErrors = [err9];
          } else {
            vErrors.push(err9);
          }
          errors++;
        }
        if (data1.gid === void 0) {
          const err10 = { instancePath: instancePath + "/process", schemaPath: "#/$defs/Process/required", keyword: "required", params: { missingProperty: "gid" }, message: "must have required property 'gid'" };
          if (vErrors === null) {
            vErrors = [err10];
          } else {
            vErrors.push(err10);
          }
          errors++;
        }
        for (const key1 in data1) {
          if (!(key1 === "uid" || key1 === "gid")) {
            const err11 = { instancePath: instancePath + "/process", schemaPath: "#/$defs/Process/additionalProperties", keyword: "additionalProperties", params: { additionalProperty: key1 }, message: "must NOT have additional properties" };
            if (vErrors === null) {
              vErrors = [err11];
            } else {
              vErrors.push(err11);
            }
            errors++;
          }
        }
        if (data1.uid !== void 0) {
          let data2 = data1.uid;
          if (!(typeof data2 == "number" && (!(data2 % 1) && !isNaN(data2)))) {
            const err12 = { instancePath: instancePath + "/process/uid", schemaPath: "#/$defs/Process/properties/uid/type", keyword: "type", params: { type: "integer" }, message: "must be integer" };
            if (vErrors === null) {
              vErrors = [err12];
            } else {
              vErrors.push(err12);
            }
            errors++;
          }
          if (typeof data2 == "number") {
            if (data2 > 2147483647 || isNaN(data2)) {
              const err13 = { instancePath: instancePath + "/process/uid", schemaPath: "#/$defs/Process/properties/uid/maximum", keyword: "maximum", params: { comparison: "<=", limit: 2147483647 }, message: "must be <= 2147483647" };
              if (vErrors === null) {
                vErrors = [err13];
              } else {
                vErrors.push(err13);
              }
              errors++;
            }
            if (data2 < 0 || isNaN(data2)) {
              const err14 = { instancePath: instancePath + "/process/uid", schemaPath: "#/$defs/Process/properties/uid/minimum", keyword: "minimum", params: { comparison: ">=", limit: 0 }, message: "must be >= 0" };
              if (vErrors === null) {
                vErrors = [err14];
              } else {
                vErrors.push(err14);
              }
              errors++;
            }
          }
        }
        if (data1.gid !== void 0) {
          let data3 = data1.gid;
          if (!(typeof data3 == "number" && (!(data3 % 1) && !isNaN(data3)))) {
            const err15 = { instancePath: instancePath + "/process/gid", schemaPath: "#/$defs/Process/properties/gid/type", keyword: "type", params: { type: "integer" }, message: "must be integer" };
            if (vErrors === null) {
              vErrors = [err15];
            } else {
              vErrors.push(err15);
            }
            errors++;
          }
          if (typeof data3 == "number") {
            if (data3 > 2147483647 || isNaN(data3)) {
              const err16 = { instancePath: instancePath + "/process/gid", schemaPath: "#/$defs/Process/properties/gid/maximum", keyword: "maximum", params: { comparison: "<=", limit: 2147483647 }, message: "must be <= 2147483647" };
              if (vErrors === null) {
                vErrors = [err16];
              } else {
                vErrors.push(err16);
              }
              errors++;
            }
            if (data3 < 0 || isNaN(data3)) {
              const err17 = { instancePath: instancePath + "/process/gid", schemaPath: "#/$defs/Process/properties/gid/minimum", keyword: "minimum", params: { comparison: ">=", limit: 0 }, message: "must be >= 0" };
              if (vErrors === null) {
                vErrors = [err17];
              } else {
                vErrors.push(err17);
              }
              errors++;
            }
          }
        }
      } else {
        const err18 = { instancePath: instancePath + "/process", schemaPath: "#/$defs/Process/type", keyword: "type", params: { type: "object" }, message: "must be object" };
        if (vErrors === null) {
          vErrors = [err18];
        } else {
          vErrors.push(err18);
        }
        errors++;
      }
    }
    if (data.files !== void 0) {
      let data4 = data.files;
      if (Array.isArray(data4)) {
        const len0 = data4.length;
        for (let i0 = 0; i0 < len0; i0++) {
          let data5 = data4[i0];
          if (data5 && typeof data5 == "object" && !Array.isArray(data5)) {
            if (data5.path === void 0) {
              const err19 = { instancePath: instancePath + "/files/" + i0, schemaPath: "#/$defs/File/required", keyword: "required", params: { missingProperty: "path" }, message: "must have required property 'path'" };
              if (vErrors === null) {
                vErrors = [err19];
              } else {
                vErrors.push(err19);
              }
              errors++;
            }
            if (data5.kind === void 0) {
              const err20 = { instancePath: instancePath + "/files/" + i0, schemaPath: "#/$defs/File/required", keyword: "required", params: { missingProperty: "kind" }, message: "must have required property 'kind'" };
              if (vErrors === null) {
                vErrors = [err20];
              } else {
                vErrors.push(err20);
              }
              errors++;
            }
            if (data5.required === void 0) {
              const err21 = { instancePath: instancePath + "/files/" + i0, schemaPath: "#/$defs/File/required", keyword: "required", params: { missingProperty: "required" }, message: "must have required property 'required'" };
              if (vErrors === null) {
                vErrors = [err21];
              } else {
                vErrors.push(err21);
              }
              errors++;
            }
            if (data5.opened_by === void 0) {
              const err22 = { instancePath: instancePath + "/files/" + i0, schemaPath: "#/$defs/File/required", keyword: "required", params: { missingProperty: "opened_by" }, message: "must have required property 'opened_by'" };
              if (vErrors === null) {
                vErrors = [err22];
              } else {
                vErrors.push(err22);
              }
              errors++;
            }
            for (const key2 in data5) {
              if (!(key2 === "path_env" || key2 === "path" || key2 === "directory" || key2 === "kind" || key2 === "schema" || key2 === "required" || key2 === "opened_by")) {
                const err23 = { instancePath: instancePath + "/files/" + i0, schemaPath: "#/$defs/File/additionalProperties", keyword: "additionalProperties", params: { additionalProperty: key2 }, message: "must NOT have additional properties" };
                if (vErrors === null) {
                  vErrors = [err23];
                } else {
                  vErrors.push(err23);
                }
                errors++;
              }
            }
            if (data5.path_env !== void 0) {
              let data6 = data5.path_env;
              if (typeof data6 !== "string" && data6 !== null) {
                const err24 = { instancePath: instancePath + "/files/" + i0 + "/path_env", schemaPath: "#/$defs/File/properties/path_env/type", keyword: "type", params: { type: schema110.properties.path_env.type }, message: "must be string,null" };
                if (vErrors === null) {
                  vErrors = [err24];
                } else {
                  vErrors.push(err24);
                }
                errors++;
              }
              if (typeof data6 === "string") {
                if (!pattern68.test(data6)) {
                  const err25 = { instancePath: instancePath + "/files/" + i0 + "/path_env", schemaPath: "#/$defs/File/properties/path_env/pattern", keyword: "pattern", params: { pattern: "^[A-Z][A-Z0-9_]*$" }, message: 'must match pattern "^[A-Z][A-Z0-9_]*$"' };
                  if (vErrors === null) {
                    vErrors = [err25];
                  } else {
                    vErrors.push(err25);
                  }
                  errors++;
                }
              }
            }
            if (data5.path !== void 0) {
              let data7 = data5.path;
              if (typeof data7 === "string") {
                if (!pattern72.test(data7)) {
                  const err26 = { instancePath: instancePath + "/files/" + i0 + "/path", schemaPath: "#/$defs/File/properties/path/pattern", keyword: "pattern", params: { pattern: "^/[^\\s]*$" }, message: 'must match pattern "^/[^\\s]*$"' };
                  if (vErrors === null) {
                    vErrors = [err26];
                  } else {
                    vErrors.push(err26);
                  }
                  errors++;
                }
              } else {
                const err27 = { instancePath: instancePath + "/files/" + i0 + "/path", schemaPath: "#/$defs/File/properties/path/type", keyword: "type", params: { type: "string" }, message: "must be string" };
                if (vErrors === null) {
                  vErrors = [err27];
                } else {
                  vErrors.push(err27);
                }
                errors++;
              }
            }
            if (data5.directory !== void 0) {
              if (typeof data5.directory !== "boolean") {
                const err28 = { instancePath: instancePath + "/files/" + i0 + "/directory", schemaPath: "#/$defs/File/properties/directory/type", keyword: "type", params: { type: "boolean" }, message: "must be boolean" };
                if (vErrors === null) {
                  vErrors = [err28];
                } else {
                  vErrors.push(err28);
                }
                errors++;
              }
            }
            if (data5.kind !== void 0) {
              let data9 = data5.kind;
              if (!(data9 === "secret" || data9 === "config" || data9 === "certificate" || data9 === "ca-bundle" || data9 === "declaration")) {
                const err29 = { instancePath: instancePath + "/files/" + i0 + "/kind", schemaPath: "#/$defs/File/properties/kind/enum", keyword: "enum", params: { allowedValues: schema110.properties.kind.enum }, message: "must be equal to one of the allowed values" };
                if (vErrors === null) {
                  vErrors = [err29];
                } else {
                  vErrors.push(err29);
                }
                errors++;
              }
            }
            if (data5.schema !== void 0) {
              let data10 = data5.schema;
              if (typeof data10 !== "string" && data10 !== null) {
                const err30 = { instancePath: instancePath + "/files/" + i0 + "/schema", schemaPath: "#/$defs/File/properties/schema/type", keyword: "type", params: { type: schema110.properties.schema.type }, message: "must be string,null" };
                if (vErrors === null) {
                  vErrors = [err30];
                } else {
                  vErrors.push(err30);
                }
                errors++;
              }
              if (typeof data10 === "string") {
                if (!pattern73.test(data10)) {
                  const err31 = { instancePath: instancePath + "/files/" + i0 + "/schema", schemaPath: "#/$defs/File/properties/schema/pattern", keyword: "pattern", params: { pattern: "^[A-Z][A-Za-z0-9]*$" }, message: 'must match pattern "^[A-Z][A-Za-z0-9]*$"' };
                  if (vErrors === null) {
                    vErrors = [err31];
                  } else {
                    vErrors.push(err31);
                  }
                  errors++;
                }
              }
            }
            if (data5.required !== void 0) {
              if (typeof data5.required !== "boolean") {
                const err32 = { instancePath: instancePath + "/files/" + i0 + "/required", schemaPath: "#/$defs/File/properties/required/type", keyword: "type", params: { type: "boolean" }, message: "must be boolean" };
                if (vErrors === null) {
                  vErrors = [err32];
                } else {
                  vErrors.push(err32);
                }
                errors++;
              }
            }
            if (data5.opened_by !== void 0) {
              if ("start-process" !== data5.opened_by) {
                const err33 = { instancePath: instancePath + "/files/" + i0 + "/opened_by", schemaPath: "#/$defs/File/properties/opened_by/const", keyword: "const", params: { allowedValue: "start-process" }, message: "must be equal to constant" };
                if (vErrors === null) {
                  vErrors = [err33];
                } else {
                  vErrors.push(err33);
                }
                errors++;
              }
            }
          } else {
            const err34 = { instancePath: instancePath + "/files/" + i0, schemaPath: "#/$defs/File/type", keyword: "type", params: { type: "object" }, message: "must be object" };
            if (vErrors === null) {
              vErrors = [err34];
            } else {
              vErrors.push(err34);
            }
            errors++;
          }
        }
      } else {
        const err35 = { instancePath: instancePath + "/files", schemaPath: "#/properties/files/type", keyword: "type", params: { type: "array" }, message: "must be array" };
        if (vErrors === null) {
          vErrors = [err35];
        } else {
          vErrors.push(err35);
        }
        errors++;
      }
    }
    if (data.writable !== void 0) {
      let data13 = data.writable;
      if (Array.isArray(data13)) {
        const len1 = data13.length;
        for (let i1 = 0; i1 < len1; i1++) {
          if (!validate61(data13[i1], { instancePath: instancePath + "/writable/" + i1, parentData: data13, parentDataProperty: i1, rootData, dynamicAnchors })) {
            vErrors = vErrors === null ? validate61.errors : vErrors.concat(validate61.errors);
            errors = vErrors.length;
          }
        }
      } else {
        const err36 = { instancePath: instancePath + "/writable", schemaPath: "#/properties/writable/type", keyword: "type", params: { type: "array" }, message: "must be array" };
        if (vErrors === null) {
          vErrors = [err36];
        } else {
          vErrors.push(err36);
        }
        errors++;
      }
    }
    if (data.capabilities !== void 0) {
      let data15 = data.capabilities;
      if (Array.isArray(data15)) {
        const len2 = data15.length;
        for (let i2 = 0; i2 < len2; i2++) {
          let data16 = data15[i2];
          if (!(data16 === "NET_BIND_SERVICE" || data16 === "CHOWN" || data16 === "SETUID" || data16 === "SETGID" || data16 === "DAC_OVERRIDE" || data16 === "FOWNER" || data16 === "KILL")) {
            const err37 = { instancePath: instancePath + "/capabilities/" + i2, schemaPath: "#/properties/capabilities/items/enum", keyword: "enum", params: { allowedValues: schema108.properties.capabilities.items.enum }, message: "must be equal to one of the allowed values" };
            if (vErrors === null) {
              vErrors = [err37];
            } else {
              vErrors.push(err37);
            }
            errors++;
          }
        }
        let i3 = data15.length;
        let j0;
        if (i3 > 1) {
          outer0: for (; i3--; ) {
            for (j0 = i3; j0--; ) {
              if (func0(data15[i3], data15[j0])) {
                const err38 = { instancePath: instancePath + "/capabilities", schemaPath: "#/properties/capabilities/uniqueItems", keyword: "uniqueItems", params: { i: i3, j: j0 }, message: "must NOT have duplicate items (items ## " + j0 + " and " + i3 + " are identical)" };
                if (vErrors === null) {
                  vErrors = [err38];
                } else {
                  vErrors.push(err38);
                }
                errors++;
                break outer0;
              }
            }
          }
        }
      } else {
        const err39 = { instancePath: instancePath + "/capabilities", schemaPath: "#/properties/capabilities/type", keyword: "type", params: { type: "array" }, message: "must be array" };
        if (vErrors === null) {
          vErrors = [err39];
        } else {
          vErrors.push(err39);
        }
        errors++;
      }
    }
    if (data.sysctls !== void 0) {
      let data17 = data.sysctls;
      if (data17 && typeof data17 == "object" && !Array.isArray(data17)) {
        for (const key3 in data17) {
          const _errs38 = errors;
          if (!(key3 === "net.ipv4.ip_unprivileged_port_start")) {
            const err40 = { instancePath: instancePath + "/sysctls", schemaPath: "#/properties/sysctls/propertyNames/enum", keyword: "enum", params: { allowedValues: schema108.properties.sysctls.propertyNames.enum }, message: "must be equal to one of the allowed values", propertyName: key3 };
            if (vErrors === null) {
              vErrors = [err40];
            } else {
              vErrors.push(err40);
            }
            errors++;
          }
          var valid12 = _errs38 === errors;
          if (!valid12) {
            const err41 = { instancePath: instancePath + "/sysctls", schemaPath: "#/properties/sysctls/propertyNames", keyword: "propertyNames", params: { propertyName: key3 }, message: "property name must be valid" };
            if (vErrors === null) {
              vErrors = [err41];
            } else {
              vErrors.push(err41);
            }
            errors++;
          }
        }
        for (const key4 in data17) {
          let data18 = data17[key4];
          if (!(typeof data18 == "number" && (!(data18 % 1) && !isNaN(data18)))) {
            const err42 = { instancePath: instancePath + "/sysctls/" + key4.replace(/~/g, "~0").replace(/\//g, "~1"), schemaPath: "#/properties/sysctls/additionalProperties/type", keyword: "type", params: { type: "integer" }, message: "must be integer" };
            if (vErrors === null) {
              vErrors = [err42];
            } else {
              vErrors.push(err42);
            }
            errors++;
          }
          if (typeof data18 == "number") {
            if (data18 < 0 || isNaN(data18)) {
              const err43 = { instancePath: instancePath + "/sysctls/" + key4.replace(/~/g, "~0").replace(/\//g, "~1"), schemaPath: "#/properties/sysctls/additionalProperties/minimum", keyword: "minimum", params: { comparison: ">=", limit: 0 }, message: "must be >= 0" };
              if (vErrors === null) {
                vErrors = [err43];
              } else {
                vErrors.push(err43);
              }
              errors++;
            }
          }
        }
      } else {
        const err44 = { instancePath: instancePath + "/sysctls", schemaPath: "#/properties/sysctls/type", keyword: "type", params: { type: "object" }, message: "must be object" };
        if (vErrors === null) {
          vErrors = [err44];
        } else {
          vErrors.push(err44);
        }
        errors++;
      }
    }
    if (data.config_paths !== void 0) {
      let data19 = data.config_paths;
      if (data19 && typeof data19 == "object" && !Array.isArray(data19)) {
        for (const key5 in data19) {
          const _errs44 = errors;
          if (typeof key5 === "string") {
            if (!pattern75.test(key5)) {
              const err45 = { instancePath: instancePath + "/config_paths", schemaPath: "#/properties/config_paths/propertyNames/pattern", keyword: "pattern", params: { pattern: "^/(?:[^~/]|~[01])*(?:/(?:[^~/]|~[01])*)*$" }, message: 'must match pattern "^/(?:[^~/]|~[01])*(?:/(?:[^~/]|~[01])*)*$"', propertyName: key5 };
              if (vErrors === null) {
                vErrors = [err45];
              } else {
                vErrors.push(err45);
              }
              errors++;
            }
          } else {
            const err46 = { instancePath: instancePath + "/config_paths", schemaPath: "#/properties/config_paths/propertyNames/type", keyword: "type", params: { type: "string" }, message: "must be string", propertyName: key5 };
            if (vErrors === null) {
              vErrors = [err46];
            } else {
              vErrors.push(err46);
            }
            errors++;
          }
          var valid14 = _errs44 === errors;
          if (!valid14) {
            const err47 = { instancePath: instancePath + "/config_paths", schemaPath: "#/properties/config_paths/propertyNames", keyword: "propertyNames", params: { propertyName: key5 }, message: "property name must be valid" };
            if (vErrors === null) {
              vErrors = [err47];
            } else {
              vErrors.push(err47);
            }
            errors++;
          }
        }
        for (const key6 in data19) {
          let data20 = data19[key6];
          if (data20 && typeof data20 == "object" && !Array.isArray(data20)) {
            if (data20.access === void 0) {
              const err48 = { instancePath: instancePath + "/config_paths/" + key6.replace(/~/g, "~0").replace(/\//g, "~1"), schemaPath: "#/$defs/ConfigPath/required", keyword: "required", params: { missingProperty: "access" }, message: "must have required property 'access'" };
              if (vErrors === null) {
                vErrors = [err48];
              } else {
                vErrors.push(err48);
              }
              errors++;
            }
            if (data20.required === void 0) {
              const err49 = { instancePath: instancePath + "/config_paths/" + key6.replace(/~/g, "~0").replace(/\//g, "~1"), schemaPath: "#/$defs/ConfigPath/required", keyword: "required", params: { missingProperty: "required" }, message: "must have required property 'required'" };
              if (vErrors === null) {
                vErrors = [err49];
              } else {
                vErrors.push(err49);
              }
              errors++;
            }
            for (const key7 in data20) {
              if (!(key7 === "access" || key7 === "required")) {
                const err50 = { instancePath: instancePath + "/config_paths/" + key6.replace(/~/g, "~0").replace(/\//g, "~1"), schemaPath: "#/$defs/ConfigPath/additionalProperties", keyword: "additionalProperties", params: { additionalProperty: key7 }, message: "must NOT have additional properties" };
                if (vErrors === null) {
                  vErrors = [err50];
                } else {
                  vErrors.push(err50);
                }
                errors++;
              }
            }
            if (data20.access !== void 0) {
              let data21 = data20.access;
              if (!(data21 === "read" || data21 === "write")) {
                const err51 = { instancePath: instancePath + "/config_paths/" + key6.replace(/~/g, "~0").replace(/\//g, "~1") + "/access", schemaPath: "#/$defs/ConfigPath/properties/access/enum", keyword: "enum", params: { allowedValues: schema113.properties.access.enum }, message: "must be equal to one of the allowed values" };
                if (vErrors === null) {
                  vErrors = [err51];
                } else {
                  vErrors.push(err51);
                }
                errors++;
              }
            }
            if (data20.required !== void 0) {
              if (typeof data20.required !== "boolean") {
                const err52 = { instancePath: instancePath + "/config_paths/" + key6.replace(/~/g, "~0").replace(/\//g, "~1") + "/required", schemaPath: "#/$defs/ConfigPath/properties/required/type", keyword: "type", params: { type: "boolean" }, message: "must be boolean" };
                if (vErrors === null) {
                  vErrors = [err52];
                } else {
                  vErrors.push(err52);
                }
                errors++;
              }
            }
          } else {
            const err53 = { instancePath: instancePath + "/config_paths/" + key6.replace(/~/g, "~0").replace(/\//g, "~1"), schemaPath: "#/$defs/ConfigPath/type", keyword: "type", params: { type: "object" }, message: "must be object" };
            if (vErrors === null) {
              vErrors = [err53];
            } else {
              vErrors.push(err53);
            }
            errors++;
          }
        }
      } else {
        const err54 = { instancePath: instancePath + "/config_paths", schemaPath: "#/properties/config_paths/type", keyword: "type", params: { type: "object" }, message: "must be object" };
        if (vErrors === null) {
          vErrors = [err54];
        } else {
          vErrors.push(err54);
        }
        errors++;
      }
    }
  } else {
    const err55 = { instancePath, schemaPath: "#/type", keyword: "type", params: { type: "object" }, message: "must be object" };
    if (vErrors === null) {
      vErrors = [err55];
    } else {
      vErrors.push(err55);
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
  const _errs2 = errors;
  let valid1 = true;
  const _errs3 = errors;
  if (data && typeof data == "object" && !Array.isArray(data)) {
    if (data.role_env !== void 0) {
      if (data.role_env !== null) {
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
    const _errs6 = errors;
    if (data && typeof data == "object" && !Array.isArray(data)) {
      if (data.roles !== void 0) {
        let data1 = data.roles;
        if (data1 && typeof data1 == "object" && !Array.isArray(data1)) {
          if (Object.keys(data1).length > 1) {
            const err1 = { instancePath: instancePath + "/roles", schemaPath: "#/allOf/0/then/properties/roles/maxProperties", keyword: "maxProperties", params: { limit: 1 }, message: "must NOT have more than 1 properties" };
            if (vErrors === null) {
              vErrors = [err1];
            } else {
              vErrors.push(err1);
            }
            errors++;
          }
          if (data1.default === void 0) {
            const err2 = { instancePath: instancePath + "/roles", schemaPath: "#/allOf/0/then/properties/roles/required", keyword: "required", params: { missingProperty: "default" }, message: "must have required property 'default'" };
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
    var _valid0 = _errs6 === errors;
    valid1 = _valid0;
    if (valid1) {
      var props0 = {};
      props0.roles = true;
      props0.role_env = true;
    }
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
  if (data && typeof data == "object" && !Array.isArray(data)) {
    if (data.schema_version === void 0) {
      const err4 = { instancePath, schemaPath: "#/required", keyword: "required", params: { missingProperty: "schema_version" }, message: "must have required property 'schema_version'" };
      if (vErrors === null) {
        vErrors = [err4];
      } else {
        vErrors.push(err4);
      }
      errors++;
    }
    if (data.image === void 0) {
      const err5 = { instancePath, schemaPath: "#/required", keyword: "required", params: { missingProperty: "image" }, message: "must have required property 'image'" };
      if (vErrors === null) {
        vErrors = [err5];
      } else {
        vErrors.push(err5);
      }
      errors++;
    }
    if (data.read_only_root === void 0) {
      const err6 = { instancePath, schemaPath: "#/required", keyword: "required", params: { missingProperty: "read_only_root" }, message: "must have required property 'read_only_root'" };
      if (vErrors === null) {
        vErrors = [err6];
      } else {
        vErrors.push(err6);
      }
      errors++;
    }
    if (data.exec_absolute_argv === void 0) {
      const err7 = { instancePath, schemaPath: "#/required", keyword: "required", params: { missingProperty: "exec_absolute_argv" }, message: "must have required property 'exec_absolute_argv'" };
      if (vErrors === null) {
        vErrors = [err7];
      } else {
        vErrors.push(err7);
      }
      errors++;
    }
    if (data.role_env === void 0) {
      const err8 = { instancePath, schemaPath: "#/required", keyword: "required", params: { missingProperty: "role_env" }, message: "must have required property 'role_env'" };
      if (vErrors === null) {
        vErrors = [err8];
      } else {
        vErrors.push(err8);
      }
      errors++;
    }
    if (data.roles === void 0) {
      const err9 = { instancePath, schemaPath: "#/required", keyword: "required", params: { missingProperty: "roles" }, message: "must have required property 'roles'" };
      if (vErrors === null) {
        vErrors = [err9];
      } else {
        vErrors.push(err9);
      }
      errors++;
    }
    if (data.jobs === void 0) {
      const err10 = { instancePath, schemaPath: "#/required", keyword: "required", params: { missingProperty: "jobs" }, message: "must have required property 'jobs'" };
      if (vErrors === null) {
        vErrors = [err10];
      } else {
        vErrors.push(err10);
      }
      errors++;
    }
    for (const key0 in data) {
      if (!(key0 === "schema_version" || key0 === "image" || key0 === "read_only_root" || key0 === "exec_absolute_argv" || key0 === "role_env" || key0 === "roles" || key0 === "jobs")) {
        const err11 = { instancePath, schemaPath: "#/additionalProperties", keyword: "additionalProperties", params: { additionalProperty: key0 }, message: "must NOT have additional properties" };
        if (vErrors === null) {
          vErrors = [err11];
        } else {
          vErrors.push(err11);
        }
        errors++;
      }
    }
    if (data.schema_version !== void 0) {
      if (1 !== data.schema_version) {
        const err12 = { instancePath: instancePath + "/schema_version", schemaPath: "#/properties/schema_version/const", keyword: "const", params: { allowedValue: 1 }, message: "must be equal to constant" };
        if (vErrors === null) {
          vErrors = [err12];
        } else {
          vErrors.push(err12);
        }
        errors++;
      }
    }
    if (data.image !== void 0) {
      let data3 = data.image;
      if (typeof data3 === "string") {
        if (!pattern42.test(data3)) {
          const err13 = { instancePath: instancePath + "/image", schemaPath: "#/properties/image/pattern", keyword: "pattern", params: { pattern: "^[a-z][a-z0-9-]*$" }, message: 'must match pattern "^[a-z][a-z0-9-]*$"' };
          if (vErrors === null) {
            vErrors = [err13];
          } else {
            vErrors.push(err13);
          }
          errors++;
        }
      } else {
        const err14 = { instancePath: instancePath + "/image", schemaPath: "#/properties/image/type", keyword: "type", params: { type: "string" }, message: "must be string" };
        if (vErrors === null) {
          vErrors = [err14];
        } else {
          vErrors.push(err14);
        }
        errors++;
      }
    }
    if (data.read_only_root !== void 0) {
      if (true !== data.read_only_root) {
        const err15 = { instancePath: instancePath + "/read_only_root", schemaPath: "#/properties/read_only_root/const", keyword: "const", params: { allowedValue: true }, message: "must be equal to constant" };
        if (vErrors === null) {
          vErrors = [err15];
        } else {
          vErrors.push(err15);
        }
        errors++;
      }
    }
    if (data.exec_absolute_argv !== void 0) {
      if (true !== data.exec_absolute_argv) {
        const err16 = { instancePath: instancePath + "/exec_absolute_argv", schemaPath: "#/properties/exec_absolute_argv/const", keyword: "const", params: { allowedValue: true }, message: "must be equal to constant" };
        if (vErrors === null) {
          vErrors = [err16];
        } else {
          vErrors.push(err16);
        }
        errors++;
      }
    }
    if (data.role_env !== void 0) {
      let data6 = data.role_env;
      if (typeof data6 !== "string" && data6 !== null) {
        const err17 = { instancePath: instancePath + "/role_env", schemaPath: "#/properties/role_env/type", keyword: "type", params: { type: schema107.properties.role_env.type }, message: "must be string,null" };
        if (vErrors === null) {
          vErrors = [err17];
        } else {
          vErrors.push(err17);
        }
        errors++;
      }
      if (typeof data6 === "string") {
        if (!pattern68.test(data6)) {
          const err18 = { instancePath: instancePath + "/role_env", schemaPath: "#/properties/role_env/pattern", keyword: "pattern", params: { pattern: "^[A-Z][A-Z0-9_]*$" }, message: 'must match pattern "^[A-Z][A-Z0-9_]*$"' };
          if (vErrors === null) {
            vErrors = [err18];
          } else {
            vErrors.push(err18);
          }
          errors++;
        }
      }
    }
    if (data.roles !== void 0) {
      let data7 = data.roles;
      if (data7 && typeof data7 == "object" && !Array.isArray(data7)) {
        if (Object.keys(data7).length < 1) {
          const err19 = { instancePath: instancePath + "/roles", schemaPath: "#/properties/roles/minProperties", keyword: "minProperties", params: { limit: 1 }, message: "must NOT have fewer than 1 properties" };
          if (vErrors === null) {
            vErrors = [err19];
          } else {
            vErrors.push(err19);
          }
          errors++;
        }
        for (const key1 in data7) {
          const _errs18 = errors;
          if (typeof key1 === "string") {
            if (!pattern42.test(key1)) {
              const err20 = { instancePath: instancePath + "/roles", schemaPath: "#/properties/roles/propertyNames/pattern", keyword: "pattern", params: { pattern: "^[a-z][a-z0-9-]*$" }, message: 'must match pattern "^[a-z][a-z0-9-]*$"', propertyName: key1 };
              if (vErrors === null) {
                vErrors = [err20];
              } else {
                vErrors.push(err20);
              }
              errors++;
            }
          }
          var valid5 = _errs18 === errors;
          if (!valid5) {
            const err21 = { instancePath: instancePath + "/roles", schemaPath: "#/properties/roles/propertyNames", keyword: "propertyNames", params: { propertyName: key1 }, message: "property name must be valid" };
            if (vErrors === null) {
              vErrors = [err21];
            } else {
              vErrors.push(err21);
            }
            errors++;
          }
        }
        for (const key2 in data7) {
          let data8 = data7[key2];
          if (!validate60(data8, { instancePath: instancePath + "/roles/" + key2.replace(/~/g, "~0").replace(/\//g, "~1"), parentData: data7, parentDataProperty: key2, rootData, dynamicAnchors })) {
            vErrors = vErrors === null ? validate60.errors : vErrors.concat(validate60.errors);
            errors = vErrors.length;
          }
          const _errs23 = errors;
          const _errs24 = errors;
          if (data8 && typeof data8 == "object" && !Array.isArray(data8)) {
            let missing0;
            if (data8.config_paths === void 0 && (missing0 = "config_paths")) {
              const err22 = {};
              if (vErrors === null) {
                vErrors = [err22];
              } else {
                vErrors.push(err22);
              }
              errors++;
            }
          }
          var valid8 = _errs24 === errors;
          if (valid8) {
            const err23 = { instancePath: instancePath + "/roles/" + key2.replace(/~/g, "~0").replace(/\//g, "~1"), schemaPath: "#/properties/roles/additionalProperties/allOf/1/not", keyword: "not", params: {}, message: "must NOT be valid" };
            if (vErrors === null) {
              vErrors = [err23];
            } else {
              vErrors.push(err23);
            }
            errors++;
          } else {
            errors = _errs23;
            if (vErrors !== null) {
              if (_errs23) {
                vErrors.length = _errs23;
              } else {
                vErrors = null;
              }
            }
          }
        }
      } else {
        const err24 = { instancePath: instancePath + "/roles", schemaPath: "#/properties/roles/type", keyword: "type", params: { type: "object" }, message: "must be object" };
        if (vErrors === null) {
          vErrors = [err24];
        } else {
          vErrors.push(err24);
        }
        errors++;
      }
    }
    if (data.jobs !== void 0) {
      let data9 = data.jobs;
      if (data9 && typeof data9 == "object" && !Array.isArray(data9)) {
        for (const key3 in data9) {
          const _errs27 = errors;
          if (typeof key3 === "string") {
            if (!pattern42.test(key3)) {
              const err25 = { instancePath: instancePath + "/jobs", schemaPath: "#/properties/jobs/propertyNames/pattern", keyword: "pattern", params: { pattern: "^[a-z][a-z0-9-]*$" }, message: 'must match pattern "^[a-z][a-z0-9-]*$"', propertyName: key3 };
              if (vErrors === null) {
                vErrors = [err25];
              } else {
                vErrors.push(err25);
              }
              errors++;
            }
          }
          var valid9 = _errs27 === errors;
          if (!valid9) {
            const err26 = { instancePath: instancePath + "/jobs", schemaPath: "#/properties/jobs/propertyNames", keyword: "propertyNames", params: { propertyName: key3 }, message: "property name must be valid" };
            if (vErrors === null) {
              vErrors = [err26];
            } else {
              vErrors.push(err26);
            }
            errors++;
          }
        }
        for (const key4 in data9) {
          if (!validate60(data9[key4], { instancePath: instancePath + "/jobs/" + key4.replace(/~/g, "~0").replace(/\//g, "~1"), parentData: data9, parentDataProperty: key4, rootData, dynamicAnchors })) {
            vErrors = vErrors === null ? validate60.errors : vErrors.concat(validate60.errors);
            errors = vErrors.length;
          }
        }
      } else {
        const err27 = { instancePath: instancePath + "/jobs", schemaPath: "#/properties/jobs/type", keyword: "type", params: { type: "object" }, message: "must be object" };
        if (vErrors === null) {
          vErrors = [err27];
        } else {
          vErrors.push(err27);
        }
        errors++;
      }
    }
  } else {
    const err28 = { instancePath, schemaPath: "#/type", keyword: "type", params: { type: "object" }, message: "must be object" };
    if (vErrors === null) {
      vErrors = [err28];
    } else {
      vErrors.push(err28);
    }
    errors++;
  }
  validate59.errors = vErrors;
  return errors === 0;
}
validate59.evaluated = { "props": true, "dynamicProps": false, "dynamicItems": false };
exports.PushConfig = validate65;
var schema114 = { "$schema": "https://json-schema.org/draft/2020-12/schema", "title": "PushConfig", "description": "\uC6F9 \uD478\uC2DC \uAD6C\uB3C5\uC5D0 \uD544\uC694\uD55C \uC11C\uBC84 \uACF5\uAC1C\uD0A4(\uC9C1\uC6D0 \uCF58\uC194). \uBE44\uBC00 \uD0A4\uB294 \uB2F4\uC9C0 \uC54A\uB294\uB2E4.", "x-producers": ["survey-service"], "x-consumers": ["kiosk-frontend", "admin-console"], "type": "object", "additionalProperties": false, "required": ["vapid_public_key"], "properties": { "vapid_public_key": { "type": ["string", "null"], "description": "null\uC774\uBA74 \uD478\uC2DC\uAC00 \uAEBC\uC838 \uC788\uACE0 SSE\uB9CC \uB3D9\uC791\uD55C\uB2E4" } } };
function validate65(data, { instancePath = "", parentData, parentDataProperty, rootData = data, dynamicAnchors = {} } = {}) {
  let vErrors = null;
  let errors = 0;
  const evaluated0 = validate65.evaluated;
  if (evaluated0.dynamicProps) {
    evaluated0.props = void 0;
  }
  if (evaluated0.dynamicItems) {
    evaluated0.items = void 0;
  }
  if (data && typeof data == "object" && !Array.isArray(data)) {
    if (data.vapid_public_key === void 0) {
      const err0 = { instancePath, schemaPath: "#/required", keyword: "required", params: { missingProperty: "vapid_public_key" }, message: "must have required property 'vapid_public_key'" };
      if (vErrors === null) {
        vErrors = [err0];
      } else {
        vErrors.push(err0);
      }
      errors++;
    }
    for (const key0 in data) {
      if (!(key0 === "vapid_public_key")) {
        const err1 = { instancePath, schemaPath: "#/additionalProperties", keyword: "additionalProperties", params: { additionalProperty: key0 }, message: "must NOT have additional properties" };
        if (vErrors === null) {
          vErrors = [err1];
        } else {
          vErrors.push(err1);
        }
        errors++;
      }
    }
    if (data.vapid_public_key !== void 0) {
      let data0 = data.vapid_public_key;
      if (typeof data0 !== "string" && data0 !== null) {
        const err2 = { instancePath: instancePath + "/vapid_public_key", schemaPath: "#/properties/vapid_public_key/type", keyword: "type", params: { type: schema114.properties.vapid_public_key.type }, message: "must be string,null" };
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
  validate65.errors = vErrors;
  return errors === 0;
}
validate65.evaluated = { "props": true, "dynamicProps": false, "dynamicItems": false };
exports.StaffPushPayload = validate66;
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
    if (data.session_id === void 0) {
      const err0 = { instancePath, schemaPath: "#/required", keyword: "required", params: { missingProperty: "session_id" }, message: "must have required property 'session_id'" };
      if (vErrors === null) {
        vErrors = [err0];
      } else {
        vErrors.push(err0);
      }
      errors++;
    }
    for (const key0 in data) {
      if (!(key0 === "session_id" || key0 === "kind" || key0 === "alert_id")) {
        const err1 = { instancePath, schemaPath: "#/additionalProperties", keyword: "additionalProperties", params: { additionalProperty: key0 }, message: "must NOT have additional properties" };
        if (vErrors === null) {
          vErrors = [err1];
        } else {
          vErrors.push(err1);
        }
        errors++;
      }
    }
    if (data.session_id !== void 0) {
      let data0 = data.session_id;
      if (typeof data0 === "string") {
        if (func1(data0) < 1) {
          const err2 = { instancePath: instancePath + "/session_id", schemaPath: "#/properties/session_id/minLength", keyword: "minLength", params: { limit: 1 }, message: "must NOT have fewer than 1 characters" };
          if (vErrors === null) {
            vErrors = [err2];
          } else {
            vErrors.push(err2);
          }
          errors++;
        }
      } else {
        const err3 = { instancePath: instancePath + "/session_id", schemaPath: "#/properties/session_id/type", keyword: "type", params: { type: "string" }, message: "must be string" };
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
      if (typeof data1 === "string") {
        if (func1(data1) < 1) {
          const err4 = { instancePath: instancePath + "/kind", schemaPath: "#/properties/kind/minLength", keyword: "minLength", params: { limit: 1 }, message: "must NOT have fewer than 1 characters" };
          if (vErrors === null) {
            vErrors = [err4];
          } else {
            vErrors.push(err4);
          }
          errors++;
        }
      } else {
        const err5 = { instancePath: instancePath + "/kind", schemaPath: "#/properties/kind/type", keyword: "type", params: { type: "string" }, message: "must be string" };
        if (vErrors === null) {
          vErrors = [err5];
        } else {
          vErrors.push(err5);
        }
        errors++;
      }
    }
    if (data.alert_id !== void 0) {
      let data2 = data.alert_id;
      if (typeof data2 === "string") {
        if (func1(data2) < 1) {
          const err6 = { instancePath: instancePath + "/alert_id", schemaPath: "#/properties/alert_id/minLength", keyword: "minLength", params: { limit: 1 }, message: "must NOT have fewer than 1 characters" };
          if (vErrors === null) {
            vErrors = [err6];
          } else {
            vErrors.push(err6);
          }
          errors++;
        }
      } else {
        const err7 = { instancePath: instancePath + "/alert_id", schemaPath: "#/properties/alert_id/type", keyword: "type", params: { type: "string" }, message: "must be string" };
        if (vErrors === null) {
          vErrors = [err7];
        } else {
          vErrors.push(err7);
        }
        errors++;
      }
    }
  } else {
    const err8 = { instancePath, schemaPath: "#/type", keyword: "type", params: { type: "object" }, message: "must be object" };
    if (vErrors === null) {
      vErrors = [err8];
    } else {
      vErrors.push(err8);
    }
    errors++;
  }
  validate66.errors = vErrors;
  return errors === 0;
}
validate66.evaluated = { "props": true, "dynamicProps": false, "dynamicItems": false };
exports.PushSubscriptionRequest = validate67;
var schema116 = { "$schema": "https://json-schema.org/draft/2020-12/schema", "$id": "PushSubscriptionRequest.schema.json", "title": "PushSubscriptionRequest", "description": "3.4.4(\uAC80\uD1A0 B-28-5\xB7B-24): POST /v1/staff/push-subscriptions \uBCF8\uBB38. \uBE0C\uB77C\uC6B0\uC800 PushSubscription.toJSON() \uC758 endpoint\xB7keys \uC640 \uC120\uD0DD topics. endpoint \uB294 https \uC774\uACE0 \uD3EC\uD2B8\uAC00 \uC5C6\uAC70\uB098 443 \uC774\uBA70 \uD638\uC2A4\uD2B8\uAC00 \uACF5\uC778 \uC8FC\uC18C\uB85C \uD574\uC11D\uB420 \uB54C\uB9CC \uBC1B\uB294\uB2E4(loopback\xB7\uC0AC\uC124\xB7\uB9C1\uD06C\uB85C\uCEEC\xB7\uD2B9\uC218 \uC8FC\uC18C\uB294 400 INVALID_RECORD \u2014 SSRF \uBC29\uC9C0, OWASP A10:2021). \uD638\uC2A4\uD2B8\uB294 \uC810\uC774 \uC788\uB294 \uC774\uB984\uC774\uC5B4\uC57C \uD558\uACE0 IP \uB9AC\uD130\uB7F4\xB7localhost \uB294 \uC2A4\uD0A4\uB9C8\uC5D0\uC11C \uAC70\uBD80\uD55C\uB2E4(\uAC80\uD1A0 P6-R6-15). \uC774\uB984\uC774 RFC 6890 \uD2B9\uC218 \uBAA9\uC801 \uC8FC\uC18C\uB85C \uD574\uC11D\uB418\uB294\uC9C0\uB294 \uC2A4\uD0A4\uB9C8\uB85C \uBABB \uC4F0\uBBC0\uB85C \uC11C\uBC84\uAC00 \uB4F1\uB85D \uB54C\uC640 \uBC1C\uC1A1 \uB54C \uD55C\uB2E4(RUNTIME R3.18).", "x-producers": ["kiosk-frontend", "admin-console"], "x-consumers": ["survey-service"], "type": "object", "required": ["endpoint", "keys"], "additionalProperties": false, "properties": { "endpoint": { "type": "string", "maxLength": 2048, "pattern": "^https://(?=[^/:]*[A-Za-z])[A-Za-z0-9-]+(\\.[A-Za-z0-9-]+)+(:443)?/" }, "keys": { "type": "object", "required": ["p256dh", "auth"], "additionalProperties": false, "properties": { "p256dh": { "type": "string", "pattern": "^[A-Za-z0-9_-]+=*$", "maxLength": 200 }, "auth": { "type": "string", "pattern": "^[A-Za-z0-9_-]+=*$", "maxLength": 64 } } }, "topics": { "type": "array", "minItems": 1, "uniqueItems": true, "items": { "enum": ["alerts", "results"] } } } };
var pattern77 = new RegExp("^https://(?=[^/:]*[A-Za-z])[A-Za-z0-9-]+(\\.[A-Za-z0-9-]+)+(:443)?/", "u");
var pattern78 = new RegExp("^[A-Za-z0-9_-]+=*$", "u");
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
    if (data.keys === void 0) {
      const err1 = { instancePath, schemaPath: "#/required", keyword: "required", params: { missingProperty: "keys" }, message: "must have required property 'keys'" };
      if (vErrors === null) {
        vErrors = [err1];
      } else {
        vErrors.push(err1);
      }
      errors++;
    }
    for (const key0 in data) {
      if (!(key0 === "endpoint" || key0 === "keys" || key0 === "topics")) {
        const err2 = { instancePath, schemaPath: "#/additionalProperties", keyword: "additionalProperties", params: { additionalProperty: key0 }, message: "must NOT have additional properties" };
        if (vErrors === null) {
          vErrors = [err2];
        } else {
          vErrors.push(err2);
        }
        errors++;
      }
    }
    if (data.endpoint !== void 0) {
      let data0 = data.endpoint;
      if (typeof data0 === "string") {
        if (func1(data0) > 2048) {
          const err3 = { instancePath: instancePath + "/endpoint", schemaPath: "#/properties/endpoint/maxLength", keyword: "maxLength", params: { limit: 2048 }, message: "must NOT have more than 2048 characters" };
          if (vErrors === null) {
            vErrors = [err3];
          } else {
            vErrors.push(err3);
          }
          errors++;
        }
        if (!pattern77.test(data0)) {
          const err4 = { instancePath: instancePath + "/endpoint", schemaPath: "#/properties/endpoint/pattern", keyword: "pattern", params: { pattern: "^https://(?=[^/:]*[A-Za-z])[A-Za-z0-9-]+(\\.[A-Za-z0-9-]+)+(:443)?/" }, message: 'must match pattern "^https://(?=[^/:]*[A-Za-z])[A-Za-z0-9-]+(\\.[A-Za-z0-9-]+)+(:443)?/"' };
          if (vErrors === null) {
            vErrors = [err4];
          } else {
            vErrors.push(err4);
          }
          errors++;
        }
      } else {
        const err5 = { instancePath: instancePath + "/endpoint", schemaPath: "#/properties/endpoint/type", keyword: "type", params: { type: "string" }, message: "must be string" };
        if (vErrors === null) {
          vErrors = [err5];
        } else {
          vErrors.push(err5);
        }
        errors++;
      }
    }
    if (data.keys !== void 0) {
      let data1 = data.keys;
      if (data1 && typeof data1 == "object" && !Array.isArray(data1)) {
        if (data1.p256dh === void 0) {
          const err6 = { instancePath: instancePath + "/keys", schemaPath: "#/properties/keys/required", keyword: "required", params: { missingProperty: "p256dh" }, message: "must have required property 'p256dh'" };
          if (vErrors === null) {
            vErrors = [err6];
          } else {
            vErrors.push(err6);
          }
          errors++;
        }
        if (data1.auth === void 0) {
          const err7 = { instancePath: instancePath + "/keys", schemaPath: "#/properties/keys/required", keyword: "required", params: { missingProperty: "auth" }, message: "must have required property 'auth'" };
          if (vErrors === null) {
            vErrors = [err7];
          } else {
            vErrors.push(err7);
          }
          errors++;
        }
        for (const key1 in data1) {
          if (!(key1 === "p256dh" || key1 === "auth")) {
            const err8 = { instancePath: instancePath + "/keys", schemaPath: "#/properties/keys/additionalProperties", keyword: "additionalProperties", params: { additionalProperty: key1 }, message: "must NOT have additional properties" };
            if (vErrors === null) {
              vErrors = [err8];
            } else {
              vErrors.push(err8);
            }
            errors++;
          }
        }
        if (data1.p256dh !== void 0) {
          let data2 = data1.p256dh;
          if (typeof data2 === "string") {
            if (func1(data2) > 200) {
              const err9 = { instancePath: instancePath + "/keys/p256dh", schemaPath: "#/properties/keys/properties/p256dh/maxLength", keyword: "maxLength", params: { limit: 200 }, message: "must NOT have more than 200 characters" };
              if (vErrors === null) {
                vErrors = [err9];
              } else {
                vErrors.push(err9);
              }
              errors++;
            }
            if (!pattern78.test(data2)) {
              const err10 = { instancePath: instancePath + "/keys/p256dh", schemaPath: "#/properties/keys/properties/p256dh/pattern", keyword: "pattern", params: { pattern: "^[A-Za-z0-9_-]+=*$" }, message: 'must match pattern "^[A-Za-z0-9_-]+=*$"' };
              if (vErrors === null) {
                vErrors = [err10];
              } else {
                vErrors.push(err10);
              }
              errors++;
            }
          } else {
            const err11 = { instancePath: instancePath + "/keys/p256dh", schemaPath: "#/properties/keys/properties/p256dh/type", keyword: "type", params: { type: "string" }, message: "must be string" };
            if (vErrors === null) {
              vErrors = [err11];
            } else {
              vErrors.push(err11);
            }
            errors++;
          }
        }
        if (data1.auth !== void 0) {
          let data3 = data1.auth;
          if (typeof data3 === "string") {
            if (func1(data3) > 64) {
              const err12 = { instancePath: instancePath + "/keys/auth", schemaPath: "#/properties/keys/properties/auth/maxLength", keyword: "maxLength", params: { limit: 64 }, message: "must NOT have more than 64 characters" };
              if (vErrors === null) {
                vErrors = [err12];
              } else {
                vErrors.push(err12);
              }
              errors++;
            }
            if (!pattern78.test(data3)) {
              const err13 = { instancePath: instancePath + "/keys/auth", schemaPath: "#/properties/keys/properties/auth/pattern", keyword: "pattern", params: { pattern: "^[A-Za-z0-9_-]+=*$" }, message: 'must match pattern "^[A-Za-z0-9_-]+=*$"' };
              if (vErrors === null) {
                vErrors = [err13];
              } else {
                vErrors.push(err13);
              }
              errors++;
            }
          } else {
            const err14 = { instancePath: instancePath + "/keys/auth", schemaPath: "#/properties/keys/properties/auth/type", keyword: "type", params: { type: "string" }, message: "must be string" };
            if (vErrors === null) {
              vErrors = [err14];
            } else {
              vErrors.push(err14);
            }
            errors++;
          }
        }
      } else {
        const err15 = { instancePath: instancePath + "/keys", schemaPath: "#/properties/keys/type", keyword: "type", params: { type: "object" }, message: "must be object" };
        if (vErrors === null) {
          vErrors = [err15];
        } else {
          vErrors.push(err15);
        }
        errors++;
      }
    }
    if (data.topics !== void 0) {
      let data4 = data.topics;
      if (Array.isArray(data4)) {
        if (data4.length < 1) {
          const err16 = { instancePath: instancePath + "/topics", schemaPath: "#/properties/topics/minItems", keyword: "minItems", params: { limit: 1 }, message: "must NOT have fewer than 1 items" };
          if (vErrors === null) {
            vErrors = [err16];
          } else {
            vErrors.push(err16);
          }
          errors++;
        }
        const len0 = data4.length;
        for (let i0 = 0; i0 < len0; i0++) {
          let data5 = data4[i0];
          if (!(data5 === "alerts" || data5 === "results")) {
            const err17 = { instancePath: instancePath + "/topics/" + i0, schemaPath: "#/properties/topics/items/enum", keyword: "enum", params: { allowedValues: schema116.properties.topics.items.enum }, message: "must be equal to one of the allowed values" };
            if (vErrors === null) {
              vErrors = [err17];
            } else {
              vErrors.push(err17);
            }
            errors++;
          }
        }
        let i1 = data4.length;
        let j0;
        if (i1 > 1) {
          outer0: for (; i1--; ) {
            for (j0 = i1; j0--; ) {
              if (func0(data4[i1], data4[j0])) {
                const err18 = { instancePath: instancePath + "/topics", schemaPath: "#/properties/topics/uniqueItems", keyword: "uniqueItems", params: { i: i1, j: j0 }, message: "must NOT have duplicate items (items ## " + j0 + " and " + i1 + " are identical)" };
                if (vErrors === null) {
                  vErrors = [err18];
                } else {
                  vErrors.push(err18);
                }
                errors++;
                break outer0;
              }
            }
          }
        }
      } else {
        const err19 = { instancePath: instancePath + "/topics", schemaPath: "#/properties/topics/type", keyword: "type", params: { type: "array" }, message: "must be array" };
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
  validate67.errors = vErrors;
  return errors === 0;
}
validate67.evaluated = { "props": true, "dynamicProps": false, "dynamicItems": false };
exports.HealthStatus = validate68;
var schema117 = { "$schema": "https://json-schema.org/draft/2020-12/schema", "$id": "HealthStatus.schema.json", "title": "HealthStatus", "description": "3.4.4(RUNTIME R5.1, OPEN_GAPS U101 \uB2EB\uC74C): \uBAA8\uB4E0 \uC601\uC5ED \uC11C\uBE44\uC2A4\uC758 GET /healthz\xB7GET /readyz \uBCF8\uBB38\uC774 \uC9C0\uD0A4\uB294 \uACF5\uD1B5 \uCD5C\uC18C \uBAA8\uC591. \uD310\uC815\uC740 \uC0C1\uD0DC \uCF54\uB4DC\uB2E4(healthz 200 = \uC0B4\uC544 \uC788\uC74C, readyz 200 = \uC694\uCCAD\uC744 \uBC1B\uC744 \uC218 \uC788\uC74C, 503 = \uC544\uB2D8). \uBCF8\uBB38\uC740 \uBE44\uC5B4 \uC788\uC9C0 \uC54A\uC740 JSON \uAC1D\uCCB4\uC774\uACE0, status \uAC00 \uC788\uC73C\uBA74 \uC544\uB798 \uAC12 \uC911 \uD558\uB098\uB2E4. \uC601\uC5ED\uBCC4 \uC900\uBE44 \uD655\uC778 \uC2A4\uD0A4\uB9C8(SurveyReadyz\xB7GateReadyz\xB7OpsFeedbackReadyz\xB7QuestionAuthoringDeployInterface.ReadyzResponse)\uAC00 \uC788\uC73C\uBA74 \uADF8\uAC83\uB3C4 \uD568\uAED8 \uC9C0\uD0A8\uB2E4. 'not ready'(release-gate)\xB7'not-ready'(ops-feedback\xB7question-authoring)\uB294 2026-11-04 \uC774\uC804 \uD45C\uAE30\uB85C not_ready \uC640 \uAC19\uC740 \uB73B\uC774\uBA70, \uC0DD\uC0B0\uC790\uB294 not_ready \uB85C \uC62E\uAE30\uACE0 \uC77D\uB294 \uCABD\uC740 \uC14B\uC744 \uAC19\uAC8C \uB2E4\uB8EC\uB2E4(CONVENTIONS 1\uC808 3, \uD558\uC704 \uD638\uD658).", "x-producers": ["*"], "x-consumers": ["platform", "deploy"], "type": "object", "minProperties": 1, "properties": { "status": { "enum": ["ok", "ready", "not_ready", "shutting_down", "not ready", "not-ready"] } }, "additionalProperties": true };
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
    if (Object.keys(data).length < 1) {
      const err0 = { instancePath, schemaPath: "#/minProperties", keyword: "minProperties", params: { limit: 1 }, message: "must NOT have fewer than 1 properties" };
      if (vErrors === null) {
        vErrors = [err0];
      } else {
        vErrors.push(err0);
      }
      errors++;
    }
    if (data.status !== void 0) {
      let data0 = data.status;
      if (!(data0 === "ok" || data0 === "ready" || data0 === "not_ready" || data0 === "shutting_down" || data0 === "not ready" || data0 === "not-ready")) {
        const err1 = { instancePath: instancePath + "/status", schemaPath: "#/properties/status/enum", keyword: "enum", params: { allowedValues: schema117.properties.status.enum }, message: "must be equal to one of the allowed values" };
        if (vErrors === null) {
          vErrors = [err1];
        } else {
          vErrors.push(err1);
        }
        errors++;
      }
    }
  } else {
    const err2 = { instancePath, schemaPath: "#/type", keyword: "type", params: { type: "object" }, message: "must be object" };
    if (vErrors === null) {
      vErrors = [err2];
    } else {
      vErrors.push(err2);
    }
    errors++;
  }
  validate68.errors = vErrors;
  return errors === 0;
}
validate68.evaluated = { "props": true, "dynamicProps": false, "dynamicItems": false };

exports.PIPELINE_SCHEMA_VERSION = "3.6";
exports.CONTRACT_VERSION = "v3.6.3";
exports.ACTION_RULES_VERSION = "2";
