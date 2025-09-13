import { useEffect } from 'react';

export const usePerformanceMonitor = () => {
  useEffect(() => {
    // Monitor Core Web Vitals
    if ('PerformanceObserver' in window) {
      // Largest Contentful Paint (LCP)
      const lcpObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        const lastEntry = entries[entries.length - 1] as any;
        console.log('LCP:', lastEntry.startTime);
      });
      lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });

      // First Input Delay (FID)
      const fidObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        entries.forEach((entry: any) => {
          console.log('FID:', entry.processingStart - entry.startTime);
        });
      });
      fidObserver.observe({ entryTypes: ['first-input'] });

      // Cumulative Layout Shift (CLS)
      const clsObserver = new PerformanceObserver((list) => {
        let clsValue = 0;
        const entries = list.getEntries();
        entries.forEach((entry: any) => {
          if (!entry.hadRecentInput) {
            clsValue += entry.value;
          }
        });
        console.log('CLS:', clsValue);
      });
      clsObserver.observe({ entryTypes: ['layout-shift'] });

      // Resource loading performance
      const resourceObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        entries.forEach((entry) => {
          if (entry.duration > 1000) { // Log slow resources (>1s)
            console.warn('Slow resource:', entry.name, entry.duration);
          }
        });
      });
      resourceObserver.observe({ entryTypes: ['resource'] });

      // Cleanup observers
      return () => {
        lcpObserver.disconnect();
        fidObserver.disconnect();
        clsObserver.disconnect();
        resourceObserver.disconnect();
      };
    }
  }, []);

  useEffect(() => {
    // Preload critical resources on hover
    const preloadOnHover = () => {
      const criticalLinks = document.querySelectorAll('a[href^="/sign-"]');
      criticalLinks.forEach((link) => {
        link.addEventListener('mouseenter', () => {
          const href = link.getAttribute('href');
          if (href) {
            const linkElement = document.createElement('link');
            linkElement.rel = 'prefetch';
            linkElement.href = href;
            document.head.appendChild(linkElement);
          }
        });
      });
    };

    preloadOnHover();
  }, []);
};

// Performance utility functions
export const measurePerformance = {
  // Measure component render time
  startRender: (componentName: string) => {
    performance.mark(`${componentName}-start`);
  },
  
  endRender: (componentName: string) => {
    performance.mark(`${componentName}-end`);
    performance.measure(
      `${componentName}-render`,
      `${componentName}-start`,
      `${componentName}-end`
    );
    
    const measures = performance.getEntriesByName(`${componentName}-render`);
    if (measures.length > 0) {
      console.log(`${componentName} render time:`, measures[0].duration);
    }
  },

  // Measure API response time
  measureAPI: async (apiCall: Promise<any>, apiName: string) => {
    const start = performance.now();
    try {
      const result = await apiCall;
      const end = performance.now();
      console.log(`API ${apiName} took ${end - start} milliseconds`);
      return result;
    } catch (error) {
      const end = performance.now();
      console.error(`API ${apiName} failed after ${end - start} milliseconds`, error);
      throw error;
    }
  }
};