import { ShieldCheckIcon, SparklesIcon, UsersIcon } from "lucide-react"
import type { LucideIcon } from "lucide-react"

import { SectionHeading } from "@/components/home/section-heading"
import { Container, Section } from "@/components/shared/container"
import { Reveal } from "@/components/shared/reveal"
import { getAboutValues } from "@/services/home-service"
import type { AboutValueIcon } from "@/types/home"

const aboutIcons: Record<AboutValueIcon, LucideIcon> = {
  sparkles: SparklesIcon,
  shield: ShieldCheckIcon,
  users: UsersIcon,
}

export function AboutSection() {
  const values = getAboutValues()

  return (
    <Section id="about" className="scroll-mt-24">
      <Container>
        <Reveal>
          <SectionHeading
            eyebrow="About CreatorBay"
            title={
              <>
                Built for creators,
                <br className="hidden sm:block" /> powered by space.
              </>
            }
            description="CreatorBay is the premier marketplace connecting photographers, filmmakers, podcasters, musicians, and artists with exceptional private and commercial studios. We believe extraordinary work begins in inspiring spaces."
          />
        </Reveal>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {values.map((value, index) => {
            const Icon = aboutIcons[value.icon]

            return (
              <Reveal key={value.title} delay={index * 0.07}>
                <div className="h-full rounded-2xl border border-border/80 bg-card p-6 sm:p-8">
                  <div className="flex size-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <Icon className="size-6" />
                  </div>
                  <h3 className="mt-5 font-heading text-2xl">{value.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                    {value.description}
                  </p>
                </div>
              </Reveal>
            )
          })}
        </div>
      </Container>
    </Section>
  )
}
