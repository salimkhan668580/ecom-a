import { NavigationProp, useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { View, Text, TouchableOpacity, TextInput, Image, ActivityIndicator } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { RootStackParamList } from "../../navigation/AppNevigation";
import Toast from "react-native-toast-message";
import { useMutation } from "@tanstack/react-query";
import AuthService from "../../services/auth";
import { LoginData, loginSchema } from "../../schema/AuthSchema";
import Entypo from '@expo/vector-icons/Entypo';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AxiosError } from "axios";
import { useUser } from "../../context/UserContext";


export default function LoginPage() {
  const [values, setValues] = useState<LoginData>({
    email: "khansalim0193@gmail.com",
    password: "1234",
  });

  const [errors, setErrors] = useState<Partial<LoginData>>({});
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (name: keyof LoginData, value: string) => {
    setValues({ ...values, [name]: value });
    setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const { setUser } = useUser();
  const loginMutation = useMutation({
    mutationFn: (loginData: LoginData) =>AuthService.login(loginData.email, loginData.password),
    onSuccess: (result) => {
      Toast.show({
        type: "success",
        text1: "Login successful!",
      });
     
      AsyncStorage.setItem("token", result?.token);
      setUser(result?.user);
      // Reset navigation stack to prevent going back to login
      navigation.reset({
        index: 0,
        routes: [{ name: "MainTabs" }],
      });
    },
    onError: (error:unknown) => {
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


  const handleLogin = (data: LoginData) => {
    const result = loginSchema.safeParse(values);

    if (!result.success) {
      const fieldErrors = result.error.flatten().fieldErrors;

      setErrors({
        email: fieldErrors.email?.[0],
        password: fieldErrors.password?.[0],
      });
      return;
    }

   console.log(result.data);
    loginMutation.mutate(data);
  };

  return (
    <SafeAreaView className="flex-1 bg-background">
      <View className="flex-1 items-center justify-center px-6">
        <View className="mb-16 w-full border-2 border-primary rounded-lg px-3 min-h-1/2">
          
          <View className="items-center justify-center">
            <Image
              source={require("../../../assets/logo.png")}
              className="h-[200px] w-[200px]"
            />
          </View>

          {/* EMAIL */}
         <TextInput placeholder="Email"
          className="w-full h-14 border-2 border-gray-300 bg-white rounded-md px-3 mb-1"
          value={values.email}
          onChangeText={(text) => handleChange("email", text)}
          />
          {errors.email && (
        <Text className="text-red-500 text-sm mb-1">{errors.email}</Text>
      )}

          {/* PASSWORD */}
          <View className="flex-row items-center relative">

          <TextInput placeholder="Password"
          className="w-full h-14 border-2 border-gray-300 bg-white rounded-md px-3 mb-1"
          value={values.password}
          onChangeText={(text) => handleChange("password", text)}
          secureTextEntry={!showPassword}
          />
       
      <Entypo name={showPassword ? "eye-with-line" : "eye"} size={14} color="black" className="absolute right-3 top-1/2 -translate-y-1/2" onPress={() => setShowPassword(!showPassword)} />
          </View>
          {errors.password && (
        <Text className="text-red-500 text-sm mb-1">{errors.password}</Text>
      )}



          <View className="flex items-end my-4">
            <TouchableOpacity
              onPress={() => navigation.navigate("ForgetPassword")}
            >
              <Text className="text-primary text-sm">
                Forgot Password?
              </Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            onPress={() => handleLogin(values)}
            className="w-full h-12 bg-primary rounded-md items-center justify-center"
            disabled={loginMutation.isPending}
          >
            <Text className="text-white text-base font-semibold">
              {loginMutation.isPending ? <ActivityIndicator size="small" color="white" /> : "Login"}
            </Text>
          </TouchableOpacity>

          <View className="items-end my-6">
            <Text className="text-secondary-text text-sm">
              Don&apos;t have an account?{" "}
              <Text
                onPress={() => navigation.navigate("Register")}
                className="text-primary"
              >
                Sign up
              </Text>
            </Text>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}
