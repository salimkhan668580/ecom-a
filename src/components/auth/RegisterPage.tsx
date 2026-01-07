import { NavigationProp, useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { View, Text, TouchableOpacity, TextInput, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { RootStackParamList } from "../../navigation/AppNevigation";

export default function RegisterPage() {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const [gender, setGender] = useState<string>("");

  return (
    <SafeAreaView className="flex-1 bg-background">
      <View className="flex-1 items-center  justify-center px-6">
        <View className="mb-16 w-full  border-2 border-primary rounded-lg px-3 min-h-1/2 ">
        <View className="flex-2 items-center justify-center">

            <Image source={require("../../../assets/logo.png")} className="h-[200px] w-[200px]" />
        </View>
        <Text className="text-normal-text text-base font-medium mb-2">Name</Text>
          <TextInput
            placeholder="Name"
            className="w-full h-14 border-2 border-gray-300 bg-white rounded-md px-3 mb-4"
          />
          <Text className="text-normal-text text-base font-medium mb-2">Email</Text>
          <TextInput
            placeholder="Email"
            className="w-full h-14 border-2 border-gray-300 bg-white rounded-md px-3 mb-4"
          />
          <Text className="text-normal-text text-base font-medium mb-2">Phone</Text>
          <TextInput
            placeholder="Phone"
            secureTextEntry
            className="w-full h-14 border-2 border-gray-300 bg-white rounded-md px-3  mb-4"
          />
        <View className="mb-4">
          <Text className="text-normal-text text-base font-medium mb-2">Gender</Text>
          <View className="flex-row gap-4">
            <TouchableOpacity
              onPress={() => setGender("male")}
              className="flex-row items-center"
            >
              <View className="w-5 h-5 rounded-full border-2 border-gray-300 items-center justify-center mr-2"
                style={{ borderColor: gender === "male" ? "#7C3AED" : "#D1D5DB" }}
              >
                {gender === "male" && (
                  <View className="w-3 h-3 rounded-full bg-primary" />
                )}
              </View>
              <Text className="text-normal-text text-base">Male</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setGender("female")}
              className="flex-row items-center"
            >
              <View className="w-5 h-5 rounded-full border-2 border-gray-300 items-center justify-center mr-2"
                style={{ borderColor: gender === "female" ? "#7C3AED" : "#D1D5DB" }}
              >
                {gender === "female" && (
                  <View className="w-3 h-3 rounded-full bg-primary" />
                )}
              </View>
              <Text className="text-normal-text text-base">Female</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setGender("other")}
              className="flex-row items-center"
            >
              <View className="w-5 h-5 rounded-full border-2 border-gray-300 items-center justify-center mr-2"
                style={{ borderColor: gender === "other" ? "#7C3AED" : "#D1D5DB" }}
              >
                {gender === "other" && (
                  <View className="w-3 h-3 rounded-full bg-primary" />
                )}
              </View>
              <Text className="text-normal-text text-base">Other</Text>
            </TouchableOpacity>
          </View>
        </View>
         
           
          <TouchableOpacity
            onPress={() => navigation.navigate("RegisterSecond")}
            className="w-full h-12 bg-primary rounded-md items-center justify-center"
          >
            <Text className="text-white text-base font-semibold" onPress={() => navigation.navigate("RegisterSecond")}>Next</Text>
          </TouchableOpacity>

          <View className="flex items-end my-6 justify-end">
            <Text className=" text-secondary-text text-center text-sm">Already have an account? <Text onPress={() => navigation.navigate("Login")} className=" text-primary text-center text-sm">Login</Text></Text>
          </View>

        
        </View>
      </View>
    </SafeAreaView>
  );
}


