import AnimationContainer from "@/components/global/animation-container";
import Wrapper from "@/components/global/wrapper";
import { Button } from "@/components/ui/button";
import SectionBadge from "@/components/ui/section-badge";
import { 
  Calendar,
  BarChart3,
  Users,
  Clock,
  Zap,
  CheckCircle,
  ArrowRight
} from "lucide-react";

const FEATURES = [
  {
    id: 1,
    icon: Calendar,
    title: "Smart Project Planning",
    description: "Plan and organize projects with intelligent scheduling, milestone tracking, and dependency management.",
    image: "/images/dashboard.png",
    features: ["Gantt Charts", "Timeline View", "Milestone Tracking", "Auto-scheduling"],
    reverse: false
  },
  {
    id: 2,
    icon: BarChart3,
    title: "Real-time Analytics",
    description: "Get instant insights into project progress, team performance, and resource utilization with powerful analytics.",
    image: "/images/dashboard.png",
    features: ["Performance Metrics", "Custom Reports", "Progress Tracking", "Data Visualization"],
    reverse: true
  },
  {
    id: 3,
    icon: Users,
    title: "Team Collaboration",
    description: "Enable seamless teamwork with real-time communication, file sharing, and collaborative workspaces.",
    image: "/images/dashboard.png",
    features: ["Real-time Chat", "File Sharing", "Team Workspaces", "Activity Feeds"],
    reverse: false
  },
  {
    id: 4,
    icon: Clock,
    title: "Time Management",
    description: "Track time efficiently with automated logging, detailed timesheets, and productivity insights.",
    image: "/images/dashboard.png",
    features: ["Time Tracking", "Automated Logging", "Productivity Reports", "Billing Integration"],
    reverse: true
  }
];

const FeatureShowcase = () => {
  return (
    <Wrapper className="py-20 lg:py-32">
      <div className="flex flex-col items-center text-center gap-6 mb-16">
        <AnimationContainer animation="fadeUp" delay={0.1}>
          <SectionBadge title="Features" />
        </AnimationContainer>

        <AnimationContainer animation="fadeUp" delay={0.2}>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold font-nohemi !leading-tight primary-gradient">
            Everything you need to
            <br />
            <span className="text-foreground">manage projects effectively</span>
          </h2>
        </AnimationContainer>

        <AnimationContainer animation="fadeUp" delay={0.3}>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto font-uncut">
            Powerful features designed to streamline your workflow and boost team productivity.
          </p>
        </AnimationContainer>
      </div>

      <div className="space-y-24">
        {FEATURES.map((feature, index) => (
          <AnimationContainer key={feature.id} animation="fadeUp" delay={0.4 + (index * 0.1)}>
            <div className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${feature.reverse ? 'lg:grid-flow-col-dense' : ''}`}>
              {/* Content */}
              <div className={`space-y-6 ${feature.reverse ? 'lg:col-start-2' : ''}`}>
                <AnimationContainer animation="fadeUp" delay={0.5 + (index * 0.1)}>
                  <div className="inline-flex items-center justify-center p-3 rounded-2xl bg-primary/10">
                    <feature.icon className="h-8 w-8 text-primary" />
                  </div>
                </AnimationContainer>

                <AnimationContainer animation="fadeUp" delay={0.6 + (index * 0.1)}>
                  <h3 className="text-2xl md:text-3xl font-bold font-nohemi text-foreground">
                    {feature.title}
                  </h3>
                </AnimationContainer>

                <AnimationContainer animation="fadeUp" delay={0.7 + (index * 0.1)}>
                  <p className="text-lg text-muted-foreground font-uncut leading-relaxed">
                    {feature.description}
                  </p>
                </AnimationContainer>

                <AnimationContainer animation="fadeUp" delay={0.8 + (index * 0.1)}>
                  <div className="grid grid-cols-2 gap-3">
                    {feature.features.map((item, idx) => (
                      <div key={idx} className="flex items-center space-x-2">
                        <CheckCircle className="h-4 w-4 text-primary flex-shrink-0" />
                        <span className="text-sm text-muted-foreground font-uncut">{item}</span>
                      </div>
                    ))}
                  </div>
                </AnimationContainer>

                <AnimationContainer animation="fadeUp" delay={0.9 + (index * 0.1)}>
                  <Button className="group bg-primary hover:bg-primary/90">
                    Learn More
                    <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </AnimationContainer>
              </div>

              {/* Image */}
              <div className={`${feature.reverse ? 'lg:col-start-1' : ''}`}>
                <AnimationContainer 
                  animation={feature.reverse ? "fadeLeft" : "fadeRight"} 
                  delay={0.6 + (index * 0.1)}
                >
                  <div className="relative group">
                    {/* Glow Effect */}
                    <div className="absolute -inset-4 bg-gradient-to-r from-primary/20 to-accent/20 rounded-3xl blur-2xl opacity-50 group-hover:opacity-70 transition-opacity duration-500"></div>
                    
                    {/* Image Container */}
                    <div className="relative rounded-2xl border border-border bg-background/50 backdrop-blur-sm p-4 lg:p-6">
                      <div className="rounded-xl overflow-hidden">
                        <img
                          src={feature.image}
                          alt={feature.title}
                          className="w-full h-auto object-cover transform group-hover:scale-105 transition-transform duration-500"
                          width={600}
                          height={400}
                        />
                      </div>
                      
                      {/* Floating Elements */}
                      <div className="absolute top-8 right-8 bg-background/80 backdrop-blur-sm border border-border rounded-xl p-3 shadow-lg">
                        <feature.icon className="h-6 w-6 text-primary" />
                      </div>
                      
                      {/* Status Indicator */}
                      <div className="absolute bottom-8 left-8 bg-background/80 backdrop-blur-sm border border-border rounded-full px-4 py-2 shadow-lg">
                        <div className="flex items-center space-x-2">
                          <div className="h-2 w-2 bg-green-500 rounded-full animate-pulse"></div>
                          <span className="text-xs font-medium text-foreground">Live Preview</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </AnimationContainer>
              </div>
            </div>
          </AnimationContainer>
        ))}
      </div>

      {/* Bottom CTA */}
      <AnimationContainer animation="fadeUp" delay={0.8}>
        <div className="text-center mt-20 p-8 rounded-3xl bg-gradient-to-r from-primary/5 to-accent/5 border border-border">
          <h3 className="text-xl md:text-2xl font-bold font-nohemi mb-4">
            Ready to transform your project management?
          </h3>
          <p className="text-muted-foreground mb-6 font-uncut">
            Join thousands of teams already using Flowtim to boost their productivity.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-primary hover:bg-primary/90">
              Start Free Trial
              <Zap className="h-4 w-4 ml-2" />
            </Button>
            <Button size="lg" variant="outline">
              Schedule Demo
              <Calendar className="h-4 w-4 ml-2" />
            </Button>
          </div>
        </div>
      </AnimationContainer>
    </Wrapper>
  );
};

export default FeatureShowcase;