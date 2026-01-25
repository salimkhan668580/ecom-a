import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  StyleSheet,
  ActivityIndicator,
  Alert,
  RefreshControl,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { Entypo } from "@expo/vector-icons";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import { RootStackParamList } from "../../navigation/AppNevigation";
import DetailsHeader from "../../layout/DetailsHeader";
import axiosInstance from "../../axios/axiosInstance";
import Toast from "react-native-toast-message";

// API Response Types
type ApiProduct = {
  _id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  image: string[];
  category: string;
  avgRating: number;
  createdAt: string;
  updatedAt: string;
  quantity?: number;
  itemPrice?: number;
};

type ApiCartAggregation = {
  _id: string;
  userId: string;
  totalPrice: number;
  createdAt: string;
  updatedAt: string;
  appliedCoupon?: string;
  payableAmount: number;
  productDetails: ApiProduct[];
};

type ApiResponse = {
  success: boolean;
  message: string;
  cartAggregation: ApiCartAggregation[];
};

type CartItem = {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
};

export default function CartScreen() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [totalPrice, setTotalPrice] = useState(0);
  const [payableAmount, setPayableAmount] = useState(0);
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const fetchCart = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get<ApiResponse>("/user/cart");

      if (response.data.success && response.data.cartAggregation) {
        // Get the first cart aggregation (assuming single cart per user)
        const cartData = response.data.cartAggregation[0];
        
        if (cartData && cartData.productDetails) {
          // Map API products to CartItem type
          const mappedItems: CartItem[] = cartData.productDetails.map((product) => ({
            id: product._id,
            name: product.name,
            price: product.itemPrice || product.price, // Use itemPrice if available, otherwise use price
            quantity: product.quantity || 1, // Use quantity from API response
            image: product.image && product.image.length > 0 ? product.image[0] : "",
          }));

          setCartItems(mappedItems);
          setTotalPrice(cartData.totalPrice || 0);
          setPayableAmount(cartData.payableAmount || cartData.totalPrice || 0);
        } else {
          setCartItems([]);
          setTotalPrice(0);
          setPayableAmount(0);
        }
      }
    } catch (error: any) {
      console.error("Error fetching cart:", error);
      Alert.alert("Error", "Failed to load cart items. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  const onRefresh = async () => {
    setRefreshing(true);
    try {
      await fetchCart();
    } finally {
      setRefreshing(false);
    }
  };

  const updateQuantity = async (id: string, change: number) => {
    const item = cartItems.find((item) => item.id === id);
    if (!item) return;

    const newQuantity = Math.max(0, item.quantity + change);
    
    // If quantity becomes 0, remove the item
    if (newQuantity === 0) {
      await removeItem(id);
      return;
    }

    try {
      const payload = {
        productId: id,
        qty: newQuantity,
      };

      const response = await axiosInstance.post("/user/remove-to-cart", payload);

      if (response.data.success) {
        // Refresh cart after successful update
        await fetchCart();
        Toast.show({
          type: "success",
          text1: "Cart updated",
        });
      }
    } catch (error: any) {
      console.error("Error updating cart quantity:", error);
      Toast.show({
        type: "error",
        text1: error.response?.data?.message || "Failed to update quantity",
      });
    }
  };

  const removeItem = async (id: string) => {
    try {
      const payload = {
        productId: id,
        qty: 0, // Set to 0 to remove the item completely
      };

      const response = await axiosInstance.post("/user/remove-to-cart", payload);

      if (response.data.success) {
        // Refresh cart after successful removal
        await fetchCart();
        Toast.show({
          type: "success",
          text1: "Item removed from cart",
        });
      }
    } catch (error: any) {
      console.error("Error removing item from cart:", error);
      Toast.show({
        type: "error",
        text1: error.response?.data?.message || "Failed to remove item from cart",
      });
    }
  };

  const calculateSubtotal = () => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  };

  const subtotal = totalPrice > 0 ? totalPrice : calculateSubtotal();
  const shipping = subtotal > 0 ? 10.0 : 0;
  const total = payableAmount > 0 ? payableAmount : subtotal + shipping;

  const handleCheckout = () => {
    // Navigate to payment success screen
    navigation.navigate("PaymentSuccess");
  };

  if (loading) {
    return (
      <SafeAreaView className="flex-1 bg-background">
        <DetailsHeader
          title="Shopping Cart"
          subtitle="Loading your cart..."
        />
        <View className="flex-1 items-center justify-center">
          <ActivityIndicator size="large" color="#7C3AED" />
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-background">
      <ScrollView
        className="flex-1"
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <DetailsHeader
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
                    {item.image ? (
                      <Image
                        source={{ uri: item.image }}
                        className="w-20 h-20 rounded-lg mr-4"
                        resizeMode="cover"
                      />
                    ) : (
                      <View className="w-20 h-20 rounded-lg mr-4 bg-gray-200 items-center justify-center">
                        <Entypo name="image" size={24} color="#9CA3AF" />
                      </View>
                    )}

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
              onPress={() => navigation.navigate("MainTabs", { screen: "Home" })}
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
