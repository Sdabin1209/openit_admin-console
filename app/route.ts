// 주소(해시) 처리. 잘못된 퍼센트 인코딩(예: #/s/%E0%A4%A)이 화면을 죽이지 않게 null을 돌려준다.
export function safeDecode(s: string): string | null {
  try {
    return decodeURIComponent(s);
  } catch {
    return null;
  }
}
