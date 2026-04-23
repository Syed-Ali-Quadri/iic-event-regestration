"use client";

import React, { useEffect, useState } from "react";
import QRCode from "qrcode";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = React.use(params);
  const [qrDataUrl, setQrDataUrl] = useState<string>("");

  useEffect(() => {
    QRCode.toDataURL(slug, {
      width: 280,
      margin: 2,
      color: {
        dark: "#000000",
        light: "#ffffff",
      },
    }).then(setQrDataUrl);
  }, [slug]);

  return (
    <div className="min-h-screen bg-slate-950 p-4 sm:p-6 text-slate-100 flex items-center justify-center">
      <div className="mx-auto w-full max-w-xl">
        <Card className="border-slate-800 bg-slate-900/50 backdrop-blur-sm text-slate-100 shadow-2xl overflow-hidden">
          <CardHeader className="p-0">
            {/* Header Banner — matches "/" route */}
            <div className="relative p-6 sm:p-8 bg-gradient-to-br from-indigo-600 via-violet-700 to-fuchsia-600">
              <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20" />

              <div className="absolute right-4 top-4 rounded-lg bg-white/10 backdrop-blur-md p-2 border border-white/20 shadow-xl">
                <img
                  src="/IIC org.png"
                  alt="IIC Logo"
                  className="h-8 w-8 md:h-12 md:w-12 object-contain"
                />
              </div>

              <div className="relative space-y-1">
                <h1 className="text-2xl md:text-4xl font-black tracking-tight text-white drop-shadow-md">
                  AI Automation Masterclass ✨
                </h1>
                <p className="text-indigo-100 font-medium text-sm sm:text-base opacity-90">
                  AI • Automation • Empower
                </p>
              </div>
            </div>

            <div className="px-6 pt-6 text-center">
              <CardTitle className="text-2xl font-bold text-white">
                Your Event Ticket
              </CardTitle>
              <CardDescription className="text-slate-400 mt-1">
                Present this QR code at the venue for entry.
              </CardDescription>
            </div>
          </CardHeader>

          <CardContent className="p-6 flex flex-col items-center gap-6">
            {/* QR Code Container */}
            {qrDataUrl ? (
              <div className="rounded-2xl bg-white p-4 shadow-lg shadow-indigo-500/10 border border-slate-700/50">
                <img
                  src={qrDataUrl}
                  alt={`QR code for ${slug}`}
                  width={280}
                  height={280}
                  className="rounded-lg"
                />
              </div>
            ) : (
              <div className="w-[312px] h-[312px] rounded-2xl bg-slate-800/50 border border-slate-700 animate-pulse flex items-center justify-center">
                <p className="text-slate-500 text-sm">Generating QR…</p>
              </div>
            )}

            {/* Footer note */}
            <p className="text-xs text-slate-500 text-center">
              Screenshot this page or show it on your device at check-in.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}