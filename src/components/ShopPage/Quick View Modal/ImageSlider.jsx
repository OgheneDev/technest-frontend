import React,{ useState, useEffect, useRef } from 'react'
import { ArrowLeft, ArrowRight } from 'lucide-react'

const ImageSlider = ({images}) => {
    const [activeIndex, setActiveIndex] = useState(0);
    const sliderRef = useRef(null);
  
    const handleNavigate = (direction) => {
      const container = sliderRef.current;
      if (!container) return;
      const cardWidth = container.offsetWidth;
      let nextIndex = activeIndex;
      if (direction === 'next' && activeIndex < images.length - 1) {
        nextIndex += 1;
      } else if (direction === 'prev' && activeIndex > 0) {
        nextIndex -= 1;
      }
      container.scrollTo({ left: cardWidth * nextIndex, behavior: 'smooth' });
      setActiveIndex(nextIndex);
    };
  
    const handleThumbnailClick = (index) => {
      const container = sliderRef.current;
      if (!container) return;
      const cardWidth = container.offsetWidth;
      container.scrollTo({ left: cardWidth * index, behavior: 'smooth' });
      setActiveIndex(index);
    };
  
    useEffect(() => {
      const handleScroll = () => {
        const container = sliderRef.current;
        if (!container) return;
        const scrollPosition = container.scrollLeft;
        const cardWidth = container.offsetWidth;
        const currentIndex = Math.round(scrollPosition / cardWidth);
        setActiveIndex(currentIndex);
      };
  
      const container = sliderRef.current;
      if (container) container.addEventListener('scroll', handleScroll);
  
      // Cleanup scroll listener on unmount
      return () => container?.removeEventListener('scroll', handleScroll);
    }, []);

  return (
    <div className="relative mb-7">
      {activeIndex > 0 && (
        <button
          className="absolute left-2 top-1/3 transform -translate-y-1/2 p-2 bg-white rounded-full shadow-md"
          onClick={() => handleNavigate('prev')}
        >
          <ArrowLeft size={15} />
        </button>
      )}

      <div
        className="image-slider flex overflow-x-auto snap-x snap-mandatory space-x-0 px-4 md:w-[400px]"
        ref={sliderRef}
      >
        {images.map((image, index) => (
          <img
            key={index}
            src={image}
            alt={`Product ${index + 1}`}
            className="snap-start w-full h-[400px] flex-shrink-0"
          />
        ))}
      </div>

      {activeIndex < images.length - 1 && (
        <button
          className="absolute right-2 top-1/3 transform -translate-y-1/2 p-2 bg-white rounded-full shadow-md"
          onClick={() => handleNavigate('next')}
        >
          <ArrowRight size={15} />
        </button>
      )}

      <div className="thumbnails flex my-4 space-x-2">
        {images.map((image, index) => (
          <img
            key={index}
            src={image}
            alt={`Thumbnail ${index + 1}`}
            onClick={() => handleThumbnailClick(index)}
            className={`w-20 h-20 object-cover rounded-md cursor-pointer ${
              activeIndex === index ? 'border-2 border-black' : 'border border-gray-300'
            }`}
          />
        ))}
      </div>
    </div>
  )
}

export default ImageSlider
