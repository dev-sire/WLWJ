"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { Calendar, MapPin, ArrowUpRight } from "lucide-react"

const events = [
  {
    id: "pokemon",
    title: "Pokémon CTF",
    description:
      "Catch vulnerabilities and become the ultimate cyber trainer in this playful yet challenging competition.",
    date: "March 15, 2026",
    venue: "Virtual",
    href: "/ctf/pokemon",
  },
  {
    id: "assassins-creed",
    title: "Assassin's Creed CTF",
    description:
      "Infiltrate systems with stealth and precision. Uncover ancient digital secrets hidden in the shadows.",
    date: "April 22, 2026",
    venue: "Campus Arena",
    href: "/ctf/assassins-creed",
  },
  {
    id: "pirates",
    title: "Pirates of the Caribbean CTF",
    description: "Navigate treacherous digital seas and plunder encrypted treasures in this high-seas adventure.",
    date: "May 30, 2026",
    venue: "Maritime Center",
    href: "/ctf/pirates-of-the-caribbean",
  },
]

export function EventsSection() {
  return (
    <section className="py-24 md:py-32 relative bg-black overflow-hidden">
      <motion.div
        className="absolute inset-0 pointer-events-none"
        animate={{ rotate: -360 }}
        transition={{ duration: 120, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] border border-white/[0.02] rounded-full" />
      </motion.div>

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="font-mono text-xs tracking-[0.3em] text-gray-600 uppercase block mb-3">
            // MISSION BRIEFINGS
          </span>
          <h2 className="text-4xl md:text-6xl font-bold mb-5 text-white tracking-tight">Upcoming Events</h2>
          <p className="text-gray-400 max-w-xl mx-auto text-lg">
            Join our elite CTF competitions and prove your skills in the digital arena
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map((event, index) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
            >
              <Link href={event.href} className="block group">
                <div className="bg-white/5 border border-white/10 hover:border-white/25 rounded-2xl p-6 h-full relative overflow-hidden transition-all duration-500 hover:bg-white/[0.08]">
                  <div className="relative z-10">
                    <div className="flex items-start justify-between mb-4">
                      <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center group-hover:bg-white/15 transition-colors">
                        <span className="text-xl">🎯</span>
                      </div>
                      <ArrowUpRight
                        size={20}
                        className="text-gray-600 group-hover:text-white group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300"
                      />
                    </div>

                    <h3 className="text-xl font-semibold mb-2 text-white group-hover:text-gray-200 transition-colors">
                      {event.title}
                    </h3>
                    <p className="text-sm text-gray-400 mb-4 leading-relaxed">{event.description}</p>

                    <div className="flex items-center gap-4 text-xs text-gray-500 font-mono">
                      <span className="flex items-center gap-1">
                        <Calendar size={14} />
                        {event.date}
                      </span>
                      <span className="flex items-center gap-1">
                        <MapPin size={14} />
                        {event.venue}
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
