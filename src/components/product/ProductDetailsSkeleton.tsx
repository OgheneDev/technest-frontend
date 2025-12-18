"use client";

export const ProductDetailsSkeleton = () => {
  return (
    <div className="min-h-screen bg-zinc-950 relative">
      {/* Gradient overlay skeleton */}
      <div className="absolute inset-0 bg-gradient-to-b from-emerald-950/20 via-transparent to-amber-950/20" />

      <div className="relative z-10 container mx-auto px-4 sm:px-6 py-8">
        {/* Main content skeleton */}
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Left: Image Gallery Skeleton */}
          <div className="space-y-4">
            {/* Main image skeleton */}
            <div className="relative aspect-square bg-gradient-to-r from-zinc-800 via-zinc-700 to-zinc-800 rounded-xl animate-shimmer overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-zinc-800 via-zinc-700 to-zinc-800" />
            </div>

            {/* Thumbnail skeletons */}
            <div className="grid grid-cols-4 gap-3">
              {[...Array(4)].map((_, i) => (
                <div
                  key={i}
                  className="aspect-square bg-zinc-800/60 border border-zinc-700 rounded-lg animate-pulse"
                />
              ))}
            </div>
          </div>

          {/* Right: Product Info Skeleton */}
          <div className="space-y-6 lg:space-y-8">
            {/* Header skeleton */}
            <div className="space-y-4">
              <div className="h-5 w-24 bg-zinc-800 rounded-full animate-pulse" />
              <div className="h-8 lg:h-10 bg-zinc-800 rounded-lg w-3/4 animate-pulse" />
            </div>

            {/* Rating skeleton */}
            <div className="flex items-center gap-3">
              <div className="flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <div
                    key={i}
                    className="h-5 w-5 bg-zinc-800 rounded animate-pulse"
                  />
                ))}
              </div>
              <div className="h-4 w-24 bg-zinc-800 rounded animate-pulse" />
            </div>

            {/* Price skeleton */}
            <div className="pt-4">
              <div className="h-9 w-48 bg-zinc-800 rounded-lg animate-pulse" />
              <div className="h-5 w-32 bg-zinc-800 rounded mt-2 animate-pulse" />
            </div>

            {/* Quantity selector skeleton */}
            <div className="space-y-3 pt-4">
              <div className="h-4 w-24 bg-zinc-800 rounded animate-pulse" />
              <div className="flex items-center gap-2">
                <div className="h-10 w-10 bg-zinc-800 rounded-lg animate-pulse" />
                <div className="h-10 w-20 bg-zinc-800 rounded-lg animate-pulse" />
                <div className="h-10 w-10 bg-zinc-800 rounded-lg animate-pulse" />
                <div className="ml-auto h-4 w-24 bg-zinc-800 rounded animate-pulse" />
              </div>
            </div>

            {/* Action buttons skeleton */}
            <div className="flex flex-col sm:flex-row gap-3 pt-6">
              <div className="h-12 flex-1 bg-emerald-500/30 rounded-lg animate-pulse" />
              <div className="h-12 w-12 bg-zinc-800 rounded-lg animate-pulse" />
            </div>

            {/* Benefits skeleton */}
            <div className="pt-6">
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {[...Array(3)].map((_, i) => (
                  <div
                    key={i}
                    className="h-14 bg-zinc-800/50 border border-zinc-700 rounded-lg animate-pulse"
                  />
                ))}
              </div>
            </div>

            {/* Description skeleton */}
            <div className="pt-6 border-t border-zinc-800 space-y-3">
              <div className="h-5 w-32 bg-zinc-800 rounded animate-pulse" />
              <div className="space-y-2">
                <div className="h-4 bg-zinc-800 rounded w-full animate-pulse" />
                <div className="h-4 bg-zinc-800 rounded w-5/6 animate-pulse" />
                <div className="h-4 bg-zinc-800 rounded w-4/6 animate-pulse" />
              </div>
            </div>

            {/* Additional info skeleton */}
            <div className="pt-6 border-t border-zinc-800 space-y-3">
              <div className="h-5 w-48 bg-zinc-800 rounded animate-pulse" />
              <div className="space-y-2">
                {[...Array(3)].map((_, i) => (
                  <div
                    key={i}
                    className="h-4 bg-zinc-800 rounded w-full animate-pulse"
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Reviews section skeleton */}
        <div className="mt-12 lg:mt-16">
          <div className="h-8 w-48 bg-zinc-800 rounded-lg mb-6 animate-pulse" />

          {/* Reviews stats skeleton */}
          <div className="bg-zinc-900/60 border border-zinc-800 rounded-xl p-6 mb-6">
            <div className="grid md:grid-cols-2 gap-8">
              {/* Average rating skeleton */}
              <div className="flex flex-col items-center justify-center text-center space-y-4">
                <div className="h-16 w-24 bg-zinc-800 rounded-xl animate-pulse" />
                <div className="flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <div
                      key={i}
                      className="h-6 w-6 bg-zinc-800 rounded animate-pulse"
                    />
                  ))}
                </div>
                <div className="h-4 w-32 bg-zinc-800 rounded animate-pulse" />
              </div>

              {/* Rating distribution skeleton */}
              <div className="space-y-4">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="h-4 w-12 bg-zinc-800 rounded animate-pulse" />
                    <div className="flex-1 h-2 bg-zinc-800 rounded-full animate-pulse" />
                    <div className="h-4 w-8 bg-zinc-800 rounded animate-pulse" />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Review form skeleton */}
          <div className="bg-zinc-900/60 border border-zinc-800 rounded-xl p-6 mb-6">
            <div className="space-y-6">
              <div className="h-6 w-40 bg-zinc-800 rounded animate-pulse mb-4" />
              <div className="space-y-4">
                <div className="h-6 w-32 bg-zinc-800 rounded animate-pulse" />
                <div className="h-24 bg-zinc-800/50 border border-zinc-700 rounded-lg animate-pulse" />
                <div className="h-12 bg-emerald-500/30 rounded-lg animate-pulse" />
              </div>
            </div>
          </div>

          {/* Related Products Skeleton */}
          <div className="mt-12">
            <div className="h-8 w-48 bg-zinc-800 rounded-lg mb-6 animate-pulse" />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
              {[...Array(4)].map((_, i) => (
                <div
                  key={i}
                  className="bg-zinc-900/60 border border-zinc-800 rounded-xl overflow-hidden animate-pulse"
                >
                  <div className="aspect-square bg-gradient-to-r from-zinc-800 via-zinc-700 to-zinc-800 animate-shimmer" />
                  <div className="p-4 space-y-3">
                    <div className="h-4 bg-zinc-800 rounded w-3/4 animate-pulse" />
                    <div className="h-3 bg-zinc-800 rounded w-1/2 animate-pulse" />
                    <div className="flex justify-between items-center">
                      <div className="h-5 bg-zinc-800 rounded w-20 animate-pulse" />
                      <div className="h-8 w-8 bg-zinc-800 rounded-full animate-pulse" />
                    </div>
                  </div>
                </div>
              ))}
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
