import { lazy, Suspense, memo } from "react";
import Container from "../global/container";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

// Lazy load heavy components
const OrbitingCircles = lazy(() => import("./ui/orbiting-circles").then(module => ({ default: module.OrbitingCircles })));
const AnimatedTooltip = lazy(() => import("../ui/animated-tooltip").then(module => ({ default: module.AnimatedTooltip })));
const Boxes = lazy(() => import("../ui/background-boxes").then(module => ({ default: module.Boxes })));

// Import critical data immediately for better performance
import Icons from "../global/icons";
import { People } from "@/constant/people";

// Memoized fallback components
const TeamsFallback = memo(() => (
  <div className="flex flex-row items-center justify-center mt-8 w-full">
    <div className="flex -space-x-2">
      {[1, 2, 3, 4].map((i) => (
        <div key={i} className="w-8 h-8 rounded-full bg-primary/20 animate-pulse" />
      ))}
    </div>
    <div className="ml-5 text-left">
      <p className="font-nohemi text-sm font-medium text-primary">
        <span className="font-bold text-lg">11k+</span> Teams trust Flowtim
      </p>
      <p className="text-xs text-muted-foreground font-uncut">
        Join thousands of successful projects
      </p>
    </div>
  </div>
));

const Hero = memo(() => {
  return (
    <section
      id="home"
      className="relative w-full h-fit py-16 overflow-hidden"
    >
      {/* Lazy load background animation */}
      <Suspense fallback={null}>
        <Boxes />
      </Suspense>
      
      {/* Critical above-the-fold content - load immediately */}
      <Container className="relative overflow-hidden mb-5 flex justify-center items-center">
        <div className="inline-flex items-center rounded-full border border-border bg-background/80 backdrop-blur-sm px-4 py-2 shadow-sm">
          <span className="inline-flex items-center justify-center rounded-full bg-primary px-2 py-1 text-[10px] font-medium text-white font-nohemi mr-3">
            NEW
          </span>
          <span className="text-sm font-medium text-primary font-nohemi">
            Introducing Flowtim 2.0 - Enhanced Project Management
          </span>
        </div>
      </Container>
      
      {/* Teams section with fallback */}
      <Suspense fallback={<TeamsFallback />}>
        <div className="flex flex-row items-center justify-center mt-8 w-full ">
          <AnimatedTooltip items={People} />
          <div className="ml-5 text-left z-10">
            <p className="font-nohemi text-sm font-medium text-primary">
              <span className="font-bold text-lg">11k+</span> Teams trust Flowtim
            </p>
            <p className="text-xs text-muted-foreground font-uncut">
              Join thousands of successful projects
            </p>
          </div>
        </div>
      </Suspense>

      <div className="flex flex-col items-center justify-center gap-y-8 relative">
        {/* Lazy load orbiting circles animation */}
        <Suspense fallback={null}>
          <Container className="flex absolute inset-0 top-1 mb-auto flex-col items-center justify-center w-full min-h-screen -z-10">
            <OrbitingCircles speed={0.5} radius={300}>
              <Icons.circle1 className="size-4 text-primary/70" />
              <Icons.circle2 className="size-1 text-primary/80" />
            </OrbitingCircles>
            <OrbitingCircles speed={0.25} radius={400}>
              <Icons.circle2 className="size-1 text-primary/50" />
              <Icons.circle1 className="size-4 text-primary/60" />
              <Icons.circle2 className="size-1 text-primary/90" />
            </OrbitingCircles>
            <OrbitingCircles speed={0.1} radius={500}>
              <Icons.circle2 className="size-1 text-primary/50" />
              <Icons.circle2 className="size-1 text-primary/90" />
              <Icons.circle1 className="size-4 text-primary/60" />
              <Icons.circle2 className="size-1 text-primary/90" />
            </OrbitingCircles>
          </Container>
        </Suspense>
        <div className="flex flex-col items-center justify-center text-center gap-y-4 bg-background/0 mt-5">
          <Container delay={0.2}>
            <div className="max-w-4xl flex flex-col gap-6 mx-auto mt-8">
              <h1 className="font-bold text-4xl md:text-6xl lg:text-6xl text-center tracking-tight ">
                <span className="font-nohemi italic bg-gradient-to-r from-pink-500 to-rose-500 bg-clip-text text-transparent">
                  The Complete
                </span>
                <br />
                <span className="font-nohemi primary-gradient inline-block bg-gradient-to-r from-pink-500 to-rose-500 ">
                  Project Management
                </span>
                <br />
                <span className="font-nohemi ">
                  Solution
                </span>
              </h1>
            </div>
          </Container>
          <Container delay={0.2}>
            <p className="max-w-2xl mx-auto mt-6 text-lg lg:text-xl text-center text-muted-foreground font-uncut leading-relaxed">
              Streamline your projects, boost team collaboration, and deliver results faster with 
              <span className="text-primary font-medium">Flowtim's</span> intelligent project management platform.
            </p>
          </Container>
          <Container delay={0.2} className="z-20 mt-8">
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8">
              <Link to="/sign-up">
                <Button size="lg" className="w-full sm:w-auto bg-primary hover:bg-primary/90 font-uncut text-base px-8 py-3">
                  Start Free Trial
                  <svg className="h-4 w-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </Button>
              </Link>
              <Button size="lg" variant="outline" className="w-full sm:w-auto font-uncut text-base px-8 py-3">
                <svg className="h-4 w-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h1m4 0h1m2-5a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Watch Demo
              </Button>
            </div>
            
            {/* Trust Indicators */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mt-8 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <svg className="h-4 w-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                <span className="font-uncut">Free 14-day trial</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="h-4 w-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                <span className="font-uncut">No credit card required</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="h-4 w-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                <span className="font-uncut">Setup in 2 minutes</span>
              </div>
            </div>
          </Container>
          <Container delay={0.3} className="relative">
            <div className="relative max-w-6xl mx-auto">
              {/* Simplified glow effects - reduced for performance */}
              <div className="absolute top-1/4 left-1/2 -z-10 bg-gradient-to-r from-primary/20 to-accent/20 w-3/4 h-1/2 -translate-x-1/2 -translate-y-1/2 blur-[4rem]"></div>
              
              {/* Main Container */}
              <div className="relative rounded-2xl lg:rounded-3xl border border-border/50 bg-background/50 backdrop-blur-sm p-3 lg:p-4 shadow-xl">
                <div className="rounded-xl lg:rounded-2xl border border-border bg-background overflow-hidden">
                  <img
                    src="/images/dashboard.png"
                    alt="Flowtim Dashboard - Project Management Interface"
                    width={1620}
                    height={1080}
                    className="w-full h-auto object-cover"
                    loading="lazy"
                    decoding="async"
                  />
                </div>
                
                {/* Floating UI Elements */}
                <div className="absolute top-6 right-6 bg-background/90 backdrop-blur-sm border border-border rounded-lg px-3 py-2 shadow-lg">
                  <div className="flex items-center gap-2">
                    <div className="h-2 w-2 bg-green-500 rounded-full animate-pulse"></div>
                    <span className="text-xs font-medium text-foreground font-uncut">Live Dashboard</span>
                  </div>
                </div>
                
                <div className="absolute bottom-6 left-6 bg-background/90 backdrop-blur-sm border border-border rounded-lg px-4 py-2 shadow-lg">
                  <div className="flex items-center gap-3">
                    <div className="flex -space-x-2">
                      <div className="h-6 w-6 rounded-full bg-primary border-2 border-background"></div>
                      <div className="h-6 w-6 rounded-full bg-accent border-2 border-background"></div>
                      <div className="h-6 w-6 rounded-full bg-secondary border-2 border-background"></div>
                    </div>
                    <span className="text-xs font-medium text-foreground font-uncut">+11k Teams</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-gradient-to-t from-background to-transparent absolute bottom-0 inset-x-0 w-full h-80"></div>
          </Container>
        </div>
      </div>
      {/* </div> */}
    </section>
  );
});

// Set display name for debugging
Hero.displayName = 'Hero';

export default Hero;
