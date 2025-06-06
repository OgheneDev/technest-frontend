"use client"

export const WishlistSkeleton = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:50px_50px]" />
      <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 via-purple-500/5 to-pink-500/5" />

      {/* Floating orbs */}
      <div className="absolute top-10 left-1/4 w-64 h-64 bg-gradient-to-r from-cyan-400/10 to-blue-600/10 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-10 right-1/4 w-80 h-80 bg-gradient-to-r from-purple-400/10 to-pink-600/10 rounded-full blur-3xl animate-pulse" />

      {/* Navigation Skeleton */}
      <div className="relative z-10 bg-white/5 backdrop-blur-sm border-b border-white/10">
        <div className="container mx-auto px-4">
          <div className="h-16 flex items-center">
            <div className="h-4 w-32 bg-white/20 rounded animate-pulse" />
          </div>
        </div>
      </div>

      <div className="relative z-10 container mx-auto px-4 py-8">
        {/* Header Skeleton */}
        <div className="mb-8 text-center">
          <div className="h-8 w-32 bg-white/20 rounded-full mx-auto mb-4 animate-pulse" />
          <div className="h-10 w-48 bg-white/20 rounded mx-auto mb-3 animate-pulse" />
          <div className="h-4 w-64 bg-white/20 rounded mx-auto animate-pulse" />
        </div>

        {/* Grid Skeleton */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="bg-white/10 backdrop-blur-sm rounded-lg border border-white/10 animate-pulse">
              <div className="aspect-square bg-white/20" />
              <div className="p-4 space-y-3">
                <div className="h-4 bg-white/20 rounded w-3/4" />
                <div className="flex justify-between items-center">
                  <div className="h-6 bg-white/20 rounded w-20" />
                  <div className="h-8 bg-white/20 rounded w-24" />
                </div>
              </div>
            </div>
          ))}
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
