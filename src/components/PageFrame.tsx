import Image from "next/image";
import Link from "next/link";

export default function PageFrame({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-black">
      <div
        className="relative h-[min(100vh,177.69vw)] w-[min(100vw,56.28vh)] overflow-hidden bg-black"
        style={{ containerType: "size" }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/mainBackGround.png"
          alt=""
          className="absolute inset-0 h-full w-full object-cover object-top"
        />

        {/* Logo */}
        <Link href="/" className="absolute left-[5cqw] top-[3.58cqh]">
          <Image
            src="/mainLogo.png"
            alt="餘溫 YEO·ON"
            width={668}
            height={1053}
            className="h-auto w-[13cqw]"
          />
        </Link>

        {children}
      </div>
    </div>
  );
}
