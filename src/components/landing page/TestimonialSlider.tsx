"use client";
import React, { useState, useEffect, useRef } from "react";
import { Quote } from "lucide-react";

interface Testimonial {
  quote: string;
  name: string;
  position: string;
  company: string;
  rating: number;
  image: string;
}

const testimonials: Testimonial[] = [
  {
    quote:
      "Their fast delivery and genuine Apple accessories are incredible. The MagSafe charger I bought works perfectly with my iPhone 14 Pro.",
    name: "David Chen",
    position: "Tech Enthusiast",
    company: "Software Developer",
    rating: 5,
    image: "/testimonial-avatar-5.jpg",
  },
  {
    quote:
      "Best place to buy phone cases and screen protectors. Their customer service helped me find the perfect case for my Samsung S23 Ultra.",
    name: "Sarah Williams",
    position: "Digital Content Creator",
    company: "YouTube",
    rating: 5,
    image: "/testimonial-avatar-6.jpg",
  },
  {
    quote:
      "The wireless earbuds I purchased exceeded my expectations. Great prices and the product verification feature gives me peace of mind.",
    name: "Michael Wong",
    position: "Music Producer",
    company: "Sound Studio",
    rating: 5,
    image: "/testimonial-avatar-7.jpg",
  },
  {
    quote:
      "Their range of power banks and charging accessories is impressive. Quick delivery and all products come with genuine warranty.",
    name: "Priya Patel",
    position: "Travel Blogger",
    company: "Digital Nomad",
    rating: 5,
    image: "/testimonial-avatar-8.jpg",
  },
];

const createSlidingTestimonials = (
  items: Testimonial[],
  itemsPerView: number
) => {
  let result = [...items];

  const remainder = items.length % itemsPerView;
  if (remainder > 0 && remainder < itemsPerView) {
    const itemsToAdd = itemsPerView - remainder;
    result = [...result, ...items.slice(0, itemsToAdd)];
  }

  return result;
};

const TestimonialSlider: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(true);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const sliderRef = useRef<HTMLDivElement>(null);
  const [slidingTestimonials, setSlidingTestimonials] = useState(testimonials);

  const itemsPerView = isMobile ? 1 : 3;

  useEffect(() => {
    setSlidingTestimonials(
      createSlidingTestimonials(testimonials, itemsPerView)
    );
  }, [itemsPerView]);

  const totalPages = Math.ceil(testimonials.length / itemsPerView);

  const getGroupedTestimonials = () => {
    const result = [];

    for (let i = 0; i < slidingTestimonials.length; i += itemsPerView) {
      result.push(slidingTestimonials.slice(i, i + itemsPerView));
    }

    return result;
  };

  useEffect(() => {
    const checkMobile = () => {
      const wasMobile = isMobile;
      const newIsMobile = window.innerWidth < 768;
      setIsMobile(newIsMobile);

      if (wasMobile !== newIsMobile) {
        setCurrentIndex(0);
        setIsTransitioning(false);
      }
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, [isMobile]);

  const handleSlideChange = (index: number) => {
    setIsTransitioning(true);
    setCurrentIndex(index);
  };

  const handleTransitionEnd = () => {
    setIsTransitioning(false);

    if (
      currentIndex === totalPages - 1 &&
      testimonials.length % itemsPerView !== 0
    ) {
      const timeout = setTimeout(() => {
        if (currentIndex === totalPages - 1) {
          setCurrentIndex(0);
        }
      }, 5000);

      return () => clearTimeout(timeout);
    }
  };

  const isFirstSlide = currentIndex === 0;
  const isLastSlide = currentIndex === totalPages - 1;

  const nextSlide = () => {
    if (isTransitioning || isLastSlide) return;
    const nextIndex = (currentIndex + 1) % totalPages;
    handleSlideChange(nextIndex);
  };

  const prevSlide = () => {
    if (isTransitioning || isFirstSlide) return;
    const prevIndex = (currentIndex - 1 + totalPages) % totalPages;
    handleSlideChange(prevIndex);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (touchStart - touchEnd > 50) {
      nextSlide();
    }
    if (touchStart - touchEnd < -50) {
      prevSlide();
    }
  };

  const groupedTestimonials = getGroupedTestimonials();

  return (
    <div className="flex flex-col mx-auto overflow-hidden">
      <div
        ref={sliderRef}
        className="relative overflow-hidden w-full"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div
          className="flex transition-transform duration-700 ease-in-out"
          style={{
            transform: `translateX(-${
              (currentIndex * 100) / groupedTestimonials.length
            }%)`,
            width: `${groupedTestimonials.length * 100}%`,
          }}
          onTransitionEnd={handleTransitionEnd}
        >
          {groupedTestimonials.map((group, groupIndex) => (
            <div
              key={groupIndex}
              className="flex gap-6"
              style={{ width: `${100 / groupedTestimonials.length}%` }}
            >
              {group.map((testimonial, index) => (
                <div
                  key={`${groupIndex}-${index}`}
                  className="w-full"
                  style={{
                    flex: `0 0 calc(${100 / itemsPerView}% - ${
                      ((itemsPerView - 1) * 24) / itemsPerView
                    }px)`,
                  }}
                >
                  <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 h-full hover:border-emerald-500/50 transition-all duration-300">
                    <div className="mb-6">
                      <Quote className="w-8 h-8 text-emerald-400 mb-4" />
                      <p className="text-zinc-300 leading-relaxed">
                        {testimonial.quote}
                      </p>
                    </div>

                    <div className="border-t border-zinc-800 pt-4">
                      <div>
                        <h4 className="font-semibold text-white">
                          {testimonial.name}
                        </h4>
                        <p className="text-sm text-zinc-500">
                          {testimonial.position}
                        </p>
                        <div className="flex mt-2">
                          {[...Array(5)].map((_, i) => (
                            <svg
                              key={i}
                              className={`w-4 h-4 ${
                                i < testimonial.rating
                                  ? "text-emerald-400"
                                  : "text-zinc-700"
                              }`}
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-between items-center mt-8 w-full">
        <button
          onClick={prevSlide}
          className={`p-3 rounded-lg transition-all duration-300 ${
            isFirstSlide
              ? "opacity-30 cursor-not-allowed bg-zinc-900 border border-zinc-800"
              : "bg-zinc-900 hover:bg-zinc-800 border cursor-pointer border-zinc-800 hover:border-emerald-500/50"
          }`}
          aria-label="Previous testimonial"
          disabled={isFirstSlide || isTransitioning}
        >
          <svg
            className="w-5 h-5 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>

        <div className="flex items-center gap-2">
          {Array.from({ length: totalPages }).map((_, index) => (
            <button
              key={index}
              onClick={() => handleSlideChange(index)}
              className={`h-2 rounded-full transition-all cursor-pointer duration-300 ${
                currentIndex === index
                  ? "bg-emerald-400 w-8"
                  : "bg-zinc-700 w-2 hover:bg-zinc-600"
              }`}
              aria-label={`Go to slide ${index + 1}`}
              disabled={isTransitioning}
            />
          ))}
        </div>

        <button
          onClick={nextSlide}
          className={`p-3 rounded-lg transition-all duration-300 ${
            isLastSlide
              ? "opacity-30 cursor-not-allowed bg-zinc-900 border border-zinc-800"
              : "bg-zinc-900 cursor-pointer hover:bg-zinc-800 border border-zinc-800 hover:border-emerald-500/50"
          }`}
          aria-label="Next testimonial"
          disabled={isLastSlide || isTransitioning}
        >
          <svg
            className="w-5 h-5 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default TestimonialSlider;
