"use client";

export const CartSkeleton = () => {
  return (
    <div className="min-h-screen bg-zinc-950 overflow-hidden relative">
      <div className="absolute inset-0 bg-gradient-to-b from-emerald-950/20 via-transparent to-amber-950/20" />

      {/* Navigation Skeleton */}
      <div className="relative z-20 bg-zinc-900/80 backdrop-blur-sm border-b border-zinc-800">
        <div className="container mx-auto px-4 sm:px-6 py-3">
          <div className="h-4 w-32 bg-zinc-800 rounded animate-pulse" />
        </div>
      </div>

      <div className="relative z-10 container mx-auto px-4 sm:px-6 py-6 md:py-8">
        {/* Header Skeleton */}
        <div className="mb-6 md:mb-8">
          <div className="h-6 w-40 bg-zinc-800 rounded-full mx-auto mb-4 animate-pulse" />
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="h-8 w-64 bg-zinc-800 rounded-lg mb-2 animate-pulse" />
              <div className="h-4 w-48 bg-zinc-800 rounded animate-pulse" />
            </div>
            <div className="h-9 w-28 bg-zinc-800 rounded animate-pulse" />
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6 lg:gap-8">
          {/* Cart Items Skeleton */}
          <div className="lg:col-span-2 space-y-4">
            {/* Trust Badges Skeleton */}
            <div className="flex flex-wrap justify-center gap-4 p-3 bg-zinc-900/50 border border-zinc-800 rounded-lg mb-4">
              {[...Array(3)].map((_, i) => (
                <div
                  key={i}
                  className="h-4 w-32 bg-zinc-800 rounded animate-pulse"
                />
              ))}
            </div>

            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className="bg-zinc-900/60 border border-zinc-800 rounded-xl p-4 sm:p-6 animate-pulse"
              >
                <div className="flex flex-col sm:flex-row gap-4">
                  {/* Image Skeleton */}
                  <div className="relative h-40 w-full sm:h-28 sm:w-28 flex-shrink-0 overflow-hidden rounded-lg bg-gradient-to-r from-zinc-800 via-zinc-700 to-zinc-800 animate-shimmer" />

                  {/* Content Skeleton */}
                  <div className="flex-1 min-w-0 space-y-3">
                    <div className="flex justify-between items-start">
                      <div className="h-5 w-3/4 bg-zinc-800 rounded animate-pulse" />
                      <div className="h-8 w-8 bg-zinc-800 rounded-full animate-pulse" />
                    </div>
                    <div className="h-4 w-24 bg-zinc-800 rounded animate-pulse" />
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                      <div className="flex items-center gap-2">
                        <div className="h-8 w-28 bg-zinc-800 rounded animate-pulse" />
                      </div>
                      <div className="h-6 w-20 bg-zinc-800 rounded animate-pulse" />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Summary Skeleton */}
          <div className="lg:col-span-1">
            <div className="bg-zinc-900/60 border border-zinc-800 rounded-xl p-5 space-y-4">
              <div className="h-6 w-40 bg-zinc-800 rounded mb-6 animate-pulse" />
              <div className="space-y-4">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="flex justify-between">
                    <div className="h-4 w-24 bg-zinc-800 rounded animate-pulse" />
                    <div className="h-4 w-20 bg-zinc-800 rounded animate-pulse" />
                  </div>
                ))}
                <div className="my-4 h-px bg-zinc-800" />
                <div className="flex justify-between">
                  <div className="h-5 w-16 bg-zinc-800 rounded animate-pulse" />
                  <div className="h-5 w-24 bg-zinc-800 rounded animate-pulse" />
                </div>
              </div>
              <div className="space-y-3 mt-6">
                <div className="h-12 bg-emerald-500/30 rounded animate-pulse" />
                <div className="h-12 bg-zinc-800 rounded animate-pulse" />
              </div>
              <div className="mt-6 pt-6 border-t border-zinc-800 space-y-2">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <div className="h-3 w-3 bg-zinc-800 rounded-full animate-pulse" />
                    <div className="h-3 w-32 bg-zinc-800 rounded animate-pulse" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx global>{`
        @keyframes shimmer {
          0% {
            background-position: -200px 0;
          }
          100% {
            background-position: calc(200px + 100%) 0;
          }
        }

        .animate-shimmer {
          background-size: 200px 100%;
          background-image: linear-gradient(
            90deg,
            rgba(255, 255, 255, 0.05) 25%,
            rgba(255, 255, 255, 0.1) 50%,
            rgba(255, 255, 255, 0.05) 75%
          );
          animation: shimmer 1.5s infinite;
        }
      `}</style>
    </div>
  );
};
