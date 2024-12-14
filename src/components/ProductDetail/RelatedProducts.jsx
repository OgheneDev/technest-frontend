import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useWishlist } from '../../context/WishlistContext';
import QuickViewModal from '../ShopPage/QuickViewModal';
import { Star, Heart, MoveRight, Search, ArrowLeft, ArrowRight } from 'lucide-react';

const RelatedProducts = ({ products }) => {
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const [activeIndex, setActiveIndex] = useState(0);
  const [isQuickViewModalOpen, setIsQuickViewModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
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

  const handleQuickView = (product) => {
    setSelectedProduct(product);
    setIsQuickViewModalOpen(true);
  }

  const closeQuickView = () => {
    setSelectedProduct(null);
    setIsQuickViewModalOpen(false);
  }

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
          className="z-[1000] absolute left-2 md:left-0 top-1/2 transform -translate-y-1/2 p-2 bg-white rounded-full shadow-md hover:bg-[#6610f2] hover:text-white"
          style={{ zIndex: 1000 }} // Inline style as an extra measure
        >
          <ArrowLeft size={15} />
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
              className="product-item bg-[#F4F4F4] w-[50%] md:w-[250px] shrink-0 mx-auto p-[20px] text-center flex flex-col gap-[10px] rounded-[15px] relative group"
            >
              <img src={product.images[0]} alt={product.name} />
              <span className="uppercase text-[13px] text-[#999999]">{product.category}</span>
              <h2 className="text-xl font-bold text-[#222529] truncate w-full">{product.name}</h2>
              <div className="flex gap-1 mb-2 justify-center">{renderStars(product.rating || 4)}</div>
              <p className="text-[#444] font-bold text-xl">${product.price.toFixed(2)}</p>
              
              {/* Product Options (matching ProductList) */}
              <div className="options hidden md:flex flex-col gap-[15px] absolute right-[25px] opacity-0 group-hover:opacity-100 transition-opacity duration-300">
               <div 
                  onClick={() => isInWishlist(product.id) 
                    ? removeFromWishlist(product.id) 
                    : addToWishlist(product)
                  }
                    className={`bg-white py-[15px] cursor-pointer rounded-full w-[50px] h-[50px] flex justify-center hover:text-white hover:bg-black transition-all ease-in-out duration-[.3s] 
                      ${isInWishlist(product.id) ? 'text-red-500' : ''}`}
                    >
                      <Heart size={22} />
                </div>
                <div className="bg-white py-[15px] cursor-pointer rounded-full w-[50px] h-[50px] flex justify-center hover:text-white hover:bg-black transition-all ease-in-out duration-[.3s]">
                  <MoveRight size={22} />
                </div>
                <div 
                  onClick={() => handleQuickView(product)}
                  className="bg-white py-[15px] cursor-pointer rounded-full w-[50px] h-[50px] flex justify-center hover:text-white hover:bg-black transition-all ease-in-out duration-[.3s]">
                    <Search size={22} />
                </div>
              </div>
              <button
               className="bg-white md:hidden rounded-full p-[6px] border border-gray-400 w-fit absolute right-2"
              >
                <Link to={`/product/${product.id}`}>
                  <ArrowRight size={15} />
                </Link>
              </button>
            </div>
          ))}
        </div>

        {/* Next button */}
        <button 
          onClick={() => handleNavigate('next')}
          disabled={activeIndex >= products.length - 4}
          className="z-[100] absolute right-2 md:right-0 top-1/2 transform -translate-y-1/2 p-2 bg-white rounded-full shadow-md hover:bg-[#6610f2] hover:text-white"
          style={{ zIndex: 100 }} // Inline style as an extra measure
        >
           <ArrowRight size={15} />
        </button>
      </div>
      {/* Render QuickViewModal */}
      {isQuickViewModalOpen && (
        <QuickViewModal product={selectedProduct} onClose={closeQuickView} />
      )}
    </div>
  );
};

export default RelatedProducts;