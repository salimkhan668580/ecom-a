import axiosInstance from "../axios/axiosInstance";
import { AddressResponse, AddAddressPayload, UpdateAddressPayload, ApiResponse } from "../types";

class AddressService {
  async getAddresses(): Promise<AddressResponse> {
    const response = await axiosInstance.get<AddressResponse>("/user/address/");
    return response.data;
  }

  async addAddress(payload: AddAddressPayload): Promise<ApiResponse> {
    const response = await axiosInstance.post<ApiResponse>("/user/address", payload);
    return response.data;
  }

  async updateAddress(addressId: string, payload: UpdateAddressPayload): Promise<ApiResponse> {
    const response = await axiosInstance.put<ApiResponse>(
      `/user/address/?addressId=${addressId}`,
      payload
    );
    return response.data;
  }

  async deleteAddress(addressId: string): Promise<ApiResponse> {
    const response = await axiosInstance.delete<ApiResponse>(
      `/user/address/?addressId=${addressId}`
    );
    return response.data;
  }
}

export default new AddressService();
