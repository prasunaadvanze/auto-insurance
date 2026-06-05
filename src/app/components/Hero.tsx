"use client";

import {
  ShieldCheck,
  Pencil,
  Headphones,
  Sparkles,
  ArrowDown,
  Users,
  Zap,
  TrendingDown,
} from "lucide-react";
import Image from "next/image";

const STATS = [
  { icon: Users, value: "500K+", label: "Quotes generated" },
  { icon: Zap, value: "Seconds", label: "Quote speed" },
  { icon: TrendingDown, value: "22%", label: "Avg. savings" },
];

export default function Hero() {
  const scrollToQuote = () => {
    document.getElementById("quote-section")?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return (
    <section className="gradient-mesh px-6 md:px-10 py-16 md:py-24">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        <div className="animate-fade-in-up">
          <span className="inline-flex items-center gap-2 bg-brand text-white px-4 py-1.5 rounded-full text-sm font-semibold shadow-md shadow-brand/20">
            <Sparkles className="w-4 h-4" />
            Instant quote experience
          </span>

          <h1 className="text-4xl sm:text-5xl lg:text-[3.25rem] font-extrabold leading-[1.08] tracking-tight text-neutral-900 mt-6 mb-5">
            Professional auto insurance quotes in{" "}
            <span className="text-brand">Seconds</span>
          </h1>

          <p className="text-neutral-600 text-lg mb-8 max-w-lg leading-relaxed">
            Flexible, affordable coverage tailored to your needs — compare
            options with a guided flow designed to save you time and money.
          </p>

          <div className="flex flex-wrap gap-3 mb-8">
            {[
              { icon: ShieldCheck, label: "Secure & encrypted" },
              { icon: Pencil, label: "Personalized rates" },
              { icon: Headphones, label: "Expert support" },
            ].map(({ icon: Icon, label }) => (
              <div
                key={label}
                className="flex items-center gap-2 px-4 py-2.5 bg-white/90 backdrop-blur-sm rounded-full shadow-sm border border-neutral-200/80 text-sm font-medium text-neutral-700"
              >
                <Icon className="w-4 h-4 text-brand" />
                {label}
              </div>
            ))}
          </div>

          <button
            type="button"
            onClick={scrollToQuote}
            className="group btn-primary inline-flex items-center gap-2 px-7 py-3.5 rounded-xl font-semibold transition-all duration-200 hover:-translate-y-0.5"
          >
            Get a Quick Quote
            <ArrowDown className="w-4 h-4 group-hover:translate-y-0.5 transition-transform" />
          </button>

          <div className="grid grid-cols-3 gap-4 mt-10 pt-8 border-t border-neutral-200/80">
            {STATS.map(({ icon: Icon, value, label }) => (
              <div key={label}>
                <div className="flex items-center gap-1.5 mb-1">
                  <Icon className="w-4 h-4 text-brand" />
                  <span className="text-xl font-bold text-neutral-800">{value}</span>
                </div>
                <span className="text-xs text-neutral-500 font-medium">{label}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="relative animate-fade-in-up lg:justify-self-end w-full max-w-lg mx-auto lg:mx-0">
          <div className="absolute -inset-4 bg-brand/10 rounded-3xl blur-2xl" />
          <div className="relative">
            <Image
              src="https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?auto=format&fit=crop&w=1000&q=80"
              alt="Happy driver in car"
              width={520}
              height={340}
              className="rounded-2xl shadow-2xl object-cover w-full ring-1 ring-white/50"
              priority
            />
            <div className="absolute -bottom-4 -left-4 bg-white rounded-xl shadow-xl px-4 py-3 flex items-center gap-3 animate-float">
              <div className="w-10 h-10 rounded-full bg-brand-light flex items-center justify-center">
                <ShieldCheck className="w-5 h-5 text-brand" />
              </div>
              <div>
                <p className="text-xs text-neutral-500 font-medium">Coverage from</p>
                <p className="text-lg font-bold text-neutral-900">$29/mo*</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
