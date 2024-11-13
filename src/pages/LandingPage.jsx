import React from 'react'
import Hero from '../components/Hero'
import { PopularCategoriesProvider } from '../context/PopularContext'
import PopularCategoriesSlider from '../components/PopularCategoriesSlider'
import HurryUpDeals from '../components/HurryUpDeals'
import { FeatProductsProvider } from '../context/FeaturedProductsContext'
import FeaturedProducts from '../components/FeaturedProducts'
import { LatestPostsProvider } from '../context/LatestPostContext'
import LatestPosts from '../components/LatestPosts'
import Testimonials from '../components/Testimonials'
import { TestimonialContextProvider } from '../context/TestimonialsContext'

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
      <LatestPostsProvider>
        <LatestPosts />
      </LatestPostsProvider>
      <TestimonialContextProvider>
        <Testimonials />
      </TestimonialContextProvider>
    </>
  )
}

export default LandingPage
