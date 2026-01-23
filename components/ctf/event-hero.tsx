"use client"

import type React from "react"

import { motion } from "framer-motion"
import { Calendar, MapPin, Users } from "lucide-react"

interface EventHeroProps {
  title: string
  tagline: string
  date: string
  venue: string
  participants: string
  gradient: string
  bgPattern?: React.ReactNode
}

export function EventHero({ title, tagline, date, venue, participants, gradient, bgPattern }: EventHeroProps) {
  return (
    <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden pt-20">
      {bgPattern}

      <div className="absolute inset-0 bg-linear-to-b from-transparent via-background/50 to-background" />

      <div className="relative z-10 container mx-auto px-6 text-center py-20">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className={`inline-block px-6 py-2 rounded-full mb-6 bg-linear-to-r ${gradient} bg-opacity-20`}
          style={{ background: `linear-gradient(to right, var(--tw-gradient-stops))` }}
        >
          <span className="text-sm font-medium text-white/90">CTF Event</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-5xl md:text-7xl font-bold mb-4 tracking-tight"
        >
          <span className={`bg-linear-to-r ${gradient} bg-clip-text text-transparent`}>{title}</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-xl text-muted-foreground max-w-2xl mx-auto mb-10"
        >
          {tagline}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-wrap items-center justify-center gap-6 text-sm"
        >
          <div className="flex items-center gap-2 glass px-4 py-2 rounded-full">
            <Calendar size={16} className="text-primary" />
            <span>{date}</span>
          </div>
          <div className="flex items-center gap-2 glass px-4 py-2 rounded-full">
            <MapPin size={16} className="text-primary" />
            <span>{venue}</span>
          </div>
          <div className="flex items-center gap-2 glass px-4 py-2 rounded-full">
            <Users size={16} className="text-primary" />
            <span>{participants} Participants</span>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
