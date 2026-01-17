"use client"

import { useEffect, useRef } from "react"

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
    image: "	https://upload.wikimedia.org/wikipedia/commons/thumb/6/64/Cisco_logo.svg/120px-Cisco_logo.svg.png",
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
  const trackRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const track = trackRef.current
    if (!track) return

    // Clone the track content for seamless loop
    const items = track.innerHTML
    track.innerHTML = items + items

    let scrollAmount = 0
    const speed = 5

    const animate = () => {
      scrollAmount += speed
      
      // Get half the width (one full set of logos)
      const halfWidth = track.scrollWidth / 2
      
      // Reset when we've scrolled through one set
      if (scrollAmount >= halfWidth) {
        scrollAmount = 0
      }
      
      track.style.transform = `translateX(-${scrollAmount}px)`
      requestAnimationFrame(animate)
    }

    requestAnimationFrame(animate)
  }, [])

  return (
    <section className="py-24 md:py-32 relative border-t border-white/10 overflow-hidden">
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

      <div className="relative mx-auto overflow-hidden">
        <div 
          ref={trackRef}
          className="flex items-center will-change-transform"
        >
          {logos.map((logo, index) => (
            <div
              key={`${logo.id}-${index}`}
              className="flex shrink-0 flex-col items-center justify-center gap-3 group cursor-pointer mx-8 p-2"
            >
              <div className="p-4 rounded-xl bg-black border border-white/20 transition-all duration-300 group-hover:bg-white/10 group-hover:border-white/30 group-hover:scale-105">
                <img
                  src={logo.image}
                  alt={logo.name}
                  className={logo.className}
                  draggable={false}
                />
              </div>
              <span className="text-xs text-gray-500 group-hover:text-gray-400 transition-colors whitespace-nowrap">
                {logo.name}
              </span>
            </div>
          ))}
        </div>
        
        {/* Gradient overlays */}
        <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-black via-black/50 to-transparent pointer-events-none z-10" />
        <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-black via-black/50 to-transparent pointer-events-none z-10" />
      </div>
    </section>
  )
}