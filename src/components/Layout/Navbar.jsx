import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Menu, User, ShoppingBag, X, Heart, Box } from "lucide-react";
import { useCart } from "../../context/CartContext";
import logo from "../../assets/images/logo.png";

const Navbar = () => {
  const { state } = useCart();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const categories = [
     { id: 1, name: 'Cases' },
     { id: 2, name: 'Screen Protectors' },
     { id: 3, name: 'MagSafe' },
     { id: 4, name: 'Cables' },
     { id: 5, name: 'Chargers' },
     { id: 6, name: 'Power Banks' },
     { id: 7, name: 'Headphones' }
  ];

  const handleCategoryClick = (categoryName) => {
    const urlFriendlyCategoryName = categoryName
      .toLowerCase()
      .replace(/\s+/g, '-');
  
    setIsMenuOpen(false);
    navigate(`/category/${urlFriendlyCategoryName}`);
  };

  return (
    <div>
      <nav className="px-[25px] py-[30px] md:px-[100px] text-white bg-[#0d6efd]">
        <div className="flex items-center justify-between md:mb-[30px]">
          <div className="flex gap-[20px] items-start">
            <button onClick={() => setIsMenuOpen(true)}>
              <Menu size={25} className="text-white md:hidden" />
            </button>
            <Link to="/">
              <img src={logo} alt="" className="w-[150px] md:w-[200px]" />
            </Link>
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
            <Link to='/order-tracking'>
              <div className="md:flex hidden items-center gap-[10px]">
                <Box size={25} />
                <span className="hidden md:block">Track order</span>
              </div>
            </Link>
            <Link to='/cart'>
              <div className="relative">
                <ShoppingBag size={30} className="text-white" />
                {state.totalQuantity > 0 && (
                  <span className="absolute top-0 left-4 bg-[#6610f2] text-white text-xs rounded-full px-[6px] py-[1px]">
                    {state.totalQuantity}
                  </span>
                )}
              </div>
            </Link>
          </div>
        </div>

        <nav className="pl-6 hidden md:block">
          <ul className="flex items-center justify-between">
            {categories.map((item, index) => (
              <li
                key={index}
                onClick={() => handleCategoryClick(item.name)}
                className="cursor-pointer"
              >
                {item.name}
              </li>
            ))}
          </ul>
        </nav>
      </nav>

      {/* Mobile Sliding Menu */}
      <div
        className={`fixed top-0 left-0 h-full w-[80%] bg-white z-50 transform ${
          isMenuOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out`}
      >
        <div className="bg-[#0d6efd] p-4 flex justify-between items-center">
          <Link to="/">
            <img src={logo} alt="" className="w-[120px]" />
          </Link>
          <button onClick={() => setIsMenuOpen(false)}>
            <X size={25} className="text-white" />
          </button>
        </div>

        <nav className="p-4">
          <ul className="categories space-y-5">
            <li className="border-b pb-2">
              <Link to="/account" className="flex items-center gap-2">
                <User size={20} />
                My Account
              </Link>
            </li>
            <li className="border-b pb-2">
              <Link to="/wishlist" className="flex items-center gap-2">
                <Heart size={20} />
                Wishlist
              </Link>
            </li>
            <li className="border-b pb-2">
              <Link to="/order-tracking" className="flex items-center gap-2">
                <Box size={20} />
                Track Order
              </Link>
            </li>
            {categories.map((item, index) => (
              <li
                key={index}
                onClick={() => handleCategoryClick(item.name)}
                className="border-b pb-2"
              >
                {item.name}
              </li>
            ))}
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