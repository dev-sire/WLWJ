"use client"

import AutoScroll from "embla-carousel-auto-scroll"
import { Carousel, CarouselContent, CarouselItem, type CarouselApi } from "@/components/ui/carousel"
import { useCallback, useEffect, useRef, useState } from "react"

interface Logo {
  id: string
  name: string
  image: string
  className?: string
}

const logos: Logo[] = [
  {
    id: "cisco",
    name: "Cisco Networking Academy",
    image: "https://www.shadcnblocks.com/images/block/logos/nextjs.svg",
    className: "h-8 w-auto invert",
  },
  {
    id: "hackthebox",
    name: "HackTheBox",
    image: "https://www.shadcnblocks.com/images/block/logos/vercel.svg",
    className: "h-7 w-auto invert",
  },
  {
    id: "owasp",
    name: "OWASP Foundation",
    image: "https://www.shadcnblocks.com/images/block/logos/react.png",
    className: "h-8 w-auto invert",
  },
  {
    id: "cybersec",
    name: "CyberSec Labs",
    image: "https://www.shadcnblocks.com/images/block/logos/supabase.svg",
    className: "h-7 w-auto invert",
  },
  {
    id: "techcorp",
    name: "TechCorp University",
    image: "https://www.shadcnblocks.com/images/block/logos/tailwind.svg",
    className: "h-5 w-auto invert",
  },
  {
    id: "digital",
    name: "Digital Shield Foundation",
    image: "https://www.shadcnblocks.com/images/block/logos/shadcn-ui.svg",
    className: "h-7 w-auto invert",
  },
]

export function AlliancesSection() {
  const [api, setApi] = useState<any>(null);
  const autoScrollRef = useRef<ReturnType<typeof AutoScroll> | null>(null);
  const resumeTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const isPausedRef = useRef(false);

  // Create the auto-scroll plugin instance
  const autoScrollPlugin = useCallback(() => {
    const plugin = AutoScroll({ 
      playOnInit: true, 
      speed: 0.8,
      stopOnInteraction: false,
      stopOnMouseEnter: false,
    });
    autoScrollRef.current = plugin;
    return plugin;
  }, []);

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (resumeTimeoutRef.current) {
        clearTimeout(resumeTimeoutRef.current);
      }
    };
  }, []);

  const handleLogoClick = useCallback(() => {
    if (!autoScrollRef.current || isPausedRef.current) return;

    // Mark as paused to prevent multiple triggers
    isPausedRef.current = true;

    // Stop auto-scroll
    autoScrollRef.current.stop();

    // Clear any existing timeout
    if (resumeTimeoutRef.current) {
      clearTimeout(resumeTimeoutRef.current);
    }

    // Resume after 1 second
    resumeTimeoutRef.current = setTimeout(() => {
      if (autoScrollRef.current) {
        autoScrollRef.current.play();
      }
      isPausedRef.current = false;
    }, 1000);
  }, []);

  return (
    <section className="py-24 md:py-32 relative border-t border-white/10 bg-black overflow-hidden">
      <div className="container mx-auto px-6 flex flex-col items-center text-center">
        <span className="font-mono text-xs tracking-[0.3em] text-gray-600 uppercase block mb-3">
          // ALLIED NETWORKS
        </span>
        <h2 className="text-4xl md:text-5xl font-bold mb-5 text-white tracking-tight">
          Our Alliances
        </h2>
        <p className="text-gray-400 max-w-xl mx-auto text-lg mb-16">
          Partnering with industry leaders to deliver world-class cybersecurity education
        </p>
      </div>

      <div className="relative mx-auto flex items-center justify-center lg:max-w-5xl">
      <Carousel 
          opts={{ loop: true, dragFree: true }} 
          plugins={[autoScrollPlugin()]}
          setApi={setApi}
          className="w-full"
        >
          <CarouselContent className="ml-0">
            {logos.map((logo) => (
              <CarouselItem
                key={logo.id}
                className="flex basis-1/2 sm:basis-1/3 md:basis-1/4 lg:basis-1/5 justify-center pl-0"
              >
                <div
                  onClick={handleLogoClick}
                  className="mx-8 flex shrink-0 flex-col items-center justify-center gap-3 group cursor-pointer"
                >
                  <div className="p-4 rounded-xl bg-white/5 border border-white/10 transition-all duration-300 group-hover:bg-white/10 group-hover:border-white/20">
                    <img
                      src={logo.image || "/placeholder.svg"}
                      alt={logo.name}
                      className={logo.className}
                    />
                  </div>
                  <span className="text-xs text-gray-500 group-hover:text-gray-400 transition-colors whitespace-nowrap">
                    {logo.name}
                  </span>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
        <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-black to-transparent pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-black to-transparent pointer-events-none" />
      </div>
    </section>
  );
}
