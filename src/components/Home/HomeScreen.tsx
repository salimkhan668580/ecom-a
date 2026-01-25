import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Modal,
  ScrollView,
  StyleSheet,
  Dimensions,
  ActivityIndicator,
  Alert,
} from "react-native";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import ScreenLayout from "../../layout/ScreenLayout";
import { Feather } from "@expo/vector-icons";
import ProductCard from "./product/ProductCard";
import { RootStackParamList } from "../../navigation/AppNevigation";
import { LinearGradient } from "expo-linear-gradient";
import HomeCrasual from "../homeCrasual/HomeCrasual";
import axiosInstance from "../../axios/axiosInstance";

const { height: SCREEN_HEIGHT } = Dimensions.get("window");

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

type ApiResponse = {
  success: boolean;
  message: string;
  data: ApiProduct[];
  pagination: {
    totalDocuments: number;
    page: number;
    limit: number;
    totalPages: number;
  };
};

// Filter options
const categories = ["Electronics", "Wearables", "Accessories", "Computers", "Mobile", "Fashion"];

export default function HomeScreen() {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [isFilterVisible, setIsFilterVisible] = useState(false);
  const [search, setSearch] = useState("");
  const [priceOrder, setPriceOrder] = useState<string>("");
  const [brand, setBrand] = useState("");
  const [rating, setRating] = useState("");
  const [category, setCategory] = useState("");

  // Fetch products from API
  const fetchProducts = async (pageNum: number = 1, resetPage: boolean = false) => {
    try {
      setLoading(true);
      
      // Build query parameters
      const params = new URLSearchParams();
      params.append("page", pageNum.toString());
      params.append("limit", "10");
      
      if (search) params.append("search", search);
      if (priceOrder) params.append("price_order", priceOrder);
      if (brand) params.append("brand", brand);
      if (rating) params.append("rating", rating);
      if (category) params.append("category", category);

      const response = await axiosInstance.get<ApiResponse>(
        `/product?${params.toString()}`
      );

      if (response.data.success && response.data.data) {
        // Map API response to Product type
        const mappedProducts: Product[] = response.data.data.map((apiProduct) => ({
          id: apiProduct._id,
          title: apiProduct.name,
          price: apiProduct.price,
          rating: apiProduct.avgRating || 0,
          image: apiProduct.image && apiProduct.image.length > 0 ? apiProduct.image[0] : "",
          category: apiProduct.category,
          stock: apiProduct.stock,
        }));

        if (resetPage || pageNum === 1) {
          setProducts(mappedProducts);
        } else {
          setProducts((prev) => [...prev, ...mappedProducts]);
        }
      }
    } catch (error: any) {
      console.error("Error fetching products:", error);
      Alert.alert(
        "Error",
        error.response?.data?.message || "Failed to fetch products"
      );
    } finally {
      setLoading(false);
    }
  };

  // Debounce timeout ref
  const searchTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Debounced search handler
  const handleSearchChange = (text: string) => {
    setSearch(text);
    
    // Clear previous timeout
    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }
    
    // Set new timeout for debounced API call
    searchTimeoutRef.current = setTimeout(() => {
      fetchProducts(1, true);
    }, 500);
  };

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current);
      }
    };
  }, []);

  // Fetch products when filters change (excluding search, which is handled by debounce)
  useEffect(() => {
    fetchProducts(1, true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [priceOrder, brand, rating, category]);

  const handleApplyFilter = () => {
    fetchProducts(1, true);
    setIsFilterVisible(false);
  };

  const handleResetFilter = () => {
    setPriceOrder("");
    setBrand("");
    setRating("");
    setCategory("");
    fetchProducts(1, true);
  };

  return (
    <ScreenLayout
      title="Welcome Back! 👋"
      subtitle="Here's what's happening today"
      showCartIcon
      showNotificationIcon
    >

       <View className="px-6 mb-2 h-30">
          <HomeCrasual />
        </View>

        {/* Search Bar */}
        <View className="px-6 mb-6 flex-row items-center gap-3">
          <TextInput
            placeholder="Search products..."
            value={search}
            onChangeText={handleSearchChange}
            className="bg-white rounded-xl p-4 border-2 border-gray-200"
            style={{ width: "80%" }}
          />
          <TouchableOpacity
            onPress={() => setIsFilterVisible(true)}
            className="w-[20%] h-14 bg-white rounded-xl border-2 border-gray-200 items-center justify-center"
          >
            <Feather name="filter" size={20} color="black" />
          </TouchableOpacity>
        </View>

        {/* Products Grid */}
        <View className="px-6 mb-6">
          <Text className="text-normal-text text-xl font-semibold mb-4">
            Products
          </Text>
          {loading && products.length === 0 ? (
            <View className="items-center justify-center py-20">
              <ActivityIndicator size="large" color="#7C3AED" />
              <Text className="text-secondary-text text-sm mt-4">
                Loading products...
              </Text>
            </View>
          ) : products.length > 0 ? (
            <View className="flex-row flex-wrap justify-between">
              {products.map((product) => (
                <ProductCard
                  key={product.id}
                  id={product.id}
                  title={product.title}
                  price={product.price}
                  discount={product.discount}
                  rating={product.rating}
                  image={{ uri: product.image }}
                  onPress={() => {
                    navigation.navigate("ProductDetails", { productId: product.id });
                  }}
                />
              ))}
            </View>
          ) : (
            <View className="items-center justify-center py-20">
              <Text className="text-secondary-text text-base">
                No products found
              </Text>
            </View>
          )}
        </View>

      {/* Filter Modal */}
      <Modal
        visible={isFilterVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setIsFilterVisible(false)}
  
     
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            {/* Modal Header */}
            <View className="flex-row items-center justify-between px-6 py-4 border-b border-gray-200">
              <Text className="text-normal-text text-2xl font-bold">Filter Products</Text>
              <TouchableOpacity
                onPress={() => setIsFilterVisible(false)}
                className="p-2"
              >
                <Feather name="x" size={24} color="#6B7280" />
              </TouchableOpacity>
            </View>

            <View style={{ flex: 1 }}>
              <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: 20 }}
              >
              {/* Price Order */}
              <View className="px-6 py-4 border-b border-gray-200">
                <Text className="text-normal-text text-lg font-semibold mb-4">
                  Sort by Price
                </Text>
                <View className="gap-3">
                  {[
                    { value: "", label: "None" },
                    { value: "asc", label: "Low to High" },
                    { value: "desc", label: "High to Low" },
                  ].map((option) => {
                    const isSelected = priceOrder === option.value;
                    return (
                      <TouchableOpacity
                        key={option.value}
                        onPress={() => setPriceOrder(option.value)}
                        className="flex-row items-center"
                        activeOpacity={0.7}
                      >
                        <View
                          className={`w-5 h-5 rounded border-2 items-center justify-center mr-3 ${
                            isSelected
                              ? "bg-primary border-primary"
                              : "border-gray-300"
                          }`}
                        >
                          {isSelected && (
                            <Feather name="check" size={14} color="#FFFFFF" />
                          )}
                        </View>
                        <Text className="text-normal-text text-base">{option.label}</Text>
                      </TouchableOpacity>
                    );
                  })}
                </View>
              </View>

              {/* Category */}
              <View className="px-6 py-4 border-b border-gray-200">
                <Text className="text-normal-text text-lg font-semibold mb-4">
                  Category
                </Text>
                <View className="gap-3">
                  {[
                    { value: "", label: "All Categories" },
                    ...categories.map((cat) => ({ value: cat, label: cat })),
                  ].map((option) => {
                    const isSelected = category === option.value;
                    return (
                      <TouchableOpacity
                        key={option.value}
                        onPress={() => setCategory(option.value)}
                        className="flex-row items-center"
                        activeOpacity={0.7}
                      >
                        <View
                          className={`w-5 h-5 rounded border-2 items-center justify-center mr-3 ${
                            isSelected
                              ? "bg-primary border-primary"
                              : "border-gray-300"
                          }`}
                        >
                          {isSelected && (
                            <Feather name="check" size={14} color="#FFFFFF" />
                          )}
                        </View>
                        <Text className="text-normal-text text-base">{option.label}</Text>
                      </TouchableOpacity>
                    );
                  })}
                </View>
              </View>

              {/* Brand */}
              <View className="px-6 py-4 border-b border-gray-200">
                <Text className="text-normal-text text-lg font-semibold mb-4">
                  Brand
                </Text>
                <TextInput
                  placeholder="Enter brand name"
                  value={brand}
                  onChangeText={setBrand}
                  className="bg-white rounded-xl p-4 border-2 border-gray-200"
                />
              </View>

              {/* Rating */}
              <View className="px-6 py-4 border-b border-gray-200">
                <Text className="text-normal-text text-lg font-semibold mb-4">
                  Minimum Rating
                </Text>
                <View className="gap-3">
                  {[
                    { value: "", label: "All Ratings" },
                    { value: "4", label: "4+ Stars" },
                    { value: "3", label: "3+ Stars" },
                    { value: "2", label: "2+ Stars" },
                    { value: "1", label: "1+ Stars" },
                  ].map((option) => {
                    const isSelected = rating === option.value;
                    return (
                      <TouchableOpacity
                        key={option.value}
                        onPress={() => setRating(option.value)}
                        className="flex-row items-center"
                        activeOpacity={0.7}
                      >
                        <View
                          className={`w-5 h-5 rounded border-2 items-center justify-center mr-3 ${
                            isSelected
                              ? "bg-primary border-primary"
                              : "border-gray-300"
                          }`}
                        >
                          {isSelected && (
                            <Feather name="check" size={14} color="#FFFFFF" />
                          )}
                        </View>
                        <Text className="text-normal-text text-base">{option.label}</Text>
                      </TouchableOpacity>
                    );
                  })}
                </View>
              </View>

              </ScrollView>
            </View>

            {/* Modal Footer */}
            <View className="px-6 py-6 border-t border-gray-200 flex-row gap-3">
              <TouchableOpacity
                onPress={handleResetFilter}
                className="flex-1 h-12 rounded-xl border-2 border-gray-300 items-center justify-center"
              >
                <Text className="text-normal-text text-base font-semibold">Reset</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={handleApplyFilter}
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
                  <Text className="text-white text-base font-semibold">Apply Filter</Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </ScreenLayout>
  );
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    position: "absolute",
    top: SCREEN_HEIGHT * 0.1,
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: "column",
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
    paddingVertical: 12,
    paddingHorizontal: 32,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 12,
  },
});
