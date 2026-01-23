"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { X, ChevronLeft, ChevronRight, Calendar, MapPin, Users } from "lucide-react"

type EventType = "all" | "ctf" | "workshop" | "conference"
type Year = "all" | "2024" | "2025" | "2026"

interface GalleryEvent {
  id: string
  title: string
  type: "ctf" | "workshop" | "conference"
  year: "2024" | "2025" | "2026"
  date: string
  location: string
  participants: number
  description: string
  images: { src: string; alt: string }[]
}

const events: GalleryEvent[] = [
  {
    id: "pokemon-ctf-2026",
    title: "Pokémon CTF 2026",
    type: "ctf",
    year: "2026",
    date: "March 15, 2026",
    location: "Virtual",
    participants: 120,
    description: "Our electrifying Pokémon-themed CTF brought together 120 participants for 24 hours of challenges.",
    images: [
      { src: "/cybersecurity-competition-gaming-setup-neon-lights.jpg", alt: "Gaming setup" },
      { src: "/students-hacking-computers-pokemon-theme.jpg", alt: "Students competing" },
      { src: "/team-celebration-trophy-winning.jpg", alt: "Winners" },
      { src: "/award-ceremony-medals-podium.jpg", alt: "Awards" },
    ],
  },
  {
    id: "assassins-ctf-2026",
    title: "Assassin's Creed CTF 2026",
    type: "ctf",
    year: "2026",
    date: "April 22, 2026",
    location: "Campus Arena",
    participants: 150,
    description: "Stealth and precision were key in this 36-hour infiltration-themed competition.",
    images: [
      { src: "/dark-mysterious-hacker-setup-stealth-theme.jpg", alt: "Stealth setup" },
      { src: "/hooded-figures-coding-competition-dark.jpg", alt: "Competitors" },
      { src: "/strategic-planning-team-dark-room.jpg", alt: "Strategy" },
      { src: "/team-victory-dark-aesthetic.jpg", alt: "Victory" },
    ],
  },
  {
    id: "cybersec-workshop-2025",
    title: "Cybersecurity Fundamentals Workshop",
    type: "workshop",
    year: "2025",
    date: "November 10, 2025",
    location: "Tech Hub",
    participants: 80,
    description: "A hands-on workshop covering network security, penetration testing basics, and threat analysis.",
    images: [
      { src: "/presentation-cybersecurity-stage.jpg", alt: "Presentation" },
      { src: "/networking-event-students-talking.jpg", alt: "Networking" },
      { src: "/coding-hackathon-late-night.jpg", alt: "Hands-on session" },
      { src: "/ctf-challenge-screen-code-terminal.jpg", alt: "Practice" },
    ],
  },
  {
    id: "annual-conference-2025",
    title: "WLWJ Annual Conference 2025",
    type: "conference",
    year: "2025",
    date: "September 5-6, 2025",
    location: "Convention Center",
    participants: 300,
    description: "Our flagship annual conference featuring keynotes from industry leaders and hands-on workshops.",
    images: [
      { src: "/medieval-theme-tech-event.jpg", alt: "Main stage" },
      { src: "/presentation-cybersecurity-stage.jpg", alt: "Keynote" },
      { src: "/networking-event-students-talking.jpg", alt: "Networking" },
      { src: "/code-breakthrough-celebration-subtle.jpg", alt: "Workshop" },
    ],
  },
  {
    id: "summer-ctf-2024",
    title: "Summer Hack CTF 2024",
    type: "ctf",
    year: "2024",
    date: "July 20, 2024",
    location: "Virtual",
    participants: 90,
    description: "Our summer competition focused on web exploitation and cryptography challenges.",
    images: [
      { src: "/coding-hackathon-late-night.jpg", alt: "Late night hacking" },
      { src: "/ctf-challenge-screen-code-terminal.jpg", alt: "Challenges" },
      { src: "/team-celebration-trophy-winning.jpg", alt: "Celebration" },
      { src: "/award-ceremony-medals-podium.jpg", alt: "Podium" },
    ],
  },
  {
    id: "intro-workshop-2024",
    title: "Introduction to CTF Workshop",
    type: "workshop",
    year: "2024",
    date: "March 8, 2024",
    location: "University Campus",
    participants: 50,
    description: "A beginner-friendly workshop introducing students to the world of CTF competitions.",
    images: [
      { src: "/presentation-cybersecurity-stage.jpg", alt: "Introduction" },
      { src: "/students-hacking-computers-pokemon-theme.jpg", alt: "Practice" },
      { src: "/networking-event-students-talking.jpg", alt: "Q&A" },
      { src: "/code-breakthrough-celebration-subtle.jpg", alt: "Completion" },
    ],
  },
]

const typeLabels: Record<EventType, string> = {
  all: "All Events",
  ctf: "CTF Competitions",
  workshop: "Workshops",
  conference: "Conferences",
}

const yearLabels: Record<Year, string> = {
  all: "All Years",
  "2024": "2024",
  "2025": "2025",
  "2026": "2026",
}

export default function GalleryPage() {
  const [selectedType, setSelectedType] = useState<EventType>("all")
  const [selectedYear, setSelectedYear] = useState<Year>("all")
  const [selectedEvent, setSelectedEvent] = useState<GalleryEvent | null>(null)
  const [selectedImageIndex, setSelectedImageIndex] = useState<number>(0)

  const filteredEvents = events.filter((event) => {
    const typeMatch = selectedType === "all" || event.type === selectedType
    const yearMatch = selectedYear === "all" || event.year === selectedYear
    return typeMatch && yearMatch
  })

  const openModal = (event: GalleryEvent) => {
    setSelectedEvent(event)
    setSelectedImageIndex(0)
  }

  const closeModal = () => {
    setSelectedEvent(null)
    setSelectedImageIndex(0)
  }

  const nextImage = () => {
    if (selectedEvent) {
      setSelectedImageIndex((prev) => (prev + 1) % selectedEvent.images.length)
    }
  }

  const prevImage = () => {
    if (selectedEvent) {
      setSelectedImageIndex((prev) => (prev - 1 + selectedEvent.images.length) % selectedEvent.images.length)
    }
  }

  return (
    <main className="min-h-screen noise">
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-32 pb-16 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
          <div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-6">Event Gallery</h1>
            <p className="text-xl text-muted-foreground">
              Explore moments from our CTF competitions, workshops, and conferences
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filters */}
      <section className="py-8 border-y border-white/5">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-center gap-6">
            {/* Type Filter */}
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">Type:</span>
              <div className="flex gap-2">
                {(Object.keys(typeLabels) as EventType[]).map((type) => (
                  <button
                    key={type}
                    onClick={() => setSelectedType(type)}
                    className={`px-4 py-2 rounded-full text-sm transition-all ${
                      selectedType === type
                        ? "bg-primary text-primary-foreground"
                        : "glass hover:bg-white/10 text-muted-foreground"
                    }`}
                  >
                    {typeLabels[type]}
                  </button>
                ))}
              </div>
            </div>

            {/* Year Filter */}
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">Year:</span>
              <div className="flex gap-2">
                {(Object.keys(yearLabels) as Year[]).map((year) => (
                  <button
                    key={year}
                    onClick={() => setSelectedYear(year)}
                    className={`px-4 py-2 rounded-full text-sm transition-all ${
                      selectedYear === year
                        ? "bg-primary text-primary-foreground"
                        : "glass hover:bg-white/10 text-muted-foreground"
                    }`}
                  >
                    {yearLabels[year]}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <AnimatePresence mode="wait">
            {filteredEvents.length > 0 ? (
              <motion.div
                key={`${selectedType}-${selectedYear}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              >
                {filteredEvents.map((event, index) => (
                  <motion.div
                    key={event.id}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="group cursor-pointer"
                    onClick={() => openModal(event)}
                  >
                    <div className="glass glass-hover rounded-2xl overflow-hidden">
                      {/* Preview Image */}
                      <div className="relative aspect-video overflow-hidden">
                        <img
                          src={event.images[0].src || "/placeholder.svg"}
                          alt={event.title}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent" />

                        {/* Type Badge */}
                        <span className="absolute top-4 left-4 px-3 py-1 glass rounded-full text-xs capitalize">
                          {event.type}
                        </span>

                        {/* Image Count */}
                        <span className="absolute top-4 right-4 px-3 py-1 glass rounded-full text-xs">
                          {event.images.length} photos
                        </span>
                      </div>

                      {/* Event Info */}
                      <div className="p-6">
                        <h3 className="text-lg font-semibold mb-2 group-hover:text-primary transition-colors">
                          {event.title}
                        </h3>
                        <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Calendar size={12} />
                            {event.date}
                          </span>
                          <span className="flex items-center gap-1">
                            <MapPin size={12} />
                            {event.location}
                          </span>
                          <span className="flex items-center gap-1">
                            <Users size={12} />
                            {event.participants}
                          </span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-16 text-muted-foreground"
              >
                <p>No events found matching your filters.</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* Event Modal */}
      <AnimatePresence>
        {selectedEvent && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4"
            onClick={closeModal}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative max-w-5xl w-full glass rounded-2xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={closeModal}
                className="absolute top-4 right-4 z-10 text-white/70 hover:text-white transition-colors"
                aria-label="Close modal"
              >
                <X size={24} />
              </button>

              <div className="grid grid-cols-1 lg:grid-cols-2">
                {/* Image Section */}
                <div className="relative aspect-video lg:aspect-auto lg:h-full">
                  <img
                    src={selectedEvent.images[selectedImageIndex].src || "/placeholder.svg"}
                    alt={selectedEvent.images[selectedImageIndex].alt}
                    className="w-full h-full object-cover"
                  />

                  {/* Navigation */}
                  {selectedEvent.images.length > 1 && (
                    <>
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          prevImage()
                        }}
                        className="absolute left-4 top-1/2 -translate-y-1/2 p-2 glass rounded-full text-white/70 hover:text-white transition-colors"
                        aria-label="Previous image"
                      >
                        <ChevronLeft size={24} />
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          nextImage()
                        }}
                        className="absolute right-4 top-1/2 -translate-y-1/2 p-2 glass rounded-full text-white/70 hover:text-white transition-colors"
                        aria-label="Next image"
                      >
                        <ChevronRight size={24} />
                      </button>

                      {/* Dots */}
                      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                        {selectedEvent.images.map((_, idx) => (
                          <button
                            key={idx}
                            onClick={(e) => {
                              e.stopPropagation()
                              setSelectedImageIndex(idx)
                            }}
                            className={`w-2 h-2 rounded-full transition-all ${
                              idx === selectedImageIndex ? "bg-white" : "bg-white/40"
                            }`}
                            aria-label={`Go to image ${idx + 1}`}
                          />
                        ))}
                      </div>
                    </>
                  )}
                </div>

                {/* Info Section */}
                <div className="p-8">
                  <span className="inline-block px-3 py-1 glass rounded-full text-xs capitalize mb-4">
                    {selectedEvent.type}
                  </span>
                  <h2 className="text-2xl font-bold mb-4">{selectedEvent.title}</h2>
                  <p className="text-muted-foreground mb-6">{selectedEvent.description}</p>

                  <div className="space-y-3 text-sm">
                    <div className="flex items-center gap-3">
                      <Calendar size={16} className="text-primary" />
                      <span>{selectedEvent.date}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <MapPin size={16} className="text-primary" />
                      <span>{selectedEvent.location}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Users size={16} className="text-primary" />
                      <span>{selectedEvent.participants} participants</span>
                    </div>
                  </div>

                  {/* Thumbnail Gallery */}
                  <div className="mt-8">
                    <p className="text-sm text-muted-foreground mb-3">All Photos</p>
                    <div className="grid grid-cols-4 gap-2">
                      {selectedEvent.images.map((img, idx) => (
                        <button
                          key={idx}
                          onClick={() => setSelectedImageIndex(idx)}
                          className={`aspect-square rounded-lg overflow-hidden border-2 transition-all ${
                            idx === selectedImageIndex
                              ? "border-primary"
                              : "border-transparent opacity-60 hover:opacity-100"
                          }`}
                        >
                          <img
                            src={img.src || "/placeholder.svg"}
                            alt={img.alt}
                            className="w-full h-full object-cover"
                          />
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <Footer />
    </main>
  )
}
