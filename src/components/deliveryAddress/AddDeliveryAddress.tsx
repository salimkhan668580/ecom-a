import React, { useState, useEffect } from "react";
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
import { LinearGradient } from "expo-linear-gradient";
import { Feather } from "@expo/vector-icons";
import { Address } from "./EditDeliveryAddress";

type AddDeliveryAddressProps = {
  visible: boolean;
  onClose: () => void;
  onSave: (addressData: Omit<Address, "id">) => void;
};

const AddDeliveryAddress: React.FC<AddDeliveryAddressProps> = ({
  visible,
  onClose,
  onSave,
}) => {
  const [formData, setFormData] = useState({
    fullAddress: "",
    city: "",
    state: "",
    pin: "",
  });

  useEffect(() => {
    if (visible) {
      // Reset form when modal opens
      setFormData({
        fullAddress: "",
        city: "",
        state: "",
        pin: "",
      });
    }
  }, [visible]);

  const handleSave = () => {
    // Validation
    if (!formData.fullAddress || !formData.city || !formData.state || !formData.pin) {
      Alert.alert("Error", "Please fill in all required fields");
      return;
    }

    // Convert form data to Address format for backward compatibility
    const addressData: Omit<Address, "id"> = {
      name: "",
      phone: "",
      addressLine1: formData.fullAddress,
      addressLine2: "",
      city: formData.city,
      state: formData.state,
      zipCode: formData.pin,
      country: "India",
      isDefault: false,
    };

    onSave(addressData);
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          {/* Modal Header */}
          <View className="flex-row items-center justify-between px-6 py-4 border-b border-gray-200">
            <Text className="text-normal-text text-2xl font-bold">
              Add New Address
            </Text>
            <TouchableOpacity onPress={onClose} className="p-2">
              <Feather name="x" size={24} color="#6B7280" />
            </TouchableOpacity>
          </View>

          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 20 }}
          >
            <View className="px-6 py-4">
              {/* Full Address */}
              <View className="mb-4">
                <Text className="text-normal-text text-sm font-medium mb-2">
                  Full Address *
                </Text>
                <TextInput
                  value={formData.fullAddress}
                  onChangeText={(text) =>
                    setFormData({ ...formData, fullAddress: text })
                  }
                  placeholder="Enter complete address"
                  multiline
                  numberOfLines={3}
                  textAlignVertical="top"
                  className="w-full min-h-20 border-2 border-gray-300 bg-white rounded-lg px-3 py-3"
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

              {/* State and Pin Row */}
              <View className="flex-row gap-3 mb-6">
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
                    Pin Code *
                  </Text>
                  <TextInput
                    value={formData.pin}
                    onChangeText={(text) =>
                      setFormData({ ...formData, pin: text })
                    }
                    placeholder="Pin code"
                    keyboardType="numeric"
                    className="w-full h-12 border-2 border-gray-300 bg-white rounded-lg px-3"
                    style={styles.input}
                  />
                </View>
              </View>

              {/* Save Button */}
              <TouchableOpacity
                onPress={handleSave}
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
                    Save Address
                  </Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
};

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

export default AddDeliveryAddress;
