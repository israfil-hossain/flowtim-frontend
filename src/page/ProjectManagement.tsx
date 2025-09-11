import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { 
  Calendar,
  CheckCircle2,
  Kanban,
  BarChart3,
  Users,
  Clock,
  ArrowRight,
  Star,
  Play
} from "lucide-react";
import AnimationContainer from "@/components/global/animation-container";
import Wrapper from "@/components/global/wrapper";
import SectionBadge from "@/components/ui/section-badge";

const FEATURES = [
  {
    icon: Kanban,
    title: "Kanban Boards",
    description: "Visual task management with drag-and-drop functionality",
    details: [
      "Customizable columns and workflows",
      "Real-time collaboration",
      "Advanced filtering and search",
      "Automated task routing"
    ]
  },
  {
    icon: Calendar,
    title: "Project Planning",
    description: "Comprehensive timeline and milestone management",
    details: [
      "Gantt chart visualization",
      "Dependency management",
      "Critical path analysis",
      "Resource allocation"
    ]
  },
  {
    icon: CheckCircle2,
    title: "Task Management",
    description: "Detailed task tracking with smart assignments",
    details: [
      "Priority-based task queues",
      "Automated task assignments",
      "Progress tracking",
      "Due date management"
    ]
  },
  {
    icon: BarChart3,
    title: "Progress Analytics",
    description: "Real-time insights into project performance",
    details: [
      "Burndown charts",
      "Velocity tracking",
      "Performance metrics",
      "Custom reporting"
    ]
  }
];

const BENEFITS = [
  {
    title: "50% Faster Project Delivery",
    description: "Streamlined workflows reduce project completion time"
  },
  {
    title: "95% Team Satisfaction",
    description: "Teams love the intuitive interface and collaborative features"
  },
  {
    title: "40% Better Resource Utilization",
    description: "Smart allocation prevents overloading and underutilization"
  }
];

const ProjectManagement = () => {
  return (
    <div className="min-h-screen">
      {/* Header */}
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
            <div className="flex items-center gap-4">
              <Link to="/">
                <Button variant="ghost">Back to Home</Button>
              </Link>
              <Link to="/sign-up">
                <Button className="bg-primary hover:bg-primary/90">Get Started</Button>
              </Link>
            </div>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 lg:py-32 bg-gradient-to-b from-background to-muted/20">
        <Wrapper>
          <div className="text-center max-w-4xl mx-auto">
            <AnimationContainer animation="fadeUp" delay={0.1}>
              <SectionBadge title="Project Management" />
            </AnimationContainer>

            <AnimationContainer animation="fadeUp" delay={0.2}>
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold font-nohemi mt-6 mb-6">
                <span className="text-foreground">Manage Projects</span>
                <br />
                <span className="primary-gradient">Like a Pro</span>
              </h1>
            </AnimationContainer>

            <AnimationContainer animation="fadeUp" delay={0.3}>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto font-uncut leading-relaxed">
                From planning to delivery, Flowtim's project management tools help you stay organized, 
                collaborate effectively, and deliver projects on time.
              </p>
            </AnimationContainer>

            <AnimationContainer animation="fadeUp" delay={0.4}>
              <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
                <Button size="lg" className="bg-primary hover:bg-primary/90">
                  Start Free Trial
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
                <Button size="lg" variant="outline">
                  <Play className="h-4 w-4 mr-2" />
                  Watch Demo
                </Button>
              </div>
            </AnimationContainer>
          </div>
        </Wrapper>
      </section>

      {/* Features Grid */}
      <section className="py-20 lg:py-32">
        <Wrapper>
          <div className="text-center mb-16">
            <AnimationContainer animation="fadeUp" delay={0.1}>
              <h2 className="text-3xl md:text-4xl font-bold font-nohemi mb-4">
                Complete Project Management Suite
              </h2>
            </AnimationContainer>
            <AnimationContainer animation="fadeUp" delay={0.2}>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto font-uncut">
                Everything you need to plan, execute, and deliver successful projects.
              </p>
            </AnimationContainer>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {FEATURES.map((feature, index) => (
              <AnimationContainer key={index} animation="fadeUp" delay={0.3 + (index * 0.1)}>
                <div className="bg-background border border-border rounded-2xl p-8 hover:shadow-lg transition-all duration-300">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="p-3 rounded-xl bg-primary/10">
                      <feature.icon className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold font-nohemi">{feature.title}</h3>
                      <p className="text-muted-foreground font-uncut">{feature.description}</p>
                    </div>
                  </div>
                  <ul className="space-y-3">
                    {feature.details.map((detail, idx) => (
                      <li key={idx} className="flex items-center gap-3">
                        <CheckCircle2 className="h-4 w-4 text-primary flex-shrink-0" />
                        <span className="text-sm text-muted-foreground font-uncut">{detail}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </AnimationContainer>
            ))}
          </div>
        </Wrapper>
      </section>

      {/* Dashboard Preview */}
      <section className="py-20 lg:py-32 bg-muted/20">
        <Wrapper>
          <div className="text-center mb-16">
            <AnimationContainer animation="fadeUp" delay={0.1}>
              <h2 className="text-3xl md:text-4xl font-bold font-nohemi mb-4">
                See It in Action
              </h2>
            </AnimationContainer>
            <AnimationContainer animation="fadeUp" delay={0.2}>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto font-uncut">
                Experience the power of visual project management with our intuitive dashboard.
              </p>
            </AnimationContainer>
          </div>

          <AnimationContainer animation="fadeUp" delay={0.3}>
            <div className="relative max-w-6xl mx-auto">
              <div className="absolute top-1/4 left-1/2 -z-10 bg-gradient-to-r from-primary/20 to-accent/20 w-3/4 h-1/2 -translate-x-1/2 -translate-y-1/2 blur-[4rem]"></div>
              
              <div className="relative rounded-2xl border border-border bg-background/50 backdrop-blur-sm p-4 shadow-2xl">
                <img
                  src="/images/dashboard.png"
                  alt="Project Management Dashboard"
                  className="w-full rounded-xl"
                  width={1200}
                  height={800}
                />
              </div>
            </div>
          </AnimationContainer>
        </Wrapper>
      </section>

      {/* Benefits Section */}
      <section className="py-20 lg:py-32">
        <Wrapper>
          <div className="text-center mb-16">
            <AnimationContainer animation="fadeUp" delay={0.1}>
              <h2 className="text-3xl md:text-4xl font-bold font-nohemi mb-4">
                Proven Results
              </h2>
            </AnimationContainer>
            <AnimationContainer animation="fadeUp" delay={0.2}>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto font-uncut">
                Join thousands of teams who have transformed their project management.
              </p>
            </AnimationContainer>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {BENEFITS.map((benefit, index) => (
              <AnimationContainer key={index} animation="fadeUp" delay={0.3 + (index * 0.1)}>
                <div className="text-center p-8 rounded-2xl bg-gradient-to-b from-primary/5 to-accent/5 border border-border">
                  <h3 className="text-2xl font-bold font-nohemi text-primary mb-4">
                    {benefit.title}
                  </h3>
                  <p className="text-muted-foreground font-uncut">
                    {benefit.description}
                  </p>
                </div>
              </AnimationContainer>
            ))}
          </div>
        </Wrapper>
      </section>

      {/* CTA Section */}
      <section className="py-20 lg:py-32 bg-gradient-to-r from-primary/10 to-accent/10">
        <Wrapper>
          <div className="text-center">
            <AnimationContainer animation="fadeUp" delay={0.1}>
              <h2 className="text-3xl md:text-4xl font-bold font-nohemi mb-6">
                Ready to Transform Your Project Management?
              </h2>
            </AnimationContainer>
            <AnimationContainer animation="fadeUp" delay={0.2}>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto font-uncut mb-8">
                Start your free trial today and experience the difference professional project management makes.
              </p>
            </AnimationContainer>
            <AnimationContainer animation="fadeUp" delay={0.3}>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-primary hover:bg-primary/90">
                  Start Free Trial
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
                <Button size="lg" variant="outline">
                  Contact Sales
                </Button>
              </div>
            </AnimationContainer>
          </div>
        </Wrapper>
      </section>
    </div>
  );
};

export default ProjectManagement;