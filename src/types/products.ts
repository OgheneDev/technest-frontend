export interface Product {
    _id: string,
    name: string,
    images: string[],
    description: string,
    price: number,
    rating: number,
    stock: number,
    category: 'cases' | 'screen protectors' | 'magSafe' | 'cables' | 'chargers' | 'powerbanks' | 'headphones' | 'speakers' | 'smartwatches' | 'tablets' | 'laptops' | 'accessories',
    createdAt: string,
    updatedAt: string
}