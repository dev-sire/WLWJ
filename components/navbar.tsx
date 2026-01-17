"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"

const eventLinks = [
  { href: "/ctf/pokemon", label: "Pokemon CTF" },
  { href: "/ctf/assassins-creed", label: "Assassin's Creed CTF" },
  { href: "/ctf/pirates-of-the-caribbean", label: "Pirates of the Caribbean CTF" },
]

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/gallery", label: "Gallery" },
  { href: "/contact", label: "Contact" },
]

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [eventsOpen, setEventsOpen] = useState(false)
  const [mobileEventsOpen, setMobileEventsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setEventsOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.4 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? "bg-black/90 backdrop-blur-md border-b border-white/10 py-3" : "bg-transparent py-5"
        }`}
      >
        <nav className="container mx-auto px-6 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="relative w-10 h-10">
              <div className="absolute inset-0 bg-white rounded-lg" />
              <div className="absolute inset-1 bg-black rounded-md flex items-center justify-center">
                <span className="text-lg font-bold text-white">W</span>
              </div>
            </div>
            <span className="text-xl font-bold tracking-tight text-white">WLWJ</span>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            <Link href="/" className="text-sm text-gray-400 hover:text-white transition-colors">
              Home
            </Link>

            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setEventsOpen(!eventsOpen)}
                className="flex items-center gap-1 text-sm text-gray-400 hover:text-white transition-colors"
              >
                Events
                <ChevronDown size={14} className={`transition-transform ${eventsOpen ? "rotate-180" : ""}`} />
              </button>

              <AnimatePresence>
                {eventsOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 8 }}
                    transition={{ duration: 0.15 }}
                    className="absolute top-full left-0 mt-2 w-64 bg-black border border-white/10 rounded-lg shadow-lg overflow-hidden"
                  >
                    {eventLinks.map((link) => (
                      <Link
                        key={link.href}
                        href={link.href}
                        onClick={() => setEventsOpen(false)}
                        className="block px-4 py-3 text-sm text-gray-400 hover:text-white hover:bg-white/5 transition-colors"
                      >
                        {link.label}
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {navLinks.slice(1).map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm text-gray-400 hover:text-white transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="hidden md:block">
            <Button asChild className="bg-white text-black hover:bg-gray-200">
              <Link href="/contact">Get Started</Link>
            </Button>
          </div>

          <button className="md:hidden text-white" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </nav>
      </motion.header>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 md:hidden"
          >
            <div className="absolute inset-0 bg-black" />
            <nav className="relative pt-24 px-6 flex flex-col gap-4">
              <Link
                href="/"
                onClick={() => setMobileMenuOpen(false)}
                className="text-2xl font-semibold text-white hover:text-gray-400 transition-colors"
              >
                Home
              </Link>

              <div>
                <button
                  onClick={() => setMobileEventsOpen(!mobileEventsOpen)}
                  className="flex items-center gap-2 text-2xl font-semibold text-white"
                >
                  Events
                  <ChevronDown size={20} className={`transition-transform ${mobileEventsOpen ? "rotate-180" : ""}`} />
                </button>
                <AnimatePresence>
                  {mobileEventsOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden pl-4 mt-2 flex flex-col gap-2"
                    >
                      {eventLinks.map((link) => (
                        <Link
                          key={link.href}
                          href={link.href}
                          onClick={() => setMobileMenuOpen(false)}
                          className="text-lg text-gray-400 hover:text-white transition-colors"
                        >
                          {link.label}
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {navLinks.slice(1).map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-2xl font-semibold text-white hover:text-gray-400 transition-colors"
                >
                  {link.label}
                </Link>
              ))}

              <Button asChild className="mt-4 w-full bg-white text-black">
                <Link href="/contact" onClick={() => setMobileMenuOpen(false)}>
                  Get Started
                </Link>
              </Button>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
