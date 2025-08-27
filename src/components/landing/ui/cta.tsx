import AnimationContainer from "@/components/global/animation-container";
import Wrapper from "@/components/global/wrapper";
import { Button } from "@/components/ui/button";
import { FlickeringGrid } from "@/components/ui/flickering-grid";
import SectionBadge from "@/components/ui/section-badge";
import { ArrowRightIcon } from "lucide-react";
import { Link } from "react-router-dom";

const HIGHLIGHTS = [
  {
    icon: "/icons/shield.svg",
    label: "Secure Platform",
  },
  {
    icon: "/icons/clock.svg",
    label: "Real-time Updates",
  },
  {
    icon: "/icons/magicpen.svg",
    label: "Smart Features",
  },
];

const CTA = () => {
  return (
    <Wrapper className="py-20 lg:py-32">
      <div className="flex flex-col items-center text-center relative gap-4 py-20 lg:py-32 overflow-hidden z-0 rounded-2xl bg-gradient-to-b from-[#1A2A80] via-[#3B38A0] to-[#7A85C1]">
        {/* 🔵 Background flicker effect */}
        <AnimationContainer animation="scaleUp" delay={0.2}>
          <FlickeringGrid
            className="absolute inset-0 -z-10 h-full w-full"
            squareSize={4}
            gridGap={6}
            color="#B2B0E8"
            maxOpacity={0.15}
            flickerChance={0.08}
            height={800}
          />
        </AnimationContainer>

        {/* 🔵 Top gradient line */}
        <AnimationContainer animation="scaleUp" delay={0.3}>
          <div className="absolute top-0 w-4/5 mx-auto inset-x-0 h-px bg-gradient-to-r from-[#B2B0E8]/0 via-[#B2B0E8]/70 to-[#B2B0E8]/0"></div>
        </AnimationContainer>

        <div className="flex flex-col items-center justify-center w-full z-30">
          {/* Badge */}
          <AnimationContainer animation="fadeUp" delay={0.3}>
            <SectionBadge title="Start now" />
          </AnimationContainer>

          {/* Heading */}
          <AnimationContainer animation="fadeUp" delay={0.4}>
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-medium !leading-tight text-transparent bg-clip-text bg-gradient-to-b from-white to-[#B2B0E8]">
              Ready to get started?
            </h2>
          </AnimationContainer>

          {/* Subtext */}
          <AnimationContainer animation="fadeUp" delay={0.5}>
            <p className="text-sm md:text-base lg:text-lg text-[#E5E5F7] max-w-lg mx-auto mt-4">
              Sign up for a free trial and see how PropEase can help you manage
              your projects efficiently.
            </p>
          </AnimationContainer>

          {/* Highlights */}
          <AnimationContainer animation="fadeUp" delay={0.6}>
            <div className="flex items-center mt-6">
              <div className="rounded-full px-5 py-3 bg-white/10 backdrop-blur-md flex flex-wrap md:flex-row items-center justify-center gap-4 border border-white/20">
                {HIGHLIGHTS.map((item, index) => (
                  <AnimationContainer
                    key={index}
                    animation="fadeRight"
                    delay={0.7 + index * 0.1}
                  >
                    <div className="flex items-center gap-2 last:hidden md:last:flex">
                      <img
                        src={item.icon}
                        alt={item.label}
                        className="size-5"
                      />
                      <span className="text-sm text-white">
                        {item.label}
                      </span>
                    </div>
                  </AnimationContainer>
                ))}
              </div>
            </div>
          </AnimationContainer>

          {/* CTA Button */}
          <AnimationContainer animation="fadeUp" delay={1}>
            <Link to="/sign-in">
              <Button
                size="lg"
                className="mt-8 bg-[#B2B0E8] text-[#1A2A80] hover:bg-[#7A85C1] transition-all duration-300"
              >
                Start now
                <ArrowRightIcon className="size-4 ml-2" />
              </Button>
            </Link>
          </AnimationContainer>
        </div>
      </div>
    </Wrapper>
  );
};

export default CTA;
