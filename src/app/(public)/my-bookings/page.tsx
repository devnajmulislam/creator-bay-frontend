"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { CalendarDaysIcon, ClockIcon, LogInIcon, MapPinIcon, Trash2Icon } from "lucide-react"
import { toast } from "sonner"

import { Container, Section } from "@/components/shared/container"
import { EmptyState } from "@/components/shared/empty-state"
import { DownloadInvoiceButton } from "@/components/bookings/download-invoice-button"
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogMedia,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { Button, buttonVariants } from "@/components/ui/button"
import { Spinner } from "@/components/ui/spinner"
import { useSession } from "@/lib/auth-client"
import { cancelBooking, getMyBookings } from "@/services/booking-service"
import type { Booking } from "@/types/booking"

const STATUS_STYLES: Record<string, { label: string; className: string }> = {
  pending: {
    label: "Pending",
    className: "bg-amber-500/10 text-amber-600 dark:text-amber-400",
  },
  confirmed: {
    label: "Confirmed",
    className: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
  },
  completed: {
    label: "Completed",
    className: "bg-sky-500/10 text-sky-600 dark:text-sky-400",
  },
  cancelled: {
    label: "Cancelled",
    className: "bg-destructive/10 text-destructive",
  },
}

function getStatusMeta(status: string) {
  return (
    STATUS_STYLES[status.toLowerCase()] ?? {
      label: status || "Pending",
      className: "bg-muted text-muted-foreground",
    }
  )
}

function formatBookingDate(value: string) {
  if (!value) return "Date to be confirmed"

  const date = new Date(value.includes("T") ? value : `${value}T00:00:00`)

  if (Number.isNaN(date.getTime())) return value

  return date.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  })
}

function formatBookingTime(startTime: string, duration: number) {
  if (!startTime) return "Time to be confirmed"

  const [hours, minutes] = startTime.split(":").map(Number)

  if (!Number.isFinite(hours) || !Number.isFinite(minutes)) return startTime

  const start = new Date(2000, 0, 1, hours, minutes)
  const end = new Date(start.getTime() + duration * 60 * 60 * 1000)
  const format = (date: Date) =>
    date.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" })
  const durationLabel = duration > 0 ? ` (${duration} hrs)` : ""

  return `${format(start)} – ${format(end)}${durationLabel}`
}

export default function MyBookingsPage() {
  const { data: session, isPending } = useSession()
  const user = session?.user

  const [bookings, setBookings] = useState<Booking[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [cancelTarget, setCancelTarget] = useState<Booking | null>(null)
  const [isCancelling, setIsCancelling] = useState(false)

  useEffect(() => {
    if (!user?.email) return

    const email = user.email
    let cancelled = false

    async function loadBookings() {
      try {
        const data = await getMyBookings(email)
        if (!cancelled) {
          setBookings(data)
        }
      } catch (error) {
        console.error("Failed to load bookings:", error)
        if (!cancelled) {
          setBookings([])
          toast.error("Could not load your bookings", {
            description: "Please try again in a moment.",
          })
        }
      } finally {
        if (!cancelled) {
          setIsLoading(false)
        }
      }
    }

    loadBookings()

    return () => {
      cancelled = true
    }
  }, [user?.email])

  async function handleConfirmCancel() {
    if (!cancelTarget) return

    setIsCancelling(true)

    try {
      const cancelled = await cancelBooking(cancelTarget.id)

      if (!cancelled) {
        throw new Error("Booking was not found or already cancelled")
      }

      setBookings((current) =>
        current.map((booking) =>
          booking.id === cancelTarget.id
            ? { ...booking, status: "Cancelled" }
            : booking,
        ),
      )
      setCancelTarget(null)
      toast.success("Booking cancelled successfully")
    } catch (error) {
      console.error("Failed to cancel booking:", error)
      toast.error("Could not cancel booking", {
        description: "Please try again in a moment.",
      })
    } finally {
      setIsCancelling(false)
    }
  }

  if (isPending) {
    return (
      <div className="flex justify-center items-center h-[85vh]">
        <Spinner className="h-20 w-20" />
      </div>
    )
  }

  if (!user) {
    return (
      <Section>
        <Container>
          <EmptyState
            icon={LogInIcon}
            title="Sign in to view your bookings"
            description="Your reservations are linked to your account. Log in to see their status and manage upcoming sessions."
            action={
              <Link
                href="/login?redirect=/my-bookings"
                className={buttonVariants()}
              >
                Log in
              </Link>
            }
          />
        </Container>
      </Section>
    )
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-[85vh]">
        <Spinner className="h-20 w-20" />
      </div>
    )
  }

  return (
    <>
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
              bookings.map((booking) => {
                const statusMeta = getStatusMeta(booking.status)
                const isPendingBooking =
                  booking.status.toLowerCase() === "pending"

                return (
                  <div
                    key={booking.id}
                    className="flex flex-col gap-6 rounded-2xl border border-border/80 bg-card p-6 sm:flex-row sm:items-center sm:justify-between"
                  >
                    <div className="space-y-2">
                      <div className="flex flex-wrap items-center gap-2">
                        <span
                          className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${statusMeta.className}`}
                        >
                          {statusMeta.label}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          Booking ID: {booking.id.slice(-8)}
                        </span>
                      </div>
                      <h3 className="font-heading text-2xl">{booking.studioName}</h3>
                      <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                        {booking.location ? (
                          <span className="flex items-center gap-1.5">
                            <MapPinIcon className="size-4 text-primary" />
                            {booking.location}
                          </span>
                        ) : null}
                        <span className="flex items-center gap-1.5">
                          <CalendarDaysIcon className="size-4 text-primary" />
                          {formatBookingDate(booking.date)}
                        </span>
                        <span className="flex items-center gap-1.5">
                          <ClockIcon className="size-4 text-primary" />
                          {formatBookingTime(booking.startTime, booking.duration)}
                        </span>
                        {booking.guests ? (
                          <span className="flex items-center gap-1.5">
                            {booking.guests}{" "}
                            {booking.guests === 1 ? "guest" : "guests"}
                          </span>
                        ) : null}
                      </div>
                    </div>

                    <div className="flex items-center justify-between gap-4 border-t border-border/70 pt-4 sm:border-t-0 sm:pt-0 sm:flex-col sm:items-end">
                      <div className="font-heading text-2xl">${booking.total}</div>
                      
                      {booking.status.toLowerCase() !== "cancelled" ? (
                        <DownloadInvoiceButton booking={booking} />
                      ) : null}

                      {isPendingBooking ? (
                        <Button
                          variant="outline"
                          size="sm"
                          className="text-destructive hover:bg-destructive/10"
                          onClick={() => setCancelTarget(booking)}
                        >
                          <Trash2Icon className="mr-1.5 size-3.5" />
                          Cancel booking
                        </Button>
                      ) : null}
                    </div>
                  </div>
                )
              })
            )}
          </div>
        </Container>
      </Section>

      <AlertDialog
        open={Boolean(cancelTarget)}
        onOpenChange={(open) => {
          if (!open && !isCancelling) {
            setCancelTarget(null)
          }
        }}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogMedia className="bg-destructive/10 text-destructive">
              <Trash2Icon />
            </AlertDialogMedia>
            <AlertDialogTitle>Cancel this booking?</AlertDialogTitle>
            <AlertDialogDescription>
              {cancelTarget ? (
                <>
                  <span className="font-medium text-foreground">
                    {cancelTarget.studioName}
                  </span>{" "}
                  on {formatBookingDate(cancelTarget.date)} will be marked as
                  Cancelled. This cannot be undone from here.
                </>
              ) : (
                "This booking will be marked as Cancelled."
              )}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isCancelling}>Keep booking</AlertDialogCancel>
            <Button
              variant="destructive"
              onClick={handleConfirmCancel}
              disabled={isCancelling}
            >
              {isCancelling ? "Cancelling..." : "Cancel booking"}
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}
