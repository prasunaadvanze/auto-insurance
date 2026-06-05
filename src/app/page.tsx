"use client";

import { useEffect, useState } from "react";
import useQuote from "./hooks/useQuote";
import DynamicForm from "./components/DynamicForm";
import ProgressBar from "./components/ProgressBar";
import ResultCard from "./components/ResultCard";
import FormSkeleton from "./components/FormSkeleton";
import Hero from "./components/Hero";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import Footer from "./components/Footer";
import StepIndicator from "./components/StepIndicator";
import { RotateCcw, FileText, AlertTriangle } from "lucide-react";

export default function Page() {
  const { schema, result, progress, loading, error, start, next } = useQuote();
  const [showToast, setShowToast] = useState(false);
  useEffect(() => {
    start();
  }, [start]);

  useEffect(() => {
    if (result) {
      setShowToast(true);
      const timer = setTimeout(() => setShowToast(false), 4000);
      return () => clearTimeout(timer);
    }
  }, [result]);

  const handleStartOver = () => {
    setShowToast(false);
    start();
  };

  return (
    <div className="gradient-mesh min-h-screen text-neutral-900">
      <Header />
      <Hero />

      <main
        id="quote-section"
        className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8 px-6 md:px-10 py-10 scroll-mt-20"
      >
        <div className="lg:col-span-2 bg-white/90 backdrop-blur-sm border border-neutral-200/80 rounded-2xl p-6 md:p-8 shadow-sm card-hover">
          <div className="flex flex-wrap justify-between gap-4 mb-6 items-center">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-brand-light flex items-center justify-center">
                <FileText className="w-5 h-5 text-brand" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-neutral-800">
                  Your Quote
                </h2>
                <p className="text-xs text-neutral-500">
                  {result
                    ? "Review your personalized rate"
                    : "Complete each step to unlock your rate"}
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={handleStartOver}
              disabled={loading}
              className="flex items-center gap-2 border border-brand/30 text-brand px-4 py-2 rounded-xl text-sm font-semibold hover:bg-brand-light transition disabled:opacity-50"
            >
              <RotateCcw className="w-4 h-4" />
              Start Over
            </button>
          </div>

          {error && (
            <div className="flex items-center gap-2 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-sm mb-6">
              <AlertTriangle className="w-4 h-4 shrink-0" />
              {error}
            </div>
          )}

          {!result && (
            <>
              <StepIndicator
                currentStepId={schema?.stepId}
                progress={progress}
              />
              <div className="mb-6">
                <ProgressBar
                  progress={progress}
                  label={schema?.title ?? "Getting started"}
                />
              </div>
            </>
          )}

          {result && <StepIndicator progress={100} completed />}

          {loading && <FormSkeleton />}

          {!loading && schema && !result && (
            <DynamicForm key={schema.stepId} schema={schema} onSubmit={next} />
          )}

          {!loading && result && (
            <ResultCard result={result} onStartOver={handleStartOver} />
          )}
        </div>

        <Sidebar progress={result ? 100 : progress} />
      </main>

      <Footer />

      {showToast && (
        <div className="fixed bottom-6 right-6 z-50 animate-fade-in-up">
          <div className="flex items-center gap-3 bg-neutral-900 text-white px-5 py-3.5 rounded-xl shadow-2xl">
            <div className="w-8 h-8 rounded-full bg-brand flex items-center justify-center text-sm">
              ✓
            </div>
            <div>
              <p className="text-sm font-semibold">Quote generated!</p>
              <p className="text-xs text-neutral-400">
                Your rate is ready to review
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
