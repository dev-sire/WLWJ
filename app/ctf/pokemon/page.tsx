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
  { rank: 1, name: "Entr0py", points: 1020, solves: 23 },
  { rank: 2, name: "Donions", points: 910, solves: 20 },
  { rank: 3, name: "Cyber Surfers", points: 520, solves: 18 },
  { rank: 4, name: "Depression", points: 420, solves: 17 },
  { rank: 5, name: "p4wxiÏ€", points: 370, solves: 16 },
  { rank: 6, name: "2G3ndersOnly", points: 370, solves: 15 },
  { rank: 7, name: "Digital Dynamos", points: 360, solves: 14 },
  { rank: 8, name: "RootRebels", points: 300, solves: 12 },
]

const images = [
  { src: "/hackemon/1.png", alt: "Competition setup" },
  { src: "/hackemon/2.png", alt: "Competition setup" },
  { src: "/hackemon/3.jpg", alt: "Competition setup" },
  { src: "/hackemon/4.jpg", alt: "Competition setup" },
  { src: "/hackemon/5.jpg", alt: "Competition setup" },
  { src: "/hackemon/6.jpg", alt: "Competition setup" },
  { src: "/hackemon/7.jpg", alt: "Competition setup" },
  { src: "/hackemon/8.jpg", alt: "Competition setup" },
]

const highlights = [
  { icon: Users, value: "50+", label: "Participants" },
  { icon: Flag, value: "20", label: "Challenges" },
  { icon: Zap, value: "500+", label: "Total Solves" },
  { icon: Clock, value: "3h", label: "Duration" },
]

const sponsors = [
  { name: "Meherma Tech", tier: "platinum" as const },
]

export default function PokemonCTFPage() {
  return (
    <>
      {/* Fixed background for entire page */}
      <div className="fixed inset-0 z-0">
        <div
          className="absolute inset-0 bg-cover bg-center overflow-hidden"
          style={{ backgroundImage: "url('/pokemon.jpg')" }}
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
          title="Hackemon CTF"
          tagline="Catch vulnerabilities and become the ultimate cyber trainer in this playful yet challenging competition"
          date="May 29, 2025"
          venue="DUET Gulberg Campus"
          participants="50+"
          gradient="from-yellow-400 to-orange-500"
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
                The Pokémon CTF brought together over 50 participants in an electrifying 3-hour competition where teams
                battled through 20+ unique challenges spanning web exploitation, cryptography and
                forensics. Each challenge was themed around the beloved Pokémon universe, making security concepts
                accessible and fun for all skill levels.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="glass rounded-xl p-6">
                  <h3 className="font-semibold mb-2 text-yellow-500">Categories</h3>
                  <p className="text-sm text-white">Web, Crypto, Forensics, OSINT, Misc</p>
                </div>
                <div className="glass rounded-xl p-6">
                  <h3 className="font-semibold mb-2 text-yellow-500">Difficulty</h3>
                  <p className="text-sm text-white">Beginner to Advanced</p>
                </div>
                <div className="glass rounded-xl p-6">
                  <h3 className="font-semibold mb-2 text-yellow-500">Prize Pool</h3>
                  <p className="text-sm text-white">10,000 PKR in prizes</p>
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