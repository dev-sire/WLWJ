"use client"

import type React from "react"

import { motion } from "framer-motion"
import { EventHero } from "@/components/ctf/event-hero"
import { Scoreboard } from "@/components/ctf/scoreboard"
import { EventGallery } from "@/components/ctf/event-gallery"
import { Highlights } from "@/components/ctf/highlights"
import { Sponsors } from "@/components/ctf/sponsors"
import { Zap, Users, Flag, Clock } from "lucide-react"

const teams = [
  { rank: 1, name: "H3x3cut10n3rs", points: 2200, solves: 23 },
  { rank: 2, name: "Donions", points: 2100, solves: 20 },
  { rank: 3, name: "Cyber23", points: 1850, solves: 18 },
  { rank: 4, name: "Digital Dynamos", points: 1770, solves: 14 },
  { rank: 5, name: "Hack2Win", points: 1500, solves: 17 },
  { rank: 6, name: "p4wxiÏ€", points: 1450, solves: 16 },
  { rank: 7, name: "2G3ndersOnly", points: 1100, solves: 15 },
  { rank: 8, name: "RootRebels", points: 950, solves: 12 },
]

const images = [
  { src: "/assassins/1.jpeg", alt: "Competition setup" },
  { src: "/assassins/2.jpeg", alt: "Competition setup" },
  { src: "/assassins/3.jpeg", alt: "Competition setup" },
  { src: "/assassins/4.jpeg", alt: "Competition setup" },
  { src: "/assassins/5.jpeg", alt: "Competition setup" },
  { src: "/assassins/6.jpeg", alt: "Competition setup" },
  { src: "/assassins/7.jpeg", alt: "Competition setup" },
  { src: "/assassins/8.jpeg", alt: "Competition setup" },
]

const highlights = [
  { icon: Users, value: "100+", label: "Participants" },
  { icon: Flag, value: "25", label: "Challenges" },
  { icon: Zap, value: "800+", label: "Total Solves" },
  { icon: Clock, value: "3h", label: "Duration" },
]

const sponsors = [
  { name: "TeknoFest 3.0", tier: "platinum" as const },
  { name: "Tech Gala 1.0", tier: "gold" as const },
]

export default function AssassinsCreedCTFPage() {
  return (
    <>
      {/* Fixed background for entire page */}
      <div className="fixed inset-0 z-0">
        <div
          className="absolute inset-0 bg-cover bg-center overflow-hidden"
          style={{ backgroundImage: "url('/assassins-loop.gif')" }}
        />
      </div>

      {/* Scrollable content */}
      <div 
        className="relative z-10" 
        style={{ 
          "--event-accent": "#eab308",
          fontFamily: "'Pokemon Solid', sans-serif"
        } as React.CSSProperties}
      >
        <div className="absolute inset-0 bg-black/55 pointer-events-none" />
        <EventHero
          title="Reign of the Rogue CTF"
          tagline="Enter the Animus and exploit the glitches of history in this high-stakes hunt for cryptographic secrets"
          date="January 5, 2026"
          venue="Bano Qabil"
          participants="100+"
          gradient="from-yellow-500 to-yellow-700"
          bgPattern={null}
        />

        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="py-24 relative"
        >
          <div className="container mx-auto px-6">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl md:text-5xl font-bold mb-6">Event Overview</h2>
              <p className="text-white leading-relaxed mb-8">
                The Reign of the Rogue CTF saw over 120 dedicated operatives descend into a high-stakes, 24-hour digital battlefield. Across 23 stealth-focused challenges, teams navigated six distinct categories—including web exploitation, binary analysis, and OSINT, all meticulously crafted within the shadows of the Assassin's Creed universe. By blending historical intrigue with cutting-edge cybersecurity, the event transformed complex penetration testing into a leap of faith, challenging recruits and veteran masters alike to synchronize their skills and uncover the truth hidden in the code.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="glass rounded-xl p-6">
                  <h3 className="font-semibold mb-2 text-yellow-500">Categories</h3>
                  <p className="text-sm text-white">Web, Crypto, Forensics, OSINT, Misc, Reverse Engineering, Hardware</p>
                </div>
                <div className="glass rounded-xl p-6">
                  <h3 className="font-semibold mb-2 text-yellow-500">Difficulty</h3>
                  <p className="text-sm text-white">Beginner to Advanced</p>
                </div>
                <div className="glass rounded-xl p-6">
                  <h3 className="font-semibold mb-2 text-yellow-500">Prize Pool</h3>
                  <p className="text-sm text-white">25,000 PKR in prizes</p>
                </div>
              </div>
            </div>
          </div>
        </motion.section>

        <Scoreboard teams={teams} accentColor="#eab308" />
        <EventGallery images={images} />
        <Highlights highlights={highlights} accentColor="#eab308" />
        <Sponsors sponsors={sponsors} />
      </div>
    </>
  )
}