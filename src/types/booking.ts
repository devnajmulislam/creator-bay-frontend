export type BookingStatus =
  | "Pending"
  | "Confirmed"
  | "Completed"
  | "Cancelled"

export interface Booking {
  id: string
  studioId?: string
  studioName: string
  location?: string
  date: string
  startTime: string
  duration: number
  guests?: number
  total: number
  status: string
  userEmail?: string
}
