import axiosInstance from "../axios";

export const initializeCheckout = async (
  shippingAddress: string,
  paymentMethod: string
) => {
  try {
    const response = await axiosInstance.post("/api/checkout/initialize", {
      shippingAddress,
      paymentMethod,
    });

    if (response.status !== 201) {
      throw new Error(`Unexpected status code: ${response.status}`);
    }

    return response.data.data; // Returns { checkout, authorizationUrl, reference, accessCode }
  } catch (error: any) {
    console.error("Initialize checkout error:", {
      message: error.message,
      response: error.response?.data,
      status: error.response?.status,
    });
    const errorMessage =
      error.response?.data?.error || "Failed to initialize checkout";
    throw new Error(errorMessage);
  }
};

export const verifyPayment = async (reference: string) => {
  try {
    const response = await axiosInstance.get(
      `/api/checkout/verify/${reference}`
    );

    if (response.status !== 200) {
      throw new Error(`Unexpected status code: ${response.status}`);
    }

    return response.data.data;
  } catch (error: any) {
    console.error("Verify payment error:", {
      message: error.message,
      response: error.response?.data,
      status: error.response?.status,
    });
    const errorMessage =
      error.response?.data?.error || "Failed to verify payment";
    throw new Error(errorMessage);
  }
};

export const getCheckoutHistory = async () => {
  try {
    const response = await axiosInstance.get("/api/checkout/history");
    console.log("Response status:", response.status);
    console.log("Response data:", response.data);

    if (response.status !== 200) {
      throw new Error(`Unexpected status code: ${response.status}`);
    }

    return response.data; // Returns the full response object
  } catch (error: any) {
    console.error("Get checkout history error:", {
      message: error.message,
      response: error.response?.data,
      status: error.response?.status,
    });
    const errorMessage =
      error.response?.data?.error || "Failed to get checkout history";
    throw new Error(errorMessage);
  }
};

export const getCheckoutById = async (id: string) => {
  try {
    const response = await axiosInstance.get(`/api/checkout/${id}`);

    if (response.status !== 200) {
      throw new Error(`Unexpected status code: ${response.status}`);
    }

    return response.data.data;
  } catch (error: any) {
    console.error("Get checkout by ID error:", {
      message: error.message,
      response: error.response?.data,
      status: error.response?.status,
    });
    const errorMessage =
      error.response?.data?.error || "Failed to get checkout details";
    throw new Error(errorMessage);
  }
};

export const cancelCheckout = async (id: string) => {
  try {
    const response = await axiosInstance.put(`/api/checkout/${id}/cancel`);

    if (response.status !== 200) {
      throw new Error(`Unexpected status code: ${response.status}`);
    }

    return response.data.data;
  } catch (error: any) {
    console.error("Cancel checkout error:", {
      message: error.message,
      response: error.response?.data,
      status: error.response?.status,
    });
    const errorMessage =
      error.response?.data?.error || "Failed to cancel checkout";
    throw new Error(errorMessage);
  }
};
