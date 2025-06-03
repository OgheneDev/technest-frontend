export interface AddToCartParams {
  productId: string;
  quantity: number;
}

export interface CartItem {
  product: string;
  quantity: number;
}

export interface Cart {
  user: string;
  products: CartItem[];
  totalPrice: number;
}