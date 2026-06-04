"use client";

import { MapPin, Car, User, BarChart3, CheckCircle2 } from "lucide-react";

const STEPS = [
  { id: "location", label: "Location", icon: MapPin },
  { id: "vehicle", label: "Vehicle", icon: Car },
  { id: "driver", label: "Driver", icon: User },
  { id: "history", label: "History", icon: BarChart3 },
];

interface Props {
  currentStepId?: string;
  progress: number;
  completed?: boolean;
}

function resolveStepIndex(
  stepId: string | undefined,
  progress: number,
): number {
  if (!stepId) return 0;
  const lower = stepId.toLowerCase();
  const idx = STEPS.findIndex(
    (s) => lower.includes(s.id) || lower.includes(s.label.toLowerCase()),
  );
  return idx >= 0 ? idx : Math.min(Math.floor(progress / 25), STEPS.length - 1);
}

export default function StepIndicator({
  currentStepId,
  progress,
  completed,
}: Props) {
  const activeIndex = completed
    ? STEPS.length
    : resolveStepIndex(currentStepId, progress);

  return (
    <div className="flex items-center justify-between gap-1 mb-6">
      {STEPS.map((step, i) => {
        const Icon = step.icon;
        const isDone = i < activeIndex || completed;
        const isActive = i === activeIndex && !completed;

        return (
          <div
            key={step.id}
            className="flex items-center flex-1 last:flex-none"
          >
            <div className="flex flex-col items-center gap-1.5 min-w-0">
              <div
                className={`w-9 h-9 rounded-full flex items-center justify-center transition-all duration-300 ${
                  isDone
                    ? "bg-neutral-800 text-white shadow-md"
                    : isActive
                      ? "bg-brand text-white shadow-md shadow-brand/25 ring-4 ring-brand-light"
                      : "bg-neutral-100 text-neutral-400"
                }`}
              >
                {isDone ? (
                  <CheckCircle2 className="w-4 h-4" />
                ) : (
                  <Icon className="w-4 h-4" />
                )}
              </div>
              <span
                className={`text-[10px] font-semibold uppercase tracking-wide hidden sm:block ${
                  isActive
                    ? "text-brand"
                    : isDone
                      ? "text-neutral-700"
                      : "text-neutral-400"
                }`}
              >
                {step.label}
              </span>
            </div>

            {i < STEPS.length - 1 && (
              <div
                className={`flex-1 h-0.5 mx-1 sm:mx-2 rounded transition-colors duration-500 ${
                  i < activeIndex || completed
                    ? "bg-brand"
                    : "bg-neutral-200"
                }`}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}
