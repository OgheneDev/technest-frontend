import type React from "react";
import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import "./globals.css";
import LayoutWithCondition from "@/components/layout/LayoutWithCondition";
import ClientAuthLayout from "@/components/layout/ClientLayout";
import { CartProvider } from "@/context/CartContext";

const manrope = Manrope({ subsets: ["latin"], weight: "400" });

export const metadata: Metadata = {
  title: "TechNest",
  description: "E-commerce Platform",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={manrope.className}>
        <ClientAuthLayout>
          <CartProvider>
            <LayoutWithCondition>{children}</LayoutWithCondition>
          </CartProvider>
        </ClientAuthLayout>
      </body>
    </html>
  );
}
