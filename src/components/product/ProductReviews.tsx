"use client"

import { useState, useEffect } from 'react'
import { Star, Send, User, TrendingUp, MessageCircle, Award, Sparkles } from 'lucide-react'
import { getProductReviews, postProductReview } from '@/api/products/requests'
import { Review } from '@/types/products'
import Image from 'next/image'

interface ProductReviewsProps {
  productId: string
}

interface StarRatingProps {
  value: number
  interactive?: boolean
  onRate?: (rating: number) => void
  size?: 'sm' | 'md' | 'lg'
}

export default function ProductReviews({ productId }: ProductReviewsProps) {
  const [reviews, setReviews] = useState<Review[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [rating, setRating] = useState(0)
  const [hoveredRating, setHoveredRating] = useState(0)
  const [comment, setComment] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  useEffect(() => {
    fetchReviews()
  }, [productId])

  const fetchReviews = async () => {
    try {
      setIsLoading(true)
      const data = await getProductReviews(productId)
      setReviews(data as Review[])
    } catch (err) {
      console.error('Error fetching reviews:', err)
    } finally {
      setIsLoading(false)
    }
  }

  const handleSubmit = async () => {
    setError('')
    setSuccess('')

    if (rating === 0) {
      setError('Please select a rating')
      return
    }

    if (comment.trim().length < 10) {
      setError('Review must be at least 10 characters long')
      return
    }

    try {
      setIsSubmitting(true)
      const newReview = await postProductReview(productId, rating, comment)
      setReviews([newReview as Review, ...reviews])
      setRating(0)
      setComment('')
      setSuccess('Review posted successfully!')
      setTimeout(() => setSuccess(''), 3000)
    } catch (err: any) {
      setError(err.message || 'Failed to post review')
    } finally {
      setIsSubmitting(false)
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }

  const calculateAverageRating = () => {
    if (reviews.length === 0) return 0
    const sum = reviews.reduce((acc, review) => acc + review.rating, 0)
    return sum / reviews.length
  }

  const getRatingDistribution = () => {
    const dist = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 }
    reviews.forEach(review => {
      dist[review.rating as keyof typeof dist]++
    })
    return dist
  }

  const StarRating = ({ value, interactive = false, onRate, size = 'md' }: StarRatingProps) => {
    const sizeClasses = {
      sm: 'w-4 h-4',
      md: 'w-5 h-5',
      lg: 'w-7 h-7'
    }

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
            className={`${interactive ? 'cursor-pointer' : 'cursor-default'} transition-all duration-200 ${
              interactive ? 'hover:scale-125' : ''
            }`}
          >
            <Star
              className={`${sizeClasses[size]} transition-all duration-200 ${
                star <= (interactive ? (hoveredRating || rating) : value)
                  ? 'fill-yellow-400 text-yellow-400 drop-shadow-[0_0_8px_rgba(250,204,21,0.5)]'
                  : 'text-white/20'
              }`}
            />
          </button>
        ))}
      </div>
    )
  }

  const avgRating = calculateAverageRating()
  const distribution = getRatingDistribution()

  return (
    <div className="mt-12 space-y-6">
      {/* Hero Stats Section */}
      <div className="relative overflow-hidden bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 via-cyan-400/5 to-cyan-500/5 animate-pulse" />
        
        <div className="relative grid md:grid-cols-2 gap-8">
          {/* Left: Average Rating */}
          <div className="flex flex-col items-center justify-center text-center space-y-4">
            <div className="relative">
              <div className="absolute inset-0 bg-yellow-400 blur-2xl opacity-20 animate-pulse" />
              <div className="relative text-7xl font-black text-white">
                {avgRating.toFixed(1)}
              </div>
            </div>
            <StarRating value={Math.round(avgRating)} size="lg" />
            <div className="flex items-center gap-2 text-white/70">
              <MessageCircle className="w-4 h-4" />
              <span className="font-medium">{reviews.length} Reviews</span>
            </div>
          </div>

          {/* Right: Rating Distribution */}
          <div className="space-y-3">
            {[5, 4, 3, 2, 1].map((stars) => {
              const count = distribution[stars as keyof typeof distribution]
              const percentage = reviews.length > 0 ? (count / reviews.length) * 100 : 0
              
              return (
                <div key={stars} className="flex items-center gap-3">
                  <div className="flex items-center gap-1 w-16">
                    <span className="text-sm font-medium text-white/70">{stars}</span>
                    <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                  </div>
                  <div className="flex-1 h-2.5 bg-white/5 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-full transition-all duration-500 ease-out"
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                  <span className="text-sm text-white/50 w-12 text-right">{count}</span>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* Write a Review Card */}
      <div className="relative group">
        <div className="absolute -inset-0.5 rounded-2xl blur opacity-20 group-hover:opacity-30 transition duration-500" />
        <div className="relative bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-cyan-500/20 rounded-xl border border-cyan-500/30">
              <Sparkles className="w-5 h-5 text-cyan-400" />
            </div>
            <h3 className="text-xl md:text-2xl font-bold text-white">
              Share Your Experience
            </h3>
          </div>

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-white/80 mb-3">
                Your Rating
              </label>
              <div className="flex items-center gap-4">
                <StarRating value={rating} interactive={true} onRate={setRating} size="lg" />
                {rating > 0 && (
                  <span className="text-lg font-bold text-yellow-400 animate-in fade-in slide-in-from-left">
                    {['', 'Poor', 'Fair', 'Good', 'Great', 'Excellent'][rating]}
                  </span>
                )}
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-white/80 mb-3">
                Your Review
              </label>
              <textarea
                rows={4}
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                className="w-full px-5 py-4 bg-white/5 border text-sm border-white/10 rounded-xl text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all duration-300 resize-none"
                placeholder="Tell us what you loved (or didn't)..."
              />
              <div className="mt-2 text-right text-sm text-white/50">
                {comment.length} / 500 characters
              </div>
            </div>

            {error && (
              <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-xl text-red-400 text-sm font-medium animate-in slide-in-from-top">
                {error}
              </div>
            )}

            {success && (
              <div className="p-4 bg-green-500/10 border border-green-500/30 rounded-xl text-green-400 text-sm font-medium flex items-center gap-2 animate-in slide-in-from-top">
                <Award className="w-5 h-5" />
                {success}
              </div>
            )}

            <button
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="w-full py-4 bg-cyan-500 text-sm cursor-pointer hover:bg-cyan-600 disabled:bg-white/5 disabled:cursor-not-allowed text-white font-bold rounded-xl transition-all duration-300 flex items-center justify-center gap-3 shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/40 hover:scale-[1.02] active:scale-[0.98]"
            >
              {isSubmitting ? (
                <>
                  <div className="w-5 h-5 border-3 border-white/30 border-t-white rounded-full animate-spin" />
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
      </div>

      {/* Reviews List */}
      <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
        <div className="flex items-center gap-3 mb-8">
          <TrendingUp className="w-6 h-6 text-cyan-400" />
          <h3 className="text-xl md:text-2xl font-bold text-white">Community Reviews</h3>
        </div>
        
        {isLoading ? (
          <div className="space-y-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="animate-pulse p-6 bg-white/5 rounded-xl">
                <div className="flex items-start gap-4">
                  <div className="w-14 h-14 bg-white/10 rounded-full" />
                  <div className="flex-1 space-y-3">
                    <div className="h-4 bg-white/10 rounded-full w-1/3" />
                    <div className="h-3 bg-white/10 rounded-full w-1/4" />
                    <div className="h-20 bg-white/10 rounded-xl" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : reviews.length === 0 ? (
          <div className="text-center py-16">
            <div className="inline-block p-4 bg-white/5 rounded-full mb-4">
              <MessageCircle className="w-12 h-12 text-white/30" />
            </div>
            <p className="text-white/50 text-lg">No reviews yet. Be the first to share your thoughts!</p>
          </div>
        ) : (
          <div className="space-y-4">
            {reviews.map((review, index) => (
              <div
                key={review._id}
                className="group p-6 bg-white/5 hover:bg-white/10 rounded-xl border border-white/10 hover:border-white/20 transition-all duration-300"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex items-start gap-4">
                  <div className="relative">
                    {review.user?.avatar ? (
                      <Image
                        src={review.user.avatar}
                        alt={`${review.user.firstName} ${review.user.lastName}`}
                        width={50}
                        height={50}
                        className="w-14 h-14 rounded-full object-cover flex-shrink-0 group-hover:scale-110 transition-transform duration-300"
                      />
                    ) : (
                      <div className="w-14 h-14 bg-gradient-to-br from-cyan-500 to-cyan-600 rounded-full flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                        <User className="w-7 h-7 text-white" />
                      </div>
                    )}
                    <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-2 border-gray-900 flex items-center justify-center">
                      <span className="text-xs">✓</span>
                    </div>
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex flex-col md:flex-row items-start justify-between gap-4 mb-3">
                      <div>
                        <h4 className="font-bold text-white text-lg truncate">
                          {review.user?.firstName && review.user?.lastName
                            ? `${review.user.firstName} ${review.user.lastName}`
                            : 'Anonymous'}
                        </h4>
                        <p className="text-sm text-white/50">{formatDate(review.createdAt)}</p>
                      </div>
                      <StarRating value={review.rating} />
                    </div>
                    
                    <p className="text-white/70 leading-relaxed mb-4">{review.comment}</p>
                    
                    <div className="flex items-center gap-4 text-sm text-white/50">
                      <button className="flex items-center gap-1.5 hover:text-cyan-400 transition-colors">
                        <span>Was this helpful?</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}