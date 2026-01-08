import "./global.css"
import { SafeAreaProvider } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import AppNavigation from "./src/navigation/AppNevigation";
import Toast from 'react-native-toast-message';
import { MenuProvider } from "./src/context/MenuContext";




export default function App() {
  return (
    <SafeAreaProvider>
      <MenuProvider>
        <StatusBar style="auto" />
        <AppNavigation />
        
        <Toast />
      </MenuProvider>
    </SafeAreaProvider>
  );
}