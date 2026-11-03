/* 생성물: scripts/gen-types.mjs (직접 고치지 않는다). 원본: schemas/ 또는 고정 태그의 계약 스키마 */
/**
 * HMAC-SHA256(키=salt, 메시지=JCS({key,value}))의 앞 128비트 16진 32자(ADR 0016). 같은 salt·키·값이면 같다. salt는 이 영역만 안다. 소비자는 원 값으로 되돌릴 수 없고 되돌리려 해서도 안 된다. salt를 바꾸면 값이 모두 달라진다(ADR 0017).
 */
export type Pseudonym = string;
/**
 * 검토 사본에서는 원문, 정책이 끄면 마스킹 토큰
 */
export type UtteranceOrRedacted = Redacted | string;
/**
 * 자유 문자열 잎의 비식별 결과. 정책 unlisted_string_action이 mask면 [MASKED], drop이면 키를 지우거나 [DROPPED]. 제안: 소비자는 이 값을 내용으로 쓰지 않는다.
 */
export type Redacted = "[MASKED]" | "[DROPPED]";
/**
 * keep 키의 식별자 모양 값(문항 ID 등). 패턴에 맞지 않으면 마스킹된다.
 */
export type Ident = string;
/**
 * 규칙 코드 -> 건수. 정책이 keep_count_map_keys로 허용하지 않으면 {} 또는 제거
 */
export type CountMap = null | {
  [k: string]: number;
};

/**
 * I7 `GET /v1/review-traces/{ref}`(reviewer 역할 전용)가 돌려주는 검토용 trace(3.2.0, L12, 사용자 결정 2026-11-03). OpsFeedbackDeidentifiedTrace 와 같은 모양이되 환자 발화 두 칸(frontend_message.utterance, extract_input.user_utterance)만 원문 문자열(최대 1000자, 문진 스키마 UtteranceBody 상한)을 허용한다. 왜: 발화 없이는 검토자가 실패 원인을 볼 수 없다. 조건: reviewer 역할만 읽고, 읽을 때마다 접근 기록을 남기며(보존 365일, 감사 기록), 확정 사례와 같은 보존(180일), 외부 전송 없음. 기존 get_trace 는 그대로 마스킹된 뷰를 낸다.
 */
export interface OpsFeedbackReviewTrace {
  session_id: Pseudonym;
  turn_id: Pseudonym;
  contract_version: number;
  turn_index?: number;
  frontend_message: null | {
    session_id: Pseudonym;
    kind: "SESSION_START" | "UTTERANCE" | "SESSION_END";
    utterance?: UtteranceOrRedacted;
  };
  extract_input: null | {
    question_id: Ident;
    current_question: Redacted;
    user_utterance: UtteranceOrRedacted;
    state: {};
  };
  extract_output: null | {
    values?: {
      key?: Redacted;
      value?: Redacted;
      precision?: Redacted;
      status?: Redacted;
      save?: boolean;
    }[];
    action?: string;
    next_item?: null | Ident;
    reason?: Redacted;
    note?: Redacted;
    targets?: unknown[];
  };
  extract_attempts: null | number;
  extract_status: "OK" | "OUTPUT_INVALID" | "VIOLATION" | "ERROR" | null;
  extract_protections: CountMap;
  validation_ok: boolean | null;
  validation_violations: unknown[] | null;
  response_input: null | {
    action: string;
    topic: Redacted;
    next: {};
  };
  response_output: null | Redacted;
  response_outcome: "ok" | "fallback" | "fixed" | null;
  response_protections: CountMap;
  intervention_decision: {} | null;
  orchestrator_input: {} | null;
  frontend_input: null | {
    turn_failure_signal?: null | TurnFailureSignal;
  };
  staff_console_input: {} | null;
  dispatch_input: {} | null;
  dispatch_output: {} | null;
  orchestrator_output: null | OrchestratorOutputView;
  session_before: {} | null;
  session_after: {} | null;
  log_entry: null | LogEntryView;
  persistence_load_request: {} | null;
  persistence_load_result: {} | null;
  persistence_commit_request: {} | null;
  persistence_commit_result: null | {
    session_id?: Pseudonym;
    status?: "OK" | "REVISION_CONFLICT" | "DB_ERROR";
    write_outcome?: "APPLIED" | "NOT_APPLIED" | "UNKNOWN";
  };
}
/**
 * 정지·알림 신호. pause_reason은 계약 2.1.0 이후 optional(없으면 미상, 모르는 값은 읽는 쪽이 OTHER로 취급). 비식별 정책 keep_pause_reason이 꺼져 있으면 없다.
 */
export interface TurnFailureSignal {
  session_id?: Pseudonym;
  write_committed?: "COMMITTED" | "NOT_COMMITTED";
  staff_alert?: "NONE" | "DELIVERED" | "DELIVERY_FAILED";
  pause_reason?: "RISK" | "REASK_LIMIT" | "OTHER";
}
/**
 * orchestrator_output의 일부. 나머지 키는 검사하지 않는다.
 */
export interface OrchestratorOutputView {
  turn_failure_signal?: null | TurnFailureSignal;
  intervention_result?: null | {
    session_id?: Pseudonym;
    result?: "APPLIED" | "IGNORED" | "FAILED";
  };
  log_entry?: null | LogEntryView;
}
/**
 * log_entry의 일부. 나머지 키는 검사하지 않는다.
 */
export interface LogEntryView {
  turn_result?:
    | "COMMITTED"
    | "NOT_APPLICABLE"
    | {
        /**
         * @minItems 1
         */
        failed_steps: [
          {
            phase: "BEFORE_COMMIT" | "AFTER_COMMIT";
            step: "LoRA-A" | "VALIDATE" | "COMMIT" | "DELIVER_STAFF" | "LoRA-B" | "DELIVER_FRONT";
          },
          ...{
            phase: "BEFORE_COMMIT" | "AFTER_COMMIT";
            step: "LoRA-A" | "VALIDATE" | "COMMIT" | "DELIVER_STAFF" | "LoRA-B" | "DELIVER_FRONT";
          }[]
        ];
      };
  staff_alert_delivery?: "SUCCESS" | "FAILURE" | "NOT_APPLICABLE";
  turn_failure_signal?: null | TurnFailureSignal;
}
