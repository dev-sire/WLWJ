"use client"

import { motion } from "framer-motion"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { BookOpen, Award, Users, Target, GraduationCap, Globe } from "lucide-react"

const timeline = [
  {
    year: "2022",
    title: "Foundation",
    description: "WLWJ was founded by a group of passionate cybersecurity students.",
  },
  {
    year: "2023",
    title: "First CTF Event",
    description: "Hosted our inaugural CTF competition with 50 participants.",
  },
  {
    year: "2024",
    title: "Cisco Partnership",
    description: "Partnered with Cisco Networking Academy for educational initiatives.",
  },
  {
    year: "2025",
    title: "Regional Expansion",
    description: "Expanded operations to multiple campuses and went international.",
  },
  {
    year: "2026",
    title: "Industry Recognition",
    description: "Recognized as a leading student cybersecurity organization.",
  },
]

const initiatives = [
  {
    icon: GraduationCap,
    title: "Free Courses",
    description: "Access free cybersecurity courses across networking, ethical hacking, and defense strategies.",
  },
  {
    icon: Globe,
    title: "Global Community",
    description: "Connect with cybersecurity enthusiasts and professionals worldwide.",
  },
  {
    icon: Award,
    title: "Certifications",
    description: "Earn industry-recognized certifications through our partnership programs.",
  },
  {
    icon: Target,
    title: "Hands-on Labs",
    description: "Practice real-world scenarios in our virtual lab environments.",
  },
]

export default function AboutPage() {
  return (
    <main className="min-h-screen noise">
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
          <div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-6">About WLWJ</h1>
            <p className="text-xl text-muted-foreground text-balance">
              Empowering the next generation of cybersecurity professionals through immersive competitions and
              world-class education.
            </p>
          </motion.div>

          {/* Executive Team Photo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative max-w-4xl mx-auto"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-primary to-accent rounded-3xl blur-xl opacity-20" />
            <div className="relative glass rounded-3xl p-2">
              <img
                src="/executive-team-group-photo-professional.jpg"
                alt="WLWJ Executive Team"
                className="w-full h-auto rounded-2xl"
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
              <h2 className="text-3xl md:text-5xl font-bold mb-6">Who We Are</h2>
              <p className="text-muted-foreground leading-relaxed mb-6">
                WLWJ is a student-run cybersecurity organization dedicated to fostering the next wave of security
                professionals. Founded in 2022, we've grown from a small group of enthusiasts to a thriving community
                spanning multiple campuses and reaching international participants.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Our team comprises passionate students, industry mentors, and academic advisors who share a common
                vision: making cybersecurity education accessible, engaging, and impactful for everyone.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="grid grid-cols-2 gap-4"
            >
              <div className="glass rounded-2xl p-6 text-center">
                <Users size={32} className="text-primary mx-auto mb-3" />
                <p className="text-3xl font-bold mb-1">500+</p>
                <p className="text-sm text-muted-foreground">Active Members</p>
              </div>
              <div className="glass rounded-2xl p-6 text-center">
                <Award size={32} className="text-primary mx-auto mb-3" />
                <p className="text-3xl font-bold mb-1">25+</p>
                <p className="text-sm text-muted-foreground">Events Hosted</p>
              </div>
              <div className="glass rounded-2xl p-6 text-center">
                <Target size={32} className="text-primary mx-auto mb-3" />
                <p className="text-3xl font-bold mb-1">1000+</p>
                <p className="text-sm text-muted-foreground">Challenges Created</p>
              </div>
              <div className="glass rounded-2xl p-6 text-center">
                <BookOpen size={32} className="text-primary mx-auto mb-3" />
                <p className="text-3xl font-bold mb-1">15+</p>
                <p className="text-sm text-muted-foreground">Partner Organizations</p>
              </div>
            </motion.div>
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
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="glass glass-hover rounded-2xl p-8"
            >
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center mb-6">
                <Target size={28} className="text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">CTF Competitions</h3>
              <p className="text-muted-foreground leading-relaxed">
                We design and host themed Capture The Flag competitions that challenge participants across all skill
                levels, from beginners to advanced security researchers.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="glass glass-hover rounded-2xl p-8"
            >
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center mb-6">
                <BookOpen size={28} className="text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Educational Programs</h3>
              <p className="text-muted-foreground leading-relaxed">
                Through partnerships with industry leaders like Cisco Networking Academy, we provide free courses,
                workshops, and certification pathways.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="glass glass-hover rounded-2xl p-8"
            >
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center mb-6">
                <Users size={28} className="text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Community Building</h3>
              <p className="text-muted-foreground leading-relaxed">
                We foster a supportive community where members can network, collaborate, and grow together in their
                cybersecurity journey.
              </p>
            </motion.div>
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
              {/* Timeline line */}
              <div className="absolute left-8 top-0 bottom-0 w-px bg-gradient-to-b from-primary via-accent to-primary/20" />

              {timeline.map((item, index) => (
                <motion.div
                  key={item.year}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="relative pl-20 pb-12 last:pb-0"
                >
                  {/* Timeline dot */}
                  <div className="absolute left-6 w-5 h-5 rounded-full bg-background border-2 border-primary" />

                  <div className="glass rounded-xl p-6">
                    <span className="text-sm font-medium text-primary">{item.year}</span>
                    <h3 className="text-lg font-semibold mt-1 mb-2">{item.title}</h3>
                    <p className="text-sm text-muted-foreground">{item.description}</p>
                  </div>
                </motion.div>
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
            className="glass rounded-3xl p-8 md:p-12 relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl" />

            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <span className="inline-block px-4 py-1 glass rounded-full text-sm text-primary mb-4">
                  Strategic Partnership
                </span>
                <h2 className="text-3xl md:text-4xl font-bold mb-4">Cisco Networking Academy</h2>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  Our partnership with Cisco Networking Academy enables us to provide world-class cybersecurity
                  education to our community. Members gain access to industry-leading curriculum, hands-on labs, and
                  certification pathways.
                </p>
                <div className="grid grid-cols-2 gap-4">
                  {initiatives.map((initiative, index) => (
                    <div key={initiative.title} className="flex items-start gap-3">
                      <initiative.icon size={20} className="text-primary mt-0.5" />
                      <div>
                        <h4 className="font-medium text-sm">{initiative.title}</h4>
                        <p className="text-xs text-muted-foreground">{initiative.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-center">
                <div className="glass rounded-2xl p-8 text-center">
                  <div className="text-6xl font-bold text-primary mb-2">Cisco</div>
                  <div className="text-xl text-muted-foreground">Networking Academy</div>
                  <div className="mt-4 text-sm text-muted-foreground">Official Education Partner</div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
