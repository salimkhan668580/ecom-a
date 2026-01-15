import { NavigationProp, useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { View, Text, TouchableOpacity, TextInput, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { RootStackParamList } from "../../navigation/AppNevigation";
import { CreateUserData, createUserSchema } from "../../schema/AuthSchema";

export default function RegisterPage() {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const [values, setValues] = useState<CreateUserData>({
    name: "Hello",
    email: "hello@gmail.com",
    gender: "male",
    phone: "1234567890",
    role: "user",

  });
  const [errors, setErrors] = useState<Partial<CreateUserData>>({});
  const handleChange = (name: keyof CreateUserData, value: string) => {
    setValues({ ...values, [name]: value });
    setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const handleSubmit = (values: CreateUserData) => {
    const result = createUserSchema.safeParse(values);
    if (!result.success) {
      const fieldErrors = result.error.flatten().fieldErrors;
      console.log(fieldErrors);
      setErrors({
        name: fieldErrors.name?.[0],
        email: fieldErrors.email?.[0],
        phone: fieldErrors.phone?.[0] ? fieldErrors.phone?.[0] : "",
        gender: fieldErrors.gender?.[0] as "male" | "female" | "other" | undefined,
        role: fieldErrors.role?.[0] as "admin" | "user" | undefined,
  
      });

      return;
    }

    navigation.navigate("RegisterSecond", { values: result.data });
  };
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
            className="w-full h-14 border-2 border-gray-300 bg-white rounded-md px-3 mb-1"
            value={values.name}
            onChangeText={(text) => handleChange("name", text)}
          />
          {errors.name && (
            <Text className="text-red-500 text-sm mb-2">{errors.name}</Text>
          )}
          <Text className="text-normal-text text-base font-medium mb-2">Email</Text>
          <TextInput
            placeholder="Email"
            className="w-full h-14 border-2 border-gray-300 bg-white rounded-md px-3 mb-1"
            value={values.email}
            onChangeText={(text) => handleChange("email", text)}
          />
          {errors.email && (
            <Text className="text-red-500 text-sm mb-2">{errors.email}</Text>
          )}
          <Text className="text-normal-text text-base font-medium mb-2">Phone</Text>
          <TextInput
            placeholder="Phone"
           
            className="w-full h-14 border-2 border-gray-300 bg-white rounded-md px-3  mb-1"
            value={values.phone.toString()}
            onChangeText={(text) => handleChange("phone", text)}
            keyboardType="numeric"
            />
            {errors.phone && (
              <Text className="text-red-500 text-sm mb-2">{errors.phone}</Text>
            )}
        <View className="mb-4">
          <Text className="text-normal-text text-base font-medium mb-2">Gender</Text>
          <View className="flex-row gap-4">
            <TouchableOpacity
              onPress={() => handleChange("gender", "male")}
              className="flex-row items-center"
            >
              <View className="w-5 h-5 rounded-full border-2 border-gray-300 items-center justify-center mr-2"
                style={{ borderColor: values.gender === "male" ? "#7C3AED" : "#D1D5DB" }}
              >
                {values.gender === "male" && (
                  <View className="w-3 h-3 rounded-full bg-primary" />
                )}
              </View>
              <Text className="text-normal-text text-base">Male</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => handleChange("gender", "female")}
              className="flex-row items-center"
            >
              <View className="w-5 h-5 rounded-full border-2 border-gray-300 items-center justify-center mr-2"
                style={{ borderColor: values.gender === "female" ? "#7C3AED" : "#D1D5DB" }}
              >
                {values.gender === "female" && (
                  <View className="w-3 h-3 rounded-full bg-primary" />
                )}
              </View>
              <Text className="text-normal-text text-base">Female</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => handleChange("gender", "other")}
              className="flex-row items-center"
            >
              <View className="w-5 h-5 rounded-full border-2 border-gray-300 items-center justify-center mr-2"
                style={{ borderColor: values.gender === "other" ? "#7C3AED" : "#D1D5DB" }}
              >
                {values.gender === "other" && (
                  <View className="w-3 h-3 rounded-full bg-primary" />
                )}
              </View>
             
              <Text className="text-normal-text text-base">Other</Text>
            </TouchableOpacity>
          </View>
          {errors.gender && (
            <Text className="text-red-500 text-sm mb-2">{errors.gender}</Text>
          )}
        </View>
         
           
          <TouchableOpacity
            onPress={() => handleSubmit(values)}
            className="w-full h-12 bg-primary rounded-md items-center justify-center"
          >
            <Text className="text-white text-base font-semibold">Next</Text>
          </TouchableOpacity>

          <View className="flex items-end my-6 justify-end">
            <Text className=" text-secondary-text text-center text-sm">Already have an account? <Text onPress={() => navigation.navigate("Login")} className=" text-primary text-center text-sm">Login</Text></Text>
          </View>

        
        </View>
      </View>
    </SafeAreaView>
  );
}


