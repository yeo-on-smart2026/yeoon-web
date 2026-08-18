"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

type ActiveSessionRow = { profile_id: string | null };

export type ActiveSessionDebug = {
  status: string;
  lastEvent: string;
};

/**
 * active_session 테이블(Pi가 NFC 안착/이탈 시 갱신)을 Realtime 구독.
 * profile_id가 바뀌면 홈으로 돌아가 새 상태(대기 화면 ↔ 환영 화면)를 다시 렌더링한다.
 *
 * 반환값은 화면에 직접 상태를 찍어보기 위한 디버그용 — 원격 디버깅이 여의치
 * 않은 키오스크 환경(Pi)에서 콘솔 대신 화면으로 구독 상태를 확인하기 위함.
 */
export function useActiveSession(): ActiveSessionDebug {
  const router = useRouter();
  const lastProfileId = useRef<string | null | undefined>(undefined);
  const [status, setStatus] = useState("connecting…");
  const [lastEvent, setLastEvent] = useState("아직 없음");

  useEffect(() => {
    const channel = supabase
      .channel("active_session-changes")
      .on(
        "postgres_changes",
        {
          event: "UPDATE",
          schema: "public",
          table: "active_session",
          filter: "id=eq.kiosk-01",
        },
        (payload) => {
          const newRow = payload.new as ActiveSessionRow;
          const now = new Date().toLocaleTimeString("ko-KR");
          setLastEvent(`${now} → profile_id=${String(newRow.profile_id)}`);

          if (lastProfileId.current === newRow.profile_id) return;
          lastProfileId.current = newRow.profile_id;
          router.push("/");
          router.refresh();
        },
      )
      .subscribe((s, err) => {
        setStatus(err ? `${s} (${err.message})` : s);
      });

    return () => {
      supabase.removeChannel(channel);
    };
  }, [router]);

  return { status, lastEvent };
}
