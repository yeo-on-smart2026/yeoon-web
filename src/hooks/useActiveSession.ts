"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

const POLL_INTERVAL_MS = 1500;

export type ActiveSessionDebug = {
  status: string;
  lastEvent: string;
};

/**
 * active_session 테이블(Pi가 NFC 안착/이탈 시 갱신)을 폴링으로 감시.
 * profile_id가 바뀌면 홈으로 돌아가 새 상태(대기 화면 ↔ 환영 화면)를 다시 렌더링한다.
 *
 * 원래 Supabase Realtime(postgres_changes, 웹소켓)으로 구현했으나,
 * 부스 네트워크에서 웹소켓만 차단되고 REST는 정상 동작하는 게 확인되어
 * (Pi에서 supabase-py REST 쓰기는 되는데 브라우저 웹소켓 구독만 안 됨)
 * 1.5초 폴링으로 전환. REST 기반이라 네트워크 환경에 덜 민감하다.
 *
 * 반환값은 화면에 직접 상태를 찍어보기 위한 디버그용.
 */
export function useActiveSession(): ActiveSessionDebug {
  const router = useRouter();
  const lastProfileId = useRef<string | null | undefined>(undefined);
  const [status, setStatus] = useState("polling…");
  const [lastEvent, setLastEvent] = useState("아직 없음");

  useEffect(() => {
    let cancelled = false;

    async function poll() {
      const { data, error } = await supabase
        .from("active_session")
        .select("profile_id")
        .eq("id", "kiosk-01")
        .single();

      if (cancelled) return;

      if (error) {
        setStatus(`polling error: ${error.message}`);
        return;
      }
      setStatus("polling");

      const profileId = data?.profile_id ?? null;
      const now = new Date().toLocaleTimeString("ko-KR");
      setLastEvent(`${now} → profile_id=${String(profileId)}`);

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

  return { status, lastEvent };
}
