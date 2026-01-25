import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation, useRoute, RouteProp, NavigationProp } from "@react-navigation/native";
import { Entypo, FontAwesome6 } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { RootStackParamList } from "../../../navigation/AppNevigation";
import Toast from 'react-native-toast-message';
import axiosInstance from "../../../axios/axiosInstance";

type ProductDetailsRouteProp = RouteProp<RootStackParamList, "ProductDetails">;

// API Response Types
type ApiProductDetails = {
  _id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  image: string[];
  category: string;
  avgRating: number;
  ratingCount?: number;
  ratings: any[];
  createdAt: string;
  updatedAt: string;
  canRate?: boolean;
  alreadyRated?: boolean;
  InWishlist?: boolean;
};

type ApiResponse = {
  success: boolean;
  message: string;
  product: ApiProductDetails;
};

type ProductDetailsData = {
  id: string;
  title: string;
  price: number;
  discount?: number;
  rating: number;
  reviews: number;
  image: string;
  description: string;
  brand: string;
  packOf: string;
  quantity: string;
  type: string;
  otherDetails: { label: string; value: string }[];
  inStock: boolean;
  stockCount: number;
};

export default function ProductDetails() {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const route = useRoute<ProductDetailsRouteProp>();
  const { productId } = route.params;
  const [product, setProduct] = useState<ProductDetailsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [wishlistLoading, setWishlistLoading] = useState(false);
  const [cartLoading, setCartLoading] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [expandedSection, setExpandedSection] = useState<string | null>(null);

  // Fetch product details from API
  const fetchProductDetails = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get<ApiResponse>(
        `/product?productId=${productId}`
      );

      if (response.data.success && response.data.product) {
        const apiProduct = response.data.product;
        
        // Map API response to ProductDetailsData type
        const productDetails: ProductDetailsData = {
          id: apiProduct._id,
          title: apiProduct.name,
          price: apiProduct.price,
          rating: apiProduct.avgRating || 0,
          reviews: apiProduct.ratingCount || 0,
          image: apiProduct.image && apiProduct.image.length > 0 ? apiProduct.image[0] : "",
          description: apiProduct.description,
          brand: apiProduct.category || "Unknown",
          packOf: "1 piece",
          quantity: "1 unit",
          type: apiProduct.category,
          otherDetails: [
            { label: "Category", value: apiProduct.category },
            { label: "Stock", value: apiProduct.stock.toString() },
          ],
          inStock: apiProduct.stock > 0,
          stockCount: apiProduct.stock,
        };

        setProduct(productDetails);
        // Set wishlist state from API response
        setIsWishlisted(apiProduct.InWishlist || false);
      }
    } catch (error: any) {
      console.error("Error fetching product details:", error);
      Alert.alert(
        "Error",
        error.response?.data?.message || "Failed to fetch product details"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProductDetails();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [productId]);

  const handleAddToCart = async () => {
    if (!product) return;

    try {
      setCartLoading(true);
      const payload = {
        items: [
          {
            productId: product.id,
            qty: quantity,
          },
        ],
      };

      const response = await axiosInstance.post("/user/add-to-cart", payload);

      if (response.data.success) {
        Toast.show({
          type: "success",
          text1: "Product added to cart!",
        });
      }
    } catch (error: any) {
      console.error("Error adding to cart:", error);
      Toast.show({
        type: "error",
        text1: error.response?.data?.message || "Failed to add product to cart",
      });
    } finally {
      setCartLoading(false);
    }
  };

  const handleWishlist = async () => {
    if (!product) return;

    try {
      setWishlistLoading(true);

      if (!isWishlisted) {
        // Add to wishlist
        const payload = {
          items: [
            {
              productId: product.id,
            },
          ],
        };

        const response = await axiosInstance.post("/user/add-to-wishlist", payload);

        if (response.data.success) {
          setIsWishlisted(true);
          Toast.show({
            type: "success",
            text1: "Product added to wishlist",
          });
        }
      } else {
        // Remove from wishlist
        const payload = {
          items: [
            {
              productId: product.id,
            },
          ],
        };

        const response = await axiosInstance.post("/user/delete-to-wishlist", payload);

        if (response.data.success) {
          setIsWishlisted(false);
          Toast.show({
            type: "success",
            text1: "Product removed from wishlist",
          });
        }
      }
    } catch (error: any) {
      console.error("Error updating wishlist:", error);
      Toast.show({
        type: "error",
        text1: error.response?.data?.message || "Failed to update wishlist",
      });
    } finally {
      setWishlistLoading(false);
    }
  };

  const toggleAccordion = (section: string) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  if (loading) {
    return (
      <SafeAreaView className="flex-1 bg-background">
        <View className="flex-1 items-center justify-center">
          <ActivityIndicator size="large" color="#7C3AED" />
          <Text className="text-secondary-text text-sm mt-4">
            Loading product details...
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  if (!product) {
    return (
      <SafeAreaView className="flex-1 bg-background">
        <View className="flex-1 items-center justify-center px-6">
          <Text className="text-normal-text text-lg font-semibold mb-2">
            Product not found
          </Text>
          <Text className="text-secondary-text text-base text-center">
            Unable to load product details. Please try again.
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  const originalPrice = product.discount
    ? product.price / (1 - product.discount / 100)
    : product.price;

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
            source={{ uri: product.image }}
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
            disabled={wishlistLoading}
            className="w-14 h-14 rounded-xl border-2 border-gray-300 items-center justify-center"
            style={{
              borderColor: isWishlisted ? "#EC4899" : "#D1D5DB",
            }}
          >
            {wishlistLoading ? (
              <ActivityIndicator
                size="small"
                color={isWishlisted ? "#EC4899" : "#6B7280"}
              />
            ) : (
              <FontAwesome6
                name="heart"
                size={24}
                color={isWishlisted ? "#EC4899" : "#6B7280"}
                solid={isWishlisted}
              />
            )}
          </TouchableOpacity>
          <TouchableOpacity
            onPress={handleAddToCart}
            disabled={cartLoading}
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
              {cartLoading ? (
                <ActivityIndicator size="small" color="#FFFFFF" />
              ) : (
                <Text className="text-white text-base font-semibold">
                  Add to Cart
                </Text>
              )}
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

