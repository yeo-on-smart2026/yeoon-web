"use client";

import { useEffect, useRef } from "react";
import { usePathname, useRouter } from "next/navigation";

const FOCUS_CLASS = "kbnav-focused";

function navItems(): HTMLElement[] {
  return Array.from(document.querySelectorAll<HTMLElement>("[data-nav-item]"));
}

/**
 * 모찌 컨트롤러(BLE HID) 또는 Pi GPIO 백업 입력이 보내는 OS 키보드 이벤트를
 * '클릭 + 슬라이드' 방식 내비게이션으로 변환한다.
 *   ArrowRight/Left → [data-nav-item] 간 포커스 이동
 *   Enter           → 포커스된 요소 클릭
 *   Escape          → 열려있는 [data-nav-escape](뒤로가기/닫기 버튼) 클릭, 없으면 router.back()
 */
export function useKeyboardNav() {
  const pathname = usePathname();
  const router = useRouter();
  const indexRef = useRef(0);

  useEffect(() => {
    indexRef.current = 0;

    function applyFocus() {
      const els = navItems();
      els.forEach((el, i) =>
        el.classList.toggle(FOCUS_CLASS, i === indexRef.current),
      );
    }

    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        e.preventDefault();
        const escapeTarget =
          document.querySelector<HTMLElement>("[data-nav-escape]");
        if (escapeTarget) escapeTarget.click();
        else router.back();
        return;
      }

      const els = navItems();
      if (els.length === 0) return;

      switch (e.key) {
        case "ArrowRight":
          e.preventDefault();
          indexRef.current = (indexRef.current + 1) % els.length;
          applyFocus();
          break;
        case "ArrowLeft":
          e.preventDefault();
          indexRef.current = (indexRef.current - 1 + els.length) % els.length;
          applyFocus();
          break;
        case "Enter":
          e.preventDefault();
          els[indexRef.current]?.click();
          break;
      }
    }

    applyFocus();
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [pathname, router]);
}
