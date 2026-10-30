// 컴포넌트 release_candidates: ReleaseCandidatesInput -> ReleaseCandidates. 최신부터인 릴리스 목록에서 활성화 후보(활성보다 새 것)와 롤백 후보(활성보다 오래된 것, 가까운 순)를 고른다.
import * as v from "../types/validators.cjs";
import type { ReleaseCandidatesInput } from "../types/ReleaseCandidatesInput.ts";
import type { ReleaseCandidates } from "../types/ReleaseCandidates.ts";

export function releaseCandidates(input: ReleaseCandidatesInput): ReleaseCandidates {
  v.assertValid(v.ReleaseCandidatesInput, input, "release_candidates");
  const { releases, pointer } = input;
  // 활성이 없으면 롤백할 곳이 없고 활성화 후보는 전부. 활성이 목록에 없으면 롤백 후보는 없고 활성화 후보는 전부(잘못된 후보를 만들지 않는다).
  const i = pointer ? releases.findIndex((r) => r.release_id === pointer.release_id) : -1;
  return v.assertValid(v.ReleaseCandidates, { activate: i < 0 ? releases : releases.slice(0, i), rollback: i < 0 ? [] : releases.slice(i + 1) }, "release_candidates");
}
