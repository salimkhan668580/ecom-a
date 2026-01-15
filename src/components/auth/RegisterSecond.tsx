import { NavigationProp, RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import React, { useState } from "react";
import { View, Text, TouchableOpacity, TextInput, Image, ActivityIndicator } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { RootStackParamList } from "../../navigation/AppNevigation";
import { RegisterSecondData, createUserSchema, registerSecondSchema } from "../../schema/AuthSchema";
import Entypo from "@expo/vector-icons/Entypo";
import { Toast } from "react-native-toast-message/lib/src/Toast";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import AuthService from "../../services/auth";

export default function RegisterSecond() {
  const route = useRoute<RouteProp<RootStackParamList, "RegisterSecond">>();
  const { values } = route.params;
  console.log("data in register second", values);
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  
  const [errors, setErrors] = useState<Partial<Record<keyof RegisterSecondData, string>>>({});
  const [addressErrors, setAddressErrors] = useState<{
    street?: string;
    city?: string;
    state?: string;
    pin?: string;
  }>({});
  const [secondValues, setSecondValues] = useState<RegisterSecondData>({
    password: "",
    address: [{
      street: "",
      city: "",
      state: "",
      pin: 0,
    }],
    dateOfBirth: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (name: keyof RegisterSecondData, value: string | number) => {
    if (name === "password" || name === "dateOfBirth") {
      setSecondValues({ ...secondValues, [name]: value as string });
    }
    setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const handleAddressChange = (field: "street" | "city" | "state" | "pin", value: string | number) => {
    const updatedAddress = [...secondValues.address];
    updatedAddress[0] = {
      ...updatedAddress[0],
      [field]: field === "pin" ? Number(value) : value,
    };
    setSecondValues({ ...secondValues, address: updatedAddress });
    setAddressErrors((prev) => ({ ...prev, [field]: undefined }));
    setErrors((prev) => ({ ...prev, address: undefined }));
  };

  const registerMutation = useMutation({
    mutationFn: (values: any) => AuthService.registerApi(values),
    onSuccess: (result: { message?: string }) => {
      Toast.show({
        type: "success",
        text1: result?.message ?? "Registration successful!",
      });
      navigation.reset({
        index: 0,
        routes: [{ name: "Login" }],
      });
    },
    onError: (error: unknown) => {
      if (error instanceof AxiosError) {
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
  const handleSubmit = () => {
    const result = registerSecondSchema.safeParse(secondValues);
    if (!result.success) {
      const fieldErrors = result.error.flatten().fieldErrors;
      console.log(fieldErrors);
      
      // Handle address errors - map array of error messages to individual fields
      const addressErrorArray = fieldErrors.address;
      const mappedAddressErrors: {
        street?: string;
        city?: string;
        state?: string;
        pin?: string;
      } = {};
      
      if (Array.isArray(addressErrorArray)) {
        addressErrorArray.forEach((errorMsg) => {
          if (typeof errorMsg === "string") {
            // Map error messages to their respective fields based on content
            if (errorMsg.toLowerCase().includes("street")) {
              mappedAddressErrors.street = errorMsg;
            } else if (errorMsg.toLowerCase().includes("city")) {
              mappedAddressErrors.city = errorMsg;
            } else if (errorMsg.toLowerCase().includes("state")) {
              mappedAddressErrors.state = errorMsg;
            } else if (errorMsg.toLowerCase().includes("pin")) {
              mappedAddressErrors.pin = errorMsg;
            }
          }
        });
      }
      
      setAddressErrors(mappedAddressErrors);
      setErrors({
        password: fieldErrors.password?.[0],
        dateOfBirth: fieldErrors.dateOfBirth?.[0],
      });
      return;
    }
    
    // Clear address errors on success
    setAddressErrors({});
    
    // TODO: Combine values from RegisterPage with secondValues and submit to API
    console.log("All data:", { ...values, ...result.data });

    const payload={...values, ...result.data, phone: Number(values.phone)};
    registerMutation.mutate(payload);
    // navigation.navigate("Login"); // Navigate after successful registration
  };

  return (
    <SafeAreaView className="flex-1 bg-background">
      <View className="flex-1 items-center justify-center px-6">
        <View className="mb-16 w-full border-2 border-primary rounded-lg px-3 min-h-1/2">
          <View className="flex-2 items-center justify-center py-4">
            <Image
              source={require("../../../assets/logo.png")}
              className="h-[150px] w-[150px]"
            />
          </View>

          {/* Password */}
          <Text className="text-normal-text text-base font-medium mb-2">Password</Text>
          <View className="flex-row items-center relative mb-1">
            <TextInput
              placeholder="Enter password"
              value={secondValues.password}
              onChangeText={(text) => handleChange("password", text)}
              secureTextEntry={!showPassword}
              className="w-full h-14 border-2 border-gray-300 bg-white rounded-md px-3 pr-10"
            />
            <TouchableOpacity
              onPress={() => setShowPassword(!showPassword)}
              className="absolute right-3"
            >
              <Entypo
                name={showPassword ? "eye-with-line" : "eye"}
                size={20}
                color="#6B7280"
              />
            </TouchableOpacity>
          </View>
          {errors.password && (
            <Text className="text-red-500 text-sm mb-2">{errors.password}</Text>
          )}

          {/* Date of Birth */}
          <Text className="text-normal-text text-base font-medium mb-2">Date of Birth</Text>
          <TextInput
            placeholder="Date of Birth (YYYY-MM-DD)"
            value={secondValues.dateOfBirth}
            onChangeText={(text) => handleChange("dateOfBirth", text)}
            className="w-full h-14 border-2 border-gray-300 bg-white rounded-md px-3 mb-1"
          />
          {errors.dateOfBirth && (
            <Text className="text-red-500 text-sm mb-2">{errors.dateOfBirth}</Text>
          )}

          {/* Address */}
          <Text className="text-normal-text text-base font-medium mb-2">Address</Text>
          
          <TextInput
            placeholder="Street"
            value={secondValues.address[0].street}
            onChangeText={(text) => handleAddressChange("street", text)}
            className="w-full h-14 border-2 border-gray-300 bg-white rounded-md px-3 mb-1"
          />
          {addressErrors.street && (
            <Text className="text-red-500 text-sm mb-2">{addressErrors.street}</Text>
          )}
          
          <TextInput
            placeholder="City"
            value={secondValues.address[0].city}
            onChangeText={(text) => handleAddressChange("city", text)}
            className="w-full h-14 border-2 border-gray-300 bg-white rounded-md px-3 mb-1"
          />
          {addressErrors.city && (
            <Text className="text-red-500 text-sm mb-2">{addressErrors.city}</Text>
          )}
          
          <TextInput
            placeholder="State"
            value={secondValues.address[0].state}
            onChangeText={(text) => handleAddressChange("state", text)}
            className="w-full h-14 border-2 border-gray-300 bg-white rounded-md px-3 mb-1"
          />
          {addressErrors.state && (
            <Text className="text-red-500 text-sm mb-2">{addressErrors.state}</Text>
          )}
          
          <TextInput
            placeholder="Pin"
            value={secondValues.address[0].pin.toString()}
            onChangeText={(text) => handleAddressChange("pin", text)}
            keyboardType="numeric"
            className="w-full h-14 border-2 border-gray-300 bg-white rounded-md px-3 mb-1"
          />
          {addressErrors.pin && (
            <Text className="text-red-500 text-sm mb-2">{addressErrors.pin}</Text>
          )}

          <TouchableOpacity
            onPress={handleSubmit}
            className="w-full h-12 bg-primary rounded-md items-center justify-center mt-4"
          >
            {registerMutation.isPending ? <ActivityIndicator size="small" color="white" /> : <Text className="text-white text-base font-semibold">Register</Text>}
          </TouchableOpacity>

          <View className="flex items-end my-6 justify-end">
            <Text className="text-secondary-text text-center text-sm">
              Already have an account?{" "}
              <Text
                onPress={() => navigation.navigate("Login")}
                className="text-primary text-center text-sm"
              >
                Login
              </Text>
            </Text>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}
