import React from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import { Entypo } from "@expo/vector-icons";
import { RootStackParamList } from "../../../navigation/AppNevigation";

// Mock order data
const mockOrders = [
  {
    id: "ORD-001",
    date: "2024-01-15",
    status: "Delivered",
    total: "$129.99",
    items: 3,
  },
  {
    id: "ORD-002",
    date: "2024-01-10",
    status: "Processing",
    total: "$89.50",
    items: 2,
  },
  {
    id: "ORD-003",
    date: "2024-01-05",
    status: "Shipped",
    total: "$249.99",
    items: 5,
  },
  {
    id: "ORD-004",
    date: "2023-12-28",
    status: "Delivered",
    total: "$179.99",
    items: 4,
  },
  {
    id: "ORD-005",
    date: "2023-12-20",
    status: "Cancelled",
    total: "$99.99",
    items: 2,
  },
];

const getStatusColor = (status: string) => {
  switch (status) {
    case "Delivered":
      return "#10B981"; // green
    case "Processing":
      return "#F59E0B"; // amber
    case "Shipped":
      return "#3B82F6"; // blue
    case "Cancelled":
      return "#EF4444"; // red
    default:
      return "#6B7280"; // gray
  }
};

export default function OrderList() {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const handleOrderPress = (orderId: string) => {
    navigation.navigate("OrderDetails", { orderId });
  };

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
              My Orders
            </Text>
          </View>
          <Text className="text-secondary-text text-base ml-10">
            View and track your orders
          </Text>
        </View>

        {/* Orders List */}
        <View className="px-6 mb-6">
          {mockOrders.map((order) => (
            <TouchableOpacity
              key={order.id}
              onPress={() => handleOrderPress(order.id)}
              activeOpacity={0.7}
              className="bg-white rounded-xl p-4 mb-4 shadow-sm"
            >
              <View className="flex-row items-center justify-between mb-3">
                <View className="flex-1">
                  <Text className="text-normal-text text-base font-semibold mb-1">
                    {order.id}
                  </Text>
                  <Text className="text-secondary-text text-sm">
                    {order.date} • {order.items} items
                  </Text>
                </View>
                <View
                  className="px-3 py-1 rounded-full"
                  style={{ backgroundColor: `${getStatusColor(order.status)}20` }}
                >
                  <Text
                    className="text-sm font-medium"
                    style={{ color: getStatusColor(order.status) }}
                  >
                    {order.status}
                  </Text>
                </View>
              </View>
              <View className="flex-row items-center justify-between pt-3 border-t border-gray-100">
                <Text className="text-secondary-text text-sm">Total</Text>
                <Text className="text-normal-text text-lg font-bold">
                  {order.total}
                </Text>
              </View>
              <View className="flex-row items-center justify-end mt-2">
                <Text className="text-primary text-sm font-medium mr-1">
                  View Details
                </Text>
                <Entypo name="chevron-right" size={16} color="#7C3AED" />
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* Empty State (if no orders) */}
        {mockOrders.length === 0 && (
          <View className="flex-1 items-center justify-center px-6 py-12">
            <Entypo name="box" size={64} color="#D1D5DB" />
            <Text className="text-normal-text text-xl font-semibold mt-4 mb-2">
              No Orders Yet
            </Text>
            <Text className="text-secondary-text text-center">
              Your orders will appear here once you make a purchase
            </Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

