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
                    <h2 className="text-2xl font-nohemi md:text-4xl lg:text-5xl font-medium !leading-tight black-gradient ">
                       Voices of Satisfaction What
                        <br />
                        Our Clients Say
                    </h2>
                </AnimationContainer>

                <AnimationContainer animation="fadeUp" delay={0.4}>
                    <p className="text-sm md:text-base lg:text-lg text-muted-foreground max-w-2xl mx-auto font-uncut">
                        Elevate your experience with a suite of unparalleled and contemporary features designed to streamline your workflow and enhance productivity.
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
                                <div
                                    className="flex-shrink-0 w-[400px] rounded-3xl  backdrop-blur-3xl p-8"
                                >
                                    <div className="flex flex-col gap-6">
                                        <AnimationContainer animation="fadeRight" delay={0.7 + (index * 0.1)}>
                                            <div className="flex items-center gap-4">
                                                <div className="relative w-12 h-12 rounded-full overflow-hidden">
                                                    <img
                                                        src={testimonial.image}
                                                        alt={testimonial.author}
                                                        className="object-cover"
                                                    />
                                                </div>
                                                <div>
                                                    <h4 className="font-medium">
                                                        {testimonial.author}
                                                    </h4>
                                                    <p className="text-sm text-muted-foreground">
                                                        {testimonial.role}
                                                    </p>
                                                </div>
                                            </div>
                                        </AnimationContainer>

                                        <AnimationContainer animation="fadeUp" delay={0.8 + (index * 0.1)}>
                                            <p className="text-lg">
                                                "{testimonial.content}"
                                            </p>
                                        </AnimationContainer>

                                        <AnimationContainer animation="fadeUp" delay={0.9 + (index * 0.1)}>
                                            <div className="flex gap-1">
                                                {[...Array(testimonial.rating)].map((_, i) => (
                                                    <Star
                                                        key={i}
                                                        className="w-5 h-5 fill-primary text-primary"
                                                    />
                                                ))}
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
