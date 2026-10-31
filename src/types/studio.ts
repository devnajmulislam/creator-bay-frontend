export type StudioCategorySlug =
  | "photography"
  | "film"
  | "podcast"
  | "music"
  | "creative"
  | "events"

export type StudioSortOption =
  | "recommended"
  | "price-asc"
  | "price-desc"
  | "rating-desc"

export interface Studio {
  id: string
  slug: string
  name: string
  category: string
  categorySlug: StudioCategorySlug
  description: string
  location: string
  pricePerHour: number
  rating: number
  reviewCount: number
  capacity: number
  image: string
  imageAlt: string
  amenities: string[]
  featured: boolean
  instantBook: boolean
}

export interface StudioImage {
  src: string
  alt: string
}

export interface StudioHost {
  name: string
  initials: string
  role: string
  bio: string
  responseTime: string
  hostedSince: number
  listingCount: number
  verified: boolean
}

export interface StudioDetail extends Studio {
  overview: string
  securityDeposit: number
  gallery: StudioImage[]
  host: StudioHost
}

export interface StudioCategory {
  id: string
  slug: StudioCategorySlug
  name: string
  description: string
  listingCount: number
  image: string
  imageAlt: string
}
