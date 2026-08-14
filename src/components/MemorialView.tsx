"use client";

import { useState } from "react";
import Image from "next/image";
import type { Profile, MemorialMessage } from "@/lib/queries";

const TODAY_LABEL = "2026.04.20";
const TODAY_PRAYER = "오늘은 사랑하는 아버지를 기리며 기도합니다";

export default function MemorialView({
  profile,
  messages,
}: {
  profile: Profile;
  messages: MemorialMessage[];
}) {
  const [selected, setSelected] = useState<number | null>(null);
  const message = selected !== null ? messages[selected] : null;

  return (
    <>
        {/* Header */}
        <div className="absolute left-1/2 top-[3cqh] flex -translate-x-1/2 flex-col items-center text-center text-[#6b4a26]">
          <div className="flex items-baseline gap-[1.2cqw] font-[family-name:var(--font-gowun-batang)]">
            <span className="text-[3.7cqw]">故</span>
            <span className="text-[6.6cqw] font-bold text-[#7a5322]">
              {profile.name}
            </span>
            <span className="text-[3.7cqw]">님</span>
          </div>
          <p className="mt-[1.4cqh] text-[2.6cqw] tracking-wide text-[#9c7b4a]">
            {profile.birth_date} - {profile.death_date}
          </p>
          <p className="mt-[2cqh] flex items-baseline gap-[0.8cqw] text-[3.6cqw] text-[#5b4636]">
            <span className="text-[5.6cqw] leading-none text-[#a9825a]">&ldquo;</span>
            <span>{profile.quote}</span>
            <span className="text-[5.6cqw] leading-none text-[#a9825a]">&rdquo;</span>
          </p>
        </div>

        {/* Hero photo */}
        <div className="absolute inset-x-0 top-[19cqh] h-[57cqh] overflow-hidden">
          <Image
            src={profile.main_image ?? "/memorial1.png"}
            alt=""
            fill
            className="object-cover"
            style={{ objectPosition: "center 34%" }}
          />
          <div className="absolute inset-x-0 top-0 h-[25%] bg-gradient-to-b from-[#f3e7d6] via-[#f3e7d6]/60 to-transparent" />
        </div>

        {/* Prayer + messages panel */}
        <div className="absolute inset-x-0 top-[70cqh] bottom-0 rounded-t-2xl bg-white/50 px-[5cqw] pb-[3cqh] pt-[3cqh] shadow-[0_-8px_20px_rgba(0,0,0,0.06)] backdrop-blur-sm">
          <p className="text-center text-[2.6cqw] font-semibold text-[#8a6a3d]">
            {TODAY_LABEL}
          </p>
          <p className="mt-[1cqh] text-center text-[2.3cqw] text-[#6b4a26]">
            {TODAY_PRAYER}
          </p>

          <div className="mt-[4.5cqh] grid grid-cols-3 gap-x-[3cqw] gap-y-[2.2cqh]">
            {messages.map((m, i) => (
              <button
                key={m.id}
                type="button"
                data-nav-item
                onClick={() => setSelected(i)}
                className="flex items-center gap-[1.6cqw] rounded-xl bg-[#fdf9f3] px-[2.4cqw] py-[1.3cqw] text-left shadow-md"
              >
                <div className="h-[8cqw] w-[8cqw] shrink-0 rounded-full bg-[#d9d1c6]" />
                <div className="min-w-0">
                  <p className="truncate text-[1.4cqw] text-[#9c7b4a]">
                    {m.date} · {m.relation}
                  </p>
                  <p className="truncate text-[1.9cqw] font-semibold text-[#5b3d1f]">
                    {m.title}
                  </p>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Backdrop */}
        <div
          onClick={() => setSelected(null)}
          className={`absolute inset-0 z-20 bg-black/40 transition-opacity duration-300 ${
            message ? "opacity-100" : "pointer-events-none opacity-0"
          }`}
        />

        {/* Bottom sheet */}
        <div
          className={`absolute inset-x-0 bottom-0 z-30 max-h-[85%] overflow-y-auto rounded-t-2xl bg-[#faf3ea] p-[5cqw] shadow-2xl transition-transform duration-300 ${
            message ? "translate-y-0" : "translate-y-full"
          }`}
        >
          {message && (
            <>
              <button
                type="button"
                data-nav-escape
                onClick={() => setSelected(null)}
                className="absolute right-[4cqw] top-[3cqh] text-[3cqw] text-[#9c7b4a]"
                aria-label="닫기"
              >
                ✕
              </button>
              <div className="flex items-center gap-[2cqw]">
                <div className="h-[9cqw] w-[9cqw] shrink-0 rounded-full bg-[#d9d1c6]" />
                <div>
                  <p className="text-[2cqw] text-[#9c7b4a]">
                    {message.date} · {message.relation}
                  </p>
                  <p className="text-[2.6cqw] font-bold text-[#5b3d1f]">
                    {message.title}
                  </p>
                </div>
              </div>
              <div className="mt-[2.5cqh] space-y-[0.8cqh] text-[2.1cqw] leading-relaxed text-[#5b4636]">
                {message.body.map((line, i) => (
                  <p key={i}>{line}</p>
                ))}
              </div>
              {message.photo && (
                <div className="relative mt-[2.5cqh] aspect-[4/3] w-full overflow-hidden rounded-2xl">
                  <Image
                    src={message.photo}
                    alt=""
                    fill
                    className="object-cover"
                  />
                </div>
              )}
            </>
          )}
        </div>
    </>
  );
}
