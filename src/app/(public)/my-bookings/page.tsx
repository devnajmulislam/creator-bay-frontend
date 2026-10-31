"use client"

import { useState } from "react"
import Link from "next/link"
import { CalendarDaysIcon, ClockIcon, MapPinIcon, Trash2Icon } from "lucide-react"
import { toast } from "sonner"

import { Container, Section } from "@/components/shared/container"
import { Button, buttonVariants } from "@/components/ui/button"

interface BookingItem {
  id: string
  studioName: string
  location: string
  date: string
  time: string
  totalPrice: number
  status: "confirmed" | "pending"
}

export default function MyBookingsPage() {
  const [bookings, setBookings] = useState<BookingItem[]>([
    {
      id: "bk-1",
      studioName: "Lumen North Loft",
      location: "Brooklyn, NY",
      date: "November 15, 2026",
      time: "10:00 AM - 2:00 PM (4 hrs)",
      totalPrice: 480,
      status: "confirmed",
    },
    {
      id: "bk-2",
      studioName: "SoundWave Acoustic Suite",
      location: "Los Angeles, CA",
      date: "November 22, 2026",
      time: "2:00 PM - 6:00 PM (4 hrs)",
      totalPrice: 600,
      status: "pending",
    },
  ])

  function handleCancel(id: string) {
    setBookings(bookings.filter((b) => b.id !== id))
    toast.success("Booking cancelled successfully")
  }

  return (
    <Section>
      <Container>
        <div>
          <p className="eyebrow text-primary">Reservations</p>
          <h1 className="font-heading text-3xl sm:text-4xl mt-1">My bookings</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Review your upcoming studio sessions and booking history.
          </p>
        </div>

        <div className="mt-8 grid gap-6">
          {bookings.length === 0 ? (
            <div className="rounded-2xl border border-border/80 bg-card p-12 text-center">
              <p className="text-muted-foreground">You have no active studio bookings.</p>
              <Link href="/studios" className={buttonVariants({ className: "mt-4" })}>
                Explore studios
              </Link>
            </div>
          ) : (
            bookings.map((booking) => (
              <div
                key={booking.id}
                className="flex flex-col gap-6 rounded-2xl border border-border/80 bg-card p-6 sm:flex-row sm:items-center sm:justify-between"
              >
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <span
                      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                        booking.status === "confirmed"
                          ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                          : "bg-amber-500/10 text-amber-600 dark:text-amber-400"
                      }`}
                    >
                      {booking.status === "confirmed" ? "Confirmed" : "Pending host approval"}
                    </span>
                    <span className="text-xs text-muted-foreground">Booking ID: {booking.id}</span>
                  </div>
                  <h3 className="font-heading text-2xl">{booking.studioName}</h3>
                  <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1.5">
                      <MapPinIcon className="size-4 text-primary" />
                      {booking.location}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <CalendarDaysIcon className="size-4 text-primary" />
                      {booking.date}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <ClockIcon className="size-4 text-primary" />
                      {booking.time}
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between gap-4 border-t border-border/70 pt-4 sm:border-t-0 sm:pt-0 sm:flex-col sm:items-end">
                  <div className="font-heading text-2xl">${booking.totalPrice}</div>
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-destructive hover:bg-destructive/10"
                    onClick={() => handleCancel(booking.id)}
                  >
                    <Trash2Icon className="mr-1.5 size-3.5" />
                    Cancel booking
                  </Button>
                </div>
              </div>
            ))
          )}
        </div>
      </Container>
    </Section>
  )
}
