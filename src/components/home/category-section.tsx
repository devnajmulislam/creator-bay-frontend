import { Suspense } from "react"
import Image from "next/image"
import Link from "next/link"
import {
  ArrowUpRightIcon,
  CameraIcon,
  ClapperboardIcon,
  Mic2Icon,
  Music2Icon,
  PaletteIcon,
  PartyPopperIcon,
} from "lucide-react"
import type { LucideIcon } from "lucide-react"

import { SectionHeading } from "@/components/home/section-heading"
import { Container, Section } from "@/components/shared/container"
import { EmptyState } from "@/components/shared/empty-state"
import { Reveal } from "@/components/shared/reveal"
import { Skeleton } from "@/components/ui/skeleton"
import { buttonVariants } from "@/components/ui/button"
import { getStudioCategories } from "@/services/studio-service"
import type { StudioCategory, StudioCategorySlug } from "@/types/studio"

const categoryIcons: Record<StudioCategorySlug, LucideIcon> = {
  photography: CameraIcon,
  film: ClapperboardIcon,
  podcast: Mic2Icon,
  music: Music2Icon,
  creative: PaletteIcon,
  events: PartyPopperIcon,
}

function CategoryCard({ category }: { category: StudioCategory }) {
  const Icon = categoryIcons[category.slug]

  return (
    <Link
      href={`/studios?category=${category.slug}`}
      className="group relative flex aspect-[4/3] min-h-[230px] flex-col justify-end overflow-hidden rounded-xl border border-border/80 bg-foreground p-5 focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/40 focus-visible:outline-none"
    >
      <Image
        src={category.image}
        alt={category.imageAlt}
        fill
        sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
        className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
      />
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-black/5"
      />
      <div className="relative z-10 text-white">
        <Icon className="size-5 text-white/70" />
        <h3 className="mt-5 font-heading text-2xl leading-tight">
          {category.name}
        </h3>
        <p className="mt-1 text-sm text-white/65">
          {category.listingCount} spaces
        </p>
        <p className="mt-3 line-clamp-2 max-w-xs text-xs leading-relaxed text-white/60">
          {category.description}
        </p>
      </div>
      <span className="absolute top-4 right-4 grid size-8 place-items-center rounded-full border border-white/20 bg-black/15 text-white/80 backdrop-blur-md transition-colors group-hover:bg-white group-hover:text-foreground">
        <ArrowUpRightIcon className="size-4" />
      </span>
    </Link>
  )
}

function CategoryGridSkeleton() {
  return (
    <div
      role="status"
      aria-label="Loading studio categories"
      className="grid grid-cols-1 items-stretch gap-5 sm:grid-cols-2 lg:grid-cols-3"
    >
      {Array.from({ length: 6 }, (_, index) => (
        <Skeleton key={index} className="aspect-[4/3] min-h-[230px] rounded-xl" />
      ))}
      <span className="sr-only">Loading studio categories</span>
    </div>
  )
}

async function CategoryGrid() {
  const categories = await getStudioCategories()

  if (categories.length === 0) {
    return (
      <EmptyState
        icon={PaletteIcon}
        title="Categories are being refreshed"
        description="Browse the full studio collection while we update the category edit."
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
        {categories.map((category) => (
          <CategoryCard key={category.id} category={category} />
        ))}
      </div>
    </Reveal>
  )
}

export function CategorySection() {
  return (
    <Section id="categories" className="border-y border-border/70 bg-muted/25">
      <Container>
        <Reveal>
          <SectionHeading
            eyebrow="Browse by discipline"
            title={
              <>
                Find your kind
                <br className="hidden sm:block" /> of room.
              </>
            }
            description="From daylight studios to blackout stages, browse spaces shaped around the way you work."
            action={
              <Link
                href="/studios"
                className="inline-flex items-center gap-1.5 text-sm font-medium text-foreground underline-offset-4 hover:underline"
              >
                Browse all spaces
                <ArrowUpRightIcon className="size-4" />
              </Link>
            }
          />
        </Reveal>

        <div className="mt-10 sm:mt-12">
          <Suspense fallback={<CategoryGridSkeleton />}>
            <CategoryGrid />
          </Suspense>
        </div>
      </Container>
    </Section>
  )
}
