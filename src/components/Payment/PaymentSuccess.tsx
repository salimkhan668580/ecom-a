import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import { FontAwesome6, Entypo } from "@expo/vector-icons";
import { RootStackParamList } from "../../navigation/AppNevigation";

export default function PaymentSuccess() {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const handleViewOrders = () => {
    navigation.navigate("OrderList");
  };

  const handleContinueShopping = () => {
    // Navigate back to home/main tabs
    navigation.navigate("MainTabs");
  };

  return (
    <SafeAreaView className="flex-1 bg-background">
      <View className="flex-1 items-center justify-center px-6">
        {/* Success Icon */}
        <View className="mb-6">
          <View className="w-24 h-24 rounded-full bg-green-100 items-center justify-center">
            <FontAwesome6 name="check" size={48} color="#10B981" />
          </View>
        </View>

        {/* Success Message */}
        <Text className="text-normal-text text-3xl font-bold text-center mb-3">
          Payment Successful!
        </Text>
        <Text className="text-secondary-text text-base text-center mb-8 px-4">
          Your order has been placed successfully. You will receive a confirmation email shortly.
        </Text>

        {/* Order Info Card */}
        <View className="bg-white rounded-xl p-6 mb-6 w-full shadow-sm">
          <View className="flex-row items-center justify-between mb-4">
            <View className="flex-1">
              <Text className="text-secondary-text text-sm mb-1">Order Number</Text>
              <Text className="text-normal-text text-lg font-semibold">
                ORD-{Math.floor(Math.random() * 1000).toString().padStart(3, "0")}
              </Text>
            </View>
            <View className="items-end">
              <Text className="text-secondary-text text-sm mb-1">Date</Text>
              <Text className="text-normal-text text-base">
                {new Date().toLocaleDateString()}
              </Text>
            </View>
          </View>
          <View className="border-t border-gray-200 pt-4">
            <View className="flex-row items-center justify-between">
              <Text className="text-secondary-text text-base">Status</Text>
              <View className="px-3 py-1 rounded-full bg-green-100">
                <Text className="text-green-600 text-sm font-medium">
                  Confirmed
                </Text>
              </View>
            </View>
          </View>
        </View>

        {/* Action Buttons */}
        <View className="w-full gap-3">
          <TouchableOpacity
            onPress={handleViewOrders}
            activeOpacity={0.8}
            style={styles.buttonContainer}
          >
            <LinearGradient
              colors={["#7C3AED", "#EC4899"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.gradientButton}
            >
              <FontAwesome6 name="box" size={18} color="#FFFFFF" />
              <Text className="text-white text-base font-semibold ml-2">
                View My Orders
              </Text>
            </LinearGradient>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={handleContinueShopping}
            activeOpacity={0.7}
          >
            <View className="w-full py-4 items-center justify-center border-2 border-primary rounded-xl">
              <Text className="text-primary text-base font-semibold">
                Continue Shopping
              </Text>
            </View>
          </TouchableOpacity>
        </View>

        {/* Additional Info */}
        <View className="mt-8 items-center">
          <View className="flex-row items-center mb-2">
            <Entypo name="info" size={16} color="#6B7280" />
            <Text className="text-secondary-text text-sm ml-2">
              Track your order in the Orders section
            </Text>
          </View>
        </View>
      </View>
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
    flexDirection: "row",
  },
});
