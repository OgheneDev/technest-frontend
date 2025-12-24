"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useAuthStore } from "@/store/useAuthStore";
import Loader from "../ui/Loader";

interface ClientAuthLayoutProps {
  children: React.ReactNode;
}

// Routes that don't require authentication
const PUBLIC_ROUTES = ["/", "/login", "/register", "/forgot-password", "/shop"];

// Routes that should redirect to /shop if user is already logged in
const AUTH_ROUTES = ["/login", "/register", "/forgot-password"];

// Check if route is a reset password route (dynamic)
const isResetPasswordRoute = (path: string) => {
  return path.startsWith("/reset-password");
};

// Check if route is a product detail page (dynamic)
const isProductRoute = (path: string) => {
  return path.startsWith("/products/");
};

export default function ClientAuthLayout({ children }: ClientAuthLayoutProps) {
  const pathname = usePathname();
  const router = useRouter();
  const { authUser, checkAuth, isCheckingAuth } = useAuthStore();

  useEffect(() => {
    // Check authentication on mount
    checkAuth();
  }, [checkAuth]);

  useEffect(() => {
    // Only run protection logic after auth check is complete
    if (isCheckingAuth) return;

    const isPublicRoute =
      PUBLIC_ROUTES.includes(pathname) ||
      isResetPasswordRoute(pathname) ||
      isProductRoute(pathname);
    const isAuthRoute = AUTH_ROUTES.includes(pathname);

    // Redirect to login if trying to access protected route without auth
    if (!authUser && !isPublicRoute) {
      router.push(`/login?from=${encodeURIComponent(pathname)}`);
      return;
    }

    // Redirect to account page if logged in user tries to access auth pages
    if (authUser && isAuthRoute) {
      router.push("/account");
      return;
    }
  }, [authUser, pathname, router, isCheckingAuth]);

  if (isCheckingAuth) {
    return <Loader />;
  }

  return <>{children}</>;
}
