import "./global.css"
import { SafeAreaProvider } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import AppNavigation from "./src/navigation/AppNevigation";

export default function App() {
  return (
    <SafeAreaProvider>
      <StatusBar style="auto" />
      <AppNavigation />
    </SafeAreaProvider>
  );
}