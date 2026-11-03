// 브라우저 푸시 포트(PushPorts)의 실제 구현. 서비스 워커(sw.js)를 등록하고 PushManager를 부른다. 얇은 연결부라 jsdom 시험 대상이 아니다(브라우저 API 호출뿐, 규칙 없음).
import type { PushPorts } from "./push_controller.ts";

export function browserPushPorts(): PushPorts {
  const supported = typeof navigator !== "undefined" && "serviceWorker" in navigator && typeof PushManager !== "undefined" && typeof Notification !== "undefined";
  // 왜 상대 경로: 앱이 /admin/ 같은 하위 경로에 있어도 sw 범위가 앱 폴더가 된다.
  const reg = () => navigator.serviceWorker.register("sw.js").then(() => navigator.serviceWorker.ready);
  return {
    supported,
    permission: () => Notification.permission,
    requestPermission: () => Notification.requestPermission(),
    getSubscription: async () => (await reg()).pushManager.getSubscription(),
    subscribe: async (key) => (await reg()).pushManager.subscribe({ userVisibleOnly: true, applicationServerKey: key as BufferSource }),
  };
}
