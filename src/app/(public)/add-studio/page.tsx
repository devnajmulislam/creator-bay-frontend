"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { ArrowRightIcon, BuildingIcon, DollarSignIcon, MapPinIcon, UsersIcon } from "lucide-react"
import { toast } from "sonner"

import { Container, Section } from "@/components/shared/container"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

export default function AddStudioPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    category: "Photography",
    location: "Brooklyn, NY",
    pricePerHour: "120",
    capacity: "25",
    description: "",
  })

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      toast.success("Studio listed successfully!")
      router.push("/my-listings")
      router.refresh()
    }, 700)
  }

  return (
    <Section>
      <Container className="max-w-2xl">
        <div className="rounded-3xl border border-border/80 bg-card p-8 sm:p-12 shadow-sm">
          <div className="text-center">
            <p className="eyebrow text-primary">Host with CreatorBay</p>
            <h1 className="font-heading text-3xl sm:text-4xl mt-2">List your creative space</h1>
            <p className="mt-2 text-sm text-muted-foreground">
              Share your studio with independent creators, photographers, and filmmakers.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="mt-8 space-y-6">
            <div className="space-y-2">
              <Label htmlFor="name">Studio name</Label>
              <div className="relative">
                <BuildingIcon className="absolute left-3 top-3 size-4 text-muted-foreground" />
                <Input
                  id="name"
                  placeholder="e.g. Lumen North Loft"
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
                placeholder="Describe your studio's lighting, acoustics, backdrop options, and amenities..."
                rows={5}
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                required
              />
            </div>

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Publishing listing..." : "Publish studio listing"}
              <ArrowRightIcon className="ml-2 size-4" />
            </Button>
          </form>
        </div>
      </Container>
    </Section>
  )
}
