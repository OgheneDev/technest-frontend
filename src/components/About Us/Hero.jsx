import React from 'react'
import aboutImg from '../../assets/images/about.png'

const Hero = () => {
  return (
    <section className='flex flex-col md:flex-row gap-10 bg-custom-gradient p-10 md:py-[100px] md:px-[150px]'>
      <div className="text-content w-[50%]">
        <h1 className='text-dark text-3xl md:text-6xl font-bold mb-5'>Where Innovation Meets Your Device</h1>
        <p className='text-grey md:text-[18px]'>Founded with a passion for enhancing your mobile experience, we curate a diverse selection of high-quality accessories that blend functionality, style, and innovation.</p>
      </div>
      <div className="image-content">
        <img src={aboutImg} alt="about us image" className='w-[250px] md:w-full' />
      </div>
    </section>
  )
}

export default Hero
