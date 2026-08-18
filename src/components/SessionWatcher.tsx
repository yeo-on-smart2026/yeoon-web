"use client";

import { useActiveSession } from "@/hooks/useActiveSession";

/** 화면에 아무것도 그리지 않음 — active_session 폴링 구독만 담당 */
export default function SessionWatcher() {
  useActiveSession();
  return null;
}
