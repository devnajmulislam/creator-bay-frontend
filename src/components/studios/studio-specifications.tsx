import {
  Building2Icon,
  CalendarCheck2Icon,
  DollarSignIcon,
  MapPinIcon,
  ShieldCheckIcon,
  UsersIcon,
} from "lucide-react"

import type { StudioDetail } from "@/types/studio"

interface StudioSpecificationsProps {
  studio: StudioDetail
}

export function StudioSpecifications({ studio }: StudioSpecificationsProps) {
  return (
    <section
      aria-labelledby="specs-heading"
      className="scroll-mt-24 border-t border-border/70 pt-9"
    >
      <div>
        <p className="eyebrow text-primary">Specifications</p>
        <h2
          id="specs-heading"
          className="mt-3 font-heading text-3xl leading-none"
        >
          Workspace specifications
        </h2>
      </div>

      <dl className="mt-6 grid grid-cols-1 gap-4 rounded-xl border border-border/80 bg-muted/30 p-5 sm:grid-cols-2 lg:grid-cols-3">
        <div className="flex items-start gap-3 rounded-lg border border-border/50 bg-card p-4">
          <span className="grid size-9 shrink-0 place-items-center rounded-lg bg-primary/10 text-primary">
            <Building2Icon className="size-4" />
          </span>
          <div>
            <dt className="text-xs text-muted-foreground">Studio Type</dt>
            <dd className="mt-1 text-sm font-medium">{studio.category}</dd>
          </div>
        </div>

        <div className="flex items-start gap-3 rounded-lg border border-border/50 bg-card p-4">
          <span className="grid size-9 shrink-0 place-items-center rounded-lg bg-primary/10 text-primary">
            <UsersIcon className="size-4" />
          </span>
          <div>
            <dt className="text-xs text-muted-foreground">Max Capacity</dt>
            <dd className="mt-1 text-sm font-medium">Up to {studio.capacity} people</dd>
          </div>
        </div>

        <div className="flex items-start gap-3 rounded-lg border border-border/50 bg-card p-4">
          <span className="grid size-9 shrink-0 place-items-center rounded-lg bg-primary/10 text-primary">
            <DollarSignIcon className="size-4" />
          </span>
          <div>
            <dt className="text-xs text-muted-foreground">Hourly Rate</dt>
            <dd className="mt-1 text-sm font-medium">${studio.pricePerHour} / hour</dd>
          </div>
        </div>

        <div className="flex items-start gap-3 rounded-lg border border-border/50 bg-card p-4">
          <span className="grid size-9 shrink-0 place-items-center rounded-lg bg-primary/10 text-primary">
            <ShieldCheckIcon className="size-4" />
          </span>
          <div>
            <dt className="text-xs text-muted-foreground">Security Deposit</dt>
            <dd className="mt-1 text-sm font-medium">${studio.securityDeposit} refundable</dd>
          </div>
        </div>

        <div className="flex items-start gap-3 rounded-lg border border-border/50 bg-card p-4">
          <span className="grid size-9 shrink-0 place-items-center rounded-lg bg-primary/10 text-primary">
            <CalendarCheck2Icon className="size-4" />
          </span>
          <div>
            <dt className="text-xs text-muted-foreground">Booking Mode</dt>
            <dd className="mt-1 text-sm font-medium">
              {studio.instantBook ? "Instant confirmation" : "Host approval required"}
            </dd>
          </div>
        </div>

        <div className="flex items-start gap-3 rounded-lg border border-border/50 bg-card p-4">
          <span className="grid size-9 shrink-0 place-items-center rounded-lg bg-primary/10 text-primary">
            <MapPinIcon className="size-4" />
          </span>
          <div>
            <dt className="text-xs text-muted-foreground">Location</dt>
            <dd className="mt-1 text-sm font-medium">{studio.location}</dd>
          </div>
        </div>
      </dl>
    </section>
  )
}
