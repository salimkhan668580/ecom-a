import { NavigationProp, useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { View, Text, TouchableOpacity, TextInput, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { RootStackParamList } from "../../navigation/AppNevigation";

export default function RegisterSecond() {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const [gender, setGender] = useState<string>("");

  return (
    <SafeAreaView className="flex-1 bg-background">
      <View className="flex-1 items-center  justify-center px-6">
        <View className="mb-16 w-full  border-2 border-primary rounded-lg px-3 min-h-1/2 ">
        <View className="flex-2 items-center justify-center">

            <Image source={require("../../../assets/logo.png")} className="h-[200px] w-[200px]" />
        </View>
        <Text className="text-normal-text text-base font-medium mb-2">Date of Birth</Text>
        <TextInput
            placeholder="Date of Birth"
            className="w-full h-14 border-2 border-gray-300 bg-white rounded-md px-3 mb-4"
          />

        <Text className="text-normal-text text-base font-medium mb-2">Address</Text>
        <TextInput
            placeholder="Street"
            className="w-full h-14 border-2 border-gray-300 bg-white rounded-md px-3 mb-4"
          />
          <TextInput
            placeholder="City"
            className="w-full h-14 border-2 border-gray-300 bg-white rounded-md px-3 mb-4"
          />
          <TextInput
            placeholder="State"
            className="w-full h-14 border-2 border-gray-300 bg-white rounded-md px-3 mb-4"
          />
          <TextInput
            placeholder="Pin"
            className="w-full h-14 border-2 border-gray-300 bg-white rounded-md px-3 mb-4"
          />

 
         
           
          <TouchableOpacity
            onPress={() => navigation.navigate("Landing")}
            className="w-full h-12 bg-primary rounded-md items-center justify-center"
          >
            <Text className="text-white text-base font-semibold">Register</Text>
          </TouchableOpacity>

          <View className="flex items-end my-6 justify-end">
            <Text className=" text-secondary-text text-center text-sm">Already have an account? <Text onPress={() => navigation.navigate("Login")} className=" text-primary text-center text-sm">Login</Text></Text>
          </View>

        
        </View>
      </View>
    </SafeAreaView>
  );
}


