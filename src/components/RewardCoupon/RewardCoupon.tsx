import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import * as Clipboard from "expo-clipboard";
import { LinearGradient } from "expo-linear-gradient";
import { Feather } from "@expo/vector-icons";
import ScreenLayout from "../../layout/ScreenLayout";

// Mock data for rewards
const availableRewards = [
  {
    id: "1",
    title: "$10 Gift Card",
    points: 1000,
    description: "Redeem for any purchase",
    icon: "gift",
  },
  {
    id: "2",
    title: "Free Shipping",
    points: 500,
    description: "Free shipping on your next order",
    icon: "truck",
  },
  {
    id: "3",
    title: "$25 Gift Card",
    points: 2500,
    description: "Redeem for any purchase",
    icon: "gift",
  },
  {
    id: "4",
    title: "Premium Membership",
    points: 5000,
    description: "Get exclusive deals and early access",
    icon: "star",
  },
];

// Mock data for coupons
const availableCoupons = [
  {
    id: "1",
    code: "SAVE20",
    title: "20% Off",
    description: "Get 20% off on all electronics",
    discount: 20,
    type: "percentage",
    validUntil: "2024-12-31",
    minPurchase: 50,
  },
  {
    id: "2",
    code: "FREESHIP",
    title: "Free Shipping",
    description: "Free shipping on orders over $30",
    discount: 0,
    type: "shipping",
    validUntil: "2024-12-31",
    minPurchase: 30,
  },
  {
    id: "3",
    code: "WELCOME15",
    title: "$15 Off",
    description: "Save $15 on orders over $100",
    discount: 15,
    type: "fixed",
    validUntil: "2024-12-31",
    minPurchase: 100,
  },
  {
    id: "4",
    code: "SUMMER25",
    title: "25% Off",
    description: "Summer sale - 25% off on selected items",
    discount: 25,
    type: "percentage",
    validUntil: "2024-12-31",
    minPurchase: 75,
  },
];

const userPoints = 3500; // Mock user points

type TabType = "rewards" | "coupons";

export default function RewardCoupon() {
  const [activeTab, setActiveTab] = useState<TabType>("rewards");

  const copyToClipboard = async (code: string) => {
    try {
      await Clipboard.setStringAsync(code);
      Alert.alert("Copied!", `Coupon code ${code} copied to clipboard`);
    } catch {
      Alert.alert("Error", "Failed to copy coupon code");
    }
  };

  const handleRedeemReward = (rewardId: string, points: number) => {
    if (userPoints >= points) {
      Alert.alert(
        "Redeem Reward",
        `Are you sure you want to redeem ${points} points for this reward?`,
        [
          { text: "Cancel", style: "cancel" },
          {
            text: "Redeem",
            onPress: () => {
              Alert.alert("Success!", "Reward redeemed successfully!");
            },
          },
        ]
      );
    } else {
      Alert.alert(
        "Insufficient Points",
        `You need ${points - userPoints} more points to redeem this reward.`
      );
    }
  };

  return (
    <ScreenLayout
      title="Rewards & Coupons"
      subtitle="Earn points and save with exclusive offers"
    >
      {/* Tab Selector */}
      <View className="px-6 mb-6">
        <View className="bg-white rounded-xl p-1 flex-row shadow-sm">
          <TouchableOpacity
            onPress={() => setActiveTab("rewards")}
            className={`flex-1 py-3 rounded-lg items-center ${
              activeTab === "rewards" ? "bg-primary" : ""
            }`}
            activeOpacity={0.7}
          >
            <Text
              className={`text-base font-semibold ${
                activeTab === "rewards" ? "text-white" : "text-normal-text"
              }`}
            >
              Rewards
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setActiveTab("coupons")}
            className={`flex-1 py-3 rounded-lg items-center ${
              activeTab === "coupons" ? "bg-primary" : ""
            }`}
            activeOpacity={0.7}
          >
            <Text
              className={`text-base font-semibold ${
                activeTab === "coupons" ? "text-white" : "text-normal-text"
              }`}
            >
              Coupons
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Rewards Tab Content */}
      {activeTab === "rewards" && (
        <View className="px-6">
          {/* Points Balance Card */}
          <View className="mb-6">
            <LinearGradient
              colors={["#7C3AED", "#EC4899"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.pointsCard}
            >
              <View className="items-center">
                <Text className="text-white text-sm mb-2">Your Points Balance</Text>
                <Text className="text-white text-4xl font-bold mb-1">
                  {userPoints.toLocaleString()}
                </Text>
                <Text className="text-white/80 text-sm">
                  Keep shopping to earn more points!
                </Text>
              </View>
            </LinearGradient>
          </View>

          {/* Available Rewards */}
          <View className="mb-6">
            <Text className="text-normal-text text-xl font-semibold mb-4">
              Available Rewards
            </Text>
            {availableRewards.map((reward) => {
              const canRedeem = userPoints >= reward.points;
              return (
                <View
                  key={reward.id}
                  className="bg-white rounded-xl p-4 mb-4 shadow-sm"
                >
                  <View className="flex-row items-start">
                    <View className="w-12 h-12 rounded-full bg-primary/10 items-center justify-center mr-4">
                      <Feather
                        name={reward.icon as any}
                        size={24}
                        color="#7C3AED"
                      />
                    </View>
                    <View className="flex-1">
                      <Text className="text-normal-text text-lg font-semibold mb-1">
                        {reward.title}
                      </Text>
                      <Text className="text-secondary-text text-sm mb-3">
                        {reward.description}
                      </Text>
                      <View className="flex-row items-center justify-between">
                        <View className="flex-row items-center">
                          <Feather name="star" size={16} color="#F59E0B" />
                          <Text className="text-normal-text text-base font-semibold ml-2">
                            {reward.points.toLocaleString()} points
                          </Text>
                        </View>
                        <TouchableOpacity
                          onPress={() =>
                            handleRedeemReward(reward.id, reward.points)
                          }
                          disabled={!canRedeem}
                          activeOpacity={0.7}
                          style={[
                            styles.redeemButton,
                            !canRedeem && styles.redeemButtonDisabled,
                          ]}
                        >
                          <Text
                            className={`text-sm font-semibold ${
                              canRedeem ? "text-primary" : "text-secondary-text"
                            }`}
                          >
                            {canRedeem ? "Redeem" : "Not Enough Points"}
                          </Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>
                </View>
              );
            })}
          </View>
        </View>
      )}

      {/* Coupons Tab Content */}
      {activeTab === "coupons" && (
        <View className="px-6">
          <Text className="text-normal-text text-xl font-semibold mb-4">
            Available Coupons
          </Text>
          {availableCoupons.map((coupon) => (
            <View
              key={coupon.id}
              className="bg-white rounded-xl p-4 mb-4 shadow-sm border-2 border-dashed border-primary/30"
            >
              <View className="flex-row items-start justify-between mb-3">
                <View className="flex-1">
                  <View className="flex-row items-center mb-2">
                    <View className="bg-primary/10 px-3 py-1 rounded-lg mr-2">
                      <Text className="text-primary text-sm font-bold">
                        {coupon.type === "percentage"
                          ? `${coupon.discount}% OFF`
                          : coupon.type === "shipping"
                          ? "FREE SHIPPING"
                          : `$${coupon.discount} OFF`}
                      </Text>
                    </View>
                  </View>
                  <Text className="text-normal-text text-lg font-semibold mb-1">
                    {coupon.title}
                  </Text>
                  <Text className="text-secondary-text text-sm mb-2">
                    {coupon.description}
                  </Text>
                  <Text className="text-secondary-text text-xs">
                    Min. purchase: ${coupon.minPurchase} • Valid until{" "}
                    {coupon.validUntil}
                  </Text>
                </View>
              </View>

              {/* Coupon Code Section */}
              <View className="flex-row items-center justify-between bg-gray-50 rounded-lg p-3 mt-2">
                <View className="flex-1">
                  <Text className="text-secondary-text text-xs mb-1">
                    Coupon Code
                  </Text>
                  <Text className="text-normal-text text-lg font-bold">
                    {coupon.code}
                  </Text>
                </View>
                <TouchableOpacity
                  onPress={() => copyToClipboard(coupon.code)}
                  className="bg-primary rounded-lg px-4 py-2"
                  activeOpacity={0.7}
                >
                  <View className="flex-row items-center">
                    <Feather name="copy" size={16} color="#FFFFFF" />
                    <Text className="text-white text-sm font-semibold ml-2">
                      Copy
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          ))}

          {/* How to Use Section */}
          <View className="bg-white rounded-xl p-4 mb-6 shadow-sm">
            <Text className="text-normal-text text-lg font-semibold mb-3">
              How to Use Coupons
            </Text>
            <View className="gap-3">
              <View className="flex-row items-start">
                <View className="w-6 h-6 rounded-full bg-primary/10 items-center justify-center mr-3 mt-0.5">
                  <Text className="text-primary text-xs font-bold">1</Text>
                </View>
                <Text className="text-secondary-text text-sm flex-1">
                  Copy the coupon code by tapping the Copy button
                </Text>
              </View>
              <View className="flex-row items-start">
                <View className="w-6 h-6 rounded-full bg-primary/10 items-center justify-center mr-3 mt-0.5">
                  <Text className="text-primary text-xs font-bold">2</Text>
                </View>
                <Text className="text-secondary-text text-sm flex-1">
                  Add items to your cart and proceed to checkout
                </Text>
              </View>
              <View className="flex-row items-start">
                <View className="w-6 h-6 rounded-full bg-primary/10 items-center justify-center mr-3 mt-0.5">
                  <Text className="text-primary text-xs font-bold">3</Text>
                </View>
                <Text className="text-secondary-text text-sm flex-1">
                  Paste the code in the coupon field and apply
                </Text>
              </View>
            </View>
          </View>
        </View>
      )}
    </ScreenLayout>
  );
}

const styles = StyleSheet.create({
  pointsCard: {
    borderRadius: 16,
    padding: 24,
    shadowColor: "#7C3AED",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  redeemButton: {
    borderWidth: 2,
    borderColor: "#7C3AED",
    borderRadius: 8,
    paddingVertical: 6,
    paddingHorizontal: 16,
  },
  redeemButtonDisabled: {
    borderColor: "#D1D5DB",
  },
});
