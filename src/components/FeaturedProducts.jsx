import React, { useEffect, useState } from 'react';
import { useFeaturedProducts } from '../context/FeaturedProductsContext';
import { ArrowLeft, ArrowRight } from 'lucide-react';

const FeaturedProducts = () => {
  const {
    products,
    fetchFeaturedProducts,
    currentSlide,
    itemsPerSlide,
    nextSlide,
    prevSlide,
    handleTouchStart,
    handleTouchMove,
    handleTouchEnd,
    loading, // Fetch loading status from context
  } = useFeaturedProducts();

  const [selectedCategory, setSelectedCategory] = useState('cases');

  // Fetch products whenever the selected category changes
  useEffect(() => {
    fetchFeaturedProducts(selectedCategory);
  }, [selectedCategory]);

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  // Calculate the maximum slide index dynamically
  const maxSlideIndex = Math.max(0, Math.ceil(products.length / itemsPerSlide) - 1);

  return (
    <div
      className="relative max-w-full mx-auto py-8 md:px-[120px] px-[20px]"
      onMouseDown={handleTouchStart}
      onMouseMove={handleTouchMove}
      onMouseUp={handleTouchEnd}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Header and category toggle buttons */}
      <div className="flex flex-col md:flex-row items-start md:justify-between mb-6">
        <h2 className="text-lg md:text-3xl font-semibold mb-4 text-center">Featured Products</h2>
        <div className="toggle-buttons flex gap-[15px] justify-center">
          {['cases', 'chargers', 'cables'].map((category) => (
            <button
              key={category}
              className={`uppercase text-dark border rounded-full py-[5px] px-[20px] font-bold text-[13px] ${
                selectedCategory === category ? 'bg-[#6610f2] text-white' : ''
              }`}
              onClick={() => handleCategoryChange(category)}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Slider wrapper */}
      <div className="slider-wrapper overflow-hidden relative">
        <div
          className="product-list slider-inner flex py-[30px] gap-[10px] transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${currentSlide * (100 / itemsPerSlide)}%)` }}
        >
          {/* Render skeletons if loading, or products if loaded */}
          {loading
            ? Array.from({ length: itemsPerSlide }).map((_, index) => (
                <div
                  key={index}
                  className="skeleton-item flex flex-col gap-[20px] border items-center bg-gray-200 animate-pulse rounded shadow-md p-4 flex-shrink-0"
                  style={{ width: `${100 / itemsPerSlide}%` }}
                >
                  <div className="w-[80%] h-[150px] bg-gray-300 rounded"></div>
                  <div className="w-[60%] h-[20px] bg-gray-300 rounded"></div>
                  <div className="w-[40%] h-[20px] bg-gray-300 rounded"></div>
                </div>
              ))
            : products.length > 0
            ? products.map((product) => (
                <div
                  key={product.id}
                  className="product-item flex flex-col gap-[20px] border items-center bg-white rounded shadow-md p-4 flex-shrink-0 text-center"
                  style={{ width: `${100 / itemsPerSlide}%` }}
                >
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    className="w-[100%]"
                  />
                  <span className="uppercase text-gray-600 text-[11px] font-bold">
                    {product.category}
                  </span>
                  <h4 className="font-bold text-dark">{product.name}</h4>
                  <p className="font-bold text-dark">{product.price}</p>
                </div>
              ))
            : (
              <p>No products found for this category.</p>
            )}
        </div>
      </div>

      {/* Navigation arrows */}
      {currentSlide > 0 && (
        <button
          onClick={prevSlide}
          className="absolute left-2 md:left-[100px] top-1/2 transform -translate-y-1/2 p-2 bg-white rounded-full shadow-md hover:bg-[#6610f2] hover:text-white"
        >
          <ArrowLeft size={15} />
        </button>
      )}
      {currentSlide < maxSlideIndex && (
        <button
          onClick={nextSlide}
          className="absolute right-2 md:right-[100px] top-1/2 transform -translate-y-1/2 p-2 bg-white rounded-full shadow-md hover:bg-[#6610f2] hover:text-white"
        >
          <ArrowRight size={15} />
        </button>
      )}
    </div>
  );
};

export default FeaturedProducts;
