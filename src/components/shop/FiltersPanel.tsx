"use client";

import { useState, useEffect } from "react";
import { Slider } from "../ui/slider";
import { Checkbox } from "../ui/checkbox";
import { Filter, Star, X } from "lucide-react";
import { Button } from "../ui/button";

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

export const FiltersPanel = ({
  onFilterChange,
  categories,
  initialCategories = [],
}: FiltersPanelProps) => {
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000000]);
  const [selectedCategories, setSelectedCategories] =
    useState<string[]>(initialCategories);
  const [selectedRatings, setSelectedRatings] = useState<number[]>([]);
  const [showInStock, setShowInStock] = useState(false);
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);

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

  const clearFilters = () => {
    setPriceRange([0, 1000000]);
    setSelectedCategories([]);
    setSelectedRatings([]);
    setShowInStock(false);
  };

  useEffect(() => {
    handleFilterChange();
  }, [selectedCategories, selectedRatings, priceRange, showInStock]);

  useEffect(() => {
    if (initialCategories.length > 0) {
      setSelectedCategories(initialCategories);
    }
  }, [initialCategories]);

  const filterContent = (
    <div className="space-y-8">
      {/* Categories */}
      <div>
        <h3 className="text-lg font-medium text-white mb-4 flex items-center justify-between">
          <span>Categories</span>
          {selectedCategories.length > 0 && (
            <span className="text-xs text-emerald-400 bg-emerald-500/10 px-2 py-1 rounded-full">
              {selectedCategories.length} selected
            </span>
          )}
        </h3>
        <div className="space-y-2 max-h-60 overflow-y-auto pr-2">
          {categories.map((category) => (
            <label
              key={category}
              className="flex items-center space-x-3 text-zinc-300 hover:text-white group cursor-pointer"
            >
              <Checkbox
                checked={selectedCategories.includes(category)}
                onChange={(checked: boolean) =>
                  handleCategoryChange(category, checked)
                }
                className="border-zinc-600 data-[state=checked]:bg-emerald-500 data-[state=checked]:border-emerald-500"
              />
              <span className="text-sm capitalize flex-1">{category}</span>
              <div
                className={`w-2 h-2 rounded-full transition-colors ${
                  selectedCategories.includes(category)
                    ? "bg-emerald-500"
                    : "bg-zinc-700 group-hover:bg-zinc-600"
                }`}
              />
            </label>
          ))}
        </div>
      </div>

      {/* Price Range */}
      <div>
        <h3 className="text-lg font-medium text-white mb-4">Price Range</h3>
        <div className="px-1">
          <Slider
            min={0}
            max={1000000}
            step={1000}
            value={priceRange}
            onChange={(value: [number, number]) => setPriceRange(value)}
            className="mt-2"
          />
          <div className="flex justify-between text-sm text-zinc-400 mt-3">
            <span>₦{priceRange[0].toLocaleString()}</span>
            <span>₦{priceRange[1].toLocaleString()}</span>
          </div>
        </div>
      </div>

      {/* Rating Filter */}
      <div>
        <h3 className="text-lg font-medium text-white mb-4">Rating</h3>
        <div className="space-y-3">
          {[5, 4, 3, 2, 1].map((rating) => (
            <div key={rating} className="flex items-center">
              <Checkbox
                checked={selectedRatings.includes(rating)}
                onChange={(checked: boolean) =>
                  handleRatingChange(rating, checked)
                }
                className="border-zinc-600 data-[state=checked]:bg-emerald-500 data-[state=checked]:border-emerald-500"
              />
              <div className="ml-3 flex items-center">
                {[...Array(rating)].map((_, i) => (
                  <Star
                    key={i}
                    size={16}
                    className="fill-amber-400 text-amber-400"
                  />
                ))}
                {[...Array(5 - rating)].map((_, i) => (
                  <Star
                    key={i + rating}
                    size={16}
                    className="fill-zinc-700 text-zinc-700"
                  />
                ))}
                <span className="ml-2 text-sm text-zinc-400">& up</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Availability */}
      <div>
        <label className="flex items-center space-x-3 text-zinc-300 hover:text-white cursor-pointer">
          <Checkbox
            checked={showInStock}
            onChange={(checked: boolean) => setShowInStock(checked)}
            className="border-zinc-600 data-[state=checked]:bg-emerald-500 data-[state=checked]:border-emerald-500"
          />
          <span className="text-sm">In Stock Only</span>
          {showInStock && (
            <span className="text-xs text-emerald-400 bg-emerald-500/10 px-2 py-1 rounded-full ml-auto">
              Active
            </span>
          )}
        </label>
      </div>

      {/* Clear Filters Button */}
      {(selectedCategories.length > 0 ||
        selectedRatings.length > 0 ||
        showInStock ||
        priceRange[0] > 0 ||
        priceRange[1] < 1000000) && (
        <Button
          onClick={clearFilters}
          variant="outline"
          className="w-full border-red-500/30 text-red-400 hover:text-red-300 hover:bg-red-500/10"
        >
          <X className="h-4 w-4 mr-2" />
          Clear All Filters
        </Button>
      )}
    </div>
  );

  return (
    <>
      {/* Desktop Filters */}
      <div className="hidden lg:block bg-zinc-900/60 backdrop-blur-sm border border-zinc-800 rounded-xl p-6">
        <div className="flex items-center gap-2 mb-6">
          <Filter className="h-5 w-5 text-emerald-400" />
          <h2 className="text-xl font-semibold text-white">Filters</h2>
        </div>
        {filterContent}
      </div>

      {/* Mobile Filters Button */}
      <Button
        onClick={() => setIsMobileFiltersOpen(true)}
        className="lg:hidden w-full bg-zinc-800 border border-zinc-700 hover:bg-zinc-700 text-white mb-4"
      >
        <Filter className="h-4 w-4 mr-2" />
        Filters
        {(selectedCategories.length > 0 ||
          selectedRatings.length > 0 ||
          showInStock ||
          priceRange[0] > 0 ||
          priceRange[1] < 1000000) && (
          <span className="ml-auto text-xs bg-emerald-500/20 text-emerald-400 px-2 py-1 rounded-full">
            Active
          </span>
        )}
      </Button>

      {/* Mobile Filters Modal */}
      {isMobileFiltersOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="absolute inset-0 bg-black/70"
            onClick={() => setIsMobileFiltersOpen(false)}
          />
          <div className="absolute inset-y-0 right-0 w-full max-w-sm bg-zinc-900 border-l border-zinc-800 overflow-y-auto">
            <div className="sticky top-0 bg-zinc-900 border-b border-zinc-800 p-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Filter className="h-5 w-5 text-emerald-400" />
                <h2 className="text-xl font-semibold text-white">Filters</h2>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsMobileFiltersOpen(false)}
                className="text-zinc-400 hover:text-white"
              >
                <X className="h-5 w-5" />
              </Button>
            </div>
            <div className="p-6">{filterContent}</div>
          </div>
        </div>
      )}
    </>
  );
};
