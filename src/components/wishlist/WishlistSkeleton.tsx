"use client";

export const WishlistSkeleton = () => {
  return (
    <div className="min-h-screen bg-zinc-950 overflow-hidden relative">
      {/* Hero gradient overlay skeleton */}
      <div className="absolute inset-0 bg-gradient-to-b from-emerald-950/20 via-transparent to-amber-950/20" />

      {/* Navigation Skeleton - Compact */}
      <div className="relative z-20 bg-zinc-900/80 backdrop-blur-sm border-b border-zinc-800">
        <div className="container mx-auto px-4 sm:px-6 py-3">
          <div className="flex items-center justify-between">
            <div className="h-4 w-36 bg-zinc-800 rounded animate-pulse" />
            <div className="h-7 w-20 bg-zinc-800 rounded animate-pulse" />
          </div>
        </div>
      </div>

      {/* Main Content Skeleton */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 py-6 md:py-8">
        {/* Header Section Skeleton */}
        <div className="text-center mb-6 md:mb-8">
          {/* Badge Skeleton */}
          <div className="inline-flex items-center justify-center mb-3">
            <div className="h-5 w-28 bg-emerald-500/20 border border-emerald-500/30 rounded-full animate-pulse" />
          </div>

          {/* Title Skeleton */}
          <div className="h-8 w-64 md:h-10 md:w-80 bg-zinc-800 rounded-lg mx-auto mb-2 animate-pulse" />

          {/* Subtitle Skeleton */}
          <div className="h-4 w-48 bg-zinc-800 rounded mx-auto animate-pulse" />
        </div>

        {/* Stats Bar Skeleton */}
        <div className="mb-4">
          <div className="flex flex-wrap items-center justify-between p-3 bg-zinc-900/50 backdrop-blur-sm border border-zinc-800 rounded-lg">
            <div className="flex items-center space-x-3">
              <div className="flex items-center">
                <div className="h-4 w-4 bg-zinc-700 rounded-full mr-2" />
                <div className="h-4 w-16 bg-zinc-700 rounded animate-pulse" />
              </div>
              <div className="hidden sm:block">
                <div className="h-3 w-32 bg-zinc-700 rounded animate-pulse" />
              </div>
            </div>
            <div className="h-7 w-24 bg-zinc-700 rounded animate-pulse" />
          </div>
        </div>

        {/* Grid Skeleton - Compact */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="group bg-zinc-900/60 backdrop-blur-sm rounded-lg overflow-hidden border border-zinc-800 animate-pulse"
            >
              {/* Image Skeleton */}
              <div className="relative aspect-square overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-zinc-800 via-zinc-700 to-zinc-800 animate-shimmer" />
              </div>

              {/* Content Skeleton */}
              <div className="p-3">
                {/* Category Skeleton */}
                <div className="mb-1">
                  <div className="h-3 w-16 bg-zinc-700 rounded animate-pulse" />
                </div>

                {/* Title Skeleton */}
                <div className="h-4 w-full bg-zinc-700 rounded mb-2 animate-pulse" />
                <div className="h-3 w-3/4 bg-zinc-700 rounded mb-3 animate-pulse" />

                {/* Price & Button Skeleton */}
                <div className="flex items-center justify-between">
                  <div className="flex flex-col">
                    <div className="h-5 w-20 bg-zinc-700 rounded animate-pulse" />
                    <div className="h-3 w-16 bg-zinc-700 rounded mt-1 animate-pulse" />
                  </div>

                  <div className="flex items-center gap-1.5">
                    <div className="h-7 w-16 bg-emerald-500/30 rounded animate-pulse" />
                    <div className="h-7 w-7 bg-zinc-700 rounded animate-pulse" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA Skeleton */}
        <div className="text-center pt-6 border-t border-zinc-800">
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <div className="h-9 w-32 bg-emerald-500/30 rounded animate-pulse" />
            <div className="h-9 w-40 bg-zinc-700 rounded animate-pulse" />
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
