import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useWishlist } from '../../context/WishlistContext';
import QuickViewModal from '../ShopPage/QuickViewModal';
import { Star, Heart, ArrowLeft, ArrowRight, Search } from 'lucide-react';

const RelatedProducts = ({ products }) => {
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const [activeIndex, setActiveIndex] = useState(0);
  const [isQuickViewModalOpen, setIsQuickViewModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const sliderRef = useRef(null);

  const handleNavigate = (direction) => {
    if (!sliderRef.current || products.length === 0) return;

    const container = sliderRef.current;
    const cardWidth = container.offsetWidth / (window.innerWidth >= 1024 ? 4 : 2);
    let nextIndex = activeIndex;

    if (direction === 'next' && activeIndex < products.length - 1) {
      nextIndex += 1;
    } else if (direction === 'prev' && activeIndex > 0) {
      nextIndex -= 1;
    }

    container.scrollTo({
      left: cardWidth * nextIndex,
      behavior: 'smooth',
    });

    setActiveIndex(nextIndex);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (!sliderRef.current) return;

      const container = sliderRef.current;
      const scrollPosition = container.scrollLeft;
      const cardWidth = container.offsetWidth / (window.innerWidth >= 1024 ? 4 : 2);
      const currentIndex = Math.round(scrollPosition / cardWidth);

      setActiveIndex(currentIndex);
    };

    const container = sliderRef.current;
    container?.addEventListener('scroll', handleScroll);

    return () => {
      container?.removeEventListener('scroll', handleScroll);
    };
  }, []);

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
  };

  const closeQuickView = () => {
    setSelectedProduct(null);
    setIsQuickViewModalOpen(false);
  };

  return (
    <div className="py-[30px]">
      <h2 className="text-3xl font-bold text-grey-dark mb-[30px]">Related Products</h2>

      <div className="relative">
        {/* Conditionally render Previous button */}
        {activeIndex > 0 && (
          <button
            onClick={() => handleNavigate('prev')}
            className="z-[1000] absolute left-2 md:left-0 top-1/2 transform -translate-y-1/2 p-2 bg-white rounded-full shadow-md hover:bg-[#6610f2] hover:text-white"
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
              className="snap-center cursor-pointer bg-[#F4F4F4] w-[50%] md:w-[250px] shrink-0 mx-auto p-[20px] text-center flex flex-col gap-[10px] rounded-[15px] relative group"
            >
              <img src={product.images[0]} alt={product.name} />
              <span className="uppercase text-[13px] text-[#999999]">{product.category}</span>
              <h2 className="text-xl font-bold text-[#222529] truncate w-full">{product.name}</h2>
              <div className="flex gap-1 mb-2 justify-center">{renderStars(product.rating || 4)}</div>
              <p className="text-[#444] font-bold text-xl">${product.price.toFixed(2)}</p>

              {/* Product Options */}
              <div className="options hidden md:flex flex-col gap-[15px] absolute right-[25px] opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div
                  onClick={() =>
                    isInWishlist(product.id)
                      ? removeFromWishlist(product.id)
                      : addToWishlist(product)
                  }
                  className={`bg-white py-[15px] cursor-pointer rounded-full w-[50px] h-[50px] flex justify-center hover:text-white hover:bg-black transition-all ease-in-out duration-[.3s] ${
                    isInWishlist(product.id) ? 'text-red-500' : ''
                  }`}
                >
                  <Heart size={22} />
                </div>
                <div
                  onClick={() => handleQuickView(product)}
                  className="bg-white py-[15px] cursor-pointer rounded-full w-[50px] h-[50px] flex justify-center hover:text-white hover:bg-black transition-all ease-in-out duration-[.3s]"
                >
                  <Search size={22} />
                </div>
                <Link to={`/product/${product.id}`}>
                  <div className="bg-white py-[15px] cursor-pointer rounded-full w-[50px] h-[50px] flex justify-center hover:text-white hover:bg-black transition-all ease-in-out duration-[.3s]">
                    <ArrowRight size={22} />
                  </div>
                </Link>
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

        {/* Conditionally render Next button */}
        {activeIndex < products.length - 1 && (
          <button
            onClick={() => handleNavigate('next')}
            className="z-[100] absolute right-2 md:right-0 top-1/2 transform -translate-y-1/2 p-2 bg-white rounded-full shadow-md hover:bg-[#6610f2] hover:text-white"
          >
            <ArrowRight size={15} />
          </button>
        )}
      </div>

      {/* Render QuickViewModal */}
      {isQuickViewModalOpen && <QuickViewModal product={selectedProduct} onClose={closeQuickView} />}
    </div>
  );
};

export default RelatedProducts;
