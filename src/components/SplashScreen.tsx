"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

const SPLASH_SHOWN_KEY = "yeoon-splash-shown";

export default function SplashScreen() {
  const [phase, setPhase] = useState<"hidden" | "show" | "hide">("hidden");

  useEffect(() => {
    if (sessionStorage.getItem(SPLASH_SHOWN_KEY)) return;
    sessionStorage.setItem(SPLASH_SHOWN_KEY, "1");
    setPhase("show");
    const timer = setTimeout(() => setPhase("hide"), 1600);
    return () => clearTimeout(timer);
  }, []);

  if (phase === "hidden") return null;

  const visible = phase === "show";

  return (
    <div
      className={`absolute inset-0 z-50 flex flex-col items-center justify-center overflow-hidden bg-[#f5efe6] transition-opacity duration-500 ${
        visible ? "opacity-100" : "pointer-events-none opacity-0"
      }`}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/splashBackGround.png"
        alt=""
        className="absolute inset-0 h-full w-full object-cover object-top"
      />
      <Image
        src="/mainLogo.png"
        alt="餘溫 YEO·ON"
        width={668}
        height={1053}
        className="relative h-auto w-[42cqw]"
      />
    </div>
  );
}
