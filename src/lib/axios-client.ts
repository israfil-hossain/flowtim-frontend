import { CustomError } from "@/types/custom-error.type";
import axios from "axios";
import { authService } from "@/services/auth.service";

const baseURL = import.meta.env.VITE_API_BASE_URL;

const options = {
  baseURL,
  withCredentials: true,
  timeout: 10000,
};

const API = axios.create(options);

// Add request interceptor for security headers and token handling
API.interceptors.request.use((config) => {
  // Primary authentication via cookies, fallback to sessionStorage token
  const accessToken = authService.getAccessToken();
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }

  // Security headers removed due to CORS restrictions
  // Backend should handle security headers
  
  // Debug logging only in production for security monitoring
  if (import.meta.env.PROD) {
    console.log(`🔗 API Request: ${config.method?.toUpperCase()} ${config.baseURL}${config.url}`);
    console.log('📍 Origin:', window.location.origin);
    console.log('🍪 Cookies available:', document.cookie ? 'Yes' : 'No');
    console.log('🔑 Session token:', accessToken ? 'Present' : 'None');
    console.log('⚙️ withCredentials:', config.withCredentials);
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
    const originalRequest = error.config;
    const { data, status } = error.response || {};

    // Enhanced logging for 401 errors in production
    if (import.meta.env.PROD && status === 401) {
      console.error('❌ 401 Error Details:');
      console.error('URL:', originalRequest?.url);
      console.error('Method:', originalRequest?.method);
      console.error('withCredentials:', originalRequest?.withCredentials);
      console.error('Headers:', originalRequest?.headers);
      console.error('Cookies at time of error:', document.cookie ? 'Present' : 'None');
    }

    // Robust 401 recovery 
    if (status === 401 && !originalRequest?._retry) {
      originalRequest._retry = true;
      
      console.log('🔄 401 detected, attempting token refresh...');
      
      try {
        await authService.refreshToken();
        const newToken = authService.getAccessToken();
        
        if (newToken) {
          originalRequest.headers.Authorization = `Bearer ${newToken}`;
          console.log('✅ Retrying original request with new token');
          return API(originalRequest);
        }
      } catch (recoveryError) {
        console.error('❌ Token refresh failed:', recoveryError);
        authService.clearTokens();
      }
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