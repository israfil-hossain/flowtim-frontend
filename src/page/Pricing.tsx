import { Button } from "@/components/ui/button";
import { 
  Check,
  Star,
  ArrowRight,
  Users,
  Shield,
  Headphones,
  Zap
} from "lucide-react";
import AnimationContainer from "@/components/global/animation-container";
import Wrapper from "@/components/global/wrapper";
import LandingHeader from "@/components/navigation/landing-header";
import AnimatedSectionBadge from "@/components/ui/animated-section-badge";
import { useState } from "react";

const PRICING_PLANS = [
  {
    name: "Starter",
    description: "Perfect for small teams getting started",
    monthlyPrice: 0,
    yearlyPrice: 0,
    popular: false,
    features: [
      "Up to 5 team members",
      "3 projects",
      "Basic task management",
      "Email support",
      "Mobile app access",
      "Basic reporting",
      "2GB storage"
    ],
    limitations: [
      "Limited integrations",
      "Basic analytics only"
    ],
    cta: "Get Started Free",
    highlight: "Most Popular for Small Teams"
  },
  {
    name: "Professional",
    description: "For growing teams that need more power",
    monthlyPrice: 12,
    yearlyPrice: 120,
    popular: true,
    features: [
      "Up to 25 team members",
      "Unlimited projects",
      "Advanced task management",
      "Priority email support",
      "All mobile features",
      "Advanced reporting",
      "50GB storage",
      "Time tracking",
      "Custom fields",
      "Team collaboration tools",
      "API access"
    ],
    limitations: [],
    cta: "Start Free Trial",
    highlight: "Most Popular Choice"
  },
  {
    name: "Enterprise",
    description: "For large organizations with complex needs",
    monthlyPrice: 24,
    yearlyPrice: 240,
    popular: false,
    features: [
      "Unlimited team members",
      "Unlimited projects",
      "Enterprise task management",
      "24/7 phone & email support",
      "White-label options",
      "Custom reporting",
      "Unlimited storage",
      "Advanced time tracking",
      "Custom integrations",
      "Advanced security",
      "Dedicated account manager",
      "Custom onboarding",
      "SSO integration",
      "Advanced permissions"
    ],
    limitations: [],
    cta: "Contact Sales",
    highlight: "Best for Large Teams"
  }
];

const ENTERPRISE_FEATURES = [
  {
    icon: Shield,
    title: "Enterprise Security",
    description: "SOC 2 compliance, SSO, and advanced security controls"
  },
  {
    icon: Headphones,
    title: "Priority Support",
    description: "24/7 dedicated support with guaranteed response times"
  },
  {
    icon: Users,
    title: "Unlimited Scale",
    description: "Support for unlimited users and projects"
  },
  {
    icon: Zap,
    title: "Custom Integrations",
    description: "Built-to-order integrations for your specific workflow"
  }
];

const FAQ_ITEMS = [
  {
    question: "Can I change my plan at any time?",
    answer: "Yes, you can upgrade or downgrade your plan at any time. Changes will be reflected in your next billing cycle."
  },
  {
    question: "What happens to my data if I cancel?",
    answer: "Your data remains accessible for 30 days after cancellation. You can export all your data during this period."
  },
  {
    question: "Do you offer discounts for non-profits?",
    answer: "Yes, we offer special pricing for qualified non-profit organizations. Contact our sales team for details."
  },
  {
    question: "Is there a free trial?",
    answer: "Yes, we offer a 14-day free trial for all paid plans. No credit card required to start."
  }
];

const Pricing = () => {
  const [isYearly, setIsYearly] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div className="min-h-screen">
      {/* Reusable Header */}
      <LandingHeader />

      {/* Hero Section */}
      <section className="py-20 lg:py-32 bg-gradient-to-b from-background to-muted/20">
        <Wrapper>
          <div className="text-center max-w-4xl mx-auto">
            <AnimatedSectionBadge title="Pricing Plans" />

            <AnimationContainer animation="fadeUp" delay={0.2}>
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold font-nohemi mt-6 mb-6">
                <span className="text-foreground">Choose the</span>
                <br />
                <span className="primary-gradient">Perfect Plan</span>
              </h1>
            </AnimationContainer>

            <AnimationContainer animation="fadeUp" delay={0.3}>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto font-uncut leading-relaxed">
                Start free and scale as you grow. All plans include our core features 
                with no hidden fees or surprise charges.
              </p>
            </AnimationContainer>

            {/* Billing Toggle */}
            <AnimationContainer animation="fadeUp" delay={0.4}>
              <div className="flex items-center justify-center gap-4 mt-8">
                <span className={`text-sm font-medium ${!isYearly ? 'text-foreground' : 'text-muted-foreground'}`}>
                  Monthly
                </span>
                <button
                  onClick={() => setIsYearly(!isYearly)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    isYearly ? 'bg-primary' : 'bg-muted'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-background transition-transform ${
                      isYearly ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
                <span className={`text-sm font-medium ${isYearly ? 'text-foreground' : 'text-muted-foreground'}`}>
                  Yearly
                </span>
                <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full font-medium">
                  Save 20%
                </span>
              </div>
            </AnimationContainer>
          </div>
        </Wrapper>
      </section>

      {/* Pricing Cards */}
      <section className="py-20 lg:py-32">
        <Wrapper>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {PRICING_PLANS.map((plan, index) => (
              <AnimationContainer key={index} animation="fadeUp" delay={0.2 + (index * 0.1)}>
                <div className={`relative bg-background border rounded-2xl p-8 ${
                  plan.popular 
                    ? 'border-primary shadow-lg scale-105 lg:scale-110' 
                    : 'border-border'
                }`}>
                  {plan.popular && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                      <div className="bg-primary text-white px-4 py-1 rounded-full text-sm font-medium flex items-center gap-1">
                        <Star className="h-3 w-3 fill-current" />
                        {plan.highlight}
                      </div>
                    </div>
                  )}

                  <div className="text-center mb-8">
                    <h3 className="text-2xl font-bold font-nohemi mb-2">{plan.name}</h3>
                    <p className="text-muted-foreground font-uncut mb-6">{plan.description}</p>
                    
                    <div className="mb-6">
                      <div className="flex items-baseline justify-center gap-1">
                        <span className="text-4xl font-bold font-nohemi">
                          ${isYearly ? plan.yearlyPrice / 12 : plan.monthlyPrice}
                        </span>
                        <span className="text-muted-foreground font-uncut">
                          /user/month
                        </span>
                      </div>
                      {isYearly && plan.yearlyPrice > 0 && (
                        <p className="text-sm text-muted-foreground mt-1">
                          Billed annually (${plan.yearlyPrice}/user/year)
                        </p>
                      )}
                      {plan.monthlyPrice === 0 && (
                        <p className="text-sm text-primary mt-1 font-medium">
                          Free forever
                        </p>
                      )}
                    </div>

                    <Button 
                      className={`w-full ${
                        plan.popular 
                          ? 'bg-primary hover:bg-primary/90' 
                          : plan.name === 'Enterprise'
                          ? 'bg-secondary hover:bg-secondary/90'
                          : 'bg-muted hover:bg-muted/80 text-foreground'
                      }`}
                    >
                      {plan.cta}
                      {plan.name !== 'Enterprise' && <ArrowRight className="h-4 w-4 ml-2" />}
                    </Button>
                  </div>

                  <div className="space-y-4">
                    <h4 className="font-medium font-nohemi">Everything in {plan.name}:</h4>
                    <ul className="space-y-3">
                      {plan.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start gap-3">
                          <Check className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                          <span className="text-sm text-muted-foreground font-uncut">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    
                    {plan.limitations.length > 0 && (
                      <div className="pt-4 border-t border-border">
                        <h5 className="text-sm font-medium text-muted-foreground mb-2">Limitations:</h5>
                        <ul className="space-y-1">
                          {plan.limitations.map((limitation, idx) => (
                            <li key={idx} className="text-xs text-muted-foreground font-uncut">
                              • {limitation}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              </AnimationContainer>
            ))}
          </div>

          {/* Trust Indicators */}
          <AnimationContainer animation="fadeUp" delay={0.6}>
            <div className="text-center mt-16 p-8 bg-muted/20 rounded-2xl border border-border">
              <div className="flex flex-col md:flex-row items-center justify-center gap-8">
                <div className="flex items-center gap-2">
                  <Check className="h-5 w-5 text-green-500" />
                  <span className="text-sm font-uncut">14-day free trial</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="h-5 w-5 text-green-500" />
                  <span className="text-sm font-uncut">No credit card required</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="h-5 w-5 text-green-500" />
                  <span className="text-sm font-uncut">Cancel anytime</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="h-5 w-5 text-green-500" />
                  <span className="text-sm font-uncut">24/7 support</span>
                </div>
              </div>
            </div>
          </AnimationContainer>
        </Wrapper>
      </section>

      {/* Enterprise Features */}
      <section className="py-20 lg:py-32 bg-muted/20">
        <Wrapper>
          <div className="text-center mb-16">
            <AnimationContainer animation="fadeUp" delay={0.1}>
              <h2 className="text-3xl md:text-4xl font-bold font-nohemi mb-4">
                Enterprise-Grade Features
              </h2>
            </AnimationContainer>
            <AnimationContainer animation="fadeUp" delay={0.2}>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto font-uncut">
                Advanced security, compliance, and support features for large organizations.
              </p>
            </AnimationContainer>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {ENTERPRISE_FEATURES.map((feature, index) => (
              <AnimationContainer key={index} animation="fadeUp" delay={0.3 + (index * 0.1)}>
                <div className="text-center p-6 bg-background border border-border rounded-2xl">
                  <div className="inline-flex items-center justify-center p-3 rounded-2xl bg-primary/10 mb-4">
                    <feature.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-bold font-nohemi mb-2">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground font-uncut">{feature.description}</p>
                </div>
              </AnimationContainer>
            ))}
          </div>
        </Wrapper>
      </section>

      {/* FAQ Section */}
      <section className="py-20 lg:py-32">
        <Wrapper>
          <div className="text-center mb-16">
            <AnimationContainer animation="fadeUp" delay={0.1}>
              <h2 className="text-3xl md:text-4xl font-bold font-nohemi mb-4">
                Frequently Asked Questions
              </h2>
            </AnimationContainer>
            <AnimationContainer animation="fadeUp" delay={0.2}>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto font-uncut">
                Have questions? We have answers. Can't find what you're looking for? Contact our support team.
              </p>
            </AnimationContainer>
          </div>

          <div className="max-w-3xl mx-auto space-y-4">
            {FAQ_ITEMS.map((item, index) => (
              <AnimationContainer key={index} animation="fadeUp" delay={0.3 + (index * 0.1)}>
                <div className="border border-border rounded-xl overflow-hidden">
                  <button
                    onClick={() => setOpenFaq(openFaq === index ? null : index)}
                    className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-muted/20 transition-colors"
                  >
                    <span className="font-medium font-nohemi">{item.question}</span>
                    <ArrowRight 
                      className={`h-4 w-4 transition-transform ${
                        openFaq === index ? 'rotate-90' : ''
                      }`} 
                    />
                  </button>
                  {openFaq === index && (
                    <div className="px-6 pb-4 border-t border-border bg-muted/10">
                      <p className="text-muted-foreground font-uncut pt-4">{item.answer}</p>
                    </div>
                  )}
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
                Ready to Get Started?
              </h2>
            </AnimationContainer>
            <AnimationContainer animation="fadeUp" delay={0.2}>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto font-uncut mb-8">
                Join thousands of teams who have transformed their productivity with Flowtim.
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

export default Pricing;