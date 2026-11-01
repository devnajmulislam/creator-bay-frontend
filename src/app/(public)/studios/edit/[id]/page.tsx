"use client"

import { useEffect, useState, use } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import {
  ArrowRightIcon,
  Building2Icon,
  BuildingIcon,
  DollarSignIcon,
  MapPinIcon,
  UsersIcon,
} from "lucide-react"
import { toast } from "sonner"

import { Container, Section } from "@/components/shared/container"
import { EmptyState } from "@/components/shared/empty-state"
import { Button, buttonVariants } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Spinner } from "@/components/ui/spinner"
import { Textarea } from "@/components/ui/textarea"
import {
  updateMyListing,
  type StudioUpdatePayload,
} from "@/services/studio-service"

interface EditStudioPageProps {
  params: Promise<{ id: string }>
}

const EMPTY_FORM: StudioUpdatePayload = {
  name: "",
  category: "",
  location: "",
  pricePerHour: "",
  capacity: "",
  description: "",
}

export default function EditStudioPage({ params }: EditStudioPageProps) {
  const { id } = use(params)
  const router = useRouter()
  const [formData, setFormData] = useState<StudioUpdatePayload>(EMPTY_FORM)
  const [loading, setLoading] = useState(false)
  const [isFetching, setIsFetching] = useState(true)
  const [loadError, setLoadError] = useState(false)

  useEffect(() => {
    let cancelled = false

    async function loadStudio() {
      try {
        const baseUrl =
          process.env.NEXT_PUBLIC_SERVER_BASE_URL || "http://localhost:5000"
        const res = await fetch(`${baseUrl}/studios/${id}`, {
          cache: "no-store",
        })

        if (!res.ok) {
          throw new Error(`Failed to load studio (${res.status})`)
        }

        const data = await res.json()
        const item = data.studio || data.data || data

        if (!item || (!item._id && !item.name)) {
          throw new Error("Studio not found")
        }

        if (!cancelled) {
          setFormData({
            name: String(item.name ?? ""),
            category: String(item.category ?? ""),
            location: String(item.location ?? ""),
            pricePerHour: String(item.pricePerHour ?? ""),
            capacity: String(item.capacity ?? ""),
            description: String(item.description ?? ""),
          })
        }
      } catch (error) {
        console.error("Failed to load studio for editing:", error)
        if (!cancelled) {
          setLoadError(true)
          toast.error("Could not load studio details")
        }
      } finally {
        if (!cancelled) {
          setIsFetching(false)
        }
      }
    }

    loadStudio()

    return () => {
      cancelled = true
    }
  }, [id])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)

    try {
      await updateMyListing(id, formData)
      toast.success("Studio listing updated successfully!")
      router.push("/my-listings")
      router.refresh()
    } catch (error) {
      console.error("Failed to update studio listing:", error)
      toast.error("Could not update studio", {
        description: "Please try again in a moment.",
      })
    } finally {
      setLoading(false)
    }
  }

  if (isFetching) {
    return (
      <div className="flex justify-center items-center h-[85vh]">
        <Spinner className="h-20 w-20" />
      </div>
    )
  }

  if (loadError) {
    return (
      <Section>
        <Container className="max-w-2xl">
          <EmptyState
            icon={Building2Icon}
            title="Studio not found"
            description="This listing may have been removed or is no longer available."
            action={
              <Link href="/my-listings" className={buttonVariants()}>
                Back to my listings
              </Link>
            }
          />
        </Container>
      </Section>
    )
  }

  return (
    <Section>
      <Container className="max-w-2xl">
        <div className="rounded-3xl border border-border/80 bg-card p-8 sm:p-12 shadow-sm">
          <div className="text-center">
            <p className="eyebrow text-primary">Manage Studio</p>
            <h1 className="font-heading text-3xl sm:text-4xl mt-2">
              Edit Studio Listing
            </h1>
            <p className="mt-2 text-sm text-muted-foreground">
              Update pricing, capacity, and details for{" "}
              {formData.name || "this studio"}.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="mt-8 space-y-6">
            <div className="space-y-2">
              <Label htmlFor="name">Studio name</Label>
              <div className="relative">
                <BuildingIcon className="absolute left-3 top-3 size-4 text-muted-foreground" />
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="pl-9"
                  required
                />
              </div>
            </div>

            <div className="grid gap-6 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="category">Discipline / Category</Label>
                <Input
                  id="category"
                  value={formData.category}
                  onChange={(e) =>
                    setFormData({ ...formData, category: e.target.value })
                  }
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="location">Location</Label>
                <div className="relative">
                  <MapPinIcon className="absolute left-3 top-3 size-4 text-muted-foreground" />
                  <Input
                    id="location"
                    value={formData.location}
                    onChange={(e) =>
                      setFormData({ ...formData, location: e.target.value })
                    }
                    className="pl-9"
                    required
                  />
                </div>
              </div>
            </div>

            <div className="grid gap-6 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="price">Price per hour ($)</Label>
                <div className="relative">
                  <DollarSignIcon className="absolute left-3 top-3 size-4 text-muted-foreground" />
                  <Input
                    id="price"
                    type="number"
                    value={formData.pricePerHour}
                    onChange={(e) =>
                      setFormData({ ...formData, pricePerHour: e.target.value })
                    }
                    className="pl-9"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="capacity">Capacity (people)</Label>
                <div className="relative">
                  <UsersIcon className="absolute left-3 top-3 size-4 text-muted-foreground" />
                  <Input
                    id="capacity"
                    type="number"
                    value={formData.capacity}
                    onChange={(e) =>
                      setFormData({ ...formData, capacity: e.target.value })
                    }
                    className="pl-9"
                    required
                  />
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                rows={5}
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                required
              />
            </div>

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Saving changes..." : "Save changes"}
              <ArrowRightIcon className="ml-2 size-4" />
            </Button>
          </form>
        </div>
      </Container>
    </Section>
  )
}
