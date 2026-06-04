"use client";

import { useState } from "react";
import { ChevronDown, HelpCircle } from "lucide-react";

const FAQ_ITEMS = [
  {
    q: "How long does a quote take?",
    a: "Most customers complete their quote in seconds with our guided step-by-step flow.",
  },
  {
    q: "Is my information secure?",
    a: "Yes. All data is encrypted in transit and we never share your personal details with third parties without consent.",
  },
  {
    q: "Can I adjust coverage later?",
    a: "Absolutely. After binding, you can modify deductibles, add drivers, or update vehicles through your policy portal.",
  },
  {
    q: "What affects my premium?",
    a: "Your rate is based on location, vehicle type, driving history, age, and coverage selections.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="bg-white border border-neutral-200/80 rounded-2xl p-5 shadow-sm card-hover">
      <div className="flex items-center gap-2 mb-4">
        <HelpCircle className="w-5 h-5 text-brand" />
        <h3 className="font-semibold text-neutral-800">Common questions</h3>
      </div>

      <div className="space-y-2">
        {FAQ_ITEMS.map((item, i) => {
          const isOpen = openIndex === i;
          return (
            <div
              key={item.q}
              className="border border-neutral-100 rounded-xl overflow-hidden"
            >
              <button
                type="button"
                onClick={() => setOpenIndex(isOpen ? null : i)}
                className="w-full flex items-center justify-between gap-2 px-4 py-3 text-left text-sm font-medium text-neutral-700 hover:bg-neutral-50 transition"
              >
                {item.q}
                <ChevronDown
                  className={`w-4 h-4 text-neutral-400 shrink-0 transition-transform duration-200 ${
                    isOpen ? "rotate-180" : ""
                  }`}
                />
              </button>
              {isOpen && (
                <div className="px-4 pb-3 text-xs text-neutral-500 leading-relaxed animate-fade-in">
                  {item.a}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
