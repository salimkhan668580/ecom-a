import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Modal,
  ScrollView,
  StyleSheet,
  Dimensions,
} from "react-native";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import ScreenLayout from "../../layout/ScreenLayout";
import { Feather } from "@expo/vector-icons";
import ProductCard from "./product/ProductCard";
import { RootStackParamList } from "../../navigation/AppNevigation";
import { LinearGradient } from "expo-linear-gradient";

const { height: SCREEN_HEIGHT } = Dimensions.get("window");

// Mock products data
const products = [
  {
    id: "1",
    title: "Wireless Bluetooth Headphones",
    price: 79.99,
    discount: 20,
    rating: 4.5,
    image: require("../../../assets/logo.png"),
    category: "Electronics",
    brand: "AudioTech",
  },
  {
    id: "2",
    title: "Smart Watch Fitness Tracker",
    price: 129.99,
    discount: 15,
    rating: 4.8,
    image: require("../../../assets/logo.png"),
    category: "Wearables",
    brand: "FitTech",
  },
  {
    id: "3",
    title: "Portable Power Bank 20000mAh",
    price: 39.99,
    rating: 4.2,
    image: require("../../../assets/logo.png"),
    category: "Accessories",
    brand: "PowerMax",
  },
  {
    id: "4",
    title: "USB-C Fast Charging Cable",
    price: 19.99,
    discount: 10,
    rating: 4.6,
    image: require("../../../assets/logo.png"),
    category: "Accessories",
    brand: "CablePro",
  },
  {
    id: "5",
    title: "Wireless Mouse Ergonomic Design",
    price: 29.99,
    rating: 4.4,
    image: require("../../../assets/logo.png"),
    category: "Electronics",
    brand: "TechMouse",
  },
  {
    id: "6",
    title: "Laptop Stand Adjustable Height",
    price: 49.99,
    discount: 25,
    rating: 4.7,
    image: require("../../../assets/logo.png"),
    category: "Accessories",
    brand: "StandPro",
  },
];

// Filter options
const categories = ["Electronics", "Wearables", "Accessories", "Computers", "Mobile"];
const brands = ["AudioTech", "FitTech", "PowerMax", "CablePro", "TechMouse", "StandPro"];

export default function HomeScreen() {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const [isFilterVisible, setIsFilterVisible] = useState(false);
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);

  const toggleCategory = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  const toggleBrand = (brand: string) => {
    setSelectedBrands((prev) =>
      prev.includes(brand)
        ? prev.filter((b) => b !== brand)
        : [...prev, brand]
    );
  };

  const handleApplyFilter = () => {
    // TODO: Apply filters to products
    setIsFilterVisible(false);
  };

  const handleResetFilter = () => {
    setMinPrice("");
    setMaxPrice("");
    setSelectedCategories([]);
    setSelectedBrands([]);
  };

  const filteredProducts = products.filter((product) => {
    // Price filter
    if (minPrice && product.price < parseFloat(minPrice)) return false;
    if (maxPrice && product.price > parseFloat(maxPrice)) return false;

    // Category filter
    if (selectedCategories.length > 0 && !selectedCategories.includes(product.category)) {
      return false;
    }

    // Brand filter
    if (selectedBrands.length > 0 && !selectedBrands.includes(product.brand)) {
      return false;
    }

    return true;
  });

  return (
    <ScreenLayout
      title="Welcome Back! 👋"
      subtitle="Here's what's happening today"
      showCartIcon
      showNotificationIcon
    >

        {/* Search Bar */}
        <View className="px-6 mb-6 flex-row items-center gap-3">
          <TextInput
            placeholder="Search"
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
          <View className="flex-row flex-wrap justify-between">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                id={product.id}
                title={product.title}
                price={product.price}
                discount={product.discount}
                rating={product.rating}
                image={product.image}
                onPress={() => {
                  navigation.navigate("ProductDetails", { productId: product.id });
                }}
              />
            ))}
          </View>
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
              {/* Price Range */}
              <View className="px-6 py-4 border-b border-gray-200">
                <Text className="text-normal-text text-lg font-semibold mb-4">
                  Price Range
                </Text>
                <View className="flex-row items-center gap-3">
                  <View className="flex-1">
                    <Text className="text-secondary-text text-sm mb-2">Min Price ($)</Text>
                    <TextInput
                      placeholder="0"
                      value={minPrice}
                      onChangeText={setMinPrice}
                      keyboardType="numeric"
                      className="bg-white rounded-xl p-4 border-2 border-gray-200"
                    />
                  </View>
                  <View className="flex-1">
                    <Text className="text-secondary-text text-sm mb-2">Max Price ($)</Text>
                    <TextInput
                      placeholder="1000"
                      value={maxPrice}
                      onChangeText={setMaxPrice}
                      keyboardType="numeric"
                      className="bg-white rounded-xl p-4 border-2 border-gray-200"
                    />
                  </View>
                </View>
              </View>

              {/* Categories */}
              <View className="px-6 py-4 border-b border-gray-200">
                <Text className="text-normal-text text-lg font-semibold mb-4">
                  Categories
                </Text>
                <View className="gap-3">
                  {categories.map((category) => {
                    const isSelected = selectedCategories.includes(category);
                    return (
                      <TouchableOpacity
                        key={category}
                        onPress={() => toggleCategory(category)}
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
                        <Text className="text-normal-text text-base">{category}</Text>
                      </TouchableOpacity>
                    );
                  })}
                </View>
              </View>

              {/* Brands */}
              <View className="px-6 py-4">
                <Text className="text-normal-text text-lg font-semibold mb-4">
                  Brands
                </Text>
                <View className="gap-3">
                  {brands.map((brand) => {
                    const isSelected = selectedBrands.includes(brand);
                    return (
                      <TouchableOpacity
                        key={brand}
                        onPress={() => toggleBrand(brand)}
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
                        <Text className="text-normal-text text-base">{brand}</Text>
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
