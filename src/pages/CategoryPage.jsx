import React from 'react'
import { useParams } from 'react-router-dom'
import CategoryBanner from '../components/Category Page/CategoryBanner'
import CategoryProductList from '../components/Category Page/CategoryProductList'
import { FetchCategoriesContextProvider } from '../context/FetchCategories'
import HurryUpDeals from '../components/LandingPage/HurryUpDeals'

const CategoryPage = () => {
   const { categoryName } = useParams();

   return (
     <div>
       <FetchCategoriesContextProvider categoryName={categoryName}>
         <CategoryBanner />
         <HurryUpDeals />
         <CategoryProductList />
       </FetchCategoriesContextProvider>
     </div>
   )
}

export default CategoryPage