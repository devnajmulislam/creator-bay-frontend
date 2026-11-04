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

export interface CreateBookingPayload {
  studioId: string
  studioName: string
  studioLocation: string
  date: string
  startTime: string
  duration: number
  guests: number
  subtotal: number
  securityDeposit: number
  total: number
  name: string
  email: string
  userEmail: string
  photo?: string
  status: string
}

export async function createBooking(
  payload: CreateBookingPayload,
): Promise<void> {
  const res = await fetch("/api/backend/studios/my-bookings", {
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
      errorData?.error || `Failed to create booking (${res.status})`,
    )
  }
}

export async function getMyBookings(email: string): Promise<Booking[]> {
  const res = await fetch(
    `/api/backend/studios/my-bookings/${encodeURIComponent(email)}`,
    { credentials: "include", cache: "no-store" },
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
  const res = await fetch(
    `/api/backend/studios/my-bookings/${encodeURIComponent(id)}`,
    {
      method: "PATCH",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
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
