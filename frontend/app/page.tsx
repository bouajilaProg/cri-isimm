import HeroSection from "@/components/hero-section"
import IntroductionSection from "@/components/introduction-section"
import FaqSection from "@/components/faq-section"
import Footer from "@/components/footer"

export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col">
      <HeroSection />
      <IntroductionSection />
      <FaqSection />
      <Footer />
    </main>
  )
}

