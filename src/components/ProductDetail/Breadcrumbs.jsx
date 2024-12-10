import React from 'react'
import { useNavigate, Link } from 'react-router-dom';
import { House, ChevronRight } from 'lucide-react';

const Breadcrumbs = ({category, name}) => {
  const navigate = useNavigate();

  // Handle category click
  const handleCategoryClick = (categoryName) => {
    // Convert category name to URL-friendly format
    const urlFriendlyCategoryName = categoryName
        .toLowerCase()
        .replace(/\s+/g, '-');
    
    // Navigate to category page
    navigate(`/category/${urlFriendlyCategoryName}`);
  };

  return (
    <div>
       <div className="path flex gap-[13px] flex-wrap items-center uppercase text-[12px] mb-5 text-gray-500">
    <Link to='/'>
      <Link to='/'>
        <House size={15} />
      </Link>
    </Link>
    <ChevronRight size={10} />
    <p className='cursor-pointer' onClick={() => handleCategoryClick(category)}>{category}</p>
    <ChevronRight size={10} />
    {name}
  </div>
    </div>
  )
}

export default Breadcrumbs

