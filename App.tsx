import "./global.css"
import { SafeAreaProvider } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import AppNavigation from "./src/navigation/AppNevigation";
import Toast from 'react-native-toast-message';




export default function App() {
  return (
    <SafeAreaProvider>
      <StatusBar style="auto" />
      <AppNavigation />
      
      <Toast />
    </SafeAreaProvider>
  );
}