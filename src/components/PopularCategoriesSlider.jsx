import React from 'react';
import { usePopularCategories } from '../context/PopularContext';
import { ArrowLeft, ArrowRight } from 'lucide-react';

const PopularCategoriesSlider = () => {
    const { currentSlide, itemsPerSlide, popularCategories, swipeHandlers, nextSlide, prevSlide } = usePopularCategories();

    // Calculate the maximum slide index, where only a full row of items is displayed
    const maxSlideIndex = Math.max(popularCategories.length - itemsPerSlide, 0);

    return (
        <div className="relative max-w-full mx-auto py-8 px-[30px]" {...swipeHandlers}>
            <h2 className="text-lg font-semibold mb-4 pl-4">Popular Categories</h2>
            <div className="slider-wrapper overflow-hidden relative">
                <div
                    className="slider-inner flex gap-1 transition-transform duration-500 ease-in-out"
                    style={{ transform: `translateX(-${currentSlide * (100 / itemsPerSlide)}%)` }} // Adjust to shift for dynamic items per slide
                >
                    {popularCategories.map((category) => (
                        <div
                            key={category.id}
                            className="flex flex-col items-center bg-white p-4 flex-shrink-0 text-center"
                            style={{ width: `${100 / itemsPerSlide}%` }} // Set width dynamically based on itemsPerSlide
                        >
                            <img src={category.image} alt={category.name} className="w-full h-auto rounded-md mb-2" />
                            <h3 className="text-md font-medium">{category.name}</h3>
                            <p className="text-sm text-gray-600">{category.stock} products</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Navigation buttons */}
            {currentSlide > 0 && (
                <button
                    onClick={prevSlide}
                    className="absolute left-2 top-1/2 transform -translate-y-1/2 p-2 bg-white rounded-full shadow-md hover:bg-[#6610f2] hover:text-white"
                >
                    <ArrowLeft size={15} />
                </button>
            )}
            {currentSlide < maxSlideIndex && (
                <button
                    onClick={nextSlide}
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 p-2 bg-white rounded-full shadow-md hover:bg-[#6610f2] hover:text-white"
                >
                    <ArrowRight size={15} />
                </button>
            )}
        </div>
    );
};

export default PopularCategoriesSlider;





