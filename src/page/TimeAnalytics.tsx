import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { 
  Clock,
  BarChart3,
  TrendingUp,
  Target,
  Timer,
  Calendar,
  ArrowRight,
  Play,
  CheckCircle2
} from "lucide-react";
import AnimationContainer from "@/components/global/animation-container";
import Wrapper from "@/components/global/wrapper";
import SectionBadge from "@/components/ui/section-badge";

const FEATURES = [
  {
    icon: Timer,
    title: "Smart Time Tracking",
    description: "Automatic and manual time logging with intelligent categorization",
    details: [
      "One-click time tracking",
      "Automatic activity detection",
      "Smart categorization",
      "Offline time capture"
    ]
  },
  {
    icon: BarChart3,
    title: "Advanced Analytics",
    description: "Deep insights into productivity patterns and performance",
    details: [
      "Productivity heatmaps",
      "Performance trends",
      "Team comparisons",
      "Custom dashboards"
    ]
  },
  {
    icon: TrendingUp,
    title: "Performance Reports",
    description: "Comprehensive reporting for individuals and teams",
    details: [
      "Detailed timesheets",
      "Billable hours tracking",
      "Project profitability",
      "Client reports"
    ]
  },
  {
    icon: Target,
    title: "Goal Tracking",
    description: "Set and monitor productivity goals and targets",
    details: [
      "Daily/weekly targets",
      "Progress visualization",
      "Achievement tracking",
      "Performance alerts"
    ]
  }
];

const ANALYTICS_FEATURES = [
  {
    title: "Time Distribution Analysis",
    description: "Understand how time is spent across projects and tasks",
    metrics: ["Project breakdown", "Task categories", "Client allocation"]
  },
  {
    title: "Productivity Insights",
    description: "Identify peak performance hours and productivity patterns",
    metrics: ["Peak hours analysis", "Focus time tracking", "Distraction monitoring"]
  },
  {
    title: "Team Performance",
    description: "Compare team member productivity and identify optimization opportunities",
    metrics: ["Individual performance", "Team averages", "Capacity utilization"]
  }
];

const TimeAnalytics = () => {
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
              <SectionBadge title="Time & Analytics" />
            </AnimationContainer>

            <AnimationContainer animation="fadeUp" delay={0.2}>
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold font-nohemi mt-6 mb-6">
                <span className="text-foreground">Master Your</span>
                <br />
                <span className="primary-gradient">Time & Productivity</span>
              </h1>
            </AnimationContainer>

            <AnimationContainer animation="fadeUp" delay={0.3}>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto font-uncut leading-relaxed">
                Get deep insights into how you work with intelligent time tracking, 
                powerful analytics, and actionable productivity reports.
              </p>
            </AnimationContainer>

            <AnimationContainer animation="fadeUp" delay={0.4}>
              <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
                <Button size="lg" className="bg-primary hover:bg-primary/90">
                  Start Tracking Time
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
                <Button size="lg" variant="outline">
                  <Play className="h-4 w-4 mr-2" />
                  View Analytics Demo
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
                Comprehensive Time Management
              </h2>
            </AnimationContainer>
            <AnimationContainer animation="fadeUp" delay={0.2}>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto font-uncut">
                Track, analyze, and optimize your time with powerful tools designed for modern teams.
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

      {/* Analytics Deep Dive */}
      <section className="py-20 lg:py-32 bg-muted/20">
        <Wrapper>
          <div className="text-center mb-16">
            <AnimationContainer animation="fadeUp" delay={0.1}>
              <h2 className="text-3xl md:text-4xl font-bold font-nohemi mb-4">
                Powerful Analytics Dashboard
              </h2>
            </AnimationContainer>
            <AnimationContainer animation="fadeUp" delay={0.2}>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto font-uncut">
                Transform raw time data into actionable insights with our advanced analytics engine.
              </p>
            </AnimationContainer>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
            {ANALYTICS_FEATURES.map((feature, index) => (
              <AnimationContainer key={index} animation="fadeUp" delay={0.3 + (index * 0.1)}>
                <div className="bg-background border border-border rounded-2xl p-6 text-center">
                  <h3 className="text-lg font-bold font-nohemi mb-3">{feature.title}</h3>
                  <p className="text-muted-foreground font-uncut mb-4">{feature.description}</p>
                  <div className="space-y-2">
                    {feature.metrics.map((metric, idx) => (
                      <div key={idx} className="text-sm text-primary bg-primary/5 rounded-full px-3 py-1">
                        {metric}
                      </div>
                    ))}
                  </div>
                </div>
              </AnimationContainer>
            ))}
          </div>

          {/* Dashboard Preview */}
          <AnimationContainer animation="fadeUp" delay={0.6}>
            <div className="relative max-w-6xl mx-auto">
              <div className="absolute top-1/4 left-1/2 -z-10 bg-gradient-to-r from-primary/20 to-accent/20 w-3/4 h-1/2 -translate-x-1/2 -translate-y-1/2 blur-[4rem]"></div>
              
              <div className="relative rounded-2xl border border-border bg-background/50 backdrop-blur-sm p-4 shadow-2xl">
                <img
                  src="/images/dashboard.png"
                  alt="Time Analytics Dashboard"
                  className="w-full rounded-xl"
                  width={1200}
                  height={800}
                />
                
                {/* Floating Metrics */}
                <div className="absolute top-8 right-8 bg-background/90 backdrop-blur-sm border border-border rounded-lg p-4 shadow-lg">
                  <div className="flex items-center gap-3">
                    <Clock className="h-5 w-5 text-primary" />
                    <div>
                      <div className="text-sm font-medium">Today's Focus</div>
                      <div className="text-xs text-muted-foreground">6h 32m tracked</div>
                    </div>
                  </div>
                </div>
                
                <div className="absolute bottom-8 left-8 bg-background/90 backdrop-blur-sm border border-border rounded-lg p-4 shadow-lg">
                  <div className="flex items-center gap-3">
                    <TrendingUp className="h-5 w-5 text-green-500" />
                    <div>
                      <div className="text-sm font-medium">Productivity Up</div>
                      <div className="text-xs text-muted-foreground">+15% this week</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </AnimationContainer>
        </Wrapper>
      </section>

      {/* Key Benefits */}
      <section className="py-20 lg:py-32">
        <Wrapper>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <AnimationContainer animation="fadeUp" delay={0.1}>
                <h2 className="text-3xl md:text-4xl font-bold font-nohemi mb-6">
                  Why Time Analytics Matter
                </h2>
              </AnimationContainer>
              <AnimationContainer animation="fadeUp" delay={0.2}>
                <p className="text-lg text-muted-foreground font-uncut mb-8">
                  Understanding how you spend your time is the first step to becoming more productive and achieving better work-life balance.
                </p>
              </AnimationContainer>
              <div className="space-y-4">
                <AnimationContainer animation="fadeUp" delay={0.3}>
                  <div className="flex items-start gap-4">
                    <div className="p-2 rounded-lg bg-primary/10 mt-1">
                      <Target className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium font-nohemi mb-1">Identify Time Drains</h3>
                      <p className="text-sm text-muted-foreground font-uncut">Discover activities that consume time without adding value.</p>
                    </div>
                  </div>
                </AnimationContainer>
                <AnimationContainer animation="fadeUp" delay={0.4}>
                  <div className="flex items-start gap-4">
                    <div className="p-2 rounded-lg bg-primary/10 mt-1">
                      <TrendingUp className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium font-nohemi mb-1">Optimize Performance</h3>
                      <p className="text-sm text-muted-foreground font-uncut">Work during your peak hours for maximum productivity.</p>
                    </div>
                  </div>
                </AnimationContainer>
                <AnimationContainer animation="fadeUp" delay={0.5}>
                  <div className="flex items-start gap-4">
                    <div className="p-2 rounded-lg bg-primary/10 mt-1">
                      <BarChart3 className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium font-nohemi mb-1">Data-Driven Decisions</h3>
                      <p className="text-sm text-muted-foreground font-uncut">Make informed choices based on real productivity data.</p>
                    </div>
                  </div>
                </AnimationContainer>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <AnimationContainer animation="fadeUp" delay={0.3}>
                <div className="bg-gradient-to-br from-primary/10 to-accent/10 p-6 rounded-2xl text-center">
                  <div className="text-2xl font-bold font-nohemi text-primary mb-2">85%</div>
                  <div className="text-sm text-muted-foreground font-uncut">Time Tracking Accuracy</div>
                </div>
              </AnimationContainer>
              <AnimationContainer animation="fadeUp" delay={0.4}>
                <div className="bg-gradient-to-br from-accent/10 to-secondary/10 p-6 rounded-2xl text-center">
                  <div className="text-2xl font-bold font-nohemi text-primary mb-2">30%</div>
                  <div className="text-sm text-muted-foreground font-uncut">Productivity Increase</div>
                </div>
              </AnimationContainer>
              <AnimationContainer animation="fadeUp" delay={0.5}>
                <div className="bg-gradient-to-br from-secondary/10 to-primary/10 p-6 rounded-2xl text-center">
                  <div className="text-2xl font-bold font-nohemi text-primary mb-2">24/7</div>
                  <div className="text-sm text-muted-foreground font-uncut">Automatic Tracking</div>
                </div>
              </AnimationContainer>
              <AnimationContainer animation="fadeUp" delay={0.6}>
                <div className="bg-gradient-to-br from-primary/10 to-secondary/10 p-6 rounded-2xl text-center">
                  <div className="text-2xl font-bold font-nohemi text-primary mb-2">∞</div>
                  <div className="text-sm text-muted-foreground font-uncut">Custom Reports</div>
                </div>
              </AnimationContainer>
            </div>
          </div>
        </Wrapper>
      </section>

      {/* CTA Section */}
      <section className="py-20 lg:py-32 bg-gradient-to-r from-primary/10 to-accent/10">
        <Wrapper>
          <div className="text-center">
            <AnimationContainer animation="fadeUp" delay={0.1}>
              <h2 className="text-3xl md:text-4xl font-bold font-nohemi mb-6">
                Start Optimizing Your Time Today
              </h2>
            </AnimationContainer>
            <AnimationContainer animation="fadeUp" delay={0.2}>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto font-uncut mb-8">
                Join thousands of professionals who have transformed their productivity with Flowtim's time analytics.
              </p>
            </AnimationContainer>
            <AnimationContainer animation="fadeUp" delay={0.3}>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-primary hover:bg-primary/90">
                  Start Free Trial
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
                <Button size="lg" variant="outline">
                  Schedule Demo
                </Button>
              </div>
            </AnimationContainer>
          </div>
        </Wrapper>
      </section>
    </div>
  );
};

export default TimeAnalytics;