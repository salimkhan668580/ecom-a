import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Entypo,FontAwesome6 } from "@expo/vector-icons";
import HomeScreen from "../components/Home/HomeScreen";
import SettingsScreen from "../components/settings/SettingsScreen";
import ProfileScreen from "../components/profile/ProfileScreen";
import CartScreen from "../components/cart/CartScreen";
export type TabParamList = {
  Home: undefined;
  Settings: undefined;
  Profile: undefined;
  Cart: undefined;
};

const Tab = createBottomTabNavigator<TabParamList>();

export default function TabNavigator() {
  return (
    <Tab.Navigator
      id="MainTabs"
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "#7C3AED",
        tabBarInactiveTintColor: "#6B7280",
        tabBarStyle: {
          backgroundColor: "#FFFFFF",
          borderTopWidth: 1,
          borderTopColor: "#E5E7EB",
          paddingTop: 5,
          paddingBottom: 5,
          height: 60,
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Entypo name="home" size={size} color={color} />
          ),
        }}
      />
      
      <Tab.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Entypo name="cog" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Entypo name="user" size={size} color={color} />
          ),
        }}
      />
   

       <Tab.Screen
        name="Cart"
        component={CartScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <FontAwesome6 name="cart-shopping" size={24} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}