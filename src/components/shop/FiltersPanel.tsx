import { useState, useEffect } from 'react'
import { Slider } from '../ui/slider'
import { Checkbox } from '../ui/checkbox'
import { motion } from 'framer-motion'
import { Filter, Star } from 'lucide-react'

interface FiltersPanelProps {
  onFilterChange: (filters: any) => void;
  categories: string[];
}

export const FiltersPanel = ({ onFilterChange, categories }: FiltersPanelProps) => {
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000000])
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [selectedRatings, setSelectedRatings] = useState<number[]>([])
  const [showInStock, setShowInStock] = useState(false)

  const handleFilterChange = () => {
    onFilterChange({
      priceRange,
      categories: selectedCategories,
      rating: selectedRatings.length ? Math.max(...selectedRatings) : 0,
      inStock: showInStock
    });
  };

  const handleCategoryChange = (category: string) => {
    const updatedCategories = selectedCategories.includes(category)
      ? selectedCategories.filter(c => c !== category)
      : [...selectedCategories, category];
    setSelectedCategories(updatedCategories);
    setTimeout(handleFilterChange, 0);
  };

  const handleRatingChange = (rating: number) => {
    const updatedRatings = selectedRatings.includes(rating)
      ? selectedRatings.filter(r => r !== rating)
      : [...selectedRatings, rating];
    setSelectedRatings(updatedRatings);
    setTimeout(handleFilterChange, 0);
  };

  useEffect(() => {
    handleFilterChange();
  }, [priceRange, showInStock]);

  return (
    <motion.div
      initial={{ x: -20, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      className="bg-white p-6 rounded-lg shadow-lg space-y-6"
    >
      <div className="flex items-center gap-2 mb-6">
        <Filter className="h-5 w-5 text-indigo-600" />
        <h2 className="text-lg font-semibold">Filters</h2>
      </div>

      {/* Price Range */}
      <div className="space-y-4">
        <h3 className="font-medium">Price Range</h3>
        <Slider
          value={priceRange}
          min={0}
          max={1000000}
          step={1000}
          onChange={setPriceRange}
        />
        <div className="flex justify-between text-sm text-gray-600">
          <span>₦{priceRange[0].toLocaleString()}</span>
          <span>₦{priceRange[1].toLocaleString()}</span>
        </div>
      </div>

      {/* Categories */}
      <div className="space-y-3">
        <h3 className="font-medium">Categories</h3>
        <div className="space-y-2">
          {categories.map((category) => (
            <div key={category} className="flex items-center">
              <Checkbox
                checked={selectedCategories.includes(category)}
                onChange={() => handleCategoryChange(category)}
              />
              <label className="ml-2 text-sm text-gray-600">
                {category}
              </label>
            </div>
          ))}
        </div>
      </div>

      {/* Ratings */}
      <div className="space-y-3">
        <h3 className="font-medium">Rating</h3>
        <div className="space-y-2">
          {[5, 4, 3, 2, 1].map((rating) => (
            <div key={rating} className="flex items-center">
              <Checkbox
                checked={selectedRatings.includes(rating)}
                onChange={() => handleRatingChange(rating)}
              />
              <div className="ml-2 flex items-center">
                {[...Array(rating)].map((_, i) => (
                  <Star
                    key={i}
                    size={16}
                    className="fill-yellow-400 text-yellow-400"
                  />
                ))}
                {[...Array(5 - rating)].map((_, i) => (
                  <Star
                    key={i + rating}
                    size={16}
                    className="fill-gray-200 text-gray-200"
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Stock Status */}
      <div className="space-y-3">
        <h3 className="font-medium">Availability</h3>
        <div className="flex items-center">
          <Checkbox
            checked={showInStock}
            onChange={(checked) => {
              setShowInStock(checked);
            }}
          />
          <label className="ml-2 text-sm text-gray-600">
            In Stock Only
          </label>
        </div>
      </div>
    </motion.div>
  )
}
