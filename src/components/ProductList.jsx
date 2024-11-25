import React, { useEffect } from 'react';
import { useFetchedProducts } from '../context/FetchProducts';
import { Star, Heart, MoveRight, Search } from 'lucide-react';

const ProductList = () => {
  const { products, loading, fetchProducts } = useFetchedProducts();

  useEffect(() => {
    fetchProducts();
  }, []);

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
    <div className='px-[20px]'>
      <div className="product-list flex flex-wrap gap-[30px]">
        {loading ? (
          // Render skeletons while loading
          Array.from({ length: 6 }).map((_, index) => (
            <div key={index} className="product-skeleton w-[90%] p-[20px] h-[380px] mx-auto bg-[#f4f4f4]">
              {/* Placeholder for skeleton */}
              <div className="skeleton-image w-[100%] bg-gray-300 h-[200px] mb-[20px]"></div>
              <div className="skeleton-category w-[30%] mx-auto bg-gray-300 h-[20px] mb-[5px]"></div>
              <div className="skeleton-title w-[70%] mx-auto bg-gray-300 h-[20px] mb-[10px]"></div>
              <div className="skeleton-rating w-[40%] mx-auto bg-gray-300 h-[20px] mb-[15px]"></div>
              <div className="skeleton-price w-[45%] mx-auto bg-gray-300 h-[20px]"></div>
            </div>
          ))
        ) : (
          // Render products once loaded
          products.map(product => (
            <div
              key={product.id}
              className="product-item bg-[#F4F4F4] w-[90%] mx-auto p-[20px] text-center flex flex-col gap-[10px] rounded-[15px] relative group"
            >
             <img src={product.images[0]} alt="" />
             <span className="uppercase text-[13px] text-[#999999]">{product.category}</span>
             <h2 className="text-xl font-bold text-[#222529]">{product.name}</h2>
             <div className="flex gap-1 mb-2 justify-center">{renderStars(product.rating || 4)}</div>
             <p className="text-[#444] font-bold text-xl">${product.price} - $30</p>
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
    ))
        )}
      </div>
    </div>
  );
};

export default ProductList;
