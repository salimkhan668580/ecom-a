import { useMutation } from "@tanstack/react-query";
import { LinearGradient } from "expo-linear-gradient";
import { useState } from "react";
import { View, Text, TouchableOpacity, TextInput, StyleSheet, ActivityIndicator } from "react-native";
import Entypo from "@expo/vector-icons/Entypo";


import { z } from "zod";
import AuthService from "../../services/auth";
import Toast from "react-native-toast-message";
import { AxiosError } from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import { RootStackParamList } from "../../navigation/AppNevigation";
export const changePasswordSchema = z
  .object({
    currentPassword: z
      .string()
      .min(1, "Current password is required"),

    newPassword: z
      .string()
      .min(1, "New password is required"),

    confirmPassword: z
      .string()
      .min(1, "Confirm password is required"),
  })
  .refine(
    (data) => data.newPassword === data.confirmPassword,
    {
      message: "Passwords do not match",
      path: ["confirmPassword"],
    }
  );


type ChangePasswordData = z.infer<typeof changePasswordSchema>;

const ChangePassword = ({ isChangingPassword, setIsChangingPassword }: { isChangingPassword: boolean, setIsChangingPassword: (isChangingPassword: boolean) => void }) => {
    const navigation = useNavigation<NavigationProp<RootStackParamList>>();
    const [passwordData, setPasswordData] = useState<ChangePasswordData>({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
    });
    const [errors, setErrors] = useState<Partial<ChangePasswordData>>({});
    const [showCurrentPassword, setShowCurrentPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

const changePasswordMutation = useMutation({
    mutationFn: (passwordData: ChangePasswordData) => AuthService.changePassword(passwordData),
    onSuccess: (result: { message: string }) => {
        Toast.show({
            type: "success",
            text1: result?.message ?? "Password changed successfully!",
        });
        setIsChangingPassword(false);
        setPasswordData({
            currentPassword: "",
            newPassword: "",
            confirmPassword: "",
        });
        setErrors({});

        AsyncStorage.removeItem("token");
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
        }
    },
});


    const handleChangePassword = (name: keyof ChangePasswordData, value: string) => {
        setPasswordData({ ...passwordData, [name]: value });
        setErrors((prev) => ({ ...prev, [name]: undefined }));
    };

    const handleSubmit = () => {
        const result = changePasswordSchema.safeParse(passwordData);
        if (!result.success) {
            const formattedErrors = result.error.format();
            setErrors({
                currentPassword: formattedErrors.currentPassword?._errors?.[0],
                newPassword: formattedErrors.newPassword?._errors?.[0],
                confirmPassword: formattedErrors.confirmPassword?._errors?.[0],
            });
            return;
        }



        changePasswordMutation.mutate(passwordData);
       
       
    };

    return (
        <View className="gap-4">
        <View>
          <Text className="text-normal-text text-sm font-medium mb-2">
            Current Password
          </Text>
          <View className="flex-row items-center relative">
            <TextInput
              className="w-full h-12 border-2 border-gray-300 bg-white rounded-md px-3 pr-10"
              style={styles.input}
              value={passwordData.currentPassword}
              onChangeText={(text) => handleChangePassword("currentPassword", text)}
              secureTextEntry={!showCurrentPassword}
            />
            <TouchableOpacity
              onPress={() => setShowCurrentPassword(!showCurrentPassword)}
              className="absolute right-3"
            >
              <Entypo
                name={showCurrentPassword ? "eye-with-line" : "eye"}
                size={20}
                color="#6B7280"
              />
            </TouchableOpacity>
          </View>
          {errors.currentPassword && (
            <Text className="text-red-500 text-sm mt-1">
              {errors.currentPassword}
            </Text>
          )}
        </View>
        <View>
          <Text className="text-normal-text text-sm font-medium mb-2">
            New Password
          </Text>
          <View className="flex-row items-center relative">
            <TextInput
              className="w-full h-12 border-2 border-gray-300 bg-white rounded-md px-3 pr-10"
              style={styles.input}
              value={passwordData.newPassword}
              onChangeText={(text) => handleChangePassword("newPassword", text)}
              secureTextEntry={!showNewPassword}
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
        <View>
          <Text className="text-normal-text text-sm font-medium mb-2">
            Confirm Password
          </Text>
          <View className="flex-row items-center relative">
            <TextInput
              className="w-full h-12 border-2 border-gray-300 bg-white rounded-md px-3 pr-10"
              style={styles.input}
              value={passwordData.confirmPassword}
              onChangeText={(text) => handleChangePassword("confirmPassword", text)}
              secureTextEntry={!showConfirmPassword}
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
        <View className="flex-row gap-3 mt-2">
          <TouchableOpacity
           
            className="flex-1 h-12 bg-gray-200 rounded-md items-center justify-center"
            onPress={() => setIsChangingPassword(false)}
          >
            <Text className="text-normal-text text-base font-semibold">
              Cancel
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={handleSubmit}
            activeOpacity={0.8}
            style={styles.buttonContainer}
          >
            <LinearGradient
              colors={["#7C3AED", "#EC4899"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.gradientButton}
            >
                {changePasswordMutation.isPending ? <ActivityIndicator size="small" color="white" /> : <Text className="text-white text-base font-semibold">Save</Text>}
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </View>
    )
}


const styles = StyleSheet.create({
    input: {
      borderWidth: 1,
      borderColor: "#D1D5DB",
      backgroundColor: "#FFFFFF",
    },
    buttonContainer: {
      flex: 1,
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
      paddingVertical: 10,
      paddingHorizontal: 32,
      alignItems: "center",
      justifyContent: "center",
      borderRadius: 12,
    },
  });
  

export default ChangePassword;