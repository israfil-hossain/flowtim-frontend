// Security Configuration for FlowTim Frontend

export const SECURITY_CONFIG = {
  // Token storage configuration
  TOKEN_STORAGE: {
    // Use sessionStorage as fallback only - primary auth via httpOnly cookies
    USE_SESSION_STORAGE: true,
    USE_LOCAL_STORAGE: false,
    ACCESS_TOKEN_KEY: 'flowtim_access_token',
    REFRESH_TOKEN_KEY: 'flowtim_refresh_token',
  },

  // Cookie security settings (for backend reference)
  COOKIE_SETTINGS: {
    HTTP_ONLY: true,
    SECURE: true, // Only over HTTPS
    SAME_SITE: 'strict' as const,
    MAX_AGE: 24 * 60 * 60 * 1000, // 24 hours
  },

  // API security headers (only use headers that backend supports)
  API_HEADERS: {
    // Note: X-Requested-With removed due to CORS restrictions
    // Backend should handle X-Frame-Options and X-Content-Type-Options
  },

  // Content Security Policy (for index.html)
  CSP: {
    DEFAULT_SRC: ["'self'"],
    SCRIPT_SRC: ["'self'", "'unsafe-inline'"],
    STYLE_SRC: ["'self'", "'unsafe-inline'"],
    IMG_SRC: ["'self'", "data:", "https:"],
    CONNECT_SRC: ["'self'"],
    FONT_SRC: ["'self'"],
    OBJECT_SRC: ["'none'"],
    MEDIA_SRC: ["'self'"],
    FRAME_SRC: ["'none'"],
  },

  // Session management
  SESSION: {
    TIMEOUT: 30 * 60 * 1000, // 30 minutes
    WARNING_TIME: 5 * 60 * 1000, // 5 minutes before timeout
    AUTO_REFRESH: true,
  },

  // Sensitive data handling
  SENSITIVE_DATA: {
    // Never store these in localStorage/sessionStorage
    BLACKLISTED_KEYS: [
      'password',
      'token',
      'secret',
      'key',
      'auth',
      'session',
      'credential',
    ],
  },

  // Environment-specific settings
  ENVIRONMENT: {
    DEVELOPMENT: {
      LOG_REQUESTS: true,
      ALLOW_HTTP: true,
    },
    PRODUCTION: {
      LOG_REQUESTS: false,
      ALLOW_HTTP: false,
      REQUIRE_HTTPS: true,
    },
  },
} as const;

// Security utility functions
export const SecurityUtils = {
  // Check if a key contains sensitive data
  isSensitiveKey(key: string): boolean {
    return SECURITY_CONFIG.SENSITIVE_DATA.BLACKLISTED_KEYS.some(
      (sensitiveKey) => key.toLowerCase().includes(sensitiveKey.toLowerCase())
    );
  },

  // Secure storage wrapper
  secureStore: {
    set(key: string, value: string): void {
      if (SecurityUtils.isSensitiveKey(key)) {
        console.warn(`⚠️ Attempted to store sensitive data with key: ${key}`);
        return;
      }
      sessionStorage.setItem(key, value);
    },

    get(key: string): string | null {
      return sessionStorage.getItem(key);
    },

    remove(key: string): void {
      sessionStorage.removeItem(key);
    },

    clear(): void {
      sessionStorage.clear();
    },
  },

  // Generate secure headers for API requests
  getSecureHeaders(): Record<string, string> {
    return SECURITY_CONFIG.API_HEADERS;
  },

  // Check if current environment is secure
  isSecureEnvironment(): boolean {
    return (
      window.location.protocol === 'https:' ||
      window.location.hostname === 'localhost' ||
      window.location.hostname === '127.0.0.1'
    );
  },

  // Validate session integrity
  validateSession(): boolean {
    // Check if we're in a secure context
    if (!SecurityUtils.isSecureEnvironment() && import.meta.env.PROD) {
      console.error('🔒 Application must be served over HTTPS in production');
      return false;
    }

    return true;
  },
};