import "./global.css"
import { SafeAreaProvider } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import AppNavigation from "./src/navigation/AppNevigation";
import Toast from 'react-native-toast-message';
import { MenuProvider } from "./src/context/MenuContext";
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from '@tanstack/react-query'

const queryClient = new QueryClient()




export default function App() {
  return (
    <SafeAreaProvider>
        <QueryClientProvider client={queryClient}>

      <MenuProvider>
        <StatusBar style="auto" />
        <AppNavigation />
        
        <Toast />
      </MenuProvider>
        </QueryClientProvider>
    </SafeAreaProvider>
  );
}