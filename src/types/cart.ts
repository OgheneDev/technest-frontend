export interface AddToCartParams {
  productId: string;
  quantity: number;
}

export interface CartItem {
  product: CartProduct;
  quantity: number;
}

export interface Cart {
  user: string;
  products: CartItem[];
  totalPrice: number;
}

export interface CartData {
  products: CartItem[];
  totalPrice: number;
}

export interface CartProduct {
  _id: string;
  name: string;
  price: number;
  images: string[];
}

export const FALLBACK_IMAGE = "/placeholder.svg";
