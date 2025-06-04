import { Product } from './products'

export interface WishlistItem {
  product: Product;
}

export interface Wishlist {
  _id: string;
  user: string;
  products: WishlistItem[];
  createdAt: string;
  updatedAt: string;
}
