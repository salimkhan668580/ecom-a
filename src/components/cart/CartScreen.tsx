import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  StyleSheet,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { Entypo } from "@expo/vector-icons";
import Header from "../../layout/Header";

// Mock cart items
const initialCartItems = [
  {
    id: "1",
    name: "Product A",
    price: 39.99,
    quantity: 2,
    image: require("../../../assets/logo.png"), // Using logo as placeholder
  },
  {
    id: "2",
    name: "Product B",
    price: 49.99,
    quantity: 1,
    image: require("../../../assets/logo.png"),
  },
  {
    id: "3",
    name: "Product C",
    price: 29.99,
    quantity: 3,
    image: require("../../../assets/logo.png"),
  },
];

export default function CartScreen() {
  const [cartItems, setCartItems] = useState(initialCartItems);

  const updateQuantity = (id: string, change: number) => {
    setCartItems((items) =>
      items
        .map((item) =>
          item.id === id
            ? { ...item, quantity: Math.max(1, item.quantity + change) }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const removeItem = (id: string) => {
    setCartItems((items) => items.filter((item) => item.id !== id));
  };

  const calculateSubtotal = () => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  };

  const subtotal = calculateSubtotal();
  const shipping = subtotal > 0 ? 10.0 : 0;
  const total = subtotal + shipping;

  const handleCheckout = () => {
    // TODO: Navigate to checkout screen
    console.log("Checkout pressed");
  };

  return (
    <SafeAreaView className="flex-1 bg-background">
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        <Header
          title="Shopping Cart"
          subtitle={`${cartItems.length} ${cartItems.length === 1 ? "item" : "items"} in your cart`}
        />

        {/* Cart Items */}
        {cartItems.length > 0 ? (
          <>
            <View className="px-6 mb-6">
              {cartItems.map((item) => (
                <View
                  key={item.id}
                  className="bg-white rounded-xl p-4 mb-4 shadow-sm"
                >
                  <View className="flex-row">
                    {/* Product Image */}
                    <Image
                      source={item.image}
                      className="w-20 h-20 rounded-lg mr-4"
                      resizeMode="cover"
                    />

                    {/* Product Info */}
                    <View className="flex-1">
                      <View className="flex-row items-start justify-between mb-2">
                        <View className="flex-1 mr-2">
                          <Text className="text-normal-text text-base font-semibold mb-1">
                            {item.name}
                          </Text>
                          <Text className="text-primary text-lg font-bold">
                            ${item.price.toFixed(2)}
                          </Text>
                        </View>
                        <TouchableOpacity
                          onPress={() => removeItem(item.id)}
                          className="p-1"
                        >
                          <Entypo name="cross" size={20} color="#EF4444" />
                        </TouchableOpacity>
                      </View>

                      {/* Quantity Controls */}
                      <View className="flex-row items-center mt-3">
                        <TouchableOpacity
                          onPress={() => updateQuantity(item.id, -1)}
                          className="w-8 h-8 rounded-full border-2 border-gray-300 items-center justify-center"
                        >
                          <Entypo name="minus" size={16} color="#6B7280" />
                        </TouchableOpacity>
                        <Text className="text-normal-text text-base font-semibold mx-4 min-w-[30px] text-center">
                          {item.quantity}
                        </Text>
                        <TouchableOpacity
                          onPress={() => updateQuantity(item.id, 1)}
                          className="w-8 h-8 rounded-full border-2 border-primary items-center justify-center"
                        >
                          <Entypo name="plus" size={16} color="#7C3AED" />
                        </TouchableOpacity>
                        <View className="flex-1 items-end">
                          <Text className="text-normal-text text-base font-semibold">
                            ${(item.price * item.quantity).toFixed(2)}
                          </Text>
                        </View>
                      </View>
                    </View>
                  </View>
                </View>
              ))}
            </View>

            {/* Order Summary */}
            <View className="px-6 mb-6">
              <View className="bg-white rounded-xl p-4 shadow-sm">
                <Text className="text-normal-text text-xl font-semibold mb-4">
                  Order Summary
                </Text>
                <View className="flex-row items-center justify-between mb-3">
                  <Text className="text-secondary-text text-base">Subtotal</Text>
                  <Text className="text-normal-text text-base">
                    ${subtotal.toFixed(2)}
                  </Text>
                </View>
                <View className="flex-row items-center justify-between mb-3">
                  <Text className="text-secondary-text text-base">Shipping</Text>
                  <Text className="text-normal-text text-base">
                    ${shipping.toFixed(2)}
                  </Text>
                </View>
                <View className="border-t border-gray-200 pt-3 mt-2">
                  <View className="flex-row items-center justify-between">
                    <Text className="text-normal-text text-lg font-semibold">
                      Total
                    </Text>
                    <Text className="text-normal-text text-xl font-bold">
                      ${total.toFixed(2)}
                    </Text>
                  </View>
                </View>
              </View>
            </View>

            {/* Checkout Button */}
            <View className="px-6 mb-6">
              <TouchableOpacity
                onPress={handleCheckout}
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
                    Proceed to Checkout
                  </Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>
          </>
        ) : (
          /* Empty Cart State */
          <View className="flex-1 items-center justify-center px-6 py-12">
            <Entypo name="shopping-cart" size={64} color="#D1D5DB" />
            <Text className="text-normal-text text-xl font-semibold mt-4 mb-2">
              Your Cart is Empty
            </Text>
            <Text className="text-secondary-text text-center mb-6">
              Add items to your cart to get started
            </Text>
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
                  Start Shopping
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
