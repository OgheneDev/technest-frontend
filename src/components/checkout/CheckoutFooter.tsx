"use client";

import Link from "next/link";

export function CheckoutFooter() {
  return (
    <footer className="mt-12 pt-8 border-t border-zinc-800">
      <div className="container mx-auto px-4 pb-8">
        <div className="text-center text-sm text-zinc-500">
          <p>© {new Date().getFullYear()} TechNest. All rights reserved.</p>
          <p className="mt-1">
            Need help?{" "}
            <Link
              href="/contact"
              className="text-emerald-400 hover:text-emerald-300 font-medium transition-colors"
            >
              Contact Support
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
