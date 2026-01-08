import React from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation, useRoute, RouteProp, NavigationProp } from "@react-navigation/native";
import { Entypo } from "@expo/vector-icons";
import { RootStackParamList } from "../navigation/AppNevigation";
import { LinearGradient } from "expo-linear-gradient";

type OrderDetailsRouteProp = RouteProp<RootStackParamList, "OrderDetails">;

// Mock order details data
const getOrderDetails = (orderId: string) => {
  const orders: Record<string, any> = {
    "ORD-001": {
      id: "ORD-001",
      date: "2024-01-15",
      status: "Delivered",
      total: "$129.99",
      subtotal: "$119.99",
      shipping: "$10.00",
      items: [
        { name: "Product A", quantity: 2, price: "$39.99" },
        { name: "Product B", quantity: 1, price: "$40.01" },
      ],
      shippingAddress: {
        name: "John Doe",
        street: "123 Main Street",
        city: "New York",
        state: "NY",
        zip: "10001",
        phone: "+1 234 567 8900",
      },
      trackingNumber: "TRK-123456789",
    },
    "ORD-002": {
      id: "ORD-002",
      date: "2024-01-10",
      status: "Processing",
      total: "$89.50",
      subtotal: "$79.50",
      shipping: "$10.00",
      items: [
        { name: "Product C", quantity: 1, price: "$49.50" },
        { name: "Product D", quantity: 1, price: "$30.00" },
      ],
      shippingAddress: {
        name: "John Doe",
        street: "123 Main Street",
        city: "New York",
        state: "NY",
        zip: "10001",
        phone: "+1 234 567 8900",
      },
      trackingNumber: "TRK-987654321",
    },
  };
  return orders[orderId] || orders["ORD-001"];
};

const getStatusColor = (status: string) => {
  switch (status) {
    case "Delivered":
      return "#10B981";
    case "Processing":
      return "#F59E0B";
    case "Shipped":
      return "#3B82F6";
    case "Cancelled":
      return "#EF4444";
    default:
      return "#6B7280";
  }
};

export default function OrderDetails() {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const route = useRoute<OrderDetailsRouteProp>();
  const { orderId } = route.params;
  const order = getOrderDetails(orderId);

  return (
    <SafeAreaView className="flex-1 bg-background">
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View className="px-6 pt-6 pb-4">
          <View className="flex-row items-center mb-2">
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              className="mr-4"
            >
              <Entypo name="chevron-left" size={24} color="#111827" />
            </TouchableOpacity>
            <Text className="text-normal-text text-3xl font-bold">
              Order Details
            </Text>
          </View>
        </View>

        {/* Order Status Card */}
        <View className="px-6 mb-6">
          <View className="bg-white rounded-xl p-4 shadow-sm">
            <View className="flex-row items-center justify-between mb-4">
              <View>
                <Text className="text-secondary-text text-sm mb-1">
                  Order ID
                </Text>
                <Text className="text-normal-text text-lg font-semibold">
                  {order.id}
                </Text>
              </View>
              <View
                className="px-3 py-2 rounded-full"
                style={{ backgroundColor: `${getStatusColor(order.status)}20` }}
              >
                <Text
                  className="text-sm font-semibold"
                  style={{ color: getStatusColor(order.status) }}
                >
                  {order.status}
                </Text>
              </View>
            </View>
            <View className="border-t border-gray-100 pt-4">
              <Text className="text-secondary-text text-sm mb-1">
                Order Date
              </Text>
              <Text className="text-normal-text text-base">{order.date}</Text>
            </View>
            {order.trackingNumber && (
              <View className="border-t border-gray-100 pt-4 mt-4">
                <Text className="text-secondary-text text-sm mb-1">
                  Tracking Number
                </Text>
                <Text className="text-normal-text text-base font-medium">
                  {order.trackingNumber}
                </Text>
              </View>
            )}
          </View>
        </View>

        {/* Order Items */}
        <View className="px-6 mb-6">
          <Text className="text-normal-text text-xl font-semibold mb-4">
            Order Items
          </Text>
          <View className="bg-white rounded-xl p-4 shadow-sm">
            {order.items.map((item: any, index: number) => (
              <View
                key={index}
                className={`flex-row items-center justify-between ${
                  index !== order.items.length - 1 ? "pb-4 mb-4 border-b border-gray-100" : ""
                }`}
              >
                <View className="flex-1">
                  <Text className="text-normal-text text-base font-medium mb-1">
                    {item.name}
                  </Text>
                  <Text className="text-secondary-text text-sm">
                    Quantity: {item.quantity}
                  </Text>
                </View>
                <Text className="text-normal-text text-base font-semibold">
                  {item.price}
                </Text>
              </View>
            ))}
          </View>
        </View>

        {/* Shipping Address */}
        <View className="px-6 mb-6">
          <Text className="text-normal-text text-xl font-semibold mb-4">
            Shipping Address
          </Text>
          <View className="bg-white rounded-xl p-4 shadow-sm">
            <Text className="text-normal-text text-base font-medium mb-2">
              {order.shippingAddress.name}
            </Text>
            <Text className="text-secondary-text text-sm mb-1">
              {order.shippingAddress.street}
            </Text>
            <Text className="text-secondary-text text-sm mb-1">
              {order.shippingAddress.city}, {order.shippingAddress.state}{" "}
              {order.shippingAddress.zip}
            </Text>
            <Text className="text-secondary-text text-sm">
              {order.shippingAddress.phone}
            </Text>
          </View>
        </View>

        {/* Order Summary */}
        <View className="px-6 mb-6">
          <Text className="text-normal-text text-xl font-semibold mb-4">
            Order Summary
          </Text>
          <View className="bg-white rounded-xl p-4 shadow-sm">
            <View className="flex-row items-center justify-between mb-3">
              <Text className="text-secondary-text text-base">Subtotal</Text>
              <Text className="text-normal-text text-base">{order.subtotal}</Text>
            </View>
            <View className="flex-row items-center justify-between mb-3">
              <Text className="text-secondary-text text-base">Shipping</Text>
              <Text className="text-normal-text text-base">
                {order.shipping}
              </Text>
            </View>
            <View className="border-t border-gray-200 pt-3 mt-2">
              <View className="flex-row items-center justify-between">
                <Text className="text-normal-text text-lg font-semibold">
                  Total
                </Text>
                <Text className="text-normal-text text-xl font-bold">
                  {order.total}
                </Text>
              </View>
            </View>
          </View>
        </View>

        {/* Action Buttons */}
        {order.status === "Delivered" && (
          <View className="px-6 mb-6">
            <TouchableOpacity
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
                  Reorder
                </Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>
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

