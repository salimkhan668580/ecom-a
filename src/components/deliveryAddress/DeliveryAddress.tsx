import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Alert,
  Modal,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { Entypo, Feather } from "@expo/vector-icons";
import DetailsHeader from "../../layout/DetailsHeader";

type Address = {
  id: string;
  name: string;
  phone: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  isDefault: boolean;
};

export default function DeliveryAddress() {
  // Mock initial addresses
  const [addresses, setAddresses] = useState<Address[]>([
    {
      id: "1",
      name: "John Doe",
      phone: "+1 234 567 8900",
      addressLine1: "123 Main Street",
      addressLine2: "Apt 4B",
      city: "New York",
      state: "NY",
      zipCode: "10001",
      country: "United States",
      isDefault: true,
    },
    {
      id: "2",
      name: "John Doe",
      phone: "+1 234 567 8900",
      addressLine1: "456 Oak Avenue",
      city: "Los Angeles",
      state: "CA",
      zipCode: "90001",
      country: "United States",
      isDefault: false,
    },
  ]);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingAddress, setEditingAddress] = useState<Address | null>(null);
  const [formData, setFormData] = useState<Omit<Address, "id">>({
    name: "",
    phone: "",
    addressLine1: "",
    addressLine2: "",
    city: "",
    state: "",
    zipCode: "",
    country: "United States",
    isDefault: false,
  });

  const openAddModal = () => {
    setEditingAddress(null);
    setFormData({
      name: "",
      phone: "",
      addressLine1: "",
      addressLine2: "",
      city: "",
      state: "",
      zipCode: "",
      country: "United States",
      isDefault: false,
    });
    setIsModalVisible(true);
  };

  const openEditModal = (address: Address) => {
    setEditingAddress(address);
    setFormData({
      name: address.name,
      phone: address.phone,
      addressLine1: address.addressLine1,
      addressLine2: address.addressLine2 || "",
      city: address.city,
      state: address.state,
      zipCode: address.zipCode,
      country: address.country,
      isDefault: address.isDefault,
    });
    setIsModalVisible(true);
  };

  const handleSaveAddress = () => {
    // Validation
    if (
      !formData.name ||
      !formData.phone ||
      !formData.addressLine1 ||
      !formData.city ||
      !formData.state ||
      !formData.zipCode ||
      !formData.country
    ) {
      Alert.alert("Error", "Please fill in all required fields");
      return;
    }

    if (editingAddress) {
      // Update existing address
      setAddresses((prev) =>
        prev.map((addr) =>
          addr.id === editingAddress.id
            ? { ...formData, id: editingAddress.id }
            : formData.isDefault && addr.isDefault
            ? { ...addr, isDefault: false }
            : addr
        )
      );
      Alert.alert("Success", "Address updated successfully!");
    } else {
      // Add new address
      const newAddress: Address = {
        ...formData,
        id: Date.now().toString(),
      };

      // If this is set as default, remove default from others
      if (formData.isDefault) {
        setAddresses((prev) =>
          prev.map((addr) => ({ ...addr, isDefault: false }))
        );
      }

      setAddresses((prev) => [...prev, newAddress]);
      Alert.alert("Success", "Address added successfully!");
    }

    setIsModalVisible(false);
    setEditingAddress(null);
  };

  const handleDeleteAddress = (id: string) => {
    Alert.alert(
      "Delete Address",
      "Are you sure you want to delete this address?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: () => {
            setAddresses((prev) => prev.filter((addr) => addr.id !== id));
            Alert.alert("Success", "Address deleted successfully!");
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
    Alert.alert("Success", "Default address updated!");
  };

  return (
    <SafeAreaView className="flex-1 bg-background">
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        <DetailsHeader
          title="Delivery Addresses"
          subtitle="Manage your delivery addresses"
        />

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
                      <Text className="text-normal-text text-lg font-semibold mr-2">
                        {address.name}
                      </Text>
                      {address.isDefault && (
                        <View className="bg-primary/10 px-2 py-1 rounded">
                          <Text className="text-primary text-xs font-semibold">
                            DEFAULT
                          </Text>
                        </View>
                      )}
                    </View>
                    <Text className="text-secondary-text text-sm">
                      {address.phone}
                    </Text>
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
      </ScrollView>

      {/* Add/Edit Address Modal */}
      <Modal
        visible={isModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setIsModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            {/* Modal Header */}
            <View className="flex-row items-center justify-between px-6 py-4 border-b border-gray-200">
              <Text className="text-normal-text text-2xl font-bold">
                {editingAddress ? "Edit Address" : "Add New Address"}
              </Text>
              <TouchableOpacity
                onPress={() => setIsModalVisible(false)}
                className="p-2"
              >
                <Feather name="x" size={24} color="#6B7280" />
              </TouchableOpacity>
            </View>

            <ScrollView
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{ paddingBottom: 20 }}
            >
              <View className="px-6 py-4">
                {/* Name */}
                <View className="mb-4">
                  <Text className="text-normal-text text-sm font-medium mb-2">
                    Full Name *
                  </Text>
                  <TextInput
                    value={formData.name}
                    onChangeText={(text) =>
                      setFormData({ ...formData, name: text })
                    }
                    placeholder="Enter full name"
                    className="w-full h-12 border-2 border-gray-300 bg-white rounded-lg px-3"
                    style={styles.input}
                  />
                </View>

                {/* Phone */}
                <View className="mb-4">
                  <Text className="text-normal-text text-sm font-medium mb-2">
                    Phone Number *
                  </Text>
                  <TextInput
                    value={formData.phone}
                    onChangeText={(text) =>
                      setFormData({ ...formData, phone: text })
                    }
                    placeholder="Enter phone number"
                    keyboardType="phone-pad"
                    className="w-full h-12 border-2 border-gray-300 bg-white rounded-lg px-3"
                    style={styles.input}
                  />
                </View>

                {/* Address Line 1 */}
                <View className="mb-4">
                  <Text className="text-normal-text text-sm font-medium mb-2">
                    Address Line 1 *
                  </Text>
                  <TextInput
                    value={formData.addressLine1}
                    onChangeText={(text) =>
                      setFormData({ ...formData, addressLine1: text })
                    }
                    placeholder="Street address, P.O. box"
                    className="w-full h-12 border-2 border-gray-300 bg-white rounded-lg px-3"
                    style={styles.input}
                  />
                </View>

                {/* Address Line 2 */}
                <View className="mb-4">
                  <Text className="text-normal-text text-sm font-medium mb-2">
                    Address Line 2
                  </Text>
                  <TextInput
                    value={formData.addressLine2}
                    onChangeText={(text) =>
                      setFormData({ ...formData, addressLine2: text })
                    }
                    placeholder="Apartment, suite, unit, building, floor, etc."
                    className="w-full h-12 border-2 border-gray-300 bg-white rounded-lg px-3"
                    style={styles.input}
                  />
                </View>

                {/* City */}
                <View className="mb-4">
                  <Text className="text-normal-text text-sm font-medium mb-2">
                    City *
                  </Text>
                  <TextInput
                    value={formData.city}
                    onChangeText={(text) =>
                      setFormData({ ...formData, city: text })
                    }
                    placeholder="Enter city"
                    className="w-full h-12 border-2 border-gray-300 bg-white rounded-lg px-3"
                    style={styles.input}
                  />
                </View>

                {/* State and Zip Code Row */}
                <View className="flex-row gap-3 mb-4">
                  <View className="flex-1">
                    <Text className="text-normal-text text-sm font-medium mb-2">
                      State *
                    </Text>
                    <TextInput
                      value={formData.state}
                      onChangeText={(text) =>
                        setFormData({ ...formData, state: text })
                      }
                      placeholder="State"
                      className="w-full h-12 border-2 border-gray-300 bg-white rounded-lg px-3"
                      style={styles.input}
                    />
                  </View>
                  <View className="flex-1">
                    <Text className="text-normal-text text-sm font-medium mb-2">
                      Zip Code *
                    </Text>
                    <TextInput
                      value={formData.zipCode}
                      onChangeText={(text) =>
                        setFormData({ ...formData, zipCode: text })
                      }
                      placeholder="Zip code"
                      keyboardType="numeric"
                      className="w-full h-12 border-2 border-gray-300 bg-white rounded-lg px-3"
                      style={styles.input}
                    />
                  </View>
                </View>

                {/* Country */}
                <View className="mb-4">
                  <Text className="text-normal-text text-sm font-medium mb-2">
                    Country *
                  </Text>
                  <TextInput
                    value={formData.country}
                    onChangeText={(text) =>
                      setFormData({ ...formData, country: text })
                    }
                    placeholder="Enter country"
                    className="w-full h-12 border-2 border-gray-300 bg-white rounded-lg px-3"
                    style={styles.input}
                  />
                </View>

                {/* Default Address Toggle */}
                <View className="flex-row items-center mb-6">
                  <TouchableOpacity
                    onPress={() =>
                      setFormData({
                        ...formData,
                        isDefault: !formData.isDefault,
                      })
                    }
                    className="flex-row items-center"
                    activeOpacity={0.7}
                  >
                    <View
                      className={`w-5 h-5 rounded border-2 items-center justify-center mr-3 ${
                        formData.isDefault
                          ? "bg-primary border-primary"
                          : "border-gray-300"
                      }`}
                    >
                      {formData.isDefault && (
                        <Feather name="check" size={14} color="#FFFFFF" />
                      )}
                    </View>
                    <Text className="text-normal-text text-base">
                      Set as default address
                    </Text>
                  </TouchableOpacity>
                </View>

                {/* Save Button */}
                <TouchableOpacity
                  onPress={handleSaveAddress}
                  activeOpacity={0.8}
                  style={styles.buttonContainer}
                >
                  <LinearGradient
                    colors={["#7C3AED", "#EC4899"]}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    style={styles.gradientButton}
                  >
                    <Text className="text-white text-base font-semibold">
                      {editingAddress ? "Update Address" : "Save Address"}
                    </Text>
                  </LinearGradient>
                </TouchableOpacity>
              </View>
            </ScrollView>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: "#D1D5DB",
    backgroundColor: "#FFFFFF",
  },
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
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "flex-end",
  },
  modalContent: {
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    maxHeight: "90%",
    flexDirection: "column",
  },
});
