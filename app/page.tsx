import Image from "next/image";
import Link from "next/link";
import PageFrame from "@/components/PageFrame";
import SplashScreen from "@/components/SplashScreen";
import WaitingScreen from "@/components/WaitingScreen";
import { getActiveProfile } from "@/lib/queries";

export const dynamic = "force-dynamic";

export default async function Home() {
  const profile = await getActiveProfile();

  if (!profile) {
    return (
      <PageFrame>
        <WaitingScreen />
      </PageFrame>
    );
  }

  const { name, birth_date, death_date, quote } = profile;

  return (
    <PageFrame>
        <SplashScreen />

        {/* Header */}
        <div className="absolute left-1/2 top-[11.5cqh] flex -translate-x-1/2 flex-col items-center text-center text-[#6b4a26]">
          <div className="flex items-baseline gap-[1.2cqw] font-[family-name:var(--font-gowun-batang)]">
            <span className="text-[3.7cqw]">故</span>
            <span className="text-[6.6cqw] font-bold text-[#7a5322]">
              {name}
            </span>
            <span className="text-[3.7cqw]">님</span>
          </div>
          <p className="mt-[1.4cqh] text-[2.6cqw] tracking-wide text-[#9c7b4a]">
            {birth_date} - {death_date}
          </p>
          <p className="mt-[3cqh] flex items-baseline gap-[0.6cqw] text-[2.8cqw] text-[#5b4636] font-[family-name:var(--font-gowun-batang)]">
            <span className="text-[4.4cqw] leading-none text-[#a9825a]">&ldquo;</span>
            <span>{quote}</span>
            <span className="text-[4.4cqw] leading-none text-[#a9825a]">&rdquo;</span>
          </p>
        </div>

        {/* Plaque */}
        <div className="absolute left-[62%] top-[33cqh] aspect-[1828/1856] w-[77cqw] -translate-x-1/2">
          <Image src="/memorialPlaque.png" alt="" fill sizes="500px" className="object-contain" />
          <div className="absolute left-[17%] top-[14%] flex w-[36%] flex-col items-center font-[family-name:var(--font-gowun-batang)] text-[#3a2513]">
            <span className="text-[6cqw] font-bold leading-none">故</span>
            {[...name].map((char, i) => (
              <span key={i} className="mt-[2%] text-[9.6cqw] font-bold leading-none">
                {char}
              </span>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="absolute bottom-[7.5cqh] left-1/2 flex -translate-x-1/2 gap-[5cqw]">
          <Link
            href="/memories"
            data-nav-item
            className="flex items-center whitespace-nowrap gap-[1cqw] rounded-2xl border border-[#d3ba93] bg-white px-[5cqw] py-[1.3cqh] text-[2.7cqw] font-medium text-[#8a6a3d] shadow-sm"
          >
            <ImageIcon className="h-[3.1cqw] w-[3.1cqw]" />
            추억 만나기
          </Link>
          <Link
            href="/memorial"
            data-nav-item
            className="flex items-center whitespace-nowrap gap-[1cqw] rounded-2xl border border-[#d3ba93] bg-white px-[5cqw] py-[1.3cqh] text-[2.7cqw] font-medium text-[#8a6a3d] shadow-sm"
          >
            <MessageIcon className="h-[3.1cqw] w-[3.1cqw]" />
            추모 메세지
          </Link>
        </div>
    </PageFrame>
  );
}

function ImageIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      className={className}
    >
      <rect x="3" y="4" width="18" height="16" rx="2.5" />
      <circle cx="8.5" cy="9.5" r="1.5" />
      <path d="M21 15.5 16.5 11 7 20" />
    </svg>
  );
}

function MessageIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      className={className}
    >
      <path d="M4 5.5A2.5 2.5 0 0 1 6.5 3h11A2.5 2.5 0 0 1 20 5.5v8A2.5 2.5 0 0 1 17.5 16H10l-4.5 4v-4H6.5A2.5 2.5 0 0 1 4 13.5Z" />
    </svg>
  );
}
