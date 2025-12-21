"use client";

import Link from "next/link";
import { ArrowLeft, Lock } from "lucide-react";

export function CheckoutHeader() {
  return (
    <header className="bg-zinc-900/80 backdrop-blur-sm border-b border-zinc-800 sticky top-0 z-20">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link
            href="/cart"
            className="inline-flex items-center text-sm text-emerald-300 hover:text-emerald-200 transition-colors group"
          >
            <ArrowLeft className="mr-2 h-4 w-4 group-hover:-translate-x-1 transition-transform" />
            Back to Cart
          </Link>

          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center">
              <Lock className="h-4 w-4 text-emerald-400" />
            </div>
            <span className="text-sm font-semibold text-white">
              Secure Checkout
            </span>
          </div>
        </div>
      </div>
    </header>
  );
}
