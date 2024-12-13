import React from 'react'
import ImageSlider from './Quick View Modal/ImageSlider'
import ProductInfo from './Quick View Modal/ProductInfo'
import { X } from 'lucide-react'

const QuickViewModal = ({product, onClose}) => {
    if (!product) return null;

  return (
    <div className='fixed inset-0 bg-black py-5 bg-opacity-50 flex justify-center items-center'>
      <div className="bg-white p-7 w-[80%] h-[500px] overflow-y-auto">
        <div
         className="flex justify-end mb-2 cursor-pointer"
         onClick={onClose}
         ><X size={20} /></div>
       <div className='flex gap-7 py-1 '>
       <ImageSlider images={product.images} />
       <ProductInfo 
        name={product.name}
        category={product.category}
        price={product.price}
        description={product.description}
        rating = {product.rating}
        id={product.id}
        images={product.images}
       />
       </div>
      </div>
    </div>
  )
}

export default QuickViewModal
