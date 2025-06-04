import axiosInstance from "../axios";

export const getWishlist = async () => {
  try {
    const response = await axiosInstance.get('/api/wishlist');
    
    if (response.status !== 200) {
      throw new Error("Failed to fetch wishlist");
    }
    
    return response.data.data;
  } catch (error: any) {
    console.error('Error fetching wishlist:', error.response?.data || error);
    // Return empty wishlist structure instead of throwing
    return { products: [] };
  }
}; 

export const addToWishlist = async (productId: string) => {
  try {
    const response = await axiosInstance.post('/api/wishlist', {
      productId
    });

    if (response.status !== 200) {
      throw new Error(response.data?.message || 'Failed to update wishlist');
    }

    if (response.data?.error) {
      throw new Error(response.data.error);
    }

    return response.data.data;
  } catch (error: any) {
    const errorMessage = error.response?.data?.error || error.message;
    throw new Error(errorMessage);
  }
};

export const removeFromWishlist = async (productId: string) => {
  try {
    const response = await axiosInstance.delete(`/api/wishlist/${productId}`);

    if (response.status !== 200) {
      throw new Error('Failed to remove item from wishlist');
    }

    return response.data.data;
  } catch (error: any) {
    const errorMessage = error.response?.data?.error || error.message;
    throw new Error(errorMessage);
  }
};