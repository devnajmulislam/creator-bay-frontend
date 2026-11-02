import { getAuthToken } from "@/lib/auth-client"
import { mockCategories } from "@/data/mock-categories"
import { mockReviews } from "@/data/mock-reviews"
import {
  mockStudioDetails,
  studioGalleryPools,
} from "@/data/mock-studio-details"
import { mockStudios } from "@/data/mock-studios"
import { getStudioCategorySlug } from "@/lib/studio-category"
import type { Review } from "@/types/review"
import type {
  Studio,
  StudioCategory,
  StudioDetail,
  StudioImage,
} from "@/types/studio"

interface BackendStudioItem {
  _id?: { $oid?: string } | string
  name?: string
  location?: string
  pricePerHour?: string | number
  securityDeposit?: string | number
  capacity?: string | number
  image?: string
  reviewCount?: string | number
  description?: string
  category?: string
}

function mapDbStudioToFrontend(item: BackendStudioItem, index: number): Studio {
  const rawId = item._id
  const id = typeof rawId === "object" && rawId !== null && "$oid" in rawId
    ? rawId.$oid
    : typeof rawId === "string"
    ? rawId
    : `studio-${index + 1}`

  const categoryName = item.category || "Photo Studio"
  const categorySlug = getStudioCategorySlug(categoryName)

  return {
    id: String(id),
    slug: String(id),
    name: item.name || "Creative Studio",
    category: categoryName,
    categorySlug,
    description: item.description || "Professional creative workspace equipped with top-tier gear.",
    location: item.location || "New York, NY",
    pricePerHour: Number(item.pricePerHour) || 150,
    rating: 4.8,
    reviewCount: Number(item.reviewCount) || 12,
    capacity: Number(item.capacity) || 10,
    image: item.image || "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?q=80&w=1200&auto=format&fit=crop",
    imageAlt: item.name || "Studio workspace",
    amenities: ["High-speed Wi-Fi", "Professional Lighting", "Sound System", "Air Conditioning"],
    featured: index < 6,
    instantBook: true,
  }
}

export async function fetchStudiosFromServer(): Promise<Studio[]> {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_SERVER_BASE_URL || "http://localhost:5000"
    const studiosRes = await fetch(`${baseUrl}/studios`, {
      cache: "no-store",
    })
    if (!studiosRes.ok) {
      return mockStudios
    }
    const studiosData = await studiosRes.json()
    // console.log("Fetched studiosData:", studiosData)
    const list = Array.isArray(studiosData)
      ? studiosData
      : studiosData.studios || studiosData.data || []
    if (list.length === 0) {
      return []
    }
    return list.map((item: BackendStudioItem, index: number) => mapDbStudioToFrontend(item, index))
  } catch (err) {
    console.warn("Failed to fetch from backend server, falling back to mock studios:", err)
    return mockStudios
  }
}

export async function getFeaturedStudios(limit = 6): Promise<Studio[]> {
  const studios = await fetchStudiosFromServer()
  return studios.filter((studio) => studio.featured).slice(0, limit)
}

export async function getStudioCategories(): Promise<StudioCategory[]> {
  const studios = await fetchStudiosFromServer()
  return mockCategories.map((category) => ({
    ...category,
    listingCount: studios.filter(
      (studio) => studio.categorySlug === category.slug,
    ).length,
  }))
}

export async function getAllStudiosAsync(): Promise<Studio[]> {
  return await fetchStudiosFromServer()
}

export function getAllStudios(): Studio[] {
  return mockStudios
}

export interface StudioUpdatePayload {
  name: string
  category: string
  location: string
  pricePerHour: string
  capacity: string
  description: string
}

export async function getMyListings(email: string): Promise<Studio[]> {
  const baseUrl = process.env.NEXT_PUBLIC_SERVER_BASE_URL || "http://localhost:5000"
  const token = await getAuthToken()
  const headers: Record<string, string> = {
    "Cache-Control": "no-store",
  }
  if (token) {
    headers["Authorization"] = `Bearer ${token}`
  }

  const res = await fetch(`${baseUrl}/my-listings/${encodeURIComponent(email)}`, {
    headers,
    cache: "no-store",
  })

  if (!res.ok) {
    throw new Error(`Failed to load listings (${res.status})`)
  }

  const data = await res.json()
  const list = Array.isArray(data)
    ? data
    : data.listings || data.studios || data.data || []

  return list.map((item: BackendStudioItem, index: number) =>
    mapDbStudioToFrontend(item, index),
  )
}

export async function deleteMyListing(id: string): Promise<boolean> {
  const baseUrl = process.env.NEXT_PUBLIC_SERVER_BASE_URL || "http://localhost:5000"
  const token = await getAuthToken()
  const headers: Record<string, string> = {}
  if (token) {
    headers["Authorization"] = `Bearer ${token}`
  }

  const res = await fetch(`${baseUrl}/my-listings/${encodeURIComponent(id)}`, {
    method: "DELETE",
    headers,
  })

  if (!res.ok) {
    throw new Error(`Failed to delete listing (${res.status})`)
  }

  const data = await res.json().catch(() => null)

  if (data && typeof data.deletedCount === "number") {
    return data.deletedCount > 0
  }

  return true
}

export async function updateMyListing(
  id: string,
  payload: StudioUpdatePayload,
): Promise<boolean> {
  const baseUrl = process.env.NEXT_PUBLIC_SERVER_BASE_URL || "http://localhost:5000"
  const token = await getAuthToken()
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  }
  if (token) {
    headers["Authorization"] = `Bearer ${token}`
  }

  const res = await fetch(`${baseUrl}/my-listings/${encodeURIComponent(id)}`, {
    method: "PATCH",
    headers,
    body: JSON.stringify(payload),
  })

  if (!res.ok) {
    throw new Error(`Failed to update listing (${res.status})`)
  }

  const data = await res.json().catch(() => null)

  if (data && typeof data.modifiedCount === "number") {
    return data.modifiedCount > 0 || data.matchedCount > 0
  }

  return true
}

function buildStudioGallery(studio: Studio): StudioImage[] {
  const pool = studioGalleryPools[studio.categorySlug] || studioGalleryPools["photography"]
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
  const studios = await fetchStudiosFromServer()
  const studio = studios.find(
    (item) => item.id === id || item.slug === id,
  )

  if (!studio) {
    const mock = mockStudios.find((item) => item.id === id || item.slug === id)
    if (!mock) return null
    const details = mockStudioDetails[mock.id] || {
      overview: mock.description,
      securityDeposit: 100,
      host: {
        name: "Studio Host",
        initials: "SH",
        role: "Professional Host",
        bio: "Dedicated studio space owner.",
        responseTime: "within an hour",
        hostedSince: 2022,
        listingCount: 2,
        verified: true,
      },
    }
    return {
      ...mock,
      ...details,
      gallery: buildStudioGallery(mock),
    }
  }

  const details = mockStudioDetails[studio.id] || {
    overview: studio.description,
    securityDeposit: 150,
    host: {
      name: studio.name,
      initials: studio.name.split(" ").map((n) => n[0]).join("").slice(0, 2),
      role: "Studio Host",
      bio: "Professional creative studio space.",
      responseTime: "within an hour",
      hostedSince: 2021,
      listingCount: 1,
      verified: true,
    },
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
