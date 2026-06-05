"use client";

import { useState } from "react";
import {
  CheckCircle2,
  Copy,
  Download,
  Mail,
  Shield,
  Car,
  HeartPulse,
  PartyPopper,
} from "lucide-react";

interface Result {
  premium: number;
}

interface Props {
  result: Result;
  onStartOver?: () => void;
}

// const COVERAGE_ITEMS = [
//   { icon: Shield, label: "Liability", value: "$100K / $300K" },
//   { icon: Car, label: "Collision", value: "$500 deductible" },
//   { icon: HeartPulse, label: "Medical", value: "$5,000" },
// ];

export default function ResultCard({ result, onStartOver }: Props) {
  const [copied, setCopied] = useState(false);

  const formatted = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(result.premium);

  const monthly = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(Math.round(result.premium / 12));

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(
        `GAINSCO Auto Quote: ${formatted}/year (${monthly}/mo)`,
      );
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* clipboard unavailable */
    }
  };

  return (
    <div className="space-y-5 animate-confetti-pop">
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-brand to-brand-dark text-white p-6 shadow-lg shadow-brand/25">
        <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/3" />
        <div className="relative flex items-start gap-4">
          <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center shrink-0">
            <PartyPopper className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2 mb-1">
              <CheckCircle2 className="w-5 h-5" />
              <span className="font-bold text-lg">Quote ready!</span>
            </div>
            <p className="text-white/85 text-sm">
              Your personalized rate is locked in for 30 days.
            </p>
          </div>
        </div>
      </div>

      <div className="border border-neutral-200 rounded-2xl p-6 md:p-8 bg-white shadow-sm">
        <div className="flex flex-wrap items-start justify-between gap-4 mb-6">
          <div>
            <p className="text-sm font-medium text-neutral-500 uppercase tracking-wide">
              Annual premium
            </p>
            <h2 className="text-5xl md:text-6xl font-extrabold text-neutral-900 tracking-tight mt-1">
              {formatted}
            </h2>
            <p className="text-brand font-semibold mt-2">
              ≈ {monthly}/month
            </p>
          </div>
          <span className="inline-flex items-center gap-1.5 bg-brand-light text-brand px-3 py-1.5 rounded-full text-xs font-bold">
            Save up to 22%
          </span>
        </div>

        {/* <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
          {COVERAGE_ITEMS.map(({ icon: Icon, label, value }) => (
            <div
              key={label}
              className="flex items-center gap-3 p-3 rounded-xl bg-neutral-50 border border-neutral-100"
            >
              <div className="w-9 h-9 rounded-lg bg-brand-light flex items-center justify-center shrink-0">
                <Icon className="w-4 h-4 text-brand" />
              </div>
              <div>
                <p className="text-xs text-neutral-500 font-medium">{label}</p>
                <p className="text-sm font-semibold text-neutral-800">{value}</p>
              </div>
            </div>
          ))}
        </div> */}

        <div className="flex flex-wrap gap-3">
          <button
            type="button"
            className="flex-1 min-w-[140px] flex items-center justify-center gap-2 btn-primary py-3 rounded-xl font-semibold transition"
          >
            Get this policy
          </button>
          <button
            type="button"
            onClick={handleCopy}
            className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl border border-neutral-200 text-neutral-700 text-sm font-semibold hover:bg-neutral-50 transition"
          >
            <Copy className="w-4 h-4" />
            {copied ? "Copied!" : "Copy quote"}
          </button>
          <button
            type="button"
            className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl border border-neutral-200 text-neutral-700 text-sm font-semibold hover:bg-neutral-50 transition"
          >
            <Mail className="w-4 h-4" />
            Email
          </button>
          <button
            type="button"
            className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl border border-neutral-200 text-neutral-700 text-sm font-semibold hover:bg-neutral-50 transition"
          >
            <Download className="w-4 h-4" />
            PDF
          </button>
        </div>

        {onStartOver && (
          <button
            type="button"
            onClick={onStartOver}
            className="mt-4 w-full text-center text-sm text-brand font-semibold hover:text-brand-dark transition"
          >
            Start a new quote →
          </button>
        )}
      </div>
    </div>
  );
}
