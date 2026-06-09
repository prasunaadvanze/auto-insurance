"use client";

import { useState } from "react";
import {
  AlertTriangle,
  CheckCircle2,
  Copy,
  Download,
  Mail,
  PartyPopper,
} from "lucide-react";
import { isFastTrackJourney, type QuoteJourney } from "../lib/quote";
import type { WorkflowStatus } from "../lib/workflow";

interface Result {
  premium: number;
}

interface Props {
  result: Result;
  journey: QuoteJourney;
  workflowStatus: WorkflowStatus | null;
  workflowLoading: boolean;
  workflowError: string | null;
  onStartOver?: () => void;
}

function StatusChips({
  journey,
  workflowStatus,
  workflowLoading,
}: {
  journey: QuoteJourney;
  workflowStatus: WorkflowStatus | null;
  workflowLoading: boolean;
}) {
  const isFastTrack = isFastTrackJourney(journey);
  const showMvr = isFastTrack && workflowStatus?.IsMvr;
  const showClue = workflowStatus?.IsClue;

  if (workflowLoading) {
    return (
      <div
        className="flex items-center justify-end gap-2"
        aria-label="Loading verification status"
      >
        {isFastTrack && (
          <span className="h-7 w-11 rounded-full bg-white/20 animate-pulse" />
        )}
        <span className="h-7 w-12 rounded-full bg-white/20 animate-pulse" />
      </div>
    );
  }

  if (!showMvr && !showClue) return null;

  return (
    <div className="flex flex-wrap items-center justify-end gap-2">
      {showMvr && (
        <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold bg-green-100 text-green-800 border border-green-200">
          MVR
        </span>
      )}
      {showClue && (
        <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold bg-green-100 text-green-800 border border-green-200">
          CLUE
        </span>
      )}
    </div>
  );
}

// const COVERAGE_ITEMS = [
//   { icon: Shield, label: "Liability", value: "$100K / $300K" },
//   { icon: Car, label: "Collision", value: "$500 deductible" },
//   { icon: HeartPulse, label: "Medical", value: "$5,000" },
// ];

export default function ResultCard({
  result,
  journey,
  workflowStatus,
  workflowLoading,
  workflowError,
  onStartOver,
}: Props) {
  const [copied, setCopied] = useState(false);
  const isFastTrack = isFastTrackJourney(journey);
  const hasStatusChips =
    workflowLoading ||
    !!workflowStatus?.IsClue ||
    (isFastTrack && !!workflowStatus?.IsMvr);

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
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-brand to-brand-dark text-white p-4 sm:p-6 shadow-lg shadow-brand/25">
        <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/3" />
        <div className="relative flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
          <div className="flex items-start gap-3 sm:gap-4 min-w-0">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/20 flex items-center justify-center shrink-0">
              <PartyPopper className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <CheckCircle2 className="w-5 h-5 shrink-0" />
                <span className="font-bold text-base sm:text-lg">Quote ready!</span>
              </div>
              {workflowError && (
                <div className="flex items-center gap-1.5 text-xs text-red-200 mb-1">
                  <AlertTriangle className="w-3.5 h-3.5 shrink-0" />
                  {workflowError}
                </div>
              )}
              <p className="text-white/85 text-sm">
                Your personalized rate is locked in for 30 days.
              </p>
            </div>
          </div>
          {hasStatusChips && (
            <div className="w-full sm:w-auto sm:ml-auto shrink-0">
              <StatusChips
                journey={journey}
                workflowStatus={workflowStatus}
                workflowLoading={workflowLoading}
              />
            </div>
          )}
        </div>
      </div>

      <div className="border border-neutral-200 rounded-2xl p-4 sm:p-6 md:p-8 bg-white shadow-sm">
        <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-start sm:justify-between sm:gap-4 mb-6">
          <div className="min-w-0">
            <p className="text-sm font-medium text-neutral-500 uppercase tracking-wide">
              Annual premium
            </p>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-neutral-900 tracking-tight mt-1">
              {formatted}
            </h2>
            <p className="text-brand font-semibold mt-2">
              ≈ {monthly}/month
            </p>
          </div>
          <span className="self-start sm:self-auto inline-flex items-center gap-1.5 bg-brand-light text-brand px-3 py-1.5 rounded-full text-xs font-bold">
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
            className="w-full sm:flex-1 sm:min-w-[140px] flex items-center justify-center gap-2 btn-primary py-3 rounded-xl font-semibold transition"
          >
            Get this policy
          </button>
          <button
            type="button"
            onClick={handleCopy}
            className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-3 rounded-xl border border-neutral-200 text-neutral-700 text-sm font-semibold hover:bg-neutral-50 transition"
          >
            <Copy className="w-4 h-4" />
            {copied ? "Copied!" : "Copy quote"}
          </button>
          <button
            type="button"
            className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-3 rounded-xl border border-neutral-200 text-neutral-700 text-sm font-semibold hover:bg-neutral-50 transition"
          >
            <Mail className="w-4 h-4" />
            Email
          </button>
          <button
            type="button"
            className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-3 rounded-xl border border-neutral-200 text-neutral-700 text-sm font-semibold hover:bg-neutral-50 transition"
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
