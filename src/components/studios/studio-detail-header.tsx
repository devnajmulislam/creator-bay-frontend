import {
  CalendarClockIcon,
  MapPinIcon,
  UsersIcon,
  ZapIcon,
} from "lucide-react"

import { RatingStars } from "@/components/shared/rating-stars"
import { Badge } from "@/components/ui/badge"
import type { StudioDetail } from "@/types/studio"

interface StudioDetailHeaderProps {
  studio: StudioDetail
}

export function StudioDetailHeader({ studio }: StudioDetailHeaderProps) {
  return (
    <header>
      <div className="flex flex-wrap items-center gap-2">
        <Badge variant="outline">{studio.category}</Badge>
        {studio.instantBook ? (
          <Badge variant="secondary" className="gap-1">
            <ZapIcon className="text-primary" />
            Instant book
          </Badge>
        ) : (
          <Badge variant="secondary" className="gap-1">
            <CalendarClockIcon />
            Host approval
          </Badge>
        )}
      </div>

      <h1 className="display-lg mt-4">{studio.name}</h1>

      <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-muted-foreground">
        <span className="inline-flex items-center gap-2">
          <RatingStars rating={studio.rating} size="sm" />
          <span className="font-medium text-foreground">
            {studio.rating.toFixed(1)}
          </span>
          <span>({studio.reviewCount} reviews)</span>
        </span>
        <span className="inline-flex items-center gap-1.5">
          <MapPinIcon className="size-4" />
          {studio.location}
        </span>
        <span className="inline-flex items-center gap-1.5">
          <UsersIcon className="size-4" />
          Up to {studio.capacity} people
        </span>
      </div>
    </header>
  )
}
