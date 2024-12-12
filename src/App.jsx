import React from "react";
import { RouterProvider, createBrowserRouter, createRoutesFromElements, Route } from "react-router-dom";
import { CartProvider } from "./context/CartContext";
import MainLayout from "./layouts/MainLayout";
import LandingPage from "./pages/LandingPage";
import AuthenticationPage from "./pages/AuthenticationPage";
import ShopPage from "./pages/ShopPage";
import CategoryPage from "./pages/CategoryPage";
import ProductDetailPage from "./pages/ProductDetailPage";
import CartPage from "./pages/CartPage";
import AboutUspage from "./pages/AboutUspage";
import BlogPage from "./pages/BlogPage";

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
      </Route>
    )
  );

  return (
    <CartProvider>
      <RouterProvider router={router} />
    </CartProvider>
  );
};

export default App;
