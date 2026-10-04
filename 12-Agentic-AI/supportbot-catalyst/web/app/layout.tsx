import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Nav } from "@/components/nav";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "SupportBot",
  description: "Customer support chat",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="relative isolate min-h-full flex flex-col bg-slate-50 text-slate-900">
        {/* Soft blue gradient behind the top of every page (Intercom/Stripe style) */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[460px] bg-linear-to-b from-blue-100 via-indigo-50 to-transparent"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-0 -z-10 h-[320px] w-[720px] -translate-x-1/2 rounded-full bg-blue-300/30 blur-3xl"
        />
        <Nav />
        {children}
      </body>
    </html>
  );
}
