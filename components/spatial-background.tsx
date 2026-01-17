"use client"

import { useEffect, useRef } from "react"

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  size: number
  opacity: number
  pulsePhase: number
}

export function SpatialBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d", { alpha: true })
    if (!ctx) return

    let particles: Particle[] = []
    let animationFrameId: number
    const numParticles = 300
    const connectionDistance = 200

    const resizeCanvas = () => {
      if (!canvas) return
      canvas.width = window.innerWidth
      canvas.height = document.documentElement.scrollHeight
    }

    class ParticleSystem {
      createParticle(): Particle {
        if (!canvas) {
          return { x: 0, y: 0, vx: 0, vy: 0, size: 1, opacity: 0.3, pulsePhase: 0 }
        }
        return {
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.3,
          vy: (Math.random() - 0.5) * 0.3,
          size: Math.random() * 2 + 0.5,
          opacity: Math.random() * 0.4 + 0.2,
          pulsePhase: Math.random() * Math.PI * 2
        }
      }

      init() {
        particles = []
        for (let i = 0; i < numParticles; i++) {
          particles.push(this.createParticle())
        }
      }

      drawParticle(particle: Particle) {
        if (!ctx) return
        
        const pulse = Math.sin(particle.pulsePhase) * 0.3 + 0.7
        const size = particle.size * pulse

        // Draw particle glow
        const gradient = ctx.createRadialGradient(
          particle.x, particle.y, 0,
          particle.x, particle.y, size * 3
        )
        gradient.addColorStop(0, `rgba(147, 197, 253, ${particle.opacity * pulse})`)
        gradient.addColorStop(0.5, `rgba(147, 197, 253, ${particle.opacity * 0.3 * pulse})`)
        gradient.addColorStop(1, "rgba(147, 197, 253, 0)")

        ctx.fillStyle = gradient
        ctx.fillRect(
          particle.x - size * 3,
          particle.y - size * 3,
          size * 6,
          size * 6
        )

        // Draw particle core
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, size, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(255, 255, 255, ${particle.opacity * pulse})`
        ctx.fill()
      }

      drawConnections() {
        if (!ctx) return

        for (let i = 0; i < particles.length; i++) {
          for (let j = i + 1; j < particles.length; j++) {
            const dx = particles[i].x - particles[j].x
            const dy = particles[i].y - particles[j].y
            const distance = Math.sqrt(dx * dx + dy * dy)

            if (distance < connectionDistance) {
              const opacity = (1 - distance / connectionDistance) * 0.15
              
              const gradient = ctx.createLinearGradient(
                particles[i].x, particles[i].y,
                particles[j].x, particles[j].y
              )
              gradient.addColorStop(0, `rgba(147, 197, 253, ${opacity})`)
              gradient.addColorStop(0.5, `rgba(167, 139, 250, ${opacity * 0.8})`)
              gradient.addColorStop(1, `rgba(147, 197, 253, ${opacity})`)

              ctx.beginPath()
              ctx.moveTo(particles[i].x, particles[i].y)
              ctx.lineTo(particles[j].x, particles[j].y)
              ctx.strokeStyle = gradient
              ctx.lineWidth = 0.5
              ctx.stroke()
            }
          }
        }
      }

      updateParticle(particle: Particle) {
        if (!canvas) return

        particle.x += particle.vx
        particle.y += particle.vy
        particle.pulsePhase += 0.02

        // Wrap around edges
        if (particle.x < 0) particle.x = canvas.width
        if (particle.x > canvas.width) particle.x = 0
        if (particle.y < 0) particle.y = canvas.height
        if (particle.y > canvas.height) particle.y = 0
      }

      animate() {
        if (!canvas || !ctx) return

        ctx.clearRect(0, 0, canvas.width, canvas.height)

        // Draw connections first (behind particles)
        this.drawConnections()

        // Update and draw particles
        particles.forEach(particle => {
          this.updateParticle(particle)
          this.drawParticle(particle)
        })

        animationFrameId = requestAnimationFrame(() => this.animate())
      }
    }

    const particleSystem = new ParticleSystem()

    const handleResize = () => {
      resizeCanvas()
      particleSystem.init()
    }

    // Handle scroll to update canvas height
    const handleScroll = () => {
      if (!canvas) return
      const newHeight = document.documentElement.scrollHeight
      if (Math.abs(canvas.height - newHeight) > 100) {
        resizeCanvas()
      }
    }

    window.addEventListener("resize", handleResize)
    window.addEventListener("scroll", handleScroll, { passive: true })

    // Use MutationObserver to detect DOM changes
    const observer = new MutationObserver(() => {
      handleScroll()
    })
    observer.observe(document.body, { childList: true, subtree: true })

    resizeCanvas()
    particleSystem.init()
    particleSystem.animate()

    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId)
      }
      window.removeEventListener("resize", handleResize)
      window.removeEventListener("scroll", handleScroll)
      observer.disconnect()
    }
  }, [])

  return (
    <>
      <canvas 
        ref={canvasRef} 
        className="fixed inset-0 w-full pointer-events-none z-1"
        style={{ height: '100%' }}
      />
      {/* Ambient lighting effects */}
      <div className="fixed inset-0 pointer-events-none z-1">
        <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-blue-600/3 rounded-full blur-3xl animate-pulse-slow" />
        <div className="absolute top-2/3 right-1/4 w-[500px] h-[500px] bg-purple-600/3 rounded-full blur-3xl animate-pulse-slower" />
        <div className="absolute bottom-1/4 left-1/2 w-[400px] h-[400px] bg-cyan-600/2 rounded-full blur-3xl animate-pulse-slow" />
      </div>
    </>
  )
}