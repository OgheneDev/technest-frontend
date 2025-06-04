"use client"

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Menu, User, ShoppingCart, X, Heart, Search } from "lucide-react";
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '@/context/CartContext'

// Add logo import
import logo from '@/assets/images/logo.png'; // Adjust path as needed

interface Category {
  id: number;
  name: string;
}

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const { cartCount } = useCart();
  
  const categories: Category[] = [
     { id: 1, name: 'Cases' },
     { id: 2, name: 'Screen Protectors' },
     { id: 3, name: 'MagSafe' }, 
     { id: 4, name: 'Cables' },
     { id: 5, name: 'Chargers' },
     { id: 6, name: 'Power Banks' },
     { id: 7, name: 'Headphones' },
     { id: 8, name: 'Smartwatches' },
     { id: 9, name: 'Tablets' },
     { id: 10, name: 'Laptops' },
     { id: 11, name: 'Accessories' }
  ];

  const router = useRouter();

  const handleCategoryClick = (categoryName: string): void => {
    const urlFriendlyCategoryName = categoryName
      .toLowerCase()
      .replace(/\s+/g, '-');
    
    setIsMenuOpen(false);
    router.push(`/category/${urlFriendlyCategoryName}`);
  };

  const menuVariants = {
    closed: { x: "-100%" },
    open: { x: 0 }
  };

  const listItemVariants = {
    closed: { x: -20, opacity: 0 },
    open: (i: number) => ({
      x: 0,
      opacity: 1,
      transition: { delay: i * 0.1 }
    })
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
              <Link href="/" className="flex-shrink-0">
                <Image 
                  src={logo} 
                  alt="Logo" 
                  width={150}
                  height={40}
                  className="hover:opacity-90 transition-opacity brightness-200 contrast-200" 
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

            <div className=" items-center gap-6 flex">
              <Link href="/account" className="nav-icon-link hidden md:block">
                <User size={22} className="text-white" />
                <span className="nav-icon-text text-sm">Account</span>
              </Link>
              <Link href="/wishlist" className="nav-icon-link hidden md:block">
                <Heart size={22} className="text-white" />
                <span className="nav-icon-text text-sm">Wishlist</span>
              </Link>
              <Link href="/cart" className="relative group">
                <ShoppingCart size={25} className="text-white transform group-hover:scale-110 transition-transform" />
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-pink-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center animate-bounce">
                    {cartCount}
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
      <AnimatePresence>
        {isMenuOpen && (
          <>
            <motion.div
              initial="closed"
              animate="open"
              exit="closed"
              variants={menuVariants}
              className="fixed top-0 left-0 h-full w-full bg-white z-50 shadow-2xl overflow-auto"
            >
              {/* Mobile Menu Header */}
              <div className="bg-gradient-to-r from-gray-900 to-gray-800 p-6">
                <div className="flex justify-between items-center mb-6">
                  <Link href="/">
                    <Image 
                      src={logo} 
                      alt="Logo" 
                      width={150}
                      height={40}
                      className="brightness-200 contrast-200" 
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
                <motion.ul className="space-y-4">
                  {["account", "wishlist"].map((item, i) => (
                    <motion.li
                      key={item}
                      custom={i}
                      variants={listItemVariants}
                      className="mobile-menu-item border-b border-gray-100 pb-3"
                    >
                      <Link 
                        href={`/${item}`} 
                        className="mobile-menu-link hover:bg-gray-50 p-2 rounded-lg flex items-center gap-3 transition-colors"
                      >
                        {item === "account" && <User size={20} className="text-gray-600" />}
                        {item === "wishlist" && <Heart size={20} className="text-gray-600" />}
                        <span className="capitalize text-gray-700 font-medium">
                          {item.split("-").join(" ")}
                        </span>
                      </Link>
                    </motion.li>
                  ))}

                  <motion.li
                    variants={listItemVariants}
                    custom={4}
                    className="pt-4"
                  >
                    <h3 className="text-lg font-semibold text-gray-800 mb-4 border-b border-gray-200 pb-2">
                      Categories
                    </h3>
                    <div className="grid gap-2">
                      {categories.map((item, i) => (
                        <motion.button
                          key={item.id}
                          custom={i + 5}
                          variants={listItemVariants}
                          onClick={() => handleCategoryClick(item.name)}
                          className="w-full text-left px-4 py-3 text-gray-600 hover:bg-blue-50 rounded-lg transition-all hover:scale-[1.02] active:scale-[0.98] flex items-center justify-between group"
                        >
                          <span>{item.name}</span>
                          <motion.span
                            initial={{ x: -5, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            className="text-blue-500 opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            &rarr;
                          </motion.span>
                        </motion.button>
                      ))}
                    </div>
                  </motion.li>
                </motion.ul>
              </nav>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
              onClick={() => setIsMenuOpen(false)}
            />
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Navbar;