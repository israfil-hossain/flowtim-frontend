import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Hero from "@/components/landing/hero-section";
import PreloadResources from "@/components/landing/preload-resources";
import LandingHeader from "@/components/navigation/landing-header";
import { lazy, Suspense } from "react";
import { usePerformanceMonitor } from "@/hooks/use-performance-monitor";

// Lazy load non-critical sections
const LazyMarqueSection = lazy(() => import("@/components/landing/ui/Marque"));
const LazyFeatureShowcase = lazy(() => import("@/components/landing/ui/feature-showcase"));
const LazyFileManagementShowcase = lazy(() => import("@/components/landing/ui/file-management-showcase"));
const LazyPlatformMetrics = lazy(() => import("@/components/landing/ui/platform-metrics"));
const LazyTestimonials = lazy(() => import("@/components/landing/ui/testimonial"));
const LazyFAQ = lazy(() => import("@/components/landing/ui/faq"));
const LazyCTA = lazy(() => import("@/components/landing/ui/cta"));

const Landing = () => {
  // Enable performance monitoring
  usePerformanceMonitor();

  return (
    <div className="min-h-screen ">
      {/* Reusable Header */}
      <LandingHeader />

      {/* Preload critical resources */}
      <PreloadResources />
      
      {/* Hero Section - Critical, load immediately */}
      <Hero />
      
      {/* Below-the-fold content - Lazy load for better performance */}
      <Suspense fallback={<div className="w-full h-32 bg-muted/10 animate-pulse" />}>
        <LazyMarqueSection />
      </Suspense>
      
      <Suspense fallback={<div className="w-full h-96 bg-muted/10 animate-pulse rounded-lg" />}>
        <LazyFeatureShowcase />
      </Suspense>

      <Suspense fallback={<div className="w-full h-96 bg-muted/10 animate-pulse rounded-lg" />}>
        <LazyFileManagementShowcase />
      </Suspense>
      
      <section className="w-full">
        <Suspense fallback={<div className="w-full h-64 bg-muted/10 animate-pulse rounded-lg" />}>
          <LazyPlatformMetrics />
        </Suspense>
      </section>
      
      <Suspense fallback={<div className="w-full h-80 bg-muted/10 animate-pulse rounded-lg" />}>
        <LazyTestimonials />
      </Suspense>

      <section className="w-full">
        <Suspense fallback={<div className="w-full h-96 bg-muted/10 animate-pulse rounded-lg" />}>
          <LazyFAQ />
        </Suspense>
      </section>
      
      <Suspense fallback={<div className="w-full h-40 bg-muted/10 animate-pulse rounded-lg" />}>
        <LazyCTA />
      </Suspense>

      {/* Professional Footer */}
      <footer className="bg-muted/30 border-t border-border py-16">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Company Info */}
            <div className="space-y-4">
              <img
                src="/images/long-logo.png"
                alt="Flowtim Logo"
                width={150}
                height={50}
                className="h-8 w-auto"
              />
              <p className="text-sm text-muted-foreground font-uncut">
                Empowering teams with intelligent project management solutions.
              </p>
              <div className="flex space-x-4">
                <Link to="#" className="text-muted-foreground hover:text-primary">
                  <span className="sr-only">Twitter</span>
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8.29 20.25c7.55 0 11.67-6.25 11.67-11.67 0-.18 0-.35-.01-.53A8.35 8.35 0 0022 5.92a8.19 8.19 0 01-2.36.65 4.12 4.12 0 001.8-2.27 8.22 8.22 0 01-2.6 1 4.1 4.1 0 00-7 3.74A11.65 11.65 0 013 4.79a4.1 4.1 0 001.27 5.48A4.07 4.07 0 012.8 9.7v.05a4.1 4.1 0 003.29 4 4.1 4.1 0 01-1.85.07 4.1 4.1 0 003.83 2.85A8.23 8.23 0 012 18.4a11.62 11.62 0 006.29 1.84"/>
                  </svg>
                </Link>
                <Link to="#" className="text-muted-foreground hover:text-primary">
                  <span className="sr-only">LinkedIn</span>
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.47 2H3.53A1.53 1.53 0 002 3.53v16.94A1.53 1.53 0 003.53 22h16.94A1.53 1.53 0 0022 20.47V3.53A1.53 1.53 0 0020.47 2zM8.09 18.74h-3v-9h3v9zM6.59 8.48A1.74 1.74 0 114.85 6.74a1.74 1.74 0 011.74 1.74zM18.91 18.74h-3v-4.38c0-1.04 0-2.38-1.45-2.38s-1.67 1.13-1.67 2.3v4.46h-3v-9h2.88v1.23h.04a3.16 3.16 0 012.84-1.56c3.04 0 3.6 2 3.6 4.6v5.35z"/>
                  </svg>
                </Link>
              </div>
            </div>

            {/* Product */}
            <div>
              <h3 className="font-medium font-nohemi mb-4">Product</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link to="#" className="hover:text-primary transition-colors">Features</Link></li>
                <li><Link to="#" className="hover:text-primary transition-colors">Integrations</Link></li>
                <li><Link to="#" className="hover:text-primary transition-colors">Pricing</Link></li>
                <li><Link to="#" className="hover:text-primary transition-colors">Changelog</Link></li>
              </ul>
            </div>

            {/* Resources */}
            <div>
              <h3 className="font-medium font-nohemi mb-4">Resources</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link to="#" className="hover:text-primary transition-colors">Documentation</Link></li>
                <li><Link to="#" className="hover:text-primary transition-colors">Help Center</Link></li>
                <li><Link to="#" className="hover:text-primary transition-colors">Community</Link></li>
                <li><Link to="#" className="hover:text-primary transition-colors">Blog</Link></li>
              </ul>
            </div>

            {/* Newsletter */}
            <div>
              <h3 className="font-medium font-nohemi mb-4">Stay Updated</h3>
              <p className="text-sm text-muted-foreground mb-4 font-uncut">
                Get the latest updates and feature releases.
              </p>
              <div className="space-y-2">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full px-3 py-2 text-sm border border-border rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                />
                <Button className="w-full bg-primary hover:bg-primary/90 font-uncut">Subscribe</Button>
              </div>
            </div>
          </div>

          {/* Bottom Section */}
          <div className="border-t border-border mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-muted-foreground font-uncut">
              © 2024 Flowtim. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link to="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                Privacy Policy
              </Link>
              <Link to="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                Terms of Service
              </Link>
              <Link to="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                Security
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
