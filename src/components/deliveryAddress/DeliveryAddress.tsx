import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { Entypo, Feather } from "@expo/vector-icons";
import DetailsHeader from "../../layout/DetailsHeader";
import EditDeliveryAddress, { Address } from "./EditDeliveryAddress";
import AddDeliveryAddress from "./AddDeliveryAddress";
import axiosInstance from "../../axios/axiosInstance";
import Toast from "react-native-toast-message";

// API Response Types
type ApiAddress = {
  fullAddress: string;
  city: string;
  state: string;
  pin: number;
  _id: string;
};

type ApiResponse = {
  success: boolean;
  address: {
    _id: string;
    userId: string;
    allAddress: ApiAddress[];
    __v: number;
  };
};

export default function DeliveryAddress() {
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [isAddModalVisible, setIsAddModalVisible] = useState(false);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [editingAddress, setEditingAddress] = useState<Address | null>(null);
  const [loading, setLoading] = useState(true);

  // Fetch addresses from API
  const fetchAddresses = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get<ApiResponse>("/user/address/");
      
      if (response.data.success && response.data.address?.allAddress) {
        // Map API response to Address type
        const mappedAddresses: Address[] = response.data.address.allAddress.map(
          (apiAddr, index) => ({
            id: apiAddr._id,
            name: "", // API doesn't provide name, using empty string
            phone: "", // API doesn't provide phone, using empty string
            addressLine1: apiAddr.fullAddress,
            addressLine2: "", // API doesn't provide addressLine2
            city: apiAddr.city,
            state: apiAddr.state,
            zipCode: apiAddr.pin.toString(),
            country: "India", // Default country, adjust as needed
            isDefault: index === 0, // Set first address as default
          })
        );
        setAddresses(mappedAddresses);
      }
    } catch (error: any) {
      console.error("Error fetching addresses:", error);
      Alert.alert(
        "Error",
        error.response?.data?.message || "Failed to fetch addresses"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAddresses();
  }, []);

  const openAddModal = () => {
    setIsAddModalVisible(true);
  };

  const openEditModal = (address: Address) => {
    setEditingAddress(address);
    setIsEditModalVisible(true);
  };

  const handleSaveAddress = async (addressData: Omit<Address, "id">) => {
    try {
      if (editingAddress) {
        // Update existing address - Call API
        const apiPayload = {
          fullAddress: addressData.addressLine1,
          city: addressData.city,
          state: addressData.state,
          pin: parseInt(addressData.zipCode) || 0,
        };

        const response = await axiosInstance.put(
          `/user/address/?addressId=${editingAddress.id}`,
          apiPayload
        );

        if (response.data.success) {
          Toast.show({
            type: "success",
            text1: "Address updated successfully!",
          });
          
          setIsEditModalVisible(false);
          setEditingAddress(null);
          
          // Refresh addresses from API
          await fetchAddresses();
        }
      } else {
        // Add new address - Call API
        // Combine addressLine1 and addressLine2 into fullAddress
        const fullAddress = addressData.addressLine2
          ? `${addressData.addressLine1}, ${addressData.addressLine2}`
          : addressData.addressLine1;

        const apiPayload = {
          allAddress: [
            {
              fullAddress: fullAddress,
              city: addressData.city,
              state: addressData.state,
              pin: parseInt(addressData.zipCode) || 0,
            },
          ],
        };

        const response = await axiosInstance.post("/user/address", apiPayload);

        if (response.data.success) {
          Toast.show({
            type: "success",
            text1: "Address added successfully!",
          });
          
          setIsAddModalVisible(false);
          
          // Refresh addresses from API
          await fetchAddresses();
        }
      }
    } catch (error: any) {
      console.error("Error saving address:", error);
      Toast.show({
        type: "error",
        text1: error.response?.data?.message || "Failed to save address",
      });
    }
  };

  const handleDeleteAddress = async (id: string) => {
    // Show confirmation modal
    Alert.alert(
      "Delete Address",
      "Are you sure you want to delete this address?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: async () => {
            try {
              // Call delete API
              await axiosInstance.delete(`/user/address/?addressId=${id}`);
              
              // Show success message
              Toast.show({
                type: "success",
                text1: "Address deleted successfully!",
              });
              
              // Refresh addresses from API
              await fetchAddresses();
            } catch (error: any) {
              console.error("Error deleting address:", error);
              Toast.show({
                type: "error",
                text1: error.response?.data?.message || "Failed to delete address",
              });
            }
          },
        },
      ]
    );
  };

  const handleSetDefault = (id: string) => {
    setAddresses((prev) =>
      prev.map((addr) => ({
        ...addr,
        isDefault: addr.id === id,
      }))
    );
    Toast.show({
      type: "success",
      text1: "Default address updated!",
    });
  };

  return (
    <SafeAreaView className="flex-1 bg-background">
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        <DetailsHeader
          title="Delivery Addresses"
          subtitle="Manage your delivery addresses"
        />

        {/* Loading State */}
        {loading ? (
          <View className="flex-1 items-center justify-center py-20">
            <ActivityIndicator size="large" color="#7C3AED" />
            <Text className="text-secondary-text text-sm mt-4">
              Loading addresses...
            </Text>
          </View>
        ) : (
          <>
            {/* Addresses List */}
            <View className="px-6 mb-6">
              {addresses.length > 0 ? (
            addresses.map((address) => (
              <View
                key={address.id}
                className="bg-white rounded-xl p-4 mb-4 shadow-sm border-2 border-gray-100"
              >
                {/* Address Header */}
                <View className="flex-row items-start justify-between mb-3">
                  <View className="flex-1">
                    <View className="flex-row items-center mb-1">
                      {address.name ? (
                        <Text className="text-normal-text text-lg font-semibold mr-2">
                          {address.name}
                        </Text>
                      ) : null}
                      {address.isDefault && (
                        <View className="bg-primary/10 px-2 py-1 rounded">
                          <Text className="text-primary text-xs font-semibold">
                            DEFAULT
                          </Text>
                        </View>
                      )}
                    </View>
                    {address.phone ? (
                      <Text className="text-secondary-text text-sm">
                        {address.phone}
                      </Text>
                    ) : null}
                  </View>
                  <View className="flex-row items-center gap-2">
                    <TouchableOpacity
                      onPress={() => openEditModal(address)}
                      className="p-2"
                    >
                      <Feather name="edit-2" size={18} color="#7C3AED" />
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => handleDeleteAddress(address.id)}
                      className="p-2"
                    >
                      <Feather name="trash-2" size={18} color="#EF4444" />
                    </TouchableOpacity>
                  </View>
                </View>

                {/* Address Details */}
                <View className="mb-3">
                  <Text className="text-normal-text text-sm leading-5">
                    {address.addressLine1}
                    {address.addressLine2 && `, ${address.addressLine2}`}
                  </Text>
                  <Text className="text-normal-text text-sm leading-5">
                    {address.city}, {address.state} {address.zipCode}
                  </Text>
                  <Text className="text-normal-text text-sm leading-5">
                    {address.country}
                  </Text>
                </View>

                {/* Actions */}
                <View className="flex-row gap-2 pt-3 border-t border-gray-100">
                  {!address.isDefault && (
                    <TouchableOpacity
                      onPress={() => handleSetDefault(address.id)}
                      className="flex-1 h-10 border-2 border-primary rounded-lg items-center justify-center"
                    >
                      <Text className="text-primary text-sm font-semibold">
                        Set as Default
                      </Text>
                    </TouchableOpacity>
                  )}
                </View>
              </View>
            ))
          ) : (
            <View className="bg-white rounded-xl p-8 items-center">
              <Entypo name="location" size={48} color="#D1D5DB" />
              <Text className="text-normal-text text-lg font-semibold mt-4 mb-2">
                No Addresses Yet
              </Text>
              <Text className="text-secondary-text text-sm text-center mb-4">
                Add your first delivery address to get started
              </Text>
            </View>
          )}
        </View>

            {/* Add Address Button */}
            <View className="px-6 mb-6">
              <TouchableOpacity
                onPress={openAddModal}
                activeOpacity={0.8}
                style={styles.buttonContainer}
              >
                <LinearGradient
                  colors={["#7C3AED", "#EC4899"]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={styles.gradientButton}
                >
                  <View className="flex-row items-center">
                    <Feather name="plus" size={20} color="#FFFFFF" />
                    <Text className="text-white text-base font-semibold ml-2">
                      Add New Address
                    </Text>
                  </View>
                </LinearGradient>
              </TouchableOpacity>
            </View>
          </>
        )}
      </ScrollView>

      {/* Add Address Modal */}
      <AddDeliveryAddress
        visible={isAddModalVisible}
        onClose={() => {
          setIsAddModalVisible(false);
        }}
        onSave={handleSaveAddress}
      />

      {/* Edit Address Modal */}
      {editingAddress && (
        <EditDeliveryAddress
          visible={isEditModalVisible}
          editingAddress={editingAddress}
          onClose={() => {
            setIsEditModalVisible(false);
            setEditingAddress(null);
          }}
          onSave={handleSaveAddress}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    width: "100%",
    borderRadius: 12,
    overflow: "hidden",
    shadowColor: "#7C3AED",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  gradientButton: {
    paddingVertical: 16,
    paddingHorizontal: 32,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 12,
  },
});
