import Wrapper from '@/components/global/wrapper';
import { Star } from 'lucide-react'
import AnimationContainer from '@/components/global/animation-container';
import SectionBadge from '@/components/ui/section-badge';
import { TESTIMONIALS } from '@/constant';
import Marquee from '@/components/ui/marquee';

const Testimonials = () => {
    return (
        <Wrapper className="py-16 lg:py-16">
            <div className="flex flex-col items-center text-center gap-4 mb-16">
                <AnimationContainer animation="fadeUp" delay={0.2}>
                    <SectionBadge title="Testimonials" />
                </AnimationContainer>

                <AnimationContainer animation="fadeUp" delay={0.3}>
                    <h2 className="text-3xl font-nohemi md:text-4xl lg:text-5xl font-bold !leading-tight">
                        <span className="text-foreground">Trusted by</span>
                        <br />
                        <span className="primary-gradient">thousands of teams</span>
                        <br />
                        <span className="text-foreground">worldwide</span>
                    </h2>
                </AnimationContainer>

                <AnimationContainer animation="fadeUp" delay={0.4}>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto font-uncut leading-relaxed">
                        See what project managers and teams have to say about their experience with Flowtim.
                    </p>
                </AnimationContainer>
            </div>

            <AnimationContainer animation="fadeUp" delay={0.5}>
                <div className="relative">
                    <div className="absolute -left-1 top-0 w-20 h-full bg-gradient-to-r from-[#f1f1f1] to-transparent z-10" />
                    <div className="absolute -right-1 top-0 w-20 h-full bg-gradient-to-l from-[#f1f1f1] to-transparent z-10" />

                    <Marquee className="[--gap:1.5rem]" pauseOnHover>
                        {TESTIMONIALS.map((testimonial, index) => (
                            <AnimationContainer
                                key={index}
                                animation="fadeUp"
                                delay={0.6 + (index * 0.1)}
                            >
                                <div className="flex-shrink-0 w-[400px] bg-background/80 backdrop-blur-sm border border-border rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300">
                                    <div className="flex flex-col gap-6">
                                        {/* Rating Stars */}
                                        <AnimationContainer animation="fadeUp" delay={0.7 + (index * 0.1)}>
                                            <div className="flex gap-1">
                                                {[...Array(testimonial.rating)].map((_, i) => (
                                                    <Star
                                                        key={i}
                                                        className="w-4 h-4 fill-primary text-primary"
                                                    />
                                                ))}
                                            </div>
                                        </AnimationContainer>

                                        {/* Testimonial Content */}
                                        <AnimationContainer animation="fadeUp" delay={0.8 + (index * 0.1)}>
                                            <p className="text-base font-uncut leading-relaxed text-foreground">
                                                "{testimonial.content}"
                                            </p>
                                        </AnimationContainer>

                                        {/* Author Info */}
                                        <AnimationContainer animation="fadeRight" delay={0.9 + (index * 0.1)}>
                                            <div className="flex items-center gap-4 pt-4 border-t border-border">
                                                <div className="relative w-12 h-12 rounded-full overflow-hidden ring-2 ring-primary/20">
                                                    <img
                                                        src={testimonial.image}
                                                        alt={testimonial.author}
                                                        className="w-full h-full object-cover"
                                                    />
                                                </div>
                                                <div>
                                                    <h4 className="font-medium font-nohemi text-foreground">
                                                        {testimonial.author}
                                                    </h4>
                                                    <p className="text-sm text-muted-foreground font-uncut">
                                                        {testimonial.role}
                                                    </p>
                                                    {testimonial.company && (
                                                        <p className="text-xs text-primary font-uncut">
                                                            {testimonial.company}
                                                        </p>
                                                    )}
                                                </div>
                                            </div>
                                        </AnimationContainer>
                                    </div>
                                </div>
                            </AnimationContainer>
                        ))}
                    </Marquee>
                </div>
            </AnimationContainer>
        </Wrapper>
    );
};

export default Testimonials;
