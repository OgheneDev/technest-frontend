import React, { useEffect } from 'react';
import { useFetchedProducts } from '../context/FetchProducts';
import { Star } from 'lucide-react';

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
            <div key={index} className="product-skeleton">
              {/* Placeholder for skeleton */}
              <div className="skeleton-image"></div>
              <div className="skeleton-title"></div>
              <div className="skeleton-price"></div>
            </div>
          ))
        ) : (
          // Render products once loaded
          products.map(product => (
            <div key={product.id} className="product-item bg-[#F4F4F4] w-[90%] mx-auto p-[20px] text-center flex flex-col gap-[10px] rounded-[15px]"> 
              <img src={product.images[0]} alt="" />
              <span className="uppercase text-[13px] text-[#999999]">{product.category}</span>
              <h2 className='text-xl font-bold text-[#222529]'>{product.name}</h2>
              <div className="flex gap-1 mb-2 justify-center">{renderStars(product.rating || 4)}</div>
              <p className='text-[#444] font-bold text-xl'>${product.price}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ProductList;
