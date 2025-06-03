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
      throw new Error(response.data?.message || 'Failed to add item to cart');
    }

    if (response.data?.error) {
      throw new Error(response.data.error);
    }

    return response.data.data;
  } catch (error: any) {
    const errorMessage = error.response?.data?.error || error.message || 'An error occurred while adding to cart';
    throw new Error(errorMessage);
  }
};

export const deleteCartItem = async (productId: string) => {
    try {
        const response = await axiosInstance.delete(
            `/api/cart/${productId}`
        );

        if (response.status !== 200 ) {
            throw new Error ("Failed to delete item from cart")
        }

        return response.data.data;
    } catch (error) {
        console.error('Error deleting item from cart:', error);
        throw error;
    }
};

export const updateCartQuantity = async (productId: string, quantity: number) => {
  try {
    const response = await axiosInstance.put(`/api/cart/${productId}`, {
      quantity
    });

    if (response.status !== 200) {
      throw new Error(response.data?.message || 'Failed to update cart quantity');
    }

    return response.data.data;
  } catch (error: any) {
    const errorMessage = error.response?.data?.error || error.message || 'An error occurred while updating quantity';
    throw new Error(errorMessage);
  }
};

export const clearCart = async () => {
  try {
    const response = await axiosInstance.delete('/api/cart');

    if (response.status !== 200) {
      throw new Error('Failed to clear cart');
    }

    return response.data.data;
  } catch (error: any) {
    const errorMessage = error.response?.data?.error || error.message || 'An error occurred while clearing cart';
    throw new Error(errorMessage);
  }
};