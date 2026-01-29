"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { useEffect, useRef } from "react"
import { usePathname } from "next/navigation"

const quickLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/gallery", label: "Gallery" },
  { href: "/contact", label: "Contact" },
]

const eventLinks = [
  { href: "/ctf/pokemon", label: "Pokémon CTF" },
  { href: "/ctf/assassins-creed", label: "Assassin's Creed CTF" },
  { href: "/ctf/pirates-of-the-caribbean", label: "Pirates CTF" },
]

const socialLinks = [
  { href: "#", symbol: ">_", label: "Terminal" },
  { href: "#", symbol: "[]", label: "Repository" },
  { href: "#", symbol: "@", label: "Contact" },
  { href: "#", symbol: "//", label: "Docs" },
]

function SignalWaveform() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let animationId: number
    let phase = 0

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      ctx.strokeStyle = "rgba(255, 255, 255, 0.3)"
      ctx.lineWidth = 1
      ctx.beginPath()

      for (let x = 0; x < canvas.width; x++) {
        const y =
          canvas.height / 2 + Math.sin((x + phase) * 0.02) * 8 + Math.sin((x + phase) * 0.05) * 4 + Math.random() * 2

        if (x === 0) ctx.moveTo(x, y)
        else ctx.lineTo(x, y)
      }

      ctx.stroke()
      phase += 2
      animationId = requestAnimationFrame(draw)
    }

    draw()
    return () => cancelAnimationFrame(animationId)
  }, [])

  return <canvas ref={canvasRef} width={300} height={40} className="opacity-50" />
}

const stats = [
  { label: "CTFs Hosted", value: "12+" },
  { label: "Participants Trained", value: "500+" },
  { label: "Active Years", value: "4" },
]

export function Footer() {
  const pathname = usePathname()
  const isCTFRoute = pathname?.startsWith('/ctf')

  return (
    <footer className={`relative border-t z-10 ${
      isCTFRoute 
        ? "bg-black/40 backdrop-blur-xl border-white/20" 
        : "border-white/10"
    }`}>
      <div className={`border-b py-8 ${
        isCTFRoute ? "border-white/20" : "border-white/10"
      }`}>
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <SignalWaveform />
              <span className={`font-mono text-xs tracking-wider ${
                isCTFRoute ? "text-gray-300" : "text-gray-500"
              }`}>SIGNAL ACTIVE</span>
            </div>

            <div className="flex items-center gap-8">
              {stats.map((stat) => (
                <div key={stat.label} className="text-center">
                  <div className="font-mono text-lg text-white">{stat.value}</div>
                  <div className={`font-mono text-[10px] uppercase tracking-wider ${
                    isCTFRoute ? "text-gray-400" : "text-gray-600"
                  }`}>{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="md:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="relative w-10 h-10">
                <div className="absolute inset-0 bg-white rounded-lg" />
                <div className="absolute inset-1 bg-black rounded-md flex items-center justify-center">
                  <span className="text-lg font-bold text-white">W</span>
                </div>
              </div>
              <span className="text-xl font-bold tracking-tight text-white">WLWJ</span>
            </Link>
            <p className={`text-sm leading-relaxed ${
              isCTFRoute ? "text-gray-300" : "text-gray-500"
            }`}>
              Forging the next generation of cyber warriors through space-grade challenges and elite CTF competitions.
            </p>
          </div>

          <div>
            <h4 className={`font-mono text-xs mb-4 uppercase tracking-wider ${
              isCTFRoute ? "text-gray-400" : "text-gray-600"
            }`}>// Navigation</h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link 
                    href={link.href} 
                    className={`text-sm transition-colors ${
                      isCTFRoute 
                        ? "text-gray-300 hover:text-white" 
                        : "text-gray-500 hover:text-white"
                    }`}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className={`font-mono text-xs mb-4 uppercase tracking-wider ${
              isCTFRoute ? "text-gray-400" : "text-gray-600"
            }`}>// Missions</h4>
            <ul className="space-y-3">
              {eventLinks.map((link) => (
                <li key={link.href}>
                  <Link 
                    href={link.href} 
                    className={`text-sm transition-colors ${
                      isCTFRoute 
                        ? "text-gray-300 hover:text-white" 
                        : "text-gray-500 hover:text-white"
                    }`}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className={`font-mono text-xs mb-4 uppercase tracking-wider ${
              isCTFRoute ? "text-gray-400" : "text-gray-600"
            }`}>// Connect</h4>
            <div className="flex gap-3">
              {socialLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className={`w-10 h-10 border rounded-lg flex items-center justify-center font-mono text-xs transition-all ${
                    isCTFRoute
                      ? "bg-white/10 border-white/20 text-gray-300 hover:text-white hover:border-white/40 hover:bg-white/15"
                      : "bg-white/5 border-white/10 text-gray-500 hover:text-white hover:border-white/30"
                  }`}
                  aria-label={link.label}
                >
                  {link.symbol}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className={`mt-12 pt-8 border-t ${
          isCTFRoute ? "border-white/20" : "border-white/10"
        }`}>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="flex flex-col md:flex-row items-center justify-between gap-4"
          >
            <div className="flex items-center gap-3">
              <div className={`w-2 h-2 rounded-full animate-pulse ${
                isCTFRoute ? "bg-gray-400" : "bg-gray-600"
              }`} />
              <p className={`font-mono text-xs tracking-wider ${
                isCTFRoute ? "text-gray-400" : "text-gray-600"
              }`}>
                END OF TRANSMISSION. WLWJ CONTROL SIGNING OFF.
              </p>
            </div>
            <p className={`text-xs ${
              isCTFRoute ? "text-gray-400" : "text-gray-600"
            }`}>© {new Date().getFullYear()} WLWJ. All rights reserved.</p>
          </motion.div>
        </div>
      </div>
    </footer>
  )
}