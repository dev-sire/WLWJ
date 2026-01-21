"use client";
import { TimelineContent } from "@/components/ui/timeline-animation";
import { Rocket } from "lucide-react";
import { useRef } from "react";
import { useRouter } from "next/navigation";

export function VisionSection() {
  const heroRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  
  const revealVariants = {
    visible: (i: number) => ({
      y: 0,
      opacity: 1,
      filter: "blur(0px)",
      transition: {
        delay: i * 0.5,
        duration: 0.7,
      },
    }),
    hidden: {
      filter: "blur(10px)",
      y: 40,
      opacity: 0,
    },
  };
  
  const textVariants = {
    visible: (i: number) => ({
      filter: "blur(0px)",
      opacity: 1,
      transition: {
        delay: i * 0.3,
        duration: 0.7,
      },
    }),
    hidden: {
      filter: "blur(10px)",
      opacity: 0,
    },
  };

  const handleAboutClick = () => {
    router.push('/about');
  };

  return (
    <section className="py-24 md:py-32 relative overflow-hidden">
      {/* Space-themed background decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px]">
          <div className="absolute inset-0 border border-white/[0.03] rounded-full" />
          <div className="absolute inset-16 border border-white/[0.05] rounded-full" />
          <div className="absolute inset-32 border border-white/[0.03] rounded-full" />
        </div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-6xl mx-auto" ref={heroRef}>
          <div className="flex flex-col items-start gap-8">
            {/* Vision Content */}
            <div className="flex-1 w-full">
              <TimelineContent
                as="div"
                animationNum={0}
                timelineRef={heroRef}
                customVariants={revealVariants}
                className="mb-8"
              >
                <span className="font-mono text-xs tracking-[0.3em] text-gray-600 uppercase block mb-3">
                  // CORE DIRECTIVES
                </span>
                <h2 className="text-4xl md:text-6xl font-bold text-white tracking-tight">
                  Our Vision
                </h2>
              </TimelineContent>

              <TimelineContent
                as="h3"
                animationNum={1}
                timelineRef={heroRef}
                customVariants={revealVariants}
                className="sm:text-3xl text-xl md:text-4xl !leading-[140%] font-semibold text-gray-100 mb-8"
              >
                To build a{" "}
                <TimelineContent
                  as="span"
                  animationNum={2}
                  timelineRef={heroRef}
                  customVariants={textVariants}
                  className="text-white border-2 border-white/50 inline-block border-dotted px-2 py-1 rounded-md bg-white/10"
                >
                  future-ready
                </TimelineContent>{" "}
                and inclusive tech ecosystem where cybersecurity and emerging technology skills are{" "}
                <TimelineContent
                  as="span"
                  animationNum={3}
                  timelineRef={heroRef}
                  customVariants={textVariants}
                  className="text-white border-2 border-white/50 inline-block border-dotted px-2 py-1 rounded-md bg-white/10"
                >
                  discovered through play,
                </TimelineContent>{" "}
                forged in competition, and celebrated{" "}
                <TimelineContent
                  as="span"
                  animationNum={4}
                  timelineRef={heroRef}
                  customVariants={textVariants}
                  className="text-white border-2 border-white/50 inline-block border-dotted px-2 py-1 rounded-md bg-white/10"
                >
                  across the world
                </TimelineContent>{" "}
                of digital security.
              </TimelineContent>

              <div className="mt-12 flex gap-4 justify-between items-end flex-wrap">
                <TimelineContent
                  as="div"
                  animationNum={5}
                  timelineRef={heroRef}
                  customVariants={textVariants}
                  className="mb-4 sm:text-xl text-sm"
                >
                  <div className="font-medium text-gray-200 mb-1 capitalize">
                    Join us on this mission
                  </div>
                  <div className="text-gray-400 font-semibold uppercase tracking-wider">
                    reach for the stars
                  </div>
                </TimelineContent>

                <TimelineContent
                  as="button"
                  animationNum={6}
                  timelineRef={heroRef}
                  customVariants={textVariants}
                  onClick={handleAboutClick}
                  className="bg-white text-black hover:bg-gray-200 gap-2 font-medium shadow-lg shadow-white/50 h-12 px-6 rounded-full text-sm inline-flex items-center cursor-pointer hover:shadow-xl hover:shadow-white/70 transition-all duration-300 hover:scale-105"
                >
                  <Rocket size={16} className="fill-black" />
                  About Us
                </TimelineContent>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}