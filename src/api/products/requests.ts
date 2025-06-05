import axiosInstance from "../axios";

export const getProducts = async () => {
    try {
        const response = await axiosInstance.get(
            '/api/products'
        );
        console.log('API response:', response)
        const { data, status } = response;

        if (response.status !== 200) {
         throw new Error("Failed to fetch products");
        }
        return data.data
    } catch (error) {
        console.error('Error fetching products', error);
        return []; 
    }
}

export const getProductById = async (productId: string) => {
  try {
    const response = await axiosInstance.get(`/api/products/${productId}`);

    if (response.status !== 200) {
      throw new Error('Failed to fetch product');
    }

    return response.data.data;
  } catch (error: any) {
    const errorMessage = error.response?.data?.error || 'Failed to fetch product';
    throw new Error(errorMessage);
  }
};