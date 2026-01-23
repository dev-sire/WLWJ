"use client"

import type React from "react"

import { motion } from "framer-motion"
import { EventHero } from "@/components/ctf/event-hero"
import { Scoreboard } from "@/components/ctf/scoreboard"
import { EventGallery } from "@/components/ctf/event-gallery"
import { Highlights } from "@/components/ctf/highlights"
import { Sponsors } from "@/components/ctf/sponsors"
import { Anchor, Users, Flag, Clock } from "lucide-react"

const teams = [
  { rank: 1, name: "Black Pearl", points: 4600, solves: 22 },
  { rank: 2, name: "Flying Dutchman", points: 4200, solves: 20 },
  { rank: 3, name: "Queen Anne's Revenge", points: 3900, solves: 19 },
  { rank: 4, name: "Interceptor", points: 3600, solves: 18 },
  { rank: 5, name: "Silent Mary", points: 3300, solves: 16 },
  { rank: 6, name: "Empress", points: 3000, solves: 15 },
  { rank: 7, name: "Hai Peng", points: 2700, solves: 13 },
  { rank: 8, name: "Providence", points: 2400, solves: 12 },
]

const images = [
  { src: "/placeholder.svg?height=400&width=400", alt: "Pirate setup" },
  { src: "/placeholder.svg?height=400&width=400", alt: "Treasure hunt" },
  { src: "/placeholder.svg?height=400&width=400", alt: "Navigation challenge" },
  { src: "/placeholder.svg?height=400&width=400", alt: "Victory loot" },
  { src: "/placeholder.svg?height=400&width=400", alt: "Storm brewing" },
  { src: "/placeholder.svg?height=400&width=400", alt: "Crew planning" },
  { src: "/placeholder.svg?height=400&width=400", alt: "Digital navigation" },
  { src: "/placeholder.svg?height=400&width=400", alt: "Treasure found" },
]

const highlights = [
  { icon: Users, value: "100+", label: "Participants" },
  { icon: Flag, value: "30", label: "Challenges" },
  { icon: Anchor, value: "756", label: "Total Solves" },
  { icon: Clock, value: "18h", label: "Duration" },
]

const sponsors = [
  { name: "Maritime Tech", tier: "platinum" as const },
  { name: "Treasure Vault", tier: "gold" as const },
  { name: "SeaCrypt", tier: "gold" as const },
  { name: "NaviGuard", tier: "silver" as const },
  { name: "AnchorSec", tier: "silver" as const },
  { name: "TidalWave", tier: "silver" as const },
]

function PiratesBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Golden/amber atmospheric glow */}
      <div className="absolute top-1/4 left-1/3 w-[500px] h-[500px] bg-amber-600/15 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-1/3 w-[400px] h-[400px] bg-yellow-700/10 rounded-full blur-3xl" />

      {/* Stormy sea effect */}
      <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-linear-to-t from-slate-900/50 to-transparent" />

      {/* Parchment texture pattern */}
      <svg className="absolute inset-0 w-full h-full opacity-5" viewBox="0 0 100 100" preserveAspectRatio="none">
        <defs>
          <pattern id="pirate-waves" width="40" height="20" patternUnits="userSpaceOnUse">
            <path
              d="M0 10 Q10 0 20 10 T40 10"
              fill="none"
              stroke="currentColor"
              strokeWidth="0.3"
              className="text-amber-600"
            />
          </pattern>
        </defs>
        <rect width="100" height="100" fill="url(#pirate-waves)" />
      </svg>

      {/* Compass rose hint in background */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] opacity-5">
        <svg viewBox="0 0 100 100" className="w-full h-full">
          <circle
            cx="50"
            cy="50"
            r="45"
            fill="none"
            stroke="currentColor"
            strokeWidth="0.5"
            className="text-amber-500"
          />
          <circle
            cx="50"
            cy="50"
            r="35"
            fill="none"
            stroke="currentColor"
            strokeWidth="0.3"
            className="text-amber-500"
          />
          <line x1="50" y1="5" x2="50" y2="95" stroke="currentColor" strokeWidth="0.3" className="text-amber-500" />
          <line x1="5" y1="50" x2="95" y2="50" stroke="currentColor" strokeWidth="0.3" className="text-amber-500" />
        </svg>
      </div>
    </div>
  )
}

export default function PiratesCTFPage() {
  return (
    <div className="relative" style={{ "--event-accent": "#d97706" } as React.CSSProperties}>
      <EventHero
        title="Pirates of the Caribbean CTF"
        tagline="Navigate treacherous digital seas and plunder encrypted treasures in this high-seas adventure"
        date="May 30, 2026"
        venue="Maritime Center"
        participants="100+"
        gradient="from-amber-600 to-yellow-700"
        bgPattern={<PiratesBackground />}
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
            <p className="text-muted-foreground leading-relaxed mb-8">
              Ahoy, cyber sailors! The Pirates of the Caribbean CTF set sail with over 100 participants navigating
              through 30 treacherous challenges. Teams formed their crews to decipher encrypted treasure maps,
              commandeer vulnerable systems, and claim the ultimate prize. This 18-hour voyage tested navigation skills
              in the vast ocean of cybersecurity.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="glass rounded-xl p-6">
                <h3 className="font-semibold mb-2 text-amber-500">Categories</h3>
                <p className="text-sm text-muted-foreground">Web, Crypto, Misc, Forensics, Hardware</p>
              </div>
              <div className="glass rounded-xl p-6">
                <h3 className="font-semibold mb-2 text-amber-500">Difficulty</h3>
                <p className="text-sm text-muted-foreground">Beginner to Intermediate</p>
              </div>
              <div className="glass rounded-xl p-6">
                <h3 className="font-semibold mb-2 text-amber-500">Prize Pool</h3>
                <p className="text-sm text-muted-foreground">$4,000 in prizes</p>
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      <Scoreboard teams={teams} accentColor="#d97706" />
      <EventGallery images={images} />
      <Highlights highlights={highlights} accentColor="#d97706" />
      <Sponsors sponsors={sponsors} />
    </div>
  )
}
