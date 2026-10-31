export const siteConfig = {
  name: "CreatorBay",
  description:
    "A peer-to-peer marketplace for photographer, filmmaker, podcaster, and musician studios.",
} as const

export const publicNavigation = [
  { label: "Studios", href: "/studios" },
  { label: "For hosts", href: "/add-studio" },
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
] as const
