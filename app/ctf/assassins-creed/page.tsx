"use client"

import type React from "react"

import { motion } from "framer-motion"
import { EventHero } from "@/components/ctf/event-hero"
import { Scoreboard } from "@/components/ctf/scoreboard"
import { EventGallery } from "@/components/ctf/event-gallery"
import { Highlights } from "@/components/ctf/highlights"
import { Sponsors } from "@/components/ctf/sponsors"
import { Shield, Users, Flag, Clock } from "lucide-react"

const teams = [
  { rank: 1, name: "Hidden Blade", points: 5200, solves: 26 },
  { rank: 2, name: "Brotherhood", points: 4800, solves: 24 },
  { rank: 3, name: "Templar Hunters", points: 4500, solves: 22 },
  { rank: 4, name: "Eagle Vision", points: 4100, solves: 20 },
  { rank: 5, name: "Assassin Order", points: 3800, solves: 19 },
  { rank: 6, name: "Stealth Masters", points: 3500, solves: 17 },
  { rank: 7, name: "Shadow Runners", points: 3200, solves: 16 },
  { rank: 8, name: "Creed Keepers", points: 2900, solves: 14 },
]

const images = [
  { src: "/dark-mysterious-hacker-setup-stealth-theme.jpg", alt: "Stealth setup" },
  { src: "/hooded-figures-coding-competition-dark.jpg", alt: "Competitors" },
  { src: "/ancient-symbols-code-terminal-dark.jpg", alt: "Challenge screen" },
  { src: "/team-victory-dark-aesthetic.jpg", alt: "Victory moment" },
  { src: "/medieval-theme-tech-event.jpg", alt: "Event atmosphere" },
  { src: "/strategic-planning-team-dark-room.jpg", alt: "Team strategy" },
  { src: "/code-breakthrough-celebration-subtle.jpg", alt: "Breakthrough" },
  { src: "/placeholder.svg?height=400&width=400", alt: "Awards" },
]

const highlights = [
  { icon: Users, value: "150+", label: "Participants" },
  { icon: Flag, value: "42", label: "Challenges" },
  { icon: Shield, value: "1,240", label: "Total Solves" },
  { icon: Clock, value: "36h", label: "Duration" },
]

const sponsors = [
  { name: "SecureTech", tier: "platinum" as const },
  { name: "DarkNet Labs", tier: "gold" as const },
  { name: "CryptoVault", tier: "gold" as const },
  { name: "StealthGuard", tier: "silver" as const },
  { name: "NightOwl Sec", tier: "silver" as const },
  { name: "ShadowNet", tier: "silver" as const },
]

function AssassinsCreedBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Dark mysterious atmosphere */}
      <div className="absolute inset-0 bg-linear-to-b from-slate-900/80 to-background" />

      {/* Subtle glow effects */}
      <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-slate-400/10 rounded-full blur-3xl" />
      <div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-slate-500/10 rounded-full blur-3xl" />

      {/* Ancient glyph pattern */}
      <svg className="absolute inset-0 w-full h-full opacity-5" viewBox="0 0 100 100" preserveAspectRatio="none">
        <defs>
          <pattern id="ac-pattern" width="20" height="20" patternUnits="userSpaceOnUse">
            <path
              d="M10 0 L20 10 L10 20 L0 10 Z"
              fill="none"
              stroke="currentColor"
              strokeWidth="0.2"
              className="text-slate-400"
            />
          </pattern>
        </defs>
        <rect width="100" height="100" fill="url(#ac-pattern)" />
      </svg>

      {/* Vertical lines like ancient architecture */}
      <div className="absolute inset-0 flex justify-around opacity-5">
        {[...Array(8)].map((_, i) => (
          <div key={i} className="w-px h-full bg-linear-to-b from-transparent via-slate-400 to-transparent" />
        ))}
      </div>
    </div>
  )
}

export default function AssassinsCreedCTFPage() {
  return (
    <div className="relative" style={{ "--event-accent": "#94a3b8" } as React.CSSProperties}>
      <EventHero
        title="Assassin's Creed CTF"
        tagline="Infiltrate systems with stealth and precision. Uncover ancient digital secrets hidden in the shadows"
        date="April 22, 2026"
        venue="Campus Arena"
        participants="150+"
        gradient="from-slate-400 to-slate-600"
        bgPattern={<AssassinsCreedBackground />}
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
              The Assassin's Creed CTF challenged participants to embrace stealth and cunning through 42 meticulously
              crafted challenges. Over 150 participants formed brotherhoods to decode ancient ciphers, infiltrate
              simulated networks, and uncover secrets buried in the digital realm. This 36-hour marathon tested not just
              technical skill, but patience and precision.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="glass rounded-xl p-6">
                <h3 className="font-semibold mb-2 text-slate-400">Categories</h3>
                <p className="text-sm text-muted-foreground">
                  Steganography, Crypto, Network, Binary, Social Engineering
                </p>
              </div>
              <div className="glass rounded-xl p-6">
                <h3 className="font-semibold mb-2 text-slate-400">Difficulty</h3>
                <p className="text-sm text-muted-foreground">Intermediate to Expert</p>
              </div>
              <div className="glass rounded-xl p-6">
                <h3 className="font-semibold mb-2 text-slate-400">Prize Pool</h3>
                <p className="text-sm text-muted-foreground">$7,500 in prizes</p>
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      <Scoreboard teams={teams} accentColor="#94a3b8" />
      <EventGallery images={images} />
      <Highlights highlights={highlights} accentColor="#94a3b8" />
      <Sponsors sponsors={sponsors} />
    </div>
  )
}
