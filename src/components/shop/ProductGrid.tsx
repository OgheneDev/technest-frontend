import { motion } from 'framer-motion'
import { Product } from '@/types/products'
import { ShopProductCard } from './ShopProductCard';

interface ProductGridProps {
  products: Product[];
  layout: 'grid' | 'list';
}

export const ProductGrid = ({ products, layout }: ProductGridProps) => {
  if (products.length === 0) {
    return (
      <div className="text-center py-12 bg-white/10 backdrop-blur-sm rounded-xl border border-white/10">
        <h3 className="text-lg font-medium text-white">No products found</h3>
        <p className="mt-2 text-white/70">Try adjusting your search or filters</p>
      </div>
    )
  }

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
