import { MessageSquareIcon } from "lucide-react"

import { EmptyState } from "@/components/shared/empty-state"
import { RatingStars } from "@/components/shared/rating-stars"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import type { Review } from "@/types/review"
import type { StudioDetail } from "@/types/studio"

interface StudioReviewsProps {
  studio: StudioDetail
  reviews: Review[]
}

const reviewDateFormatter = new Intl.DateTimeFormat("en-US", {
  month: "long",
  year: "numeric",
})

function getInitials(name: string) {
  return name
    .split(" ")
    .map((part) => part[0])
    .slice(0, 2)
    .join("")
}

export function StudioReviews({ studio, reviews }: StudioReviewsProps) {
  return (
    <section
      aria-labelledby="reviews-heading"
      className="scroll-mt-24 border-t border-border/70 pt-9"
    >
      <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="eyebrow text-primary">Reviews</p>
          <h2
            id="reviews-heading"
            className="mt-3 font-heading text-3xl leading-none"
          >
            Recent reviews
          </h2>
        </div>

        <div className="flex items-center gap-4">
          <p className="font-heading text-5xl leading-none">
            {studio.rating.toFixed(1)}
          </p>
          <div>
            <RatingStars rating={studio.rating} />
            <p className="mt-1.5 text-xs text-muted-foreground">
              {studio.reviewCount} verified reviews
            </p>
          </div>
        </div>
      </div>

      {reviews.length > 0 ? (
        <>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {reviews.map((review) => (
              <article
                key={review.id}
                className="flex h-full flex-col rounded-xl border border-border/80 bg-card p-5"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarFallback className="bg-primary/10 text-xs font-medium text-primary">
                        {getInitials(review.authorName)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-medium">{review.authorName}</p>
                      <p className="text-xs text-muted-foreground">
                        {review.authorRole}
                      </p>
                    </div>
                  </div>
                  <time
                    dateTime={review.date}
                    className="shrink-0 text-xs text-muted-foreground"
                  >
                    {reviewDateFormatter.format(new Date(review.date))}
                  </time>
                </div>

                <RatingStars
                  rating={review.rating}
                  size="sm"
                  className="mt-4"
                />

                <h3 className="mt-3 font-heading text-xl leading-tight">
                  {review.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {review.body}
                </p>
              </article>
            ))}
          </div>

          <p className="mt-4 text-xs text-muted-foreground">
            Showing the {reviews.length} most recent of {studio.reviewCount}{" "}
            reviews.
          </p>
        </>
      ) : (
        <div className="mt-6">
          <EmptyState
            icon={MessageSquareIcon}
            title="No reviews yet"
            description="Be the first creator to book this space and share how it went."
          />
        </div>
      )}
    </section>
  )
}
