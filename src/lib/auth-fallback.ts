import API from "./axios-client";

// Fallback authentication strategy for production cookie issues
export const attemptAuthRecovery = async () => {
  if (!import.meta.env.PROD) return false;
  
  console.log('🔄 Attempting authentication recovery...');
  
  try {
    // Try to make a direct request to check if cookies are working
    const response = await fetch(import.meta.env.VITE_API_BASE_URL + '/user/current', {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
    });
    
    if (response.ok) {
      console.log('✅ Authentication recovery successful via direct fetch');
      return true;
    }
    
    if (response.status === 401) {
      console.log('❌ Authentication recovery failed - no valid session');
      return false;
    }
    
  } catch (error) {
    console.error('❌ Authentication recovery error:', error);
  }
  
  return false;
};

// Enhanced axios configuration with retry logic
export const createRobustAPI = () => {
  // Add retry interceptor for 401 errors in production
  API.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalRequest = error.config;
      
      // If it's a 401 and we haven't already retried
      if (error.response?.status === 401 && !originalRequest._retry && import.meta.env.PROD) {
        originalRequest._retry = true;
        
        console.log('🔄 401 detected, attempting recovery...');
        
        // Try the fallback authentication
        const recovered = await attemptAuthRecovery();
        
        if (recovered) {
          console.log('✅ Retrying original request after recovery');
          return API(originalRequest);
        }
      }
      
      return Promise.reject(error);
    }
  );
  
  return API;
};

// Function to check cookie domain and suggest fixes
export const diagnoseCookieIssues = () => {
  if (!import.meta.env.PROD) return;
  
  console.log('🏥 Diagnosing cookie issues...');
  
  const apiUrl = new URL(import.meta.env.VITE_API_BASE_URL);
  const currentUrl = new URL(window.location.href);
  
  console.log('🔍 Domain Analysis:');
  console.log('  Frontend domain:', currentUrl.hostname);
  console.log('  API domain:', apiUrl.hostname);
  console.log('  Same domain:', currentUrl.hostname === apiUrl.hostname);
  console.log('  Same origin:', currentUrl.origin === apiUrl.origin);
  
  // Check if it's a subdomain issue
  const frontendParts = currentUrl.hostname.split('.');
  const apiParts = apiUrl.hostname.split('.');
  
  if (frontendParts.length >= 2 && apiParts.length >= 2) {
    const frontendRoot = frontendParts.slice(-2).join('.');
    const apiRoot = apiParts.slice(-2).join('.');
    console.log('  Same root domain:', frontendRoot === apiRoot);
    
    if (frontendRoot === apiRoot) {
      console.log('💡 Suggestion: Cookies should work with proper domain configuration');
      console.log(`   Backend should set cookies with domain=.${frontendRoot}`);
    }
  }
  
  // Protocol check
  if (currentUrl.protocol === 'https:' && apiUrl.protocol === 'https:') {
    console.log('✅ Both frontend and API are using HTTPS');
  } else {
    console.log('⚠️  Protocol mismatch or insecure connection detected');
    console.log('   Frontend:', currentUrl.protocol);
    console.log('   API:', apiUrl.protocol);
  }
};