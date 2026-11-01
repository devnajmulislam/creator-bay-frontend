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
import type { StudioCategorySlug, StudioDetail, StudioImage } from "@/types/studio"

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

  let studio: StudioDetail | null = null

  try {
    const baseUrl = process.env.NEXT_PUBLIC_SERVER_BASE_URL || "http://localhost:5000"
    const res = await fetch(`${baseUrl}/studios/${id}`, {
      cache: "no-store",
    })

    if (res.ok) {
      const data = await res.json()
      console.log("studiosData fetched for [id]:", data)
      const item = data.studio || data.data || data

      if (item && (item._id || item.name)) {
        const rawId = item._id
        const studioId = typeof rawId === "object" && rawId !== null && "$oid" in rawId
          ? (rawId as { $oid?: string }).$oid
          : typeof rawId === "string"
          ? rawId
          : id

        const categoryName = typeof item.category === "string" ? item.category : "Photo Studio"
        const categorySlug: StudioCategorySlug = categoryName.toLowerCase().includes("film")
          ? "film"
          : categoryName.toLowerCase().includes("podcast")
          ? "podcast"
          : categoryName.toLowerCase().includes("music")
          ? "music"
          : categoryName.toLowerCase().includes("workshop")
          ? "creative"
          : "photography"

        const imageUrl = typeof item.image === "string" ? item.image : "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?q=80&w=1200&auto=format&fit=crop"

        const galleryImages: StudioImage[] = [
          { src: imageUrl, alt: typeof item.name === "string" ? item.name : "Studio workspace" },
          { src: "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?q=80&w=1200&auto=format&fit=crop", alt: "Studio detail 1" },
          { src: "https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=1200&auto=format&fit=crop", alt: "Studio detail 2" },
        ]

        studio = {
          id: String(studioId),
          slug: String(studioId),
          name: typeof item.name === "string" ? item.name : "Creative Studio",
          category: categoryName,
          categorySlug,
          description: typeof item.description === "string" ? item.description : "Professional creative workspace equipped with top-tier gear.",
          overview: typeof item.description === "string" ? item.description : "Professional creative workspace equipped with top-tier gear.",
          location: typeof item.location === "string" ? item.location : "New York, NY",
          pricePerHour: Number(item.pricePerHour) || 150,
          securityDeposit: Number(item.securityDeposit) || 100,
          rating: 4.8,
          reviewCount: Number(item.reviewCount) || 12,
          capacity: Number(item.capacity) || 10,
          image: imageUrl,
          imageAlt: typeof item.name === "string" ? item.name : "Studio workspace",
          amenities: ["High-speed Wi-Fi", "Professional Lighting", "Sound System", "Air Conditioning", "Cyclorama Wall"],
          featured: true,
          instantBook: true,
          gallery: galleryImages,
          host: {
            name: "Studio Host",
            initials: "SH",
            role: "Professional Host",
            bio: "Experienced creative space host and practitioner.",
            responseTime: "within an hour",
            hostedSince: 2021,
            listingCount: 2,
            verified: true,
          },
        }
      }
    }
  } catch (err) {
    console.warn("Failed to fetch studio by id from backend, falling back to service:", err)
  }

  if (!studio) {
    studio = await getStudioById(id)
  }

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
