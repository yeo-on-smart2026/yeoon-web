"use client";

import { useKeyboardNav } from "@/hooks/useKeyboardNav";

/** 화면에 아무것도 그리지 않음 — 전역 키보드 내비게이션(화살표/Enter/Esc)만 담당 */
export default function KeyboardNavWatcher() {
  useKeyboardNav();
  return null;
}
