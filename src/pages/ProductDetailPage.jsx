import React, { useState, useEffect, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import { ArrowRight, House, ArrowLeft, Star, CalendarCheckIcon } from 'lucide-react';
import { ChevronRight } from 'lucide-react';

const ProductDetailPage = () => {
    const { productId } = useParams(); // Retrieve product ID from URL params
    const [product, setProduct] = useState(null); // Store product details
    const [loading, setLoading] = useState(true); // Loading state
    const [error, setError] = useState(null); // Error state
    const [activeIndex, setActiveIndex] = useState(0); // Track the current active slide index
    const sliderRef = useRef(null); // Reference to the slider container

    useEffect(() => {
        // Fetch product details from Firestore
        const fetchProduct = async () => {
            try {
                setLoading(true);
                const productRef = doc(db, "products", productId);
                const productSnap = await getDoc(productRef);

                if (productSnap.exists()) {
                    // If product exists, set product data
                    setProduct({ id: productSnap.id, ...productSnap.data() });
                } else {
                    // If product does not exist, set error
                    setError("Product not found");
                }
            } catch (error) {
                // Catch any errors during the fetch
                setError("Failed to fetch product details");
                console.error(error);
            } finally {
                // End loading state after fetch
                setLoading(false);
            }
        };

        fetchProduct();
    }, [productId]);

    useEffect(() => {
        // Track scroll position and update the active index
        const handleScroll = () => {
            if (sliderRef.current) {
                const container = sliderRef.current; // Access slider container
                const scrollPosition = container.scrollLeft; // Horizontal scroll position
                const cardWidth = container.offsetWidth; // Width of a single slide
                const currentIndex = Math.round(scrollPosition / cardWidth); // Calculate current slide index
                setActiveIndex(currentIndex); // Update the active index
            }
        };

        const container = sliderRef.current;
        if (container) {
            container.addEventListener('scroll', handleScroll); // Add scroll event listener
        }

        return () => {
            if (container) {
                container.removeEventListener('scroll', handleScroll); // Cleanup event listener
            }
        };
    }, []);

    const handleNavigate = (direction) => {
        // Navigate between slides based on the direction
        const container = sliderRef.current;
        if (!container) return;

        const cardWidth = container.offsetWidth;

        let nextIndex = activeIndex;
        if (direction === 'next' && activeIndex < product.images.length - 1) {
            nextIndex += 1;
        } else if (direction === 'prev' && activeIndex > 0) {
            nextIndex -= 1;
        }

        container.scrollTo({
            left: cardWidth * nextIndex,
            behavior: 'smooth',
        });
        setActiveIndex(nextIndex);
    };

    const handleThumbnailClick = (index) => {
        // Scroll to the slide corresponding to the clicked thumbnail
        const container = sliderRef.current;
        if (!container) return;

        const cardWidth = container.offsetWidth;
        container.scrollTo({
            left: cardWidth * index,
            behavior: 'smooth',
        });
        setActiveIndex(index); // Update the active slide index
    };
  
  // Render stars for ratings
  const renderStars = (rating) => {
    return [...Array(5)].map((_, index) => (
      <Star
        key={index}
        size={17}
        className={index < rating ? 'fill-yellow-600 text-yellow-600' : 'text-gray-300'}
      />
    ));
  };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div className='py-[30px] px-5 flex flex-col gap-[25px]'>
            <div className="image-container">
                {/* Breadcrumb navigation */}
                <div className="path flex gap-[13px] flex-wrap items-center uppercase text-[12px] mb-5 text-gray-500">
                    <Link to='/'>
                        <House size={15} />
                    </Link>
                    <ChevronRight size={10} />
                    <Link to=''>
                        {product.category}
                    </Link>
                    <ChevronRight size={10} />
                    {product.name}
                </div>

                {/* Slider Container */}
                <div className="relative">
                    {/* Previous Button */}
                    {activeIndex > 0 && (
                        <button
                            className='absolute left-2 md:left-0 top-1/3 transform -translate-y-1/2 p-2 bg-white rounded-full shadow-md hover:bg-[#6610f2] hover:text-white'
                            aria-label="Previous slide"
                            onClick={() => handleNavigate('prev')}
                        >
                            <ArrowLeft size={15} />
                        </button>
                    )}

                    {/* Image Slider */}
                    <div
                        className='image-slider flex overflow-x-auto snap-x snap-mandatory space-x-[20px] px-4'
                        ref={sliderRef}
                    >
                        {product.images.map((image, index) => (
                            <img
                                key={index}
                                src={image}
                                alt={`Product Image ${index + 1}`}
                                className='snap-start w-full h-auto rounded-md'
                            />
                        ))}
                    </div>

                    {/* Next Button */}
                    {activeIndex < product.images.length - 1 && (
                        <button
                            className='absolute right-2 md:right-0 top-1/3 transform -translate-y-1/2 p-2 bg-white rounded-full shadow-md hover:bg-[#6610f2] hover:text-white'
                            aria-label="Next slide"
                            onClick={() => handleNavigate('next')}
                        >
                            <ArrowRight size={15} />
                        </button>
                    )}

                    {/* Thumbnails */}
                    <div className="thumbnails flex mt-4 space-x-2 justify-center">
                        {product.images.map((image, index) => (
                            <img
                                key={index}
                                src={image}
                                alt={`Thumbnail ${index + 1}`}
                                onClick={() => handleThumbnailClick(index)}
                                className={`w-16 h-16 object-cover rounded-md cursor-pointer ${
                                    activeIndex === index
                                        ? 'border-2 border-black'
                                        : 'border border-gray-300'
                                }`}
                            />
                        ))}
                    </div>
                </div>
            </div>

            <div className="text-container">
                <h1 className='text-3xl text-grey-dark font-bold mb-2'>{product.name}</h1>
                <div className="flex gap-1 mb-7">{renderStars(product.rating)}</div>
                <p className='text-2xl font-bold text-grey-dark mb-7'>${product.price} - $100</p>
                <p className='text-[#777] mb-4'>{product.description}</p>
                <p className='font-semibold uppercase mb-4'><span className='text-[#777] font-normal normal-case'>Category: </span>{product.category}</p>
                <div className="flex gap-3">
                    <CalendarCheckIcon size={40} />
                    <p className='text-grey'>Order now and your order ships by Tue, <span className='text-black font-semibold'>Mar 12</span></p>
                </div>
            </div>
        </div>
    );
};

export default ProductDetailPage;
