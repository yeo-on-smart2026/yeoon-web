import Image from "next/image";
import { redirect } from "next/navigation";
import PageFrame from "@/components/PageFrame";
import { getActiveProfile, getMemories } from "@/lib/queries";

export const dynamic = "force-dynamic";

export default async function MemoriesPage() {
  const profile = await getActiveProfile();
  if (!profile) redirect("/");

  const memories = await getMemories(profile.id);

  return (
    <PageFrame>
        {/* Header */}
        <div className="absolute right-[13cqw] top-[7cqh] flex w-[55cqw] items-center gap-[3cqw] rounded-2xl bg-white/40 px-[3cqw] py-[1.6cqh] shadow-sm">
          <div className="relative h-[13cqw] w-[13cqw] shrink-0 overflow-hidden rounded-xl">
            <Image src="/memory1.png" alt="" fill className="object-cover" />
          </div>
          <div className="flex flex-col text-[#6b4a26]">
            <div className="flex items-baseline gap-[1cqw] font-[family-name:var(--font-gowun-batang)]">
              <span className="text-[3.2cqw]">故</span>
              <span className="text-[5.4cqw] font-bold text-[#7a5322]">
                {profile.name}
              </span>
              <span className="text-[3.2cqw]">님</span>
            </div>
            <p className="mt-[0.6cqh] text-[2.3cqw] tracking-wide text-[#9c7b4a]">
              {profile.birth_date} - {profile.death_date}
            </p>
          </div>
        </div>

        {/* Memories grid */}
        <div className="absolute left-1/2 top-[22cqh] grid w-[74cqw] -translate-x-1/2 grid-cols-2 gap-x-[4.5cqw] gap-y-[3.2cqh]">
          {memories.map((m, i) => (
            <div
              key={i}
              data-nav-item
              tabIndex={-1}
              className="rounded-2xl bg-white/40 p-[1.7cqw] shadow-sm"
            >
              <div className="relative aspect-[796/500] w-full overflow-hidden rounded-xl">
                <Image src={m.src} alt="" fill className="object-cover" />
              </div>
              <p className="mt-[0.8cqh] text-center text-[1.9cqw] font-semibold text-[#8a6a3d]">
                {m.date}
              </p>
              <p className="mt-[0.15cqh] text-center text-[2.1cqw] font-bold text-[#5b3d1f]">
                {m.title}
              </p>
              <p className="mt-[0.3cqh] text-center text-[1.55cqw] leading-snug text-[#9c8065]">
                {m.desc[0]}
                <br />
                {m.desc[1]}
              </p>
            </div>
          ))}
        </div>
    </PageFrame>
  );
}
