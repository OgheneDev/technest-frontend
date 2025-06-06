export const CartSkeleton = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation Skeleton */}
      <div className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4">
          <div className="h-16 flex items-center">
            <div className="h-4 w-32 bg-gray-200 rounded animate-pulse" />
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6">
        <div className="grid lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {/* Cart Items Skeleton */}
          <div className="lg:col-span-2 xl:col-span-3 space-y-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="bg-white rounded-lg shadow p-4 animate-pulse">
                <div className="flex gap-4">
                  <div className="h-24 w-24 bg-gray-200 rounded-lg" />
                  <div className="flex-1 space-y-4">
                    <div className="h-4 bg-gray-200 rounded w-3/4" />
                    <div className="h-4 bg-gray-200 rounded w-1/4" />
                    <div className="flex justify-between items-center">
                      <div className="h-8 w-24 bg-gray-200 rounded" />
                      <div className="h-8 w-32 bg-gray-200 rounded" />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Summary Skeleton */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow p-6 space-y-4">
              <div className="h-6 bg-gray-200 rounded w-1/2" />
              <div className="space-y-3">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="flex justify-between">
                    <div className="h-4 bg-gray-200 rounded w-1/3" />
                    <div className="h-4 bg-gray-200 rounded w-1/4" />
                  </div>
                ))}
              </div>
              <div className="h-10 bg-gray-200 rounded mt-6" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
