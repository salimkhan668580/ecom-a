import React, { useState, useEffect } from "react";
import { Text, TouchableOpacity, View, ScrollView, ActivityIndicator, Alert } from "react-native";
import ProductCard from "../Home/product/ProductCard";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../../navigation/AppNevigation";
import { Entypo } from "@expo/vector-icons";
import axiosInstance from "../../axios/axiosInstance";

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
  ratingCount?: number;
  createdAt: string;
  updatedAt: string;
};

type ApiWishlistItem = {
  _id: string;
  createdAt: string;
  updatedAt: string;
  userDetails: any;
  productDetails: ApiProduct[];
};

type ApiResponse = {
  success: boolean;
  message: string;
  data: ApiWishlistItem[];
};

type Product = {
  id: string;
  title: string;
  price: number;
  discount?: number;
  rating: number;
  image: string;
  category: string;
  stock: number;
};

export default function Wishlist() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const fetchWishlist = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get<ApiResponse>("/user/wishlist");

      if (response.data.success && response.data.data) {
        // Flatten all productDetails arrays from all wishlist items
        const allProducts: ApiProduct[] = [];
        response.data.data.forEach((item) => {
          if (item.productDetails && item.productDetails.length > 0) {
            allProducts.push(...item.productDetails);
          }
        });

        // Map API products to Product type
        const mappedProducts: Product[] = allProducts.map((apiProduct) => ({
          id: apiProduct._id,
          title: apiProduct.name,
          price: apiProduct.price,
          rating: apiProduct.avgRating || 0,
          image: apiProduct.image && apiProduct.image.length > 0 ? apiProduct.image[0] : "",
          category: apiProduct.category,
          stock: apiProduct.stock,
        }));

        setProducts(mappedProducts);
      }
    } catch (error: any) {
      console.error("Error fetching wishlist:", error);
      Alert.alert("Error", "Failed to load wishlist. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWishlist();
  }, []);

  return (
    <ScrollView className="flex-1 bg-background py-10" showsVerticalScrollIndicator={false}>
      <View className="px-6 pt-6 pb-4">
        <View className="flex-row items-center mb-2">
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            className="mr-4"
          >
            <Entypo name="chevron-left" size={24} color="#111827" />
          </TouchableOpacity>
          <Text className="text-normal-text text-3xl font-bold">
            Wishlist
          </Text>
        </View>
        <Text className="text-secondary-text text-base ml-10">
          View and track your wishlist
        </Text>
      </View>
      <View className="px-6 mb-6">
        {loading ? (
          <View className="flex-1 items-center justify-center py-20">
            <ActivityIndicator size="large" color="#7C3AED" />
          </View>
        ) : products.length === 0 ? (
          <View className="flex-1 items-center justify-center py-20">
            <Text className="text-secondary-text text-base">
              No items in your wishlist
            </Text>
          </View>
        ) : (
          <View className="flex-row flex-wrap justify-between">
            {products.map((product) => (
              <ProductCard
                key={product.id}
                {...product}
                image={{ uri: product.image }}
                onPress={() => {
                  navigation.navigate("ProductDetails", { productId: product.id });
                }}
              />
            ))}
          </View>
        )}
      </View>
    </ScrollView>
  );
}
