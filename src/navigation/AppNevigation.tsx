import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LandingPage from "../components/auth/LandingPage";
import LoginPage from "../components/auth/LoginPage";
import RegisterPage from "../components/auth/RegisterPage";
import RegisterSecond from "../components/auth/RegisterSecond";
import ForgetPassword from "../components/auth/ForgetPassword";
import TabNavigator, { TabParamList } from "./MainTabs";
import OrderList from "../Order/OrderList";
import OrderDetails from "../Order/OrderDetails";
import ProductDetails from "../components/Home/product/ProductDetails";
import Wishlist from "../components/Wishlist/Wishlist";
import AboutUs from "../components/aboutUs/AboutUs";
import HelpSupport from "../components/HelpSupport/HelpSupport";
import PaymentSuccess from "../components/Payment/PaymentSuccess";
import RewardCoupon from "../components/RewardCoupon/RewardCoupon";
import DeliveryAddress from "../components/deliveryAddress/DeliveryAddress";
import TermsAndConditions from "../components/settings/termAndCondation";
import PrivacyPolicy from "../components/settings/PrivacyPolicy";
import { CreateUserData } from "../schema/AuthSchema";

export type RootStackParamList = {
  Landing: undefined;
  Login: undefined;
  Register: undefined;
  RegisterSecond: { values: CreateUserData };
  ForgetPassword: undefined;
  MainTabs: { screen?: keyof TabParamList } | undefined;
  OrderList: undefined;
  OrderDetails: { orderId: string };
  ProductDetails: { productId: string };
  Wishlist: undefined;
  AboutUs: undefined;
  HelpSupport: undefined;
  PaymentSuccess: undefined;
  RewardCoupon: undefined;
  DeliveryAddress: undefined;
  TermsAndConditions: undefined;
  PrivacyPolicy: undefined;
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
        <Stack.Screen name="ForgetPassword" component={ForgetPassword} />
        <Stack.Screen name="MainTabs" component={TabNavigator} options={{ headerShown: false }} />
        <Stack.Screen name="OrderList" component={OrderList} />
        <Stack.Screen name="OrderDetails" component={OrderDetails} />
        <Stack.Screen name="DeliveryAddress" component={DeliveryAddress} />
        <Stack.Screen name="ProductDetails" component={ProductDetails} /> 
        <Stack.Screen name="Wishlist" component={Wishlist} />
        <Stack.Screen name="AboutUs" component={AboutUs} />
        <Stack.Screen name="HelpSupport" component={HelpSupport} />
        <Stack.Screen name="PaymentSuccess" component={PaymentSuccess} />
        <Stack.Screen name="RewardCoupon" component={RewardCoupon} />
        <Stack.Screen name="TermsAndConditions" component={TermsAndConditions} />
        <Stack.Screen name="PrivacyPolicy" component={PrivacyPolicy} />
        </Stack.Navigator>
    </NavigationContainer>
  );
}


