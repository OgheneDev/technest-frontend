"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Menu,
  User,
  ShoppingCart,
  X,
  Heart,
  Search,
  LogIn,
  ShoppingBag,
} from "lucide-react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "@/context/CartContext";
import { useAuthStore } from "@/store/useAuthStore";

interface Category {
  id: number;
  name: string;
  value?: string;
}

const Navbar: React.FC = () => {
  const [mounted, setMounted] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const { cartCount } = useCart();
  const { isAuthenticated } = useAuthStore();

  const categories: Category[] = [
    { id: 1, name: "Cases", value: "cases" },
    { id: 2, name: "Screen Protectors", value: "screen-protectors" },
    { id: 3, name: "MagSafe", value: "magsafe" },
    { id: 4, name: "Cables", value: "cables" },
    { id: 5, name: "Chargers", value: "chargers" },
    { id: 6, name: "Power Banks", value: "powerbanks" },
    { id: 7, name: "Headphones", value: "headphones" },
    { id: 8, name: "Smartwatches", value: "smartwatches" },
    { id: 9, name: "Tablets", value: "tablets" },
    { id: 10, name: "Laptops", value: "laptops" },
    { id: 11, name: "Accessories", value: "accessories" },
  ];

  const router = useRouter();

  const handleCategoryClick = (categoryName: string): void => {
    setIsMenuOpen(false);
    router.push(`/shop?category=${categoryName}`);
  };

  const handleMobileMenuClick = (path: string) => {
    setIsMenuOpen(false);
    router.push(path);
  };

  const menuVariants = {
    closed: { x: "-100%" },
    open: { x: 0 },
  };

  const listItemVariants = {
    closed: { x: -20, opacity: 0 },
    open: (i: number) => ({
      x: 0,
      opacity: 1,
      transition: { delay: i * 0.1 },
    }),
  };

  useEffect(() => {
    const fetchCartCount = async () => {
      if (!isAuthenticated) {
        return;
      }
      try {
        // const cartData = await getCart();
        // ...existing cart count logic...
      } catch (error) {
        console.error("Error fetching cart:", error);
      }
    };

    fetchCartCount();
  }, [isAuthenticated]);

  useEffect(() => {
    setMounted(true);

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <div className="sticky top-0 z-50">
      <motion.nav
        initial={false}
        animate={{
          backgroundColor: isScrolled
            ? "rgba(9, 9, 11, 0.95)"
            : "rgba(9, 9, 11, 1)",
        }}
        className="backdrop-blur-md border-b border-zinc-800/50 transition-all"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Left section */}
            <div className="flex items-center gap-4">
              <button
                onClick={() => setIsMenuOpen(true)}
                className="md:hidden p-2 rounded-lg hover:bg-zinc-800 transition-colors"
              >
                <Menu size={24} className="text-white" />
              </button>
              <Link href="/" className="flex-shrink-0">
                <h4 className="text-white text-xl font-semibold">
                  Tech<span className="text-emerald-500">N</span>est
                </h4>
              </Link>
            </div>

            {/* Center - Search Bar */}
            <div className="hidden md:block flex-1 max-w-md mx-8">
              <div className="relative">
                <Search
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500"
                  size={18}
                />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search products..."
                  className="w-full pl-10 pr-4 py-2 rounded-lg bg-zinc-900 border border-zinc-800 text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 transition-all"
                />
              </div>
            </div>

            {/* Right section */}
            <div className="flex items-center gap-4">
              {mounted &&
                (isAuthenticated ? (
                  <>
                    <Link
                      href="/shop"
                      className="hidden md:flex items-center gap-2 px-3 py-2 rounded-lg text-zinc-300 hover:text-white hover:bg-zinc-800 transition-all"
                    >
                      <ShoppingBag size={20} />
                      <span className="text-sm font-medium">Shop</span>
                    </Link>
                    <Link
                      href="/account"
                      className="hidden md:flex items-center gap-2 px-3 py-2 rounded-lg text-zinc-300 hover:text-white hover:bg-zinc-800 transition-all"
                    >
                      <User size={20} />
                      <span className="text-sm font-medium">Account</span>
                    </Link>
                    <Link
                      href="/wishlist"
                      className="hidden md:flex items-center gap-2 px-3 py-2 rounded-lg text-zinc-300 hover:text-white hover:bg-zinc-800 transition-all"
                    >
                      <Heart size={20} />
                      <span className="text-sm font-medium">Wishlist</span>
                    </Link>
                    <Link
                      href="/cart"
                      className="relative p-2 rounded-lg hover:bg-zinc-800 transition-all group"
                    >
                      <ShoppingCart
                        size={24}
                        className="text-zinc-300 group-hover:text-white transition-colors"
                      />
                      {cartCount > 0 && (
                        <span className="absolute -top-1 -right-1 bg-emerald-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                          {cartCount}
                        </span>
                      )}
                    </Link>
                  </>
                ) : (
                  <Link
                    href="/login"
                    className="flex items-center gap-2 font-semibold px-4 py-2 text-sm rounded-lg bg-emerald-500 hover:bg-emerald-400 text-black transition-all"
                  >
                    <LogIn size={18} />
                    <span>Login</span>
                  </Link>
                ))}
            </div>
          </div>

          {/* Categories Desktop */}
          <div className="hidden md:block border-t border-zinc-800/50">
            <div className="flex items-center mx-auto justify-center gap-1 py-3 w-full">
              {categories.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleCategoryClick(item.value || item.name)}
                  className="text-zinc-400 cursor-pointer hover:text-white px-3 py-1.5 rounded-lg hover:bg-zinc-800 transition-all text-sm font-medium whitespace-nowrap"
                >
                  {item.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            <motion.div
              initial="closed"
              animate="open"
              exit="closed"
              variants={menuVariants}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 left-0 h-full w-[85%] max-w-sm bg-zinc-950 z-50 shadow-2xl overflow-auto"
            >
              {/* Mobile Menu Header */}
              <div className="bg-zinc-900 border-b border-zinc-800 p-6">
                <div className="flex justify-between items-center mb-6">
                  <Link href="/" onClick={() => setIsMenuOpen(false)}>
                    <h4 className="text-white text-xl font-semibold">
                      Tech<span className="text-emerald-500">N</span>est
                    </h4>
                  </Link>
                  <button
                    onClick={() => setIsMenuOpen(false)}
                    className="p-2 hover:bg-zinc-800 rounded-lg transition-colors"
                  >
                    <X size={24} className="text-white" />
                  </button>
                </div>
                <div className="relative">
                  <Search
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500"
                    size={18}
                  />
                  <input
                    type="text"
                    placeholder="Search products..."
                    className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-zinc-800 border border-zinc-700 text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
                  />
                </div>
              </div>

              <nav className="p-4">
                <motion.ul className="space-y-2">
                  {["account", "wishlist", "shop"].map((item, i) => (
                    <motion.li
                      key={item}
                      custom={i}
                      variants={listItemVariants}
                    >
                      <div
                        onClick={() => handleMobileMenuClick(`/${item}`)}
                        className="flex items-center gap-3 p-3 rounded-lg hover:bg-zinc-800 transition-colors cursor-pointer"
                      >
                        {item === "shop" && (
                          <ShoppingBag size={20} className="text-emerald-400" />
                        )}
                        {item === "account" && (
                          <User size={20} className="text-emerald-400" />
                        )}
                        {item === "wishlist" && (
                          <Heart size={20} className="text-emerald-400" />
                        )}
                        <span className="capitalize text-white font-medium">
                          {item}
                        </span>
                      </div>
                    </motion.li>
                  ))}

                  {/* Categories in mobile menu */}
                  <motion.li
                    variants={listItemVariants}
                    custom={4}
                    className="pt-6"
                  >
                    <h3 className="text-sm font-semibold text-zinc-400 uppercase tracking-wider mb-3 px-3">
                      Categories
                    </h3>
                    <div className="space-y-1">
                      {categories.map((item, i) => (
                        <motion.button
                          key={item.id}
                          custom={i + 5}
                          variants={listItemVariants}
                          onClick={() =>
                            handleCategoryClick(item.value || item.name)
                          }
                          className="w-full text-left px-3 py-2.5 text-zinc-300 hover:text-white hover:bg-zinc-800 rounded-lg transition-all"
                        >
                          {item.name}
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
              className="fixed inset-0 bg-black/70 backdrop-blur-sm z-40"
              onClick={() => setIsMenuOpen(false)}
            />
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Navbar;
