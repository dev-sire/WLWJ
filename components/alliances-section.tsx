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
    image: "/11.png",
    className: "h-18 w-auto",
  },
  {
    id: "uet",
    name: "UET Lahore",
    image: "/9.png",
    className: "h-18 w-auto",
  },
  {
    id: "teknofest",
    name: "Teknofest",
    image: "/1.png",
    className: "h-18 w-auto",
  },
  {
    id: "nanotechx",
    name: "NANOTECHX",
    image: "/2.png",
    className: "h-18 w-auto",
  },
  {
    id: "acmcyber",
    name: "ACM Cyber FAST",
    image: "/3.png",
    className: "h-18 w-auto",
  },
  {
    id: "acmbahria",
    name: "ACM Bahria",
    image: "/4.png",
    className: "h-18 w-auto",
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
    const speed = 3

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
        <div className="absolute inset-y-0 left-0 w-32 bg-linear-to-r from-black via-black/50 to-transparent pointer-events-none z-10" />
        <div className="absolute inset-y-0 right-0 w-32 bg-linear-to-l from-black via-black/50 to-transparent pointer-events-none z-10" />
      </div>
    </section>
  )
}