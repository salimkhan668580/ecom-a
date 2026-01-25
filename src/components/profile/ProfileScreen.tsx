import React, {  useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { Entypo } from "@expo/vector-icons";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import { RootStackParamList } from "../../navigation/AppNevigation";
import DetailsHeader from "../../layout/DetailsHeader";
import { useUser } from "../../context/UserContext";
import ChangePassword from "./ChangePassword";



export default function ProfileScreen() {

  const { user } = useUser();
  console.log("user", user);

  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const [isEditing, setIsEditing] = useState(false);
  const [isChangingPassword, setIsChangingPassword] = useState(false);

  // Profile data state
  const [profileData, setProfileData] = useState({
    id: user?.id,
    name: user?.name,
    email: user?.email,
    phone:user?.phone,
    gender: user?.gender,
  });



  const handleSaveProfile = () => {
    // TODO: Implement API call to save profile
    Alert.alert("Success", "Profile updated successfully!");
    setIsEditing(false);
  };



  return (
    <KeyboardAvoidingView
    style={{ flex: 1 }}
    behavior={Platform.OS === "ios" ? "padding" : "height"}
    keyboardVerticalOffset={Platform.OS === "ios" ? 80 : 0}
  >
    <SafeAreaView 
    
    className="flex-1 bg-background">
      <ScrollView 
     
      className="flex-1"
      showsVerticalScrollIndicator={false}
      keyboardShouldPersistTaps="handled"
      contentContainerStyle={{
        paddingBottom: 40,
        flexGrow: 1,
      }}
    >
      
        {/* Header */}
        <DetailsHeader title="My Account" subtitle="Manage your account and preferences" />
        <View className="px-6 pt-6 pb-4">
          <View className="flex-row items-center mb-2">
            <View className="w-16 h-16 rounded-full bg-primary/20 items-center justify-center mr-4">
              <Entypo name="user" size={32} color="#7C3AED" />
            </View>
            <View className="flex-1">
              <Text className="text-normal-text text-2xl font-bold">
                {profileData.name}
              </Text>
              <Text className="text-secondary-text text-sm">
                {profileData.email}
              </Text>
            </View>
          </View>
        </View>

        {/* Profile Information Section */}
        <View className="px-6 mb-6">
          <View className="bg-white rounded-xl p-4 shadow-sm">
            <View className="flex-row items-center justify-between mb-4">
              <Text className="text-normal-text text-xl font-semibold">
                Profile Information
              </Text>
              {!isEditing && (
                <TouchableOpacity
                  onPress={() => setIsEditing(true)}
                  className="flex-row items-center"
                >
                  <Entypo name="pencil" size={18} color="#7C3AED" />
                  <Text className="text-primary text-base font-medium ml-1">
                    Edit
                  </Text>
                </TouchableOpacity>
              )}
            </View>

            {isEditing ? (
              <View className="gap-4">
                <View>
                  <Text className="text-normal-text text-sm font-medium mb-2">
                    Name
                  </Text>
                  <TextInput
                    value={profileData.name}
                    onChangeText={(text) =>
                      setProfileData({ ...profileData, name: text })
                    }
                    className="w-full h-12 border-2 border-gray-300 bg-white rounded-md px-3"
                    style={styles.input}
                  />
                </View>
                <View>
                  <Text className="text-normal-text text-sm font-medium mb-2">
                    Email
                  </Text>
                  <TextInput
                    value={profileData.email}
                    onChangeText={(text) =>
                      setProfileData({ ...profileData, email: text })
                    }
                    keyboardType="email-address"
                    className="w-full h-12 border-2 border-gray-300 bg-white rounded-md px-3"
                    style={styles.input}
                  />
                </View>
                <View>
                  <Text className="text-normal-text text-sm font-medium mb-2">
                    Phone
                  </Text>
                  <TextInput
                    value={profileData.phone}
                    onChangeText={(text) =>
                      setProfileData({ ...profileData, phone: text })
                    }
                    keyboardType="phone-pad"
                    className="w-full h-12 border-2 border-gray-300 bg-white rounded-md px-3"
                    style={styles.input}
                  />
                </View>
                <View className="flex-row gap-3 mt-2">
                  <TouchableOpacity
                    onPress={() => {
                      setIsEditing(false);
                      // Reset to original data if needed
                    }}
                    className="flex-1 h-12 bg-gray-200 rounded-md items-center justify-center"
                  >
                    <Text className="text-normal-text text-base font-semibold">
                      Cancel
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={handleSaveProfile}
                    activeOpacity={0.8}
                    style={styles.buttonContainer}
                  >
                    <LinearGradient
                      colors={["#7C3AED", "#EC4899"]}
                      start={{ x: 0, y: 0 }}
                      end={{ x: 1, y: 0 }}
                      style={styles.gradientButton}
                    >
                      <Text className="text-white text-base font-semibold">
                        Save
                      </Text>
                    </LinearGradient>
                  </TouchableOpacity>
                </View>
              </View>
            ) : (
              <View className="gap-4">
                <View>
                  <Text className="text-secondary-text text-sm mb-1">Name</Text>
                  <Text className="text-normal-text text-base">
                    {profileData.name}
                  </Text>
                </View>
                <View>
                  <Text className="text-secondary-text text-sm mb-1">Email</Text>
                  <Text className="text-normal-text text-base">
                    {profileData.email}
                  </Text>
                </View>
                <View>
                  <Text className="text-secondary-text text-sm mb-1">Phone</Text>
                  <Text className="text-normal-text text-base">
                    {profileData.phone}
                  </Text>
                </View>
                <View>
                  <Text className="text-secondary-text text-sm mb-1">
                    Gender
                  </Text>
                  <Text className="text-normal-text text-base">
                    {profileData.gender}
                  </Text>
                </View>
              </View>
            )}
          </View>
        </View>

        {/* Change Password Section */}
        <View className="px-6 mb-6">
          <View className="bg-white rounded-xl p-4 shadow-sm">
            <View className="flex-row items-center justify-between mb-4">
              <Text className="text-normal-text text-xl font-semibold">
                Change Password
              </Text>
              {!isChangingPassword && (
                <TouchableOpacity
                  onPress={() => setIsChangingPassword(true)}
                  className="flex-row items-center"
                >
                  <Entypo name="lock" size={18} color="#7C3AED" />
                  <Text className="text-primary text-base font-medium ml-1">
                    Change
                  </Text>
                </TouchableOpacity>
              )}
            </View>

            {isChangingPassword ? (
           <ChangePassword  isChangingPassword={isChangingPassword} setIsChangingPassword={setIsChangingPassword}/>
            ) : (
              <Text className="text-secondary-text text-sm">
                Click &quot;Change&quot; to update your password
              </Text>
            )}
          </View>
        </View>

        {/* Orders Section */}
        <View className="px-6 mb-6">
          <View className="bg-white rounded-xl p-4 shadow-sm">
            <TouchableOpacity
              onPress={() => navigation.navigate("OrderList")}
              className="flex-row items-center justify-between"
              activeOpacity={0.7}
            >
              <View className="flex-row items-center flex-1">
                <View className="w-10 h-10 rounded-full bg-primary/10 items-center justify-center mr-3">
                  <Entypo name="box" size={20} color="#7C3AED" />
                </View>
                <View className="flex-1">
                  <Text className="text-normal-text text-base font-semibold">
                    My Orders
                  </Text>
                  <Text className="text-secondary-text text-sm">
                    View and track your orders
                  </Text>
                </View>
              </View>
              <Entypo name="chevron-right" size={20} color="#6B7280" />
            </TouchableOpacity>
          </View>
        </View>

        <View className="px-6 mb-6">
          <View className="bg-white rounded-xl p-4 shadow-sm">
            <TouchableOpacity
              onPress={() => navigation.navigate("DeliveryAddress")}
              className="flex-row items-center justify-between"
              activeOpacity={0.7}
            >
              <View className="flex-row items-center flex-1">
                <View className="w-10 h-10 rounded-full bg-primary/10 items-center justify-center mr-3">
                  <Entypo name="location" size={20} color="#7C3AED" />
                </View>
                <View className="flex-1">
                  <Text className="text-normal-text text-base font-semibold">
                    Delivery Address
                  </Text>
                  <Text className="text-secondary-text text-sm">
                    Manage your delivery addresses
                  </Text>
                </View>
              </View>
              <Entypo name="chevron-right" size={20} color="#6B7280" />
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
    </KeyboardAvoidingView>
  );
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
    paddingVertical: 16,
    paddingHorizontal: 32,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 12,
  },
});

