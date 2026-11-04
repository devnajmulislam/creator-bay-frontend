import { AboutSection } from "@/components/home/about-section"
import { BookingStepsSection } from "@/components/home/booking-steps-section"
import { CategorySection } from "@/components/home/category-section"
import { FeaturedStudiosSection } from "@/components/home/featured-studios-section"
import { FinalCtaSection } from "@/components/home/final-cta-section"
import { HeroSlider } from "@/components/home/hero-slider"
import { HostGuaranteeSection } from "@/components/home/host-guarantee-section"
import { getHeroSlides } from "@/services/home-service"

export default function HomePage() {
  const slides = getHeroSlides()

  return (
    <>
      <HeroSlider slides={slides} />
      <FeaturedStudiosSection />
      <CategorySection />
      <BookingStepsSection />
      <AboutSection />
      <HostGuaranteeSection />
      <FinalCtaSection />
    </>
  )
}
