"use client";

import {
  MapPin,
  Car,
  User,
  BarChart3,
  Star,
  Headphones,
  Zap,
  BadgeCheck,
} from "lucide-react";
import FAQ from "./FAQ";

interface Props {
  progress: number;
}

const CHECKLIST = [
  { icon: MapPin, label: "ZIP code", color: "text-rose-500 bg-rose-50" },
  { icon: Car, label: "Vehicle details", color: "text-blue-500 bg-blue-50" },
  { icon: User, label: "Driver information", color: "text-violet-500 bg-violet-50" },
  {
    icon: BarChart3,
    label: "Accident history",
    color: "text-emerald-500 bg-emerald-50",
  },
];

export default function Sidebar({ progress }: Props) {
  const checklistDone = Math.floor(progress / 25);

  return (
    <aside className="space-y-4">
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-indigo-600 via-indigo-500 to-cyan-500 text-white p-6 shadow-lg shadow-indigo-200">
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
        <div className="relative">
          <div className="flex items-center gap-2 mb-2">
            <Zap className="w-5 h-5 text-amber-300" />
            <span className="text-xs font-semibold uppercase tracking-wider text-indigo-100">
              Fast track
            </span>
          </div>
          <h3 className="font-bold text-lg mb-1">Coverage made simple</h3>
          <p className="text-sm text-indigo-100/90 leading-relaxed">
            Answer a few questions and get accurate coverage options tailored to
            you.
          </p>
          <div className="mt-4 flex items-center gap-2 bg-white/15 rounded-xl px-3 py-2 backdrop-blur-sm">
            <BadgeCheck className="w-4 h-4 text-emerald-300" />
            <span className="text-xs font-medium">
              {progress}% complete — keep going!
            </span>
          </div>
        </div>
      </div>

      <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-sm card-hover">
        <h3 className="font-semibold text-slate-800 mb-4">What you&apos;ll need</h3>
        <ul className="space-y-3">
          {CHECKLIST.map((item, i) => {
            const Icon = item.icon;
            const done = i < checklistDone;
            return (
              <li
                key={item.label}
                className={`flex items-center gap-3 text-sm transition ${
                  done ? "text-slate-400 line-through" : "text-slate-600"
                }`}
              >
                <span
                  className={`w-8 h-8 rounded-lg flex items-center justify-center ${item.color}`}
                >
                  <Icon className="w-4 h-4" />
                </span>
                <span className="font-medium">{item.label}</span>
                {done && (
                  <span className="ml-auto text-[10px] font-bold text-emerald-500 uppercase">
                    Done
                  </span>
                )}
              </li>
            );
          })}
        </ul>
      </div>

      <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-sm card-hover">
        <div className="flex items-center gap-1 text-amber-400 mb-2">
          {[...Array(5)].map((_, i) => (
            <Star key={i} className="w-4 h-4 fill-current" />
          ))}
        </div>
        <p className="text-sm font-semibold text-slate-700">4.8 / 5 satisfaction</p>
        <p className="text-xs text-slate-500 mt-1">
          Based on 12,000+ demo quotes this year
        </p>
      </div>

      <div className="bg-gradient-to-r from-slate-50 to-indigo-50 border border-indigo-100 rounded-2xl p-5">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center shrink-0">
            <Headphones className="w-5 h-5 text-indigo-600" />
          </div>
          <div>
            <p className="text-sm font-semibold text-slate-800">Need help?</p>
            <p className="text-xs text-slate-500 mt-0.5">
              Agents available Mon–Fri, 8am–8pm CT
            </p>
            <button
              type="button"
              className="mt-2 text-xs font-semibold text-indigo-600 hover:text-indigo-700 transition"
            >
              Chat with an agent →
            </button>
          </div>
        </div>
      </div>

      <FAQ />
    </aside>
  );
}
