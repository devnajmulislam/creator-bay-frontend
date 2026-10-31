"use client"

import Link from "next/link"
import { AlertTriangleIcon } from "lucide-react"

import { Container, Section } from "@/components/shared/container"
import { EmptyState } from "@/components/shared/empty-state"
import { Button, buttonVariants } from "@/components/ui/button"

interface StudioDetailErrorProps {
  error: Error & { digest?: string }
  reset: () => void
}

export default function StudioDetailError({
  reset,
}: StudioDetailErrorProps) {
  return (
    <Section spacing="compact">
      <Container size="narrow">
        <EmptyState
          icon={AlertTriangleIcon}
          title="Something went wrong"
          description="We couldn't load this studio right now. Try again, or head back to the directory to keep browsing."
          action={
            <div className="flex flex-col gap-2 sm:flex-row">
              <Button onClick={reset}>Try again</Button>
              <Link
                href="/studios"
                className={buttonVariants({ variant: "outline" })}
              >
                Browse all studios
              </Link>
            </div>
          }
        />
      </Container>
    </Section>
  )
}
