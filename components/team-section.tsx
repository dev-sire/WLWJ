"use client"

import type * as React from "react"
import { cn } from "@/lib/utils"
import { Twitter, Github, Linkedin, Instagram } from "lucide-react"
import { motion } from "framer-motion"

interface SocialLink {
  icon: React.ElementType
  href: string
}

interface TeamMember {
  name: string
  designation: string
  imageSrc: string
  socialLinks?: SocialLink[]
}

const teamMembers: TeamMember[] = [
  {
    name: "Abdul Wasay Khan",
    designation: "Farigh 1",
    imageSrc: "/wasay-2.jpg",
    socialLinks: [
      { icon: Twitter, href: "#" },
      { icon: Linkedin, href: "#" },
    ],
  },
  {
    name: "Rabia Ishtiaq",
    designation: "Farigh 2",
    imageSrc: "/rabia.jpeg",
    socialLinks: [
      { icon: Github, href: "#" },
      { icon: Twitter, href: "#" },
    ],
  },
  {
    name: "Hafsah Anwaar Ali",
    designation: "Farigh 3",
    imageSrc: "/hafsa.jpg",
    socialLinks: [
      { icon: Linkedin, href: "#" },
      { icon: Instagram, href: "#" },
    ],
  },
  {
    name: "Ammara Qazi",
    designation: "Farigh 4",
    imageSrc: "/ammara.jpeg",
    socialLinks: [
      { icon: Twitter, href: "#" },
      { icon: Instagram, href: "#" },
    ],
  },
  {
    name: "Ubaid Raza",
    designation: "Farigh 5",
    imageSrc: "/ubaid.jpg",
    socialLinks: [
      { icon: Github, href: "#" },
      { icon: Linkedin, href: "#" },
    ],
  },
  {
    name: "Syed Usaiym Junaid",
    designation: "Farigh 6",
    imageSrc: "/usaiym.jpg",
    socialLinks: [
      { icon: Twitter, href: "#" },
      { icon: Github, href: "#" },
    ],
  },
  {
    name: "Sofia Asif",
    designation: "Farigh 7",
    imageSrc: "/sofia.jpeg",
    socialLinks: [
      { icon: Github, href: "#" },
      { icon: Linkedin, href: "#" },
    ],
  },
  {
    name: "Aman Shahid",
    designation: "Farigh 8",
    imageSrc: "/aman.jpg",
    socialLinks: [
      { icon: Instagram, href: "#" },
      { icon: Twitter, href: "#" },
    ],
  },
]

const mainSocialLinks = [
  { icon: Twitter, href: "#" },
  { icon: Instagram, href: "#" },
  { icon: Github, href: "#" },
  { icon: Linkedin, href: "#" },
]

export function TeamSection() {
  return (
    <section className="relative w-full overflow-hidden py-24 md:py-32 border-t border-white/10 z-2">
      <div className="container mx-auto px-6">
        {/* Background Grid */}
        <div className="absolute inset-0 z-0 opacity-5">
          <svg className="h-full w-full" fill="none">
            <defs>
              <pattern id="grid" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M40 0L0 0 0 40" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-white" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>

        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="relative z-10 flex w-full flex-col items-center justify-between gap-6 mb-8 md:flex-row md:items-start"
        >
          <div className="text-center md:text-left">
            <h2 className="text-4xl md:text-6xl font-bold tracking-tight text-gray-500">
              <span className="text-white block text-lg sm:text-xl md:text-2xl font-medium tracking-[0.2em] mb-2">
                O U R
              </span>
              CREATIVE TEAM
            </h2>
            <p className="max-w-[600px] text-gray-400 mt-4 text-lg">
              Meet the passionate individuals who make WLWJ possible. Our diverse team brings together expertise in
              cybersecurity, event management, and community building.
            </p>
          </div>
          <div className="flex flex-col items-center gap-4 md:items-end">
            <span className="text-2xl font-bold text-white font-mono tracking-wider">WLWJ</span>
          </div>
        </motion.div>

        {/* Main Social Links */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="relative z-10 flex w-full items-center justify-center gap-4 py-6 mb-8"
        >
          {mainSocialLinks.map((link, index) => (
            <a
              key={index}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-500 hover:text-white transition-colors duration-300"
            >
              <link.icon className="h-5 w-5" />
            </a>
          ))}
          <span className="text-gray-500 text-sm ml-2">www.wlwj.org</span>
        </motion.div>

        {/* Team Members Grid - 8 members in 4 columns */}
        <div className="relative z-10 mx-auto grid w-full max-w-6xl grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {teamMembers.map((member, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05, duration: 0.4 }}
              className={cn(
                "group relative flex flex-col items-center justify-end overflow-hidden rounded-2xl p-6 text-center transition-all duration-300 will-change-transform hover:scale-[1.02]",
                "bg-black border border-white/20 hover:border-white/35 hover:bg-white/8",
              )}
            >
              {/* Background wave animation on hover */}
              <div className="absolute bottom-0 left-0 right-0 h-1/2 origin-bottom scale-y-0 transform rounded-t-full bg-gradient-to-t from-white/10 to-transparent transition-transform duration-500 group-hover:scale-y-100" />

              {/* Member Image */}
              <div className="relative z-10 h-28 w-28 overflow-hidden rounded-full border-2 border-white/10 bg-white/5 transition-all duration-300 group-hover:border-white/30 group-hover:scale-105">
                <img
                  src={member.imageSrc || "/placeholder.svg"}
                  alt={member.name}
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
                />
              </div>

              <h3 className="relative z-10 mt-4 text-lg font-semibold text-white">{member.name}</h3>
              <p className="relative z-10 text-sm text-gray-400">{member.designation}</p>

              {/* Social Links */}
              {member.socialLinks && member.socialLinks.length > 0 && (
                <div className="relative z-10 mt-4 flex gap-3 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  {member.socialLinks.map((link, linkIndex) => (
                    <a
                      key={linkIndex}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-500 hover:text-white transition-colors duration-200"
                    >
                      <link.icon className="h-4 w-4" />
                    </a>
                  ))}
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
