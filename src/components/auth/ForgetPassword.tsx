import { NavigationProp, useNavigation } from "@react-navigation/native";
import React, { useState,  } from "react";

import AuthService from "../../services/auth";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Image,
  StyleSheet,
  Alert,ActivityIndicator
  ,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Feather } from "@expo/vector-icons";
import { RootStackParamList } from "../../navigation/AppNevigation";
import { LinearGradient } from "expo-linear-gradient";
import { useMutation } from "@tanstack/react-query";

import Toast from "react-native-toast-message";
import { AxiosError } from "axios";
import OtpVerification from "./OtpVerification";
import PasswordEnter from "./PasswordEnter";

type Step = "email" | "otp" | "resetPassword" | "success";

export default function ForgetPassword() {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const [step, setStep] = useState<Step>("email");
  const [email, setEmail] = useState("");

  // =====sent otp api call===============
  const forgetEmailMutation = useMutation({
    mutationFn: (email: string) => AuthService.forgetEmail(email),
    onSuccess: (result: { otp: string }) => {
      setStep("otp");

       Toast.show({
        type: "success",
        text1:`OTP is  ${result?.otp}`,
      });
    },
    onError: (error:unknown) => {
    
      if(error instanceof AxiosError) {
        Toast.show({
          type: "error",
          text1: error.response?.data?.message ?? "Something went wrong",
        });
      }
      else {
        console.log(error);
        Toast.show({
          type: "error",
          text1: "Something went wrong",
        });
      }
    },
  });




  const handleEmailSubmit = () => {
    if (!email) {
      Alert.alert("Error", "Please enter your email address");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      Alert.alert("Error", "Please enter a valid email address");
      return;
    }
    forgetEmailMutation.mutate(email);

 
  };


  const handleSuccessContinue = () => {

    navigation.reset({
      index: 0,
      routes: [{ name: "Login" }],
    });
  };

  // Email Enter Page
  if (step === "email") {
    return (
      <SafeAreaView className="flex-1 bg-background">
        <View className="flex-1 items-center justify-center px-6">
          <View className="mb-16 w-full border-2 border-primary rounded-lg px-3 min-h-1/2">
            <View className="flex-2 items-center justify-center py-6">
              <Image
                source={require("../../../assets/logo.png")}
                className="h-[150px] w-[150px]"
              />
            </View>

            <View className="mb-4">
              <Text className="text-normal-text text-2xl font-bold mb-2 text-center">
                Forgot Password?
              </Text>
              <Text className="text-secondary-text text-sm text-center">
                Enter your email address and we&apos;ll send you an OTP to reset
                your password
              </Text>
            </View>

            <Text className="text-normal-text text-base font-medium mb-2">
              Email
            </Text>
            <TextInput
              placeholder="Enter your email"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              className="w-full h-14 border-2 border-gray-300 bg-white rounded-md px-3 mb-6"
            />

            <TouchableOpacity
              onPress={handleEmailSubmit}
              className="w-full h-12 bg-primary rounded-md items-center justify-center mb-4"
            >
              {forgetEmailMutation.isPending ? (
                <ActivityIndicator size="small" color="#fff" />
              ) : (
                <Text className="text-white text-base font-semibold">
                Send OTP
              </Text>
              )}
            </TouchableOpacity>

            <View className="flex items-center my-4 justify-center">
              <TouchableOpacity onPress={() => navigation.navigate("Login")}>
                <Text className="text-secondary-text text-center text-sm">
                  Remember your password?{" "}
                  <Text className="text-primary text-center text-sm font-semibold">
                    Login
                  </Text>
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </SafeAreaView>
    );
  }

  // OTP Verify Page
  if (step === "otp") {
    return <OtpVerification email={email} setStep={setStep}  step={step}/>
  }

  // Reset Password Page
  if (step === "resetPassword") {
    return <PasswordEnter email={email} setStep={setStep}  step={step}/>
  }

  // OTP Success Page
  return (
    <SafeAreaView className="flex-1 bg-background">
      <View className="flex-1 items-center justify-center px-6">
        <View className="mb-16 w-full border-2 border-primary rounded-lg px-3 min-h-1/2">
          <View className="flex-2 items-center justify-center py-8">
            <View className="w-24 h-24 rounded-full bg-green-100 items-center justify-center mb-6">
              <Feather name="check-circle" size={60} color="#10B981" />
            </View>

            <Text className="text-normal-text text-2xl font-bold mb-3 text-center">
              Password Reset Successful!
            </Text>
            <Text className="text-secondary-text text-sm text-center mb-8 px-4">
              Your password has been successfully reset. You can now login with
              your new password.
            </Text>

            <TouchableOpacity
              onPress={handleSuccessContinue}
              activeOpacity={0.8}
              style={styles.buttonContainer}
              className="w-full"
            >
              <LinearGradient
                colors={["#7C3AED", "#EC4899"]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.gradientButton}
              >
                <Text className="text-white text-base font-semibold">
                  Continue to Login
                </Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  otpInput: {
    borderWidth: 1,
    borderColor: "#D1D5DB",
    backgroundColor: "#FFFFFF",
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
  },
});
