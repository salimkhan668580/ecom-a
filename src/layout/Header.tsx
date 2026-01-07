import React, { useState } from "react";
import { View, TouchableOpacity, Image, Text, ScrollView, StyleSheet } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Entypo, FontAwesome6 } from "@expo/vector-icons";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import { RootStackParamList } from "../navigation/AppNevigation";

type HeaderProps = {
  title: string;
  subtitle?: string;
  showBackButton?: boolean;
  showCartIcon?: boolean;
  showNotificationIcon?: boolean;
  onCartPress?: () => void;
  onNotificationPress?: () => void;
  rightAction?: React.ReactNode;
};

export default function Header({
  title,
  subtitle,
  showBackButton = false,
  showCartIcon = false,
  showNotificationIcon = false,
  onCartPress,
  onNotificationPress,
  rightAction,
}: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const menuItems = [
    { icon: "user", name: "My Account", screen: "Profile" },
    { icon: "box", name: "My Orders", screen: "OrderList" },
    { icon: "heart", name: "Wishlist", screen: null },
    { icon: "gift", name: "Rewards", screen: null },
    { icon: "gear", name: "Settings", screen: "Settings" },
    { icon: "question-circle", name: "Help & Support", screen: null },
    { icon: "circle-info", name: "About Us", screen: null },
    { icon: "arrow-right-from-bracket", name: "Logout", screen: null, isLogout: true },
  ];

  return (
    <>
      <View
        style={[
          styles.headerContainer,
          { paddingTop: insets.top + 24 },
        ]}
        className="px-6 pb-4 bg-background"
      >
        <View className="flex-row items-center justify-between mb-2">
          <View className="flex-row items-center flex-1">
            {showBackButton && (
              <TouchableOpacity
                onPress={() => navigation.goBack()}
                className="mr-4"
              >
                <Entypo name="chevron-left" size={24} color="#111827" />
              </TouchableOpacity>
            )}
            <View className="flex-1">
              <Image source={require("../../assets/logo.png")} className="w-20 h-10" />
            </View>
          </View>

          {/* Right Actions */}
          <View className="flex-row items-center gap-3">
            {showNotificationIcon && (
              <TouchableOpacity
                onPress={onNotificationPress}
                className="p-2"
              >
                <FontAwesome6 name="bell" size={24} color="black" />
              </TouchableOpacity>
            )}

            <TouchableOpacity
              onPress={() => setIsMenuOpen(true)}
              className="p-2 relative"
            >
              <FontAwesome6 name="bars" size={24} color="black" />
            </TouchableOpacity>

            {rightAction}
          </View>
        </View>
      </View>

      {/* Backdrop */}
      {isMenuOpen && (
        <TouchableOpacity
          style={styles.backdrop}
          activeOpacity={1}
          onPress={() => setIsMenuOpen(false)}
        />
      )}

      {/* Side Menu */}
      {isMenuOpen && (
        <View style={styles.menuContainer}>
          <ScrollView showsVerticalScrollIndicator={false}>
            {/* Menu Header */}
            <View className="flex-row mt-5  items-center justify-between p-6 border-b border-gray-200">
              <Text className="text-normal-text text-2xl font-bold">Menu</Text>
              <TouchableOpacity
                onPress={() => setIsMenuOpen(false)}
                className="p-2"
              >
                <FontAwesome6 name="xmark" size={24} color="#111827" />
              </TouchableOpacity>
            </View>

            {/* User Profile Section */}
            <View className="p-6 bg-primary/10 border-b border-gray-200">
              <View className="flex-row items-center">
                <View className="w-16 h-16 rounded-full bg-primary/20 items-center justify-center mr-4">
                  <FontAwesome6 name="user" size={24} color="#7C3AED" />
                </View>
                <View className="flex-1">
                  <Text className="text-normal-text text-lg font-semibold">
                    John Doe
                  </Text>
                  <Text className="text-secondary-text text-sm">
                    john.doe@example.com
                  </Text>
                </View>
              </View>
            </View>

            {/* Menu Items */}
            <View className="py-2">
              {menuItems.map((item, index) => (
                <TouchableOpacity
                  key={index}
                  onPress={() => {
                    if (item.isLogout) {
                      // Handle logout
                      setIsMenuOpen(false);
                    } else if (item.screen) {
                      navigation.navigate(item.screen as any);
                      setIsMenuOpen(false);
                    } else {
                      setIsMenuOpen(false);
                    }
                  }}
                  className="flex-row items-center px-6 py-4 border-b border-gray-100"
                  activeOpacity={0.7}
                >
                  <View className="w-8 items-center mr-4">
                    <FontAwesome6
                      name={item.icon as any}
                      size={20}
                      color={item.isLogout ? "#EF4444" : "#6B7280"}
                    />
                  </View>
                  <Text
                    className={`flex-1 text-base ${
                      item.isLogout
                        ? "text-red-500 font-semibold"
                        : "text-normal-text"
                    }`}
                  >
                    {item.name}
                  </Text>
                  <Entypo name="chevron-right" size={20} color="#D1D5DB" />
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>
        </View>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 100,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
  },
  backdrop: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    zIndex: 999,
  },
  menuContainer: {
    position: "absolute",
    top: 0,
    right: 0,
    bottom: 0,
    width: "75%",
    backgroundColor: "#FFFFFF",
    zIndex: 1000,
    shadowColor: "#000",
    shadowOffset: {
      width: -2,
      height: 0,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});

