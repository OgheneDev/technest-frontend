import { motion } from 'framer-motion'
import { Product } from '@/types/products'
import { ShopProductCard } from './ShopProductCard';

interface ProductGridProps {
  products: Product[];
  layout: 'grid' | 'list';
}

export const ProductGrid = ({ products, layout }: ProductGridProps) => {
  return (
    <motion.div 
      layout
      className={`grid gap-6 ${
        layout === 'grid' 
          ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3' 
          : 'grid-cols-1'
      }`}
    >
      {products.map((product) => (
        <ShopProductCard 
          key={product._id}
          product={product}
          layout={layout}
        />
      ))}
    </motion.div>
  )
}
