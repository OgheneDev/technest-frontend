import { Star } from 'lucide-react'

interface StarRatingProps {
  rating: number
  maxRating?: number
}

export const StarRating = ({ rating, maxRating = 5 }: StarRatingProps) => {
  return (
    <div className="flex items-center gap-1">
      {[...Array(maxRating)].map((_, i) => (
        <Star
          key={i}
          className={`h-4 w-4 ${
            i < rating
              ? 'fill-yellow-400 text-yellow-400'
              : 'fill-gray-200 text-gray-200'
          }`}
        />
      ))}
      <span className="text-sm text-gray-600 ml-1">{rating.toFixed(1)}</span>
    </div>
  )
}
