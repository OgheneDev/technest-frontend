import React, { useState, useMemo } from 'react'
import { useFetchedCategoryProducts } from '../../context/FetchCategories'
import { Star, Heart, MoveRight, Search } from 'lucide-react';
import { Link } from 'react-router-dom';

const CategoryProductList = () => {

  const {
    products,
    loading
  } = useFetchedCategoryProducts();

  //Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 12;

  //Filtering state
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  //Sorting State
  const [sortOption, setSortOption] = useState();

  // Render stars for ratings
  const renderStars = (rating) => {
    return [...Array(5)].map((_, index) => (
      <Star
        key={index}
        size={14}
        className={index < rating ? 'fill-[#444] text-[#444]' : 'text-gray-300'}
      />
    ));
  };

  // Get unique categories
  const categories = useMemo(() => {
    return [...new Set(products.map(product => product.category))];
  }, [products]);

  // Filter and Sort Products
  const filteredAndSortedProducts = useMemo(() => {
    let result = products.filter(product => 
      // Filter by search term
      (product.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
       product.category.toLowerCase().includes(searchTerm.toLowerCase())) &&
      // Filter by category
      (selectedCategory === '' || product.category === selectedCategory)
    );

    // Sort products
    switch(sortOption) {
      case 'priceAsc':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'priceDesc':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'nameAsc':
        result.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'nameDesc':
        result.sort((a, b) => b.name.localeCompare(a.name));
        break;
      default:
        break;
    }

    return result;
  }, [products, searchTerm, selectedCategory, sortOption]);

  // Pagination logic
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredAndSortedProducts.slice(
    indexOfFirstProduct, 
    indexOfLastProduct
  );

  // Calculate total pages
  const totalPages = Math.ceil(filteredAndSortedProducts.length / productsPerPage);

  // Generate page numbers
  const generatePageNumbers = () => {
    const pageNumbers = [];
    const maxPagesToShow = 5; // Adjust this to change the number of page buttons shown
    
    // Always show first page
    if (totalPages > 0) pageNumbers.push(1);
    
    // Calculate start and end for middle pages
    let startPage = Math.max(2, currentPage - Math.floor(maxPagesToShow / 2));
    let endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);
    
    // Adjust if we're near the end
    if (endPage === totalPages) {
      startPage = Math.max(2, totalPages - maxPagesToShow + 1);
    }
    
    // Add middle pages
    for (let i = startPage; i <= endPage && i < totalPages; i++) {
      if (!pageNumbers.includes(i)) pageNumbers.push(i);
    }
    
    // Always show last page if more than 1 page
    if (totalPages > 1 && !pageNumbers.includes(totalPages)) {
      pageNumbers.push(totalPages);
    }
    
    return pageNumbers;
  };

  return (
<div className='px-[20px] md:px-[100px] py-[30px] md:py-20'>
      {/* Filters and Sorting */}
      <div className="filters mb-[30px] flex flex-wrap gap-[15px] justify-between items-center">
        {/* Search Input */}
        <div className="search-filter flex items-center border rounded-md px-3 py-2">
          <Search size={20} className="mr-2 text-gray-500" />
          <input 
            type="text" 
            placeholder="Search products..." 
            className="outline-none w-full"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1); // Reset to first page when filtering
            }}
          />
        </div>

        {/* Category Filter */}
        <select 
          className="border rounded-md px-3 py-2"
          value={selectedCategory}
          onChange={(e) => {
            setSelectedCategory(e.target.value);
            setCurrentPage(1); // Reset to first page when filtering
          }}
        >
          <option value="">All Categories</option>
          {categories.map(category => (
            <option key={category} value={category}>{category}</option>
          ))}
        </select>

        {/* Sorting */}
        <select 
          className="border rounded-md px-3 py-2"
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value)}
        >
          <option value="">Sort By</option>
          <option value="priceAsc">Price: Low to High</option>
          <option value="priceDesc">Price: High to Low</option>
          <option value="nameAsc">Name: A to Z</option>
          <option value="nameDesc">Name: Z to A</option>
        </select>
      </div>

      {/* Product Grid */}
      <div className="product-list grid grid-cols-2 md:grid-cols-4 gap-[30px]">
        {loading ? (
          // Render skeletons while loading
          Array.from({ length: 8 }).map((_, index) => (
            <div key={index} className="product-skeleton w-full md:w-[250px] p-[20px] h-[380px] mx-auto bg-[#f4f4f4]">
              <div className="skeleton-image w-[100%] bg-gray-300 h-[200px] mb-[20px]"></div>
              <div className="skeleton-category w-[30%] mx-auto bg-gray-300 h-[20px] mb-[5px]"></div>
              <div className="skeleton-title w-[70%] mx-auto bg-gray-300 h-[20px] mb-[10px]"></div>
              <div className="skeleton-rating w-[40%] mx-auto bg-gray-300 h-[20px] mb-[15px]"></div>
              <div className="skeleton-price w-[45%] mx-auto bg-gray-300 h-[20px]"></div>
            </div>
          ))
        ) : currentProducts.length > 0 ? (
          // Render products once loaded
          currentProducts.map(product => (
            <div
              key={product.id}
              className="product-item bg-[#F4F4F4] w-full md:w-[250px] mx-auto p-[20px] text-center flex flex-col gap-[10px] rounded-[15px] relative group"
            >
              <Link to={`/product/${product.id}`}>
               <img src={product.images[0]} alt={product.name} />
              </Link>
              <span className="uppercase text-[13px] text-[#999999]">{product.category}</span>
              <h2 className="text-xl font-bold text-[#222529] truncate w-full">{product.name}</h2>
              <div className="flex gap-1 mb-2 justify-center">{renderStars(product.rating || 4)}</div>
              <p className="text-[#444] font-bold text-xl">${product.price}</p>
              <div className="options flex flex-col gap-[15px] absolute right-[25px] opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="bg-white py-[15px] cursor-pointer rounded-full w-[50px] h-[50px] flex justify-center hover:text-white hover:bg-black transition-all ease-in-out duration-[.3s]">
                  <Heart size={22} />
                </div>
                <Link to={`/product/${product.id}`}>
                <div className="bg-white py-[15px] cursor-pointer rounded-full w-[50px] h-[50px] flex justify-center hover:text-white hover:bg-black transition-all ease-in-out duration-[.3s]">
                  <MoveRight size={22} />
                </div>
                </Link>
                <div className="bg-white py-[15px] cursor-pointer rounded-full w-[50px] h-[50px] flex justify-center hover:text-white hover:bg-black transition-all ease-in-out duration-[.3s]">
                  <Search size={22} />
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="w-full text-center text-gray-500 py-10">
            No products found.
          </div>
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="pagination flex justify-center items-center gap-2 mt-[30px]">
          {/* Left arrow */}
          <button 
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="px-3 py-1 border rounded disabled:opacity-50"
          >
            {'<'}
          </button>

          {/* Page numbers */}
          {generatePageNumbers().map((number, index) => {
            // Add ellipsis if there's a gap
            const prevNumber = index > 0 ? generatePageNumbers()[index - 1] : null;
            const showEllipsisBefore = prevNumber && number - prevNumber > 1;

            return (
              <React.Fragment key={number}>
                {showEllipsisBefore && <span className="px-2">...</span>}
                <button
                  onClick={() => setCurrentPage(number)}
                  className={`px-3 py-1 border rounded ${
                    currentPage === number 
                      ? 'bg-black text-white' 
                      : 'bg-white text-black hover:bg-gray-100'
                  }`}
                >
                  {number}
                </button>
              </React.Fragment>
            );
          })}

          {/* Right arrow */}
          <button 
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="px-3 py-1 border rounded disabled:opacity-50"
          >
            {'>'}
          </button>
        </div>
      )}
    </div>
  )
}

export default CategoryProductList
