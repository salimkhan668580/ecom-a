import React from "react";
import { ScrollView, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "./Header";

type ScreenLayoutProps = {
  children: React.ReactNode;
  title: string;
  subtitle?: string;
  showBackButton?: boolean;
  showCartIcon?: boolean;
  showNotificationIcon?: boolean;
  onCartPress?: () => void;
  onNotificationPress?: () => void;
  rightAction?: React.ReactNode;
  customHeader?: React.ReactNode;
  scrollable?: boolean;
};

export default function ScreenLayout({
  children,
  title,
  subtitle,
  showBackButton = false,
  showCartIcon = false,
  showNotificationIcon = false,
  onCartPress,
  onNotificationPress,
  rightAction,
  customHeader,
  scrollable = true,
}: ScreenLayoutProps) {
  // Approximate header height (safe area + pt-6 pb-4 + content)
  // This will be adjusted based on actual header content
  const headerHeight = subtitle ? 120 : 100;

  return (
    <SafeAreaView className="flex-1 bg-background">
      {/* Fixed Header */}
      {customHeader || (
        <Header
          title={title}
          subtitle={subtitle}
          showBackButton={showBackButton}
          showCartIcon={showCartIcon}
          showNotificationIcon={showNotificationIcon}
          onCartPress={onCartPress}
          onNotificationPress={onNotificationPress}
          rightAction={rightAction}
        />
      )}
      
      {/* Scrollable Content with padding for fixed header */}
      {scrollable ? (
        <ScrollView
          className="flex-1"
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingTop: headerHeight }}
        >
          {children}
        </ScrollView>
      ) : (
        <View className="flex-1" style={{ paddingTop: headerHeight }}>
          {children}
        </View>
      )}
    </SafeAreaView>
  );
}

