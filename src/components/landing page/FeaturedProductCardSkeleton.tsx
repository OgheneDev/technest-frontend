import { Card, CardContent } from '../ui/card'
import { Skeleton } from '../ui/skeleton'
import { motion } from 'framer-motion'

const FeaturedProductCardSkeleton = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="group relative overflow-hidden md:w-[300px] bg-white/10 backdrop-blur-sm border border-white/10">
        <div className="relative aspect-square overflow-hidden rounded-lg">
          <Skeleton className="absolute inset-0 bg-white/20/animate-pulse" />
          {/* Badge skeleton */}
          <div className="absolute right-2 top-2">
            <Skeleton className="h-6 w-12 rounded-full bg-white/20" />
          </div>
        </div>

        <CardContent className="mt-4 bg-transparent">
          <div className="space-y-3">
            {/* Title skeleton */}
            <Skeleton className="h-4 w-3/4 bg-white/20 rounded" />

            <div className="flex items-center justify-between">
              {/* Price skeleton */}
              <Skeleton className="h-6 w-20 bg-white/20 rounded" />
              {/* Button skeleton */}
              <Skeleton className="h-8 w-8 rounded-full bg-white/20" />
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

export default FeaturedProductCardSkeleton
