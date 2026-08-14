import type { Metadata } from "next";
import { Geist, Geist_Mono, Gowun_Batang } from "next/font/google";
import SessionWatcher from "@/components/SessionWatcher";
import KeyboardNavWatcher from "@/components/KeyboardNavWatcher";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const gowunBatang = Gowun_Batang({
  variable: "--font-gowun-batang",
  weight: ["400", "700"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "餘溫 · YEO·ON",
  description: "온라인 추모 공간",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ko"
      className={`${geistSans.variable} ${geistMono.variable} ${gowunBatang.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <SessionWatcher />
        <KeyboardNavWatcher />
        {children}
      </body>
    </html>
  );
}
