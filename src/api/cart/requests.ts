import axiosInstance from "../axios";
import { AddToCartParams } from "@/types/cart";

export const getCart = async () => {
    try {
        const response = await axiosInstance.get(
        '/api/cart'
    );
        
        if (response.status !== 200) {
            throw new Error("Failed to fetch cart");
        }
        
        return response.data.data;
    } catch (error) {
        console.error('Error fetching cart:', error);
        return { products: [], totalPrice: 0 };
    }
}

export const addToCart = async ({ productId, quantity }: AddToCartParams) => {
  try {
    const response = await axiosInstance.post('/api/cart', {
      productId,
      quantity
    });

    if (response.status !== 200 && response.status !== 201) {
      throw new Error(response.data?.error || 'Failed to add item to cart');
    }

    return response.data.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.error || error.message || 'An error occurred while adding to cart');
  }
};