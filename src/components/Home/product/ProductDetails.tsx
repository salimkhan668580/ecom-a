import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation, useRoute, RouteProp, NavigationProp } from "@react-navigation/native";
import { Entypo, FontAwesome6 } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { RootStackParamList } from "../../../navigation/AppNevigation";
import Toast from 'react-native-toast-message';

type ProductDetailsRouteProp = RouteProp<RootStackParamList, "ProductDetails">;

// Mock product details data
const getProductDetails = (productId: string) => {
  const products: Record<string, any> = {
    "1": {
      id: "1",
      title: "Wireless Bluetooth Headphones",
      price: 79.99,
      discount: 20,
      rating: 4.5,
      reviews: 234,
      image: require("../../../../assets/logo.png"),
      description:
        "Premium wireless Bluetooth headphones with noise cancellation, 30-hour battery life, and superior sound quality. Perfect for music lovers and professionals.",
      features: [
        "Active Noise Cancellation",
        "30-hour Battery Life",
        "Quick Charge (10 min = 3 hours)",
        "Comfortable Over-Ear Design",
        "Premium Sound Quality",
      ],
      brand: "AudioTech",
      packOf: "1 piece",
      quantity: "1 unit",
      type: "Wireless Headphones",
      otherDetails: [
        { label: "Model Number", value: "ATH-2024" },
        { label: "Color", value: "Black" },
        { label: "Weight", value: "250g" },
        { label: "Warranty", value: "1 year" },
      ],
      inStock: true,
      stockCount: 15,
    },
    "2": {
      id: "2",
      title: "Smart Watch Fitness Tracker",
      price: 129.99,
      discount: 15,
      rating: 4.8,
      reviews: 456,
      image: require("../../../../assets/logo.png"),
      description:
        "Advanced smartwatch with fitness tracking, heart rate monitor, GPS, and smartphone notifications. Water-resistant design perfect for active lifestyles.",
      features: [
        "Heart Rate Monitor",
        "GPS Tracking",
        "Water Resistant (50m)",
        "7-day Battery Life",
        "Smartphone Notifications",
      ],
      brand: "FitTech",
      packOf: "1 piece",
      quantity: "1 unit",
      type: "Smart Watch",
      otherDetails: [
        { label: "Model Number", value: "FT-5000" },
        { label: "Color", value: "Silver" },
        { label: "Display Size", value: "1.4 inches" },
        { label: "Warranty", value: "2 years" },
      ],
      inStock: true,
      stockCount: 8,
    },
  };
  return products[productId] || products["1"];
};

export default function ProductDetails() {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const route = useRoute<ProductDetailsRouteProp>();
  const { productId } = route.params;
  const product = getProductDetails(productId);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [expandedSection, setExpandedSection] = useState<string | null>(null);

  const originalPrice = product.discount
    ? product.price / (1 - product.discount / 100)
    : product.price;

  const handleAddToCart = () => {
    Toast.show({
      type: "success",
      text1: "Product added to cart!",
    });
  };

  const handleWishlist = () => {
    setIsWishlisted(!isWishlisted);
    Toast.show({
      type: "success",
      text1: isWishlisted ? "Product removed from wishlist" : "Product added to wishlist",
    });
  };

  const toggleAccordion = (section: string) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  return (
    <SafeAreaView className="flex-1 bg-background">
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        {/* Header with Back Button */}
        <View className="px-6 pt-4 pb-2 flex-row items-center justify-between">
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            className="p-2"
          >
            <Entypo name="chevron-left" size={24} color="#111827" />
          </TouchableOpacity>

        </View>

        {/* Product Image */}
        <View className="w-full h-80 bg-gray-100 mb-4">
          <Image
            source={product.image}
            className="w-full h-full"
            resizeMode="contain"
          />
          {product.discount && (
            <View
              className="bg-red-500 px-3 py-1.5 rounded absolute top-4 left-4"
              style={styles.discountBadge}
            >
              <Text className="text-white text-sm font-semibold">
                {product.discount}% OFF
              </Text>
            </View>
          )}
        </View>

        {/* Product Info */}
        <View className="px-6 mb-6">
          {/* Title and Brand */}
          <Text className="text-secondary-text text-sm mb-1">{product.brand}</Text>
          <Text className="text-normal-text text-2xl font-bold mb-3">
            {product.title}
          </Text>

          {/* Rating and Reviews */}
          <View className="flex-row items-center gap-2 mb-4">
            <View className="flex-row items-center gap-1">
              <FontAwesome6 name="star" size={16} color="#F59E0B" />
              <Text className="text-normal-text text-base font-semibold">
                {product.rating}
              </Text>
            </View>
            <Text className="text-secondary-text text-sm">
              ({product.reviews} reviews)
            </Text>
            {product.inStock && (
              <View className="ml-auto">
                <Text className="text-green-600 text-sm font-medium">
                  In Stock ({product.stockCount} left)
                </Text>
              </View>
            )}
          </View>

          {/* Price Section */}
          <View className="mb-4">
            {product.discount ? (
              <View className="flex-row items-center gap-3">
                <Text className="text-primary text-3xl font-bold">
                  ${product.price.toFixed(2)}
                </Text>
                <Text className="text-secondary-text text-lg line-through">
                  ${originalPrice.toFixed(2)}
                </Text>
                <View className="bg-red-500 px-2 py-1 rounded">
                  <Text className="text-white text-xs font-semibold">
                    Save ${(originalPrice - product.price).toFixed(2)}
                  </Text>
                </View>
              </View>
            ) : (
              <Text className="text-primary text-3xl font-bold">
                ${product.price.toFixed(2)}
              </Text>
            )}
          </View>

          {/* Quantity Selector */}
          <View className="flex-row items-center gap-4 mb-6">
            <Text className="text-normal-text text-base font-medium">Quantity:</Text>
            <View className="flex-row items-center gap-3">
              <TouchableOpacity
                onPress={() => setQuantity(Math.max(1, quantity - 1))}
                className="w-10 h-10 rounded-full border-2 border-gray-300 items-center justify-center"
              >
                <Entypo name="minus" size={20} color="#6B7280" />
              </TouchableOpacity>
              <Text className="text-normal-text text-lg font-semibold min-w-[30px] text-center">
                {quantity}
              </Text>
              <TouchableOpacity
                onPress={() => setQuantity(quantity + 1)}
                className="w-10 h-10 rounded-full border-2 border-primary items-center justify-center"
              >
                <Entypo name="plus" size={20} color="#7C3AED" />
              </TouchableOpacity>
            </View>
          </View>

          {/* Description */}
          <View className="mb-6">
            <Text className="text-normal-text text-lg font-semibold mb-2">
              Description
            </Text>
            <Text className="text-secondary-text text-base leading-6">
              {product.description}
            </Text>
          </View>

          {/* Product Highlights Accordion */}
          <View className="mb-6">
            <Text className="text-normal-text text-lg font-semibold mb-4">
              Product Highlights
            </Text>
            
            {/* Pack of */}
            <TouchableOpacity
              onPress={() => toggleAccordion("pack")}
              className="bg-white rounded-xl p-4 mb-3 border border-gray-200"
              activeOpacity={0.7}
            >
              <View className="flex-row items-center justify-between">
                <Text className="text-normal-text text-base font-semibold">
                  Pack of
                </Text>
                <Entypo
                  name={expandedSection === "pack" ? "chevron-up" : "chevron-down"}
                  size={20}
                  color="#6B7280"
                />
              </View>
              {expandedSection === "pack" && (
                <View className="mt-3 pt-3 border-t border-gray-100">
                  <Text className="text-secondary-text text-base">
                    {product.packOf || "1 piece"}
                  </Text>
                </View>
              )}
            </TouchableOpacity>

            {/* Brand */}
            <TouchableOpacity
              onPress={() => toggleAccordion("brand")}
              className="bg-white rounded-xl p-4 mb-3 border border-gray-200"
              activeOpacity={0.7}
            >
              <View className="flex-row items-center justify-between">
                <Text className="text-normal-text text-base font-semibold">
                  Brand
                </Text>
                <Entypo
                  name={expandedSection === "brand" ? "chevron-up" : "chevron-down"}
                  size={20}
                  color="#6B7280"
                />
              </View>
              {expandedSection === "brand" && (
                <View className="mt-3 pt-3 border-t border-gray-100">
                  <Text className="text-secondary-text text-base">
                    {product.brand}
                  </Text>
                </View>
              )}
            </TouchableOpacity>

            {/* Quantity */}
            <TouchableOpacity
              onPress={() => toggleAccordion("quantity")}
              className="bg-white rounded-xl p-4 mb-3 border border-gray-200"
              activeOpacity={0.7}
            >
              <View className="flex-row items-center justify-between">
                <Text className="text-normal-text text-base font-semibold">
                  Quantity
                </Text>
                <Entypo
                  name={expandedSection === "quantity" ? "chevron-up" : "chevron-down"}
                  size={20}
                  color="#6B7280"
                />
              </View>
              {expandedSection === "quantity" && (
                <View className="mt-3 pt-3 border-t border-gray-100">
                  <Text className="text-secondary-text text-base">
                    {product.quantity || "1 unit"}
                  </Text>
                </View>
              )}
            </TouchableOpacity>

            {/* Type */}
            <TouchableOpacity
              onPress={() => toggleAccordion("type")}
              className="bg-white rounded-xl p-4 mb-3 border border-gray-200"
              activeOpacity={0.7}
            >
              <View className="flex-row items-center justify-between">
                <Text className="text-normal-text text-base font-semibold">
                  Type
                </Text>
                <Entypo
                  name={expandedSection === "type" ? "chevron-up" : "chevron-down"}
                  size={20}
                  color="#6B7280"
                />
              </View>
              {expandedSection === "type" && (
                <View className="mt-3 pt-3 border-t border-gray-100">
                  <Text className="text-secondary-text text-base">
                    {product.type || "Standard"}
                  </Text>
                </View>
              )}
            </TouchableOpacity>

            {/* Other Details */}
            <TouchableOpacity
              onPress={() => toggleAccordion("details")}
              className="bg-white rounded-xl p-4 mb-3 border border-gray-200"
              activeOpacity={0.7}
            >
              <View className="flex-row items-center justify-between">
                <Text className="text-normal-text text-base font-semibold">
                  Other Details
                </Text>
                <Entypo
                  name={expandedSection === "details" ? "chevron-up" : "chevron-down"}
                  size={20}
                  color="#6B7280"
                />
              </View>
              {expandedSection === "details" && (
                <View className="mt-3 pt-3 border-t border-gray-100">
                  {product.otherDetails && product.otherDetails.length > 0 ? (
                    product.otherDetails.map((detail: any, index: number) => (
                      <View key={index} className="mb-2">
                        <Text className="text-secondary-text text-base">
                          <Text className="font-semibold">{detail.label}: </Text>
                          {detail.value}
                        </Text>
                      </View>
                    ))
                  ) : (
                    <Text className="text-secondary-text text-base">
                      No additional details available
                    </Text>
                  )}
                </View>
              )}
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>

      {/* Bottom Action Buttons */}
      <View className="px-6 py-4 bg-white border-t border-gray-200">
        <View className="flex-row gap-3">
          <TouchableOpacity
            onPress={handleWishlist}
            className="w-14 h-14 rounded-xl border-2 border-gray-300 items-center justify-center"
            style={{
              borderColor: isWishlisted ? "#EC4899" : "#D1D5DB",
            }}
          >
            <FontAwesome6
              name="heart"
              size={24}
              color={isWishlisted ? "#EC4899" : "#6B7280"}
              solid={isWishlisted}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={handleAddToCart}
            activeOpacity={0.8}
            style={styles.buttonContainer}
            className="flex-1"
          >
            <LinearGradient
              colors={["#7C3AED", "#EC4899"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.gradientButton}
            >
              <Text className="text-white text-base font-semibold">
                Add to Cart
              </Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  discountBadge: {
    zIndex: 10,
    elevation: 5,
  },
  buttonContainer: {
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

