/* 생성물: scripts/gen-types.mjs (직접 고치지 않는다). 원본: schemas/ 또는 고정 태그의 계약 스키마 */
/**
 * 입력 폼 컴포넌트(approval_draft, case_review_draft, ops_request)가 입력을 거부할 때 내는 목록. path는 입력 스키마 안의 위치, message는 화면에 보일 한국어.
 */
export interface FormIssues {
  /**
   * @minItems 1
   */
  issues: [
    {
      path: string;
      message: string;
    },
    ...{
      path: string;
      message: string;
    }[]
  ];
}
