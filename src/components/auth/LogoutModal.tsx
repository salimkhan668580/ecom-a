import React from "react";
import { Text, View, Modal, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import { RootStackParamList } from "../../navigation/AppNevigation";
import { LinearGradient } from "expo-linear-gradient";
import { FontAwesome6 } from "@expo/vector-icons";

export default function LogoutModal({ visible, onClose }: { visible: boolean; onClose: () => void }) {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const handleLogout = () => {
    onClose();
    // Navigate to Login page and reset navigation stack
    navigation.reset({
      index: 0,
      routes: [{ name: "Login" }],
    });
  };

  return (
    <Modal animationType="slide" transparent={true} visible={visible} onRequestClose={onClose}>
      <View style={styles.modalOverlay}>
        <TouchableOpacity
          style={styles.backdrop}
          activeOpacity={1}
          onPress={onClose}
        />
        <View style={styles.modalContent}>
          {/* Icon */}
          <View className="items-center mb-4">
            <View className="w-20 h-20 rounded-full bg-red-100 items-center justify-center mb-4">
              <FontAwesome6 name="arrow-right-from-bracket" size={32} color="#EF4444" />
            </View>
          </View>

          {/* Title */}
          <Text
  className="text-white text-base font-semibold"
  
  ellipsizeMode="clip"
>
  Log
</Text>

          {/* Message */}
          <Text className="text-secondary-text text-base text-center mb-8 px-6">
            Are you sure you want to logout? You&apos;ll need to login again to access your account.
          </Text>

          {/* Buttons */}
          <View className="flex-row gap-3 px-6">
            <TouchableOpacity
              onPress={onClose}
              className="flex-1 h-12 rounded-xl border-2 border-gray-300 items-center justify-center"
              activeOpacity={0.7}
            >
              <Text className="text-normal-text text-base font-semibold">Cancel</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={handleLogout}
              activeOpacity={0.8}
              style={styles.buttonContainer}
              className="flex-1 border-2"
            >
              <LinearGradient
                colors={["#7C3AED", "#EC4899"]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.gradientButton}
              >
                <Text className="text-white text-base font-semibold" >
                  Logout
                </Text>
              </LinearGradient>
            </TouchableOpacity>
     
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  backdrop: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  modalContent: {
    backgroundColor: "#FFFFFF",
    borderRadius: 24,
    width: "85%",
    maxWidth: 400,
    paddingVertical: 32,
    paddingHorizontal: 24,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 10,
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
    
    paddingVertical: 16,
    paddingHorizontal: 32,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 12,
    width: "100%",
    minWidth: 0,
  },
});