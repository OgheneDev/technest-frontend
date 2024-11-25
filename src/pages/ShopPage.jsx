import React from 'react'
import { PopularCategoriesProvider } from '../context/PopularContext'
import PopularCategoriesSlider from '../components/PopularCategoriesSlider'
import { FetchProductsContextProvider } from '../context/FetchProducts'
import ProductList from '../components/ProductList'
import { ChevronRight, Home } from 'lucide-react'
import { Link } from 'react-router-dom'

const ShopPage = () => {
  return (
    <div>
     <div className='border-y border-gray-500'>
        <PopularCategoriesProvider>
          <PopularCategoriesSlider />
        </PopularCategoriesProvider>
        <FetchProductsContextProvider>
            <ProductList />
        </FetchProductsContextProvider>
     </div>

    </div>
  )
}

export default ShopPage
