"use client";

import React, { useState } from "react";
import Image from "next/image";
import { ArrowUpRight, CheckCircle2, Send, Mail, MessageSquare } from "lucide-react";
import InteractiveGrid from "@/components/InteractiveGrid";

export default function Page() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");

  const handleMockSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes("@")) return;

    setStatus("loading");
    setTimeout(() => {
      setStatus("success");
      setEmail("");
    }, 700);
  };

  return (
    <div className="relative min-h-screen flex flex-col justify-between bg-[#fafafa] text-neutral-900 overflow-x-hidden selection:bg-neutral-900 selection:text-white">
      {/* 1. To'liq orqa fon (Interactive Grid) */}
      <InteractiveGrid />

      {/* 2. Yuqori Navbar (Sahifaning eng tepasida) */}
      <header className="relative z-10 w-full max-w-5xl mx-auto px-4 sm:px-6 py-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 relative flex items-center justify-center bg-white border border-neutral-200/90 rounded-lg p-1 shadow-xs">
            <Image
              src="/logo.png"
              alt="Alpha Soft Logo"
              width={26}
              height={26}
              className="object-contain"
              priority
            />
          </div>
          <span className="font-semibold tracking-tight text-neutral-900 text-sm sm:text-base">
            Alpha Soft
          </span>
        </div>

        <div className="flex items-center gap-3">
          <a
            href="https://t.me/AlphaSoft_CEO"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-neutral-700 bg-white border border-neutral-200 rounded-full hover:border-neutral-400 hover:text-neutral-900 transition-colors shadow-xs"
          >
            <span>@AlphaSoft_CEO</span>
            <ArrowUpRight className="w-3.5 h-3.5 text-neutral-400" />
          </a>
        </div>
      </header>

      {/* 3. Markaziy qism (Ekranning o'rtasida chiroyli joylashgan) */}
      <main className="relative z-10 flex-1 flex flex-col items-center justify-center w-full max-w-3xl mx-auto px-4 sm:px-6 py-8 sm:py-12 text-center">
        {/* Status Badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-neutral-200 bg-white text-neutral-600 text-xs mb-6 sm:mb-8 shadow-xs">
          <span className="w-2 h-2 rounded-full bg-emerald-600" />
          <span>Dasturiy yechimlar va muhandislik</span>
        </div>

        {/* Asosiy Sarlavha */}
        <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight text-neutral-900 leading-[1.15] mb-5">
          Murakkab g‘oyalarni <br />
          <span className="text-neutral-400 font-normal">sodda dasturlarga aylantiramiz.</span>
        </h1>

        {/* Tavsif */}
        <p className="text-neutral-600 text-sm sm:text-base max-w-lg mb-8 sm:mb-10 leading-relaxed font-normal">
          Alpha Soft — biznes va startaplar uchun zamonaviy, tezkor hamda xavfsiz raqamli tizimlar yaratuvchi jamoa.
        </p>

        {/* Mock Email Form */}
        <div className="w-full max-w-md mb-6">
          {status === "success" ? (
            <div className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl border border-emerald-300 bg-emerald-50 text-emerald-800 text-sm font-medium">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Rahmat! So‘rovingiz qabul qilindi, tez orada yozamiz.</span>
            </div>
          ) : (
            <form onSubmit={handleMockSubmit} className="flex flex-col sm:flex-row gap-2">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email manzilingizni kiriting..."
                required
                className="flex-1 bg-white border border-neutral-300 rounded-xl px-4 py-3 text-sm text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:border-neutral-900 focus:ring-1 focus:ring-neutral-900 transition-all shadow-xs"
              />
              <button
                type="submit"
                disabled={status === "loading"}
                className="bg-neutral-900 text-white hover:bg-neutral-800 active:scale-[0.98] transition-all font-medium text-sm px-5 py-3 rounded-xl flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60 shadow-xs"
              >
                {status === "loading" ? (
                  <span>Yuborilmoqda...</span>
                ) : (
                  <>
                    <span>Bog‘lanish</span>
                    <Send className="w-3.5 h-3.5" />
                  </>
                )}
              </button>
            </form>
          )}
        </div>

        {/* Aloqa CTA Tugmalari */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-2.5 w-full max-w-md text-xs">
          <a
            href="https://t.me/AlphaSoft_CEO"
            target="_blank"
            rel="noreferrer"
            className="w-full sm:w-auto flex-1 px-4 py-2.5 rounded-xl border border-neutral-200 bg-white text-neutral-800 hover:border-neutral-300 hover:bg-neutral-50 transition-all flex items-center justify-center gap-2 shadow-xs"
          >
            <MessageSquare className="w-4 h-4 text-neutral-500" />
            <span className="font-medium">Telegram: @AlphaSoft_CEO</span>
            <ArrowUpRight className="w-3 h-3 text-neutral-400" />
          </a>

          <a
            href="mailto:alpha.apps.uz@gmail.com"
            className="w-full sm:w-auto flex-1 px-4 py-2.5 rounded-xl border border-neutral-200 bg-white text-neutral-800 hover:border-neutral-300 hover:bg-neutral-50 transition-all flex items-center justify-center gap-2 shadow-xs"
          >
            <Mail className="w-4 h-4 text-neutral-500" />
            <span className="font-medium">alpha.apps.uz@gmail.com</span>
            <ArrowUpRight className="w-3 h-3 text-neutral-400" />
          </a>
        </div>

        {/* Xizmatlar / Teglar */}
        <div className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 mt-10 sm:mt-12 pt-6 border-t border-neutral-200/80 text-[11px] sm:text-xs text-neutral-500">
          <span className="px-3 py-1 rounded-md bg-white border border-neutral-200 shadow-2xs">
            Web Ilovalar
          </span>
          <span className="px-3 py-1 rounded-md bg-white border border-neutral-200 shadow-2xs">
            Mobil Tizimlar
          </span>
          <span className="px-3 py-1 rounded-md bg-white border border-neutral-200 shadow-2xs">
            SaaS & CRM
          </span>
          <span className="px-3 py-1 rounded-md bg-white border border-neutral-200 shadow-2xs">
            API & Integratsiya
          </span>
        </div>
      </main>

      {/* 4. Footer (Sahifaning eng pastida) */}
      <footer className="relative z-10 w-full max-w-5xl mx-auto px-4 sm:px-6 py-6 border-t border-neutral-200/60 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-neutral-500">
        <div>
          © {new Date().getFullYear()} Alpha Soft. Barcha huquqlar himoyalangan.
        </div>
        <div className="flex items-center gap-3">
          <a
            href="https://t.me/AlphaSoft_CEO"
            target="_blank"
            rel="noreferrer"
            className="hover:text-neutral-900 transition-colors"
          >
            Telegram
          </a>
          <span>•</span>
          <a
            href="mailto:alpha.apps.uz@gmail.com"
            className="hover:text-neutral-900 transition-colors"
          >
            Gmail
          </a>
          <span>•</span>
          <span className="text-neutral-400 font-mono text-[11px]">Toshkent, UZ</span>
        </div>
      </footer>
    </div>
  );
}
