import { Card, CardContent } from "../ui/card";
import { motion } from "framer-motion";

const FeaturedProductCardSkeleton = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="group relative overflow-hidden bg-zinc-900 border border-zinc-800">
        <div className="relative aspect-square overflow-hidden">
          <div className="absolute inset-0 bg-zinc-800 animate-pulse" />
        </div>

        <CardContent className="p-4 bg-transparent">
          <div className="space-y-3 mt-4">
            {/* Title skeleton */}
            <div className="h-5 bg-zinc-800 rounded animate-pulse w-3/4" />

            <div className="flex items-center justify-between">
              {/* Price skeleton */}
              <div className="h-6 bg-zinc-800 rounded animate-pulse w-24" />
              {/* Button skeleton */}
              <div className="h-9 bg-zinc-800 rounded animate-pulse w-20" />
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default FeaturedProductCardSkeleton;
