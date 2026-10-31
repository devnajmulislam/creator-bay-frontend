import { Container, Section } from "@/components/shared/container"
import { Skeleton } from "@/components/ui/skeleton"

function ContentBlockSkeleton() {
  return (
    <div className="space-y-4 border-t border-border/70 pt-9 first:border-t-0 first:pt-0">
      <Skeleton className="h-3 w-20" />
      <Skeleton className="h-8 w-56" />
      <div className="space-y-2 pt-2">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-11/12" />
        <Skeleton className="h-4 w-4/5" />
      </div>
    </div>
  )
}

export default function StudioDetailLoading() {
  return (
    <Section spacing="compact">
      <Container>
        <div
          role="status"
          aria-label="Loading studio"
          className="space-y-7"
        >
          <div className="flex items-center gap-2">
            <Skeleton className="h-4 w-12" />
            <Skeleton className="h-4 w-3" />
            <Skeleton className="h-4 w-16" />
            <Skeleton className="h-4 w-3" />
            <Skeleton className="h-4 w-28" />
          </div>

          <div className="space-y-4">
            <div className="flex gap-2">
              <Skeleton className="h-5 w-24 rounded-full" />
              <Skeleton className="h-5 w-24 rounded-full" />
            </div>
            <Skeleton className="h-14 w-2/3 max-w-xl" />
            <div className="flex flex-wrap gap-4">
              <Skeleton className="h-4 w-40" />
              <Skeleton className="h-4 w-36" />
              <Skeleton className="h-4 w-32" />
            </div>
          </div>

          <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_22rem] lg:items-start lg:gap-10">
            <div className="space-y-3 lg:col-start-1 lg:row-start-1">
              <Skeleton className="aspect-[4/3] w-full rounded-xl sm:aspect-[16/9]" />
              <div className="grid grid-cols-5 gap-2 sm:gap-3">
                {Array.from({ length: 5 }, (_, index) => (
                  <Skeleton
                    key={index}
                    className="aspect-[4/3] w-full rounded-lg"
                  />
                ))}
              </div>
            </div>

            <div className="lg:col-start-2 lg:row-span-2 lg:row-start-1">
              <div className="space-y-5 rounded-xl border border-border/80 bg-card p-5">
                <div className="space-y-2">
                  <Skeleton className="h-9 w-28" />
                  <Skeleton className="h-3 w-44" />
                </div>
                <Skeleton className="h-px w-full" />
                <div className="space-y-3">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-5/6" />
                </div>
                <Skeleton className="h-11 w-full rounded-lg" />
                <Skeleton className="mx-auto h-3 w-40" />
              </div>
            </div>

            <div className="space-y-9 lg:col-start-1 lg:row-start-2">
              <ContentBlockSkeleton />
              <ContentBlockSkeleton />
              <ContentBlockSkeleton />
            </div>
          </div>

          <span className="sr-only">Loading studio details</span>
        </div>
      </Container>
    </Section>
  )
}
