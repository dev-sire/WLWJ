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
  { rank: 1, name: "H3x3cut10n3rs", points: 1750, solves: 23 },
  { rank: 2, name: "Entr0py", points: 1700, solves: 20 },
  { rank: 3, name: "Donions", points: 1300, solves: 18 },
  { rank: 4, name: "No CTF No Life", points: 850, solves: 14 },
  { rank: 5, name: "Dodgerx64", points: 800, solves: 17 },
  { rank: 6, name: "Team Ababil", points: 750, solves: 16 },
  { rank: 7, name: "PingofD3ath", points: 650, solves: 15 },
  { rank: 8, name: "Decoded cipher", points: 600, solves: 12 },
]

const images = [
  { src: "/pirates/1.jpeg", alt: "Competition setup" },
  { src: "/pirates/2.jpeg", alt: "Competition setup" },
  { src: "/pirates/3.jpeg", alt: "Competition setup" },
  { src: "/pirates/4.JPG", alt: "Competition setup" },
  { src: "/pirates/5.JPG", alt: "Competition setup" },
  { src: "/pirates/6.jpeg", alt: "Competition setup" },
  { src: "/pirates/7.JPG", alt: "Competition setup" },
  { src: "/pirates/8.JPG", alt: "Competition setup" },
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

export default function PiratesOfTheCaribbeanCTFPage() {
  return (
    <>
      {/* Fixed background for entire page */}
      <div className="fixed inset-0 z-0">
        <div
          className="absolute inset-0 bg-cover bg-center overflow-hidden"
          style={{ backgroundImage: "url('/pirates-loop.gif')" }}
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
          title="Bits of the Black Pearl CTF"
          tagline="Chart a course through the code and claim the digital gold in this high-seas heist for cyber supremacy."
          date="January 10, 2026"
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
                Set sail for the digital high seas in the Bits of the Black Pearl CTF, where over 120 buccaneers navigated a 3 hour voyage through 23 treacherous challenges. Spanning six distinct categories, from cracking Davy Jones' cryptography to navigating the murky waters of web exploitation, each task was steeped in the lore of the Pirates of the Caribbean. Whether dodging "ghost code" or hunting for hidden treasures in binary, participants of all ranks had to hoist the colors and outsmart the tides to claim their spot on the leaderboard.
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