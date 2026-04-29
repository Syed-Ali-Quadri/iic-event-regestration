"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-950 p-4 sm:p-6 text-slate-100 flex items-center justify-center">
      <div className="w-full max-w-2xl">
        <Card className="border-slate-800 bg-slate-900/50 backdrop-blur-sm text-slate-100 shadow-2xl overflow-hidden">

          {/* ── HEADER ── */}
          <CardHeader className="p-0">
            <div className="relative p-6 sm:p-8 bg-gradient-to-br from-indigo-600 via-violet-700 to-fuchsia-600">
              <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20" />
              <div className="absolute right-4 top-4 rounded-full bg-white p-1 border-2 border-white/40 shadow-xl">
                <Image
                  src="/iic org.png"
                  alt="ISLEC IIC Council"
                  className="h-12 w-12 md:h-16 md:w-16 rounded-full object-cover"
                  width={100}
                  height={100}
                />
              </div>
              <div className="relative space-y-1">
                <p className="text-xs font-semibold tracking-[0.2em] uppercase text-indigo-200/80 mb-2">
                  ISLEC · IIC
                </p>
                <h1 className="text-3xl md:text-4xl font-black tracking-tight text-white drop-shadow-md">
                  Innogrid 2.0 🚀
                </h1>
                <p className="text-indigo-100 font-medium text-sm sm:text-base opacity-90">
                  Build • Showcase • Technology
                </p>
              </div>

              {/* Closed status badge */}
              <div className="relative mt-4 inline-flex items-center gap-2 rounded-full bg-red-500/20 border border-red-400/30 px-3 py-1 text-xs font-semibold text-red-200 backdrop-blur-sm">
                <span className="h-2 w-2 rounded-full bg-red-400" />
                Registrations Closed
              </div>
            </div>
          </CardHeader>

          {/* ── CLOSED BODY ── */}
          <CardContent className="p-8 flex flex-col items-center text-center gap-6">

            {/* Lock icon */}
            <div className="w-20 h-20 rounded-full bg-red-500/10 border border-red-500/25 flex items-center justify-center mt-2">
              <svg
                className="w-9 h-9 text-red-400"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
                viewBox="0 0 24 24"
              >
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                <path d="M7 11V7a5 5 0 0 1 10 0v4" />
              </svg>
            </div>

            {/* Heading & description */}
            <div>
              <h2 className="text-2xl font-bold text-white mb-2">
                Registrations Closed
              </h2>
              <p className="text-slate-400 text-sm leading-relaxed max-w-sm mx-auto">
                Thank you for your interest in Innogrid 2.0. The registration
                window has now closed and we are no longer accepting new teams.
              </p>
            </div>

            {/* Status pill */}
            <div className="inline-flex items-center gap-2 bg-red-500/10 border border-red-500/25 rounded-full px-4 py-1.5">
              <span className="w-2 h-2 rounded-full bg-red-400 animate-pulse" />
              <span className="text-xs font-semibold text-red-400 uppercase tracking-wider">
                Registration Closed
              </span>
            </div>

            <div className="w-full border-t border-slate-700/60" />

            {/* Info cards */}
            <div className="grid grid-cols-2 gap-3 w-full">
              <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-4 text-left">
                <p className="text-xs text-slate-500 font-semibold uppercase tracking-wider mb-1.5">
                  Event
                </p>
                <p className="text-sm font-semibold text-slate-200">
                  Innogrid 2.0
                </p>
                <p className="text-xs text-slate-500 mt-1">ISLEC · IIC Council</p>
              </div>
              <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-4 text-left">
                <p className="text-xs text-slate-500 font-semibold uppercase tracking-wider mb-1.5">
                  Status
                </p>
                <p className="text-sm font-semibold text-red-400">Closed</p>
                <p className="text-xs text-slate-500 mt-1">
                  No new registrations
                </p>
              </div>
            </div>

            {/* Already registered note */}
            <div className="bg-indigo-500/10 border border-indigo-500/20 rounded-xl px-5 py-4 w-full text-left">
              <p className="text-sm text-indigo-300 leading-relaxed">
                <span className="font-semibold text-indigo-200">
                  Already registered?
                </span>{" "}
                Check your team leader&apos;s email inbox for your QR ticket.
                For queries, contact the IIC team directly.
              </p>
            </div>

            <p className="text-xs text-slate-600">
              © ISLEC · IIC Council · Innogrid 2.0
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}