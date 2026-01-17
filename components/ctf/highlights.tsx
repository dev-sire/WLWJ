"use client"

import { motion } from "framer-motion"
import type { LucideIcon } from "lucide-react"

interface Highlight {
  icon: LucideIcon
  value: string
  label: string
}

interface HighlightsProps {
  highlights: Highlight[]
  accentColor: string
}

export function Highlights({ highlights, accentColor }: HighlightsProps) {
  return (
    <section className="py-24 relative border-t border-white/5">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-4">Event Highlights</h2>
          <p className="text-muted-foreground">Key moments and achievements</p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {highlights.map((highlight, index) => (
            <motion.div
              key={highlight.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="glass glass-hover rounded-2xl p-6 text-center"
            >
              <div
                className="w-14 h-14 mx-auto mb-4 rounded-xl flex items-center justify-center"
                style={{ background: `${accentColor}20` }}
              >
                <highlight.icon size={24} style={{ color: accentColor }} />
              </div>
              <p className="text-3xl font-bold mb-1" style={{ color: accentColor }}>
                {highlight.value}
              </p>
              <p className="text-sm text-muted-foreground">{highlight.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
