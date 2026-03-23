import { Navbar } from "@/components/navbar"
import { Hero } from "@/components/landing/hero"
import { SuzianneSpotlight } from "@/components/landing/suzianne-spotlight"
import { Features } from "@/components/landing/features"
import { HowItWorks } from "@/components/landing/how-it-works"
import { CTA } from "@/components/landing/cta"
import { Footer } from "@/components/footer"

export default function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main>
        <Hero />
        <SuzianneSpotlight />
        <Features />
        <HowItWorks />
        <CTA />
      </main>
      <Footer />
    </div>
  )
}
