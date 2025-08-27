import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Hero from "@/components/landing/hero-section";
import MarqueSection from "@/components/landing/ui/Marque";
import Testimonials from "@/components/landing/ui/testimonial";
import CTA from "@/components/landing/ui/cta";
import PlatformMetrics from "@/components/landing/ui/platform-metrics";
import FAQ from "@/components/landing/ui/faq";

const Landing = () => {
  return (
    <div className="min-h-screen ">
      {/* Header */}
      <header className="container mx-auto px-6 py-4">
        <nav className="flex items-center justify-between">
          <Link to="/">
            <img
              src="/images/long-logo.png"
              alt="logo"
              width={150}
              height={100}
            />
          </Link>
          <div className="flex items-center gap-4">
            <Link to="/sign-in">
              <Button variant="ghost">Sign In</Button>
            </Link>
            <Link to="/sign-up">
              <Button>Get Started</Button>
            </Link>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <Hero />
      <MarqueSection />
      <Testimonials />
      <section className="w-full">
        <PlatformMetrics />
      </section>

      <section className="w-full">
        <FAQ />
      </section>
      <CTA />

      {/* Footer */}
      <footer className=" text-primary py-6">
        <div className="container mx-auto text-center">
          <p className="font-nohemi">Get updates on our Newsletter</p>
          <input
            type="email"
            placeholder="Your email address"
            className="mt-2 p-2 rounded"
          />
          <Button className="mt-2 font-uncut">Subscribe</Button>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
