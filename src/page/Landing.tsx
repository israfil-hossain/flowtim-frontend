import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Users, Calendar, BarChart3 } from "lucide-react";

const Landing = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-indigo-100">
      {/* Header */}
      <header className="container mx-auto px-6 py-4">
        <nav className="flex items-center justify-between">
          <Link to="/">
            <img src="/images/long-logo.png" alt="logo" width={150} height={100} />
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
      <main className="container mx-auto px-6 py-20">
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Streamline Your Team's
            <span className="text-emerald-600"> Workflow</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Flowtim helps teams collaborate efficiently with powerful project management tools, 
            task tracking, and seamless team coordination.
          </p>
          <div className="flex items-center justify-center gap-4">
            <Link to="/sign-up">
              <Button size="lg" className="text-lg px-8 py-3">
                Start Free Trial <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link to="/sign-in">
              <Button variant="outline" size="lg" className="text-lg px-8 py-3">
                Sign In
              </Button>
            </Link>
          </div>
        </div>

        {/* Features */}
        <div className="grid md:grid-cols-3 gap-8 mt-20">
          <div className="text-center p-6">
            <Users className="h-12 w-12 text-emerald-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Team Collaboration</h3>
            <p className="text-gray-600">Work together seamlessly with your team members</p>
          </div>
          <div className="text-center p-6">
            <Calendar className="h-12 w-12 text-emerald-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Task Management</h3>
            <p className="text-gray-600">Organize and track tasks with powerful tools</p>
          </div>
          <div className="text-center p-6">
            <BarChart3 className="h-12 w-12 text-emerald-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Analytics</h3>
            <p className="text-gray-600">Get insights into your team's productivity</p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Landing;