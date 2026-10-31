import { mockCategories } from "@/data/mock-categories"
import { mockReviews } from "@/data/mock-reviews"
import {
  mockStudioDetails,
  studioGalleryPools,
} from "@/data/mock-studio-details"
import { mockStudios } from "@/data/mock-studios"
import type { Review } from "@/types/review"
import type {
  Studio,
  StudioCategory,
  StudioDetail,
  StudioImage,
} from "@/types/studio"

export async function getFeaturedStudios(limit = 6): Promise<Studio[]> {
  return mockStudios.filter((studio) => studio.featured).slice(0, limit)
}

export async function getStudioCategories(): Promise<StudioCategory[]> {
  return mockCategories
}

export function getAllStudios(): Studio[] {
  return mockStudios
}

function buildStudioGallery(studio: Studio): StudioImage[] {
  const pool = studioGalleryPools[studio.categorySlug]
  const supportingImages = pool
    .filter((image) => image.src !== studio.image)
    .slice(0, 4)

  return [
    { src: studio.image, alt: studio.imageAlt },
    ...supportingImages,
  ]
}

export async function getStudioById(
  id: string,
): Promise<StudioDetail | null> {
  const studio = mockStudios.find(
    (item) => item.id === id || item.slug === id,
  )

  if (!studio) {
    return null
  }

  const details = mockStudioDetails[studio.id]

  if (!details) {
    return null
  }

  return {
    ...studio,
    ...details,
    gallery: buildStudioGallery(studio),
  }
}

export async function getStudioReviews(studioId: string): Promise<Review[]> {
  return mockReviews
    .filter((review) => review.studioId === studioId)
    .sort((a, b) => b.date.localeCompare(a.date))
}

export function getStudioCategoryOptions(): StudioCategory[] {
  return mockCategories
}

export function getStudioLocations(): string[] {
  return Array.from(new Set(mockStudios.map((studio) => studio.location))).sort(
    (a, b) => a.localeCompare(b),
  )
}

export function getStudioPriceBounds(): { min: number; max: number } {
  const prices = mockStudios.map((studio) => studio.pricePerHour)

  return {
    min: Math.floor(Math.min(...prices) / 10) * 10,
    max: Math.ceil(Math.max(...prices) / 10) * 10,
  }
}
