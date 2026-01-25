import axiosInstance from "../axios/axiosInstance";
import { CartResponse, AddToCartPayload, UpdateCartQuantityPayload, ApiResponse } from "../types";

class CartService {
  async getCart(): Promise<CartResponse> {
    const response = await axiosInstance.get<CartResponse>("/user/cart");
    return response.data;
  }

  async addToCart(payload: AddToCartPayload): Promise<ApiResponse> {
    const response = await axiosInstance.post<ApiResponse>("/user/add-to-cart", payload);
    return response.data;
  }

  async updateCartQuantity(payload: UpdateCartQuantityPayload): Promise<ApiResponse> {
    const response = await axiosInstance.post<ApiResponse>("/user/remove-to-cart", payload);
    return response.data;
  }

  async removeFromCart(productId: string): Promise<ApiResponse> {
    const payload: UpdateCartQuantityPayload = {
      productId,
      qty: 0,
    };
    const response = await axiosInstance.post<ApiResponse>("/user/remove-to-cart", payload);
    return response.data;
  }
}

export default new CartService();
