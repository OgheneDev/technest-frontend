import React, { useState } from 'react';
import { ArrowLeft, ArrowRight, Truck } from 'lucide-react';
import { useSwipeable } from 'react-swipeable';


const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slider = [
    {
      id: 1,
      name: 'New Deals Just Dropped',
      image: 'https://res.cloudinary.com/dgc8cd67w/image/upload/v1730981601/slide_s36khb.png',
    },
    {
      id: 2,
      name: 'Apple Watch Edition Base Station',
      image: 'https://res.cloudinary.com/dgc8cd67w/image/upload/v1730981600/slide2_wzedpx.png',
    },
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slider.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slider.length) % slider.length);
  };

  const swipeHandlers = useSwipeable({
    onSwipedLeft: nextSlide,
    onSwipedRight: prevSlide,
  });

  return (
    <div>
        <section className='hero w-[90%] mx-auto'>
      <div className="slider relative w-full overflow-hidden" {...swipeHandlers}>
        <div
          className="slider-inner flex transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        >
          {slider.map((card, index) => (
            <div
              key={index}
              className="card w-full flex-shrink-0 flex bg-[#f8f9fa] rounded-[10px] items-center p-[30px]"
            >
              <div className="text-content flex flex-col gap-[20px]">
                <h1 className='font-bold text-xl text-[#343a40]'>{card.name}</h1>
                <button className='text-white bg-[#6610f2] w-fit px-[20px] py-[5px] rounded-full'>
                  Shop Now
                </button>
              </div>
              <div className="image-container">
                <img src={card.image} alt={card.name} className='w-[150px]' />
              </div>
            </div>
          ))}
        </div>

        {/* Navigation buttons */}
        <button
          onClick={prevSlide}
          className="absolute top-1/2 left-0 transform -translate-y-1/2 p-2 bg-white rounded-full hover:bg-[#6610f2] hover:text-white shadow-md"
        >
          <ArrowLeft size={15} />
        </button>
        <button
          onClick={nextSlide}
          className="absolute top-1/2 right-0 transform -translate-y-1/2 p-2 bg-white rounded-full shadow-md hover:bg-[#6610f2] hover:text-white"
        >
          <ArrowRight size={15} />
        </button>
      </div>
    </section>
    <div className="ship flex gap-[30px] items-center justify-center border-b py-[30px]">
        <Truck size={40} className='text-[#0d6efd]' />
        <h2 className='font-bold text-[#343a40]'>Free Shipping & Returns</h2>
      </div>
    </div>
  );
};

export default Hero;
