import { SecurityUtils, SECURITY_CONFIG } from '@/config/security.config';

class AuthService {
  private baseURL = '/api/auth';
  private readonly ACCESS_TOKEN_KEY = SECURITY_CONFIG.TOKEN_STORAGE.ACCESS_TOKEN_KEY;
  private readonly REFRESH_TOKEN_KEY = SECURITY_CONFIG.TOKEN_STORAGE.REFRESH_TOKEN_KEY;

  async login(email: string, password: string) {
    const requestOptions: RequestInit = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({ email, password }),
    };

    const response = await fetch(`${this.baseURL}/login`, requestOptions);

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Login failed');
    }

    const data = await response.json();

    // Only store access token in sessionStorage as a fallback
    // Primary authentication should use httpOnly cookies
    if (data.tokens?.accessToken) {
      SecurityUtils.secureStore.set(this.ACCESS_TOKEN_KEY, data.tokens.accessToken);
    }

    return data;
  }

  async refreshToken() {
    const response = await fetch(`${this.baseURL}/refresh`, {
      method: 'POST',
      credentials: 'include',
    });

    if (!response.ok) {
      this.clearTokens();
      throw new Error('Token refresh failed');
    }

    const data = await response.json();

    // Only store access token in sessionStorage as a fallback
    if (data.tokens?.accessToken) {
      SecurityUtils.secureStore.set(this.ACCESS_TOKEN_KEY, data.tokens.accessToken);
    }

    return data;
  }

  async logout() {
    try {
      await fetch(`${this.baseURL}/logout`, {
        method: 'POST',
        credentials: 'include',
      });
    } catch (error) {
      console.error('Logout request failed:', error);
    }

    this.clearTokens();
  }

  async validateSession() {
    // Use the existing /user/current endpoint for session validation
    const response = await fetch('/api/user/current', {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      this.clearTokens();
      throw new Error('Session validation failed');
    }

    return response.json();
  }

  getAccessToken() {
    // Only use sessionStorage as fallback - cookies are primary
    return SecurityUtils.secureStore.get(this.ACCESS_TOKEN_KEY);
  }

  clearTokens() {
    SecurityUtils.secureStore.remove(this.ACCESS_TOKEN_KEY);
    SecurityUtils.secureStore.remove(this.REFRESH_TOKEN_KEY);
  }

  // Check if user has valid session (either cookie or token)
  hasValidSession(): boolean {
    // Check if we have a session token or if cookies might be present
    const hasSessionToken = !!this.getAccessToken();
    const hasCookies = document.cookie.includes('refreshToken') || document.cookie.includes('accessToken');
    return hasSessionToken || hasCookies;
  }
}

export const authService = new AuthService();