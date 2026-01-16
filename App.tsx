import "./global.css"
import { SafeAreaProvider } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import AppNavigation from "./src/navigation/AppNevigation";
import Toast from 'react-native-toast-message';
import { UserProvider } from "./src/context/UserContext";
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

        <UserProvider>
        <StatusBar style="auto" />
        <AppNavigation />
        
        <Toast />
      </UserProvider>
        </QueryClientProvider>
    </SafeAreaProvider>
  );
}