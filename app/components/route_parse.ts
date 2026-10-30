// 컴포넌트 route_parse: RouteInput -> Route. 주소의 해시를 화면과 대상 ID로 바꾼다. 잘못된 퍼센트 인코딩(예: #/s/%E0%A4%A)이 화면을 죽이지 않게 bad_address로 낸다.
import * as v from "../types/validators.cjs";
import type { RouteInput } from "../types/RouteInput.ts";
import type { Route } from "../types/Route.ts";

function decode(s: string): string | null {
  try {
    return decodeURIComponent(s);
  } catch {
    return null;
  }
}

export function routeParse(input: RouteInput): Route {
  v.assertValid(v.RouteInput, input, "route_parse");
  const h = input.hash;
  let m: RegExpExecArray | null;
  let out: Route;
  if (h === "#/ops") out = { screen: "ops", view: "list" };
  else if ((m = /^#\/cases\/(.+)$/.exec(h)) || (m = /^#\/s\/(.+)$/.exec(h))) {
    const id = decode(m[1]);
    const screen = h.startsWith("#/cases/") ? "cases" : "approvals";
    out = id === null || id === "" ? { screen: "bad_address", view: "none" } : { screen, view: "detail", id };
  } else if (h === "#/cases") out = { screen: "cases", view: "list" };
  else out = { screen: "approvals", view: "list" };
  return v.assertValid(v.Route, out, "route_parse");
}
