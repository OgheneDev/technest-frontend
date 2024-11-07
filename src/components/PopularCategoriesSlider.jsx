import React from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { usePopularCategories } from '../context/PopularContext';

const PopularCategoriesSlider = () => {
    const { currentSlide, popularCategories, swipeHandlers, nextSlide, prevSlide } = usePopularCategories();

    return (
        <div className="relative max-w-md mx-auto py-[30px]" {...swipeHandlers}>
            <h2 className="text-lg font-semibold mb-4 pl-[20px]">Popular Categories</h2>
            <div className="flex gap-4 overflow-hidden justify-center">
                {popularCategories.slice(currentSlide, currentSlide + 2).map((category) => (
                    <div
                        key={category.id}
                        className="flex flex-col items-center bg-white shadow-md rounded-lg p-4 w-40 text-center"
                    >
                        <img src={category.image} alt={category.name} className="w-full h-auto rounded-md mb-2" />
                        <h3 className="text-md font-medium">{category.name}</h3>
                        <p className="text-sm text-gray-600">{category.stock} products</p>
                    </div>
                ))}
            </div>
            <button
                onClick={prevSlide}
                className="absolute top-1/2 left-2 transform -translate-y-1/2 p-2 bg-white rounded-full hover:bg-[#6610f2] hover:text-white shadow-md"
            >
                <ArrowLeft size={15} />
            </button>
            <button
                onClick={nextSlide}
                className="absolute top-1/2 right-2 transform -translate-y-1/2 p-2 bg-white rounded-full shadow-md hover:bg-[#6610f2] hover:text-white"
            >
                <ArrowRight size={15} />
            </button>
        </div>
    );
};

export default PopularCategoriesSlider;
