import React, { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { useFetchedProducts } from "../../context/FetchProducts";
import { useWishlist } from "../../context/WishlistContext";
import {
  Star,
  Heart,
  MoveRight,
  ArrowRight,
  Search,
  SlidersHorizontal,
  ChevronDown,
  X,
} from "lucide-react";
import QuickViewModal from "./QuickViewModal";

const ProductList = () => {
  const { products, loading } = useFetchedProducts();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();

  const [selectedProduct, setSelectedProduct] = useState(null);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 12;

  // Filter and Sorting state
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [sortOption, setSortOption] = useState("");

  // Modal states
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isSortOpen, setIsSortOpen] = useState(false);
  const [isQuickViewModalOpen, setIsQuickViewModalOpen] = useState(false);

  // Get unique categories
  const categories = useMemo(() => {
    return [...new Set(products.map((product) => product.category))];
  }, [products]);

  // Filter and Sort Products
  const filteredAndSortedProducts = useMemo(() => {
    let result = products.filter(
      (product) =>
        // Filter by search term
        (product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          product.category.toLowerCase().includes(searchTerm.toLowerCase())) &&
        // Filter by category
        (selectedCategory === "" || product.category === selectedCategory)
    );

    // Sort products
    switch (sortOption) {
      case "priceAsc":
        result.sort((a, b) => a.price - b.price);
        break;
      case "priceDesc":
        result.sort((a, b) => b.price - a.price);
        break;
      case "nameAsc":
        result.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "nameDesc":
        result.sort((a, b) => b.name.localeCompare(a.name));
        break;
      default:
        break;
    }

    return result;
  }, [products, searchTerm, selectedCategory, sortOption]);

  const handleSort = (option) => {
    setSortOption(option);
    setCurrentPage(1); // Reset to first page when sorting
    setIsSortOpen(false); // Close sort dropdown
  };
  
  const handleQuickView = (product) => {
    setSelectedProduct(product);
    setIsQuickViewModalOpen(true);
  }

  const closeQuickView = () => {
    setSelectedProduct(null);
    setIsQuickViewModalOpen(false);
  }

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

  // Render stars for ratings
  const renderStars = (rating) => {
    return [...Array(5)].map((_, index) => (
      <Star
        key={index}
        size={14}
        className={index < rating ? "fill-[#444] text-[#444]" : "text-gray-300"}
      />
    ));
  };

  return (
    <div className="px-[20px] md:px-[100px] py-[30px]">
      {/* Filters and Sorting Section */}
      <div className="flex justify-between items-center mb-[30px]">
        {/* Filter Button */}
        <button
          onClick={() => setIsFilterOpen(true)}
          className="flex items-center gap-2 bg-white border rounded-md px-4 py-2 text-sm shadow-sm"
        >
          <SlidersHorizontal size={20} />
          Filter
        </button>

        {/* Sort Button */}
        <button
          onClick={() => setIsSortOpen((prev) => !prev)}
          className="flex items-center gap-2 bg-white border rounded-md px-4 py-2 text-sm shadow-sm"
        >
          Sort
          <ChevronDown size={18} />
        </button>
      </div>

      {/* Search Input */}
      <div className="search-filter flex items-center border md:w-[300px] md:mx-auto rounded-md px-3 py-2 mb-5">
          <Search size={20} className="mr-2 text-gray-500" />
          <input 
            type="text" 
            placeholder="Search products..." 
            className="outline-none w-full "
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1); // Reset to first page when filtering
            }}
          />
        </div>


      {/* Filter Modal */}
      {isFilterOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-md w-[90%] md:w-[400px]">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-bold">Filter Products</h2>
              <button onClick={() => setIsFilterOpen(false)}>
                <X size={20} />
              </button>
            </div>
            <div className="flex flex-col gap-4">
              <label className="text-sm font-bold">Category</label>
              <select
                className="border rounded-md px-3 py-2"
                value={selectedCategory}
                onChange={(e) => {
                  setSelectedCategory(e.target.value);
                  setCurrentPage(1); // Reset to first page when filtering
                  setIsFilterOpen(false); // Close modal
                }}
              >
                <option value="">All Categories</option>
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      )}

      {/* Sort Dropdown */}
      {isSortOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-md w-[90%] md:w-[400px]">
          <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-bold">Sort Products By</h2>
              <button onClick={() => setIsSortOpen(false)}>
                <X size={20} />
              </button>
            </div>
          <ul className="text-sm space-y-3">
            <li
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer "
              onClick={() => handleSort("priceAsc")}
            >
              Price: Low to High
            </li>
            <li
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
              onClick={() => handleSort("priceDesc")}
            >
              Price: High to Low
            </li>
            <li
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
              onClick={() => handleSort("nameAsc")}
            >
              Name: A to Z
            </li>
            <li
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
              onClick={() => handleSort("nameDesc")}
            >
              Name: Z to A
            </li>
          </ul>
        </div>
        </div>
      )}

      {/* Product Grid */}
      <div className="product-list py-10 grid grid-cols-2 md:grid-cols-4 gap-[20px]">
      {loading ? (
       <div className="flex items-center justify-center w-full h-[400px]">
       <div className="spinner-border animate-spin inline-block w-10 h-10 border-4  rounded-full text-bs-indigo"></div>
      </div>
      ) : currentProducts.length > 0 ? (
          currentProducts.map((product) => (
        <div
          key={product.id}
          className="product-item cursor-pointer bg-[#F4F4F4] w-full md:w-[250px] mx-auto p-[20px] text-center flex flex-col gap-[10px] rounded-[10px] md:rounded-[15px] relative group"
        >
         <Link to={`/product/${product.id}`}>
           <img src={product.images[0]} alt={product.name} />
         </Link>
         <span className="uppercase text-[13px] text-[#999999]">
           {product.category}
          </span>
         <h2 className="text-xl font-bold text-[#222529] truncate w-full">
          {product.name}
         </h2>
        <div className="flex gap-1 mb-2 justify-center">
          {renderStars(product.rating || 4)}
        </div>
        <p className="text-[#444] font-bold text-xl">${product.price.toFixed(2)}</p>
        <div className="options hidden md:flex flex-col gap-[15px] absolute right-[25px] opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <div 
           onClick={() => isInWishlist(product.id) 
              ? removeFromWishlist(product.id) 
              : addToWishlist(product)
                 }
            className={`bg-white py-[15px] cursor-pointer rounded-full w-[50px] h-[50px] flex justify-center hover:text-white hover:bg-black transition-all ease-in-out duration-[.3s] 
              ${isInWishlist(product.id) ? 'text-red-500' : ''}`}
            >
              <Heart size={22} />
            </div>
            <Link to={`/product/${product.id}`}>
              <div className="bg-white py-[15px] cursor-pointer rounded-full w-[50px] h-[50px] flex justify-center hover:text-white hover:bg-black transition-all ease-in-out duration-[.3s]">
                <MoveRight size={22} />
              </div>
                </Link>
              <div 
              onClick={() => handleQuickView(product)}
              className="bg-white py-[15px] cursor-pointer rounded-full w-[50px] h-[50px] flex justify-center hover:text-white hover:bg-black transition-all ease-in-out duration-[.3s]">
                <Search size={22} />
              </div>
        </div>
        <button
          className="bg-white md:hidden rounded-full p-[6px] border border-gray-400 w-fit absolute right-2"
        >
           <Link to={`/product/${product.id}`}>
             <ArrowRight size={15} />
            </Link>
        </button>
     </div>
    ))
  )   :   (
    <div className="w-full text-center text-gray-500 py-10">
      No products found.
    </div>
 )}
      </div>

      {/* Render QuickViewModal */}
      {isQuickViewModalOpen && (
        <QuickViewModal product={selectedProduct} onClose={closeQuickView} />
      )}

      {/* Pagination */}
{totalPages > 1 && (
  <div className="pagination flex justify-center items-center gap-2 mt-[30px]">
    {/* Left arrow */}
    <button 
      onClick={() => {
        setCurrentPage((prev) => Math.max(prev - 1, 1));
        window.scrollTo(0, 0);
      }}
      disabled={currentPage === 1}
      className="px-3 py-1 border rounded disabled:opacity-50"
    >
      &lt;
    </button>

    {/* Page numbers */}
    {generatePageNumbers().map((number, index) => {
      const prevNumber = index > 0 ? generatePageNumbers()[index - 1] : null;
      const showEllipsisBefore = prevNumber && number - prevNumber > 1;

      return (
        <React.Fragment key={number}>
          {showEllipsisBefore && <span className="px-2">...</span>}
          <button
            onClick={() => {
              setCurrentPage(number);
              window.scrollTo(0, 0);
            }}
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
      onClick={() => {
        setCurrentPage((prev) => Math.min(prev + 1, totalPages));
        window.scrollTo(0, 0);
      }}
      disabled={currentPage === totalPages}
      className="px-3 py-1 border rounded disabled:opacity-50"
    >
      &gt;
    </button>
  </div>
)}

    </div>
  );
};

export default ProductList;
