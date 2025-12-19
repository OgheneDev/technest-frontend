"use client";

import { usePathname } from "next/navigation";
import Navbar from "./layout/Navbar";
import Footer from "./layout/Footer";
import React from "react";

const noLayoutRoutes = ["/login", "/register"];

export default function LayoutWithCondition({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const hideLayout = noLayoutRoutes.includes(pathname);

  return (
    <>
      {!hideLayout && <Navbar />}
      {children}
      {!hideLayout && <Footer />}
    </>
  );
}
