import axiosInstance from "../axios/axiosInstance";
import { ProductListParams, ProductListResponse, ProductDetailsResponse } from "../types";

class ProductService {
  async getProducts(params?: ProductListParams): Promise<ProductListResponse> {
    const queryParams = new URLSearchParams();
    
    if (params?.page) queryParams.append("page", params.page.toString());
    if (params?.limit) queryParams.append("limit", params.limit.toString());
    if (params?.search) queryParams.append("search", params.search);
    if (params?.price_order) queryParams.append("price_order", params.price_order);
    if (params?.brand) queryParams.append("brand", params.brand);
    if (params?.rating) queryParams.append("rating", params.rating);
    if (params?.category) queryParams.append("category", params.category);

    const queryString = queryParams.toString();
    const url = `/product${queryString ? `?${queryString}` : ""}`;
    
    const response = await axiosInstance.get<ProductListResponse>(url);
    return response.data;
  }

  async getProductDetails(productId: string): Promise<ProductDetailsResponse> {
    const response = await axiosInstance.get<ProductDetailsResponse>(
      `/product?productId=${productId}`
    );
    return response.data;
  }
}

export default new ProductService();
