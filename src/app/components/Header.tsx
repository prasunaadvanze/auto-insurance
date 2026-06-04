"use client";

import Image from "next/image";
import { ShieldCheck, Phone, Zap } from "lucide-react";
import { SignInButton, SignUpButton, UserButton, useAuth } from "@clerk/nextjs";

export default function Header() {
  const { isSignedIn } = useAuth();
  return (
    <header className="sticky top-0 z-50 glass border-b border-neutral-200/80 shadow-sm">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-6 md:px-10 py-3.5">
        <div className="flex items-center gap-3">
          <div className="relative">
            <Image
              src="/gainsco-logo.png"
              width={120}
              height={48}
              alt="GAINSCO Auto Insurance"
              className="h-10 w-auto object-contain"
              priority
            />
          </div>
          <div className="hidden sm:block border-l border-neutral-200 pl-3">
            <div className="font-bold text-neutral-900 tracking-tight">
              GAINSCO Auto Insurance®
            </div>
            <div className="text-xs text-neutral-500 font-medium italic">
              Flexible affordable auto insurance
            </div>
          </div>
        </div>

        <div className="flex items-center gap-5">
          <div className="hidden sm:flex items-center gap-5">
            <span className="flex items-center gap-1.5 text-xs text-neutral-500">
              <Zap className="w-3.5 h-3.5 text-brand" />
              Quotes in Sec
            </span>
            <span className="flex items-center gap-1.5 text-xs text-neutral-500">
              <Phone className="w-3.5 h-3.5 text-brand" />
              1.866.GAINSCO
            </span>
          </div>

          {!isSignedIn && (
            <>
              <SignInButton mode="modal">
                <button className="px-4 py-1.5 rounded-full text-xs font-semibold border border-brand/40 text-brand hover:bg-brand-light transition">
                  Sign in
                </button>
              </SignInButton>
              <SignUpButton mode="modal">
                <button className="px-4 py-1.5 rounded-full text-xs font-semibold btn-primary hover:opacity-95 transition">
                  Sign up
                </button>
              </SignUpButton>
            </>
          )}
          {isSignedIn && <UserButton />}

          <span className="hidden md:flex items-center gap-2 btn-primary px-4 py-1.5 rounded-full text-xs font-semibold">
            <ShieldCheck className="w-3.5 h-3.5" />
            Secure quote
          </span>
        </div>
      </div>
    </header>
  );
}
