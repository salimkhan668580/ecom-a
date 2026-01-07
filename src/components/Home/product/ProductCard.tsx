import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { FontAwesome6 } from "@expo/vector-icons";

type ProductCardProps = {
  id: string;
  title: string;
  price: number;
  discount?: number;
  rating: number;
  image: any;
  onPress?: () => void;
};

export default function ProductCard({
  title,
  price,
  discount,
  rating,
  image,
  onPress,
}: ProductCardProps) {
  const originalPrice = discount ? price / (1 - discount / 100) : price;
  const discountPrice = discount ? price : null;

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.8}
      className="bg-white rounded-xl  overflow-hidden shadow-sm mb-4"
      style={styles.card}
    >
      {/* Product Image */}
      <View className="w-full h-40 bg-gray-100 relative">
        <Image
          source={image}
          className="w-full h-full"
          resizeMode="cover"
        />
        {discount && discountPrice && (
          <View 
            className="bg-red-500 px-2 py-1 rounded absolute top-0 right-0"
            style={styles.discountBadge}
          >
            <Text className="text-white text-xs font-semibold">
              {discount}% OFF
            </Text>
          </View>
        )}
      </View>

      {/* Product Info */}
      <View className="p-3">
        {/* Title */}
        <Text
          className="text-normal-text text-sm font-semibold mb-2"
          numberOfLines={2}
        >
          {title}
        </Text>

        {/* Price, Discount, Rating Row */}
        <View className="flex-row items-center justify-between">
          {/* Price Section */}
          <View className="flex-1 ">
            {discount && discountPrice ? (
              <View className="flex-row items-center gap-2">
                <Text className="text-primary text-base font-bold">
                  ${discountPrice.toFixed(2)}
                </Text>
                <Text className="text-secondary-text text-xs line-through">
                  ${originalPrice.toFixed(2)}
                </Text>
               
              </View>
            ) : (
              <Text className="text-primary text-base font-bold">
                ${price.toFixed(2)}
              </Text>
            )}
          </View>

          {/* Rating Section */}
          <View className="flex-row items-center gap-1">
            <FontAwesome6 name="star" size={12} color="#F59E0B" />
            <Text className="text-secondary-text text-xs font-medium">
              {rating.toFixed(1)}
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    width: "48%",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  discountBadge: {
    zIndex: 10,
    elevation: 5,
  },
});

