import Link from "next/link"
import { ArrowRightIcon, BuildingIcon, CalendarDaysIcon, DollarSignIcon, PlusIcon } from "lucide-react"

import { Container, Section } from "@/components/shared/container"
import { buttonVariants } from "@/components/ui/button"

export default function DashboardPage() {
  return (
    <Section>
      <Container>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="eyebrow text-primary">Overview</p>
            <h1 className="font-heading text-3xl sm:text-4xl mt-1">Creator Dashboard</h1>
            <p className="mt-1 text-sm text-muted-foreground">
              Welcome back, Elena. Here is an overview of your studio activity.
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
              <span className="text-sm font-medium text-muted-foreground">Active Listings</span>
              <div className="flex size-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <BuildingIcon className="size-5" />
              </div>
            </div>
            <div className="mt-4 font-heading text-4xl">3</div>
            <p className="mt-2 text-xs text-muted-foreground">2 photography lofts, 1 sound suite</p>
          </div>

          <div className="rounded-2xl border border-border/80 bg-card p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-muted-foreground">Upcoming Bookings</span>
              <div className="flex size-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <CalendarDaysIcon className="size-5" />
              </div>
            </div>
            <div className="mt-4 font-heading text-4xl">2</div>
            <p className="mt-2 text-xs text-muted-foreground">Next session on Nov 15</p>
          </div>

          <div className="rounded-2xl border border-border/80 bg-card p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-muted-foreground">Total Earnings (Mock)</span>
              <div className="flex size-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <DollarSignIcon className="size-5" />
              </div>
            </div>
            <div className="mt-4 font-heading text-4xl">$2,840</div>
            <p className="mt-2 text-xs text-muted-foreground">+18% from last month</p>
          </div>
        </div>

        <div className="mt-12 grid gap-8 lg:grid-cols-2">
          <div className="rounded-2xl border border-border/80 bg-card p-6 sm:p-8">
            <div className="flex items-center justify-between">
              <h2 className="font-heading text-2xl">Quick Links</h2>
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
            <h2 className="font-heading text-2xl">Host Guarantee</h2>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              Every booking on CreatorBay is backed by our $1M property protection guarantee,
              verified guest identities, and 24/7 host support.
            </p>
            <div className="mt-6">
              <Link href="/about" className={buttonVariants({ variant: "outline" })}>
                Learn about CreatorBay protection
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  )
}
