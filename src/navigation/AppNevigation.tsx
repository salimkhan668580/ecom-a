import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LandingPage from "../components/auth/LandingPage";
import LoginPage from "../components/auth/LoginPage";
import RegisterPage from "../components/auth/RegisterPage";
import RegisterSecond from "../components/auth/RegisterSecond";
import TabNavigator from "./MainTabs";
import OrderList from "../components/profile/Order/OrderList";
import OrderDetails from "../components/profile/Order/OrderDetails";
import ProductDetails from "../components/Home/product/ProductDetails";
import Wishlist from "../components/Wishlist/Wishlist";
import AboutUs from "../components/aboutUs/AboutUs";
import HelpSupport from "../components/HelpSupport/HelpSupport";

export type RootStackParamList = {
  Landing: undefined;
  Login: undefined;
  Register: undefined;
  RegisterSecond: undefined;
  MainTabs: undefined;
  OrderList: undefined;
  OrderDetails: { orderId: string };
  ProductDetails: { productId: string };
  Wishlist: undefined;
  AboutUs: undefined;
  HelpSupport: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function AppNavigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        id="RootStack"
        initialRouteName="Landing"
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="Landing" component={LandingPage} />
        <Stack.Screen name="Login" component={LoginPage} />
        <Stack.Screen name="Register" component={RegisterPage} />
        <Stack.Screen name="RegisterSecond" component={RegisterSecond} />
        <Stack.Screen name="MainTabs" component={TabNavigator} options={{ headerShown: false }} />
        <Stack.Screen name="OrderList" component={OrderList} />
        <Stack.Screen name="OrderDetails" component={OrderDetails} />
        <Stack.Screen name="ProductDetails" component={ProductDetails} /> 
        <Stack.Screen name="Wishlist" component={Wishlist} />
        <Stack.Screen name="AboutUs" component={AboutUs} />
        <Stack.Screen name="HelpSupport" component={HelpSupport} />
        </Stack.Navigator>
    </NavigationContainer>
  );
}


