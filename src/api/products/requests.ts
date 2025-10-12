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

export const postProductReview = async (id: string, rating: number, comment: string) => {
  try {
    const response = await axiosInstance.post(`/api/products/${id}/reviews`, {
      rating,
      comment,
    });
    if (response.status !== 201) {
      throw new Error('Failed to post review');
    }

    return response.data.data;
  } catch (error: any) {
    const errorMessage = error.response?.data?.error || 'Failed to post review';
    throw new Error(errorMessage);
  }
};

export const getProductReviews = async (id: string) => {
  try {
    const response = await axiosInstance.get(`/api/products/${id}/reviews`);
    console.log('API response for reviews:', response);
    if (response.status !== 200) {
      throw new Error('Failed to fetch reviews');
    }
    return response.data.data;
  } catch (error: any) {
    const errorMessage = error.response?.data?.error || 'Failed to fetch reviews';
    throw new Error(errorMessage);
  }
};