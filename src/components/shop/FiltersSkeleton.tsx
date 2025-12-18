"use client";

export const FiltersSkeleton = () => {
  return (
    <div className="bg-zinc-900/60 border border-zinc-800 rounded-xl p-6 space-y-8 animate-pulse">
      <div className="flex items-center gap-2 mb-6">
        <div className="h-5 w-5 bg-zinc-700 rounded" />
        <div className="h-5 bg-zinc-700 rounded w-20" />
      </div>

      {/* Price Range Skeleton */}
      <div className="space-y-4">
        <div className="h-4 bg-zinc-700 rounded w-24" />
        <div className="h-2 bg-zinc-700 rounded-full" />
        <div className="flex justify-between">
          <div className="h-4 bg-zinc-700 rounded w-16" />
          <div className="h-4 bg-zinc-700 rounded w-16" />
        </div>
      </div>

      {/* Categories Skeleton */}
      <div className="space-y-3">
        <div className="h-4 bg-zinc-700 rounded w-24" />
        {[...Array(6)].map((_, i) => (
          <div key={i} className="flex items-center gap-3">
            <div className="h-4 w-4 bg-zinc-700 rounded" />
            <div className="h-4 bg-zinc-700 rounded w-28" />
          </div>
        ))}
      </div>
    </div>
  );
};
