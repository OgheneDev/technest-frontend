import React from 'react'
import { Product } from '@/types/products'
import { Card, CardContent } from '../ui/card'
import { Button } from '../ui/button'
import { Badge } from '../ui/badge'
import Image from 'next/image'
import { ShoppingCart } from 'lucide-react'
import { motion } from 'framer-motion'

interface FeaturedProductCardProps {
    product: Product
}

const FeaturedProductCard: React.FC<FeaturedProductCardProps> = ({product}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.3 }}
    >
      <Card className="group relative overflow-hidden md:w-[300px] bg-white hover:shadow-xl transition-shadow duration-300">
        <motion.div 
          className="relative aspect-square cursor-pointer"
          whileHover={{ scale: 1.02 }}
          transition={{ type: "tween", duration: 0.2 }}
        >
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-500"
          />
          <motion.div
            initial={{ opacity: 0 }}
            whileHover={{ opacity: 1 }}
            className="absolute inset-0 bg-black/20 transition-opacity"
          />
          <Badge 
            className="absolute right-2 top-2 bg-green-500 text-white shadow-lg"
          >
            New
          </Badge>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileHover={{ opacity: 1, y: 0 }}
            className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/70 to-transparent"
          >
            <p className="text-white text-sm font-medium truncate">
              {product.name}
            </p>
          </motion.div>
        </motion.div>

        <CardContent className="mt-4 bg-white">
          <motion.div layout className="space-y-2">
            <motion.h3 
              className="font-medium text-gray-900 line-clamp-1 group-hover:text-blue-600 transition-colors"
            >
              {product.name}
            </motion.h3>
            <div className="flex items-center justify-between">
              <motion.span 
                className="font-bold text-lg bg-gradient-to-r from-blue-600 to-violet-600 bg-clip-text text-transparent"
                whileHover={{ scale: 1.05 }}
              >
                ₦{product.price}
              </motion.span>
              <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button 
                  size="sm" 
                  className="rounded-full cursor-pointer p-2 bg-gray-50 hover:bg-blue-600 hover:text-white transition-colors"
                >
                  <ShoppingCart className="h-4 w-4" />
                  <span className="sr-only">Add to cart</span>
                </Button>
              </motion.div>
            </div>
          </motion.div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

export default FeaturedProductCard