import React from "react";
import { View, Text } from "react-native";
import ScreenLayout from "../../layout/ScreenLayout";

export default function SettingsScreen() {
  return (
    <ScreenLayout title="Settings">
      <View className="px-6">
        <Text className="text-secondary-text text-base">
          Settings screen coming soon...
        </Text>
      </View>
    </ScreenLayout>
  );
}

