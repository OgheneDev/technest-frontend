"use client";

import { useState, useEffect } from 'react';
import { Slider } from '../ui/slider';
import { Checkbox } from '../ui/checkbox';
import { Filter, Star } from 'lucide-react';

interface FiltersPanelProps {
  onFilterChange: (filters: {
    categories: string[];
    priceRange: [number, number];
    rating: number;
    inStock: boolean;
  }) => void;
  categories: string[];
  initialCategories?: string[];
}

export const FiltersPanel = ({ onFilterChange, categories, initialCategories = [] }: FiltersPanelProps) => {
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000000]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>(initialCategories);
  const [selectedRatings, setSelectedRatings] = useState<number[]>([]);
  const [showInStock, setShowInStock] = useState(false);

  const handleFilterChange = () => {
    onFilterChange({
      priceRange,
      categories: selectedCategories,
      rating: selectedRatings.length ? Math.max(...selectedRatings) : 0,
      inStock: showInStock,
    });
  };

  const handleCategoryChange = (category: string, checked: boolean) => {
    const updatedCategories = checked
      ? [...new Set([...selectedCategories, category])]
      : selectedCategories.filter((c) => c !== category);
    setSelectedCategories(updatedCategories);
  };

  const handleRatingChange = (rating: number, checked: boolean) => {
    const updatedRatings = checked
      ? [...new Set([...selectedRatings, rating])]
      : selectedRatings.filter((r) => r !== rating);
    setSelectedRatings(updatedRatings);
  };

  useEffect(() => {
    handleFilterChange();
  }, [selectedCategories, selectedRatings, priceRange, showInStock]);

  useEffect(() => {
    if (initialCategories.length > 0) {
      setSelectedCategories(initialCategories);
    }
  }, [initialCategories]);

  return (
    <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg p-6">
      <h2 className="text-xl font-semibold mb-6 text-white">Filters</h2>

      {/* Categories */}
      <div className="space-y-4 mb-8">
        <h3 className="text-lg font-medium text-white/90">Categories</h3>
        <div className="space-y-2">
          {categories.map((category) => (
            <label key={category} className="flex items-center space-x-2 text-white/70 hover:text-white">
              <Checkbox
                checked={selectedCategories.includes(category)}
                onChange={(checked: boolean) => handleCategoryChange(category, checked)}
              />
              <span className="text-sm">{category}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Price Range */}
      <div className="space-y-4 mb-8">
        <h3 className="text-lg font-medium text-white/90">Price Range</h3>
        <Slider
          min={0}
          max={1000000}
          value={priceRange}
          onChange={(value: [number, number]) => setPriceRange(value)}
          className="mt-2"
        />
        <div className="flex justify-between text-sm text-white/70">
          <span>₦{priceRange[0].toLocaleString()}</span>
          <span>₦{priceRange[1].toLocaleString()}</span>
        </div>
      </div>

      {/* Rating Filter */}
      <div className="space-y-4 mb-8">
        <h3 className="text-lg font-medium text-white/90">Rating</h3>
        <div className="space-y-2">
          {[5, 4, 3, 2, 1].map((rating) => (
            <div key={rating} className="flex items-center">
              <Checkbox
                checked={selectedRatings.includes(rating)}
                onChange={(checked: boolean) => handleRatingChange(rating, checked)}
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

      {/* Availability */}
      <div className="space-y-4">
        <label className="flex items-center space-x-2 text-white/70 hover:text-white">
          <Checkbox
            checked={showInStock}
            onChange={(checked: boolean) => setShowInStock(checked)}
          />
          <span className="text-sm">In Stock Only</span>
        </label>
      </div>
    </div>
  );
};