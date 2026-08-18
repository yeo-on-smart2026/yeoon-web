"use client";

import { useActiveSession } from "@/hooks/useActiveSession";

/**
 * active_session Realtime 구독 담당 + 임시 디버그 배지.
 * DevTools 원격 디버깅이 번거로운 키오스크 환경에서, 화면 자체에
 * 구독 상태를 찍어서 사진으로 바로 확인할 수 있게 함.
 * 원인 파악 끝나면 이 배지는 지워도 됨.
 */
export default function SessionWatcher() {
  const { status, lastEvent } = useActiveSession();

  return (
    <div
      style={{
        position: "fixed",
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 9999,
        fontSize: "11px",
        lineHeight: 1.4,
        padding: "4px 8px",
        background: "rgba(0,0,0,0.75)",
        color: "#fff",
        fontFamily: "monospace",
        pointerEvents: "none",
      }}
    >
      realtime: {status} · last: {lastEvent}
    </div>
  );
}
