"use client";

import { useState, useEffect } from "react";
import {
  Star,
  Send,
  User,
  TrendingUp,
  MessageCircle,
  Award,
  Sparkles,
} from "lucide-react";
import { getProductReviews, postProductReview } from "@/api/products/requests";
import { Review } from "@/types/products";
import Image from "next/image";

interface ProductReviewsProps {
  productId: string;
}

interface StarRatingProps {
  value: number;
  interactive?: boolean;
  onRate?: (rating: number) => void;
  size?: "sm" | "md" | "lg";
}

export default function ProductReviews({ productId }: ProductReviewsProps) {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [comment, setComment] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    fetchReviews();
  }, [productId]);

  const fetchReviews = async () => {
    try {
      setIsLoading(true);
      const data = await getProductReviews(productId);
      setReviews(data as Review[]);
    } catch (err) {
      console.error("Error fetching reviews:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async () => {
    setError("");
    setSuccess("");

    if (rating === 0) {
      setError("Please select a rating");
      return;
    }

    if (comment.trim().length < 10) {
      setError("Review must be at least 10 characters long");
      return;
    }

    try {
      setIsSubmitting(true);
      const newReview = await postProductReview(productId, rating, comment);
      setReviews([newReview as Review, ...reviews]);
      setRating(0);
      setComment("");
      setSuccess("Review posted successfully!");
      setTimeout(() => setSuccess(""), 3000);
    } catch (err: any) {
      setError(err.message || "Failed to post review");
    } finally {
      setIsSubmitting(false);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const calculateAverageRating = () => {
    if (reviews.length === 0) return 0;
    const sum = reviews.reduce((acc, review) => acc + review.rating, 0);
    return sum / reviews.length;
  };

  const getRatingDistribution = () => {
    const dist = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
    reviews.forEach((review) => {
      dist[review.rating as keyof typeof dist]++;
    });
    return dist;
  };

  const StarRating = ({
    value,
    interactive = false,
    onRate,
    size = "md",
  }: StarRatingProps) => {
    const sizeClasses = {
      sm: "w-4 h-4",
      md: "w-5 h-5",
      lg: "w-6 h-6",
    };

    return (
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            disabled={!interactive}
            onClick={() => interactive && onRate?.(star)}
            onMouseEnter={() => interactive && setHoveredRating(star)}
            onMouseLeave={() => interactive && setHoveredRating(0)}
            className={`${
              interactive ? "cursor-pointer hover:scale-110" : "cursor-default"
            } transition-all duration-200`}
          >
            <Star
              className={`${sizeClasses[size]} transition-all duration-200 ${
                star <= (interactive ? hoveredRating || rating : value)
                  ? "fill-amber-400 text-amber-400"
                  : "text-zinc-600 fill-zinc-600"
              }`}
            />
          </button>
        ))}
      </div>
    );
  };

  const avgRating = calculateAverageRating();
  const distribution = getRatingDistribution();

  return (
    <div className="mt-12 space-y-8">
      {/* Hero Stats Section */}
      <div className="bg-zinc-900/60 backdrop-blur-sm rounded-2xl p-6 md:p-8 border border-zinc-800">
        <div className="grid md:grid-cols-2 gap-8">
          {/* Left: Average Rating */}
          <div className="flex flex-col items-center justify-center text-center space-y-4">
            <div className="relative">
              <div className="absolute inset-0 bg-amber-400 blur-2xl opacity-10" />
              <div className="relative text-5xl md:text-6xl font-bold text-white">
                {avgRating.toFixed(1)}
              </div>
            </div>
            <StarRating value={Math.round(avgRating)} size="lg" />
            <div className="flex items-center gap-2 text-zinc-400">
              <MessageCircle className="w-4 h-4" />
              <span className="font-medium">{reviews.length} Reviews</span>
            </div>
          </div>

          {/* Right: Rating Distribution */}
          <div className="space-y-3">
            {[5, 4, 3, 2, 1].map((stars) => {
              const count = distribution[stars as keyof typeof distribution];
              const percentage =
                reviews.length > 0 ? (count / reviews.length) * 100 : 0;

              return (
                <div key={stars} className="flex items-center gap-3">
                  <div className="flex items-center gap-1 w-16">
                    <span className="text-sm font-medium text-zinc-300">
                      {stars}
                    </span>
                    <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                  </div>
                  <div className="flex-1 h-2 bg-zinc-800 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-amber-400 to-amber-500 rounded-full transition-all duration-500 ease-out"
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                  <span className="text-sm text-zinc-500 w-12 text-right">
                    {count}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Write a Review Card */}
      <div className="bg-zinc-900/60 backdrop-blur-sm rounded-2xl p-6 md:p-8 border border-zinc-800">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-emerald-500/20 rounded-lg border border-emerald-500/30">
            <Sparkles className="w-5 h-5 text-emerald-400" />
          </div>
          <h3 className="text-xl font-bold text-white">
            Share Your Experience
          </h3>
        </div>

        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-zinc-300 mb-3">
              Your Rating
            </label>
            <div className="flex items-center gap-4">
              <StarRating
                value={rating}
                interactive={true}
                onRate={setRating}
                size="lg"
              />
              {rating > 0 && (
                <span className="text-lg font-semibold text-amber-400 animate-in fade-in slide-in-from-left">
                  {["", "Poor", "Fair", "Good", "Great", "Excellent"][rating]}
                </span>
              )}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-zinc-300 mb-3">
              Your Review
            </label>
            <textarea
              rows={4}
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="w-full px-4 py-3 bg-zinc-800/50 border text-sm border-zinc-700 rounded-lg text-white placeholder:text-zinc-500 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/30 transition-all duration-200 resize-none"
              placeholder="Tell us what you think about this product..."
              maxLength={500}
            />
            <div className="mt-2 text-right text-sm text-zinc-500">
              {comment.length} / 500 characters
            </div>
          </div>

          {error && (
            <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-lg text-red-400 text-sm font-medium">
              {error}
            </div>
          )}

          {success && (
            <div className="p-4 bg-emerald-500/10 border border-emerald-500/30 rounded-lg text-emerald-400 text-sm font-medium flex items-center gap-2">
              <Award className="w-5 h-5" />
              {success}
            </div>
          )}

          <button
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="w-full py-3 bg-emerald-500 cursor-pointer hover:bg-emerald-400 disabled:bg-zinc-800 disabled:text-zinc-500 disabled:cursor-not-allowed text-black font-semibold text-sm rounded-lg transition-all duration-300 flex items-center justify-center gap-3"
          >
            {isSubmitting ? (
              <>
                <div className="w-5 h-5 border-2 border-zinc-900/30 border-t-white rounded-full animate-spin" />
                <span>Publishing...</span>
              </>
            ) : (
              <>
                <Send className="w-5 h-5" />
                <span>Publish Review</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Reviews List */}
      <div className="bg-zinc-900/60 backdrop-blur-sm rounded-2xl p-6 md:p-8 border border-zinc-800">
        <div className="flex items-center gap-3 mb-6">
          <TrendingUp className="w-5 h-5 text-emerald-400" />
          <h3 className="text-xl font-bold text-white">Customer Reviews</h3>
          <span className="ml-auto text-sm text-zinc-400">
            {reviews.length} reviews
          </span>
        </div>

        {isLoading ? (
          <div className="space-y-6">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="animate-pulse p-4 bg-zinc-800/30 rounded-lg"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-zinc-700 rounded-full" />
                  <div className="flex-1 space-y-3">
                    <div className="h-4 bg-zinc-700 rounded-full w-1/3" />
                    <div className="h-3 bg-zinc-700 rounded-full w-1/4" />
                    <div className="h-16 bg-zinc-700 rounded-lg" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : reviews.length === 0 ? (
          <div className="text-center py-12">
            <div className="inline-block p-4 bg-zinc-800/30 rounded-full mb-4">
              <MessageCircle className="w-10 h-10 text-zinc-600" />
            </div>
            <p className="text-zinc-400">
              No reviews yet. Be the first to share your thoughts!
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {reviews.map((review, index) => (
              <div
                key={review._id}
                className="p-4 bg-zinc-800/30 rounded-lg border border-zinc-800"
              >
                <div className="flex items-start gap-4">
                  <div className="relative">
                    {review.user?.avatar ? (
                      <Image
                        src={review.user.avatar}
                        alt={`${review.user.firstName} ${review.user.lastName}`}
                        width={48}
                        height={48}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                    ) : (
                      <div className="w-12 h-12 bg-gradient-to-br from-emerald-500/20 to-emerald-600/20 rounded-full flex items-center justify-center border border-emerald-500/30">
                        <User className="w-6 h-6 text-emerald-400" />
                      </div>
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                      <div>
                        <h4 className="font-semibold text-white text-base">
                          {review.user?.firstName && review.user?.lastName
                            ? `${review.user.firstName} ${review.user.lastName}`
                            : "Anonymous"}
                        </h4>
                        <p className="text-xs text-zinc-500">
                          {formatDate(review.createdAt)}
                        </p>
                      </div>
                      <StarRating value={review.rating} />
                    </div>

                    <p className="text-zinc-300 leading-relaxed">
                      {review.comment}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
