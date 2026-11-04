"use client"

import { useEffect, useRef, useState, use } from "react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import {
  ArrowRightIcon,
  Building2Icon,
  BuildingIcon,
  DollarSignIcon,
  ImageIcon,
  MailIcon,
  MapPinIcon,
  ShieldCheckIcon,
  UploadIcon,
  UserIcon,
  UsersIcon,
} from "lucide-react"
import { toast } from "sonner"

import { Container, Section } from "@/components/shared/container"
import { EmptyState } from "@/components/shared/empty-state"
import { AmenityPicker } from "@/components/studios/amenity-picker"
import { Button, buttonVariants } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Spinner } from "@/components/ui/spinner"
import { Textarea } from "@/components/ui/textarea"
import { useSession } from "@/lib/auth-client"
import { uploadImageToImgbb } from "@/lib/image-upload"
import {
  getStudioById,
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
  securityDeposit: "",
  capacity: "",
  image: "",
  description: "",
  overview: "",
  amenities: [],
}

export default function EditStudioPage({ params }: EditStudioPageProps) {
  const { id } = use(params)
  const router = useRouter()
  const { data: session } = useSession()
  const user = session?.user
  const [formData, setFormData] = useState<StudioUpdatePayload>(EMPTY_FORM)
  const [loading, setLoading] = useState(false)
  const [uploadingImage, setUploadingImage] = useState(false)
  const [isFetching, setIsFetching] = useState(true)
  const [loadError, setLoadError] = useState(false)
  const imageInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    let cancelled = false

    async function loadStudio() {
      try {
        const studio = await getStudioById(id)

        if (!studio) {
          throw new Error("Studio not found")
        }

        if (!cancelled) {
          setFormData({
            name: studio.name,
            category: studio.category,
            location: studio.location,
            pricePerHour: String(studio.pricePerHour),
            securityDeposit: String(studio.securityDeposit),
            capacity: String(studio.capacity),
            image: studio.image,
            description: studio.description,
            overview: studio.overview,
            amenities: studio.amenities,
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

  async function handleImageUpload(
    event: React.ChangeEvent<HTMLInputElement>,
  ) {
    const file = event.target.files?.[0]
    event.target.value = ""

    if (!file) return

    setUploadingImage(true)

    try {
      const imageUrl = await uploadImageToImgbb(file)
      setFormData((current) => ({ ...current, image: imageUrl }))
      toast.success("Studio image updated")
    } catch (error) {
      toast.error("Image upload failed", {
        description:
          error instanceof Error ? error.message : "Please try again.",
      })
    } finally {
      setUploadingImage(false)
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)

    try {
      const updated = await updateMyListing(id, formData)

      if (!updated) {
        throw new Error("The studio listing was not updated.")
      }

      toast.success("Studio listing updated successfully!")
      router.push("/my-listings")
      router.refresh()
    } catch (error) {
      console.error("Failed to update studio listing:", error)
      toast.error("Could not update studio", {
        description:
          error instanceof Error ? error.message : "Please try again in a moment.",
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

            <div className="grid gap-6 sm:grid-cols-3">
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
                <Label htmlFor="deposit">Security deposit ($)</Label>
                <div className="relative">
                  <ShieldCheckIcon className="absolute left-3 top-3 size-4 text-muted-foreground" />
                  <Input
                    id="deposit"
                    type="number"
                    value={formData.securityDeposit}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        securityDeposit: e.target.value,
                      })
                    }
                    className="pl-9"
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
              <Label htmlFor="image">Studio image</Label>
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <ImageIcon className="absolute left-3 top-3 size-4 text-muted-foreground" />
                  <Input
                    id="image"
                    type="url"
                    value={formData.image}
                    onChange={(e) =>
                      setFormData({ ...formData, image: e.target.value })
                    }
                    className="pl-9"
                    required
                  />
                </div>
                <input
                  ref={imageInputRef}
                  type="file"
                  accept="image/*"
                  className="sr-only"
                  onChange={handleImageUpload}
                />
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => imageInputRef.current?.click()}
                  disabled={uploadingImage}
                >
                  <UploadIcon className="size-4" />
                  {uploadingImage ? "Uploading..." : "Upload"}
                </Button>
              </div>
              {formData.image ? (
                <div className="relative mt-2 aspect-[16/9] w-full overflow-hidden rounded-lg border border-border/80 bg-muted">
                  <Image
                    src={formData.image}
                    alt="Studio preview"
                    fill
                    unoptimized
                    sizes="(min-width: 640px) 50vw, 100vw"
                    className="object-cover"
                  />
                </div>
              ) : null}
            </div>

            <div className="space-y-2">
              <Label>Amenities</Label>
              <AmenityPicker
                value={formData.amenities ?? []}
                onChange={(amenities) =>
                  setFormData({ ...formData, amenities })
                }
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Short description</Label>
              <Textarea
                id="description"
                rows={3}
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="overview">Detailed overview</Label>
              <Textarea
                id="overview"
                rows={5}
                value={formData.overview}
                onChange={(e) =>
                  setFormData({ ...formData, overview: e.target.value })
                }
                required
              />
            </div>

            <div className="space-y-4 rounded-xl border border-border/80 bg-muted/30 p-4">
              <div>
                <p className="text-sm font-medium">Host information</p>
                <p className="text-xs text-muted-foreground">
                  This is linked to your account and cannot be edited here.
                </p>
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="host-name">Host name</Label>
                  <div className="relative">
                    <UserIcon className="absolute left-3 top-3 size-4 text-muted-foreground" />
                    <Input
                      id="host-name"
                      value={user?.name ?? ""}
                      readOnly
                      className="pl-9 bg-muted/60"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="host-email">Host email</Label>
                  <div className="relative">
                    <MailIcon className="absolute left-3 top-3 size-4 text-muted-foreground" />
                    <Input
                      id="host-email"
                      value={user?.email ?? ""}
                      readOnly
                      className="pl-9 bg-muted/60"
                    />
                  </div>
                </div>
              </div>
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
