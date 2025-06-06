// app/layout.tsx
import type React from "react"
import type { Metadata } from "next"
import { Poppins } from "next/font/google"
import "./globals.css"
import LayoutWithCondition from "@/components/LayoutWithCondition"
import { CartProvider } from '@/context/CartContext'

const poppins = Poppins({ subsets: ["latin"], weight: "400" })

export const metadata: Metadata = {
  title: "TechNest",
  description: "E-commerce Platform",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {


  return (
    <html lang="en" className="scroll-smooth">
      <body className={poppins.className}>
        <CartProvider>
          <LayoutWithCondition>{children}</LayoutWithCondition>
        </CartProvider>
      </body>
    </html>
  )
}
