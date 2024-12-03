import React from "react";
import { useFeaturedProducts } from "../../context/FeaturedProductsContext";
import { ArrowLeft, ArrowRight, Star } from "lucide-react";

const FeaturedProducts = () => {
  const {
    products,
    activeIndex,
    sliderRef,
    selectedCategory,
    setSelectedCategory,
    handleNavigate,
  } = useFeaturedProducts();

  // Render stars for testimonial ratings
  const renderStars = (rating) => {
    return [...Array(5)].map((_, index) => (
      <Star
        key={index}
        size={14}
        className={index < rating ? 'fill-[#444] text-[#444]' : 'text-gray-300'}
      />
    ));
  };

  return (
    <div className="relative max-w-full mx-auto py-8 md:px-[120px] px-[20px]">
      {/* Header and category buttons */}
      <div className="flex flex-col md:flex-row justify-center items-start md:justify-between mb-6">
        <h2 className="text-lg md:text-3xl font-semibold mb-4 text-center mx-auto md:mx-0">Featured Products</h2>
        <div className="toggle-buttons flex gap-[15px] justify-center">
          {["cases", "chargers", "cables"].map((category) => (
            <button
              key={category}
              className={`uppercase text-dark border rounded-full py-[5px] px-[20px] font-bold text-[13px] ${
                selectedCategory === category ? "bg-[#6610f2] text-white" : ""
              }`}
              onClick={() => setSelectedCategory(category)}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Slider */}
      <div className="relative">
        {/* Previous button */}
        {activeIndex > 0 && (
          <button
            onClick={() => handleNavigate("prev")}
            className="absolute left-2 md:left-[100px] top-1/2 transform -translate-y-1/2 p-2 bg-white rounded-full shadow-md hover:bg-[#6610f2] hover:text-white"
          >
            <ArrowLeft size={15} />
          </button>
        )}

        {/* Product slider */}
        <div
          className="product-slider flex overflow-x-auto snap-x snap-mandatory gap-[20px] px-4"
          ref={sliderRef}
        >
          {products.map((product) => (
            <div
              key={product.id}
              className="snap-center text-center flex flex-col gap-[10px] relative shrink-0 w-[43vw] md:w-[24%] p-[20px] bg-[#F4F4F4] rounded-[15px]"
            >
              <img src={product.images[0]} alt={product.name} className="w-full rounded" />
              <span className="uppercase text-gray-600 text-[11px] font-bold">
                {product.category}
              </span>
              <h4 className="font-bold text-dark truncate w-full">{product.name}</h4>
              <div className="flex gap-1 mb-2 justify-center">{renderStars(product.rating || 4)}</div>
              <p className="font-bold text-dark">${product.price} - $30.00</p>
              <span className="bg-red-600 text-white uppercase text-[11px] py-[2px] px-[10px] absolute rounded-full">Hot</span>
              <button className="bg-white rounded-full p-[6px] border border-gray-400 w-fit absolute right-2">
                <ArrowRight size={15} />
              </button>
            </div>
          ))}
        </div>

        {/* Next button */}
        {activeIndex < products.length - 1 && (
          <button
            onClick={() => handleNavigate("next")}
            className="absolute right-2 md:right-[100px] top-1/2 transform -translate-y-1/2 p-2 bg-white rounded-full shadow-md hover:bg-[#6610f2] hover:text-white"
          >
            <ArrowRight size={15} />
          </button>
        )}
      </div>
    </div>
  );
};

export default FeaturedProducts;
