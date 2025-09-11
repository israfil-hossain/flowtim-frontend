import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";
import Hero from "@/components/landing/hero-section";
import MarqueSection from "@/components/landing/ui/Marque";
import Testimonials from "@/components/landing/ui/testimonial";
import CTA from "@/components/landing/ui/cta";
import PlatformMetrics from "@/components/landing/ui/platform-metrics";
import FAQ from "@/components/landing/ui/faq";
import FeatureShowcase from "@/components/landing/ui/feature-showcase";
import { useState, useEffect, useRef } from "react";

const Landing = () => {
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleDropdownToggle = (dropdown: string) => {
    setActiveDropdown(activeDropdown === dropdown ? null : dropdown);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setActiveDropdown(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="min-h-screen ">
      {/* Professional Header */}
      <header className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border">
        <div className="container mx-auto px-6 py-4">
          <nav className="flex items-center justify-between">
            <Link to="/" className="flex items-center">
              <img
                src="/images/long-logo.png"
                alt="Flowtim Logo"
                width={150}
                height={50}
                className="h-8 w-auto"
              />
            </Link>
            
            {/* Navigation Menu */}
            <div ref={dropdownRef} className="hidden md:flex items-center space-x-8">
              {/* Project Management Dropdown */}
              <div className="relative">
                <button
                  onClick={() => handleDropdownToggle('projects')}
                  className="flex items-center space-x-1 text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
                >
                  <span>Project Management</span>
                  <ChevronDown className="h-4 w-4" />
                </button>
                {activeDropdown === 'projects' && (
                  <div className="absolute top-full left-0 mt-2 w-64 bg-background border border-border rounded-lg shadow-lg p-4">
                    <div className="space-y-3">
                      <Link to="/project-management" className="block px-3 py-2 text-sm hover:bg-muted rounded-md">
                        <div className="font-medium">Kanban Boards</div>
                        <div className="text-xs text-muted-foreground">Visual task management</div>
                      </Link>
                      <Link to="/project-management" className="block px-3 py-2 text-sm hover:bg-muted rounded-md">
                        <div className="font-medium">Project Planning</div>
                        <div className="text-xs text-muted-foreground">Timeline & milestones</div>
                      </Link>
                      <Link to="/project-management" className="block px-3 py-2 text-sm hover:bg-muted rounded-md">
                        <div className="font-medium">Task Management</div>
                        <div className="text-xs text-muted-foreground">Assign & track progress</div>
                      </Link>
                    </div>
                  </div>
                )}
              </div>

              {/* Time & Analytics Dropdown */}
              <div className="relative">
                <button
                  onClick={() => handleDropdownToggle('analytics')}
                  className="flex items-center space-x-1 text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
                >
                  <span>Time & Analytics</span>
                  <ChevronDown className="h-4 w-4" />
                </button>
                {activeDropdown === 'analytics' && (
                  <div className="absolute top-full left-0 mt-2 w-64 bg-background border border-border rounded-lg shadow-lg p-4">
                    <div className="space-y-3">
                      <Link to="/time-analytics" className="block px-3 py-2 text-sm hover:bg-muted rounded-md">
                        <div className="font-medium">Time Tracking</div>
                        <div className="text-xs text-muted-foreground">Monitor work hours</div>
                      </Link>
                      <Link to="/time-analytics" className="block px-3 py-2 text-sm hover:bg-muted rounded-md">
                        <div className="font-medium">Dashboard Analytics</div>
                        <div className="text-xs text-muted-foreground">Real-time insights</div>
                      </Link>
                      <Link to="/time-analytics" className="block px-3 py-2 text-sm hover:bg-muted rounded-md">
                        <div className="font-medium">Performance Reports</div>
                        <div className="text-xs text-muted-foreground">Team productivity metrics</div>
                      </Link>
                    </div>
                  </div>
                )}
              </div>

              {/* Team & Collaboration Dropdown */}
              <div className="relative">
                <button
                  onClick={() => handleDropdownToggle('team')}
                  className="flex items-center space-x-1 text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
                >
                  <span>Team & Collaboration</span>
                  <ChevronDown className="h-4 w-4" />
                </button>
                {activeDropdown === 'team' && (
                  <div className="absolute top-full left-0 mt-2 w-64 bg-background border border-border rounded-lg shadow-lg p-4">
                    <div className="space-y-3">
                      <Link to="/team-collaboration" className="block px-3 py-2 text-sm hover:bg-muted rounded-md">
                        <div className="font-medium">Team Management</div>
                        <div className="text-xs text-muted-foreground">Resource allocation</div>
                      </Link>
                      <Link to="/team-collaboration" className="block px-3 py-2 text-sm hover:bg-muted rounded-md">
                        <div className="font-medium">Real-time Chat</div>
                        <div className="text-xs text-muted-foreground">Instant communication</div>
                      </Link>
                      <Link to="/team-collaboration" className="block px-3 py-2 text-sm hover:bg-muted rounded-md">
                        <div className="font-medium">File Sharing</div>
                        <div className="text-xs text-muted-foreground">Document collaboration</div>
                      </Link>
                    </div>
                  </div>
                )}
              </div>

              <Link to="/pricing" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
                Pricing
              </Link>
            </div>

            {/* Auth Buttons */}
            <div className="flex items-center gap-4">
              <Link to="/sign-in">
                <Button variant="ghost" className="hidden md:flex">Sign In</Button>
              </Link>
              <Link to="/sign-up">
                <Button className="bg-primary hover:bg-primary/90">Try for Free</Button>
              </Link>
            </div>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <Hero />
      
      {/* Trusted Brands */}
      <MarqueSection />
      
      {/* Feature Showcase */}
      <FeatureShowcase />
      
      {/* Platform Metrics */}
      <section className="w-full">
        <PlatformMetrics />
      </section>
      
      {/* Testimonials */}
      <Testimonials />

      {/* FAQ Section */}
      <section className="w-full">
        <FAQ />
      </section>
      
      {/* Call to Action */}
      <CTA />

      {/* Professional Footer */}
      <footer className="bg-muted/30 border-t border-border py-16">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Company Info */}
            <div className="space-y-4">
              <img
                src="/images/long-logo.png"
                alt="Flowtim Logo"
                width={120}
                height={40}
                className="h-6 w-auto"
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
