import React from 'react';
import { usePopularCategories } from '../context/PopularContext';
import { ArrowLeft, ArrowRight } from 'lucide-react';

const PopularCategoriesSlider = () => {
    const { currentSlide, popularCategories, swipeHandlers, nextSlide, prevSlide } = usePopularCategories();

    return (
        <div className="relative max-w-md mx-auto py-[30px]" {...swipeHandlers}>
            <h2 className="text-lg font-semibold mb-4 pl-[20px]">Popular Categories</h2>
            <div className="slider-wrapper overflow-hidden relative">
                <div
                    className="slider-inner flex gap-[10px] transition-transform duration-500 ease-in-out"
                    style={{ transform: `translateX(-${currentSlide * 50}%)` }} // 50% to show two items at once
                >
                    {popularCategories.map((category, index) => (
                        <div
                            key={category.id}
                            className="flex flex-col items-center bg-white shadow-md rounded-lg p-4 w-1/2 flex-shrink-0 text-center"
                        >
                            <img src={category.image} alt={category.name} className="w-full h-auto rounded-md mb-2" />
                            <h3 className="text-md font-medium">{category.name}</h3>
                            <p className="text-sm text-gray-600">{category.stock} products</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Navigation buttons */}
            <button
                onClick={prevSlide}
                className="absolute left-2 top-1/2 transform -translate-y-1/2 p-2 bg-white rounded-full shadow-md hover:bg-[#6610f2] hover:text-white"
            >
                <ArrowLeft size={15} />
            </button>
            <button
                onClick={nextSlide}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 p-2 bg-white rounded-full shadow-md hover:bg-[#6610f2] hover:text-white"
            >
                <ArrowRight size={15} />
            </button>
        </div>
    );
};

export default PopularCategoriesSlider;

