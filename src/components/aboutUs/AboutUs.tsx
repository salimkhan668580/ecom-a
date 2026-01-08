import React from "react";
import { View, Text, Image } from "react-native";

import { FontAwesome6 } from "@expo/vector-icons";
import DetailsHeader from "../../layout/DetailsHeader";

export default function AboutUs() {
  return (
    // <ScreenLayout title="About Us" showBackButton>
    <View className="flex-1 bg-background py-10">

        <DetailsHeader title="About Us" subtitle="Your trusted shopping destination" />
      <View className="px-6 pb-6">
        {/* Logo Section */}
        <View className="items-center mb-6">
          <Image
            source={require("../../../assets/logo.png")}
            className="w-32 h-32 mb-4"
            resizeMode="contain"
          />
          <Text className="text-normal-text text-2xl font-bold text-center mb-2">
            Welcome to Our Store
          </Text>
          <Text className="text-secondary-text text-base text-center">
            Your trusted shopping destination
          </Text>
        </View>

        {/* Mission Section */}
        <View className="bg-white rounded-xl p-4 mb-4 shadow-sm">
          <View className="flex-row items-center mb-3">
            <View className="w-10 h-10 rounded-full bg-primary/20 items-center justify-center mr-3">
              <FontAwesome6 name="bullseye" size={20} color="#7C3AED" />
            </View>
            <Text className="text-normal-text text-xl font-semibold">Our Mission</Text>
          </View>
          <Text className="text-secondary-text text-base leading-6">
            To provide our customers with high-quality products at competitive prices, 
            delivered with exceptional service and a seamless shopping experience. 
            We are committed to making online shopping convenient, reliable, and enjoyable.
          </Text>
        </View>

        {/* Vision Section */}
        <View className="bg-white rounded-xl p-4 mb-4 shadow-sm">
          <View className="flex-row items-center mb-3">
            <View className="w-10 h-10 rounded-full bg-primary/20 items-center justify-center mr-3">
              <FontAwesome6 name="eye" size={20} color="#7C3AED" />
            </View>
            <Text className="text-normal-text text-xl font-semibold">Our Vision</Text>
          </View>
          <Text className="text-secondary-text text-base leading-6">
            To become the leading e-commerce platform that customers trust and love, 
            known for innovation, customer satisfaction, and positive impact on the community.
          </Text>
        </View>

        {/* Values Section */}
        <View className="bg-white rounded-xl p-4 mb-4 shadow-sm">
          <View className="flex-row items-center mb-3">
            <View className="w-10 h-10 rounded-full bg-primary/20 items-center justify-center mr-3">
              <FontAwesome6 name="heart" size={20} color="#7C3AED" />
            </View>
            <Text className="text-normal-text text-xl font-semibold">Our Values</Text>
          </View>
          <View className="gap-3">
            <View className="flex-row items-start">
              <Text className="text-primary text-lg mr-2">•</Text>
              <Text className="text-secondary-text text-base flex-1">
                <Text className="font-semibold text-normal-text">Customer First:</Text> Your satisfaction is our top priority
              </Text>
            </View>
            <View className="flex-row items-start">
              <Text className="text-primary text-lg mr-2">•</Text>
              <Text className="text-secondary-text text-base flex-1">
                <Text className="font-semibold text-normal-text">Quality:</Text> We ensure only the best products reach you
              </Text>
            </View>
            <View className="flex-row items-start">
              <Text className="text-primary text-lg mr-2">•</Text>
              <Text className="text-secondary-text text-base flex-1">
                <Text className="font-semibold text-normal-text">Integrity:</Text> Honest and transparent in all our dealings
              </Text>
            </View>
            <View className="flex-row items-start">
              <Text className="text-primary text-lg mr-2">•</Text>
              <Text className="text-secondary-text text-base flex-1">
                <Text className="font-semibold text-normal-text">Innovation:</Text> Continuously improving our services
              </Text>
            </View>
          </View>
        </View>

        {/* Contact Section */}
        <View className="bg-white rounded-xl p-4 mb-4 shadow-sm">
          <View className="flex-row items-center mb-3">
            <View className="w-10 h-10 rounded-full bg-primary/20 items-center justify-center mr-3">
              <FontAwesome6 name="envelope" size={20} color="#7C3AED" />
            </View>
            <Text className="text-normal-text text-xl font-semibold">Get in Touch</Text>
          </View>
          <View className="gap-2">
            <View className="flex-row items-center">
              <FontAwesome6 name="envelope" size={16} color="#6B7280" />
              <Text className="text-secondary-text text-base ml-3">
                support@ourstore.com
              </Text>
            </View>
            <View className="flex-row items-center">
              <FontAwesome6 name="phone" size={16} color="#6B7280" />
              <Text className="text-secondary-text text-base ml-3">
                +1 (555) 123-4567
              </Text>
            </View>
            <View className="flex-row items-center">
              <FontAwesome6 name="location-dot" size={16} color="#6B7280" />
              <Text className="text-secondary-text text-base ml-3">
                123 Shopping Street, City, State 12345
              </Text>
            </View>
          </View>
        </View>

        {/* Version Info */}
        <View className="items-center mt-4">
          <Text className="text-secondary-text text-sm">
            Version 1.0.0
          </Text>
          <Text className="text-secondary-text text-sm mt-1">
            © 2024 Our Store. All rights reserved.
          </Text>
        </View>
      </View>
    </View>
    // </ScreenLayout>
  );
}
