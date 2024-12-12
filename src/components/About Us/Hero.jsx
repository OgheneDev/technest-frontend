import React from 'react'
import aboutImg from '../../assets/images/about.png'

const Hero = () => {
  return (
    <section className='flex flex-col gap-7 bg-custom-gradient p-10'>
      <div className="text-content">
        <h1 className='text-dark text-3xl font-bold mb-5'>Where Innovation Meets Your Device</h1>
        <p className='text-grey'>Founded with a passion for enhancing your mobile experience, we curate a diverse selection of high-quality accessories that blend functionality, style, and innovation.</p>
      </div>
      <div className="image-content">
        <img src={aboutImg} alt="about us image" className='w-[250px]' />
      </div>
    </section>
  )
}

export default Hero
