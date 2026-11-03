// 컴포넌트 result_sheet: ResultRecord -> SheetView. 문진 결과를 문진표 모양(문항별 칸과 값, 빈칸과 사유, 확인 표시)으로 바꾼다. 판단하지 않는다: 값을 고치거나 채우지 않는다.
import * as v from "../types/validators.cjs";
import type { ResultRecord } from "../types/ResultRecord.ts";
import type { SheetView } from "../types/SheetView.ts";

// 상태 이름은 계약 PUBLIC_API B의 뜻이다. 완료는 ENDED_COMPLETE뿐이고 나머지는 부분 결과다. 모르는 값은 원문 그대로 보인다.
const STATUS: Record<string, string> = {
  ENDED_COMPLETE: "완료(끝까지 마침)", ENDED_LEFT: "미완료: 환자가 끝나기 전에 떠남", ENDED_STAFF: "미완료: 직원이 종료",
  ENDED_USER_STOP: "미완료: 환자 중단(예약된 값)", IN_PROGRESS: "진행 중", PAUSED_RISK: "위험 신호로 멈춤",
};
// 빈칸 사유 코드의 뜻은 문진 스키마 SessionResult.skipped_details 설명. 모르는 코드는 코드 그대로 보인다.
const REASON: Record<string, string> = {
  UNKNOWN: "환자가 모름", REJECTED: "환자가 거절하거나 나중에 하겠다고 함", UNCLEAR: "답이 불분명하거나 범위 밖이라 끝내 정해지지 않음", REASK_LIMIT: "되묻기 한도까지 되물었으나 정해지지 않아 빈칸으로 두고 넘어감",
};

const show = (x: unknown): string => (typeof x === "string" ? x : JSON.stringify(x) ?? "—");

/** 키 `Q7_1[soju].amount`를 문항 `Q7_1`과 칸 `[soju].amount`로 나눈다. `[`가 없으면 키 전체가 문항이고 칸은 빈 글이다(추정: 문항 ID 형식은 이 영역이 알지 못한다). */
function splitKey(key: string): [string, string] {
  const i = key.indexOf("[");
  return i < 0 ? [key, ""] : [key.slice(0, i), key.slice(i)];
}

// 정지 사유(계약 PUBLIC_API H): RISK, REASK_LIMIT, OTHER. 모르는 값은 OTHER로 취급한다. 값이 없으면 정지(PAUSED_RISK) 결과에서만 "미상"을 보이고 그 밖에는 칸을 두지 않는다.
const PAUSE: Record<string, string> = { RISK: "위험 신호로 정지(RISK)", REASK_LIMIT: "되묻기 한도 초과로 정지(REASK_LIMIT)", OTHER: "그 밖의 사유로 정지(OTHER)" };
function pauseText(r: ResultRecord): string | null {
  if (r.pause_reason) return PAUSE[r.pause_reason] ?? PAUSE.OTHER;
  return r.status === "PAUSED_RISK" ? "미상(서버가 사유를 보내지 않았다)" : null;
}

function setText(r: ResultRecord): string {
  const name = r.question_set_title || r.question_set_id;
  if (!name) return "—";
  return r.question_bank_version ? `${name} (버전 ${r.question_bank_version})` : name;
}

export function resultSheet(input: ResultRecord): SheetView {
  v.assertValid(v.ResultRecord, input, "result_sheet");
  const groups: SheetView["groups"] = [];
  for (const a of input.answers) {
    const [item, slot] = splitKey(a.key);
    let g = groups.find((x) => x.item === item);
    if (!g) groups.push((g = { item, rows: [] }));
    g.rows.push({ slot, valueText: show(a.value), statusText: a.status, precision: a.precision ?? "" });
  }
  const blanks = input.skipped_details.map((s) => ({ item: s.item, ...(s.slot ? { slot: s.slot } : {}), reasonCode: s.reason, reasonText: REASON[s.reason] ?? s.reason }));
  const by = input.acknowledged_by ?? null;
  const out: SheetView = {
    sessionId: input.session_id,
    // 왜 제목 우선·ID 대체: 사람이 알아보는 것은 제목이다. 둘 다 없으면(옛 결과) 대시. 버전은 문항 은행 버전(question_bank_version)이다.
    setText: setText(input),
    pauseText: pauseText(input),
    statusText: STATUS[input.status] ?? input.status,
    complete: input.status === "ENDED_COMPLETE",
    groups, blanks,
    ack: by ? { acknowledged: true, text: `확인함: ${by}${input.acknowledged_at ? ` (${input.acknowledged_at})` : ""}` } : { acknowledged: false, text: "확인 전" },
  };
  return v.assertValid(v.SheetView, out, "result_sheet");
}
