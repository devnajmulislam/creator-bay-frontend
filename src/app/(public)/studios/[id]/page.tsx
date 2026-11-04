import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"

import { Container, Section } from "@/components/shared/container"
import { StudioAmenities } from "@/components/studios/studio-amenities"
import { StudioBookingCard } from "@/components/studios/studio-booking-card"
import { StudioDetailHeader } from "@/components/studios/studio-detail-header"
import { StudioGallery } from "@/components/studios/studio-gallery"
import { StudioHostCard } from "@/components/studios/studio-host-card"
import { StudioReviews } from "@/components/studios/studio-reviews"
import { StudioSpecifications } from "@/components/studios/studio-specifications"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import {
  getAllStudios,
  getStudioById,
  getStudioReviews,
} from "@/services/studio-service"

interface StudioDetailPageProps {
  params: Promise<{ id: string }>
}

export function generateStaticParams() {
  return getAllStudios().map((studio) => ({ id: studio.id }))
}

export async function generateMetadata({
  params,
}: StudioDetailPageProps): Promise<Metadata> {
  const { id } = await params
  const studio = await getStudioById(id)

  if (!studio) {
    return { title: "Studio not found" }
  }

  return {
    title: studio.name,
    description: studio.description,
  }
}

export default async function StudioDetailPage({
  params,
}: StudioDetailPageProps) {
  const { id } = await params
  const studio = await getStudioById(id)

  if (!studio) {
    notFound()
  }

  const reviews = await getStudioReviews(studio.id)

  return (
    <Section spacing="compact">
      <Container>
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink render={<Link href="/" />}>Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink render={<Link href="/studios" />}>
                Studios
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>{studio.name}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <div className="mt-7">
          <StudioDetailHeader studio={studio} />
        </div>

        <div className="mt-8 grid gap-8 lg:grid-cols-[minmax(0,1fr)_22rem] lg:items-start lg:gap-10">
          <div className="min-w-0 lg:col-start-1 lg:row-start-1">
            <StudioGallery
              images={studio.gallery}
            />
          </div>

          <div className="lg:col-start-2 lg:row-span-2 lg:row-start-1">
            <StudioBookingCard studio={studio} />
          </div>

          <div className="min-w-0 lg:col-start-1 lg:row-start-2">
            <div className="space-y-9">
              <section
                aria-labelledby="overview-heading"
                className="scroll-mt-24"
              >
                <p className="eyebrow text-primary">The space</p>
                <h2
                  id="overview-heading"
                  className="mt-3 font-heading text-3xl leading-none"
                >
                  About this studio
                </h2>
                <div className="mt-4 max-w-3xl space-y-4 text-sm leading-relaxed text-muted-foreground sm:text-base">
                  {studio.overview.split("\n\n").map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </div>

              </section>

              <StudioSpecifications studio={studio} />

              <StudioAmenities amenities={studio.amenities} />
              <StudioHostCard host={studio.host} />
              <StudioReviews studio={studio} reviews={reviews} />
            </div>
          </div>
        </div>
      </Container>
    </Section>
  )
}
