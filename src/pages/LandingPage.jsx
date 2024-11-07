import React from 'react'
import Hero from '../components/Hero'
import { PopularCategoriesProvider } from '../context/PopularContext'
import PopularCategoriesSlider from '../components/PopularCategoriesSlider'
import HurryUpDeals from '../components/HurryUpDeals'


const LandingPage = () => {
  return (
    <>
      <Hero />
      <PopularCategoriesProvider>
        <PopularCategoriesSlider />
      </PopularCategoriesProvider>
      <HurryUpDeals />
    </>
  )
}

export default LandingPage
