import type React from "react"
import type { Metadata, Viewport } from "next"
import { Space_Grotesk, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"

const spaceGrotesk = Space_Grotesk({ subsets: ["latin"] })
const geistMono = Geist_Mono({ subsets: ["latin"], variable: "--font-mono" })

export const metadata: Metadata = {
  title: "WLWJ | Forging Cyber Warriors",
  description:
    "Student-run cybersecurity startup providing premium CTF event hosting services. Space-grade challenges for the next generation of cyber warriors.",
  keywords: ["CTF", "Capture The Flag", "Cybersecurity", "Hacking", "Competition", "Student"],
    generator: 'v0.app'
}

export const viewport: Viewport = {
  themeColor: "#0a0a1a",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${spaceGrotesk.className} ${geistMono.variable} font-sans antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
