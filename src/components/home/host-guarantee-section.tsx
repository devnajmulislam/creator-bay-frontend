import Link from "next/link"
import {
  ArrowRightIcon,
  BadgeCheckIcon,
  HeadphonesIcon,
  ShieldCheckIcon,
} from "lucide-react"
import type { LucideIcon } from "lucide-react"

import { Container, Section } from "@/components/shared/container"
import { Reveal } from "@/components/shared/reveal"
import { buttonVariants } from "@/components/ui/button"
import { getHostGuarantees } from "@/services/home-service"
import type { HostGuaranteeIcon } from "@/types/home"

const guaranteeIcons: Record<HostGuaranteeIcon, LucideIcon> = {
  badge: BadgeCheckIcon,
  shield: ShieldCheckIcon,
  support: HeadphonesIcon,
}

export function HostGuaranteeSection() {
  const guarantees = getHostGuarantees()

  return (
    <Section
      id="host-guarantee"
      className="scroll-mt-24 border-y border-border/70 bg-muted/25"
    >
      <Container>
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-start lg:gap-20">
          <Reveal>
            <div className="max-w-lg">
              <p className="eyebrow flex items-center gap-2.5 text-primary">
                <span aria-hidden className="h-px w-6 bg-primary/60" />
                Host guarantee
              </p>
              <h2 className="display-lg mt-4">
                Book with confidence.
                <br />
                Create without compromise.
              </h2>
              <p className="mt-5 text-sm leading-relaxed text-muted-foreground sm:text-base">
                Every listing is reviewed, every booking is recorded, and every
                creator has a real person to call when the plan changes.
              </p>
              <Link
                href="/about"
                className={buttonVariants({ variant: "outline", size: "lg" })}
              >
                Read the host guarantee
                <ArrowRightIcon />
              </Link>
              <p className="mt-4 text-xs text-muted-foreground">
                Trusted by 320+ independent studios across 18 cities.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="rounded-xl border border-border/80 bg-background/75 p-6 sm:p-8">
              <div className="grid">
                {guarantees.map((guarantee) => {
                  const Icon = guaranteeIcons[guarantee.icon]

                  return (
                    <div
                      key={guarantee.title}
                      className="flex gap-4 border-b border-border/70 py-5 first:pt-0 last:border-b-0 last:pb-0"
                    >
                      <span className="grid size-10 shrink-0 place-items-center rounded-lg border border-border bg-card text-primary">
                        <Icon className="size-4.5" />
                      </span>
                      <div>
                        <h3 className="font-heading text-xl leading-tight">
                          {guarantee.title}
                        </h3>
                        <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                          {guarantee.description}
                        </p>
                      </div>
                    </div>
                  )
                })}
              </div>

              <div className="mt-6 flex flex-col gap-4 border-t border-border/70 pt-6 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center gap-3">
                  <span className="grid size-10 shrink-0 place-items-center rounded-full bg-primary/10 text-primary">
                    <HeadphonesIcon className="size-4.5" />
                  </span>
                  <div>
                    <p className="text-sm font-medium">Creator support</p>
                    <p className="text-xs text-muted-foreground">
                      Seven days a week, 8am&ndash;8pm local time
                    </p>
                  </div>
                </div>
                <Link
                  href="/about"
                  className="inline-flex items-center gap-1.5 text-sm font-medium text-primary underline-offset-4 hover:underline"
                >
                  Get help
                  <ArrowRightIcon className="size-3.5" />
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </Container>
    </Section>
  )
}
