/* 생성물: scripts/gen-types.mjs (직접 고치지 않는다). 원본: schemas/ 또는 고정 태그의 계약 스키마 */
/**
 * oauth2-proxy `GET /oauth2/userinfo`의 응답 중 화면이 읽는 부분(읽기용 투영). 모르는 필드는 받는다. groups는 Keycloak 그룹 = 역할 이름(ADR 0014 결정 2).
 */
export interface UserInfo {
  user?: string;
  email?: string;
  preferredUsername?: string;
  groups?: string[];
}
