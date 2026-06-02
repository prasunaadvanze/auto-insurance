"use client";

import Image from "next/image";
import { ShieldCheck, Phone, Clock } from "lucide-react";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 glass border-b border-white/60 shadow-sm">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-6 md:px-10 py-3.5">
        <div className="flex items-center gap-3">
          <div className="relative">
            <Image
              src="https://quotetobind-hxf4euawe9gbf0g3.centralindia-01.azurewebsites.net/Gainsco-Logo.jpg"
              width={44}
              height={44}
              alt="GAINSCO logo"
              className="w-11 h-11 object-contain rounded-xl bg-white shadow-md px-1 py-0.5 ring-2 ring-indigo-100"
            />
          </div>
          <div>
            <div className="font-bold text-slate-800 tracking-tight">
              GAINSCO Insurance
            </div>
            <div className="text-xs text-slate-500 font-medium">
              Smart auto coverage
            </div>
          </div>
        </div>

        <div className="hidden sm:flex items-center gap-5">
          <span className="flex items-center gap-1.5 text-xs text-slate-500">
            <Clock className="w-3.5 h-3.5 text-indigo-500" />
            Avg. 3 min quote
          </span>
          <span className="flex items-center gap-1.5 text-xs text-slate-500">
            <Phone className="w-3.5 h-3.5 text-indigo-500" />
            1-800-GAINSCO
          </span>
          <span className="flex items-center gap-2 bg-gradient-to-r from-emerald-500 to-teal-500 text-white px-4 py-1.5 rounded-full text-xs font-semibold shadow-sm">
            <ShieldCheck className="w-3.5 h-3.5" />
            Secure quote
          </span>
        </div>
      </div>
    </header>
  );
}
