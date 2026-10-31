import { StarIcon } from "lucide-react"
import { cn } from "cn"

interface RatingStarsProps {
  rating: number
  className?: string
  size?: "sm" | "default" | "lg"
}

const starSizes = {
  sm: "size-3.5",
  default: "size-4",
  lg: "size-5",
} as const

export function RatingStars({
  rating,
  className,
  size = "default",
}: RatingStarsProps) {
  const filledStars = Math.round(rating)

  return (
    <span
      role="img"
      aria-label={`${rating.toFixed(1)} out of 5 stars`}
      className={cn("inline-flex items-center gap-0.5", className)}
    >
      {Array.from({ length: 5 }, (_, index) => (
        <StarIcon
          key={index}
          aria-hidden
          className={cn(
            starSizes[size],
            index < filledStars
              ? "fill-current text-primary"
              : "text-muted-foreground/30",
          )}
        />
      ))}
    </span>
  )
}
