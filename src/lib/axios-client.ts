import { CustomError } from "@/types/custom-error.type";
import axios from "axios";

const baseURL = import.meta.env.VITE_API_BASE_URL;

const options = {
  baseURL,
  withCredentials: true,
  timeout: 10000,
};

const API = axios.create(options);

// Add request interceptor to debug cookie issues in production
if (import.meta.env.PROD) {
  API.interceptors.request.use((config) => {
    console.log(`🔗 API Request: ${config.method?.toUpperCase()} ${config.baseURL}${config.url}`);
    console.log('📍 Origin:', window.location.origin);
    console.log('🍪 Document cookies:', document.cookie ? 'Present' : 'None');
    console.log('⚙️ withCredentials:', config.withCredentials);
    return config;
  });
}

API.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const { data, status } = error.response || {};

    // Only redirect on 401 if we're not already on an auth page
    if (status === 401) {
      const currentPath = window.location.pathname;
      const authPages = ["/sign-in", "/sign-up", "/", "/auth/google/callback/success", "/auth/google/callback/failure"];
      const isAuthPage = authPages.includes(currentPath);
      
      // Only redirect if not already on an auth page to prevent infinite loops
      if (!isAuthPage) {
        window.location.href = "/";
      }
    }

    const customError: CustomError = {
      ...error,
      errorCode: data?.errorCode || "UNKNOWN_ERROR",
    };

    return Promise.reject(customError);
  }
);

export default API;
