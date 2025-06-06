"use client"

export const CartSkeleton = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:50px_50px]" />
      <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 via-purple-500/5 to-pink-500/5" />

      {/* Floating orbs */}
      <div className="absolute top-10 left-1/4 w-64 h-64 bg-gradient-to-r from-cyan-400/10 to-blue-600/10 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-10 right-1/4 w-80 h-80 bg-gradient-to-r from-purple-400/10 to-pink-600/10 rounded-full blur-3xl animate-pulse" />

      {/* Navigation */}
      <div className="relative z-10 bg-white/5 backdrop-blur-sm border-b border-white/10">
        <div className="container mx-auto px-4">
          <div className="h-16 flex items-center">
            <div className="h-4 w-32 bg-white/20 rounded animate-pulse" />
          </div>
        </div>
      </div>

      <div className="relative z-10 container mx-auto px-4 py-6">
        {/* Header Skeleton */}
        <div className="mb-6">
          <div className="h-8 bg-white/20 rounded w-48 mb-2" />
          <div className="h-4 bg-white/20 rounded w-24" />
        </div>

        <div className="grid lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {/* Cart Items Skeleton */}
          <div className="lg:col-span-2 xl:col-span-3 space-y-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="bg-white/10 backdrop-blur-sm rounded-lg border border-white/10 p-4 animate-pulse">
                <div className="flex flex-col sm:flex-row gap-4">
                  {/* Product Image Skeleton */}
                  <div className="w-full sm:w-24 h-48 sm:h-24 bg-white/20 rounded-lg flex-shrink-0" />
                  
                  {/* Product Details Skeleton */}
                  <div className="flex-1 space-y-4">
                    <div className="flex justify-between items-start gap-2">
                      <div className="h-4 bg-white/20 rounded w-3/4" />
                      <div className="h-8 w-8 bg-white/20 rounded-full flex-shrink-0" />
                    </div>
                    <div className="h-4 bg-white/20 rounded w-1/4" />
                    
                    {/* Price and Controls */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div className="flex items-center gap-2">
                        <div className="h-8 w-24 bg-white/20 rounded" />
                      </div>
                      <div className="h-8 w-32 bg-white/20 rounded" />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Summary Skeleton */}
          <div className="lg:col-span-1">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg border border-white/10 p-6 space-y-4">
              <div className="h-6 bg-white/20 rounded w-1/2 mb-6" />
              <div className="space-y-4">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="flex justify-between">
                    <div className="h-4 bg-white/20 rounded w-1/3" />
                    <div className="h-4 bg-white/20 rounded w-1/4" />
                  </div>
                ))}
                <div className="my-4 h-px bg-white/20" />
                <div className="flex justify-between">
                  <div className="h-5 bg-white/20 rounded w-1/4" />
                  <div className="h-5 bg-white/20 rounded w-1/3" />
                </div>
              </div>
              <div className="space-y-3 mt-6">
                <div className="h-12 bg-white/20 rounded" />
                <div className="h-12 bg-white/20 rounded" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .bg-grid-white\\/\\[0\\.02\\] {
          background-image: linear-gradient(rgba(255,255,255,.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.02) 1px, transparent 1px);
        }
      `}</style>
    </div>
  )
}
