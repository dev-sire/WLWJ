"use client"

import { motion } from "framer-motion"

interface Sponsor {
  name: string
  tier: "platinum" | "gold" | "silver"
}

interface SponsorsProps {
  sponsors: Sponsor[]
}

export function Sponsors({ sponsors }: SponsorsProps) {
  const platinum = sponsors.filter((s) => s.tier === "platinum")
  const gold = sponsors.filter((s) => s.tier === "gold")
  const silver = sponsors.filter((s) => s.tier === "silver")

  return (
    <section className="py-24 relative border-t border-white/5">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-4">Our Sponsors</h2>
          <p className="text-white">Thanks to our amazing partners</p>
        </motion.div>

        {platinum.length > 0 && (
          <div className="mb-12">
            <h3 className="text-center text-sm uppercase tracking-wider text-muted-foreground mb-6">Platinum</h3>
            <div className="flex flex-wrap justify-center gap-6">
              {platinum.map((sponsor, index) => (
                <motion.div
                  key={sponsor.name}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="glass glass-hover rounded-xl p-8 min-w-[200px] text-center ring-2 ring-primary/30"
                >
                  <span className="text-lg font-semibold">{sponsor.name}</span>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {gold.length > 0 && (
          <div className="mb-12">
            <h3 className="text-center text-sm uppercase tracking-wider text-muted-foreground mb-6">Gold</h3>
            <div className="flex flex-wrap justify-center gap-4">
              {gold.map((sponsor, index) => (
                <motion.div
                  key={sponsor.name}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="glass glass-hover rounded-xl p-6 min-w-[160px] text-center ring-1 ring-yellow-500/30"
                >
                  <span className="font-medium">{sponsor.name}</span>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {silver.length > 0 && (
          <div>
            <h3 className="text-center text-sm uppercase tracking-wider text-muted-foreground mb-6">Silver</h3>
            <div className="flex flex-wrap justify-center gap-4">
              {silver.map((sponsor, index) => (
                <motion.div
                  key={sponsor.name}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="glass glass-hover rounded-xl p-4 min-w-[140px] text-center"
                >
                  <span className="text-sm">{sponsor.name}</span>
                </motion.div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
