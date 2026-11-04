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
  overview?: string
  category?: string
  amenities?: string[] | string
  creatorEmail?: string
  creatorName?: string
  rating?: string | number
  createdAt?: string
}

const DEFAULT_AMENITIES = [
  "High-speed Wi-Fi",
  "Professional Lighting",
  "Sound System",
  "Air Conditioning",
]

function normalizeAmenities(value: BackendStudioItem["amenities"]): string[] {
  if (Array.isArray(value)) {
    return value.map((item) => String(item).trim()).filter(Boolean)
  }

  if (typeof value === "string") {
    return value
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean)
  }

  return DEFAULT_AMENITIES
}

function getItemId(item: BackendStudioItem, fallback: string): string {
  const rawId = item._id

  if (typeof rawId === "object" && rawId !== null && "$oid" in rawId) {
    return String(rawId.$oid ?? fallback)
  }

  if (typeof rawId === "string" && rawId) {
    return rawId
  }

  return fallback
}

function mapDbStudioToFrontend(item: BackendStudioItem, index: number): Studio {
  const id = getItemId(item, `studio-${index + 1}`)
  const categoryName = item.category || "Photo Studio"
  const categorySlug = getStudioCategorySlug(categoryName)

  return {
    id,
    slug: id,
    name: item.name || "Creative Studio",
    category: categoryName,
    categorySlug,
    description: item.description || "Professional creative workspace equipped with top-tier gear.",
    location: item.location || "New York, NY",
    pricePerHour: Number(item.pricePerHour) || 150,
    rating: Number(item.rating) || 4.8,
    reviewCount: Number(item.reviewCount) || 12,
    capacity: Number(item.capacity) || 10,
    image: item.image || "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?q=80&w=1200&auto=format&fit=crop",
    imageAlt: item.name || "Studio workspace",
    amenities: normalizeAmenities(item.amenities),
    featured: index < 6,
    instantBook: true,
  }
}

export async function fetchStudiosFromServer(params?: {
  limit?: number
  sort?: string
}): Promise<Studio[]> {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_SERVER_BASE_URL || "http://localhost:5000"
    const query = new URLSearchParams()
    if (params?.limit) query.set("limit", String(params.limit))
    if (params?.sort) query.set("sort", params.sort)
    const queryString = query.toString()
    const studiosRes = await fetch(
      `${baseUrl}/studios${queryString ? `?${queryString}` : ""}`,
      {
        cache: "no-store",
      },
    )
    if (!studiosRes.ok) {
      return mockStudios
    }
    const studiosData = await studiosRes.json()
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
  const studios = await fetchStudiosFromServer({ limit, sort: "rating" })

  return studios
    .sort(
      (a, b) =>
        b.rating - a.rating ||
        b.reviewCount - a.reviewCount ||
        a.name.localeCompare(b.name),
    )
    .slice(0, limit)
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

export interface StudioCreatePayload {
  name: string
  category: string
  location: string
  pricePerHour: string
  securityDeposit: string
  capacity: string
  image: string
  reviewCount: string
  description: string
  overview: string
  amenities: string[]
  creatorName: string
  creatorEmail: string
}

export interface StudioUpdatePayload {
  name: string
  category: string
  location: string
  pricePerHour: string
  securityDeposit?: string
  capacity: string
  image?: string
  description: string
  overview?: string
  amenities?: string[]
}

export async function createStudio(
  payload: StudioCreatePayload,
): Promise<boolean> {
  const res = await fetch("/api/backend/studios", {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  })

  if (!res.ok) {
    const errorData = await res.json().catch(() => null)
    throw new Error(
      errorData?.error || errorData?.message || `Failed to create studio (${res.status})`,
    )
  }

  const data = await res.json().catch(() => null)

  return Boolean(data?.acknowledged || data?.insertedId)
}

export async function getMyListings(email: string): Promise<Studio[]> {
  const res = await fetch(`/api/backend/my-listings/${encodeURIComponent(email)}`, {
    credentials: "include",
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
  const res = await fetch(`/api/backend/my-listings/${encodeURIComponent(id)}`, {
    method: "DELETE",
    credentials: "include",
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
  const res = await fetch(`/api/backend/my-listings/${encodeURIComponent(id)}`, {
    method: "PATCH",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
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

async function fetchStudioByIdFromServer(
  id: string,
): Promise<BackendStudioItem | null> {
  try {
    const baseUrl =
      process.env.NEXT_PUBLIC_SERVER_BASE_URL || "http://localhost:5000"
    const res = await fetch(`${baseUrl}/studios/${encodeURIComponent(id)}`, {
      cache: "no-store",
    })

    if (!res.ok) {
      return null
    }

    const data = await res.json()
    const item = data?.studio || data?.data || data

    if (!item || (!item._id && !item.name)) {
      return null
    }

    return item as BackendStudioItem
  } catch {
    return null
  }
}

function mapDbItemToDetail(
  item: BackendStudioItem,
  fallbackId: string,
): StudioDetail {
  const studio = mapDbStudioToFrontend(item, 0)
  const hostName = item.creatorName?.trim() || "Studio Host"
  const hostedSince = item.createdAt
    ? new Date(item.createdAt).getFullYear()
    : 2021
  const initials =
    hostName
      .split(" ")
      .map((part) => part[0])
      .filter(Boolean)
      .slice(0, 2)
      .join("")
      .toUpperCase() || "SH"

  return {
    ...studio,
    id: getItemId(item, fallbackId),
    slug: getItemId(item, fallbackId),
    overview: item.overview?.trim() || studio.description,
    securityDeposit: Number(item.securityDeposit) || 150,
    gallery: buildStudioGallery(studio),
    host: {
      name: hostName,
      initials,
      role: "Professional Host",
      bio: `Experienced creative space host welcoming photographers, filmmakers, podcasters, and musicians.`,
      responseTime: "within an hour",
      hostedSince: Number.isFinite(hostedSince) ? hostedSince : 2021,
      listingCount: 1,
      verified: true,
    },
  }
}

export async function getStudioById(
  id: string,
): Promise<StudioDetail | null> {
  const backendStudio = await fetchStudioByIdFromServer(id)

  if (backendStudio) {
    return mapDbItemToDetail(backendStudio, id)
  }

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
