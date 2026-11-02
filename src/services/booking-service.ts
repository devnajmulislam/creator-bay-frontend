import { getAuthToken } from "@/lib/auth-client"
import type { Booking } from "@/types/booking"

interface BackendBookingItem {
  _id?: { $oid?: string } | string
  studioId?: string
  studioName?: string
  studioLocation?: string
  location?: string
  date?: string
  startTime?: string
  duration?: string | number
  guests?: string | number
  total?: string | number
  status?: string
  userEmail?: string
}

function toNumber(value: string | number | undefined, fallback = 0): number {
  const parsed = Number(value)
  return Number.isFinite(parsed) ? parsed : fallback
}

function mapDbBookingToFrontend(
  item: BackendBookingItem,
  index: number,
): Booking {
  const rawId = item._id
  const rawIdValue =
    typeof rawId === "object" && rawId !== null && "$oid" in rawId
      ? rawId.$oid
      : rawId
  const id =
    typeof rawIdValue === "string" && rawIdValue
      ? rawIdValue
      : `booking-${index + 1}`

  return {
    id,
    studioId: item.studioId,
    studioName: item.studioName || "Studio booking",
    location: item.studioLocation || item.location,
    date: item.date || "",
    startTime: item.startTime || "",
    duration: toNumber(item.duration),
    guests: item.guests === undefined ? undefined : toNumber(item.guests),
    total: toNumber(item.total),
    status: item.status || "Pending",
    userEmail: item.userEmail,
  }
}

export async function getMyBookings(email: string): Promise<Booking[]> {
  const baseUrl =
    process.env.NEXT_PUBLIC_SERVER_BASE_URL || "http://localhost:5000"
  const token = await getAuthToken()
  const headers: Record<string, string> = {
    "Cache-Control": "no-store",
  }
  if (token) {
    headers["Authorization"] = `Bearer ${token}`
  }

  const res = await fetch(
    `${baseUrl}/studios/my-bookings/${encodeURIComponent(email)}`,
    { headers, cache: "no-store" },
  )

  if (!res.ok) {
    throw new Error(`Failed to load bookings (${res.status})`)
  }

  const data = await res.json()
  const list = Array.isArray(data)
    ? data
    : data.bookings || data.data || []

  return list.map((item: BackendBookingItem, index: number) =>
    mapDbBookingToFrontend(item, index),
  )
}

export async function cancelBooking(id: string): Promise<boolean> {
  const baseUrl =
    process.env.NEXT_PUBLIC_SERVER_BASE_URL || "http://localhost:5000"
  const token = await getAuthToken()
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  }
  if (token) {
    headers["Authorization"] = `Bearer ${token}`
  }

  const res = await fetch(
    `${baseUrl}/studios/my-bookings/${encodeURIComponent(id)}`,
    {
      method: "PATCH",
      headers,
      body: JSON.stringify({ status: "Cancelled" }),
    },
  )

  if (!res.ok) {
    throw new Error(`Failed to cancel booking (${res.status})`)
  }

  const data = await res.json().catch(() => null)

  if (data && typeof data.matchedCount === "number") {
    return data.matchedCount > 0
  }

  return true
}
