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
      <Card className="group relative overflow-hidden md:w-[300px] bg-white">
        <div className="relative aspect-square overflow-hidden">
          <Skeleton className="absolute inset-0" />
          {/* Badge skeleton */}
          <Skeleton className="absolute right-2 top-2 h-6 w-12 rounded-full" />
        </div>

        <CardContent className="mt-4">
          <div className="space-y-3">
            {/* Title skeleton */}
            <Skeleton className="h-4 w-3/4" />
            
            <div className="flex items-center justify-between">
              {/* Price skeleton */}
              <Skeleton className="h-6 w-20" />
              {/* Button skeleton */}
              <Skeleton className="h-8 w-8 rounded-full" />
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

export default FeaturedProductCardSkeleton
