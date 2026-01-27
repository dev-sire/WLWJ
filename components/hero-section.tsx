"use client"

import { useEffect, useRef, useState } from "react"
import { motion, Variants } from "framer-motion"
import { ArrowRight, Shield } from "lucide-react"

const StarfieldCanvas = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [glowIntensity, setGlowIntensity] = useState(0)
  const speedRef = useRef(10)
  const mouseProximityRef = useRef(0)
  const animationFrameRef = useRef<number>(10)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d", { alpha: false })
    if (!ctx) return

    let stars: Star[] = []
    const numStars = 600

    const resizeCanvas = () => {
      if (!canvas) return
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    class Star {
      x: number
      y: number
      z: number
      pz: number

      constructor() {
        if (!canvas) {
          this.x = 0
          this.y = 0
          this.z = 0
          this.pz = 0
          return
        }
        this.x = Math.random() * canvas.width - canvas.width / 2
        this.y = Math.random() * canvas.height - canvas.height / 2
        this.z = Math.random() * canvas.width
        this.pz = this.z
      }

      update() {
        if (!canvas) return
        this.z = this.z - speedRef.current
        if (this.z < 1) {
          this.z = canvas.width
          this.x = Math.random() * canvas.width - canvas.width / 2
          this.y = Math.random() * canvas.height - canvas.height / 2
          this.pz = this.z
        }
      }

      draw() {
        if (!canvas || !ctx) return
        const sx = (this.x / this.z) * (canvas.width / 2) + canvas.width / 2
        const sy = (this.y / this.z) * (canvas.height / 2) + canvas.height / 2

        const r = Math.max(0.1, (1 - this.z / canvas.width) * 2)

        const px = (this.x / this.pz) * (canvas.width / 2) + canvas.width / 2
        const py = (this.y / this.pz) * (canvas.height / 2) + canvas.height / 2

        this.pz = this.z

        ctx.beginPath()
        ctx.moveTo(px, py)
        ctx.lineTo(sx, sy)
        ctx.lineWidth = r * 1.5
        ctx.strokeStyle = `rgba(255, 255, 255, ${(1 - this.z / canvas.width) * 0.8})`
        ctx.stroke()
      }
    }

    const init = () => {
      stars = []
      for (let i = 0; i < numStars; i++) {
        stars.push(new Star())
      }
    }

    const animate = () => {
      if (!canvas || !ctx) return
      
      ctx.fillStyle = "rgba(0, 0, 0, 0.15)"
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Smoothly interpolate speed
      const targetSpeed = 2 + mouseProximityRef.current * 15
      speedRef.current += (targetSpeed - speedRef.current) * 0.1

      stars.forEach((star) => {
        star.update()
        star.draw()
      })

      animationFrameRef.current = requestAnimationFrame(animate)
    }

    // Throttle mouse movement updates
    let rafId: number | null = null
    const handleMouseMove = (event: MouseEvent) => {
      if (rafId) return
      
      rafId = requestAnimationFrame(() => {
        const centerX = window.innerWidth / 2
        const centerY = window.innerHeight / 2
        const distX = Math.abs(event.clientX - centerX)
        const distY = Math.abs(event.clientY - centerY)
        const dist = Math.sqrt(distX * distX + distY * distY)
        const maxDist = Math.sqrt(centerX * centerX + centerY * centerY)
        const proximity = 1 - dist / maxDist
        
        mouseProximityRef.current = proximity
        setGlowIntensity(proximity)
        
        rafId = null
      })
    }

    window.addEventListener("resize", resizeCanvas)
    window.addEventListener("mousemove", handleMouseMove, { passive: true })

    resizeCanvas()
    init()
    animate()

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
      if (rafId) {
        cancelAnimationFrame(rafId)
      }
      window.removeEventListener("resize", resizeCanvas)
      window.removeEventListener("mousemove", handleMouseMove)
    }
  }, [])

  return (
    <>
      <canvas ref={canvasRef} className="absolute inset-0 z-0 w-full h-full" />
      <div
        className="absolute inset-0 z-1 pointer-events-none transition-opacity duration-500"
        style={{
          background: `radial-gradient(circle at center, rgba(255,255,255,${glowIntensity * 0.12}) 0%, transparent 50%)`,
        }}
      />
      {/* Ambient nebula effects */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-600/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-blue-600/5 rounded-full blur-3xl pointer-events-none" />
    </>
  )
}

export function HeroSection() {
  const fadeUpVariants: Variants = {
    hidden: { opacity: 0, y: 15 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.15 + 0.3,
        duration: 0.6,
        ease: [0.25, 0.1, 0.25, 1],
      },
    }),
  }

  return (
    <section className="relative h-screen w-full bg-black flex flex-col items-center justify-center overflow-hidden z-2">
      <StarfieldCanvas />

      {/* Gradient overlays */}
      <div className="absolute inset-0 bg-linear-to-t from-black via-transparent to-black z-10" />
      
      {/* Subtle grid overlay for depth */}
      <div className="absolute inset-0 z-10 opacity-[0.02]" 
           style={{
             backgroundImage: `linear-gradient(rgba(255,255,255,0.3) 1px, transparent 1px),
                               linear-gradient(90deg, rgba(255,255,255,0.3) 1px, transparent 1px)`,
             backgroundSize: '50px 50px'
           }} 
      />

      {/* Content */}
      <div className="relative z-20 text-center p-6">
        <motion.div custom={0} variants={fadeUpVariants} initial="hidden" animate="visible" className="mb-4">
          <span className="font-mono text-xs tracking-[0.3em] text-gray-500 uppercase">// WLWJ CONTROL ONLINE</span>
        </motion.div>

        <motion.div
          custom={1}
          variants={fadeUpVariants}
          initial="hidden"
          animate="visible"
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 mb-6 backdrop-blur-sm"
        >
          <Shield className="h-4 w-4 text-gray-300" />
          <span className="text-sm font-medium text-gray-300">Student-led Cybersecurity Excellence</span>
        </motion.div>

        <motion.h1
          custom={2}
          variants={fadeUpVariants}
          initial="hidden"
          animate="visible"
          className="text-6xl md:text-8xl lg:text-9xl font-bold tracking-tighter mb-6 bg-clip-text text-transparent bg-linear-to-b from-white via-white to-gray-600"
        >
          WLWJ
        </motion.h1>

        <motion.p
          custom={3}
          variants={fadeUpVariants}
          initial="hidden"
          animate="visible"
          className="max-w-2xl mx-auto text-lg md:text-xl text-gray-400 mb-10 font-light tracking-wide"
        >
          We Rise as One, We PWN as One
        </motion.p>

        <motion.div
          custom={4}
          variants={fadeUpVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <button
            className="bg-white text-black font-semibold hover:bg-gray-200 transition-colors duration-200 px-8 py-3 rounded-md text-base flex items-center gap-2"
          >
            View Events
            <ArrowRight className="h-5 w-5" />
          </button>
          <button
            className="border border-white/20 text-white hover:bg-white/10 px-8 py-3 rounded-md text-base bg-transparent transition-colors duration-200"
          >
            Contact Us
          </button>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20">
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="w-6 h-10 border-2 border-white/30 rounded-full flex items-start justify-center p-2"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="w-1.5 h-1.5 bg-white rounded-full"
          />
        </motion.div>
      </div>
    </section>
  )
}