"use client"

import { motion } from "framer-motion"
import { Shield, Target, Users, Zap } from "lucide-react"
import { useState } from "react"

const features = [
  {
    icon: Shield,
    title: "Security First",
    description: "Building robust cybersecurity skills through hands-on challenges and real-world scenarios.",
    isPrimary: true,
  },
  {
    icon: Target,
    title: "Precision Training",
    description: "Carefully crafted challenges that test and expand your technical capabilities.",
    isPrimary: false,
  },
  {
    icon: Users,
    title: "Community Driven",
    description: "A vibrant community of learners, mentors, and industry professionals.",
    isPrimary: false,
  },
  {
    icon: Zap,
    title: "Cutting Edge",
    description: "Stay ahead with challenges reflecting the latest cybersecurity trends and threats.",
    isPrimary: false,
  },
]

function VisionCard({
  feature,
  index,
  isPrimary,
  hoveredIndex,
  setHoveredIndex,
}: {
  feature: (typeof features)[0]
  index: number
  isPrimary: boolean
  hoveredIndex: number | null
  setHoveredIndex: (i: number | null) => void
}) {
  const isHovered = hoveredIndex === index

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.5, ease: "easeOut" }}
      onMouseEnter={() => setHoveredIndex(index)}
      onMouseLeave={() => setHoveredIndex(null)}
      className={`
        relative group cursor-pointer will-change-transform
        ${isPrimary ? "md:col-span-2 md:row-span-2" : ""}
      `}
    >
      <div
        className={`
          absolute -inset-[1px] rounded-2xl transition-opacity duration-500
          ${isHovered ? "opacity-100" : "opacity-0"}
        `}
        style={{
          background: "linear-gradient(135deg, rgba(255,255,255,0.2), rgba(255,255,255,0.05))",
        }}
      />

      <div
        className={`
          relative h-full rounded-2xl p-6 md:p-8 transition-all duration-300
          ${isPrimary ? "bg-white/[0.06] border border-white/15" : "bg-white/[0.03] border border-white/10"}
          ${isHovered ? "bg-white/[0.08] border-white/25" : ""}
        `}
      >
        <div
          className={`
            ${isPrimary ? "w-16 h-16 md:w-20 md:h-20" : "w-12 h-12 md:w-14 md:h-14"} 
            mb-5 rounded-xl bg-white/10 flex items-center justify-center 
            transition-colors duration-300
            ${isHovered ? "bg-white/15" : ""}
          `}
        >
          <feature.icon
            size={isPrimary ? 32 : 24}
            className={`transition-colors duration-300 ${isHovered ? "text-white" : "text-white/70"}`}
          />
        </div>

        <h3
          className={`
          ${isPrimary ? "text-xl md:text-2xl" : "text-lg"} 
          font-semibold mb-3 text-white
        `}
        >
          {feature.title}
        </h3>

        <p
          className={`
          ${isPrimary ? "text-base" : "text-sm"} 
          text-gray-400 leading-relaxed transition-colors duration-300
          ${isHovered ? "text-gray-300" : ""}
        `}
        >
          {feature.description}
        </p>
      </div>
    </motion.div>
  )
}

export function VisionSection() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  return (
    <section className="py-24 md:py-32 relative bg-black overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px]">
          <div className="absolute inset-0 border border-white/[0.03] rounded-full" />
          <div className="absolute inset-16 border border-white/[0.05] rounded-full" />
          <div className="absolute inset-32 border border-white/[0.03] rounded-full" />
        </div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <span className="font-mono text-xs tracking-[0.3em] text-gray-600 uppercase block mb-3">
            // CORE DIRECTIVES
          </span>
          <h2 className="text-4xl md:text-6xl font-bold mb-5 text-white tracking-tight">Our Vision</h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-balance text-lg">
            Empowering the next generation of cybersecurity professionals through immersive, gamified learning
            experiences that bridge the gap between theory and practice.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 max-w-5xl mx-auto">
          <VisionCard
            feature={features[0]}
            index={0}
            isPrimary={true}
            hoveredIndex={hoveredIndex}
            setHoveredIndex={setHoveredIndex}
          />
          <div className="flex flex-col gap-5">
            <VisionCard
              feature={features[1]}
              index={1}
              isPrimary={false}
              hoveredIndex={hoveredIndex}
              setHoveredIndex={setHoveredIndex}
            />
            <VisionCard
              feature={features[2]}
              index={2}
              isPrimary={false}
              hoveredIndex={hoveredIndex}
              setHoveredIndex={setHoveredIndex}
            />
          </div>
          <div className="md:mt-12">
            <VisionCard
              feature={features[3]}
              index={3}
              isPrimary={false}
              hoveredIndex={hoveredIndex}
              setHoveredIndex={setHoveredIndex}
            />
          </div>
        </div>
      </div>
    </section>
  )
}
