"use client"

import { useState, use } from "react"
import { useRouter } from "next/navigation"
import { ArrowRightIcon, BuildingIcon, DollarSignIcon, MapPinIcon, UsersIcon } from "lucide-react"
import { toast } from "sonner"

import { Container, Section } from "@/components/shared/container"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

interface EditStudioPageProps {
  params: Promise<{ id: string }>
}

export default function EditStudioPage({ params }: EditStudioPageProps) {
  const { id } = use(params)
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: "Lumen North Loft",
    category: "Photography",
    location: "Brooklyn, NY",
    pricePerHour: "120",
    capacity: "25",
    description: "Exceptional daylight photography loft with high ceilings, cyc wall, and professional lighting kits.",
  })

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      toast.success("Studio listing updated successfully!")
      router.push("/my-studios")
      router.refresh()
    }, 600)
  }

  return (
    <Section>
      <Container className="max-w-2xl">
        <div className="rounded-3xl border border-border/80 bg-card p-8 sm:p-12 shadow-sm">
          <div className="text-center">
            <p className="eyebrow text-primary">Manage Studio</p>
            <h1 className="font-heading text-3xl sm:text-4xl mt-2">Edit Studio Listing</h1>
            <p className="mt-2 text-sm text-muted-foreground">
              Update pricing, capacity, and details for studio ID: {id}
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
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
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
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
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
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
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
                    onChange={(e) => setFormData({ ...formData, pricePerHour: e.target.value })}
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
                    onChange={(e) => setFormData({ ...formData, capacity: e.target.value })}
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
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
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
