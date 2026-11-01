import Image from "next/image"
import Link from "next/link"
import {
  ArrowUpRightIcon,
  MapPinIcon,
  StarIcon,
  UsersIcon,
  ZapIcon,
} from "lucide-react"

import { Badge } from "@/components/ui/badge"
import type { Studio } from "@/types/studio"

interface StudioCardProps {
  studio: Studio
}

export function StudioCard({ studio }: StudioCardProps) {
  return (
    <Link
      href={`/studios/${studio.id}`}
      className="group flex h-full flex-col overflow-hidden rounded-xl border border-border/80 bg-card transition-all duration-300 hover:-translate-y-0.5 hover:border-foreground/20 hover:shadow-lg hover:shadow-foreground/5 focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/40 focus-visible:outline-none"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-muted">
        <Image
          src={studio.image}
          alt={studio.imageAlt}
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.035]"
        />
        <div className="absolute inset-x-0 top-0 flex items-start justify-between gap-3 p-4">
          <Badge
            variant="secondary"
            className="bg-background/90 text-foreground backdrop-blur-md"
          >
            {studio.category}
          </Badge>
          <span className="inline-flex items-center gap-1 rounded-full bg-background/90 px-2.5 py-1 text-xs font-medium text-foreground backdrop-blur-md">
            <StarIcon className="size-3 fill-current" />
            {studio.rating.toFixed(1)}
            <span className="font-normal text-muted-foreground">
              ({studio.reviewCount})
            </span>
          </span>
        </div>
      </div>

      <div className="flex flex-1 flex-col gap-4 p-5">
        <div>
          <div className="flex items-start justify-between gap-3">
            <h3 className="font-heading text-xl leading-snug">
              {studio.name}
            </h3>
            <p className="shrink-0 text-sm font-semibold">
              ${studio.pricePerHour}
              <span className="font-normal text-muted-foreground">/hr</span>
            </p>
          </div>
          <p className="mt-1.5 flex items-center gap-1.5 text-sm text-muted-foreground">
            <MapPinIcon className="size-3.5" />
            {studio.location}
          </p>
        </div>

        <p className="line-clamp-2 text-sm leading-relaxed text-muted-foreground">
          {studio.description}
        </p>

        <div className="mt-auto flex items-center justify-between gap-3 border-t border-border/70 pt-4 text-xs text-muted-foreground">
          <span className="inline-flex items-center gap-1.5">
            <UsersIcon className="size-3.5" />
            Up to {studio.capacity} people
          </span>
          <span className="inline-flex items-center gap-1 font-medium text-foreground">
            View Details
            <ArrowUpRightIcon className="size-3.5" />
          </span>
        </div>
      </div>
    </Link>
  )
}
