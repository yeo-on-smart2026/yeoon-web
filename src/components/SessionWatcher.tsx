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
        top: 0,
        left: 0,
        zIndex: 999999,
        fontSize: "20px",
        fontWeight: 700,
        lineHeight: 1.5,
        padding: "10px 14px",
        background: "#ff0000",
        color: "#ffffff",
        fontFamily: "monospace",
        pointerEvents: "none",
        border: "4px solid yellow",
      }}
    >
      DEBUG realtime: {status}
      <br />
      last: {lastEvent}
    </div>
  );
}
