"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";

interface LoadingErrorStateProps {
  error: string;
}

export function LoadingErrorState({ error }: LoadingErrorStateProps) {
  return (
    <div className="min-h-screen bg-zinc-950 flex items-center justify-center px-4">
      <div className="text-center">
        <div className="text-red-400 text-lg font-medium mb-4">{error}</div>
        <Button
          asChild
          className="bg-emerald-500 hover:bg-emerald-400 text-black"
        >
          <Link href="/shop">Go to Shop</Link>
        </Button>
      </div>
    </div>
  );
}
