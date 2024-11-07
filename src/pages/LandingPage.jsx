import React from 'react'
import Hero from '../components/Hero'
import { PopularCategoriesProvider } from '../context/PopularContext'
import PopularCategoriesSlider from '../components/PopularCategoriesSlider'


const LandingPage = () => {
  return (
    <>
      <Hero />
      <PopularCategoriesProvider>
        <PopularCategoriesSlider />
      </PopularCategoriesProvider>
    </>
  )
}

export default LandingPage
