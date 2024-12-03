import React, { useState } from "react";
import { Menu, User, ShoppingBag, Search, X, Heart, Box, ChevronDown } from "lucide-react";
import logo from "../../assets/images/logo.png";
import { useLocation, Link } from "react-router-dom";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null); // State for dropdowns
  const location = useLocation();

  const toggleDropdown = (id) => {
    setActiveDropdown(activeDropdown === id ? null : id);
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
          <ShoppingBag size={30} className="text-white" />
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
          <ul className="space-y-5">
            <li>
              <button
                onClick={() => toggleDropdown("cases")}
                className="flex justify-between items-center w-full"
              >
                Cases
                <span
                  className={`transform ${
                    activeDropdown === "cases" ? "rotate-180" : ""
                  }`}
                >
                  <ChevronDown size={15} />
                </span>
              </button>
              {activeDropdown === "cases" && (
                <ul className="pl-4 pt-4 space-y-3">
                  <li>iPhone Cases</li>
                  <li>iPad Cases</li>
                  <li>Samsung Cases</li>
                </ul>
              )}
            </li>

            <li>
              <button
                onClick={() => toggleDropdown("screenProtectors")}
                className="flex justify-between items-center w-full"
              >
                Screen Protectors
                <span
                  className={`transform ${
                    activeDropdown === "screenProtectors" ? "rotate-180" : ""
                  }`}
                >
                  <ChevronDown size={15} />
                </span>
              </button>
              {activeDropdown === "screenProtectors" && (
                <ul className="pl-4 pt-4 space-y-3">
                  <li>iPhone Screen Protectors</li>
                  <li>iPad Screen Protectors</li>
                  <li>Samsung Screen Protectors</li>
                </ul>
              )}
            </li>

            <li>
              MagSafe
            </li>
            <li>Cables</li>
            <li>Chargers</li>
            <li>Power Banks</li>
            <li>Headphones</li>

            <li>
              <button
                onClick={() => toggleDropdown("more")}
                className="flex justify-between items-center w-full"
              >
                More
                <span
                  className={`transform ${
                    activeDropdown === "more" ? "rotate-180" : ""
                  }`}
                >
                  <ChevronDown size={15} />
                </span>
              </button>
              {activeDropdown === "more" && (
                <ul className="pl-4 pt-4 space-y-3">
                  <li>Straps / Bands - 40mm</li>
                  <li>Straps / Bands - 44mm</li>
                  <li>Tripods & Mounts</li>
                  <li>Cradles & Holders</li>
                  <li>Stands</li>
                  <li>Car Kits</li>
                  <li>Adaptors</li>
                  <li>Cleaning</li>
                </ul>
              )}
            </li>
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
