import type { StudioCategory } from "@/types/studio"

export const mockCategories: StudioCategory[] = [
  {
    id: "category-photography",
    slug: "photography",
    name: "Photo Studios",
    description:
      "Daylight studios, cycloramas, and fully equipped sets for editorial and commercial work.",
    listingCount: 124,
    image: "/images/hero-photography.jpg",
    imageAlt: "Photography studio with an orange seamless backdrop",
  },
  {
    id: "category-film",
    slug: "film",
    name: "Sound Stages",
    description:
      "Production stages, blackout rooms, and load-in-ready spaces built for crews.",
    listingCount: 68,
    image: "/images/hero-film.jpg",
    imageAlt: "Film production crew on a large sound stage",
  },
  {
    id: "category-podcast",
    slug: "podcast",
    name: "Podcast Rooms",
    description:
      "Quiet, treated rooms with broadcast mics and remote-guest setups.",
    listingCount: 46,
    image: "/images/studio-podcast.jpg",
    imageAlt: "Podcast microphones on a table in a treated studio",
  },
  {
    id: "category-music",
    slug: "music",
    name: "Music Suites",
    description:
      "Recording rooms, vocal booths, and analog gear for sessions of every size.",
    listingCount: 37,
    image: "/images/hero-music.jpg",
    imageAlt: "Warmly lit music studio with a mixing console",
  },
  {
    id: "category-creative",
    slug: "creative",
    name: "Art Workshops",
    description:
      "Open lofts and flexible workrooms for workshops, fittings, and content days.",
    listingCount: 52,
    image: "/images/category-creative.jpg",
    imageAlt: "Bright open-plan creative studio with lounge seating",
  },
  {
    id: "category-events",
    slug: "events",
    name: "Event Spaces",
    description:
      "Intimate venues and blank-canvas rooms for launches, screenings, and gatherings.",
    listingCount: 29,
    image: "/images/category-events.jpg",
    imageAlt: "Elegant event hall set with round tables and chandeliers",
  },
]
