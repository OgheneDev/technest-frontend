import { Card, CardContent } from "../ui/card";

interface ProductSkeletonProps {
  layout: "grid" | "list";
}

export const ProductSkeleton = ({ layout }: ProductSkeletonProps) => {
  if (layout === "grid") {
    return (
      <Card className="animate-pulse bg-white/10">
        <div className="aspect-square bg-white/20" />
        <CardContent className="mt-4">
          <div className="h-4 bg-white/20 rounded w-3/4 mb-4" />
          <div className="space-y-3">
            <div className="h-3 bg-white/20 rounded w-1/2" />
            <div className="flex justify-between items-center">
              <div className="h-6 bg-white/20 rounded w-20" />
              <div className="h-8 bg-white/20 rounded-full w-8" />
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="animate-pulse bg-white/10">
      <CardContent className="flex gap-6 p-4">
        <div className="w-48 h-48 bg-white/20 rounded-lg" />
        <div className="flex-1 space-y-4">
          <div className="h-5 bg-white/20 rounded w-3/4" />
          <div className="h-4 bg-white/20 rounded w-1/2" />
          <div className="flex justify-between items-center">
            <div className="h-8 bg-white/20 rounded w-24" />
            <div className="h-10 bg-white/20 rounded w-32" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
