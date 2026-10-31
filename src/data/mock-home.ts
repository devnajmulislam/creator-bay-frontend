import type {
  BookingStep,
  HeroSlide,
  HomeCtaContent,
  HostGuarantee,
} from "@/types/home"

export const heroSlides: HeroSlide[] = [
  {
    id: "hero-creative-spaces",
    eyebrow: "Creative spaces, on demand",
    title: "A room for every\nidea worth making.",
    description:
      "Book photography studios, film stages, podcast rooms, and music spaces from independent hosts across the country.",
    image: "/images/hero-photography.jpg",
    imageAlt: "Orange seamless backdrop in a bright photography studio",
    align: "left",
    note: "320+ verified spaces across 18 cities",
    primaryCta: { label: "Explore studios", href: "/studios" },
    secondaryCta: { label: "List your space", href: "/add-studio" },
  },
  {
    id: "hero-production",
    eyebrow: "Film & production",
    title: "Built for the\nnext take.",
    description:
      "Find production-ready stages with the power, access, and quiet your crew needs to do their best work.",
    image: "/images/hero-film.jpg",
    imageAlt: "Film crew preparing a lit set inside a large production stage",
    align: "right",
    note: "Load-in ready · Blackout capable · Crew approved",
    primaryCta: {
      label: "Browse production spaces",
      href: "/studios?category=film",
    },
    secondaryCta: { label: "How booking works", href: "#how-it-works" },
  },
  {
    id: "hero-sound",
    eyebrow: "Music & audio",
    title: "Make the room\nsound like you.",
    description:
      "From analog consoles to acoustically treated podcast booths, book a space that lets the work speak for itself.",
    image: "/images/hero-music.jpg",
    imageAlt: "Mixing console and guitars inside a warmly lit music studio",
    align: "left",
    note: "Verified hosts · Flexible hours · Gear included",
    primaryCta: {
      label: "Find a sound space",
      href: "/studios?category=music",
    },
    secondaryCta: { label: "Meet the hosts", href: "/about" },
  },
]

export const bookingSteps: BookingStep[] = [
  {
    number: "01",
    title: "Find your space",
    description:
      "Browse by discipline, neighbourhood, or the exact gear you need for the day.",
    icon: "search",
  },
  {
    number: "02",
    title: "Pick a time",
    description:
      "Compare availability and choose the hours that fit your production schedule.",
    icon: "calendar",
  },
  {
    number: "03",
    title: "Confirm the details",
    description:
      "Your host receives a clear brief, and you get a confirmed booking with everything in one place.",
    icon: "check",
  },
  {
    number: "04",
    title: "Make something great",
    description:
      "Show up, settle in, and use the space without the usual friction or guesswork.",
    icon: "sparkles",
  },
]

export const hostGuarantees: HostGuarantee[] = [
  {
    title: "Vetted hosts",
    description:
      "Every studio is reviewed for equipment, access, and the details that matter on shoot day.",
    icon: "badge",
  },
  {
    title: "Booking protection",
    description:
      "Clear terms, secure records, and a support team that steps in if plans change.",
    icon: "shield",
  },
  {
    title: "Real human support",
    description:
      "Creators and hosts get direct help from people who understand production.",
    icon: "support",
  },
]

export const finalCta: HomeCtaContent = {
  eyebrow: "Your next project starts here",
  title: "Find the space.\nMake the thing.",
  description:
    "Browse independent studios with the character, gear, and flexibility that corporate spaces cannot offer.",
  note: "No listing fees · Secure bookings · Cancel with confidence",
  image: "/images/studio-film.jpg",
  imageAlt: "Production crew arranging lighting on a film set",
  primaryCta: { label: "Explore studios", href: "/studios" },
  secondaryCta: { label: "Become a host", href: "/add-studio" },
}
