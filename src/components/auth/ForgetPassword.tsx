import { NavigationProp, useNavigation } from "@react-navigation/native";
import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Image,
  StyleSheet,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Feather } from "@expo/vector-icons";
import { RootStackParamList } from "../../navigation/AppNevigation";
import { LinearGradient } from "expo-linear-gradient";

type Step = "email" | "otp" | "success";

export default function ForgetPassword() {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const [step, setStep] = useState<Step>("email");
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [timer, setTimer] = useState(60);
  const [canResend, setCanResend] = useState(false);
  const otpInputRefs = useRef<(TextInput | null)[]>([]);

  // Timer countdown
  useEffect(() => {
    if (step === "otp" && timer > 0) {
      const interval = setInterval(() => {
        setTimer((prev) => {
          if (prev <= 1) {
            setCanResend(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [step, timer]);

  // Auto-focus next OTP input
  const handleOtpChange = (value: string, index: number) => {
    if (value.length > 1) {
      // Handle paste
      const pastedOtp = value.slice(0, 6).split("");
      const newOtp = [...otp];
      pastedOtp.forEach((digit, i) => {
        if (index + i < 6) {
          newOtp[index + i] = digit;
        }
      });
      setOtp(newOtp);
      // Focus last input
      if (index + pastedOtp.length < 6) {
        otpInputRefs.current[index + pastedOtp.length]?.focus();
      }
      return;
    }

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-focus next input
    if (value && index < 5) {
      otpInputRefs.current[index + 1]?.focus();
    }
  };

  const handleOtpKeyPress = (key: string, index: number) => {
    if (key === "Backspace" && !otp[index] && index > 0) {
      otpInputRefs.current[index - 1]?.focus();
    }
  };

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

    // TODO: Implement API call to send OTP
    // Simulate API call
    setStep("otp");
    setTimer(60);
    setCanResend(false);
    Alert.alert("Success", "OTP has been sent to your email");
  };

  const handleOtpSubmit = () => {
    const otpString = otp.join("");
    if (otpString.length !== 6) {
      Alert.alert("Error", "Please enter the complete 6-digit OTP");
      return;
    }

    // TODO: Implement API call to verify OTP
    // Simulate API call
    if (otpString === "123456") {
      setStep("success");
    } else {
      Alert.alert("Error", "Invalid OTP. Please try again.");
      setOtp(["", "", "", "", "", ""]);
      otpInputRefs.current[0]?.focus();
    }
  };

  const handleResendOtp = () => {
    // TODO: Implement API call to resend OTP
    setTimer(60);
    setCanResend(false);
    setOtp(["", "", "", "", "", ""]);
    otpInputRefs.current[0]?.focus();
    Alert.alert("Success", "OTP has been resent to your email");
  };

  const handleSuccessContinue = () => {
    navigation.navigate("Login");
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
              <Text className="text-white text-base font-semibold">
                Send OTP
              </Text>
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
    return (
      <SafeAreaView className="flex-1 bg-background">
        <View className="flex-1 items-center justify-center px-6">
          <View className="mb-16 w-full border-2 border-primary rounded-lg px-3 min-h-1/2">
            <View className="flex-2 items-center justify-center py-6">
              <View className="w-20 h-20 rounded-full bg-primary/10 items-center justify-center mb-4">
                <Feather name="mail" size={40} color="#7C3AED" />
              </View>
            </View>

            <View className="mb-6">
              <Text className="text-normal-text text-2xl font-bold mb-2 text-center">
                Verify OTP
              </Text>
              <Text className="text-secondary-text text-sm text-center mb-2">
                We&apos;ve sent a 6-digit code to
              </Text>
              <Text className="text-primary text-sm text-center font-semibold">
                {email}
              </Text>
            </View>

            <View className="flex-row justify-between mb-6">
              {otp.map((digit, index) => (
                <TextInput
                  key={index}
                  ref={(ref) => {
                    otpInputRefs.current[index] = ref;
                  }}
                  value={digit}
                  onChangeText={(value) => handleOtpChange(value, index)}
                  onKeyPress={({ nativeEvent }) =>
                    handleOtpKeyPress(nativeEvent.key, index)
                  }
                  keyboardType="number-pad"
                  maxLength={1}
                  className="w-12 h-14 border-2 border-gray-300 bg-white rounded-md text-center text-xl font-bold"
                  style={styles.otpInput}
                />
              ))}
            </View>

            <TouchableOpacity
              onPress={handleOtpSubmit}
              className="w-full h-12 bg-primary rounded-md items-center justify-center mb-4"
            >
              <Text className="text-white text-base font-semibold">
                Verify OTP
              </Text>
            </TouchableOpacity>

            <View className="flex items-center my-4 justify-center">
              {canResend ? (
                <TouchableOpacity onPress={handleResendOtp}>
                  <Text className="text-primary text-center text-sm font-semibold">
                    Resend OTP
                  </Text>
                </TouchableOpacity>
              ) : (
                <Text className="text-secondary-text text-center text-sm">
                  Resend OTP in {timer}s
                </Text>
              )}
            </View>

            <View className="flex items-center my-2 justify-center">
              <TouchableOpacity onPress={() => setStep("email")}>
                <Text className="text-secondary-text text-center text-sm">
                  Change email address
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </SafeAreaView>
    );
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
