import { BadgeCheckIcon } from "lucide-react"

import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import type { StudioHost } from "@/types/studio"

interface StudioHostCardProps {
  host: StudioHost
}

export function StudioHostCard({ host }: StudioHostCardProps) {
  return (
    <section
      aria-labelledby="host-heading"
      className="scroll-mt-24 border-t border-border/70 pt-9"
    >
      <div className="rounded-xl border border-border/80 bg-card p-5 sm:p-7">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
          <div className="flex items-start gap-4">
            <Avatar size="lg" className="size-14">
              <AvatarFallback className="bg-primary/10 text-base font-medium text-primary">
                {host.initials}
              </AvatarFallback>
            </Avatar>
            <div>
              <p className="eyebrow text-muted-foreground">Hosted by</p>
              <h2
                id="host-heading"
                className="mt-1.5 font-heading text-2xl leading-none"
              >
                {host.name}
              </h2>
              <p className="mt-1 text-sm text-muted-foreground">{host.role}</p>
              {host.verified ? (
                <Badge variant="secondary" className="mt-3 gap-1">
                  <BadgeCheckIcon className="text-primary" />
                  Verified host
                </Badge>
              ) : null}
            </div>
          </div>

          <dl className="grid grid-cols-2 gap-x-6 gap-y-3 text-sm sm:text-right">
            <div>
              <dt className="text-xs text-muted-foreground">Response time</dt>
              <dd className="mt-0.5 font-medium">{host.responseTime}</dd>
            </div>
            <div>
              <dt className="text-xs text-muted-foreground">Hosting since</dt>
              <dd className="mt-0.5 font-medium">{host.hostedSince}</dd>
            </div>
            <div>
              <dt className="text-xs text-muted-foreground">Listings</dt>
              <dd className="mt-0.5 font-medium">
                {host.listingCount} {host.listingCount === 1 ? "space" : "spaces"}
              </dd>
            </div>
          </dl>
        </div>

        <p className="mt-5 max-w-2xl border-t border-border/70 pt-5 text-sm leading-relaxed text-muted-foreground">
          {host.bio}
        </p>
      </div>
    </section>
  )
}
