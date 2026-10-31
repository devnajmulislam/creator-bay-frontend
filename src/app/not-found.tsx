import Link from "next/link"
import { ArrowLeftIcon, CompassIcon } from "lucide-react"

import { Container, Section } from "@/components/shared/container"
import { buttonVariants } from "@/components/ui/button"

export default function NotFound() {
  return (
    <Section className="flex min-h-[70vh] flex-col items-center justify-center text-center">
      <Container className="flex max-w-lg flex-col items-center">
        <div className="flex size-16 items-center justify-center rounded-2xl bg-primary/10 text-primary">
          <CompassIcon className="size-8" />
        </div>
        <p className="eyebrow mt-6 text-primary">404 Error</p>
        <h1 className="display-xl mt-3">Page not found</h1>
        <p className="mt-4 text-sm leading-relaxed text-muted-foreground sm:text-base">
          The studio or page you are looking for might have been moved, removed,
          or never existed.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Link href="/" className={buttonVariants()}>
            <ArrowLeftIcon className="mr-2 size-4" />
            Back to home
          </Link>
          <Link
            href="/studios"
            className={buttonVariants({ variant: "outline" })}
          >
            Explore studios
          </Link>
        </div>
      </Container>
    </Section>
  )
}
