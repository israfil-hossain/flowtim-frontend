import AnimationContainer from "@/components/global/animation-container";
import Wrapper from "@/components/global/wrapper";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import SectionBadge from "@/components/ui/section-badge";
import { FAQS } from "@/constant/faq";

const FAQ = () => {
  return (
    <Wrapper className="py-20 lg:py-32">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
        {/* ✅ Left side text */}
        <div className="flex flex-col items-center lg:items-start text-center lg:text-left gap-4">
          <AnimationContainer animation="fadeUp" delay={0.2}>
            <SectionBadge title="FAQ" />
          </AnimationContainer>

          <AnimationContainer animation="fadeUp" delay={0.3}>
            <h2 className="text-2xl md:text-4xl lg:text-6xl font-medium !leading-tight font-nohemi black-gradient">
              Frequently
              <br /> Asked <br />
              Question ?
            </h2>
          </AnimationContainer>

          <AnimationContainer animation="fadeUp" delay={0.4}>
            <p className="text-sm md:text-base lg:text-lg text-muted-foreground max-w-xl mx-auto lg:mx-0">
              Find answers to common questions about our flowtim
            </p>
          </AnimationContainer>
        </div>

        {/* ✅ Right side accordion */}
        <div className="w-full max-w-xl mx-auto lg:mx-0">
          <Accordion
            type="single"
            collapsible
            className="w-full space-y-4"
          >
            {FAQS.map((item, index) => (
              <AnimationContainer
                key={index}
                animation="fadeUp"
                delay={0.2 + index * 0.2}
              >
                <AccordionItem
                  value={`item-${index}`}
                  className="border-b  px-4"
                >
                  <AccordionTrigger className="hover:no-underline py-4 text-base md:text-lg text-left font-medium">
                    {item.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground text-left pb-4">
                    {item.answer}
                  </AccordionContent>
                </AccordionItem>
              </AnimationContainer>
            ))}
          </Accordion>
        </div>
      </div>
    </Wrapper>
  );
};

export default FAQ;
