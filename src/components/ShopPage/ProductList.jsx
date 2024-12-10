import React, { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { useFetchedProducts } from "../../context/FetchProducts";
import {
  Star,
  Heart,
  MoveRight,
  Search,
  SlidersHorizontal,
  ChevronDown,
  X,
} from "lucide-react";

const ProductList = () => {
  const { products, loading } = useFetchedProducts();

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

  // Pagination logic
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredAndSortedProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  // Calculate total pages
  const totalPages = Math.ceil(filteredAndSortedProducts.length / productsPerPage);

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
      <div className="flex justify-between items-center mb-[30px] md:hidden">
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

      {/* Filter Modal */}
      {isFilterOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-md w-[90%]">
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
        <div className="absolute top-[60px] right-[20px] bg-white shadow-lg rounded-md w-[90%] z-50">
          <ul className="text-sm">
            <li
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
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
      )}

      {/* Product Grid */}
      <div className="product-list grid grid-cols-2 md:grid-cols-4 gap-[30px]">
        {loading ? (
          <div>Loading...</div>
        ) : currentProducts.length > 0 ? (
          currentProducts.map((product) => (
            <div
              key={product.id}
              className="product-item cursor-pointer bg-[#F4F4F4] w-full md:w-[250px] mx-auto p-[20px] text-center flex flex-col gap-[10px] rounded-[15px] relative group"
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
              <p className="text-[#444] font-bold text-xl">${product.price}</p>
            </div>
          ))
        ) : (
          <div className="w-full text-center text-gray-500 py-10">
            No products found.
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductList;
