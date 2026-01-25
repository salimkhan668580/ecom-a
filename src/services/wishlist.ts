import axiosInstance from "../axios/axiosInstance";
import { WishlistResponse, AddToWishlistPayload, DeleteFromWishlistPayload, ApiResponse } from "../types";

class WishlistService {
  async getWishlist(): Promise<WishlistResponse> {
    const response = await axiosInstance.get<WishlistResponse>("/user/wishlist");
    return response.data;
  }

  async addToWishlist(payload: AddToWishlistPayload): Promise<ApiResponse> {
    const response = await axiosInstance.post<ApiResponse>("/user/add-to-wishlist", payload);
    return response.data;
  }

  async deleteFromWishlist(payload: DeleteFromWishlistPayload): Promise<ApiResponse> {
    const response = await axiosInstance.post<ApiResponse>("/user/delete-to-wishlist", payload);
    return response.data;
  }
}

export default new WishlistService();
