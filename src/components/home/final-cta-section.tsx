import Image from "next/image"
import Link from "next/link"
import { ArrowRightIcon, CircleCheckIcon } from "lucide-react"
import { cn } from "cn"

import { Container, Section } from "@/components/shared/container"
import { Reveal } from "@/components/shared/reveal"
import { buttonVariants } from "@/components/ui/button"
import { getFinalCta } from "@/services/home-service"

export function FinalCtaSection() {
  const cta = getFinalCta()
  const notes = cta.note.split(" · ")

  return (
    <Section id="final-cta" spacing="spacious">
      <Container>
        <Reveal>
          <div className="grid overflow-hidden rounded-2xl bg-foreground text-background lg:grid-cols-[1.05fr_0.95fr]">
            <div className="relative z-10 p-8 sm:p-12 lg:p-16">
              <p className="eyebrow flex items-center gap-2.5 text-background/60">
                <span aria-hidden className="h-px w-6 bg-background/40" />
                {cta.eyebrow}
              </p>
              <h2 className="display-lg mt-4 whitespace-pre-line">
                {cta.title}
              </h2>
              <p className="mt-5 max-w-md text-sm leading-relaxed text-background/65 sm:text-base">
                {cta.description}
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-3">
                <Link
                  href={cta.primaryCta.href}
                  className={cn(buttonVariants({ size: "lg" }))}
                >
                  {cta.primaryCta.label}
                  <ArrowRightIcon />
                </Link>
                <Link
                  href={cta.secondaryCta.href}
                  className={cn(
                    buttonVariants({ variant: "outline", size: "lg" }),
                    "border-background/25 bg-transparent text-background hover:border-background/40 hover:bg-background/10 hover:text-background",
                  )}
                >
                  {cta.secondaryCta.label}
                </Link>
              </div>

              <ul className="mt-10 flex flex-wrap gap-x-5 gap-y-2 border-t border-background/15 pt-5 text-xs text-background/55">
                {notes.map((note) => (
                  <li key={note} className="inline-flex items-center gap-1.5">
                    <CircleCheckIcon className="size-3.5 text-primary" />
                    {note}
                  </li>
                ))}
              </ul>
            </div>

            <div className="relative min-h-[280px] lg:min-h-full">
              <Image
                src={cta.image}
                alt={cta.imageAlt}
                fill
                sizes="(min-width: 1024px) 45vw, 100vw"
                className="object-cover"
              />
              <div
                aria-hidden
                className="absolute inset-0 bg-gradient-to-t from-foreground/70 via-transparent to-transparent lg:bg-gradient-to-r lg:from-foreground lg:via-foreground/15 lg:to-transparent"
              />
            </div>
          </div>
        </Reveal>
      </Container>
    </Section>
  )
}
