import { CustomError } from "@/types/custom-error.type";
import axios from "axios";

const baseURL = import.meta.env.VITE_API_BASE_URL;

const options = {
  baseURL,
  withCredentials: true,
  timeout: 10000,
};

const API = axios.create(options);

// Add request interceptor for debugging and token handling
API.interceptors.request.use((config) => {
  // Debug logging only in production
  if (import.meta.env.PROD) {
    console.log(`🔗 API Request: ${config.method?.toUpperCase()} ${config.baseURL}${config.url}`);
    console.log('📍 Origin:', window.location.origin);
    console.log('🍪 Document cookies:', document.cookie ? 'Present' : 'None');
    console.log('⚙️ withCredentials:', config.withCredentials);
    
    // Log specific cookies for debugging
    const cookies = document.cookie.split(';').reduce((acc, cookie) => {
      const [name, value] = cookie.trim().split('=');
      acc[name] = value;
      return acc;
    }, {} as Record<string, string>);
    console.log('🍪 Available cookies:', Object.keys(cookies));
  }
  
  return config;
}, (error) => {
  return Promise.reject(error);
});

API.interceptors.response.use(
  (response) => {
    // Log successful auth responses in production for debugging
    if (import.meta.env.PROD && response.config.url?.includes('/user/current')) {
      console.log('✅ /user/current succeeded:', response.status);
    }
    return response;
  },
  async (error) => {
    const { data, status } = error.response || {};

    // Enhanced logging for 401 errors in production
    if (import.meta.env.PROD && status === 401) {
      console.error('❌ 401 Error Details:');
      console.error('URL:', error.config?.url);
      console.error('Method:', error.config?.method);
      console.error('withCredentials:', error.config?.withCredentials);
      console.error('Headers:', error.config?.headers);
      console.error('Cookies at time of error:', document.cookie ? 'Present' : 'None');
    }

    // Only redirect on 401 if we're not already on an auth page
    if (status === 401) {
      const currentPath = window.location.pathname;
      const authPages = ["/sign-in", "/sign-up", "/", "/auth/google/callback/success", "/auth/google/callback/failure"];
      const isAuthPage = authPages.includes(currentPath);
      
      // Only redirect if not already on an auth page to prevent infinite loops
      if (!isAuthPage) {
        if (import.meta.env.PROD) {
          console.log('🔄 Redirecting to / due to 401 error');
        }
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
