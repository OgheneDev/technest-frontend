import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Menu, User, ShoppingBag, Search, X, Heart, Box } from "lucide-react";
import logo from "../../assets/images/logo.png";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const categories = [
     {
      id: 1, name:'Cases'
     },
     {
      id: 2, name: 'Screen Protectors'
     },
     {
      id: 3, name: 'MagSafe'
     },
     {
      id: 4, name: 'Cables'
     },
     {
      id: 5, name: 'Chargers'
     },
     {
      id: 6, name: 'Power Banks'
     },
     {
      id: 7, name: 'Headphones'
     }
  ]

  // Handle category click
  const handleCategoryClick = (categoryName) => {
    // Convert category name to URL-friendly format
    const urlFriendlyCategoryName = categoryName
        .toLowerCase()
        .replace(/\s+/g, '-');
    
    // Navigate to category page
    navigate(`/category/${urlFriendlyCategoryName}`);
};

  return (
    <div>
      <nav className="px-[25px] py-[20px] md:py-[10px] md:px-[100px] text-white bg-[#0d6efd] flex items-center justify-between">
        <div className="flex gap-[20px] items-start">
          <button onClick={() => setIsMenuOpen(true)}>
            <Menu size={25} className="text-white md:hidden" />
          </button>
          <Link to="/">
            <img src={logo} alt="" className="w-[150px] md:w-[200px]" />
          </Link>
        </div>

        <div className="search-container-mobile md:flex rounded-full border shadow-sm w-fit my-[20px] p-[10px] px-[20px] hidden gap-[20px] mx-auto">
          <input
            type="text"
            placeholder="Search for Products.."
            className="w-[280px] outline-none bg-transparent placeholder:text-white"
          />
          <button>
            <Search size={23} />
          </button>
        </div>

        <div className="flex gap-[20px]">
          <Link to="/account">
            <div className="flex items-center gap-[10px]">
              <User size={25} className="text-white" />
              <span className="hidden md:block">My account</span>
            </div>
          </Link>
          <div className="md:flex hidden items-center gap-[10px]">
            <Heart size={25} />
            <span className="hidden md:block">Wishlist</span>
          </div>
          <div className="md:flex hidden items-center gap-[10px]">
            <Box size={25} />
            <span className="hidden md:block">Track order</span>
          </div>
          <div className="relative">
            <ShoppingBag size={30} className="text-white" />
            <span className="absolute top-0 left-4 bg-[#6610f2] text-white text-xs rounded-full px-[6px] py-[1px]">
              0
            </span>
          </div>
        </div>
      </nav>

      <div className="search-container md:hidden rounded-full border shadow-sm w-fit my-[20px] p-[10px] px-[20px] flex gap-[20px] mx-auto">
        <input
          type="text"
          placeholder="Search for Products.."
          className="w-[280px] outline-none"
        />
        <button>
          <Search size={23} />
        </button>
      </div>

      {/* Mobile Sliding Menu */}
      <div
        className={`fixed top-0 left-0 h-full w-[80%] bg-white z-50 transform ${
          isMenuOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out`}
      >
        <div>
          <button onClick={() => setIsMenuOpen(false)}>
            <X size={25} className="text-white" />
          </button>
        </div>

        <nav className="p-4">
          <ul className="categories space-y-5">
            {
              categories.map((item, index) => (
                <li
                 key={index}
                 onClick={() => handleCategoryClick(item.name)}
                >
                  {item.name}
                </li>
              ))
            }
          </ul>
        </nav>
      </div>

      {/* Backdrop for Mobile Menu */}
      {isMenuOpen && (
        <div
          className="fixed top-0 left-0 w-full h-full bg-black opacity-50 z-40"
          onClick={() => setIsMenuOpen(false)}
        ></div>
      )}
    </div>
  );
};

export default Navbar;
