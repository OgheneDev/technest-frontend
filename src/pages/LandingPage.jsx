import React from 'react'
import Hero from '../components/Hero'
import { PopularCategoriesProvider } from '../context/PopularContext'
import PopularCategoriesSlider from '../components/PopularCategoriesSlider'
import HurryUpDeals from '../components/HurryUpDeals'
import { FeatProductsProvider } from '../context/FeaturedProductsContext'
import FeaturedProducts from '../components/FeaturedProducts'

const LandingPage = () => {
  return (
    <>
      <Hero />
      <PopularCategoriesProvider>
        <PopularCategoriesSlider />
      </PopularCategoriesProvider>
      <HurryUpDeals />
      <FeatProductsProvider>
        <FeaturedProducts />
      </FeatProductsProvider>
 
    </>
  )
}

export default LandingPage
