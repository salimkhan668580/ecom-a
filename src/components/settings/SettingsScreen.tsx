import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Switch,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Entypo, FontAwesome6 } from "@expo/vector-icons";
import DetailsHeader from "../../layout/DetailsHeader";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";

export default function SettingsScreen() {
  const navigation = useNavigation();
  // Notification settings
  const [notifications, setNotifications] = useState({
    pushNotifications: true,
    emailNotifications: true,
    orderUpdates: true,
    promotions: false,
    newProducts: true,
    priceDrops: false,
  });

  // App preferences
  const [preferences, setPreferences] = useState({
    darkMode: false,
    biometricAuth: false,
    savePaymentMethods: true,
    autoFillShipping: true,
  });

  // Language and region
  const [language] = useState("English");
  const [currency] = useState("USD");
  const [region] = useState("United States");

  const handleToggle = (category: string, key: string) => {
    if (category === "notifications") {
      setNotifications((prev) => ({
        ...prev,
        [key]: !prev[key as keyof typeof prev],
      }));
    } else if (category === "preferences") {
      setPreferences((prev) => ({
        ...prev,
        [key]: !prev[key as keyof typeof prev],
      }));
    }
  };

  const handleLanguagePress = () => {
    Alert.alert("Language", "Language selection coming soon");
  };

  const handleCurrencyPress = () => {
    Alert.alert("Currency", "Currency selection coming soon");
  };

  const handleRegionPress = () => {
    Alert.alert("Region", "Region selection coming soon");
  };

  const handleClearCache = () => {
    Alert.alert(
      "Clear Cache",
      "Are you sure you want to clear all cached data?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Clear",
          style: "destructive",
          onPress: () => Alert.alert("Success", "Cache cleared successfully"),
        },
      ]
    );
  };

  const handleLogout = () => {
    Alert.alert(
      "Logout",
      "Are you sure you want to logout?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Logout",
          style: "destructive",
          onPress: () => {
            AsyncStorage.removeItem("token");
            navigation.reset({
              index: 0,
              routes: [{ name: "Login" as never }],
            });
          },
        },
      ]
    );
  };

  const SettingItem = ({
    icon,
    title,
    subtitle,
    value,
    onPress,
    showSwitch = false,
    switchValue = false,
    onToggle,
    iconColor = "#7C3AED",
  }: {
    icon: string;
    title: string;
    subtitle?: string;
    value?: string;
    onPress?: () => void;
    showSwitch?: boolean;
    switchValue?: boolean;
    onToggle?: () => void;
    iconColor?: string;
  }) => (
    <TouchableOpacity
      onPress={onPress}
      disabled={showSwitch}
      className="flex-row items-center justify-between py-4 border-b border-gray-100"
      activeOpacity={0.7}
    >
      <View className="flex-row items-center flex-1">
        <View className="w-10 h-10 rounded-full bg-primary/10 items-center justify-center mr-3">
          <Entypo name={icon as any} size={20} color={iconColor} />
        </View>
        <View className="flex-1">
          <Text className="text-normal-text text-base font-semibold">
            {title}
          </Text>
          {subtitle && (
            <Text className="text-secondary-text text-sm mt-1">{subtitle}</Text>
          )}
          {value && (
            <Text className="text-primary text-sm mt-1">{value}</Text>
          )}
        </View>
      </View>
      {showSwitch ? (
        <Switch
          value={switchValue}
          onValueChange={onToggle}
          trackColor={{ false: "#D1D5DB", true: "#7C3AED" }}
          thumbColor="#FFFFFF"
        />
      ) : (
        <Entypo name="chevron-right" size={20} color="#6B7280" />
      )}
    </TouchableOpacity>
  );

  return (
    <SafeAreaView className="flex-1 bg-background">
      <DetailsHeader
        title="Settings"
        subtitle="Manage your account and app preferences"
      />
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        <View className="px-6 pb-6">
          {/* Notifications Section */}
          <View className="bg-white rounded-xl p-4 mb-4 shadow-sm">
            <View className="flex-row items-center mb-3">
              <View className="w-10 h-10 rounded-full bg-primary/20 items-center justify-center mr-3">
                <Entypo name="bell" size={20} color="#7C3AED" />
              </View>
              <Text className="text-normal-text text-xl font-semibold">
                Notifications
              </Text>
            </View>
            <SettingItem
              icon="notification"
              title="Push Notifications"
              subtitle="Receive push notifications on your device"
              showSwitch
              switchValue={notifications.pushNotifications}
              onToggle={() => handleToggle("notifications", "pushNotifications")}
            />
            <SettingItem
              icon="mail"
              title="Email Notifications"
              subtitle="Receive updates via email"
              showSwitch
              switchValue={notifications.emailNotifications}
              onToggle={() => handleToggle("notifications", "emailNotifications")}
            />
            <SettingItem
              icon="box"
              title="Order Updates"
              subtitle="Get notified about order status changes"
              showSwitch
              switchValue={notifications.orderUpdates}
              onToggle={() => handleToggle("notifications", "orderUpdates")}
            />
            <SettingItem
              icon="tag"
              title="Promotions & Offers"
              subtitle="Receive special offers and discounts"
              showSwitch
              switchValue={notifications.promotions}
              onToggle={() => handleToggle("notifications", "promotions")}
            />
            <SettingItem
              icon="shop"
              title="New Products"
              subtitle="Get notified when new products arrive"
              showSwitch
              switchValue={notifications.newProducts}
              onToggle={() => handleToggle("notifications", "newProducts")}
            />
            <SettingItem
              icon="price-tag"
              title="Price Drops"
              subtitle="Alert me when items in my wishlist go on sale"
              showSwitch
              switchValue={notifications.priceDrops}
              onToggle={() => handleToggle("notifications", "priceDrops")}
            />
          </View>

          {/* Language & Region Section */}
          <View className="bg-white rounded-xl p-4 mb-4 shadow-sm">
            <View className="flex-row items-center mb-3">
              <View className="w-10 h-10 rounded-full bg-primary/20 items-center justify-center mr-3">
                <FontAwesome6 name="globe" size={20} color="#7C3AED" />
              </View>
              <Text className="text-normal-text text-xl font-semibold">
                Language & Region
              </Text>
            </View>
            <SettingItem
              icon="language"
              title="Language"
              value={language}
              onPress={handleLanguagePress}
            />
            <SettingItem
              icon="wallet"
              title="Currency"
              value={currency}
              onPress={handleCurrencyPress}
            />
            <SettingItem
              icon="location"
              title="Region"
              value={region}
              onPress={handleRegionPress}
            />
          </View>

          {/* Shipping & Delivery Section */}
          <View className="bg-white rounded-xl p-4 mb-4 shadow-sm">
            <View className="flex-row items-center mb-3">
              <View className="w-10 h-10 rounded-full bg-primary/20 items-center justify-center mr-3">
                <Entypo name="location" size={20} color="#7C3AED" />
              </View>
              <Text className="text-normal-text text-xl font-semibold">
                Shipping & Delivery
              </Text>
            </View>
            <SettingItem
              icon="location-pin"
              title="Default Shipping Address"
              subtitle="Manage your shipping addresses"
              onPress={() => Alert.alert("Addresses", "Address management coming soon")}
            />
            <SettingItem
              icon="clock"
              title="Delivery Preferences"
              subtitle="Set your preferred delivery times"
              onPress={() => Alert.alert("Delivery", "Delivery preferences coming soon")}
            />
            <SettingItem
              icon="check"
              title="Auto-fill Shipping Info"
              subtitle="Automatically use saved shipping information"
              showSwitch
              switchValue={preferences.autoFillShipping}
              onToggle={() => handleToggle("preferences", "autoFillShipping")}
            />
          </View>

          {/* Payment & Security Section */}
          <View className="bg-white rounded-xl p-4 mb-4 shadow-sm">
            <View className="flex-row items-center mb-3">
              <View className="w-10 h-10 rounded-full bg-primary/20 items-center justify-center mr-3">
                <FontAwesome6 name="shield" size={20} color="#7C3AED" />
              </View>
              <Text className="text-normal-text text-xl font-semibold">
                Payment & Security
              </Text>
            </View>
            <SettingItem
              icon="credit-card"
              title="Payment Methods"
              subtitle="Manage your saved payment methods"
              onPress={() => Alert.alert("Payment", "Payment methods coming soon")}
            />
            <SettingItem
              icon="lock"
              title="Save Payment Methods"
              subtitle="Securely save cards for faster checkout"
              showSwitch
              switchValue={preferences.savePaymentMethods}
              onToggle={() => handleToggle("preferences", "savePaymentMethods")}
            />
            <SettingItem
              icon="fingerprint"
              title="Biometric Authentication"
              subtitle="Use fingerprint or face ID for login"
              showSwitch
              switchValue={preferences.biometricAuth}
              onToggle={() => handleToggle("preferences", "biometricAuth")}
            />
          </View>

          {/* App Preferences Section */}
          <View className="bg-white rounded-xl p-4 mb-4 shadow-sm">
            <View className="flex-row items-center mb-3">
              <View className="w-10 h-10 rounded-full bg-primary/20 items-center justify-center mr-3">
                <Entypo name="cog" size={20} color="#7C3AED" />
              </View>
              <Text className="text-normal-text text-xl font-semibold">
                App Preferences
              </Text>
            </View>
            <SettingItem
              icon="moon"
              title="Dark Mode"
              subtitle="Switch to dark theme"
              showSwitch
              switchValue={preferences.darkMode}
              onToggle={() => handleToggle("preferences", "darkMode")}
            />
            <SettingItem
              icon="trash"
              title="Clear Cache"
              subtitle="Clear all cached data and images"
              onPress={handleClearCache}
              iconColor="#EF4444"
            />
            <SettingItem
              icon="info"
              title="About"
              subtitle="App version and information"
              onPress={() => Alert.alert("About", "E-Commerce App v1.0.0")}
            />
          </View>

          {/* Account Actions Section */}
          <View className="bg-white rounded-xl p-4 mb-4 shadow-sm">
            <View className="flex-row items-center mb-3">
              <View className="w-10 h-10 rounded-full bg-primary/20 items-center justify-center mr-3">
                <Entypo name="user" size={20} color="#7C3AED" />
              </View>
              <Text className="text-normal-text text-xl font-semibold">
                Account
              </Text>
            </View>
            <SettingItem
              icon="help"
              title="Help & Support"
              subtitle="Get help with your account"
              onPress={() => Alert.alert("Help", "Help & Support coming soon")}
            />
            <SettingItem
              icon="documents"
              title="Privacy Policy"
              subtitle="Read our privacy policy"
              onPress={() => Alert.alert("Privacy", "Privacy policy coming soon")}
            />
            <SettingItem
              icon="document"
              title="Terms of Service"
              subtitle="Read our terms of service"
              onPress={() => Alert.alert("Terms", "Terms of service coming soon")}
            />
          </View>

          {/* Logout Button */}
          <TouchableOpacity
            onPress={handleLogout}
            activeOpacity={0.8}
            className="mt-2 mb-6"
          >
            <View className="bg-red-50 rounded-xl p-4 items-center border-2 border-red-200">
              <View className="flex-row items-center">
                <Entypo name="log-out" size={20} color="#EF4444" />
                <Text className="text-red-600 text-base font-semibold ml-2">
                  Logout
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

