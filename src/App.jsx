import React from "react";
import { RouterProvider, createBrowserRouter, createRoutesFromElements, Route } from "react-router-dom";
import { CartProvider } from "./context/CartContext";
import { AuthProvider } from "./context/AuthContext"; // Add this import
import { WishlistProvider } from "./context/WishlistContext";
import MainLayout from "./layouts/MainLayout";
import LandingPage from "./pages/LandingPage";
import AuthenticationPage from "./pages/AuthenticationPage";
import ShopPage from "./pages/ShopPage";
import CategoryPage from "./pages/CategoryPage";
import ProductDetailPage from "./pages/ProductDetailPage";
import CartPage from "./pages/CartPage";
import AboutUspage from "./pages/AboutUspage";
import BlogPage from "./pages/BlogPage";
import OrderTrackingPage from "./pages/OrderTrackingPage";
import WishlistPage from "./pages/WishlistPage";
import ContactUsPage from "./pages/ContactUsPage";
import CheckoutPage from "./pages/CheckoutPage";
import OrderComplete from "./pages/OrderComplete";

const App = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<MainLayout />}>
        <Route index element={<LandingPage />} />
        <Route path="/account" element={<AuthenticationPage />} />
        <Route path="/shop" element={<ShopPage />} />
        <Route path="/category/:categoryName" element={<CategoryPage />} />
        <Route path="/product/:productId" element={<ProductDetailPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/about-us" element={<AboutUspage />} />
        <Route path="/blog" element={<BlogPage />} />
        <Route path="/order-tracking" element={<OrderTrackingPage />} />
        <Route path="/wishlist" element={<WishlistPage />} />
        <Route path="/contact-us" element={<ContactUsPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/order-complete" element={<OrderComplete />} />
      </Route>
    )
  );

  return (
    <AuthProvider>
      <CartProvider>
        <WishlistProvider>
          <RouterProvider router={router} />
        </WishlistProvider>
      </CartProvider>
    </AuthProvider>
  );
};

export default App;