import React from 'react'
import Hero from '../components/About Us/Hero'
import SupportInfo from '../components/About Us/SupportInfo'
import Welcome from '../components/About Us/Welcome'
import { TestimonialContextProvider } from '../context/TestimonialsContext'
import Testimonials from '../components/LandingPage/Testimonials'
import ChooseUs from '../components/About Us/ChooseUs'
import { PopularCategoriesProvider } from '../context/PopularContext'
import PopularCategoriesSlider from '../components/LandingPage/PopularCategoriesSlider'
import ContactCards from '../components/About Us/ContactCards'

const AboutUspage = () => {
  return (
    <div>
      <Hero />
      <SupportInfo />
      <Welcome />
      <TestimonialContextProvider>
        <Testimonials />
      </TestimonialContextProvider>
      <ChooseUs />
      <PopularCategoriesProvider>
      <PopularCategoriesSlider />
      </PopularCategoriesProvider>
      <ContactCards />
    </div>
  )
}

export default AboutUspage
