"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { PlusIcon, Trash2Icon, EditIcon } from "lucide-react"
import { toast } from "sonner"

import { Container, Section } from "@/components/shared/container"
import { Button, buttonVariants } from "@/components/ui/button"
import { getAllStudios } from "@/services/studio-service"
import type { Studio } from "@/types/studio"

export default function MyListingsPage() {
  const [studios, setStudios] = useState<Studio[]>(getAllStudios().slice(0, 3))

  function handleDelete(id: string) {
    setStudios(studios.filter((s) => s.id !== id))
    toast.success("Studio listing deleted successfully")
  }

  return (
    <Section>
      <Container>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="eyebrow text-primary">Host Dashboard</p>
            <h1 className="font-heading text-3xl sm:text-4xl mt-1">My studio listings</h1>
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
              <p className="text-muted-foreground">You haven&apos;t listed any studios yet.</p>
              <Link href="/add-studio" className={buttonVariants({ className: "mt-4" })}>
                List your first studio
              </Link>
            </div>
          ) : (
            studios.map((studio) => (
              <div key={studio.id} className="group overflow-hidden rounded-2xl border border-border/80 bg-card shadow-sm">
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-muted">
                  <Image
                    src={studio.image}
                    alt={studio.imageAlt}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute top-3 right-3 rounded-full bg-background/90 px-3 py-1 text-xs font-semibold backdrop-blur-md">
                    ${studio.pricePerHour} / hr
                  </div>
                </div>
                <div className="p-5">
                  <p className="text-xs uppercase tracking-wider text-muted-foreground">{studio.category}</p>
                  <h3 className="mt-1 font-heading text-xl">{studio.name}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{studio.location}</p>

                  <div className="mt-5 flex items-center justify-between gap-3 border-t border-border/70 pt-4">
                    <Link
                      href={`/studios/${studio.id}`}
                      className={buttonVariants({ variant: "outline", size: "sm" })}
                    >
                      <EditIcon className="mr-1.5 size-3.5" />
                      View / Edit
                    </Link>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-destructive hover:text-destructive hover:bg-destructive/10"
                      onClick={() => handleDelete(studio.id)}
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
  )
}
