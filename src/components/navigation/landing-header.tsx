/**
 * Reusable Landing Header Navigation Component
 * Used across landing pages (pricing, team collaboration, analytics, etc.)
 */

import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface LandingHeaderProps {
  className?: string;
}

const LandingHeader = ({ className }: LandingHeaderProps) => {
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const location = useLocation();

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

  // Check if current path matches menu item
  const isActivePath = (path: string) => {
    return location.pathname === path;
  };

  return (
    <header className={cn(
      "sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border",
      className
    )}>
      <div className="container mx-auto px-6 py-4 ">
        <nav className="flex items-center justify-between">
          <Link to="/" className="flex items-center">
            <img
              src="/images/long-logo.png"
              alt="Flowtim Logo"
              width={180}
              height={60}
              className="h-12 w-auto"
            />
          </Link>
          
          {/* Navigation Menu */}
          <div ref={dropdownRef} className="hidden md:flex items-center space-x-8">
            {/* Project Management Dropdown */}
            <div className="relative">
              <button
                onClick={() => handleDropdownToggle('projects')}
                className={cn(
                  "flex items-center space-x-1 text-sm font-medium transition-colors",
                  isActivePath('/project-management') 
                    ? "text-primary" 
                    : "text-muted-foreground hover:text-primary"
                )}
              >
                <span>Project Management</span>
                <ChevronDown className="h-4 w-4" />
              </button>
              {activeDropdown === 'projects' && (
                <div className="absolute top-full left-0 mt-2 w-64 bg-background border border-border rounded-lg shadow-lg p-4">
                  <div className="space-y-3">
                    <Link 
                      to="/project-management" 
                      className="block px-3 py-2 text-sm hover:bg-muted rounded-md"
                      onClick={() => setActiveDropdown(null)}
                    >
                      <div className="font-medium">Kanban Boards</div>
                      <div className="text-xs text-muted-foreground">Visual task management</div>
                    </Link>
                    <Link 
                      to="/project-management" 
                      className="block px-3 py-2 text-sm hover:bg-muted rounded-md"
                      onClick={() => setActiveDropdown(null)}
                    >
                      <div className="font-medium">Project Planning</div>
                      <div className="text-xs text-muted-foreground">Timeline & milestones</div>
                    </Link>
                    <Link 
                      to="/project-management" 
                      className="block px-3 py-2 text-sm hover:bg-muted rounded-md"
                      onClick={() => setActiveDropdown(null)}
                    >
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
                className={cn(
                  "flex items-center space-x-1 text-sm font-medium transition-colors",
                  isActivePath('/time-analytics') 
                    ? "text-primary" 
                    : "text-muted-foreground hover:text-primary"
                )}
              >
                <span>Time & Analytics</span>
                <ChevronDown className="h-4 w-4" />
              </button>
              {activeDropdown === 'analytics' && (
                <div className="absolute top-full left-0 mt-2 w-64 bg-background border border-border rounded-lg shadow-lg p-4">
                  <div className="space-y-3">
                    <Link 
                      to="/time-analytics" 
                      className="block px-3 py-2 text-sm hover:bg-muted rounded-md"
                      onClick={() => setActiveDropdown(null)}
                    >
                      <div className="font-medium">Time Tracking</div>
                      <div className="text-xs text-muted-foreground">Monitor work hours</div>
                    </Link>
                    <Link 
                      to="/time-analytics" 
                      className="block px-3 py-2 text-sm hover:bg-muted rounded-md"
                      onClick={() => setActiveDropdown(null)}
                    >
                      <div className="font-medium">Dashboard Analytics</div>
                      <div className="text-xs text-muted-foreground">Real-time insights</div>
                    </Link>
                    <Link 
                      to="/time-analytics" 
                      className="block px-3 py-2 text-sm hover:bg-muted rounded-md"
                      onClick={() => setActiveDropdown(null)}
                    >
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
                className={cn(
                  "flex items-center space-x-1 text-sm font-medium transition-colors",
                  isActivePath('/team-collaboration') 
                    ? "text-primary" 
                    : "text-muted-foreground hover:text-primary"
                )}
              >
                <span>Team & Collaboration</span>
                <ChevronDown className="h-4 w-4" />
              </button>
              {activeDropdown === 'team' && (
                <div className="absolute top-full left-0 mt-2 w-64 bg-background border border-border rounded-lg shadow-lg p-4">
                  <div className="space-y-3">
                    <Link 
                      to="/team-collaboration" 
                      className="block px-3 py-2 text-sm hover:bg-muted rounded-md"
                      onClick={() => setActiveDropdown(null)}
                    >
                      <div className="font-medium">Team Management</div>
                      <div className="text-xs text-muted-foreground">Resource allocation</div>
                    </Link>
                    <Link 
                      to="/team-collaboration" 
                      className="block px-3 py-2 text-sm hover:bg-muted rounded-md"
                      onClick={() => setActiveDropdown(null)}
                    >
                      <div className="font-medium">Real-time Chat</div>
                      <div className="text-xs text-muted-foreground">Instant communication</div>
                    </Link>
                    <Link 
                      to="/team-collaboration" 
                      className="block px-3 py-2 text-sm hover:bg-muted rounded-md"
                      onClick={() => setActiveDropdown(null)}
                    >
                      <div className="font-medium">File & Folder Management</div>
                      <div className="text-xs text-muted-foreground">Organize and share project files</div>
                    </Link>
                    <Link 
                      to="/team-collaboration" 
                      className="block px-3 py-2 text-sm hover:bg-muted rounded-md"
                      onClick={() => setActiveDropdown(null)}
                    >
                      <div className="font-medium">Document Collaboration</div>
                      <div className="text-xs text-muted-foreground">Real-time editing & sharing</div>
                    </Link>
                  </div>
                </div>
              )}
            </div>

            <Link 
              to="/pricing" 
              className={cn(
                "text-sm font-medium transition-colors",
                isActivePath('/pricing') 
                  ? "text-primary" 
                  : "text-muted-foreground hover:text-primary"
              )}
            >
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

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => handleDropdownToggle('mobile')}
            >
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </Button>
          </div>
        </nav>

        {/* Mobile Menu */}
        {activeDropdown === 'mobile' && (
          <div className="md:hidden mt-4 pb-4 border-t border-border">
            <div className="pt-4 space-y-4">
              <Link 
                to="/project-management" 
                className="block text-sm font-medium text-muted-foreground hover:text-primary"
                onClick={() => setActiveDropdown(null)}
              >
                Project Management
              </Link>
              <Link 
                to="/time-analytics" 
                className="block text-sm font-medium text-muted-foreground hover:text-primary"
                onClick={() => setActiveDropdown(null)}
              >
                Time & Analytics
              </Link>
              <Link 
                to="/team-collaboration" 
                className="block text-sm font-medium text-muted-foreground hover:text-primary"
                onClick={() => setActiveDropdown(null)}
              >
                Team & Collaboration
              </Link>
              <Link 
                to="/pricing" 
                className="block text-sm font-medium text-muted-foreground hover:text-primary"
                onClick={() => setActiveDropdown(null)}
              >
                Pricing
              </Link>
              <div className="pt-4 space-y-2">
                <Link to="/sign-in" onClick={() => setActiveDropdown(null)}>
                  <Button variant="ghost" className="w-full justify-start">Sign In</Button>
                </Link>
                <Link to="/sign-up" onClick={() => setActiveDropdown(null)}>
                  <Button className="w-full bg-primary hover:bg-primary/90">Try for Free</Button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default LandingHeader;