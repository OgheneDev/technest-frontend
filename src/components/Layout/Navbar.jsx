import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Menu, User, ShoppingBag, X, Heart, Box, Search } from "lucide-react";
import { useCart } from "../../context/CartContext";
import logo from "../../assets/images/logo.png";

const Navbar = () => {
  const { state } = useCart();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
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
    <div className="sticky top-0 z-50">
      <nav className="bg-gradient-to-r from-gray-900 to-gray-800 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <div className="flex items-center gap-4">
              <button 
                onClick={() => setIsMenuOpen(true)}
                className="md:hidden p-2 rounded-lg hover:bg-gray-700 transition-colors"
              >
                <Menu size={25} className="text-white" />
              </button>
              <Link to="/" className="flex-shrink-0">
                <img 
                  src={logo} 
                  alt="Logo" 
                  className="w-[150px] md:w-[180px] hover:opacity-90 transition-opacity brightness-200 contrast-200" 
                />
              </Link>
            </div>

            {/* Search Bar */}
            <div className="hidden md:block flex-1 max-w-lg mx-8">
              <div className="relative flex items-center">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search products..."
                  className="w-full px-4 py-2.5 rounded-full bg-gray-700/50 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <Search className="absolute right-3 text-gray-400" size={20} />
              </div>
            </div>

            <div className="flex items-center gap-6">
              <Link to="/account" className="nav-icon-link">
                <User size={22} className="text-white" />
                <span className="nav-icon-text">Account</span>
              </Link>
              <Link to="/wishlist" className="nav-icon-link">
                <Heart size={22} className="text-white" />
                <span className="nav-icon-text">Wishlist</span>
              </Link>
              <Link to="/order-tracking" className="nav-icon-link">
                <Box size={22} className="text-white" />
                <span className="nav-icon-text">Track</span>
              </Link>
              <Link to="/cart" className="relative group">
                <ShoppingBag size={25} className="text-white transform group-hover:scale-110 transition-transform" />
                {state.totalQuantity > 0 && (
                  <span className="absolute -top-2 -right-2 bg-pink-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center animate-bounce">
                    {state.totalQuantity}
                  </span>
                )}
              </Link>
            </div>
          </div>

          {/* Categories Desktop */}
          <div className="hidden md:block border-t border-blue-400/30">
            <div className="flex justify-between py-3">
              {categories.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleCategoryClick(item.name)}
                  className="text-white/90 hover:text-white px-3 py-1 rounded-lg hover:bg-blue-500/30 transition-all text-sm font-medium"
                >
                  {item.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div
        className={`fixed top-0 left-0 h-full w-[300px] bg-white z-50 transform ${
          isMenuOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out shadow-2xl`}
      >
        {/* Mobile Menu Header */}
        <div className="bg-gradient-to-r from-gray-900 to-gray-800 p-6">
          <div className="flex justify-between items-center mb-6">
            <Link to="/">
              <img 
                src={logo} 
                alt="Logo" 
                className="w-[120px] brightness-200 contrast-200" 
              />
            </Link>
            <button 
              onClick={() => setIsMenuOpen(false)}
              className="p-2 hover:bg-gray-700/30 rounded-lg transition-colors"
            >
              <X size={24} className="text-white" />
            </button>
          </div>
          <div className="relative flex items-center">
            <input
              type="text"
              placeholder="Search products..."
              className="w-full px-4 py-2.5 rounded-full bg-gray-700/50 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <Search className="absolute right-3 text-gray-400" size={20} />
          </div>
        </div>

        <nav className="p-4">
          <ul className="space-y-2">
            <li className="mobile-menu-item">
              <Link to="/account" className="mobile-menu-link">
                <User size={20} />
                <span>My Account</span>
              </Link>
            </li>
            <li className="mobile-menu-item">
              <Link to="/wishlist" className="mobile-menu-link">
                <Heart size={20} />
                <span>Wishlist</span>
              </Link>
            </li>
            <li className="mobile-menu-item">
              <Link to="/order-tracking" className="mobile-menu-link">
                <Box size={20} />
                <span>Track Order</span>
              </Link>
            </li>
            <li className="mt-4 border-t border-gray-200 pt-4">
              <p className="text-sm font-semibold text-gray-500 mb-2">Categories</p>
              {categories.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleCategoryClick(item.name)}
                  className="block w-full text-left px-4 py-2 text-gray-600 hover:bg-blue-50 rounded-lg transition-colors"
                >
                  {item.name}
                </button>
              ))}
            </li>
          </ul>
        </nav>
      </div>

      {/* Backdrop */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 transition-opacity"
          onClick={() => setIsMenuOpen(false)}
        ></div>
      )}
    </div>
  );
};

export default Navbar;