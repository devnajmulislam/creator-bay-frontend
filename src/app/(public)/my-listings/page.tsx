"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import {
  Building2Icon,
  EditIcon,
  LogInIcon,
  PlusIcon,
  Trash2Icon,
} from "lucide-react"
import { toast } from "sonner"

import { Container, Section } from "@/components/shared/container"
import { EmptyState } from "@/components/shared/empty-state"
import { Button, buttonVariants } from "@/components/ui/button"
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogMedia,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { Spinner } from "@/components/ui/spinner"
import { useSession } from "@/lib/auth-client"
import {
  deleteMyListing,
  getMyListings,
} from "@/services/studio-service"
import type { Studio } from "@/types/studio"

export default function MyListingsPage() {
  const { data: session, isPending } = useSession()
  const user = session?.user

  const [studios, setStudios] = useState<Studio[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [deleteTarget, setDeleteTarget] = useState<Studio | null>(null)
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    if (!user?.email) return

    const email = user.email
    let cancelled = false

    async function loadListings() {
      try {
        const listings = await getMyListings(email)
        if (!cancelled) {
          setStudios(listings)
        }
      } catch (error) {
        console.error("Failed to load my listings:", error)
        if (!cancelled) {
          setStudios([])
          toast.error("Could not load your listings", {
            description: "Please try again in a moment.",
          })
        }
      } finally {
        if (!cancelled) {
          setIsLoading(false)
        }
      }
    }

    loadListings()

    return () => {
      cancelled = true
    }
  }, [user?.email])

  async function handleConfirmDelete() {
    if (!deleteTarget) return

    setIsDeleting(true)

    try {
      const deleted = await deleteMyListing(deleteTarget.id)

      if (!deleted) {
        throw new Error("Listing was not found or already removed")
      }

      setStudios((current) =>
        current.filter((studio) => studio.id !== deleteTarget.id),
      )
      setDeleteTarget(null)
      toast.success("Studio listing deleted successfully")
    } catch (error) {
      console.error("Failed to delete listing:", error)
      toast.error("Could not delete listing", {
        description: "Please try again in a moment.",
      })
    } finally {
      setIsDeleting(false)
    }
  }

  if (isPending) {
    return (
      <div className="flex justify-center items-center h-[85vh]">
        <Spinner className="h-20 w-20" />
      </div>
    )
  }

  if (!user) {
    return (
      <Section>
        <Container>
          <EmptyState
            icon={LogInIcon}
            title="Sign in to manage your listings"
            description="Your studio listings are linked to your account. Log in to view, update, or remove them."
            action={
              <Link
                href="/login?redirect=/my-listings"
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

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-[85vh]">
        <Spinner className="h-20 w-20" />
      </div>
    )
  }

  return (
    <>
      <Section>
        <Container>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="eyebrow text-primary">Host Dashboard</p>
              <h1 className="font-heading text-3xl sm:text-4xl mt-1">
                My studio listings
              </h1>
              <p className="mt-1 text-sm text-muted-foreground">
                Manage your spaces, availability, and pricing.
              </p>
            </div>
            <Link href="/add-studio" className={buttonVariants()}>
              <PlusIcon className="mr-2 size-4" />
              Add new studio
            </Link>
          </div>

          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {studios.length === 0 ? (
              <div className="col-span-full rounded-2xl border border-border/80 bg-card p-12 text-center">
                <div className="mx-auto grid size-12 place-items-center rounded-full bg-primary/10 text-primary">
                  <Building2Icon className="size-6" />
                </div>
                <p className="mt-4 text-muted-foreground">
                  You haven&apos;t listed any studios yet.
                </p>
                <Link
                  href="/add-studio"
                  className={buttonVariants({ className: "mt-4" })}
                >
                  List your first studio
                </Link>
              </div>
            ) : (
              studios.map((studio) => (
                <div
                  key={studio.id}
                  className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border/80 bg-card shadow-sm"
                >
                  <div className="relative aspect-[4/3] w-full overflow-hidden bg-muted">
                    <Image
                      src={studio.image}
                      alt={studio.imageAlt}
                      fill
                      sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute top-3 right-3 rounded-full bg-background/90 px-3 py-1 text-xs font-semibold backdrop-blur-md">
                      ${studio.pricePerHour} / hr
                    </div>
                  </div>
                  <div className="flex flex-1 flex-col p-5">
                    <p className="text-xs uppercase tracking-wider text-muted-foreground">
                      {studio.category}
                    </p>
                    <h3 className="mt-1 font-heading text-xl">{studio.name}</h3>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {studio.location}
                    </p>

                    <div className="mt-auto flex items-center justify-between gap-3 border-t border-border/70 pt-4">
                      <Link
                        href={`/studios/edit/${studio.id}`}
                        className={buttonVariants({
                          variant: "outline",
                          size: "sm",
                        })}
                      >
                        <EditIcon className="mr-1.5 size-3.5" />
                        Update
                      </Link>
                      <Button
                        variant="ghost"
                        size="sm"
                        aria-label={`Delete ${studio.name}`}
                        className="text-destructive hover:text-destructive hover:bg-destructive/10"
                        onClick={() => setDeleteTarget(studio)}
                      >
                        <Trash2Icon className="mr-1.5 size-3.5" />
                        Delete
                      </Button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </Container>
      </Section>

      <AlertDialog
        open={Boolean(deleteTarget)}
        onOpenChange={(open) => {
          if (!open && !isDeleting) {
            setDeleteTarget(null)
          }
        }}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogMedia className="bg-destructive/10 text-destructive">
              <Trash2Icon />
            </AlertDialogMedia>
            <AlertDialogTitle>Delete this studio listing?</AlertDialogTitle>
            <AlertDialogDescription>
              {deleteTarget ? (
                <>
                  <span className="font-medium text-foreground">
                    {deleteTarget.name}
                  </span>{" "}
                  will be permanently removed from CreatorBay. This action
                  cannot be undone.
                </>
              ) : (
                "This listing will be permanently removed."
              )}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isDeleting}>Cancel</AlertDialogCancel>
            <Button
              variant="destructive"
              onClick={handleConfirmDelete}
              disabled={isDeleting}
            >
              {isDeleting ? "Deleting..." : "Delete listing"}
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}
