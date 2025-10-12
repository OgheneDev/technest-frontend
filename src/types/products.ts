export interface Product {
    _id: string,
    name: string,
    images: string[],
    description: string,
    price: number,
    rating: number,
    numReviews: number,
    reviews: {
        user: string,
        rating: number,
        comment: string,
        createdAt: string
    }[],
    stock: number,
    category: 'cases' | 'screen protectors' | 'magSafe' | 'cables' | 'chargers' | 'powerbanks' | 'headphones' | 'speakers' | 'smartwatches' | 'tablets' | 'laptops' | 'accessories',
    createdAt: string,
    updatedAt: string
}

export interface Review {
  _id: string
  rating: number
  comment: string
  user: {
    firstName: string
    lastName: string
    email: string
    avatar: string
  }
  createdAt: string
}