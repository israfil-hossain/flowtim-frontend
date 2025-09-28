import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Users,
  MessageSquare,
  Share2,
  Video,
  ArrowRight,
  Play,
  CheckCircle2,
  Heart,
  Zap,
} from "lucide-react";
import AnimationContainer from "@/components/global/animation-container";
import Wrapper from "@/components/global/wrapper";
import SectionBadge from "@/components/ui/section-badge";
import LandingHeader from "@/components/navigation/landing-header";
import AnimatedSectionBadge from "@/components/ui/animated-section-badge";

const FEATURES = [
  {
    icon: MessageSquare,
    title: "Real-time Communication",
    description:
      "Instant messaging and threaded conversations for seamless team communication",
    details: [
      "Team and direct messaging",
      "Threaded conversations",
      "File sharing in chat",
      "@mentions and notifications",
    ],
  },
  {
    icon: Users,
    title: "Team Management",
    description:
      "Organize teams, assign roles, and manage permissions effectively",
    details: [
      "Role-based permissions",
      "Team hierarchies",
      "Resource allocation",
      "Workload balancing",
    ],
  },
  {
    icon: Share2,
    title: "File Collaboration",
    description: "Share, edit, and collaborate on documents in real-time",
    details: [
      "Real-time document editing",
      "Version control",
      "Comment and review system",
      "Cloud storage integration",
    ],
  },
  {
    icon: Video,
    title: "Virtual Meetings",
    description:
      "Integrated video calls and screen sharing for remote collaboration",
    details: [
      "HD video conferencing",
      "Screen sharing",
      "Meeting recordings",
      "Calendar integration",
    ],
  },
];

const COLLABORATION_BENEFITS = [
  {
    icon: Zap,
    title: "Faster Decision Making",
    description:
      "Real-time communication reduces delays and accelerates project decisions",
    metric: "40% faster",
  },
  {
    icon: Heart,
    title: "Better Team Engagement",
    description:
      "Collaborative tools increase team satisfaction and participation",
    metric: "85% satisfaction",
  },
  {
    icon: Users,
    title: "Improved Coordination",
    description:
      "Centralized communication prevents miscommunication and duplicated work",
    metric: "60% less confusion",
  },
];

const INTEGRATION_FEATURES = [
  "Slack & Microsoft Teams",
  "Google Workspace",
  "Zoom & WebEx",
  "Dropbox & OneDrive",
  "GitHub & GitLab",
  "Jira & Trello",
];

const TeamCollaboration = () => {
  return (
    <div className="min-h-screen">
      {/* Reusable Header */}
      <LandingHeader />

      {/* Hero Section */}
      <section className="py-20 lg:py-32 bg-gradient-to-b from-background to-muted/20">
        <Wrapper>
          <div className="text-center mx-auto">
            <AnimatedSectionBadge title="Team & Collaboration" />

            <AnimationContainer animation="fadeUp" delay={0.2}>
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold font-nohemi mt-6 mb-6">
                <span className="text-foreground">Unite Your Team</span>
                <br />
                <span className="primary-gradient">Amplify Results</span>
              </h1>
            </AnimationContainer>

            <AnimationContainer animation="fadeUp" delay={0.3}>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto font-uncut leading-relaxed">
                Break down communication barriers and foster seamless
                collaboration with integrated tools designed for modern
                distributed teams.
              </p>
            </AnimationContainer>

            <AnimationContainer animation="fadeUp" delay={0.4}>
              <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
                <Button size="lg" className="bg-primary hover:bg-primary/90">
                  Start Collaborating
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
                <Button size="lg" variant="outline">
                  <Play className="h-4 w-4 mr-2" />
                  Watch Team Demo
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
                Complete Collaboration Suite
              </h2>
            </AnimationContainer>
            <AnimationContainer animation="fadeUp" delay={0.2}>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto font-uncut">
                Everything your team needs to communicate, collaborate, and
                create together.
              </p>
            </AnimationContainer>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {FEATURES.map((feature, index) => (
              <AnimationContainer
                key={index}
                animation="fadeUp"
                delay={0.3 + index * 0.1}
              >
                <div className="bg-background border border-border rounded-2xl p-8 hover:shadow-lg transition-all duration-300">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="p-3 rounded-xl bg-primary/10">
                      <feature.icon className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold font-nohemi">
                        {feature.title}
                      </h3>
                      <p className="text-muted-foreground font-uncut">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                  <ul className="space-y-3">
                    {feature.details.map((detail, idx) => (
                      <li key={idx} className="flex items-center gap-3">
                        <CheckCircle2 className="h-4 w-4 text-primary flex-shrink-0" />
                        <span className="text-sm text-muted-foreground font-uncut">
                          {detail}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </AnimationContainer>
            ))}
          </div>
        </Wrapper>
      </section>

      {/* Collaboration Dashboard */}
      <section className="py-20 lg:py-32 bg-muted/20">
        <Wrapper>
          <div className="text-center mb-16">
            <AnimationContainer animation="fadeUp" delay={0.1}>
              <h2 className="text-3xl md:text-4xl font-bold font-nohemi mb-4">
                See Collaboration in Action
              </h2>
            </AnimationContainer>
            <AnimationContainer animation="fadeUp" delay={0.2}>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto font-uncut">
                Experience how our integrated collaboration tools bring teams
                together.
              </p>
            </AnimationContainer>
          </div>

          <AnimationContainer animation="fadeUp" delay={0.3}>
            <div className="relative max-w-6xl mx-auto">
              <div className="absolute top-1/4 left-1/2 -z-10 bg-gradient-to-r from-primary/20 to-accent/20 w-3/4 h-1/2 -translate-x-1/2 -translate-y-1/2 blur-[4rem]"></div>

              <div className="relative rounded-2xl border border-border bg-background/50 backdrop-blur-sm p-4 shadow-2xl">
                <img
                  src="/images/dashboard.png"
                  alt="Team Collaboration Dashboard"
                  className="w-full rounded-xl"
                  width={1200}
                  height={800}
                />

                {/* Floating Collaboration Elements */}
                <div className="absolute top-6 right-6 bg-background/90 backdrop-blur-sm border border-border rounded-lg p-3 shadow-lg">
                  <div className="flex items-center gap-2">
                    <div className="flex -space-x-1">
                      <div className="h-6 w-6 rounded-full bg-primary border-2 border-background"></div>
                      <div className="h-6 w-6 rounded-full bg-accent border-2 border-background"></div>
                      <div className="h-6 w-6 rounded-full bg-secondary border-2 border-background"></div>
                    </div>
                    <span className="text-xs font-medium">
                      3 active collaborators
                    </span>
                  </div>
                </div>

                <div className="absolute bottom-6 left-6 bg-background/90 backdrop-blur-sm border border-border rounded-lg p-3 shadow-lg">
                  <div className="flex items-center gap-2">
                    <MessageSquare className="h-4 w-4 text-primary" />
                    <span className="text-xs font-medium">12 new messages</span>
                  </div>
                </div>

                <div className="absolute top-1/2 right-8 bg-background/90 backdrop-blur-sm border border-border rounded-lg p-3 shadow-lg">
                  <div className="flex items-center gap-2">
                    <div className="h-2 w-2 bg-green-500 rounded-full animate-pulse"></div>
                    <span className="text-xs font-medium">
                      Live collaboration
                    </span>
                  </div>
                </div>
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
                Transform Team Performance
              </h2>
            </AnimationContainer>
            <AnimationContainer animation="fadeUp" delay={0.2}>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto font-uncut">
                See the measurable impact of effective collaboration on your
                team's success.
              </p>
            </AnimationContainer>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {COLLABORATION_BENEFITS.map((benefit, index) => (
              <AnimationContainer
                key={index}
                animation="fadeUp"
                delay={0.3 + index * 0.1}
              >
                <div className="text-center p-8 rounded-2xl bg-gradient-to-b from-primary/5 to-accent/5 border border-border">
                  <div className="inline-flex items-center justify-center p-3 rounded-2xl bg-primary/10 mb-4">
                    <benefit.icon className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold font-nohemi mb-2">
                    {benefit.title}
                  </h3>
                  <p className="text-muted-foreground font-uncut mb-4">
                    {benefit.description}
                  </p>
                  <div className="text-2xl font-bold text-primary font-nohemi">
                    {benefit.metric}
                  </div>
                </div>
              </AnimationContainer>
            ))}
          </div>
        </Wrapper>
      </section>

      {/* Integrations Section */}
      <section className="py-20 lg:py-32 bg-muted/20">
        <Wrapper>
          <div className="text-center mb-16">
            <AnimationContainer animation="fadeUp" delay={0.1}>
              <h2 className="text-3xl md:text-4xl font-bold font-nohemi mb-4">
                Seamless Integrations
              </h2>
            </AnimationContainer>
            <AnimationContainer animation="fadeUp" delay={0.2}>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto font-uncut">
                Connect with your favorite tools and maintain your existing
                workflow.
              </p>
            </AnimationContainer>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {INTEGRATION_FEATURES.map((integration, index) => (
              <AnimationContainer
                key={index}
                animation="fadeUp"
                delay={0.3 + index * 0.05}
              >
                <div className="bg-background border border-border rounded-xl p-4 text-center hover:shadow-md transition-all duration-300">
                  <div className="text-sm font-medium font-uncut text-foreground">
                    {integration}
                  </div>
                </div>
              </AnimationContainer>
            ))}
          </div>

          <AnimationContainer animation="fadeUp" delay={0.8}>
            <div className="text-center mt-12">
              <p className="text-muted-foreground font-uncut mb-4">
                And many more integrations available
              </p>
              <Button variant="outline">
                View All Integrations
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </div>
          </AnimationContainer>
        </Wrapper>
      </section>

      {/* Team Size Section */}
      <section className="py-20 lg:py-32">
        <Wrapper>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <AnimationContainer animation="fadeUp" delay={0.1}>
                <h2 className="text-3xl md:text-4xl font-bold font-nohemi mb-6">
                  Built for Teams of All Sizes
                </h2>
              </AnimationContainer>
              <AnimationContainer animation="fadeUp" delay={0.2}>
                <p className="text-lg text-muted-foreground font-uncut mb-8">
                  Whether you're a small startup or a large enterprise, Flowtim
                  scales with your team's collaboration needs.
                </p>
              </AnimationContainer>

              <div className="space-y-6">
                <AnimationContainer animation="fadeUp" delay={0.3}>
                  <div className="flex items-start gap-4">
                    <div className="p-2 rounded-lg bg-primary/10 mt-1">
                      <Users className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium font-nohemi mb-1">
                        Small Teams (2-10)
                      </h3>
                      <p className="text-sm text-muted-foreground font-uncut">
                        Perfect for startups and small projects with essential
                        collaboration features.
                      </p>
                    </div>
                  </div>
                </AnimationContainer>

                <AnimationContainer animation="fadeUp" delay={0.4}>
                  <div className="flex items-start gap-4">
                    <div className="p-2 rounded-lg bg-primary/10 mt-1">
                      <Users className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium font-nohemi mb-1">
                        Medium Teams (10-100)
                      </h3>
                      <p className="text-sm text-muted-foreground font-uncut">
                        Advanced features for growing teams with complex project
                        requirements.
                      </p>
                    </div>
                  </div>
                </AnimationContainer>

                <AnimationContainer animation="fadeUp" delay={0.5}>
                  <div className="flex items-start gap-4">
                    <div className="p-2 rounded-lg bg-primary/10 mt-1">
                      <Users className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium font-nohemi mb-1">
                        Enterprise (100+)
                      </h3>
                      <p className="text-sm text-muted-foreground font-uncut">
                        Enterprise-grade security and administration for large
                        organizations.
                      </p>
                    </div>
                  </div>
                </AnimationContainer>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <AnimationContainer animation="fadeUp" delay={0.3}>
                <div className="bg-gradient-to-br from-primary/10 to-accent/10 p-6 rounded-2xl text-center">
                  <div className="text-3xl font-bold font-nohemi text-primary mb-2">
                    11k+
                  </div>
                  <div className="text-sm text-muted-foreground font-uncut">
                    Active Teams
                  </div>
                </div>
              </AnimationContainer>
              <AnimationContainer animation="fadeUp" delay={0.4}>
                <div className="bg-gradient-to-br from-accent/10 to-secondary/10 p-6 rounded-2xl text-center">
                  <div className="text-3xl font-bold font-nohemi text-primary mb-2">
                    500k+
                  </div>
                  <div className="text-sm text-muted-foreground font-uncut">
                    Messages Sent
                  </div>
                </div>
              </AnimationContainer>
              <AnimationContainer animation="fadeUp" delay={0.5}>
                <div className="bg-gradient-to-br from-secondary/10 to-primary/10 p-6 rounded-2xl text-center">
                  <div className="text-3xl font-bold font-nohemi text-primary mb-2">
                    99.9%
                  </div>
                  <div className="text-sm text-muted-foreground font-uncut">
                    Uptime
                  </div>
                </div>
              </AnimationContainer>
              <AnimationContainer animation="fadeUp" delay={0.6}>
                <div className="bg-gradient-to-br from-primary/10 to-secondary/10 p-6 rounded-2xl text-center">
                  <div className="text-3xl font-bold font-nohemi text-primary mb-2">
                    24/7
                  </div>
                  <div className="text-sm text-muted-foreground font-uncut">
                    Support
                  </div>
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
                Ready to Transform Team Collaboration?
              </h2>
            </AnimationContainer>
            <AnimationContainer animation="fadeUp" delay={0.2}>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto font-uncut mb-8">
                Join thousands of teams who have revolutionized their
                collaboration with Flowtim.
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

export default TeamCollaboration;
