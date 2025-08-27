"use client";

import Marquee from "@/components/ui/marquee";
import { Brand } from "@/constant";
import { cn } from "@/lib/utils";


const MarqueSection = ({ className = "" }) => {
  return (
    <div
      className={cn(
        "relative flex h-fit w-full flex-col items-center justify-center mb-24 overflow-hidden rounded-lg bg-background",
        className
      )}
    >
      <h1 className="max-w-xl mx-auto text-center font-medium text-3xl py-5 pb-5">
        <span className="font-nohemi font-medium tracking-tighter">
          Trusted by the
        </span>
        <span className="font-nohemi italic underline px-3">Leading</span>{" "}
        <span className="font-nohemi font-medium tracking-tighter">brands</span>
      </h1>
      <Marquee pauseOnHover className="[--duration:35s]">
        {Brand.concat(Brand).map((review, index) => (
          <img
            key={index}
            src={review.url}
            alt={review.name}
            className="h-16 w-16 ml-5 rounded-full  "
            height={200}
            width={200}
          />
        ))}
      </Marquee>
      <div className="pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-white dark:from-background"></div>
      <div className="pointer-events-none absolute inset-y-0 right-0 w-1/3 bg-gradient-to-l from-white dark:from-background"></div>
    </div>
  );
};

export default MarqueSection;
