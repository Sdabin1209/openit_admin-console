/* 생성물: scripts/gen-types.mjs (직접 고치지 않는다). 원본: schemas/ 또는 고정 태그의 계약 스키마 */
/**
 * result_sheet의 출력: 문진표 모양(문항별 칸과 값, 빈칸과 사유, 확인 표시). 완료 여부는 status가 ENDED_COMPLETE인지로만 정한다.
 */
export interface SheetView {
  sessionId: string;
  setText: string;
  statusText: string;
  complete: boolean;
  groups: {
    item: string;
    rows: {
      slot: string;
      valueText: string;
      statusText: string;
      precision: string;
    }[];
  }[];
  blanks: {
    item: string;
    slot?: string;
    reasonCode: string;
    reasonText: string;
  }[];
  ack: {
    acknowledged: boolean;
    text: string;
  };
}
