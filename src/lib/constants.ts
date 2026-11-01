export const siteConfig = {
  name: "CreatorBay",
  description:
    "A peer-to-peer marketplace for photographer, filmmaker, podcaster, and musician studios.",
} as const

export const publicNavigation = [
  { label: "Home", href: "/" },
  { label: "Studios", href: "/studios" },
  { label: "How It Works", href: "/#how-it-works" },
  { label: "About", href: "/about" },
] as const

export const footerNavigation = [
  {
    title: "Explore",
    links: [
      { label: "Studios", href: "/studios" },
      { label: "About CreatorBay", href: "/about" },
    ],
  },
  {
    title: "Host",
    links: [
      { label: "List your studio", href: "/add-studio" },
      { label: "My listings", href: "/my-listings" },
      { label: "Host dashboard", href: "/dashboard" },
    ],
  },
  {
    title: "Account",
    links: [
      { label: "Log in", href: "/login" },
      { label: "Create account", href: "/register" },
      { label: "My bookings", href: "/my-bookings" },
    ],
  },
  {
    title: "Categories",
    links: [
      { label: "Photography", href: "/studios?category=photography" },
      { label: "Film & Video", href: "/studios?category=film" },
      { label: "Podcast & Audio", href: "/studios?category=podcast" },
      { label: "Music", href: "/studios?category=music" },
    ],
  },
] as const
