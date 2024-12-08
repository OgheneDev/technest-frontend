import React from 'react'
import Hero from '../components/LandingPage/Hero'
import { PopularCategoriesProvider } from '../context/PopularContext'
import PopularCategoriesSlider from '../components/LandingPage/PopularCategoriesSlider'
import HurryUpDeals from '../components/LandingPage/HurryUpDeals'
import { FeaturedProductsProvider } from '../context/FeaturedProductsContext'
import FeaturedProducts from '../components/LandingPage/FeaturedProducts'
import { LatestPostsProvider } from '../context/LatestPostContext'
import LatestPosts from '../components/LandingPage/LatestPosts'
import Testimonials from '../components/LandingPage/Testimonials'
import { TestimonialContextProvider } from '../context/TestimonialsContext'


const LandingPage = () => {
  return (
    <>
      <Hero />
      <PopularCategoriesProvider>
        <PopularCategoriesSlider />
      </PopularCategoriesProvider>
      <HurryUpDeals />
      <FeaturedProductsProvider>
      <FeaturedProducts />
    </FeaturedProductsProvider>
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
