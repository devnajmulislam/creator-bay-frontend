import {
  ClockIcon,
  MapPinIcon,
  ShieldCheckIcon,
  UsersIcon,
  ZapIcon,
} from "lucide-react"

import { BookingDialog } from "@/components/bookings/booking-dialog"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import type { StudioDetail } from "@/types/studio"

interface StudioBookingCardProps {
  studio: StudioDetail
}

export function StudioBookingCard({ studio }: StudioBookingCardProps) {
  return (
    <aside aria-label="Booking details">
      <div className="rounded-xl border border-border/80 bg-card p-5 shadow-sm lg:sticky lg:top-24">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="font-heading text-4xl leading-none">
              ${studio.pricePerHour}
              <span className="font-sans text-sm font-normal text-muted-foreground">
                /hr
              </span>
            </p>
            <p className="mt-2 text-xs text-muted-foreground">
              ${studio.securityDeposit} refundable security deposit
            </p>
          </div>
          <Badge variant="secondary" className="shrink-0 gap-1">
            {studio.instantBook ? (
              <>
                <ZapIcon className="text-primary" />
                Instant book
              </>
            ) : (
              "Host approval"
            )}
          </Badge>
        </div>

        <Separator className="my-5" />

        <dl className="grid gap-3 text-sm">
          <div className="flex items-center justify-between gap-4">
            <dt className="inline-flex items-center gap-1.5 text-muted-foreground">
              <UsersIcon className="size-3.5" />
              Capacity
            </dt>
            <dd className="font-medium">Up to {studio.capacity} people</dd>
          </div>
          <div className="flex items-start justify-between gap-4">
            <dt className="inline-flex items-center gap-1.5 text-muted-foreground">
              <MapPinIcon className="mt-0.5 size-3.5 shrink-0" />
              Location
            </dt>
            <dd className="text-right font-medium">{studio.location}</dd>
          </div>
          <div className="flex items-start justify-between gap-4">
            <dt className="inline-flex items-center gap-1.5 text-muted-foreground">
              <ClockIcon className="mt-0.5 size-3.5 shrink-0" />
              Response
            </dt>
            <dd className="max-w-[12rem] text-right text-xs leading-relaxed">
              {studio.host.responseTime}
            </dd>
          </div>
        </dl>

        <div className="mt-5">
          <BookingDialog studio={studio} />
        </div>

        <p className="mt-3 flex items-center justify-center gap-1.5 text-center text-xs text-muted-foreground">
          <ShieldCheckIcon className="size-3.5 text-primary" />
          You won&apos;t be charged yet
        </p>
      </div>
    </aside>
  )
}
