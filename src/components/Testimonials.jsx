import React, { useEffect } from 'react';
import { useTestimonialsContext } from '../context/TestimonialsContext';
import { ArrowLeft, ArrowRight, Star } from 'lucide-react';

const Testimonials = () => {
  const {
    testimonials,
    currentSlide,
    itemsPerSlide,
    fetchTestimonials,
    nextSlide,
    prevSlide,
    handleTouchStart,
    handleTouchMove,
    handleTouchEnd,
  } = useTestimonialsContext();

  useEffect(() => {
    fetchTestimonials();
  }, []);

  // Helper function to render rating stars
  const renderStars = (rating) => {
    return [...Array(5)].map((_, index) => (
      <Star
        key={index}
        size={14}
        className={index < rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}
      />
    ));
  };

  return (
    <div
      className="relative max-w-full mx-auto py-8 md:px-[120px] px-[20px]"
      onMouseDown={handleTouchStart}
      onMouseMove={handleTouchMove}
      onMouseUp={handleTouchEnd}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <h2 className="text-grey-dark font-semibold text-xl mb-[30px]">Customer Testimonials</h2>

      {/* Testimonials Slider */}
      <div className="slider-wrapper overflow-hidden relative">
        <div
          className="testimonials slider-inner flex transition-transform duration-500 ease-in-out"
          style={{
            transform: `translateX(-${currentSlide * (100 / itemsPerSlide)}%)`,
            width: `${(100 / itemsPerSlide) * testimonials.length}%`,
          }}
        >
          {testimonials.length > 0 ? (
            testimonials.map((testimonial) => (
              <div
                key={testimonial.id}
                className="testimonial-item flex-shrink-0"
                style={{
                  width: `${100 / itemsPerSlide}%`,
                }}
              >
                <div className="flex gap-[20px] items-start">
                  <img src={testimonial.image} alt="" className="w-[70px] rounded-full" />
                  <div className="text-content flex flex-col gap-[10px] max-w-full overflow-hidden">
                    <h3 className="font-semibold text-grey-dark text-[18px]">
                      {testimonial.name} <span className="text-[#9d9fa3] text-[13px]">- {testimonial.date}</span>
                    </h3>
                    <div className="flex gap-1 mb-2">{renderStars(4)}</div>
                    <p className="text-[#9d9fa3] text-[15px] break-words whitespace-normal">
                      {testimonial.testimonial}
                    </p>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p>Testimonials unavailable.</p>
          )}
        </div>
      </div>

      {/* Navigation Arrows */}
      {currentSlide > 0 && (
        <button
          onClick={prevSlide}
          className="absolute left-2 md:left-[100px] top-1/2 transform -translate-y-1/2 p-2 bg-white rounded-full shadow-md hover:bg-[#6610f2] hover:text-white"
        >
          <ArrowLeft size={15} />
        </button>
      )}
      {currentSlide < Math.max(0, Math.ceil(testimonials.length / itemsPerSlide) - 1) && (
        <button
          onClick={nextSlide}
          className="absolute right-2 md:right-[100px] top-1/2 transform -translate-y-1/2 p-2 bg-white rounded-full shadow-md hover:bg-[#6610f2] hover:text-white"
        >
          <ArrowRight size={15} />
        </button>
      )}
    </div>
  );
};

export default Testimonials;



