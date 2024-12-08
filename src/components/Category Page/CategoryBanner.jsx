import React from 'react'
import { Link } from 'react-router-dom'
import { House, ChevronRight } from 'lucide-react'
import { useFetchedCategoryProducts } from '../../context/FetchCategories'

const CategoryBanner = () => {
    const {
        categoryName
    } = useFetchedCategoryProducts();
    
  return (
    <div>
      <div className="text-content bg-[#f1f4f9] md:p-[100px] p-[30px]  w-full mb-[50px]">
         <div className="path flex gap-[15px] md:gap-[5px] items-center uppercase text-[12px] text-gray-500">
            <Link to='/'>
              <House size={15} />
            </Link>

            <ChevronRight size={10} />

            <Link to='/shop'>
              Shop
            </Link>

            <ChevronRight size={10} />

            <p>
            {categoryName.split('-').map(word => 
                    word.charAt(0).toUpperCase() + word.slice(1)
                ).join(' ')}
            </p>

         </div>
         <h2 className='text-2xl md:text-5xl font-bold text-grey-dark'>
         {categoryName.split('-').map(word => 
                    word.charAt(0).toUpperCase() + word.slice(1)
                ).join(' ')}
         </h2>
      </div>
    </div>
  )
}

export default CategoryBanner
