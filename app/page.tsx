import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { HeroSection } from "@/components/hero-section"
import { EventsSection } from "@/components/events-section"
import { AlliancesSection } from "@/components/alliances-section"
import { VisionSection } from "@/components/vision-section"
import { TeamSection } from "@/components/team-section"
import { SpatialBackground } from "@/components/spatial-background"
import { SpaceGallerySection } from "@/components/circular-gallery"

export default function HomePage() {
  return (
    <main className="min-h-screen relative bg-black">
      {/* Background animation layer */}
      <SpatialBackground />
      
      {/* Content layer */}
        <Navbar />
        <HeroSection />
        <EventsSection />
        <AlliancesSection />
        <SpaceGallerySection />
        <VisionSection />
        <TeamSection />
        <Footer />
    </main>
  )
}