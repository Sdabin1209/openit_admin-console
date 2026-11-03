/* 생성물: scripts/gen-types.mjs (직접 고치지 않는다). 원본: schemas/ 또는 고정 태그의 계약 스키마 */
/**
 * HMAC-SHA256(키=salt, 메시지=JCS({key,value}))의 앞 128비트 16진 32자(ADR 0016). 같은 salt·키·값이면 같다. salt는 이 영역만 안다. 소비자는 원 값으로 되돌릴 수 없고 되돌리려 해서도 안 된다. salt를 바꾸면 값이 모두 달라진다(ADR 0017).
 */
export type Pseudonym = string;
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
 * I7 `GET /v1/deidentified-traces/{ref}`(`get_trace`)가 돌려주는 비식별 TurnTrace. 정본이다: admin-console(사례 화면)과 model-lab(회귀 평가)은 이 스키마를 읽고 읽는 쪽 부분집합 스키마를 따로 두지 않는다. 계약 `TraceEnvelope`와의 관계: 같은 것이 아니다. `TraceEnvelope.trace`(문진 스키마 `TurnTrace`)에서 ops-feedback 비식별 처리기가 만든 비식별 뷰이고 봉투 필드(pipeline_schema_version, release_id, runtime_contract_version, sent_at, ext)는 없다. 릴리스는 `FailureCase.source_release_id`, 문진 스키마 버전은 `contract_version`에 있다. 만드는 쪽: ops-feedback 비식별 처리기. 읽는 쪽: admin-console, model-lab, synthetic-data, 문항 저작(I7 소비자). 최상위 키는 `TurnTrace`(contract_version 1)와 같고(29개 필수 + `turn_index` 선택) 모르는 최상위 키는 거부한다(허용 목록 방식이라 모르는 키는 이미 제거되어 있다). 안쪽 객체는 비식별이 보장하는 것만 적는다: (1) 자유 문자열 잎은 "[MASKED]"/"[DROPPED]"이거나 keep 키의 식별자 모양 값이다, (2) session_id/turn_id(어디에 나오든)는 의사 식별자 p-<32 hex>이다, (3) 구조 없는 자유 객체(extract_input.state, response_input.next 등)는 비워진다. 실패 사례 화면과 규칙 탐지가 읽는 안쪽 필드(turn_failure_signal, log_entry.turn_result, intervention_result, persistence_commit_result)만 정밀하게 적고 나머지 안쪽 객체는 object 또는 null로만 검사한다(문진 스키마 복사본을 만들지 않기 위해). 발화 문장 보존 범위는 사용자 결정(O19) 전이라 기본 정책에서 자유 문장은 모두 마스킹된다. 이웃 쪽 미확인: admin-console이 화면에 쓰는 필드 목록과 model-lab 회귀 평가가 쓰는 필드 목록은 이 영역이 읽지 못했다. 최상위 29개 필드가 모두 있으므로 어떤 필드를 읽든 자리는 있으나, 마스킹된 값으로 회귀 평가가 성립하는지는 확인하지 못했다.
 */
export interface OpsFeedbackDeidentifiedTrace {
  session_id: Pseudonym;
  turn_id: Pseudonym;
  contract_version: number;
  turn_index?: number;
  frontend_message: null | {
    session_id: Pseudonym;
    kind: "SESSION_START" | "UTTERANCE" | "SESSION_END";
    utterance?: Redacted;
  };
  extract_input: null | {
    question_id: Ident;
    current_question: Redacted;
    user_utterance: Redacted;
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
