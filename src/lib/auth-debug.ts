// Debug utility for authentication issues in production
export const debugAuthenticationIssues = () => {
  if (import.meta.env.PROD) {
    console.log('🔍 Authentication Debug Information:');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    
    // Environment info
    console.log('🌍 Environment:');
    console.log('  API Base URL:', import.meta.env.VITE_API_BASE_URL);
    console.log('  Origin:', window.location.origin);
    console.log('  Protocol:', window.location.protocol);
    console.log('  Hostname:', window.location.hostname);
    
    // Cookie info
    console.log('🍪 Cookies:');
    if (document.cookie) {
      const cookies = document.cookie.split(';').reduce((acc, cookie) => {
        const [name, value] = cookie.trim().split('=');
        acc[name] = value;
        return acc;
      }, {} as Record<string, string>);
      console.log('  Available cookies:', Object.keys(cookies));
      console.log('  Full cookie string:', document.cookie);
    } else {
      console.log('  No cookies found');
    }
    
    // Browser info
    console.log('🌐 Browser:');
    console.log('  User Agent:', navigator.userAgent);
    console.log('  Cookie Enabled:', navigator.cookieEnabled);
    
    // Security context
    console.log('🔒 Security:');
    console.log('  Is Secure Context:', window.isSecureContext);
    console.log('  HTTPS:', window.location.protocol === 'https:');
    
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  }
};

// Function to test API connectivity
export const testAPIConnectivity = async () => {
  if (import.meta.env.PROD) {
    try {
      console.log('🧪 Testing API connectivity...');
      const response = await fetch(import.meta.env.VITE_API_BASE_URL + '/user/current', {
        method: 'GET',
        credentials: 'include', // This is equivalent to withCredentials: true
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      console.log('📡 Raw fetch response status:', response.status);
      console.log('📡 Response headers:', Object.fromEntries(response.headers.entries()));
      
      if (response.status === 401) {
        console.log('❌ 401 Unauthorized - Cookie authentication failed');
      } else if (response.status === 200) {
        console.log('✅ 200 OK - Authentication successful');
      } else {
        console.log(`⚠️  Unexpected status: ${response.status}`);
      }
      
    } catch (error) {
      console.error('❌ API connectivity test failed:', error);
    }
  }
};

// Call this function when the app starts to debug auth issues
export const initAuthDebug = () => {
  if (import.meta.env.PROD) {
    debugAuthenticationIssues();
    
    // Import and run cookie diagnosis
    import('./auth-fallback').then(({ diagnoseCookieIssues }) => {
      diagnoseCookieIssues();
    });
    
    // Test API connectivity after a short delay to ensure app is initialized
    setTimeout(() => {
      testAPIConnectivity();
    }, 1000);
  }
};