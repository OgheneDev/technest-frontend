import React from 'react'
import { PopularCategoriesProvider } from '../context/PopularContext'
import PopularCategoriesSlider from '../components/LandingPage/PopularCategoriesSlider'
import { FetchProductsContextProvider } from '../context/FetchProducts'
import { WishlistProvider } from '../context/WishlistContext'
import ProductList from '../components/ShopPage/ProductList'

const ShopPage = () => {
  return (
    <div>
     <div>
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
