export interface Product {
    _id: string,
    name: string,
    images: string[],
    description: string,
    price: number,
    rating: number,
    stock: number,
    category: 'Cases' | 'Screen Protectors' | 'MagSafe' | 'Cables' | 'Chargers' | 'Powerbanks' | 'Headphones' | 'Speakers' | 'Smartwatches' | 'Tablets' | 'Laptops' | 'Accessories',
    createdAt: string,
    updatedAt: string
}