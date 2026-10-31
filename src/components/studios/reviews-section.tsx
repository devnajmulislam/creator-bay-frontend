import { cn } from "cn"
import { useState } from "react"
import Link from "next/link"
import { ChevronDownIcon } from "lucide-react"
import { RatingStars } from "@/components/shared/rating-stars"
import { Button } from "@/components/ui/button"
import { Section } from "@/components/shared/container"
import { EmptyState } from "@/components/shared/empty-state"
import { getStudioReviews } from "@/services/studio-service"
import type { Review } from "@/types/review"

interface ReviewsSectionProps {
  studioId: string
}

function ReviewsSkeleton() {
  return (
    <div className="grid grid-cols-1 gap-4">
      {Array.from({ length: 3 }, (_, i) => (
        <div key={i} className="p-4 rounded-xl bg-muted/30">
          <p className="text-xs text-muted-foreground placeholder:text-muted-foreground/50">
            Review body goes here...
          </p>
          <div className="mt-2 flex items-center gap-2">
            <span className="text-xs text-muted-foreground">Author Name</span>
            <RatingStars rating={4} size="sm" />
          </div>
        </div>
      ))}
    </div>
  )
}

export function ReviewsSection({ studioId }: ReviewsSectionProps) {
  const [search, setSearch] = useState("")
  const noReviews = true

  if (noReviews) {
    return (
      <Section id="reviews" spacing="compact">
        <div className="p-6 rounded-xl bg-muted/20">
          <p className="text-sm text-muted-foreground">
            No reviews yet. Be the first to review this space.
          </p>
        </div>
      </Section>
    )
  }

  const reviews: Review[] = []

  return (
    <Section id="reviews" spacing="compact">
      <div className="p-6 rounded-xl bg-muted/20">
        <h3 className="font-medium text-foreground mb-3">
          {noReviews ? "Be the first to review" : "Reviews"} this space
        </h3>
        <p className="text-xs text-muted-foreground/70">
          {noReviews ? "Be the first to share your experience." : `${reviews.length} reviews`}
        </p>
      </div>
    </Section>
  )
}