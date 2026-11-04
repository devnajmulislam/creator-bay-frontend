"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import {
  ArrowRightIcon,
  BuildingIcon,
  CalendarDaysIcon,
  DollarSignIcon,
  LogInIcon,
  PlusIcon,
} from "lucide-react"
import { toast } from "sonner"

import { Container, Section } from "@/components/shared/container"
import { EmptyState } from "@/components/shared/empty-state"
import { buttonVariants } from "@/components/ui/button"
import { Spinner } from "@/components/ui/spinner"
import { useSession } from "@/lib/auth-client"
import { getMyBookings } from "@/services/booking-service"
import { getMyListings } from "@/services/studio-service"
import type { Booking } from "@/types/booking"
import type { Studio } from "@/types/studio"

function formatDate(value: string) {
  if (!value) return "Date to be confirmed"
  const date = new Date(value.includes("T") ? value : `${value}T00:00:00`)
  if (Number.isNaN(date.getTime())) return value
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  })
}

export default function DashboardPage() {
  const { data: session, isPending } = useSession()
  const user = session?.user

  const [listings, setListings] = useState<Studio[]>([])
  const [bookings, setBookings] = useState<Booking[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (!user?.email) return

    const email = user.email
    let cancelled = false

    async function loadDashboard() {
      try {
        const [studioList, bookingList] = await Promise.all([
          getMyListings(email),
          getMyBookings(email),
        ])

        if (!cancelled) {
          setListings(studioList)
          setBookings(bookingList)
        }
      } catch (error) {
        console.error("Failed to load dashboard data:", error)
        if (!cancelled) {
          toast.error("Could not load dashboard data", {
            description: "Please try again in a moment.",
          })
        }
      } finally {
        if (!cancelled) {
          setIsLoading(false)
        }
      }
    }

    loadDashboard()

    return () => {
      cancelled = true
    }
  }, [user?.email])

  if (isPending || (user && isLoading)) {
    return (
      <div className="flex h-[85vh] items-center justify-center">
        <Spinner className="size-20" />
      </div>
    )
  }

  if (!user) {
    return (
      <Section>
        <Container>
          <EmptyState
            icon={LogInIcon}
            title="Sign in to view your dashboard"
            description="Your studio activity and bookings are linked to your account."
            action={
              <Link
                href="/login?redirect=/dashboard"
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

  const activeListings = listings.length
  const upcomingBookings = bookings.filter((booking) =>
    ["pending", "confirmed"].includes(booking.status.toLowerCase()),
  )
  const completedBookings = bookings.filter(
    (booking) => booking.status.toLowerCase() === "completed",
  )
  const totalEarnings = completedBookings.reduce(
    (sum, booking) => sum + booking.total,
    0,
  )
  const nextBooking = [...upcomingBookings].sort((a, b) =>
    a.date.localeCompare(b.date),
  )[0]

  return (
    <Section>
      <Container>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="eyebrow text-primary">Overview</p>
            <h1 className="mt-1 font-heading text-3xl sm:text-4xl">
              Creator dashboard
            </h1>
            <p className="mt-1 text-sm text-muted-foreground">
              Welcome back, {user.name}. Here is an overview of your studio
              activity.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/add-studio" className={buttonVariants()}>
              <PlusIcon className="mr-2 size-4" />
              List studio
            </Link>
          </div>
        </div>

        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <div className="rounded-2xl border border-border/80 bg-card p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-muted-foreground">
                Active listings
              </span>
              <div className="flex size-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <BuildingIcon className="size-5" />
              </div>
            </div>
            <div className="mt-4 font-heading text-4xl">{activeListings}</div>
            <p className="mt-2 text-xs text-muted-foreground">
              {activeListings === 0
                ? "Publish your first space to get started"
                : `${activeListings} ${activeListings === 1 ? "space" : "spaces"} currently listed`}
            </p>
          </div>

          <div className="rounded-2xl border border-border/80 bg-card p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-muted-foreground">
                Upcoming bookings
              </span>
              <div className="flex size-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <CalendarDaysIcon className="size-5" />
              </div>
            </div>
            <div className="mt-4 font-heading text-4xl">
              {upcomingBookings.length}
            </div>
            <p className="mt-2 text-xs text-muted-foreground">
              {nextBooking
                ? `Next session on ${formatDate(nextBooking.date)}`
                : "No upcoming sessions yet"}
            </p>
          </div>

          <div className="rounded-2xl border border-border/80 bg-card p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-muted-foreground">
                Completed spend
              </span>
              <div className="flex size-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <DollarSignIcon className="size-5" />
              </div>
            </div>
            <div className="mt-4 font-heading text-4xl">${totalEarnings}</div>
            <p className="mt-2 text-xs text-muted-foreground">
              {completedBookings.length}{" "}
              {completedBookings.length === 1 ? "session" : "sessions"}{" "}
              completed
            </p>
          </div>
        </div>

        <div className="mt-12 grid gap-8 lg:grid-cols-2">
          <div className="rounded-2xl border border-border/80 bg-card p-6 sm:p-8">
            <div className="flex items-center justify-between">
              <h2 className="font-heading text-2xl">Quick links</h2>
            </div>
            <div className="mt-6 grid gap-3">
              <Link
                href="/my-listings"
                className="flex items-center justify-between rounded-xl border border-border/70 p-4 transition-colors hover:bg-muted/50"
              >
                <span className="font-medium">Manage my studio listings</span>
                <ArrowRightIcon className="size-4 text-muted-foreground" />
              </Link>
              <Link
                href="/my-bookings"
                className="flex items-center justify-between rounded-xl border border-border/70 p-4 transition-colors hover:bg-muted/50"
              >
                <span className="font-medium">View my active bookings</span>
                <ArrowRightIcon className="size-4 text-muted-foreground" />
              </Link>
              <Link
                href="/add-studio"
                className="flex items-center justify-between rounded-xl border border-border/70 p-4 transition-colors hover:bg-muted/50"
              >
                <span className="font-medium">Publish a new studio space</span>
                <ArrowRightIcon className="size-4 text-muted-foreground" />
              </Link>
            </div>
          </div>

          <div className="rounded-2xl border border-border/80 bg-card p-6 sm:p-8">
            <h2 className="font-heading text-2xl">Host guarantee</h2>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              Every booking on CreatorBay is backed by our $1M property
              protection guarantee, verified guest identities, and 24/7 host
              support.
            </p>
            <div className="mt-6">
              <Link
                href="/#host-guarantee"
                className={buttonVariants({ variant: "outline" })}
              >
                Learn about CreatorBay protection
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  )
}
