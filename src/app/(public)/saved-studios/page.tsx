"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { HeartIcon, LogInIcon } from "lucide-react"
import { toast } from "sonner"

import { Container, Section } from "@/components/shared/container"
import { EmptyState } from "@/components/shared/empty-state"
import { StudioCard } from "@/components/studios/studio-card"
import { StudioCardSkeleton } from "@/components/studios/studio-card-skeleton"
import { buttonVariants } from "@/components/ui/button"
import { useSession } from "@/lib/auth-client"
import { getAllStudiosAsync } from "@/services/studio-service"
import { getSavedStudioIds } from "@/services/wishlist-service"
import type { Studio } from "@/types/studio"

export default function SavedStudiosPage() {
  const { data: session, isPending } = useSession()
  const user = session?.user

  const [studios, setStudios] = useState<Studio[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (!user?.email) return

    const email = user.email
    let cancelled = false

    async function loadSavedStudios() {
      try {
        const allStudios = await getAllStudiosAsync()
        const savedIds = getSavedStudioIds(email)

        if (!cancelled) {
          setStudios(
            allStudios.filter((studio) => savedIds.includes(studio.id)),
          )
        }
      } catch (error) {
        console.error("Failed to load saved studios:", error)
        if (!cancelled) {
          toast.error("Could not load your saved studios")
        }
      } finally {
        if (!cancelled) {
          setIsLoading(false)
        }
      }
    }

    loadSavedStudios()

    return () => {
      cancelled = true
    }
  }, [user?.email])

  if (isPending) {
    return (
      <Section>
        <Container>
          <div className="grid grid-cols-1 items-stretch gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 3 }, (_, index) => (
              <StudioCardSkeleton key={index} />
            ))}
          </div>
        </Container>
      </Section>
    )
  }

  if (!user) {
    return (
      <Section>
        <Container>
          <EmptyState
            icon={LogInIcon}
            title="Sign in to view your wishlist"
            description="Saved studios are linked to your account so you can find them again later."
            action={
              <Link
                href="/login?redirect=/saved-studios"
                className={buttonVariants()}
              >
                Log in
              </Link>
            }
          />
        </Container>
      </Section>
    )
  }

  return (
    <Section>
      <Container>
        <div>
          <p className="eyebrow text-primary">Wishlist</p>
          <h1 className="mt-1 font-heading text-3xl sm:text-4xl">
            Saved studios
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Spaces you have saved for your next production.
          </p>
        </div>

        <div className="mt-8">
          {isLoading ? (
            <div className="grid grid-cols-1 items-stretch gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {Array.from({ length: 3 }, (_, index) => (
                <StudioCardSkeleton key={index} />
              ))}
            </div>
          ) : studios.length === 0 ? (
            <EmptyState
              icon={HeartIcon}
              title="No saved studios yet"
              description="Tap the heart on any studio card to keep it here for later."
              action={
                <Link href="/studios" className={buttonVariants()}>
                  Explore studios
                </Link>
              }
            />
          ) : (
            <div className="grid grid-cols-1 items-stretch gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {studios.map((studio) => (
                <StudioCard key={studio.id} studio={studio} />
              ))}
            </div>
          )}
        </div>
      </Container>
    </Section>
  )
}
