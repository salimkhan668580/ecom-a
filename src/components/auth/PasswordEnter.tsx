import { NavigationProp, useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  StyleSheet,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { RootStackParamList } from "../../navigation/AppNevigation";
import Toast from "react-native-toast-message";
import { useMutation } from "@tanstack/react-query";
import AuthService from "../../services/auth";
import Entypo from "@expo/vector-icons/Entypo";
import { AxiosError } from "axios";

type PasswordEnterProps = {
  email: string;
  setStep?: (step: "email" | "otp" | "resetPassword" | "success") => void;
  step?: string;
};

const PasswordEnter = ({ email, setStep }: PasswordEnterProps) => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState<{
    newPassword?: string;
    confirmPassword?: string;
  }>({});

  const forgetPasswordMutation = useMutation({
    mutationFn: ({
      email,
      newPassword,
      confirmPassword,
    }: {
      email: string;
      newPassword: string;
      confirmPassword: string;
    }) => AuthService.forgetPassword({ email, newPassword, confirmPassword }),
    onSuccess: (result: { message?: string }) => {
      Toast.show({
        type: "success",
        text1: result?.message ?? "Password reset successful!",
      });
        setStep("success");
    },
    onError: (error: unknown) => {
      if (error instanceof AxiosError) {
        Toast.show({
          type: "error",
          text1:
            (error as AxiosError<{ message: string }>)?.response?.data
              ?.message ?? "Something went wrong",
        });
      } else {
        console.log(error);
        Toast.show({
          type: "error",
          text1: "Something went wrong",
        });
      }
    },
  });

  const validateForm = () => {
    const newErrors: {
      newPassword?: string;
      confirmPassword?: string;
    } = {};

    if (!newPassword) {
      newErrors.newPassword = "New password is required";
    }

    if (!confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (!validateForm()) {
      return;
    }

    forgetPasswordMutation.mutate({
      email,
      newPassword,
      confirmPassword,
    });
  };

  return (
    <SafeAreaView className="flex-1 bg-background">
      <View className="flex-1 items-center justify-center px-6">
        <View className="mb-16 w-full border-2 border-primary rounded-lg px-3 min-h-1/2">
          <View className="items-center justify-center py-6">
            <Image
              source={require("../../../assets/logo.png")}
              className="h-[150px] w-[150px]"
            />
          </View>

          <View className="mb-4">
            <Text className="text-normal-text text-2xl font-bold mb-2 text-center">
              Reset Password
            </Text>
            <Text className="text-secondary-text text-sm text-center">
              Enter your new password below
            </Text>
          </View>

          {/* New Password */}
          <View className="mb-4">
            <Text className="text-normal-text text-base font-medium mb-2">
              New Password
            </Text>
            <View className="flex-row items-center relative">
              <TextInput
                placeholder="Enter new password"
                value={newPassword}
                onChangeText={(text) => {
                  setNewPassword(text);
                  setErrors((prev) => ({ ...prev, newPassword: undefined }));
                }}
                secureTextEntry={!showNewPassword}
                className="w-full h-14 border-2 border-gray-300 bg-white rounded-md px-3 pr-10"
                style={styles.input}
              />
              <TouchableOpacity
                onPress={() => setShowNewPassword(!showNewPassword)}
                className="absolute right-3"
              >
                <Entypo
                  name={showNewPassword ? "eye-with-line" : "eye"}
                  size={20}
                  color="#6B7280"
                />
              </TouchableOpacity>
            </View>
            {errors.newPassword && (
              <Text className="text-red-500 text-sm mt-1">
                {errors.newPassword}
              </Text>
            )}
          </View>

          {/* Confirm Password */}
          <View className="mb-6">
            <Text className="text-normal-text text-base font-medium mb-2">
              Confirm Password
            </Text>
            <View className="flex-row items-center relative">
              <TextInput
                placeholder="Confirm new password"
                value={confirmPassword}
                onChangeText={(text) => {
                  setConfirmPassword(text);
                  setErrors((prev) => ({
                    ...prev,
                    confirmPassword: undefined,
                  }));
                }}
                secureTextEntry={!showConfirmPassword}
                className="w-full h-14 border-2 border-gray-300 bg-white rounded-md px-3 pr-10"
                style={styles.input}
              />
              <TouchableOpacity
                onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3"
              >
                <Entypo
                  name={showConfirmPassword ? "eye-with-line" : "eye"}
                  size={20}
                  color="#6B7280"
                />
              </TouchableOpacity>
            </View>
            {errors.confirmPassword && (
              <Text className="text-red-500 text-sm mt-1">
                {errors.confirmPassword}
              </Text>
            )}
          </View>

          <TouchableOpacity
            onPress={handleSubmit}
            className="w-full h-12 bg-primary rounded-md items-center justify-center mb-4"
            disabled={forgetPasswordMutation.isPending}
          >
            {forgetPasswordMutation.isPending ? (
              <ActivityIndicator size="small" color="#fff" />
            ) : (
              <Text className="text-white text-base font-semibold">
                Reset Password
              </Text>
            )}
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: "#D1D5DB",
    backgroundColor: "#FFFFFF",
  },
});

export default PasswordEnter;
