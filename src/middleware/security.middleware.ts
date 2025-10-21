import { SecurityUtils, SECURITY_CONFIG } from '@/config/security.config';

// Security middleware for runtime protection
export class SecurityMiddleware {
  private static instance: SecurityMiddleware;
  private sessionTimer: NodeJS.Timeout | null = null;

  private constructor() {
    this.initializeSecurityMonitoring();
  }

  public static getInstance(): SecurityMiddleware {
    if (!SecurityMiddleware.instance) {
      SecurityMiddleware.instance = new SecurityMiddleware();
    }
    return SecurityMiddleware.instance;
  }

  // Initialize security monitoring
  private initializeSecurityMonitoring(): void {
    // Monitor storage events for security violations
    window.addEventListener('storage', this.handleStorageEvent.bind(this));
    
    // Monitor visibility changes for security
    document.addEventListener('visibilitychange', this.handleVisibilityChange.bind(this));
    
    // Monitor for potential XSS attempts
    this.setupXSSProtection();
    
    // Set up session timeout monitoring
    this.initializeSessionTimeout();
  }

  // Handle storage events to detect tampering
  private handleStorageEvent(event: StorageEvent): void {
    if (event.key && SecurityUtils.isSensitiveKey(event.key)) {
      console.warn('🔒 Sensitive data storage detected and blocked:', event.key);
      
      // Remove the sensitive data
      if (event.storageArea === localStorage) {
        localStorage.removeItem(event.key);
      }
    }
  }

  // Handle visibility changes for security
  private handleVisibilityChange(): void {
    if (document.hidden) {
      // Start inactivity timer when tab becomes hidden
      this.startInactivityTimer();
    } else {
      // Clear timer when tab becomes visible
      this.clearInactivityTimer();
    }
  }

  // Set up XSS protection
  private setupXSSProtection(): void {
    // Monitor for suspicious script injections
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === 'childList') {
          mutation.addedNodes.forEach((node) => {
            if (node.nodeType === Node.ELEMENT_NODE) {
              const element = node as Element;
              if (element.tagName === 'SCRIPT' && !element.hasAttribute('data-safe')) {
                console.warn('🔒 Suspicious script injection detected');
                element.remove();
              }
            }
          });
        }
      });
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });
  }

  // Initialize session timeout
  private initializeSessionTimeout(): void {
    this.resetSessionTimeout();
    
    // Reset timeout on user activity
    const resetEvents = ['mousedown', 'keypress', 'scroll', 'touchstart'];
    resetEvents.forEach(event => {
      document.addEventListener(event, this.resetSessionTimeout.bind(this), true);
    });
  }

  // Reset session timeout
  private resetSessionTimeout(): void {
    this.clearSessionTimeout();
    
    this.sessionTimer = setTimeout(() => {
      this.handleSessionTimeout();
    }, SECURITY_CONFIG.SESSION.TIMEOUT);
  }

  // Clear session timeout
  private clearSessionTimeout(): void {
    if (this.sessionTimer) {
      clearTimeout(this.sessionTimer);
      this.sessionTimer = null;
    }
  }

  // Handle session timeout
  private handleSessionTimeout(): void {
    console.warn('🔒 Session timeout - logging out for security');
    
    // Clear all sensitive data
    SecurityUtils.secureStore.clear();
    localStorage.clear();
    
    // Redirect to login
    window.location.href = '/sign-in';
  }

  // Start inactivity timer
  private startInactivityTimer(): void {
    // Additional security when tab is hidden
    setTimeout(() => {
      if (document.hidden) {
        this.handleSessionTimeout();
      }
    }, SECURITY_CONFIG.SESSION.TIMEOUT / 2); // Half the normal timeout
  }

  // Clear inactivity timer
  private clearInactivityTimer(): void {
    // Reset normal session timeout when tab becomes visible
    this.resetSessionTimeout();
  }

  // Validate request security
  public validateRequest(url: string, options: RequestInit = {}): boolean {
    // Check if request is to a safe domain
    try {
      const requestUrl = new URL(url, window.location.origin);
      
      // Only allow same-origin requests and specific trusted domains
      if (requestUrl.origin !== window.location.origin) {
        console.warn('🔒 Cross-origin request blocked:', url);
        return false;
      }
      
      // Validate headers
      const headers = options.headers as Record<string, string> || {};
      
      // Skip adding security headers due to CORS restrictions
      // Backend should handle security headers
      
      return true;
    } catch (error) {
      console.error('🔒 Invalid request URL:', url);
      return false;
    }
  }

  // Clean up security monitoring
  public destroy(): void {
    window.removeEventListener('storage', this.handleStorageEvent);
    document.removeEventListener('visibilitychange', this.handleVisibilityChange);
    this.clearSessionTimeout();
  }
}

// Initialize security middleware
export const securityMiddleware = SecurityMiddleware.getInstance();