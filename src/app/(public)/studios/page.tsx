import type { Metadata } from "next"
import { Suspense } from "react"

import { Container, Section } from "@/components/shared/container"
import { StudioExplorer } from "@/components/studios/studio-explorer"
import { StudioCardSkeleton } from "@/components/studios/studio-card-skeleton"
import { Skeleton } from "@/components/ui/skeleton"
import { getAllStudios, getStudioCategoryOptions } from "@/services/studio-service"

export const metadata: Metadata = {
  title: "Explore studios",
  description:
    "Browse independent photography, film, podcast, music, creative, and event spaces on CreatorBay.",
}

function StudioExplorerFallback() {
  return (
    <div>
      <div className="space-y-5 rounded-xl border border-border/80 bg-card p-4 sm:p-5">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end">
          <div className="flex-1 space-y-2">
            <Skeleton className="h-3 w-16" />
            <Skeleton className="h-10 w-full" />
          </div>
          <div className="grid gap-3 sm:grid-cols-2 lg:w-[22rem]">
            <div className="space-y-2">
              <Skeleton className="h-3 w-16" />
              <Skeleton className="h-10 w-full" />
            </div>
            <div className="space-y-2">
              <Skeleton className="h-3 w-14" />
              <Skeleton className="h-10 w-full" />
            </div>
          </div>
        </div>
        <div className="flex gap-2 border-t border-border/70 pt-5">
          {Array.from({ length: 5 }, (_, index) => (
            <Skeleton key={index} className="h-7 w-24 rounded-full" />
          ))}
        </div>
        <div className="space-y-3 border-t border-border/70 pt-5">
          <Skeleton className="h-3 w-28" />
          <Skeleton className="h-1.5 w-full rounded-full" />
        </div>
      </div>

      <div
        role="status"
        aria-label="Loading studios"
        className="mt-8 grid grid-cols-1 items-stretch gap-5 sm:grid-cols-2 xl:grid-cols-3"
      >
        {Array.from({ length: 6 }, (_, index) => (
          <StudioCardSkeleton key={index} />
        ))}
        <span className="sr-only">Loading studios</span>
      </div>
    </div>
  )
}

export default function StudiosPage() {
  const studios = getAllStudios()
  const categories = getStudioCategoryOptions()

  return (
    <>
      <Section
        spacing="compact"
        className="border-b border-border/70 bg-muted/25"
      >
        <Container>
          <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-3xl">
              <p className="eyebrow flex items-center gap-2.5 text-primary">
                <span aria-hidden className="h-px w-6 bg-primary/60" />
                Studio directory
              </p>
              <h1 className="display-xl mt-4">
                Find a room
                <br className="hidden sm:block" /> that fits the work.
              </h1>
              <p className="mt-5 max-w-xl text-sm leading-relaxed text-muted-foreground sm:text-base">
                Browse independent spaces for photography, film, podcasts,
                music, creative projects, and gatherings. Filter by discipline,
                neighborhood, budget, and rating.
              </p>
            </div>

            <dl className="flex items-center gap-8 border-t border-border/70 pt-5 lg:border-t-0 lg:pt-0">
              <div>
                <dt className="text-xs uppercase tracking-[0.16em] text-muted-foreground">
                  Spaces
                </dt>
                <dd className="mt-1 font-heading text-3xl leading-none">
                  {studios.length}
                </dd>
              </div>
              <div>
                <dt className="text-xs uppercase tracking-[0.16em] text-muted-foreground">
                  Disciplines
                </dt>
                <dd className="mt-1 font-heading text-3xl leading-none">
                  {categories.length}
                </dd>
              </div>
            </dl>
          </div>
        </Container>
      </Section>

      <Section spacing="compact">
        <Container>
          <Suspense fallback={<StudioExplorerFallback />}>
            <StudioExplorer />
          </Suspense>
        </Container>
      </Section>
    </>
  )
}
