import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { HeroSection } from "@/components/hero-section"
import { EventsSection } from "@/components/events-section"
import { AlliancesSection } from "@/components/alliances-section"
import { VisionSection } from "@/components/vision-section"
import { TeamSection } from "@/components/team-section"

export default function HomePage() {
  return (
    <main className="min-h-screen noise">
      <Navbar />
      <HeroSection />
      <EventsSection />
      <AlliancesSection />
      <VisionSection />
      <TeamSection />
      <Footer />
    </main>
  )
}
