import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Star, Heart, MoveRight, Search } from 'lucide-react';
import { Link } from 'react-router-dom';

const RelatedProducts = ({ products }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const sliderRef = useRef(null);

  const handleNavigate = (direction) => {
    const container = sliderRef.current;
    if (!container) return;

    // Calculate total width of all products
    const cardWidth = container.querySelector('.product-item')?.offsetWidth || 250;
    const totalWidth = cardWidth * products.length;
    const visibleWidth = container.offsetWidth;
    
    const scrollAmount = cardWidth;
    let nextIndex = activeIndex;

    if (direction === 'next' && (activeIndex + 4) * cardWidth < totalWidth - visibleWidth) {
      nextIndex += 1;
    } else if (direction === 'prev' && activeIndex > 0) {
      nextIndex -= 1;
    }

    container.scrollTo({ 
      left: nextIndex * scrollAmount, 
      behavior: 'smooth' 
    });
    setActiveIndex(nextIndex);
  };

  // Render stars for ratings (matching ProductList)
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
    <div className="py-[30px]">
      <h2 className="text-3xl font-bold text-grey-dark mb-[30px]">
        Related Products
      </h2>

      <div className="relative">
        {/* Previous button */}
        <button 
          onClick={() => handleNavigate('prev')}
          disabled={activeIndex === 0}
          className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 px-3 py-2 bg-white border rounded-full disabled:opacity-50"
        >
          {'<'}
        </button>

        {/* Product slider */}
        <div 
          className="product-slider flex overflow-x-auto gap-[20px] scrollbar-hidden"
          ref={sliderRef}
          style={{ 
            scrollSnapType: 'x mandatory', 
            WebkitOverflowScrolling: 'touch',
            scrollBehavior: 'smooth'
          }}
        >
          {products.map((product) => (
            <div
              key={product.id}
              className="product-item bg-[#F4F4F4] w-[60%] md:w-[250px] shrink-0 mx-auto p-[20px] text-center flex flex-col gap-[10px] rounded-[15px] relative group"
            >
              <img src={product.images[0]} alt={product.name} />
              <span className="uppercase text-[13px] text-[#999999]">{product.category}</span>
              <h2 className="text-xl font-bold text-[#222529] truncate w-full">{product.name}</h2>
              <div className="flex gap-1 mb-2 justify-center">{renderStars(product.rating || 4)}</div>
              <p className="text-[#444] font-bold text-xl">${product.price.toFixed(2)}</p>
              
              {/* Product Options (matching ProductList) */}
              <div className="options flex flex-col gap-[15px] absolute right-[25px] opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="bg-white py-[15px] cursor-pointer rounded-full w-[50px] h-[50px] flex justify-center hover:text-white hover:bg-black transition-all ease-in-out duration-[.3s]">
                  <Heart size={22} />
                </div>
                <div className="bg-white py-[15px] cursor-pointer rounded-full w-[50px] h-[50px] flex justify-center hover:text-white hover:bg-black transition-all ease-in-out duration-[.3s]">
                  <MoveRight size={22} />
                </div>
                <div className="bg-white py-[15px] cursor-pointer rounded-full w-[50px] h-[50px] flex justify-center hover:text-white hover:bg-black transition-all ease-in-out duration-[.3s]">
                  <Search size={22} />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Next button */}
        <button 
          onClick={() => handleNavigate('next')}
          disabled={activeIndex >= products.length - 4}
          className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 px-3 py-2 bg-white border rounded-full disabled:opacity-50"
        >
          {'>'}
        </button>
      </div>
    </div>
  );
};

export default RelatedProducts;