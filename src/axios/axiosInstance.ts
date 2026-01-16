import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

// ⚠️ localhost RN me kaam nahi karta (explained below)
// const BASE_URL = "http://10.0.2.2:3000"; // Android emulator
// const BASE_URL = "http://192.168.0.123:3000";
const BASE_URL = "http://43.204.250.254:4001"; // real device

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 20000,
});

/**
 * Request Interceptor
 */
axiosInstance.interceptors.request.use(

  async (config) => {
    const fullUrl =
  (config.baseURL ? config.baseURL.replace(/\/$/, "") : "") +
  (config.url?.startsWith("/") ? config.url : `/${config.url}`);

    console.log("➡️", config.method?.toUpperCase(), fullUrl, config.data);
    const token = await AsyncStorage.getItem("token");

    if (token) {
      config.headers.Authorization = token;
    }
    console.log("token", token);
    return config;
  },
  (error) => Promise.reject(error)
);

/**
 * Response Interceptor
 */
axiosInstance.interceptors.response.use(
  (response) => {
    console.log("✅", response?.status, response?.data);
    return response;
  },
  async (error) => {
    const { response } = error;
    console.log("❌", response?.status, response?.data);
    if (response?.status === 401) {
      await AsyncStorage.clear();

      // 🔥 RN me window.location nahi hota
      // Navigation yahan handle karna padega
      // example: navigation.reset(...)
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
