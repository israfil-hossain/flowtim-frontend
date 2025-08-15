// Google Analytics configuration and utilities

declare global {
  interface Window {
    gtag: (...args: any[]) => void;
    dataLayer: any[];
  }
}

// Google Analytics Measurement ID
export const GA_MEASUREMENT_ID = import.meta.env.VITE_GA_MEASUREMENT_ID;

// Initialize Google Analytics
export const initGA = () => {
  if (!GA_MEASUREMENT_ID) {
    console.warn('Google Analytics Measurement ID not found');
    return;
  }

  // Create script tag for Google Analytics
  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
  document.head.appendChild(script);

  // Initialize dataLayer and gtag
  window.dataLayer = window.dataLayer || [];
  window.gtag = function gtag() {
    window.dataLayer.push(arguments);
  };

  // Configure Google Analytics
  window.gtag('js', new Date());
  window.gtag('config', GA_MEASUREMENT_ID, {
    page_title: document.title,
    page_location: window.location.href,
  });
};

// Track page views
export const trackPageView = (url: string, title?: string) => {
  if (!GA_MEASUREMENT_ID || !window.gtag) return;

  window.gtag('config', GA_MEASUREMENT_ID, {
    page_path: url,
    page_title: title || document.title,
  });
};

// Track custom events
export const trackEvent = (
  action: string,
  category: string,
  label?: string,
  value?: number
) => {
  if (!GA_MEASUREMENT_ID || !window.gtag) return;

  window.gtag('event', action, {
    event_category: category,
    event_label: label,
    value: value,
  });
};

// Track user authentication events
export const trackAuth = (action: 'login' | 'signup' | 'logout', method?: string) => {
  trackEvent(action, 'authentication', method);
};

// Track workspace events
export const trackWorkspace = (
  action: 'create' | 'join' | 'leave' | 'invite',
  workspaceId?: string
) => {
  trackEvent(action, 'workspace', workspaceId);
};

// Track project events
export const trackProject = (
  action: 'create' | 'edit' | 'delete' | 'view',
  projectId?: string
) => {
  trackEvent(action, 'project', projectId);
};

// Track task events
export const trackTask = (
  action: 'create' | 'edit' | 'delete' | 'complete' | 'assign',
  taskId?: string
) => {
  trackEvent(action, 'task', taskId);
};

// Track user engagement
export const trackEngagement = (action: string, details?: string) => {
  trackEvent(action, 'engagement', details);
};

// Track errors
export const trackError = (error: string, page?: string) => {
  trackEvent('error', 'application', `${page}: ${error}`);
};

// Track performance metrics
export const trackTiming = (
  name: string,
  value: number,
  category: string = 'performance'
) => {
  if (!GA_MEASUREMENT_ID || !window.gtag) return;

  window.gtag('event', 'timing_complete', {
    name: name,
    value: value,
    event_category: category,
  });
};

// Track conversions (e.g., successful workspace creation)
export const trackConversion = (conversionName: string, value?: number) => {
  if (!GA_MEASUREMENT_ID || !window.gtag) return;

  window.gtag('event', 'conversion', {
    send_to: GA_MEASUREMENT_ID,
    event_category: 'conversion',
    event_label: conversionName,
    value: value,
  });
};
