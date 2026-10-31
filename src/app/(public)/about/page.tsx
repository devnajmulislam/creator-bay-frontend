import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRightIcon, ShieldCheckIcon, SparklesIcon, UsersIcon } from "lucide-react"

import { Container, Section } from "@/components/shared/container"
import { buttonVariants } from "@/components/ui/button"

export const metadata: Metadata = {
  title: "About CreatorBay",
  description: "Learn more about CreatorBay - the premier peer-to-peer marketplace for creative workspaces.",
}

export default function AboutPage() {
  return (
    <>
      <Section className="border-b border-border/70 bg-muted/20">
        <Container className="max-w-4xl text-center">
          <p className="eyebrow mx-auto flex items-center justify-center gap-2.5 text-primary">
            <span aria-hidden className="h-px w-6 bg-primary/60" />
            About CreatorBay
            <span aria-hidden className="h-px w-6 bg-primary/60" />
          </p>
          <h1 className="display-xl mt-4">
            Built for creators, <br className="hidden sm:block" />
            powered by space.
          </h1>
          <p className="mt-6 text-base leading-relaxed text-muted-foreground sm:text-lg">
            CreatorBay is the premier marketplace connecting photographers, filmmakers,
            podcasters, musicians, and artists with exceptional private and commercial studios.
            We believe that extraordinary work begins in inspiring spaces.
          </p>
        </Container>
      </Section>

      <Section>
        <Container className="max-w-5xl">
          <div className="grid gap-8 md:grid-cols-3">
            <div className="rounded-2xl border border-border/80 bg-card p-6 sm:p-8">
              <div className="flex size-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <SparklesIcon className="size-6" />
              </div>
              <h3 className="mt-5 font-heading text-2xl">Curated Spaces</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                Every studio on CreatorBay is verified for professional acoustics, lighting,
                equipment, and creative atmosphere.
              </p>
            </div>
            <div className="rounded-2xl border border-border/80 bg-card p-6 sm:p-8">
              <div className="flex size-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <ShieldCheckIcon className="size-6" />
              </div>
              <h3 className="mt-5 font-heading text-2xl">Secure Bookings</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                Transparent pricing, instant or host-approved booking flows, and robust
                protection policies for hosts and guests.
              </p>
            </div>
            <div className="rounded-2xl border border-border/80 bg-card p-6 sm:p-8">
              <div className="flex size-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <UsersIcon className="size-6" />
              </div>
              <h3 className="mt-5 font-heading text-2xl">Creator Community</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                Connecting independent artists with local space owners to foster collaboration
                and creative independence.
              </p>
            </div>
          </div>

          <div className="mt-16 rounded-3xl border border-border/80 bg-card p-8 sm:p-12 text-center">
            <h2 className="font-heading text-3xl sm:text-4xl">Ready to find your next workspace?</h2>
            <p className="mt-4 text-muted-foreground max-w-xl mx-auto text-sm sm:text-base">
              Explore hundreds of professional studios across major cities or list your own space to start earning.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <Link href="/studios" className={buttonVariants({ size: "lg" })}>
                Browse studios
                <ArrowRightIcon className="ml-2 size-4" />
              </Link>
              <Link href="/add-studio" className={buttonVariants({ variant: "outline", size: "lg" })}>
                List your studio
              </Link>
            </div>
          </div>
        </Container>
      </Section>
    </>
  )
}
