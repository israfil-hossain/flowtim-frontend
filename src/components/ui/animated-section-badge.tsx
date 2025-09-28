/**
 * Reusable Animated Section Badge Component
 * Used across feature pages for consistent section headers
 */

import AnimationContainer from "@/components/global/animation-container";
import SectionBadge from "@/components/ui/section-badge";

interface AnimatedSectionBadgeProps {
  title: string;
  delay?: number;
  className?: string;
}

const AnimatedSectionBadge = ({ 
  title, 
  delay = 0.1, 
  className = "" 
}: AnimatedSectionBadgeProps) => {
  return (
    <div className={`w-full items-center justify-center flex ${className}`}>
      <AnimationContainer animation="fadeUp" delay={delay} className="px-4 py-2">
        <SectionBadge title={title} />
      </AnimationContainer>
    </div>
  );
};

export default AnimatedSectionBadge;