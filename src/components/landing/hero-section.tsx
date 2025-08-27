// import { PhoneIcon } from "lucide-react";
import Container from "../global/container";
import { OrbitingCircles } from "./ui/orbiting-circles";
import Icons from "../global/icons";
import { Link } from "react-router-dom";
import { AnimatedTooltip } from "../ui/animated-tooltip";
import { People } from "@/constant/people";
import { Boxes } from "../ui/background-boxes";

function Hero() {
  return (
    <section
      id="home"
      className="relative w-full h-fit py-16 overflow-hidden"
    >
      {/* <img
        className="absolute top-0 left-0 w-full h-auto bg-white/50"
        src="/images/noise-background.png"
        alt="shape"
        width={1200}
        height={800}
      /> */}
      <Boxes />
      <Container className="relative lg:block overflow-hidden mb-5">
        <button className="group relative grid overflow-hidden rounded-full px-2 py-1 shadow-[0_1000px_0_0_hsl(0_0%_15%)_inset] transition-colors duration-200 mx-auto">
          <span>
            <span className="spark mask-gradient absolute inset-0 h-[100%] w-[100%] animate-flip overflow-hidden rounded-full [mask:linear-gradient(blue,_transparent_90%)] before:absolute before:aspect-square before:w-[200%] before:rotate-[-90deg] before:animate-rotate before:bg-[conic-gradient(from_0deg,transparent_0_340deg,white_360deg)] before:content-[''] before:[inset:0_auto_auto_50%] before:[translate:-50%_-15%]" />
          </span>
          <span className="backdrop absolute inset-[1px] rounded-full bg-background transition-colors duration-200 group-hover:bg-indigo-100" />
          <span className="z-10 py-0.5 text-sm text-indigo-900 flex items-center">
            <span className="px-2 py-[0.5px] h-[18px] tracking-wide flex items-center justify-center rounded-full bg-gradient-to-r from-sky-400 to-blue-700 text-[9px] font-medium mr-2 text-white font-nohemi">
              NEW
            </span>
            Explore the flowtim
          </span>
        </button>
      </Container>
      <div className="flex flex-row items-center justify-center mt-8 w-full sticky">
        <AnimatedTooltip items={People} />{" "}
        <p className="font-nohemi text-sm font-normal text-primary ml-5">
          <span className="font-bold text-md">1k+</span> People Join with Us
        </p>
      </div>

      <div className="flex flex-col items-center justify-center gap-y-8 relative">
        <Container className="flex absolute inset-0 top-1 mb-auto flex-col items-center justify-center w-full min-h-screen -z-10">
          <OrbitingCircles speed={0.5} radius={300}>
            <Icons.circle1 className="size-4 text-primary/70" />
            <Icons.circle2 className="size-1 text-primary/80" />
          </OrbitingCircles>
          <OrbitingCircles speed={0.25} radius={400}>
            <Icons.circle2 className="size-1 text-primary/50" />
            <Icons.circle1 className="size-4 text-primary/60" />
            <Icons.circle2 className="size-1 text-primary/90" />
          </OrbitingCircles>
          <OrbitingCircles speed={0.1} radius={500}>
            <Icons.circle2 className="size-1 text-primary/50" />
            <Icons.circle2 className="size-1 text-primary/90" />
            <Icons.circle1 className="size-4 text-primary/60" />
            <Icons.circle2 className="size-1 text-primary/90" />
          </OrbitingCircles>
        </Container>
        <div className="flex flex-col items-center justify-center text-center gap-y-4 bg-background/0 mt-5">
          <Container delay={0.2}>
            <div className="max-w-3xl flex flex-col gap-6 mx-auto mt-8">
              <h1 className="font-medium text-4xl md:text-6xl lg:text-7xl text-primary text-center tracking-tighter">
                <span className="font-nohemi bold bg-gradient-to-r from-fuchsia-400 to-[#ee4a32] bg-clip-text text-transparent inline-block">
                  Manage Your Project
                </span>
                <br />
                <span className="font-uncut font-medium primary-gradient inline-block">
                  Efficiency with flowtim
                </span>
              </h1>
            </div>
          </Container>
          <Container delay={0.2}>
            <p className="max-w-xl mx-auto mt-2 text-base lg:text-lg text-center text-muted-foreground">
              Empower your team, simplify workflows, and achieve more with
              flowtim - the ultimate project management solution.
            </p>
          </Container>
          <Container delay={0.2} className="z-20 mt-8">
            <div className="flex items-center justify-center gap-5 mt-2 md:mt-6 lg:mt-6">
              <Link
                className="block py-2.5 px-5 rounded-full bg-primary/90 font-manrope text-base text-white"
                to="/sign-in"
                target="_blank"
              >
                + Join with Us
              </Link>

              {/* <Link
                to="/contact-us"
                className="flex items-center gap-2 py-2.5 px-5 rounded-full border font-medium font-manrope text-base text-neutral-700 hover:border-primary/90 hover:text-primary/90 duration-500"
              >
                <PhoneIcon size={16} />
               Free to Join
              </Link> */}
            </div>
          </Container>
          <Container delay={0.3} className="relative">
            <div className="relative rounded-xl lg:rounded-[32px] border border-border p-2 backdrop-blur-lg  max-w-6xl mx-auto">
              <div className="absolute top-1/8 left-1/2 -z-10 bg-gradient-to-r from-primary/50 to-primary/80 w-1/2 lg:w-3/4 -translate-x-1/2 h-1/4 -translate-y-1/2 inset-0 blur-[4rem] lg:blur-[10rem] animate-image-glow"></div>
              <div className="hidden lg:block absolute -top-1/8 left-1/2 -z-20 bg-blue-400 w-1/4 -translate-x-1/2 h-1/4 -translate-y-1/2 inset-0 blur-[10rem] animate-image-glow"></div>

              <div className="rounded-lg lg:rounded-[22px] border border-border bg-background w-full ">
                <img
                  src="/images/dashboard.png"
                  alt="dashboard"
                  width={1620}
                  height={1080}
                  className="rounded-lg lg:rounded-[20px]"
                />
              </div>
            </div>
            <div className="bg-gradient-to-t from-background to-transparent absolute bottom-0 inset-x-0 w-full h-80"></div>
          </Container>
        </div>
      </div>
      {/* </div> */}
    </section>
  );
}

export default Hero;
