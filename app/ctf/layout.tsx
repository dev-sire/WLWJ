import type React from "react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"

export default function CTFLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <main className="min-h-screen noise">
      <Navbar />
      {children}
      <Footer />
    </main>
  )
}
