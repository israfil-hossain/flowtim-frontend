import { memo, useEffect } from 'react';

const PreloadResources = memo(() => {
  useEffect(() => {
    // Preload critical images
    const criticalImages = ['/images/dashboard.png'];
    
    criticalImages.forEach(src => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = 'image';
      link.href = src;
      document.head.appendChild(link);
    });

    // Prefetch critical fonts if not already loaded
    const fontPreloads = [
      { family: 'nohemi', weight: '400' },
      { family: 'nohemi', weight: '700' },
      { family: 'uncut', weight: '400' }
    ];

    fontPreloads.forEach(font => {
      if (document.fonts && !document.fonts.check(`${font.weight} 16px ${font.family}`)) {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.as = 'font';
        link.type = 'font/woff2';
        link.crossOrigin = 'anonymous';
        link.href = `/fonts/${font.family}-${font.weight}.woff2`;
        document.head.appendChild(link);
      }
    });

    // Cleanup function
    return () => {
      // Remove preload links after they're no longer needed
      const preloadLinks = document.head.querySelectorAll('link[rel="preload"]');
      preloadLinks.forEach(link => {
        if (criticalImages.includes(link.getAttribute('href') || '')) {
          document.head.removeChild(link);
        }
      });
    };
  }, []);

  return null; // This component doesn't render anything
});

PreloadResources.displayName = 'PreloadResources';

export default PreloadResources;