import React from 'react';
import { ChevronRight } from 'lucide-react';
import { useLocation } from 'react-router-dom';

const Breadcrumbs = () => {
  const location = useLocation();

  const getClassNames = (route) => {
    const baseClass = 'hover:text-[#6610f2] transition-all duration-300';
    const activeClass = 'text-[#6610f2]'; // Active color
    const passedClass = 'text-grey'; // Darker color for passed routes

    if (location.pathname === route) {
      return `${baseClass} ${activeClass}`;
    }
    
    if (route === '/cart' && location.pathname === '/checkout') {
      return `${baseClass} ${passedClass}`;
    }

    if (route === '/checkout' && location.pathname === '/order-complete') {
      return `${baseClass} ${passedClass}`;
    }

    return baseClass;
  };

  return (
    <div className='flex gap-8 justify-center text-[17px] font-semibold py-7 cursor-pointer px-5 flex-wrap text-grey'>
      <span className={getClassNames('/cart')}>Shopping Cart</span>
      <ChevronRight size={25} />
      <span className={getClassNames('/checkout')}>Checkout</span>
      <ChevronRight size={25} />
      <span className={getClassNames('/order-complete')}>Order Complete</span>
    </div>
  );
};

export default Breadcrumbs;
