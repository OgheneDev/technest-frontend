import React from "react";
import { motion } from "framer-motion";
import { useFeaturedProducts } from "../../context/FeaturedProductsContext";
import { ArrowLeft, ArrowRight, Star } from "lucide-react";

const FeaturedProducts = () => {
  const {
    products = [],
    activeIndex,
    sliderRef,
    selectedCategory,
    setSelectedCategory,
    handleNavigate,
    loading,
    error,
  } = useFeaturedProducts();

  const categories = ["cases", "chargers", "cables"];

  // Render star ratings
  const renderStars = (rating = 4) =>
    [...Array(5)].map((_, i) => (
      <Star key={i} size={14} className={i < rating ? "text-[#444]" : "text-gray-300"} />
    ));

  return (
    <div className="relative max-w-full mx-auto py-8 md:px-[120px] px-[20px]">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between mb-6">
        <h2 className="text-lg md:text-3xl font-semibold mb-4">Featured Products</h2>
        <div className="toggle-buttons flex gap-[15px]">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`uppercase text-dark border rounded-full py-[5px] px-[20px] font-bold ${
                selectedCategory === category ? "bg-[#6610f2] text-white" : ""
              }`}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="relative">
        {loading ? (
          <div>Loading...</div>
        ) : error ? (
          <div className="text-red-500">{error}</div>
        ) : products.length === 0 ? (
          <div>No products found in {selectedCategory} category.</div>
        ) : (
          <div
            className="product-slider flex overflow-x-auto gap-6 snap-x snap-mandatory"
            ref={sliderRef}
          >
            {products.map((product) => (
              <div
                key={product.id}
                className="snap-center text-center bg-gray-100 p-4 rounded-lg w-[250px]"
              >
                <img
                  src={product.images?.[0] || ""}
                  alt={product.name}
                  className="rounded w-full mb-2"
                />
                <p className="uppercase text-gray-500 text-xs">{product.category}</p>
                <h4 className="font-bold text-lg truncate">{product.name}</h4>
                <div className="flex justify-center my-2">{renderStars(product.rating)}</div>
                <p className="text-xl font-bold">${product.price}</p>
              </div>
            ))}
          </div>
        )}

        {/* Navigation */}
        {activeIndex > 0 && (
          <button onClick={() => handleNavigate("prev")} className="absolute left-0 top-1/2 bg-white rounded-full p-2 hover:bg-[#6610f2] hover:text-white transition-all duration-300">
            <ArrowLeft />
          </button>
        )}
        {activeIndex < products.length - 1 && (
          <button onClick={() => handleNavigate("next")} className="absolute right-0 top-1/2 bg-white rounded-full p-2 hover:bg-[#6610f2] hover:text-white transition-all duration-300">
            <ArrowRight />
          </button>
        )}
      </div>
    </div>
  );
};

export default FeaturedProducts;
