"use client"

import { motion } from "framer-motion"
import { useState, useEffect } from "react"
import { BookOpen, Award, Users, Target, GraduationCap, Globe, Rocket, Trophy, LucideIcon } from "lucide-react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"

type Star = {
  x: number
  y: number
  size: number
  duration: number
  delay: number
}

type StatCardProps = {
  icon: LucideIcon
  value: string | number
  label: string
  delay?: number
}

type TimelineItemProps = {
  item: TimelineData
  index: number
}

type TimelineData = {
  id: number
  year: string
  title: string
  description: string
}

type InitiativeCardProps = {
  icon: LucideIcon
  title: string
  stats: string
  description: string
  color: string
  delay?: number
}

const Stars: React.FC = () => {
  const [stars, setStars] = useState<Star[]>([])

  useEffect(() => {
    const newStars: Star[] = Array.from({ length: 100 }, () => ({
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 2 + 1,
      duration: Math.random() * 3 + 2,
      delay: Math.random() * 2,
    }))

    setStars(newStars)
  }, [])

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {stars.map((star, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-white"
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: star.size,
            height: star.size,
          }}
          animate={{
            opacity: [0.2, 1, 0.2],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: star.duration,
            repeat: Infinity,
            delay: star.delay,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  )
}

// Floating astronaut/satellite
const FloatingObject = ({ delay = 0 }) => (
  <motion.div
    className="absolute w-16 h-16 opacity-20"
    initial={{ x: -100, y: 0 }}
    animate={{
      x: ["-100%", "100vw"],
      y: [0, -50, 0, 50, 0],
      rotate: [0, 360],
    }}
    transition={{
      duration: 30,
      repeat: Infinity,
      delay,
      ease: "linear",
    }}
  >
    <Rocket className="w-full h-full text-primary" />
  </motion.div>
)

const SolarSystem = () => {
  const planets = [
    { size: 4, orbitRadius: 60, color: "#8B5CF6", duration: 8 },
    { size: 6, orbitRadius: 90, color: "#EC4899", duration: 12 },
    { size: 5, orbitRadius: 120, color: "#3B82F6", duration: 16 },
    { size: 7, orbitRadius: 150, color: "#10B981", duration: 20 },
    { size: 8, orbitRadius: 180, color: "#F59E0B", duration: 24 },
    { size: 6, orbitRadius: 210, color: "#6366F1", duration: 28 },
    { size: 7, orbitRadius: 240, color: "#14B8A6", duration: 32 },
    { size: 5, orbitRadius: 270, color: "#A855F7", duration: 36 },
  ]

  return (
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
      {/* Sun */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-linear-to-br from-yellow-400 to-orange-500"
        animate={{
          boxShadow: [
            "0 0 20px rgba(251, 191, 36, 0.5)",
            "0 0 40px rgba(251, 191, 36, 0.8)",
            "0 0 20px rgba(251, 191, 36, 0.5)",
          ],
        }}
        transition={{ duration: 2, repeat: Infinity }}
      />
      
      {/* Planets */}
      {planets.map((planet, i) => (
        <motion.div
          key={i}
          className="absolute top-1/2 left-1/2"
          style={{
            width: planet.orbitRadius * 2,
            height: planet.orbitRadius * 2,
            marginLeft: -planet.orbitRadius,
            marginTop: -planet.orbitRadius,
          }}
          animate={{ rotate: 360 }}
          transition={{
            duration: planet.duration,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          <div
            className="absolute top-0 left-1/2 -translate-x-1/2 rounded-full"
            style={{
              width: planet.size,
              height: planet.size,
              backgroundColor: planet.color,
              boxShadow: `0 0 ${planet.size * 2}px ${planet.color}`,
            }}
          />
        </motion.div>
      ))}
      
      {/* Orbit rings */}
      {planets.map((planet, i) => (
        <div
          key={`orbit-${i}`}
          className="absolute top-1/2 left-1/2 rounded-full border border-white/5"
          style={{
            width: planet.orbitRadius * 2,
            height: planet.orbitRadius * 2,
            marginLeft: -planet.orbitRadius,
            marginTop: -planet.orbitRadius,
          }}
        />
      ))}
    </div>
  )
}

// Stat card with hover effect
const StatCard = ({ icon: Icon, value, label, delay = 0 }: StatCardProps) => {
  const [isHovered, setIsHovered] = useState(false)
  
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ delay }}
      whileHover={{ scale: 1.05, y: -5 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="glass rounded-2xl p-6 text-center relative overflow-hidden cursor-pointer"
    >
      <motion.div
        className="absolute inset-0 bg-linear-to-br from-primary/20 to-accent/20"
        animate={{ opacity: isHovered ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      />
      <motion.div
        animate={{ rotate: isHovered ? 360 : 0 }}
        transition={{ duration: 0.6 }}
      >
        <Icon size={32} className="text-primary mx-auto mb-3" />
      </motion.div>
      <motion.p
        className="text-3xl font-bold mb-1"
        animate={{ scale: isHovered ? 1.1 : 1 }}
        transition={{ duration: 0.3 }}
      >
        {value}
      </motion.p>
      <p className="text-sm text-muted-foreground">{label}</p>
    </motion.div>
  )
}

// Timeline item with advanced animation
const TimelineItem = ({ item, index }: TimelineItemProps) => {
  const [isHovered, setIsHovered] = useState(false)
  
  return (
    <motion.div
      initial={{ opacity: 0, x: -30 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className="relative pl-20 pb-12 last:pb-0"
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <motion.div
        className="absolute left-6 w-5 h-5 rounded-full bg-background border-2 border-primary"
        animate={{
          scale: isHovered ? 1.5 : 1,
          boxShadow: isHovered ? "0 0 20px rgba(139, 92, 246, 0.6)" : "none",
        }}
        transition={{ duration: 0.3 }}
      />

      <motion.div
        className="glass rounded-xl p-6 cursor-pointer"
        whileHover={{ scale: 1.02, x: 10 }}
        transition={{ duration: 0.3 }}
      >
        <span className="text-sm font-medium text-primary">{item.year}</span>
        <h3 className="text-lg font-semibold mt-1 mb-2">{item.title}</h3>
        <p className="text-sm text-muted-foreground">{item.description}</p>
      </motion.div>
    </motion.div>
  )
}

// Initiative card for Cisco partnership
const InitiativeCard = ({ icon: Icon, title, stats, description, color, delay = 0 }: InitiativeCardProps) => {
  const [isHovered, setIsHovered] = useState(false)
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay }}
      whileHover={{ scale: 1.03, y: -5 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="glass rounded-2xl p-6 relative overflow-hidden cursor-pointer"
    >
      <motion.div
        className={`absolute inset-0 bg-linear-to-br ${color}`}
        animate={{ opacity: isHovered ? 0.15 : 0.05 }}
        transition={{ duration: 0.3 }}
      />
      
      <div className="relative z-10">
        <motion.div
          animate={{ rotate: isHovered ? [0, -10, 10, 0] : 0 }}
          transition={{ duration: 0.5 }}
          className="w-14 h-14 rounded-xl bg-linear-to-br from-primary/20 to-accent/20 flex items-center justify-center mb-4"
        >
          <Icon size={28} className="text-primary" />
        </motion.div>
        
        <h3 className="text-xl font-semibold mb-2">{title}</h3>
        
        <motion.div
          className="text-4xl font-bold text-primary mb-3"
        >
          {stats}
        </motion.div>
        
        <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
      </div>
    </motion.div>
  )
}

export default function AboutPage() {
  const timeline = [
    {
      id: 1,
      year: "2025",
      title: "Foundation",
      description: "WLWJ was founded by a group of passionate cybersecurity students.",
    },
    {
      id: 2,
      year: "2025",
      title: "Our First Event",
      description: "Hosted Psyber Arena, Our first flagship event with 2 Seminars and a CTF Competition.",
    },
    {
      id: 3,
      year: "2025",
      title: "Cisco Partnership",
      description: "Partnered with Cisco Networking Academy for educational initiatives.",
    },
    {
      id: 4,
      year: "2025-26",
      title: "Regional Expansion",
      description: "Expanded operations to multiple campuses and went international.",
    },
    {
      id: 5,
      year: "2026",
      title: "Industry Recognition",
      description: "Recognized as a leading student cybersecurity organization.",
    },
  ]

  return (
    <main className="min-h-screen relative overflow-hidden bg-black">
      <Navbar />
      {/* Animated Space Background */}
      <div className="fixed inset-0 z-0">
        <Stars />
        <SolarSystem />
        
        {/* Nebula effects */}
        <motion.div
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.5, 0.3, 0.5],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      <div className="relative z-10">
        {/* Hero Section */}
        <section className="relative pt-32 pb-20">
          <div className="container mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center max-w-3xl mx-auto mb-16"
            >
              <motion.h1
                className="text-4xl md:text-6xl font-bold mb-6 bg-linear-to-r from-white via-primary to-accent bg-clip-text text-transparent"
                animate={{ backgroundPosition: ["0%", "100%", "0%"] }}
                transition={{ duration: 5, repeat: Infinity }}
              >
                About WLWJ
              </motion.h1>
              <motion.p
                className="text-xl text-muted-foreground text-balance"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                Empowering the next generation of cybersecurity professionals through immersive competitions and
                world-class education.
              </motion.p>
            </motion.div>

            {/* Executive Team Photo */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              whileHover={{ scale: 1.02 }}
              className="relative max-w-4xl mx-auto group"
            >
              <motion.div
                className="absolute inset-0 bg-linear-to-r from-primary to-accent rounded-3xl blur-xl opacity-20"
                animate={{ opacity: [0.2, 0.4, 0.2] }}
                transition={{ duration: 3, repeat: Infinity }}
              />
              <div className="relative glass rounded-3xl p-2 overflow-hidden">
                <div className="absolute inset-0 bg-linear-to-br from-primary/10 to-accent/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <img
                  src="/pic-15.jpeg"
                  alt="WLWJ Executive Team"
                  className="w-full h-auto rounded-2xl relative z-10"
                />
              </div>
              <p className="text-center text-sm text-muted-foreground mt-4">The WLWJ Executive Team - 2026</p>
            </motion.div>
          </div>
        </section>

        {/* Who We Are */}
        <section className="py-24 relative border-t border-white/5">
          <div className="container mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
                <motion.h2
                  className="text-3xl md:text-5xl font-bold mb-6"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                >
                  Who We Are
                </motion.h2>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  WLWJ is a student-run cybersecurity organization dedicated to fostering the next wave of security
                  professionals. Founded in 2025, we've grown from a small group of enthusiasts to a thriving community
                  spanning multiple campuses and reaching international participants.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  Our team comprises passionate students, industry mentors, and academic advisors who share a common
                  vision: making cybersecurity education accessible, engaging, and impactful for everyone.
                </p>
              </motion.div>

              <div className="grid grid-cols-2 gap-4">
                <StatCard icon={Users} value="50+" label="Active Members" delay={0.1} />
                <StatCard icon={Award} value="5+" label="Events Hosted" delay={0.2} />
                <StatCard icon={Target} value="100+" label="Challenges Created" delay={0.3} />
                <StatCard icon={BookOpen} value="5+" label="Partner Organizations" delay={0.4} />
              </div>
            </div>
          </div>
        </section>

        {/* What We Do */}
        <section className="py-24 relative border-t border-white/5">
          <div className="container mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl md:text-5xl font-bold mb-4">What We Do</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                From hosting world-class CTF competitions to providing free educational resources, we're committed to
                building a stronger cybersecurity community.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  icon: Target,
                  title: "CTF Competitions",
                  desc: "We design and host themed Capture The Flag competitions that challenge participants across all skill levels, from beginners to advanced security researchers.",
                },
                {
                  icon: BookOpen,
                  title: "Educational Programs",
                  desc: "Through partnerships with industry leaders like Cisco Networking Academy, we provide free courses, workshops, and certification pathways.",
                },
                {
                  icon: Users,
                  title: "Community Building",
                  desc: "We foster a supportive community where members can network, collaborate, and grow together in their cybersecurity journey.",
                },
              ].map((item, index) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.05, rotateY: 5 }}
                  className="glass rounded-2xl p-8 cursor-pointer relative overflow-hidden group"
                >
                  <motion.div
                    className="absolute inset-0 bg-linear-to-br from-primary/10 to-accent/10 opacity-0 group-hover:opacity-100"
                    transition={{ duration: 0.3 }}
                  />
                  <motion.div
                    className="w-14 h-14 rounded-xl bg-linear-to-br from-primary/20 to-accent/20 flex items-center justify-center mb-6 relative z-10"
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                  >
                    <item.icon size={28} className="text-primary" />
                  </motion.div>
                  <h3 className="text-xl font-semibold mb-3 relative z-10">{item.title}</h3>
                  <p className="text-muted-foreground leading-relaxed relative z-10">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Timeline */}
        <section className="py-24 relative border-t border-white/5">
          <div className="container mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl md:text-5xl font-bold mb-4">Our Journey</h2>
              <p className="text-muted-foreground">Key milestones in the WLWJ story</p>
            </motion.div>

            <div className="max-w-3xl mx-auto">
              <div className="relative">
                <motion.div
                  className="absolute left-8 top-0 bottom-0 w-px bg-linear-to-b from-primary via-accent to-primary/20"
                  initial={{ scaleY: 0 }}
                  whileInView={{ scaleY: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.5 }}
                  style={{ transformOrigin: "top" }}
                />

                {timeline.map((item, index) => (
                  <TimelineItem key={item.id} item={item} index={index} />
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Cisco Partnership */}
        <section className="py-24 relative border-t border-white/5">
          <div className="container mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <span className="inline-block px-4 py-1 glass rounded-full text-sm text-primary mb-4">
                Strategic Partnership
              </span>
              <h2 className="text-3xl md:text-5xl font-bold mb-4">Cisco Networking Academy</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Our partnership with Cisco Networking Academy enables us to provide world-class cybersecurity
                education and reach thousands of learners across Pakistan.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
              <InitiativeCard
                icon={GraduationCap}
                title="Tech Tayari 1.0"
                stats="2,000+"
                description="A comprehensive free learning initiative that empowered over 2,000 students with essential cybersecurity and networking skills through hands-on training and interactive sessions."
                color="from-blue-500/20 to-cyan-500/20"
                delay={0.2}
              />
              
              <InitiativeCard
                icon={Trophy}
                title="NetAcad Cup"
                stats="1,500+"
                description="An ongoing competitive learning program with 1,500+ students participating in challenges, quizzes, and networking competitions to showcase their skills and win exciting prizes."
                color="from-purple-500/20 to-pink-500/20"
                delay={0.2}
              />
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="mt-12 glass rounded-2xl p-8 text-center max-w-2xl mx-auto relative overflow-hidden"
            >
              {/* Subtle cosmic glow */}
              <div className="absolute inset-0 pointer-events-none">
                <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-96 h-96 rounded-full bg-primary/10 blur-3xl" />
              </div>

              {/* Logo */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="relative z-10 flex justify-center mb-4"
              >
                <img
                  src="/Cisco_academy_logo.png"
                  alt="Cisco Networking Academy"
                  className="h-16 md:h-32 object-contain drop-shadow-[0_0_20px_rgba(0,170,255,0.35)]"
                />
              </motion.div>

              {/* Text */}
              <div className="relative z-10 text-xl text-muted-foreground mb-1">
                Networking Academy
              </div>
              <div className="relative z-10 text-sm text-muted-foreground">
                Official Education Partner
              </div>

              {/* Stats */}
              <div className="relative z-10 grid grid-cols-2 gap-4 mt-6">
                <div className="glass rounded-xl p-4">
                  <p className="text-2xl font-bold text-primary">3,500+</p>
                  <p className="text-xs text-muted-foreground">
                    Total Learners Reached
                  </p>
                </div>
                <div className="glass rounded-xl p-4">
                  <p className="text-2xl font-bold text-primary">2</p>
                  <p className="text-xs text-muted-foreground">
                    Major Initiatives
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
      <Footer />
    </main>
  )
}