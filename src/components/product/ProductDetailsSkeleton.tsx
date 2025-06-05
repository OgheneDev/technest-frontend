export const ProductDetailsSkeleton = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Image Gallery Skeleton */}
          <div className="space-y-4">
            <div className="aspect-square bg-gray-200 rounded-lg animate-pulse" />
            <div className="grid grid-cols-4 gap-2">
              {[...Array(4)].map((_, i) => (
                <div 
                  key={i} 
                  className="aspect-square bg-gray-200 rounded-md animate-pulse" 
                />
              ))}
            </div>
          </div>

          {/* Product Info Skeleton */}
          <div className="space-y-6">
            <div className="space-y-4">
              <div className="h-8 bg-gray-200 rounded w-3/4 animate-pulse" />
              <div className="h-6 bg-gray-200 rounded w-1/4 animate-pulse" />
              <div className="h-4 bg-gray-200 rounded w-1/2 animate-pulse" />
            </div>

            <div className="space-y-2">
              {[...Array(3)].map((_, i) => (
                <div 
                  key={i} 
                  className="h-4 bg-gray-200 rounded w-full animate-pulse" 
                />
              ))}
            </div>

            <div className="space-y-4">
              <div className="h-12 bg-gray-200 rounded w-1/3 animate-pulse" />
              <div className="h-12 bg-gray-200 rounded w-full animate-pulse" />
            </div>
          </div>
        </div>

        {/* Related Products Skeleton */}
        <div className="mt-16">
          <div className="h-8 bg-gray-200 rounded w-48 mb-8 animate-pulse" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(4)].map((_, i) => (
              <div 
                key={i}
                className="aspect-[3/4] bg-gray-200 rounded-lg animate-pulse" 
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
