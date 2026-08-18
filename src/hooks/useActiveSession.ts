"use client";

import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

const POLL_INTERVAL_MS = 1500;

/**
 * active_session 테이블(Pi가 NFC 안착/이탈 시 갱신)을 폴링으로 감시.
 * profile_id가 바뀌면 홈으로 돌아가 새 상태(대기 화면 ↔ 환영 화면)를 다시 렌더링한다.
 *
 * 원래 Supabase Realtime(postgres_changes, 웹소켓)으로 구현했으나,
 * 부스 네트워크에서 웹소켓만 차단되고 REST는 정상 동작하는 게 확인되어
 * 1.5초 폴링으로 전환. REST 기반이라 네트워크 환경에 덜 민감하다.
 */
export function useActiveSession() {
  const router = useRouter();
  const lastProfileId = useRef<string | null | undefined>(undefined);

  useEffect(() => {
    let cancelled = false;

    async function poll() {
      const { data, error } = await supabase
        .from("active_session")
        .select("profile_id")
        .eq("id", "kiosk-01")
        .single();

      if (cancelled || error) return;

      const profileId = data?.profile_id ?? null;

      if (lastProfileId.current === undefined) {
        // 최초 조회는 기준값만 세팅 (페이지는 이미 이 상태로 렌더링됐으므로 전환 불필요)
        lastProfileId.current = profileId;
        return;
      }
      if (lastProfileId.current === profileId) return;

      lastProfileId.current = profileId;
      router.push("/");
      router.refresh();
    }

    poll();
    const id = setInterval(poll, POLL_INTERVAL_MS);
    return () => {
      cancelled = true;
      clearInterval(id);
    };
  }, [router]);
}
