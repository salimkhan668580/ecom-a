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
  ActivityIndicator
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Feather } from "@expo/vector-icons";

export type Address = {
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

type EditDeliveryAddressProps = {
  visible: boolean;
  editingAddress: Address;
  onClose: () => void;
  onSave: (addressData: Omit<Address, "id">) => void;
};

const EditDeliveryAddress: React.FC<EditDeliveryAddressProps> = ({
  visible,
  editingAddress,
  onClose,
  onSave,
}) => {
  const [formData, setFormData] = useState({
    fullAddress: "",
    city: "",
    state: "",
    pin: "",
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (editingAddress) {
      // Combine addressLine1 and addressLine2 into fullAddress
      const fullAddress = editingAddress.addressLine2
        ? `${editingAddress.addressLine1}, ${editingAddress.addressLine2}`
        : editingAddress.addressLine1;
      
      setFormData({
        fullAddress: fullAddress,
        city: editingAddress.city,
        state: editingAddress.state,
        pin: editingAddress.zipCode,
      });
    }
  }, [editingAddress, visible]);

  const handleSave = async () => {
    // Validation
    if (!formData.fullAddress || !formData.city || !formData.state || !formData.pin) {
      Alert.alert("Error", "Please fill in all required fields");
      return;
    }

    try {
      setLoading(true);

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

      // Call onSave and wait for it to complete
      await Promise.resolve(onSave(addressData));
    } catch (error) {
      console.error("Error saving address:", error);
    } finally {
      setLoading(false);
    }
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
              Edit Address
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
                disabled={loading}
                style={styles.buttonContainer}
              >
                <LinearGradient
                  colors={["#7C3AED", "#EC4899"]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={styles.gradientButton}
                >
                  {loading ? (
                    <ActivityIndicator size="small" color="#FFFFFF" />
                  ) : (
                    <Text className="text-white text-base font-semibold">
                      Update Address
                    </Text>
                  )}
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

export default EditDeliveryAddress;
