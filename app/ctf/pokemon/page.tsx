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
  { rank: 1, name: "Team Pikachu", points: 4850, solves: 23 },
  { rank: 2, name: "Cyber Charizards", points: 4200, solves: 20 },
  { rank: 3, name: "Digital Mewtwo", points: 3900, solves: 18 },
  { rank: 4, name: "Binary Bulbasaur", points: 3600, solves: 17 },
  { rank: 5, name: "Exploit Eevee", points: 3400, solves: 16 },
  { rank: 6, name: "Hack Haunter", points: 3100, solves: 15 },
  { rank: 7, name: "Payload Pichu", points: 2800, solves: 14 },
  { rank: 8, name: "Shell Squirtle", points: 2500, solves: 12 },
]

const images = [
  { src: "/cybersecurity-competition-gaming-setup-neon-lights.jpg", alt: "Competition setup" },
  { src: "/students-hacking-computers-pokemon-theme.jpg", alt: "Students competing" },
  { src: "/ctf-challenge-screen-code-terminal.jpg", alt: "Challenge screen" },
  { src: "/team-celebration-trophy-winning.jpg", alt: "Winners celebration" },
  { src: "/presentation-cybersecurity-stage.jpg", alt: "Opening ceremony" },
  { src: "/networking-event-students-talking.jpg", alt: "Networking" },
  { src: "/coding-hackathon-late-night.jpg", alt: "Late night hacking" },
  { src: "/award-ceremony-medals-podium.jpg", alt: "Award ceremony" },
]

const highlights = [
  { icon: Users, value: "120+", label: "Participants" },
  { icon: Flag, value: "35", label: "Challenges" },
  { icon: Zap, value: "892", label: "Total Solves" },
  { icon: Clock, value: "24h", label: "Duration" },
]

const sponsors = [
  { name: "Cisco Academy", tier: "platinum" as const },
  { name: "TechStart Inc", tier: "gold" as const },
  { name: "CyberGuard", tier: "gold" as const },
  { name: "DevSecure", tier: "silver" as const },
  { name: "HackLabs", tier: "silver" as const },
  { name: "CodeShield", tier: "silver" as const },
]

function PokemonBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Neon glow effects */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-yellow-500/20 rounded-full blur-3xl animate-pulse" />
      <div
        className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-orange-500/20 rounded-full blur-3xl animate-pulse"
        style={{ animationDelay: "1s" }}
      />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-red-500/10 rounded-full blur-3xl" />

      {/* Electric bolt patterns */}
      <svg className="absolute inset-0 w-full h-full opacity-10" viewBox="0 0 100 100" preserveAspectRatio="none">
        <defs>
          <pattern id="pokemon-grid" width="10" height="10" patternUnits="userSpaceOnUse">
            <circle cx="5" cy="5" r="0.5" fill="currentColor" className="text-yellow-500" />
          </pattern>
        </defs>
        <rect width="100" height="100" fill="url(#pokemon-grid)" />
      </svg>
    </div>
  )
}

export default function PokemonCTFPage() {
  return (
    <div className="relative" style={{ "--event-accent": "#eab308" } as React.CSSProperties}>
      <EventHero
        title="Pokémon CTF"
        tagline="Catch vulnerabilities and become the ultimate cyber trainer in this playful yet challenging competition"
        date="March 15, 2026"
        venue="Virtual Event"
        participants="120+"
        gradient="from-yellow-400 to-orange-500"
        bgPattern={<PokemonBackground />}
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
              The Pokémon CTF brought together over 120 participants in an electrifying 24-hour competition where teams
              battled through 35 unique challenges spanning web exploitation, cryptography, reverse engineering, and
              forensics. Each challenge was themed around the beloved Pokémon universe, making security concepts
              accessible and fun for all skill levels.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="glass rounded-xl p-6">
                <h3 className="font-semibold mb-2 text-yellow-500">Categories</h3>
                <p className="text-sm text-muted-foreground">Web, Crypto, Pwn, Reverse, Forensics, OSINT</p>
              </div>
              <div className="glass rounded-xl p-6">
                <h3 className="font-semibold mb-2 text-yellow-500">Difficulty</h3>
                <p className="text-sm text-muted-foreground">Beginner to Advanced</p>
              </div>
              <div className="glass rounded-xl p-6">
                <h3 className="font-semibold mb-2 text-yellow-500">Prize Pool</h3>
                <p className="text-sm text-muted-foreground">$5,000 in prizes</p>
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
  )
}
