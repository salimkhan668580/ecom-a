import { NavigationProp, useNavigation } from "@react-navigation/native";
import React from "react";
import { View, Text, TouchableOpacity, TextInput, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { RootStackParamList } from "../../navigation/AppNevigation";
import Toast from "react-native-toast-message";

export default function LoginPage() {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  return (
    <SafeAreaView className="flex-1 bg-background">
      <View className="flex-1 items-center  justify-center px-6">
        <View className="mb-16 w-full  border-2 border-primary rounded-lg px-3 min-h-1/2 ">
        <View className="flex-2 items-center justify-center">

            <Image source={require("../../../assets/logo.png")} className="h-[200px] w-[200px]" />
        </View>
          <TextInput
            placeholder="Email"
            className="w-full h-14 border-2 border-gray-300 bg-white rounded-md px-3 mb-4"
          />
          <TextInput
            placeholder="Password"
            secureTextEntry
            className="w-full h-14 border-2 border-gray-300 bg-white rounded-md px-3 "
          />
            <View className="flex items-end my-4 justify-end">
            <Text className=" text-primary text-center text-sm">Forgot Password?</Text>
          </View>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("MainTabs");
              Toast.show({
                type: "success",
                text1: "Login successful!",
              });
            }}
            className="w-full h-12 bg-primary rounded-md items-center justify-center"
          >
            <Text className="text-white text-base font-semibold">Login</Text>
          </TouchableOpacity>

          <View className="flex items-end my-6 justify-end">
            <Text className=" text-secondary-text text-center text-sm">Don&apos;t have an account? <Text onPress={() => navigation.navigate("Register")} className=" text-primary text-center text-sm">Sign up</Text></Text>
          </View>

        
        </View>
      </View>
    </SafeAreaView>
  );
}


