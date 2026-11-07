/* 생성물: scripts/gen-types.mjs (직접 고치지 않는다). 원본: schemas/ 또는 고정 태그의 계약 스키마 */
/**
 * 의사 식별자(session_id·turn_id, 어디에 나오든)
 */
export type Pseudonym = string;
/**
 * 자유 문자열·키 마스킹·keep 패턴 불일치의 결과. 소비자는 내용으로 쓰지 않는다
 */
export type Masked = "[MASKED]";
/**
 * 정의 마스킹 결과(mask_defs [MASKED], drop_defs [DROPPED]). 소비자는 내용으로 쓰지 않는다
 */
export type Redacted = "[MASKED]" | "[DROPPED]";
export type G62Aae1C72E = Masked | Gd2E8A5317D;
export type G0Bd6Dfa382 =
  | Masked
  | {
      kind: "SESSION_END";
      session_id: Pseudonym;
    };
export type G38D93D77E0 = G1E0B78E56A | (Masked | null);
export type G1E0B78E56A = Redacted | Masked | G8E26Eae813;
export type G12C1531578 = G38B3F9Ca5D | (Masked | null);
export type G38B3F9Ca5D =
  Redacted | "IN_PROGRESS" | "PAUSED_RISK" | "ENDED_COMPLETE" | "ENDED_STAFF" | "ENDED_LEFT" | "ENDED_USER_STOP";
export type Gee9A6Ddd3D = Ge481198325 | (Masked | null);
export type Ge481198325 = Redacted | Masked | Gcb5F86776E;
export type Gfd020B303F = Masked | G9517A76F27;
export type Gc5Fa10D5Fc = Masked | G659F8Aae1A;
export type G9517A76F27 = Gc5Fa10D5Fc[];
export type Ge5Fd088922 = (Redacted | Masked | {} | CountMap) | (Masked | null);
export type Gd4A7C4D439 = G7A6990082D | (Masked | null);
export type G7A6990082D = Masked | Ge59Aa37E42;
export type G9F33F6824A = Redacted | Masked | Gd56654B44F;
export type Ge59Aa37E42 = G9F33F6824A[];
export type G057B49605B = G7F61B204Ad | (Masked | null);
export type G7F61B204Ad = Redacted | Masked | Gaee21A067D;
export type G4A26C5Cc71 = Redacted | Masked | G3046316D04;
export type G105C34C5C5 = Masked | G9C3B1524Fb;
export type G42626F6855 = Redacted | G1E0026Fe0D | G4976F8226D | Ga55Bc65A26;
export type G1E0026Fe0D = Masked | Gde997B49E0;
export type G4976F8226D = Masked | Gcd9E1320C5;
export type G3F5034E657 = Masked | Gf7320Ec119;
export type Gc0Ccee6Ed9 = Masked | Ga93A8C0B5C;
export type G0076Cb94A4 = Redacted | Masked | G91Cd456Cd7;
export type Gf9C6006Ed5 = Redacted | Masked | (Masked | boolean) | (Masked | number | null) | G83Efcaefa7 | G90Decb4754;
export type G83Efcaefa7 = Masked | G99Bb38C6Cc;
export type G90Decb4754 = Redacted | Masked | G4C895E5F43;
export type Gf7320Ec119 = Gc0Ccee6Ed9[];
export type Ga55Bc65A26 = Masked | G35D235Fe24;
export type G9C3B1524Fb = G42626F6855[];
export type Ga58119E95C = Gafba920F11 | (Masked | null);
export type Gafba920F11 = Redacted | Masked | G8E594E4Bec;
export type G6Ea546Abfb = G26764Dc4Cc | (Masked | null);
export type G26764Dc4Cc = Redacted | Masked | Gd6797E0Db5;
export type Gc84Fdb15Af = Redacted | Masked | G00B20D9231;
export type Gf8D5D71F71 = Masked | G2A3Bd00717;
export type Gaa509Fc3E8 = Redacted | Masked | G223Bf71Be7;
export type G62Dca972D9 = Redacted | Gd86Beb9163 | "NONE";
export type Gd86Beb9163 = Masked | G28990F4B01;
export type G1Aa7267940 = Masked | G15C83086Fb;
export type G3Be9D469E2 = Redacted | Gf9C6006Ed5 | Gd337551D55;
export type Gd337551D55 = Masked | Gdb40772E63;
export type G15C83086Fb = G3Be9D469E2[];
export type G2A3Bd00717 = Gaa509Fc3E8[];
export type Gc7Bf4Cc2A0 = Masked | G0B91953B9C;
export type Gdbc74795F7 = Redacted | Masked | Gae62Dcbd6B;
export type G0B91953B9C = Gdbc74795F7[];
export type G92076F07A9 = Masked | G185519F2A3;
export type Gf015C10290 = Redacted | Masked | G6C498343E8;
export type G1F2516D3Ea = Masked | Gc47E0C5F74;
export type Gf7B12C9B39 = Redacted | G1E0026Fe0D | Gd8E6Ae0910;
export type Gd8E6Ae0910 = Masked | G1191Cbaeba;
export type Gc575Fa423E = Masked | Ga418C01F6A;
export type Ga418C01F6A = G0076Cb94A4[];
export type Gc47E0C5F74 = Gf7B12C9B39[];
export type G185519F2A3 = Gf015C10290[];
export type G25C3B4F0B6 =
  | Redacted
  | Masked
  | {
      succeeded: Masked | boolean;
    };
export type Ge4D9C5Bcc8 = Geb27F2Bd40 | (Masked | null);
export type Geb27F2Bd40 = Redacted | Masked | Ge3C13Ad996;
export type Ge147C3857A = G957C9Cee80 | "IGNORED";
export type G957C9Cee80 = Masked | G11E9D92F4B;
export type Ga3286334Ce = Masked | G207890B4A0;
export type Gb5Ee8C3B1B = G4A26C5Cc71 | (Masked | null);
export type G6641Fc67C3 = "COMMITTED" | "NOT_APPLICABLE" | G2Ce3Ba64A5;
export type G2Ce3Ba64A5 = Masked | Gef6D5D50E3;
export type G6E99F32E03 = Masked | Ga2B33Ddd9C;
export type Ga8D2Bff048 = Redacted | Masked | G9Fdc02063B;
export type Ga2B33Ddd9C = Ga8D2Bff048[];
export type G3Ccf1C062C = G413Abdadb0 | (Masked | null);
export type G413Abdadb0 = Redacted | Masked | Gf2Bfebbd34;
export type G7309A53593 = Masked | G2583D72Fa1;
export type G7Ea825Ad7C = Redacted | Masked | Gb4F48772D9;
export type G2583D72Fa1 = G7Ea825Ad7C[];
export type G585F2Fc2Ec = Masked | Gbaace47310;
export type Gbaace47310 = G25C3B4F0B6[];
export type Gf3392Ba18C = Redacted | Masked | G4Af9985614;
export type G43F7A9Dd88 = Masked | G3649306A2E;
export type Gcddd87000C =
  | Redacted
  | Masked
  | {
      key: Masked;
      status: "MISSING" | "UNCLEAR";
    };
export type G3649306A2E = Gcddd87000C[];
export type G41677F8B29 = (Redacted | (Masked | number | null) | Masked) | (Masked | null);

/**
 * I7 `GET /v1/review-traces/{ref}`(reviewer 역할 전용)가 돌려주는 검토용 trace(3.2.0, L12, 사용자 결정 2026-11-03). OpsFeedbackDeidentifiedTrace 와 같고, 정책 review_utterance.keep 이 참일 때 환자 발화 두 경로(frontend_message.utterance, extract_input.user_utterance)만 원문 문자열(1~1000자, 문진 스키마 UtteranceBody 상한)을 더 허용한다. 왜: 발화 없이는 검토자가 실패 원인을 볼 수 없다. 조건: reviewer 역할만 읽고, 읽을 때마다 접근 기록을 남기며(보존 365일, 감사 기록), 확정 사례와 같은 보존(180일), 외부 전송 없음. 3.7.0부터 생성물이다(tools/gen_deid_view.py). 두 경로 밖(예: log_entry.input.utterance)의 원문은 허용하지 않는다 — 3.6.x 는 안쪽이 열려 있어 허용했다.
 */
export interface OpsFeedbackReviewTrace {
  session_id: Pseudonym;
  turn_id: Pseudonym;
  contract_version: Masked | number | null;
  frontend_message:
    | (
        | Redacted
        | G62Aae1C72E
        | (
            | Masked
            | {
                session_id: Pseudonym;
                kind: "UTTERANCE";
                utterance: Masked | string;
              }
          )
        | G0Bd6Dfa382
      )
    | (Masked | null);
  intervention_decision: G38D93D77E0;
  orchestrator_input:
    | (
        | Redacted
        | Masked
        | {
            frontend_input:
              | (
                  | Redacted
                  | G62Aae1C72E
                  | (
                      | Masked
                      | {
                          session_id: Pseudonym;
                          kind: "UTTERANCE";
                          utterance: Masked;
                        }
                    )
                  | G0Bd6Dfa382
                )
              | (Masked | null);
            intervention_decision: G38D93D77E0;
            session_found: Masked | boolean;
            session_question_bank_version: (Masked | number | null) | (Masked | null);
            session_status: G12C1531578;
            latest_question_bank_version: Masked | number | null;
          }
      )
    | (Masked | null);
  extract_input:
    | (
        | Redacted
        | Masked
        | {
            question_id: Masked | (string | Masked);
            current_question: Masked;
            user_utterance: Masked | string;
            state: Masked | {};
          }
      )
    | (Masked | null);
  extract_output: Gee9A6Ddd3D;
  extract_attempts: (Masked | number | null) | (Masked | null);
  extract_status: ("OK" | "OUTPUT_INVALID" | "VIOLATION" | "ERROR") | (Masked | null);
  extract_protections: Ge5Fd088922;
  validation_ok: (Masked | boolean) | (Masked | null);
  validation_violations: Gd4A7C4D439;
  response_input:
    | (
        | Redacted
        | Masked
        | {
            action: Masked | (string | Masked);
            topic: Masked;
            next: Masked | {};
          }
      )
    | (Masked | null);
  response_output: Masked | (Masked | null);
  response_outcome: ("ok" | "fallback" | "fixed") | (Masked | null);
  response_protections: Ge5Fd088922;
  frontend_input:
    | (
        | Redacted
        | Masked
        | {
            response_text: Masked | (Masked | null);
            turn_failure_signal: G057B49605B;
            session_id?: Pseudonym;
          }
      )
    | (Masked | null);
  staff_console_input:
    | (
        | Redacted
        | Masked
        | {
            staff_alert:
              | (
                  | Masked
                  | {
                      session_id: Pseudonym;
                      staff_alert: G4A26C5Cc71;
                    }
                )
              | (Masked | null);
            turn_failure_signal: Ga58119E95C;
            intervention_result: G6Ea546Abfb;
          }
      )
    | (Masked | null);
  dispatch_input:
    | (
        | Redacted
        | Masked
        | {
            session_info: Gc84Fdb15Af;
            answer_records: Gf8D5D71F71;
            skipped: Gc7Bf4Cc2A0;
            session_status: G38B3F9Ca5D;
            pause_history: G92076F07A9;
          }
      )
    | (Masked | null);
  dispatch_output:
    | (
        | Redacted
        | Masked
        | {
            dispatch_record: G25C3B4F0B6;
          }
      )
    | (Masked | null);
  orchestrator_output:
    | (
        | Redacted
        | Masked
        | {
            turn_kind:
              (Redacted | "SESSION_START" | "UTTERANCE" | "RESUME" | "INTERVENTION_END" | "END_LEFT") | (Masked | null);
            session_info_created: Gc84Fdb15Af | (Masked | null);
            log_entry: Ge4D9C5Bcc8;
            turn_failure_signal: G057B49605B;
            intervention_result: G6Ea546Abfb;
            dispatch_called: Masked | boolean;
          }
      )
    | (Masked | null);
  session_before: G3Ccf1C062C;
  session_after: G3Ccf1C062C;
  log_entry: Ge4D9C5Bcc8;
  turn_index?: Masked | number | null;
  persistence_load_request:
    | (
        | Redacted
        | Masked
        | {
            session_id: Pseudonym;
          }
      )
    | (Masked | null);
  persistence_load_result:
    | (
        | Redacted
        | Masked
        | {
            session_id: Pseudonym;
            status: "OK" | "NOT_FOUND" | "DB_ERROR";
            revision: G41677F8B29;
            state: G3Ccf1C062C;
          }
      )
    | (Masked | null);
  persistence_commit_request:
    | (
        | Redacted
        | Masked
        | {
            session_id: Pseudonym;
            expected_revision: Redacted | (Masked | number | null) | Masked;
            writes:
              | Redacted
              | Masked
              | {
                  answer_updates:
                    | Masked
                    | (
                        | Redacted
                        | Masked
                        | {
                            slot: G0076Cb94A4;
                            action: "FIRST_WRITE" | "NEW_REVISION";
                            value: Gf9C6006Ed5;
                            precision: Redacted | ("exact" | "approximate" | "unspecified");
                          }
                      )[];
                  progress_record_update:
                    | (
                        | Redacted
                        | Masked
                        | {
                            current_question_id: Masked | (string | Masked);
                            open_slots: G43F7A9Dd88;
                            skipped_add: Gc7Bf4Cc2A0;
                            skipped_remove: Masked | (Redacted | Masked)[];
                            session_status: G12C1531578;
                            pause_history_add: G92076F07A9;
                          }
                      )
                    | (Masked | null);
                };
          }
      )
    | (Masked | null);
  persistence_commit_result:
    | (
        | Redacted
        | Masked
        | {
            session_id: Pseudonym;
            status: "OK" | "REVISION_CONFLICT" | "DB_ERROR";
            write_outcome: "APPLIED" | "NOT_APPLIED" | "UNKNOWN";
            revision: G41677F8B29;
            detail: Masked | (Masked | null);
          }
      )
    | (Masked | null);
}
export interface Gd2E8A5317D {
  kind: "SESSION_START";
  question_set_id?: Masked;
  session_id?: Pseudonym;
  subject_ref?: Masked;
}
export interface G8E26Eae813 {
  decision: Redacted | "RESUME" | "END";
  session_id: Pseudonym;
}
export interface Gcb5F86776E {
  action: Masked | (string | Masked);
  next_item: Masked | (string | Masked);
  note?: Masked;
  reason?: Masked;
  targets?: Masked | Masked[];
  values: Gfd020B303F;
}
export interface G659F8Aae1A {
  key: Masked;
  precision: Masked;
  save: Masked | boolean;
  status: Masked;
  value: Masked | null | boolean | number | [] | {};
}
export interface CountMap {
  [k: string]: number;
}
export interface Gd56654B44F {
  code: Masked | (string | Masked);
  message: Masked;
  path: Masked | (string | Masked);
}
export interface Gaee21A067D {
  pause_reason?: "RISK" | "REASK_LIMIT" | "OTHER";
  session_id: Pseudonym;
  staff_alert: "NONE" | "DELIVERED" | "DELIVERY_FAILED";
  write_committed: "COMMITTED" | "NOT_COMMITTED";
}
export interface G3046316D04 {
  kind: Redacted | "RISK" | "CALL_STAFF" | "USER_CALLED_STAFF";
  reasons: G105C34C5C5;
}
export interface Gde997B49E0 {
  evidence: Masked | (Redacted | Masked)[];
  kind: "RISK_SIGNAL";
}
export interface Gcd9E1320C5 {
  kind: "RISK_RULE";
  target: G3F5034E657;
}
export interface Ga93A8C0B5C {
  question_name: Masked;
  slot: G0076Cb94A4;
  value: Gf9C6006Ed5;
}
export interface G91Cd456Cd7 {
  question_id: Redacted | Masked | (string | Masked);
  repeat_key: Masked | (string | Masked);
  slot_id: Masked | (string | Masked);
}
export interface G99Bb38C6Cc {
  amount: Masked | number | null;
  unit: Masked;
  unit_code?: Masked;
}
export interface G4C895E5F43 {
  code: Masked | (string | Masked);
  label?: Masked;
}
export interface G35D235Fe24 {
  evidence: Masked | (Redacted | Masked)[];
  kind: "USER_CALLED_STAFF";
}
export interface G8E594E4Bec {
  pause_reason?: "RISK" | "REASK_LIMIT" | "OTHER";
  session_id: Pseudonym;
  staff_alert: "NONE" | "DELIVERED" | "DELIVERY_FAILED";
  write_committed: "COMMITTED" | "NOT_COMMITTED";
}
export interface Gd6797E0Db5 {
  result: "APPLIED" | "IGNORED" | "FAILED";
  session_id: Pseudonym;
}
export interface G00B20D9231 {
  question_bank_version: Masked | number | null;
  session_id: Pseudonym;
}
export interface G223Bf71Be7 {
  current_value: G62Dca972D9;
  history: G1Aa7267940;
  precision?: Redacted | ("exact" | "approximate" | "unspecified");
  risk_mark: (Redacted | "IMMEDIATE" | "ON_RESULT") | (Masked | null);
  slot: G0076Cb94A4;
}
export interface G28990F4B01 {
  answer: Gf9C6006Ed5;
}
export interface Gdb40772E63 {
  precision: Redacted | ("exact" | "approximate" | "unspecified");
  value: Gf9C6006Ed5;
}
export interface Gae62Dcbd6B {
  question_id: Redacted | Masked | (string | Masked);
  reason: Redacted | "REQUEST_SKIP" | "REFUSED" | "UNCERTAIN" | "REASK_LIMIT";
}
export interface G6C498343E8 {
  kind: Redacted | "PAUSE" | "RESUME";
  pause_reason?: "RISK" | "REASK_LIMIT" | "OTHER";
  reasons: G1F2516D3Ea;
}
export interface G1191Cbaeba {
  kind: "RISK_RULE";
  target: Gc575Fa423E;
}
export interface Ge3C13Ad996 {
  extract_output: Gee9A6Ddd3D;
  handling: Ge147C3857A;
  input: Ga3286334Ce;
  intervention_result: G6Ea546Abfb;
  question_bank_version: Masked | number | null;
  response_text: Masked | (Masked | null);
  staff_alert: Gb5Ee8C3B1B;
  staff_alert_delivery: "SUCCESS" | "FAILURE" | "NOT_APPLICABLE";
  staff_id?: Masked;
  turn_failure_signal: G057B49605B;
  turn_result: G6641Fc67C3;
  validation_violations: Gd4A7C4D439;
}
export interface G11E9D92F4B {
  handled: Redacted | "SESSION_START" | "UTTERANCE" | "RESUME" | "INTERVENTION_END" | "END_LEFT";
}
export interface G207890B4A0 {
  intervention_decision: (Redacted | "RESUME" | "END") | (Masked | null);
  kind: Redacted | "SESSION_START" | "UTTERANCE" | "INTERVENTION" | "SESSION_END";
  utterance: Masked | (Masked | null);
}
export interface Gef6D5D50E3 {
  failed_steps: G6E99F32E03;
}
export interface G9Fdc02063B {
  phase: "BEFORE_COMMIT" | "AFTER_COMMIT";
  step: "LoRA-A" | "VALIDATE" | "COMMIT" | "DELIVER_STAFF" | "LoRA-B" | "DELIVER_FRONT";
}
export interface Gf2Bfebbd34 {
  answer_records: Gf8D5D71F71;
  dialogue_log: G7309A53593;
  dispatch_log: G585F2Fc2Ec;
  progress_record: Gf3392Ba18C;
  revision?: Redacted | (Masked | number | null) | Masked;
  session_info: Gc84Fdb15Af;
}
export interface Gb4F48772D9 {
  extract_output: Gee9A6Ddd3D;
  handling: Ge147C3857A;
  input: Ga3286334Ce;
  intervention_result: G6Ea546Abfb;
  question_bank_version: Masked | number | null;
  response_text: Masked | (Masked | null);
  staff_alert: Gb5Ee8C3B1B;
  staff_alert_delivery: "SUCCESS" | "FAILURE" | "NOT_APPLICABLE";
  staff_id?: Masked;
  turn_failure_signal: Ga58119E95C;
  turn_result: G6641Fc67C3;
  validation_violations: Gd4A7C4D439;
}
export interface G4Af9985614 {
  current_question_id: Masked | (string | Masked);
  open_slots: G43F7A9Dd88;
  pause_history: G92076F07A9;
  session_status: G38B3F9Ca5D;
  skipped: Gc7Bf4Cc2A0;
}
