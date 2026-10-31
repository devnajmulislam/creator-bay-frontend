import { Suspense } from "react"
import Link from "next/link"
import { ArrowUpRightIcon, CameraIcon } from "lucide-react"

import { SectionHeading } from "@/components/home/section-heading"
import { Container, Section } from "@/components/shared/container"
import { EmptyState } from "@/components/shared/empty-state"
import { Reveal } from "@/components/shared/reveal"
import { StudioCard } from "@/components/studios/studio-card"
import { StudioCardSkeleton } from "@/components/studios/studio-card-skeleton"
import { buttonVariants } from "@/components/ui/button"
import { getFeaturedStudios } from "@/services/studio-service"

function FeaturedStudiosSkeleton() {
  return (
    <div
      role="status"
      aria-label="Loading featured studios"
      className="grid grid-cols-1 items-stretch gap-5 sm:grid-cols-2 lg:grid-cols-3"
    >
      {Array.from({ length: 6 }, (_, index) => (
        <StudioCardSkeleton key={index} />
      ))}
      <span className="sr-only">Loading featured studios</span>
    </div>
  )
}

async function FeaturedStudiosGrid() {
  const studios = await getFeaturedStudios(6)

  if (studios.length === 0) {
    return (
      <EmptyState
        icon={CameraIcon}
        title="No featured studios yet"
        description="New spaces are added every week. Browse the full collection while we refresh this edit."
        action={
          <Link href="/studios" className={buttonVariants()}>
            Browse all studios
          </Link>
        }
      />
    )
  }

  return (
    <Reveal>
      <div className="grid grid-cols-1 items-stretch gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {studios.map((studio) => (
          <StudioCard key={studio.id} studio={studio} />
        ))}
      </div>
    </Reveal>
  )
}

export function FeaturedStudiosSection() {
  return (
    <Section id="featured-studios">
      <Container>
        <Reveal>
          <SectionHeading
            eyebrow="Featured spaces"
            title={
              <>
                Rooms with
                <br className="hidden sm:block" /> a point of view.
              </>
            }
            description="A considered edit of independent studios for photographers, filmmakers, podcasters, and musicians."
            action={
              <Link
                href="/studios"
                className="inline-flex items-center gap-1.5 text-sm font-medium text-foreground underline-offset-4 hover:underline"
              >
                View all studios
                <ArrowUpRightIcon className="size-4" />
              </Link>
            }
          />
        </Reveal>

        <div className="mt-10 sm:mt-12">
          <Suspense fallback={<FeaturedStudiosSkeleton />}>
            <FeaturedStudiosGrid />
          </Suspense>
        </div>
      </Container>
    </Section>
  )
}
