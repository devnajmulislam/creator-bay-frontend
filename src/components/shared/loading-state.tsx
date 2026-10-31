import { cn } from "cn"

import { Skeleton } from "@/components/ui/skeleton"
import { Spinner } from "@/components/ui/spinner"

interface LoadingStateProps {
  label?: string
  className?: string
}

export function LoadingState({
  label = "Loading",
  className,
}: LoadingStateProps) {
  return (
    <div
      role="status"
      aria-live="polite"
      className={cn(
        "flex min-h-40 w-full flex-col items-center justify-center gap-3 text-muted-foreground",
        className,
      )}
    >
      <Spinner className="size-5" />
      <p className="text-sm">{label}</p>
      <span className="sr-only">Please wait</span>
    </div>
  )
}

interface LoadingGridProps {
  count?: number
  className?: string
}

export function LoadingGrid({ count = 6, className }: LoadingGridProps) {
  return (
    <div
      className={cn(
        "grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3",
        className,
      )}
      aria-hidden
    >
      {Array.from({ length: count }, (_, index) => (
        <div key={index} className="space-y-4">
          <Skeleton className="aspect-[4/3] w-full rounded-xl" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-2/3" />
            <Skeleton className="h-3 w-1/2" />
          </div>
        </div>
      ))}
    </div>
  )
}
