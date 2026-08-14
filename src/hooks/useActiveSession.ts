"use client";

import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

type ActiveSessionRow = { profile_id: string | null };

/**
 * active_session 테이블(Pi가 NFC 안착/이탈 시 갱신)을 Realtime 구독.
 * profile_id가 바뀌면 홈으로 돌아가 새 상태(대기 화면 ↔ 환영 화면)를 다시 렌더링한다.
 */
export function useActiveSession() {
  const router = useRouter();
  const lastProfileId = useRef<string | null | undefined>(undefined);

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
          console.log("[useActiveSession] UPDATE 수신:", payload.new);
          const newRow = payload.new as ActiveSessionRow;
          if (lastProfileId.current === newRow.profile_id) return;
          lastProfileId.current = newRow.profile_id;
          router.push("/");
          router.refresh();
        },
      )
      .subscribe((status, err) => {
        console.log("[useActiveSession] 구독 상태:", status, err ?? "");
      });

    return () => {
      supabase.removeChannel(channel);
    };
  }, [router]);
}
