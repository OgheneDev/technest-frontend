import { ArrowLeft, ArrowRight } from 'lucide-react';
import { useRef, useState, useEffect } from 'react';

const ImageSlider = ({ images }) => {
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

      <div className="image-slider flex overflow-x-auto snap-x snap-mandatory space-x-[20px] px-4" ref={sliderRef}>
        {images.map((image, index) => (
          <img key={index} src={image} alt={`Product ${index + 1}`} className="snap-start w-full h-auto rounded-md" />
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

      <div className="thumbnails flex mt-4 space-x-2 justify-center">
        {images.map((image, index) => (
          <img
            key={index}
            src={image}
            alt={`Thumbnail ${index + 1}`}
            onClick={() => handleThumbnailClick(index)}
            className={`w-16 h-16 object-cover rounded-md cursor-pointer ${
              activeIndex === index ? 'border-2 border-black' : 'border border-gray-300'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default ImageSlider;
