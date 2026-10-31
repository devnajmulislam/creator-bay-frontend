import type {
  StudioCategorySlug,
  StudioDetail,
  StudioImage,
} from "@/types/studio"

export type StudioDetailContent = Pick<
  StudioDetail,
  "overview" | "securityDeposit" | "host"
>

export const studioGalleryPools: Record<
  StudioCategorySlug,
  StudioImage[]
> = {
  photography: [
    {
      src: "/images/hero-photography.jpg",
      alt: "Warm orange seamless backdrop in a photography studio",
    },
    {
      src: "/images/studio-neutral.jpg",
      alt: "Daylight portrait set with a table and soft shadows",
    },
    {
      src: "/images/studio-pink.jpg",
      alt: "Pink cyclorama with a stool and studio lighting",
    },
    {
      src: "/images/studio-loft.jpg",
      alt: "Bright creative loft with lounge seating",
    },
    {
      src: "/images/category-creative.jpg",
      alt: "Open creative space with natural light and modern furniture",
    },
  ],
  film: [
    {
      src: "/images/hero-film.jpg",
      alt: "Film crew preparing lights on a large stage",
    },
    {
      src: "/images/studio-film.jpg",
      alt: "Production crew working around a lit film set",
    },
    {
      src: "/images/category-events.jpg",
      alt: "Large flexible room set for a production or gathering",
    },
    {
      src: "/images/studio-loft.jpg",
      alt: "Open-plan creative space with seating and worktables",
    },
    {
      src: "/images/category-creative.jpg",
      alt: "Bright studio interior with flexible furniture",
    },
  ],
  podcast: [
    {
      src: "/images/studio-podcast.jpg",
      alt: "Broadcast microphones set up in a podcast studio",
    },
    {
      src: "/images/hero-music.jpg",
      alt: "Mixing console and warm lighting in a recording room",
    },
    {
      src: "/images/studio-music.jpg",
      alt: "Keyboard, microphone, and headphones in a music room",
    },
    {
      src: "/images/category-creative.jpg",
      alt: "Comfortable creative space with modern seating",
    },
    {
      src: "/images/studio-loft.jpg",
      alt: "Open studio lounge with natural light",
    },
  ],
  music: [
    {
      src: "/images/hero-music.jpg",
      alt: "Mixing console in a warmly lit music studio",
    },
    {
      src: "/images/studio-music.jpg",
      alt: "Recording room with keyboard, microphone, and headphones",
    },
    {
      src: "/images/studio-podcast.jpg",
      alt: "Acoustically treated room with broadcast microphones",
    },
    {
      src: "/images/category-creative.jpg",
      alt: "Creative studio lounge with modern seating",
    },
    {
      src: "/images/studio-loft.jpg",
      alt: "Bright creative workspace with a long table",
    },
  ],
  creative: [
    {
      src: "/images/category-creative.jpg",
      alt: "Bright creative studio with lounge seating",
    },
    {
      src: "/images/studio-loft.jpg",
      alt: "Open-plan creative loft with a long worktable",
    },
    {
      src: "/images/studio-neutral.jpg",
      alt: "Minimal set with a table and soft daylight",
    },
    {
      src: "/images/hero-photography.jpg",
      alt: "Orange seamless backdrop in a photography studio",
    },
    {
      src: "/images/studio-film.jpg",
      alt: "Flexible production space with lighting equipment",
    },
  ],
  events: [
    {
      src: "/images/category-events.jpg",
      alt: "Elegant event space set with round tables and warm lighting",
    },
    {
      src: "/images/studio-loft.jpg",
      alt: "Open creative space for intimate gatherings",
    },
    {
      src: "/images/category-creative.jpg",
      alt: "Bright flexible room with lounge seating",
    },
    {
      src: "/images/studio-film.jpg",
      alt: "Large production-ready room with high ceilings",
    },
    {
      src: "/images/hero-photography.jpg",
      alt: "Warm creative backdrop for a small event",
    },
  ],
}

export const mockStudioDetails: Record<string, StudioDetailContent> = {
  "studio-sunroom": {
    overview:
      "Sunroom is a daylight-first portrait studio designed for calm, collaborative shoots. The main room holds a six-person crew comfortably, with three seamless backdrops, Profoto strobes, and a separate styling room that doubles as a quiet space for talent.\n\nThe space sits on a leafy Greenpoint block with easy loading and a café next door. Hosts leave a curated lighting setup ready to go, so you can spend the first hour making rather than setting up.",
    securityDeposit: 250,
    host: {
      name: "Maya Ellison",
      initials: "ME",
      role: "Photographer and set designer",
      bio: "Maya built Sunroom as a response to the cramped, overbooked studios she kept working in. She still shoots editorial portraits there most weeks and leaves the space set up with care.",
      responseTime: "Usually responds within 1 hour",
      hostedSince: 2021,
      listingCount: 2,
      verified: true,
    },
  },
  "studio-pink-room": {
    overview:
      "The Pink Room is an unapologetically bold editorial set built around a full pink cyclorama. RGB lighting, a makeup station, and a Bluetooth sound system make it equally suited to fashion tests, music covers, and short-form video.\n\nThe room is on the second floor of a creative building in the Arts District, with a freight lift for equipment and a small kitchen for long days. The host can arrange additional lighting or a styling assistant on request.",
    securityDeposit: 300,
    host: {
      name: "Lena Ortiz",
      initials: "LO",
      role: "Creative director",
      bio: "Lena runs a small image studio and opens The Pink Room between her own productions. She is known for thoughtful lighting notes and a space that is always camera-ready.",
      responseTime: "Usually responds within 2 hours",
      hostedSince: 2022,
      listingCount: 1,
      verified: true,
    },
  },
  "studio-foundry": {
    overview:
      "Foundry Stage is a 1,800 sq ft production stage in a former ironworks, built for crews that need room to move. The freshly painted cyc wall, full blackout, loading bay, and green room cover the practical details that make a shoot day run smoothly.\n\nPower is distributed around the stage, and the host keeps a small inventory of stands and cable ramps on site. The West Loop location is a short drive from downtown Chicago with early-morning load-in available.",
    securityDeposit: 500,
    host: {
      name: "Marcus Reed",
      initials: "MR",
      role: "Production manager",
      bio: "Marcus has managed commercial stages for more than a decade. He opened Foundry to give independent crews a professional room without the corporate overhead.",
      responseTime: "Usually responds within 3 hours",
      hostedSince: 2019,
      listingCount: 3,
      verified: true,
    },
  },
  "studio-signal-house": {
    overview:
      "Signal House is an acoustically treated podcast studio with a simple, reliable setup. Four broadcast mics, a Rodecaster Pro, and remote-guest support mean you can walk in with a conversation and leave with a clean recording.\n\nThe room is quiet, warm, and set up for up to four people around a single table. East Austin coffee shops and parking are close by, and the host can stay on hand for setup or engineering if needed.",
    securityDeposit: 150,
    host: {
      name: "Devin Park",
      initials: "DP",
      role: "Audio engineer",
      bio: "Devin records and edits narrative podcasts from Signal House. He keeps the room deliberately simple so first-time hosts and experienced producers can both settle in quickly.",
      responseTime: "Usually responds within 30 minutes",
      hostedSince: 2020,
      listingCount: 1,
      verified: true,
    },
  },
  "studio-lowlight": {
    overview:
      "Lowlight Records is a vintage-equipped recording room with a restored console, a deep amp collection, and a separate vocal booth. The main room has enough space for a full band, while the artist lounge gives everyone somewhere to reset between takes.\n\nThe studio is tucked into East Nashville and has loading access at the side of the building. Hosts can recommend engineers, session players, and local gear rentals if you are coming in from out of town.",
    securityDeposit: 350,
    host: {
      name: "Sasha Bell",
      initials: "SB",
      role: "Producer and studio owner",
      bio: "Sasha has been recording in East Nashville for over a decade. Lowlight is her working studio, stocked with the amps and outboard gear she actually reaches for.",
      responseTime: "Usually responds within 2 hours",
      hostedSince: 2018,
      listingCount: 2,
      verified: true,
    },
  },
  "studio-atelier": {
    overview:
      "Atelier North is a light-filled creative loft with modular furniture, a long worktable, and a compact kitchen. It works well for fittings, workshops, content days, and small productions that need a flexible room rather than a traditional set.\n\nThe Pearl District space has a freight lift, fast Wi-Fi, and enough open floor area to reset between setups. Natural light moves through the room all day, with blackout curtains available when you need more control.",
    securityDeposit: 200,
    host: {
      name: "Nora Whitfield",
      initials: "NW",
      role: "Interior designer",
      bio: "Nora designed Atelier North as a calm, adaptable room for creative work. She keeps the furniture movable and the shelves stocked with useful props and stands.",
      responseTime: "Usually responds within 1 hour",
      hostedSince: 2021,
      listingCount: 1,
      verified: true,
    },
  },
  "studio-daylight": {
    overview:
      "Daylight Annex is a compact portrait studio with a south-facing wall of windows and a warm seamless backdrop. It is a practical choice for headshots, brand portraits, and small editorial teams that want a simple, light-filled room.\n\nThe space includes a private hair and makeup corner, a small changing area, and a curated lighting kit. Williamsburg is close by, with street parking and a loading zone around the corner.",
    securityDeposit: 200,
    host: {
      name: "Camille Brooks",
      initials: "CB",
      role: "Portrait photographer",
      bio: "Camille photographs founders and creative teams at Daylight Annex. She keeps the studio minimal, warm, and ready for a focused portrait session.",
      responseTime: "Usually responds within 1 hour",
      hostedSince: 2022,
      listingCount: 1,
      verified: true,
    },
  },
  "studio-north-stage": {
    overview:
      "North Stage is a flexible production stage with a 30-foot cyc, silent HVAC, and a separate production office. It is built for commercial shoots, music videos, and multi-camera days that need a controllable room and a comfortable crew base.\n\nThe Burbank location has truck parking, a loading dock, and power distributed around the stage. A stage manager can be booked with the space, and additional lighting and grip packages are available through the host.",
    securityDeposit: 500,
    host: {
      name: "Theo Grant",
      initials: "TG",
      role: "Gaffer and stage manager",
      bio: "Theo has worked on commercial sets across Los Angeles for fifteen years. North Stage is the room he wished he had as a young gaffer: practical, quiet, and easy to load into.",
      responseTime: "Usually responds within 3 hours",
      hostedSince: 2019,
      listingCount: 2,
      verified: true,
    },
  },
  "studio-listening-room": {
    overview:
      "The Listening Room is a warm two-person podcast studio with Shure mics, a live mixing desk, and a comfortable lounge for waiting guests. It is a good fit for interview shows, audio edits, and small voiceover sessions.\n\nThe room is treated for a natural, intimate sound and set up so you can record without bringing your own interface. Capitol Hill has good transit access, and the host can provide a same-day recording file after your session.",
    securityDeposit: 150,
    host: {
      name: "Priya Nair",
      initials: "PN",
      role: "Podcast producer",
      bio: "Priya produces interview shows and audio documentaries. She keeps The Listening Room quiet, uncluttered, and ready for conversations that need a little breathing room.",
      responseTime: "Usually responds within 45 minutes",
      hostedSince: 2023,
      listingCount: 1,
      verified: true,
    },
  },
  "studio-concrete-sound": {
    overview:
      "Concrete Sound is a modern writing and tracking room with an API console, a tuned live room, and a curated backline. The studio is set up for bands and producers who want a focused room with reliable gear and a fast workflow.\n\nThe Silver Lake space has a separate vocal booth, a small kitchen, and parking for two vehicles. An engineer can be added to your booking, and the host is happy to help with pre-production notes before you arrive.",
    securityDeposit: 400,
    host: {
      name: "Julian Cross",
      initials: "JC",
      role: "Recording engineer",
      bio: "Julian records independent records at Concrete Sound. He built the room around a clear console, good monitoring, and enough space for a band to play together.",
      responseTime: "Usually responds within 2 hours",
      hostedSince: 2017,
      listingCount: 2,
      verified: true,
    },
  },
  "studio-linen-house": {
    overview:
      "Linen House is an airy townhouse studio with plaster walls, linen drapes, and movable tables. It is designed for fittings, workshops, brand content, and small team sessions that need a residential feel rather than a traditional studio.\n\nThe South Congress location has a small courtyard, a kitchen for catering, and easy street access. The host can arrange additional tables, clothing racks, and styling supplies ahead of your booking.",
    securityDeposit: 180,
    host: {
      name: "Elise Bennett",
      initials: "EB",
      role: "Stylist and set designer",
      bio: "Elise uses Linen House for fittings and editorial projects. She keeps the space soft, flexible, and stocked with the small details that make a content day easier.",
      responseTime: "Usually responds within 1 hour",
      hostedSince: 2022,
      listingCount: 1,
      verified: true,
    },
  },
  "studio-garden-pavilion": {
    overview:
      "Garden Pavilion is a light-filled pavilion and courtyard for intimate launches, screenings, and dinners. The indoor room seats up to 60 guests, while the courtyard gives events a relaxed indoor-outdoor flow.\n\nThe space includes a prep kitchen, flexible seating, and a house sound system. The Alberta Arts host can connect you with local caterers, florists, and production support, and the room is available for full-day installs.",
    securityDeposit: 450,
    host: {
      name: "Adrian Wells",
      initials: "AW",
      role: "Event producer",
      bio: "Adrian produces small gatherings and brand events across Portland. Garden Pavilion was designed to feel generous without losing the warmth of a residential space.",
      responseTime: "Usually responds within 4 hours",
      hostedSince: 2020,
      listingCount: 1,
      verified: true,
    },
  },
}
